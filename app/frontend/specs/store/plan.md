# Plan: storefront pública do consumidor

## Resumo Técnico

Separar a composição pública e a composição de gestão que hoje coexistem em `StorefrontPage`. A página pública carregará loja, categorias e produtos reais pelo slug, exibirá somente conteúdo consumer, aplicará busca/filtros/ordenação/paginação em memória e continuará para detalhe/carrinho pelas rotas existentes. A edição e os painéis administrativos serão preservados em `/storefront/:slug/manage`, protegidos por sessão/propriedade no frontend e pelas autorizações já exigidas nos endpoints de mutação.

## Flow Context

- Flow: `consumer-flow`
- Posição: após Home/listagem pública ou acesso direto por slug; antes do detalhe público do produto e do carrinho.
- Entrada: `/storefront/:slug` canônica ou `/lojas/:slug` como alias público.
- Saída/próximo passo: `/lojas/:slug/produtos/:productId`, `/market-cart` ou `/stores`.
- Restrições derivadas do fluxo:
  - consumidor navega sem autenticação;
  - sessão de proprietário não altera a composição pública;
  - loja e produtos devem vir de contratos reais, sem mocks;
  - indisponibilidade não pode expor estado de tenant, assinatura ou autorização;
  - ações administrativas existem somente em contexto de gestão;
  - inclusão real no carrinho fica fora desta issue porque o carrinho atual ainda usa dados demonstrativos.

## Scope Lock

Target: Frontend

Allowed paths:

- `app/frontend/src/App.tsx`
- `app/frontend/src/app/routes/types.ts`
- `app/frontend/src/features/auth/login/pages/LoginPage.tsx`
- `app/frontend/src/features/store/storefront/`
- `app/frontend/specs/store/`
- `app/frontend/package.json`
- `app/frontend/package-lock.json`
- `app/frontend/vite.config.ts`

Forbidden paths:

- `app/backend/`
- `database/`
- `supabase/`
- migrations
- contratos ou endpoints backend
- `app/frontend/src/features/orders/market-cart/`
- `app/frontend/src/features/orders/product-detail/`
- alterações em outras specs

## Arquitetura

- `StorefrontPage` será exclusivamente pública e não importará páginas de gestão.
- `StorefrontManagementPage` preservará edição, produtos e categorias em rota explícita de gestão.
- `useStorefront` orquestrará leitura pública, retry e compartilhamento, sem mutação administrativa.
- `useStorefrontManagement` concentrará sessão, propriedade e edição da loja.
- `useStorefrontProducts` continuará responsável por carregar produtos/categorias reais e oferecer retry.
- `catalog.ts` concentrará regras puras de normalização, filtro, ordenação e paginação para manter UI simples e testável.
- Componentes não chamarão API; services permanecerão como única fronteira HTTP.
- O contexto de gestão reutilizará temporariamente os módulos administrativos já existentes sem ampliar suas responsabilidades; a storefront pública não os importará.

## Arquivos Planejados

- `pages/StorefrontPage.tsx`: composição consumer, estados públicos, navegação e catálogo.
- `pages/StorefrontManagementPage.tsx`: composição autenticada de edição/produtos/categorias.
- `components/StorefrontHeader.tsx`: logo oficial, voltar para lojas e acesso ao carrinho.
- `components/StoreHeroCard.tsx`: identidade pública, informações e compartilhamento, sem edição.
- `components/StoreManagementHeroCard.tsx`: edição da loja somente no contexto autorizado.
- `components/StoreTabs.tsx`: navegação exclusiva do contexto de gestão.
- `components/ProductSearchBar.tsx`: busca, faixa de preço, ordenação e limpeza.
- `components/CategoryChips.tsx`: categorias públicas acessíveis.
- `components/EmptyProductsArea.tsx`: grid público de produtos, imagens/fallbacks, promoções, loading/erro/vazio e paginação.
- `components/StorefrontFeedback.tsx`: estados público indisponível e falha temporária com ações seguras.
- `hooks/useStorefront.ts`: leitura, retry, Web Share API e Clipboard fallback.
- `hooks/useStorefrontManagement.ts`: autorização local e mutação autenticada existente.
- `hooks/useStorefrontProducts.ts`: leitura e retry do catálogo.
- `services/storefrontService.ts`: classificação de 404 público e rotas existentes.
- `types/storefront.ts`: estados públicos, filtros, paginação e imagens opcionais.
- `utils/catalog.ts`: transformação pura do catálogo.
- `utils/catalog.test.ts`: busca, categoria, preço, ordenação e paginação.
- `pages/StorefrontPage.test.tsx`: ausência de controles administrativos e estados públicos.
- `pages/StorefrontManagementPage.test.tsx`: controles de gestão somente com sessão/propriedade.
- `src/App.tsx`, `src/app/routes/types.ts`, `LoginPage.tsx`: reconhecer rota `/storefront/:slug/manage` e encaminhar login/configuração ao contexto correto.
- `specs/store/contracts/storefront-api.md`: explicitar capacidades e lacunas do contrato público atual.
- `package.json`, `package-lock.json`, `vite.config.ts`: runner e ambiente de testes frontend.
- `vitest.config.ts`: ambiente jsdom isolado dos plugins de build do Vite/Tailwind.

