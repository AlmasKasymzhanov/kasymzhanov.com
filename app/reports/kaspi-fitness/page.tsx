"use client";

import {
  ComposedChart, BarChart, Bar, Line, Area, AreaChart, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine,
} from "recharts";

/* ─────────────── design tokens ─────────────── */
const C = {
  bg: "#0a0a0f", surface: "#111119", border: "#1e1e30",
  accent: "#6c5ce7", green: "#00d2a0", text: "#e8e8f0",
  dim: "#999", red: "#f87171", amber: "#f59e0b",
  blue: "#60a5fa", pink: "#f472b6", cyan: "#22d3ee",
  kaspi: "#f14635",
};
const sP: React.CSSProperties = { fontSize: 14, lineHeight: 1.75, color: "#ccc", margin: "0 0 12px" };
const sCard: React.CSSProperties = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 16 };
const sBadge = (color: string): React.CSSProperties => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: `${color}18`, color, fontSize: 11, fontWeight: 600, letterSpacing: "0.03em" });
const tipBox: React.CSSProperties = { background: "#15151f", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, color: C.text, padding: "8px 12px" };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Tip({ active, payload, label, unit = "M ₸", title }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={tipBox}>
      {label != null && <div style={{ color: C.dim, marginBottom: 4 }}>{label}</div>}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((p: any, i: number) => p.value == null ? null : (
        <div key={i} style={{ color: p.color || C.text }}>
          {title || p.name}: <b>{unit === "×" ? `×${p.value}` : `${p.value} ${unit}`}</b>
        </div>
      ))}
    </div>
  );
}

/* ─────────────── data ─────────────── */
// Рынок «Тренажёры» целиком, млн ₸ (2025 факт + 2026 факт/прогноз)
const MARKET = [
  { m: "Янв", a: 1573, f: 2051 }, { m: "Фев", a: 1758, f: 2443 },
  { m: "Мар", a: 1302, f: 1803 }, { m: "Апр", a: 970, f: 1332 },
  { m: "Май", a: 809, f: 1101 }, { m: "Июн", a: 984, f: 1330 },
  { m: "Июл", a: 877, f: 1176 }, { m: "Авг", a: 1122, f: 1494 },
  { m: "Сен", a: 1036, f: 1371 }, { m: "Окт", a: 1219, f: null },
  { m: "Ноя", a: 1924, f: null }, { m: "Дек", a: 1816, f: null },
];

// Степперы — траектория взрыва ×18 (ноя-24 → сен-26)
const STEP = [
  { m: "Ноя·24", v: 18, t: "f" }, { m: "Дек·24", v: 19, t: "f" },
  { m: "Янв·25", v: 26, t: "f" }, { m: "Фев·25", v: 32, t: "f" },
  { m: "Мар·25", v: 31, t: "f" }, { m: "Апр·25", v: 24, t: "f" },
  { m: "Май·25", v: 26, t: "f" }, { m: "Июн·25", v: 80, t: "f" },
  { m: "Июл·25", v: 86, t: "f" }, { m: "Авг·25", v: 100, t: "f" },
  { m: "Сен·25", v: 119, t: "f" }, { m: "Окт·25", v: 119, t: "f" },
  { m: "Ноя·25", v: 173, t: "f" }, { m: "Дек·25", v: 148, t: "f" },
  { m: "Янв·26", v: 313, t: "f" }, { m: "Фев·26", v: 336, t: "f" },
  { m: "Мар·26", v: 211, t: "p" }, { m: "Апр·26", v: 115, t: "p" },
  { m: "Май·26", v: 101, t: "p" }, { m: "Июн·26", v: 268, t: "p" },
  { m: "Июл·26", v: 256, t: "p" }, { m: "Авг·26", v: 270, t: "p" },
  { m: "Сен·26", v: 296, t: "p" },
];

// Беговые vs Очистители vs Виброплатформы — 2025 факт (сравнение профилей)
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

