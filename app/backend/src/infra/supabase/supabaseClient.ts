import { createClient } from '@supabase/supabase-js';
import config from '../../config';

if (!config.supabase.url || !config.supabase.anonKey) {
  throw new Error('Missing Supabase environment variables: SUPABASE_URL and SUPABASE_ANON_KEY');
}

export const supabase = createClient(config.supabase.url, config.supabase.anonKey);

export const createAuthenticatedSupabaseClient = (accessToken: string) =>
  createClient(config.supabase.url, config.supabase.anonKey, {
    accessToken: async () => accessToken,
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

export default supabase;
