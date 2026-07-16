# Tasks: Cadastro de Lojista

## Status

Fase `tasks` concluída. Implementação não iniciada.

Nenhuma task deve ser marcada como concluída antes da execução e aprovação de todos os seus checks.

## Dependency Graph

```text
T001 -> T002 -> T003 -> T004 -> T005 -> T006 -> T007 -> T008
```

## Ordem de Execução

1. T001 — Preparar a feature e as dependências
2. T002 — Criar a estrutura da página e o header
3. T003 — Criar o card e o conteúdo estático
4. T004 — Construir o formulário sem validação
5. T005 — Integrar validação local
6. T006 — Aplicar recursos visuais e responsividade
7. T007 — Adicionar microinterações
8. T008 — Executar validação final

## Tasks

- [x] T001 Preparar a feature e instalar as dependências previstas
  - Type: setup
  - Paths allowed:
    - `app/frontend/package.json`
    - `app/frontend/package-lock.json`
    - `app/frontend/src/features/register/`
    - `app/frontend/specs/register/tasks.md`, somente para marcar T001 após os checks
  - Paths forbidden:
    - `app/backend/`
    - `database/`
    - `supabase/`
    - `app/frontend/specs/register/spec.md`
    - `app/frontend/specs/register/clarify.md`
    - `app/frontend/specs/register/plan.md`
    - qualquer path não listado em `Paths allowed`
  - Depends on: nenhuma
  - Requirements:
    - `plan.md` — Arquitetura da Feature
    - `plan.md` — Dependências de Biblioteca
    - `plan.md` — Scope Lock
  - Deliverables:
    - dependências `react-hook-form`, `zod`, `@hookform/resolvers`, `lucide-react` e `framer-motion` instaladas
    - diretórios-base de `src/features/register/` preparados, sem componentes implementados
  - Done when:
    - as dependências constam em `package.json` e `package-lock.json`
    - nenhuma lógica ou UI da feature foi implementada
  - Checks:
    - executar `npm ls react-hook-form zod @hookform/resolvers lucide-react framer-motion`
    - conferir que não há arquivos `.tsx` implementados pela task
    - conferir o diff e confirmar que somente os paths permitidos foram alterados

- [x] T002 Criar a estrutura da página e o header
  - Type: frontend-ui
  - Paths allowed:
    - `app/frontend/src/App.tsx`
    - `app/frontend/src/features/register/pages/RegisterPage.tsx`
    - `app/frontend/src/features/register/components/RegisterHeader.tsx`
    - `app/frontend/specs/register/tasks.md`, somente para marcar T002 após os checks
  - Paths forbidden:
    - `app/backend/`
    - `database/`
    - `supabase/`
    - `app/frontend/public/logoPedeAqui.jpeg`
    - `app/frontend/specs/register/spec.md`
    - `app/frontend/specs/register/clarify.md`
    - `app/frontend/specs/register/plan.md`
    - qualquer path não listado em `Paths allowed`
  - Depends on: T001
  - Requirements:
    - RF-FE-004
    - `plan.md` — Estrutura Lógica da Tela
    - `plan.md` — Recursos Utilizados / Logo oficial
  - Deliverables:
    - `RegisterPage`
    - `RegisterHeader`
    - composição de `RegisterPage` em `App.tsx`
  - Done when:
    - o header renderiza `/logoPedeAqui.jpeg` com proporção preservada e texto alternativo `PedeAqui`
    - a pergunta para usuário já cadastrado e `Entrar` aparecem visualmente
    - `Entrar` não usa link, rota, handler ou redirecionamento
    - nenhuma lógica de formulário foi adicionada
  - Checks:
    - executar `npm run build`
    - inspecionar o DOM e confirmar semântica de header e main
    - confirmar ausência de `href`, router e handler no elemento `Entrar`
    - conferir o diff e confirmar que somente os paths permitidos foram alterados

