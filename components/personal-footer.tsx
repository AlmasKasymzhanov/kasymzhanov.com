import Link from "next/link";
import type { PersonalLocale } from "@/lib/personal-locale";

const COPY = {
  ru: {
    entity: "ИП «КАСЫМЖАНОВ А.Ж.»",
    id: "ИИН 930422350609",
    privacy: "Конфиденциальность",
    terms: "Оферта",
    navigation: "Правовая информация",
  },
  kz: {
    entity: "ИП «КАСЫМЖАНОВ А.Ж.»",
    id: "ИИН 930422350609",
    privacy: "Құпиялық саясаты",
    terms: "Оферта",
    navigation: "Құқықтық ақпарат",
  },
  en: {
    entity: "Sole proprietorship “A.Zh. Kasymzhanov”",
    id: "IIN 930422350609",
    privacy: "Privacy Policy",
    terms: "Terms",
    navigation: "Legal information",
  },
} satisfies Record<
  PersonalLocale,
  {
    entity: string;
    id: string;
    privacy: string;
    terms: string;
    navigation: string;
  }
>;

export function PersonalFooter({ locale }: { locale: PersonalLocale }) {
  const copy = COPY[locale];
  const linkClassName = "inline-flex min-h-11 w-fit items-center rounded-md text-[12px] no-underline transition-colors duration-[120ms] ease-out hover:text-[var(--personal-text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--personal-text)] sm:min-h-6 motion-reduce:transition-none";

  return (
    <footer className="pb-3 pt-7 text-[12px] font-normal leading-[1.65] text-[var(--personal-muted)]">
      <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div className="flex min-w-0 flex-col gap-1 text-[12px] leading-5">
          <span>© 2026 kasymzhanov.com</span>
          <span>{copy.entity} · {copy.id}</span>
          <a
            href="mailto:almas@kasymzhanov.com"
            className={linkClassName}
          >
            almas@kasymzhanov.com
          </a>
        </div>

        <nav aria-label={copy.navigation} className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href={locale === "en" ? "/en/feed.xml" : "/feed.xml"} className={linkClassName} type="application/rss+xml">RSS</a>
          <Link
            href="/privacy"
            className={linkClassName}
          >
            {copy.privacy}
          </Link>
          <Link
            href="/terms"
            className={linkClassName}
          >
            {copy.terms}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
