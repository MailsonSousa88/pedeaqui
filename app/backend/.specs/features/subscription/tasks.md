# Subscription - Estado atual de tarefas

## Concluido no baseline atual
- [x] Trial automatico criado no registro de tenant.
- [x] `plan_id` nullable em subscriptions.
- [x] Checkout route protegida.
- [x] Provider Stripe encapsulado por interface.
- [x] Webhook Stripe com raw body.
- [x] Processamento de eventos `checkout.session.completed` e `customer.subscription.updated`.
- [x] Testes unitarios de checkout e webhook existentes.

## Gaps reais nao implementados
- [ ] Converter trial ativo para assinatura paga sem bloquear checkout.
- [ ] Buscar `stripe_price_id` real a partir do plano antes de chamar Stripe.
- [ ] Enviar metadata necessaria no checkout Stripe.
- [ ] Corrigir upsert sem `id` valido quando webhook cria assinatura nova.
- [ ] Consultar assinatura por tenant sem limitar apenas a status ativo nos caminhos de webhook.
- [ ] Suspender tenant/store por expiracao, cancelamento ou inadimplencia.

## Fora desta rodada
- Alterar integracao Stripe.
- Alterar regras de assinatura ou migrations.
