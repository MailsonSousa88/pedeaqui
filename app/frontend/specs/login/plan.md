# Plan: Login de lojista

## Resumo Técnico

Implementar, em fase futura, uma tela frontend de login em `src/features/auth/login/`, organizada por responsabilidades e composta por React, TypeScript, React Hook Form e Zod. A tela realizará somente validações locais de e-mail e senha e controle local de visibilidade da senha. Não haverá autenticação, requisição HTTP, backend ou feedback de sucesso; a navegação para a recuperação de senha será centralizada em `App.tsx` por meio de callback.

A composição visual seguirá a referência `src/assets/Tela-login.png` e o Design System oficial do frontend.

## Flow Context

- Flow: `merchant-flow`.
- Posição: entrada de lojistas já cadastrados, inclusive após sessão expirada ou tentativa de acesso a uma área protegida.
- Entrada: acesso direto à tela de login ou chegada conceitual a partir da tela inicial, sessão expirada ou área protegida.
- Saída/próximo passo: não definido nesta primeira implementação.
- Restrições derivadas do fluxo:
  - o formulário encerra seu comportamento nas validações locais;
  - `Entrar` não autentica, não chama backend, não navega e não exibe sucesso quando os campos são válidos;
  - `Cadastrar` e `Cadastre-se` seguem o comportamento já existente da tela;
  - `Esqueci minha senha` navega para a tela de recuperação de senha via callback central, sem integrar backend;
  - `Voltar ao início` não será incluído;
  - nenhum estado de sessão, autorização, onboarding ou destino protegido será tratado.

## Scope Lock

Target: frontend da feature de login.

Allowed paths:

- `app/frontend/specs/login/plan.md`, somente durante a fase `plan`.
- `app/frontend/specs/login/tasks.md`, durante `tasks` e, em `implement`, somente para marcar a tarefa atual como concluída após todos os checks obrigatórios passarem.
- `app/frontend/src/features/auth/login/**`, nas futuras fases autorizadas.
- `app/frontend/src/App.tsx`, somente para compor `LoginPage` e encaminhar a navegação para a recuperação de senha sem adicionar roteamento novo além da camada central existente.

Forbidden paths:

- `app/backend/**`.
- `app/frontend/src/features/**`, exceto `src/features/auth/login/**`.
- `app/frontend/src/shared/**`, pois esta entrega não autoriza refatoração compartilhada.
- `app/frontend/src/assets/**`; `Tela-login.png` é somente referência e não será alterada nem usada como implementação da tela.
- `app/frontend/public/**`; a logo existente será apenas consumida.
- `app/frontend/src/main.tsx`.
- `app/frontend/src/index.css` e qualquer CSS global.
- `app/frontend/package.json` e arquivos de lock.
- `app/frontend/.specify/**`.
- `app/frontend/docs/**` e `docs/**` globais.
- `database/**`, `supabase/**`, migrations, endpoints, controllers, use cases, repositories e contratos de backend.
- Qualquer arquivo de rota ou navegação.

Scope Lock funcional:

- Implementar somente header sticky, card central, campos `E-mail` e `Senha`, alternância de visibilidade da senha, validações locais, botão `Entrar`, divisor `ou` e ações auxiliares estritamente visuais.
- Não incluir nome, CPF/CNPJ, confirmação de senha, login social ou `Voltar ao início`.
- Não implementar autenticação, persistência, sessão, request HTTP, mock, endpoint, loading remoto, credenciais inválidas, sucesso ou redirecionamento.
- Não adicionar dependências, abstrações compartilhadas ou refatorações fora da feature de login.
- A navegação entre login e recuperação de senha deve ser emitida como callback da página de login e tratada centralmente em `App.tsx`.
- Qualquer necessidade fora desses paths ou comportamentos interrompe a implementação e exige revisão do plano antes de continuar.

## Arquitetura

A feature seguirá a estrutura oficial por domínio:

