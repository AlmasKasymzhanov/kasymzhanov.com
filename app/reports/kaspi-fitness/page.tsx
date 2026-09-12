"use client";
import { HeatCell, HeatLegend } from "@/components/charts/table-visuals";
import { ResearchSection, ResearchFact, ResearchNote, ResearchFigure } from "@/components/canon/research-editorial";
import { ResearchReadingTime } from "@/components/canon/research-reading-time";

import { ResearchTooltip, type ResearchTooltipProps } from "@/components/charts/research-tooltip";

import {
  ComposedChart, BarChart, Bar, Line, Area, AreaChart, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine,
} from "recharts";

/* ───────────── Bloomberg-terminal enterprise system ─────────────
   Dark, dense, precise. Amber signature accent. Color encodes data only.
   Geist for UI/type, Menlo for every numeral. */
const C = {
  bg: "var(--personal-paper)",
  panel: "var(--personal-paper)",
  panel2: "var(--personal-paper)",
  line: "var(--personal-border)",
  lineSoft: "var(--personal-border)",
  text: "var(--personal-text)",
  sub: "var(--personal-muted)",
  faint: "var(--personal-border)",
  amber: "var(--personal-text)",   // Bloomberg signature
  pos: "var(--personal-text)",
  neg: "var(--personal-text)",
  info: "var(--personal-text)",
};
const FONT = "var(--font-body)";
const MONO = "var(--font-mono)";

const sBody: React.CSSProperties = { fontFamily: FONT, fontSize: "var(--reading-body-size)", lineHeight: 1.72, color: C.text, margin: "0 0 14px" };
const sKick: React.CSSProperties = { fontFamily: MONO, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: C.sub };
const sCap: React.CSSProperties = { fontFamily: MONO, fontSize: 11, lineHeight: 1.55, color: "var(--personal-muted)", marginTop: 10, letterSpacing: "0.02em" };
const mono: React.CSSProperties = { fontFamily: MONO, fontVariantNumeric: "tabular-nums" };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Tip(props: ResearchTooltipProps) { return <ResearchTooltip {...props} unit={props.unit ?? "млн ₸"} />; }
const axis = { fontFamily: MONO, fontSize: 10.5, fill: C.sub };
const grid = { stroke: C.lineSoft, strokeDasharray: "0", vertical: false } as const;

