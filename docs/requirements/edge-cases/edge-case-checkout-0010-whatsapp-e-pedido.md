# Edge Case Checkout 0010 - Pedido criado e redirecionamento para WhatsApp

## Origem

Levantamento de edge cases a partir dos requisitos de finalização da compra, validação server-side e checkout via WhatsApp.

## Contexto

O sistema cria ou prepara um pedido validado no backend e redireciona o consumidor para o WhatsApp com uma mensagem formatada.

## Situação fora do caminho feliz

Podem ocorrer situações como:

- WhatsApp do lojista muda depois que o consumidor abriu o carrinho;
- mensagem do WhatsApp fica longa demais;
- consumidor fecha a tela antes de enviar a mensagem;
- backend cria pedido, mas redirecionamento para WhatsApp falha;
- consumidor clica mais de uma vez em finalizar pedido;
- carrinho contém produtos de lojas diferentes.

## Risco

Sem regra clara, o sistema pode:

- criar pedido que nunca foi enviado ao lojista;
- duplicar pedidos;
- redirecionar para WhatsApp errado;
- perder rastreabilidade entre pedido e mensagem;
- permitir checkout misturando lojas diferentes.

## Comportamento esperado

O sistema deve:

1. Usar o WhatsApp atual da loja no momento da validação final.
2. Impedir checkout com produtos de lojas diferentes quando o pedido for de uma loja específica.
3. Evitar criação duplicada por cliques repetidos.
4. Definir estado do pedido antes e depois do redirecionamento.
5. Tratar falha de redirecionamento sem perder dados do pedido.

## Critérios de validação

- Checkout deve usar WhatsApp validado da loja no momento da finalização.
- Carrinho com produtos de lojas diferentes deve exigir separação por loja.
- Clique repetido não deve criar pedidos duplicados.
- Pedido criado deve possuir status compatível com envio pendente ou enviado via WhatsApp.
- Falha no redirecionamento deve permitir nova tentativa sem duplicar pedido.

## Decisões pendentes

O time ainda precisa decidir:

- se o pedido é criado antes ou depois de abrir o WhatsApp;
- qual status inicial do pedido;
- como confirmar que o consumidor realmente enviou a mensagem;
- qual tamanho máximo aceitável da mensagem;
- como tratar pedidos grandes que geram mensagem muito longa.

## Observação

O WhatsApp não garante ao sistema que a mensagem foi enviada. Por isso, o status do pedido precisa considerar essa limitação.
