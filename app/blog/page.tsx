import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/canon/site-chrome";
import {
  ARTICLES,
  ArticleCard,
  NewsletterCard,
  getViews,
  getEngagement,
  withEngagement,
} from "@/components/articles";

export const metadata: Metadata = {
  title: "Материалы — Almas Kasymzhanov",
  description:
    "Дата-разборы рынков, брендов и инструментов. Аналитика маркетплейсов Казахстана и СНГ — данные вместо мнений.",
  alternates: { canonical: "https://kasymzhanov.com/blog" },
};

// Refresh view/engagement counts periodically (ISR).
export const revalidate = 120;

export default async function BlogPage() {
  const slugs = ARTICLES.map((a) => a.slug);
  const [views, eng] = await Promise.all([getViews(slugs), getEngagement(slugs)]);
  const v = (slug: string) => views[slug] ?? 0;

  const [lead, ...rest] = ARTICLES;

  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <SiteHeader />

        <main className="w-full max-w-[1040px] mx-auto px-6 py-12 md:py-16">
          {/* Section masthead — on a section front the section name IS the title;
              no separate colored eyebrow (that's for content pages). */}
          <header className="mb-10">
            <h1 className="text-[32px] md:text-[44px] font-bold tracking-tight text-[var(--color-text)] leading-[1.05] mb-4">
              Материалы
            </h1>
            <p className="text-[15px] md:text-[16px] text-[var(--color-dim)] leading-relaxed max-w-[640px]">
              Дата-разборы рынков, брендов и инструментов. Аналитика маркетплейсов Казахстана и СНГ - данные вместо мнений.
            </p>
          </header>

          <hr className="border-[var(--color-border)] mb-10" />

          {/* Lead story */}
          <div className="mb-14">
            <ArticleCard a={withEngagement(lead, eng)} views={v(lead.slug)} featured headingLevel="h2" />
          </div>

          {/* More stories */}
          {rest.length > 0 && (
            <>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-7">
                [ Ещё материалы ]
              </p>
              <div className="grid gap-10 md:gap-x-10 md:gap-y-12 md:grid-cols-2">
                {rest.map((a) => (
                  <ArticleCard key={a.slug} a={withEngagement(a, eng)} views={v(a.slug)} />
                ))}
              </div>
            </>
          )}

          {/* Newsletter */}
          <div className="mt-16">
            <NewsletterCard source="blog" />
          </div>
        </main>

        <div className="flex-1" aria-hidden />
        <SiteFooter />
      </div>
    </div>
  );
}
