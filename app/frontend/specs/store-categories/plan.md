# Plan: store-categories

## Resumo Técnico

Criar uma tela visual/local de categorias dentro da feature `store`, acessada pela área de loja/gestão ao lado de `Adicionar`.

A implementação deve funcionar como protótipo interativo frontend: criar categorias em estado local, exibir cards em ordem de criação, mostrar contador visual de produtos, permitir edição visual e manter botões de remoção clicáveis sem remover de verdade.

Não haverá backend, service, mock service, contrato HTTP, persistência real ou alteração em migrations.

## Flow Context

- Flow: `merchant-flow`
- Posição: gestão pós-onboarding da loja, dentro da tela de loja/gestão.
- Entrada: lojista autenticado acessa a loja em modo gestão e abre a área `Categorias`.
- Saída/proximo passo: lojista retorna para produtos/adicionar produto ou usa a tela futuramente como base para categorias reais.
- Restrições derivadas do fluxo:
  - A tela não deve tratar checkout, carrinho ou vitrine pública do consumidor.
  - A tela não deve implementar backend.
  - A tela deve preservar o padrão visual e estrutural da feature `store`.
  - Categorias criadas localmente vivem apenas enquanto a tela estiver aberta.

## Scope Lock

Target: Frontend

Allowed paths:

- `app/frontend/src/features/store/category-management/`
- `app/frontend/src/features/store/storefront/components/StoreTabs.tsx`
- `app/frontend/src/features/store/storefront/pages/StorefrontPage.tsx`
- `app/frontend/specs/store-categories/`

Forbidden paths:

- `app/backend/`
- `database/`
- `supabase/`
- migrations
- `app/frontend/src/features/register/`
- `app/frontend/.agents/`
- qualquer arquivo fora de `app/frontend/src/features/store/`, salvo validações e docs/spec já criadas

## Arquitetura

Criar uma subfeature dentro de `src/features/store/category-management/`, seguindo a organização por feature.

Separação esperada:

- `pages/`: composição da tela de categorias.
- `components/`: formulário, card, lista e estado vazio.
- `hooks/`: estado local das categorias, criação, edição visual e handlers.
- `types/`: tipo de categoria visual/local.

Não criar:

- `services/`, pois não haverá backend nesta versão.
- `schemas/`, salvo se uma task futura exigir validação mais formal.
- `styles/`, salvo se Tailwind no TSX ficar ilegível.

A integração com a loja deve ser feita pela aba/estado já existente em `StorefrontPage` e `StoreTabs`, sem importar outra feature externa.

## Arquivos Planejados

- `pages/`:
  - `app/frontend/src/features/store/category-management/pages/CategoryManagementPage.tsx`

- `components/`:
  - `app/frontend/src/features/store/category-management/components/CategoryForm.tsx`
  - `app/frontend/src/features/store/category-management/components/CategoryCard.tsx`
  - `app/frontend/src/features/store/category-management/components/CategoryList.tsx`
  - `app/frontend/src/features/store/category-management/components/EmptyCategoriesState.tsx`

- `hooks/`:
  - `app/frontend/src/features/store/category-management/hooks/useCategoryManagement.ts`

- `types/`:
  - `app/frontend/src/features/store/category-management/types/categoryManagement.ts`

- Integração:
  - `app/frontend/src/features/store/storefront/components/StoreTabs.tsx`
  - `app/frontend/src/features/store/storefront/pages/StorefrontPage.tsx`

- `services/`: não criar nesta versão.
- `schemas/`: não criar nesta versão.
- `styles/`: não criar nesta versão.

## Design System Necessário

- foundations:
  - `colors.md`
  - `typography.md`
  - `spacing.md`
  - `radius.md`
  - `shadows.md`
- components:
  - `button.md`
  - `input.md`
  - `form-field.md`
  - `card.md`
  - `badge.md`
  - `alert.md`
- patterns:
  - `dashboard-pages.md`
- motion:
  - Framer Motion pode ser usado apenas para microinterações leves em cards e botões, se já estiver disponível.

## Estratégia de Estilo

- Tailwind no TSX:
  - Usar para layout, espaçamento, cards, botões, inputs, hover, foco, estados e responsividade.
- CSS Modules em `styles/`:
  - Não necessário nesta versão.
- Motivo para usar CSS Module, se houver:
  - Nenhum no plano atual.
- CSS global necessário:
  - Não.

## Contratos e Dependências

