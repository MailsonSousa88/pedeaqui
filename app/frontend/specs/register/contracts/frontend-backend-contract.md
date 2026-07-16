# Contrato frontend-backend - Register

## Objetivo

Documentar o contrato usado pela feature `register` para criar cadastro e iniciar sessao automaticamente apos o cadastro.

## Status do contrato

Parcialmente confirmado pela implementacao atual do frontend.

O codigo confirma chamadas HTTP em `registerService`, os payloads enviados pelo frontend e os tipos esperados pelo frontend. A documentacao da feature ainda descreve `register` como frontend-only, sem backend, autenticacao, persistencia, endpoints, services HTTP ou contratos backend. Portanto, os endpoints usados pelo codigo representam divergencia entre spec e implementacao.

## Operacao: criar cadastro

### Metodo HTTP

`POST`

### Endpoint

`/api/auth/signup`

O cliente compartilhado pode prefixar esse path com `VITE_API_URL` quando a variavel estiver definida.

### Autenticacao

Nao ha autenticacao confirmada para esta chamada. O `registerService.register` limpa a sessao local antes de enviar o cadastro e nao informa `authToken` ao `apiClient`.

### Path Parameters

Nenhum confirmado.

### Query Parameters

Nenhum confirmado.

### Request Body

Confirmado pelo tipo `RegisterPayload` e por `buildRegisterPayload`:

```ts
{
  email: string
  password: string
  name: string
  phone: string
  document: string
}
```

Mapeamento a partir do formulario:

- `email`: `values.email.trim()`
- `password`: `values.password`
- `name`: `values.fullName.trim()`
- `phone`: digitos normalizados de `values.phone`
- `document`: digitos normalizados de `values.document`

### Response Body

Confirmado pelo tipo `RegisterResponse` esperado pelo frontend:

```ts
{
  message: string
  profile: {
    id: string
    name: string
    phone: string
    document?: string
    createdAt?: string
    updatedAt?: string
  }
}
```

### Possiveis erros

Codigos HTTP especificos ainda nao foram definidos pelo backend na documentacao analisada.

O frontend trata respostas de erro com campo `error` quando o `apiClient` rejeita a requisicao:

- `Invalid CPF` -> `Informe um CPF valido.`
- `CPF already registered` -> `Este CPF ja esta cadastrado. Entre na sua conta ou use outro CPF.`
- `Missing required fields` -> `Preencha todos os campos obrigatorios.`

Demais erros retornam mensagem generica de falha no cadastro. O formato completo de erro do backend ainda nao foi definido.

## Operacao: login automatico apos cadastro

### Metodo HTTP

`POST`

### Endpoint

`/api/auth/login`

### Autenticacao

Nao ha autenticacao confirmada para esta chamada. O frontend usa o e-mail e senha do cadastro para solicitar uma sessao.

### Path Parameters

Nenhum confirmado.

### Query Parameters

Nenhum confirmado.

### Request Body

Confirmado pelo `registerService`:

```ts
{
  email: string
  password: string
}
```

### Response Body

Confirmado pelo tipo compartilhado `AuthSession`:

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

Quando a resposta e recebida, o frontend salva a sessao em `sessionStorage` na chave `pedeaqui.auth-session`.

### Possiveis erros

Codigos HTTP e formato de erro do login automatico ainda nao foram definidos pelo backend na documentacao analisada.

Se o login automatico falhar depois do cadastro, o frontend informa: `Cadastro concluido, mas nao foi possivel iniciar sua sessao. Entre com seu e-mail e senha.`

## Relacao com services e types do frontend

- `src/features/auth/register/services/registerService.ts`: cria o payload, chama `POST /api/auth/signup`, chama `POST /api/auth/login` e salva sessao.
- `src/features/auth/register/types/register.ts`: define `RegisterFormValues`, `RegisterPayload` e `RegisterResponse`.
- `src/features/auth/register/schemas/registerSchema.ts`: valida localmente nome, e-mail, WhatsApp, senha minima e CPF antes do service.
- `src/features/auth/register/hooks/useRegisterForm.ts`: orquestra submit, chama `buildRegisterPayload`, executa `registerService.register` e expoe erro de submissao.
- `src/shared/services/api.ts`: define `apiClient`, JSON headers, parse de resposta, `ApiError`, `ApiNetworkError` e uso opcional de `VITE_API_URL`.
- `src/shared/services/authSession.ts`: define `AuthSession` e persistencia local da sessao.

## Itens fora do contrato

- Codigos HTTP especificos.
- Garantias backend para validacao de CPF, telefone, senha e duplicidade.
- Politica de refresh token, expiracao, revogacao ou renovacao de sessao.
- Confirmacao de e-mail, ativacao de conta, escolha de plano ou pagamento.
- Contrato oficial de backend para os erros alem dos textos tratados pelo frontend.
- Qualquer detalhe de banco, Supabase, migrations ou persistencia interna do backend.
