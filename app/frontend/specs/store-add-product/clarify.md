# Clarify: store-add-product

## Perguntas

### Q1

Pergunta: A tela de adicionar produto deve ser implementada como página própria, modal, drawer ou estado interno da vitrine/gestão da loja?

Resposta: A tela deve ser implementada como modal. O fluxo começa ao clicar em `Adicionar` na vitrine/gestão da loja; a página passa a exibir uma área com cards, incluindo um card `Adicionar novo produto`. Ao clicar nesse card, o modal de adicionar produto deve ser aberto.

Impacto na spec: Define roteamento, composição visual, navegação, estado de abertura/fechamento e estrutura dos componentes.

### Q2

Pergunta: A implementação deve ficar em `src/features/store/storefront/`, `src/features/store/product-management/` ou outro submódulo dentro de `src/features/store/`?

Resposta: A implementação deve ficar em `src/features/store/product-management/`, fora de `storefront/`, porque `store/` é o núcleo da loja e `product-management/` representa a gestão de produtos.

Impacto na spec: Define organização de arquivos, boundaries internos da feature `store` e imports permitidos.

### Q3

Pergunta: O botão `Adicionar` da vitrine atual deve abrir esta tela nesta entrega ou a tela será renderizada isoladamente para teste?

Resposta: Sim. O botão `Adicionar` da vitrine atual deve abrir a área de gestão/adicionar produtos. Nessa área deve existir um card `Adicionar novo produto`, e esse card deve abrir o modal do formulário.

Impacto na spec: Define se a task deve alterar a vitrine atual, navegação local ou apenas expor a nova tela.

### Q4

Pergunta: Nesta primeira implementação, o botão `Salvar produto` deve apenas validar localmente, simular sucesso, ou chamar um service mockado preparado para backend futuro?

Resposta: O botão `Salvar produto` não deve executar lógica real nem chamar mock service nesta primeira versão. Ele pode existir visualmente e, se houver validação local no formulário, não deve simular persistência real.

Impacto na spec: Define necessidade de service, hook assíncrono, estado de loading/sucesso/erro e contrato frontend.

### Q5

Pergunta: A criação de categoria dentro do formulário será implementada agora como ação visual/local, ou ficará fora de escopo e será apenas um link/atalho futuro?

Resposta: A criação de categoria será implementada agora de forma limitada/visual. Como não há backend, a categoria criada não será persistida de verdade. A única categoria que permanece garantida é `Todos`.

Impacto na spec: Define se a UI precisa de campo/estado para nova categoria ou apenas selector/placeholder.

### Q6

Pergunta: Imagens terão seleção com preview local nesta entrega ou apenas placeholder visual sem seleção real de arquivo?

Resposta: Imagens devem ter apenas placeholder visual, como foi feito no banner e perfil da loja. Não haverá seleção real de arquivo nem preview local nesta primeira versão.

Impacto na spec: Define se haverá input `file`, preview com object URL, remoção local e validação de tipo de arquivo.

### Q7

Pergunta: Variações devem ser implementadas nesta primeira versão visual/interativa ou ficar como seção avançada planejada para etapa posterior?

Resposta: Variações podem ser implementadas de forma elementar. Os campos e elementos devem existir, mas ainda não devem produzir comportamento real integrado ou alterar dados persistidos.

Impacto na spec: Define complexidade do formulário, uso de arrays dinâmicos e validação de opções.

### Q8

Pergunta: Estoque deve aparecer na UI desta versão?

Resposta: Não. O contrato atual do backend não possui modo de estoque nem quantidade. A tela, os tipos e o payload devem preservar apenas a disponibilidade manual do produto.

Impacto na spec: Remove a seção visual de estoque, seus estados, validações e campos de payload.

### Q9

Pergunta: Promoção deve depender obrigatoriamente do toggle de destaque nesta UI?

Resposta: Não. O backend possui apenas `promoPriceCents` e `promoEndsAt`, sem campo ou regra de destaque. A promoção deve ser independente.

Impacto na spec: Remove o destaque da tela, validação, estado, tipos e payload.

### Q10

Pergunta: O campo `Fim da promoção` será obrigatório quando promoção estiver ativa, ou permanecerá opcional até definição do backend?

Resposta: O campo `Fim da promoção` deve começar opcional, mesmo quando promoção estiver ativa.

Impacto na spec: Define schema de validação e bloqueio do botão de salvar.

### Q11

Pergunta: Existe limite de imagens por produto nesta entrega ou isso ficará pendente para contrato/backend?

Resposta: Sim. A tela deve considerar limite de 3 imagens por produto. Elas devem ser representadas como placeholders navegáveis, permitindo avançar e voltar entre posições 1, 2 e 3.

Impacto na spec: Define restrição visual do uploader, mensagens de erro e contrato esperado.

### Q12

Pergunta: A screen `screen-store-add-product-0011.md` deve ser registrada em `.specify/memory/screen-source-map.md` antes das próximas fases?

Resposta: Sim. A screen `screen-store-add-product-0011.md` deve ser registrada em `.specify/memory/screen-source-map.md` para enriquecer a rastreabilidade da tela.

Impacto na spec: Define consistência do spec kit e rastreabilidade automática da tela.

## Decisões Registradas

- A feature pertence ao módulo `store`.
- O fluxo relacionado é `merchant-flow`.
- A implementação não deve alterar backend.
- A categoria `Todos` é sistêmica, obrigatória, implícita e não removível.
- Produto pode ter no máximo uma categoria específica além de `Todos`.
- Variações e opções existem no modelo de dados e devem ser consideradas no desenho do formulário.
- O contrato atual não possui controle de estoque; a UI e o payload não devem representar esse recurso.
- A UI inicial será um fluxo de gestão: clique em `Adicionar`, exibição de card `Adicionar novo produto` e abertura de modal.
- A implementação deve ficar em `src/features/store/product-management/`.
- Não haverá chamada real, service mockado ou persistência ao salvar nesta primeira versão.
- Categorias criadas no formulário serão apenas visuais/limitadas e não persistidas.
- Imagens serão placeholders visuais, sem input de arquivo real.
- Variações aparecerão de forma elementar/visual, sem integração real.
- Promoção é independente; destaque não faz parte do produto.
- `Fim da promoção` é opcional.
- O limite visual será de 3 imagens por produto, com navegação entre placeholders.
- A screen 0011 deve ser registrada no mapa de telas do spec kit.

## Pendências

- Nenhuma pendência bloqueante para a fase `plan`.
