# FK Tenants Profiles - Estado atual de tarefas

## Concluido no baseline atual
- [x] Renomear `tenants.cpf_cnpj` para `business_document`.
- [x] Permitir `business_document` nulo.
- [x] Limpar CPFs legados da tabela `tenants`.
- [x] Adicionar check de CNPJ com 14 caracteres quando presente.
- [x] Trocar FK de `tenants.id` para `profiles.id`.
- [x] Criar/atualizar `v_tenants_details` com fallback de billing document.

## Gaps reais nao implementados
- [ ] Tratamento explicito de `audit_logs.tenant_id` antes da exclusao de tenants orfaos na migration de FK.
- [ ] Revisao de docs antigas que ainda dizem que tenant referencia diretamente `auth.users`.

## Fora desta rodada
- Alterar schema, migrations ou dados.
