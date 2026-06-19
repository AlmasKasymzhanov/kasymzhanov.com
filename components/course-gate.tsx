import Link from "next/link";
import { Masthead } from "@/components/canon/masthead";
import { CourseAccess } from "@/components/course-access";
import { COURSE } from "@/lib/courses";

const STREAM2_DESCRIPTION =
  "6 видео-занятий и все материалы потока: data-среда на VS Code и Claude Code, " +
  "AI-аналитика по Kaspi и Wildberries, свой дашборд за 15 минут и MCP-коннектор. " +
  "Доступ для участников второго потока — открыт навсегда, без ограничений по времени.";

// Shown when an unauthenticated visitor opens any course route. Title +
// description of what the course is, then the Google / email sign-in form.
// Defaults to Stream 2; the shared course engine passes the relevant course.
export function CourseGate({
  title = COURSE.title,
  tagline = COURSE.tagline,
  description = STREAM2_DESCRIPTION,
  next = "/courses",
}: {
  title?: string;
  tagline?: string;
  description?: string;
  next?: string;
}) {
  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1100px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 md:px-10 py-5 border-b border-[var(--color-border)]">
          <Masthead />
          <Link
            href="/"
            className="text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] no-underline transition-colors"
          >
            ← На сайт
          </Link>
        </header>

        {/* Title + description */}
        <section className="px-6 md:px-10 py-10 md:py-14 border-b border-[var(--color-border)]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-3">
            [ Закрытый курс · {tagline} ]
          </p>
          <h1 className="text-[28px] md:text-[40px] font-bold leading-[1.1] tracking-tight mb-5">
            {title}
          </h1>
          <p className="text-[15px] md:text-[16px] text-[var(--color-dim)] leading-relaxed max-w-2xl">
            {description}
          </p>
        </section>

        {/* Access form */}
        <section className="px-6 md:px-10 py-10 md:py-14">
          <CourseAccess next={next} />
        </section>

        <div className="flex-1" aria-hidden />

        {/* Footer */}
        <footer className="px-6 md:px-10 py-8 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] text-[var(--color-dim)]">
          <span>© 2026 kasymzhanov.com</span>
          <span>Закрытый доступ</span>
        </footer>
      </div>
    </div>
  );
}
