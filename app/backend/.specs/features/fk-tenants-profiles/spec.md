# FK Tenants Profiles - Baseline atual / Autoritativo

## Autoridade
- `supabase/migrations/20260621235900_migrate_tenant_business_document.sql`
- `supabase/migrations/20260622120000_refactor_tenants_fk_to_profiles.sql`
- `docs/adr/002-separacao-dominios-identidade-faturamento.md`
- `docs/adr/005-relacao-1-1-1-identity-tenant.md`
- `docs/DATABASE.md`
- `src/dtos/TenantDetailsDTO.ts`
- `src/repositories/supabase/SupabaseTenantRepository.ts`

## Comportamento Confirmado
- O estado final pretendido pelo banco e `auth.users -> profiles -> tenants`.
- `tenants.id` referencia `profiles(id)` com `ON DELETE CASCADE`.
- `tenants.business_document` substitui o campo legado `cpf_cnpj`.
- CPFs legados em `tenants.business_document` sao migrados para `NULL`.
- `v_tenants_details` consolida dados do tenant e profile.
- `billing_document` e calculado por `COALESCE(t.business_document, p.document)`.

## Interfaces/Fluxos Confirmados
- `GetTenantUseCase` usa `ITenantRepository.getDetails`.
- `SupabaseTenantRepository.getDetails` le `v_tenants_details`.
- A API exposta para leitura consolidada e `GET /api/tenants/me`.

## Persistencia
- `business_document` aceita CNPJ com 14 caracteres ou `NULL`.
- `profile_document` vem de `profiles.document`.
- `v_tenants_details` usa `INNER JOIN` na migration final.
- ADR 005 mantem a invariante pratica `auth.user.id === profile.id === tenant.id`.

## Fora de Escopo
- Multiusuario por tenant.
- Multitenancy com tenant id autonomo separado de profile id.

## Gaps Reais
- A migration de troca de FK apaga tenants orfaos, mas nao trata previamente `audit_logs.tenant_id`; pode falhar se existir audit log apontando para tenant orfao.
- `docs/DATABASE.md` ainda contem trecho inicial dizendo que tenant mapeia diretamente para `auth.users.id`, embora secoes posteriores e ADRs apontem para `profiles.id`.
