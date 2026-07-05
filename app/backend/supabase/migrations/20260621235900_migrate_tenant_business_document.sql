-- 1. Rename column
ALTER TABLE public.tenants RENAME COLUMN cpf_cnpj TO business_document;

-- 2. Drop NOT NULL constraint
ALTER TABLE public.tenants ALTER COLUMN business_document DROP NOT NULL;

-- 3. Clean up legacy CPF records in the tenants table (set to NULL if it's 11 digits)
-- Since they will now fallback to the Profile's document
UPDATE public.tenants
SET business_document = NULL
WHERE length(business_document) = 11;

-- 4. Add Check constraint to ensure business_document is exactly 14 digits (CNPJ)
ALTER TABLE public.tenants ADD CONSTRAINT check_business_document_length
  CHECK (business_document IS NULL OR length(business_document) = 14);

-- 5. Create View for Fallback (Opção B)
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
LEFT JOIN public.profiles p ON t.id = p.id;
