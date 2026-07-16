# Plan: detalhe público do produto

## Resumo Técnico

Criar uma página pública em `src/features/orders/product-detail/`, acessível por `/lojas/:storeSlug/produtos/:productId`. A página usará um service próprio para consultar a loja por slug e, depois, produtos e categorias por `storeId`; um hook orquestrará as consultas, validará o vínculo produto-loja e exporá estados explícitos para a UI. A vitrine receberá callbacks de navegação, sem importar a feature de pedidos. Não serão usados mocks, campos de imagem inexistentes nem integração com o carrinho mockado atual.

## Flow Context

- Flow: `consumer-flow`.
- Posição: após a seleção de um produto na vitrine pública e antes de futuras ações de carrinho.
- Entrada: card de produto da vitrine ou acesso direto à URL `/lojas/:storeSlug/produtos/:productId`.
- Saída/próximo passo: retorno para `/lojas/:storeSlug`.
- Restrições derivadas do fluxo: acesso público; contexto de loja preservado; produto indisponível permanece consultável, mas não pode ser comprado; estados de erro e conteúdo indisponível são obrigatórios; não criar checkout ou pedido.

## Scope Lock

Target: Frontend

Allowed paths:

- `app/frontend/src/App.tsx`
- `app/frontend/src/app/routes/types.ts`
- `app/frontend/src/features/orders/product-detail/`
- `app/frontend/src/features/store/storefront/pages/StorefrontPage.tsx`
- `app/frontend/src/features/store/storefront/components/EmptyProductsArea.tsx`
- `app/frontend/specs/orders-product-detail/`

Forbidden paths:

- `app/backend/`
- `database/`
- `supabase/`
- migrations
- contratos globais em `docs/records/`
- outras features frontend não listadas no Scope Lock

## Arquitetura

- `pages/ProductDetailPage.tsx` compõe a tela e escolhe entre loading, erro, conteúdo indisponível e sucesso.
- `hooks/useProductDetail.ts` orquestra as consultas, retry, seleção do produto, resolução da categoria e estado da galeria.
- `hooks/useProductDetail.ts` também concentra a quantidade local, sua normalização para inteiro mínimo `1` e o reset antes do retorno.
- `services/productDetailService.ts` concentra as três chamadas HTTP públicas e traduz erros técnicos sem renderizar UI.
- `types/productDetail.ts` define DTOs estritos derivados do contrato e o modelo de apresentação da feature.
- `utils/productDetail.ts` concentra funções puras de promoção vigente e formatação/normalização do modelo, isolando regras da UI.
- Componentes recebem dados e callbacks; nenhum componente chama API diretamente.
- A feature `orders` não importa a feature `store`. A vitrine apenas emite `storeSlug` e `productId` por callback, e `App.tsx` coordena a navegação.
- A rota legada `/storefront/:slug` permanece suportada para não quebrar links existentes; `/lojas/:storeSlug` passa a ser o endereço público canônico usado pelo novo fluxo.

## Arquivos Planejados

- `src/features/orders/product-detail/pages/ProductDetailPage.tsx`: composição e estados da página.
- `src/features/orders/product-detail/components/ProductDetailHeader.tsx`: header público padrão com o logo oficial, sem ação de retorno.
- `src/features/orders/product-detail/components/ProductGalleryPlaceholder.tsx`: três posições neutras, setas, indicadores e acessibilidade.
- `src/features/orders/product-detail/components/ProductInformation.tsx`: nome, descrição, categoria, detalhes públicos seguros e disponibilidade.
- `src/features/orders/product-detail/components/ProductPrice.tsx`: preço base e promoção vigente.
- `src/features/orders/product-detail/components/ProductDetailFeedback.tsx`: loading, erro, retry e conteúdo indisponível.
- `src/features/orders/product-detail/components/ProductQuantitySelector.tsx`: label, botões `−`/`+` e input numérico controlado.
- `src/features/orders/product-detail/components/ProductActions.tsx`: botão textual `Voltar` e CTA desabilitado com ícone de carrinho.
- `src/features/orders/product-detail/hooks/useProductDetail.ts`: estado e side effects.
- `src/features/orders/product-detail/services/productDetailService.ts`: comunicação HTTP.
- `src/features/orders/product-detail/types/productDetail.ts`: DTOs e tipos de estado.
- `src/features/orders/product-detail/utils/productDetail.ts`: regras puras de promoção e formatação.
- `src/App.tsx`: parsing/renderização da nova rota e callbacks entre vitrine e detalhe.
- `src/app/routes/types.ts`: tipos de `/lojas/:storeSlug` e `/lojas/:storeSlug/produtos/:productId`.
- `src/features/store/storefront/pages/StorefrontPage.tsx`: encaminhar callback de seleção de produto.
- `src/features/store/storefront/components/EmptyProductsArea.tsx`: tornar o card navegável por teclado e clique.
- `schemas/`: não aplicável; não há formulário.
- `styles/`: não planejado; Tailwind é suficiente.

