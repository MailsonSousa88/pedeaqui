# Mapa Atual de Testes e Cobertura dos Use Cases

Snapshot gerado em 2026-07-04 a partir de:

- `npm test -- --runInBand`
- `npm run test:coverage -- --runInBand`

Resultado da suite no snapshot: 40 suites passando, 199 testes passando.

## Regra de Cobertura

O projeto exige 95% em `src/useCases` para statements, branches, functions e lines.

| Escopo | Statements | Branches | Functions | Lines | Status |
|---|---:|---:|---:|---:|---|
| `src/useCases` | 96.80% | 85.76% | 100.00% | 99.16% | Falha apenas em branches |
| Global do projeto | 70.71% | 57.55% | 70.62% | 72.49% | Meta direcional, nao bloqueante na exploracao |

## Mapa por Fluxo/Contexto

| Contexto | Testes existentes | O que esta coberto hoje | Cobertura atual |
|---|---|---|---|
| Auth | `src/useCases/auth/__tests__/*.spec.ts`, `auth.integration.spec.ts` | login, logout, recuperacao/reset de senha, refresh session, signup e update profile | 100% em statements, branches, functions e lines |
| Tenant | `src/useCases/tenant/*.spec.ts`, `tenant.integration.spec.ts` | registro, consulta e atualizacao de tenant | 100% em statements, branches, functions e lines |
| Plans | `src/useCases/plans/*.spec.ts` | criacao, listagem e atualizacao de status de plano | 100% em statements, branches, functions e lines |
| Category | `src/useCases/category/__tests__/*.spec.ts` | criacao, listagem, remocao e atualizacao de categoria | 100% statements/functions/lines; branches em 89.28% |
| Store | `src/useCases/store/__tests__/*.spec.ts`, `store.integration.spec.ts` | criacao, consulta por slug, toggle, delete e update de loja | 93.02% statements; 76.11% branches; 100% functions; 98.73% lines |
| Product | `src/useCases/product/__tests__/*.spec.ts`, `product.integration.spec.ts` | criacao, listagem, update, delete e toggle de disponibilidade de produto | 91.04% statements; 80.00% branches; 100% functions; 96.72% lines |
| Subscription | `src/useCases/subscription/*.spec.ts` | checkout e processamento de webhook Stripe | 100% statements/functions/lines; branches em 84.84% |
| Fluxo orquestrado shopkeeper | `src/useCases/__tests__/shopkeeper-onboarding.flow.spec.ts`, `shopkeeper-onboarding.integration.spec.ts` | fluxo `auth.users -> profiles -> tenant -> store -> category -> product`, incluindo categoria padrao `Todos` quando aplicavel | Validado por teste de fluxo/integracao, mas a meta de 95% e calculada por arquivo/camada no coverage |

## Detalhe por Use Case

| Use Case | Statements | Branches | Functions | Lines | Observacao |
|---|---:|---:|---:|---:|---|
| `auth/LoginUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `auth/LogoutUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `auth/RecoverPasswordUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `auth/RefreshSessionUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `auth/ResetPasswordUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `auth/SignUpUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `auth/UpdateProfileUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `category/CreateCategoryUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `category/DeleteCategoryUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `category/ListStoreCategoriesUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `category/UpdateCategoryUseCase.ts` | 100.00% | 70.00% | 100.00% | 100.00% | Gap de branches em atualizacoes parciais |
| `plans/CreatePlanUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `plans/ListPlansUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `plans/UpdatePlanStatusUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `product/CreateProductUseCase.ts` | 100.00% | 89.47% | 100.00% | 100.00% | Gap em opcionais de promocao/disponibilidade |
| `product/DeleteProductUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `product/ListProductsUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `product/ToggleProductAvailabilityUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `product/UpdateProductUseCase.ts` | 82.35% | 70.73% | 100.00% | 92.85% | Gap principal em paths de erro e campos opcionais |
| `store/CreateStoreUseCase.ts` | 100.00% | 87.50% | 100.00% | 100.00% | Gap em fallback de horarios opcionais |
| `store/DeleteStoreUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `store/GetStoreBySlugUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `store/ToggleStoreUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `store/UpdateStoreUseCase.ts` | 78.57% | 56.25% | 100.00% | 95.23% | Maior gap de branches em opcionais e slug |
| `subscription/CreateCheckoutSessionUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `subscription/ProcessStripeWebhookUseCase.ts` | 100.00% | 82.75% | 100.00% | 100.00% | Gap em variantes do webhook e fallbacks de periodo |
| `tenant/GetTenantUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `tenant/RegisterTenantUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `tenant/UpdateTenantUseCase.ts` | 100.00% | 100.00% | 100.00% | 100.00% | OK |

## Branches que Ainda Bloqueiam 95%

Prioridade para elevar a cobertura de branches:

1. `src/useCases/store/UpdateStoreUseCase.ts`
2. `src/useCases/product/UpdateProductUseCase.ts`
3. `src/useCases/category/UpdateCategoryUseCase.ts`
4. `src/useCases/product/CreateProductUseCase.ts`
5. `src/useCases/store/CreateStoreUseCase.ts`
6. `src/useCases/subscription/ProcessStripeWebhookUseCase.ts`

Esses arquivos concentram condicionais de campos opcionais, fallbacks para `null`, validacoes de ownership, paths de erro e variantes de webhook que ainda nao foram exercitados pelos testes.
