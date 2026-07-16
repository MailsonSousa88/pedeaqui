# Product Variations and Options Tasks

**Spec**: `.specs/features/product-variations-options/spec.md`
**Design**: skipped; architecture follows current Product/Category patterns and the spec contract.
**Status**: Complete

---

## Execution Plan

### Phase 1: Contracts and Persistence

Create repository contracts first, then Supabase implementations can be built independently.

```text
T1
|-- T2 [P]
`-- T3 [P]
```

### Phase 2: Use Cases

After repository contracts exist, each Use Case is implemented with its own unit tests. Variation option Use Cases also depend on the variation repository because they must validate that `variationId` belongs to `productId`.

```text
T1, T2
|-- T4  [P]
|-- T5  [P]
|-- T6  [P]
`-- T7  [P]

T1, T2, T3
|-- T8  [P]
|-- T9  [P]
|-- T10 [P]
`-- T11 [P]
```

### Phase 3: HTTP Surface and Manual Testing

Controllers and routes wire the completed Use Cases into the API. Insomnia docs come after routes are stable.

```text
T4, T5, T6, T7 ----.
                    |-- T12 --.
T8, T9, T10, T11 --'         |-- T14 -- T15 -- T16
                              |
T8, T9, T10, T11 ----- T13 --'
```

---

## Task Breakdown

### T1: Create Variation Repository Contracts and DTOs

**What**: Define application contracts for product variations, variation options, and request DTOs.
**Where**:
- `src/repositories/IProductVariationRepository.ts`
- `src/repositories/IVariationOptionRepository.ts`
- `src/dtos/ProductVariationDTOs.ts`
**Depends on**: None
**Reuses**: `src/repositories/IProductRepository.ts`, `src/dtos/ProductDTOs.ts`
**Requirement**: PVAR-01, PVAR-05, PVAR-10

**Tools**:
- MCP: none configured
- Skill: `codenavi` for code pattern lookup; `tlc-spec-driven` for orchestration

**Done when**:
- [x] `IProductVariationRepository` exposes `findById`, `findByProductId`, `create`, `update`, and `delete`.
- [x] `IVariationOptionRepository` exposes `findById`, `findByVariationId`, `create`, `update`, and `delete`.
- [x] DTOs cover create/update inputs for variations and options, including authenticated `tenantId` and route ids where needed.
- [x] Contracts do not import Express or Supabase.
- [x] Build gate passes: `npm run build`.

**Tests**: none
**Gate**: build
**Verify**:
`npm run build` exits 0.

---

### T2: Implement Supabase Product Variation Repository [P]

**What**: Persist and map `product_variations` rows through the new repository contract.
**Where**: `src/repositories/supabase/SupabaseProductVariationRepository.ts`
**Depends on**: T1
**Reuses**: `src/repositories/supabase/SupabaseProductRepository.ts`
**Requirement**: PVAR-01, PVAR-02, PVAR-03, PVAR-04, PVAR-10

**Tools**:
- MCP: none configured
- Skill: `codenavi`

**Done when**:
- [x] Repository imports Supabase only inside the infrastructure layer.
- [x] `findByProductId` filters by `product_id` and orders by `sort_order`.
- [x] `create` and `update` map camelCase model fields to snake_case database fields.
- [x] `delete` removes the variation row by `id`, relying on database cascade for options.
- [x] Build gate passes: `npm run build`.

**Tests**: none
**Gate**: build
**Verify**:
`npm run build` exits 0.

---

### T3: Implement Supabase Variation Option Repository [P]

**What**: Persist and map `variation_options` rows through the new repository contract.
**Where**: `src/repositories/supabase/SupabaseVariationOptionRepository.ts`
**Depends on**: T1
**Reuses**: `src/repositories/supabase/SupabaseProductRepository.ts`
**Requirement**: PVAR-05, PVAR-06, PVAR-07, PVAR-08, PVAR-10

**Tools**:
- MCP: none configured
- Skill: `codenavi`

**Done when**:
- [x] Repository imports Supabase only inside the infrastructure layer.
- [x] `findByVariationId` filters by `variation_id` and orders by `sort_order`.
- [x] `create` and `update` map camelCase model fields to snake_case database fields.
- [x] `delete` removes only the option row by `id`.
- [x] Build gate passes: `npm run build`.

**Tests**: none
**Gate**: build
**Verify**:
`npm run build` exits 0.

---

### T4: Create Product Variation Use Case [P]

**What**: Add `CreateProductVariationUseCase` with tenant ownership and label validation.
**Where**:
- `src/useCases/product/CreateProductVariationUseCase.ts`
- `src/useCases/product/__tests__/CreateProductVariationUseCase.spec.ts`
**Depends on**: T1, T2
**Reuses**: `src/useCases/product/CreateProductUseCase.ts`, `src/models/ProductVariation.ts`
**Requirement**: PVAR-01, PVAR-10

**Tools**:
- MCP: none configured
- Skill: `codenavi`

**Done when**:
- [x] Use Case fetches product by `productId` and rejects missing/foreign tenant product before creating.
- [x] Use Case defaults `sortOrder` to `0`.
- [x] Unit test covers happy path and product ownership failure with mocked repositories.
- [x] Quick gate passes: `npm test`.
- [x] Test count is at least 118 tests total, with no silent deletions from the 116-test baseline.

**Tests**: unit
**Gate**: quick
**Verify**:
`npm test` exits 0 and includes the new CreateProductVariation tests.

---

### T5: List Product Variations Use Case [P]

**What**: Add `ListProductVariationsUseCase` with tenant ownership validation.
**Where**:
- `src/useCases/product/ListProductVariationsUseCase.ts`
- `src/useCases/product/__tests__/ListProductVariationsUseCase.spec.ts`
**Depends on**: T1, T2
**Reuses**: `src/useCases/product/ListProductsUseCase.ts`
**Requirement**: PVAR-02, PVAR-10

**Tools**:
- MCP: none configured
- Skill: `codenavi`

**Done when**:
- [x] Use Case fetches product by `productId` and rejects missing/foreign tenant product.
- [x] Use Case returns only repository results for that `productId`.
- [x] Unit test covers happy path and ownership failure with mocked repositories.
- [x] Quick gate passes: `npm test`.
- [x] Test count is at least 118 tests total, with no silent deletions from the 116-test baseline.

**Tests**: unit
**Gate**: quick
**Verify**:
`npm test` exits 0 and includes the new ListProductVariations tests.

---

### T6: Update Product Variation Use Case [P]

**What**: Add `UpdateProductVariationUseCase` with ownership, parent product, and validation checks.
**Where**:
- `src/useCases/product/UpdateProductVariationUseCase.ts`
- `src/useCases/product/__tests__/UpdateProductVariationUseCase.spec.ts`
**Depends on**: T1, T2
**Reuses**: `src/useCases/product/UpdateProductUseCase.ts`, `src/models/ProductVariation.ts`
**Requirement**: PVAR-03, PVAR-05, PVAR-10

**Tools**:
- MCP: none configured
- Skill: `codenavi`

**Done when**:
- [x] Use Case validates product ownership before updating.
- [x] Use Case rejects missing variation or variation not linked to the route `productId`.
- [x] Use Case applies partial updates for `label` and `sortOrder`.
- [x] Unit test covers happy path, missing variation, and cross-product variation failure.
- [x] Quick gate passes: `npm test`.
- [x] Test count is at least 119 tests total, with no silent deletions from the 116-test baseline.

**Tests**: unit
**Gate**: quick
**Verify**:
`npm test` exits 0 and includes the new UpdateProductVariation tests.

---

### T7: Delete Product Variation Use Case [P]

**What**: Add `DeleteProductVariationUseCase` with ownership and parent product checks.
**Where**:
- `src/useCases/product/DeleteProductVariationUseCase.ts`
- `src/useCases/product/__tests__/DeleteProductVariationUseCase.spec.ts`
**Depends on**: T1, T2
**Reuses**: `src/useCases/product/DeleteProductUseCase.ts`
**Requirement**: PVAR-04, PVAR-10

**Tools**:
- MCP: none configured
- Skill: `codenavi`

**Done when**:
- [x] Use Case validates product ownership before deletion.
- [x] Use Case rejects missing variation or variation not linked to the route `productId`.
- [x] Use Case calls variation repository `delete` once for the target variation.
- [x] Unit test covers happy path and cross-product variation failure.
- [x] Quick gate passes: `npm test`.
- [x] Test count is at least 118 tests total, with no silent deletions from the 116-test baseline.

**Tests**: unit
**Gate**: quick
**Verify**:
`npm test` exits 0 and includes the new DeleteProductVariation tests.

---

### T8: Create Variation Option Use Case [P]

**What**: Add `CreateVariationOptionUseCase` with product ownership, variation parent, value, and price validation.
**Where**:
- `src/useCases/product/CreateVariationOptionUseCase.ts`
- `src/useCases/product/__tests__/CreateVariationOptionUseCase.spec.ts`
**Depends on**: T1, T2, T3
**Reuses**: `src/models/VariationOption.ts`, `src/useCases/product/CreateProductVariationUseCase.ts`
**Requirement**: PVAR-05, PVAR-06, PVAR-07, PVAR-08, PVAR-10

**Tools**:
- MCP: none configured
- Skill: `codenavi`

**Done when**:
- [x] Use Case validates product ownership and that `variationId` belongs to `productId`.
- [x] Use Case defaults `priceModifierCents` and `sortOrder` to `0`.
- [x] Use Case rejects `priceModifierCents <= -1000000` before repository write.
- [x] Unit test covers happy path, default price, invalid price, and wrong parent variation.
- [x] Quick gate passes: `npm test`.
- [x] Test count is at least 120 tests total, with no silent deletions from the 116-test baseline.

**Tests**: unit
**Gate**: quick
**Verify**:
`npm test` exits 0 and includes the new CreateVariationOption tests.

---

### T9: List Variation Options Use Case [P]

**What**: Add `ListVariationOptionsUseCase` with product ownership and variation parent checks.
**Where**:
- `src/useCases/product/ListVariationOptionsUseCase.ts`
- `src/useCases/product/__tests__/ListVariationOptionsUseCase.spec.ts`
**Depends on**: T1, T2, T3
**Reuses**: `src/useCases/product/ListProductVariationsUseCase.ts`
**Requirement**: PVAR-06, PVAR-08, PVAR-10

**Tools**:
- MCP: none configured
- Skill: `codenavi`

**Done when**:
- [x] Use Case validates product ownership and that `variationId` belongs to `productId`.
- [x] Use Case returns only repository results for that `variationId`.
- [x] Unit test covers happy path and wrong parent variation.
- [x] Quick gate passes: `npm test`.
- [x] Test count is at least 118 tests total, with no silent deletions from the 116-test baseline.

**Tests**: unit
**Gate**: quick
**Verify**:
`npm test` exits 0 and includes the new ListVariationOptions tests.

---

### T10: Update Variation Option Use Case [P]

**What**: Add `UpdateVariationOptionUseCase` with ownership, parent checks, and partial update validation.
**Where**:
- `src/useCases/product/UpdateVariationOptionUseCase.ts`
- `src/useCases/product/__tests__/UpdateVariationOptionUseCase.spec.ts`
**Depends on**: T1, T2, T3
**Reuses**: `src/useCases/product/UpdateProductVariationUseCase.ts`, `src/models/VariationOption.ts`
**Requirement**: PVAR-07, PVAR-08, PVAR-10

**Tools**:
- MCP: none configured
- Skill: `codenavi`

**Done when**:
- [x] Use Case validates product ownership and that `variationId` belongs to `productId`.
- [x] Use Case rejects missing option or option not linked to the route `variationId`.
- [x] Use Case applies partial updates for `value`, `priceModifierCents`, and `sortOrder`.
- [x] Use Case rejects `priceModifierCents <= -1000000`.
- [x] Unit test covers happy path, missing option, wrong parent option, and invalid price.
- [x] Quick gate passes: `npm test`.
- [x] Test count is at least 120 tests total, with no silent deletions from the 116-test baseline.

**Tests**: unit
**Gate**: quick
**Verify**:
`npm test` exits 0 and includes the new UpdateVariationOption tests.

---

### T11: Delete Variation Option Use Case [P]

**What**: Add `DeleteVariationOptionUseCase` with ownership and parent checks.
**Where**:
- `src/useCases/product/DeleteVariationOptionUseCase.ts`
- `src/useCases/product/__tests__/DeleteVariationOptionUseCase.spec.ts`
**Depends on**: T1, T2, T3
**Reuses**: `src/useCases/product/DeleteProductVariationUseCase.ts`
**Requirement**: PVAR-07, PVAR-08, PVAR-10

**Tools**:
- MCP: none configured
- Skill: `codenavi`

**Done when**:
- [x] Use Case validates product ownership and that `variationId` belongs to `productId`.
- [x] Use Case rejects missing option or option not linked to the route `variationId`.
- [x] Use Case calls option repository `delete` once for the target option.
- [x] Unit test covers happy path and wrong parent option.
- [x] Quick gate passes: `npm test`.
- [x] Test count is at least 118 tests total, with no silent deletions from the 116-test baseline.

**Tests**: unit
**Gate**: quick
**Verify**:
`npm test` exits 0 and includes the new DeleteVariationOption tests.

---

### T12: Add Product Variation HTTP Handlers

**What**: Add controller handlers for create/list/update/delete product variations.
**Where**: `src/controllers/product/ProductVariationController.ts`
**Depends on**: T4, T5, T6, T7
**Reuses**: `src/controllers/product/ProductController.ts`
**Requirement**: PVAR-01, PVAR-02, PVAR-03, PVAR-04, PVAR-10

**Tools**:
- MCP: none configured
- Skill: `codenavi`

**Done when**:
- [x] Handlers extract `tenantId` from `req.user!.id`.
- [x] Handlers extract `productId` and `variationId` from route params.
- [x] HTTP responses match spec: create `201`, list/update `200`, delete `204`.
- [x] Errors map validation to `400`, not found to `404`, and ownership/forbidden to `403` or `404`.
- [x] Build gate passes: `npm run build`.

**Tests**: none
**Gate**: build
**Verify**:
`npm run build` exits 0.

---

### T13: Add Variation Option HTTP Handlers

**What**: Add controller handlers for create/list/update/delete variation options.
**Where**: `src/controllers/product/ProductVariationController.ts`
**Depends on**: T8, T9, T10, T11
**Reuses**: `src/controllers/product/ProductController.ts`
**Requirement**: PVAR-05, PVAR-06, PVAR-07, PVAR-08, PVAR-10

**Tools**:
- MCP: none configured
- Skill: `codenavi`

**Done when**:
- [x] Handlers extract `tenantId` from `req.user!.id`.
- [x] Handlers extract `productId`, `variationId`, and `optionId` from route params.
- [x] HTTP responses match spec: create `201`, list/update `200`, delete `204`.
- [x] Errors map validation to `400`, not found to `404`, and ownership/forbidden to `403` or `404`.
- [x] Build gate passes: `npm run build`.

**Tests**: none
**Gate**: build
**Verify**:
`npm run build` exits 0.

---

### T14: Wire Nested Product Variation Routes

**What**: Expose the nested authenticated variation and option routes under `/api/products`.
**Where**: `src/routes/product.routes.ts`
**Depends on**: T12, T13
**Reuses**: existing `authMiddleware` placement in `src/routes/product.routes.ts`
**Requirement**: PVAR-01, PVAR-02, PVAR-03, PVAR-04, PVAR-05, PVAR-06, PVAR-07, PVAR-08, PVAR-10

**Tools**:
- MCP: none configured
- Skill: `codenavi`

**Done when**:
- [x] All eight routes from the spec are registered after `router.use(authMiddleware)`.
- [x] Public `GET /api/products/store/:storeId` remains public and unchanged.
- [x] Existing product CRUD routes remain available.
- [x] Build gate passes: `npm run build`.

**Tests**: none
**Gate**: build
**Verify**:
`npm run build` exits 0.

---

### T15: Update Insomnia Collection and Manual Guide

**What**: Add manual requests and environment variables for CRUD of variations and options.
**Where**:
- `docs/insomnia/shopkeeper-onboarding.insomnia.json`
- `docs/insomnia/shopkeeper-onboarding.md`
**Depends on**: T14
**Reuses**: existing product/category request sequence in `docs/insomnia`
**Requirement**: PVAR-09

**Tools**:
- MCP: none configured
- Skill: `codenavi`

**Done when**:
- [x] Collection has requests for all eight variation/option routes.
- [x] Environment includes `variation_id` and `variation_option_id`.
- [x] Guide explains copying created variation/option ids into environment variables.
- [x] Requests use the existing bearer `access_token` environment variable.
- [x] JSON parses successfully.

**Tests**: none
**Gate**: build
**Verify**:
`node -e "JSON.parse(require('fs').readFileSync('docs/insomnia/shopkeeper-onboarding.insomnia.json','utf8')); console.log('ok')"` prints `ok`.

---

### T16: Final Feature Gate

**What**: Run the final compile and Use Case coverage verification for the completed slice.
**Where**: project root
**Depends on**: T15
**Reuses**: `.specs/codebase/TESTING.md`
**Requirement**: PVAR-01, PVAR-02, PVAR-03, PVAR-04, PVAR-05, PVAR-06, PVAR-07, PVAR-08, PVAR-09, PVAR-10

**Tools**:
- MCP: none configured
- Skill: `tlc-spec-driven`

**Done when**:
- [x] TypeScript compiles: `npm run build`.
- [x] Use Case unit suite passes without integration tests.
- [x] New Use Cases have unit tests with mocked repositories.
- [x] Coverage report confirms the new Use Cases do not reduce the current Use Case coverage baseline.
- [x] No Use Case imports Express or Supabase SDK.

**Tests**: unit
**Gate**: build
**Verify**:
`npm run build` exits 0.
`npx jest --testMatch '**/src/useCases/**/*.spec.ts' --testPathIgnorePatterns='\\.integration\\.spec\\.ts$' --coverage --runInBand` exits 0.

---

## Parallel Execution Map

```text
Phase 1:
  T1
  |-- T2 [P]
  `-- T3 [P]

Phase 2:
  T1, T2 complete:
    |-- T4 [P]
    |-- T5 [P]
    |-- T6 [P]
    `-- T7 [P]

  T1, T2, T3 complete:
    |-- T8  [P]
    |-- T9  [P]
    |-- T10 [P]
    `-- T11 [P]

Phase 3:
  T4-T7 complete  --.
                    |-- T12 --.
  T8-T11 complete --'         |-- T14 -- T15 -- T16
                              |
  T8-T11 complete ----- T13 --'
```