## Design System Necessário

- foundations:
  - `.specify/design-system/foundations/colors.md`
  - `.specify/design-system/foundations/spacing.md`
  - `.specify/design-system/foundations/typography.md`
  - `.specify/design-system/foundations/radius.md`
  - `.specify/design-system/foundations/shadows.md`
- components:
  - `.specify/design-system/components/button.md`
  - `.specify/design-system/components/card.md`
  - `.specify/design-system/components/input.md`
- patterns:
  - `.specify/design-system/patterns/public-storefront.md`
  - `.specify/design-system/patterns/empty-error-loading-states.md`
- motion: microinterações já existentes com Framer Motion; sem animação estrutural nova.

## Estratégia de Estilo

- Tailwind no TSX: layout, grid, responsividade, tipografia, estados, foco, cards e controles.
- CSS Modules em `styles/`: não usar.
- Motivo para usar CSS Module, se houver: não se aplica.
- CSS global necessário: não.

## Contratos e Dependências

- `GET /api/stores/:slug`: leitura pública da identidade e dados disponíveis.
- `GET /api/products/store/:storeId`: coleção real usada pelos controles locais.
- `GET /api/categories/store/:storeId`: categorias reais e sua ordem recebida.
- `PUT /api/stores/:id`: mutação exclusiva do contexto de gestão com bearer token.
- A resposta atual não documenta identificação legal, e-mail público, banner, situação de funcionamento, imagens de produto ou paginação server-side; esses campos não serão inventados.
- Busca, categoria, faixa de preço, ordenação e páginas de 20 itens serão derivadas localmente da coleção recebida.
- O frontend não replica elegibilidade de tenant/assinatura; um 404 público é tratado como loja indisponível.

## Dependências de Biblioteca

- Framer Motion: reutilizar em botões/chips já animados.
- Lucide React: ícones acessíveis de loja, busca, filtros, compartilhar, navegação e carrinho.
- React Hook Form e Zod: manter somente no formulário administrativo existente.
- Vitest + React Testing Library + jsdom: adicionar como dependências de desenvolvimento para atender os testes de regressão exigidos pela issue; não afetam o bundle de produção.

## ADR

- ADR necessária: não.
- Motivo: separação de páginas e adição de tooling de teste são evoluções locais do frontend, sem mudar stack de produção, contrato global, autenticação backend ou organização oficial por features.
- Caminho do rascunho, se necessário: não se aplica.
- Status: não necessária.

## Validação

- `npm test -- --run`
- `npm run lint`
- `npm run build`
- Validar rotas públicas sem sessão e rota de gestão com/sem sessão.
- Validar 320 px e desktop sem rolagem horizontal indevida.
- Validar teclado, foco, nomes acessíveis e anúncios de feedback.
- Validar que uma sessão de proprietário não injeta controles na rota pública.
- Validar que nenhum dado demonstrativo do carrinho ou catálogo é exibido na storefront.

## Riscos

- O endpoint público pode devolver mais itens do que o ideal; a UI limitará a apresentação, mas paginação server-side continua dependência futura.
- A comparação `session.profile.id === store.tenantId` segue o contrato atualmente usado no login; autorização definitiva continua obrigatória no backend.
- O carrinho existente contém seed demonstrativo e não deve ser conectado à storefront nesta issue.
- Web Share API varia por navegador; o fallback de Clipboard precisa permanecer funcional.
- Separar gestão pode quebrar links pós-login se `App.tsx` e `LoginPage.tsx` não forem atualizados em conjunto.
