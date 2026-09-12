"use client";

/**
 * Brock UI charts for «Маркетплейс умер. Он вам позвонит» (freedom-market).
 * Spec: brock-ui-charts-spec.md v2 (Downloads). Bloomberg Businessweek / FT
 * canon: flat fills, generous air, thin axes, no gradients/shadows/3D; ONE warm
 * Colour = entity (Datawrapper style-guide canon, one entity - one colour
 * everywhere): Kaspi red, Freedom teal-green, WB magenta, Ozon blue, Uzum
 * violet (--viz-* tokens, theme-aware); graphite (--brock-neutral) for
 * context. Headlines are theses (in the page's ChartSlot), sources in
 * captions, hyphens with spaces instead of dashes (canon of this material).
 *
 * Г1 timeline · Г2 Uzum/Teez cards · Г3 small multiples · Г4 fee ladder ·
 * Г5 fashion share stacked bars · Г6 FBW seasonal wave. The tenge-journey
 * special project lives in tenge-journey.tsx (locale-aware).
 */

import { useEffect, useRef, useState } from "react";
import { ColumnChart } from "@/components/charts/column-chart";
import { LineChart } from "@/components/charts/line-chart";
import { Term } from "@/components/canon/term";

const num = (v: number) => v.toLocaleString("ru-RU");
const NEUTRAL = "var(--brock-neutral)";

/* Reveal-on-scroll: returns [ref, visible]. Fires once when the element enters
 * the viewport; `prefers-reduced-motion` short-circuits to visible so nothing
 * ever animates for users who opted out. */
function useReveal<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

/* Plain-words colour legend (the orange/grey decoder). */
function Legend({ items }: { items: { color: string; label: string; faint?: boolean }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3.5 font-mono text-[12px] leading-snug text-[var(--color-dim)]">
      {items.map((it) => (
        <span key={it.label} className="inline-flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-block w-3 h-3 rounded-[2px] shrink-0"
            style={{ background: it.color, opacity: it.faint ? 0.3 : 1 }}
          />
          <span>{it.label}</span>
        </span>
      ))}
    </div>
  );
}

/* Small sub-caption for panel headers inside composite charts. */
function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-dim)] mb-2">
      {children}
    </p>
  );
}

/* ── ГРАФИК 1. Хроника Teez: обещания против дат ──────────────────────
 * Vertical two-track timeline (the responsive form of the spec's horizontal
 * two-lane shkala): centre spine, promises left, facts right on desktop;
 * stacked with track badges on mobile. Domain/SSL events carry the accent -
 * the only events nobody announced. */
type TimelineEvent = {
  date: string;
  side: "promise" | "fact";
  text: React.ReactNode;
  accent?: boolean;
  /** Renders the 19.02 promise/fact pair as one visually-locked conflict row. */
  pairWithNext?: boolean;
};

const TIMELINE: TimelineEvent[] = [
  { date: "06.2024", side: "promise", text: <>«50 стран за 5 лет»</> },
  { date: "09.2024", side: "fact", text: <>Запуск: доставка за день, склад в Караганде</> },
  { date: "весна 2025", side: "fact", text: <>Пик: 11 тыс. заказов/день, 28 тыс. продавцов, 32 города</> },
  {
    date: "19–21.01.2026",
    side: "promise",
    text: <>«Нас покупает крупный <Term tip="Финансовые технологии: платежи, кредиты, инвестиции внутри цифровых продуктов.">финтех</Term>» (имя под <Term tip="Non-disclosure agreement - соглашение о неразглашении.">NDA</Term>); «задержки - переходный период, 1,5–2 недели»</>,
  },
  {
    date: "12.02.2026",
    side: "fact",
    text: <><Term tip="Предварительное соглашение об основных условиях сделки, ещё не сама сделка.">Term sheet</Term>, <Term tip="Комплексная проверка компании перед покупкой: финансы, долги, юридические риски.">due diligence</Term> <Term tip="Четыре крупнейшие мировые аудиторские компании: Deloitte, PwC, EY, KPMG.">«большой четвёрки»</Term></>,
  },
  {
    date: "19.02.2026",
    side: "promise",
    text: <>«Транш в течение двух недель, погасим долги»</>,
    pairWithNext: true,
  },
  {
    date: "19.02.2026",
    side: "fact",
    text: <>Письмо селлера в Exclusive.kz: выплат нет «уже второй месяц»</>,
  },
  { date: "12.03.2026", side: "fact", text: <>Из учредителей выходит Ерлан Исекешев</> },
  {
    date: "20.04.2026",
    side: "promise",
    text: <>Турлов о маркетплейсе на форуме Kursiv: «Будет это партнёрство или полностью своя платформа - мы ещё определяем»</>,
  },
  { date: "24.04.2026", side: "fact", text: <>Уход основателей Хуснуллина и Ерёмина</> },
  {
    date: "09.05.2026",
    side: "fact",
    text: <>Регистрация домена fmarket.kz, владелец скрыт</>,
    accent: true,
  },
  {
    date: "13.05.2026",
    side: "fact",
    text: <><Term tip="Цифровой сертификат безопасности сайта; его выпуск означает, что доменом активно управляют.">SSL-сертификат</Term> на fmarket.kz - включая почтовый поддомен</>,
    accent: true,
  },
  { date: "01.06.2026", side: "fact", text: <>Freedom объявляет единый бренд</> },
  { date: "05.07.2026", side: "fact", text: <>Звонок и письмо селлерам от «Freedom Market (ранее Teez)»</> },
];

