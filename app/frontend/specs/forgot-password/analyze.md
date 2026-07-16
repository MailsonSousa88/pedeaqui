# Analyze: Recuperacao de senha

## Status da fase analyze

- Fase: `analyze`.
- Status: concluida.
- Resultado: aprovada sem bloqueios.
- Proxima fase autorizada: `implement`.
- Proxima task obrigatoria: T001.

## Resumo executivo

`spec.md`, `clarify.md`, `plan.md` e `tasks.md` estao alinhados quanto ao objetivo da feature, ao escopo frontend-only, ao fluxo local permitido, a ausencia de backend e a arquitetura por feature em `src/features/auth/forgot-password/`.

Nao foram encontradas contradicoes criticas, lacunas funcionais ou riscos arquiteturais que impecam a implementacao. A feature esta pronta para iniciar a fase `implement`, com execucao obrigatoria a partir de T001.

## Checklist de consistencia

### Spec

- [x] Objetivo da feature definido como recuperacao de senha do dominio Auth.
- [x] Escopo frontend-only definido.
- [x] Tres etapas especificadas: `Solicitar link`, `E-mail enviado` e `Redefinir senha`.
- [x] Backend, envio real de e-mail, token, autenticacao, persistencia e navegacao real estao fora do escopo.
- [x] Validacoes locais estao delimitadas: e-mail obrigatorio/formato, senha minima e confirmacao igual.
- [x] Acoes visuais permanecem sem navegacao real.
- [x] Nao ha ambiguidades abertas registradas na spec.

### Clarify

- [x] Fase `clarify` esta concluida.
- [x] Q1 resolveu que `Redefinir senha` nao sera acessada a partir de `E-mail enviado`.
- [x] Q2 removeu o requisito de e-mail mascarado.
- [x] Nao existem pendencias funcionais abertas.
- [x] Nao ha novas decisoes necessarias antes de `implement`.

### Plan

- [x] Define arquitetura em `src/features/auth/forgot-password/`.
- [x] Define Scope Lock tecnico e funcional.
- [x] Proibe imports diretos de `login` e `register`.
- [x] Mantem service preparado sem HTTP real.
- [x] Define componentes, hooks, schemas, types, estados locais e fluxo entre etapas.
- [x] Define estrategia de acessibilidade, responsividade e reutilizacao sem acoplamento entre features.
- [x] Avalia ADR como desnecessaria.

### Tasks

- [x] Existem sete tasks pequenas, sequenciais e implementaveis em etapas isoladas.
- [x] O grafo T001 -> T002 -> T003 -> T004 -> T005 -> T006 -> T007 esta coerente.
- [x] Cada task possui objetivo, arquivos envolvidos, dependencias, criterios de conclusao e checks.
- [x] As tasks nao criam backend, roteamento, navegacao real ou integracao com API.
- [x] As tasks preservam `spec.md`, `clarify.md` e `plan.md`.
- [x] A implementacao comeca obrigatoriamente por T001.

## Matriz de cobertura funcional

| Requisito | Cobertura no plan | Cobertura nas tasks | Status |
| --- | --- | --- | --- |
| RF-FE-001: solicitar link com e-mail, validacao local e avanco local para `E-mail enviado` | `ForgotPasswordRequestForm`, `useForgotPasswordRequestForm`, `requestResetSchema`, fluxo `request -> sent` | T003, T006, T007 | Coberto |
| RF-FE-002: etapa `E-mail enviado`, informacoes, `Enviar novamente` sem reenvio real e `Voltar para login` sem navegacao | `ForgotPasswordEmailSent`, regras do fluxo e Scope Lock funcional | T004, T006, T007 | Coberto |
| RF-FE-003: etapa `Redefinir senha`, dois campos, validacoes locais e sem alteracao real de senha | `ForgotPasswordResetForm`, `useForgotPasswordResetForm`, `resetPasswordSchema` | T005, T006, T007 | Coberto |
| RF-FE-004: mostrar/ocultar as senhas com acessibilidade | controles de senha no reset form e estrategia de acessibilidade | T005, T006, T007 | Coberto |
| RF-FE-005: identidade visual PedeAqui, stepper, card, responsividade, botao `ArrowLeft` e sem navegacao real | layout base, stepper, header, back button, CSS Module e responsividade | T002, T007 | Coberto |

## Cobertura das decisoes de clarify

