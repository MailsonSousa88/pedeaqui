# Plan: store-add-product

## Resumo Técnico

Implementar a primeira versão frontend da tela de adição de produtos como fluxo visual dentro da loja: o botão `Adicionar` da vitrine/gestão exibe uma área de gestão com o card `Adicionar novo produto`; ao clicar no card, um modal abre com o formulário de produto.

A implementação deve ficar em `src/features/store/product-management/`, como submódulo de gestão de produtos da feature `store`, sem mover a vitrine pública para fora de `storefront/`. Nesta versão, o formulário é visual/interativo em nível local, mas não persiste dados, não chama backend e não usa mock service.

## Flow Context

- Flow: `merchant-flow`
- Posição: gestão pós-onboarding, quando o lojista acessa a loja e inicia o cadastro de produto.
- Entrada: lojista clica em `Adicionar` na vitrine/gestão da loja.
- Saída/proximo passo: exibir card `Adicionar novo produto`; abrir modal de formulário; fechar/cancelar sem persistir.
- Restrições derivadas do fluxo:
  - A tela pertence ao lojista, não ao consumidor público.
  - Não implementar dashboard completa.
  - Não alterar backend, autenticação, Supabase, migrations ou webhooks.
  - Dependências futuras de backend devem ficar registradas como contrato esperado, não implementadas.

## Scope Lock

Target: Frontend

Allowed paths:

- `app/frontend/src/features/store/product-management/`
- `app/frontend/src/features/store/storefront/`
- `app/frontend/src/features/store/storefront/pages/StorefrontPage.tsx`
- `app/frontend/src/features/store/storefront/components/StoreTabs.tsx`
- `app/frontend/specs/store-add-product/`
- `app/frontend/src/shared/components/PrimaryButton.tsx`
- `app/frontend/src/shared/components/SecondaryButton.tsx`
- `app/frontend/src/features/store/category-management/`

Forbidden paths:

- `app/backend/`
- `database/`
- `supabase/`
- migrations
- `app/frontend/src/features/store/store-preconfiguration/`
- `app/frontend/src/features/billing/`
- `app/frontend/src/features/register/`
- `app/frontend/src/shared/`, exceto `components/PrimaryButton.tsx` e `components/SecondaryButton.tsx` autorizados para padronizar botões
- CSS global para estilos da tela/feature

## Arquitetura

A feature `store` continuará organizada por submódulos internos:

```text
src/features/store/
├── storefront/
└── product-management/
```

`storefront/` permanece responsável pela vitrine visual já aprovada. A integração mínima será transformar a aba/botão `Adicionar` em uma ação que exibe o módulo de gestão de produtos.

`product-management/` será responsável pela área de gestão de produtos e pelo modal de adicionar produto. Componentes não devem chamar API diretamente. Como não haverá backend nem service nesta versão, o estado local do fluxo deve ficar em hook da própria feature ou no componente de página quando for apenas estado de UI simples.

Separação esperada:

- `pages/`: composição do fluxo de gestão de produtos.
- `components/`: cards, modal e seções do formulário.
- `hooks/`: estado do modal, imagem ativa, toggles visuais e estado local simples do formulário, se necessário.
- `schemas/`: validação local dos campos obrigatórios e valores monetários, se a task implementar React Hook Form + Zod.
- `types/`: tipos do formulário e contrato esperado futuro.
- `services/`: não criar nesta primeira versão.
- `styles/`: não usar inicialmente; Tailwind no TSX deve ser suficiente.

## Arquivos Planejados

- `pages/`:
  - `app/frontend/src/features/store/product-management/pages/ProductManagementPage.tsx`
- `components/`:
  - `app/frontend/src/features/store/product-management/components/AddProductCard.tsx`
  - `app/frontend/src/features/store/product-management/components/AddProductModal.tsx`
  - `app/frontend/src/features/store/product-management/components/ProductBasicInfoSection.tsx`
  - `app/frontend/src/features/store/product-management/components/ProductCategorySection.tsx`
  - `app/frontend/src/features/store/product-management/components/ProductImagePlaceholders.tsx`
  - `app/frontend/src/features/store/product-management/components/ProductPromotionSection.tsx`
  - `app/frontend/src/features/store/product-management/components/ProductVariationSection.tsx`
  - `app/frontend/src/features/store/product-management/components/ProductFormActions.tsx`
- `hooks/`:
  - `app/frontend/src/features/store/product-management/hooks/useProductManagement.ts`
  - `app/frontend/src/features/store/product-management/hooks/useAddProductForm.ts`, se o formulário ficar grande o suficiente para separar orquestração.
- `services/`:
  - Não criar nesta versão.
- `schemas/`:
  - `app/frontend/src/features/store/product-management/schemas/addProductSchema.ts`, se a implementação usar React Hook Form + Zod nesta entrega.