```text
src/features/auth/login/
├── components/
├── hooks/
├── pages/
├── schemas/
├── services/
├── styles/
└── types/
```

Responsabilidades:

- `pages/`: compor a página, o header e a área principal, sem validação ou regra de formulário.
- `components/`: renderizar card, formulário e campos; componentes não acessam service nem backend.
- `hooks/`: integrar React Hook Form ao schema, expor erros e controlar a visibilidade da senha.
- `schemas/`: centralizar as validações locais com Zod.
- `types/`: declarar os valores do formulário e tipos exclusivos da feature.
- `services/`: reservar o limite da futura integração por meio de TODO explícito, sem implementação executável, endpoint, URL, mock ou consumo pelo hook.
- `styles/`: conter somente os pseudo-elementos e regras responsivas dos elementos decorativos que não sejam expressáveis de forma legível com Tailwind.

Fluxo interno planejado:

1. `LoginPage` compõe `LoginHeader` e `LoginCard`.
2. `LoginCard` apresenta ícone, título, subtítulo e `LoginForm`.
3. `LoginForm` consome exclusivamente `useLoginForm` e renderiza os dois `LoginField`.
4. `useLoginForm` usa `loginSchema` por meio de `zodResolver`, mantém a visibilidade da senha e fornece um submit local sem efeito após validação válida.
5. `loginService.ts` não participa do fluxo desta primeira implementação.

Não será criado componente compartilhado nesta entrega. A consistência visual será garantida pelo Design System oficial do frontend, sem importação direta entre features.

## Componentes

### `LoginPage`

- Container de página com fundo claro e decorações responsivas.
- Composição de `LoginHeader` e conteúdo principal centralizado.
- Compensação da altura do header sticky para impedir sobreposição.
- Identificação acessível da região principal como login de lojista.

### `LoginHeader`

- Header sticky no topo, com fundo branco, borda e sombra sutil.
- Logo oficial `/logoPedeAqui.jpeg` à esquerda, conforme `AGENTS.md` e a spec.
- Texto `Não tem uma conta?` e controle visual `Cadastrar` à direita.
- `Cadastrar` terá aparência e foco visível, mas nenhuma navegação ou ação.
- Responsividade definida pelo Design System oficial e pela referência `src/assets/Tela-login.png`.

### `LoginCard`

- Card central com largura controlada e adequada ao conteúdo de dois campos.
- Ícone de entrada em container `primary-soft`.
- Título `Entrar na sua conta`, com `Entrar` em `primary`.
- Subtítulo da spec, com `PedeAqui` em `primary`.
- Composição de `LoginForm`, divisor `ou` e chamada visual `Não tem uma conta? Cadastre-se`.
- `Cadastre-se` terá foco visível, sem navegação ou ação.

### `LoginForm`

- Formulário com `E-mail` e `Senha`, nesta ordem.
- Uso de `LoginField` para manter label, ícone, input e erro consistentes.
- Controle de mostrar/ocultar senha com `aria-label` e `aria-pressed` coerentes.
- Ação `Esqueci minha senha` que emite um callback de navegação para a recuperação de senha, sem autenticação ou backend.
- Botão primário `Entrar` que dispara somente a validação local.
- Nenhum loading, sucesso, autenticação ou chamada ao service.

### `LoginField`

- Componente de apresentação específico da feature para label, ícone, input e mensagem de erro.
- Associação por `htmlFor`/`id`, `aria-invalid`, `aria-describedby` e `role="alert"` no erro.
- Suporte opcional ao controle final do campo de senha.
- Não conter validação, estado de formulário ou integração externa.

## Hook

### `useLoginForm`

- Configurar `useForm<LoginFormValues>` com `zodResolver(loginSchema)`.
- Expor `register`, erros e `onSubmit` para o componente.
- Controlar `isPasswordVisible` e a ação de alternância.
- Usar submit local intencionalmente sem efeito após dados válidos.
- Não limpar os campos, não emitir sucesso, não chamar `loginService` e não navegar.
- Não manter estados de loading, erro remoto, sessão ou usuário autenticado.

