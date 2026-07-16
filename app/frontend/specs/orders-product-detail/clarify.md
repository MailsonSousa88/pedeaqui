# Clarify: detalhe público do produto

## Perguntas

### Q1 — Fonte da tela

Pergunta: na ausência de um arquivo em `../../docs/screens/`, a issue GitHub `#53` pode ser tratada como fonte funcional oficial desta entrega, usando a vitrine pública existente e os módulos do design system como referência visual?

Resposta: **sim**. A issue `#53`, a nova descrição `screen-product-detail-0014.md`, a vitrine pública, os requisitos, o fluxo do consumidor e o contrato devem ser usados em conjunto.

Impacto na spec: permite avançar sem inventar ações, conteúdo ou fluxos; a lacuna documental continua registrada.

### Q2 — URL pública

Pergunta: qual formato deve identificar simultaneamente a loja e o produto?

Resposta: `/lojas/:storeSlug/produtos/:productId`.

Impacto na spec: define a rota, os parâmetros consumidos pela página, o destino dos cards da vitrine e o link de retorno.

### Q3 — Leitura do produto

Pergunta: como não existe `GET /api/products/:id` público, a página deve consultar `GET /api/stores/:slug`, usar o `id` retornado para chamar `GET /api/products/store/:storeId` e selecionar localmente o produto cujo `id` corresponde à URL?

Resposta: **sim**, temporariamente. A página usará somente os endpoints públicos disponíveis e validará o vínculo do produto com a loja informada.

Impacto na spec: define duas consultas públicas e permite diferenciar falha de rede de produto inexistente ou pertencente a outra loja.

### Q4 — Payload público do produto

Pergunta: qual é a forma exata dos itens retornados por `GET /api/products/store/:storeId`, especialmente os campos de imagem, categoria e detalhes?

Resposta: nesta entrega serão usados somente os campos essenciais documentados. Como imagens ainda não fazem parte do contrato público, a tela usará placeholders visuais neutros; os campos reais serão integrados futuramente quando existirem.

Impacto na spec: a tipagem não presumirá campo de imagem. Categoria e detalhes serão exibidos somente quando puderem ser obtidos sem inventar contrato.

### Q5 — Imagem alternativa

Pergunta: qual estado visual deve substituir imagem ausente ou inválida?

Resposta: usar estado neutro, sem imagem real, com três posições de placeholder visual e setas para avançar e voltar.

Impacto na spec: define o fallback visual e o roteiro de verificação manual para navegação da galeria.

### Q6 — Promoção válida

Pergunta: como tratar `promoPriceCents` quando `promoEndsAt` já passou?

Resposta: quando a promoção terminar, o produto deixa de ser apresentado em promoção. A promoção só é exibida como vigente quando o preço promocional é positivo, menor que o preço base e a data de término está ausente ou ainda não expirou.

Impacto na spec: preço promocional inválido ou expirado não substitui o preço base.

### Q7 — Produto indisponível

Pergunta: o produto com `available = false` deve continuar visível na URL direta?

Resposta: **sim**. Quando retornado pelo endpoint público, o produto continua visível, recebe identificação textual clara e o botão `Adicionar ao carrinho` fica desabilitado.

Impacto na spec: indisponibilidade é um estado de conteúdo, não um erro técnico; carrinho permanece fora do escopo.

### Q8 — Produto disponível e carrinho existente

Pergunta: a ação de carrinho existente pode ser reutilizada para produto disponível nesta entrega?

Resposta: **não**. O levantamento da fase `plan` confirmou que o carrinho atual usa seed mockado e não expõe uma operação real de inclusão compatível com o produto público. Para respeitar a issue e o critério de dados reais, não haverá integração nem ação fictícia. O botão `Adicionar ao carrinho` será exibido desabilitado tanto para produtos disponíveis quanto indisponíveis.

Impacto na spec: produto disponível apresenta os detalhes e um CTA de carrinho visualmente presente, porém desabilitado; a integração funcional será tratada em issue própria.

### Q9 — Resolução de categoria

Pergunta: como exibir categoria sem presumir que a listagem de produtos já retorne o nome resolvido?

Resposta: usar `GET /api/categories/store/:storeId`, endpoint público já documentado, e associar `product.categoryId` ao `category.id`. Se a categoria não for encontrada, o campo será omitido sem falhar a página.

Impacto na spec: categoria pode ser exibida com contrato real e sem ampliar backend.

### Q10 — Controles de quantidade e saída

Pergunta: como representar a preparação de quantidade antes da integração real com o carrinho?

Resposta: exibir o controle `Quantidade: − [1] +`, permitindo decremento, incremento e digitação direta. A quantidade inicia em `1`, aceita apenas inteiros e nunca pode exibir `0`, valor negativo ou entrada inválida. O botão `−` fica desabilitado em `1`.

Impacto na spec: a quantidade é estado local da tela e não persiste no carrinho nesta entrega.

### Q11 — Retorno e CTA futuro

Pergunta: quais ações devem acompanhar o seletor sem usar o rótulo `Cancelar`?

Resposta: exibir um botão ícone `X` no topo do conteúdo, seguindo a tela de adicionar produto, com nome acessível `Voltar para a loja`. Na área de ações, manter também um botão textual `Voltar` ao lado de `Adicionar ao carrinho`. O `X` e o botão `Voltar` retornam para a mesma vitrine e descartam a quantidade local. Ao abrir o detalhe novamente, a quantidade volta para `1`. `Adicionar ao carrinho` usa ícone de carrinho, porém permanece desabilitado e sem persistência enquanto a integração real não existir.

Impacto na spec: não existe botão `Cancelar`; há um `X` no topo e um botão textual `Voltar` na área de ações, ambos com o mesmo comportamento. O CTA apenas reserva a ação futura de forma semanticamente desabilitada.

## Decisões Registradas

- A feature será implementada em `src/features/orders/`.
- A tela é pública e não exige autenticação do consumidor.
- Persistência no carrinho, checkout, WhatsApp e controles administrativos estão fora do escopo; seletor local de quantidade e CTA desabilitado fazem parte da tela.
- Produto e loja devem ser validados em conjunto para preservar o contexto e impedir exibição cruzada entre lojas.
- Preços serão tratados internamente em centavos e formatados em reais somente na interface.
- Produto indisponível terá sinalização textual, não dependente apenas de cor.
- Promoção expirada ou inválida não será apresentada como promoção vigente.
- Não serão usados dados ou produtos mockados.
- A galeria terá três posições de placeholder neutro com navegação anterior/próxima até existirem imagens reais no contrato.
- A rota pública será `/lojas/:storeSlug/produtos/:productId`.
- A leitura temporária combinará loja por slug, produtos por `storeId` e seleção local por `productId`.
- Categoria será resolvida pela listagem pública de categorias da loja.
- O carrinho mockado existente não será integrado; o CTA de carrinho ficará visível e desabilitado nesta entrega.
- A quantidade local começa em `1`, aceita apenas inteiros maiores ou iguais a `1` e reinicia ao retornar à loja pelo `X` ou pelo botão `Voltar`.
- O retorno no conteúdo oferece `X` no topo e `Voltar` na área de ações, sem rótulo visual `Cancelar`; o CTA `Adicionar ao carrinho` fica desabilitado até existir integração real.

## Pendências

- Nenhuma. A ADR `docs/adrs/0001-frontend-component-testing.md` foi rejeitada e a validação funcional será manual.
