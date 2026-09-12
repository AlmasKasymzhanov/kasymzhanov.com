import Link from "next/link";
import Image from "next/image";
import { ARTICLES, type Article, getPublishedArticles } from "@/components/articles";
import { type Locale } from "@/lib/i18n";

function RelatedCard({ a, locale }: { a: Article; locale: Locale }) {
  return (
    <Link href={a.href} className="group block">
      <div className="relative aspect-video border border-[var(--color-border)] overflow-hidden mb-3 bg-[var(--color-surface)]">
        <Image
          src={a.img}
          alt={a.title}
          fill
          sizes="(min-width: 768px) 360px, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-brand)] mb-1.5">{a.rubric}</p>
      <h3 className="text-[15px] md:text-[16px] font-medium leading-snug text-[var(--color-text)] group-hover:text-[var(--color-brand)] transition-colors">
        {a.title}
      </h3>
    </Link>
  );
}

export function RelatedArticles({ currentSlug, locale = "ru" }: { currentSlug: string; locale?: Locale }) {
  const t = locale === "en" ? "Related" : "Читайте также";

  // Find current article rubric.
  const current = ARTICLES.find((a) => a.slug === currentSlug);
  const base = current;

  // Score: same rubric = 2, otherwise = 0. Exclude current. Take 3.
  const related = getPublishedArticles(locale)
    .filter((a) => a.slug !== currentSlug)
    .map((a) => {
      const sharedTopics = a.topics.filter((topic) => base?.topics.includes(topic)).length;
      const score = sharedTopics * 2 + (a.rubric === base?.rubric ? 1 : 0);
      return { article: a, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.article);

  if (related.length === 0) return null;

  return (
    <aside className="border-t border-[var(--color-border)] pt-10 mt-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-brand)] mb-6">[ {t} ]</p>
      <div className="grid gap-8 md:grid-cols-3">
        {related.map((a) => (
          <RelatedCard key={a.slug} a={a} locale={locale} />
        ))}
      </div>
    </aside>
  );
}
