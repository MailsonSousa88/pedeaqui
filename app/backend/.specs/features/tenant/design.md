# Tenant - Design atual / Autoritativo

## Autoridade
- `src/controllers/tenant/TenantController.ts`
- `src/useCases/tenant/RegisterTenantUseCase.ts`
- `src/useCases/tenant/GetTenantUseCase.ts`
- `src/useCases/tenant/UpdateTenantUseCase.ts`
- `src/models/Tenant.ts`
- `src/models/Profile.ts`
- `src/models/Subscription.ts`
- `src/repositories/supabase/SupabaseTenantRepository.ts`
- `docs/adr/002-separacao-dominios-identidade-faturamento.md`
- `docs/adr/005-relacao-1-1-1-identity-tenant.md`

## Camadas Confirmadas
- Route aplica `authMiddleware` e delega ao controller.
- Controller extrai `req.user.id` e `document`.
- Use cases orquestram tenant, profile e subscription.
- Repositories Supabase persistem `tenants`, `profiles` e `subscriptions`.
- Models validam regras intrinsecas: status do tenant, limite de fotos, CNPJ e status de assinatura.

## Fluxos Confirmados
- Register tenant: valida CPF/CNPJ, impede tenant duplicado, exige profile existente, cria tenant e cria trial.
- Get tenant: consulta read model `v_tenants_details`.
- Update tenant: CPF atualiza profile e limpa CNPJ; CNPJ atualiza `businessDocument`.

## Decisoes Confirmadas
- O id do usuario autenticado e reutilizado como id de profile e tenant.
- Trial ativo e criado no onboarding, antes da escolha de plano pago.
- A leitura consolidada de documento de cobranca e feita fora da entidade `Tenant`.

## Gaps Reais
- O registro de tenant e a criacao de trial nao estao protegidos por transacao de aplicacao.
- Erros de unicidade de documentos sao tratados de forma generica em alguns caminhos.
