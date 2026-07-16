# Plan: Recuperacao de senha

## Resumo Tecnico

Implementar, em fase futura, a primeira versao frontend-only da feature `forgot-password` dentro do dominio Auth. A feature sera organizada em `src/features/auth/forgot-password/`, com pagina, componentes de apresentacao, hooks de fluxo local, schemas Zod, types da feature, service preparado para backend futuro e estilos especificos.

A implementacao deve reproduzir a experiencia visual descrita em `specs/forgot-password/spec.md`: etapa inicial `Solicitar link` e etapa `E-mail enviado` apos e-mail valido. A etapa de redefinicao de senha nao sera acessada localmente pela simulacao; ela sera aberta futuramente pelo fluxo real do Supabase via link recebido por e-mail.

Nao havera backend, envio real de e-mail, token, autenticao, alteracao real de senha, loading remoto ou sucesso remoto. A navegacao de retorno para Login sera tratada centralmente em `App.tsx` por meio de callback, sem criar rota adicional fora da camada central existente.

## Contexto da Feature

- Tela anterior: Login, por meio da acao `Esqueci minha senha`.
- Tela seguinte prevista: `Redefinir senha`, acessada por link recebido por e-mail no fluxo definitivo.
- Nesta versao nao existe navegacao real, token ou backend; a terceira etapa permanece apenas como representacao visual para desenvolvimento e validacao da interface.
- A integracao futura com backend devera preservar o limite arquitetural da feature e depender de contrato oficial antes de qualquer chamada real.

## Fontes e Precedencia

1. `specs/forgot-password/spec.md`: fonte de verdade funcional.
2. `specs/forgot-password/clarify.md`: decisoes que encerram ambiguidades.
3. `AGENTS.md`: regras de arquitetura, escopo frontend, stack e service preparado.
4. `specs/login/` e `specs/register/`: referencias de consistencia para Auth.
5. `src/features/auth/login/` e `src/features/auth/register/`: referencia de padrao tecnico ja implementado.

Em caso de divergencia entre referencia visual, codigo existente e a spec de `forgot-password`, prevalecem `spec.md` e `clarify.md`.

## Objetivo da Implementacao Futura

- Criar a tela de recuperacao de senha como feature isolada de Auth.
- Exibir a marca PedeAqui, stepper e card central.
- Permitir solicitar visualmente um link de recuperacao com validacao local de e-mail.
- Avancar localmente de `Solicitar link` para `E-mail enviado` quando o e-mail for valido.
- Exibir a etapa `E-mail enviado` com mensagem informativa, orientacoes e acao visual de reenvio sem efeito remoto.
- Implementar a etapa `Redefinir senha` como parte da feature, com formulario local e validacoes locais, reservada para acesso futuro pelo link real de recuperacao do Supabase.
- Preparar a fronteira de service para backend futuro sem endpoint, URL, fetch, cliente HTTP, mock ou chamada real.
- Manter acoes `Voltar para login` e `Enviar novamente` sem navegacao real.

## Scope Lock

Target: frontend da feature `forgot-password`.

### Paths permitidos para a implementacao futura

- `app/frontend/specs/forgot-password/plan.md`, somente durante esta fase.
- `app/frontend/specs/forgot-password/tasks.md`, somente quando a fase `tasks` for explicitamente iniciada.
- `app/frontend/src/features/auth/forgot-password/**`, nas futuras fases autorizadas.
- `app/frontend/src/App.tsx`, somente para compor `ForgotPasswordPage` e encaminhar o retorno para Login sem adicionar roteamento novo além da camada central existente.

### Paths permitidos apenas se a fase `tasks` aprovar reutilizacao compartilhada

- `app/frontend/src/shared/components/auth/**`, somente se for aprovada uma atividade específica para criação de componentes compartilhados devido à identificação de duplicação transversal.
- `app/frontend/src/shared/types/**`, somente se um tipo compartilhado for estritamente necessário.

### Paths proibidos

