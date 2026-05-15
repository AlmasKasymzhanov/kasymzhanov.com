"use client";

import {
  ComposedChart, BarChart, Bar, Line, Area, AreaChart, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine,
} from "recharts";

/* ───────────── design system · FT / Tufte editorial ─────────────
   Paper-cream background, ink type, hairline rules, restrained palette.
   Color encodes data only (positive / negative); everything else is ink. */
const C = {
  paper: "#FFF1E5",   // FT signature cream
  panel: "#FBF0E2",   // chart well — barely distinct
  ink: "#1A1714",     // near-black text
  sub: "#6E6258",     // muted secondary
  faint: "#9A8E80",   // tertiary / captions
  rule: "#E4D7C4",    // hairline
  ruleSoft: "#EFE5D6",
  pos: "#1F6F54",     // growth (deep green)
  neg: "#B23B2E",     // decline (oxblood red)
  accent: "#127DB3",  // single editorial accent (FT teal-blue)
};
const SERIF = "Georgia, 'Times New Roman', Times, serif";
const SANS = "'Inter', system-ui, -apple-system, sans-serif";

const sLead: React.CSSProperties = { fontFamily: SERIF, fontSize: 18, lineHeight: 1.62, color: C.ink, margin: "0 0 14px" };
const sBody: React.CSSProperties = { fontFamily: SERIF, fontSize: 15.5, lineHeight: 1.7, color: C.ink, margin: "0 0 14px" };
const sKicker: React.CSSProperties = { fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: C.sub };
const sCaption: React.CSSProperties = { fontFamily: SANS, fontSize: 12, lineHeight: 1.55, color: C.faint, marginTop: 10 };
const num: React.CSSProperties = { fontFamily: SANS, fontVariantNumeric: "tabular-nums" };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Tip({ active, payload, label, unit = "M ₸", title }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{ background: C.paper, border: `1px solid ${C.ink}`, padding: "7px 11px", fontFamily: SANS, fontSize: 12, color: C.ink }}>
      {label != null && <div style={{ color: C.sub, marginBottom: 3, letterSpacing: "0.04em" }}>{label}</div>}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((p: any, i: number) => p.value == null ? null : (
        <div key={i} style={{ ...num, color: p.color && p.color !== C.ink ? p.color : C.ink }}>
          {title || p.name}: <b>{unit === "×" ? `×${p.value}` : `${p.value}${unit ? " " + unit : ""}`}</b>
        </div>
      ))}
    </div>
  );
}

const axis = { fontFamily: SANS, fontSize: 11, fill: C.sub };
const gridProps = { stroke: C.rule, strokeDasharray: "0", vertical: false } as const;

