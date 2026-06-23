"use client";

/**
 * Brock UI charts for the article "Кремний на угле" (nvidia-kazakhstan).
 * FT / Bloomberg / Tufte canon: monochrome graphite (--brock-neutral) for the
 * context series + exactly ONE warm accent at a time (--brock-accent = brand
 * orange = coal / Ekibastuz / "worse / the thing that matters"). Hatching
 * encodes estimates and not-yet-built capacity; numbers in Hack mono; honest
 * gaps. Value labels sit OUTSIDE the bar end (headroom in the value scale) so
 * they read on both the dark charcoal and the white surface.
 *
 * Data + sources: grafiki-spec-kremniy-na-ugle.md (the "(1)" revision).
 * Source attribution lives in each slot's <figcaption> in page.tsx, so the
 * built-in `source` prop is intentionally NOT used; export toolbars are off —
 * these are reader-facing editorial charts, not the Brock UI studio.
 */

import { ColumnChart } from "@/components/charts/column-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";
import { DuelChart } from "@/components/charts/duel-chart";
import { Term } from "@/components/canon/term";

const num = (v: number) => v.toLocaleString("ru-RU");
const NEUTRAL = "var(--brock-neutral)";

/*
 * Full / expanded names for abbreviated or long category labels. On desktop the
 * label sits in full; on mobile the chart clamps it - either way our canonical
 * Term tooltip (hover · tap) reveals the full text. `focusable={false}` because
 * the chart's label column is aria-hidden (the sr-only data table is the a11y
 * path). Labels not in the map render plain (no underline). Used via formatLabel.
 */
const LABEL_TIPS: Record<string, string> = {
  // График 1
  "Заявлено": "Заявленный общий объём - $10 млрд по нескольким соглашениям (слова правительства)",
  "Этап 1 (заявлен)": "Заявленный первый этап - около $5 млрд, в т.ч. ~$1 млрд от «Казахтелекома»; запуск 125 МВт в 2027",
  "Названо твёрдо": "Твёрдо названный капитал - порядка $1 млрд от «Казахтелекома»; остальное обещано привлечь",
  // График 3
  "Старые блоки Экибастуза": "Старые субкритические энергоблоки Экибастуза - оценка 900–1000 г CO₂/кВт·ч",
  "ГРЭС-3 («чистый уголь»)": "ГРЭС-3 - ультрасверхкритические блоки («чистый уголь»), оценка без улавливания CO₂",
  "Казахстан (сеть)": "Казахстан - усреднённая углеродная интенсивность сети (Ember, 2025)",
  "Мир (средн.)": "Мир - среднее значение",
  "ЕС (средн.)": "Евросоюз - среднее значение",
  "Ветер / солнце": "Ветровая и солнечная генерация",
  // График 5
  "Сев. Вирджиния (2030)": "Северная Вирджиния - прогноз доли ЦОД к 2030 (29–46%)",
  "«Долина» при 1 ГВт": "«Долина ЦОДов» при полной мощности 1 ГВт - расчёт автора (8,9 ÷ 117,9 ТВт·ч)",
  "Казахстан сейчас": "Казахстан - все дата-центры сейчас (меньше 1%)",
  // График 7
  "Сервис Alstom (ВВ-оборуд.)": "Сервис высоковольтного оборудования Alstom (20/220/500 кВ) - лот 4439122",
  "Огнезащита машзала": "Огнезащита машинного зала",
  "Лифт, энергоблок №7": "Замена лифта на энергоблоке №7 - лот 4443640",
  "Рекультивация золоотвала": "Рекультивация накопителя промотходов (золоотвала) - лот 4451958",
  "Капремонт трансформатора": "Капитальный ремонт резервного трансформатора",
};

const labelTip = (label: string): React.ReactNode => {
  const tip = LABEL_TIPS[label];
  return tip ? (
    <Term focusable={false} tip={tip}>
      {label}
    </Term>
  ) : (
    label
  );
};

// Tells BarChart which labels carry a tooltip, so the dotted "tap me" affordance
// is painted on the truncating clip box (iOS-safe) rather than the Term node.
const hasTip = (label: string): boolean => label in LABEL_TIPS;

/* ── График 1. Десять миллиардов на бумаге — воронка «заявлено → твёрдо» ── */
export function Grafik1() {
  return (
    <BarChart
      barThickness={40}
      gap={16}
      barRadius={2}
      labelWidth={132}
      xAxis={{ max: 13.5 }}
      slots={{ tooltip: () => null }}
      formatLabel={labelTip}
      labelInteractive={hasTip}
      data={[
        { label: "Заявлено", value: 10, color: NEUTRAL, pattern: "hatched" },
        { label: "Этап 1 (заявлен)", value: 5, color: NEUTRAL, pattern: "hatched" },
        { label: "Названо твёрдо", value: 1 },
      ]}
      formatValue={(v: number) => `$${num(v)} млрд`}
    />
  );
}

/* ── График 2. Под цифровое будущее строят новый уголь — мощность по годам ── */
export function Grafik2() {
  return (
    <ColumnChart
      height={260}
      barRadius={2}
      data={[
        { label: "2025", value: 4400, color: NEUTRAL },
        { label: "2028", value: 4940, color: NEUTRAL },
        { label: "2030", value: 5480, color: NEUTRAL },
        { label: "2032", value: 8120, pattern: "hatched" },
      ]}
      referenceLine={{ value: 1000, label: "Спрос «Долины» - 1 ГВт" }}
      yAxis={{ max: 10000 }}
      slots={{ tooltip: () => null }}
      formatValue={(v: number) => `${num(v)} МВт`}
    />
  );
}

