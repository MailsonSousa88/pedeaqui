# Contrato frontend: cadastro de produto

## Objetivo

Registrar os contratos externos usados pela feature `store-add-product` para carregar categorias reais, criar uma categoria inline, cadastrar um produto e atualizar a coleção exibida, sem criar ou alterar endpoints backend.

## Fonte

- `docs/records/backend/01-rotas-e-payloads.md`, revisado contra a branch `development` em 16/07/2026.
- Evolução de persistência real registrada em `spec.md`, `plan.md` e `tasks.md` desta feature.

## Autenticação e contexto

As operações de escrita exigem:

```http
Authorization: Bearer <accessToken>
Content-Type: application/json
```

- `storeId` deve vir da loja real carregada na storefront de gestão.
- O token deve vir da sessão autenticada compartilhada.
- O frontend não deve fixar IDs, criar tenant ou descobrir loja por dados mockados.

## Listar categorias da loja

```http
GET /api/categories/store/:storeId
Accept: application/json
```

- Rota pública e sem body.
- Retorna categorias não excluídas, ordenadas por `sortOrder`.
- A elegibilidade pública da loja e do tenant é aplicada pelo backend/RLS.
- O registro de rotas não detalha um DTO completo de resposta; campos adicionais não devem ser inventados pelo frontend.

Campos mínimos consumidos:

```ts
type ProductCategoryDto = {
  id: string
  storeId: string
  name: string
  description?: string | null
  sortOrder: number
}
```

## Criar categoria inline

```http
POST /api/categories
Authorization: Bearer <accessToken>
Content-Type: application/json
```

Payload:

```ts
type CreateCategoryRequest = {
  storeId: string
  name: string
  description?: string
  sortOrder?: number
}
```

Exemplo:

```json
{
  "storeId": "uuid-da-loja",
  "name": "Bebidas",
  "description": "Sucos, refrigerantes e águas",
  "sortOrder": 1
}
```

Regras externas:

- A loja deve existir.
- A loja deve pertencer ao tenant autenticado.
- A categoria criada deve ser selecionada pelo formulário somente após sucesso da API.
- Esta operação pertence ao fluxo inline de cadastro de produto, não à tela `store-categories`.

## Criar produto

```http
POST /api/products
Authorization: Bearer <accessToken>
Content-Type: application/json
```

Payload suportado:

```ts
type CreateProductRequest = {
  storeId: string
  categoryId: string
  name: string
  description?: string
  priceCents: number
  promoPriceCents?: number
  promoEndsAt?: string
  details?: Record<string, unknown>
  available?: boolean
}
```

Exemplo:

```json
{
  "storeId": "uuid-da-loja",
  "categoryId": "uuid-da-categoria",
  "name": "X-Burger",
  "description": "Pão, carne, queijo e molho",
  "priceCents": 2990,
  "promoPriceCents": 2490,
  "promoEndsAt": "2026-07-31T23:59:59.000Z",
  "details": {},
  "available": true
}
```

Campos obrigatórios no backend:

- `storeId`;
- `categoryId`;
- `name`;
- `priceCents`.

Regras externas:

- A loja deve pertencer ao tenant autenticado.
- A categoria deve existir, pertencer à mesma loja e não estar excluída.
- `priceCents` deve ser maior que zero.
- `promoPriceCents`, quando enviado, deve ser maior que zero e menor que `priceCents`.
- `promoEndsAt` só pode ser enviado junto de `promoPriceCents`.
- `available` assume `true` quando omitido.

### Compatibilidade com a categoria `Todos`

Embora a regra de interface trate `Todos` como sistêmica e implícita, o backend exige `categoryId` para criar produto. A loja recebe uma categoria `Todos` real quando é criada. Portanto:

- se o lojista selecionar uma categoria específica, enviar o ID real dessa categoria;
- se não selecionar categoria específica, enviar o ID real da categoria `Todos` retornada por `GET /api/categories/store/:storeId`;
- nunca enviar `null`, omitir `categoryId` ou inventar um ID para representar `Todos`.

## Atualizar a coleção após sucesso

```http
GET /api/products/store/:storeId
Accept: application/json
```

- Rota pública e sem body.
- Retorna produtos publicamente visíveis da loja.
- O frontend pode inserir imediatamente a resposta criada na coleção local ou recarregar esta rota, conforme a orquestração já definida no hook.
- A listagem pública pode não devolver um produto criado como indisponível; esse estado não deve ser mascarado com item mockado.

## Falhas

- Falha de validação: manter o modal aberto e associar mensagens compreensíveis aos campos quando possível.
- Loja ou categoria incompatível: não repetir a requisição com IDs alternativos inventados.
- Falha HTTP/RLS: preservar os dados preenchidos e permitir nova tentativa segura.
- Mensagens técnicas, políticas RLS, IDs internos e stack traces não devem aparecer diretamente na interface.

## Fora deste contrato

- Upload e persistência de imagens.
- Criação de variações e opções.
- Estoque ou quantidade inicial.
- Destaque de produto.
- Edição, remoção ou alternância de disponibilidade.
- Alterações em backend, banco, Supabase ou RLS.

