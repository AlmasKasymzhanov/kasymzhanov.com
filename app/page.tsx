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
} from "@/components/articles";

export const metadata: Metadata = {
  title: "Kasymzhanov — дата-журнал о маркетплейсах",
  description:
    "Разборы ниш маркетплейсов Казахстана, юнит-экономика и ошибки брендов. Данные вместо мнений.",
  alternates: {
    canonical: "/",
    languages: { "ru-RU": "/", "en-US": "/en", "x-default": "/" },
  },
};

// Refresh view counts periodically (ISR) without per-request cost.
export const revalidate = 120;

export default async function Home() {
  const [LEAD, SUB, LICK, MCP] = ARTICLES;
  const slugs = [LEAD.slug, SUB.slug, LICK.slug, MCP.slug];
  const [views, eng] = await Promise.all([getViews(slugs), getEngagement(slugs)]);
  const v = (slug: string) => views[slug] ?? 0;

  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        {/* ── Header ── */}
        <SiteHeader />

        {/* ── Front page: about (left) · flagship (center) · market+tools (right) ── */}
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,5fr)_minmax(0,3fr)] border-b border-[var(--color-border)]">
          {/* LEFT — about the author */}
          <aside className="min-w-0 md:border-r border-[var(--color-border)] p-6 md:p-7 order-2 md:order-none border-t md:border-t-0">
            <AuthorBlock variant="vertical" />
          </aside>

          {/* CENTER — lead (flagship) + sub-lead stacked, FT-style */}
          <div className="min-w-0 order-1 md:order-none flex flex-col">
            <div className="p-6 md:p-10">
              <ArticleCard a={withEngagement(LEAD, eng)} views={v(LEAD.slug)} featured />
            </div>
            <div className="p-6 md:p-10 border-t border-[var(--color-border)]">
              <ArticleCard a={withEngagement(SUB, eng)} views={v(SUB.slug)} />
            </div>
          </div>

          {/* RIGHT — market story + tools + newsletter (rail) */}
          <aside className="min-w-0 md:border-l border-[var(--color-border)] order-3 md:order-none border-t md:border-t-0 flex flex-col">
            <div className="p-6 md:p-7 border-b border-[var(--color-border)]">
              <ArticleCard a={withEngagement(LICK, eng)} views={v(LICK.slug)} />
            </div>
            <div className="p-6 md:p-7 border-b border-[var(--color-border)]">
              <CompactCard a={withEngagement(MCP, eng)} views={v(MCP.slug)} />
            </div>
            <div className="p-6 md:p-7">
              <NewsletterCard source="home" />
            </div>
          </aside>
        </section>

        <div className="flex-1" aria-hidden />

        {/* ── Footer ── */}
        <SiteFooter />
      </div>
    </div>
  );
}
