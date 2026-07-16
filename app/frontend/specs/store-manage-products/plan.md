# Plan: store-manage-products

## Resumo Tecnico

Evoluir a area existente de `src/features/store/product-management/` para incluir o card `Gerenciar produtos`, uma listagem de produtos existentes, busca/filtros locais, acoes de editar, pausar/reativar e remover, e integracao planejada com os contratos de produto documentados nos records.

O plano reaproveita o modal/formulario atual de adicionar produto em modo `create` e `edit`, sem duplicar UI. A disponibilidade sera uma acao separada no card/lista do produto, usando `PATCH /api/products/:id/toggle-availability`, conforme Q9 confirmada.

## Flow Context

- Flow: `merchant-flow`
- Posicao: gestao pos-onboarding; lojista autenticado acessa a loja, abre a aba `Adicionar` e escolhe `Gerenciar produtos`.
- Entrada: contexto de loja com `storeId` plugavel/substituivel, produtos carregados por `GET /api/products/store/:storeId` e categorias da loja quando estiverem disponiveis.
- Saida/proximo passo: produto editado por `PUT /api/products/:id`, disponibilidade alternada por `PATCH /api/products/:id/toggle-availability`, produto removido por `DELETE /api/products/:id`, ou retorno aos cards de gestao.
- Restricoes derivadas do fluxo:
  - nao criar loja nesta feature;
  - nao fixar `storeId` real;
  - nao alterar backend;
  - acoes administrativas devem considerar autenticacao/token;
  - lojista com status `PENDENTE` nao deve ter rotas administrativas completas liberadas quando a autenticacao real estiver conectada;
  - vitrine publica deve refletir somente dados confirmados pelo backend.

## Scope Lock

Target: Frontend

Allowed paths:

- `app/frontend/src/features/store/product-management/`
- `app/frontend/src/shared/services/api.ts`, somente se for preciso ajustar tipagem generica sem regra de produto
- `app/frontend/specs/store-manage-products/`

Forbidden paths:

- `app/backend/`
- `database/`
- `supabase/`
- migrations
- `docs/requirements/`, salvo pedido explicito para corrigir `RF020`
- qualquer rota, controller, use case, repository ou contrato global de backend

## Arquitetura

A implementacao deve permanecer feature-based:

- `pages/`: compoe a area de gestao, cards de entrada, painel de listagem e modais.
- `components/`: renderizam UI e recebem dados/handlers por props.
- `hooks/`: orquestram estado local, filtros, abertura de modais, chamadas de service e feedbacks.
- `services/`: concentram chamadas HTTP e montagem de payloads para produtos.
- `schemas/`: validam formulario de produto com Zod.
- `types/`: concentram DTOs, modelos de UI, filtros, erros e payloads.
- `utils/`: mantem conversoes puras ja existentes, como moeda em reais para centavos.

Separacao planejada:

- `useProductManagement` continuara orquestrando fluxo da feature, mas deve ser quebrado ou expandido com cuidado para nao virar componente/estado gigante.
- Componentes de UI nao chamam `apiClient` diretamente.
- `productManagementService` usa `apiClient`.
- `productPayloadMapper` ou funcoes puras no service convertem form values para payloads.
- Origem de `storeId` deve entrar por props/hook fino substituivel, por exemplo `storeContext` ou `storeId?: string`, ate a loja real estar conectada.
- Listagem usa `GET /api/products/store/:storeId` por enquanto; se surgir rota administrativa protegida, trocar apenas o service e contrato.

## Arquivos Planejados

`pages/`:

- `src/features/store/product-management/pages/ProductManagementPage.tsx`
  - Manter cabecalho atual.
  - Renderizar `AddProductCard` e novo `ManageProductsCard`.
  - Alternar entre cards de entrada e painel `ManageProductsPanel`.
  - Passar handlers e estado vindo do hook.

`components/`:

