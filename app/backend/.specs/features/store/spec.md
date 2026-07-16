# Store - Baseline atual / Autoritativo

## Autoridade
- `src/routes/store.routes.ts`
- `src/controllers/store/StoreController.ts`
- `src/useCases/store/*`
- `src/models/Store.ts`
- `src/repositories/IStoreRepository.ts`
- `src/repositories/supabase/SupabaseStoreRepository.ts`
- `src/repositories/supabase/SupabaseCategoryRepository.ts`
- `src/useCases/tenant/RegisterTenantUseCase.ts`
- `src/useCases/category/*`
- `src/useCases/product/*`
- `supabase/migrations/20260618000000_init.sql`
- `supabase/migrations/20260702104500_make_product_category_not_null.sql`
- `supabase/migrations/20260702160000_make_subscription_plan_nullable.sql`
- `docs/adr/004-restricao-relacional-produto-categoria.md`
- `docs/adr/005-relacao-1-1-1-identity-tenant.md`

## Comportamento Confirmado
- `tenantId` de store vem de `req.user.id` injetado pelo JWT.
- Criacao de store exige assinatura ativa.
- Trial ativo criado no registro de tenant satisfaz a regra atual de assinatura ativa.
- Criacao impede segunda loja para o mesmo tenant.
- Criacao impede slug duplicado.
- Store criada nasce `active = true`.
- Criacao de store cria categoria padrao `Todos` com `sortOrder = 0`.
- Atualizacao permite alterar slug, nome, horarios, endereco, descricao, logo e WhatsApp.
- Toggle altera `active`.
- Delete faz soft delete, seta `deletedAt`, `updatedAt` e `active = false`.
- Consulta publica por slug retorna store nao deletada e calcula `active = false` em memoria quando estiver fora do horario configurado.

## Interfaces/Fluxos Confirmados
- `POST /api/stores`, protegido.
- `PUT /api/stores/:id`, protegido.
- `PATCH /api/stores/:id/toggle`, protegido.
- `DELETE /api/stores/:id`, protegido.
- `GET /api/stores/:slug`, publico.
- Fluxo compartilhado de onboarding: signup -> login -> tenant -> trial subscription -> store -> categoria `Todos`.
- Vitrine publica complementar existe em `GET /api/categories/store/:storeId` e `GET /api/products/store/:storeId`.

## Persistencia
- `stores.tenant_id` e `UNIQUE`, impondo uma loja por tenant de forma absoluta.
- `stores.slug`, `stores.store_name` e `stores.whatsapp_number` sao unicos no schema.
- `horario_abertura` e `horario_fechamento` estao `NOT NULL` na migration inicial.
- `categories` guarda `store_id`, `tenant_id`, `sort_order` e `deleted_at`.
- FK composta garante consistencia entre store e tenant em categories/products.
- `products.category_id` foi tornado obrigatorio por migration posterior.
- Banco possui triggers de soft delete em cascata de store para categories/products.

## Fora de Escopo
- CRUD de categorias e produtos ficam em seus modulos proprios.
- Product images ficam em `product-images`.
- Pagamento Stripe fica em `subscription`.

## Gaps Reais
- Criacao de store e categoria padrao nao e transacional; falha na categoria apos criar store pode deixar loja sem `Todos`.
- DTO/use case tratam horarios como opcionais/null, mas a migration inicial exige horarios nao nulos.
- Assinatura ativa e apenas `status === active`; nao valida `endsAt`, tenant ativo ou expiracao de trial.
- Conflitos de `store_name` e `whatsapp_number` sao constraints de banco, mas o repository so traduz explicitamente conflito de slug.
- Listagem publica de produtos filtra `deleted_at` no repository, mas nao expressa `available = true` no codigo de aplicacao; a restricao fica na policy RLS.
- Toggle nao valida tipo booleano de `active`.
- Soft delete nao libera recriacao de loja para o mesmo tenant porque `tenant_id` e unico absoluto.
