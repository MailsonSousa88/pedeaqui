# Tenant - Estado atual de tarefas

## Concluido no baseline atual
- [x] Registro de tenant autenticado.
- [x] Separacao de CPF em `Profile` e CNPJ em `Tenant`.
- [x] Criacao de assinatura trial ativa no registro.
- [x] Leitura consolidada por `GET /api/tenants/me`.
- [x] Atualizacao de documento por `PATCH /api/tenants/me`.
- [x] Testes unitarios de use cases de tenant existentes.

## Gaps reais nao implementados
- [ ] Retornar ou documentar explicitamente a assinatura trial no response de registro.
- [ ] Mapear `Profile not found` no update para 404.
- [ ] Validar duplicidade de CPF/CNPJ antes do update ou mapear constraints para 409.
- [ ] Garantir atomicidade entre criacao de tenant e trial.

## Fora desta rodada
- Alterar contrato HTTP.
- Alterar persistencia ou migrations.
