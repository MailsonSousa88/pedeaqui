# Product Detail Specification

**Status:** Implemented / Manual validation pending
**Feature:** `product-detail`
**Created:** 2026-07-15

## Problem Statement

A vitrine publica hoje lista produtos por loja, mas nao possui uma leitura de um produto especifico com as informacoes necessarias para uma pagina de detalhe. O lojista autenticado tambem nao possui uma leitura equivalente para abrir a pagina de edicao e decidir a disponibilidade do produto.

As variacoes, opcoes e imagens sao subtabelas do produto. O frontend precisa recebe-las em um payload agregado para renderizar a escolha de opcoes e aplicar um placeholder quando nao houver imagem, sem depender das rotas privadas de CRUD de variacoes.

## Goals

- [ ] Expor detalhe publico de um produto visivel na vitrine, com imagens, variacoes e opcoes agregadas.
- [ ] Expor detalhe privado do mesmo agregado para o lojista proprietario, inclusive quando o produto estiver indisponivel.
- [ ] Preservar as regras de visibilidade publica, ownership por tenant e soft delete.
- [ ] Manter upload, exclusao e ordenacao administrativa de imagens fora deste slice.

## Out of Scope

| Feature | Reason |
| --- | --- |
| Upload, remocao ou edicao de imagens | A feature entrega somente leitura; o fluxo de gestao de imagens continua em `product-images`. |
| Criar ou editar variacoes e opcoes | O CRUD autenticado ja e entregue por `product-variations-options`. |
| Calcular preco final pelas opcoes | O cliente recebe `priceCents` e `priceModifierCents`; carrinho/pedido nao pertence a este escopo. |
| Alterar o toggle de disponibilidade | O endpoint atual permanece como a unica escrita de `available`. |
| Expor rotas publicas separadas de variacoes ou opcoes | O detalhe agregado substitui essa necessidade para a pagina de vitrine. |
| Expor produto soft-deleted | Produtos removidos permanecem ocultos nos dois contextos. |

---

## User Stories

### P1: Abrir produto na vitrine ⭐ MVP

**User Story:** Como cliente da vitrine, quero abrir um produto e visualizar seus dados, imagens, variacoes e opcoes para decidir o que selecionar.

**Why P1:** A listagem atual nao fornece o agregado necessario para a pagina de produto nem pode reutilizar as rotas autenticadas de variacoes.

**Acceptance Criteria:**

1. WHEN o cliente requisitar `GET /api/products/public/:productId` para um produto publicamente visivel THEN o sistema SHALL retornar `200` com o agregado de detalhe publico.
2. WHEN o produto nao existir, estiver indisponivel, soft-deleted ou nao for elegivel para leitura publica THEN o sistema SHALL retornar `404` sem distinguir a causa.
3. WHEN o produto possuir imagens THEN o sistema SHALL retornar `images` ordenado por `sortOrder` crescente.
4. WHEN o produto nao possuir imagens THEN o sistema SHALL retornar `images: []`, permitindo ao frontend aplicar uma imagem padrao.
5. WHEN o produto possuir variacoes e opcoes THEN o sistema SHALL retornar `variations` e cada lista de `options` ordenadas por `sortOrder` crescente.
6. WHEN o detalhe for publico THEN o sistema SHALL omitir `tenantId`, `deletedAt`, `r2Key` e qualquer outro dado administrativo ou interno de storage.

**Independent Test:** Com um produto publico existente, chamar a rota sem token e conferir produto, imagens, variacoes e opcoes. Repetir para produto indisponivel e obter `404`.

---

### P1: Abrir produto para edicao do lojista ⭐ MVP

**User Story:** Como lojista autenticado, quero abrir o detalhe completo de um produto proprio para preencher a pagina de edicao e consultar seu estado de disponibilidade.

**Why P1:** A interface do lojista precisa do mesmo agregado de catalogo, inclusive para um produto ainda indisponivel, antes de acionar o toggle existente.

**Acceptance Criteria:**

1. WHEN o lojista requisitar `GET /api/products/:productId` com token valido para produto do seu tenant THEN o sistema SHALL retornar `200` com o agregado de detalhe privado.
2. WHEN o produto existir e estiver indisponivel, mas pertencer ao tenant autenticado THEN o sistema SHALL retorná-lo com `available: false`.
3. WHEN o produto nao existir, estiver soft-deleted ou pertencer a outro tenant THEN o sistema SHALL retornar `404`.
4. WHEN o lojista usar o endpoint de toggle ja existente e consultar novamente o detalhe THEN o sistema SHALL refletir o novo valor de `available`.
5. WHEN o produto nao possuir imagens, variacoes ou opcoes THEN o sistema SHALL retornar os respectivos arrays vazios.

