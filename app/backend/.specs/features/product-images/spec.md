# Product Images - Baseline atual / Autoritativo

## Autoridade
- `src/models/ProductImage.ts`
- `src/models/Tenant.ts`
- `src/models/__tests__/models.spec.ts`
- `supabase/migrations/20260618000000_init.sql`
- `docs/DATABASE.md`
- `docs/Database_Architecture_Panorama.md`
- `docs/adr/002-separacao-dominios-identidade-faturamento.md`
- `docs/adr/004-restricao-relacional-produto-categoria.md`
- `package.json`

## Comportamento Confirmado
- Existe entidade `ProductImage` em TypeScript.
- A entidade valida apenas `url` e `r2Key` nao vazios.
- Existe tabela `product_images` no banco.
- `Tenant` possui `photoStorageLimit` e valida que o limite e maior que zero.
- A documentacao de banco afirma que cota de imagens deve ser bloqueada no backend, nao pelo banco.
- Nao ha fluxo backend implementado para autorizar upload, registrar metadata ou listar imagens.

## Interfaces/Fluxos Confirmados
- Nenhuma rota HTTP de product images esta implementada.
- Nenhum controller de product images esta implementado.
- Nenhum use case de product images esta implementado.
- Nenhum repository de product images esta implementado.
- O fluxo de produto existente nao lista nem persiste imagens.

## Persistencia
- `product_images` possui `id`, `product_id`, `r2_key`, `url`, `size_bytes`, `mime_type`, `sort_order`, `created_at`.
- `product_id` referencia `products(id)` com `ON DELETE CASCADE`.
- `r2_key` e `url` sao unicos.
- `size_bytes` tem check `> 0`.
- Existem indices `idx_product_images_product` e `idx_product_images_product_size`.
- RLS permite acesso autenticado por ownership via produto e leitura publica de imagens de produtos disponiveis e nao deletados.
- Nao ha bucket, SDK R2/S3, multer, sharp ou provider de storage configurado no backend Node.

## Fora de Escopo
- Upload binario pelo backend.
- Geracao de URL preassinada pelo backend.
- Implementacao de repository/use case/controller nesta rodada.

## Gaps Reais
- Falta `IProductImageRepository` e implementacao Supabase.
- Falta use case para autorizacao/cota de upload.
- Falta use case para registro de metadata.
- Falta use case para listagem de imagens.
- Falta controller e rotas HTTP.
- Falta calculo implementado de uso por tenant com `product_images.size_bytes`.
- Falta revalidacao de cota no registro de metadata.
- `ProductImage` nao valida `sizeBytes > 0` nem `mimeType`; essa validacao existe apenas no banco para `size_bytes`.
- Nao ha teste unitario de use case de product images porque nao ha use case implementado.
