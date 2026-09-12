import Image from "next/image";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/canon/site-chrome";
import {
  ArticleCard,
  NewsletterCard,
  getArticlesByTopic,
  getKaspiMarketArticles,
  getPublishedArticles,
  type Article,
} from "@/components/articles";
import { type Locale, dict } from "@/lib/i18n";

function LeadStory({ article, locale }: { article: Article; locale: Locale }) {
  return (
    <Link href={article.href} className="group block font-body">
      <figure>
        <div className="relative aspect-[16/9] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
          <Image
            src={article.img}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 850px, 100vw"
            style={article.imgPosition ? { objectPosition: article.imgPosition } : undefined}
            className={`${article.coverBg ? "object-contain" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-[1.025]`}
            priority
          />
        </div>
        {article.credit && <figcaption className="mt-2 font-mono text-[9px] text-[var(--color-dim)]">{article.credit}</figcaption>}
      </figure>
      <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">{article.rubric}</p>
      <h1 className="mt-3 max-w-[940px] font-heading text-[38px] font-bold leading-[0.99] tracking-[-0.035em] transition-colors group-hover:text-[var(--color-brand)] sm:text-[48px] lg:text-[58px]">
        {article.title}
      </h1>
      <p className="mt-5 max-w-[820px] text-[17px] leading-[1.55] text-[var(--color-dim)] md:text-[19px]">{article.subtitle}</p>
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.05em] text-[var(--color-dim)]">
        {locale === "en" ? "By" : "Автор"} {dict[locale].name} · <time dateTime={article.datePublished}>{article.date}</time> · {dict[locale].minRead(article.readMin)}
      </p>
    </Link>
  );
}

function KaspiHomeRail({ articles, locale }: { articles: Article[]; locale: Locale }) {
  const prefix = locale === "en" ? "/en" : "";
  return (
    <aside className="order-2 border-t border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:order-1 lg:border-r lg:border-t-0 lg:p-7">
      <Link href={`${prefix}/kaspi`} className="group block border-b border-[var(--color-text)] pb-5">
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--color-brand)]">{locale === "en" ? "Independent market intelligence" : "Независимая аналитика"}</p>
        <h2 className="mt-3 font-heading text-[30px] font-bold leading-[0.92] tracking-[-0.035em] group-hover:text-[var(--color-brand)]">Kaspi Market →</h2>
        <p className="mt-4 text-[12px] leading-relaxed text-[var(--color-dim)]">
          {locale === "en" ? "Analytics of categories, products, demand, and competition on Kaspi." : "Аналитика категорий, товаров, спроса и конкуренции на Kaspi."}
        </p>
      </Link>
      <div>
        {articles.map((article) => (
          <Link key={article.slug} href={article.href} className="group block border-b border-[var(--color-border)] py-5">
            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--color-brand)]">{article.rubric}</span>
            <h3 className="mt-2 text-[15px] font-bold leading-[1.08] transition-colors group-hover:text-[var(--color-brand)]">{article.title}</h3>
            <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.05em] text-[var(--color-dim)]">{article.date} · {dict[locale].minRead(article.readMin)}</p>
          </Link>
        ))}
      </div>
      <Link href={`${prefix}/kaspi`} className="mt-5 flex h-11 items-center justify-between border-y border-[var(--color-border)] px-3 font-mono text-[9px] font-bold uppercase tracking-[0.06em] hover:text-[var(--color-brand)]">
        {locale === "en" ? "All analytics" : "Вся аналитика"} <span>→</span>
      </Link>
    </aside>
  );
}

type EditorialLink = { label: string; href: string };

function EditorialRow({ title, description, href, articles, locale, links = [] }: { title: string; description: string; href: string; articles: Article[]; locale: Locale; links?: EditorialLink[] }) {
  const columns = articles.length <= 1 ? "lg:grid-cols-3" : articles.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  return (
    <section className="grid border-t border-[var(--color-border)] lg:grid-cols-[260px_minmax(0,1fr)]">
      <header className="p-6 md:p-8 lg:p-10">
        <Link href={href} className="group block">
          <h2 className="font-heading text-[34px] font-bold leading-none tracking-[-0.035em] group-hover:text-[var(--color-brand)]">{title} <span className="text-[var(--color-brand)]">→</span></h2>
          <p className="mt-4 max-w-[220px] text-[13px] leading-relaxed text-[var(--color-dim)]">{description}</p>
        </Link>
        {links.length > 0 && (
          <nav className="mt-6 border-t border-[var(--color-border)] pt-4" aria-label={title}>
            {links.map((item) => (
              <Link key={item.label} href={item.href} className="flex items-center justify-between border-b border-[var(--color-border)] py-2 font-mono text-[9px] uppercase tracking-[0.06em] hover:text-[var(--color-brand)]">
                {item.label} <span>→</span>
              </Link>
            ))}
          </nav>
        )}
      </header>
      <div className={`grid gap-8 border-t border-[var(--color-border)] p-6 sm:grid-cols-2 md:p-8 lg:border-l lg:border-t-0 lg:p-10 ${columns}`}>
        {articles.slice(0, 3).map((article) => <ArticleCard key={article.slug} a={article} views={0} locale={locale} />)}
      </div>
    </section>
  );
}

