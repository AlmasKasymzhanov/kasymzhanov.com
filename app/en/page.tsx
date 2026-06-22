import type { Metadata } from "next";
import { SiteHeader, SiteFooter, AuthorBlock } from "@/components/canon/site-chrome";
import {
  ARTICLES,
  ArticleCard,
  CompactCard,
  NewsletterCard,
  getViews,
  getEngagement,
  withEngagement,
  localizeArticle,
} from "@/components/articles";

export const metadata: Metadata = {
  title: "Kasymzhanov — Data Journalism on Marketplaces",
  description:
    "Deep dives into Kazakhstan's marketplace niches, unit economics, and where brands go wrong. Data, not opinions.",
  alternates: {
    canonical: "/en",
    languages: { "ru-RU": "/", "en-US": "/en", "x-default": "/" },
  },
  openGraph: {
    title: "Kasymzhanov — Data Journalism on Marketplaces",
    description:
      "Deep dives into Kazakhstan's marketplace niches, unit economics, and where brands go wrong. Data, not opinions.",
    url: "https://kasymzhanov.com/en",
    locale: "en_US",
  },
};

// Refresh view counts periodically (ISR) without per-request cost.
export const revalidate = 120;

const L = "en" as const;

export default async function HomeEn() {
  const [LEAD, LICK, MCP] = ARTICLES;
  const slugs = [LEAD.slug, LICK.slug, MCP.slug];
  const [views, eng] = await Promise.all([getViews(slugs), getEngagement(slugs)]);
  const v = (slug: string) => views[slug] ?? 0;
  const en = (a: typeof LEAD) => localizeArticle(withEngagement(a, eng), L);

  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        {/* ── Header ── */}
        <SiteHeader />

        {/* ── Front page: about (left) · flagship (center) · market+tools (right) ── */}
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,5fr)_minmax(0,3fr)] border-b border-[var(--color-border)]">
          {/* LEFT — about the author */}
          <aside className="min-w-0 md:border-r border-[var(--color-border)] p-6 md:p-7 order-2 md:order-none border-t md:border-t-0">
            <AuthorBlock variant="vertical" locale={L} />
          </aside>

          {/* CENTER — flagship */}
          <div className="min-w-0 p-6 md:p-10 order-1 md:order-none">
            <ArticleCard a={en(LEAD)} views={v(LEAD.slug)} featured locale={L} />
          </div>

          {/* RIGHT — market story + tools (same anatomy) */}
          <aside className="min-w-0 md:border-l border-[var(--color-border)] order-3 md:order-none border-t md:border-t-0 flex flex-col">
            <div className="p-6 md:p-7 border-b border-[var(--color-border)]">
              <ArticleCard a={en(LICK)} views={v(LICK.slug)} locale={L} />
            </div>
            <div className="p-6 md:p-7 border-b border-[var(--color-border)]">
              <CompactCard a={en(MCP)} views={v(MCP.slug)} locale={L} />
            </div>
            <div className="p-6 md:p-7">
              <NewsletterCard source="home-en" locale={L} />
            </div>
          </aside>
        </section>

        <div className="flex-1" aria-hidden />

        {/* ── Footer ── */}
        <SiteFooter locale={L} />
      </div>
    </div>
  );
}