/* ───────────── data (unchanged) ───────────── */
const MARKET = [
  { m: "Янв", a: 1573, f: 2051 }, { m: "Фев", a: 1758, f: 2443 },
  { m: "Мар", a: 1302, f: 1803 }, { m: "Апр", a: 970, f: 1332 },
  { m: "Май", a: 809, f: 1101 }, { m: "Июн", a: 984, f: 1330 },
  { m: "Июл", a: 877, f: 1176 }, { m: "Авг", a: 1122, f: 1494 },
  { m: "Сен", a: 1036, f: 1371 }, { m: "Окт", a: 1219, f: null },
  { m: "Ноя", a: 1924, f: null }, { m: "Дек", a: 1816, f: null },
];
const STEP = [
  { m: "Ноя·24", v: 18 }, { m: "Дек·24", v: 19 }, { m: "Янв·25", v: 26 },
  { m: "Фев·25", v: 32 }, { m: "Мар·25", v: 31 }, { m: "Апр·25", v: 24 },
  { m: "Май·25", v: 26 }, { m: "Июн·25", v: 80 }, { m: "Июл·25", v: 86 },
  { m: "Авг·25", v: 100 }, { m: "Сен·25", v: 119 }, { m: "Окт·25", v: 119 },
  { m: "Ноя·25", v: 173 }, { m: "Дек·25", v: 148 }, { m: "Янв·26", v: 313 },
  { m: "Фев·26", v: 336 }, { m: "Мар·26", v: 211 }, { m: "Апр·26", v: 115 },
  { m: "Май·26", v: 101 }, { m: "Июн·26", v: 268 }, { m: "Июл·26", v: 256 },
  { m: "Авг·26", v: 270 }, { m: "Сен·26", v: 296 },
];
const PROFILES = [
  { m: "Янв", Беговые: 867, Климат: 339, Вибро: 258 },
  { m: "Фев", Беговые: 885, Климат: 388, Вибро: 313 },
  { m: "Мар", Беговые: 618, Климат: 277, Вибро: 235 },
  { m: "Апр", Беговые: 410, Климат: 205, Вибро: 216 },
  { m: "Май", Беговые: 326, Климат: 182, Вибро: 195 },
  { m: "Июн", Беговые: 411, Климат: 263, Вибро: 165 },
  { m: "Июл", Беговые: 387, Климат: 266, Вибро: 147 },
  { m: "Авг", Беговые: 516, Климат: 311, Вибро: 165 },
  { m: "Сен", Беговые: 499, Климат: 286, Вибро: 134 },
  { m: "Окт", Беговые: 625, Климат: 630, Вибро: 136 },
  { m: "Ноя", Беговые: 1084, Климат: 1043, Вибро: 157 },
  { m: "Дек", Беговые: 1031, Климат: 872, Вибро: 152 },
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
  ["Беговые дорожки", "grow", 1331, 35, [867, 885, 618, 410, 326, 411, 387, 516, 499, 625, 1084, 1031], "Фев", "Крупнейший рынок (1.33 B ₸), растёт, но GENAU-моно ~60 %"],
  ["Очистители/увлажнители", "boom", 599, 101, [339, 388, 277, 205, 182, 263, 266, 311, 286, 630, 1043, 872], "Ноя", "Растёт +100 %, премиум-маржа, пик окт–дек"],
  ["Степперы", "boom", 336, 925, [26, 32, 31, 24, 26, 80, 86, 100, 119, 119, 173, 148], "весь год", "Взрыв ×18, десезонился — главная возможность"],
  ["Велотренажёры", "stable", 186, 19, [128, 159, 122, 85, 66, 80, 68, 92, 79, 96, 143, 147], "Фев", "Стабильно, GENAU-моно, мало места"],
  ["Виброплатформы", "fall", 171, -31, [258, 313, 235, 216, 195, 165, 147, 165, 134, 136, 157, 152], "Фев", "−45 % YoY — не входить"],
  ["Эллиптические", "stable", 135, 13, [89, 104, 81, 50, 42, 45, 34, 54, 40, 49, 92, 91], "Фев", "Нишевый премиум, GENAU-моно"],
  ["Инверсионные столы", "fall", 59, -19, [64, 80, 69, 60, 47, 48, 39, 42, 42, 42, 61, 56], "Фев", "Угасает — не входить"],
];

