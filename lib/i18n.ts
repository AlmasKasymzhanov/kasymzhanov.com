/*
 * Bilingual site (RU default at "/", EN at "/en") — route-based i18n so each
 * language has its own crawlable URL + hreflang (EN must be indexable for
 * US/EU readers; a client-only text swap would hide it from search).
 *
 * Server components receive `locale` as a prop from the page. Client components
 * derive it from usePathname() via `localeFromPathname`. This module is pure
 * (no React) so both sides can import it.
 *
 * SCOPE: editorial only — home + /blog/*. Course pages (/courses, /stream-*)
 * stay RU-only and get no /en route. See memory en-version-scope.
 */

export type Locale = "ru" | "en";
export const LOCALES: readonly Locale[] = ["ru", "en"] as const;
export const DEFAULT_LOCALE: Locale = "ru";

/** Locale implied by a pathname ("/en" or "/en/..." → en, else ru). */
export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ru";
}

/** The same page in the other locale: "/" ↔ "/en", "/blog/x" ↔ "/en/blog/x". */
export function pathForLocale(pathname: string, locale: Locale): string {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  if (locale === "ru") return stripped;
  return stripped === "/" ? "/en" : `/en${stripped}`;
}

/** BCP-47 tag for number/date formatting + <html lang>. */
export const bcp47: Record<Locale, string> = { ru: "ru-RU", en: "en-US" };

type Dict = {
  nav: { search: string; signIn: string; lang: string; theme: string; themeSystem: string; themeLight: string; themeDark: string };
  about: { label: string; role: string; orders: string; building: string };
  projects: { label: string; tenb: string; redstat: string; brock: string };
  contact: { label: string; body: string };
  social: { label: string; body: string };
  footer: { desc: string; colophon: string; requisites: string; privacy: string; terms: string };
  newsletter: { tagline: string };
  subscribe: { placeholder: string; emailLabel: string; button: string; loading: string; done: string; doneShort: string; errGeneric: string; errFail: string };
  card: { coverSoon: string };
  auth: {
    google: string;
    or: string;
    emailPlaceholder: string;
    send: string;
    sending: string;
    sentTitle: string;
    sentBefore: string;
    sentAfter: string;
    otherEmail: string;
    errFail: string;
  };
  login: { title: string; description: string; kicker: string; heading: string; sub: string; note: string };
  name: string;
  minRead: (n: number) => string;
};