- `src/features/store/product-management/components/ManageProductsCard.tsx`
  - Novo card clicavel no mesmo modelo visual de `AddProductCard`.
- `src/features/store/product-management/components/ManageProductsPanel.tsx`
  - Container da listagem, busca, filtros, estados e lista.
- `src/features/store/product-management/components/ProductManagementSearch.tsx`
  - Campo de busca com label/aria-label.
- `src/features/store/product-management/components/ProductManagementFilters.tsx`
  - Controles de disponibilidade, categoria e promocao.
- `src/features/store/product-management/components/ManagedProductList.tsx`
  - Lista de produtos ou estado vazio.
- `src/features/store/product-management/components/ManagedProductCard.tsx`
  - Produto gerenciavel com nome, preco, categoria, disponibilidade e acoes.
- `src/features/store/product-management/components/ProductDeleteConfirmation.tsx`
  - Modal/confirmacao de soft delete.
- `src/features/store/product-management/components/AddProductModal.tsx`
  - Evoluir para aceitar modo `create | edit`, titulo/copy dinamicos e valores iniciais.
- `src/features/store/product-management/components/ProductFormActions.tsx`
  - Evoluir texto do botao para `Salvar produto` ou `Salvar alteracoes`.
- Componentes existentes de secoes do formulario:
  - ajustar apenas o necessario para receber valores/controladores quando RHF/Zod forem conectados em implementacao.
  - nao adicionar persistencia real para imagens, variacoes e estoque sem contrato backend.

`hooks/`:

- `src/features/store/product-management/hooks/useProductManagement.ts`
  - Orquestrar cards, painel, modais, filtros, loading/erro/sucesso.
  - Separar acao de disponibilidade do fluxo de salvar edicao.
  - Receber/usar `storeId` plugavel.

`services/`:

- `src/features/store/product-management/services/productManagementService.ts`
  - `listProductsByStore(storeId)`
  - `updateProduct(productId, payload, authToken?)`
  - `toggleProductAvailability(productId, authToken?)`
  - `deleteProduct(productId, authToken?)`
  - mapeamento de erros para mensagens aprovadas.

`schemas/`:

- `src/features/store/product-management/schemas/productFormSchema.ts`
  - Validar nome, preco, categoria, promocao e fim de promocao.
  - Nao validar `details` livre.

`types/`:

- `src/features/store/product-management/types/productManagement.ts`
  - Expandir com `ManageProductListItem`, DTOs de API, `UpdateProductPayload`, filtros, modo do formulario e estados de acao.

`utils/`:

- `src/features/store/product-management/utils/currencyInput.ts`
  - Reusar para exibicao/conversao de moeda.
  - Adicionar helper apenas se houver duplicacao real.

`styles/`:

- Nenhum arquivo planejado inicialmente.
- Usar CSS Module somente se Tailwind tornar modais/listas ilegíveis ou se surgir seletor complexo não previsto.

`contracts/`:

- `specs/store-manage-products/contracts/product-management-api.md`
  - Contrato frontend dos endpoints, payloads, respostas esperadas e dependencias.

## Design System Necessario

- foundations:
  - `colors.md`
  - `typography.md`
  - `spacing.md`
  - `radius.md`
  - `shadows.md`
  - `motion.md`
- components:
  - `card.md`
  - `button.md`
  - `input.md`
  - `form-field.md`
  - `modal.md`
  - `badge.md`
  - `alert.md`
- patterns:
  - `dashboard-pages.md`
  - `empty-error-loading-states.md`
  - `public-storefront.md`, apenas para consistencia de produto, busca/filtros e disponibilidade dentro da vitrine.
- motion:
  - Framer Motion em cards clicaveis, botoes e entrada/saida de modal com duracao `0.2s` e easing `easeOut`.

## Estrategia de Estilo

- Tailwind no TSX:
  - padrao para layout, cards, lista, filtros, modais, badges e estados.
  - usar tokens existentes: `#e30507`, `#b80406`, `#fff0f0`, `#111111`, `#6b7280`, `#f5f5f5`, `#e5e7eb`, `#dc2626`, `#16a34a`.
