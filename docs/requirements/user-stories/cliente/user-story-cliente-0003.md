# US-CL-0003 - Finalizar pedido por loja via WhatsApp

## Épico

Épico 1 - Jornada de Compra do Consumidor.

## Ator

Cliente.

## História de usuário

Como cliente, eu quero adicionar produtos ao carrinho, visualizar meus pedidos organizados por loja e finalizar cada pedido sendo redirecionado ao WhatsApp do lojista com uma mensagem personalizada para que eu possa concluir a compra diretamente com a loja.

## Valor para o usuário

Permite que o cliente organize seu interesse de compra e inicie a negociação diretamente com o lojista pelo WhatsApp.

## Critérios de aceitação

- Dado que o cliente adicionou produtos ao carrinho, quando acessar o carrinho, então o sistema deve exibir os itens organizados por loja.
- Dado que o cliente possui produtos em um pedido por loja, quando clicar em "Finalizar pedido", então o sistema deve solicitar as informações necessárias para finalização.
- Dado que o cliente confirmou a finalização, quando o pedido for processado, então o sistema deve gerar uma mensagem personalizada com os itens selecionados.
- Dado que a mensagem foi gerada, quando a finalização ocorrer, então o sistema deve redirecionar o cliente para o WhatsApp do lojista.
- Dado que o carrinho esteja vazio, quando o cliente tentar finalizar, então o sistema deve bloquear a finalização.

## Prioridade

Alta.

## Dependências

- Loja ativa com WhatsApp configurado.
- Produtos adicionados ao carrinho.
- Geração de mensagem personalizada.

## Referências

- Status Report I - Fluxo Principal: Consumidor finaliza pedido por loja.
- Caso de uso: [UC-CL-0002 - Gerenciar carrinho por loja](../use-cases/cliente/use-case-cliente-0002.md).
- Caso de uso: [UC-CL-0003 - Finalizar pedido via WhatsApp](../use-cases/cliente/use-case-cliente-0003.md).


