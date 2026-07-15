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
- `08 - Listar lojas publicas`
- `09 - Consultar loja publica`
- `10 - Listar categorias da loja`
- `11 - Criar categoria`
- copie `id` da resposta de criacao de categoria para a variavel de ambiente `category_id`
- `12 - Atualizar categoria`
- `13 - Criar produto`
- copie `id` da resposta de criacao de produto para a variavel de ambiente `product_id`
- `14 - Listar produtos da loja`
- `15 - Atualizar produto`
- `16 - Alternar disponibilidade do produto`
- `17 - Deletar produto`
- `18 - Deletar categoria`
- `19 - Atualizar loja`
- `20 - Desativar loja`
- `21 - Reativar loja`
- `22 - Atualizar perfil`
- `23 - Atualizar tenant`
- `24 - Listar planos disponiveis`
- `25 - Criar plano`
- copie `id` da resposta de criacao de plano para a variavel de ambiente `plan_id`
- `26 - Listar planos autenticado`
- `27 - Atualizar status do plano`
- `28 - Criar checkout de assinatura`
- `29 - Webhook Stripe`
- `30 - Atualizar sessao`
- `31 - Solicitar recuperacao de senha`
- `32 - Redefinir senha`
- `33 - Deletar loja`
- `34 - Logout`

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
- `category_id`: preencher com `id` retornado em `11 - Criar categoria`
- `product_id`: preencher com `id` retornado em `13 - Criar produto`
- `refresh_token`: preencher com `refreshToken` retornado em `03 - Login lojista`
- `plan_id`: preencher com `id` retornado em `25 - Criar plano`
- `stripe_price_id`: id de Price do Stripe para planos/checkout
- `stripe_signature`: assinatura valida para testar webhook Stripe

Troque `email`, `profile_document`, `updated_profile_document`, `tenant_document`, `tenant_update_document`, `store_slug` e `stripe_price_id` antes de repetir o fluxo no mesmo banco, porque o backend pode rejeitar dados ja usados. Depois de criar tenant, loja, categoria, produto, variacao, opcao ou plano, atualize tambem `tenant_id`, `store_id`, `category_id`, `product_id`, `variation_id`, `variation_option_id` e `plan_id`.

## Resultado esperado

- Signup: `201`
- Login: `200` com `accessToken`
- Validar token: `200`
- Registrar tenant: `201`
- Consultar tenant: `200`
- Criar loja: `201`
- Listar lojas publicas: `200`
- Consultar loja publica: `200`
- Listar categorias da loja: `200`
- Criar categoria: `201`
- Atualizar categoria: `200`
- Criar produto: `201`
- Listar produtos da loja: `200`
- Atualizar produto: `200`
- Alternar disponibilidade do produto: `200`
- Criar variacao do produto: `201`
- Listar variacoes do produto: `200`
- Atualizar variacao do produto: `200`
- Criar opcao da variacao: `201`
- Listar opcoes da variacao: `200`
- Atualizar opcao da variacao: `200`
- Deletar opcao da variacao: `204`
- Deletar variacao do produto: `204`
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
- `404` em categorias/produtos/variacoes/opcoes: confira se `store_id`, `category_id`, `product_id`, `variation_id` ou `variation_option_id` foram copiados da resposta correta.
- Checkout pode retornar erro se o tenant ja possuir subscription ativa; o registro de tenant cria trial ativa.
- Criacao/atualizacao de planos pode depender das politicas do banco para escrita em `plans`.
- Rode `Logout` por ultimo, porque ele pode invalidar o token usado pelas outras requests.

## Cobertura de Use Cases

- Auth: signup, login, validar token, refresh, recover password, reset password, logout.
- Profile: atualizar perfil.
- Tenant: registrar, consultar e atualizar tenant.
- Store: criar com cidade/estado, listar lojas publicas, consultar por slug, atualizar cidade/estado, alternar active e deletar.
- Category: criar, listar por loja, atualizar e deletar.
- Product: criar, listar por loja, atualizar, alternar disponibilidade e deletar.
- Product variations: criar, listar por produto, atualizar e deletar.
- Variation options: criar, listar por variacao, atualizar e deletar.
- Plans: criar, listar e atualizar status.
- Subscription: criar checkout e representar webhook Stripe.
