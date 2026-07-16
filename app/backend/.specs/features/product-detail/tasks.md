# Product Detail Tasks

**Design:** `.specs/features/product-detail/design.md`
**Status:** Done

## Execution Plan

```text
T1 (JWT-scoped client) ─┐
T2 (public RLS) ───────┼──> T5 (HTTP surface) ──> T6 (Insomnia and final validation)
T3 (read repository) ─┼──> T4 (Use Cases + unit tests) ─┘
                        └─────────────────────────────────>
```

## Task Breakdown

### T1: Create the request-scoped Supabase client

**What:** Add a factory for an authenticated, non-persistent Supabase client and retain the validated bearer token only on the authenticated request.
**Where:** `src/infra/supabase/supabaseClient.ts`, `src/middlewares/authMiddleware.ts`
**Depends on:** None
**Reuses:** current anonymous Supabase client and `AuthenticatedRequest`
**Requirement:** PDET-04, PDET-06
**Tests:** none (middleware tests are optional in the active testing matrix)
**Gate:** build

### T2: Add public RLS policies for the product aggregate

**What:** Add a migration that aligns public image, variation and option reads with the public product eligibility rule, without public writes.
**Where:** `supabase/migrations/20260715120000_add_public_product_detail_policies.sql`
**Depends on:** None
**Reuses:** `storefront_public_products` policy
**Requirement:** PDET-01, PDET-02, PDET-03, PDET-06
**Tests:** none (verified through migration review and later public route manual test)
**Gate:** build

### T3: Create the aggregate read DTO and repository

**What:** Define the detail projection contract and implement batched, ordered Supabase reads for public and tenant-owned products.
**Where:** `src/dtos/ProductDetailDTO.ts`, `src/repositories/IProductDetailRepository.ts`, `src/repositories/supabase/SupabaseProductDetailRepository.ts`
**Depends on:** None
**Reuses:** Supabase product, variation and option repositories
**Requirement:** PDET-01, PDET-02, PDET-03, PDET-04, PDET-05, PDET-06
**Tests:** none (repository integration coverage is deferred until isolated database infrastructure is available)
**Gate:** build

### T4: Create detail Use Cases with unit tests

**What:** Add public and merchant detail Use Cases, each with mocked-repository unit coverage for success and not-found behavior.
**Where:** `src/useCases/product/GetPublicProductDetailUseCase.ts`, `src/useCases/product/GetMerchantProductDetailUseCase.ts`, `src/useCases/product/__tests__/GetPublicProductDetailUseCase.spec.ts`, `src/useCases/product/__tests__/GetMerchantProductDetailUseCase.spec.ts`
**Depends on:** T3
**Reuses:** product Use Case error conventions and tests
**Requirement:** PDET-01, PDET-02, PDET-04, PDET-05, PDET-06
**Tests:** unit
**Gate:** quick

### T5: Expose public and merchant detail endpoints

**What:** Wire the repository and Use Cases into the product controller and register routes in the correct public/private order.
**Where:** `src/controllers/product/ProductController.ts`, `src/routes/product.routes.ts`
**Depends on:** T1, T2, T3, T4
**Reuses:** `authMiddleware`, ProductController error mapping and toggle route
**Requirement:** PDET-01, PDET-02, PDET-03, PDET-04, PDET-05, PDET-06
**Tests:** none (route tests are optional in the active testing matrix)
**Gate:** build

### T6: Document manual API verification and complete feature gates

**What:** Add public and merchant detail requests to the Insomnia collection and run build, unit coverage and full tests.
**Where:** `docs/insomnia/*`, `.specs/features/product-detail/*`
**Depends on:** T5
**Reuses:** existing product/variation Insomnia flow
**Requirement:** PDET-01, PDET-04, PDET-05, PDET-06
**Tests:** unit/manual
**Gate:** build

## Validation Checks

### Granularity

| Task | Single deliverable | Status |
| --- | --- | --- |
| T1 | Request-scoped authentication adapter | ✅ |
| T2 | One RLS migration | ✅ |
| T3 | Aggregate persistence projection | ✅ |
| T4 | Detail application rules and unit tests | ✅ |
| T5 | HTTP route wiring | ✅ |
| T6 | Manual contract artifact and final gate | ✅ |

### Diagram and Dependencies

| Task | Declared dependencies | Diagram | Status |
| --- | --- | --- | --- |
| T1 | None | root | ✅ |
| T2 | None | root | ✅ |
| T3 | None | root | ✅ |
| T4 | T3 | T3 → T4 | ✅ |
| T5 | T1, T2, T3, T4 | T1/T2/T3/T4 → T5 | ✅ |
| T6 | T5 | T5 → T6 | ✅ |

### Test Co-location

| Task | Layer | Required test type | Included | Status |
| --- | --- | --- | --- | --- |
| T1 | Middleware/infra | Optional | Not required | ✅ |
| T2 | Migration | None | Build validation | ✅ |
| T3 | Repository | Integration deferred by active phase | Build validation | ✅ |
| T4 | Use Cases | Unit | Co-located specs | ✅ |
| T5 | Controller/routes | Optional | Build validation | ✅ |
| T6 | Documentation | Manual/unit gate | Included | ✅ |

## Completion Record

| Task | Status | Verification |
| --- | --- | --- |
| T1 | ✅ Done | `npm run build` |
| T2 | ✅ Done | migration review, `npm run build` |
| T3 | ✅ Done | `npm run build` |
| T4 | ✅ Done | 41 unit suites, 170 tests; Product Use Cases at 95.00% branches |
| T5 | ✅ Done | `npm run build` |
| T6 | ✅ Done | Insomnia JSON validated; full suite 51 suites, 255 tests |