function TimelineRow({
  ev,
  visible,
  delay,
  lit,
  current,
}: {
  ev: TimelineEvent;
  visible: boolean;
  delay: number;
  /** The scroll "runner" has passed this row: its spine segment is coloured. */
  lit: boolean;
  /** The runner is ON this row: its dot pulses. */
  current: boolean;
}) {
  const isPromise = ev.side === "promise";
  const badge = (
    <span
      className={`inline-block font-mono text-[12px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-[2px] border ${
        isPromise
          ? "text-[var(--color-dim)] border-[var(--color-border)]"
          : ev.accent
            ? "text-[var(--viz-freedom)] border-[var(--viz-freedom)]"
            : "text-[var(--color-text)] border-[var(--color-border)] bg-[var(--color-border)]/30"
      }`}
    >
      {isPromise ? "обещание" : "факт"}
    </span>
  );
  const body = (
    <div className={`min-w-0 ${isPromise ? "md:text-right" : ""}`}>
      <p className="font-mono text-[12px] text-[var(--color-dim)] tabular-nums mb-1">{ev.date}</p>
      <p className={`text-[13px] leading-snug mb-1.5 ${ev.accent ? "text-[var(--viz-freedom)] font-medium" : isPromise ? "text-[var(--color-dim)] italic" : "text-[var(--color-text)]"}`}>
        {ev.text}
      </p>
      {badge}
    </div>
  );
  return (
    <div
      data-tl-row
      className="grid grid-cols-[14px_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_14px_minmax(0,1fr)] gap-x-3 md:gap-x-4 transition-[opacity,transform] duration-500 ease-out"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(10px)", transitionDelay: `${delay}ms` }}
    >
      {/* Desktop: promise column (left) */}
      <div className="hidden md:block">{isPromise ? body : null}</div>
      {/* Spine dot + the scroll runner: the segment fills with colour as the
       * reader passes it, the current dot pulses (motion-reduce: static). */}
      <div className="relative flex justify-center">
        <span className="absolute top-0 bottom-0 w-px bg-[var(--color-border)]" aria-hidden />
        <span
          aria-hidden
          className="absolute top-0 w-px transition-[height] duration-500 ease-out"
          style={{ height: lit ? "100%" : "0%", background: "var(--viz-freedom)" }}
        />
        {current && (
          <span
            aria-hidden
            className="absolute mt-1 w-2.5 h-2.5 rounded-full animate-ping motion-reduce:hidden"
            style={{ background: "var(--viz-freedom)", opacity: 0.5 }}
          />
        )}
        <span
          aria-hidden
          className="relative mt-1 inline-block w-2.5 h-2.5 rounded-full border-2 transition-colors duration-300"
          style={{
            borderColor: ev.accent || lit ? "var(--viz-freedom)" : "var(--brock-neutral)",
            background: isPromise ? "var(--color-bg)" : ev.accent ? "var(--viz-freedom)" : "var(--brock-neutral)",
          }}
        />
      </div>
      {/* Desktop: fact column (right); mobile: everything */}
      <div className="pb-6 md:pb-7">
        <div className="md:hidden">{body}</div>
        <div className="hidden md:block">{!isPromise ? body : null}</div>
      </div>
    </div>
  );
}

