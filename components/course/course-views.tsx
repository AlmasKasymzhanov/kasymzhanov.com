import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { CourseConfig, CourseFile } from "@/lib/courses";
import { getSessionUser } from "@/lib/supabase-server";
import { ensureEnrolled } from "@/lib/enrollment";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { Masthead } from "@/components/canon/masthead";
import { CourseGate } from "@/components/course-gate";
import { CourseSignOut } from "@/components/course-signout";

const BUCKET = "course-files";

const TYPE_LABEL: Record<string, string> = {
  slides: "HTML",
  doc: "DOCX",
  csv: "CSV",
  zip: "ZIP",
  md: "MD",
};

function fileUrl(course: CourseConfig, lessonSlug: string, file: string, mode?: "inline" | "view") {
  const p = new URLSearchParams({ lesson: lessonSlug, file, course: course.id });
  if (mode === "inline") p.set("inline", "1");
  if (mode === "view") p.set("view", "1");
  return `/api/course-file?${p.toString()}`;
}

// "Открыть" target per file type, or null if it can't be previewed in-browser.
function openHref(course: CourseConfig, lessonSlug: string, f: CourseFile): string | null {
  if (f.type === "slides") return fileUrl(course, lessonSlug, f.file, "inline");
  if (f.type === "doc") return fileUrl(course, lessonSlug, f.file, "view");
  if (f.type === "md") return `${course.basePath}/${lessonSlug}/view/${encodeURIComponent(f.file)}`;
  return null;
}

function gate(course: CourseConfig) {
  return (
    <CourseGate
      title={course.title}
      tagline={course.tagline}
      description={course.gateDescription}
      next={course.basePath}
    />
  );
}

