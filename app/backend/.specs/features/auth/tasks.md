# Authentication Tasks

**Design**: `.specs/features/auth/design.md`
**Status**: Draft

---

## Execution Plan

### Phase 1: Foundation (Sequential)
Install packages, configure dotenv, set up Supabase client, and write interfaces.

```
T1 ──→ T2 ──→ T3
```

### Phase 2: Core Implementation
Develop repositories, middlewares, and Use Cases with their mandatory unit tests.

```
          ┌──→ T4 (Repositories) ─────────┐
T3 ───────┼──→ T5 (Auth Middleware) ──────┼──→ T7 (Controller) ──→ T8 (Routes & App) ──→ T9 (Verification)
          └──→ T6 (Use Cases + Tests) ────┘
```

---

## Task Breakdown

### T1: Install Dependencies & Setup Env
- **What**: Install Supabase SDK and dotenv. Create `.env.example` and a config loader.
- **Where**: `package.json`, `.env.example`, `src/config/index.ts`
- **Depends on**: None
- **Reuses**: None
- **Requirement**: AUTH-01 to AUTH-07
- **Tools**:
  - MCP: NONE
  - Skill: NONE
- **Done when**:
  - [x] `@supabase/supabase-js` and `dotenv` are installed in `package.json`.
  - [x] `.env.example` defines `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
  - [x] `src/config/index.ts` loads and exports configurations safely.
  - [x] TypeScript compilation passes with no errors.
- **Tests**: none
- **Gate**: build

---

### T2: Setup Supabase Client
- **What**: Initialize the Supabase Client using loaded configuration variables.
- **Where**: `src/infra/supabase/supabaseClient.ts`
- **Depends on**: T1
- **Reuses**: None
- **Requirement**: AUTH-01 to AUTH-07
- **Tools**:
  - MCP: NONE
  - Skill: NONE
- **Done when**:
  - [ ] `supabaseClient.ts` creates and exports a singleton client instance.
  - [ ] Uses configurations from `src/config/index.ts`.
- **Tests**: none
- **Gate**: build

---

### T3: Create Repository Interfaces & Profile Entity
- **What**: Define the type interfaces for `Profile`, `IAuthRepository`, and `IProfileRepository`.
- **Where**: `src/models/Profile.ts`, `src/repositories/IAuthRepository.ts`, `src/repositories/IProfileRepository.ts`
- **Depends on**: T2
- **Reuses**: None
- **Requirement**: AUTH-01, AUTH-02, AUTH-03, AUTH-05, AUTH-06, AUTH-07
- **Tools**:
  - MCP: NONE
  - Skill: NONE
- **Done when**:
  - [ ] `Profile` interface is defined in `src/models/Profile.ts`.
  - [ ] `IAuthRepository` defines `signUp`, `signIn`, `signOut`, `resetPasswordForEmail`, `updateUserPassword`, and `refreshSession`.
  - [ ] `IProfileRepository` defines `create` and `findById`.
  - [ ] Code compiles with no errors.
- **Tests**: none
- **Gate**: build

---

### T4: Implement Supabase Repositories [P]
- **What**: Concretely implement both `SupabaseAuthRepository` and `SupabaseProfileRepository` using the initialized Supabase client.
- **Where**: `src/repositories/supabase/SupabaseAuthRepository.ts`, `src/repositories/supabase/SupabaseProfileRepository.ts`
- **Depends on**: T3
- **Reuses**: None
- **Requirement**: AUTH-01, AUTH-02, AUTH-03, AUTH-05, AUTH-06, AUTH-07
- **Tools**:
  - MCP: NONE
  - Skill: NONE
- **Done when**:
  - [ ] `SupabaseAuthRepository` correctly implements all methods of `IAuthRepository` utilizing Supabase Auth API.
  - [ ] `SupabaseProfileRepository` correctly implements `IProfileRepository` utilizing Supabase DB client targeting the `profiles` table.
  - [ ] Types are exported and compilation passes.
- **Tests**: none
- **Gate**: build

---

### T5: Implement Auth Middleware [P]
- **What**: Create an Express middleware that validates the Authorization Bearer token with Supabase and attaches `user` details to the request.
- **Where**: `src/middlewares/authMiddleware.ts`
- **Depends on**: T2
- **Reuses**: None
- **Requirement**: AUTH-04
- **Tools**:
  - MCP: NONE
  - Skill: NONE
- **Done when**:
  - [ ] `authMiddleware` reads the Authorization header, cleans the "Bearer " prefix.
  - [ ] Validates the token using `supabase.auth.getUser()`.
  - [ ] Returns `401 Unauthorized` for missing or invalid tokens.
  - [ ] Attaches user information (e.g. `userId`, `email`) to Express request context on success.
- **Tests**: unit
- **Gate**: quick

---

### T6: Implement Use Cases & Unit Tests [P]
- **What**: Implement Use Cases: `SignUpUseCase`, `LoginUseCase`, `LogoutUseCase`, `RecoverPasswordUseCase`, `ResetPasswordUseCase`, and `RefreshSessionUseCase`. Write unit tests with 95%+ coverage using mock repositories.
- **Where**: `src/useCases/auth/`
- **Depends on**: T3
- **Reuses**: None
- **Requirement**: AUTH-01, AUTH-02, AUTH-03, AUTH-05, AUTH-06, AUTH-07
- **Tools**:
  - MCP: NONE
  - Skill: NONE
- **Done when**:
  - [ ] All 6 use cases are fully implemented.
  - [ ] Unit tests for all Use Cases are written (mocking repositories).
  - [ ] Coverage for use cases reaches >= 95% when running `npm run test:coverage`.
- **Tests**: unit
- **Gate**: quick

---

### T7: Implement Auth Controller
- **What**: Create `AuthController` to handle HTTP requests for signup, login, logout, recover, reset, and refresh.
- **Where**: `src/controllers/AuthController.ts`
- **Depends on**: T6
- **Reuses**: None
- **Requirement**: AUTH-01 to AUTH-07
- **Tools**:
  - MCP: NONE
  - Skill: NONE
- **Done when**:
  - [ ] Controller correctly handles HTTP request payloads, validates input fields, invokes appropriate Use Cases, and returns corresponding HTTP statuses (200, 201, 204, 400, 401, 500).
- **Tests**: none
- **Gate**: build

---

### T8: Configure Router & App Integration
- **What**: Map HTTP endpoints in `src/routes/authRoutes.ts` using the AuthController and AuthMiddleware, then register the router in `src/app.ts`. Add a protected `/api/auth/me` endpoint to test route protection.
- **Where**: `src/routes/authRoutes.ts`, `src/app.ts`
- **Depends on**: T4, T5, T7
- **Reuses**: None
- **Requirement**: AUTH-01 to AUTH-07
- **Tools**:
  - MCP: NONE
  - Skill: NONE
- **Done when**:
  - [ ] Endpoints registered: `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`, `POST /api/auth/recover`, `POST /api/auth/reset-password`, `POST /api/auth/refresh`.
  - [ ] Endpoint `GET /api/auth/me` registered and protected by `authMiddleware`.
  - [ ] Router registered into the main Express application.
- **Tests**: none
- **Gate**: build

---

### T9: Setup Test Account & Verification
- **What**: Create a verification script to run signup and login tests with a test account against a real/configured database, ensuring table creation and client integration work perfectly.
- **Where**: `src/scripts/verifyAuth.ts`
- **Depends on**: T8
- **Reuses**: None
- **Requirement**: AUTH-01, AUTH-02, AUTH-07
- **Tools**:
  - MCP: NONE
  - Skill: NONE
- **Done when**:
  - [ ] Script successfully performs a manual test flow (signup -> profile created -> login -> get me).
  - [ ] Detailed logs showing the output of each request.
- **Tests**: none
- **Gate**: build

---

## Parallel Execution Map

```
Phase 1 (Sequential):
  T1 ──→ T2 ──→ T3

