import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase-server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { ensureEnrolled } from "@/lib/enrollment";
import { getLesson } from "@/lib/courses";

export const dynamic = "force-dynamic";

const BUCKET = "course-files";

const INLINE_CT: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

// Gated file delivery. Verifies the visitor is signed in (Model A: a signed-in
// visitor is a Stream 2 participant → enrolled) and validates the requested file
// against the course config.
//   - inline (slides "Открыть"): streamed through our domain with the correct
//     Content-Type. Supabase serves stored HTML as text/plain + nosniff (an
//     anti-XSS measure on the storage domain), so a direct signed URL would
//     show source instead of rendering the page.
//   - download: 302-redirect to a short-lived signed URL with attachment
//     disposition (Content-Type is irrelevant for a download).
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
  const ext = entry.file.slice(entry.file.lastIndexOf(".")).toLowerCase();

  if (inline) {
    const { data, error } = await admin.storage.from(BUCKET).download(path);
    if (error || !data) {
      return new NextResponse("Не удалось открыть файл", { status: 500 });
    }
    const buf = Buffer.from(await data.arrayBuffer());
    return new NextResponse(buf, {
      headers: {
        "Content-Type": INLINE_CT[ext] ?? "text/plain; charset=utf-8",
        "Content-Disposition": "inline",
        "Cache-Control": "private, no-store",
      },
    });
  }

  const downloadName = `${entry.name}${ext}`.replace(/[\\/:*?"<>|]+/g, "-");
  const { data, error } = await admin.storage
    .from(BUCKET)
    .createSignedUrl(path, 120, { download: downloadName });

  if (error || !data) {
    return new NextResponse("Не удалось получить файл", { status: 500 });
  }
  return NextResponse.redirect(data.signedUrl);
}
