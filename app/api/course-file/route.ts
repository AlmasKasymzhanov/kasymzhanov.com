import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase-server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { ensureEnrolled } from "@/lib/enrollment";
import { getLesson } from "@/lib/courses";

export const dynamic = "force-dynamic";

const BUCKET = "course-files";

// Gated file delivery. Verifies the visitor is signed in (Model A: a signed-in
// visitor is a Stream 2 participant → enrolled), validates the requested file
// against the course config, then 302-redirects to a short-lived signed URL.
export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user?.email) {
    return NextResponse.redirect(new URL("/courses", req.url));
  }

  const { searchParams } = new URL(req.url);
  const lessonSlug = searchParams.get("lesson") ?? "";
  const file = searchParams.get("file") ?? "";
  const inline = searchParams.get("inline") === "1";

  const lesson = getLesson(lessonSlug);
  const entry = lesson?.files.find((f) => f.file === file);
  if (!lesson || !entry) {
    return new NextResponse("Файл не найден", { status: 404 });
  }

  await ensureEnrolled(user.email);

  const admin = getSupabaseAdmin();
  const path = `${lesson.slug}/${entry.file}`;
  const ext = entry.file.slice(entry.file.lastIndexOf("."));
  const downloadName = `${entry.name}${ext}`.replace(/[\\/:*?"<>|]+/g, "-");

  const { data, error } = await admin.storage
    .from(BUCKET)
    .createSignedUrl(path, 120, inline ? undefined : { download: downloadName });

  if (error || !data) {
    return new NextResponse("Не удалось получить файл", { status: 500 });
  }
  return NextResponse.redirect(data.signedUrl);
}
