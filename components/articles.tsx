import Image from "next/image";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";
import { SubscribeForm } from "@/components/subscribe-form";
import { SOCIAL_SAMEAS } from "@/lib/social";
import { type Locale, dict, bcp47 } from "@/lib/i18n";

const SITE = "https://kasymzhanov.com";

/*
 * Single source of truth for the publication's articles + the canon preview
 * cards (Bloomberg / FT / Rest of World anatomy: cover → rubric → headline →
 * dek → byline → engagement). Shared by the home front page and the /blog hub
 * so the two never drift. Articles are listed newest-first.
 *
 * HOW TO ADD AN ARTICLE (one way, no MDX/CMS):
 *   1. Create the page  app/blog/<slug>/page.tsx  — copy an existing article
 *      (e.g. nvidia-kazakhstan) for the canon shell: SiteHeader → ArticleHeader
 *      → EngagementProvider → body → AuthorBlock → SiteFooter.
 *   2. Create  app/blog/<slug>/layout.tsx  (copy nvidia-kazakhstan's): per-article
 *      metadata — title/description, alternates.canonical, openGraph+twitter
 *      (with images), and <ArticleJsonLd slug=... description=...> for NewsArticle.
 *   3. Drop the cover into  public/blog/<slug>/  (webp).
 *   4. Prepend an entry to ARTICLES below (newest-first, with datePublished ISO).
 *      That surfaces it on the home front page and the /blog hub automatically.
 */