export function PublicationHome({ locale }: { locale: Locale }) {
  const all = getPublishedArticles(locale).filter((article) => !article.sectionOnly);
  const [lead, ...rest] = all;
  const secondary = rest.slice(0, 3);
  const featuredSlugs = new Set([lead, ...secondary].filter(Boolean).map((article) => article.slug));
  const kaspiArticles = getKaspiMarketArticles(locale);
  const kaspiRail = kaspiArticles.filter((article) => !featuredSlugs.has(article.slug)).slice(0, 4);
  const kaspiReport = kaspiArticles.find((article) => article.slug === "kaspi-top-30-june-2026");
  const rightFeature = secondary[0]?.slug === "wb-dual-use"
    ? {
        ...secondary[0],
        subtitle: locale === "en"
          ? "A data-led look at seven product niches that grew sharply around Russia’s warehouse disruptions."
          : "Я поднял данные MPStats с 2021 года и проверил семь товарных ниш, которые выросли на фоне атак на склады.",
      }
    : secondary[0];
  const prefix = locale === "en" ? "/en" : "";
  const copy = locale === "en"
    ? {
        top: "Front page",
        secondary: "Also on the front page",
        recent: "Latest",
        kaspi: "All coverage of categories, products, demand, and competition on Kaspi in one section.",
        markets: ["Markets", "Platforms, retail, brands, and the signals hidden in demand."],
        technology: ["Technology", "AI, infrastructure, and the systems reshaping the region."],
      }
    : {
        top: "Главная история",
        secondary: "Также на главной",
        recent: "Последние",
        kaspi: "Все материалы о категориях, товарах, спросе и конкуренции на Kaspi собраны в одном разделе.",
        markets: ["Рынки", "Платформы, торговля, бренды и сигналы, спрятанные в спросе."],
        technology: ["Технологии", "AI, инфраструктура и системы, которые меняют регион."],
      };
  const kaspiLinks: EditorialLink[] = locale === "en"
    ? [
        { label: "Tools", href: `${prefix}/tools` },
        { label: "MCP", href: "/blog/kaspi-mcp" },
        { label: "Reports", href: "/reports/kaspi-top-30-june-2026" },
        { label: "Lick Beauty", href: "/blog/why-blogger-brands-fail" },
      ]
    : [
        { label: "Инструменты", href: `${prefix}/tools` },
        { label: "MCP", href: "/blog/kaspi-mcp" },
        { label: "Отчёты", href: "/reports/kaspi-top-30-june-2026" },
        { label: "Lick Beauty", href: "/blog/why-blogger-brands-fail" },
      ];

  return (
    <div className="font-body text-[var(--color-text)]">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col border-x border-[var(--color-border)]">
        <SiteHeader locale={locale} variant="masthead" />
        <main id="main-content" className="flex-1">
          <section className="grid border-b border-[var(--color-border)] lg:grid-cols-[290px_minmax(0,1fr)]">
            <KaspiHomeRail articles={kaspiRail.length > 0 ? kaspiRail : kaspiArticles.slice(0, 3)} locale={locale} />
            <div className="order-1 min-w-0 lg:order-2">
              <div className="grid lg:grid-cols-[minmax(0,1fr)_350px]">
                <div className="p-6 md:p-10 lg:p-12">
                  <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">{copy.top}</p>
                  <LeadStory article={lead} locale={locale} />
                </div>
                {rightFeature && (
                  <aside className="border-t border-[var(--color-border)] p-6 md:p-8 lg:border-l lg:border-t-0">
                    <p className="mb-7 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">{copy.secondary}</p>
                    <ArticleCard a={rightFeature} views={0} locale={locale} />
                    {kaspiReport && (
                      <div className="mt-8 border-t border-[var(--color-border)] pt-8">
                        <ArticleCard a={kaspiReport} views={0} locale={locale} />
                      </div>
                    )}
                  </aside>
                )}
              </div>
              {secondary.length > 1 && (
                <section className="border-t border-[var(--color-border)]">
                  <div className="border-b border-[var(--color-border)] px-6 py-4 md:px-10 lg:px-12">
                    <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">{copy.recent}</h2>
                  </div>
                  <div className="grid gap-8 p-6 sm:grid-cols-2 md:p-10 lg:p-12">
                    {secondary.slice(1).map((article) => <ArticleCard key={article.slug} a={article} views={0} locale={locale} />)}
                  </div>
                </section>
              )}
            </div>
          </section>

          <section className="border-b border-[var(--color-border)] px-6 py-12 md:px-10 md:py-16 lg:px-12">
            <NewsletterCard source={locale === "en" ? "home-en" : "home"} locale={locale} />
          </section>

          <EditorialRow title="Kaspi Market" description={copy.kaspi} href={`${prefix}/kaspi`} articles={kaspiArticles} locale={locale} links={kaspiLinks} />
          <EditorialRow title={copy.markets[0]} description={copy.markets[1]} href={`${prefix}/market`} articles={getArticlesByTopic("markets", locale)} locale={locale} />
          <EditorialRow title={copy.technology[0]} description={copy.technology[1]} href={`${prefix}/technology`} articles={getArticlesByTopic("technology", locale)} locale={locale} />
        </main>
        <SiteFooter locale={locale} />
      </div>
    </div>
  );
}
