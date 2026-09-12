"use client";
import { IconlyArrowRight, IconlyChevronDown } from "@/components/iconly-icons";
import { ResearchFact } from "@/components/canon/research-editorial";
import { ChartTooltipPortal as FloatingTooltip, useTooltipHover } from "./chart-tooltip";

import { useEffect, useRef, useState } from "react";

import { DataTable, type DataTableColumn } from "@/components/charts/data-table";

const formatExactRubles = (value: number) => `${value.toLocaleString("ru-RU")} ₽`;
const formatSales = (value: number) => value.toLocaleString("ru-RU");
const formatX = (value: number, digits = 1) =>
  `×${value.toLocaleString("ru-RU", { maximumFractionDigits: digits })}`;
const formatExactDailyIndex = (value: number) =>
  value.toLocaleString("ru-RU", { minimumFractionDigits: 6, maximumFractionDigits: 6 });



function ChartShell({
  id,
  title,
  subtitle,
  caption,
  light,
  dark,
  mobileLight,
  mobileDark,
  fallbackAlt,
  children,
  table,
}: {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  light: string;
  dark: string;
  mobileLight: string;
  mobileDark: string;
  fallbackAlt: string;
  children: React.ReactNode;
  table: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="research-figure w-full min-w-0"
      aria-labelledby={`${id}-title`}
    >
      <header className="mb-6">
        <h3 id={`${id}-title`} className="text-[17px] font-medium leading-snug text-[var(--color-text)] sm:text-[19px]">
          {title}
        </h3>
        <p className="mt-2 font-mono text-[12px] leading-relaxed text-[var(--color-dim)] sm:text-[12px]">{subtitle}</p>
      </header>

      <div className="wb-chart-interactive">{children}</div>
      <noscript>
        <style>{`
          .wb-chart-interactive{display:none!important}
          .wb-chart-fallback-light{display:none!important}
          .wb-chart-fallback-dark{display:block!important}
          @media (prefers-color-scheme: light){
            .wb-chart-fallback-light{display:block!important}
            .wb-chart-fallback-dark{display:none!important}
          }
        `}</style>
        <div className="overflow-hidden rounded-[2px] border border-[var(--color-border)] bg-[var(--color-bg)]">
          <picture className="wb-chart-fallback-light">
            <source media="(max-width: 639px)" srcSet={mobileLight} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="h-auto w-full" src={light} alt={fallbackAlt} />
          </picture>
          <picture className="wb-chart-fallback-dark">
            <source media="(max-width: 639px)" srcSet={mobileDark} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="h-auto w-full" src={dark} alt={fallbackAlt} />
          </picture>
        </div>
      </noscript>

      <p className="mt-4 font-mono text-[12px] leading-relaxed text-[var(--color-dim)]">{caption}</p>
      <details className="mt-4 border-t border-[var(--color-border)] pt-3">
        <summary className="reading-disclosure"><span>Данные графика</span><IconlyChevronDown size={17} /></summary>
        {table}
      </details>
    </section>
  );
}

type GrowthRow = {
  niche: string;
  multiplier: number;
  displayMultiplier: number;
  base: number;
  latest: number;
  baseLabel: string;
  latestLabel: string;
  salesMultiplier: number;
  displaySalesLabel: string;
  baseDays: number;
  latestDays: number;
};

const GROWTH_ROWS: readonly GrowthRow[] = [
  { niche: "Маскировочные костюмы", multiplier: 75.449856421, displayMultiplier: 75, base: 41570921, latest: 3145136834, baseLabel: "41,6 млн", latestLabel: "3,15 млрд ₽", salesMultiplier: 37.426656711, displaySalesLabel: "≈×37", baseDays: 364, latestDays: 365 },
  { niche: "Разгрузочные пояса", multiplier: 48.25601165, displayMultiplier: 48, base: 10214939, latest: 497017289, baseLabel: "10,2 млн", latestLabel: "497,0 млн ₽", salesMultiplier: 31.204997598, displaySalesLabel: "≈×31", baseDays: 362, latestDays: 365 },
  { niche: "Разгрузочные жилеты", multiplier: 37.53589481, displayMultiplier: 38, base: 32004152, latest: 1204604770, baseLabel: "32,0 млн", latestLabel: "1,20 млрд ₽", salesMultiplier: 22.153100596, displaySalesLabel: "≈×22", baseDays: 364, latestDays: 365 },
  { niche: "Маскировочные сети", multiplier: 22.155634609, displayMultiplier: 22, base: 36828522, latest: 818200923, baseLabel: "36,8 млн", latestLabel: "818,2 млн ₽", salesMultiplier: 19.460565853, displaySalesLabel: "почти ×20", baseDays: 364, latestDays: 365 },
];

