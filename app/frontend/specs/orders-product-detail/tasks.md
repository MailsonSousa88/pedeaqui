# Tasks: detalhe público do produto

## Dependency Graph

```text
T001 -> T002 -> T003 -> T004 -> T005 -> T006 -> T007 -> T008 -> T009 -> T010 -> T011 -> T012
```

## Tasks

- [x] T001 Criar tipos, regras puras e service do detalhe público
  - Type: contratos e integração HTTP.
  - Paths allowed:
    - `app/frontend/src/features/orders/product-detail/types/productDetail.ts`
    - `app/frontend/src/features/orders/product-detail/utils/productDetail.ts`
    - `app/frontend/src/features/orders/product-detail/services/productDetailService.ts`
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/store/`
    - `app/frontend/src/features/orders/market-cart/`
    - `package.json`
  - Depends on: nenhuma.
  - Requirements: tipar apenas campos documentados; consultar loja, produtos e categorias públicas; validar promoção vigente; não presumir imagens; não usar mocks.
  - Done when: DTOs, modelo de apresentação, helpers e três chamadas públicas estiverem separados e compiláveis.
  - Checks: `npm run build`.

- [x] T002 Implementar o hook de orquestração do produto
  - Type: estado e side effects.
  - Paths allowed:
    - `app/frontend/src/features/orders/product-detail/hooks/useProductDetail.ts`
    - arquivos permitidos em T001, somente para correções necessárias de contrato.
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/store/`
    - `app/frontend/src/features/orders/market-cart/`
  - Depends on: T001.
  - Requirements: carregar loja, produtos e categorias; tratar loja com `active = false` como conteúdo indisponível; selecionar `productId`; validar `storeId`; resolver categoria; suportar retry; impedir atualização após unmount; expor loading, erro, sucesso e conteúdo indisponível; manter `available = false` como sucesso com bloqueio de compra.
  - Done when: o hook expuser um estado discriminado suficiente para a página sem misturar JSX ou chamadas diretas nos componentes.
  - Checks: `npm run build`; `npm run lint`.

- [x] T003 Construir os componentes visuais da feature
  - Type: UI.
  - Paths allowed:
    - `app/frontend/src/features/orders/product-detail/components/ProductDetailHeader.tsx`
    - `app/frontend/src/features/orders/product-detail/components/ProductGalleryPlaceholder.tsx`
    - `app/frontend/src/features/orders/product-detail/components/ProductInformation.tsx`
    - `app/frontend/src/features/orders/product-detail/components/ProductPrice.tsx`
    - `app/frontend/src/features/orders/product-detail/components/ProductDetailFeedback.tsx`
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/store/`
    - `app/frontend/src/features/orders/market-cart/`
    - CSS global
  - Depends on: T002.
  - Requirements: usar somente design system citado no plano; logo oficial; três placeholders neutros; setas e indicadores acessíveis; promoção expirada fora do destaque; categoria quando resolvida; detalhes públicos simples quando apresentáveis; indisponibilidade textual; botão desabilitado apenas para indisponível; sem ação fictícia de carrinho.
  - Done when: todos os blocos forem responsivos, orientados por props e sem chamadas de API.
  - Checks: `npm run build`; `npm run lint`.

- [x] T004 Compor a página pública e seus estados
  - Type: página.
  - Paths allowed:
    - `app/frontend/src/features/orders/product-detail/pages/ProductDetailPage.tsx`
    - arquivos da feature `app/frontend/src/features/orders/product-detail/`, somente para integração/correções.
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/store/`
    - `app/frontend/src/features/orders/market-cart/`
  - Depends on: T003.
  - Requirements: receber `storeSlug`, `productId` e callback de retorno; renderizar loading, erro com retry, conteúdo indisponível e sucesso; não exibir administração, checkout ou WhatsApp.
  - Done when: acesso direto à página puder ser renderizado somente com os parâmetros da URL e dados reais do contrato.
  - Checks: `npm run build`; `npm run lint`.

- [x] T005 Adicionar parsing e navegação das rotas públicas
  - Type: roteamento.
  - Paths allowed:
    - `app/frontend/src/App.tsx`
    - `app/frontend/src/app/routes/types.ts`
  - Paths forbidden:
    - `app/backend/`
    - outras páginas/features
  - Depends on: T004.
  - Requirements: reconhecer `/lojas/:storeSlug`, `/lojas/:storeSlug/produtos/:productId` e manter `/storefront/:slug`; decodificar parâmetros com fallback seguro; renderizar detalhe; retornar para a loja; suportar `popstate` e recarregamento.
  - Done when: as rotas forem tipadas e o `App` conseguir navegar entre vitrine e detalhe sem biblioteca nova.
  - Checks: `npm run build`; `npm run lint`.

