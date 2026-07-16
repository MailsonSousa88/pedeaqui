# Product Variations and Options Specification

**Status:** Complete
**Feature:** `product-variations-options`
**Created:** 2026-07-05

## Problem Statement

O dominio de Product possui tabelas e models para `product_variations` e `variation_options`, mas nao existe camada de aplicacao para criar, consultar, atualizar ou remover variacoes e opcoes. Hoje o CRUD de produto persiste apenas `products`; qualquer estrutura de variacao enviada no body seria ignorada ou, no maximo, armazenada informalmente em `products.details`, sem usar as tabelas corretas nem preservar regras de dominio.

Esta feature torna variacoes e opcoes subtabelas de produto de primeira classe, testaveis por API e Insomnia, mantendo a separacao Clean Architecture.

## Goals

- [x] Permitir CRUD autenticado de variacoes de produto em `product_variations`.
- [x] Permitir CRUD autenticado de opcoes de variacao em `variation_options`.
- [x] Garantir ownership por tenant a partir do `productId`.
- [x] Permitir listagem manual via Insomnia depois do fluxo `auth -> tenant -> store -> category -> product`.
- [x] Cobrir os novos Use Cases com testes unitarios em fase de exploracao.

## Current Baseline

- `product_variations` e `variation_options` ja existem em `supabase/migrations/20260618000000_init.sql`.
- `ProductVariation` e `VariationOption` ja existem em `src/models`.
- Nao existem repositories de aplicacao para essas tabelas.
- Nao existem DTOs, Use Cases, Controllers ou Routes para essas tabelas.
- `ProductController` e `product.routes.ts` expõem somente create/list/update/delete/toggle de `products`.
- `products.details` nao deve ser usado como substituto para variacoes estruturadas.

## Out of Scope

| Feature | Reason |
| --- | --- |
| Alterar schema das tabelas existentes | As tabelas e constraints basicas ja existem na migration inicial. |
| Criar variacoes junto com `POST /api/products` | Este slice entrega CRUD separado e testavel para subtabelas. |
| Calcular preco final de pedido | `priceModifierCents` sera persistido, mas carrinho/pedido nao existe neste escopo. |
| Estoque por opcao ou SKU | Nao ha tabela ou regra atual para estoque de variacoes. |
| Upload/imagens de produto | Pertence a `.specs/features/product-images`. |
| Hard delete de produto | Product continua com soft delete; variacoes seguem FK/cascade quando o produto for removido fisicamente pelo banco. |

---

## User Stories

### P1: Gerenciar variacoes de um produto ⭐ MVP

**User Story:** Como lojista autenticado, quero criar, listar, atualizar e remover variacoes de um produto para organizar escolhas como tamanho, sabor ou borda.

**Why P1:** `variation_options` depende de uma `product_variation`; sem CRUD de variacoes, opcoes nao sao operaveis por API.

**Acceptance Criteria:**

1. WHEN o lojista criar uma variacao para um produto proprio THEN o sistema SHALL persistir `label` e `sortOrder` em `product_variations`.
2. WHEN o lojista listar variacoes de um produto existente THEN o sistema SHALL retornar somente variacoes daquele `productId`, ordenadas por `sortOrder`.
3. WHEN o lojista atualizar uma variacao propria THEN o sistema SHALL atualizar `label` e/ou `sortOrder`.
4. WHEN o lojista deletar uma variacao propria THEN o sistema SHALL remover a variacao e suas opcoes por cascade do banco.
5. WHEN `label` estiver vazio ou ausente THEN o sistema SHALL rejeitar a operacao com erro de validacao.
6. WHEN o produto nao existir ou nao pertencer ao tenant autenticado THEN o sistema SHALL rejeitar a operacao sem persistir dados.

**Independent Test:** Criar produto pelo fluxo atual, criar variacao via API, listar variacoes por produto, atualizar label/sortOrder e deletar a variacao.

---

### P1: Gerenciar opcoes de uma variacao ⭐ MVP

**User Story:** Como lojista autenticado, quero criar, listar, atualizar e remover opcoes dentro de uma variacao para definir escolhas selecionaveis e modificadores de preco.

**Why P1:** O valor de negocio de uma variacao depende das opcoes vinculadas a ela.

**Acceptance Criteria:**

1. WHEN o lojista criar uma opcao para uma variacao propria THEN o sistema SHALL persistir `value`, `priceModifierCents` e `sortOrder` em `variation_options`.
2. WHEN `priceModifierCents` nao for enviado THEN o sistema SHALL persistir `0`.
3. WHEN `priceModifierCents` for negativo dentro do limite aceito pelo banco THEN o sistema SHALL persistir o valor.
4. WHEN o lojista listar opcoes de uma variacao THEN o sistema SHALL retornar somente opcoes daquela `variationId`, ordenadas por `sortOrder`.
5. WHEN o lojista atualizar uma opcao propria THEN o sistema SHALL atualizar `value`, `priceModifierCents` e/ou `sortOrder`.
6. WHEN o lojista deletar uma opcao propria THEN o sistema SHALL remover somente a opcao alvo.
7. WHEN `value` estiver vazio ou ausente THEN o sistema SHALL rejeitar a operacao com erro de validacao.
8. WHEN `variationId` nao pertencer ao `productId` informado THEN o sistema SHALL rejeitar a operacao sem persistir dados.

**Independent Test:** Criar produto, criar variacao, criar opcao, listar opcoes por variacao, atualizar value/priceModifierCents/sortOrder e deletar a opcao.

---

### P2: Fluxo manual completo no Insomnia

**User Story:** Como desenvolvedor/testador, quero testar variacoes e opcoes via Insomnia para validar manualmente o comportamento depois do CRUD de produto.

