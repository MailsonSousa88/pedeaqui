# Tasks: store-categories

## Dependency Graph

```text
T001 -> T002 -> T003 -> T004 -> T005 -> T006 -> T007 -> T008
```

## Tasks

- [x] T001 Criar tipos locais da tela de categorias
  - Type: setup/types
  - Paths allowed:
    - `app/frontend/src/features/store/category-management/types/categoryManagement.ts`
    - `app/frontend/specs/store-categories/tasks.md`
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/register/`
    - `app/frontend/.agents/`
    - `app/frontend/src/features/store/storefront/`
  - Depends on: nenhuma
  - Requirements:
    - Definir tipo para categoria local visual.
    - Diferenciar categoria sistêmica `Todos` de categorias customizadas.
    - Incluir contador visual de produtos.
    - Não criar DTO backend.
  - Done when:
    - Tipos existem em `categoryManagement.ts`.
    - Não há imports de backend ou services.
  - Checks:
    - `npm run lint`

- [x] T002 Criar hook local de gerenciamento de categorias
  - Type: hook/state
  - Paths allowed:
    - `app/frontend/src/features/store/category-management/hooks/useCategoryManagement.ts`
    - `app/frontend/src/features/store/category-management/types/categoryManagement.ts`
    - `app/frontend/specs/store-categories/tasks.md`
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/register/`
    - `app/frontend/.agents/`
    - services/backend/contracts
  - Depends on: T001
  - Requirements:
    - Estado local temporário.
    - Criar categoria em uppercase.
    - Impedir nome vazio.
    - Tratar duplicidade local de nome.
    - Manter categorias na ordem de criação.
    - Incluir `Todos` como categoria sistêmica fixa.
    - Permitir handler visual de edição.
    - Manter remoção como ação visual sem remover de verdade.
  - Done when:
    - Hook retorna categorias, erro local, valor do campo e handlers necessários.
    - Nenhuma chamada backend existe.
  - Checks:
    - `npm run lint`

- [x] T003 Criar componente de formulário de categoria
  - Type: component/ui
  - Paths allowed:
    - `app/frontend/src/features/store/category-management/components/CategoryForm.tsx`
    - `app/frontend/src/features/store/category-management/types/categoryManagement.ts`
    - `app/frontend/specs/store-categories/tasks.md`
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/register/`
    - `app/frontend/.agents/`
    - services/backend/contracts
  - Depends on: T002
  - Requirements:
    - Campo com label visível.
    - Placeholder `Ex: Bebidas`.
    - Botão `Criar categoria`.
    - Permitir criação por submit/Enter.
    - Exibir erro local próximo ao campo quando houver.
    - Usar Tailwind e Lucide.
  - Done when:
    - Formulário é componente puro e recebe props do hook.
    - Não possui estado de regra duplicado além do necessário para UI.
  - Checks:
    - `npm run lint`

- [x] T004 Criar card e lista de categorias
  - Type: component/ui
  - Paths allowed:
    - `app/frontend/src/features/store/category-management/components/CategoryCard.tsx`
    - `app/frontend/src/features/store/category-management/components/CategoryList.tsx`
    - `app/frontend/src/features/store/category-management/components/EmptyCategoriesState.tsx`
    - `app/frontend/src/features/store/category-management/types/categoryManagement.ts`
    - `app/frontend/specs/store-categories/tasks.md`
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/register/`
    - `app/frontend/.agents/`
    - services/backend/contracts
  - Depends on: T002
  - Requirements:
    - `Todos` aparece como primeiro card fixo.
    - Categorias customizadas aparecem na ordem de criação.
    - Cada card exibe contador visual de produtos.
    - `Todos` não exibe ação de remover.
    - Categorias customizadas exibem ação visual de editar e remover.
    - Remover pode ser clicável, mas não remove de verdade.
    - Estado vazio aparece quando só houver `Todos`.
  - Done when:
    - Lista renderiza cards de forma responsiva.
    - Ações possuem texto ou `aria-label`.
  - Checks:
    - `npm run lint`

- [x] T005 Criar página de gerenciamento de categorias
  - Type: page/composition
  - Paths allowed:
    - `app/frontend/src/features/store/category-management/pages/CategoryManagementPage.tsx`
    - `app/frontend/src/features/store/category-management/components/`
    - `app/frontend/src/features/store/category-management/hooks/`
    - `app/frontend/src/features/store/category-management/types/`
    - `app/frontend/specs/store-categories/tasks.md`
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/register/`
    - `app/frontend/.agents/`
    - services/backend/contracts
  - Depends on: T003, T004
  - Requirements:
    - Compor título `Categorias da loja`.
    - Explicar que categorias organizam produtos da vitrine.
    - Renderizar formulário e lista.
    - Manter visual consistente com telas de gestão da loja.
  - Done when:
    - Página usa o hook e componentes criados.
    - Não chama backend.
  - Checks:
    - `npm run lint`

- [x] T006 Integrar aba Categorias na tela de loja
  - Type: integration/ui
  - Paths allowed:
    - `app/frontend/src/features/store/storefront/components/StoreTabs.tsx`
    - `app/frontend/src/features/store/storefront/pages/StorefrontPage.tsx`
    - `app/frontend/src/features/store/category-management/pages/CategoryManagementPage.tsx`
    - `app/frontend/specs/store-categories/tasks.md`
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/register/`
    - `app/frontend/.agents/`
    - services/backend/contracts
  - Depends on: T005
  - Requirements:
    - Adicionar aba/área `Categorias` ao lado de `Adicionar`.
    - Renderizar `CategoryManagementPage` quando a aba estiver ativa.
    - Não quebrar abas existentes `Produtos` e `Adicionar`.
    - Não alterar backend ou rotas globais.
  - Done when:
    - A tela de loja permite abrir a área de categorias.
    - A navegação entre abas funciona visualmente.
  - Checks:
    - `npm run lint`

