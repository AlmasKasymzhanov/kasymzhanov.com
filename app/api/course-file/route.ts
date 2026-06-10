import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase-server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { ensureEnrolled } from "@/lib/enrollment";
import { COURSE, COURSES } from "@/lib/courses";

export const dynamic = "force-dynamic";

const BUCKET = "course-files";

// Resolve the course config from the ?course= param. Default (no param) is
// Stream 2, whose files live at the bucket root with no storage prefix.
function resolveCourse(id: string | null) {
  if (id && COURSES[id]) {
    const c = COURSES[id];
    return { id: c.id, prefix: c.storagePrefix, lessons: c.lessons };
  }
  return { id: "stream-2", prefix: "", lessons: COURSE.lessons };
}

// Gated file delivery. Verifies the visitor is signed in (Model A: a signed-in
// visitor is a Stream 2 participant → enrolled) and validates the request
// against the course config.
//   - inline (html slides): streamed through our domain with the correct
//     Content-Type so it renders. Supabase serves stored HTML as text/plain +
//     nosniff (anti-XSS on the storage domain), so a direct signed URL shows
//     source instead of the page. (Markdown is rendered by a separate page.)
//   - view (docx): redirect to the Microsoft Office Online viewer with a
//     short-lived signed URL, so the document opens in the browser.
//   - download: redirect to a signed URL with attachment disposition.
export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user?.email) {
    return NextResponse.redirect(new URL("/courses", req.url));
  }

  const { searchParams } = new URL(req.url);
  const lessonSlug = searchParams.get("lesson") ?? "";
  const file = searchParams.get("file") ?? "";
  const inline = searchParams.get("inline") === "1";
  const view = searchParams.get("view") === "1";

  const course = resolveCourse(searchParams.get("course"));
  const lesson = course.lessons.find((l) => l.slug === lessonSlug);
  const entry = lesson?.files.find((f) => f.file === file);
  if (!lesson || !entry) {
    return new NextResponse("Файл не найден", { status: 404 });
  }

  await ensureEnrolled(user.email, course.id);

  const admin = getSupabaseAdmin();
  const path = `${course.prefix}${lesson.slug}/${entry.file}`;
  const ext = entry.file.slice(entry.file.lastIndexOf(".")).toLowerCase();

  // Open a docx in the Office Online viewer.
  if (view) {
    const { data, error } = await admin.storage.from(BUCKET).createSignedUrl(path, 600);
    if (error || !data) {
      return new NextResponse("Не удалось открыть файл", { status: 500 });
    }
    const viewer = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
      data.signedUrl,
    )}`;
    return NextResponse.redirect(viewer);
  }

  // Render an HTML slide inline through our own domain.
  if (inline) {
    const { data, error } = await admin.storage.from(BUCKET).download(path);
    if (error || !data) {
      return new NextResponse("Не удалось открыть файл", { status: 500 });
    }
    const buf = Buffer.from(await data.arrayBuffer());
    return new NextResponse(buf, {
      headers: {
        "Content-Type": ext === ".html" ? "text/html; charset=utf-8" : "text/plain; charset=utf-8",
        "Content-Disposition": "inline",
        "Cache-Control": "private, no-store",
      },
    });
  }

  // Download with attachment disposition.
  const downloadName = `${entry.name}${ext}`.replace(/[\\/:*?"<>|]+/g, "-");
  const { data, error } = await admin.storage
    .from(BUCKET)
    .createSignedUrl(path, 120, { download: downloadName });

  if (error || !data) {
    return new NextResponse("Не удалось получить файл", { status: 500 });
  }
  return NextResponse.redirect(data.signedUrl);
}
