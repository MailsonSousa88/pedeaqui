# Edge Case Subscription 0001 - Cancelamento de assinatura ativa

## Origem

> O que acontece se tiver um plano ativo e for feito o cancelamento da assinatura?

## Contexto

Na branch `development`, o documento `app/backend/src/DATABASE.md` define:

- `tenants.status`: estado operacional do tenant, podendo ser `active` ou `suspended`;
- `subscriptions.status`: estado da assinatura, podendo ser `active`, `past_due`, `unpaid` ou `canceled`;
- `stores.active`: define se a loja aparece publicamente;
- `subscriptions.ends_at`: data de fim da vigência da assinatura;
- `audit_logs`: tabela para registrar alterações críticas, como suspensão de tenant ou alteração de plano.

Isso cria um ponto de atenção: uma assinatura pode ser cancelada enquanto o tenant e a loja ainda estão ativos. Sem uma regra explícita, o sistema pode manter uma loja pública mesmo sem assinatura válida.

## Situação fora do caminho feliz

Um lojista possui:

- assinatura ativa;
- tenant ativo;
- loja ativa e pública;
- produtos cadastrados;
- pedidos ou histórico já existentes.

Depois disso, a assinatura é cancelada no gateway de pagamento ou dentro do sistema.

## Risco

Se o cancelamento não for tratado corretamente, podem ocorrer inconsistências como:

- `subscriptions.status = canceled`, mas `tenants.status = active`;
- loja continuar pública mesmo sem assinatura ativa;
- lojista continuar acessando rotas administrativas;
- produtos continuarem aparecendo normalmente na vitrine pública;
- sistema não registrar o evento para auditoria;
- cancelamento duplicado ser processado mais de uma vez;
- perda indevida de dados da loja, produtos ou histórico.

## Comportamento esperado

Quando uma assinatura ativa for cancelada, o sistema deve:

1. Atualizar a assinatura para `canceled`.
2. Verificar se o cancelamento é imediato ou se a assinatura continua válida até `ends_at`.
3. Se a assinatura não estiver mais vigente, impedir acesso do lojista às rotas administrativas pagas.
4. Suspender o tenant ou marcar a loja como indisponível para exibição pública, conforme regra definida pelo time.
5. Manter dados da loja, produtos, categorias, imagens e histórico para evitar perda indevida.
6. Registrar o evento em `audit_logs`.
7. Garantir que o processamento do cancelamento seja idempotente.

## Critérios de validação

- Cancelamento válido deve alterar `subscriptions.status` para `canceled`.
- O mesmo evento de cancelamento não deve ser processado mais de uma vez.
- Se a assinatura estiver cancelada e sem vigência ativa, o lojista não deve acessar rotas `/admin/*`.
- Loja sem assinatura vigente não deve aparecer como loja pública ativa.
- Dados existentes da loja e dos produtos não devem ser apagados automaticamente.
- O evento deve gerar registro de auditoria.

## Decisões pendentes

Ainda é necessário decidir:

- se o cancelamento é imediato ou se mantém acesso até `subscriptions.ends_at`;
- se o estado do tenant deve mudar para `suspended` quando a assinatura for cancelada;
- se a loja deve ficar com `stores.active = false` automaticamente;
- se haverá período de carência para reativação;
- por quanto tempo os dados de lojas canceladas serão mantidos;
- qual mensagem o lojista verá ao tentar acessar o painel após cancelamento;
- qual mensagem o consumidor verá ao tentar acessar a vitrine de uma loja cancelada.

## Observação

Esse edge case não deve apagar dados automaticamente. Cancelamento de assinatura deve ser tratado primeiro como mudança de acesso e visibilidade, não como exclusão da loja.
