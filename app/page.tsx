import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ThemeToggle } from "@/components/theme-toggle";
import { LangToggle } from "@/components/lang-toggle";
import { SubscribeForm } from "@/components/subscribe-form";
import { Masthead } from "@/components/canon/masthead";
import { HeroWordmark } from "@/components/canon/hero-wordmark";
import { MetaLabel } from "@/components/canon/meta-label";
import { AsciiRule } from "@/components/canon/ascii-rule";
import { ReadMore } from "@/components/canon/read-more";

export const metadata: Metadata = {
  title: "A. Kasymzhanov — дата-журнал о маркетплейсах",
  description:
    "Разборы ниш маркетплейсов Казахстана, юнит-экономика и ошибки брендов. Данные вместо мнений.",
};

const POSTS = [
  {
    date: "29 Май 2026",
    title: "Арифметика лени: как AI добывает золото из Kaspi",
    href: "/blog/kaspi-mcp",
    rubric: "Kaspi",
    read: "8 мин",
  },
  {
    date: "25 Мар 2026",
    title: "Блеск и тени Lick Beauty",
    href: "/blog/why-blogger-brands-fail",
    rubric: "Бьюти",
    read: "7 мин",
  },
];

const RUBRICS = ["Бьюти", "Kaspi", "Wildberries", "Юнит-экономика"];

const TOOLS = [
  { name: "WB Niche Analyzer", desc: "CSV → анализ ниши Wildberries", href: "/tools/wb-analyzer" },
  { name: "MPStats API Гайд", desc: "MPStats API → Claude Code → AI-агенты", href: "/tools/mpstats-api" },
  { name: "AI для селлеров", desc: "Инструменты ИИ для маркетплейсов", href: "/tools/ai-seller-guide" },
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
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* ── Header ── */}
        <header className="flex items-center justify-between gap-6 py-5 border-b border-[var(--color-border)]">
          <HeroWordmark size="header" />
          <div className="hidden sm:flex items-end gap-2">
            <div className="w-[200px] md:w-[240px]">
              <p className="font-mono text-[11px] font-bold tracking-[-0.02em] text-[var(--color-text)] mb-2">
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

        {/* ── Featured: Бьюти ── */}
        <section className="py-12 md:py-16">
          <Link
            href="/blog/why-blogger-brands-fail"
            className="group grid md:grid-cols-2 gap-10 md:gap-14 items-center no-underline"
          >
            {/* text */}
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-3 mb-5 text-[11px] uppercase tracking-[0.14em] text-[var(--color-dim)]">
                <span>[ 25 Мар 2026 ]</span>
                <span>Статьи</span>
              </div>
              <h2 className="text-[28px] md:text-[36px] font-bold leading-[1.12] tracking-tight text-[var(--color-text)] mb-5 group-hover:opacity-70 transition-opacity">
                Блеск и тени Lick&nbsp;Beauty
              </h2>
              <p className="text-[15px] md:text-[17px] leading-[1.7] text-[var(--color-dim)] mb-7 max-w-md">
                43&nbsp;млн в первый месяц. 3.3&nbsp;млн через полгода. Как бренд
                с&nbsp;7&nbsp;миллионами подписчиков проиграл реплике за&nbsp;420&nbsp;тенге.
              </p>
              <div>
                <ReadMore label="Читать подробнее" />
              </div>
              <div className="mt-8 inline-flex items-center border border-[var(--color-text)] px-3.5 py-2 text-[12px] text-[var(--color-text)]">
                Автор: Алмас Касымжанов
                <span className="text-[var(--color-dim)]">&nbsp;·&nbsp;дата-журналист</span>
              </div>
            </div>
            {/* image */}
            <div className="order-1 md:order-2 border border-[var(--color-border)] overflow-hidden">
              <Image
                src="/blog/why-blogger-brands-fail/hero.webp"
                alt="Блеск и тени Lick Beauty — выручка как кардиограмма, −92%"
                width={1600}
                height={893}
                className="w-full h-auto"
                priority
              />
            </div>
          </Link>
        </section>

        <AsciiRule className="my-0" />

        {/* ── Свежее ── */}
        <section className="py-14">
          <div className="flex items-center justify-between mb-7">
            <MetaLabel items={["Свежее"]} />
            <div className="hidden md:flex items-center gap-3">
              {RUBRICS.map((r) => (
                <span key={r} className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-dim)]">
                  {r}
                </span>
              ))}
            </div>
          </div>

          <ul className="flex flex-col">
            {POSTS.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="group grid grid-cols-[auto_1fr] md:grid-cols-[110px_1fr_120px] gap-x-5 gap-y-1 items-baseline py-5 border-b border-[var(--color-border)]/50 no-underline"
                >
                  <span className="text-[12px] text-[var(--color-dim)] tabular-nums">{p.date}</span>
                  <span className="text-[16px] md:text-[17px] font-bold text-[var(--color-text)] group-hover:opacity-70 transition-opacity leading-snug">
                    {p.title}
                  </span>
                  <span className="hidden md:block text-right text-[11px] uppercase tracking-[0.16em] text-[var(--color-dim)]">
                    {p.rubric}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex gap-5 mt-7 text-[13px]">
            <Link href="/blog" className="font-bold text-[var(--color-text)] hover:opacity-70 no-underline">
              Все материалы →
            </Link>
            <Link href="/reports" className="text-[var(--color-dim)] hover:text-[var(--color-text)] no-underline">
              Отчёты
            </Link>
          </div>
        </section>

        <AsciiRule className="my-0" />

        {/* ── Инструменты ── */}
        <section className="py-14">
          <MetaLabel items={["Инструменты"]} className="mb-7" />
          <div className="grid md:grid-cols-3 gap-4">
            {TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group border border-[var(--color-border)] rounded-[3px] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors p-5 no-underline"
              >
                <p className="text-[15px] font-bold text-[var(--color-text)] mb-1.5 group-hover:opacity-70 transition-opacity">
                  {t.name}
                </p>
                <p className="text-[12px] leading-relaxed text-[var(--color-dim)]">{t.desc}</p>
                <span className="inline-block mt-4 text-[12px] text-[var(--color-dim)]">Открыть →</span>
              </Link>
            ))}
          </div>
        </section>

        <AsciiRule className="my-0" />

        {/* ── Footer ── */}
        <footer className="py-12 flex flex-col gap-6">
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
