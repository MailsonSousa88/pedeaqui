# Subscription - Baseline atual / Autoritativo

## Autoridade
- `src/routes/subscription.routes.ts`
- `src/routes/webhook.routes.ts`
- `src/controllers/SubscriptionController.ts`
- `src/controllers/WebhookController.ts`
- `src/useCases/subscription/CreateCheckoutSessionUseCase.ts`
- `src/useCases/subscription/ProcessStripeWebhookUseCase.ts`
- `src/useCases/tenant/RegisterTenantUseCase.ts`
- `src/useCases/store/CreateStoreUseCase.ts`
- `src/repositories/ISubscriptionRepository.ts`
- `src/repositories/supabase/SupabaseSubscriptionRepository.ts`
- `src/infra/providers/IStripeProvider.ts`
- `src/infra/providers/implementations/StripeProvider.ts`
- `src/models/Subscription.ts`
- `supabase/migrations/20260618000000_init.sql`
- `supabase/migrations/20260702160000_make_subscription_plan_nullable.sql`
- `docs/adr/003-stripe-integration.md`

## Comportamento Confirmado
- Registro de tenant cria subscription trial ativa por 30 dias com `planId = null`.
- Criacao de loja depende de `ISubscriptionRepository.findByTenantId` retornar assinatura ativa.
- Checkout protegido recebe `planId` do body e retorna URL de checkout Stripe.
- `CreateCheckoutSessionUseCase` bloqueia checkout quando ja existe assinatura ativa.
- Webhook Stripe usa rota com `express.raw` antes do `express.json`.
- Webhook exige header `stripe-signature`.
- `ProcessStripeWebhookUseCase` processa `checkout.session.completed` e `customer.subscription.updated`.
- Eventos irrelevantes ou eventos sem `metadata.tenant_id`/`metadata.plan_id` sao ignorados.

## Interfaces/Fluxos Confirmados
- `POST /api/subscriptions/checkout`, protegido por `authMiddleware`.
- `POST /api/webhooks/stripe`, publico para Stripe e com raw body.
- Fluxo de checkout: SubscriptionController -> `CreateCheckoutSessionUseCase` -> `ISubscriptionRepository` -> `IStripeProvider`.
- Fluxo de webhook: WebhookController -> `StripeProvider.constructWebhookEvent` -> `ProcessStripeWebhookUseCase` -> `ISubscriptionRepository.createOrUpdate`.

## Persistencia
- `subscriptions.status` aceita `active`, `past_due`, `unpaid`, `canceled`.
- `stripe_subscription_id` e unico.
- Ha indice unico parcial para apenas uma subscription ativa por tenant.
- `plan_id` foi tornado nullable para trial automatico.
- `findByTenantId` no repositorio atual filtra somente `status = active`.

## Fora de Escopo
- Criacao e gestao de planos pertencem a `plans`.
- Criacao da loja pertence a `store`.
- Cron de suspensao por fim de assinatura nao esta implementado no backend atual.

## Gaps Reais
- `StripeProvider.createCheckoutSession` usa o `planId` recebido como `line_items.price`; nao busca `plans.stripe_price_id`.
- `StripeProvider.createCheckoutSession` nao envia `metadata.tenant_id` nem `metadata.plan_id`, mas o webhook depende desses metadados.
- Checkout bloqueia tenants com trial ativo, impedindo conversao normal para plano pago no estado atual.
- `findByTenantId` retorna apenas subscription ativa; isso prejudica atualizacoes/idempotencia de estados `past_due`, `unpaid` ou `canceled`.
- Webhook chama `createOrUpdate` com `id: ''` quando nao ha assinatura existente, valor suspeito para coluna UUID.
- Nao ha fluxo implementado para suspender tenant/store apos fim, cancelamento ou inadimplencia de assinatura.