- [x] T006 Tornar os cards da vitrine navegáveis para o detalhe
  - Type: integração de navegação.
  - Paths allowed:
    - `app/frontend/src/features/store/storefront/pages/StorefrontPage.tsx`
    - `app/frontend/src/features/store/storefront/components/EmptyProductsArea.tsx`
    - `app/frontend/src/App.tsx`, somente para conectar callbacks.
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/orders/market-cart/`
    - services e tipos da feature store
  - Depends on: T005.
  - Requirements: card clicável e acessível por teclado; callback com slug e id; sem importação direta de `orders` pela feature store; preservar busca, filtros e apresentação atual.
  - Done when: selecionar qualquer card disponível navegar para a URL canônica correspondente sem recarregar a aplicação.
  - Checks: `npm run build`; `npm run lint`.

- [x] T007 Executar validação técnica e preparar roteiro manual
  - Type: validação.
  - Paths allowed:
    - `app/frontend/specs/orders-product-detail/tasks.md`, apenas para marcar tarefas após checks.
  - Paths forbidden:
    - todos os arquivos de produção, salvo correção de falha encontrada e limitada ao path permitido pela task correspondente.
    - `package.json` e lockfile.
  - Depends on: T006.
  - Requirements: não instalar bibliotecas de teste; executar build e lint; entregar roteiro manual para rota direta, retorno, três placeholders, teclado, promoção vigente/expirada, produto indisponível, erro, retry e produto inexistente/outra loja.
  - Done when: build e lint passarem, impossibilidades forem registradas e o roteiro manual estiver disponível para o responsável.
  - Checks: `npm run build`; `npm run lint`; revisão de `git diff --check`.

- [x] T008 Adicionar e normalizar o estado local de quantidade
  - Type: estado e regra local.
  - Paths allowed:
    - `app/frontend/src/features/orders/product-detail/hooks/useProductDetail.ts`
    - `app/frontend/src/features/orders/product-detail/utils/productDetail.ts`, somente se a normalização for extraída como função pura.
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/orders/market-cart/`
    - `package.json`
  - Depends on: T007.
  - Requirements: iniciar em `1`; incrementar em uma unidade; decrementar sem passar de `1`; aceitar digitação direta; normalizar vazio, decimal, zero, negativo e inválido para inteiro mínimo `1`; expor reset para a saída da página.
  - Done when: o hook entregar quantidade e callbacks estáveis, sem persistência ou dependência do carrinho.
  - Checks: `npm run build`; `npm run lint`.

- [x] T009 Construir o seletor acessível de quantidade
  - Type: UI controlada.
  - Paths allowed:
    - `app/frontend/src/features/orders/product-detail/components/ProductQuantitySelector.tsx`
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/orders/market-cart/`
    - CSS global
  - Depends on: T008.
  - Requirements: label visível `Quantidade`; controles `− [input] +`; botões secundários seguindo `button.md`; input seguindo `input.md` e `form-field.md`; `−` desabilitado em `1`; foco visível; nomes acessíveis; teclado numérico em mobile.
  - Done when: o componente for orientado apenas por props e nunca renderizar valor menor que `1`.
  - Checks: `npm run build`; `npm run lint`.

- [x] T010 Construir as ações de retorno e carrinho futuro
  - Type: UI de ações.
  - Paths allowed:
    - `app/frontend/src/features/orders/product-detail/components/ProductActions.tsx`
    - `app/frontend/src/features/orders/product-detail/pages/ProductDetailPage.tsx`, somente para posicionar o `X` no topo e as ações inferiores.
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/orders/market-cart/`
    - `localStorage`
  - Depends on: T009.
  - Requirements: botão `X` no topo do conteúdo, igual ao padrão do modal de adicionar produto, com `aria-label="Voltar para a loja"`; botão textual `Voltar` na área de ações; os dois retornos chamam o mesmo callback; não usar o texto `Cancelar`; CTA primário `Adicionar ao carrinho` com ícone de carrinho, visível e desabilitado; nenhum handler de persistência.
  - Done when: `X`, `Voltar` e `Adicionar ao carrinho` seguirem o Design System, os dois retornos tiverem o mesmo comportamento e nenhuma integração fictícia for criada.
  - Checks: `npm run build`; `npm run lint`.

- [x] T011 Integrar quantidade e ações à página do produto
  - Type: composição.
  - Paths allowed:
    - `app/frontend/src/features/orders/product-detail/pages/ProductDetailPage.tsx`
    - `app/frontend/src/features/orders/product-detail/components/ProductInformation.tsx`, somente para retirar o CTA desabilitado antigo e evitar duplicação.
    - `app/frontend/src/features/orders/product-detail/hooks/useProductDetail.ts`, somente para conectar o reset ao retorno.
  - Paths forbidden:
    - `app/backend/`
    - `app/frontend/src/features/orders/market-cart/`
    - `package.json`
  - Depends on: T010.
  - Requirements: posicionar seletor, botão `Voltar` e CTA junto às informações; remover botão antigo específico de indisponibilidade; ao clicar no `X` ou em `Voltar`, resetar quantidade para `1` antes de navegar; ao reabrir produto, mostrar `1`; manter CTA desabilitado tanto em produto disponível quanto indisponível.
  - Done when: a página apresentar um único conjunto coerente de quantidade/ações, responsivo e sem persistência.
  - Checks: `npm run build`; `npm run lint`.

