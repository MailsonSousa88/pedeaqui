# Store - Estado atual de tarefas

## Concluido no baseline atual
- [x] Criar store autenticada.
- [x] Exigir subscription ativa para criar store.
- [x] Impedir segunda loja por tenant.
- [x] Impedir slug duplicado.
- [x] Criar categoria padrao `Todos`.
- [x] Atualizar store com ownership.
- [x] Toggle de disponibilidade.
- [x] Soft delete.
- [x] Consulta publica por slug.
- [x] Testes unitarios de use cases de store existentes.

## Gaps reais nao implementados
- [ ] Transacao para criar store e categoria padrao atomicamente.
- [ ] Alinhar horarios opcionais da aplicacao com schema ou schema com aplicacao.
- [ ] Validar expiracao real de assinatura/trial antes de permitir criacao.
- [ ] Mapear conflitos de `store_name` e `whatsapp_number` para resposta especifica.
- [ ] Validar `active` como boolean no toggle.
- [ ] Cobrir cascata de soft delete em teste apropriado quando a fase permitir.

## Fora desta rodada
- Alterar codigo, banco ou testes.
- Reescrever specs de `category` e `product`.