## Schema

### `loginSchema`

- `email`: obrigatório e com formato válido.
- `password`: obrigatório e não vazio.
- Não aplicar tamanho mínimo ou complexidade à senha.
- Não validar credenciais, conta, permissão ou qualquer dado remoto.
- Mensagens em português do Brasil e exibidas próximas aos campos.

## Service

### `loginService.ts`

- Criar o arquivo para preservar a fronteira arquitetural prevista para integrações futuras.
- Registrar TODO informando que a interface de autenticação só poderá ser definida quando existir contrato oficial de backend e autorização de escopo.
- Não declarar endpoint, URL, cliente HTTP, payload remoto especulativo, mock ou implementação de request.
- Não exportar operação executável de autenticação nesta primeira implementação.
- Não ser importado por hook, componente ou página.

## Tipos

### `login.ts`

- Declarar `LoginFormValues` com somente `email: string` e `password: string`.
- Não declarar DTO de resposta, sessão, token, usuário, erro remoto ou contrato de backend.

## Arquivos Planejados

- `src/features/auth/login/pages/LoginPage.tsx`: composição principal da tela.
- `src/features/auth/login/components/LoginHeader.tsx`: header sticky e ação visual `Cadastrar`.
- `src/features/auth/login/components/LoginCard.tsx`: card, título, subtítulo, divisor e chamada visual auxiliar.
- `src/features/auth/login/components/LoginForm.tsx`: formulário, ações visuais e botão principal.
- `src/features/auth/login/components/LoginField.tsx`: campo acessível com ícone e erro.
- `src/features/auth/login/hooks/useLoginForm.ts`: React Hook Form, schema e estado de visibilidade da senha.
- `src/features/auth/login/schemas/loginSchema.ts`: validações locais Zod.
- `src/features/auth/login/services/loginService.ts`: TODO de integração futura, sem backend e sem operação executável.
- `src/features/auth/login/styles/LoginPage.module.css`: formas orgânicas, pontilhados e simplificação em mobile.
- `src/features/auth/login/types/login.ts`: valores locais do formulário.
- `src/App.tsx`: importação e renderização de `LoginPage`, sem configurar rotas.

Todos os arquivos funcionais planejados pertencem exclusivamente à feature `src/features/auth/login/`; `src/App.tsx` é a única exceção, limitada à composição de `LoginPage`.
Não há arquivos planejados em `src/shared/`, backend ou contratos externos.

## Design System Necessário

O Design System oficial do frontend será reutilizado integralmente nesta feature.

- foundations:
  - `.specify/design-system/foundations/colors.md`: `primary`, `primary-hover`, `primary-soft`, `foreground`, `text-secondary`, `background`, `surface`, `border` e `danger`.
  - `.specify/design-system/foundations/typography.md`: título de tela, subtítulo, label e texto auxiliar.
  - `.specify/design-system/foundations/spacing.md`: escala de 4 px, gaps do formulário e padding responsivo.
  - `.specify/design-system/foundations/shadows.md`: sombra sutil no header e card, sem excesso.
  - `.specify/design-system/foundations/radius.md`: `rounded-xl` em inputs/botões e `rounded-2xl` no card.
  - `.specify/design-system/foundations/motion.md`: microinterações curtas e respeito a `prefers-reduced-motion`.
- components:
  - `.specify/design-system/components/input.md`: inputs com ícone, foco, erro e alternância de senha.
  - `.specify/design-system/components/form-field.md`: associação de label, controle e erro.
  - `.specify/design-system/components/card.md`: card de formulário responsivo e container do ícone.
  - `.specify/design-system/components/button.md`: botão primário e controle outline do header.
- patterns:
  - `.specify/design-system/patterns/auth-pages.md`: fundo, header, logo real, card central e ações auxiliares.
- motion:
  - Framer Motion somente para entrada sutil do card, feedback do botão `Entrar` e transição de erros, conforme o Design System oficial.
  - Usar `useReducedMotion`; nenhuma informação ou comportamento dependerá da animação.

