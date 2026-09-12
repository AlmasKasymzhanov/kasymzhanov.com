import { PersonalDocument } from "@/components/personal-document";
import { PersonalArticleList } from "@/components/personal-article-list";
import { getPublishedArticles } from "@/components/articles";
import { type Locale } from "@/lib/i18n";

export function SearchResultsPage({ locale, query }: { locale: Locale; query: string }) {
  const q = query.trim().toLocaleLowerCase(locale === "en" ? "en-US" : "ru-RU");
  const matches = q
    ? getPublishedArticles(locale).filter((article) =>
        [article.title, article.subtitle, article.rubric].some((value) => value.toLocaleLowerCase(locale === "en" ? "en-US" : "ru-RU").includes(q)),
      )
    : [];
  const action = locale === "en" ? "/en/search" : "/search";
  const copy = locale === "en"
    ? { eyebrow: "Archive search", title: "Search", placeholder: "Story, company, or topic", button: "Search", empty: "Enter a query to search the editorial archive.", none: "No stories matched this query.", found: "stories found" }
    : { eyebrow: "Поиск по архиву", title: "Поиск", placeholder: "Материал, компания или тема", button: "Найти", empty: "Введите запрос, чтобы найти материал в редакционном архиве.", none: "По этому запросу материалов не найдено.", found: "материалов найдено" };

  return <PersonalDocument locale={locale}>
    <header>
      <p className="personal-kicker">{copy.eyebrow}</p>
      <h1 className="mt-5">{copy.title}</h1>
      <form action={action} method="get" className="mt-8 flex items-center gap-3 border-b border-[var(--personal-border)]">
        <label htmlFor="archive-query" className="sr-only">{copy.placeholder}</label>
        <input id="archive-query" name="q" type="search" defaultValue={query} placeholder={copy.placeholder} className="min-h-11 min-w-0 flex-1 rounded-[3px] bg-transparent py-3 text-[16px] placeholder:text-[var(--personal-muted)] focus-visible:outline-2 focus-visible:outline-offset-2" />
        <button className="min-h-11 px-3 text-[14px] text-[var(--personal-muted)] transition-colors duration-[120ms] hover:text-[var(--personal-text)]">{copy.button}</button>
      </form>
    </header>
    <section className="mt-10" aria-live="polite">
      <p className="personal-kicker mb-4">{!q ? copy.empty : matches.length ? `${matches.length} ${copy.found}` : copy.none}</p>
      <PersonalArticleList articles={matches} locale={locale} />
    </section>
  </PersonalDocument>;
}
