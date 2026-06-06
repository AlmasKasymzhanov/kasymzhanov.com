import Link from "next/link";
import type { Metadata } from "next";
import { COURSE } from "@/lib/courses";
import { Masthead } from "@/components/canon/masthead";
import { getSessionUser } from "@/lib/supabase-server";
import { ensureEnrolled } from "@/lib/enrollment";
import { CourseGate } from "@/components/course-gate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${COURSE.title} — A. Kasymzhanov`,
  description: "Закрытый курс: видео-занятия и материалы.",
  robots: { index: false, follow: false },
};

export default async function CoursesPage() {
  const user = await getSessionUser();
  if (!user?.email) return <CourseGate />;
  await ensureEnrolled(user.email);

  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1100px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between gap-6 px-6 md:px-10 py-5 border-b border-[var(--color-border)]">
          <Masthead />
          <Link
            href="/"
            className="text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] no-underline transition-colors"
          >
            ← На сайт
          </Link>
        </header>

        {/* Course intro */}
        <section className="px-6 md:px-10 py-10 md:py-14 border-b border-[var(--color-border)]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-3">
            [ Курс · {COURSE.tagline} ]
          </p>
          <h1 className="text-[28px] md:text-[40px] font-bold leading-[1.1] tracking-tight">
            {COURSE.title}
          </h1>
        </section>

        {/* Lessons */}
        <section>
          {COURSE.lessons.map((l) => (
            <Link
              key={l.slug}
              href={`/courses/${l.slug}`}
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

        {/* Footer */}
        <footer className="px-6 md:px-10 py-8 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] text-[var(--color-dim)]">
          <span>© 2026 akasymzhanov.com</span>
          <span>Закрытый доступ</span>
        </footer>
      </div>
    </div>
  );
}
