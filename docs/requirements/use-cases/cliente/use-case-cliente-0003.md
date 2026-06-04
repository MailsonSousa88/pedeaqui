# UC-CL-0003 - Finalizar pedido via WhatsApp

## Objetivo

Permitir que o cliente finalize um pedido de uma loja e seja redirecionado ao WhatsApp do lojista com uma mensagem personalizada contendo os itens selecionados.

## Ator principal

Cliente.

## Atores secundários

Lojista e WhatsApp.

## Pré-condições

- O cliente deve possuir ao menos um produto no carrinho.
- O pedido deve estár associado a uma loja.
- A loja deve possuir contato de WhatsApp configurado.

## Pós-condições

- O sistema gera uma mensagem personalizada com os dados do pedido.
- O cliente é redirecionado para o WhatsApp do lojista.
- A compra passa a ser negociada diretamente entre cliente e lojista fora da plataforma.

## Gatilho

O cliente clica em "Finalizar pedido" no card de pedido de uma loja.

## Fluxo principal

| Passo | Ação |
|-------|------|
| 1 | O cliente acessa o carrinho. |
| 2 | O sistema exibe os pedidos organizados por loja. |
| 3 | O cliente seleciona o pedido da loja desejada. |
| 4 | O cliente clica em "Finalizar pedido". |
| 5 | O sistema exibe a tela para preenchimento das informações do pedido. |
| 6 | O cliente preenche as informações solicitadas. |
| 7 | O cliente confirma a finalização. |
| 8 | O sistema gera uma mensagem personalizada com os itens selecionados. |
| 9 | O sistema redireciona o cliente para o WhatsApp do lojista. |

## Fluxos alternativos

### FA01 - Cliente retorna para revisar o carrinho

| Passo | Ação |
|-------|------|
| 5a | O cliente decide voltar antes de confirmar a finalização. |
| 5b | O sistema retorna para o carrinho mantendo os itens selecionados. |
| 5c | O cliente pode revisar, remover produtos ou escolher outro pedido por loja. |

## Fluxos de exceção

### FE01 - Carrinho vazio

| Passo | Ação |
|-------|------|
| 4a | O sistema identifica que não existem produtos no card do pedido da loja. |
| 4b | O sistema bloqueia o botão "Finalizar pedido". |
| 4c | O sistema orienta o cliente a adicionar produtos ao carrinho. |
| 4d | O fluxo retorna a visualização do carrinho. |

### FE02 - Loja sem WhatsApp configurado

| Passo | Ação |
|-------|------|
| 9a | O sistema identifica que a loja não possui contato de WhatsApp válido. |
| 9b | O sistema impede o redirecionamento. |
| 9c | O sistema informa que o pedido não pode ser finalizado no momento. |

## Regras de negócio

- A plataforma não processa pagamento no MVP.
- A finalização do pedido ocorre por redirecionamento via WhatsApp.
- A mensagem personalizada deve conter os produtos selecionados no pedido da loja.
- Um pedido vazio não pode ser finalizado.
- Cada redirecionamento deve ser feito para o WhatsApp da loja responsavel pelo pedido.

## Referências

- Status Report I - Fluxo Principal: Consumidor finaliza pedido por loja.
- Status Report I - Fluxo de Exceção: Carrinho vazio ao finalizar pedido.


