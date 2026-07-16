# Product Images - Estado atual de tarefas

## Concluido no baseline atual
- [x] Tabela `product_images` existe no schema.
- [x] Campos de metadata R2 existem no banco: `r2_key`, `url`, `size_bytes`, `mime_type`, `sort_order`.
- [x] Indices por produto e por tamanho existem.
- [x] RLS de ownership/leitura publica existe.
- [x] Entidade `ProductImage` existe.
- [x] `Tenant.photoStorageLimit` existe.
- [x] Testes de entidade para `ProductImage` existem.

## Gaps reais nao implementados
- [ ] Repository de product images.
- [ ] Use cases de autorizacao, registro e listagem.
- [ ] Rotas e controller de product images.
- [ ] Calculo de uso de armazenamento por tenant.
- [ ] Revalidacao de cota no registro de metadata.
- [ ] Validacao de `sizeBytes` e `mimeType` na entidade ou no use case.

## Fora desta rodada
- Qualquer implementacao de upload ou metadata.
- Qualquer dependencia R2/S3.
- `design.md` autoritativo novo: nao criado porque nao ha fluxo/camadas de aplicacao implementadas para product images.