---

## Requirement Traceability

| Requirement | Covered by Tasks |
| --- | --- |
| PVAR-01 | T1, T2, T4, T12, T14, T16 |
| PVAR-02 | T2, T5, T12, T14, T16 |
| PVAR-03 | T2, T6, T12, T14, T16 |
| PVAR-04 | T2, T7, T12, T14, T16 |
| PVAR-05 | T1, T3, T8, T13, T14, T16 |
| PVAR-06 | T3, T8, T9, T13, T14, T16 |
| PVAR-07 | T3, T10, T11, T13, T14, T16 |
| PVAR-08 | T8, T9, T10, T11, T13, T14, T16 |
| PVAR-09 | T15, T16 |
| PVAR-10 | T1-T14, T16 |

---

## Pre-Approval Validation

### Check 1: Task Granularity

| Task | Scope | Status |
| --- | --- | --- |
| T1 | Contract layer for two closely coupled subtables | OK |
| T2 | One Supabase repository | OK |
| T3 | One Supabase repository | OK |
| T4 | One Use Case plus co-located unit test | OK |
| T5 | One Use Case plus co-located unit test | OK |
| T6 | One Use Case plus co-located unit test | OK |
| T7 | One Use Case plus co-located unit test | OK |
| T8 | One Use Case plus co-located unit test | OK |
| T9 | One Use Case plus co-located unit test | OK |
| T10 | One Use Case plus co-located unit test | OK |
| T11 | One Use Case plus co-located unit test | OK |
| T12 | One controller adapter slice for variation handlers | OK |
| T13 | One controller adapter slice for option handlers | OK |
| T14 | One route file wiring change | OK |
| T15 | One manual testing artifact update | OK |
| T16 | One final verification gate | OK |