- `app/backend/**`.
- `database/**`, `supabase/**`, migrations, endpoints, controllers, use cases, repositories e contratos de backend.
- `app/frontend/src/features/auth/login/**`.
- `app/frontend/src/features/auth/register/**`.
- `app/frontend/src/features/**`, exceto `src/features/auth/forgot-password/**`.
- `app/frontend/src/assets/**`; `Tela-recuperar-senha.png` e somente referencia.
- `app/frontend/public/**`; a logo existente sera apenas consumida.
- `app/frontend/src/main.tsx`.
- `app/frontend/src/index.css` e CSS global, salvo revisao explicita posterior de Scope Lock.
- `app/frontend/package.json` e arquivos de lock.
- `app/frontend/.specify/**`.
- `app/frontend/docs/**` e `docs/**` globais.
- Qualquer arquivo de rota, router ou navegacao.

### Scope Lock funcional

- Implementar somente o fluxo local descrito em `spec.md` e `clarify.md`.
- Nao criar acesso por stepper, botao oculto, timeout, query param, hash, rota, `localStorage` ou acao local para alcancar uma etapa de redefinicao local.
- Nao exibir e-mail mascarado.
- Nao criar backend, endpoint, token, URL, chamada HTTP, mock, envio real de e-mail, reenvio real, autenticacao, sessao, persistencia, alteracao real de senha, loading remoto ou sucesso remoto.
- Nao importar componentes, hooks, schemas, types ou services internos de `login` ou `register`.
- O retorno para Login deve ser emitido como callback da pagina de forgot-password e tratado centralmente em `App.tsx`.

## Estrutura de Pastas Proposta

```text
src/features/auth/forgot-password/
├── components/
│   ├── ForgotPasswordCard.tsx
│   ├── ForgotPasswordEmailSent.tsx
│   ├── ForgotPasswordField.tsx
│   ├── ForgotPasswordHeader.tsx
│   ├── ForgotPasswordRequestForm.tsx
│   ├── ForgotPasswordResetForm.tsx
│   └── ForgotPasswordStepper.tsx
├── hooks/
│   ├── useForgotPasswordFlow.ts
│   ├── useForgotPasswordRequestForm.ts
│   └── useForgotPasswordResetForm.ts
├── pages/
│   └── ForgotPasswordPage.tsx
├── schemas/
│   └── forgotPasswordSchemas.ts
├── services/
│   └── forgotPasswordService.ts
├── styles/
│   └── ForgotPasswordPage.module.css
└── types/
    └── forgotPassword.ts
```

Nao criar arquivos em `login` ou `register`. Essas features permanecem somente como referencia de padrao visual e tecnico.

## Componentes e Responsabilidades

### `ForgotPasswordPage`

- Compor a pagina da feature.
- Aplicar fundo claro, decorações responsivas e layout centralizado.
- Compor `ForgotPasswordHeader`, `ForgotPasswordStepper` e `ForgotPasswordCard`.
- Definir landmark principal com nome acessivel coerente com recuperacao de senha.
- Nao conter validacao, regra de formulario ou acesso a service.

### `ForgotPasswordHeader`

- Renderizar a logo oficial `/logoPedeAqui.jpeg`.
- Manter proporcao e texto alternativo `PedeAqui`.
- Nao renderizar botao superior com `ArrowLeft` nesta versao.
- Nao configurar rota, link, redirect ou handler de navegacao real fora do callback centralizado para Login.

### `ForgotPasswordStepper`

- Renderizar os passos `Solicitar link`, `E-mail enviado` e `Redefinir senha`.
- Destacar em vermelho o passo atual.
- Marcar passos futuros como inativos.
- Nao permitir clique, selecao ou navegacao entre etapas.
- Usar semantica acessivel para indicar o passo atual sem transformar o stepper em controle interativo.

### `ForgotPasswordCard`

- Renderizar o card branco centralizado com borda, sombra, radius e espacamentos coerentes com login/register.
- Escolher o conteudo interno conforme o passo local atual.
- Compor:
  - `ForgotPasswordRequestForm` no passo `Solicitar link`;
  - `ForgotPasswordEmailSent` no passo `E-mail enviado`;
  - `ForgotPasswordResetForm` quando a etapa `Redefinir senha` for renderizada na integracao futura via link real.
- Usar Framer Motion apenas para entrada sutil e respeitar reducao de movimento.

### `ForgotPasswordRequestForm`

