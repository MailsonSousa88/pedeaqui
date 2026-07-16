# Architecture

**Pattern:** Clean Architecture

## High-Level Structure

The system is organized into layers to isolate the business logic from details of infrastructure:

```
Route -> Middleware -> Controller -> Use Case (Service) -> Repository -> Supabase Client
```

## Identified Patterns

### 1. Routes (Infrastructure/Framework)
- **Location:** `src/routes/`
- **Purpose:** Define HTTP endpoints and bind middlewares. No business logic.

### 2. Controllers (Interface Adapters)
- **Location:** `src/controllers/`
- **Purpose:** Adapt HTTP requests into Use Case inputs, invoke the Use Case, and shape the HTTP response.

### 3. Use Cases / Services (Application Business Rules)
- **Location:** `src/useCases/`
- **Purpose:** Contain application-specific business rules. They don't know about HTTP or Supabase SDK. They depend on repositories through interfaces (Dependency Inversion).

### 4. Repositories (Data Access Adapters)
- **Location:** `src/repositories/`
- **Purpose:** Interface with Supabase to persist and fetch data. Map database models to domain models.

### 5. Models / Entities (Enterprise Business Rules)
- **Location:** `src/models/`
- **Purpose:** Domain objects, types, and enterprise logic. Independent of external libraries.

## Data Flow

### Request Flow
1. Client makes HTTP request to a route.
2. Route runs authentication middleware to extract and validate Supabase token.
3. Controller extracts request payload (body, query, parameters).
4. Controller invokes Use Case with structured data.
5. Use Case coordinates repositories to process domain logic.
6. Repository runs queries against Supabase.
7. Controller formats and returns HTTP response.
