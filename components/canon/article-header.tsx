import Link from "next/link";
import { type Locale, dict } from "@/lib/i18n";
import { ARTICLES, localizeArticle } from "@/lib/article-catalogue";
import { MaterialViews } from "@/components/engagement/material-views";

export type ArticleHeaderProps = {
  kicker: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  slug: string;
  date: string;
  readMin: number;
  /** Kept for article metadata compatibility. Covers are not rendered by default. */
  hero?: { src: string; alt: string; credit: string; width?: number; height?: number };
  locale?: Locale;
};

export function ArticleHeader({
  kicker,
  title,
  subtitle,
  date,
  readMin,
  slug,
  locale = "ru",
}: ArticleHeaderProps) {
  const t = dict[locale];
  const allArticlesHref = locale === "en" ? "/en/latest" : "/latest";
  const entry = ARTICLES.find((article) => article.slug === slug);
  const metadata = entry ? localizeArticle(entry, locale) : undefined;
  const published = metadata?.datePublished;
  const displayDate = published ? new Intl.DateTimeFormat(locale === "en" ? "en-US" : "ru-RU", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${published}T00:00:00Z`)) : date;

  return (
    <header className="reading-header">
      <Link
        href={allArticlesHref}
        className="personal-article-link inline-flex font-mono text-[12px] leading-4 text-[var(--personal-muted)] no-underline transition-colors hover:text-[var(--personal-text)]"
      >
        {kicker}
      </Link>

      <h1 className="mt-5 text-balance font-heading text-[38px] font-normal leading-[1.06] tracking-[-0.03em] text-[var(--personal-text)] sm:text-[44px] md:text-[48px]">
        {locale === "en" && !entry?.enReady ? title : metadata?.title ?? title}
      </h1>

      <p className="mt-6 max-w-[680px] text-pretty text-[17px] leading-[1.65] text-[var(--personal-muted)] md:text-[18px]">
        {subtitle}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[12px] leading-4 text-[var(--personal-muted)]">
        <Link href={locale === "en" ? "/en#about" : "/#about"} className="reading-author">{t.name}</Link>
        <span aria-hidden>·</span>
        <time dateTime={published}>{displayDate}</time>
        <span aria-hidden>·</span>
        <span>{t.minRead(metadata?.readMin ?? readMin)}</span>
        <MaterialViews slug={slug} inline />
      </div>
    </header>
  );
}