export function Grafik1() {
  const [ref, visible] = useReveal<HTMLDivElement>();
  /* The scroll runner: rows whose top has crossed ~55% of the viewport are
   * "lit" — their spine segments fill with the Freedom colour, the last lit
   * dot pulses. Reduced motion lights everything statically. */
  const [litCount, setLitCount] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLitCount(TIMELINE.length);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const trigger = window.innerHeight * 0.55;
        let n = 0;
        el.querySelectorAll("[data-tl-row]").forEach((r) => {
          if (r.getBoundingClientRect().top < trigger) n++;
        });
        setLitCount(n);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  /* Group the 19.02 promise/fact pair (the spec's key visual conflict) into a
   * dashed frame; everything else renders as plain rows. */
  const rows: React.ReactNode[] = [];
  for (let i = 0; i < TIMELINE.length; i++) {
    const ev = TIMELINE[i];
    if (ev.pairWithNext && i + 1 < TIMELINE.length) {
      rows.push(
        <div key={`pair-${i}`} className="relative border border-dashed border-[var(--color-dim)]/60 rounded-[3px] px-3 pt-4 -mx-3 mb-2">
          <span className="absolute -top-2 left-2 px-1.5 bg-[var(--color-surface)] font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--color-text)]">
            один день - два жанра
          </span>
          <TimelineRow ev={ev} visible={visible} delay={i * 70} lit={i < litCount} current={i === litCount - 1} />
          <TimelineRow ev={TIMELINE[i + 1]} visible={visible} delay={(i + 1) * 70} lit={i + 1 < litCount} current={i + 1 === litCount - 1} />
        </div>,
      );
      i++;
    } else {
      rows.push(
        <TimelineRow key={`${ev.date}-${i}`} ev={ev} visible={visible} delay={i * 70} lit={i < litCount} current={i === litCount - 1} />,
      );
    }
  }
  return (
    <div ref={ref}>
      {/* Track headers (desktop) */}
      <div className="hidden md:grid grid-cols-[minmax(0,1fr)_14px_minmax(0,1fr)] gap-x-4 mb-4">
        <SubLabel><span className="block text-right">Публичные обещания</span></SubLabel>
        <span aria-hidden />
        <SubLabel>Что происходило</SubLabel>
      </div>
      <div>{rows}</div>
      <p className="mt-2 text-[13px] font-medium text-[var(--color-text)] border-l-2 border-[var(--color-dim)] pl-3">
        Пресс-релиза о сделке нет до сих пор. Отдел продаж уже работает.
      </p>
      <Legend
        items={[
          { color: "var(--viz-freedom)", label: "события, которых никто не анонсировал (домен и почта)" },
          { color: NEUTRAL, label: "хроника по публикациям и реестрам" },
        ]}
      />
    </div>
  );
}

/* ── ТАБЛИЦА 2. Uzum и Teez: одна модель, два исхода ─────────────────
 * Datawrapper-style editorial table: label column left in caps, hairline row
 * separators, tabular-nums values, and mini bar cells for the fintech share
 * (the row that IS the story). Bars animate in on first view. */


function CompareRow({
  label,
  uzum,
  teez,
  uzumBar,
  teezBar,
  visible,
}: {
  label: React.ReactNode;
  uzum: React.ReactNode;
  teez: React.ReactNode;
  uzumBar?: number;
  teezBar?: number;
  visible?: boolean;
}) {
  return (
    <>
      <div data-chart-inspect tabIndex={0} data-chart-title="Uzum" className="col-span-2 md:col-span-1 border-t border-[var(--color-border)] pt-2 pb-2.5 md:pr-3">
        <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--color-dim)] mb-0.5">{label}</p>
        <p className="text-[13px] leading-snug text-[var(--color-text)] tabular-nums">{uzum}</p>

      </div>
      <div data-chart-inspect tabIndex={0} data-chart-title="Teez" className="col-span-2 md:col-span-1 border-t border-[var(--color-border)]/60 md:border-[var(--color-border)] pt-2 pb-2.5 md:pl-3 md:border-l">
        <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--color-dim)]/60 mb-0.5 md:opacity-0" aria-hidden="true">{label} · Teez</p>
        <p className="text-[13px] leading-snug text-[var(--color-dim)] tabular-nums">{teez}</p>

      </div>
    </>
  );
}

