# Tasks: Login de lojista

## Dependency Graph

```text
T001 -> T002 -> T003 -> T004 -> T005 -> T006 -> T007 -> T008
```

As tarefas são estritamente sequenciais. Durante `implement`, executar somente a próxima tarefa pendente por interação e parar após seus checks.

## Tasks

### [x] T001 — Criar tipos, schema e limite do service

- Type: fundação da feature.
- Objetivo: estabelecer o modelo local do formulário, suas validações Zod e o arquivo de service com TODO, sem criar qualquer integração externa.
- Arquivos permitidos:
  - `app/frontend/src/features/auth/login/types/login.ts`
  - `app/frontend/src/features/auth/login/schemas/loginSchema.ts`
  - `app/frontend/src/features/auth/login/services/loginService.ts`
  - `app/frontend/specs/login/tasks.md`, somente para marcar T001 como concluída após todos os checks passarem.
- Arquivos proibidos:
  - Todos os arquivos não listados como permitidos nesta tarefa.
  - Em especial: `app/frontend/src/App.tsx`, outros arquivos em `src/features/auth/login/**`, `app/frontend/src/features/**` fora de login, `src/shared/**`, `src/assets/**`, `public/**`, `package.json`, arquivos de lock, `.specify/**`, `docs/**`, `app/backend/**`, `database/**`, `supabase/**`, migrations, rotas e contratos de backend.
- Depende de: nenhuma tarefa.
- Requisitos:
  - Declarar `LoginFormValues` somente com `email` e `password` do tipo `string`.
  - Validar e-mail obrigatório e em formato válido.
  - Validar senha somente como obrigatória e não vazia, sem tamanho mínimo ou complexidade.
  - Usar mensagens de validação em português do Brasil.
  - Criar `loginService.ts` somente com TODO sobre futura definição após contrato oficial e autorização de escopo.
  - Não criar endpoint, URL, cliente HTTP, mock, payload remoto, operação executável ou resposta de autenticação.
- Concluída quando:
  - tipos e schema representam exatamente os dois campos da spec;
  - o service não contém integração nem função executável;
  - nenhum arquivo de tarefa futura foi criado.
- Checks obrigatórios:
  - Revisar que `loginSchema` aceita senha não vazia sem impor outras regras.
  - Buscar em `loginService.ts` e confirmar ausência de URL, `fetch`, cliente HTTP, mock, token e função de autenticação.
  - Executar `npm run lint`.
  - Executar `npm run build`.
  - Confirmar que somente os arquivos permitidos foram alterados.

### [x] T002 — Criar o hook local do formulário

- Type: estado e orquestração.
- Objetivo: configurar React Hook Form com o schema e controlar a visibilidade da senha, mantendo o submit válido intencionalmente sem efeito.
- Arquivos permitidos:
  - `app/frontend/src/features/auth/login/hooks/useLoginForm.ts`
  - `app/frontend/specs/login/tasks.md`, somente para marcar T002 como concluída após todos os checks passarem.
- Arquivos proibidos:
  - Todos os arquivos não listados como permitidos nesta tarefa.
  - Em especial: arquivos de tipos, schema e service concluídos em T001; componentes, página, estilos, `src/App.tsx`, outras features, `src/shared/**`, `src/assets/**`, `public/**`, configurações, documentação, backend, banco, Supabase, migrations e rotas.
- Depende de: T001 concluída e validada.
- Requisitos:
  - Usar `useForm<LoginFormValues>` e `zodResolver(loginSchema)`.
  - Expor somente os dados necessários ao futuro `LoginForm`: registro dos campos, erros, submit e estado/alternância de visibilidade da senha.
  - O submit com dados válidos não deve autenticar, chamar service, navegar, limpar campos ou emitir sucesso.
  - Não criar estado de loading, erro remoto, sessão ou usuário autenticado.
- Concluída quando:
  - o hook centraliza formulário e alternância da senha;
  - o hook não importa `loginService` nem possui side effects externos;
  - nenhum componente foi antecipado.
- Checks obrigatórios:
  - Revisar que o handler válido é local e não produz efeito observável.
  - Revisar ausência de requests, navegação, timers, mocks, loading, sucesso e autenticação.
  - Executar `npm run lint`.
  - Executar `npm run build`.
  - Confirmar que somente o arquivo permitido foi alterado.

### [x] T003 — Criar o campo acessível da feature

