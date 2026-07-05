# Fluxo de criacao de loja no Insomnia

Este guia acompanha a colecao `shopkeeper-onboarding.insomnia.json`.

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
- `04 - Validar token`
- `05 - Registrar tenant`
- `06 - Consultar tenant`
- `07 - Criar loja`
- `08 - Consultar loja publica`

## Variaveis

A colecao cria um ambiente com estes valores:

- `base_url`: `http://localhost:3000`
- `access_token`: vazio; preencher depois do login
- `email`: usuario de teste
- `password`: senha de teste
- `profile_document`: CPF valido para signup
- `tenant_document`: CNPJ valido para registrar tenant
- `store_slug`: slug publico da loja

Troque `email`, `profile_document`, `tenant_document` e `store_slug` antes de repetir o fluxo no mesmo banco, porque o backend pode rejeitar dados ja usados.

## Resultado esperado

- Signup: `201`
- Login: `200` com `accessToken`
- Validar token: `200`
- Registrar tenant: `201`
- Consultar tenant: `200`
- Criar loja: `201`
- Consultar loja publica: `200`

Erros comuns:

- `401`: token ausente, expirado ou mal formatado.
- `403`: usuario autenticado sem subscription ativa; rode o registro de tenant antes da loja.
- `409`: tenant ja possui loja ou slug ja existe.
