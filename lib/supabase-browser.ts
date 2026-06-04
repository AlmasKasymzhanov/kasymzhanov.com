import { createBrowserClient } from "@supabase/ssr";

// Browser Supabase client for auth (cookie-based session via @supabase/ssr).
// Separate from lib/supabase.ts, which is the plain client used for analytics.
export function createSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
