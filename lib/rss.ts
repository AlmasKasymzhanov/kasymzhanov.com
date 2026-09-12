import { getPublishedArticles } from "@/lib/article-catalogue";
import type { Locale } from "@/lib/i18n";

const SITE = "https://kasymzhanov.com";
const escapeXml = (value: string) => value.replace(/[<>&'"]/g, char => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[char]!);
const rssDate = (date: string) => new Date(`${date}T09:00:00+05:00`).toUTCString();

/** Published catalogue only: includes public research, excludes unfinished translations. */
export function buildRss(locale: Locale) {
  const articles = getPublishedArticles(locale);
  const english = locale === "en";
  const home = english ? `${SITE}/en` : SITE;
  const feed = english ? `${SITE}/en/feed.xml` : `${SITE}/feed.xml`;
  const latest = articles.map(article => article.dateModified || article.datePublished).sort().at(-1);
  const items = articles.map(article => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${SITE}${escapeXml(article.href)}</link>
      <guid isPermaLink="true">${SITE}${escapeXml(article.href)}</guid>
      <description>${escapeXml(article.subtitle)}</description>
      <category>${escapeXml(article.rubric)}</category>
      <pubDate>${rssDate(article.datePublished)}</pubDate>
    </item>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${english ? "Almas Kasymzhanov — Blog" : "Алмас Касымжанов — Блог"}</title>
    <link>${home}</link>
    <description>${english ? "Articles and research on marketplaces, products, technology and the economy." : "Статьи и исследования о маркетплейсах, продуктах, технологиях и экономике."}</description>
    <language>${english ? "en-US" : "ru-RU"}</language>
    <atom:link href="${feed}" rel="self" type="application/rss+xml" />
    ${latest ? `<lastBuildDate>${rssDate(latest)}</lastBuildDate>` : ""}
    ${items}
  </channel>
</rss>`;
}

export function rssResponse(locale: Locale) {
  return new Response(buildRss(locale), { headers: {
    "Content-Type": "application/rss+xml; charset=utf-8",
    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  } });
}
