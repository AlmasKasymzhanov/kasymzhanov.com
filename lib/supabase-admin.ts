import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only admin client (secret / service_role key). Bypasses RLS.
// NEVER import this into a Client Component — it would leak the secret key.
let _admin: SupabaseClient | null = null;

export function getSupabaseAdmin() {
  if (!_admin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error("Supabase admin env vars missing");
    _admin = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _admin;
}
