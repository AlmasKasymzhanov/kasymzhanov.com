import Link from "next/link";
import type { PersonalLocale } from "@/lib/personal-locale";

function formatViews(value: number, locale: PersonalLocale) {
  if (locale === "en") return `${value.toLocaleString("en-US")} ${value === 1 ? "view" : "views"}`;
  if (locale === "kz") return `${value.toLocaleString("kk-KZ")} қаралым`;
  const lastTwo = value % 100;
  const last = value % 10;
  const label = lastTwo >= 11 && lastTwo <= 14 ? "просмотров" : last === 1 ? "просмотр" : last >= 2 && last <= 4 ? "просмотра" : "просмотров";
  return `${value.toLocaleString("ru-RU")} ${label}`;
}

export function PersonalContentRow({
  href, title, datePublished, readMin, views, locale, titleLang, languageLabel,
}: {
  href: string;
  title: string;
  datePublished: string;
  readMin: number;
  views?: number;
  locale: PersonalLocale;
  titleLang?: string;
  languageLabel?: string;
}) {
  const dateFormat = new Intl.DateTimeFormat(
    locale === "en" ? "en-US" : locale === "kz" ? "kk-KZ" : "ru-RU",
    { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" },
  );
  const minutes = locale === "en" ? `${readMin} min read` : locale === "kz" ? `${readMin} мин оқу` : `${readMin} мин чтения`;

  return (
    <Link
      href={href}
      className="personal-article-link group block rounded-[3px] py-4 no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--personal-text)]"
    >
      <span
        lang={titleLang}
        className="block text-pretty text-[17px] font-normal leading-[1.4] tracking-[-0.012em] text-[var(--personal-text)] transition-colors duration-[120ms] ease-out group-hover:text-[var(--personal-muted)] group-focus-visible:text-[var(--personal-muted)] motion-reduce:transition-none"
      >
        {title}
      </span>
      <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] leading-5 text-[var(--personal-muted)] tabular-nums">
        <time dateTime={datePublished} className="whitespace-nowrap">
          {dateFormat.format(new Date(`${datePublished}T00:00:00Z`))}
        </time>
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
          <span aria-hidden="true">·</span>
          <span>{minutes}</span>
        </span>
        {views !== undefined && (
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <span aria-hidden="true">·</span>
            <span>{formatViews(views, locale)}</span>
          </span>
        )}
        {languageLabel && (
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <span aria-hidden="true">·</span>
            <span>{languageLabel}</span>
          </span>
        )}
      </span>
    </Link>
  );
}
