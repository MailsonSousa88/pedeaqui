# UC-CL-0002 - Selecionar produtos e organizar carrinho por loja

> Observação de nomenclatura: o diretório e o código `CL` permanecem por compatibilidade documental, mas o ator correto deste fluxo é **Consumidor**, não cliente.

## Objetivo

Permitir que o consumidor selecione produtos de uma loja, adicione itens ao carrinho temporário e visualize o carrinho organizado por cards de loja, onde cada card representa os produtos escolhidos naquela loja.

## Ator principal

Consumidor.

## Atores secundários

Lojista.

## Pré-condições

- O consumidor deve estar visualizando uma loja ativa.
- A loja deve possuir produtos disponíveis.
- O produto selecionado deve estar disponível para inclusão no carrinho.
- O carrinho temporário deve estar disponível no navegador do consumidor.

## Pós-condições

- O carrinho contém produtos selecionados pelo consumidor.
- Os produtos ficam associados à loja de origem.
- A tela de carrinho exibe cards por loja, não uma lista única misturando produtos de lojas diferentes.
- Ao clicar em um card de loja, o consumidor visualiza os produtos escolhidos daquela loja.
- Produtos removidos deixam de compor o card daquela loja.

## Gatilho

O consumidor visualiza um produto em uma vitrine pública e decide adicioná-lo ao carrinho.

## Fluxo principal

| Passo | Ação |
|-------|------|
| 1 | O consumidor acessa a vitrine de uma loja ativa. |
| 2 | O sistema exibe produtos disponíveis da loja. |
| 3 | O consumidor seleciona um produto. |
| 4 | O sistema exibe detalhes ou informações suficientes do produto. |
| 5 | O consumidor adiciona uma ou mais unidades do produto ao carrinho. |
| 6 | O sistema registra o produto no carrinho temporário associado à loja correspondente. |
| 7 | O consumidor acessa a página de carrinho. |
| 8 | O sistema exibe um card/banner para cada loja que possui produtos no carrinho. |
| 9 | O consumidor clica no card da loja desejada. |
| 10 | O sistema exibe os produtos do carrinho referentes somente àquela loja. |
| 11 | O consumidor revisa produtos, quantidades e resumo daquela loja. |

## Fluxos alternativos

### FA01 - Consumidor adiciona mais de um produto da mesma loja

| Passo | Ação |
|-------|------|
| 5a | O consumidor seleciona outro produto da mesma loja. |
| 5b | O consumidor adiciona o produto ao carrinho. |
| 5c | O sistema atualiza o mesmo card da loja no carrinho. |
| 5d | O fluxo retorna ao passo 7 do fluxo principal quando o consumidor acessa o carrinho. |

### FA02 - Consumidor adiciona produtos de lojas diferentes

| Passo | Ação |
|-------|------|
| 5a | O consumidor acessa outra loja ativa. |
| 5b | O consumidor adiciona produtos dessa outra loja ao carrinho. |
| 5c | O sistema cria ou atualiza um card separado para essa loja. |
| 5d | Na página de carrinho, o sistema exibe um card por loja com produtos selecionados. |

### FA03 - Remover produto do card da loja

| Passo | Ação |
|-------|------|
| 11a | O consumidor remove um produto do card da loja. |
| 11b | O sistema solicita confirmação quando a quantidade chegar a zero, se aplicável. |
| 11c | O sistema remove ou atualiza o item. |
| 11d | O sistema recalcula o resumo daquele card de loja. |
| 11e | O fluxo retorna ao passo 11 do fluxo principal. |

### FA04 - Atualizar quantidade

| Passo | Ação |
|-------|------|
| 11a | O consumidor incrementa ou decrementa a quantidade de um produto. |
| 11b | O sistema atualiza a quantidade do item. |
| 11c | O sistema recalcula o resumo daquele card de loja em tempo real. |

## Fluxos de exceção

### FE01 - Produto indisponível

| Passo | Ação |
|-------|------|
| 5a | O sistema identifica que o produto não está mais disponível. |
| 5b | O sistema impede a inclusão do produto no carrinho. |
| 5c | O sistema informa o consumidor sobre a indisponibilidade. |

### FE02 - Carrinho sem cards de loja

| Passo | Ação |
|-------|------|
| 7a | O consumidor acessa a página de carrinho sem produtos adicionados. |
| 7b | O sistema exibe estado vazio informando que o carrinho está vazio. |
| 7c | O sistema orienta o consumidor a voltar para lojas/produtos. |

### FE03 - Card de loja fica vazio após remoções

| Passo | Ação |
|-------|------|
| 11a | O consumidor remove todos os produtos de uma loja. |
| 11b | O sistema remove o card daquela loja do carrinho. |
| 11c | Se não houver outros cards, o sistema exibe estado vazio do carrinho. |

### FE04 - Limite de itens atingido

| Passo | Ação |
|-------|------|
| 5a | O consumidor tenta adicionar item acima do limite permitido. |
| 5b | O sistema bloqueia a inclusão. |
| 5c | O sistema informa que o limite do carrinho foi atingido. |

## Regras de negócio

- O carrinho é temporário e armazenado no navegador do consumidor.
- A organização visual do carrinho deve ser por cards de loja.
- Um card de loja representa os produtos selecionados daquela loja.
- O consumidor não deve ver produtos de lojas diferentes misturados em uma única lista de pedido.
- Cada finalização deve acontecer para uma loja específica.
- Produto já presente deve ter quantidade incrementada.
- Snapshot de nome, preço e imagem deve ser gravado no momento da adição, conforme RF.
- A remoção e atualização de quantidade devem recalcular o resumo em tempo real.
- Produto indisponível não deve ser adicionado ao carrinho.

## Telas relacionadas

- Futuras telas de vitrine pública da loja.
- Futuras telas de detalhe de produto.
- Futuras telas de carrinho.

## Referências

- `RF004` - Adição de produtos ao carrinho de compras.
- `RF005` - Remoção e atualização de quantidade de produtos do carrinho.
- `RF006` - Finalização da compra.
- `RF033` - Processamento de checkout e validação.
- Status Report I - Fluxo Principal: Consumidor finaliza pedido por loja.
- Status Report I - Fluxo Alternativo: Remover produto do carrinho antes de finalizar.
