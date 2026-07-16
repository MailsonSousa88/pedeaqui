# FK Tenants Profiles - Design atual / Autoritativo

## Autoridade
- `supabase/migrations/20260621235900_migrate_tenant_business_document.sql`
- `supabase/migrations/20260622120000_refactor_tenants_fk_to_profiles.sql`
- `docs/adr/002-separacao-dominios-identidade-faturamento.md`
- `docs/adr/005-relacao-1-1-1-identity-tenant.md`

## Design Confirmado
- `Profile` representa pessoa fisica e CPF.
- `Tenant` representa entidade comercial e CNPJ opcional.
- A relacao fisica atual e 1:1:1 por id compartilhado.
- A integracao entre contextos ocorre por read model de banco: `v_tenants_details`.

## Fluxo de Dados Confirmado
1. Auth cria usuario.
2. Signup cria profile com mesmo id.
3. Tenant registration cria tenant com mesmo id do profile.
4. Leitura de tenant usa view para expor `businessDocument`, `profileDocument` e `billingDocument`.

## Decisoes Confirmadas
- O dominio `Tenant` nao armazena CPF.
- O fallback CPF para cobranca nao entra na entidade `Tenant`; fica na view.
- CNPJ comercial e opcional no banco para suportar fallback por CPF.

## Gaps Reais
- A migration final nao implementa uma etapa defensiva para limpar ou nulificar `audit_logs.tenant_id` antes de apagar tenants orfaos.
