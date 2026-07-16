# Tasks: Recuperacao de senha

## Status

Fase `tasks` concluida. Implementacao concluida com T001, T002, T003, T004, T005, T006 e T007 concluidas.

Nenhuma task deve ser marcada como concluida antes da execucao e aprovacao de todos os seus criterios e checks.

## Dependency Graph

```text
T001 -> T002 -> T003 -> T004 -> T005 -> T006 -> T007
```

As tarefas sao sequenciais. Durante `implement`, executar somente a proxima tarefa pendente por interacao e parar apos seus checks.

## Ordem de Execucao

1. T001 — Estrutura inicial da feature
2. T002 — Layout base
3. T003 — Etapa `Solicitar link`
4. T004 — Etapa `E-mail enviado`
5. T005 — Etapa `Redefinir senha`
6. T006 — Hooks, Schemas, Types e Service preparado
7. T007 — Responsividade, acessibilidade, refinamentos visuais e validacao final

## Tasks

### [x] T001 — Estrutura inicial da feature

- Type: setup frontend.
- Objetivo: criar a estrutura inicial de `src/features/auth/forgot-password/`, a pagina base e a composicao minima da feature, sem implementar UI completa, validacao, fluxo, service executavel ou navegacao.
- Arquivos envolvidos:
  - `app/frontend/src/features/auth/forgot-password/pages/ForgotPasswordPage.tsx`
  - `app/frontend/src/features/auth/forgot-password/styles/ForgotPasswordPage.module.css`
  - `app/frontend/src/App.tsx`
  - `app/frontend/specs/forgot-password/tasks.md`, somente para marcar T001 apos os checks.
- Dependencias:
  - Nenhuma tarefa anterior.
  - Requer `spec.md`, `clarify.md` e `plan.md` existentes e alinhados.
- Criterios de conclusao:
  - A estrutura de pastas da feature existe somente dentro de `src/features/auth/forgot-password/`.
  - `ForgotPasswordPage` existe como pagina base da feature.
  - `App.tsx` compoe `ForgotPasswordPage` apenas para exibicao local, sem router, rota, link, redirect ou navegacao real.
  - Nao ha componentes de etapas, formularios, hooks, schemas, types ou service implementados nesta tarefa.
  - Nenhum arquivo de `login`, `register`, backend, assets, public, CSS global ou dependencia foi alterado.
- Checks obrigatorios:
  - Executar `npm run lint`.
  - Executar `npm run build`.
  - Confirmar que a task alterou somente os arquivos envolvidos permitidos.
  - Confirmar ausencia de imports vindos de `src/features/auth/login/**` e `src/features/auth/register/**`.

### [x] T002 — Layout base

- Type: frontend-ui.
- Objetivo: criar a estrutura visual base da tela com header, stepper visual nao interativo e card central, sem implementar o conteudo completo das etapas.
- Arquivos envolvidos:
  - `app/frontend/src/features/auth/forgot-password/pages/ForgotPasswordPage.tsx`
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordHeader.tsx`
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordStepper.tsx`
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordCard.tsx`
  - `app/frontend/src/features/auth/forgot-password/styles/ForgotPasswordPage.module.css`
  - `app/frontend/specs/forgot-password/tasks.md`, somente para marcar T002 apos os checks.
- Dependencias:
  - T001 concluida.
- Criterios de conclusao:
  - O header renderiza a logo oficial `/logoPedeAqui.jpeg` com `alt="PedeAqui"`.
  - O header nao renderiza botao superior com `ArrowLeft`.
  - O stepper exibe `Solicitar link`, `E-mail enviado` e `Redefinir senha`.
  - O stepper destaca apenas o passo atual e nao possui clique, link, rota ou handler de navegacao.
  - O card central existe com estrutura visual base e associacao acessivel ao titulo da etapa futura.
  - Nao ha formulario, validacao, chamada de service, backend, token, API ou reenvio real.
- Checks obrigatorios:
  - Executar `npm run lint`.
  - Executar `npm run build`.
  - Confirmar ausencia de `ForgotPasswordBackButton`, `ArrowLeft`, `href`, router, redirect ou chamada de navegacao.
  - Confirmar que o stepper nao renderiza controles interativos.
  - Confirmar que somente os arquivos envolvidos permitidos foram alterados.

### [x] T003 — Etapa `Solicitar link`

- Type: frontend-ui.
- Objetivo: implementar a composicao visual da etapa inicial `Solicitar link`, com conteudo, campo de e-mail, texto auxiliar, botao principal e acao visual `Voltar para login`, ainda sem schema ou fluxo completo.
- Arquivos envolvidos:
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordCard.tsx`
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordRequestForm.tsx`
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordField.tsx`
  - `app/frontend/specs/forgot-password/tasks.md`, somente para marcar T003 apos os checks.
