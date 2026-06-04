# UC-CL-0002 - Gerenciar carrinho por loja

## Objetivo

Permitir que o cliente adicione produtos ao carrinho, visualize os pedidos organizados por loja e remova produtos antes da finalização.

## Ator principal

Cliente.

## Atores secundários

Lojista.

## Pré-condições

- O cliente deve estár visualizando uma loja ativa.
- A loja deve possuir produtos disponíveis.
- O produto selecionado deve estár disponível para inclusão no carrinho.

## Pós-condições

- O carrinho contem os produtos selecionados pelo cliente.
- Os itens do carrinho ficam organizados por loja.
- Produtos removidos deixam de compor o pedido daquela loja.

## Gatilho

O cliente seleciona um produto e decide adiciona-lo ao carrinho.

## Fluxo principal

| Passo | Ação |
|-------|------|
| 1 | O cliente acessa uma loja e visualiza seus produtos. |
| 2 | O cliente seleciona um produto. |
| 3 | O cliente adiciona o produto ao carrinho. |
| 4 | O sistema registra o produto no carrinho associado a loja correspondente. |
| 5 | O cliente acessa o carrinho. |
| 6 | O sistema exibe os pedidos organizados por loja. |
| 7 | O cliente visualiza os produtos adicionados em cada pedido por loja. |

## Fluxos alternativos

### FA01 - Remover produto do carrinho

| Passo | Ação |
|-------|------|
| 7a | O cliente escolhe remover um ou mais produtos de um pedido por loja. |
| 7b | O sistema remove os produtos selecionados. |
| 7c | O sistema atualiza o card do pedido referente à loja com os produtos restantes. |
| 7d | O fluxo retorna ao passo 7 do fluxo principal. |

### FA02 - Cliente adiciona produtos de lojas diferentes

| Passo | Ação |
|-------|------|
| 3a | O cliente acessa outra loja e adiciona produtos ao carrinho. |
| 3b | O sistema cria ou atualiza um card de pedido separado para a nova loja. |
| 3c | O fluxo retorna ao passo 6 do fluxo principal. |

## Fluxos de exceção

### FE01 - Produto indisponível

| Passo | Ação |
|-------|------|
| 3a | O sistema identifica que o produto não está mais disponível. |
| 3b | O sistema impede a inclusão do produto no carrinho. |
| 3c | O sistema informa o cliente sobre a indisponibilidade. |

## Regras de negócio

- O carrinho deve agrupar os produtos por loja.
- Cada pedido finalizado deve pertencer a uma única loja.
- A remoção de produtos deve atualizar imediatamente o resumo do pedido.
- Um produto indisponível não deve ser adicionado ao carrinho.

## Referências

- Status Report I - Fluxo Principal: Consumidor finaliza pedido por loja.
- Status Report I - Fluxo Alternativo: Remover produto do carrinho antes de finalizar.