export function Grafik2() {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div className="grid grid-cols-2 md:grid-cols-2">
        <div className="pr-3 pb-2">
          <p className="text-[15px] font-medium text-[var(--viz-uzum)]">Uzum</p>
          <p className="font-mono text-[12px] text-[var(--color-dim)]">Узбекистан</p>
        </div>
        <div className="pl-3 pb-2 border-l border-[var(--color-border)]">
          <p className="text-[15px] font-medium text-[var(--color-dim)]">Teez</p>
          <p className="font-mono text-[12px] text-[var(--color-dim)]">Казахстан</p>
        </div>
        <CompareRow label="Рассрочка" uzum={<>Nasiya - с первого дня</>} teez={<>«Следующий этап» - не наступил</>} />
        <CompareRow
          label={<><Term tip="Gross merchandise value - суммарная стоимость всех товаров, проданных через площадку; главная мера размера маркетплейса.">GMV</Term> 2024</>}
          uzum={<>$345 млн, ×2,4 за год</>}
          teez={<>не раскрывался</>}
        />
        <CompareRow
          label="Финтех в обороте"
          uzum={<>~50%</>}
          teez={<>0%</>}
          uzumBar={50}
          teezBar={0}
          visible={visible}
        />
        <CompareRow
          label="Итог"
          uzum={<><b>Раунд Tencent, оценка $1,5 млрд</b> - первый единорог страны (08.2025)</>}
          teez={<>Продажа с долгами перед продавцами (2026)</>}
        />
      </div>
      <p className="mt-4 text-[13px] font-medium text-[var(--color-text)] border-l-2 border-[var(--color-dim)] pl-3">
        Вся разница - в одном продукте, включённом на год раньше.
      </p>
    </div>
  );
}

/* ── ГРАФИК 3. Банк внутри витрины против банка по соседству ─────────── */
export function Grafik3() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
        <div>
          {/* FT annotation canon: the headline figure sits in the panel header
           * (label → number → chart, one Z-line), not floated to the corner. */}
          <SubLabel>Ozon · финтех-выручка, млрд ₽</SubLabel>
          <p className="mt-1.5 mb-3 font-mono tabular-nums leading-none">
            <span className="text-[21px] font-medium" style={{ color: "var(--viz-ozon)" }}>+120%</span>
            <span className="ml-2 text-[12px] text-[var(--color-dim)]">за 2025-й</span>
          </p>
          {/* FT column canon: columns ≈70% of the band, capped — never full-bleed slabs. */}
          <div className="max-w-[190px]">
            <ColumnChart
              height={190}
              barRadius={2}
              gap={18}
              accent="var(--viz-ozon)"
              /* Ozon IR, FY2025: fintech revenue ₽88.8B (2024, comparable
               * base) → ₽195.2B (2025), +120% y/y. The draft spec mislabelled
               * the years (93.3 was 2024-as-originally-reported, not 2023). */
              data={[
                { label: "2024", value: 88.8, color: NEUTRAL },
                { label: "2025", value: 195.2 },
              ]}
              yAxis={{ max: 210, hideTicks: true }}

              dataLabels={{ show: true, format: (v: number) => num(v) }}
              formatValue={(v: number) => `${num(v)} млрд ₽`}
            />
          </div>
          <p className="mt-3 font-mono text-[12px] leading-snug text-[var(--color-dim)]">
            финтех даёт &gt;80%{" "}
            <Term tip="Прибыль до вычета процентов, налогов и амортизации; показатель операционной прибыльности.">EBITDA</Term>{" "}
            группы (2024)
          </p>
        </div>
        <div>
          <SubLabel>СберМегаМаркет · продажи, млрд ₽</SubLabel>
          <p className="mt-1.5 mb-3 font-mono tabular-nums leading-none">
            <span className="text-[21px] font-medium" style={{ color: "var(--viz-negative)" }}>−93%</span>
            <span className="ml-2 text-[12px] text-[var(--color-dim)]">за 2025-й</span>
          </p>
          <div className="max-w-[270px]">
            <ColumnChart
              height={190}
              barRadius={2}
              gap={18}
              accent="var(--viz-negative)"
              data={[
                { label: "2023", value: 312, color: NEUTRAL },
                { label: "2024", value: 342.6, color: NEUTRAL },
                { label: "2025", value: 24.5 },
              ]}
              yAxis={{ max: 380, hideTicks: true }}

              dataLabels={{ show: true, format: (v: number) => num(v) }}
              formatValue={(v: number) => `${num(v)} млрд ₽`}
            />
          </div>
          <p className="mt-3 font-mono text-[12px] leading-snug text-[var(--color-dim)]">
            итог: с 4-го на 38-е место среди онлайн-ритейлеров
          </p>
        </div>
      </div>
      <p className="mt-6 text-[13px] font-medium text-[var(--color-text)] border-l-2 border-[var(--color-dim)] pl-3">
        У Сбера было больше денег и данных. У Ozon банк был внутри витрины.
      </p>
    </div>
  );
}