### Check 2: Diagram-Definition Cross-Check

| Task | Depends On (task body) | Diagram Shows | Status |
| --- | --- | --- | --- |
| T1 | None | None | OK |
| T2 | T1 | T1 -> T2 | OK |
| T3 | T1 | T1 -> T3 | OK |
| T4 | T1, T2 | T1,T2 -> T4 | OK |
| T5 | T1, T2 | T1,T2 -> T5 | OK |
| T6 | T1, T2 | T1,T2 -> T6 | OK |
| T7 | T1, T2 | T1,T2 -> T7 | OK |
| T8 | T1, T2, T3 | T1,T2,T3 -> T8 | OK |
| T9 | T1, T2, T3 | T1,T2,T3 -> T9 | OK |
| T10 | T1, T2, T3 | T1,T2,T3 -> T10 | OK |
| T11 | T1, T2, T3 | T1,T2,T3 -> T11 | OK |
| T12 | T4, T5, T6, T7 | T4-T7 -> T12 | OK |
| T13 | T8, T9, T10, T11 | T8-T11 -> T13 | OK |
| T14 | T12, T13 | T12,T13 -> T14 | OK |
| T15 | T14 | T14 -> T15 | OK |
| T16 | T15 | T15 -> T16 | OK |

### Check 3: Test Co-location Validation

