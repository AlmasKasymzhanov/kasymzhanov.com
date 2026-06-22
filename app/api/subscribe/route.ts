import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email";
import type { Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { email, source } = body;
  const locale: Locale = body.locale === "en" ? "en" : "ru";

  if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
    const error = locale === "en" ? "Enter a valid email" : "Введите корректный email";
    return NextResponse.json({ error }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const row = {
    email: email.toLowerCase().trim(),
    source: typeof source === "string" ? source : null,
    referrer: req.headers.get("referer") || null,
    user_agent: req.headers.get("user-agent") || null,
  };
  const opts = { onConflict: "email", ignoreDuplicates: true } as const;

  // Try to store the language. Fall back gracefully if the `locale` column
  // isn't there yet (run supabase/add_subscribers_locale.sql to add it).
  let { data, error } = await supabase.from("subscribers").upsert({ ...row, locale }, opts).select("id");
  if (error && /locale/i.test(error.message)) {
    ({ data, error } = await supabase.from("subscribers").upsert(row, opts).select("id"));
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // ignoreDuplicates → a returned row means this email is NEW; only then do we
  // send the welcome (best-effort; never blocks the subscription).
  if (data && data.length > 0) {
    await sendWelcomeEmail(row.email, locale);
  }

  return NextResponse.json({ ok: true });
}
