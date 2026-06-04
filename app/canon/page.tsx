import type { Metadata } from "next";
import { Masthead } from "@/components/canon/masthead";
import { MetaLabel } from "@/components/canon/meta-label";
import { AsciiRule } from "@/components/canon/ascii-rule";
import { Sparkline } from "@/components/canon/sparkline";
import { MonoTable } from "@/components/canon/mono-table";
import { PullQuote } from "@/components/canon/pull-quote";

export const metadata: Metadata = {
  title: "Canon — A. Kasymzhanov",
  description: "Дизайн-канон akasymzhanov.com: монохром, моноширинная типографика, ASCII-микрографика.",
  robots: { index: false, follow: false },
};

const SWATCHES = [
  { name: "bg", var: "--color-bg" },
  { name: "surface", var: "--color-surface" },
  { name: "border", var: "--color-border" },
  { name: "dim", var: "--color-dim" },
  { name: "text", var: "--color-text" },
];

export default function CanonPage() {
  return (
    <div className="font-mono max-w-[720px] mx-auto px-6 py-12 md:py-20 text-[var(--color-text)]">
      {/* Masthead */}
      <div className="flex items-center justify-between mb-16">
        <Masthead />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)]">
          design canon
        </span>
      </div>

      <h1 className="text-[28px] md:text-[34px] font-bold tracking-tight leading-[1.15] mb-4">
        Канон
      </h1>
      <p className="text-[14px] leading-[1.8] text-[var(--color-dim)] mb-2">
        Единый язык сайта: монохром, моноширинный Menlo везде, ASCII-микрографика,
        максимум воздуха. Эта страница — эталон, из которого собираются все экраны.
      </p>

      <AsciiRule />

      {/* Typography */}
      <MetaLabel items={["Типографика"]} />
      <div className="mt-6 space-y-5">
        <div>
          <h1 className="text-[28px] md:text-[34px] font-bold tracking-tight leading-[1.15]">
            Заголовок H1 — 34 / bold
          </h1>
          <span className="text-[11px] text-[var(--color-dim)]">Menlo · 28–34px · tracking-tight</span>
        </div>
        <div>
          <h2 className="text-[20px] font-bold tracking-tight">Подзаголовок H2 — 20 / bold</h2>
          <span className="text-[11px] text-[var(--color-dim)]">Menlo · 20px</span>
        </div>
        <div>
          <h3 className="text-[17px] font-bold">Раздел H3 — 17 / bold</h3>
          <span className="text-[11px] text-[var(--color-dim)]">Menlo · 17px</span>
        </div>
        <div>
          <p className="text-[15px] leading-[1.8] text-[var(--color-dim)]">
            Основной текст — 15px, line-height 1.8, цвет dim. Узкая колонка ~680px.
            Данным всё равно, сколько у тебя подписчиков: они не смотрят сторис,
            не ставят лайки — они просто считают.
          </p>
          <span className="text-[11px] text-[var(--color-dim)]">Menlo · 15px / 1.8 · dim</span>
        </div>
      </div>

      <AsciiRule />

      {/* Color */}
      <MetaLabel items={["Монохром · палитра"]} />
      <div className="mt-6 flex flex-wrap gap-3">
        {SWATCHES.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-2">
            <div
              className="w-16 h-16 rounded-[3px] border border-[var(--color-border)]"
              style={{ background: `var(${s.var})` }}
            />
            <span className="text-[11px] text-[var(--color-dim)]">{s.name}</span>
          </div>
        ))}
      </div>
      <p className="text-[12px] text-[var(--color-dim)] mt-4 leading-relaxed">
        Никаких цветных акцентов. Рост/падение различаем формой: сплошная = рост,
        пунктир = спад, стрелка ↓ −92%.
      </p>

      <AsciiRule />

      {/* Meta labels */}
      <MetaLabel items={["Метки"]} />
      <div className="mt-6 space-y-3">
        <MetaLabel items={["25 Мар 2026", "Разбор", "7 мин"]} />
        <MetaLabel items={["Kaspi", "Косметика"]} />
        <MetaLabel items={["Аналитика"]} />
      </div>

      <AsciiRule variant="dots" />

      {/* Sparkline / micrographics */}
      <MetaLabel items={["Микрографика · ASCII-спарклайн"]} />
      <div className="mt-6 space-y-4 text-[14px]">
        <p className="text-[var(--color-dim)]">
          Выручка Lick Beauty:{" "}
          <Sparkline data={[43.6, 16, 6.3, 3.3]} delta="↓ −92%" />
        </p>
        <p className="text-[var(--color-dim)]">
          PUSY 2022 → 2024:{" "}
          <Sparkline data={[176, 1540, 3250]} delta="↑ ×18" />
        </p>
      </div>

      <AsciiRule />

      {/* Table */}
      <MetaLabel items={["Моно-таблица"]} />
      <MonoTable
        headers={["Период", "Выручка", "Продажи"]}
        rows={[
          ["Авг 2025", "43.6 млн ₸", "7 241"],
          ["Дек 2025", "16 млн ₸", "2 638"],
          ["Янв 2026", "6.3 млн ₸", "1 124"],
          ["Фев 2026", "3.3 млн ₸", "596"],
        ]}
        caption={<>Источник: redstat.kz</>}
      />

      <AsciiRule />

      {/* Pull quote */}
      <MetaLabel items={["Пул-цитата"]} />
      <PullQuote>
        Запуск — это не бизнес. Это аплодисменты. Один раз.
      </PullQuote>

      <AsciiRule />

      {/* Buttons */}
      <MetaLabel items={["Кнопки"]} />
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="px-5 py-2.5 rounded-lg bg-[var(--color-text)] text-[var(--color-bg)] text-[13px] font-semibold hover:opacity-90 transition-opacity">
          Подписаться
        </button>
        <button className="px-5 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[13px] font-medium hover:bg-[var(--color-surface-hover)] transition-colors">
          Читать →
        </button>
      </div>

      <AsciiRule />

      <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] text-center">
        A. Kasymzhanov · canon v1
      </p>
    </div>
  );
}