// Матрица роста/падения (тренд_slope), сорт по тренду
const MATRIX = [
  ["Степперы", "named", 336, 0.179, 925], ["Очистители/увлажнители", "климат", 599, 0.067, 101],
  ["Силовые тренажёры", "тренаж", 79, 0.045, 65], ["Эспандеры", "фитнес", 63, 0.044, 69],
  ["Массажные валики (МФР)", "фитнес", 27, 0.043, 68], ["Шведские стенки", "фитнес", 57, 0.035, 42],
  ["Фитболы и медболы", "фитнес", 17, 0.035, 53], ["Беговые дорожки", "named", 1331, 0.033, 35],
  ["Скакалки", "фитнес", 8, 0.031, 68], ["Турники", "фитнес", 108, 0.029, 32],
  ["Коврики для йоги", "фитнес", 50, 0.028, 33], ["Штанги", "тренаж", 26, 0.021, 36],
  ["Скамьи и стойки", "тренаж", 39, 0.017, 25], ["Велотренажёры", "named", 186, 0.016, 19],
  ["Эллиптические", "named", 135, 0.010, 13], ["Гантели и наборы", "фитнес", 178, 0.005, 7],
  ["Балансировочные", "фитнес", 16, 0.002, 5], ["Одежда для похудения", "фитнес", 52, 0.0, 2],
  ["Осушители воздуха", "климат", 28, -0.016, -18], ["Гребные тренажёры", "тренаж", 42, -0.021, -16],
  ["Инверсионные столы", "named", 59, -0.024, -19], ["Виброплатформы", "named", 171, -0.032, -31],
  ["Райдеры", "тренаж", 7, -0.044, -41], ["Ролики для пресса", "фитнес", 35, -0.045, -39],
];

// Полная таблица 8 ниш: 2025 факт помесячно + Feb26 + тренд + YoY + вердикт
const TABLE: [string, string, number, number, number[], string, string][] = [
  // name, статус-цвет-ключ, feb26, yoy, [12 мес 2025], пик, вердикт
  ["Беговые дорожки", "grow", 1331, 35, [867, 885, 618, 410, 326, 411, 387, 516, 499, 625, 1084, 1031], "Фев", "Крупнейший рынок (1.33B), растёт, но GENAU-моно ~60%"],
  ["Очистители/увлажнители", "boom", 599, 101, [339, 388, 277, 205, 182, 263, 266, 311, 286, 630, 1043, 872], "Ноя", "Растёт +100%, премиум-маржа, пик окт–дек"],
  ["Степперы", "boom", 336, 925, [26, 32, 31, 24, 26, 80, 86, 100, 119, 119, 173, 148], "круглый год", "🚀 Взрыв ×18, десезонился. ГЛАВНАЯ возможность"],
  ["Велотренажёры", "stable", 186, 19, [128, 159, 122, 85, 66, 80, 68, 92, 79, 96, 143, 147], "Фев", "Стабильно, GENAU-моно, мало места"],
  ["Виброплатформы", "fall", 171, -31, [258, 313, 235, 216, 195, 165, 147, 165, 134, 136, 157, 152], "Фев", "📉 −45% YoY. Не входить"],
  ["Эллиптические", "stable", 135, 13, [89, 104, 81, 50, 42, 45, 34, 54, 40, 49, 92, 91], "Фев", "Нишевый премиум, GENAU-моно"],
  ["Инверсионные столы", "fall", 59, -19, [64, 80, 69, 60, 47, 48, 39, 42, 42, 42, 61, 56], "Фев", "📉 Угасает. Не входить"],
];