Phase 2 (Parallel):
  T3 complete, then:
    ├── T4 [P] (no shared mutable state, no dependencies besides T3)
    ├── T5 [P] (depends only on T2, no database writes in tests)
    └── T6 [P] (depends only on T3, uses memory mocks)

Phase 3 (Sequential):
  T4, T5, T6 complete, then:
    T7 ──→ T8 ──→ T9
```

---

## Task Granularity Check

| Task | Scope | Status |
| --- | --- | --- |
| T1: Install Dependencies | NPM commands and env files | ✅ Granular |
| T2: Setup Supabase Client | 1 singleton client file | ✅ Granular |
| T3: Create Repository Interfaces | 3 contract files | ✅ Granular |
| T4: Implement Supabase Repositories | 2 database adapter files | ✅ Granular |
| T5: Implement Auth Middleware | 1 middleware file | ✅ Granular |
| T6: Implement Use Cases & Unit Tests | Use case services & co-located tests | ✅ Granular |
| T7: Implement Auth Controller | 1 controller file | ✅ Granular |
| T8: Configure Router & App Integration | Route registry and app entrypoint wiring | ✅ Granular |
| T9: Setup Test Account & Verification | 1 test verification script | ✅ Granular |

---

## Diagram-Definition Cross-Check

| Task | Depends On (task body) | Diagram Shows | Status |
| --- | --- | --- | --- |
| T1 | None | None | ✅ Match |
| T2 | T1 | T1 → T2 | ✅ Match |
| T3 | T2 | T2 → T3 | ✅ Match |
| T4 | T3 | T3 → T4 | ✅ Match |
| T5 | T2 | T2 → T5 | ✅ Match |
| T6 | T3 | T3 → T6 | ✅ Match |
| T7 | T6 | T6 → T7 | ✅ Match |
| T8 | T4, T5, T7 | T4, T5, T7 → T8 | ✅ Match |
| T9 | T8 | T8 → T9 | ✅ Match |

---

## Test Co-location Validation

| Task | Code Layer Created/Modified | Matrix Requires | Task Says | Status |
| --- | --- | --- | --- | --- |
| T1 | Config | none | none | ✅ OK |
| T2 | Infrastructure | none | none | ✅ OK |
| T3 | Models & Contracts | none | none | ✅ OK |
| T4 | Repositories | none (optional) | none | ✅ OK |
| T5 | Middlewares | unit (optional) | unit | ✅ OK |
| T6 | Use Cases | unit (mandatory >=95%) | unit | ✅ OK |
| T7 | Controllers | none (optional) | none | ✅ OK |
| T8 | Routes & App | none (optional) | none | ✅ OK |
| T9 | Scripts | none | none | ✅ OK |

---

## Ask about MCPs and Skills

**For each task, which tools should I use?**
- **Available MCPs**: `supabase` (available on this server for DB operations like table listings)
- **Available Skills**: `codenavi` (for navigating code), `tlc-spec-driven` (for spec workflow control)
