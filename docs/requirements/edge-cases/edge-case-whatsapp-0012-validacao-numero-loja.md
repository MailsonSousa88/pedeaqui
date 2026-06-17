# Edge Case WhatsApp 0012 - Número da loja não validado

## Origem

Levantamento de edge case a partir do requisito `RF035 - Validação do WhatsApp da loja`.

## Contexto

O WhatsApp da loja é um dado crítico para o PedeAqui, porque o checkout do consumidor depende dele para enviar o pedido ao lojista.

O sistema deve validar o número informado pelo lojista usando um código numérico enviado ao WhatsApp cadastrado. O lojista precisa informar esse código para confirmar que possui acesso ao número.

## Situação fora do caminho feliz

Podem ocorrer situações como:

- lojista informa número inexistente;
- lojista informa número com formato inválido;
- lojista informa número de outra pessoa;
- código numérico expira antes da confirmação;
- lojista digita código incorreto;
- lojista altera o número depois de já ter validado outro;
- loja tenta ir para pagamento sem WhatsApp confirmado;
- consumidor tenta finalizar pedido em loja sem WhatsApp válido.

## Risco

Se o WhatsApp não for validado corretamente, podem ocorrer problemas como:

- pedidos enviados para número errado;
- lojista pagar e publicar loja sem canal funcional de recebimento de pedidos;
- consumidor finalizar pedido sem conseguir contato real com a loja;
- suporte receber reclamações difíceis de rastrear;
- loja parecer ativa, mas não conseguir receber pedidos.

## Comportamento esperado

O sistema deve:

1. Validar o formato do número antes de enviar o código.
2. Normalizar o número para o padrão definido pelo projeto.
3. Enviar um código numérico de validação ao WhatsApp informado.
4. Exigir que o lojista informe o código recebido.
5. Bloquear avanço quando o código estiver incorreto, expirado ou ausente.
6. Invalidar a validação anterior se o lojista alterar o número.
7. Impedir checkout via WhatsApp para loja sem número validado.

## Critérios de validação

- Número com formato inválido deve impedir envio do código.
- Código incorreto não deve validar o WhatsApp.
- Código expirado não deve validar o WhatsApp.
- Alteração do número deve exigir nova validação.
- Loja sem WhatsApp validado não deve ser publicada.
- Loja sem WhatsApp validado não deve permitir checkout via WhatsApp.

## Decisões pendentes

O time ainda precisa decidir:

- tempo de expiração do código numérico;
- quantidade máxima de tentativas de código;
- tempo mínimo para reenviar código;
- provedor usado para envio da mensagem de validação;
- mensagem exibida ao lojista quando o número não for validado;
- se a validação será exigida antes ou depois da etapa de pagamento.

## Observação

Validar apenas o formato do número não garante que ele pertence ao lojista. A confirmação por código numérico reduz esse risco porque exige acesso ao WhatsApp informado.