- Type: componente de apresentação.
- Objetivo: criar `LoginField` para renderizar label, ícone, input, ação final opcional e erro acessível, sem lógica de validação ou integração.
- Arquivos permitidos:
  - `app/frontend/src/features/auth/login/components/LoginField.tsx`
  - `app/frontend/specs/login/tasks.md`, somente para marcar T003 como concluída após todos os checks passarem.
- Arquivos proibidos:
  - Todos os arquivos não listados como permitidos nesta tarefa.
  - Em especial: demais componentes, hooks, schemas, services, tipos, página, estilos, `src/App.tsx`, outras features, `src/shared/**`, assets, configurações, documentação, backend, banco, Supabase, migrations e rotas.
- Depende de: T002 concluída e validada.
- Requisitos:
  - Aceitar propriedades suficientes para os campos de e-mail e senha, sem generalização além da necessidade atual.
  - Associar label e controle por `htmlFor` e `id`.
  - Associar erro por `aria-invalid`, `aria-describedby` e `role="alert"` quando aplicável.
  - Suportar ação final acessível para mostrar/ocultar senha.
  - Aplicar somente tokens e padrões citados no Design System do `plan.md`.
  - Não conter validação, hook, service, navegação ou side effect.
- Concluída quando:
  - o componente suporta exatamente os dois usos planejados;
  - foco, erro e ação final possuem semântica acessível;
  - nenhum outro componente foi criado.
- Checks obrigatórios:
  - Revisar associação de label, input e mensagem de erro.
  - Revisar foco visível e nome acessível da ação final.
  - Executar `npm run lint`.
  - Executar `npm run build`.
  - Confirmar que somente o arquivo permitido foi alterado.

### [x] T004 — Criar o formulário de login

- Type: componente funcional da interface.
- Objetivo: compor os campos, ações visuais e botão `Entrar` usando o hook e o campo já criados.
- Arquivos permitidos:
  - `app/frontend/src/features/auth/login/components/LoginForm.tsx`
  - `app/frontend/specs/login/tasks.md`, somente para marcar T004 como concluída após todos os checks passarem.
- Arquivos proibidos:
  - Todos os arquivos não listados como permitidos nesta tarefa.
  - Em especial: `LoginField.tsx`, hook, schema, service, tipos, outros componentes, página, estilos, `src/App.tsx`, outras features, `src/shared/**`, assets, configurações, documentação, backend, banco, Supabase, migrations e rotas.
- Depende de: T003 concluída e validada.
- Requisitos:
  - Renderizar somente `E-mail` e `Senha`, nesta ordem.
  - Usar placeholders `Digite seu e-mail` e `Digite sua senha`.
  - Usar ícones Lucide de envelope, cadeado e olho, conforme o Design System.
  - Alternar senha oculta/visível sem perder o valor, com `Mostrar senha`/`Ocultar senha` e `aria-pressed` coerentes.
  - Exibir `Esqueci minha senha` apenas visualmente, com foco visível, sem navegação ou ação funcional.
  - Exibir botão primário `Entrar`, conectado somente à validação local.
  - Não incluir nome, CPF/CNPJ, confirmar senha, loading, mensagem de sucesso ou erro remoto.
  - Não importar nem chamar `loginService`.
- Concluída quando:
  - o formulário contém somente os elementos previstos;
  - erros locais podem ser exibidos junto aos campos;
  - submit válido não produz autenticação, navegação ou sucesso.
- Checks obrigatórios:
  - Revisar ordem, labels, placeholders e `autoComplete` apropriados.
  - Revisar que mostrar/ocultar senha preserva o valor.
  - Revisar que `Esqueci minha senha` não possui destino nem handler funcional.
  - Revisar ausência de campos e estados fora do escopo.
  - Executar `npm run lint`.
  - Executar `npm run build`.
  - Confirmar que somente o arquivo permitido foi alterado.

### [x] T005 — Criar o card de login

- Type: composição visual.
- Objetivo: criar o card central com ícone, título, subtítulo, formulário, divisor e chamada visual auxiliar.
- Arquivos permitidos:
  - `app/frontend/src/features/auth/login/components/LoginCard.tsx`
  - `app/frontend/specs/login/tasks.md`, somente para marcar T005 como concluída após todos os checks passarem.
- Arquivos proibidos:
  - Todos os arquivos não listados como permitidos nesta tarefa.
  - Em especial: demais componentes, hook, schema, service, tipos, página, estilos, `src/App.tsx`, outras features, `src/shared/**`, assets, configurações, documentação, backend, banco, Supabase, migrations e rotas.