/* ── ГРАФИК 4. Комиссионная лесенка Freedom Market ──────────────────── */
export function Grafik4() {
  const pct = (v: number) => `${v.toLocaleString("ru-RU")}%`;
  return (
    <div>
      {/* FT column canon: cap the plot width so 7 columns stay columns. */}
      <div className="max-w-[480px]">
        <ColumnChart
          height={250}
          barRadius={2}
          gap={10}
          accent="var(--viz-freedom)"
          data={[
            { label: "Карта", value: 5, color: NEUTRAL },
            { label: "Кредит", value: 5, color: NEUTRAL },
            { label: "3 мес", value: 6, color: NEUTRAL },
            { label: "6 мес", value: 8, color: NEUTRAL },
            { label: "9 мес", value: 11, color: NEUTRAL },
            { label: "12 мес", value: 13, color: NEUTRAL },
            { label: "24 мес", value: 14 },
          ]}
          yAxis={{ max: 16, hideTicks: true }}

          dataLabels={{ show: true, format: pct }}
          formatValue={pct}
        />
      </div>
      <p className="mt-5 text-[13px] font-medium text-[var(--color-text)] border-l-2 border-[var(--color-dim)] pl-3">
        +9{" "}
        <Term tip="Процентные пункты - разница между двумя процентными значениями: 14% против 5% - это 9 п.п.">п.п.</Term>{" "}
        - цена двух лет рассрочки для продавца.
      </p>
      <p className="mt-3 font-mono text-[12px] leading-snug italic text-[var(--color-dim)]">
        <Term tip="Фондирование - привлечение банком денег, из которых он выдаёт кредиты; чем дешевле фондирование, тем дешевле кредит.">Фондирование</Term>{" "}
        двух лет по депозитным ставкам стоит банку в 1,7–2 раза дороже этих 9 пунктов.
      </p>
      <Legend
        items={[
          { color: NEUTRAL, label: "оплата картой, кредитом и короткие рассрочки" },
          { color: "var(--viz-freedom)", label: "24 месяца - самая дорогая клетка прейскуранта" },
        ]}
      />
    </div>
  );
}