- Renderizar titulo `Recuperar senha`, texto de apoio, campo `E-mail`, texto auxiliar e botao `Enviar link de recuperacao`.
- Usar `ForgotPasswordField` para label, icone, input e erro.
- Submeter somente via validacao local.
- Chamar o hook da etapa para avancar localmente a `E-mail enviado` quando o e-mail estiver valido.
- Nao chamar service, backend ou navegacao.

### `ForgotPasswordEmailSent`

- Renderizar titulo `Verifique seu e-mail`, textos informativos, orientacoes, botao `Enviar novamente`, acao secundaria visual `Simular abertura do link recebido` e acao visual `Voltar para login`.
- Nao exibir e-mail mascarado.
- Nao chamar service, backend ou reenvio real.
- Nao oferecer caminho local para `Redefinir senha`; a etapa fica reservada ao link real, sem rota, token, storage ou navegacao real nesta versao.

### `ForgotPasswordResetForm`

- Renderizar titulo `Criar nova senha`, campos `Nova senha` e `Confirmar senha`, textos auxiliares, botao `Redefinir senha` e acao visual `Voltar para login`.
- Validar localmente senha minima de 8 caracteres e confirmacao igual.
- Controlar visibilidade das duas senhas.
- Nao alterar senha real, autenticar, chamar backend, navegar ou exibir sucesso remoto.

### `ForgotPasswordField`

- Componente de campo especifico da feature.
- Renderizar label, icone, input, trailing action opcional e mensagem de erro.
- Associar label e input por `htmlFor` e `id`.
- Associar erro por `aria-invalid`, `aria-describedby` e `role="alert"`.
- Suportar botao de mostrar/ocultar senha com `aria-label` e `aria-pressed`.
- Nao conter validacao, estado de fluxo ou integracao externa.

## Hooks

### `useForgotPasswordFlow`

- Controlar o passo local da feature.
- Estado inicial: `request`.
- Transicoes permitidas nesta versao: `request` -> `sent`, apos e-mail localmente valido, e `sent` -> `reset`, somente pela acao secundaria visual de simulacao.
- Nao expor transicao por stepper, rota, query string, hash, token, storage, service ou link real.
- A etapa `reset` deve ser renderizada dentro do mesmo fluxo local da UI apos a simulacao visual.
- Não controlar rota, query string, hash, token ou navegação.

### `useForgotPasswordRequestForm`

- Configurar React Hook Form com `requestResetSchema`.
- Default value: `email: ''`.
- Validar obrigatoriedade e formato de e-mail.
- Ao submeter com sucesso local, acionar somente a transicao local para `sent`.
- Nao limpar campos por efeito colateral remoto, nao chamar service e nao emitir sucesso remoto.

### `useForgotPasswordResetForm`

- Configurar React Hook Form com `resetPasswordSchema`.
- Default values: `newPassword: ''` e `confirmPassword: ''`.
- Validar nova senha obrigatoria, minimo de 8 caracteres e confirmacao igual.
- Controlar `isNewPasswordVisible` e `isConfirmPasswordVisible`.
- Ao submeter com sucesso local, nao alterar senha real, nao chamar service, nao navegar e nao exibir sucesso remoto.

## Schemas

### `requestResetSchema`

- `email`: string obrigatoria, com `trim()` e formato valido de e-mail.
- Mensagens em portugues do Brasil.
- Nao validar existencia de conta ou dominio remoto.

### `resetPasswordSchema`

- `newPassword`: string obrigatoria com minimo de 8 caracteres.
- `confirmPassword`: string obrigatoria.
- Refinamento local para exigir que `confirmPassword` seja igual a `newPassword`.
- Nao exigir maiuscula, numero, simbolo ou qualquer regra adicional de complexidade.

## Types

### `ForgotPasswordStep`

```text
'request' | 'sent' | 'reset'
```

O tipo inclui `reset` porque a etapa existe na spec e possui UI propria. A maquina de fluxo desta primeira versao nao deve transicionar de `sent` para `reset` por acao local.

### `ForgotPasswordRequestFormValues`

- `email: string`.

### `ForgotPasswordResetFormValues`

- `newPassword: string`.
- `confirmPassword: string`.

### Payloads futuros

- `ForgotPasswordRequestPayload` pode espelhar `ForgotPasswordRequestFormValues`.
- `ForgotPasswordResetPayload` pode conter somente os dados necessarios ao contrato futuro, sem token nesta primeira versao.
- Nenhum DTO de resposta, token, sessao, usuario ou erro remoto deve ser criado agora.

