# Spec: detalhe público do produto

## Objetivo

Permitir que o consumidor consulte as informações públicas atuais de um produto específico sem perder o contexto da loja de origem.

## Fonte da Tela

- Screen: `../../docs/screens/screen-product-detail-0014.md`.
- Fontes complementares: issue GitHub `#53 - Criar tela pública de detalhes do produto`, requisitos oficiais, fluxo do consumidor e contrato público documentado.
- Flow: `consumer-flow`.
- Posição no fluxo: após a seleção de um card na vitrine pública e antes de qualquer futura ação de carrinho ou contato.
- RFs/RNFs: `RF002`, `RF003`, `RF008`, `RF032`, `RNF0013`, `RNF0015`, `RNF0016`, `RNF0017`, `RNF0020`, `RNF0022`.
- Use cases: `UC-CL-0001`.
- User stories: `US-CL-0001`.
- Edge cases: loja indisponível ou slug inválido; produto inexistente, removido, indisponível ou pertencente a outra loja; imagem ausente ou inválida.

## Escopo

- Tela pública de detalhe de produto dentro de `src/features/orders/`.
- Navegação do card da vitrine para o produto correspondente.
- URL própria que preserve o contexto da loja e sobreviva a recarregamento.
- Exibição de nome, descrição, preço, disponibilidade, promoção, categoria e demais informações públicas quando fornecidas pelo contrato.
- Galeria com três posições de placeholder neutro enquanto o contrato público não fornecer imagens reais.
- Retorno para a vitrine da loja de origem.
- Seletor local de quantidade com decremento, entrada numérica e incremento, sempre com mínimo `1`.
- Botão visual `Adicionar ao carrinho` com ícone, desabilitado enquanto a integração real estiver fora do escopo.
- Estados de carregamento, erro, conteúdo indisponível e imagem alternativa.
- Layout responsivo, sem controles administrativos, com acessibilidade básica.
- Integração exclusivamente com contratos públicos reais existentes.
- Estrutura verificável por build e lint; a validação funcional será realizada manualmente pelo responsável do projeto.

## Fora de Escopo

- Integração funcional/persistência com carrinho e checkout; os controles visuais e a quantidade local permanecem na tela.
- Contato ou pedido via WhatsApp.
- Edição, exclusão ou alteração administrativa do produto.
- Criação ou alteração de endpoints backend.
- Variações e opções protegidas que não fazem parte do contrato público atual.
- Inclusão ou configuração de bibliotecas de testes automatizados nesta entrega.

## Requisitos Funcionais

### RF-FE-001

Como consumidor, quero abrir um produto a partir da vitrine, para consultar suas informações completas no contexto da loja.

Critérios de aceite:

- A seleção do card navega para uma URL própria do produto preservando a loja de origem.
- A URL pode ser recarregada diretamente.
- O consumidor pode retornar à vitrine da mesma loja.

### RF-FE-002

Como consumidor, quero visualizar os dados públicos atuais do produto, para compreender o item antes de realizar futuras ações de pedido.

Critérios de aceite:

- Exibe nome, descrição, preço e disponibilidade quando fornecidos pelo contrato.
- Exibe uma galeria navegável com três placeholders neutros enquanto imagens reais não fizerem parte do contrato.
- Exibe preço original riscado e preço promocional em destaque quando houver promoção válida.
- Exibe categoria e demais informações públicas quando disponíveis.
- Um produto indisponível é identificado de forma textual e não aparenta estar disponível para pedido.
- Não são apresentados controles administrativos.

### RF-FE-003

Como consumidor, quero receber uma resposta visual apropriada quando o conteúdo não puder ser exibido, para entender o estado da navegação.

Critérios de aceite:

- Existem estados visuais de carregamento, erro e conteúdo indisponível.
- Produto inexistente, removido ou não pertencente à loja informada apresenta estado apropriado.
- Imagem ausente ou inválida usa placeholder visual neutro, sem fotografia mockada.

### RF-FE-004

Como consumidor, quero preparar uma quantidade válida do produto, para que a tela esteja pronta para a futura integração com o carrinho.

Critérios de aceite:

- A quantidade inicia em `1` sempre que a tela do produto é aberta.
- O botão `−` nunca reduz abaixo de `1` e fica desabilitado quando o valor atual é `1`.
- O botão `+` incrementa uma unidade.
- O campo permite digitação direta, aceita somente inteiros e normaliza qualquer valor inválido, vazio, `0` ou negativo para `1`.
- O botão `Adicionar ao carrinho` aparece com ícone de carrinho no estado desabilitado e não persiste dados nesta entrega.
- O retorno pode ser acionado pelo botão `X` no topo do conteúdo, com nome acessível `Voltar para a loja`, ou pelo botão textual `Voltar` na área de ações; não existe o rótulo `Cancelar`.
- O botão `Voltar` e o `X` executam a mesma navegação para a vitrine da loja.
- Ao retornar à loja por qualquer um dos dois controles e abrir novamente o produto, a quantidade volta para `1`.

## Estados

- Inicial: rota pública contém o contexto necessário para identificar loja e produto.
- Loading: dados públicos da loja e do produto estão sendo consultados.
- Erro: a consulta falhou e a interface informa que não foi possível carregar o conteúdo.
- Sucesso: dados do produto pertencente à loja são exibidos.
- Conteúdo indisponível: loja inexistente/inativa, produto inexistente, removido ou sem vínculo com a loja informada.
- Produto indisponível para pedido: conteúdo carregado normalmente, com identificação textual e botão `Adicionar ao carrinho` desabilitado.

## Conteúdo da Tela

- Títulos: nome do produto; identificação contextual da loja quando definida no design da tela.
- Campos: descrição, preço atual, preço original em promoção, galeria placeholder, disponibilidade, categoria e detalhes públicos existentes.
- Botões: retorno por ícone `X` no topo, retorno textual `Voltar` na área de ações, navegação da galeria, decremento, incremento e `Adicionar ao carrinho` com ícone no estado desabilitado.
- Campos: entrada numérica de quantidade associada a label visível, com mínimo `1`.
- Links: retorno para a vitrine da loja.
- Textos legais: não aplicável.

## Contexto de Jornada

- Entrada esperada: seleção de produto na vitrine pública ou acesso direto à URL do detalhe.
- Próximo passo: retorno à vitrine da mesma loja.
- O que esta tela não deve resolver: persistência ou integração real com carrinho, checkout, WhatsApp ou administração do produto.

## Ambiguidades Para Clarify

- Nenhuma ambiguidade funcional pendente. Testes automatizados foram retirados desta entrega por decisão humana registrada na ADR rejeitada.
