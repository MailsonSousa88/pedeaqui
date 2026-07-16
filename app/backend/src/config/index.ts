import dotenv from 'dotenv';
import path from 'path';

// Load .env from backend root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: process.env.PORT || 3000,
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
  },
};

if (!config.supabase.url || !config.supabase.anonKey) {
  console.warn('Warning: SUPABASE_URL or SUPABASE_ANON_KEY is missing from environment variables.');
}
export default config;