## Service Preparado

### `forgotPasswordService.ts`

O service deve preservar a fronteira arquitetural para backend futuro, seguindo a regra de `AGENTS.md`.

Planejamento:

- Declarar uma interface publica minima para futura recuperacao de senha apenas se isso for necessario para documentar o limite da feature.
- Registrar TODO informando que a implementacao depende de contrato oficial de backend e autorizacao explicita de escopo.
- Nao declarar endpoint, URL, cliente HTTP, `fetch`, axios, Supabase, mock, token, adapter executavel ou implementacao de request.
- Nao ser importado por hooks, componentes ou pagina nesta primeira versao.
- Nao criar contratos em `specs/forgot-password/contracts/`, pois nao existe contrato externo autorizado nesta etapa.

Exemplo conceitual permitido para a fase futura:

```text
interface ForgotPasswordService {
  requestResetLink(payload: ForgotPasswordRequestPayload): Promise<void>
  resendResetLink(payload: ForgotPasswordRequestPayload): Promise<void>
  resetPassword(payload: ForgotPasswordResetPayload): Promise<void>
}
```

Essa interface nao implica backend real, endpoint, token ou consumo nesta versao.

## Estados Locais

| Estado | Origem | Comportamento |
| --- | --- | --- |
| `request` | inicial | Exibe o formulario de e-mail com primeiro passo ativo. |
| `sent` | e-mail localmente valido | Exibe mensagem informativa com segundo passo ativo. |
| `reset` | link real futuro | Exibe formulario de nova senha com terceiro passo ativo, acessado apenas pelo link real de recuperacao do Supabase. |
| `emailRequired` | schema | Campo de e-mail obrigatorio ausente. |
| `emailInvalid` | schema | E-mail em formato invalido. |
| `newPasswordRequired` | schema | Nova senha obrigatoria ausente. |
| `newPasswordTooShort` | schema | Nova senha com menos de 8 caracteres. |
| `confirmPasswordRequired` | schema | Confirmacao obrigatoria ausente. |
| `confirmPasswordMismatch` | schema | Confirmacao diferente de nova senha. |
| `newPasswordVisible` | hook | Campo `Nova senha` visivel temporariamente. |
| `confirmPasswordVisible` | hook | Campo `Confirmar senha` visivel temporariamente. |

Nao criar estados de loading remoto, erro remoto, token invalido, token expirado, envio real, reenvio real, sucesso remoto, autenticacao ou navegacao.

## Fluxo Entre Etapas

```text
request
  └─ submit local valido do e-mail
      └─ sent

sent
  ├─ Enviar novamente: permanece em sent, sem reenvio real
  ├─ Simular abertura do link recebido: avanca para reset, sem link real
  └─ Voltar para login: acao visual, sem navegacao real

reset
  ├─ submit local valido: permanece sem efeito remoto
  └─ Voltar para login: acao visual, sem navegacao real
```

Regras:

- `request` e o unico estado inicial.
- A transicao `request` -> `sent` acontece somente apos submit local valido do e-mail.
- A transicao `sent` -> `reset` nao acontece por acao local; ela e reservada para o fluxo futuro via link real.
- O stepper nao controla navegacao.
- Nao ha botao superior com `ArrowLeft`; `Voltar para login` nao navega.

## Estrategia de Acessibilidade

- Usar `main` com `aria-label` descritivo da recuperacao de senha.
- Associar cada card ao titulo visivel por `aria-labelledby`.
- Associar labels e inputs por `htmlFor` e `id`.
- Expor erros por `aria-describedby`, `aria-invalid` e `role="alert"`.
- Usar `aria-current="step"` ou texto acessivel equivalente no passo atual do stepper.
- Manter o stepper nao interativo, sem `button` ou `a` nos passos.
- Acao `Voltar para login` dentro do card sem navegacao real.
- Controles de senha com nomes acessiveis `Mostrar senha` e `Ocultar senha`.
- Usar `aria-pressed` nos controles de visibilidade.
- Manter o foco no campo correspondente ao alternar mostrar/ocultar senha.
- Manter foco visivel em botoes e controles.
- Evitar que elementos decorativos entrem na arvore semantica.
- Respeitar `prefers-reduced-motion` via `useReducedMotion` quando houver Framer Motion.