- [x] T003 Criar o card e o conteúdo estático do cadastro
  - Type: frontend-ui
  - Paths allowed:
    - `app/frontend/src/features/register/pages/RegisterPage.tsx`
    - `app/frontend/src/features/register/components/RegisterCard.tsx`
    - `app/frontend/src/features/register/components/RegisterLegalNotice.tsx`
    - `app/frontend/specs/register/tasks.md`, somente para marcar T003 após os checks
  - Paths forbidden:
    - `app/backend/`
    - `database/`
    - `supabase/`
    - `app/frontend/specs/register/spec.md`
    - `app/frontend/specs/register/clarify.md`
    - `app/frontend/specs/register/plan.md`
    - qualquer path não listado em `Paths allowed`
  - Depends on: T002
  - Requirements:
    - RF-FE-003
    - `plan.md` — Estrutura Lógica da Tela
    - `plan.md` — Organização dos Componentes
  - Deliverables:
    - `RegisterCard`
    - `RegisterLegalNotice`
    - ícone de contexto, título, subtítulo e aviso legal
  - Done when:
    - o card contém somente a estrutura prevista no plano
    - título, subtítulo e ícone seguem a hierarquia da referência visual
    - `Termos de Uso` e `Política de Privacidade` estão destacados visualmente, sem links ou handlers
    - o card se adapta à largura disponível sem criar nova lógica
  - Checks:
    - executar `npm run build`
    - confirmar que não existem elementos `a` para os textos legais
    - conferir a composição contra `specs/register/assets/Tela-cadastro.png`
    - conferir o diff e confirmar que somente os paths permitidos foram alterados

- [x] T004 Construir o formulário sem validação
  - Type: frontend-form
  - Paths allowed:
    - `app/frontend/src/features/register/components/RegisterCard.tsx`
    - `app/frontend/src/features/register/components/RegisterForm.tsx`
    - `app/frontend/src/features/register/components/RegisterField.tsx`
    - `app/frontend/specs/register/tasks.md`, somente para marcar T004 após os checks
  - Paths forbidden:
    - `app/backend/`
    - `database/`
    - `supabase/`
    - `app/frontend/specs/register/spec.md`
    - `app/frontend/specs/register/clarify.md`
    - `app/frontend/specs/register/plan.md`
    - qualquer path não listado em `Paths allowed`
  - Depends on: T003
  - Requirements:
    - RF-FE-001
    - RF-FE-003
    - `plan.md` — Organização dos Componentes
  - Deliverables:
    - `RegisterForm`
    - `RegisterField`
    - botão `Cadastrar`
  - Done when:
    - o formulário contém exatamente `Nome completo`, `E-mail`, `Senha` e `CPF ou CNPJ`, nessa ordem
    - cada input possui label associada, placeholder e ícone visual correspondente
    - não existe campo `Confirmar senha`
    - o botão `Cadastrar` não realiza request, persistência ou redirecionamento
    - nenhuma regra de validação foi duplicada nos componentes
  - Checks:
    - executar `npm run build`
    - contar quatro inputs no formulário
    - confirmar a ausência de `Confirmar senha`, API, service, fetch e cliente HTTP
    - conferir o diff e confirmar que somente os paths permitidos foram alterados

