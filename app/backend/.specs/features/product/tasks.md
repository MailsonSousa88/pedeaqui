# Product Tasks

**Status:** Pendencias reais apos rebaseline
**Fonte:** `.specs/features/product/spec.md`

## Pendencias

- [ ] **PROD-T1: Decidir politica de `findById` para soft-deleted**
  - **Requisito:** PROD-07
  - **Escopo:** Definir se `findById` de produto deve ignorar `deleted_at IS NOT NULL` ou se cada use case deve bloquear explicitamente produtos deletados.
  - **Criterio verificavel:** A decisao aparece na spec/design e existe teste unitario cobrindo update/delete/toggle de produto soft-deleted conforme a politica escolhida.

- [ ] **PROD-T2: Contrato explicito para `available` no update**
  - **Requisito:** PROD-08
  - **Escopo:** Confirmar se `available` pode ser enviado em `IUpdateProductDTO` ou se somente `ToggleProductAvailabilityUseCase` altera disponibilidade.
  - **Criterio verificavel:** DTO, use case, controller e testes unitarios refletem a decisao sem ambiguidade.

- [ ] **PROD-T3: Elevar coverage de Product use cases para 95%**
  - **Requisito:** PROD-10
  - **Escopo:** Cobrir branches faltantes em `CreateProductUseCase` e `UpdateProductUseCase`.
  - **Criterio verificavel:** Coverage de `src/useCases/product` fica >= 95% em statements, branches, functions e lines.

- [ ] **PROD-T4: Corrigir script unitario**
  - **Requisito:** PROD-11
  - **Escopo:** Ajustar `test:unit` para executar unitarios sem `*.integration.spec.ts` e sem `src/app.spec.ts`, gerando coverage.
  - **Criterio verificavel:** `npm run test:unit -- --runInBand` passa neste ambiente sem erro `listen EPERM`.

- [ ] **PROD-T5: Sincronizar documentacao de banco**
  - **Requisito:** PROD-09
  - **Escopo:** Atualizar docs que ainda declaram `products.category_id` como nullable.
  - **Criterio verificavel:** Busca por `category_id` em docs nao contradiz a ADR 004 nem a migration `20260702104500_make_product_category_not_null.sql`.
