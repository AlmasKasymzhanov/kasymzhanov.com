import { getSupabaseAdmin } from "./supabase-admin";

// The course these site visitors get access to. Stays open for Stream 2
// participants; future courses will use their own course id and stay closed.
export const COURSE_ID = "stream-2";

function norm(email: string) {
  return email.toLowerCase().trim();
}

// Model A: any authenticated visitor is enrolled into the given course and their
// email captured into the newsletter list. Both writes go through the service key
// (bypass RLS) and are idempotent — safe to call on every authenticated visit.
export async function ensureEnrolled(email: string, course: string = COURSE_ID) {
  const admin = getSupabaseAdmin();
  const e = norm(email);

  await admin
    .from("enrollments")
    .upsert(
      { email: e, course },
      { onConflict: "email,course", ignoreDuplicates: true },
    );

  await admin
    .from("subscribers")
    .upsert(
      { email: e, source: "course" },
      { onConflict: "email", ignoreDuplicates: true },
    );
}

export async function isEnrolled(email: string, course: string = COURSE_ID) {
  const admin = getSupabaseAdmin();
  const { data } = await admin
    .from("enrollments")
    .select("id")
    .eq("email", norm(email))
    .eq("course", course)
    .maybeSingle();
  return !!data;
}