const growthColumns: readonly DataTableColumn[] = [
  { header: "Ниша" },
  { header: "Среднедневной индекс GMV" },
  { header: "База" },
  { header: "Последний период" },
  { header: "Среднедневной индекс продаж" },
  { header: "Наблюдаемых дней" },
];

function GrowthBars() {
  const [active, setActive] = useState<number | null>(null);
  const hover = useTooltipHover(() => setActive(null));
  const [pinned, setPinned] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (pinned === null) return;
    const closeOutside = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setPinned(null);
      setActive(null);
    };
    document.addEventListener("pointerdown", closeOutside, true);
    return () => document.removeEventListener("pointerdown", closeOutside, true);
  }, [pinned]);

  const shown = pinned ?? active;
  useEffect(() => {
    if (shown === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setPinned(null);
      setActive(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [shown]);

  const shownRow = shown === null ? null : GROWTH_ROWS[shown];
  const tooltipId = "grafik-1-bar-tooltip";
  return (
    <div ref={rootRef} role="group" aria-label="Среднедневной оценочный GMV четырёх специализированных ниш в последних двенадцати месяцах перед атакой относительно наблюдаемого окна до 24 февраля 2022 года: примерно от 22 до 75 раз">
      <div className="space-y-6">
        {GROWTH_ROWS.map((row, index) => {
          const tooltip = `${row.niche} · среднедневной индекс GMV ${formatX(row.multiplier, 6)} · база ${formatExactRubles(row.base)} · последний период ${formatExactRubles(row.latest)} · среднедневной индекс продаж ${formatX(row.salesMultiplier, 6)} · наблюдаемых дней ${row.baseDays} и ${row.latestDays}`;
          return (
          <button
            key={row.niche}
            ref={(node) => { buttonRefs.current[index] = node; }}
            type="button"
            className="block w-full min-w-0 rounded-[3px] p-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text)] [touch-action:manipulation]"
            aria-label={tooltip}
            aria-describedby={shown === index ? tooltipId : undefined}
            aria-pressed={pinned === index}
            onPointerEnter={(event) => { hover.keep();
              if (event.pointerType === "mouse") setActive(index);
            }}
            onPointerLeave={(event) => { if (event.pointerType === "mouse") hover.leave(); }}
            onFocus={() => setActive(index)}
            onBlur={() => setActive((current) => current === index ? null : current)}
            onClick={() => setPinned((current) => current === index ? null : index)}
            onKeyDown={(event) => {
              const previous = event.key === "ArrowUp" || event.key === "ArrowLeft";
              const next = event.key === "ArrowDown" || event.key === "ArrowRight";
              if (!previous && !next) return;
              event.preventDefault();
              const target = (index + (next ? 1 : -1) + GROWTH_ROWS.length) % GROWTH_ROWS.length;
              setPinned(null);
              setActive(target);
              buttonRefs.current[target]?.focus();
            }}
          >
            <span className="block text-[12px] font-medium leading-snug text-[var(--color-text)] sm:text-[13px]">{row.niche}</span>
            <span className="mt-1 block font-mono text-[12px] tabular-nums text-[var(--color-dim)]">{row.baseLabel} <IconlyArrowRight size={17} className="reading-inline-icon" /> {row.latestLabel}</span>
            <span className="mt-2 grid grid-cols-[minmax(0,1fr)_52px] items-center gap-3 sm:grid-cols-[minmax(0,1fr)_64px]">
              <span className="relative block h-8 overflow-hidden rounded-[2px] border-y border-[var(--color-border)] bg-[var(--color-bg)]">
                {[20, 40, 60, 80].map((tick) => <i key={tick} className="absolute inset-y-0 w-px bg-[var(--color-border)]" style={{ left: `${tick / 80 * 100}%` }} aria-hidden />)}
                <span ref={(node) => { barRefs.current[index] = node; }} className="absolute inset-y-[5px] left-0 rounded-r-[2px] bg-[var(--viz-wb)]" style={{ width: `${row.displayMultiplier / 80 * 100}%` }} aria-hidden />
              </span>
              <span className="font-mono text-[19px] font-medium tabular-nums text-[var(--viz-wb)] sm:text-[22px]">≈×{row.displayMultiplier}</span>
            </span>
            <span className="mt-1 block font-mono text-[12px] text-[var(--color-dim)]">продажи {row.displaySalesLabel}</span>
          </button>
          );
        })}
      </div>
      <div className="mt-4 grid grid-cols-5 pr-[64px] font-mono text-[12px] tabular-nums text-[var(--color-dim)]">
        {[0, 20, 40, 60, 80].map((tick) => <span key={tick} className={tick === 80 ? "text-right" : ""}>{tick === 0 ? "0" : `×${tick}`}</span>)}
      </div>
      <p className="mt-3 font-mono text-[12px] leading-relaxed text-[var(--color-dim)]">
        Наведите или сфокусируйте строку. На сенсорном экране нажмите; повторное нажатие или касание вне графика закрывает подсказку.
      </p>
      {shownRow && (
        <FloatingTooltip onPointerEnter={hover.keep} onPointerLeave={hover.leave} id={tooltipId} anchor={shown === null ? null : barRefs.current[shown]}>
          <p className="font-medium text-[var(--color-text)]">{shownRow.niche}</p>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[var(--color-dim)]">
            <dt>Среднедневной индекс GMV</dt>
            <dd className="text-right tabular-nums text-[var(--color-text)]">{formatX(shownRow.multiplier, 6)}</dd>
            <dt>База</dt>
            <dd className="text-right tabular-nums text-[var(--color-text)]">{formatExactRubles(shownRow.base)}</dd>
            <dt>Последний период</dt>
            <dd className="text-right tabular-nums text-[var(--color-text)]">{formatExactRubles(shownRow.latest)}</dd>
            <dt>Индекс продаж</dt>
            <dd className="text-right tabular-nums text-[var(--color-text)]">{formatX(shownRow.salesMultiplier, 6)}</dd>
            <dt>Наблюдаемых дней</dt>
            <dd className="text-right tabular-nums text-[var(--color-text)]">{shownRow.baseDays} → {shownRow.latestDays}</dd>
          </dl>
        </FloatingTooltip>
      )}
    </div>
  );
}

export function Grafik1() {
  return (
    <ChartShell
      id="grafik-1"
      title="Четыре специализированные ниши выросли примерно в 22-75 раз"
      subtitle="24.02.2021-23.02.2022 → 18.07.2025-17.07.2026 · индекс по среднему за наблюдаемый день"
      caption="Источник: расчёт автора по данным MPStats. Абсолютные значения показывают суммы за наблюдаемые дни указанных календарных окон. Множители GMV и продаж рассчитаны по среднему за наблюдаемый день: в базе доступны 362-364 дня, в последнем периоде 365."
      light="/blog/wb-dual-use/charts/phase2-scale-light.png"
      dark="/blog/wb-dual-use/charts/phase2-scale-dark.png"
      mobileLight="/blog/wb-dual-use/charts/phase2-scale-mobile-light.png"
      mobileDark="/blog/wb-dual-use/charts/phase2-scale-mobile-dark.png"
      fallbackAlt="Четыре горизонтальные полосы на линейной шкале от 0 до 80: маскировочные костюмы выросли примерно в 75 раз, разгрузочные пояса в 48, жилеты в 38, маскировочные сети в 22 раза"
      table={<DataTable columns={growthColumns} rows={GROWTH_ROWS.map((row) => [row.niche, formatX(row.multiplier, 6), formatExactRubles(row.base), formatExactRubles(row.latest), formatX(row.salesMultiplier, 6), `${row.baseDays} → ${row.latestDays}`])} className="mb-0" />}
    >
      <GrowthBars />
    </ChartShell>
  );
}

type AnniversaryWindow = {
  label: string;
  d1: string;
  d2: string;
  observedDays: number;
  revenue: number;
  sales: number;
  index: number;
};

const ANNIVERSARY_WINDOWS: readonly AnniversaryWindow[] = [
  { label: "До", d1: "24.02.2021", d2: "23.02.2022", observedDays: 362, revenue: 10214939, sales: 3764, index: 1 },
  { label: "1-й год", d1: "24.02.2022", d2: "23.02.2023", observedDays: 365, revenue: 84794768, sales: 27030, index: 8.232827 },
  { label: "2-й год", d1: "24.02.2023", d2: "23.02.2024", observedDays: 365, revenue: 364171279, sales: 80753, index: 35.357831 },
  { label: "3-й год", d1: "24.02.2024", d2: "23.02.2025", observedDays: 366, revenue: 507119824, sales: 131087, index: 49.102352 },
  { label: "4-й год", d1: "24.02.2025", d2: "23.02.2026", observedDays: 365, revenue: 464409176, sales: 110796, index: 45.09005 },
];

const anniversaryColumns: readonly DataTableColumn[] = [
  { header: "Окно" },
  { header: "Даты" },
  { header: "Оценочный GMV" },
  { header: "Оценочные продажи" },
  { header: "Дней" },
  { header: "Среднедневной индекс к базе" },
];

function AnniversaryBars() {
  const [active, setActive] = useState<number | null>(null);
  const hover = useTooltipHover(() => setActive(null));
  const [pinned, setPinned] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
  useEffect(() => {
    if (pinned === null) return;
    const closeOutside = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setPinned(null);
      setActive(null);
    };
    document.addEventListener("pointerdown", closeOutside, true);
    return () => document.removeEventListener("pointerdown", closeOutside, true);
  }, [pinned]);
  const shown = pinned ?? active;
  useEffect(() => {
    if (shown === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setPinned(null);
      setActive(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [shown]);
  const shownWindow = shown === null ? null : ANNIVERSARY_WINDOWS[shown];
  const tooltipId = "grafik-2-bar-tooltip";
  return (
    <div ref={rootRef} className="relative" role="group" aria-label="Разгрузочные пояса: один устойчивый ряд, пять последовательных двенадцатимесячных окон и среднедневной индекс оценочного GMV к наблюдаемой базе">
      <div className="mb-3">
        <p className="text-[13px] font-medium text-[var(--color-text)]">Разгрузочные пояса</p>
        <p className="mt-1 font-mono text-[12px] text-[var(--color-dim)]">4-й год: 464,4 млн ₽ · 110 796 оценочных продаж</p>
      </div>
      <div className="relative h-[300px] border-b border-l border-[var(--color-border)] pl-2 sm:h-[330px] sm:pl-4">
        {[20, 40, 60, 80].map((tick) => (
          <div key={tick} className="absolute inset-x-0 border-t border-[var(--color-border)]" style={{ bottom: `${tick / 80 * 100}%` }}>
            <span className="absolute -left-1 -translate-x-full -translate-y-1/2 font-mono text-[8px] text-[var(--color-dim)] sm:text-[12px]">×{tick}</span>
          </div>
        ))}
        <div className="absolute inset-x-2 bottom-0 top-0 grid grid-cols-5 items-end gap-2 sm:inset-x-5 sm:gap-5">
          {ANNIVERSARY_WINDOWS.map((window, index) => {
            const tooltip = `${window.label} · ${window.d1}-${window.d2} · GMV за наблюдаемые дни ${formatExactRubles(window.revenue)} · продажи за наблюдаемые дни ${formatSales(window.sales)} · ${window.observedDays} наблюдаемых дней · среднедневной индекс к базе ${formatExactDailyIndex(window.index)}`;
            const barHeight = Math.max(1.5, window.index / 80 * 100);
            return (
              <div key={window.label} className="h-full min-w-0">
                <button
                  ref={(node) => { buttonRefs.current[index] = node; }}
                  type="button"
                  data-anniversary-bar={index}
                  className="group relative h-full w-full cursor-pointer rounded-[2px] focus-visible:outline-none [touch-action:manipulation]"
                  aria-label={tooltip}
                  aria-describedby={shown === index ? tooltipId : undefined}
                  aria-pressed={pinned === index}
                  onPointerEnter={(event) => { hover.keep();
                    if (event.pointerType === "mouse") setActive(index);
                  }}
                  onPointerLeave={(event) => { if (event.pointerType === "mouse") hover.leave(); }}
                  onFocus={() => setActive(index)}
                  onBlur={() => setActive((current) => current === index ? null : current)}
                  onClick={() => setPinned((current) => current === index ? null : index)}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                    event.preventDefault();
                    const direction = event.key === "ArrowRight" ? 1 : -1;
                    const next = (index + direction + ANNIVERSARY_WINDOWS.length) % ANNIVERSARY_WINDOWS.length;
                    setPinned(null);
                    setActive(next);
                    buttonRefs.current[next]?.focus();
                  }}
                >
                  <span
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[12px] font-medium text-[var(--viz-wb)] sm:text-[12px]"
                    style={{ bottom: `calc(${barHeight}% + 8px)` }}
                  >
                    {index === 0 ? "База" : `≈×${Math.round(window.index)}`}
                  </span>
                  <span
                    ref={(node) => { barRefs.current[index] = node; }}
                    data-bar-anchor
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-1/2 w-9 -translate-x-1/2 rounded-t-[2px] bg-[var(--viz-wb)] transition-[filter,opacity] group-hover:brightness-110 group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-[var(--color-text)] sm:w-14"
                    style={{ height: `${barHeight}%` }}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-2 grid grid-cols-5 gap-2 pl-2 text-center font-mono text-[8.5px] leading-tight text-[var(--color-dim)] sm:pl-4 sm:text-[12px]">
        {ANNIVERSARY_WINDOWS.map((window) => <span key={window.label}>{window.label}</span>)}
      </div>
      <p className="mt-3 font-mono text-[12px] leading-relaxed text-[var(--color-dim)]">
        Наведите или сфокусируйте столбец. На сенсорном экране нажмите; повторное нажатие или касание вне графика закрывает подсказку.
      </p>
      {shownWindow && (
        <FloatingTooltip onPointerEnter={hover.keep} onPointerLeave={hover.leave} id={tooltipId} anchor={shown === null ? null : barRefs.current[shown]}>
          <p className="font-medium text-[var(--color-text)]">{shownWindow.label} · {shownWindow.d1}-{shownWindow.d2}</p>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[var(--color-dim)]">
            <dt>GMV за наблюдаемые дни</dt>
            <dd className="text-right tabular-nums text-[var(--color-text)]">{formatExactRubles(shownWindow.revenue)}</dd>
            <dt>Продажи за наблюдаемые дни</dt>
            <dd className="text-right tabular-nums text-[var(--color-text)]">{formatSales(shownWindow.sales)}</dd>
            <dt>Наблюдаемых дней</dt>
            <dd className="text-right tabular-nums text-[var(--color-text)]">{shownWindow.observedDays}</dd>
            <dt>Среднедневной индекс</dt>
            <dd className="text-right tabular-nums text-[var(--color-text)]">{formatExactDailyIndex(shownWindow.index)}</dd>
          </dl>
        </FloatingTooltip>
      )}
    </div>
  );
}

export function Grafik2() {
  return (
    <ChartShell
      id="grafik-2"
      title="Разгрузочные пояса: как менялся оценочный оборот по годовым окнам"
      subtitle="Среднедневной оценочный GMV MPStats · наблюдаемая база до 24.02.2022 = 1"
      caption="Источник: расчёт автора по данным MPStats. Это один устойчивый кейс: в ряду разгрузочных поясов автоматическая проверка не нашла экстремальных дней, меняющих итог. Календарное базовое окно полное, но содержит 362 наблюдаемых дня; индекс сравнивает средний GMV за наблюдаемый день."
      light="/blog/wb-dual-use/charts/phase2-anniversary-light.png"
      dark="/blog/wb-dual-use/charts/phase2-anniversary-dark.png"
      mobileLight="/blog/wb-dual-use/charts/phase2-anniversary-mobile-light.png"
      mobileDark="/blog/wb-dual-use/charts/phase2-anniversary-mobile-dark.png"
      fallbackAlt="Пять столбцов показывают среднедневной индекс оценочного GMV разгрузочных поясов: база до 24 февраля 2022 года, затем примерно 8, 35, 49 и 45 в четырёх последовательных годах"
      table={<DataTable columns={anniversaryColumns} rows={ANNIVERSARY_WINDOWS.map((window) => [window.label, `${window.d1}-${window.d2}`, formatExactRubles(window.revenue), formatSales(window.sales), window.observedDays, formatExactDailyIndex(window.index)])} className="mb-0" />}
    >
      <AnniversaryBars />
    </ChartShell>
  );
}

const SUPPLY_METRICS = [
  { label: "Оценочный GMV", value: "≈×22", accent: false },
  { label: "Оценочные продажи", value: "почти ×20", accent: false },
  { label: "Среднее дневное число продавцов", value: "≈×59", accent: false },
  { label: "Среднее дневное число карточек", value: ">×100", accent: true },
] as const;

export function SupplyCallout() {
  return (
    <aside className="research-note" aria-labelledby="supply-callout-title">
      <h3 id="supply-callout-title" className="text-[17px] font-medium leading-snug text-[var(--color-text)]">Витрина маскировочных сетей расширялась быстрее оборота</h3>
      <p className="mt-2 font-mono text-[12px] text-[var(--color-dim)]">Маскировочные сети · последний сопоставимый период к наблюдаемой базе</p>
      <div className="research-facts">
        {SUPPLY_METRICS.map((metric) => (
          <ResearchFact key={metric.label} label={metric.label} value={metric.value} />
        ))}
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-[var(--color-dim)]">Между наблюдаемым довоенным окном и последними 12 месяцами перед атакой. Рост числа продавцов и карточек не означает, что доход каждого продавца увеличился.</p>
    </aside>
  );
}
