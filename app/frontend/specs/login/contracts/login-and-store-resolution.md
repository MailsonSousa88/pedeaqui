# Contrato frontend: autenticação e resolução da loja

## Objetivo

Registrar os contratos externos consumidos pela feature `login` para autenticar um lojista existente e localizar a loja vinculada ao seu perfil, sem alterar backend, autenticação ou regras de acesso.

## Fonte

- `docs/records/backend/01-rotas-e-payloads.md`, revisado contra a branch `development` em 16/07/2026.
- Evolução de integração registrada em `spec.md`, `plan.md` e `tasks.md` desta feature.

## Autenticar lojista

```http
POST /api/auth/login
Content-Type: application/json
```

Payload:

```ts
type LoginRequest = {
  email: string
  password: string
}
```

Exemplo:

```json
{
  "email": "lojista@email.com",
  "password": "senha-segura"
}
```

Resposta de sucesso:

```ts
type LoginResponse = {
  accessToken: string
  refreshToken: string
  profile: {
    id: string
    name: string
    phone: string
    document: string
  }
}
```

O frontend deve armazenar a sessão apenas pelo mecanismo compartilhado de autenticação. Tokens não devem ser gravados em logs, mensagens de erro, URL ou conteúdo visível.

## Resolver a loja do perfil autenticado

```http
GET /api/stores/public
Accept: application/json
```

- Rota pública, sem Bearer token e sem body.
- Retorna somente lojas públicas elegíveis segundo backend e RLS.
- O login consome os campos necessários para localizar a loja do lojista:

```ts
type LoginStoreLookupItem = {
  id: string
  tenantId: string
  slug: string
  storeName: string
  active: boolean
  deletedAt: string | null
}
```

## Composição do fluxo

1. Enviar `email` e `password` para `POST /api/auth/login`.
2. Usar `response.profile.id` como identificador do tenant autenticado.
3. Consultar `GET /api/stores/public`.
4. Localizar o item em que `store.tenantId === response.profile.id`.
5. Salvar a sessão somente depois que a loja for resolvida.
6. Navegar para `/storefront/:slug` usando o `slug` real retornado.

O fluxo não deve usar slug fixo, selecionar a primeira loja do array nem redirecionar um usuário existente para pré-configuração.

## Falhas

- Credenciais rejeitadas: permanecer no login e apresentar mensagem compreensível.
- Falha de rede ou HTTP: não expor payload, token, stack trace ou mensagem técnica do backend.
- Login válido sem loja pública vinculada ao `profile.id`: limpar qualquer sessão parcial, permanecer no login e informar que não foi possível localizar a loja da conta.
- A documentação de rotas não define um envelope específico de erro para `POST /api/auth/login`; o frontend não deve depender de texto cru como contrato estável.

## Fora deste contrato

- Cadastro de usuário.
- Criação ou pré-configuração de loja.
- Recuperação e redefinição de senha.
- Renovação automática por `POST /api/auth/refresh`.
- Logout remoto por `POST /api/auth/logout`.
- Alteração de backend, Supabase, RLS ou persistência de sessão.