/* ───────────── data (unchanged) ───────────── */
const MARKET = [
  { m: "JAN", a: 1573, f: 2051 }, { m: "FEB", a: 1758, f: 2443 },
  { m: "MAR", a: 1302, f: 1803 }, { m: "APR", a: 970, f: 1332 },
  { m: "MAY", a: 809, f: 1101 }, { m: "JUN", a: 984, f: 1330 },
  { m: "JUL", a: 877, f: 1176 }, { m: "AUG", a: 1122, f: 1494 },
  { m: "SEP", a: 1036, f: 1371 }, { m: "OCT", a: 1219, f: null },
  { m: "NOV", a: 1924, f: null }, { m: "DEC", a: 1816, f: null },
];
const STEP = [
  { m: "11·24", v: 18 }, { m: "12·24", v: 19 }, { m: "01·25", v: 26 },
  { m: "02·25", v: 32 }, { m: "03·25", v: 31 }, { m: "04·25", v: 24 },
  { m: "05·25", v: 26 }, { m: "06·25", v: 80 }, { m: "07·25", v: 86 },
  { m: "08·25", v: 100 }, { m: "09·25", v: 119 }, { m: "10·25", v: 119 },
  { m: "11·25", v: 173 }, { m: "12·25", v: 148 }, { m: "01·26", v: 313 },
  { m: "02·26", v: 336 }, { m: "03·26", v: 211 }, { m: "04·26", v: 115 },
  { m: "05·26", v: 101 }, { m: "06·26", v: 268 }, { m: "07·26", v: 256 },
  { m: "08·26", v: 270 }, { m: "09·26", v: 296 },
];
const PROFILES = [
  { m: "JAN", Беговые: 867, Климат: 339, Вибро: 258 },
  { m: "FEB", Беговые: 885, Климат: 388, Вибро: 313 },
  { m: "MAR", Беговые: 618, Климат: 277, Вибро: 235 },
  { m: "APR", Беговые: 410, Климат: 205, Вибро: 216 },
  { m: "MAY", Беговые: 326, Климат: 182, Вибро: 195 },
  { m: "JUN", Беговые: 411, Климат: 263, Вибро: 165 },
  { m: "JUL", Беговые: 387, Климат: 266, Вибро: 147 },
  { m: "AUG", Беговые: 516, Климат: 311, Вибро: 165 },
  { m: "SEP", Беговые: 499, Климат: 286, Вибро: 134 },
  { m: "OCT", Беговые: 625, Климат: 630, Вибро: 136 },
  { m: "NOV", Беговые: 1084, Климат: 1043, Вибро: 157 },
  { m: "DEC", Беговые: 1031, Климат: 872, Вибро: 152 },
];
const MATRIX = [
  ["Степперы", 336, 0.179, 925], ["Очистители/увлажнители", 599, 0.067, 101],
  ["Силовые тренажёры", 79, 0.045, 65], ["Эспандеры", 63, 0.044, 69],
  ["Массажные валики (МФР)", 27, 0.043, 68], ["Шведские стенки", 57, 0.035, 42],
  ["Фитболы и медболы", 17, 0.035, 53], ["Беговые дорожки", 1331, 0.033, 35],
  ["Скакалки", 8, 0.031, 68], ["Турники", 108, 0.029, 32],
  ["Коврики для йоги", 50, 0.028, 33], ["Штанги", 26, 0.021, 36],
  ["Скамьи и стойки", 39, 0.017, 25], ["Велотренажёры", 186, 0.016, 19],
  ["Эллиптические", 135, 0.010, 13], ["Гантели и наборы", 178, 0.005, 7],
  ["Балансировочные", 16, 0.002, 5], ["Одежда для похудения", 52, 0.0, 2],
  ["Осушители воздуха", 28, -0.016, -18], ["Гребные тренажёры", 42, -0.021, -16],
  ["Инверсионные столы", 59, -0.024, -19], ["Виброплатформы", 171, -0.032, -31],
  ["Райдеры", 7, -0.044, -41], ["Ролики для пресса", 35, -0.045, -39],
] as [string, number, number, number][];
const TABLE: [string, string, number, number, number[], string, string][] = [
  ["Беговые дорожки", "grow", 1331, 35, [867, 885, 618, 410, 326, 411, 387, 516, 499, 625, 1084, 1031], "FEB", "Крупнейший рынок (1.33 B ₸), растёт, но GENAU-моно ~60 %"],
  ["Очистители/увлажнители", "boom", 599, 101, [339, 388, 277, 205, 182, 263, 266, 311, 286, 630, 1043, 872], "NOV", "Растёт +100 %, премиум-маржа, пик окт–дек"],
  ["Степперы", "boom", 336, 925, [26, 32, 31, 24, 26, 80, 86, 100, 119, 119, 173, 148], "ALL", "Взрыв ×18, десезонился — главная возможность"],
  ["Велотренажёры", "stable", 186, 19, [128, 159, 122, 85, 66, 80, 68, 92, 79, 96, 143, 147], "FEB", "Стабильно, GENAU-моно, мало места"],
  ["Виброплатформы", "fall", 171, -31, [258, 313, 235, 216, 195, 165, 147, 165, 134, 136, 157, 152], "FEB", "−45 % YoY — не входить"],
  ["Эллиптические", "stable", 135, 13, [89, 104, 81, 50, 42, 45, 34, 54, 40, 49, 92, 91], "FEB", "Нишевый премиум, GENAU-моно"],
  ["Инверсионные столы", "fall", 59, -19, [64, 80, 69, 60, 47, 48, 39, 42, 42, 42, 61, 56], "FEB", "Угасает — не входить"],
];

