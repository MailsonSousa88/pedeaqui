# Contrato frontend-backend - Login

## Objetivo

Documentar o contrato usado pela feature `login` para autenticar o lojista e resolver a loja associada ao perfil autenticado.

## Status do contrato

Parcialmente confirmado pela implementacao atual do frontend.

O codigo confirma as chamadas HTTP, payloads enviados e tipos esperados pelo frontend. A spec e o plano da feature ainda descrevem a tela como frontend-only, sem autenticacao real, backend, request HTTP, sessao ou contrato externo. Portanto, os contratos usados no codigo divergem da documentacao da feature.

## Operacao: autenticar usuario

### Metodo HTTP

`POST`

### Endpoint

`/api/auth/login`

O cliente compartilhado pode prefixar esse path com `VITE_API_URL` quando a variavel estiver definida.

### Autenticacao

Nao ha autenticacao previa confirmada para esta chamada. O service envia e-mail e senha e espera receber uma sessao.

### Path Parameters

Nenhum confirmado.

### Query Parameters

Nenhum confirmado.

### Request Body

Confirmado por `LoginPayload` e `buildLoginPayload`:

```ts
{
  email: string
  password: string
}
```

Mapeamento a partir do formulario:

- `email`: `values.email.trim()`
- `password`: `values.password`

### Response Body

Confirmado por `LoginResponse = AuthSession`:

```ts
{
  accessToken: string
  refreshToken: string
  profile: {
    id: string
    name: string
    phone: string
    document?: string
  }
}
```

### Possiveis erros

O frontend trata explicitamente `ApiError.status === 401` como credenciais invalidas.

O frontend tambem trata respostas com campo `error`:

- `Invalid login credentials` -> `E-mail ou senha invalidos.`
- `Email not confirmed` -> `Confirme seu e-mail antes de entrar.`

Outros codigos HTTP e o formato completo de erro ainda nao foram definidos pelo backend na documentacao analisada.

## Operacao: resolver loja do tenant autenticado

### Metodo HTTP

`GET`

### Endpoint

`/api/stores/public`

### Autenticacao

Nao ha autenticacao confirmada para esta chamada no codigo. O `loginService.findStoreForTenant` nao envia `authToken`.

### Path Parameters

Nenhum confirmado.

### Query Parameters

Nenhum confirmado.

### Request Body

Nao ha body confirmado para `GET /api/stores/public`.

### Response Body

Confirmado pelo tipo esperado `LoginResolvedStore[]`:

```ts
Array<{
  id: string
  tenantId: string
  slug: string
  storeName: string
  active: boolean
}>
```

O frontend procura uma loja cujo `tenantId` seja igual a `response.profile.id` retornado pelo login.

### Possiveis erros

Codigos HTTP e formato de erro ainda nao foram definidos pelo backend na documentacao analisada.

Se nenhuma loja da resposta corresponder ao tenant autenticado, o frontend gera erro local: `Sua conta foi autenticada, mas nenhuma loja ativa foi encontrada para este perfil.`

Se a requisicao falhar, o frontend gera erro local: `Não foi possível carregar sua loja agora. Tente entrar novamente.`

## Relacao com services e types do frontend

- `src/features/auth/login/services/loginService.ts`: chama `POST /api/auth/login`, trata erros conhecidos e chama `GET /api/stores/public` para encontrar loja por `tenantId`.
- `src/features/auth/login/types/login.ts`: define `LoginFormValues`, `LoginPayload`, `LoginResponse`, `LoginResolvedStore` e `LoginSubmissionStage`.
- `src/features/auth/login/schemas/loginSchema.ts`: valida localmente e-mail e senha obrigatoria antes do service.
- `src/features/auth/login/hooks/useLoginForm.ts`: limpa sessao, autentica, resolve loja, salva sessao e chama `onSuccess`.
- `src/shared/services/api.ts`: define `apiClient`, JSON headers, parse de resposta, `ApiError`, `ApiNetworkError` e uso opcional de `VITE_API_URL`.
- `src/shared/services/authSession.ts`: define `AuthSession` e persistencia local da sessao.

## Itens fora do contrato

- Codigos HTTP alem do tratamento frontend para `401`.
- Formato oficial e completo dos erros de backend.
- Autorizacao por Bearer token para resolver loja.
- Paginacao, filtros, ordenacao ou query params de `/api/stores/public`.
- Regra backend que relaciona `profile.id` com `tenantId`.
- Politica de sessao, refresh token, expiracao, revogacao ou permissao por perfil.
