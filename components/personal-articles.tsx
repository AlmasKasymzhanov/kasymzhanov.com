import Link from "next/link";
import { getPublishedArticles, getViews, type Article } from "@/components/articles";
import { PersonalContentRow } from "@/components/personal-content-row";
import { selectPersonalArticleSections } from "@/lib/personal-article-sections";
import type { PersonalLocale } from "@/lib/personal-locale";

const COPY = {
  ru: { title: "Статьи", popular: "популярное/", recent: "последнее/", all: "Все статьи" },
  kz: { title: "Мақалалар", popular: "танымал/", recent: "соңғы/", all: "Барлық мақалалар" },
  en: { title: "Articles", popular: "popular/", recent: "recent/", all: "All articles" },
} satisfies Record<PersonalLocale, { title: string; popular: string; recent: string; all: string }>;

export async function PersonalArticles({ locale }: { locale: PersonalLocale }) {
  const copy = COPY[locale];
  const articleLocale = locale === "en" ? "en" : "ru";
  const articles = getPublishedArticles(articleLocale).filter(
    (article) => !article.sectionOnly && article.href.includes("/blog/"),
  );
  if (articles.length === 0) return null;

  const views = await getViews(articles.map((article) => article.slug));
  const { popular, recent } = selectPersonalArticleSections(articles, views);
  const allArticlesHref = locale === "en" ? "/en/latest" : "/latest";

  function renderGroup(label: string, id: string, items: Article[]) {
    if (items.length === 0) return null;
    return (
      <div aria-labelledby={id}>
        <h3 id={id} className="pb-1 pt-6 font-mono text-[12px] font-normal leading-5 text-[var(--personal-muted)]">
          {label}
        </h3>
        <ol className="">
          {items.map((article) => (
            <li key={article.slug}>
              <PersonalContentRow
                href={article.href}
                title={article.title}
                datePublished={article.datePublished}
                readMin={article.readMin}
                views={views[article.slug]}
                locale={locale}
                titleLang={locale === "kz" ? "ru" : undefined}
              />
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <section id="articles" aria-labelledby="articles-title" className="scroll-mt-8  pb-20 pt-10">
      <h2 id="articles-title" className="text-[18px] font-normal leading-6 tracking-[-0.012em]">
        {copy.title}
      </h2>
      {renderGroup(copy.popular, "articles-popular", popular)}
      {renderGroup(copy.recent, "articles-recent", recent)}
      <Link
        href={allArticlesHref}
        className="personal-article-link mt-5 inline-flex min-h-11 items-center rounded-[3px] text-[14px] text-[var(--personal-muted)] no-underline transition-colors duration-[120ms] ease-out hover:text-[var(--personal-text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--personal-text)] motion-reduce:transition-none"
      >
        {copy.all}
      </Link>
    </section>
  );
}
