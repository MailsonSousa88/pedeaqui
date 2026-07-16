# Testing Infrastructure

**Last Updated:** 2026-07-15

## Test Frameworks

- **Unit/Integration:** Jest + ts-jest (v30)
- **Coverage:** Jest built-in coverage tool

## Test Organization

- **Location:** Alongside or in a structure matching source.
- **Naming:** `*.spec.ts` or `*.test.ts`.

## Active Development Phases

- **Consolidação:** onboarding e `admin-access-plans`.
- **Exploração:** módulos ainda não consolidados, salvo confirmação explícita do usuário.

## Testing Rules

### Exploration Phase

- **Use Cases:** Unit tests are **mandatory** for every created or modified Use Case. Must mock all Repositories.
- **Controllers & Routes:** Unit tests are **optional**.
- **Integration/E2E Tests:** **Prohibited** during the Exploration Phase (to ensure speed).
- **Coverage targets:** Use Cases must have **95% coverage** (Lines, Statements, Branches, Functions).

### Consolidation Phase

- **Use Cases:** unit tests are mandatory for every created or modified Use Case, with mocked repositories.
- **Repositories and database behavior:** integration tests against isolated Supabase are mandatory when RLS, RPCs, triggers, mappings, or persistence behavior changes.
- **Controllers, middleware, and routes:** HTTP integration tests with Supertest are mandatory for stabilized contracts. Focused unit tests remain required when they cover branching that is expensive or unclear through HTTP.
- **Security behavior:** authorization matrices, direct RLS attempts, audit atomicity, and session revocation must be verified with real authenticated fixtures.
- **Coverage targets:** Use Cases must maintain at least 95% in Lines, Statements, Branches, and Functions.
- **Safety:** integration helpers must reject production URLs and credentials. Tests may use `service_role` only for isolated fixture setup, assertions, and cleanup.

## Test Coverage Matrix

| Layer or Artifact | Required Test | Co-located Expectation | Parallel-Safe |
| --- | --- | --- | --- |
| Models and pure utilities | Unit | Source change includes focused spec | Yes |
| Use Cases | Unit | Source change includes co-located spec | Yes |
| Middleware | Unit | Source change includes focused middleware spec | Yes |
| Controllers | Unit for validation/error branches | Source change includes focused controller spec | Yes |
| Routes and app mounts | HTTP integration with Supertest | Wiring task includes feature integration spec | No |
| Supabase repositories | Integration with isolated Supabase | Repository task includes focused integration spec | No |
| Migrations, RLS, RPCs, triggers | Integration/SQL against isolated Supabase | Migration task includes focused security/database spec | No |
| Seed fixtures | Integration smoke after `supabase db reset` | Seed task verifies login and admin context | No |
| Runbooks and Insomnia artifacts | None automated | Validate syntax/importability and documented sequence | Yes |
| Final feature acceptance | Unit + integration + coverage + build | Final validation task executes all gates | No |

## Parallelism Assessment

- Unit-only tasks that touch different files are parallel-safe.
- Documentation tasks that touch different files are parallel-safe.
- Any task that resets, migrates, seeds, mutates, or asserts the shared Supabase test database is not parallel-safe.
- Full coverage, full integration, and build gates run sequentially.

## Test Execution

- **Run all tests:** `npm test`
- **Run with coverage:** `npm run test:coverage` (specifically validation of Use Cases)
- **Run integration:** `npm run test:integration -- --runInBand`
- **Build:** `npm run build`

## Gate Check Commands

| Gate Level | When to Use | Command |
| --- | --- | --- |
| Quick unit | Unit-only task | `npx jest <target-specs> --runInBand` |
| DB integration | Repository, migration, RLS, RPC, trigger, or seed task | `npx jest <target-integration-specs> --runInBand` |
| HTTP integration | Route/controller consolidation | `npm run test:integration -- --runInBand` |
| Coverage | After a Use Case phase and at final acceptance | `npm run test:coverage -- --runInBand` |
| Build | After a cohesive implementation phase | `npm run build` |
| Full | Final feature acceptance | targeted unit audit, integration suite, coverage, then build |
