# Product Design Baseline

**Spec:** `.specs/features/product/spec.md`
**Status:** Baseline atual / Autoritativo

## Arquitetura Atual

Fluxo de requisicao:
`product.routes.ts` -> `authMiddleware` quando aplicavel -> `ProductController` -> use case -> repository -> Supabase.

O modulo preserva Clean Architecture:
- Controllers extraem HTTP e montam respostas.
- Use cases coordenam regras de aplicacao sem SDK do Supabase.
- Repositories sao a unica camada do modulo Product que importa o client Supabase.
- `Product` e entidade TypeScript sem dependencia externa.

## Componentes Confirmados

| Componente | Local | Responsabilidade atual |
| --- | --- | --- |
| `Product` | `src/models/Product.ts` | Regras estruturais de categoria obrigatoria, nome, preco e promocao. |
| `IProductRepository` | `src/repositories/IProductRepository.ts` | Contrato de busca, listagem, contagem ativa, create, update, toggle e soft delete. |
| `SupabaseProductRepository` | `src/repositories/supabase/SupabaseProductRepository.ts` | Mapeia Product para `products` e aplica filtros ativos em listagens/contagens. |
| `CreateProductUseCase` | `src/useCases/product/CreateProductUseCase.ts` | Valida ownership da loja e categoria ativa da mesma loja antes de criar. |
| `UpdateProductUseCase` | `src/useCases/product/UpdateProductUseCase.ts` | Atualiza campos editaveis e revalida categoria/preco/promocao. |
| `ListProductsUseCase` | `src/useCases/product/ListProductsUseCase.ts` | Lista produtos de uma loja existente. |
| `DeleteProductUseCase` | `src/useCases/product/DeleteProductUseCase.ts` | Aplica soft delete por repositorio apos checar tenant. |
| `ToggleProductAvailabilityUseCase` | `src/useCases/product/ToggleProductAvailabilityUseCase.ts` | Alterna `available` apos checar tenant. |

## Persistencia

- `products.category_id` e obrigatorio pela migration `20260702104500_make_product_category_not_null.sql`.
- A FK de categoria usa `ON DELETE RESTRICT`; exclusao fisica nao e parte do fluxo do modulo.
- Soft delete usa `products.deleted_at`.
- Listagens e contagens ativas usam `deleted_at IS NULL`.

## Pontos de Decisao Pendentes

- Definir se `findById` deve retornar registros soft-deleted ou se o filtro deve ficar no repository.
- Definir se `available` pode ser alterado por `UpdateProductUseCase` ou somente pelo toggle dedicado.
- Corrigir o comando unitario para refletir a politica de testes da fase exploratoria.
