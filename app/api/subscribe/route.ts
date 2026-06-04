import { getSupabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const { email, source } = await req.json().catch(() => ({}));

  if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Введите корректный email" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { error } = await supabase.from("subscribers").upsert(
    {
      email: email.toLowerCase().trim(),
      source: typeof source === "string" ? source : null,
      referrer: req.headers.get("referer") || null,
      user_agent: req.headers.get("user-agent") || null,
    },
    { onConflict: "email", ignoreDuplicates: true },
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