- [x] T007 Polimento visual e acessibilidade
  - Type: quality/ui
  - Paths allowed:
    - `app/frontend/src/features/store/category-management/`
    - `app/frontend/src/features/store/storefront/components/StoreTabs.tsx`
    - `app/frontend/src/features/store/storefront/pages/StorefrontPage.tsx`
    - `app/frontend/specs/store-categories/tasks.md`
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/register/`
    - `app/frontend/.agents/`
    - services/backend/contracts
  - Depends on: T006
  - Requirements:
    - Conferir responsividade mobile/desktop.
    - Garantir foco visível em inputs e botões.
    - Garantir labels e `aria-label` quando necessário.
    - Evitar texto sobreposto.
    - Manter paleta do design system.
  - Done when:
    - UI está consistente com a store e adicionar produto.
    - Ações têm affordance visual clara.
  - Checks:
    - `npm run lint`

- [x] T008 Validação final
  - Type: validation
  - Paths allowed:
    - `app/frontend/specs/store-categories/tasks.md`
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/register/`
    - `app/frontend/.agents/`
  - Depends on: T007
  - Requirements:
    - Rodar lint.
    - Rodar build.
    - Registrar se build precisar ser validado fora do sandbox por `EPERM`.
    - Marcar tasks concluídas somente após validação.
  - Done when:
    - `npm run lint` passa.
    - `npm run build` passa ou limitação de sandbox é registrada e validada fora do sandbox.
  - Checks:
    - `npm run lint`
    - `npm run build`

## Notes

- Marcar task como concluída somente após checks.
- Não executar tasks futuras sem pedido explícito.
- Não criar backend, service, mock service ou contrato HTTP nesta versão.
- A tela é visual/local e temporária.

## Evolução de integração real

- [x] T009 Conectar categorias da loja aos endpoints existentes
  - Type: integration/frontend
  - Paths allowed:
    - `app/frontend/src/features/store/category-management/`
    - `app/frontend/src/features/store/product-management/`
    - `app/frontend/src/features/store/storefront/pages/StorefrontPage.tsx`
    - `app/frontend/specs/store-categories/`
  - Paths forbidden:
    - `app/backend/`
    - `database/`
    - `supabase/`
    - migrations
  - Requirements:
    - Listar e criar categorias reais por loja.
    - Disponibilizar categorias reais no formulário de produto.
    - Preservar placeholder somente quando não houver loja real.
  - Checks:
    - `npm run lint`
    - `npx tsc -b --pretty false`

## Evolução — issue #51

```text
T010 -> T011 -> T012
```

- [x] T010 Remover a criação da tela de gerenciamento de categorias
  - Type: fix/frontend
  - Paths allowed:
    - `app/frontend/src/features/store/category-management/`
  - Paths forbidden:
    - `app/frontend/src/features/store/product-management/`
    - `app/backend/`
    - `database/`
    - `supabase/`
    - migrations
  - Depends on: T009
  - Requirements:
    - Remover formulário, estado, handler, contrato e função de service exclusivos da criação.
    - Excluir componente que ficar sem consumidor.
    - Preservar listagem, edição, remoção, loading, erro e vazio.
  - Done when:
    - Não existe controle ou caminho de criação na tela de gerenciamento.
  - Checks:
    - `npm run lint`
  - Validation notes:
    - Formulário, estado, handler, contrato e service exclusivos da criação foram removidos.
    - `npm run lint`: passou.

- [x] T011 Confirmar preservação da criação inline no cadastro de produto
  - Type: verification
  - Paths allowed:
    - `app/frontend/specs/store-categories/tasks.md`
  - Paths read-only:
    - `app/frontend/src/features/store/product-management/`
  - Paths forbidden:
    - alterações em `app/frontend/src/features/store/product-management/`
    - `app/backend/`
  - Depends on: T010
  - Requirements:
    - Confirmar que componente, hook e service do cadastro inline continuam presentes e inalterados.
  - Done when:
    - A auditoria do diff prova que o fluxo inline não foi modificado.
  - Checks:
    - `git diff -- app/frontend/src/features/store/product-management/`
  - Validation notes:
    - O diff de `product-management/` está vazio.
    - Hook, componente e service de criação inline continuam presentes.

- [x] T012 Validar a issue #51
  - Type: validation
  - Paths allowed:
    - `app/frontend/specs/store-categories/tasks.md`
  - Paths forbidden:
    - `app/backend/`
    - `database/`
    - `supabase/`
  - Depends on: T011
  - Requirements:
    - Validar lint, build, diff e critérios da issue.
  - Done when:
    - Todos os checks passam e T010–T012 possuem notas de validação.
  - Checks:
    - `npm run lint`
    - `npm run build`
    - `git diff --check`
  - Validation notes:
    - `npm run lint`: passou.
    - `npx tsc -b --pretty false`: passou.
    - `git diff --check`: passou.
    - `npm run build`: passou fora do sandbox; o erro anterior era restrito ao ambiente isolado.
