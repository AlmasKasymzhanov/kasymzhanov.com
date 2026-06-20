import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/canon/site-chrome";
import { PreorderForm } from "@/components/preorder-form";

export const metadata: Metadata = {
  title: "Предзапись на 4 поток — AI-аналитик маркетплейсов | Алмас Касымжанов",
  description:
    "Набор в 3 поток закрыт. Оставьте телефон и email — добавлю вас в список предзаписи на 4 поток и напишу, когда откроется набор.",
};

const linkCls =
  "inline-flex items-center gap-2 text-[14px] font-bold text-[var(--color-text)] border-b border-[var(--color-text)] pb-0.5 no-underline hover:opacity-70 transition-opacity";
const kickerCls = "text-[11px] uppercase tracking-[0.18em] text-[var(--color-brand)] mb-3";

export default function Stream4Page() {
  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <SiteHeader />

        <main className="w-full max-w-[760px] mx-auto px-6 py-12 md:py-16">
          {/* Intro */}
          <section className="mb-14">
            <p className={kickerCls}>[ AI-аналитик маркетплейсов · предзапись ]</p>
            <h1 className="text-[28px] md:text-[40px] font-bold leading-[1.1] tracking-tight mb-5">
              Предзапись на 4 поток
            </h1>
            <p className="text-[15px] md:text-[16px] text-[var(--color-dim)] leading-relaxed">
              Набор в 3 поток закрыт — все места заняты. Если хотите попасть в следующий, оставьте
              контакты: добавлю вас в список предзаписи на 4 поток и напишу первым, как только откроется
              набор.
            </p>
            <Link href="/stream-3" className={`mt-6 ${linkCls}`}>
              Смотреть программу курса →
            </Link>
          </section>

          {/* Form */}
          <section className="mb-14">
            <PreorderForm />
          </section>

          {/* Программа курса */}
          <section className="border-t border-[var(--color-border)] pt-10">
            <p className={kickerCls}>[ Программа ]</p>
            <p className="text-[14px] md:text-[15px] text-[var(--color-dim)] leading-relaxed max-w-2xl mb-5">
              Хотите узнать, что входит — 5 модулей, бонусы (внешний трафик, белый ввоз из Китая) и какие
              сервисы достаются бесплатно? Посмотрите полную программу курса.
            </p>
            <Link href="/stream-3" className={linkCls}>
              Программа курса →
            </Link>
          </section>
        </main>

        <div className="flex-1" aria-hidden />
        <SiteFooter />
      </div>
    </div>
  );
}
