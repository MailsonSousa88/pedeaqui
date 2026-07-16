# Tenant - Baseline atual / Autoritativo

## Autoridade
- `src/routes/tenant.routes.ts`
- `src/controllers/tenant/TenantController.ts`
- `src/useCases/tenant/RegisterTenantUseCase.ts`
- `src/useCases/tenant/GetTenantUseCase.ts`
- `src/useCases/tenant/UpdateTenantUseCase.ts`
- `src/models/Tenant.ts`
- `src/models/Subscription.ts`
- `src/repositories/ITenantRepository.ts`
- `src/repositories/IProfileRepository.ts`
- `src/repositories/ISubscriptionRepository.ts`
- `src/repositories/supabase/SupabaseTenantRepository.ts`
- `src/dtos/TenantDetailsDTO.ts`
- `supabase/migrations/20260621235900_migrate_tenant_business_document.sql`
- `supabase/migrations/20260622120000_refactor_tenants_fk_to_profiles.sql`
- `supabase/migrations/20260702160000_make_subscription_plan_nullable.sql`
- `docs/adr/002-separacao-dominios-identidade-faturamento.md`
- `docs/adr/005-relacao-1-1-1-identity-tenant.md`

## Comportamento Confirmado
- `POST /api/tenants` exige JWT e usa `req.user.id` como `profileId`.
- Registro aceita documento CPF ou CNPJ como entrada de orquestracao.
- Se o documento for CPF, o use case atualiza `Profile.document` e cria `Tenant.businessDocument = null`.
- Se o documento for CNPJ, o use case cria `Tenant.businessDocument` com CNPJ sanitizado.
- Todo tenant registrado nasce com `status = active`, `photoStorageLimit = 524288000` e `stripeCustomerId = null`.
- Registro de tenant cria tambem uma assinatura trial ativa de 30 dias com `planId = null`.
- `GET /api/tenants/me` retorna detalhes consolidados pela view `v_tenants_details`.
- `PATCH /api/tenants/me` atualiza documento de cobranca por CPF ou CNPJ.

## Interfaces/Fluxos Confirmados
- `POST /api/tenants`, protegido por `authMiddleware`.
- `GET /api/tenants/me`, protegido por `authMiddleware`.
- `PATCH /api/tenants/me`, protegido por `authMiddleware`.
- Fluxo de registro: TenantController -> `RegisterTenantUseCase` -> Tenant/Profile/Subscription repositories.
- Fluxo de leitura: TenantController -> `GetTenantUseCase` -> `SupabaseTenantRepository.getDetails` -> `v_tenants_details`.

## Persistencia
- `tenants.id` referencia `profiles.id`.
- `tenants.business_document` e CNPJ ou `NULL`.
- `tenants.photo_storage_limit` e obrigatorio e maior que zero.
- `subscriptions.plan_id` e nullable para suportar trial automatico.
- `TenantDetailsDTO` expoe `tenantId`, `status`, `businessDocument`, `profileDocument`, `billingDocument`, `photoStorageLimit`, `stripeCustomerId`, `createdAt`, `updatedAt`.

## Fora de Escopo
- Criacao de loja pertence ao modulo `store`.
- Conversao para plano pago pertence ao modulo `subscription`.
- Upload/cota de imagens pertence ao modulo `product-images`.

## Gaps Reais
- `TenantController.register` retorna somente `tenant` e descarta `trialSubscription`.
- `UpdateTenantUseCase` pode gerar `Profile not found`, mas o controller de update nao mapeia esse erro para 404.
- Atualizacao por CPF nao consulta duplicidade antes de salvar; conflitos dependem do banco/repositorio.
- CNPJ duplicado tambem depende de constraint do banco e nao e mapeado explicitamente para 409.
- O modelo `Tenant` permanece puro para CNPJ, mas o use case de tenant faz orquestracao cross-domain com CPF/Profile.