## Design System Necessário

- foundations: `colors.md`, `typography.md`, `spacing.md`, `radius.md`, `shadows.md`.
- components: `button.md`, `card.md`, `badge.md`, `alert.md`, `input.md`, `form-field.md`.
- patterns: `public-storefront.md`, `empty-error-loading-states.md`, `cart-checkout.md`.
- motion: não necessário; a troca dos placeholders será simples e respeitará foco/teclado sem animação estrutural.

## Estratégia de Estilo

- Tailwind no TSX: layout responsivo, grid desktop, empilhamento mobile, cards, placeholders, tipografia, badges, botões, foco, loading e estados semânticos.
- CSS Modules em `styles/`: não.
- Motivo para usar CSS Module, se houver: não aplicável.
- CSS global necessário: não.

## Contratos e Dependências

- Contrato local: `specs/orders-product-detail/contracts/public-product-detail.md`.
- `GET /api/stores/:slug`: obtém a loja e seu `id`.
- `GET /api/products/store/:storeId`: lista produtos não deletados; a feature seleciona localmente `productId` e valida `storeId`.
- `GET /api/categories/store/:storeId`: resolve o nome da categoria a partir de `categoryId` quando disponível.
- O DTO do produto reconhece apenas campos documentados: `id`, `storeId`, `categoryId`, `name`, `description`, `priceCents`, `promoPriceCents`, `promoEndsAt`, `details` e `available`.
- Nenhum campo de imagem será presumido; a galeria usa três placeholders neutros.
- `details` será opcional e exibirá apenas valores públicos simples que possam ser apresentados com segurança; dados ausentes ou estruturas incompatíveis serão omitidos.
- Promoção vigente exige `promoPriceCents > 0`, valor menor que `priceCents` e `promoEndsAt` ausente ou no futuro.
- Loja retornada com `active = false` deve produzir conteúdo indisponível e impedir a consulta de produto como conteúdo público válido.
- O carrinho existente contém seed mockado e não possui operação pública real de inclusão. Por YAGNI e pelo escopo da issue, ele não será conectado.
- O CTA `Adicionar ao carrinho` será exibido desabilitado para todos os produtos até existir integração real; nenhuma escrita em `localStorage` ocorrerá.
- Quantidade é estado efêmero da página: inteiro mínimo `1`, incremento/decremento unitário, digitação normalizada e reset ao sair pelo `X` ou pelo botão `Voltar`.

## Dependências de Biblioteca

- Framer Motion: não necessário para a feature.
- Lucide React: reutilizar `ArrowLeft`, `ChevronLeft`, `ChevronRight`, `ImageIcon`, `AlertCircle`, `Loader2`, `PackageX`, `Tag` e ícone de disponibilidade, sem nova dependência.
- React Hook Form: não aplicável.
- Zod: não aplicável; o seletor não submete formulário e a normalização é uma regra local simples.
- Testes: nenhuma biblioteca será adicionada nesta entrega, por decisão humana motivada pelo prazo.

## ADR

- ADR necessária: não para a implementação. A proposta de infraestrutura de testes foi documentada e rejeitada.
- Motivo: o responsável do projeto realizará a validação funcional manualmente e decidiu não adicionar dependências de teste nesta entrega.
- Caminho do rascunho: `app/frontend/docs/adrs/0001-frontend-component-testing.md`.
- Status: rejeitada; não bloqueia `tasks` nem implementação.

## Validação

- `npm run build` para TypeScript e build Vite.
- `npm run lint` para regras estáticas.
- Roteiro de verificação manual entregue ao responsável: larguras mobile e desktop, navegação por teclado, foco visível, recarregamento direto da URL, promoção expirada, indisponibilidade, loading, erro e produto inexistente.
- `tasks.md` só será marcado após os checks correspondentes passarem.

## Riscos

- A listagem pública pode crescer porque não existe endpoint individual; a seleção local é temporária e deve ser substituída quando houver contrato específico.
- O backend não documenta exemplo de resposta da listagem; campos opcionais devem ser tolerados sem inventar dados.
- `details` é um objeto aberto e pode conter estruturas não apresentáveis; a UI deve omitir conteúdo incompatível.
- A base possui rotas legadas `/storefront/*`; a nova rota canônica deve ser adicionada sem regressão.
- O carrinho atual usa dados mockados. Integrá-lo violaria o critério de dados reais e o Scope Lock.
- Um CTA visual sem integração pode confundir; por isso será semanticamente desabilitado e não terá handler de persistência.
- A ausência de testes automatizados aumenta o risco de regressão; o responsável do projeto assumiu a validação funcional manual desta entrega.