- CSS Modules em `styles/`:
  - nao planejado.
- Motivo para usar CSS Module, se houver:
  - apenas se alguma interacao de filtro/lista exigir seletor complexo que prejudique legibilidade do TSX.
- CSS global necessario: nao, salvo base/theme ja existente.

## Contratos e Dependencias

Contrato registrado em:

- `specs/store-manage-products/contracts/product-management-api.md`

Rotas planejadas:

- `GET /api/products/store/:storeId`
  - listagem disponivel nos records, marcada como publica.
  - dependencia: `storeId` plugavel.
  - observacao: pode ser substituida por rota administrativa protegida futura.
- `PUT /api/products/:id`
  - edicao de produto conforme records, apesar de `RF020` mencionar `PATCH`.
  - dependencia: autenticacao/token.
- `PATCH /api/products/:id/toggle-availability`
  - acao separada de pausar/reativar, sem body.
  - dependencia: autenticacao/token.
- `DELETE /api/products/:id`
  - soft delete.
  - dependencia: autenticacao/token.

Dependencias externas e limites:

- A origem final de `storeId` ainda depende da conexao das telas de criacao/gestao real da loja.
- Imagens (`product_images`) existem no schema, mas ainda nao possuem rotas documentadas no PR #14.
- Variacoes (`product_variations` e `variation_options`) existem no schema, mas ainda nao possuem rotas documentadas no PR #14.
- Estoque controlado existe nos requisitos, mas ainda nao possui contrato final identificado em `products`.
- `details` nao deve ser editado livremente; preservar quando necessario e nao inventar campos.
- Categoria `Todos` deve usar id real criado pelo backend quando `categoryId` for exigido.

## Dependencias de Biblioteca

- Framer Motion: usar; ja esta instalado.
- Lucide React: usar para icones de card, busca, editar, pausar/reativar, remover, alerta e fechar.
- React Hook Form: usar para evoluir formulario/modal em modo `create | edit`.
- Zod: usar para schema de formulario.

## ADR

- ADR necessaria: nao
- Motivo: a feature segue arquitetura feature-based existente, usa bibliotecas ja previstas na stack, nao altera contrato global, nao muda autenticacao, nao cria backend e nao muda organizacao oficial.
- Caminho do rascunho, se necessario: `app/frontend/docs/adrs/<numero>-<titulo>.md`
- Status: nao necessaria

## Validacao

Na implementacao futura, executar:

- `npm run build`
- `npm run lint`

Validacoes manuais esperadas:

- card `Gerenciar produtos` aparece dentro da aba `Adicionar`;
- painel de produtos abre e permite voltar aos cards;
- busca e filtros nao recarregam a pagina;
- estado vazio de loja sem produtos aparece;
- estado sem `storeId` aparece sem chamar API com id invalido;
- modal de edicao reaproveita formulario, muda titulo/copy e nao salva disponibilidade;
- acao `Pausar`/`Reativar` chama rota dedicada;
- remocao exige confirmacao;
- mensagens de erro seguem `clarify.md`;
- textos nao estouram em mobile.

## Riscos

- Origem final de `storeId` ainda nao conectada: mitigar com camada plugavel e estado sem loja conectada.
- Listagem atual e publica: mitigar isolando endpoint no service para trocar por rota protegida futura.
- Divergencia `RF020` vs records: mitigar documentando uso de `PUT /api/products/:id` ate o RF ser corrigido.
- Reaproveitar modal de adicionar pode aumentar complexidade: mitigar com modo explicito `create | edit` e props claras.
- Imagens, variacoes e estoque podem parecer persistidos sem rota: mitigar escondendo ou marcando como nao persistente ate contrato aprovado.
- Produto acima de limite de plano: backend deve bloquear; frontend apenas exibe mensagem aprovada.
