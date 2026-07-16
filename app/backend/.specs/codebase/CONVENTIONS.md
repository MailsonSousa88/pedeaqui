# Code Conventions

## Naming Conventions

**Files:**
- Use camelCase or kebab-case. 
- Example: `app.ts`, `app.spec.ts`.

**Folders:**
- Use camelCase (e.g., `useCases`, `controllers`, `middlewares`).

**Functions/Methods & Variables:**
- Use camelCase.
- Example: `createProfile`, `userId`.

**Classes & Interfaces:**
- Use PascalCase.
- Example: `IUserRepository`, `CreateUserUseCase`.

## Code Organization

**Imports:**
- Group external packages first, then internal modules.
- Ensure TypeScript path aliases are used if configured (otherwise relative paths).

## Type Safety

- TypeScript is used strictly. Avoid using `any` wherever possible.
- Interface declarations should be placed in `src/models/` or in the contract definition files.

## Error Handling

- Propagate errors from Repositories and Use Cases.
- Use explicit error classes where applicable (e.g., `ValidationError`, `NotFoundError`).
- Controllers should capture errors and map them to appropriate HTTP Status Codes (e.g., 400, 404, 500).
