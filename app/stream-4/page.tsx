import Link from "next/link";
import type { Metadata } from "next";
import { Masthead } from "@/components/canon/masthead";
import { PreorderForm } from "@/components/preorder-form";

export const metadata: Metadata = {
  title: "Предзапись на 4 поток — AI-аналитик маркетплейсов | Алмас Касымжанов",
  description:
    "Набор в 3 поток закрыт. Оставьте телефон и email — добавлю вас в список предзаписи на 4 поток и напишу, когда откроется набор.",
};

export default function Stream4Page() {
  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1000px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 md:px-10 py-5 border-b border-[var(--color-border)]">
          <Masthead />
          <Link
            href="/"
            className="text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] no-underline transition-colors"
          >
            ← На сайт
          </Link>
        </header>

        {/* Intro */}
        <section className="px-6 md:px-10 py-10 md:py-14 border-b border-[var(--color-border)]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-3">
            [ AI-аналитик маркетплейсов · предзапись ]
          </p>
          <h1 className="text-[28px] md:text-[40px] font-bold leading-[1.1] tracking-tight mb-5">
            Предзапись на 4 поток
          </h1>
          <p className="text-[15px] md:text-[16px] text-[var(--color-dim)] leading-relaxed max-w-2xl">
            Набор в 3 поток закрыт — все места заняты. Если хотите попасть в следующий, оставьте
            контакты: добавлю вас в список предзаписи на 4 поток и напишу первым, как только откроется
            набор.
          </p>
          <Link
            href="/stream-3"
            className="inline-flex items-center gap-2 mt-6 text-[14px] font-bold text-[var(--color-text)] border-b border-[var(--color-text)] pb-0.5 no-underline hover:opacity-70 transition-opacity"
          >
            Смотреть программу курса →
          </Link>
        </section>

        {/* Form */}
        <section className="px-6 md:px-10 py-10 md:py-14">
          <PreorderForm />
        </section>

        {/* Программа курса */}
        <section className="px-6 md:px-10 py-10 md:py-12 border-t border-[var(--color-border)]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-3">
            [ Программа ]
          </p>
          <p className="text-[14px] md:text-[15px] text-[var(--color-dim)] leading-relaxed max-w-2xl mb-5">
            Хотите узнать, что входит — 5 модулей, бонусы (внешний трафик, белый ввоз из Китая) и какие
            сервисы достаются бесплатно? Посмотрите полную программу курса.
          </p>
          <Link
            href="/stream-3"
            className="inline-flex items-center gap-2 text-[14px] font-bold text-[var(--color-text)] border-b border-[var(--color-text)] pb-0.5 no-underline hover:opacity-70 transition-opacity"
          >
            Программа курса →
          </Link>
        </section>

        <div className="flex-1" aria-hidden />

        {/* Footer */}
        <footer className="px-6 md:px-10 py-8 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[var(--color-dim)]">
          <span>© 2026 akasymzhanov.com</span>
          <span>Предзапись · 4 поток</span>
        </footer>
      </div>
    </div>
  );
}