- [x] T005 Integrar React Hook Form e a validação local com Zod
  - Type: frontend-validation
  - Paths allowed:
    - `app/frontend/src/features/register/components/RegisterForm.tsx`
    - `app/frontend/src/features/register/components/RegisterField.tsx`
    - `app/frontend/src/features/register/hooks/useRegisterForm.ts`
    - `app/frontend/src/features/register/schemas/registerSchema.ts`
    - `app/frontend/specs/register/tasks.md`, somente para marcar T005 após os checks
  - Paths forbidden:
    - `app/backend/`
    - `database/`
    - `supabase/`
    - `app/frontend/specs/register/spec.md`
    - `app/frontend/specs/register/clarify.md`
    - `app/frontend/specs/register/plan.md`
    - qualquer path não listado em `Paths allowed`
  - Depends on: T004
  - Requirements:
    - RF-FE-002
    - `clarify.md` — Q3, Q5 e Q6
    - `plan.md` — Estratégia de Validação Local
  - Deliverables:
    - `useRegisterForm`
    - `registerSchema`
    - integração por `@hookform/resolvers`
    - mensagens locais associadas aos campos
  - Done when:
    - todos os campos são obrigatórios
    - e-mail aceita somente formato válido
    - senha exige somente o mínimo de 8 caracteres
    - `CPF ou CNPJ` possui apenas obrigatoriedade, sem máscara, tamanho, formato ou dígitos verificadores
    - a primeira validação ocorre no submit e campos com erro revalidam durante a correção
    - submissão válida não produz request, loading, sucesso ou redirecionamento
  - Checks:
    - executar `npm run lint`
    - executar `npm run build`
    - testar campo vazio, e-mail inválido, senha com 7 e 8 caracteres e documento preenchido com valor livre
    - confirmar `aria-describedby` e `role="alert"` quando aplicáveis
    - pesquisar e confirmar ausência de validação específica de CPF/CNPJ
    - conferir o diff e confirmar que somente os paths permitidos foram alterados

- [x] T006 Aplicar recursos visuais, decoração e responsividade
  - Type: frontend-style
  - Paths allowed:
    - `app/frontend/src/App.tsx`
    - `app/frontend/src/App.css`
    - `app/frontend/src/index.css`
    - `app/frontend/src/features/register/pages/RegisterPage.tsx`
    - `app/frontend/src/features/register/components/RegisterHeader.tsx`
    - `app/frontend/src/features/register/components/RegisterCard.tsx`
    - `app/frontend/src/features/register/components/RegisterForm.tsx`
    - `app/frontend/src/features/register/components/RegisterField.tsx`
    - `app/frontend/src/features/register/components/RegisterLegalNotice.tsx`
    - `app/frontend/src/features/register/styles/RegisterPage.module.css`
    - `app/frontend/specs/register/tasks.md`, somente para marcar T006 após os checks
  - Paths forbidden:
    - `app/backend/`
    - `database/`
    - `supabase/`
    - `app/frontend/specs/register/assets/Tela-cadastro.png`
    - `app/frontend/public/logoPedeAqui.jpeg`
    - `app/frontend/specs/register/spec.md`
    - `app/frontend/specs/register/clarify.md`
    - `app/frontend/specs/register/plan.md`
    - qualquer path não listado em `Paths allowed`
  - Depends on: T005
  - Requirements:
    - RF-FE-001 a RF-FE-004
    - `plan.md` — Design System Necessário
    - `plan.md` — Estratégia de Estilo
    - `plan.md` — Recursos Utilizados
  - Deliverables:
    - Tailwind aplicado à estrutura e aos estados
    - `RegisterPage.module.css` para formas e padrões decorativos
    - estilos demonstrativos do scaffold removidos
    - comportamento responsivo da página
  - Done when:
    - a tela segue cores, tipografia, espaçamento, raios e sombras citados no plano
    - a decoração se aproxima da referência sem interferir no conteúdo ou no foco
    - elementos decorativos não capturam eventos e ficam fora da árvore semântica
    - não existe rolagem horizontal nos viewports verificados
    - `App.css` do scaffold foi removido e seu import não permanece no projeto
  - Checks:
    - executar `npm run lint`
    - executar `npm run build`
    - comparar desktop com `specs/register/assets/Tela-cadastro.png`
    - verificar ao menos viewports de 320 px, 768 px e 1366 px
    - conferir foco visível, contraste e ausência de sobreposição
    - conferir o diff e confirmar que somente os paths permitidos foram alterados