/* ── ГРАФИК 5. Доля моды в обороте: Wildberries против Kaspi ─────────── */
function ShareBar({
  label,
  share,
  detail,
  color,
  visible,
}: {
  label: string;
  share: number;
  detail: string;
  /** Entity colour (Datawrapper canon: one entity = one colour everywhere). */
  color: string;
  visible: boolean;
}) {
  return (
    <div data-chart-inspect tabIndex={0} data-chart-title={label}>
      <div className="flex items-baseline justify-between gap-3 mb-1.5">
        <span className="font-mono text-[12.5px] text-[var(--color-text)]">{label}</span>
        <span className="font-mono text-[13px] font-medium tabular-nums" style={{ color }}>
          {share.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%
        </span>
      </div>
      <div className="h-6 rounded-[2px] overflow-hidden flex bg-[var(--color-border)]/40" role="img" aria-label={`${label}: одежда и обувь ${share}% оборота`}>
        <div
          className="h-full shrink-0 transition-[width] duration-700 ease-out"
          style={{ width: visible ? `${share}%` : "0%", background: color }}
        />
      </div>
      <p className="mt-1 font-mono text-[12px] text-[var(--color-dim)]">{detail}</p>
    </div>
  );
}

export function Grafik5() {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div className="space-y-5">
        <ShareBar
          label="Wildberries"
          share={24.7}
          detail="5,7 из 23,2 трлн ₽ заказов · июль 2025 - июнь 2026"
          color="var(--viz-wb)"
          visible={visible}
        />
        <p className="text-[13px] font-medium text-[var(--color-text)] border-l-2 border-[var(--color-dim)] pl-3">
          ×3,6 - недопредставленность моды на Kaspi (сопоставление структур по разным окнам: порядок величины, не точный коэффициент)
        </p>
        <ShareBar
          label="Kaspi"
          share={6.8}
          detail="11,6 из 168,8 млрд ₸ · апрель 2026, топ-15 категорий · электроника на Kaspi - 27,4%"
          color="var(--viz-kaspi)"
          visible={visible}
        />
      </div>
      <Legend
        items={[
          { color: "var(--viz-wb)", label: "Wildberries - доля одежды и обуви" },
          { color: "var(--viz-kaspi)", label: "Kaspi - доля одежды и обуви" },
          { color: NEUTRAL, label: "остальные категории одной массой" },
        ]}
      />
      <p className="mt-2 font-mono text-[12px] italic leading-relaxed text-[var(--color-dim)]">
        WB - год, заказы; Kaspi - месячный срез топ-15 категорий; сопоставление структур, не абсолютов.
      </p>
    </div>
  );
}

/* ── ГРАФИК 6. Сезонная волна фулфилмента WB ─────────────────────────── */
export function Grafik6() {
  return (
    <div>
      <LineChart
        height={230}
        lineWidth={3}
        markers="always"
        directLabels={false}
        accent="var(--viz-wb)"
        xScale="point"
        x={["Июл", "Авг", "Сен", "Окт", "Ноя", "Дек", "Янв", "Фев", "Мар", "Апр", "Май", "Июн"]}
        data={[
          {
            /* April is a source-data anomaly: the accent line BREAKS there (an
             * honest gap, per the component's missing-data canon) and the value
             * renders as a standalone grey marker in the second series. */
            name: "FBW-доля рынка WB",
            data: [
              { y: 24.4 },
              { y: 28.5 },
              { y: 35.3 },
              { y: 47.6 },
              { y: 48.1 },
              { y: 50.3, note: "пик сезона: половина оборота WB идёт со складов площадки" },
              { y: 49.6 },
              { y: 47.6 },
              { y: 46.5 },
              { y: null },
              { y: 44.4 },
              { y: 34.2 },
            ],
            emphasis: true,
          },
          {
            name: "апрель - аномалия источника",
            data: [null, null, null, null, null, null, null, null, null, { y: 34.0, note: "аномалия данных источника (data-suspect)" }, null, null],
            color: NEUTRAL,
          },
        ]}
        /* Peak marker: bare rule, no rotated label (it clipped) — the legend's
         * first entry carries the «декабрь - 50,3%» reading. */
        events={[{ x: "Дек" }]}
        yAxis={{ min: 0, max: 60 }}
        formatValue={(v: number) => `${v.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`}
      />
      <Legend
        items={[
          { color: "var(--viz-wb)", label: "декабрь - 50,3%: в пик сезона половина оборота WB идёт со складов площадки" },
          { color: NEUTRAL, label: "апрель (34,0%) - аномалия данных источника" },
        ]}
      />
      <p className="mt-2 font-mono text-[12px] leading-snug text-[var(--color-dim)]">
        Мода при этом живёт на складе круглый год:{" "}
        <Term tip="FBW - Fulfillment by Wildberries: товар заранее лежит на складе WB, площадка сама собирает и везёт заказ.">FBW-доля</Term>{" "}
        одежды не опускается ниже 76%.
      </p>
    </div>
  );
}
