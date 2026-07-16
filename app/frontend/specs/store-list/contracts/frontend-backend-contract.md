# Contrato frontend-backend - Store List

## Objetivo

Documentar o estado do contrato de integracao para a feature `store-list`, responsavel por listar lojas ao consumidor.

## Status do contrato

Pendente.

A spec, o plano e a implementacao confirmam que esta feature ainda nao possui backend, endpoint, URL, chamada HTTP, autenticacao, persistencia ou formato de API definido. A lista exibida atualmente vem de fonte local substituivel em `data/localStores.ts`.

O contrato backend para lista de lojas ainda nao foi definido.

## Operacao: carregar lista de lojas

### Metodo HTTP

Ainda nao definido pelo backend.

### Endpoint

Ainda nao definido pelo backend.

### Autenticacao

Ainda nao definida pelo backend.

### Path Parameters

Ainda nao definidos pelo backend.

### Query Parameters

Ainda nao definidos pelo backend.

### Request Body

Ainda nao definido pelo backend.

### Response Body

Ainda nao definido pelo backend.

O frontend possui apenas o modelo local `StoreSummary`, que nao deve ser tratado como resposta oficial de API:

```ts
{
  id: string
  name: string
  description: string
  imageSrc?: string
  imageAlt?: string
  isSelectable: boolean
}
```

### Possiveis erros

Ainda nao definidos pelo backend.

O frontend possui estado local de apresentacao para erro:

```ts
{ status: 'error'; message: string }
```

Esse estado nao define formato de erro remoto.

## Relacao com services e types do frontend

- `src/features/store/store-list/services/storeListService.ts`: expõe `loadStoreList`, mas retorna `{ status: 'notImplemented' }` e contem TODO para integrar somente quando houver contrato oficial de backend.
- `src/features/store/store-list/types/storeList.ts`: define `StoreSummary`, estados de tela, callbacks e `StoreListServiceResult`.
- `src/features/store/store-list/data/localStores.ts`: fornece a colecao local usada nesta versao, sem simular resposta de API.
- `src/features/store/store-list/hooks/useStoreList.ts`: filtra a colecao recebida pela pagina, sem chamar service ou backend.
- `src/features/store/store-list/pages/StoreListPage.tsx`: recebe estado da pagina e delega apresentacao, sem conhecer transporte remoto.

## Itens fora do contrato

- Endpoint, metodo HTTP e base path.
- Autenticacao ou autorizacao.
- Paginacao, filtros, busca remota, ordenacao ou geolocalizacao.
- Formato oficial de resposta da API.
- Formato oficial de erro da API.
- Navegacao para vitrine publica ou destino de selecao de loja.
- Persistencia, banco, Supabase, cache remoto ou cliente HTTP.