- Depende de: T004 concluída e validada.
- Requisitos:
  - Usar card branco central com largura controlada, borda, radius e sombra do Design System.
  - Exibir ícone de entrada em círculo `primary-soft`.
  - Exibir `Entrar na sua conta`, com `Entrar` destacado em vermelho.
  - Exibir o subtítulo integral da spec, com `PedeAqui` destacado em vermelho.
  - Compor `LoginForm`.
  - Exibir divisor `ou` e `Não tem uma conta? Cadastre-se`.
  - Manter `Cadastre-se` apenas visual, focável e sem navegação ou ação.
  - Usar Framer Motion somente para entrada sutil e respeitar `prefers-reduced-motion`.
- Concluída quando:
  - conteúdo, hierarquia e semântica do card correspondem à spec e à referência visual;
  - nenhuma ação auxiliar navega ou executa comportamento;
  - nenhuma página ou header foi antecipado.
- Checks obrigatórios:
  - Revisar textos e destaques visuais exatamente conforme a spec.
  - Revisar o uso de `aria-labelledby` ou associação equivalente do card ao título.
  - Revisar que `Cadastre-se` não possui destino nem handler funcional.
  - Revisar redução de movimento.
  - Executar `npm run lint`.
  - Executar `npm run build`.
  - Confirmar que somente o arquivo permitido foi alterado.

### [x] T006 — Criar o header sticky

- Type: componente de layout.
- Objetivo: criar o header sticky com logo oficial e ação visual `Cadastrar`, independente de qualquer rota.
- Arquivos permitidos:
  - `app/frontend/src/features/auth/login/components/LoginHeader.tsx`
  - `app/frontend/specs/login/tasks.md`, somente para marcar T006 como concluída após todos os checks passarem.
- Arquivos proibidos:
  - Todos os arquivos não listados como permitidos nesta tarefa.
  - Em especial: demais componentes, hook, schema, service, tipos, página, estilos, `src/App.tsx`, outras features, `src/shared/**`, `src/assets/**`, `public/**`, configurações, documentação, backend, banco, Supabase, migrations e rotas.
- Depende de: T005 concluída e validada.
- Requisitos:
  - Usar a logo existente em `/logoPedeAqui.jpeg`, sem recriá-la nem alterá-la.
  - Manter o header sticky, com fundo branco, borda e sombra sutil.
  - Exibir `Não tem uma conta?` e `Cadastrar` com ícone de usuário com adição.
  - Manter `Cadastrar` apenas visual, focável e sem navegação ou ação.
  - Preservar legibilidade e espaço em breakpoints mobile e desktop.
- Concluída quando:
  - o header atende ao conteúdo e comportamento definidos;
  - a logo é consumida do caminho oficial;
  - não existe importação de rota ou de outra feature.
- Checks obrigatórios:
  - Revisar semântica do header e texto alternativo da logo.
  - Revisar comportamento sticky e foco visível da ação.
  - Revisar que `Cadastrar` não possui destino nem handler funcional.
  - Executar `npm run lint`.
  - Executar `npm run build`.
  - Confirmar que somente o arquivo permitido foi alterado.

### [x] T007 — Compor a página e os estilos decorativos

- Type: página e estilo específico da feature.
- Objetivo: compor header e card na página e criar somente os estilos necessários às decorações responsivas da referência visual.
- Arquivos permitidos:
  - `app/frontend/src/features/auth/login/pages/LoginPage.tsx`
  - `app/frontend/src/features/auth/login/styles/LoginPage.module.css`
  - `app/frontend/specs/login/tasks.md`, somente para marcar T007 como concluída após todos os checks passarem.
- Arquivos proibidos:
  - Todos os arquivos não listados como permitidos nesta tarefa.
  - Em especial: componentes, hook, schema, service, tipos, `src/App.tsx`, outras features, `src/shared/**`, `src/assets/**`, `public/**`, `src/index.css`, configurações, documentação, backend, banco, Supabase, migrations e rotas.
