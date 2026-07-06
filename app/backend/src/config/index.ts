import dotenv from 'dotenv';
import path from 'path';

// Carrega o arquivo .env localizado na raiz do backend
dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

export const config = {
  port: process.env.PORT || 3000,

  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
  },

  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },
};

// ---------- Supabase ----------

if (!config.supabase.url || !config.supabase.anonKey) {
  console.warn(
    'Warning: SUPABASE_URL or SUPABASE_ANON_KEY is missing from environment variables.'
  );
}

// ---------- Stripe ----------

if (!config.stripe.secretKey) {
  console.warn(
    'Warning: STRIPE_SECRET_KEY is missing from environment variables.'
  );
}

if (!config.stripe.webhookSecret) {
  console.warn(
    'Warning: STRIPE_WEBHOOK_SECRET is missing from environment variables.'
  );
}

export default config;