# Project State

**Last Updated:** 2026-07-15
**Current Work:** `admin-access-plans` - fase Tasks

## Decisions

- **[DEC-01] Clean Architecture Layers:** We strictly enforce layers (`Route -> Middleware -> Controller -> Use Case -> Repository -> Supabase Client`).
- **[DEC-02] Auth Infrastructure:** We use Supabase Auth to handle token management, session persistence, and password reset flows to optimize time to market.
- **[DEC-03] Database FK Chain:** `tenants` references `profiles`, not `auth.users` directly, reflecting the true lifecycle dependency.
- **[DEC-04] tenantId no authMiddleware:** `tenant.id === profile.id === auth.user.id` por design. O `authMiddleware` expõe `req.user.tenantId` como alias de `req.user.id`. Zero queries extras. Controllers usam `req.user.id` diretamente. (corrigido em 2026-07-02)
- **[DEC-05] Fase de Consolidação iniciada:** Os módulos auth, tenant, store, product e category atingiram cobertura ≥ 95% em Use Cases (171 testes, 0 falhas). A fase de exploração está encerrada para o fluxo de onboarding. A consolidação exige testes de integração end-to-end com supertest.
- **[DEC-06] Consolidação de admin-access-plans confirmada:** Em 2026-07-15 o usuário aprovou a spec, o design e o ADR 008 e confirmou explicitamente a consolidação desta fatia. Toda rota administrativa, regra RLS e fluxo de logout desta feature exige testes unitários e de integração em Supabase local/teste isolado antes da entrega.

## Blockers

- **[BLK-02] Banco de Test isolado:** Testes de integração exigem Supabase local ou projeto staging/test separado de produção. O helper deve falhar fechado quando a URL não for explicitamente segura. O Supabase local atende ao gate durante desenvolvimento.

## Todos

- [x] Install `@supabase/supabase-js` e `dotenv`
- [x] Implement Supabase client initialization
- [x] Corrigir bug: tenantId ausente no authMiddleware (DEC-04)
- [x] Instalar `supertest` e configurar infra de integration tests
- [x] Criar helper `integrationSetup.ts`
- [x] Escrever testes de integração: auth, tenant, store, product
- [x] Escrever teste E2E orquestrado de onboarding
- [x] Atualizar TESTING.md para fase de consolidação
- [x] Aprovar spec, design e ADR 008 de `admin-access-plans`
- [x] Confirmar consolidação da fatia `admin-access-plans`
- [ ] Aprovar e executar `.specs/features/admin-access-plans/tasks.md`

## Deferred Ideas

- Consolidação do módulo subscription
