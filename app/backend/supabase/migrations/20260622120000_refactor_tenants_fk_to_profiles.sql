-- Phase 1 (T1): Database Migration
-- 1. Clean up orphan tenants without a corresponding profile
DELETE FROM public.tenants
WHERE id NOT IN (SELECT id FROM public.profiles);

-- 2. Remove the current FK from tenants -> auth.users
ALTER TABLE public.tenants DROP CONSTRAINT IF EXISTS tenants_id_fkey;

-- 3. Add the new FK from tenants -> profiles with ON DELETE CASCADE
ALTER TABLE public.tenants
  ADD CONSTRAINT tenants_id_fkey
  FOREIGN KEY (id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Phase 1 (T2): Update view v_tenants_details with INNER JOIN
-- 4. Update view to use INNER JOIN instead of LEFT JOIN
CREATE OR REPLACE VIEW public.v_tenants_details AS
SELECT 
  t.id AS tenant_id,
  t.status,
  t.business_document,
  p.document AS profile_document,
  COALESCE(t.business_document, p.document) AS billing_document,
  t.photo_storage_limit,
  t.stripe_customer_id,
  t.created_at,
  t.updated_at
FROM public.tenants t
INNER JOIN public.profiles p ON t.id = p.id;