/* ───────────── primitives ───────────── */
function Section({ id, num: n, title, sub, children }: { id: string; num: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ marginBottom: 64 }}>
      <div style={{ borderTop: `2px solid ${C.ink}`, paddingTop: 10, marginBottom: sub ? 8 : 26 }}>
        <div style={sKicker}>{n} —</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 27, fontWeight: 700, color: C.ink, margin: "6px 0 0", letterSpacing: "-0.01em", lineHeight: 1.18 }}>{title}</h2>
      </div>
      {sub && <p style={{ ...sBody, color: C.sub, fontSize: 16, margin: "0 0 26px", maxWidth: 680 }}>{sub}</p>}
      {children}
    </section>
  );
}
function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div style={{ flex: "1 1 180px", padding: "2px 22px 2px 0" }}>
      <div style={{ ...sKicker, fontSize: 10.5, marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 700, color: C.ink, lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ fontFamily: SANS, fontSize: 12, color: C.sub, marginTop: 8, lineHeight: 1.5 }}>{hint}</div>
    </div>
  );
}
function Note({ tag, tone, title, children }: { tag: string; tone: "pos" | "neg" | "accent" | "ink"; title: string; children: React.ReactNode }) {
  const col = tone === "pos" ? C.pos : tone === "neg" ? C.neg : tone === "accent" ? C.accent : C.ink;
  return (
    <div style={{ borderLeft: `2px solid ${col}`, padding: "2px 0 2px 18px", marginBottom: 20 }}>
      <div style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: col, marginBottom: 6 }}>
        {tag} · {title}
      </div>
      <div style={{ fontFamily: SERIF, fontSize: 15.5, color: C.ink, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}
function Well({ children, cap }: { children: React.ReactNode; cap: string }) {
  return (
    <figure style={{ margin: "0 0 18px" }}>
      <div style={{ background: C.panel, border: `1px solid ${C.rule}`, padding: "20px 18px 14px" }}>{children}</div>
      <figcaption style={sCaption}>{cap}</figcaption>
    </figure>
  );
}
const STAT: Record<string, [string, string]> = {
  boom: [C.pos, "Взрыв"], grow: [C.pos, "Растёт"], stable: [C.sub, "Стабильно"], fall: [C.neg, "Падает"],
};

/* ───────────── page ───────────── */
export default function KaspiFitnessPage() {
  const TOC: [string, string][] = [
    ["s0", "Резюме"], ["s1", "Сезонность рынка"], ["s2", "Степперы — взрыв ×18"],
    ["s3", "Рост и падение"], ["s4", "Тренажёр против климата"],
    ["s5", "Восемь ниш"], ["s6", "Рекомендации"], ["s7", "Методология"],
  ];
  return (
    <div style={{ minHeight: "100vh", background: C.paper, color: C.ink, fontFamily: SERIF, WebkitFontSmoothing: "antialiased" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "56px 28px 96px" }}>

        {/* MASTHEAD */}
        <header style={{ borderBottom: `3px double ${C.ink}`, paddingBottom: 26, marginBottom: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
            <span style={{ ...sKicker, fontSize: 11.5, color: C.ink }}>RedStat&nbsp;Intelligence</span>
            <span style={{ ...sKicker, fontSize: 10.5 }}>Kaspi.kz · Спорт-инвентарь &amp; Климат</span>
          </div>
          <h1 style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 700, margin: "0 0 18px", letterSpacing: "-0.022em", lineHeight: 1.12 }}>
            Тренажёры, фитнес и климат на Kaspi.kz
          </h1>
          <p style={{ fontFamily: SERIF, fontSize: 19, fontStyle: "italic", color: C.sub, margin: 0, lineHeight: 1.55, maxWidth: 660 }}>
            Анализ спроса и ассортимента 29 категорий за полтора года. Сезонность фитнеса — зеркало кемпинга: пик зимой, провал летом. Внутри — взрыв степперов ×18, монополия GENAU и список угасающих категорий.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 40px", marginTop: 26, paddingTop: 18, borderTop: `1px solid ${C.rule}` }}>
            {[
              ["Подготовлено для", "Сергей Соколунин"],
              ["Автор анализа", "Алмас Касымжанов"],
              ["Дата", "15 мая 2026"],
              ["Источник", "RedStat · ClickHouse"],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ ...sKicker, fontSize: 10, marginBottom: 4 }}>{k}</div>
                <div style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 700, color: C.ink }}>{v}</div>
              </div>
            ))}
          </div>
        </header>

        {/* TOC — running heads */}
        <nav style={{ display: "flex", flexWrap: "wrap", gap: "4px 26px", marginBottom: 56, fontFamily: SANS, fontSize: 12.5 }}>
          {TOC.map(([id, t], i) => (
            <a key={id} href={`#${id}`} style={{ color: C.sub, textDecoration: "none", borderBottom: `1px solid ${C.rule}`, paddingBottom: 2 }}>
              <span style={{ color: C.faint, marginRight: 6 }}>{String(i).padStart(2, "0")}</span>{t}
            </a>
          ))}
        </nav>

        {/* 0 — SUMMARY */}
        <Section id="s0" num="00" title="Резюме">
          <div style={{ display: "flex", flexWrap: "wrap", borderTop: `1px solid ${C.rule}`, borderBottom: `1px solid ${C.rule}`, padding: "22px 0", marginBottom: 30 }}>
            <Stat label="Сезон тренажёров" value="Зима" hint="Пик ноя–фев, провал май–июл" />
            <Stat label="Зима ÷ лето" value="×2.08" hint="6 ниш: 4.77 B vs 2.29 B ₸" />
            <Stat label="Степперы / 15 мес" value="×18" hint="18 → 336 M ₸, тренд +0.179" />
            <Stat label="Падающих категорий" value="6" hint="вибро −45 %, ролики −39 %…" />
          </div>
          <Note tag="01" tone="accent" title="Сезонность — зеркало кемпинга">
            Тренажёры и климат пикуют <b>ноябрь–февраль</b> (Kaspi Juma в ноябре + новогодние решения + холода = тренировки дома) и проваливаются <b>май–июль</b>. Сейчас (май) ниша входит в низкий сезон. Закуп под главный сезон — август–сентябрь, продажи — октябрь (Juma)–февраль. С кемпингом это идеальный антицикл: лето — кемпинг, зима — фитнес.
          </Note>
          <Note tag="02" tone="pos" title="Главная возможность — степперы">
            Рост ×18 за 15 месяцев (SKU 11→75, продавцов 9→51 — органический взрыв). Категория десезонилась (прогноз держит 250–296 M ₸ и летом). Низкий чек, фрагментированная конкуренция — самый доступный вход во всём обзоре.
          </Note>
          <Note tag="03" tone="ink" title="Монополия GENAU">
            Один продавец с собственным брендом держит ~60 % беговых дорожек (786 M ₸), ~100 % велотренажёров и эллиптических. В эти ниши «в лоб» заходить бессмысленно — только дифференциация (компактное / умное / детское / сервис).
          </Note>
          <Note tag="04" tone="neg" title="Не входить">
            Структурный спад: виброплатформы (−45 % YoY), ролики для пресса (−39 %), райдеры (−41 %), инверсионные столы (−19 %), гребные (−16 %), осушители. Большой текущий объём (вибро 171 M ₸) обманчив.
          </Note>
        </Section>

        {/* 1 — MARKET */}
        <Section id="s1" num="01" title="Сезонность рынка" sub="Рынок «Тренажёры» целиком, млн ₸. Столбцы — факт 2025 (зимние месяцы тёмные), линия — факт/прогноз 2026. Пик — ноябрь (Kaspi Juma), дно — май.">
          <Well cap="Источник: RedStat / Kaspi.kz. Профиль: пик ноябрь → плато дек–фев → дно май–июль → восстановление авг–окт. Прогноз-2026 повторяет форму с поправкой на рост рынка (+25–35 %).">
            <ResponsiveContainer width="100%" height={330}>
              <ComposedChart data={MARKET} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="m" tick={axis} tickLine={false} axisLine={{ stroke: C.ink }} />
                <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}`} width={34} />
                <Tooltip content={<Tip />} cursor={{ fill: "#1A171408" }} />
                <Legend wrapperStyle={{ fontFamily: SANS, fontSize: 11.5, color: C.sub }} iconType="plainline" />
                <Bar name="Факт 2025 (млрд ₸ — ось)" dataKey="a" maxBarSize={34}>
                  {MARKET.map((d, i) => (
                    <Cell key={i} fill={["Ноя", "Дек", "Янв", "Фев"].includes(d.m) ? C.ink : "#C9B89C"} />
                  ))}
                </Bar>
                <Line name="2026 (факт/прогноз)" dataKey="f" stroke={C.accent} strokeWidth={1.75} dot={{ r: 2.5, fill: C.accent, strokeWidth: 0 }} connectNulls />
              </ComposedChart>
            </ResponsiveContainer>
          </Well>
          <p style={sBody}>
            Три драйвера зимнего пика: <b>Kaspi Juma в ноябре</b> (крупнейший месяц года почти у всех категорий), <b>новогодний цикл</b> «начну заниматься» (дек–фев) и <b>холодовой фактор</b> (тренировки уходят домой). Лето — обратный отток: улица, зал, отпуск, дача.
          </p>
        </Section>

        {/* 2 — STEPPERS */}
        <Section id="s2" num="02" title="Степперы — взрыв ×18" sub="Траектория выручки ноя-2024 → сен-2026, млн ₸. Сплошная — факт, штрих — прогноз. Рост через расширение SKU (11→75) и числа продавцов (9→51) — органический, не артефакт.">
          <Well cap="Источник: RedStat / Kaspi.kz. Два скачка: июнь-2025 (×3) и январь-2026 (×2). Виральный продукт — балансировочный степпер с эспандерами ≈14 700 ₸: 2 566 продаж, 20 продавцов.">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={STEP} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="m" tick={{ ...axis, fontSize: 10 }} tickLine={false} axisLine={{ stroke: C.ink }} interval={1} angle={-38} textAnchor="end" height={48} />
                <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}`} width={34} />
                <Tooltip content={<Tip title="Выручка" />} cursor={{ stroke: C.ink, strokeDasharray: "3 3" }} />
                <ReferenceLine x="Фев·26" stroke={C.sub} strokeDasharray="3 3" label={{ value: "прогноз →", fill: C.faint, fontFamily: SANS, fontSize: 10, position: "insideTopRight" }} />
                <Area dataKey="v" stroke={C.ink} strokeWidth={1.75} fill="#1A171410" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Well>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "0 32px" }}>
            <Note tag="A" tone="pos" title="Почему это вход">
              Десезонился — продаётся и в мае-июле, редкость для тренажёров. Низкий чек. Премиум-сегмент (≈63 k ₸) крупнейший по деньгам (102 M); массовый фрагментирован — есть место для бренда.
            </Note>
            <Note tag="B" tone="neg" title="Риск">
              Виральные категории остывают. Короткие партии, помесячный мониторинг, не перетариваться. Путь виброплатформ (взлёт → спад) — важно не опоздать с выходом, если тренд развернётся.
            </Note>
          </div>
        </Section>

        {/* 3 — MATRIX */}
        <Section id="s3" num="03" title="Рост и падение" sub="24 товарные категории по структурному тренду (trend_slope, очищен от сезона). Зелёное — растёт, красное — падает. Ранжирование по тренду надёжнее, чем по YoY.">
          <Well cap="Источник: RedStat / Kaspi.kz. Шкала — trend_slope ×1000. Ассортиментный сдвиг: растёт всё компактное и доступное для дома; падает громоздкое и нишевое.">
            <ResponsiveContainer width="100%" height={580}>
              <BarChart data={MATRIX.map((r) => ({ n: r[0], t: r[2] * 1000 }))} layout="vertical" margin={{ top: 4, right: 30, left: 8, bottom: 0 }}>
                <CartesianGrid stroke={C.rule} strokeDasharray="0" horizontal={false} />
                <XAxis type="number" tick={axis} tickLine={false} axisLine={false} tickFormatter={(v: number) => (v > 0 ? `+${v}` : `${v}`)} />
                <YAxis type="category" dataKey="n" tick={{ ...axis, fontSize: 11.5, fill: C.ink }} width={158} tickLine={false} axisLine={false} />
                <Tooltip content={<Tip unit="" title="тренд ×1000" />} cursor={{ fill: "#1A171408" }} />
                <ReferenceLine x={0} stroke={C.ink} />
                <Bar dataKey="t" maxBarSize={13}>
                  {MATRIX.map((r, i) => (
                    <Cell key={i} fill={r[2] >= 0 ? C.pos : C.neg} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Well>
          <Note tag="—" tone="ink" title="Ассортиментный мегатренд">
            Растёт компактное и доступное для дома — степперы, эспандеры, массажные валики/МФР, фитболы, коврики (+30…70 %). Падает громоздкое и нишевое — виброплатформы, инверсионные, гребные, ролики для пресса. Покупатель смещается в лёгкий домашний фитнес.
          </Note>
        </Section>

        {/* 4 — PROFILES */}
        <Section id="s4" num="04" title="Тренажёр против климата" sub="Беговые дорожки · Очистители/увлажнители · Виброплатформы, факт 2025, млн ₸. Климат пикует раньше и резче; виброплатформы — плоский спад без сезона.">
          <Well cap="Источник: RedStat / Kaspi.kz. Беговые и климат синхронны по сезону, но климат взлетает уже с октября (×3.4 окт→ноя — старт отопления). Виброплатформы пика не имеют — медленно сползают весь год.">
            <ResponsiveContainer width="100%" height={310}>
              <ComposedChart data={PROFILES} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="m" tick={axis} tickLine={false} axisLine={{ stroke: C.ink }} />
                <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}`} width={36} />
                <Tooltip content={<Tip />} cursor={{ fill: "#1A171408" }} />
                <Legend wrapperStyle={{ fontFamily: SANS, fontSize: 11.5, color: C.sub }} iconType="plainline" />
                <Bar name="Беговые дорожки" dataKey="Беговые" fill="#C9B89C" maxBarSize={22} />
                <Line name="Климат (очист./увлаж.)" dataKey="Климат" stroke={C.pos} strokeWidth={1.75} dot={{ r: 2.5, strokeWidth: 0 }} />
                <Line name="Виброплатформы" dataKey="Вибро" stroke={C.neg} strokeWidth={1.5} strokeDasharray="5 3" dot={{ r: 2.5, strokeWidth: 0 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </Well>
        </Section>

        {/* 5 — TABLE */}
        <Section id="s5" num="05" title="Восемь ниш" sub="Помесячно 2025 (млн ₸), Feb-2026, зимний YoY и вердикт. Тёмная цифра — пиковый месяц года.">
          <div style={{ overflowX: "auto", marginBottom: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", ...num, fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${C.ink}` }}>
                  {["Ниша", "Статус", "Feb-26", "YoY", "Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д", "Вердикт"].map((h, i) => (
                    <th key={i} style={{ padding: "8px 7px", textAlign: i === 0 || i === 16 ? "left" : i === 1 ? "left" : "right", color: C.sub, fontWeight: 600, whiteSpace: "nowrap", fontSize: 10.5, fontFamily: SANS, letterSpacing: "0.04em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE.map((r, ri) => {
                  const [col, lbl] = STAT[r[1]];
                  const series = r[4] as number[];
                  const mx = Math.max(...series);
                  return (
                    <tr key={ri} style={{ borderBottom: `1px solid ${C.ruleSoft}` }}>
                      <td style={{ padding: "9px 7px", color: C.ink, fontWeight: 700, whiteSpace: "nowrap", fontFamily: SERIF, fontSize: 13.5 }}>{r[0]}</td>
                      <td style={{ padding: "9px 7px", color: col, fontFamily: SANS, fontSize: 11, fontWeight: 600 }}>{lbl}</td>
                      <td style={{ padding: "9px 7px", textAlign: "right", color: C.ink, fontWeight: 700 }}>{r[2]}</td>
                      <td style={{ padding: "9px 7px", textAlign: "right", color: (r[3] as number) >= 0 ? C.pos : C.neg, fontWeight: 600 }}>{(r[3] as number) >= 0 ? "+" : ""}{r[3]}%</td>
                      {series.map((v, ci) => (
                        <td key={ci} style={{ padding: "9px 6px", textAlign: "right", color: v === mx ? C.ink : C.faint, fontWeight: v === mx ? 700 : 400 }}>{v}</td>
                      ))}
                      <td style={{ padding: "9px 10px", color: C.sub, fontFamily: SERIF, fontSize: 12.5, minWidth: 230, lineHeight: 1.45 }}>{r[6]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p style={sCaption}>Я–Д = январь…декабрь 2025. Полные ряды и прогноз 2026 — в текстовом отчёте RedStat.</p>
        </Section>

        {/* 6 — RECS */}
        <Section id="s6" num="06" title="Рекомендации">
          <ol style={{ ...sBody, paddingLeft: 0, listStyle: "none", margin: "0 0 30px", counterReset: "rec" }}>
            {[
              ["Степперы — сейчас", "Единственная ниша без сезонного «нельзя в мае»: десезонилась и растёт ×18. Низкий чек, фрагментированная конкуренция — место для бренда."],
              ["Очистители/увлажнители — к осени", "Крупно (600 M+), +100 % YoY, премиум-маржа. Целиться в средний сегмент (≈22–40 k ₸) или увлажнители-фокус. Закуп август–сентябрь."],
              ["Лёгкий домашний фитнес", "Эспандеры, массажные валики/МФР, коврики, фитболы: +50…70 %, слабая сезонность, дёшево входить, ровная торговля круглый год."],
              ["Беговые — только дифференцированно", "Крупнейший рынок, но GENAU-моно. Угол: компактные/складные, умные, детские, реабилитация, сервис + сборка + гарантия."],
            ].map(([t, d], i) => (
              <li key={i} style={{ display: "flex", gap: 18, padding: "16px 0", borderBottom: `1px solid ${C.ruleSoft}` }}>
                <span style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 700, color: C.faint, lineHeight: 1, minWidth: 30 }}>{String(i + 1).padStart(2, "0")}</span>
                <span><b style={{ color: C.ink }}>{t}.</b> <span style={{ color: C.sub }}>{d}</span></span>
              </li>
            ))}
          </ol>
          <div style={{ marginBottom: 22 }}>
            <div style={{ ...sKicker, fontSize: 11, marginBottom: 12 }}>Календарь сезона · тренажёры + климат</div>
            <table style={{ width: "100%", borderCollapse: "collapse", borderTop: `2px solid ${C.ink}` }}>
              <tbody>
                {[
                  ["Май–июль (сейчас)", "Низкий сезон. Не разгонять тренажёры/климат. Работать со степперами и лёгким инвентарём. Тест новых SKU малыми партиями"],
                  ["Август–сентябрь", "Главный закуп под осень: тренажёры, климат, турники. Готовить листинги, отзывы, цены"],
                  ["Октябрь", "Разгон. Старт роста климата (отопление). Полный сток к концу месяца"],
                  ["Ноябрь — Kaspi Juma", "Пик года. Держать цену и контроль out-of-stock"],
                  ["Декабрь–февраль", "Высокое плато (НГ + «решения с нового года»). Допродажи"],
                  ["Март–апрель", "Спад. Распродажа остатков, не дозакупать «зимнее»"],
                ].map((r, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.ruleSoft}` }}>
                    <td style={{ padding: "11px 16px 11px 0", color: C.ink, fontWeight: 700, whiteSpace: "nowrap", fontFamily: SERIF, fontSize: 14, verticalAlign: "top", width: 180 }}>{r[0]}</td>
                    <td style={{ padding: "11px 0", color: C.sub, fontFamily: SERIF, fontSize: 14, lineHeight: 1.55 }}>{r[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Note tag="∞" tone="accent" title="Стратегический инсайт — антицикл">
            Кемпинг пикует в июне (закуп в мае), фитнес/климат — в ноябре (закуп в августе–сентябре). Продавец с обеими нишами загружает склад и оборотку круглый год без простоя: лето — кемпинг, зима — фитнес и климат.
          </Note>
        </Section>

        {/* 7 — METHOD */}
        <Section id="s7" num="07" title="Методология">
          <p style={sBody}>
            <b>Источник.</b> RedStat Backend API (ClickHouse, Kaspi.kz): <span style={num}>/api/niche/history</span> + <span style={num}>/forecast</span> (16 мес факта + прогноз, объект сезонности), <span style={num}>/category-segments</span>, <span style={num}>/category-brand</span>, <span style={num}>/sku-v1</span>. 29 категорий.
          </p>
          <p style={sBody}>
            <b>Проверка.</b> Сезонный паттерн воспроизводится у всех «зимних» категорий независимо. Взрыв степперов валидирован по «физике»: SKU 11→75, продавцов 9→51, заказов 703→13 244 — органический рост, не дубль данных. Падающие категории — leaf с непрерывным рядом.
          </p>
          <Note tag="!" tone="neg" title="Ограничения (учтены)">
            Зимний YoY у мелких/узловых категорий завышен перестройкой дерева Kaspi в 2025 — ранжирование велось по trend_slope (устойчив), YoY — подтверждающий сигнал. «Очистители и увлажнители» — одна объединённая категория Kaspi (раздельной выручки API не отдаёт). Сегменты/SKU — только текущий срез. Прогноз — модель.
          </Note>
          <p style={{ ...sCaption, marginTop: 6 }}>B ₸ = млрд тенге · M ₸ = млн тенге · «факт» — данные Kaspi · «прогноз» — модель RedStat (тренд × сезонность).</p>
          <footer style={{ marginTop: 44, paddingTop: 20, borderTop: `3px double ${C.ink}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, fontFamily: SANS, fontSize: 11.5, color: C.faint, letterSpacing: "0.04em" }}>
            <span>Автор анализа: <b style={{ color: C.sub }}>Алмас Касымжанов</b> · Подготовлено для: <b style={{ color: C.sub }}>Сергей Соколунин</b></span>
            <span>akasymzhanov.com · 15 мая 2026</span>
          </footer>
        </Section>

      </div>
    </div>
  );
}