## Estrategia de Responsividade

- Seguir o padrao de Auth observado em login/register: pagina de fundo claro, card central, largura maxima controlada, margens seguras e espacamento responsivo.
- Em mobile, garantir que logo, stepper, campos e botoes tenham area de toque confortavel.
- Reduzir, reposicionar ou ocultar decoracoes de fundo quando competirem com conteudo.
- Evitar overflow horizontal.
- Manter o stepper legivel em telas estreitas, permitindo reduzir espacamentos e tamanho visual dos conectores.
- Garantir que textos longos dos botoes e mensagens nao estourem o card.
- Usar CSS Module apenas para decoracoes, pseudo-elementos e ajustes responsivos que ficariam ilegíveis com Tailwind.

## Estrategia de Reutilizacao Sem Acoplamento Entre Features

Login e register servem como referencia de padrao, nao como fonte de imports.

Diretrizes:

- `forgot-password` nao deve importar `LoginField`, `LoginHeader`, `RegisterField`, `RegisterHeader`, hooks, schemas, services ou types de outras features.
- Para esta primeira implementacao, os componentes especificos de `forgot-password` podem ser criados localmente quando tiverem texto, estado ou comportamento proprio.
- Se a fase `tasks` identificar uma duplicacao transversal realmente necessaria, a reutilizacao deve ocorrer por componente compartilhado novo em `src/shared/components/auth/**`.
- Componentes compartilhados so devem ser criados para primitivas genericas de Auth, como:
  - wrapper de pagina Auth;
  - logo/header de Auth;
  - card base de Auth;
  - campo de formulario com icone e erro;
  - botao visual de voltar;
  - controle de visibilidade de senha.
- A criacao de compartilhados nao deve obrigar refatoracao de login/register nesta feature.
- Qualquer refatoracao de login/register para consumir compartilhados deve ser planejada como trabalho separado e autorizada explicitamente, pois alteraria features ja implementadas.
- Nao criar dependencia circular entre `src/shared/**` e `src/features/**`.

## Dependencias de Biblioteca

- React, TypeScript, Vite e Tailwind CSS: base ja utilizada pelo frontend.
- React Hook Form: formularios locais.
- Zod: schemas e validacoes locais.
- `@hookform/resolvers`: integracao entre React Hook Form e Zod.
- Lucide React: icones de envelope, cadeado, chave, olho e confirmacao.
- Framer Motion: microinteracoes discretas e transicoes de erro, respeitando reducao de movimento.
- Novas dependencias: nenhuma.

## Arquivos Planejados

| Path | Operacao futura | Finalidade |
| --- | --- | --- |
| `app/frontend/src/features/auth/forgot-password/pages/ForgotPasswordPage.tsx` | Criar | Compor a pagina e landmarks. |
| `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordHeader.tsx` | Criar | Logo da feature sem botao superior de voltar. |
| `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordStepper.tsx` | Criar | Stepper visual nao interativo. |
| `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordCard.tsx` | Criar | Card central e selecao do conteudo da etapa. |
| `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordRequestForm.tsx` | Criar | Formulario de e-mail e submit local. |
| `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordEmailSent.tsx` | Criar | Mensagem informativa e acoes visuais. |
| `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordResetForm.tsx` | Criar | Formulario local de nova senha. |
| `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordField.tsx` | Criar | Campo acessivel da feature. |
| `app/frontend/src/features/auth/forgot-password/hooks/useForgotPasswordFlow.ts` | Criar | Estado local de etapas. |
| `app/frontend/src/features/auth/forgot-password/hooks/useForgotPasswordRequestForm.ts` | Criar | Formulario local de e-mail. |
| `app/frontend/src/features/auth/forgot-password/hooks/useForgotPasswordResetForm.ts` | Criar | Formulario local de nova senha e visibilidade. |
| `app/frontend/src/features/auth/forgot-password/schemas/forgotPasswordSchemas.ts` | Criar | Schemas Zod da feature. |
| `app/frontend/src/features/auth/forgot-password/types/forgotPassword.ts` | Criar | Steps, form values e payloads futuros. |
| `app/frontend/src/features/auth/forgot-password/services/forgotPasswordService.ts` | Criar | Service preparado sem request real. |
| `app/frontend/src/features/auth/forgot-password/styles/ForgotPasswordPage.module.css` | Criar | Decoracoes e responsividade especificas. |
| `app/frontend/src/App.tsx` | Alterar | Compor `ForgotPasswordPage` apenas para testes locais da feature durante o desenvolvimento, sem router ou navegação. |

