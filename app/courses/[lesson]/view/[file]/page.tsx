import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { getLesson } from "@/lib/courses";
import { getSessionUser } from "@/lib/supabase-server";
import { ensureEnrolled } from "@/lib/enrollment";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { Masthead } from "@/components/canon/masthead";
import { CourseGate } from "@/components/course-gate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

interface Props {
  params: Promise<{ lesson: string; file: string }>;
}

// In-browser viewer for markdown course materials. Gated like the lesson pages;
// fetches the file from private Storage and renders it (with GFM tables).
export default async function FileViewPage({ params }: Props) {
  const { lesson: lessonSlug, file } = await params;
  const decoded = decodeURIComponent(file);
  const lesson = getLesson(lessonSlug);
  const entry = lesson?.files.find((f) => f.file === decoded);
  if (!lesson || !entry || entry.type !== "md") notFound();

  const user = await getSessionUser();
  if (!user?.email) return <CourseGate />;
  await ensureEnrolled(user.email);

  const admin = getSupabaseAdmin();
  const { data } = await admin.storage
    .from("course-files")
    .download(`${lesson.slug}/${entry.file}`);
  const md = data ? Buffer.from(await data.arrayBuffer()).toString("utf-8") : "";

  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[920px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between gap-6 px-6 md:px-10 py-5 border-b border-[var(--color-border)]">
          <Masthead />
          <div className="flex items-center gap-4">
            <Link
              href={`/courses/${lesson.slug}`}
              className="text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] no-underline transition-colors"
            >
              ← К занятию
            </Link>
            <a
              href={`/api/course-file?lesson=${lesson.slug}&file=${encodeURIComponent(entry.file)}`}
              className="text-[12px] font-bold text-[var(--color-text)] hover:opacity-70 no-underline"
            >
              Скачать ↓
            </a>
          </div>
        </header>

        {/* Document */}
        <article className="px-6 md:px-10 py-10 md:py-14 prose prose-neutral dark:prose-invert max-w-none prose-table:text-sm prose-th:text-left prose-pre:text-sm prose-headings:tracking-tight">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {md}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
