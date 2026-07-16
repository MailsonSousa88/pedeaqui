# External Integrations

## Backend Identity & Database

**Service:** Supabase
- **Purpose:** Database storage, real-time sync, and user authentication (signup, login, password recovery, session token generation).
- **Implementation:** Will live in `src/infra/supabase/` and repositories under `src/repositories/`.
- **Configuration:** Initialized via Supabase URL and Anon/Service Key from environment variables.