/* ─────────────── reusable ─────────────── */
function Section({ id, num, title, sub, children }: { id: string; num: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div id={id} style={{ marginBottom: 56 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: sub ? 6 : 24, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: `${C.accent}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: C.accent, flexShrink: 0 }}>{num}</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.01em", lineHeight: 1.2 }}>{title}</h2>
      </div>
      {sub && <p style={{ ...sP, color: C.dim, margin: "0 0 22px" }}>{sub}</p>}
      {children}
    </div>
  );
}
function KPI({ label, value, hint, color }: { label: string; value: string; hint: string; color: string }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
      <div style={{ fontSize: 11, color: C.dim, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 25, fontWeight: 800, color, lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 12, color: C.dim, marginTop: 6, lineHeight: 1.5 }}>{hint}</div>
    </div>
  );
}
function Callout({ icon, color, title, children }: { icon: string; color: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "14px 16px", background: `${color}10`, borderLeft: `3px solid ${color}`, borderRadius: 8, marginBottom: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{icon} {title}</div>
      <div style={{ fontSize: 13.5, color: C.text, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}
const STAT: Record<string, [string, string]> = {
  boom: [C.green, "🚀 Взрыв"], grow: [C.cyan, "📈 Растёт"], stable: [C.dim, "→ Стабильно"], fall: [C.red, "📉 Падает"],
};

/* ─────────────── page ─────────────── */
export default function KaspiFitnessPage() {
  const TOC: [string, string][] = [
    ["s0", "Executive Summary"],
    ["s1", "Дашборд: зеркало кемпинга"],
    ["s2", "Степперы — взрыв ×18"],
    ["s3", "Матрица роста и падения"],
    ["s4", "Профили: тренажёр vs климат"],
    ["s5", "8 ниш — таблица и вердикты"],
    ["s6", "Рекомендации и тайминг"],
    ["s7", "Методология"],
  ];
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* HEADER */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={sBadge(C.kaspi)}>Kaspi.kz</span>
            <span style={sBadge(C.blue)}>Тренажёры · Фитнес · Климат</span>
            <span style={sBadge(C.accent)}>Enterprise-аналитика</span>
            <span style={sBadge(C.amber)}>RedStat · 16 мес</span>
          </div>
          <h1 style={{ fontSize: 33, fontWeight: 800, margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            🏋️ Тренажёры, фитнес и климат на Kaspi.kz — спрос и ассортимент за полтора года
          </h1>
          <p style={{ fontSize: 16, color: C.dim, margin: 0, lineHeight: 1.6 }}>
            29 категорий, полный сезонный цикл (16 мес факта) + прогноз. Сезонность фитнеса — зеркало кемпинга: пик зимой, провал летом. Внутри — взрыв степперов ×18, монополия GENAU и список падающих категорий.
          </p>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 14 }}>
            Дата: 15 мая 2026 · Окно: ноя-2024 → фев-2026 (факт) + прогноз RedStat до сен-2026 · Источник: RedStat Backend API (ClickHouse, Kaspi.kz)
          </div>
        </div>

        {/* TOC */}
        <div style={{ ...sCard, borderLeft: `4px solid ${C.accent}` }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: C.accent, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Содержание</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 8 }}>
            {TOC.map(([id, t], i) => (
              <a key={id} href={`#${id}`} style={{ fontSize: 13, color: "#ccc", textDecoration: "none", padding: "6px 0", display: "flex", gap: 10 }}>
                <span style={{ color: C.accent, fontWeight: 700, minWidth: 18 }}>{i}</span>{t}
              </a>
            ))}
          </div>
        </div>

        {/* 0 · EXEC */}
        <Section id="s0" num="0" title="Executive Summary">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
            <KPI label="Сезон тренажёров" value="ЗИМА" hint="Пик ноя–фев, провал май–июл" color={C.blue} />
            <KPI label="Зима ÷ лето" value="×2.08" hint="6 ниш: 4.77B vs 2.29B ₸" color={C.text} />
            <KPI label="Степперы за 15 мес" value="×18" hint="18M → 336M ₸, тренд +0.179" color={C.green} />
            <KPI label="Падающих категорий" value="6" hint="вибро −45%, ролики −39%…" color={C.red} />
          </div>
          <Callout icon="🔄" color={C.blue} title="Сезонность — зеркало кемпинга">
            Тренажёры и климат пикуют <b>ноябрь–февраль</b> (Kaspi Juma в ноябре + новогодние решения + холода = тренировки дома) и проваливаются <b>май–июль</b>. Сейчас (май) ниша <b>входит в низкий сезон</b>. Закуп под главный сезон — август–сентябрь, продажи — октябрь(Juma)–февраль. С кемпингом это идеальный антицикл: лето — кемпинг, зима — фитнес.
          </Callout>
          <Callout icon="🚀" color={C.green} title="Главная возможность — степперы">
            Рост ×18 за 15 месяцев (SKU 11→75, продавцов 9→51 — органический взрыв). Категория <b>десезонилась</b> (прогноз держит 250–296 M ₸ и летом). Низкий чек, фрагментированная конкуренция — самый доступный вход во всём обзоре.
          </Callout>
          <Callout icon="🏆" color={C.amber} title="Монополия GENAU">
            Один продавец (sellers=1) с собственным брендом держит ~60% беговых дорожек (786 M ₸), ~100% велотренажёров и эллиптических. В эти ниши «в лоб» заходить бессмысленно — только дифференциация (компактное/умное/детское/сервис).
          </Callout>
          <Callout icon="📉" color={C.red} title="Не входить">
            Структурный спад: виброплатформы (−45% YoY), ролики для пресса (−39%), райдеры (−41%), инверсионные столы (−19%), гребные (−16%), осушители. Большой текущий объём (вибро 171 M) обманчив.
          </Callout>
        </Section>

        {/* 1 · MARKET */}
        <Section id="s1" num="1" title="Дашборд: зеркало кемпинга" sub="Рынок «Тренажёры» целиком, млн ₸. Столбцы — факт 2025 (зимние месяцы подсвечены), линия — факт/прогноз 2026. Пик — ноябрь (Kaspi Juma), дно — май.">
          <div style={sCard}>
            <ResponsiveContainer width="100%" height={340}>
              <ComposedChart data={MARKET} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={C.border} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke={C.dim} fontSize={12} tickLine={false} />
                <YAxis stroke={C.dim} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}B`} />
                <Tooltip content={<Tip />} cursor={{ fill: `${C.accent}10` }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar name="Факт 2025" dataKey="a" radius={[4, 4, 0, 0]} maxBarSize={40}>
                  {MARKET.map((d, i) => (
                    <Cell key={i} fill={["Ноя", "Дек", "Янв", "Фев"].includes(d.m) ? C.blue : `${C.accent}aa`} />
                  ))}
                </Bar>
                <Line name="2026 (факт/прогноз)" dataKey="f" stroke={C.green} strokeWidth={3} dot={{ r: 4, fill: C.green }} connectNulls />
              </ComposedChart>
            </ResponsiveContainer>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 10, lineHeight: 1.6 }}>
              Профиль: <b style={{ color: C.blue }}>пик ноябрь (Juma) → плато дек–фев</b> → спад март–апрель → <b style={{ color: C.text }}>дно май–июль</b> → восстановление авг–окт. Прогноз-2026 повторяет форму с поправкой на рост рынка (+25–35%).
            </div>
          </div>
        </Section>

        {/* 2 · STEPPERS */}
        <Section id="s2" num="2" title="Степперы — взрыв ×18" sub="Траектория выручки ноя-2024 → сен-2026, млн ₸. Зелёная зона — факт, штрих — прогноз. Рост через расширение SKU (11→75) и числа продавцов (9→51) — органический, не артефакт.">
          <div style={sCard}>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={STEP} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="stepG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.green} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={C.green} stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={C.border} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke={C.dim} fontSize={10} tickLine={false} interval={1} angle={-35} textAnchor="end" height={50} />
                <YAxis stroke={C.dim} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}M`} />
                <Tooltip content={<Tip title="Выручка" />} cursor={{ stroke: C.green, strokeDasharray: "4 4" }} />
                <ReferenceLine x="Фев·26" stroke={C.dim} strokeDasharray="4 4" label={{ value: "прогноз →", fill: C.dim, fontSize: 10, position: "insideTopRight" }} />
                <Area dataKey="v" stroke={C.green} strokeWidth={2.5} fill="url(#stepG)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            <Callout icon="📊" color={C.green} title="Что произошло">
              18 M ₸ (ноя-24) → 336 M ₸ (фев-26). Два скачка: июнь-2025 (×3) и январь-2026 (×2). Виральный продукт — балансировочный степпер с эспандерами ~14 700 ₸: 2 566 продаж, 20 продавцов.
            </Callout>
            <Callout icon="🎯" color={C.accent} title="Почему это вход">
              Десезонился (продаётся и в мае-июле — редкость для тренажёров). Низкий чек. Премиум-сегмент (~63 k ₸) — крупнейший по деньгам (102 M), массовый — фрагментирован («Без бренда»). Есть место для бренда.
            </Callout>
            <Callout icon="⚠️" color={C.amber} title="Риск">
              Виральные категории остывают. Короткие партии, мониторинг помесячно, не перетариваться. Повторяет путь виброплатформ (взлёт→спад) — важно не опоздать с выходом, если тренд развернётся.
            </Callout>
          </div>
        </Section>

        {/* 3 · MATRIX */}
        <Section id="s3" num="3" title="Матрица роста и падения" sub="24 товарные категории по структурному тренду (trend_slope RedStat, очищен от сезона). Зелёное — растёт, красное — падает. Ранжирование по тренду надёжнее, чем по YoY.">
          <div style={sCard}>
            <ResponsiveContainer width="100%" height={620}>
              <BarChart data={MATRIX.map((r) => ({ n: r[0], t: (r[3] as number) * 1000 }))} layout="vertical" margin={{ top: 0, right: 40, left: 30, bottom: 0 }}>
                <CartesianGrid stroke={C.border} strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke={C.dim} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => (v > 0 ? `+${v}` : `${v}`)} />
                <YAxis type="category" dataKey="n" stroke={C.dim} fontSize={11} width={150} tickLine={false} axisLine={false} />
                <Tooltip content={<Tip unit="" title="тренд ×1000" />} cursor={{ fill: `${C.accent}10` }} />
                <ReferenceLine x={0} stroke={C.dim} />
                <Bar dataKey="t" radius={2} maxBarSize={16}>
                  {MATRIX.map((r, i) => (
                    <Cell key={i} fill={(r[3] as number) >= 0.06 ? C.green : (r[3] as number) >= 0.025 ? C.cyan : (r[3] as number) <= -0.02 ? C.red : C.dim} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 10, lineHeight: 1.6 }}>
              <span style={{ color: C.green }}>🚀 Взрыв</span> — степперы, климат · <span style={{ color: C.cyan }}>📈 Растёт</span> — беговые, эспандеры, валики, фитболы, турники, коврики · <span style={{ color: C.dim }}>→ Стабильно</span> — велотренажёры, эллиптические, гантели · <span style={{ color: C.red }}>📉 Падает</span> — виброплатформы, ролики для пресса, инверсионные, гребные, райдеры.
            </div>
          </div>
          <Callout icon="📦" color={C.accent} title="Ассортиментный мегатренд">
            Растёт всё <b>компактное и доступное для дома</b> (степперы, эспандеры, массажные валики/МФР, фитболы, коврики +30–70%). Падает <b>громоздкое и нишевое</b> (виброплатформы, инверсионные, гребные, ролики для пресса). Покупатель смещается в лёгкий домашний фитнес.
          </Callout>
        </Section>

        {/* 4 · PROFILES */}
        <Section id="s4" num="4" title="Профили: тренажёр vs климат" sub="Беговые дорожки vs Очистители/увлажнители vs Виброплатформы, факт 2025, млн ₸. Климат пикует ещё раньше и резче (отопительный сезон); виброплатформы — плоский спад без сезона.">
          <div style={sCard}>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={PROFILES} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={C.border} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke={C.dim} fontSize={12} tickLine={false} />
                <YAxis stroke={C.dim} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}M`} />
                <Tooltip content={<Tip />} cursor={{ fill: `${C.accent}10` }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar name="Беговые дорожки" dataKey="Беговые" fill={`${C.blue}cc`} radius={[3, 3, 0, 0]} maxBarSize={26} />
                <Line name="Климат (очист./увлаж.)" dataKey="Климат" stroke={C.green} strokeWidth={3} dot={{ r: 3 }} />
                <Line name="Виброплатформы" dataKey="Вибро" stroke={C.red} strokeWidth={2.5} strokeDasharray="5 4" dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 10, lineHeight: 1.6 }}>
              Беговые и климат синхронны по сезону (пик ноябрь), но климат взлетает уже с октября (×3.4 окт→ноя — старт отопления). Виброплатформы не имеют пика — просто медленно сползают вниз весь год.
            </div>
          </div>
        </Section>

        {/* 5 · TABLE */}
        <Section id="s5" num="5" title="8 ниш — таблица и вердикты" sub="Помесячно 2025 (млн ₸), Feb-2026, зимний YoY и вердикт. Отсортировано по размеру рынка.">
          <div style={{ overflowX: "auto", ...sCard, padding: 0 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
              <thead>
                <tr>
                  {["Ниша", "Статус", "Feb-26", "YoY", "Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д", "Вердикт"].map((h, i) => (
                    <th key={i} style={{ padding: "10px 7px", textAlign: i === 0 ? "left" : "center", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", fontSize: 10.5, position: i === 0 ? "sticky" : undefined, left: i === 0 ? 0 : undefined, background: i === 0 ? C.surface : undefined }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE.map((r, ri) => {
                  const [col, lbl] = STAT[r[1]];
                  const series = r[4] as number[];
                  const mx = Math.max(...series);
                  return (
                    <tr key={ri}>
                      <td style={{ padding: "9px 7px", color: C.text, fontWeight: 600, whiteSpace: "nowrap", borderBottom: `1px solid ${C.border}20`, position: "sticky", left: 0, background: C.surface }}>{r[0]}</td>
                      <td style={{ padding: "9px 7px", textAlign: "center", color: col, borderBottom: `1px solid ${C.border}20`, whiteSpace: "nowrap", fontSize: 10.5 }}>{lbl}</td>
                      <td style={{ padding: "9px 7px", textAlign: "center", color: C.text, fontWeight: 700, borderBottom: `1px solid ${C.border}20` }}>{r[2]}</td>
                      <td style={{ padding: "9px 7px", textAlign: "center", color: (r[3] as number) >= 0 ? C.green : C.red, fontWeight: 600, borderBottom: `1px solid ${C.border}20` }}>{(r[3] as number) >= 0 ? "+" : ""}{r[3]}%</td>
                      {series.map((v, ci) => (
                        <td key={ci} style={{ padding: "9px 5px", textAlign: "center", color: v === mx ? C.blue : "#888", fontWeight: v === mx ? 700 : 400, borderBottom: `1px solid ${C.border}20` }}>{v}</td>
                      ))}
                      <td style={{ padding: "9px 10px", color: "#bbb", borderBottom: `1px solid ${C.border}20`, fontSize: 11, minWidth: 230 }}>{r[6]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: C.dim, marginTop: 10 }}>Синим — пиковый месяц 2025. Я–Д = январь…декабрь. Полные ряды и прогноз 2026 — в текстовом отчёте RedStat.</p>
        </Section>

        {/* 6 · RECS */}
        <Section id="s6" num="6" title="Рекомендации и тайминг">
          <div style={sCard}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Приоритеты входа</h3>
            {[
              ["1", "Степперы — сейчас", "Единственная ниша без сезонного «нельзя в мае»: десезонилась и растёт ×18. Низкий чек, фрагментированная конкуренция — место для бренда."],
              ["2", "Очистители/увлажнители — к осени", "Крупно (600M+), +100% YoY, премиум-маржа. Целиться в средний сегмент (~22–40k ₸) или увлажнители-фокус. Закуп август–сентябрь."],
              ["3", "Лёгкий домашний фитнес", "Эспандеры, массажные валики/МФР, коврики, фитболы: +50–70%, слабая сезонность, дёшево входить, ровная торговля круглый год."],
              ["4", "Беговые — только дифференцированно", "Крупнейший рынок, но GENAU-моно. Угол: компактные/складные, умные, детские, реабилитация, сервис+сборка+гарантия."],
            ].map(([n, t, d]) => (
              <div key={n} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: `1px solid ${C.border}30` }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: `${C.green}18`, color: C.green, fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n}</div>
                <div><span style={{ color: C.text, fontWeight: 600, fontSize: 14 }}>{t}.</span> <span style={{ color: "#bbb", fontSize: 13.5, lineHeight: 1.6 }}>{d}</span></div>
              </div>
            ))}
          </div>
          <div style={sCard}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Календарь сезона (тренажёры + климат)</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                <thead><tr>{["Период", "Что делать"].map((h, i) => (
                  <th key={i} style={{ padding: "10px 12px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>{h}</th>
                ))}</tr></thead>
                <tbody>
                  {[
                    ["Май–июль (сейчас)", "Низкий сезон. НЕ разгонять тренажёры/климат. Работать со степперами и лёгким инвентарём (десезонены). Тест новых SKU малыми партиями"],
                    ["Август–сентябрь", "Главный закуп под осень: тренажёры, климат, турники. Готовить листинги, отзывы, цены"],
                    ["Октябрь", "Разгон. Старт роста климата (отопление). Полный сток к концу месяца"],
                    ["Ноябрь — Kaspi Juma", "ПИК года. Держать цену и контроль out-of-stock"],
                    ["Декабрь–февраль", "Высокое плато (НГ + «решения с нового года»). Допродажи"],
                    ["Март–апрель", "Спад. Распродажа остатков, не дозакупать «зимнее»"],
                  ].map((r, i) => (
                    <tr key={i}>
                      <td style={{ padding: "10px 12px", color: C.text, fontWeight: 700, borderBottom: `1px solid ${C.border}20`, whiteSpace: "nowrap" }}>{r[0]}</td>
                      <td style={{ padding: "10px 12px", color: "#ccc", borderBottom: `1px solid ${C.border}20` }}>{r[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Callout icon="💡" color={C.blue} title="Стратегический инсайт: антицикл">
            Кемпинг пикует в июне (закуп в мае), фитнес/климат — в ноябре (закуп в августе–сентябре). Продавец с обеими нишами загружает склад и оборотку круглый год без простоя: лето — кемпинг, зима — фитнес и климат.
          </Callout>
        </Section>

        {/* 7 · METHOD */}
        <Section id="s7" num="7" title="Методология">
          <div style={sCard}>
            <p style={sP}><b style={{ color: C.text }}>Источник.</b> RedStat Backend API (ClickHouse, Kaspi.kz): <code style={{ color: C.cyan }}>/api/niche/history</code> + <code style={{ color: C.cyan }}>/forecast</code> (16 мес факта + прогноз, объект сезонности), <code style={{ color: C.cyan }}>/category-segments</code>, <code style={{ color: C.cyan }}>/category-brand</code>, <code style={{ color: C.cyan }}>/sku-v1</code>. 29 категорий.</p>
            <p style={sP}><b style={{ color: C.text }}>Проверка.</b> Сезонный паттерн воспроизводится у всех «зимних» категорий независимо. Взрыв степперов валидирован по «физике»: SKU 11→75, продавцов 9→51, заказов 703→13 244 — органический рост, не дубль данных. Падающие категории — leaf с непрерывным рядом.</p>
            <Callout icon="⚠️" color={C.amber} title="Ограничения (учтены)">
              Зимний YoY у мелких/узловых категорий завышен перестройкой дерева Kaspi в 2025 — ранжирование велось по <code style={{ color: C.cyan }}>trend_slope</code> (устойчив), YoY — подтверждающий сигнал. «Очистители и увлажнители» — одна объединённая категория Kaspi (раздельной выручки API не отдаёт; сплит по типу сделан на уровне топ-SKU/брендов). Сегменты/SKU — только текущий срез. Прогноз — модель (для взрывных категорий — сценарий).
            </Callout>
            <p style={{ ...sP, margin: "8px 0 0", fontSize: 13, color: C.dim }}><code style={{ color: C.cyan }}>B ₸</code> = млрд тенге, <code style={{ color: C.cyan }}>M ₸</code> = млн тенге · «факт» — данные Kaspi · «прогноз» — модель RedStat (тренд × сезонность).</p>
          </div>
          <div style={{ textAlign: "center", marginTop: 32, fontSize: 12, color: C.dim }}>
            akasymzhanov.com · Enterprise-аналитика тренажёров, фитнеса и климата Kaspi.kz · 15 мая 2026
          </div>
        </Section>

      </div>
    </div>
  );
}
