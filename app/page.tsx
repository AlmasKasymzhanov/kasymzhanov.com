import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ThemeToggle } from "@/components/theme-toggle";
import { LangToggle } from "@/components/lang-toggle";
import { SubscribeForm } from "@/components/subscribe-form";
import { Masthead } from "@/components/canon/masthead";
import { HeroWordmark } from "@/components/canon/hero-wordmark";
import { ReadMore } from "@/components/canon/read-more";

export const metadata: Metadata = {
  title: "A. Kasymzhanov — дата-журнал о маркетплейсах",
  description:
    "Разборы ниш маркетплейсов Казахстана, юнит-экономика и ошибки брендов. Данные вместо мнений.",
};

const ARTICLES = [
  {
    href: "/blog/why-blogger-brands-fail",
    img: "/blog/why-blogger-brands-fail/likbeauty.webp",
    w: 1400,
    h: 1045,
    date: "25 Мар 2026",
    rubric: "Бьюти",
    kicker: "",
    title: "Блеск и тени Lick Beauty",
    subtitle:
      "43 млн в первый месяц. 3.3 млн через полгода. Как бренд с 7 миллионами подписчиков проиграл реплике за 420 тенге.",
  },
  {
    href: "/blog/kaspi-mcp",
    img: "/blog/kaspi-mcp/mcp.webp",
    w: 1400,
    h: 1045,
    date: "29 Май 2026",
    rubric: "Kaspi",
    kicker: "Redstat × MCP",
    title: "Арифметика лени: как AI добывает золото из Kaspi",
    subtitle:
      "Подключаешь Claude к данным Kaspi через MCP-коннектор — и AI сам добывает ниши, цены и долю «без бренда», пока ты пьёшь кофе.",
  },
];

const SOCIAL = [
  { label: "telegram", href: "https://t.me/almaskasymzhanov" },
  { label: "instagram", href: "https://www.instagram.com/almas_kasymzhanov/" },
  { label: "github", href: "https://github.com/AlmasKasymzhanov" },
  { label: "linkedin", href: "https://www.linkedin.com/in/akasymzhanov/" },
];

export default function Home() {
  return (
    <div className="font-mono text-[var(--color-text)]">
      {/* Framed container — vertical rules at the edges */}
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)]">
        {/* ── Header ── */}
        <header className="flex items-center justify-between gap-6 px-6 md:px-12 py-5 border-b border-[var(--color-border)]">
          <HeroWordmark size="header" />
          <div className="hidden sm:flex items-end gap-2">
            <div className="w-[200px] md:w-[240px]">
              <p className="text-[11px] font-bold tracking-[-0.02em] text-[var(--color-text)] mb-2">
                Подписаться на рассылку
              </p>
              <SubscribeForm source="home" variant="header" />
            </div>
            <LangToggle />
            <ThemeToggle boxed />
          </div>
          <div className="sm:hidden flex items-center gap-2">
            <LangToggle />
            <ThemeToggle boxed />
          </div>
        </header>

        {/* ── Articles grid ── */}
        <section className="grid md:grid-cols-2 border-b border-[var(--color-border)]">
          {ARTICLES.map((a, i) => (
            <Link
              key={a.href}
              href={a.href}
              className={`group block p-6 md:p-10 ${
                i > 0 ? "border-t md:border-t-0 md:border-l border-[var(--color-border)]" : ""
              }`}
            >
              <div className="border border-[var(--color-border)] overflow-hidden mb-6">
                <Image
                  src={a.img}
                  alt={a.title}
                  width={a.w}
                  height={a.h}
                  className="w-full h-auto"
                  priority={i === 0}
                />
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-[11px] uppercase tracking-[0.14em] text-[var(--color-dim)]">
                <span>[ {a.date} ]</span>
                <span>{a.rubric}</span>
                {a.kicker && <span className="text-[var(--color-text)]">{a.kicker}</span>}
              </div>
              <h2 className="text-[24px] md:text-[30px] font-bold leading-[1.15] tracking-tight text-[var(--color-text)] mb-4 group-hover:opacity-70 transition-opacity">
                {a.title}
              </h2>
              <p className="text-[14px] md:text-[15px] leading-[1.7] text-[var(--color-dim)] mb-6 max-w-md">
                {a.subtitle}
              </p>
              <ReadMore label="Читать подробнее" />
            </Link>
          ))}
        </section>

        {/* ── Footer ── */}
        <footer className="px-6 md:px-12 py-10 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Masthead />
            <nav className="flex flex-wrap items-center gap-4">
              {SOCIAL.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] transition-colors no-underline"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-[var(--color-dim)]">
            <span>© 2026 akasymzhanov.com</span>
            <nav className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-[var(--color-text)] no-underline">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="hover:text-[var(--color-text)] no-underline">
                Оферта
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}