- Dependencias:
  - T002 concluida.
- Criterios de conclusao:
  - A etapa renderiza o titulo `Recuperar senha`, com destaque visual em `senha`.
  - A etapa renderiza o texto de apoio `Digite seu e-mail para receber um link de redefinicao de senha.`
  - O formulario visual possui somente o campo `E-mail`.
  - O campo usa label `E-mail` e placeholder `Digite seu e-mail`.
  - O texto auxiliar `Enviaremos um link valido por 1 hora para este e-mail.` aparece junto ao campo.
  - O botao principal `Enviar link de recuperacao` aparece sem chamar backend, service, API ou envio real.
  - A acao visual `Voltar para login` aparece sem navegacao real.
  - `ForgotPasswordField` associa label, input e erro de forma acessivel, mas nao contem regras de validacao.
- Checks obrigatorios:
  - Executar `npm run lint`.
  - Executar `npm run build`.
  - Confirmar ausencia de campos alem de `E-mail` nesta etapa.
  - Confirmar ausencia de backend, `fetch`, endpoint, URL, mock, token, router e navegacao.
  - Confirmar que somente os arquivos envolvidos permitidos foram alterados.

### [x] T004 — Etapa `E-mail enviado`

- Type: frontend-ui.
- Objetivo: implementar a composicao visual da etapa `E-mail enviado`, com mensagem informativa, orientacoes, botao `Enviar novamente` e acao visual `Voltar para login`, sem reenvio real, rota ou link real.
- Arquivos envolvidos:
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordCard.tsx`
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordEmailSent.tsx`
  - `app/frontend/specs/forgot-password/tasks.md`, somente para marcar T004 apos os checks.
- Dependencias:
  - T003 concluida.
- Criterios de conclusao:
  - A etapa renderiza o titulo `Verifique seu e-mail`, com destaque visual em `e-mail`.
  - A etapa renderiza o texto `Enviamos um link de redefinicao para o e-mail informado.`
  - A etapa renderiza a orientacao `Clique no link recebido para continuar a redefinicao da sua senha.`
  - A etapa renderiza as informacoes `O link e valido por 1 hora.` e `Verifique tambem sua caixa de spam ou lixo eletronico.`
  - O botao `Enviar novamente` permanece sem backend, service, API, reenvio real, loading remoto ou sucesso remoto.
  - A etapa `Redefinir senha` nao e aberta localmente; ela permanece reservada para o fluxo futuro via link real do Supabase.
  - A acao visual `Voltar para login` permanece sem navegacao real.
  - Nao ha exibicao de e-mail mascarado.
  - Nao existe link real, stepper interativo, timeout, rota, token, `localStorage` ou qualquer mecanismo alem da simulacao visual para ir de `E-mail enviado` para `Redefinir senha`.
- Checks obrigatorios:
  - Executar `npm run lint`.
  - Executar `npm run build`.
  - Confirmar que a etapa nao exibe e-mail mascarado.
  - Confirmar que nao existe caminho local de `E-mail enviado` para `Redefinir senha`.
  - Confirmar ausencia de backend, `fetch`, endpoint, URL, mock, token, router e navegacao.
  - Confirmar que somente os arquivos envolvidos permitidos foram alterados.