- Depende de: T006 concluída e validada.
- Requisitos:
  - Compor `LoginHeader` e `LoginCard` em fundo claro e área principal centralizada.
  - Compensar a altura do header sticky para que ele não cubra o conteúdo.
  - Identificar a região principal de forma acessível.
  - Usar Tailwind para layout e tokens comuns.
  - Limitar o CSS Module a pseudo-elementos, forma orgânica, pontilhados e media queries decorativas.
  - Simplificar, reposicionar ou omitir decorações em mobile para preservar legibilidade.
  - Não alterar CSS global nem o asset de referência.
- Concluída quando:
  - página, header e card estão compostos sem sobreposição;
  - estilos decorativos permanecem isolados na feature;
  - layout se adapta a mobile e desktop conforme Design System e `src/assets/Tela-login.png`.
- Checks obrigatórios:
  - Revisar que o CSS Module contém apenas estilos específicos/decorativos justificados pelo plano.
  - Revisar ausência de overflow horizontal e sobreposição causada pelo header.
  - Revisar simplificação das decorações no breakpoint mobile.
  - Executar `npm run lint`.
  - Executar `npm run build`.
  - Confirmar que somente os arquivos permitidos foram alterados.

### [ ] T008 — Integrar a página e validar a feature completa

- Type: integração frontend e validação final.
- Objetivo: exibir `LoginPage` pela composição principal existente, conectar a ação `Esqueci minha senha` à tela de recuperação de senha e validar todo o Scope Lock.
- Arquivos permitidos:
  - `app/frontend/src/App.tsx`
  - `app/frontend/src/features/auth/login/pages/LoginPage.tsx`
  - `app/frontend/src/features/auth/login/components/LoginCard.tsx`
  - `app/frontend/src/features/auth/login/components/LoginForm.tsx`
  - `app/frontend/specs/login/tasks.md`, somente para marcar T008 como concluída após todos os checks passarem.
- Arquivos proibidos:
  - Todos os arquivos não listados como permitidos nesta tarefa.
  - Em especial: outras features, `src/shared/**`, `src/main.tsx`, `src/index.css`, assets, `public/**`, configurações, documentação, backend, banco, Supabase, migrations, rotas e contratos.
- Depende de: T007 concluída e validada.
- Requisitos:
  - Importar e renderizar `LoginPage` e a tela de recuperação de senha.
  - Encaminhar a ação `Esqueci minha senha` para a tela de recuperação de senha por meio de callback centralizado em `App.tsx`.
  - Não configurar router, rota, link, redirecionamento ou navegação além do fluxo central já existente.
  - Não alterar a feature durante esta tarefa; qualquer problema encontrado nela exige parar e revisar a tarefa correspondente.
- Concluída quando:
  - a aplicação exibe a tela de login;
  - a ação `Esqueci minha senha` encaminha para a recuperação de senha;
  - todos os requisitos da spec e decisões do clarify foram verificados;
  - nenhum comportamento fora do escopo foi introduzido.
- Checks obrigatórios:
  - Executar `npm run lint`.
  - Executar `npm run build`.
  - Comparar visualmente em desktop com `src/assets/Tela-login.png`.
  - Verificar em mobile legibilidade, toque, ausência de overflow/sobreposição e simplificação das decorações.
  - Navegar por teclado e verificar ordem de foco, labels, mensagens de erro e nomes `Mostrar senha`/`Ocultar senha`.
  - Verificar estados inicial, preenchido, senha visível, campo obrigatório e e-mail inválido.
  - Verificar que `Entrar` com dados válidos não autentica, não chama service/backend, não navega e não exibe sucesso.
  - Verificar que `Esqueci minha senha` navega para a tela de recuperação de senha sem executar backend ou envio real.
  - Verificar ausência de `Voltar ao início`, nome, CPF/CNPJ, confirmar senha e login social.
  - Confirmar que somente os arquivos permitidos foram alterados nesta tarefa.

## Notes

- Marcar uma tarefa como concluída em `specs/login/tasks.md` somente após todos os seus checks obrigatórios passarem; essa é a única alteração documental permitida durante cada tarefa de implementação.
- Executar somente uma tarefa por interação durante a fase `implement`.
- Não antecipar arquivos ou comportamentos de tarefas futuras.
- Se um check falhar, corrigir somente dentro dos arquivos permitidos da tarefa atual; se isso não for possível, parar e revisar o planejamento.
- Não criar backend, contratos, endpoints, mocks, rotas, navegação ou novas dependências.
- O Design System oficial e `src/assets/Tela-login.png` são as únicas fontes visuais da implementação.
- O Scope Lock de `specs/login/plan.md` permanece integralmente aplicável.
