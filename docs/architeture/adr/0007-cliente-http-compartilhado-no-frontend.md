# 0007 - Cliente HTTP Compartilhado no Frontend

## Status

Accepted

## Contexto

O frontend do PedeAqui ja possui uma estrutura feature-based, onde cada feature tem sua propria pasta de `services`. Atualmente, as telas de cadastro e login ja se comunicam com o backend por meio das rotas:

```txt
POST /api/auth/signup
POST /api/auth/login
```

Essas chamadas ainda usam `fetch` diretamente dentro dos services das features.

Ao mesmo tempo, o frontend possui o arquivo:

```txt
app/frontend/src/shared/services/api.ts
```

Esse arquivo deve ser a base real de comunicacao HTTP do frontend com o backend. O record `docs/records/frontend/01-comunicacao-com-backend.md` ja registra a boa pratica esperada:

```txt
Tela
-> hook da feature
-> service da feature
-> shared/services/api.ts
-> backend
```

O problema arquitetural e que, se cada feature continuar chamando `fetch` diretamente, o projeto tende a duplicar:

* montagem de URL;
* headers padrao;
* leitura de JSON;
* tratamento tecnico de erro;
* inclusao de token de autenticacao;
* logs de diagnostico;
* convencoes para proxy local e ambiente publicado.

Isso aumenta o risco de inconsistencia a medida que novas rotas forem integradas.

Tambem existe uma preocupacao de produto: mensagens tecnicas retornadas pela API, como `Invalid CPF`, nao devem aparecer diretamente para o cliente final. O frontend pode registrar detalhes tecnicos para debug, mas a UI deve exibir mensagens amigaveis e controladas pela feature.

## Decisao

Adotar `app/frontend/src/shared/services/api.ts` como cliente HTTP compartilhado e oficial do frontend.

Esse cliente sera responsavel apenas por preocupacoes genericas de comunicacao HTTP:

* definir a base URL da API;
* respeitar o proxy local do Vite durante desenvolvimento;
* montar headers padrao;
* enviar e receber JSON;
* oferecer metodos reutilizaveis (`get`, `post`, `put`, `patch`, `delete`);
* permitir envio futuro de `Authorization: Bearer <accessToken>`;
* capturar informacoes tecnicas de erro sem decidir a mensagem final da tela.

Os services de feature continuarao sendo responsaveis por regras especificas da propria feature:

* montar payloads;
* normalizar dados de formulario;
* escolher a rota correta;
* tipar a resposta esperada;
* transformar erros tecnicos em mensagens amigaveis para a UI;
* decidir quais logs sao uteis para o contexto da feature.

O `api.ts` nao deve conhecer regras de cadastro, login, tenant, loja, produto, pagamento ou qualquer outra feature.

### Base URL

Durante desenvolvimento local, as chamadas devem poder usar o proxy do Vite:

```txt
/api/auth/signup
```

Portanto, a base URL padrao do cliente HTTP no frontend deve ser vazia quando `VITE_API_URL` nao estiver definida.

```ts
const API_BASE_URL = import.meta.env.VITE_API_URL ?? ''
```

Em ambiente publicado, `VITE_API_URL` devera apontar para a API real:

```txt
VITE_API_URL=https://api.pedeaqui.store
```

O fallback para uma URL ficticia, como `https://exemplo.pedeaqui.com`, nao deve ser usado no cliente real, pois mascara erro de ambiente e dificulta debug.

### Tratamento de erro

O cliente compartilhado deve retornar erro tecnico estruturado para os services, contendo informacoes como:

```txt
status
body
message tecnica
```

Essas informacoes podem ser usadas para logs no terminal/browser console.

Porem, a mensagem exibida para o usuario final deve ser definida pelo service/hook da feature. O backend nao deve ditar diretamente o texto visivel ao cliente.

### Uso pelas features

O service de cadastro deve evoluir de:

```ts
fetch('/api/auth/signup', ...)
```

para:

```ts
apiClient.post<RegisterResponse>('/api/auth/signup', payload)
```

O service de login deve seguir o mesmo padrao:

```ts
apiClient.post<LoginResponse>('/api/auth/login', payload)
```

Novas features so devem passar a usar rotas quando essas rotas ja existirem ou estiverem formalmente especificadas como contrato esperado. O frontend nao deve inventar endpoints.

### Autenticacao

O `api.ts` deve ser preparado para receber token de autenticacao, mas a decisao de persistencia e ciclo de vida do token deve ser tratada separadamente quando o fluxo autenticado estiver fechado.

Para evitar acoplamento prematuro, o cliente pode aceitar token por opcao de request ou por uma funcao configuravel no futuro. Ele nao deve depender diretamente de uma feature especifica de login.

## Consequencias

### Positivas

* Reduz duplicacao de `fetch` entre features.
* Centraliza comportamento HTTP comum.
* Facilita trocar entre proxy local e API publicada.
* Melhora consistencia de headers, JSON e tratamento tecnico de erro.
* Mantem as features donas dos seus payloads e mensagens de UI.
* Facilita escalar integracoes conforme novas rotas do backend forem ficando prontas.
* Ajuda a evitar vazamento de mensagens tecnicas do backend para clientes finais.

### Negativas

* Exige migrar services existentes de cadastro e login para o cliente compartilhado.
* Introduz uma pequena camada a mais entre feature e `fetch`.
* Se o cliente compartilhado crescer demais, pode virar ponto de acoplamento indevido.
* O time precisa manter disciplina para nao colocar regra de negocio dentro de `api.ts`.

## Riscos

* Services continuarem usando `fetch` diretamente e criarem comportamento divergente.
* `api.ts` receber regras especificas de features e perder sua neutralidade.
* Mensagens tecnicas do backend serem repassadas diretamente para a UI.
* Configuracao incorreta de `VITE_API_URL` quebrar chamadas em producao.
* Token de autenticacao ser acoplado cedo demais sem decisao clara sobre persistencia, refresh e logout.

## Regras de Implementacao

* `api.ts` deve ser generico e nao conhecer features.
* Services de feature devem continuar montando payloads e traduzindo erros.
* Componentes nao devem chamar `apiClient` diretamente.
* Hooks podem chamar services da propria feature, nao rotas diretamente.
* Rotas devem ser integradas apenas quando existirem no backend ou estiverem registradas como contrato esperado.
* Durante desenvolvimento local, chamadas `/api/...` devem funcionar via proxy do Vite.
* Em ambiente publicado, a base URL deve vir de `VITE_API_URL`.

