import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSE, getLesson } from "@/lib/courses";
import { Masthead } from "@/components/canon/masthead";

interface Props {
  params: Promise<{ lesson: string }>;
}

export function generateStaticParams() {
  return COURSE.lessons.map((l) => ({ lesson: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lesson } = await params;
  const l = getLesson(lesson);
  return {
    title: l ? `Занятие ${l.n}. ${l.title} — ${COURSE.title}` : COURSE.title,
    robots: { index: false, follow: false },
  };
}

const TYPE_LABEL: Record<string, string> = {
  slides: "HTML",
  doc: "DOCX",
  csv: "CSV",
  zip: "ZIP",
};

// TODO: replace with a Supabase Storage signed URL once the bucket is wired + access-gated.
function fileHref() {
  return "#";
}

export default async function LessonPage({ params }: Props) {
  const { lesson } = await params;
  const l = getLesson(lesson);
  if (!l) notFound();

  const idx = COURSE.lessons.findIndex((x) => x.slug === l.slug);
  const prev = COURSE.lessons[idx - 1];
  const next = COURSE.lessons[idx + 1];

  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1000px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between gap-6 px-6 md:px-10 py-5 border-b border-[var(--color-border)]">
          <Masthead />
          <Link
            href="/courses"
            className="text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] no-underline transition-colors"
          >
            ← Все занятия
          </Link>
        </header>

        <article className="px-6 md:px-10 py-10 md:py-14">
          {/* Meta + title */}
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-3">
            [ Занятие {String(l.n).padStart(2, "0")} · {COURSE.title} ]
          </p>
          <h1 className="text-[26px] md:text-[34px] font-bold leading-[1.15] tracking-tight mb-3">
            {l.title}
          </h1>
          <p className="text-[15px] text-[var(--color-dim)] leading-relaxed max-w-2xl mb-8">
            {l.desc}
          </p>

          {/* Video */}
          <div className="aspect-video w-full border border-[var(--color-border)] overflow-hidden mb-10 bg-[var(--color-surface)]">
            {l.bunny ? (
              <iframe
                src={l.bunny}
                title={l.title}
                loading="lazy"
                className="w-full h-full"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full grid place-items-center text-center px-6">
                <div>
                  <p className="text-[13px] uppercase tracking-[0.18em] text-[var(--color-dim)]">
                    Видео скоро
                  </p>
                  <p className="text-[12px] text-[var(--color-dim)] mt-2">
                    Сюда встанет плеер Bunny Stream
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Files */}
          {l.files.length > 0 && (
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-4">
                [ Материалы ]
              </p>
              <ul className="border-t border-[var(--color-border)]">
                {l.files.map((f) => (
                  <li
                    key={f.file}
                    className="flex items-center justify-between gap-4 py-3.5 border-b border-[var(--color-border)]"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span className="shrink-0 text-[10px] font-bold tracking-wider text-[var(--color-dim)] border border-[var(--color-border)] px-1.5 py-0.5">
                        {TYPE_LABEL[f.type]}
                      </span>
                      <span className="text-[14px] text-[var(--color-text)] truncate">{f.name}</span>
                    </span>
                    <span className="flex items-center gap-3 shrink-0 text-[12px]">
                      {f.type === "slides" && (
                        <a
                          href={fileHref()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-dim)] hover:text-[var(--color-text)] no-underline"
                        >
                          Открыть
                        </a>
                      )}
                      <a
                        href={fileHref()}
                        download
                        className="font-bold text-[var(--color-text)] hover:opacity-70 no-underline"
                      >
                        Скачать ↓
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-[var(--color-dim)] mt-3">
                Файлы подключим к хранилищу (Supabase) на следующем шаге.
              </p>
            </div>
          )}
        </article>

        <div className="flex-1" aria-hidden />

        {/* Prev / next */}
        <nav className="grid grid-cols-2 border-t border-[var(--color-border)]">
          <div className="px-6 md:px-10 py-6 border-r border-[var(--color-border)]">
            {prev ? (
              <Link href={`/courses/${prev.slug}`} className="group no-underline block">
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
              <Link href={`/courses/${next.slug}`} className="group no-underline block">
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
