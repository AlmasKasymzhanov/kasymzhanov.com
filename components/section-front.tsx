import type { ReactNode } from "react";
import { PersonalDocument } from "@/components/personal-document";
import { PersonalArticleList } from "@/components/personal-article-list";
import type { Article } from "@/components/articles";
import type { Locale } from "@/lib/i18n";
export function SectionFront({ locale, eyebrow, title, description, articles, children }: {
  locale: Locale; eyebrow: string; title: string; description: string; articles: Article[]; children?: ReactNode;
}) {
  return <PersonalDocument locale={locale}>
    <header className="pb-8">
      <p className="personal-kicker">{eyebrow}</p>
      <h1 className="mt-5">{title}</h1>
      <p className="mt-6 text-[var(--personal-muted)]">{description}</p>
    </header>
    <div className="border-y border-[color-mix(in_srgb,var(--personal-border)_30%,transparent)]">
      {articles.length ? <PersonalArticleList articles={articles} locale={locale} /> :
        <p className="py-8 text-[var(--personal-muted)]">{locale === "en" ? "No published articles yet." : "Здесь пока нет опубликованных материалов."}</p>}
    </div>
    {children}
  </PersonalDocument>;
}