export * from "@/lib/article-catalogue";
import { ARTICLES, localizeArticle, type Article } from "@/lib/article-catalogue";

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9998 3.50009C7.30592 3.50009 3.49976 7.30536 3.49976 12.0001C3.49976 16.6939 7.30597 20.5001 11.9998 20.5001C16.6945 20.5001 20.4998 16.6939 20.4998 12.0001C20.4998 7.30531 16.6945 3.50009 11.9998 3.50009ZM1.99976 12.0001C1.99976 6.47682 6.4776 2.00009 11.9998 2.00009C17.523 2.00009 21.9998 6.47688 21.9998 12.0001C21.9998 17.5223 17.523 22.0001 11.9998 22.0001C6.47754 22.0001 1.99976 17.5223 1.99976 12.0001Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.6606 7.09619C12.0749 7.09619 12.4106 7.43198 12.4106 7.84619V11.9553L16.2029 12.0173C16.6171 12.0241 16.9473 12.3653 16.9405 12.7794C16.9338 13.1936 16.5926 13.5239 16.1784 13.5171L11.6484 13.4431C11.239 13.4364 10.9106 13.1026 10.9106 12.6932V7.84619C10.9106 7.43198 11.2464 7.09619 11.6606 7.09619Z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        transform="translate(2 4)"
        d="M10.0029,0.0005 C14.1389,0.0035 17.8529,2.9025 19.9389,7.7565 C20.0209,7.9455 20.0209,8.1595 19.9389,8.3485 C17.8539,13.2035 14.1389,16.1025 10.0029,16.1055 L9.9969,16.1055 C5.8609,16.1025 2.1469,13.2035 0.0609,8.3485 C-0.0201,8.1595 -0.0201,7.9455 0.0609,7.7565 C2.1469,2.9025 5.8619,0.0035 9.9969,0.0005 L10.0029,0.0005 Z M9.9999,1.5005 C6.5639,1.5015 3.4299,3.9445 1.5699,8.0525 C3.4299,12.1615 6.5629,14.6045 9.9999,14.6055 C13.4369,14.6045 16.5699,12.1615 18.4299,8.0525 C16.5699,3.9445 13.4369,1.5015 9.9999,1.5005 Z M9.9996,4.1413 C12.1566,4.1413 13.9116,5.8963 13.9116,8.0533 C13.9116,10.2093 12.1566,11.9633 9.9996,11.9633 C7.8426,11.9633 6.0886,10.2093 6.0886,8.0533 C6.0886,5.8963 7.8426,4.1413 9.9996,4.1413 Z M9.9996,5.6413 C8.6696,5.6413 7.5886,6.7233 7.5886,8.0533 C7.5886,9.3823 8.6696,10.4633 9.9996,10.4633 C11.3296,10.4633 12.4116,9.3823 12.4116,8.0533 C12.4116,6.7233 11.3296,5.6413 9.9996,5.6413 Z"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.0033 21.0205C11.8939 21.0202 11.7858 20.9964 11.6863 20.9505C11.3863 20.8095 4.29335 17.4455 2.63735 12.1375C1.55935 8.77853 2.75835 4.54453 6.63735 3.28453C7.61677 2.97869 8.65442 2.90778 9.66634 3.07753C10.5181 3.27148 11.3163 3.65195 12.0033 4.19153C12.6897 3.64609 13.4902 3.26256 14.3453 3.06953C15.357 2.89992 16.3946 2.97327 17.3723 3.28353C21.2453 4.53153 22.4414 8.76753 21.3594 12.1425C19.6033 17.5055 12.6173 20.8115 12.3213 20.9495C12.2217 20.9958 12.1132 21.02 12.0033 21.0205ZM8.58434 4.48753C8.07879 4.48726 7.57611 4.56346 7.09334 4.71353C4.00334 5.71853 3.22834 9.05553 4.07134 11.6855C5.35034 15.7855 10.6493 18.7345 12.0073 19.4325C13.3533 18.7395 18.5804 15.8185 19.9354 11.6805C20.7794 9.04953 20.0083 5.70953 16.9163 4.71253C16.167 4.47419 15.3717 4.41797 14.5963 4.54853C13.8072 4.78105 13.0776 5.18116 12.4573 5.72153C12.3275 5.81889 12.1696 5.87153 12.0073 5.87153C11.8451 5.87153 11.6872 5.81889 11.5573 5.72153C10.9347 5.18246 10.203 4.78407 9.41234 4.55353C9.13862 4.50882 8.86168 4.48675 8.58434 4.48753Z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.3343 18.8279L11.7558 20.2494C12.3338 20.8273 13.2688 20.8273 13.8458 20.2494L15.2682 18.8279C15.673 18.4231 16.2218 18.1964 16.7939 18.1964H17.8622C20.0378 18.1964 21.8008 16.4324 21.8008 14.2568V7.34094C21.8008 5.16537 20.0378 3.40234 17.8622 3.40234H7.74035C5.56478 3.40234 3.80078 5.16537 3.80078 7.34094V14.2568C3.80078 16.4324 5.56478 18.1964 7.74035 18.1964" />
      <path d="M16.8076 10.8066V10.8764M17.0905 10.8216C17.0905 10.9787 16.963 11.1061 16.8059 11.1061C16.6488 11.1061 16.5215 10.9787 16.5215 10.8216C16.5215 10.6645 16.6488 10.5371 16.8059 10.5371C16.963 10.5371 17.0905 10.6645 17.0905 10.8216Z" />
      <path d="M12.8018 10.8066V10.8764M13.0846 10.8216C13.0846 10.9787 12.9572 11.1061 12.8 11.1061C12.6429 11.1061 12.5156 10.9787 12.5156 10.8216C12.5156 10.6645 12.6429 10.5371 12.8 10.5371C12.9572 10.5371 13.0846 10.6645 13.0846 10.8216Z" />
      <path d="M8.79593 10.8066V10.8764M9.07879 10.8216C9.07879 10.9787 8.95131 11.1061 8.79419 11.1061C8.63707 11.1061 8.50977 10.9787 8.50977 10.8216C8.50977 10.6645 8.63707 10.5371 8.79419 10.5371C8.95131 10.5371 9.07879 10.6645 9.07879 10.8216Z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.1206 3.5H8.01633C5.24061 3.5 3.5 5.46539 3.5 8.24678V15.7532C3.5 18.5346 5.23211 20.5 8.01633 20.5H15.9818C18.7669 20.5 20.5 18.5346 20.5 15.7532V14.1089" />
      <path d="M20.4997 8.07394V3.5M20.4997 3.5H15.9258M20.4997 3.5L13.3691 10.6306" />
    </svg>
  );
}

function CodeIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.43313 8.305C7.69829 8.62322 7.65527 9.09614 7.33705 9.3613L4.1715 11.999L7.33713 14.6375C7.65532 14.9027 7.69826 15.3757 7.43306 15.6939C7.16785 16.012 6.69492 16.055 6.37674 15.7898L2.5198 12.575C2.34883 12.4325 2.24998 12.2214 2.25 11.9988C2.25002 11.7763 2.34889 11.5652 2.51989 11.4227L6.37683 8.20892C6.69505 7.94376 7.16797 7.98678 7.43313 8.305Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16.5669 8.30505C16.8321 7.98683 17.305 7.94381 17.6232 8.20897L21.4801 11.4228C21.6511 11.5652 21.75 11.7763 21.75 11.9989C21.75 12.2215 21.6512 12.4326 21.4802 12.5751L17.6233 15.7898C17.3051 16.055 16.8322 16.0121 16.567 15.6939C16.3018 15.3757 16.3447 14.9028 16.6629 14.6376L19.8285 11.999L16.663 9.36135C16.3448 9.09619 16.3017 8.62327 16.5669 8.30505Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M14.8277 4.22338C15.217 4.36494 15.4178 4.79526 15.2763 5.18454L10.133 19.3279C9.99147 19.7172 9.56114 19.918 9.17187 19.7765C8.78259 19.6349 8.58178 19.2046 8.72334 18.8153L13.8666 4.67191C14.0081 4.28263 14.4385 4.08182 14.8277 4.22338Z" />
    </svg>
  );
}

const RUBRIC_ICONS: Record<string, ({ size }: { size?: number }) => React.ReactElement> = {
  Инструменты: CodeIcon,
  Tools: CodeIcon,
};

/* ───────── building blocks ───────── */
function MetaItem({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1 text-[var(--color-dim)] tabular-nums">{children}</span>;
}

function ActionPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-text)]/20 px-2.5 py-1 text-[11px] text-[var(--color-dim)] tabular-nums">
      {children}
    </span>
  );
}

function Rubric({ a, size = "sm" }: { a: Article; size?: "sm" | "md" }) {
  const Icon = RUBRIC_ICONS[a.rubric];
  return (
    <p className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-[0.1em] text-[var(--color-brand)] mb-2 ${size === "md" ? "text-[12px]" : "text-[11px]"}`}>
      {Icon && <Icon size={size === "md" ? 19 : 18} />}
      {a.rubric}
    </p>
  );
}

function AuthorAvatar({ size, locale = "ru" }: { size: number; locale?: Locale }) {
  return (
    <span className="relative block rounded-full overflow-hidden border border-[var(--color-border)] shrink-0" style={{ width: size, height: size }}>
      <Image src="/avatar/almas.webp" alt={dict[locale].name} fill sizes={`${size}px`} className="object-cover object-[center_25%]" />
    </span>
  );
}

function BylineRow({ a, className = "", locale = "ru" }: { a: Article; views?: number; avatar?: number; className?: string; locale?: Locale }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.04em] text-[var(--color-dim)] ${className}`}>
      <span>{locale === "en" ? "By" : "Автор"} {dict[locale].name}</span>
      <span aria-hidden>·</span>
      <time dateTime={a.datePublished}>{a.date}</time>
      <span aria-hidden>·</span>
      <MetaItem><ClockIcon /> {dict[locale].minRead(a.readMin)}</MetaItem>
    </div>
  );
}

function ActionRow({ a, className = "", locale = "ru" }: { a: Article; className?: string; locale?: Locale }) {
  const fmt = (n: number) => n.toLocaleString(bcp47[locale]);
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <ActionPill>
        <HeartIcon /> {fmt(a.likes)}
      </ActionPill>
      <ActionPill>
        <CommentIcon /> {fmt(a.comments)}
      </ActionPill>
      <ActionPill>
        <ShareIcon /> {fmt(a.shares)}
      </ActionPill>
    </div>
  );
}

