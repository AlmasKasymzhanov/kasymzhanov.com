import { getViews, type Article } from "@/components/articles";
import { PersonalContentRow } from "@/components/personal-content-row";
import type { Locale } from "@/lib/i18n";

export async function PersonalArticleList({ articles, locale }: { articles: Article[]; locale: Locale }) {
  const views = await getViews(articles.map((article) => article.slug));
  return <ol className="">
    {articles.map((article) => <li key={article.slug}>
      <PersonalContentRow {...article} locale={locale} views={views[article.slug]} />
    </li>)}
  </ol>;
}
