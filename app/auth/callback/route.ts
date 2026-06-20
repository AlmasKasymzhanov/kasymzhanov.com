import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

// OAuth callback: exchanges the ?code from Google for a Supabase session,
// sets auth cookies, then redirects back to the app.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          },
        },
      },
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Also add the signed-in user to the newsletter list (idempotent).
      // Uses the service-role client so the insert isn't blocked by RLS
      // (the subscribers table has no anon/authenticated insert policy).
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        await getSupabaseAdmin().from("subscribers").upsert(
          {
            email: user.email.toLowerCase(),
            status: "confirmed",
            source: "google",
            user_id: user.id,
          },
          { onConflict: "email", ignoreDuplicates: true },
        );
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/?auth_error=1`);
}
