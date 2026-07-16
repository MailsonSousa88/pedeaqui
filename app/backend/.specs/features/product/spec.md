# Product Spec

**Status:** Baseline atual / Autoritativo
**Data do rebaseline:** 2026-07-05

## Autoridade

Esta especificacao substitui a versao historica em `legacy/spec.legacy.md`.
A ordem de autoridade para Product e:
1. ADRs aceitos e migrations aplicadas.
2. Codigo atual em `src/models`, `src/useCases` e `src/repositories`.
3. Testes unitarios passando.
4. Specs antigas apenas como contexto historico.

## Comportamento Confirmado

- `Product.categoryId` e obrigatorio no dominio e no DTO de criacao.
- A migration `20260702104500_make_product_category_not_null.sql` altera `products.category_id` para `NOT NULL` e recria a FK com `ON DELETE RESTRICT`.
- `CreateProductUseCase` valida que a loja pertence ao tenant e que a categoria existe, pertence a mesma loja e nao esta soft-deleted.
- `Product` valida nome obrigatorio, `priceCents > 0`, `promoPriceCents > 0`, promocao menor que o preco base e `promoEndsAt` somente quando existe preco promocional.
- `SupabaseProductRepository.findByStoreId`, `findByCategoryId` e `countActiveByCategoryId` filtram `deleted_at IS NULL`.
- `DeleteProductUseCase` usa `IProductRepository.softDelete`, que preenche `deleted_at`.
- `ToggleProductAvailabilityUseCase` inverte `available` usando `IProductRepository.toggleAvailability`.
- `ProductController` e `product.routes.ts` expõem create, list, update, delete e toggle com `authMiddleware` nas rotas mutaveis.

## Requisitos

| ID | Requisito | Status |
| --- | --- | --- |
| PROD-01 | Todo produto deve pertencer a uma loja, tenant e categoria obrigatoria. | Confirmado |
| PROD-02 | Criacao de produto deve bloquear tenant sem ownership da loja ou categoria invalida/deletada. | Confirmado |
| PROD-03 | Produto deve preservar integridade de preco e promocao. | Confirmado |
| PROD-04 | Listagens convencionais de produtos devem ocultar registros soft-deleted. | Confirmado |
| PROD-05 | Exclusao de produto deve ser soft delete via `deleted_at`. | Confirmado |
| PROD-06 | Disponibilidade pode ser alternada sem apagar o produto. | Confirmado |
| PROD-07 | Politica de `findById` para registros soft-deleted deve ser explicita e consistente entre update/delete/toggle. | Gap |
| PROD-08 | Atualizacao normal de produto deve aceitar ou rejeitar `available` por contrato explicito. | Gap |
| PROD-09 | Documentacao de banco deve declarar `products.category_id` como `NOT NULL`. | Gap |
| PROD-10 | Cobertura de use cases de Product deve respeitar 95% em lines, statements, branches e functions. | Gap |
| PROD-11 | O script `test:unit` deve executar apenas unitarios e gerar coverage sem abrir listeners Supertest. | Gap |

## Fora de Escopo

- Upload ou persistencia de imagens de produto. Use `.specs/features/product-images`.
- Variacoes e opcionais complexos.
- Hard delete de produto.
- Alterar a ADR 004 sem nova ADR aprovada.

## Gaps Reais

- `IUpdateProductDTO` nao possui `available`; hoje a disponibilidade e alterada pelo use case de toggle, nao pelo update comum.
- `SupabaseProductRepository.findById` nao filtra `deleted_at`, entao use cases que dependem dele precisam de politica explicita para registros soft-deleted.
- `docs/DATABASE.md` ainda descreve `products.category_id` como nullable.
- Coverage unitario atual do modulo Product esta abaixo de 95% em statements e branches.
- O script `test:unit` atual nao e a fonte confiavel de coverage unitario neste ambiente.