/* ───────────── primitives ───────────── */
function Section({ id, num: n, title, sub, children }: { id: string; num: string; title: string; sub?: string; children: React.ReactNode }) { return <ResearchSection id={id} title={title} description={sub}>{children}</ResearchSection>; }
function Stat({ label, value, hint, last }: { label: string; value: string; hint: string; last?: boolean }) { return <ResearchFact label={label} value={value} note={hint} />; }
function Note({ tag, tone, title, children }: { tag: string; tone: "pos" | "neg" | "amber" | "info"; title: string; children: React.ReactNode }) { return <ResearchNote title={title}>{children}</ResearchNote>; }
function Well({ children, label, cap }: { children: React.ReactNode; label: string; cap: string }) { return <ResearchFigure title={label} caption={cap}>{children}</ResearchFigure>; }
const STAT: Record<string, [string, string]> = {
  boom: [C.pos, "BOOM"], grow: [C.pos, "GROW"], stable: [C.sub, "FLAT"], fall: [C.neg, "FALL"],
};

/* ───────────── page ───────────── */
export default function KaspiFitnessPage() {
  const TOC: [string, string][] = [
    ["s0", "Резюме"], ["s1", "Сезонность рынка"], ["s2", "Степперы ×18"],
    ["s3", "Рост и падение"], ["s4", "Тренажёр vs климат"],
    ["s5", "Восемь ниш"], ["s6", "Рекомендации"], ["s7", "Методология"],
  ];
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: FONT, WebkitFontSmoothing: "antialiased" }}>
      {/* terminal status bar */}
      <div style={{ borderBottom: `1px solid ${C.line}`, background: "#070809" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "8px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", ...mono, fontSize: 10.5, color: C.sub, letterSpacing: "0.06em" }}>
          <span style={{ color: C.amber, fontWeight: 400 }}>агрегированные рыночные данные&nbsp;INTELLIGENCE</span>
          <span><span style={{ color: C.pos }}>●</span> LIVE&nbsp;·&nbsp;KASPI.KZ&nbsp;·&nbsp;16M&nbsp;DATA&nbsp;·&nbsp;2026-05-15</span>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "44px 28px 96px" }}>

        {/* MASTHEAD */}
        <header className="research-header" style={{ borderBottom: `1px solid ${C.line}`, paddingBottom: 28, marginBottom: 28 }}>
          <div style={{ ...sKick, color: C.amber, marginBottom: 16 }}>Kaspi.kz · Спорт-инвентарь &amp; Климат · Enterprise Brief</div>
          <h1 style={{ fontFamily: FONT, fontSize: 38, fontWeight: 500, margin: "0 0 16px", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            Тренажёры, фитнес и климат на&nbsp;Kaspi.kz
          </h1>
          <p className="research-lead" style={{ fontFamily: FONT, fontSize: 17, color: C.sub, margin: 0, lineHeight: 1.58, maxWidth: 680 }}>
            Анализ спроса и ассортимента 29 категорий за полтора года. Сезонность фитнеса — зеркало кемпинга: пик зимой, провал летом. Внутри — взрыв степперов ×18, монополия GENAU и список угасающих категорий.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 0, marginTop: 26, border: `1px solid ${C.line}`, background: C.panel }}>
            {[
              ["Подготовлено для", "Сергей Соколунин"],
              ["Автор анализа", "Алмас Касымжанов"],
              ["Дата", "15·05·2026"],
              ["Источник", "агрегированные рыночные данные Kaspi.kz"],
            ].map(([k, v], i, arr) => (
              <div key={k} style={{ flex: "1 1 180px", padding: "14px 18px" }}>
                <div style={{ ...sKick, fontSize: 9, marginBottom: 6 }}>{k}</div>
                <div style={{ fontFamily: FONT, fontSize: 14.5, fontWeight: 400, color: C.text }}>{v}</div>
              </div>
            ))}
          </div>

