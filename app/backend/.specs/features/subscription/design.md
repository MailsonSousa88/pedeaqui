# Subscription - Design atual / Autoritativo

## Autoridade
- `src/controllers/SubscriptionController.ts`
- `src/controllers/WebhookController.ts`
- `src/useCases/subscription/*`
- `src/repositories/ISubscriptionRepository.ts`
- `src/repositories/supabase/SupabaseSubscriptionRepository.ts`
- `src/infra/providers/IStripeProvider.ts`
- `src/infra/providers/implementations/StripeProvider.ts`
- `src/models/Subscription.ts`
- `docs/adr/003-stripe-integration.md`

## Camadas Confirmadas
- Rotas declaram checkout protegido e webhook Stripe publico.
- Controllers extraem `tenantId`, `planId` e assinatura Stripe.
- Use cases coordenam regra de assinatura ativa e processamento de evento.
- `IStripeProvider` isola o SDK Stripe dos use cases.
- Repository Supabase persiste `subscriptions`.

## Fluxos Confirmados
- Trial: `RegisterTenantUseCase` cria subscription ativa sem plano pago.
- Checkout: usuario autenticado envia `planId`; use case verifica assinatura ativa e chama Stripe provider.
- Webhook: Express preserva raw body; provider valida assinatura; use case extrai metadados e faz upsert.
- Store gate: `CreateStoreUseCase` consulta subscription ativa para permitir criacao da loja.

## Decisoes Confirmadas
- Stripe SDK fica na infraestrutura.
- Webhook fica antes de `express.json` em `app.ts`.
- `planId` nullable e decisao implementada para suportar trial.

## Gaps Reais
- O fluxo checkout/webhook esta desalinhado porque checkout nao grava metadata exigida pelo webhook.
- A regra de assinatura ativa nao considera `endsAt`.
- Nao ha maquina operacional completa para suspender tenants por inadimplencia ou expiracao.
