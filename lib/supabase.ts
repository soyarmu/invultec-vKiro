import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xkpnllrmwvnsdyjqklqn.supabase.co';

const supabasePublicApiKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  supabasePublicApiKey;

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.warn('[Supabase] NEXT_PUBLIC_SUPABASE_URL no está definida en las variables de entorno.');
}

export const supabase = createClient(supabaseUrl, supabasePublicApiKey, {
  auth: {
    persistSession: typeof window !== 'undefined',
    autoRefreshToken: typeof window !== 'undefined',
  },
});

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
