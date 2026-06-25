# Edge Case Payment 0002 - Webhook de pagamento ausente ou duplicado

## Origem

Levantamento de edge cases a partir dos requisitos funcionais e não funcionais relacionados a pagamento, assinatura e ativação do lojista.

## Contexto

O sistema depende da confirmação do gateway de pagamento para ativar o lojista. Os requisitos atuais indicam que:

- a ativação ocorre via webhook de pagamento;
- webhooks devem ser validados por assinatura `HMAC-SHA256`;
- eventos devem ser idempotentes;
- o lojista só deve ser ativado após confirmação de pagamento.

## Situação fora do caminho feliz

Podem ocorrer situações como:

- pagamento aprovado no Stripe, mas o webhook não chega ao backend;
- webhook chega duplicado;
- webhook chega fora de ordem;
- webhook chega com assinatura inválida;
- webhook tenta ativar uma conta que já foi ativada.

## Risco

Se o webhook não for tratado corretamente, podem ocorrer inconsistências como:

- lojista pagar e continuar com status pendente;
- assinatura ser ativada mais de uma vez;
- evento inválido alterar status de conta;
- sistema registrar pagamento sem assinatura válida;
- ausência de rastreabilidade para suporte financeiro.

## Comportamento esperado

O sistema deve:

1. Validar a assinatura do webhook antes de processar o evento.
2. Registrar eventos recebidos com identificador único.
3. Ignorar eventos duplicados já processados.
4. Não ativar conta quando o evento for inválido.
5. Permitir investigação quando pagamento aprovado não gerar webhook.
6. Manter o lojista pendente até confirmação segura.

## Critérios de validação

- Webhook com assinatura inválida deve retornar HTTP 400.
- Webhook duplicado não deve gerar segunda ativação.
- Evento já processado deve ser tratado de forma idempotente.
- Pagamento sem webhook recebido não deve ativar automaticamente o lojista sem verificação segura.
- Todo evento relevante deve gerar registro para auditoria ou investigação.

## Decisões pendentes

O time ainda precisa decidir:

- como o backend verificará pagamentos aprovados quando o webhook não chegar;
- se haverá rotina de reconciliação com o Stripe;
- qual tela ou mensagem será exibida para o lojista quando o pagamento estiver aprovado, mas ainda não refletido no sistema;
- por quanto tempo uma conta pode ficar pendente aguardando confirmação.

## Observação

Pagamento é uma área crítica. O sistema não deve confiar apenas no frontend ou em redirecionamento de sucesso; a confirmação deve ocorrer no backend.
