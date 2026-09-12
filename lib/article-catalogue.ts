import type { Locale } from "@/lib/i18n";

export type Article = {
  href: string;
  slug: string; // page_views slug
  img: string;
  // object-position for the cover crop (e.g. "center 62%"); defaults to center.
  imgPosition?: string;
  // When set, the cover is shown whole (object-contain) on this background colour
  // instead of being cropped to fill — for art whose own text would otherwise clip.
  coverBg?: string;
  rubric: string;
  topics: ArticleTopic[];
  series?: ArticleSeries[];
  analysisPace?: AnalysisPace;
  // Keep specialist reports inside their product hub instead of promoting
  // them to the publication's main lead or broad topic rows.
  sectionOnly?: boolean;
  title: string;
  subtitle: string;
  date: string; // display date, e.g. "22 Июн 2026"
  datePublished: string; // ISO 8601, e.g. "2026-06-22" — for structured data
  dateModified?: string;
  readMin: number;
  // Engagement counts — overridden at request time from Supabase.
  likes: number;
  comments: number;
  shares: number;
  // Hero image credit — flagship only.
  credit?: string;
  // English transcreation of the localizable fields (rubric/title/subtitle/
  // date/credit). Applied by localizeArticle when locale === "en".
  en?: { rubric: string; title: string; subtitle: string; date: string; credit?: string };
  // True once the EN article page exists at /en/blog/<slug>. Until then EN
  // cards link to the RU article so nothing 404s during incremental rollout.
  enReady?: boolean;
};

export type ArticleTopic = "markets" | "technology" | "kazakhstan";
export type ArticleSeries = "kaspi-market";
export type AnalysisPace = "fast" | "slow";

// Editorially complete copy that must not enter public feeds or structured
// data until publication-only fields (cover, credit, EN and date) are ready.
export type ArticleDraft = Pick<Article, "href" | "slug" | "rubric" | "title" | "subtitle" | "readMin"> & {
  status: "awaiting-cover-date-en";
};

// Swap in the EN transcreation when rendering the English site. RU is the base.
// On EN, the card links to /en/blog/<slug> only if that page is live (enReady).
export function localizeArticle(a: Article, locale: Locale): Article {
  if (locale !== "en") return a;
  const base = a.en ? { ...a, ...a.en } : a;
  return { ...base, href: a.enReady ? `/en${a.href}` : a.href };
}

/** Public editorial catalogue in canonical chronology. English is curated:
 * only completed translations enter English feeds and section fronts. */
