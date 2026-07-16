# Codebase Concerns

## 1. Missing Dependencies

**Risk:** High
**Evidence:** `package.json` does not include `@supabase/supabase-js` or `dotenv`.
**Impact:** We cannot write database access code or load environment variables.
**Fix:** Install `@supabase/supabase-js` and `dotenv`.

## 2. No Database Connection configuration

**Risk:** Medium
**Evidence:** `src/infra/supabase/` is empty except for `.gitkeep`.
**Impact:** No Supabase client instance exists to connect with the backend.
**Fix:** Initialize the Supabase client inside `src/infra/supabase/supabaseClient.ts` using environment variables.