**Why P2:** O projeto usa colecao Insomnia para validar manualmente os Use Cases expostos por HTTP.

**Acceptance Criteria:**

1. WHEN a feature estiver implementada THEN a colecao Insomnia SHALL conter requests para CRUD de variacoes.
2. WHEN a feature estiver implementada THEN a colecao Insomnia SHALL conter requests para CRUD de opcoes.
3. WHEN uma variacao for criada via Insomnia THEN o guia SHALL orientar copiar o `id` para uma variavel de ambiente.
4. WHEN uma opcao for criada via Insomnia THEN o guia SHALL orientar copiar o `id` para uma variavel de ambiente.

**Independent Test:** Importar a colecao Insomnia, executar o fluxo ate produto, criar variacao, criar opcao, atualizar/listar/deletar ambos.

---

## API Contract

Rotas aninhadas sob Product, com `authMiddleware` em todas as rotas deste slice:

| Method | Path | Use Case |
| --- | --- | --- |
| `POST` | `/api/products/:productId/variations` | CreateProductVariation |
| `GET` | `/api/products/:productId/variations` | ListProductVariations |
| `PUT` | `/api/products/:productId/variations/:variationId` | UpdateProductVariation |
| `DELETE` | `/api/products/:productId/variations/:variationId` | DeleteProductVariation |
| `POST` | `/api/products/:productId/variations/:variationId/options` | CreateVariationOption |
| `GET` | `/api/products/:productId/variations/:variationId/options` | ListVariationOptions |
| `PUT` | `/api/products/:productId/variations/:variationId/options/:optionId` | UpdateVariationOption |
| `DELETE` | `/api/products/:productId/variations/:variationId/options/:optionId` | DeleteVariationOption |

### Request DTOs

`CreateProductVariation`:

```json
{
  "label": "Tamanho",
  "sortOrder": 0
}
```

`UpdateProductVariation`:

```json
{
  "label": "Tamanho da pizza",
  "sortOrder": 1
}
```

`CreateVariationOption`:

```json
{
  "value": "Grande",
  "priceModifierCents": 500,
  "sortOrder": 0
}
```

`UpdateVariationOption`:

```json
{
  "value": "Grande 35cm",
  "priceModifierCents": 700,
  "sortOrder": 1
}
```

### Response Shape

- Create variation: `201` com a entidade `ProductVariation`.
- List variations: `200` com `ProductVariation[]`.
- Update variation: `200` com a entidade atualizada.
- Delete variation: `204`.
- Create option: `201` com a entidade `VariationOption`.
- List options: `200` com `VariationOption[]`.
- Update option: `200` com a entidade atualizada.
- Delete option: `204`.

## Edge Cases

- WHEN `productId` nao existir THEN system SHALL return `404`.
- WHEN `productId` existir mas pertencer a outro tenant THEN system SHALL return `403` or `404`, sem expor dados de outro tenant.
- WHEN `variationId` nao existir THEN system SHALL return `404`.
- WHEN `variationId` existir mas nao pertencer ao `productId` informado THEN system SHALL return `404` or `409`, sem persistir dados.
- WHEN `optionId` nao existir THEN system SHALL return `404`.
- WHEN `optionId` existir mas nao pertencer ao `variationId` informado THEN system SHALL return `404` or `409`, sem persistir dados.
- WHEN `label` ou `value` forem strings vazias THEN system SHALL return `400`.
- WHEN `priceModifierCents` for menor ou igual ao limite absurdo bloqueado pelo banco (`<= -1000000`) THEN system SHALL return `400`.
- WHEN `sortOrder` nao for enviado THEN system SHALL default to `0`.
- WHEN uma variacao for deletada THEN system SHALL rely on `ON DELETE CASCADE` para remover opcoes vinculadas.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| --- | --- | --- | --- |
| PVAR-01 | P1: Gerenciar variacoes | Tasks | Mapped to T1, T2, T4, T12, T14, T16 |
| PVAR-02 | P1: Gerenciar variacoes | Tasks | Mapped to T2, T5, T12, T14, T16 |
| PVAR-03 | P1: Gerenciar variacoes | Tasks | Mapped to T2, T6, T12, T14, T16 |
| PVAR-04 | P1: Gerenciar variacoes | Tasks | Mapped to T2, T7, T12, T14, T16 |
| PVAR-05 | P1: Gerenciar opcoes | Tasks | Mapped to T1, T3, T8, T13, T14, T16 |
| PVAR-06 | P1: Gerenciar opcoes | Tasks | Mapped to T3, T8, T9, T13, T14, T16 |
| PVAR-07 | P1: Gerenciar opcoes | Tasks | Mapped to T3, T10, T11, T13, T14, T16 |
| PVAR-08 | P1: Gerenciar opcoes | Tasks | Mapped to T8, T9, T10, T11, T13, T14, T16 |
| PVAR-09 | P2: Fluxo manual Insomnia | Tasks | Mapped to T15, T16 |
| PVAR-10 | Cross-cutting: ownership e Clean Architecture | Tasks | Mapped to T1-T14, T16 |

**Coverage:** 10 total, 10 mapped to tasks, 0 pending tasks.

## Success Criteria

- [x] Lojista consegue criar/listar/atualizar/deletar variacoes de um produto proprio.
- [x] Lojista consegue criar/listar/atualizar/deletar opcoes de uma variacao propria.
- [x] Use Cases novos possuem testes unitarios com mocks de repositories.
- [x] Nenhuma camada de Use Case importa Express ou Supabase SDK.
- [x] Repositories sao a unica camada nova que acessa Supabase.
- [x] Colecao Insomnia cobre o fluxo manual de variacoes e opcoes.