export function getPublishedArticles(locale: Locale = "ru"): Article[] {
  return ARTICLES
    .filter((a) => locale === "ru" || a.enReady)
    .map((a) => localizeArticle(a, locale))
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

export function getArticlesByTopic(topic: ArticleTopic, locale: Locale = "ru"): Article[] {
  return getPublishedArticles(locale).filter((a) => !a.sectionOnly && a.topics.includes(topic));
}

export function getKaspiMarketArticles(locale: Locale = "ru", pace?: AnalysisPace): Article[] {
  return getPublishedArticles(locale).filter(
    (article) => article.series?.includes("kaspi-market") && (!pace || article.analysisPace === pace),
  );
}

export const ARTICLE_DRAFTS: ArticleDraft[] = [];

export const ARTICLES: Article[] = [
  {
    href: "/reports/kaspi-top-30-june-2026",
    slug: "kaspi-top-30-june-2026",
    img: "/reports/kaspi-top-30-june-2026/cover.png",
    rubric: "Рыночный срез",
    topics: ["markets"],
    series: ["kaspi-market"],
    analysisPace: "fast",
    sectionOnly: true,
    title: "30 ниш Kaspi: что я бы проверял к осени",
    subtitle: "Подписчик спросил, с каким товаром сейчас заходить на Kaspi. Я посмотрел данные и собрал 30 ниш для следующей проверки.",
    date: "2 Авг 2026",
    datePublished: "2026-08-02",
    readMin: 16,
    likes: 0,
    comments: 0,
    shares: 0,
    credit: "Графика: Kasymzhanov",
    enReady: false,
  },
  {
    href: "/blog/wildberries-kazakhstan",
    slug: "wildberries-kazakhstan",
    img: "/blog/wildberries-kazakhstan/cover.webp",
    rubric: "Аналитика",
    topics: ["markets", "kazakhstan"],
    title: "Wildberries ищет склады в Казахстане. Единого блока на 100 тыс. кв. м нет",
    subtitle:
      "После атак на российские комплексы RWB начала искать площади в Казахстане, сообщили участники рынка недвижимости. Я проверил FBS, остатки в Астане и экономику ПВЗ. Данные показывают дефицит инфраструктуры; массовый переток заказов к Kaspi пока не подтверждается.",
    date: "31 Июл 2026",
    datePublished: "2026-07-31",
    readMin: 17,
    likes: 0,
    comments: 0,
    shares: 0,
    credit: "Иллюстрация: Алмас Касымжанов",
    enReady: false,
  },
  {
    href: "/blog/wb-dual-use",
    slug: "wb-dual-use",
    img: "/blog/wb-dual-use/cover.webp",
    imgPosition: "center 50%",
    rubric: "Исследование",
    topics: ["markets"],
    title: "Я искал товары на атакованных складах Wildberries и нашёл ниши, выросшие в десятки раз",
    subtitle:
      "Связать семь проверенных карточек с конкретными складами не удалось. Тогда я поднял данные MPStats с 2021 года. В сопоставимых 12-месячных окнах оборот маскировочных костюмов вырос примерно с 42 млн до 3,15 млрд рублей, а продажи выросли более чем в 37 раз. Эти цифры не объясняют причину роста и не показывают, что лежало в атакованных корпусах.",
    date: "20 Июл 2026",
    datePublished: "2026-07-20",
    readMin: 15,
    likes: 0,
    comments: 0,
    shares: 0,
    credit: "Иллюстрация: Алмас Касымжанов",
    enReady: false,
  },
  {
    href: "/blog/freedom-market",
    slug: "freedom-market",
    img: "/blog/freedom-market/cover.webp",
    coverBg: "#e93032",
    rubric: "Расследование",
    topics: ["markets", "kazakhstan"],
    title: "Маркетплейс умер. Он вам позвонит",
    subtitle:
      "Как Freedom Тимура Турлова покупает площадку, которая не платила людям, зачем холдингу воскрешать её под своим именем - и почему у Kaspi впервые за десять лет появился соперник, которому есть чем ответить.",
    date: "9 Июл 2026",
    datePublished: "2026-07-09",
    readMin: 21,
    likes: 0,
    comments: 0,
    shares: 0,
    credit: "Иллюстрация: Алмас Касымжанов · Higgsfield AI",
    en: {
      rubric: "Investigation",
      title: "The Marketplace Is Dead. It Will Call You",
      subtitle:
        "How Timur Turlov's Freedom is buying a marketplace that stopped paying people, why the holding is resurrecting it under its own name - and why Kaspi, for the first time in a decade, faces a challenger with real ammunition.",
      date: "Jul 9, 2026",
      credit: "Illustration: Almas Kasymzhanov · Higgsfield AI",
    },
    enReady: true,
  },
  {
    href: "/blog/russia-fuel-jerrycan",
    slug: "russia-fuel-jerrycan",
    img: "/blog/russia-fuel-jerrycan/cover.webp",
    coverBg: "#f9ecd7",
    rubric: "Аналитика",
    topics: ["markets"],
    title: "Государство закрыло статистику. Рынок открыл канистру",
    subtitle:
      "Дефицит топлива в России нельзя объявить — но можно посчитать. Как продажи пустых канистр на Wildberries стали барометром кризиса, когда статистику погасили.",
    date: "29 Июн 2026",
    datePublished: "2026-06-29",
    readMin: 12,
    likes: 0,
    comments: 0,
    shares: 0,
    credit: "Иллюстрация: Алмас Касымжанов · Higgsfield AI",
    en: {
      rubric: "Analysis",
      title: "The State Closed the Statistics. The Market Opened a Jerrycan.",
      subtitle:
        "Russia's fuel shortage can't be announced — but it can be counted. How sales of empty jerrycans on Wildberries became the crisis barometer once the official numbers went dark.",
      date: "Jun 29, 2026",
      credit: "Illustration: Almas Kasymzhanov · Higgsfield AI",
    },
    enReady: true,
  },
  {
    href: "/blog/nvidia-kazakhstan",
    slug: "nvidia-kazakhstan",
    img: "/blog/nvidia-kazakhstan/cover.webp",
    imgPosition: "center 62%",
    rubric: "Аналитика",
    topics: ["technology", "kazakhstan"],
    title: "Кремний на угле",
    subtitle:
      "Казахстан подписал с NVIDIA и Firebird на $10 млрд — а ток для ИИ добудут углём. Что подписали, чем заплатят и где этот фильм уже показывали.",
    date: "22 Июн 2026",
    datePublished: "2026-06-22",
    readMin: 14,
    likes: 0,
    comments: 0,
    shares: 0,
    credit: "Иллюстрация: Алмас Касымжанов · Higgsfield AI",
    en: {
      rubric: "Analysis",
      title: "Silicon on Coal",
      subtitle:
        "Kazakhstan signed $10 billion in deals with NVIDIA and Firebird — and the electricity to run all that AI will be dug straight out of coal. What's actually in the deal, what it will cost, and where we've seen this movie before.",
      date: "Jun 22, 2026",
      credit: "Illustration: Almas Kasymzhanov · Higgsfield AI",
    },
    enReady: true,
  },
  {
    href: "/blog/why-blogger-brands-fail",
    slug: "why-blogger-brands-fail",
    img: "/blog/why-blogger-brands-fail/likbeauty.webp",
    rubric: "Рынок",
    topics: ["markets", "kazakhstan"],
    series: ["kaspi-market"],
    analysisPace: "slow",
    title: "Lick Beauty: семь миллионов против четырёхсот двадцати",
    subtitle: "Как бренд с 7 млн подписчиков проиграл реплике за 420 тенге.",
    date: "25 Мар 2026",
    datePublished: "2026-03-25",
    readMin: 7,
    likes: 0,
    comments: 0,
    shares: 0,
    en: {
      rubric: "Markets",
      title: "Lick Beauty: Seven Million Followers vs. 420 Tenge",
      subtitle: "How a brand with 7 million followers lost to a knockoff that sells for under a dollar.",
      date: "Mar 25, 2026",
    },
    enReady: true,
  },
  {
    href: "/blog/kaspi-mcp",
    slug: "kaspi-mcp",
    img: "/blog/kaspi-mcp/mcp.webp",
    rubric: "Инструменты",
    topics: ["markets", "kazakhstan"],
    series: ["kaspi-market"],
    analysisPace: "fast",
    title: "Арифметика лени: как AI добывает золото из Kaspi",
    subtitle: "MCP-коннектор: Claude сам достаёт ниши, цены и долю «без бренда».",
    date: "29 Май 2026",
    datePublished: "2026-05-29",
    readMin: 5,
    likes: 0,
    comments: 0,
    shares: 0,
    en: {
      rubric: "Tools",
      title: "Lazy Arithmetic: How AI Mines Gold Out of Kaspi",
      subtitle:
        "An MCP connector for Kaspi — Kazakhstan's dominant marketplace: Claude pulls niches, prices, and the “no-brand” share on its own.",
      date: "May 29, 2026",
    },
    enReady: true,
  },
];

/* ───────── icons ───────── */
