# Project Structure

**Root:** `/home/Vitor/Projetos/pedeaqui/app/backend`

## Directory Tree

```text
src/
├── config/              # Global configuration and env variables
├── infra/               
│   └── supabase/        # Supabase client initialization & integration
├── middlewares/         # Express middlewares (e.g. authMiddleware)
├── models/              # Entities and TypeScript interfaces
├── repositories/        # Database access contracts and implementations
├── useCases/            # Core business logic (Services)
├── controllers/         # HTTP request/response adapters
├── routes/              # Express route definitions
├── app.ts               # Express app setup
├── app.spec.ts          # Express root endpoint test
└── DATABASE.md          # Database design documentation
```

## Module Organization

- **Business Logic:** Placed under `src/useCases/` (strictly framework-independent).
- **Data Access:** Placed under `src/repositories/` (isolated from other layers, uses Supabase client).
- **HTTP Adapters:** Placed in `src/controllers/` and `src/routes/`.