export const dict: Record<Locale, Dict> = {
  ru: {
    nav: { search: "Поиск", signIn: "Войти", lang: "Язык интерфейса", theme: "Тема оформления", themeSystem: "Системная тема", themeLight: "Светлая тема", themeDark: "Тёмная тема" },
    about: {
      label: "Обо мне",
      role: "Дата-журналист · аналитик · предприниматель",
      orders: "1,6 млрд заказов прошли через мои алгоритмы.",
      building: "Строю",
    },
    projects: {
      label: "Проекты",
      tenb: "Аналитика госзакупок Казахстана: тендеры, поставщики, суммы контрактов.",
      redstat: "Аналитика маркетплейса Kaspi: ниши, цены, продавцы и спрос.",
      brock: "Дизайн-система графиков: редактируемые React-компоненты для дата-визуализации.",
    },
    contact: { label: "Контакты", body: "Есть вопрос или идея? Напишите — отвечу." },
    social: { label: "Социальные сети", body: "Подписывайтесь на мои соцсети" },
    footer: {
      desc: "kasymzhanov.com — независимое издание дата-журналиста, аналитика и предпринимателя Алмаса Касымжанова. Аналитика рынков, событий и экономики.",
      colophon: "Иллюстрации — Higgsfield AI · пайплайн Claude Code + MCP",
      requisites: "© 2026 kasymzhanov.com · ИП «Касымжанов А.Ж.» · ИИН 930422350609",
      privacy: "Политика конфиденциальности",
      terms: "Оферта",
    },
    newsletter: { tagline: "Подписывайтесь, чтобы получать уведомления о новых материалах" },
    subscribe: {
      placeholder: "Ваша почта",
      emailLabel: "Электронная почта",
      button: "Подписаться",
      loading: "…",
      done: "Готово — вы подписаны. Спасибо за доверие ✦",
      doneShort: "Готово — вы подписаны ✦",
      errGeneric: "Ошибка",
      errFail: "Не удалось подписаться",
    },
    card: { coverSoon: "[ Обложка готовится ]" },
    auth: {
      google: "Войти через Google",
      or: "или",
      emailPlaceholder: "your@email.com",
      send: "Войти по ссылке на почту",
      sending: "Отправляем…",
      sentTitle: "[ Письмо отправлено ]",
      sentBefore: "Отправили ссылку для входа на",
      sentAfter: ". Откройте письмо и перейдите по ссылке — войдёте автоматически.",
      otherEmail: "Ввести другой email",
      errFail: "Не удалось отправить ссылку",
    },
    login: {
      title: "Вход — kasymzhanov.com",
      description: "Войдите, чтобы ставить лайки, комментировать и подписаться на рассылку.",
      kicker: "[ Вход ]",
      heading: "Войдите в kasymzhanov.com",
      sub: "Чтобы ставить лайки, комментировать материалы и подписаться на рассылку. Вход = регистрация.",
      note: "Вход = регистрация. Нужен только для лайков, комментариев и подписки — ничего лишнего.",
    },
    name: "Алмас Касымжанов",
    minRead: (n) => `${n} мин`,
  },
  en: {
    nav: { search: "Search", signIn: "Sign in", lang: "Interface language", theme: "Color theme", themeSystem: "System theme", themeLight: "Light theme", themeDark: "Dark theme" },
    about: {
      label: "About",
      role: "Data journalist · Analyst · Founder",
      orders: "1.6 billion orders have run through my algorithms.",
      building: "Building",
    },
    projects: {
      label: "Projects",
      tenb: "Analytics for Kazakhstan's public procurement: tenders, suppliers, contract values.",
      redstat: "Analytics for Kaspi, Kazakhstan's dominant marketplace: niches, prices, sellers, and demand.",
      brock: "A charting design system: editable React components for data visualization.",
    },
    contact: { label: "Contact", body: "Got a question or an idea? Drop me a line — I'll get back to you." },
    social: { label: "Social", body: "Find me elsewhere." },
    footer: {
      desc: "kasymzhanov.com is the independent publication of Almas Kasymzhanov — data journalist, analyst, and founder. Analysis of markets, events, and the economy.",
      colophon: "Illustrations — Higgsfield AI · pipeline: Claude Code + MCP",
      requisites: "© 2026 kasymzhanov.com · Sole proprietorship “A.Zh. Kasymzhanov” · IIN 930422350609",
      privacy: "Privacy Policy",
      terms: "Terms",
    },
    newsletter: { tagline: "Sign up to hear when new work goes live." },
    subscribe: {
      placeholder: "Your email",
      emailLabel: "Email address",
      button: "Subscribe",
      loading: "…",
      done: "You're in. Thanks for the trust ✦",
      doneShort: "You're in ✦",
      errGeneric: "Something went wrong",
      errFail: "Couldn't subscribe",
    },
    card: { coverSoon: "[ Cover coming soon ]" },
    auth: {
      google: "Continue with Google",
      or: "or",
      emailPlaceholder: "your@email.com",
      send: "Email me a sign-in link",
      sending: "Sending…",
      sentTitle: "[ Check your inbox ]",
      sentBefore: "We've sent a sign-in link to",
      sentAfter: ". Open it and follow the link — you'll be signed in automatically.",
      otherEmail: "Use a different email",
      errFail: "Couldn't send the link",
    },
    login: {
      title: "Sign in — kasymzhanov.com",
      description: "Sign in to like, comment, and subscribe to the newsletter.",
      kicker: "[ Sign in ]",
      heading: "Sign in to kasymzhanov.com",
      sub: "To like, comment on stories, and subscribe to the newsletter. Signing in creates your account.",
      note: "Signing in creates your account. It's only for likes, comments, and the newsletter — nothing else.",
    },
    name: "Almas Kasymzhanov",
    minRead: (n) => `${n} min read`,
  },
};
