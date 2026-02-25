import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Optional local workaround for corporate proxies that intercept TLS.
// Never enable this in production.
if (
  typeof window === 'undefined' &&
  process.env.NODE_ENV === 'development' &&
  process.env.ALLOW_INSECURE_LOCAL_TLS === '1'
) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url') {
    throw new Error(
      'Supabase is not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY in .env.local (or Vercel environment variables)'
    );
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}