// Unified article preview: cover → rubric → headline → subtitle → byline → badges.
// `headingLevel` lets a page control the semantic tag (only one <h1> per page).
export function ArticleCard({
  a,
  views,
  featured = false,
  headingLevel,
  locale = "ru",
}: {
  a: Article;
  views: number;
  featured?: boolean;
  headingLevel?: "h1" | "h2";
  locale?: Locale;
}) {
  const Heading = headingLevel ?? (featured ? "h1" : "h2");
  return (
    <Link href={a.href} className="group block font-body">
      <div
        className="relative aspect-video border border-[var(--color-border)] overflow-hidden mb-5 bg-[var(--color-surface)]"
        style={a.coverBg ? { backgroundColor: a.coverBg } : undefined}
      >
        {a.img ? (
          <Image
            src={a.img}
            alt={a.title}
            fill
            sizes={featured ? "(min-width:768px) 700px, 100vw" : "(min-width:768px) 360px, 100vw"}
            style={a.imgPosition ? { objectPosition: a.imgPosition } : undefined}
            className={`${a.coverBg ? "object-contain" : "object-cover"} transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
            priority={featured}
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-[11px] uppercase tracking-[0.2em] text-[var(--color-dim)]">
            {dict[locale].card.coverSoon}
          </span>
        )}
      </div>

      {featured && a.credit && (
        <div className="-mt-4 mb-5 text-left text-[var(--color-dim)]">
          <p className="text-[11px]">{a.credit}</p>
        </div>
      )}

      <Rubric a={a} size={featured ? "md" : "sm"} />
      <Heading
        className={`font-bold tracking-tight group-hover:text-[var(--color-brand)] transition-colors ${
          featured ? "text-[26px] md:text-[36px] leading-[1.08] mb-3" : "text-[17px] md:text-[19px] leading-[1.15] mb-2"
        }`}
      >
        {a.title}
      </Heading>
      <p className={`text-[var(--color-dim)] leading-relaxed ${featured ? "text-[15px] md:text-[16px] mb-4" : "text-[13px] mb-3"}`}>
        {a.subtitle}
      </p>
      <BylineRow a={a} views={views} className="mt-4" locale={locale} />
    </Link>
  );
}

// Compact preview (Business Insider "Inside Business" style): text + small thumbnail.
export function CompactCard({ a, views, locale = "ru" }: { a: Article; views: number; locale?: Locale }) {
  return (
    <Link href={a.href} className="group flex gap-4 items-start font-body">
      <div className="flex-1 min-w-0">
        <Rubric a={a} />
        <h2 className="text-[15px] md:text-[16px] font-bold leading-[1.2] tracking-tight group-hover:text-[var(--color-brand)] transition-colors mb-2">
          {a.title}
        </h2>
        <BylineRow a={a} views={views} className="mt-3" locale={locale} />
      </div>
      <div className="relative shrink-0 w-[120px] h-[104px] border border-[var(--color-border)] overflow-hidden">
        <Image
          src={a.img}
          alt={a.title}
          fill
          sizes="320px"
          className="object-cover object-center scale-[1.7] origin-[64%_52%] transition-transform duration-500 ease-out group-hover:scale-[1.8]"
        />
      </div>
    </Link>
  );
}

// Newsletter signup — Business Insider "BI Today" style. Brand-tinted panel.
export function NewsletterCard({ source = "home", locale = "ru" }: { source?: string; locale?: Locale }) {
  const copy = locale === "en"
    ? {
        eyebrow: "The newsletter",
        title: "A clearer view of digital markets",
        body: "New investigations, data notes, and practical findings from Kazakhstan and Central Asia. Sent only when there is something worth reading.",
        note: "No daily noise. Unsubscribe any time.",
      }
    : {
        eyebrow: "Рассылка",
        title: "Цифровые рынки без информационного шума",
        body: "Новые расследования, дата-разборы и практические находки из Казахстана и Центральной Азии. Письмо выходит, когда есть что сказать.",
        note: "Без ежедневного спама. Отписаться можно в любой момент.",
      };
  return (
    <div className="grid min-w-0 gap-8 overflow-hidden bg-[var(--color-brand)] p-5 text-[var(--color-bg)] sm:p-7 md:grid-cols-[1.25fr_1fr] md:p-10 lg:p-12">
      <div className="min-w-0">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] opacity-75 mb-4">{copy.eyebrow}</p>
        <p className="break-words font-heading text-[28px] md:text-[36px] font-bold tracking-tight leading-[1.02] mb-4">{copy.title}</p>
        <p className="font-body text-[14px] md:text-[16px] leading-relaxed opacity-85 max-w-xl">{copy.body}</p>
      </div>
      <div className="min-w-0 self-end">
        <SubscribeForm source={source} variant="brand" />
        <p className="font-body text-[11px] opacity-70 mt-3">{copy.note}</p>
      </div>
    </div>
  );
}

/* ───────── data (best-effort; render 0 on failure) ───────── */
export async function getViews(slugs: string[]): Promise<Record<string, number>> {
  const map: Record<string, number> = {};
  try {
    const { data } = await getSupabase().from("page_views").select("slug, count").in("slug", slugs).abortSignal(AbortSignal.timeout(5000));
    for (const r of (data as { slug: string; count: number }[] | null) ?? []) {
      if (Number.isSafeInteger(r.count) && r.count >= 0) map[r.slug] = r.count;
    }
  } catch {
    /* views are best-effort */
  }
  return map;
}

export type Eng = { likes: number; comments: number; shares: number };
export async function getEngagement(slugs: string[]): Promise<Record<string, Eng>> {
  const map: Record<string, Eng> = {};
  for (const s of slugs) map[s] = { likes: 0, comments: 0, shares: 0 };
  try {
    const supabase = getSupabase();
    const [likes, comments, shares] = await Promise.all([
      supabase.from("like_counts").select("slug, count").in("slug", slugs),
      supabase.from("comment_counts").select("slug, count").in("slug", slugs),
      supabase.from("shares").select("slug, count").in("slug", slugs),
    ]);
    for (const r of (likes.data as { slug: string; count: number }[] | null) ?? []) if (map[r.slug]) map[r.slug].likes = Number(r.count);
    for (const r of (comments.data as { slug: string; count: number }[] | null) ?? []) if (map[r.slug]) map[r.slug].comments = Number(r.count);
    for (const r of (shares.data as { slug: string; count: number }[] | null) ?? []) if (map[r.slug]) map[r.slug].shares = Number(r.count);
  } catch {
    /* engagement counts are best-effort */
  }
  return map;
}

// Apply fetched engagement counts to an article.
export function withEngagement(a: Article, eng: Record<string, Eng>): Article {
  return { ...a, ...(eng[a.slug] ?? {}) };
}

/*
 * NewsArticle structured data (schema.org) — emitted in each article's
 * server-rendered <head> via its layout.tsx. Derived from the ARTICLES entry
 * (single source of truth); `description` is the article's curated SEO copy.
 */
export function ArticleJsonLd({ slug, description, locale = "ru" }: { slug: string; description: string; locale?: Locale }) {
  const base = ARTICLES.find((x) => x.slug === slug);
  if (!base) return null;
  const a = localizeArticle(base, locale);
  const url = `${SITE}${a.href}`;
  const json = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title,
    description,
    image: [`${SITE}${a.img}`],
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    inLanguage: locale === "en" ? "en-US" : "ru-RU",
    articleSection: a.rubric,
    genre: a.rubric,
    keywords: a.topics,
    isAccessibleForFree: true,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      name: dict[locale].name,
      url: `${SITE}${locale === "en" ? "/en" : ""}/authors/almas-kasymzhanov`,
      sameAs: SOCIAL_SAMEAS,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      "@id": `${SITE}/#publisher`,
      name: "Kasymzhanov",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/icon-192.png`, width: 192, height: 192 },
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