// ── Lesson list ──
export async function CourseListView({ course }: { course: CourseConfig }) {
  const user = await getSessionUser();
  if (!user?.email) return gate(course);
  await ensureEnrolled(user.email, course.id);

  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1100px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 md:px-10 py-5 border-b border-[var(--color-border)]">
          <Masthead />
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] no-underline transition-colors"
            >
              ← На сайт
            </Link>
            <CourseSignOut to={course.basePath} />
          </div>
        </header>

        <section className="px-6 md:px-10 py-10 md:py-14 border-b border-[var(--color-border)]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-3">
            [ Курс · {course.tagline} ]
          </p>
          <h1 className="text-[28px] md:text-[40px] font-bold leading-[1.1] tracking-tight">
            {course.title}
          </h1>
        </section>

        <section>
          {course.lessons.map((l) => (
            <Link
              key={l.slug}
              href={`${course.basePath}/${l.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 md:gap-x-8 px-6 md:px-10 py-6 md:py-8 border-b border-[var(--color-border)] no-underline"
            >
              <span className="text-[20px] md:text-[28px] font-bold tabular-nums text-[var(--color-dim)] group-hover:text-[var(--color-text)] transition-colors">
                {String(l.n).padStart(2, "0")}
              </span>
              <span>
                <span className="block text-[17px] md:text-[20px] font-bold leading-snug text-[var(--color-text)] group-hover:opacity-70 transition-opacity">
                  {l.title}
                </span>
                <span className="block text-[13px] text-[var(--color-dim)] mt-1 max-w-2xl leading-relaxed">
                  {l.desc}
                </span>
              </span>
              <span className="text-[18px] text-[var(--color-dim)] group-hover:text-[var(--color-text)] group-hover:translate-x-1 transition-all">
                →
              </span>
            </Link>
          ))}
        </section>

        <div className="flex-1" aria-hidden />

        <footer className="px-6 md:px-10 py-8 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] text-[var(--color-dim)]">
          <span>© 2026 akasymzhanov.com</span>
          <span>Закрытый доступ</span>
        </footer>
      </div>
    </div>
  );
}

// ── Single lesson ──
export async function CourseLessonView({
  course,
  lessonSlug,
}: {
  course: CourseConfig;
  lessonSlug: string;
}) {
  const l = course.lessons.find((x) => x.slug === lessonSlug);
  if (!l) notFound();

  const user = await getSessionUser();
  if (!user?.email) return gate(course);
  await ensureEnrolled(user.email, course.id);

  const idx = course.lessons.findIndex((x) => x.slug === l.slug);
  const prev = course.lessons[idx - 1];
  const next = course.lessons[idx + 1];

  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1000px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 md:px-10 py-5 border-b border-[var(--color-border)]">
          <Masthead />
          <div className="flex items-center gap-4">
            <Link
              href={course.basePath}
              className="text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] no-underline transition-colors"
            >
              ← Все занятия
            </Link>
            <CourseSignOut to={course.basePath} />
          </div>
        </header>

        <article className="px-6 md:px-10 py-10 md:py-14">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-3">
            [ Занятие {String(l.n).padStart(2, "0")} · {course.title} ]
          </p>
          <h1 className="text-[26px] md:text-[34px] font-bold leading-[1.15] tracking-tight mb-3">
            {l.title}
          </h1>
          <p className="text-[15px] text-[var(--color-dim)] leading-relaxed max-w-2xl mb-8">
            {l.desc}
          </p>

          {l.bunny && (
            <div className="aspect-video w-full border border-[var(--color-border)] overflow-hidden mb-10 bg-[var(--color-surface)]">
              <iframe
                src={l.bunny}
                title={l.title}
                loading="lazy"
                className="w-full h-full"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {l.files.length > 0 && (
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-4">
                [ Материалы ]
              </p>
              <ul className="border-t border-[var(--color-border)]">
                {l.files.map((f) => (
                  <li
                    key={f.file}
                    className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 py-3.5 border-b border-[var(--color-border)]"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span className="shrink-0 text-[10px] font-bold tracking-wider text-[var(--color-dim)] border border-[var(--color-border)] px-1.5 py-0.5">
                        {TYPE_LABEL[f.type]}
                      </span>
                      <span className="text-[14px] text-[var(--color-text)] break-words">{f.name}</span>
                    </span>
                    <span className="flex items-center gap-5 sm:gap-3 shrink-0 text-[12px] pl-[38px] sm:pl-0">
                      {openHref(course, l.slug, f) && (
                        <a
                          href={openHref(course, l.slug, f)!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-dim)] hover:text-[var(--color-text)] no-underline"
                        >
                          Открыть
                        </a>
                      )}
                      <a
                        href={fileUrl(course, l.slug, f.file)}
                        className="font-bold text-[var(--color-text)] hover:opacity-70 no-underline"
                      >
                        Скачать ↓
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-[var(--color-dim)] mt-3">
                «Открыть» — просмотр прямо в браузере (слайды, документы). «Скачать» — файл к себе.
              </p>
            </div>
          )}
        </article>

        <div className="flex-1" aria-hidden />

        <nav className="grid grid-cols-2 border-t border-[var(--color-border)]">
          <div className="px-6 md:px-10 py-6 border-r border-[var(--color-border)]">
            {prev ? (
              <Link href={`${course.basePath}/${prev.slug}`} className="group no-underline block">
                <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-dim)]">
                  ← Занятие {prev.n}
                </span>
                <span className="block text-[14px] font-bold text-[var(--color-text)] group-hover:opacity-70 mt-1">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span className="text-[12px] text-[var(--color-dim)]">Первое занятие</span>
            )}
          </div>
          <div className="px-6 md:px-10 py-6 text-right">
            {next ? (
              <Link href={`${course.basePath}/${next.slug}`} className="group no-underline block">
                <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-dim)]">
                  Занятие {next.n} →
                </span>
                <span className="block text-[14px] font-bold text-[var(--color-text)] group-hover:opacity-70 mt-1">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span className="text-[12px] text-[var(--color-dim)]">Последнее занятие</span>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

// ── Markdown file viewer ──
export async function CourseFileView({
  course,
  lessonSlug,
  file,
}: {
  course: CourseConfig;
  lessonSlug: string;
  file: string;
}) {
  const decoded = decodeURIComponent(file);
  const lesson = course.lessons.find((x) => x.slug === lessonSlug);
  const entry = lesson?.files.find((f) => f.file === decoded);
  if (!lesson || !entry || entry.type !== "md") notFound();

  const user = await getSessionUser();
  if (!user?.email) return gate(course);
  await ensureEnrolled(user.email, course.id);

  const admin = getSupabaseAdmin();
  const { data } = await admin.storage
    .from(BUCKET)
    .download(`${course.storagePrefix}${lesson.slug}/${entry.file}`);
  const md = data ? Buffer.from(await data.arrayBuffer()).toString("utf-8") : "";

  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[920px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 md:px-10 py-5 border-b border-[var(--color-border)]">
          <Masthead />
          <div className="flex items-center gap-4">
            <Link
              href={`${course.basePath}/${lesson.slug}`}
              className="text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] no-underline transition-colors"
            >
              ← К занятию
            </Link>
            <a
              href={fileUrl(course, lesson.slug, entry.file)}
              className="text-[12px] font-bold text-[var(--color-text)] hover:opacity-70 no-underline"
            >
              Скачать ↓
            </a>
          </div>
        </header>

        <article className="px-6 md:px-10 py-10 md:py-14 prose prose-neutral dark:prose-invert max-w-none prose-table:text-sm prose-table:block prose-table:overflow-x-auto prose-th:text-left prose-pre:text-sm prose-pre:overflow-x-auto prose-headings:tracking-tight break-words">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {md}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