- `types/`:
  - `app/frontend/src/features/store/product-management/types/productManagement.ts`
- `styles/`:
  - Não previsto.
- Integração com vitrine:
  - `app/frontend/src/features/store/storefront/pages/StorefrontPage.tsx`
  - `app/frontend/src/features/store/storefront/components/StoreTabs.tsx`

## Design System Necessário

- foundations:
  - `colors.md`
  - `spacing.md`
  - `motion.md`
- components:
  - `button.md`
  - `card.md`
  - `input.md`
  - `form-field.md`
  - `modal.md`
- patterns:
  - `public-storefront.md`, somente para manter coerência com a vitrine ao acionar `Adicionar`.
- motion:
  - Modal com entrada/saída curta.
  - Card clicável com microinteração leve.
  - Botões com hover/tap quando não estiverem desabilitados.

## Estratégia de Estilo

- Tailwind no TSX:
  - Usar para layout, espaçamento, cores, tipografia, responsividade, estados simples, modal, cards e campos.
- CSS Modules em `styles/`:
  - Não previsto nesta primeira versão.
- Motivo para usar CSS Module, se houver:
  - Apenas se a implementação precisar de selector complexo, pseudo-elemento, keyframe ou repetição visual que deixe o TSX ilegível.
- CSS global necessário:
  - Não. Não criar CSS global para esta tela.

## Contratos e Dependências

Não haverá integração real com backend nesta versão.

Contrato esperado futuro deve considerar:

```ts
type AddProductPayload = {
  name: string;
  description?: string;
  priceCents: number;
  categoryId?: string | null;
  available: boolean;
  promotionEnabled: boolean;
  promoPriceCents?: number;
  promoEndsAt?: string;
  imageSlots: 3;
  variations: ProductVariationInput[];
};

type ProductVariationInput = {
  label: string;
  options: ProductVariationOptionInput[];
};

type ProductVariationOptionInput = {
  value: string;
  priceModifierCents?: number;
};
```

Regras de contrato:

- `Todos` é implícita/sistêmica e não deve ser enviada como categoria selecionada manualmente.
- `categoryId` representa apenas a categoria específica opcional.
- `priceCents`, `promoPriceCents` e `priceModifierCents` devem ser valores em centavos futuramente.
- Imagens serão apenas placeholders nesta versão; upload real fica pendente.
- Destaque e estoque não fazem parte do contrato atual e não devem ser enviados.
- Variações aparecem de forma elementar, sem persistência real.

## Dependências de Biblioteca

- Framer Motion: usar para modal e card clicável, pois já está previsto e instalado.
- Lucide React: usar para ícones de produto, imagem, categoria, promoção, variação, fechar e adicionar.
- React Hook Form: recomendado se a task implementar validação local estruturada do formulário.
- Zod: recomendado se a task implementar schema local para nome/preço/promoção.

## ADR

- ADR necessária: não
- Motivo: a feature usa arquitetura, stack, design system e organização já previstos no spec kit. Não adiciona dependência nova, não altera backend, não altera autenticação, não muda contrato global e não redefine organização oficial do frontend.
- Caminho do rascunho, se necessário: `app/frontend/docs/adrs/<numero>-<titulo>.md`
- Status: não necessária

## Validação

- Executar `npm run build` em `app/frontend` quando houver implementação de código.
- Executar `npm run lint` em `app/frontend` quando houver implementação de código.
- Validar manualmente:
  - aba `Adicionar` exibe a área de gestão;
  - card `Adicionar novo produto` abre modal;
  - modal fecha por botão de fechar e cancelar;
  - categoria `Todos` aparece fixa;
  - placeholders de imagem navegam entre 1, 2 e 3;
  - promoção pode ser habilitada diretamente, sem destaque;
  - variações aparecem de forma elementar;
  - salvar não comunica persistência real.

## Riscos

- O modal pode ficar grande no mobile por conter muitas seções. Mitigação: usar scroll interno e seções visualmente separadas.
- A tela pode parecer funcional demais mesmo sem backend. Mitigação: não exibir mensagem de sucesso real nem simular persistência.
- Variações e categoria inline podem aumentar complexidade visual. Mitigação: manter forma elementar/visual na primeira entrega.
- A integração com a vitrine pode alterar a tela já aprovada. Mitigação: limitar mudanças em `storefront` ao controle de aba/modo e manter layout original de produtos.

## Evolução de integração aprovada em 13/07/2026

O plano passa a permitir persistência real usando `GET /api/categories/store/:storeId`,
`POST /api/categories`, `POST /api/products` e `GET /api/products/store/:storeId`.

O `storeId` vem da loja carregada em `StorefrontPage` e o token da sessão autenticada. O service
concentra HTTP e payload; o hook orquestra loading, erro, sucesso e atualiza a lista local com a
resposta criada. Permanecem proibidas alterações em backend, banco e contratos globais.
