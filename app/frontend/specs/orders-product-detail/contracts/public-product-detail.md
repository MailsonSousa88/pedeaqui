# Contrato frontend: detalhe público do produto

## Objetivo

Registrar a composição temporária dos contratos públicos existentes usados pela tela de detalhe, sem criar ou alterar backend.

## Entrada de rota

```text
/lojas/:storeSlug/produtos/:productId
```

- `storeSlug`: slug público da loja.
- `productId`: identificador do produto a localizar dentro da loja.

## Consultas

### Loja pública

```http
GET /api/stores/:slug
```

Campos consumidos:

```ts
type PublicStoreDto = {
  id: string
  slug: string
  storeName: string
  active: boolean
}
```

### Produtos públicos da loja

```http
GET /api/products/store/:storeId
```

Resposta esperada conforme campos documentados nas escritas e regras públicas:

```ts
type PublicProductDto = {
  id: string
  storeId: string
  categoryId: string
  name: string
  description?: string | null
  priceCents: number
  promoPriceCents?: number | null
  promoEndsAt?: string | null
  details?: Record<string, unknown> | null
  available: boolean
}
```

O endpoint não documenta campo de imagem. A feature não deve presumir `imageUrl`, `images` ou qualquer equivalente.

### Categorias públicas da loja

```http
GET /api/categories/store/:storeId
```

Campos consumidos:

```ts
type PublicCategoryDto = {
  id: string
  name: string
}
```

## Composição

1. Buscar a loja usando `storeSlug`.
2. Usar `store.id` para buscar produtos e categorias em paralelo.
3. Localizar o item em que `product.id === productId`.
4. Confirmar também `product.storeId === store.id`.
5. Resolver categoria em que `category.id === product.categoryId`, quando existir.
6. Produto ausente ou com vínculo divergente resulta em conteúdo indisponível, não em produto mockado.

## Promoção

Uma promoção é vigente somente quando:

- `promoPriceCents` é inteiro positivo;
- `promoPriceCents < priceCents`;
- `promoEndsAt` está ausente ou representa uma data futura.

Promoção expirada ou inválida exibe apenas `priceCents`.

## Imagens

- Nesta entrega, a página apresenta três posições de placeholder visual neutro.
- Não são feitas requisições de imagem nem usados endereços fixos.
- Imagens reais dependem de futura atualização explícita deste contrato.

## Falhas

- Falha HTTP ou de rede: estado de erro com nova tentativa.
- Loja inexistente/inativa conforme resposta pública: conteúdo indisponível.
- Produto inexistente, removido ou de outra loja: conteúdo indisponível.
- Categoria ausente: omitir categoria sem falhar a página.
- Produto indisponível: manter dados visíveis e impedir ação de compra.
