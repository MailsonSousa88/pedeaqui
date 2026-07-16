# Contrato externo: listagem pública de lojas

## Endpoint

```http
GET /api/stores/public
Accept: application/json
```

- Autenticação: não exige Bearer token.
- Corpo da requisição: não possui.
- Query parameters: não possui no backend atual.
- Resposta de sucesso: `200 OK` com array JSON.
- Paginação: não existe no contrato atual.

## Item retornado

```ts
type PublicStoreListItemDto = {
  id: string
  tenantId: string
  slug: string
  storeName: string
  horarioAbertura: string | null
  horarioFechamento: string | null
  endereco: string
  city: string
  state: string
  descricao: string | null
  logoUrl: string | null
  whatsappNumber: string
  active: boolean
  deletedAt: string | null
  createdAt: string
  updatedAt: string
}
```

Exemplo:

```json
[
  {
    "id": "uuid-da-loja",
    "tenantId": "uuid-do-tenant",
    "slug": "minha-loja",
    "storeName": "Minha Loja",
    "horarioAbertura": "08:00",
    "horarioFechamento": "18:00",
    "endereco": "Rua Exemplo, 123",
    "city": "São Paulo",
    "state": "SP",
    "descricao": "Descrição da loja",
    "logoUrl": "https://cdn.exemplo/logo.png",
    "whatsappNumber": "5511999999999",
    "active": true,
    "deletedAt": null,
    "createdAt": "2026-07-11T12:00:00.000Z",
    "updatedAt": "2026-07-11T12:00:00.000Z"
  }
]
```

## Elegibilidade aplicada pelo backend

O repositório consulta lojas com:

- `active = true`;
- `deleted_at IS NULL`;
- ordenação crescente por `store_name`.

A política RLS pública também exige tenant com `status = active`.

O frontend não deve duplicar essas regras como fonte de autoridade. Ele apenas adapta os itens devolvidos pelo endpoint público.

## Adapter para a tela existente

```ts
type StoreSummary = {
  id: string
  name: string
  description: string
  imageSrc?: string
  imageAlt?: string
  isSelectable: boolean
}
```

Mapeamento:

```text
slug             -> id
storeName        -> name
descricao ?? ''  -> description
logoUrl ?? undefined -> imageSrc
`Logo da loja ${storeName}` -> imageAlt, quando houver logo
item retornado pelo endpoint público -> isSelectable = true
```

O UUID da propriedade externa `id` não é usado na navegação atual. O callback do card recebe `StoreSummary.id`, que nesta integração representa o slug público.

## Erros

Qualquer resposta HTTP fora de `2xx` é convertida pelo cliente compartilhado em `ApiError`. Falhas anteriores à resposta são convertidas em `ApiNetworkError`.

A UI não deve expor detalhes técnicos do backend. O hook da feature deve produzir o estado:

```ts
{
  status: 'error',
  message: 'Verifique sua conexão e tente novamente.'
}
```

## Limitações conhecidas

- O endpoint não suporta paginação, busca ou filtro de localização.
- A resposta contém campos que a tela atual não apresenta, como cidade e UF.
- Evoluir essas limitações exige contrato coordenado entre frontend e backend e está fora deste fix.