### [x] T005 — Etapa `E-mail enviado` e retorno para login

- Type: frontend-ui.
- Objetivo: finalizar a etapa `E-mail enviado` com os avisos previstos e o retorno para login, sem criar uma etapa local de redefinicao de senha.
- Arquivos envolvidos:
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordCard.tsx`
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordEmailSent.tsx`
  - `app/frontend/specs/forgot-password/tasks.md`, somente para marcar T005 apos os checks.
- Dependencias:
  - T004 concluida.
- Criterios de conclusao:
  - A etapa renderiza o titulo `Verifique seu e-mail`, com destaque visual em `e-mail`.
  - A etapa renderiza o texto `Enviamos um link de redefinicao para o e-mail informado.`
  - A etapa exibe os avisos de validade do link e caixa de spam.
  - A acao `Voltar para login` navega para Login por callback central.
  - Nao existe etapa local de redefinicao de senha acessada por simulacao.
- Checks obrigatorios:
  - Executar `npm run lint`.
  - Executar `npm run build`.
  - Confirmar ausencia de abertura local de link para `Redefinir senha`.
  - Confirmar que somente os arquivos envolvidos permitidos foram alterados.

### [x] T006 — Hooks, Schemas, Types e Service preparado

- Type: frontend-logic.
- Objetivo: integrar o fluxo local, os formularios, as validacoes locais, os tipos da feature e o service preparado para backend futuro, sem chamada HTTP real.
- Arquivos envolvidos:
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordCard.tsx`
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordRequestForm.tsx`
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordResetForm.tsx`
  - `app/frontend/src/features/auth/forgot-password/hooks/useForgotPasswordFlow.ts`
  - `app/frontend/src/features/auth/forgot-password/hooks/useForgotPasswordRequestForm.ts`
  - `app/frontend/src/features/auth/forgot-password/hooks/useForgotPasswordResetForm.ts`
  - `app/frontend/src/features/auth/forgot-password/schemas/forgotPasswordSchemas.ts`
  - `app/frontend/src/features/auth/forgot-password/types/forgotPassword.ts`
  - `app/frontend/src/features/auth/forgot-password/services/forgotPasswordService.ts`
  - `app/frontend/specs/forgot-password/tasks.md`, somente para marcar T006 apos os checks.
- Dependencias:
  - T005 concluida.
- Criterios de conclusao:
  - `ForgotPasswordStep` representa `request`, `sent` e `reset`.
  - O fluxo inicia em `request`.
  - A transicao local implementada e `request` -> `sent` apos e-mail localmente valido.
  - Nao existe stepper interativo, rota, token, link real, storage ou handler alternativo que avance de `sent` para uma etapa local de redefinicao.
  - O schema de solicitacao valida e-mail obrigatorio e formato valido.
  - O schema de redefinicao valida `Nova senha` obrigatoria, minimo de 8 caracteres, `Confirmar senha` obrigatoria e confirmacao igual.
  - Os hooks usam React Hook Form e Zod, sem duplicar regras nos componentes.
  - O submit valido de `Solicitar link` avanca apenas para `E-mail enviado`, sem backend, envio real, token ou sucesso remoto.
  - O service preparado existe somente com interface publica e TODOs de backend futuro, sem endpoint, URL, `fetch`, cliente HTTP, mock, token ou implementacao executavel.
  - Nenhum hook, componente ou pagina importa o service nesta versao.
- Checks obrigatorios:
  - Executar `npm run lint`.
  - Executar `npm run build`.
  - Confirmar que nao existe fluxo local de `sent` -> `reset`.
  - Confirmar que `forgotPasswordService.ts` nao contem URL, endpoint, `fetch`, cliente HTTP, mock, token ou chamada executavel.
  - Confirmar que nenhum arquivo importa de `src/features/auth/login/**` ou `src/features/auth/register/**`.
  - Confirmar que somente os arquivos envolvidos permitidos foram alterados.

### [x] T007 — Responsividade, acessibilidade, refinamentos visuais e validacao final

- Type: validation/refinement.
- Objetivo: finalizar responsividade, acessibilidade, microinteracoes permitidas, isolamento visual e validacao completa da feature contra `spec.md`, `clarify.md` e `plan.md`.
- Arquivos envolvidos:
  - `app/frontend/src/features/auth/forgot-password/pages/ForgotPasswordPage.tsx`
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordHeader.tsx`
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordStepper.tsx`
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordCard.tsx`
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordRequestForm.tsx`
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordEmailSent.tsx`
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordResetForm.tsx`
  - `app/frontend/src/features/auth/forgot-password/components/ForgotPasswordField.tsx`
  - `app/frontend/src/features/auth/forgot-password/styles/ForgotPasswordPage.module.css`
  - `app/frontend/specs/forgot-password/tasks.md`, somente para registrar resultados e marcar T007 apos os checks.
- Dependencias:
  - T006 concluida.
- Criterios de conclusao:
  - A tela preserva legibilidade em desktop e mobile.
  - O card, stepper, campos, botoes e textos nao geram overflow horizontal.
  - Decoracoes de fundo nao cobrem conteudo, foco ou controles e podem ser simplificadas em mobile.
  - `main`, card, campos, erros, stepper, botoes e controles de senha possuem semantica acessivel conforme o plano.
  - O stepper permanece visual e nao interativo.
  - `Voltar para login` navega para a tela de Login via callback central em `App.tsx`; `Enviar novamente` continua sem chamada remota.
  - Nao existe botao superior com `ArrowLeft`.
  - Nao foi criado e-mail mascarado.
  - Nao existe backend, API, token, endpoint, envio real de e-mail, reenvio real, autenticacao, rota ou navegacao real.
  - Nao ha import direto de `login` ou `register`.
  - Nenhuma alteracao ocorreu fora do Scope Lock.
- Checks obrigatorios:
  - Executar `npm run lint`.
  - Executar `npm run build`.
  - Verificar visualmente contra `src/assets/Tela-recuperar-senha.png`.
  - Verificar responsividade em viewports mobile e desktop.
  - Verificar navegacao por teclado, foco visivel, labels, erros, `aria-current`, `aria-invalid`, `aria-describedby`, `role="alert"`, `aria-label` e `aria-pressed`.
  - Verificar que o controle de mostrar/ocultar senha preserva o foco no campo correspondente.
  - Verificar validacoes locais de e-mail, senha minima e confirmacao divergente.
  - Verificar que `Voltar para login` navega para a tela de Login nas etapas `request`, `sent` e `reset` sem executar backend.
  - Verificar transicao local de `Solicitar link` para `E-mail enviado`.
  - Verificar que nao existe transicao local de `E-mail enviado` para uma etapa de redefinicao.
  - Verificar ausencia de e-mail mascarado.
  - Revisar o diff completo e confirmar o Scope Lock.

## Notes

- Executar apenas a proxima task pendente quando a fase `implement` for explicitamente solicitada.
- Marcar uma task como concluida somente depois de todos os checks da propria task.
- Se um check falhar, manter a task aberta e corrigir somente dentro dos paths permitidos da task atual.
- Nao usar a fase `tasks` para implementar codigo.
- Nao alterar `spec.md`, `clarify.md` ou `plan.md` durante a implementacao.
- Nao criar backend, API, token, endpoint, envio real de e-mail, reenvio real, rota ou navegacao real.
- Nao importar componentes, hooks, schemas, services ou types internos de `login` ou `register`.
- Nao criar componentes compartilhados nesta sequencia de tasks; qualquer compartilhamento futuro exige revisao explicita do plano e tasks proprias.
