-- MIGRATION: Torna plan_id nullable em subscriptions
-- Justificativa: Suportar subscriptions de trial automático criadas no onboarding
-- do lojista (RegisterTenantUseCase), antes de o usuário selecionar um plano pago.
-- O plan_id só se torna obrigatório quando o trial é convertido em assinatura real.

ALTER TABLE public.subscriptions
  ALTER COLUMN plan_id DROP NOT NULL;