| Task | Code Layer Created/Modified | Matrix Requires | Task Says | Status |
| --- | --- | --- | --- | --- |
| T1 | DTOs/repository interfaces | none | none | OK |
| T2 | Supabase repository | none | none | OK |
| T3 | Supabase repository | none | none | OK |
| T4 | Use Case | unit | unit | OK |
| T5 | Use Case | unit | unit | OK |
| T6 | Use Case | unit | unit | OK |
| T7 | Use Case | unit | unit | OK |
| T8 | Use Case | unit | unit | OK |
| T9 | Use Case | unit | unit | OK |
| T10 | Use Case | unit | unit | OK |
| T11 | Use Case | unit | unit | OK |
| T12 | Controller | optional/none in exploration | none | OK |
| T13 | Controller | optional/none in exploration | none | OK |
| T14 | Route | optional/none in exploration | none | OK |
| T15 | Docs/Insomnia | none | none | OK |
| T16 | Verification | unit | unit | OK |

---

## Tools Question Before Execute

Before execution, confirm whether to use the default tools below for every task:

- MCPs: none configured in this workspace.
- Skills: `tlc-spec-driven` for task orchestration and `codenavi` for code navigation/pattern checks.
- Shell/editing: `rg`, `sed`, `npm`, `npx jest`, and `apply_patch`.
