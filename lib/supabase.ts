import { createClient } from "@supabase/supabase-js";

function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || url.startsWith("your_")) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured.");
  return url;
}

function getAnonKey() {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key || key.startsWith("your_")) throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured.");
  return key;
}

let _supabase: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (!_supabase) _supabase = createClient(getSupabaseUrl(), getAnonKey());
  return _supabase;
}

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    return (getSupabase() as any)[prop];
  },
});

export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey || serviceKey.startsWith("your_"))
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");
  return createClient(getSupabaseUrl(), serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