Dependências futuras de backend:

- Listar categorias da loja.
- Criar categoria.
- Editar categoria.
- Remover categoria.
- Ordenar categorias por `sort_order`.
- Obter contador real de produtos por categoria.
- Bloquear remoção real quando houver produtos vinculados.

Nesta versão:

- Categorias são estado local temporário.
- Contadores são valores visuais/mockados.
- `Todos` é card fixo local.
- Botão remover não remove de verdade.
- Nenhum contrato HTTP será criado.

## Dependências de Biblioteca

- Framer Motion: permitido para microinterações se já estiver instalado; não adicionar dependência.
- Lucide React: usar para ícones de categoria, adicionar, editar, remover, produto/contador.
- React Hook Form: não usar nesta versão, pois o formulário é simples e local.
- Zod: não usar nesta versão, pois não há submit real nem persistência.

## ADR

- ADR necessária: não
- Motivo: implementação comum de tela frontend visual/local, sem nova biblioteca, sem alteração arquitetural, sem contrato global e sem backend.
- Caminho do rascunho, se necessário: não se aplica.
- Status: não necessária.

## Validação

Ao final das tasks de implementação:

- Rodar `npm run lint` em `app/frontend`.
- Rodar `npm run build` em `app/frontend`.
- Se o build falhar no sandbox por `EPERM` em dependência nativa do Tailwind/Rolldown, registrar e validar fora do sandbox com permissão.
- Conferir visualmente se:
  - aba `Categorias` aparece dentro da loja/gestão;
  - `Todos` aparece como primeiro card fixo;
  - categorias criadas aparecem em uppercase;
  - cards aparecem em ordem de criação;
  - contadores aparecem em cada card;
  - botões de edição/remoção existem visualmente;
  - nenhuma chamada backend é feita.

## Riscos

- Confundir tela visual/local com CRUD real de categorias.
- Criar service ou contrato antes do backend estar pronto.
- Acoplar categoria ao cadastro de produto novamente.
- Alterar arquivos fora da feature `store`.
- Quebrar a navegação atual da loja ao adicionar nova aba.
- Usar estado compartilhado amplo demais para algo temporário.

## Evolução de integração aprovada em 13/07/2026

Para loja real, usar `GET /api/categories/store/:storeId`, `POST /api/categories`,
`PUT /api/categories/:id` e `DELETE /api/categories/:id`. O escopo continua frontend-only e os
paths permitidos permanecem `category-management/`, `product-management/` e a composição mínima
em `StorefrontPage.tsx`.

## Evolução: criação exclusiva no cadastro de produto — issue #51

### Resumo técnico

Remover da tela de gerenciamento o formulário, o estado, o handler e a função de serviço usados exclusivamente para criar categorias. Listagem, edição, remoção e seus estados permanecem. O fluxo inline de criação em `product-management/` é uma restrição de preservação e não deve ser alterado.

Esta evolução substitui as partes históricas do plano que previam criação dentro da tela de gerenciamento.

### Scope Lock da evolução

Allowed paths:

- `app/frontend/src/features/store/category-management/`
- `app/frontend/specs/store-categories/`
- `docs/screens/screen-store-categories-0012.md`
- `docs/requirements/functional/functional-requirements.md`

Read-only para validação:

- `app/frontend/src/features/store/product-management/`

Forbidden paths:

- `app/backend/`
- `database/`
- `supabase/`
- migrations
- alterações no fluxo inline de categorias do cadastro de produto
- dependências novas

### Arquivos e responsabilidades

- `pages/CategoryManagementPage.tsx`: remover composição e propriedades da criação.
- `hooks/useCategoryManagement.ts`: remover estado e orquestração exclusivos da criação.
- `types/categoryManagement.ts`: remover o contrato de criação exposto pelo hook.
- `services/categoryManagementService.ts`: remover a operação sem consumidor restante.
- `components/CreateCategoryForm.tsx`: excluir o componente sem uso.

### Validação

- A tela não apresenta botão, formulário ou ação para criar categoria.
- Listagem, edição e remoção continuam operantes.
- A criação inline durante o cadastro de produto continua presente e sem alteração.
- Estados de loading, erro e lista vazia permanecem coerentes.
- `npm run lint` e `npm run build` passam.

### ADR

- ADR necessária: não.
- Motivo: remoção de comportamento de UI dentro da arquitetura existente, sem contrato novo ou decisão estrutural.
