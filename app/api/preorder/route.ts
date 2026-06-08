import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STREAM = "stream-4";

// Pre-registration ("предзапись") for Stream 4. Writes phone + email to the
// private `waitlist` table via the service key (RLS-protected, server-only),
// and also captures the email into the newsletter list.
export async function POST(req: NextRequest) {
  const { phone, email } = await req.json().catch(() => ({}));

  const e = typeof email === "string" ? email.trim().toLowerCase() : "";
  const p = typeof phone === "string" ? phone.trim() : "";
  const digits = p.replace(/\D/g, "");

  if (!EMAIL_RE.test(e)) {
    return NextResponse.json({ error: "Введите корректный email" }, { status: 400 });
  }
  if (digits.length < 10) {
    return NextResponse.json({ error: "Введите корректный номер телефона" }, { status: 400 });
  }

  const admin = getSupabaseAdmin();

  const { error } = await admin.from("waitlist").upsert(
    {
      phone: p,
      email: e,
      stream: STREAM,
      referrer: req.headers.get("referer") || null,
      user_agent: req.headers.get("user-agent") || null,
    },
    { onConflict: "email,stream" },
  );
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Capture the email into the newsletter list too (idempotent).
  await admin
    .from("subscribers")
    .upsert({ email: e, source: "preorder-stream-4" }, { onConflict: "email", ignoreDuplicates: true });

  return NextResponse.json({ ok: true });
}
