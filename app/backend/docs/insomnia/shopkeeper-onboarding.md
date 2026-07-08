# Fluxo manual dos Use Cases no Insomnia

Este guia acompanha a colecao `shopkeeper-onboarding.insomnia.json`. A colecao cobre os Use Cases expostos por rotas HTTP.

## Como usar

1. Suba a API:

```bash
npm run dev
```

2. No Insomnia, importe `docs/insomnia/shopkeeper-onboarding.insomnia.json`.

3. Execute as requests na ordem:

- `01 - Health check`
- `02 - Signup lojista`
- `03 - Login lojista`
- copie `accessToken` da resposta de login para a variavel de ambiente `access_token`
- copie `refreshToken` da resposta de login para a variavel de ambiente `refresh_token`
- `04 - Validar token`
- `05 - Registrar tenant`
- copie `id` da resposta de registro de tenant para a variavel de ambiente `tenant_id`
- `06 - Consultar tenant`
- `07 - Criar loja`
- copie `id` da resposta de criacao de loja para a variavel de ambiente `store_id`
- `08 - Consultar loja publica`
- `09 - Listar categorias da loja`
- `10 - Criar categoria`
- copie `id` da resposta de criacao de categoria para a variavel de ambiente `category_id`
- `11 - Atualizar categoria`
- `12 - Criar produto`
- copie `id` da resposta de criacao de produto para a variavel de ambiente `product_id`
- `13 - Listar produtos da loja`
- `14 - Atualizar produto`
- `15 - Alternar disponibilidade do produto`
- `16 - Deletar produto`
- `17 - Deletar categoria`
- `18 - Atualizar loja`
- `19 - Desativar loja`
- `20 - Reativar loja`
- `21 - Atualizar perfil`
- `22 - Atualizar tenant`
- `23 - Listar planos disponiveis`
- `24 - Criar plano`
- copie `id` da resposta de criacao de plano para a variavel de ambiente `plan_id`
- `25 - Listar planos autenticado`
- `26 - Atualizar status do plano`
- `27 - Criar checkout de assinatura`
- `28 - Webhook Stripe`
- `29 - Atualizar sessao`
- `30 - Solicitar recuperacao de senha`
- `31 - Redefinir senha`
- `32 - Deletar loja`
- `33 - Logout`

As requests protegidas usam o header `Authorization: Bearer {{ _.access_token }}`. O token nao deve ir no body.

## Variaveis

A colecao cria um ambiente com estes valores:

- `base_url`: `http://localhost:3000`
- `access_token`: vazio; preencher depois do login
- `email`: usuario de teste
- `password`: senha de teste
- `profile_document`: CPF valido para signup
- `updated_profile_document`: CPF valido e unico para atualizar perfil
- `tenant_document`: CNPJ valido para registrar tenant
- `tenant_update_document`: CNPJ valido e unico para atualizar tenant
- `tenant_id`: preencher com `id` retornado em `05 - Registrar tenant`
- `store_slug`: slug publico da loja
- `store_id`: preencher com `id` retornado em `07 - Criar loja`
- `category_id`: preencher com `id` retornado em `10 - Criar categoria`
- `product_id`: preencher com `id` retornado em `12 - Criar produto`
- `refresh_token`: preencher com `refreshToken` retornado em `03 - Login lojista`
- `plan_id`: preencher com `id` retornado em `24 - Criar plano`
- `stripe_price_id`: id de Price do Stripe para planos/checkout
- `stripe_signature`: assinatura valida para testar webhook Stripe

Troque `email`, `profile_document`, `updated_profile_document`, `tenant_document`, `tenant_update_document`, `store_slug` e `stripe_price_id` antes de repetir o fluxo no mesmo banco, porque o backend pode rejeitar dados ja usados. Depois de criar tenant, loja, categoria, produto ou plano, atualize tambem `tenant_id`, `store_id`, `category_id`, `product_id` e `plan_id`.

## Resultado esperado

- Signup: `201`
- Login: `200` com `accessToken`
- Validar token: `200`
- Registrar tenant: `201`
- Consultar tenant: `200`
- Criar loja: `201`
- Consultar loja publica: `200`
- Listar categorias da loja: `200`
- Criar categoria: `201`
- Atualizar categoria: `200`
- Criar produto: `201`
- Listar produtos da loja: `200`
- Atualizar produto: `200`
- Alternar disponibilidade do produto: `200`
- Deletar produto: `204`
- Deletar categoria: `204`
- Atualizar loja: `200`
- Desativar/Reativar loja: `200`
- Atualizar perfil: `200`
- Atualizar tenant: `200`
- Listar planos disponiveis: `200`
- Criar plano: `201`
- Listar planos autenticado: `200`
- Atualizar status do plano: `200`
- Criar checkout de assinatura: `200` com `url`, se Stripe estiver configurado e o tenant nao tiver subscription ativa
- Webhook Stripe: `200` apenas com `Stripe-Signature` valida; sem assinatura valida, `400` e esperado
- Atualizar sessao: `200` com novo `accessToken` e `refreshToken`
- Solicitar recuperacao de senha: `200`, se Supabase email estiver configurado
- Redefinir senha: depende do estado de sessao do cliente Supabase usado pelo backend
- Deletar loja: `204`
- Logout: `200`

Erros comuns:

- `401`: token ausente, expirado ou mal formatado.
- `403`: usuario autenticado sem subscription ativa; rode o registro de tenant antes da loja.
- `409`: tenant ja possui loja ou slug ja existe.
- `409` ao deletar categoria: delete primeiro os produtos ativos dessa categoria, ou mantenha pelo menos outra categoria ativa na loja.
- `404` em categorias/produtos: confira se `store_id`, `category_id` ou `product_id` foram copiados da resposta correta.
- Checkout pode retornar erro se o tenant ja possuir subscription ativa; o registro de tenant cria trial ativa.
- Criacao/atualizacao de planos pode depender das politicas do banco para escrita em `plans`.
- Rode `Logout` por ultimo, porque ele pode invalidar o token usado pelas outras requests.

## Cobertura de Use Cases

- Auth: signup, login, validar token, refresh, recover password, reset password, logout.
- Profile: atualizar perfil.
- Tenant: registrar, consultar e atualizar tenant.
- Store: criar, consultar por slug, atualizar, alternar active e deletar.
- Category: criar, listar por loja, atualizar e deletar.
- Product: criar, listar por loja, atualizar, alternar disponibilidade e deletar.
- Plans: criar, listar e atualizar status.
- Subscription: criar checkout e representar webhook Stripe.