| Decisao | Reflexo no plan | Reflexo nas tasks | Status |
| --- | --- | --- | --- |
| `Redefinir senha` nao sera acessada a partir de `E-mail enviado` | Scope Lock funcional, `useForgotPasswordFlow`, fluxo entre etapas e riscos tecnicos | T004, T005, T006, T007 | Coberta |
| Nao criar transicao artificial para alcancar a terceira etapa | Proibicao de stepper interativo, rota, timeout, link falso, hash ou query param | T002, T004, T006, T007 | Coberta |
| Remover e-mail mascarado | Plan declara nao exibir e-mail mascarado | T004 e T007 | Coberta |
| Etapa `E-mail enviado` exibe apenas mensagem informativa prevista | `ForgotPasswordEmailSent` | T004 | Coberta |

## Validacao do Scope Lock

- [x] Target limitado ao frontend da feature `forgot-password`.
- [x] Implementacao futura limitada a `src/features/auth/forgot-password/**` e `src/App.tsx` para composicao local.
- [x] `src/App.tsx` fica limitado a exibicao local da pagina, sem router ou navegacao.
- [x] `src/features/auth/login/**` e `src/features/auth/register/**` permanecem proibidos para alteracao.
- [x] Imports diretos de login/register sao proibidos.
- [x] Backend, banco, Supabase, migrations, endpoints, API e contratos externos estao proibidos.
- [x] `src/assets/**`, `public/**`, CSS global, dependencias e `.specify/**` estao protegidos.
- [x] `tasks.md` so podera ser atualizado durante `implement` para marcar a tarefa atual apos os checks.

Resultado: Scope Lock valido.

## Dependencias entre features

- [x] `login` e `register` sao usados apenas como referencia documental e conceitual.
- [x] Nao ha plano ou task que importe componentes, hooks, schemas, services ou types internos de outras features.
- [x] Reutilizacao compartilhada foi tratada como possibilidade futura, sem entrar nesta sequencia de tasks.
- [x] Nao existe dependencia circular planejada entre `shared` e `features`.

Resultado: nao ha dependencia indevida entre features.

## Service preparado

- [x] O plan exige `forgotPasswordService.ts`.
- [x] O service fica restrito a interface publica minima e TODOs de backend futuro.
- [x] Endpoint, URL, `fetch`, cliente HTTP, Supabase, mock, token e request executavel estao proibidos.
- [x] Hooks, componentes e pagina nao devem importar o service nesta versao.
- [x] Nenhum contrato externo sera criado em `specs/forgot-password/contracts/`.

Resultado: estrategia de service preparada esta consistente com `AGENTS.md`.

## Riscos arquiteturais

### Risco: terceira etapa sem acesso a partir de `E-mail enviado`

Status: controlado.

Motivo: `clarify.md`, `plan.md` e `tasks.md` convergem em nao criar transicao artificial. A etapa `Redefinir senha` permanece implementavel como parte visual e validavel da feature, sem integrar o fluxo local `sent -> reset`.

### Risco: stepper parecer navegavel

Status: controlado.

Motivo: o plan e T002/T007 exigem stepper visual nao interativo, sem `button`, `a`, rota ou handler de navegacao.

### Risco: service sugerir backend inexistente

Status: controlado.

Motivo: T006 exige ausencia de endpoint, URL, `fetch`, cliente HTTP, mock, token ou chamada executavel.

### Risco: acoplamento com login/register

Status: controlado.

Motivo: plan e tasks proibem imports diretos e alteracoes em `login` e `register`.

## Inconsistencias criticas

Nenhuma inconsistencia critica foi encontrada.

## Lacunas bloqueantes

Nenhuma lacuna bloqueante foi encontrada.

## Observacoes nao bloqueantes

- A etapa `Redefinir senha` deve ser implementada sem criar acesso interativo a partir de `E-mail enviado`; os checks de T006 e T007 devem confirmar esse ponto.
- A validacao visual da etapa `Redefinir senha` deve respeitar a estrategia do plan sem introduzir rota, token, query string, hash ou controle oculto.
- Como esta fase e documental, `npm run lint` e `npm run build` nao foram executados agora; esses checks estao previstos nas tasks de implementacao.

## Parecer final

A feature `forgot-password` esta apta para iniciar a fase `implement`.

Condicoes obrigatorias para a proxima fase:

1. iniciar exclusivamente pela T001;
2. respeitar os arquivos envolvidos e o Scope Lock da tarefa atual;
3. nao antecipar tarefas posteriores;
4. nao alterar `spec.md`, `clarify.md` ou `plan.md`;
5. executar os checks obrigatorios da task antes de marca-la como concluida;
6. parar apos concluir a task atual.

Proxima task obrigatoria: **T001 — Estrutura inicial da feature**.
