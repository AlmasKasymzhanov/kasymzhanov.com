import Link from "next/link";
import type { Metadata } from "next";
import { PersonalDocument } from "@/components/personal-document";
import { PreorderForm } from "@/components/preorder-form";

export const metadata: Metadata = {
  title: "Предзапись на 4 поток — AI-аналитик маркетплейсов | Алмас Касымжанов",
  description:
    "Набор в 3 поток закрыт. Оставьте телефон и email — добавлю вас в список предзаписи на 4 поток и напишу, когда откроется набор.",
};

const linkCls =
  "inline-flex items-center gap-2 text-[14px] font-normal text-[var(--color-text)] min-h-11 no-underline hover:opacity-70 transition-opacity";
const kickerCls = "text-[11px] uppercase tracking-[0.18em] text-[var(--color-brand)] mb-3";
const kickerDimCls = "text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-3";

export default function Stream4Page() {
  return (
    <PersonalDocument>
          {/* Intro */}
          <section className="mb-14">
            <p className={kickerCls}>[ AI-аналитик маркетплейсов · предзапись ]</p>
            <h1 className="text-[28px] md:text-[40px] font-normal leading-[1.1] tracking-tight mb-5">
              Предзапись на 4 поток
            </h1>
            <p className="text-[15px] md:text-[16px] text-[var(--color-dim)] leading-relaxed">
              Набор в 3 поток закрыт — все места заняты. Если хотите попасть в следующий, оставьте
              контакты: добавлю вас в список предзаписи на 4 поток и напишу первым, как только откроется
              набор.
            </p>
            <Link href="/stream-3" className={`mt-6 ${linkCls}`}>
              Смотреть программу курса
            </Link>
          </section>

          {/* Form */}
          <section className="mb-14">
            <PreorderForm />
          </section>

          {/* Программа курса */}
          <section className="pt-6">
            <p className={kickerDimCls}>[ Программа ]</p>
            <p className="text-[14px] md:text-[15px] text-[var(--color-dim)] leading-relaxed max-w-2xl mb-5">
              Хотите узнать, что входит — 5 модулей, бонусы (внешний трафик, белый ввоз из Китая) и какие
              сервисы достаются бесплатно? Посмотрите полную программу курса.
            </p>
            <Link href="/stream-3" className={linkCls}>
              Программа курса
            </Link>
          </section>
        </PersonalDocument>
  );
}
