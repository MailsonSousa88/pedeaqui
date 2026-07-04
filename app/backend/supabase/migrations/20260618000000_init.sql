  -- ============================================================
  -- pedaqui.store — Schema PostgreSQL (Supabase) v5
  -- Changelog vs v4:
  --   [REFACTOR-1] Introdução da tabela pública `profiles` (1:1 com auth.users)
  --                para centralizar dados dos usuários (name, phone).
  --   [REFACTOR-2] Remoção da coluna `name` das tabelas `tenants` e `admins`.
  --   [REFACTOR-3] Atualização dos triggers de sync para mirar em `profiles`.
  --   [REFACTOR-4] Tratamento Edge Case 0001 (RLS de inatividade e Audit log de cancelamento).
  -- Changelog vs v3:
  --   [FIX-1]  Âncoras únicas compostas em stores e categories
  --            para suportar FKs cruzadas de integridade entre tenants
  --   [FIX-2]  FK composta categories(store_id, tenant_id) → stores(id, tenant_id)
  --   [FIX-3]  FK composta products(store_id, tenant_id) → stores(id, tenant_id)
  --   [FIX-4]  FK composta products(category_id, store_id) → categories(id, store_id)
  --            Garante que produto e categoria sempre pertencem à mesma store
  --   [FIX-5]  product_images: adicionados r2_key (UNIQUE), size_bytes, mime_type
  --            Necessário para integração com Cloudflare R2 e controle de
  --            photo_storage_limit em tenants
  --   [FIX-6]  variation_options: adicionado price_modifier_cents
  --            Permite diferença de preço por opção sem precisar de SKUs no MVP
  -- ============================================================

  CREATE EXTENSION IF NOT EXISTS "pgcrypto";

  SET search_path TO public;

  -- ============================================================
  -- ENUM: ações de auditoria
  -- ============================================================

  CREATE TYPE audit_action AS ENUM (
    'tenant.create',
    'tenant.suspend',
    'tenant.reactivate',
    'tenant.delete',
    'tenant.plan_change',
    'subscription.create',
    'subscription.cancel',
    'subscription.past_due',
    'plan.create',
    'plan.update',
    'plan.deactivate',
    'admin.create',
    'admin.deactivate'
  );

  -- ============================================================
  -- TABELAS (PROFILES, ADMIN & LOGS)
  -- ============================================================

  CREATE TABLE profiles (
    id           uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name         varchar     NOT NULL,
    phone        varchar     NOT NULL,
    created_at   timestamptz NOT NULL DEFAULT now(),
    updated_at   timestamptz NOT NULL DEFAULT now()
  );

  CREATE TABLE admins (
    id           uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role         varchar     NOT NULL DEFAULT 'support',
    active       boolean     NOT NULL DEFAULT true,
    created_at   timestamptz NOT NULL DEFAULT now(),
    updated_at   timestamptz NOT NULL DEFAULT now()
  );


  -- ============================================================
  -- TABELAS (CORE, ASSINATURAS & STRIPE)
  -- ============================================================

  CREATE TABLE plans (
    id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    name              varchar     NOT NULL,
    price_brl_cents   bigint      NOT NULL CHECK (price_brl_cents > 0),
    stripe_price_id   varchar     UNIQUE,
    active            boolean     NOT NULL DEFAULT true,
    created_at        timestamptz NOT NULL DEFAULT now(),
    updated_at        timestamptz NOT NULL DEFAULT now()
  );

  COMMENT ON COLUMN plans.price_brl_cents IS 'Preço do plano em centavos de BRL (ex: 9990 = R$ 99,90)';

  CREATE TABLE tenants (
    id                  uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    status              varchar     NOT NULL DEFAULT 'active'
                          CHECK (status IN ('active', 'suspended')),
    cpf_cnpj            varchar     NOT NULL UNIQUE,
    photo_storage_limit bigint      NOT NULL CHECK (photo_storage_limit > 0),
    stripe_customer_id  varchar     UNIQUE,
    created_at          timestamptz NOT NULL DEFAULT now(),
    updated_at          timestamptz NOT NULL DEFAULT now()
  );

  COMMENT ON COLUMN tenants.photo_storage_limit IS 'Limite de armazenamento de fotos em bytes (ex: 524288000 = 500 MB)';

  CREATE TABLE audit_logs (
    id           uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id     uuid         REFERENCES admins(id),
    tenant_id    uuid         REFERENCES tenants(id),
    action       audit_action NOT NULL,
    target_table varchar      NOT NULL,
    target_id    uuid         NOT NULL,
    payload      jsonb        NOT NULL DEFAULT '{}',
    created_at   timestamptz  NOT NULL DEFAULT now()
  );

  CREATE TABLE subscriptions (
    id                     uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id              uuid        NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    plan_id                uuid        NOT NULL REFERENCES plans(id),
    status                 varchar     NOT NULL DEFAULT 'active'
                            CHECK (status IN ('active', 'past_due', 'unpaid', 'canceled')),
    stripe_subscription_id varchar     UNIQUE,
    starts_at              timestamptz NOT NULL,
    ends_at                timestamptz NOT NULL,
    CONSTRAINT chk_subscriptions_ends_after_start
      CHECK (
        ends_at IS NULL
        OR (starts_at IS NOT NULL AND ends_at > starts_at)
      ),
    created_at             timestamptz NOT NULL DEFAULT now(),
    updated_at             timestamptz NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- TABELAS (CONTEÚDO DO LOJISTA)
  -- ============================================================

  CREATE TABLE stores (
    id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id        uuid        NOT NULL UNIQUE REFERENCES tenants(id) ON DELETE CASCADE,
    slug             varchar     NOT NULL UNIQUE,
    store_name             varchar     NOT NULL UNIQUE,
    horario_abertura   time NOT NULL,
    horario_fechamento time NOT NULL,
    endereco         text NOT NULL,
    descricao        text,
    logo_url         varchar,
    whatsapp_number  varchar NOT NULL UNIQUE,
    active           boolean     NOT NULL DEFAULT true,
    deleted_at       timestamptz,
    created_at       timestamptz NOT NULL DEFAULT now(),
    updated_at       timestamptz NOT NULL DEFAULT now(),

    -- [FIX-1] Âncora para FKs cruzadas de categories e products
    CONSTRAINT uq_stores_id_tenant UNIQUE (id, tenant_id)
  );

  CREATE TABLE categories (
    id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id     uuid        NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    tenant_id    uuid        NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name         varchar     NOT NULL,
    description  text,
    sort_order   int         NOT NULL DEFAULT 0,
    deleted_at   timestamptz,
    created_at   timestamptz NOT NULL DEFAULT now(),
    updated_at   timestamptz NOT NULL DEFAULT now(),

    -- [FIX-1] Âncora para FK cruzada de products
    CONSTRAINT uq_categories_id_store UNIQUE (id, store_id),

    -- [FIX-2] Garante que store_id e tenant_id da categoria são consistentes
    CONSTRAINT fk_categories_store_tenant
      FOREIGN KEY (store_id, tenant_id) REFERENCES stores(id, tenant_id)
  );

  CREATE TABLE products (
    id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id          uuid        NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    tenant_id         uuid        NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    category_id       uuid        REFERENCES categories(id) ON DELETE SET NULL,
    name              varchar     NOT NULL,
    description       text,
    price_cents       bigint      NOT NULL CHECK (price_cents > 0),
    promo_price_cents bigint      CHECK (promo_price_cents > 0),
    promo_ends_at     timestamptz,
    details           jsonb       NOT NULL DEFAULT '{}',
    available         boolean     NOT NULL DEFAULT true,
    deleted_at        timestamptz,
    created_at        timestamptz NOT NULL DEFAULT now(),
    updated_at        timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT chk_promo_price_below_base
      CHECK (promo_price_cents IS NULL OR promo_price_cents < price_cents),

    CONSTRAINT chk_promo_ends_requires_price
      CHECK (promo_ends_at IS NULL OR promo_price_cents IS NOT NULL),

    -- [FIX-3] Garante que store_id e tenant_id do produto são consistentes
    CONSTRAINT fk_products_store_tenant
      FOREIGN KEY (store_id, tenant_id) REFERENCES stores(id, tenant_id),

    -- [FIX-4] Garante que categoria e produto pertencem à mesma store
    CONSTRAINT fk_products_category_store
      FOREIGN KEY (category_id, store_id) REFERENCES categories(id, store_id)
  );

  COMMENT ON COLUMN products.price_cents       IS 'Preço base em centavos de BRL';
  COMMENT ON COLUMN products.promo_price_cents IS 'Preço promocional em centavos de BRL — deve ser menor que price_cents';
  COMMENT ON COLUMN products.promo_ends_at     IS 'Data de encerramento da promoção — obrigatório ter promo_price_cents';

  -- [FIX-5] Campos de integração com Cloudflare R2
  CREATE TABLE product_images (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id  uuid        NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    r2_key      varchar     NOT NULL UNIQUE,
    url         varchar     NOT NULL UNIQUE,
    size_bytes  bigint      NOT NULL CHECK (size_bytes > 0),
    mime_type   varchar     NOT NULL,
    sort_order  int         NOT NULL DEFAULT 0,
    created_at  timestamptz NOT NULL DEFAULT now()
  );

  COMMENT ON COLUMN product_images.r2_key    IS 'Caminho do arquivo no bucket R2 (ex: stores/{storeId}/products/{productId}/{imageId}.webp) — fonte de verdade para operações no R2';
  COMMENT ON COLUMN product_images.url       IS 'URL pública para exibição no frontend — derivada do r2_key, mantida para facilitar leitura e resiliência a mudanças de bucket';
  COMMENT ON COLUMN product_images.size_bytes IS 'Tamanho do arquivo em bytes — usado para calcular uso de armazenamento vs photo_storage_limit do tenant';

  CREATE TABLE product_variations (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id  uuid        NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    label       varchar     NOT NULL,
    sort_order  int         NOT NULL DEFAULT 0,
    created_at  timestamptz NOT NULL DEFAULT now()
  );

  -- [FIX-6] price_modifier_cents: diferença de preço por opção sem SKUs
  CREATE TABLE variation_options (
    id                   uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    variation_id         uuid        NOT NULL REFERENCES product_variations(id) ON DELETE CASCADE,
    value                varchar     NOT NULL,
    price_modifier_cents bigint      NOT NULL DEFAULT 0,
    CONSTRAINT chk_price_modifier_not_absurd
      CHECK (price_modifier_cents > -1000000),
    sort_order           int         NOT NULL DEFAULT 0,
    created_at           timestamptz NOT NULL DEFAULT now()
  );

  COMMENT ON COLUMN variation_options.price_modifier_cents IS 'Valor adicionado ao price_cents do produto. Pode ser negativo. Preço final = product.price_cents + option.price_modifier_cents';

  -- ============================================================
  -- ÍNDICES
  -- ============================================================

  -- Admins & Audit Logs
  CREATE INDEX idx_admins_role             ON admins(role);
  CREATE INDEX idx_audit_logs_admin_id     ON audit_logs(admin_id);
  CREATE INDEX idx_audit_logs_target       ON audit_logs(target_table, target_id);
  CREATE INDEX idx_audit_logs_action       ON audit_logs(action);

  -- Tenants & Stripe
  CREATE INDEX idx_tenants_status          ON tenants(status);
  CREATE INDEX idx_tenants_stripe_cust     ON tenants(stripe_customer_id);

  -- Subscriptions
  CREATE INDEX idx_subscriptions_tenant    ON subscriptions(tenant_id);
  CREATE INDEX idx_subscriptions_plan      ON subscriptions(plan_id);
  CREATE INDEX idx_subscriptions_stripe    ON subscriptions(stripe_subscription_id);
  CREATE INDEX idx_subscriptions_t_status  ON subscriptions(tenant_id, status);

  CREATE UNIQUE INDEX uq_subscriptions_one_active_per_tenant
    ON subscriptions (tenant_id)
    WHERE status = 'active';

  -- Stores
  CREATE INDEX idx_stores_tenant_id        ON stores(tenant_id);
  CREATE INDEX idx_stores_slug             ON stores(slug);
  CREATE INDEX idx_stores_active_live      ON stores(tenant_id) WHERE deleted_at IS NULL;

  -- Categories
  CREATE INDEX idx_categories_store        ON categories(store_id);
  CREATE INDEX idx_categories_tenant       ON categories(tenant_id);
  CREATE INDEX idx_categories_store_sort   ON categories(store_id, sort_order);
  CREATE INDEX idx_categories_live         ON categories(store_id) WHERE deleted_at IS NULL;

  -- Products
  CREATE INDEX idx_products_store          ON products(store_id);
  CREATE INDEX idx_products_tenant         ON products(tenant_id);
  CREATE INDEX idx_products_category       ON products(category_id);
  CREATE INDEX idx_products_store_deleted  ON products(store_id, deleted_at);
  CREATE INDEX idx_products_available      ON products(store_id, available) WHERE deleted_at IS NULL;

  -- Product Images
  -- [FIX-5] Índice para query de uso de armazenamento por tenant
  CREATE INDEX idx_product_images_product      ON product_images(product_id);
  CREATE INDEX idx_product_images_product_size ON product_images(product_id, size_bytes);

  -- Variações e Opções
  CREATE INDEX idx_product_variations_product ON product_variations(product_id);
  CREATE INDEX idx_variation_options_var      ON variation_options(variation_id);

  -- ============================================================
  -- TRIGGERS: updated_at automático
  -- ============================================================

-- FUNÇÃO: Sincroniza name de auth.users → profiles

CREATE OR REPLACE FUNCTION fn_sync_profile_name()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET
    name       = COALESCE(NEW.raw_user_meta_data->>'full_name', name),
    updated_at = now()
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- TRIGGER: Dispara quando auth.users é atualizado

CREATE TRIGGER trg_sync_profile_name
  AFTER UPDATE OF raw_user_meta_data ON auth.users
  FOR EACH ROW
  WHEN (
    NEW.raw_user_meta_data->>'full_name'
    IS DISTINCT FROM
    OLD.raw_user_meta_data->>'full_name'
  )
  EXECUTE FUNCTION fn_sync_profile_name();

---------------------------------------------------

  CREATE OR REPLACE FUNCTION set_updated_at()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER trg_profiles_updated_at      BEFORE UPDATE ON profiles      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  CREATE TRIGGER trg_admins_updated_at        BEFORE UPDATE ON admins        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  CREATE TRIGGER trg_plans_updated_at         BEFORE UPDATE ON plans         FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  CREATE TRIGGER trg_tenants_updated_at       BEFORE UPDATE ON tenants       FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  CREATE TRIGGER trg_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  CREATE TRIGGER trg_stores_updated_at        BEFORE UPDATE ON stores        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  CREATE TRIGGER trg_categories_updated_at    BEFORE UPDATE ON categories    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  CREATE TRIGGER trg_products_updated_at      BEFORE UPDATE ON products      FOR EACH ROW EXECUTE FUNCTION set_updated_at();

  -- ============================================================
  -- TRIGGERS: Auditoria de Assinatura
  -- ============================================================

  CREATE OR REPLACE FUNCTION fn_audit_subscription_cancellation()
  RETURNS TRIGGER AS $$
  BEGIN
    IF NEW.status = 'canceled' AND OLD.status IS DISTINCT FROM 'canceled' THEN
      INSERT INTO audit_logs (tenant_id, action, target_table, target_id, payload)
      VALUES (
        NEW.tenant_id,
        'subscription.cancel',
        'subscriptions',
        NEW.id,
        jsonb_build_object('old_status', OLD.status, 'ends_at', NEW.ends_at)
      );
    END IF;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  CREATE TRIGGER trg_audit_subscription_cancellation
    AFTER UPDATE OF status ON subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION fn_audit_subscription_cancellation();

  -- ============================================================
  -- TRIGGERS: Soft Delete em Cascata
  -- ============================================================

  -- -------------------------------------------------------------------
  -- Cascata: stores → categories + products
  -- -------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION fn_cascade_soft_delete_store()
  RETURNS TRIGGER AS $$
  BEGIN
    IF NEW.deleted_at IS NOT NULL AND OLD.deleted_at IS NULL THEN

      UPDATE categories
      SET deleted_at = NEW.deleted_at
      WHERE store_id = NEW.id AND deleted_at IS NULL;

      UPDATE products
      SET deleted_at = NEW.deleted_at
      WHERE store_id = NEW.id AND deleted_at IS NULL;

    ELSIF NEW.deleted_at IS NULL AND OLD.deleted_at IS NOT NULL THEN

      UPDATE categories
      SET deleted_at = NULL
      WHERE store_id = NEW.id AND deleted_at = OLD.deleted_at;

      UPDATE products
      SET deleted_at = NULL
      WHERE store_id = NEW.id AND deleted_at = OLD.deleted_at;

    END IF;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER trg_cascade_soft_delete_store
    AFTER UPDATE OF deleted_at ON stores
    FOR EACH ROW
    EXECUTE FUNCTION fn_cascade_soft_delete_store();

  -- -------------------------------------------------------------------
  -- Cascata: categories → products
  -- -------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION fn_cascade_soft_delete_category()
  RETURNS TRIGGER AS $$
  BEGIN
    IF NEW.deleted_at IS NOT NULL AND OLD.deleted_at IS NULL THEN

      UPDATE products
      SET deleted_at = NEW.deleted_at
      WHERE category_id = NEW.id AND deleted_at IS NULL;

    ELSIF NEW.deleted_at IS NULL AND OLD.deleted_at IS NOT NULL THEN

      UPDATE products
      SET deleted_at = NULL
      WHERE category_id = NEW.id AND deleted_at = OLD.deleted_at;

    END IF;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER trg_cascade_soft_delete_category
    AFTER UPDATE OF deleted_at ON categories
    FOR EACH ROW
    EXECUTE FUNCTION fn_cascade_soft_delete_category();

  -- ============================================================
  -- ROW LEVEL SECURITY (RLS)
  -- ============================================================

  ALTER TABLE profiles           ENABLE ROW LEVEL SECURITY;
  ALTER TABLE admins             ENABLE ROW LEVEL SECURITY;
  ALTER TABLE audit_logs         ENABLE ROW LEVEL SECURITY;
  ALTER TABLE tenants            ENABLE ROW LEVEL SECURITY;
  ALTER TABLE stores             ENABLE ROW LEVEL SECURITY;
  ALTER TABLE subscriptions      ENABLE ROW LEVEL SECURITY;
  ALTER TABLE categories         ENABLE ROW LEVEL SECURITY;
  ALTER TABLE products           ENABLE ROW LEVEL SECURITY;
  ALTER TABLE product_images     ENABLE ROW LEVEL SECURITY;
  ALTER TABLE product_variations ENABLE ROW LEVEL SECURITY;
  ALTER TABLE variation_options  ENABLE ROW LEVEL SECURITY;
  ALTER TABLE plans              ENABLE ROW LEVEL SECURITY;

  -- ============================================================
  -- POLICIES: Profiles
  -- ============================================================

  CREATE POLICY profile_self_read ON profiles
    FOR SELECT TO authenticated
    USING (id = auth.uid());

  CREATE POLICY profile_self_insert ON profiles
    FOR INSERT TO authenticated
    WITH CHECK (id = auth.uid());

  CREATE POLICY profile_self_update ON profiles
    FOR UPDATE TO authenticated
    USING (id = auth.uid());

  -- ============================================================
  -- POLICIES: Admins
  -- ============================================================

  CREATE POLICY admin_self_read ON admins
    FOR SELECT TO authenticated
    USING (id = auth.uid());

  CREATE POLICY admin_self_update ON admins
    FOR UPDATE TO authenticated
    USING (id = auth.uid());

  CREATE POLICY audit_log_self_read ON audit_logs
    FOR SELECT TO authenticated
    USING (admin_id = auth.uid());

  -- ============================================================
  -- POLICIES: Tenants & Subscriptions
  -- ============================================================

  CREATE POLICY tenant_isolation ON tenants
    TO authenticated
    USING (id = auth.uid());

  CREATE POLICY subscription_isolation ON subscriptions
    TO authenticated
    USING (tenant_id = auth.uid());

  -- [FIX-3] Lojista lê apenas sua própria loja
  -- Cliente final (anon/authenticated) lê qualquer loja ativa — storefront público
  CREATE POLICY store_tenant_write ON stores
    FOR ALL TO authenticated
    USING (tenant_id = auth.uid());

  CREATE POLICY storefront_public_stores ON stores
    FOR SELECT TO anon, authenticated
    USING (
      active = true 
      AND deleted_at IS NULL
      AND tenant_id IN (SELECT id FROM tenants WHERE status = 'active')
    );

  -- ============================================================
  -- POLICIES: Categories
  -- ============================================================

  CREATE POLICY category_isolation ON categories
    FOR ALL TO authenticated
    USING (tenant_id = auth.uid());

  CREATE POLICY storefront_public_categories ON categories
    FOR SELECT TO anon, authenticated
    USING (
      deleted_at IS NULL
      AND tenant_id IN (SELECT id FROM tenants WHERE status = 'active')
      AND store_id IN (SELECT id FROM stores WHERE active = true AND deleted_at IS NULL)
    );

  -- ============================================================
  -- POLICIES: Products
  -- ============================================================

  CREATE POLICY product_isolation ON products
    FOR ALL TO authenticated
    USING (tenant_id = auth.uid());

  CREATE POLICY storefront_public_products ON products
    FOR SELECT TO anon, authenticated
    USING (
      available = true
      AND deleted_at IS NULL
      AND tenant_id IN (SELECT id FROM tenants WHERE status = 'active')
      AND store_id IN (SELECT id FROM stores WHERE active = true AND deleted_at IS NULL)
    );

  -- ============================================================
  -- POLICIES: Tabelas filhas
  -- ============================================================

  CREATE POLICY product_image_isolation ON product_images
    FOR ALL TO authenticated
    USING (product_id IN (SELECT id FROM products WHERE tenant_id = auth.uid()));

  CREATE POLICY storefront_public_images ON product_images
    FOR SELECT TO anon, authenticated
    USING (product_id IN (
      SELECT id FROM products WHERE available = true AND deleted_at IS NULL
    ));

  CREATE POLICY product_variation_isolation ON product_variations
    FOR ALL TO authenticated
    USING (product_id IN (SELECT id FROM products WHERE tenant_id = auth.uid()));

  CREATE POLICY variation_option_isolation ON variation_options
    FOR ALL TO authenticated
    USING (
      EXISTS (
        SELECT 1
        FROM product_variations pv
        JOIN products p ON p.id = pv.product_id
        WHERE pv.id = variation_options.variation_id
          AND p.tenant_id = auth.uid()
      )
    );

  -- ============================================================
  -- POLICIES: Plans
  -- ============================================================

  CREATE POLICY plans_read_all ON plans
    FOR SELECT
    USING (active = true);

  CREATE POLICY plans_admin_modify ON plans
    FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM admins
        WHERE admins.id = auth.uid() AND admins.active = true
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM admins
        WHERE admins.id = auth.uid() AND admins.active = true
      )
    );