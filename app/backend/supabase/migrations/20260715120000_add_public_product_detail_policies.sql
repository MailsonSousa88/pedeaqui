-- ============================================================
-- POLICIES: Detalhe publico de produto
-- ============================================================

-- Policies permissivas de SELECT sao combinadas por OR. A policy anterior
-- de imagens nao verificava tenant e loja ativos, portanto deve ser
-- substituida, e nao complementada.
DROP POLICY IF EXISTS storefront_public_images ON product_images;

CREATE POLICY storefront_public_images ON product_images
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM products p
      JOIN tenants t ON t.id = p.tenant_id
      JOIN stores s ON s.id = p.store_id
      WHERE p.id = product_images.product_id
        AND p.available = true
        AND p.deleted_at IS NULL
        AND t.status = 'active'
        AND s.active = true
        AND s.deleted_at IS NULL
    )
  );

CREATE POLICY storefront_public_product_variations ON product_variations
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM products p
      JOIN tenants t ON t.id = p.tenant_id
      JOIN stores s ON s.id = p.store_id
      WHERE p.id = product_variations.product_id
        AND p.available = true
        AND p.deleted_at IS NULL
        AND t.status = 'active'
        AND s.active = true
        AND s.deleted_at IS NULL
    )
  );

CREATE POLICY storefront_public_variation_options ON variation_options
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM product_variations pv
      JOIN products p ON p.id = pv.product_id
      JOIN tenants t ON t.id = p.tenant_id
      JOIN stores s ON s.id = p.store_id
      WHERE pv.id = variation_options.variation_id
        AND p.available = true
        AND p.deleted_at IS NULL
        AND t.status = 'active'
        AND s.active = true
        AND s.deleted_at IS NULL
    )
  );
