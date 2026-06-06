import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Cookie-based server client for reading the auth session in Server Components,
// route handlers, and middleware. Uses the public (anon/publishable) key.
export async function createSupabaseServer() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component render — cookies are read-only here.
            // The middleware refreshes the session, so this is safe to ignore.
          }
        },
      },
    },
  );
}

export async function getSessionUser() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