Quando houver divergência no nome do asset da logo entre documentos do Design System, prevalecem `AGENTS.md` e a spec: `/logoPedeAqui.jpeg`.

## Estratégia de Estilo

- Tailwind no TSX:
  - layout, tipografia, cores, bordas, sombras, radius, espaçamentos, foco, responsividade e estados de input/botão;
  - composição orientada exclusivamente pelo Design System oficial e por `src/assets/Tela-login.png`.
- CSS Modules em `styles/`:
  - somente formas orgânicas e padrões pontilhados com pseudo-elementos;
  - media queries para reduzir, reposicionar ou omitir decorações em mobile.
- Motivo para usar CSS Module:
  - pseudo-elementos, gradientes pontilhados, formas decorativas e regras responsivas deixariam o TSX ilegível.
- CSS global necessário: não.

## Contratos e Dependências

- Backend: inexistente e fora do escopo desta primeira implementação.
- Contrato de autenticação: não será criado nem inferido.
- Service: arquivo com TODO arquitetural, sem integração e sem consumo.
- Referência visual: `src/assets/Tela-login.png`, somente para comparação.
- Logo: asset público existente `/logoPedeAqui.jpeg`, sem alteração.
- Rotas das ações auxiliares e do destino pós-login: não serão configuradas.

## Dependências de Biblioteca

- Framer Motion: já instalada; usada apenas nas microinterações descritas e com redução de movimento.
- Lucide React: já instalada; usada para ícones de entrada, e-mail, cadeado, olho e usuário com adição.
- React Hook Form: já instalada; controla o formulário local.
- Zod: já instalada; centraliza as validações locais.
- `@hookform/resolvers`: já instalada; conecta Zod ao React Hook Form.
- Novas dependências: nenhuma.

## ADR

- ADR necessária: não.
- Motivo: a organização `src/features/auth/login/` já foi declarada como estrutura oficial pelo usuário e está refletida no `AGENTS.md`; o plano apenas aplica essa arquitetura, sem propor nova decisão estrutural, biblioteca, autenticação ou contrato global.
- Caminho do rascunho: não se aplica.
- Status: não necessária.

## Validação

Na futura implementação, executar:

- `npm run lint`.
- `npm run build`.
- Verificação visual em desktop contra `src/assets/Tela-login.png`.
- Verificação visual em mobile, confirmando simplificação das decorações e ausência de sobreposição.
- Verificação por teclado da ordem de foco e dos controles visuais.
- Verificação de labels, foco visível, nomes acessíveis do botão de senha e associação das mensagens de erro.
- Verificação dos estados: inicial, preenchido, senha visível, campo obrigatório e e-mail inválido.
- Verificação negativa de que `Entrar` válido não autentica, não chama service/backend, não navega e não exibe sucesso.
- Verificação negativa de que `Cadastrar`, `Cadastre-se` e `Esqueci minha senha` não navegam nem executam ação.
- Verificação de que `Voltar ao início`, nome, CPF/CNPJ e confirmar senha não estão presentes.

## Riscos

- Ação visual com aparência interativa e sem efeito pode gerar expectativa; a implementação deve seguir estritamente o `clarify.md`, sem inventar navegação.
- Divergências entre a referência visual e o Design System devem ser resolvidas sem recorrer a outra feature e sem ultrapassar o Scope Lock.
- O header sticky pode cobrir o conteúdo se a compensação de altura não acompanhar seus breakpoints.
- As decorações podem reduzir contraste ou espaço útil em mobile; devem ser simplificadas ou omitidas quando necessário.
- O submit local sem efeito pode ser confundido com autenticação incompleta; não devem ser adicionados loading ou sucesso para mascarar a ausência de backend.
- A documentação de arquitetura e o Design System divergem no nome do asset da logo; o plano fixa `/logoPedeAqui.jpeg` conforme `AGENTS.md` e a spec.