- [x] T007 Adicionar microinterações previstas no plano
  - Type: frontend-motion
  - Paths allowed:
    - `app/frontend/src/features/register/pages/RegisterPage.tsx`
    - `app/frontend/src/features/register/components/RegisterCard.tsx`
    - `app/frontend/src/features/register/components/RegisterForm.tsx`
    - `app/frontend/src/features/register/components/RegisterField.tsx`
    - `app/frontend/specs/register/tasks.md`, somente para marcar T007 após os checks
  - Paths forbidden:
    - `app/backend/`
    - `database/`
    - `supabase/`
    - `app/frontend/specs/register/spec.md`
    - `app/frontend/specs/register/clarify.md`
    - `app/frontend/specs/register/plan.md`
    - qualquer path não listado em `Paths allowed`
  - Depends on: T006
  - Requirements:
    - `plan.md` — Motion
    - `plan.md` — Dependências de Biblioteca
  - Deliverables:
    - entrada discreta do card
    - hover e tap do botão `Cadastrar`
    - transição das mensagens de validação
    - aparição discreta dos elementos principais previstos no plano
  - Done when:
    - as microinterações usam Framer Motion
    - animações são rápidas, discretas e não alteram layout ou fluxo funcional
    - `prefers-reduced-motion` é respeitado
    - nenhum estado ou comportamento não previsto foi introduzido
  - Checks:
    - executar `npm run lint`
    - executar `npm run build`
    - testar interações com e sem preferência por movimento reduzido
    - confirmar ausência de loading, navegação e animações em elementos não interativos
    - conferir o diff e confirmar que somente os paths permitidos foram alterados

- [x] T008 Validar a feature completa contra spec, clarify e plan
  - Type: validation
  - Paths allowed:
    - `app/frontend/specs/register/tasks.md`, somente para registrar resultados e marcar T008 após todos os checks
  - Paths forbidden:
    - `app/backend/`
    - `database/`
    - `supabase/`
    - `app/frontend/specs/register/spec.md`
    - `app/frontend/specs/register/clarify.md`
    - `app/frontend/specs/register/plan.md`
    - qualquer código da feature durante esta task; correções exigem retorno à task responsável
  - Depends on: T001, T002, T003, T004, T005, T006 e T007
  - Requirements:
    - RF-FE-001 a RF-FE-004
    - todas as decisões de `clarify.md`
    - `plan.md` — Scope Lock
    - `plan.md` — Validação da Implementação Futura
  - Deliverables:
    - registro dos resultados dos checks finais
    - confirmação de conformidade do escopo
  - Done when:
    - todos os checks abaixo foram aprovados
    - qualquer falha encontrada foi corrigida na task responsável e revalidada
    - T008 e a feature foram marcadas como concluídas somente após a revalidação
  - Checks:
    - executar `npm run lint`
    - executar `npm run build`
    - comparar a tela com `specs/register/assets/Tela-cadastro.png`
    - validar responsividade e ausência de rolagem horizontal
    - confirmar exatamente quatro campos e ausência de `Confirmar senha`
    - confirmar somente as validações locais especificadas
    - confirmar ausência de backend, API, autenticação, request, persistência e redirecionamento
    - confirmar `/logoPedeAqui.jpeg` e ausência de recriação da logo
    - confirmar que `Entrar`, `Termos de Uso` e `Política de Privacidade` não executam ações
    - confirmar acessibilidade de labels, erros, foco e movimento reduzido
    - revisar o diff completo e confirmar o `Scope Lock`

## Notes

- Executar apenas a próxima task pendente quando a fase `implement` for explicitamente solicitada.
- Marcar uma task como concluída somente depois de todos os checks da própria task.
- Se um check falhar, manter a task aberta e corrigir somente dentro dos paths permitidos.
- Não usar a fase `tasks` para implementar código ou instalar dependências.
- A referência visual oficial é `specs/register/assets/Tela-cadastro.png`; não há fonte Figma registrada.
- Em qualquer conflito visual ou funcional, `spec.md` prevalece.
