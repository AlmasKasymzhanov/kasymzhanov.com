type ArticleSummary = { slug: string; datePublished: string };

export function selectPersonalArticleSections<T extends ArticleSummary>(
  articles: T[],
  views: Record<string, number>,
) {
  const chronological = [...articles].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
  const popular = chronological
    .filter((article) => Number.isFinite(views[article.slug]) && views[article.slug] > 0)
    .sort((a, b) => views[b.slug] - views[a.slug])
    .slice(0, 3);
  const popularSlugs = new Set(popular.map((article) => article.slug));
  const recent = chronological.filter((article) => !popularSlugs.has(article.slug)).slice(0, 3);

  return { popular, recent };
}