/* ── График 3. Самая грязная розетка — углеродная интенсивность ── */
export function Grafik3() {
  return (
    <BarChart
      barThickness={28}
      gap={10}
      barRadius={2}
      labelWidth={200}
      xAxis={{ max: 1500 }}
      slots={{ tooltip: () => null }}
      formatLabel={labelTip}
      labelInteractive={hasTip}
      data={[
        { label: "Старые блоки Экибастуза", value: 950, pattern: "hatched" },
        { label: "ГРЭС-3 («чистый уголь»)", value: 800, pattern: "hatched" },
        { label: "Казахстан (сеть)", value: 604 },
        { label: "Мир (средн.)", value: 450, color: NEUTRAL },
        { label: "США", value: 385, color: NEUTRAL },
        { label: "ЕС (средн.)", value: 250, color: NEUTRAL },
        { label: "Ветер / солнце", value: 35, color: NEUTRAL },
      ]}
      formatValue={(v: number) => `${num(v)} г/кВт·ч`}
    />
  );
}

/* ── График 4 (главный). Две линии, которым не суждено встретиться ── */
export function Grafik4() {
  return (
    <LineChart
      height={300}
      lineWidth={2.5}
      directLabels
      lastValueDot
      xScale="point"
      x={["2024", "2027", "2030", "2033", "2035"]}
      data={[
        {
          key: "fact",
          name: "по факту",
          emphasis: true,
          data: [100, 106, 112, 115, 116],
        },
        {
          key: "promise",
          name: "обещано",
          dashed: true,
          data: [100, 94, 85, 78, 74],
        },
      ]}
      events={[{ x: "2030", label: "2030: выбросы всё ещё растут" }]}
      yAxis={{ title: "выбросы, индекс (2024 = 100)" }}
      formatValue={(v: number) => `${num(Math.round(v))}`}
    />
  );
}

/* ── График 5. Где дата-центры уже перегрузили сеть — доля ЦОД ── */
export function Grafik5() {
  return (
    <BarChart
      barThickness={28}
      gap={10}
      barRadius={2}
      labelWidth={184}
      xAxis={{ max: 56 }}
      slots={{ tooltip: () => null }}
      formatLabel={labelTip}
      labelInteractive={hasTip}
      data={[
        { label: "Сев. Вирджиния (2030)", value: 37, pattern: "hatched" },
        { label: "Ирландия", value: 22 },
        { label: "«Долина» при 1 ГВт", value: 7, pattern: "hatched" },
        { label: "США", value: 2.5, color: NEUTRAL },
        { label: "ЕС", value: 2.5, color: NEUTRAL },
        { label: "Казахстан сейчас", value: 0.8, color: NEUTRAL },
      ]}
      formatValue={(v: number) => `${num(v)}%`}
    />
  );
}

/* ── График 6. Та же гонка, противоположное топливо — дуэль ── */
export function Grafik6() {
  return (
    <DuelChart
      leftLabel="Нарвик"
      rightLabel="Экибастуз"
      leftTag="Норвегия · ВИЭ"
      rightTag="Казахстан · уголь"
      verdictSide="right"
      rows={[
        {
          param: "Углеродная интенсивность",
          left: { value: "~17 г/кВт·ч", n: 17 },
          right: { value: "604 г/кВт·ч", n: 604, worse: true },
        },
        {
          param: "Цена электроэнергии",
          left: { value: "3–4 ¢/кВт·ч", n: 3.5 },
          right: { value: "~2,5 ¢ [оценка]", n: 2.5 },
        },
        {
          param: "Цена углерода",
          left: { value: "~€70/т (EU ETS)", n: 70 },
          right: { value: "~$0,87/т (KZ ETS)", n: 0.87, worse: true },
        },
        {
          param: "Зрелость финансирования",
          left: { value: "закрытое банковское" },
          right: { value: "рамочное + term sheet", worse: true },
        },
        {
          param: "Якорный клиент",
          left: { value: "Microsoft · $14 млрд" },
          right: { value: "не объявлен", worse: true },
        },
        {
          param: "Новая генерация",
          left: { value: "ВИЭ-PPA" },
          right: { value: "новые угольные блоки", worse: true },
        },
      ]}
    />
  );
}

/* ── График 7. Станцию латают под дата-центр — закупки ГРЭС-1 ── */
export function Grafik7() {
  return (
    <BarChart
      barThickness={28}
      gap={10}
      barRadius={2}
      labelWidth={205}
      xAxis={{ max: 760 }}
      slots={{ tooltip: () => null }}
      formatLabel={labelTip}
      labelInteractive={hasTip}
      data={[
        { label: "Сервис Alstom (ВВ-оборуд.)", value: 480.9 },
        { label: "Огнезащита машзала", value: 168.9, color: NEUTRAL },
        { label: "Лифт, энергоблок №7", value: 29.0, color: NEUTRAL },
        { label: "Рекультивация золоотвала", value: 15.0, color: NEUTRAL },
        { label: "Капремонт трансформатора", value: 11.3, color: NEUTRAL },
      ]}
      formatValue={(v: number) => `${num(v)} млн ₸`}
    />
  );
}
