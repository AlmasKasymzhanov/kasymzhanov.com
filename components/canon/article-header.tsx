import Image from "next/image";
import { ViewCounter } from "@/components/view-counter";
import { EngagementBar } from "@/components/engagement/engagement-bar";

// Canonical article header: kicker → headline → dek → author byline (left) +
// reading meta & engagement bar (right) → hero + credit.
// Must be rendered inside an <EngagementProvider> (provides the bar's data).
// Used by every article page so the layout stays consistent.

function ArticleAvatar({ size = 44 }: { size?: number }) {
  return (
    <span
      className="relative block rounded-full overflow-hidden border border-[var(--color-border)] shrink-0"
      style={{ width: size, height: size }}
    >
      <Image src="/avatar/almas.webp" alt="Алмас Касымжанов" fill sizes={`${size}px`} className="object-cover object-[center_25%]" />
    </span>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9998 3.50009C7.30592 3.50009 3.49976 7.30536 3.49976 12.0001C3.49976 16.6939 7.30597 20.5001 11.9998 20.5001C16.6945 20.5001 20.4998 16.6939 20.4998 12.0001C20.4998 7.30531 16.6945 3.50009 11.9998 3.50009ZM1.99976 12.0001C1.99976 6.47682 6.4776 2.00009 11.9998 2.00009C17.523 2.00009 21.9998 6.47688 21.9998 12.0001C21.9998 17.5223 17.523 22.0001 11.9998 22.0001C6.47754 22.0001 1.99976 17.5223 1.99976 12.0001Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.6606 7.09619C12.0749 7.09619 12.4106 7.43198 12.4106 7.84619V11.9553L16.2029 12.0173C16.6171 12.0241 16.9473 12.3653 16.9405 12.7794C16.9338 13.1936 16.5926 13.5239 16.1784 13.5171L11.6484 13.4431C11.239 13.4364 10.9106 13.1026 10.9106 12.6932V7.84619C10.9106 7.43198 11.2464 7.09619 11.6606 7.09619Z" />
    </svg>
  );
}

export type ArticleHeaderProps = {
  kicker: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  slug: string;
  date: string;
  readMin: number;
  hero: { src: string; alt: string; credit: string; width?: number; height?: number };
};

export function ArticleHeader({ kicker, title, subtitle, slug, date, readMin, hero }: ArticleHeaderProps) {
  return (
    <>
      <header className="mb-10">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-brand)] mb-4">{kicker}</p>
        <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight text-[var(--color-text)] leading-[1.15] mb-5">{title}</h1>
        <p className="text-[15px] md:text-[17px] text-[var(--color-dim)] leading-relaxed mb-7">{subtitle}</p>

        {/* Byline: author (left) — reading meta + engagement (right) */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div className="flex items-center gap-3">
            <ArticleAvatar size={44} />
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-[var(--color-text)] leading-tight">Алмас Касымжанов</p>
              <p className="mt-1 text-[11px] text-[var(--color-dim)]">{date}</p>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-2.5">
            <div className="flex flex-wrap items-center gap-x-1.5 text-[11px] text-[var(--color-dim)]">
              <span className="inline-flex items-center gap-1">
                <ClockIcon /> {readMin} мин
              </span>
              <span aria-hidden>·</span>
              <ViewCounter slug={slug} />
            </div>
            <EngagementBar className="sm:justify-end" />
          </div>
        </div>
      </header>

      {/* Hero illustration */}
      <figure className="mb-12">
        <div className="border border-[var(--color-border)] overflow-hidden">
          <Image
            src={hero.src}
            alt={hero.alt}
            width={hero.width ?? 1200}
            height={hero.height ?? 800}
            priority
            className="w-full h-auto"
          />
        </div>
        <figcaption className="text-right text-[11px] text-[var(--color-dim)] mt-2">{hero.credit}</figcaption>
      </figure>
    </>
  );
}