Arquivos compartilhados em `src/shared/components/auth/**` so devem ser adicionados se a fase `tasks` justificar reutilizacao transversal real.

## Contratos e Backend

- Backend: fora do escopo.
- API: fora do escopo.
- Supabase: fora do escopo.
- Token: fora do escopo.
- Envio e reenvio real de e-mail: fora do escopo.
- Contratos externos: nenhum nesta fase.
- Diretoria `specs/forgot-password/contracts/`: nao criar nesta versao.

## ADR

- ADR necessaria: nao.
- Motivo: o plano aplica a arquitetura existente de features Auth, a stack oficial e o padrao de service preparado. Nao altera autenticacao real, contratos globais, dependencias estruturais ou arquitetura oficial.
- Status: nao necessaria.

## Validacao da Implementacao Futura

- Executar `npm run lint`.
- Executar `npm run build`.
- Verificar visualmente desktop contra `src/assets/Tela-recuperar-senha.png`.
- Verificar responsividade em mobile sem overflow, sobreposicao ou perda de area de toque.
- Verificar stepper visual nos tres estados, sem interatividade de navegacao.
- Verificar validacao local de e-mail obrigatorio e formato invalido.
- Verificar transicao local de `Solicitar link` para `E-mail enviado`.
- Verificar transicao local de `E-mail enviado` para `Redefinir senha` somente pela acao secundaria visual `Simular abertura do link recebido`.
- Verificar validacao local de nova senha minima e confirmacao divergente.
- Verificar controles `Mostrar senha` e `Ocultar senha` com nomes acessiveis, preservacao dos valores e manutencao do foco no campo correspondente.
- Verificar que `Enviar novamente` e `Voltar para login` nao navegam nem chamam backend.
- Verificar que service nao possui URL, endpoint, `fetch`, cliente HTTP, mock ou implementacao executavel.
- Verificar que nenhum import vem de `src/features/auth/login/**` ou `src/features/auth/register/**`.
- Verificar que nao foi criado e-mail mascarado.

## Riscos e Decisoes Tecnicas

### Risco: simulacao visual parecer link real de redefinicao

Decisao: expor a etapa `Redefinir senha` somente pela acao secundaria `Simular abertura do link recebido`, com texto de apoio indicando simulacao visual local. A acao altera apenas o estado da UI e nao cria link real, rota, token, storage, backend ou navegacao real.

### Risco: acoes visuais com aparencia interativa e sem efeito real

Decisao: manter foco visivel e semantica de botao quando apropriado, mas sem handler de navegacao, request ou efeito remoto. Nao adicionar mensagens de sucesso para compensar ausencia de backend.

### Risco: duplicacao entre login/register/forgot-password

Decisao: nao importar componentes internos entre features. A duplicacao local e aceitavel quando evita refatoracao transversal. Componentes compartilhados so entram se forem genericos e aprovados na fase `tasks`.

### Risco: service sugerir backend inexistente

Decisao: service fica preparado apenas como fronteira arquitetural, sem consumo e sem implementacao HTTP. Qualquer contrato real exige fase futura e autorizacao explicita.

### Risco: stepper parecer navegavel

Decisao: stepper sera visual e nao interativo. Usar estado atual e estilo visual, sem clique, `href`, rota ou handler.

### Risco: responsividade do stepper e card

Decisao: reduzir espacamentos e decoracoes em telas menores, preservar legibilidade e evitar overflow horizontal.

## Fora do Plano

- Codigo React, TypeScript ou CSS nesta fase.
- Criacao de `tasks.md` nesta fase.
- Alteracao de `spec.md` ou `clarify.md`.
- Implementacao de backend, endpoints, token, envio real de e-mail ou navegacao real.
- Criacao de rotas, router, query params ou deeplink.
- Refatoracao de login/register.
- Importacao direta de qualquer modulo interno de login/register.
- Criacao de novas dependencias.