**Independent Test:** Autenticar como proprietario, obter detalhe de produto indisponivel, executar o toggle e confirmar a alteracao em nova leitura; repetir a leitura com tenant diferente e obter `404`.

---

## API Contract

| Context | Method | Path | Authentication | Response |
| --- | --- | --- | --- | --- |
| Vitrine | `GET` | `/api/products/public/:productId` | Nenhuma | `200` com `PublicProductDetail` |
| Lojista | `GET` | `/api/products/:productId` | `authMiddleware` | `200` com `MerchantProductDetail` |

As duas respostas compartilham o seguinte formato. O detalhe publico deve omitir campos administrativos; o detalhe privado deve conter apenas campos necessarios para a pagina de produto e edicao, sem dados internos de storage.

```json
{
  "id": "uuid",
  "storeId": "uuid",
  "categoryId": "uuid",
  "name": "Pizza Especial",
  "description": "Molho, mussarela e tomate",
  "priceCents": 4990,
  "promoPriceCents": 4490,
  "promoEndsAt": "2026-07-31T23:59:59.000Z",
  "details": {},
  "available": true,
  "images": [
    { "id": "uuid", "url": "https://...", "sortOrder": 0 }
  ],
  "variations": [
    {
      "id": "uuid",
      "label": "Tamanho",
      "sortOrder": 0,
      "options": [
        { "id": "uuid", "value": "Grande", "priceModifierCents": 500, "sortOrder": 0 }
      ]
    }
  ],
  "createdAt": "2026-07-15T12:00:00.000Z",
  "updatedAt": "2026-07-15T12:00:00.000Z"
}
```

`description`, `promoPriceCents` e `promoEndsAt` podem ser `null`. `images`, `variations` e `options` sao sempre arrays. Os codigos de erro sao `404` para recursos nao visiveis ou nao encontrados e `401` quando a rota privada nao receber autenticacao valida.

---

## Edge Cases

- WHEN uma imagem, variacao ou opcao estiver ausente THEN o sistema SHALL retornar apenas os elementos persistidos, mantendo os arrays correspondentes vazios quando necessario.
- WHEN houver duas imagens, variacoes ou opcoes com o mesmo `sortOrder` THEN o sistema SHALL aplicar ordenacao estavel por identificador como desempate.
- WHEN uma variacao nao tiver opcoes THEN o sistema SHALL inclui-la com `options: []`.
- WHEN `productId` nao for um identificador valido THEN o sistema SHALL retornar `404` sem consultar ou expor outro produto.
- WHEN uma loja ou tenant deixar de estar ativo para a politica publica THEN o sistema SHALL ocultar o produto da rota publica.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| --- | --- | --- | --- |
| PDET-01 | P1: Abrir produto na vitrine | Execute | Implemented |
| PDET-02 | P1: Abrir produto na vitrine | Execute | Implemented |
| PDET-03 | P1: Abrir produto na vitrine | Execute | Implemented |
| PDET-04 | P1: Abrir produto para edicao do lojista | Execute | Implemented |
| PDET-05 | P1: Abrir produto para edicao do lojista | Execute | Implemented |
| PDET-06 | Cross-cutting: payload agregado, Clean Architecture e testes | Execute | Implemented |

**Coverage:** 6 total, 6 mapped to completed tasks, 0 pending tasks.

## Success Criteria

- [ ] A vitrine abre produto publico com imagens, variacoes e opcoes em uma unica requisicao (aguarda migration aplicada e validacao manual).
- [ ] O frontend pode aplicar placeholder sem tratar ausencia de campo de imagens (aguarda validacao manual).
- [ ] O lojista consulta produto proprio, inclusive indisponivel, e visualiza o resultado do toggle existente (aguarda validacao manual).
- [x] Nenhum dado de tenant, soft delete ou chave interna de storage e exposto publicamente.
- [x] Os novos Use Cases possuem testes unitarios com repositories mockados e preservam a cobertura minima de 95% da camada de Use Cases.
- [x] A colecao Insomnia cobre as duas leituras de detalhe.