<ResearchReadingTime />
</header>

        {/* TOC */}
        <nav style={{ display: "flex", flexWrap: "wrap", gap: "6px 8px", marginBottom: 52 }}>
          {TOC.map(([id, t], i) => (
            <a key={id} href={`#${id}`} style={{ ...mono, fontSize: 11, color: C.sub, textDecoration: "none", border: `1px solid ${C.line}`, padding: "5px 11px", letterSpacing: "0.03em" }}>
              <span style={{ color: C.amber }}>{String(i).padStart(2, "0")}</span>&nbsp;&nbsp;{t}
            </a>
          ))}
        </nav>

        {/* 0 — SUMMARY */}
        <Section id="s0" num="00" title="Резюме">
          <div className="research-facts" >
            <Stat label="Сезон тренажёров" value="ЗИМА" hint="Пик ноя–фев, провал май–июл" />
            <Stat label="Зима ÷ лето" value="×2.08" hint="6 ниш: 4.77B vs 2.29B ₸" />
            <Stat label="Степперы / 15 мес" value="×18" hint="18 → 336 M ₸ · тренд +0.179" />
            <Stat label="Падающих категорий" value="6" hint="вибро −45%, ролики −39%…" last />
          </div>
          <Note tag="01" tone="info" title="Сезонность — зеркало кемпинга">
            Тренажёры и климат пикуют <b>ноябрь–февраль</b> (Kaspi Juma в ноябре + новогодние решения + холода = тренировки дома) и проваливаются <b>май–июль</b>. Сейчас (май) ниша входит в низкий сезон. Закуп под главный сезон — август–сентябрь, продажи — октябрь (Juma)–февраль. С кемпингом это идеальный антицикл.
          </Note>
          <Note tag="02" tone="pos" title="Главная возможность — степперы">
            Рост ×18 за 15 месяцев (SKU 11→75, продавцов 9→51 — органический взрыв). Категория десезонилась (прогноз держит 250–296 M ₸ и летом). Низкий чек, фрагментированная конкуренция — самый доступный вход во всём обзоре.
          </Note>
          <Note tag="03" tone="amber" title="Монополия GENAU">
            Один продавец с собственным брендом держит ~60 % беговых дорожек (786 M ₸), ~100 % велотренажёров и эллиптических. «В лоб» в эти ниши заходить бессмысленно — только дифференциация (компактное / умное / детское / сервис).
          </Note>
          <Note tag="04" tone="neg" title="Не входить">
            Структурный спад: виброплатформы (−45 % YoY), ролики для пресса (−39 %), райдеры (−41 %), инверсионные столы (−19 %), гребные (−16 %), осушители. Большой текущий объём (вибро 171 M ₸) обманчив.
          </Note>
        </Section>

        {/* 1 — MARKET */}
        <Section id="s1" num="01" title="Сезонность рынка" sub="Рынок «Тренажёры» целиком, млрд ₸. Столбцы — факт 2025, линия — факт/прогноз 2026. Пик — ноябрь (Kaspi Juma), дно — май.">
          <Well label="MARKET · ТРЕНАЖЁРЫ · 2025 vs 2026" cap="Профиль: пик ноябрь → плато дек–фев → дно май–июль → восстановление авг–окт. Прогноз-2026 повторяет форму с поправкой на рост рынка (+25–35 %).">
            <ResponsiveContainer initialDimension={{width:640,height:320}} width="100%" height={330}>
              <ComposedChart accessibilityLayer aria-label="Выручка категорий: млн тенге" data={MARKET} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid {...grid} />
                <XAxis dataKey="m" tick={axis} tickLine={false} axisLine={{ stroke: C.line }} />
                <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}`} width={32} />
                <Tooltip content={<Tip />} cursor={{ fill: "#FFFFFF08" }} />
                <Legend wrapperStyle={{ fontFamily: MONO, fontSize: 10.5, color: C.sub, letterSpacing: "0.04em" }} iconType="plainline" />
                <Bar name="ФАКТ 2025" dataKey="a" maxBarSize={32}>
                  {MARKET.map((d, i) => (
                    <Cell key={i} fill="var(--chart-accent)" />
                  ))}
                </Bar>
                <Line isAnimationActive={false} strokeDasharray="6 4" name="2026 ФАКТ/ПРОГНОЗ" dataKey="f" stroke="var(--chart-secondary)" strokeWidth={1.75} dot={{ r: 2.5, fill: "var(--chart-secondary)", strokeWidth: 0 }} connectNulls />
              </ComposedChart>
            </ResponsiveContainer>
          </Well>
          <p style={sBody}>
            Три драйвера зимнего пика: <b>Kaspi Juma в ноябре</b> (крупнейший месяц года почти у всех категорий), <b>новогодний цикл</b> «начну заниматься» (дек–фев) и <b>холодовой фактор</b> (тренировки уходят домой). Лето — обратный отток: улица, зал, отпуск, дача.
          </p>
        </Section>

        {/* 2 — STEPPERS */}
        <Section id="s2" num="02" title="Степперы — взрыв ×18" sub="Траектория выручки 11·2024 → 09·2026, млн ₸. Сплошная — факт, маркер — переход в прогноз. Рост через расширение SKU (11→75) и продавцов (9→51) — органический.">
          <Well label="STEPPERS · 00898 · TRAJECTORY" cap="Два скачка: июнь-2025 (×3) и январь-2026 (×2). Виральный продукт — балансировочный степпер с эспандерами ≈14 700 ₸: 2 566 продаж, 20 продавцов.">
            <ResponsiveContainer initialDimension={{width:640,height:320}} width="100%" height={300}>
              <AreaChart data={STEP} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid {...grid} />
                <XAxis dataKey="m" tick={{ ...axis, fontSize: 9.5 }} tickLine={false} axisLine={{ stroke: C.line }} interval={1} angle={-40} textAnchor="end" height={46} />
                <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}`} width={32} />
                <Tooltip content={<Tip title="Выручка" />} cursor={{ stroke: C.amber, strokeDasharray: "3 3" }} />
                <ReferenceLine x="02·26" stroke={C.faint} strokeDasharray="3 3" label={{ value: "ПРОГНОЗ →", fill: C.faint, fontFamily: MONO, fontSize: 9.5, position: "insideTopRight" }} />
                <Area dataKey="v" stroke="var(--chart-accent)" strokeWidth={1.75} fill="color-mix(in srgb, var(--chart-accent) 8%, transparent)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Well>
          <div style={{ display: "block", marginBottom: 24 }}>
            <Note tag="A" tone="pos" title="Почему это вход">
              Десезонился — продаётся и в мае-июле, редкость для тренажёров. Низкий чек. Премиум-сегмент (≈63 k ₸) крупнейший по деньгам (102 M); массовый фрагментирован — есть место для бренда.
            </Note>
            <Note tag="B" tone="neg" title="Риск">
              Виральные категории остывают. Короткие партии, помесячный мониторинг, не перетариваться. Путь виброплатформ (взлёт → спад) — важно не опоздать с выходом при развороте тренда.
            </Note>
          </div>
        </Section>

        {/* 3 — MATRIX */}
        <Section id="s3" num="03" title="Рост и падение" sub="24 товарные категории по устойчивой динамике после поправки на сезонность. Зелёное — растёт, красное — падает. Такой ряд надёжнее простого сравнения год к году.">
          <Well label="МАТРИЦА УСТОЙЧИВОЙ ДИНАМИКИ" cap="Ассортиментный сдвиг: растёт всё компактное и доступное для дома; падает громоздкое и нишевое.">
            <ResponsiveContainer initialDimension={{width:640,height:320}} width="100%" height={580}>
              <BarChart accessibilityLayer aria-label="Динамика выручки: млн тенге" data={MATRIX.map((r) => ({ n: r[0], t: r[2] * 1000 }))} layout="vertical" margin={{ top: 4, right: 28, left: 8, bottom: 0 }}>
                <CartesianGrid stroke={C.lineSoft} strokeDasharray="0" horizontal={false} />
                <XAxis type="number" tick={axis} tickLine={false} axisLine={false} tickFormatter={(v: number) => (v > 0 ? `+${v}` : `${v}`)} />
                <YAxis type="category" dataKey="n" tick={{ fontFamily: FONT, fontSize: 11.5, fill: C.text }} width={158} tickLine={false} axisLine={false} />
                <Tooltip content={<Tip unit="" title="trend ×1000" />} cursor={{ fill: "#FFFFFF06" }} />
                <ReferenceLine x={0} stroke={C.sub} />
                <Bar dataKey="t" maxBarSize={12}>
                  {MATRIX.map((r, i) => (
                    <Cell key={i} fill={r[2] >= 0 ? "var(--chart-above)" : "var(--chart-below)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Well>
          <Note tag="—" tone="amber" title="Ассортиментный мегатренд">
            Растёт компактное и доступное для дома — степперы, эспандеры, массажные валики/МФР, фитболы, коврики (+30…70 %). Падает громоздкое и нишевое — виброплатформы, инверсионные, гребные, ролики для пресса. Покупатель смещается в лёгкий домашний фитнес.
          </Note>
        </Section>

        {/* 4 — PROFILES */}
        <Section id="s4" num="04" title="Тренажёр vs климат" sub="Беговые дорожки · Очистители/увлажнители · Виброплатформы, факт 2025, млн ₸. Климат пикует раньше и резче; виброплатформы — плоский спад без сезона.">
          <Well label="PROFILES · 2025 ACTUAL · M ₸" cap="Беговые и климат синхронны по сезону, но климат взлетает уже с октября (×3.4 окт→ноя — старт отопления). Виброплатформы пика не имеют — медленно сползают весь год.">
            <ResponsiveContainer initialDimension={{width:640,height:320}} width="100%" height={310}>
              <ComposedChart accessibilityLayer aria-label="Индекс тренда категорий" data={PROFILES} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid {...grid} />
                <XAxis dataKey="m" tick={axis} tickLine={false} axisLine={{ stroke: C.line }} />
                <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}`} width={34} />
                <Tooltip content={<Tip />} cursor={{ fill: "#FFFFFF08" }} />
                <Legend wrapperStyle={{ fontFamily: MONO, fontSize: 10.5, color: C.sub, letterSpacing: "0.04em" }} iconType="plainline" />
                <Bar name="БЕГОВЫЕ ДОРОЖКИ" dataKey="Беговые" fill="var(--chart-accent)" maxBarSize={20} />
                <Line isAnimationActive={false} strokeDasharray="0" name="КЛИМАТ" dataKey="Климат" stroke="var(--chart-secondary)" strokeWidth={1.75} dot={{ r: 2.5, strokeWidth: 0 }} />
                <Line isAnimationActive={false} name="ВИБРОПЛАТФОРМЫ" dataKey="Вибро" stroke="var(--chart-tertiary)" strokeWidth={1.5} strokeDasharray="6 4" dot={{ r: 2.5, strokeWidth: 0 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </Well>
        </Section>

        {/* 5 — TABLE */}
        <Section id="s5" num="05" title="Восемь ниш" sub="Помесячно 2025 (млн ₸), Feb-2026, зимний YoY и вердикт. Интенсивность ячеек показывает выручку; шкала единая для всех ниш и месяцев.">
          <div style={{ overflowX: "auto", marginBottom: 12, border: `1px solid ${C.line}` }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: C.panel2 }}>
                  {["Ниша", "Стат", "Feb26", "YoY", "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D", "Вердикт"].map((h, i) => (
                    <th key={i} style={{ padding: "10px 7px", textAlign: i === 0 || i === 16 || i === 1 ? "left" : "right", color: C.amber, fontWeight: 500, whiteSpace: "nowrap", fontSize: 9.5, fontFamily: MONO, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: `1px solid ${C.line}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE.map((r, ri) => {
                  const [col, lbl] = STAT[r[1]];
                  const series = r[4] as number[];
                  const mx = Math.max(...series);
                  return (
                    <tr key={ri} style={{ borderBottom: `1px solid ${C.lineSoft}` }}>
                      <td style={{ padding: "10px 7px", color: C.text, fontWeight: 500, whiteSpace: "nowrap", fontFamily: FONT, fontSize: 13 }}>{r[0]}</td>
                      <td style={{ padding: "10px 7px", color: col, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.05em" }}>{lbl}</td>
                      <td style={{ padding: "10px 7px", textAlign: "right", color: C.text, fontWeight: 500, ...mono }}>{r[2]}</td>
                      <td style={{ padding: "10px 7px", textAlign: "right", color: (r[3] as number) >= 0 ? C.pos : C.neg, fontWeight: 500, ...mono }}>{(r[3] as number) >= 0 ? "+" : ""}{r[3]}%</td>
                      {series.map((v, ci) => (
                        <HeatCell key={ci} value={v} scale={{ max: Math.max(...TABLE.flatMap(row => row[4] as number[])) }} label={`${r[0]} · ${["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"][ci]} 2025 · млн ₸`} />
                      ))}
                      <td style={{ padding: "10px 10px", color: C.sub, fontFamily: FONT, fontSize: 12, minWidth: 230, lineHeight: 1.45 }}>{r[6]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <HeatLegend label="Выручка, млн ₸ · единая шкала" scale={{ max: Math.max(...TABLE.flatMap(row => row[4] as number[])) }} />
          <p style={sCap}>J–D = январь…декабрь 2025. Полные ряды и прогноз 2026 — в текстовом отчёте агрегированные рыночные данные.</p>
        </Section>

        {/* 6 — RECS */}
        <Section id="s6" num="06" title="Рекомендации">
          <div style={{ border: `1px solid ${C.line}`, marginBottom: 22 }}>
            {[
              ["Степперы — сейчас", "Единственная ниша без сезонного «нельзя в мае»: десезонилась и растёт ×18. Низкий чек, фрагментированная конкуренция — место для бренда."],
              ["Очистители/увлажнители — к осени", "Крупно (600 M+), +100 % YoY, премиум-маржа. Целиться в средний сегмент (≈22–40 k ₸) или увлажнители-фокус. Закуп август–сентябрь."],
              ["Лёгкий домашний фитнес", "Эспандеры, массажные валики/МФР, коврики, фитболы: +50…70 %, слабая сезонность, дёшево входить, ровная торговля круглый год."],
              ["Беговые — только дифференцированно", "Крупнейший рынок, но GENAU-моно. Угол: компактные/складные, умные, детские, реабилитация, сервис + сборка + гарантия."],
            ].map(([t, d], i, arr) => (
              <div key={i} style={{ display: "flex", gap: 18, padding: "16px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.lineSoft}` : "none" }}>
                <span style={{ ...mono, fontSize: 18, fontWeight: 400, color: C.amber, lineHeight: 1.2, minWidth: 28 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 14, lineHeight: 1.62 }}><b style={{ color: C.text }}>{t}.</b> <span style={{ color: C.sub }}>{d}</span></span>
              </div>
            ))}
          </div>
          <div style={{ ...sKick, fontSize: 10, marginBottom: 12 }}>Календарь сезона · тренажёры + климат</div>
          <div style={{ border: `1px solid ${C.line}`, marginBottom: 22 }}>
            {[
              ["МАЙ–ИЮЛ — сейчас", "Низкий сезон. Не разгонять тренажёры/климат. Работать со степперами и лёгким инвентарём. Тест новых SKU малыми партиями"],
              ["АВГ–СЕН", "Главный закуп под осень: тренажёры, климат, турники. Готовить листинги, отзывы, цены"],
              ["ОКТ", "Разгон. Старт роста климата (отопление). Полный сток к концу месяца"],
              ["НОЯ — KASPI JUMA", "Пик года. Держать цену и контроль out-of-stock"],
              ["ДЕК–ФЕВ", "Высокое плато (НГ + «решения с нового года»). Допродажи"],
              ["МАР–АПР", "Спад. Распродажа остатков, не дозакупать «зимнее»"],
            ].map((r, i, arr) => (
              <div key={i} style={{ display: "flex", gap: 0, borderBottom: i < arr.length - 1 ? `1px solid ${C.lineSoft}` : "none" }}>
                <div style={{ ...mono, fontSize: 11.5, fontWeight: 400, color: C.amber, padding: "12px 16px", width: 170, flexShrink: 0, letterSpacing: "0.04em" }}>{r[0]}</div>
                <div style={{ fontFamily: FONT, fontSize: 13.5, color: C.sub, padding: "12px 16px", lineHeight: 1.55 }}>{r[1]}</div>
              </div>
            ))}
          </div>
          <Note tag="∞" tone="info" title="Стратегический инсайт — антицикл">
            Кемпинг пикует в июне (закуп в мае), фитнес/климат — в ноябре (закуп в августе–сентябре). Продавец с обеими нишами загружает склад и оборотку круглый год без простоя: лето — кемпинг, зима — фитнес и климат.
          </Note>
        </Section>

        {/* 7 — METHOD */}
        <Section id="s7" num="07" title="Методология">
          <p style={sBody}>
            <b>Источник.</b> агрегированные рыночные данные Kaspi.kz: <span style={mono}>помесячный ряд</span> + <span style={mono}>прогнозный ряд</span> (16 мес факта + прогноз, объект сезонности), <span style={mono}>ценовые сегменты</span>, <span style={mono}>структура брендов</span>, <span style={mono}>товарный срез</span>. 29 категорий.
          </p>
          <p style={sBody}>
            <b>Проверка.</b> Сезонный паттерн воспроизводится у всех «зимних» категорий независимо. Взрыв степперов валидирован по «физике»: SKU 11→75, продавцов 9→51, заказов 703→13 244 — органический рост, не дубль данных. Падающие категории — leaf с непрерывным рядом.
          </p>
          <Note tag="!" tone="neg" title="Ограничения (учтены)">
            Зимний рост год к году у мелких категорий завышен перестройкой каталога Kaspi в 2025 году. Поэтому ранжирование опирается на устойчивую динамику ряда, а годовое сравнение используется только как дополнительный сигнал. «Очистители и увлажнители» представлены одной объединённой категорией: раздельная выручка в срезе недоступна. Ценовые сегменты и товары относятся только к текущему периоду.
          </Note>
          <p style={{ ...sCap, marginTop: 6 }}>B ₸ = млрд тенге · M ₸ = млн тенге · «факт» — данные Kaspi · «прогноз» — расчётная модель (тренд × сезонность).</p>
          <footer style={{ marginTop: 40, paddingTop: 18, borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, ...mono, fontSize: 10.5, color: "var(--personal-muted)", letterSpacing: "0.05em" }}>
            <span>АВТОР: <b style={{ color: C.sub }}>АЛМАС КАСЫМЖАНОВ</b> · ДЛЯ: <b style={{ color: C.sub }}>СЕРГЕЙ СОКОЛУНИН</b></span>
            <span>kasymzhanov.com · 2026-05-15</span>
          </footer>
        </Section>

      </div>
    </div>
  );
}
