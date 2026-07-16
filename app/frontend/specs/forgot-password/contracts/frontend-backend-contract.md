# Contrato frontend-backend - Forgot Password

## Objetivo

Documentar o contrato usado pela feature `forgot-password` para solicitar e reenviar link de recuperacao de senha, alem de registrar o reset de senha como pendente.

## Status do contrato

Confirmado pela implementacao atual de frontend e backend.

O fluxo usa `POST /api/auth/recover-password` para solicitar e reenviar o link de recuperacao e `POST /api/auth/reset-password` para alterar a senha usando o access token recebido no fragmento do link de recuperacao do Supabase.

A rota oficial de frontend para receber o link e:

```text
/forgot-password/reset
```

O backend deve enviar essa rota ao Supabase por meio da variavel:

```text
PASSWORD_RECOVERY_REDIRECT_URL
```

## Operacao: solicitar link de recuperacao

### Metodo HTTP

`POST`

### Endpoint

`/api/auth/recover-password`

O cliente compartilhado pode prefixar esse path com `VITE_API_URL` quando a variavel estiver definida.

### Autenticacao

Nao requer autenticacao.

### Path Parameters

Nenhum confirmado.

### Query Parameters

Nenhum confirmado.

### Request Body

Confirmado por `ForgotPasswordRequestPayload` e pelo service:

```ts
{
  email: string
}
```

O service envia `email: payload.email.trim()`.

### Response Body

Confirmado pelo tipo `ForgotPasswordRequestResult` esperado pelo frontend:

```ts
{
  message: string
}
```

### Configuracao de redirect

O backend chama o Supabase com `redirectTo` configurado a partir de `PASSWORD_RECOVERY_REDIRECT_URL`.

Valor local recomendado:

```text
http://localhost:5173/forgot-password/reset
```

### Possiveis erros

O frontend distingue:

- `ApiError`: falha rejeitada pela API, exibindo mensagem generica para verificar e-mail e tentar novamente.
- `ApiNetworkError`: falha de conexao, exibindo mensagem para verificar conexao e tentar novamente.
- Erro desconhecido: mensagem generica para tentar novamente.

## Operacao: reenviar link de recuperacao

### Metodo HTTP

`POST`

### Endpoint

`/api/auth/recover-password`

### Autenticacao

Nao ha autenticacao confirmada.

### Path Parameters

Nenhum confirmado.

### Query Parameters

Nenhum confirmado.

### Request Body

Mesmo payload da solicitacao inicial:

```ts
{
  email: string
}
```

O hook so reenvia quando ha `lastEmail` registrado localmente apos uma solicitacao bem-sucedida.

### Response Body

Mesmo tipo esperado da solicitacao inicial:

```ts
{
  message: string
}
```

### Possiveis erros

Mesmo tratamento da solicitacao inicial. Se nao houver e-mail local disponivel, o frontend bloqueia o reenvio sem chamar backend.

## Operacao: redefinir senha

### Metodo HTTP

`POST`

### Endpoint

`/api/auth/reset-password`

### Autenticacao

Obrigatoria.

O frontend deve enviar o access token recebido no fragmento do link de recuperacao:

```http
Authorization: Bearer <access_token>
```

O token nao deve ser persistido em `localStorage` ou `sessionStorage`.

### Path Parameters

Ainda nao definidos pelo backend.

### Query Parameters

Ainda nao definidos pelo backend.

### Request Body

O frontend envia somente a nova senha:

```ts
{
  password: string
}
```

### Response Body

```ts
{
  message: string
}
```

### Possiveis erros

O backend deve retornar erro quando:

- o header `Authorization` estiver ausente ou malformado;
- o token for invalido, expirado ou ja utilizado;
- a senha estiver ausente;
- a senha tiver menos de 8 caracteres;
- o Supabase recusar a atualizacao da senha.

## Relacao com services e types do frontend

- `src/features/auth/forgot-password/services/forgotPasswordService.ts`: chama `POST /api/auth/recover-password` para solicitar e reenviar link; chama `POST /api/auth/reset-password` com Bearer token para redefinir a senha.
- `src/features/auth/forgot-password/types/forgotPassword.ts`: define steps, valores de formulario, payload de solicitacao, resultado de solicitacao e payload de reset.
- `src/features/auth/forgot-password/schemas/forgotPasswordSchemas.ts`: valida e-mail localmente e valida nova senha/confirmacao localmente.
- `src/features/auth/forgot-password/hooks/useForgotPasswordFlow.ts`: chama request/reenvio, controla loading e mensagens.
- `src/features/auth/forgot-password/hooks/useForgotPasswordResetForm.ts`: valida formulario de reset e chama o backend com o token recebido no link.
- `src/shared/services/api.ts`: define `apiClient`, JSON headers, parse de resposta, `ApiError`, `ApiNetworkError` e uso opcional de `VITE_API_URL`.

## Itens fora do contrato

- Codigo HTTP e formato oficial de erro para recuperacao de senha.
- Gatilho real de envio de e-mail e provedor usado pelo backend.
- Persistencia local de token em storage.
- Exibicao de token na interface.
- Persistencia interna, Supabase, migrations ou detalhes de banco.
