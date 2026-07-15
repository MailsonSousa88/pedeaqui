# ADR 007: Cliente Supabase Autenticado por Requisição para Leituras Privadas

**Status**: Aceito
**Data**: 2026-07-15

## Contexto

O backend usa um cliente Supabase global criado com `SUPABASE_ANON_KEY`. O `authMiddleware` valida o bearer JWT com `supabase.auth.getUser(token)` e expõe apenas o identificador do usuario em `req.user`.

Esse desenho valida a identidade na API, mas as consultas subsequentes ao banco continuam sendo feitas como `anon`. Com RLS habilitado, uma nova rota privada de detalhe de produto nao consegue ler, de forma segura, um produto indisponivel pertencente ao lojista: a policy de ownership exige `auth.uid()` e o cliente anonimo nao a recebe.

A feature `product-detail` precisa de duas leituras distintas:

- uma publica, limitada pelas policies de vitrine;
- uma privada, limitada pelo JWT do lojista e pelas policies de ownership.

## Decisao Proposta

Para cada requisicao autenticada que precise acessar dados protegidos por RLS, criar um cliente Supabase de curta duracao com a mesma `SUPABASE_ANON_KEY` e o JWT ja validado da requisicao, usando a configuracao `accessToken` do SDK.

O `authMiddleware` preservara o token validado apenas no objeto da requisicao. O controller criara o repositorio privado com esse cliente e continuara a passar apenas `tenantId` aos Use Cases. Dessa forma:

- o JWT nao e emitido, renovado, modificado ou persistido pelo backend;
- os Use Cases continuam sem conhecer Express, JWT ou Supabase;
- os repositories continuam sendo a unica camada que consulta Supabase;
- o banco aplica RLS com `auth.uid()` do lojista em vez de confiar somente em filtro de aplicacao;
- nenhum `SUPABASE_SERVICE_ROLE_KEY` e adicionado ao ambiente da aplicacao.

O cliente global anonimo continua sendo usado exclusivamente para leituras publicas e para a verificacao atual de token no middleware.

## Alternativas Consideradas

### 1. Usar somente o cliente anonimo e filtrar por `tenant_id` na query

Rejeitada. O filtro protege a intencao da aplicacao, mas nao fornece o contexto `authenticated` exigido pelas policies RLS e falha quando RLS esta efetivamente aplicado.

### 2. Usar `SUPABASE_SERVICE_ROLE_KEY` no backend

Rejeitada. A chave ignora RLS, cria novo segredo operacional e desloca toda a responsabilidade de ownership para a aplicacao. Para esta leitura nao ha necessidade de privilegio administrativo.

### 3. Criar uma RPC `SECURITY DEFINER`

Rejeitada. Aumenta a superficie de SQL privilegiado e exige regras adicionais de validacao, sem vantagem sobre propagar o JWT validado para uma leitura comum.

### 4. Tornar produtos indisponiveis publicamente legiveis

Rejeitada. Viola o contrato da vitrine e pode expor catalogo que o lojista decidiu ocultar.

## Consequencias

### Positivas

- A rota privada respeita a mesma fronteira de tenant definida no banco.
- A leitura publica permanece anonima e limitada por policies especificas.
- O contrato Clean Architecture e preservado: a dependencia do SDK fica na infraestrutura/adaptador HTTP.

### Custos e Riscos

- O token deve permanecer restrito ao ciclo da requisicao; nao pode ser logado nem armazenado.
- Cada rota privada que consultar Supabase com RLS deve adotar o mesmo factory de cliente para evitar regressao de contexto.
- Testes de integracao com banco isolado devem cobrir o contexto autenticado quando a infraestrutura de consolidacao estiver disponivel.

## Implementacao Posterior a Aprovacao

1. Criar factory de cliente Supabase por requisicao autenticada, sem estado de sessao compartilhado.
2. Expor o token ja validado ao controller por tipagem de `AuthenticatedRequest`.
3. Usar o cliente no `SupabaseProductDetailRepository` privado.
4. Criar policies publicas de leitura para imagens, variacoes e opcoes, sem liberar escrita anonima.
