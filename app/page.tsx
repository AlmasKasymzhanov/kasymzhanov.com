import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthButton } from "@/components/auth-button";
import { SubscribeForm } from "@/components/subscribe-form";
import { Masthead } from "@/components/canon/masthead";
import { MetaLabel } from "@/components/canon/meta-label";
import { AsciiRule } from "@/components/canon/ascii-rule";
import { Sparkline } from "@/components/canon/sparkline";

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
      <div className="max-w-[1080px] mx-auto px-6">
        {/* ── Masthead bar ── */}
        <header className="flex items-center justify-between py-5 border-b border-[var(--color-border)]">
          <Masthead />
          <div className="flex items-center gap-3">
            <AuthButton />
            <ThemeToggle />
          </div>
        </header>

        {/* ── Hero / intro + newsletter ── */}
        <section className="py-14 md:py-20 grid md:grid-cols-[1fr_auto] gap-10 md:items-end">
          <div className="max-w-xl">
            <p className="font-pixel text-[22px] md:text-[26px] leading-[1.25] text-[var(--color-text)] mb-4">
              Дата-журнал о&nbsp;маркетплейсах
            </p>
            <p className="text-[14px] leading-[1.8] text-[var(--color-dim)]">
              Разборы ниш, юнит-экономика и ошибки брендов на Kaspi и Wildberries.
              Данные не смотрят сторис — они просто считают.
            </p>
          </div>
          <div className="md:pb-1">
            <MetaLabel items={["Подписка"]} className="mb-3" />
            <SubscribeForm source="home" />
            <p className="text-[11px] text-[var(--color-dim)] mt-2.5">
              Бесплатно, без спама. Отписка в один клик.
            </p>
          </div>
        </section>

        <AsciiRule className="my-0" />

        {/* ── Featured: Бьюти ── */}
        <section className="py-14">
          <MetaLabel items={["Бьюти", "Свежий разбор"]} className="mb-7" />
          <Link
            href="/blog/why-blogger-brands-fail"
            className="group grid md:grid-cols-2 gap-8 md:gap-10 items-center no-underline"
          >
            <div className="border border-[var(--color-border)] rounded-[3px] overflow-hidden bg-[var(--color-surface)]">
              <Image
                src="/blog/why-blogger-brands-fail/hero.webp"
                alt="Блеск и тени Lick Beauty — выручка как затухающая кардиограмма"
                width={1600}
                height={893}
                className="w-full h-auto"
                priority
              />
            </div>
            <div>
              <MetaLabel items={["25 Мар 2026", "Разбор", "7 мин"]} className="mb-4" />
              <h2 className="text-[24px] md:text-[28px] font-bold leading-[1.2] tracking-tight text-[var(--color-text)] mb-4 group-hover:opacity-70 transition-opacity">
                Блеск и тени Lick&nbsp;Beauty
              </h2>
              <p className="text-[14px] leading-[1.8] text-[var(--color-dim)] mb-5">
                43&nbsp;млн в первый месяц. 3.3&nbsp;млн через полгода. Как бренд
                с&nbsp;7&nbsp;миллионами подписчиков проиграл реплике за&nbsp;420&nbsp;тенге.
              </p>
              <div className="flex items-center gap-4">
                <Sparkline data={[43.6, 16, 6.3, 3.3]} delta="↓ −92%" />
              </div>
              <span className="inline-block mt-6 text-[13px] font-bold text-[var(--color-text)] group-hover:opacity-70 transition-opacity">
                Читать&nbsp;→
              </span>
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
