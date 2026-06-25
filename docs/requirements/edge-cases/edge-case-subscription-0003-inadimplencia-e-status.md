# Edge Case Subscription 0003 - Assinatura inadimplente ou pagamento atrasado

## Origem

Levantamento de edge cases a partir dos status de assinatura definidos em `subscriptions.status`.

## Contexto

O `DATABASE.md` da branch `development` define que uma assinatura pode ter os status:

- `active`;
- `past_due`;
- `unpaid`;
- `canceled`.

Também existem os campos:

- `tenants.status`;
- `stores.active`.

## Situação fora do caminho feliz

Uma assinatura pode deixar de estar regular sem ser cancelada imediatamente.

Exemplos:

- assinatura fica `past_due`;
- assinatura fica `unpaid`;
- tenant continua ativo;
- loja continua pública;
- lojista continua acessando o painel.

## Risco

Sem regra clara, o sistema pode:

- manter loja pública mesmo com pagamento atrasado;
- suspender lojista cedo demais;
- bloquear loja sem comunicação adequada;
- permitir criação de produtos sem assinatura regular;
- gerar divergência entre status da assinatura, tenant e loja.

## Comportamento esperado

O sistema deve:

1. Diferenciar assinatura cancelada de assinatura inadimplente.
2. Definir se `past_due` permite período de tolerância.
3. Definir se `unpaid` suspende recursos pagos.
4. Impedir inconsistência entre assinatura, tenant e loja.
5. Registrar mudanças críticas de status.

## Critérios de validação

- Assinatura `past_due` deve seguir regra explícita de tolerância ou bloqueio.
- Assinatura `unpaid` deve seguir regra explícita de suspensão ou bloqueio.
- Tenant inadimplente não deve manter acesso irrestrito a rotas pagas sem regra definida.
- Mudanças de status devem ser rastreáveis.

## Decisões pendentes

O time ainda precisa decidir:

- se `past_due` mantém a loja pública por alguns dias;
- se `unpaid` suspende o tenant automaticamente;
- se produtos continuam visíveis durante inadimplência;
- qual mensagem será exibida ao lojista;
- qual mensagem será exibida ao consumidor.

## Observação

Esse edge case é diferente de cancelamento. Inadimplência pode exigir período de tolerância, enquanto cancelamento pode encerrar a assinatura de forma imediata ou ao fim da vigência.