- [x] T012 Validar o ajuste de quantidade e ações
  - Type: validação técnica e roteiro manual.
  - Paths allowed:
    - `app/frontend/specs/orders-product-detail/tasks.md`, somente para registrar resultados.
  - Paths forbidden:
    - `package.json` e lockfile.
    - arquivos de produção, salvo correção restrita à task responsável.
  - Depends on: T011.
  - Requirements: não adicionar testes/libs; validar `1` inicial, limite do `−`, incremento, digitação, normalização, reset e navegação equivalentes pelo `X` e por `Voltar`, CTA com ícone e ausência de persistência.
  - Done when: build, lint e diff passarem e o roteiro manual estiver registrado.
  - Checks: `npm run build`; `npm run lint`; `git diff --check`.

## Notes

- Marcar task como concluída somente após seus checks.
- Não executar tasks futuras sem pedido explícito.
- Não adicionar bibliotecas de teste; a validação funcional manual será realizada pelo responsável do projeto.
- Não integrar o carrinho mockado existente.
- Se o contrato real divergir dos DTOs documentados, registrar a divergência sem alterar backend ou inventar campos.

## Resultado da validação técnica

- `npm run build`: aprovado em 15/07/2026; permanece apenas o aviso não bloqueante já existente sobre chunk acima de 500 kB.
- `npm run lint`: aprovado em 15/07/2026.
- `git diff --check`: aprovado em 15/07/2026; somente avisos de normalização LF/CRLF, sem erro de whitespace.
- T012: os três checks foram repetidos e aprovados em 15/07/2026 após a integração da quantidade e das ações; nenhuma biblioteca de testes foi adicionada.
- T012: auditoria estática confirmou um único CTA `Adicionar ao carrinho`, ícone `ShoppingCart`, estado desabilitado, reset compartilhado pelos dois retornos e ausência de referências a `localStorage` ou `market-cart` na feature.

## Roteiro de validação manual

1. Abrir uma vitrine canônica em `/lojas/:storeSlug` e confirmar que somente produtos disponíveis aparecem.
2. Selecionar um card por clique e por tecla `Enter`; confirmar a URL `/lojas/:storeSlug/produtos/:productId`.
3. Recarregar a URL do detalhe e confirmar o carregamento por contrato real.
4. Navegar pelos três placeholders usando as setas; confirmar foco visível, limites e indicação da posição.
5. Confirmar nome, descrição, preço, categoria e detalhes disponíveis.
6. Confirmar que promoção vigente mostra preço original riscado e promocional destacado.
7. Confirmar que promoção expirada mostra somente o preço base.
8. Acessar diretamente um produto com `available = false`; confirmar status `Indisponível` e botão desabilitado.
9. Confirmar que produto pausado não aparece na vitrine.
10. Testar produto inexistente e produto de outra loja; confirmar conteúdo indisponível.
11. Simular falha de API; confirmar erro, `Tentar novamente` e retorno para a loja.
12. Confirmar layout em mobile e desktop, ordem de foco e retorno para `/lojas/:storeSlug`.
13. Abrir um produto e confirmar que o campo `Quantidade` inicia em `1`.
14. Em `1`, confirmar que o botão `−` está desabilitado e que nenhum controle permite exibir `0` ou valor negativo.
15. Usar `+` até `3`, depois `−` uma vez, e confirmar os valores `2`, `3` e `2` na sequência esperada.
16. Digitar diretamente uma quantidade inteira; confirmar o valor. Tentar vazio, `0`, negativo, decimal e entrada inválida; confirmar normalização para inteiro mínimo `1` — por exemplo, `2.7` resulta em `2`.
17. Ajustar a quantidade, usar o `X`, confirmar retorno para `/lojas/:storeSlug` e reabrir o produto; a quantidade deve voltar para `1`.
18. Repetir o cenário anterior usando o botão textual `Voltar`; o destino e o reset devem ser idênticos aos do `X`.
19. Confirmar que `Adicionar ao carrinho` possui ícone, permanece desabilitado em produto disponível e indisponível e não altera carrinho nem armazenamento local.
20. Em largura mobile, confirmar que seletor, `Voltar` e `Adicionar ao carrinho` permanecem legíveis, acessíveis por teclado e sem estouro horizontal.
