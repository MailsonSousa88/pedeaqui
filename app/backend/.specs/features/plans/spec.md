# Plans - Baseline atual / Autoritativo

## Autoridade
- `src/routes/plans.routes.ts`
- `src/controllers/plans/CreatePlanController.ts`
- `src/controllers/plans/ListPlansController.ts`
- `src/controllers/plans/UpdatePlanStatusController.ts`
- `src/useCases/plans/CreatePlanUseCase.ts`
- `src/useCases/plans/ListPlansUseCase.ts`
- `src/useCases/plans/UpdatePlanStatusUseCase.ts`
- `src/models/Plan.ts`
- `src/repositories/IPlansRepository.ts`
- `src/repositories/supabase/PlansRepository.ts`
- `supabase/migrations/20260618000000_init.sql`
- `docs/adr/003-stripe-integration.md`

## Comportamento Confirmado
- Planos possuem `name`, `priceBrlCents`, `stripePriceId` opcional e flag `active`.
- `CreatePlanUseCase` rejeita preco menor ou igual a zero.
- `CreatePlanUseCase` verifica duplicidade de `stripePriceId` quando informado.
- Listagem administrativa aceita filtro opcional `active`.
- Listagem publica retorna apenas planos ativos.
- Atualizacao implementada altera somente a flag `active`.

## Interfaces/Fluxos Confirmados
- `GET /api/plans/available` publico, lista ativos.
- `POST /api/plans`, protegido por `authMiddleware`.
- `GET /api/plans`, protegido por `authMiddleware`, aceita query `active=true|false`.
- `PATCH /api/plans/:id/status`, protegido por `authMiddleware`.
- Fluxo: plans route -> controller especifico -> use case -> `IPlansRepository` -> `PlansRepository`.

## Persistencia
- Tabela `plans` tem `price_brl_cents > 0`.
- `stripe_price_id` e unico e pode ser nulo.
- `active` possui default `true`.
- RLS de banco permite leitura publica de planos ativos e escreve por admins ativos, mas a API atual so aplica JWT.

## Fora de Escopo
- Checkout Stripe pertence ao modulo `subscription`.
- CRUD completo de edicao/exclusao de plano nao esta implementado.

## Gaps Reais
- Rotas administrativas exigem JWT, mas nao checam papel admin em controller/use case.
- O Supabase client singleton nao propaga explicitamente o token do request para queries RLS.
- Nao existe endpoint de update geral de plano; apenas status.
- Specs antigas que falam em CRUD completo sao historicas.
