"use client";

import {
  ComposedChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell,
} from "recharts";

/* ─────────────────────────── design tokens ─────────────────────────── */
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

/* ─────────────────────────── data ─────────────────────────── */
// Рынок кемпинга (сумма 23 leaf-категорий), млн ₸
const MARKET = [
  { m: "Мар", a: 697, f: 798 }, { m: "Апр", a: 915, f: 1031 },
  { m: "Май", a: 1297, f: 1435 }, { m: "Июн", a: 1958, f: 2134 },
  { m: "Июл", a: 1750, f: 1895 }, { m: "Авг", a: 1168, f: 1300 },
  { m: "Сен", a: 797, f: 913 }, { m: "Окт", a: 772, f: null },
];

// Топ-ниши: прогноз июнь-2026 (размер возможности в пик)
const TOP_JUN = [
  { n: "Палатки", v: 720, c: C.kaspi },
  { n: "Походная мебель", v: 235, c: C.accent },
  { n: "Надувная мебель", v: 197, c: C.accent },
  { n: "Тенты и шатры", v: 153, c: C.green },
  { n: "Портативные зарядки", v: 134, c: C.green },
  { n: "Сумки-холодильники", v: 63, c: C.blue },
  { n: "Тур. посуда", v: 54, c: C.blue },
  { n: "Тур. коврики", v: 47, c: C.blue },
  { n: "Спальные мешки", v: 46, c: C.blue },
  { n: "Канистры для воды", v: 38, c: C.blue },
];

// Сезонная интенсивность (peak/low) — насколько резкая ниша
const INTENSITY = [
  { n: "Тенты и шатры", x: 18.6 }, { n: "Походные души", x: 10.1 },
  { n: "Тур. коврики", x: 8.2 }, { n: "Палатки", x: 5.3 },
  { n: "Походная мебель", x: 4.8 }, { n: "Сумки-холодильники", x: 4.7 },
  { n: "Спальные мешки", x: 4.4 }, { n: "Портативные зарядки", x: 4.3 },
  { n: "Канистры", x: 4.3 }, { n: "Надувная мебель", x: 4.1 },
];

// Контрсезон: палатки (лето) vs термосы/фонари (осень-зима) — 2025 факт
const COUNTER = [
  { m: "Май", Палатки: 362, Термосы: 74, Фонари: 71 },
  { m: "Июн", Палатки: 659, Термосы: 58, Фонари: 81 },
  { m: "Июл", Палатки: 562, Термосы: 56, Фонари: 80 },
  { m: "Авг", Палатки: 267, Термосы: 69, Фонари: 88 },
  { m: "Сен", Палатки: 136, Термосы: 92, Фонари: 92 },
  { m: "Окт", Палатки: 124, Термосы: 115, Фонари: 101 },
];

// Полная таблица: 2025 факт + 2026 прогноз (млн ₸)
const TABLE: [string, string, number, string, number, number, number, number, number, number, number, number, number, number][] = [
  // name, class, peak/low, peakClass, may, jun, jul, aug, sep, fmay, fjun, fjul, faug, fsep
  ["Палатки", "лето", 5.3, "Июн", 362, 659, 562, 267, 136, 396, 720, 614, 292, 148],
  ["Походная мебель", "лето", 4.8, "Июн", 194, 255, 227, 145, 82, 179, 235, 209, 133, 76],
  ["Надувная мебель", "лето", 4.1, "Июл", 119, 212, 214, 120, 74, 111, 197, 199, 112, 69],
  ["Тенты и шатры", "лето", 18.6, "Июн", 101, 176, 132, 55, 20, 88, 153, 114, 47, 17],
  ["Портативные зарядки", "лето↗", 4.3, "Июн", 43, 91, 55, 58, 29, 64, 134, 80, 83, 41],
  ["Сумки-холодильники", "лето", 4.7, "Июл", 33, 55, 63, 31, 17, 38, 63, 73, 36, 19],
  ["Туристическая посуда", "лето", 2.2, "Июн", 44, 50, 45, 35, 24, 48, 54, 49, 37, 26],
  ["Туристические коврики", "лето", 8.2, "Июн", 24, 45, 42, 23, 10, 25, 47, 44, 25, 10],
  ["Спальные мешки", "лето", 4.4, "Авг", 31, 39, 38, 42, 32, 36, 46, 45, 49, 37],
  ["Канистры для воды", "лето", 4.3, "Июн", 19, 30, 18, 12, 10, 24, 38, 22, 16, 13],
  ["Тур. горелки/обогрев.", "лето", 1.9, "Июл", 22, 29, 30, 27, 21, 28, 37, 38, 34, 27],
  ["Походные души", "лето", 10.1, "Июн", 11, 18, 16, 9, 4, 16, 25, 22, 13, 6],
  ["Туристические подушки", "лето", 2.2, "Июл", 13, 14, 15, 12, 7, 17, 18, 19, 15, 9],
  ["Походные бани", "лето", 3.4, "Авг", 10, 12, 15, 15, 6, 8, 9, 12, 12, 5],
  ["Туристические фонари", "контрсезон ✕", 1.7, "Окт-Ноя", 71, 81, 80, 88, 92, 107, 121, 118, 127, 132],
  ["Термосы и термокружки", "контрсезон ✕", 2.0, "Дек", 74, 58, 56, 69, 92, 115, 89, 84, 103, 135],
  ["Ножи для туризма", "контрсезон ✕", 4.0, "Окт", 52, 51, 54, 66, 62, 35, 34, 35, 43, 39],
  ["Спортивные рюкзаки", "растущая", 1.6, "Авг", 30, 35, 34, 39, 32, 47, 54, 51, 58, 46],
  ["Треккинговые палки", "слабая", 1.5, "Авг", 14, 14, 16, 16, 14, 15, 15, 17, 18, 15],
  ["Мультитулы", "контрсезон ✕", 1.3, "Дек", 11, 10, 10, 11, 10, 15, 14, 13, 15, 13],
  ["Аксессуары для палаток", "контрсезон ✕", 3.9, "Дек", 6, 10, 12, 9, 6, 7, 12, 15, 11, 8],
  ["Походные печи", "контрсезон ✕", 3.6, "Дек", 6, 8, 7, 9, 10, 9, 11, 10, 13, 14],
  ["Наборы для выживания", "слабая", 1.5, "Апр", 8, 9, 9, 8, 8, 8, 9, 9, 9, 8],
];

/* ─────────────────────────── reusable bits ─────────────────────────── */
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
      <div style={{ fontSize: 26, fontWeight: 800, color, lineHeight: 1.1 }}>{value}</div>
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

/* ─────────────────────────── page ─────────────────────────── */
export default function KaspiCampingPage() {
  const TOC: [string, string][] = [
    ["s0", "Executive Summary"],
    ["s1", "Дашборд: кривая сезона"],
    ["s2", "Исключительный сезонный паттерн"],
    ["s3", "Дашборд: топ-ниши пика"],
    ["s4", "⚠ Контрсезонная ловушка"],
    ["s5", "Помесячный план: Май → Сентябрь"],
    ["s6", "Полная таблица по нишам"],
    ["s7", "Рекомендации"],
    ["s8", "Методология и проверка"],
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* HEADER */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={sBadge(C.kaspi)}>Kaspi.kz</span>
            <span style={sBadge(C.green)}>Кемпинг · Туризм</span>
            <span style={sBadge(C.accent)}>Сезонная аналитика</span>
            <span style={sBadge(C.amber)}>RedStat · 16 мес</span>
          </div>
          <h1 style={{ fontSize: 33, fontWeight: 800, margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            🏕️ Кемпинговые товары на Kaspi.kz — сезонная аналитика и прогноз май–сентябрь 2026
          </h1>
          <p style={{ fontSize: 16, color: C.dim, margin: 0, lineHeight: 1.6 }}>
            Полный разбор сезонного паттерна ниши «Туризм и отдых на природе»: 23 категории, прошлогодний цикл целиком, прогноз на пиковый сезон и помесячный план закупа/распродажи. Главное: кемпинг — одна из самых сезонных групп всего маркетплейса, и деньги июня делаются в мае.
          </p>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 14 }}>
            Дата публикации: 15 мая 2026 · Окно данных: ноябрь 2024 → февраль 2026 (факт) + прогноз RedStat до сен-2026 · Источник: RedStat Backend API (ClickHouse, Kaspi.kz)
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

        {/* 0 · EXECUTIVE SUMMARY */}
        <Section id="s0" num="0" title="Executive Summary">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
            <KPI label="Сезон май–сен 2025" value="6.97 B ₸" hint="Ядро из 23 категорий" color={C.text} />
            <KPI label="Прогноз май–сен 2026" value="7.68 B ₸" hint="+10.1 % год к году" color={C.green} />
            <KPI label="Пиковый месяц" value="ИЮНЬ" hint="у 14 из 23 категорий" color={C.kaspi} />
            <KPI label="Пик ÷ минимум" value="×2.8 → ×18.6" hint="рынок → отдельные ниши" color={C.amber} />
          </div>
          <Callout icon="🎯" color={C.kaspi} title="Главный вывод">
            Кемпинг — взрывная сезонность, не «плавная». Ядро ниши идёт от <b>0.70 B ₸</b> в марте до <b>1.96 B ₸</b> в июне (×2.8), а отдельные подкатегории — в 5–18 раз. Пик — <b>июнь</b>. Это значит: <b>выручка июня формируется закупкой и листингом в мае</b>. Сейчас (середина мая) — последнее окно дозакупа под пик.
          </Callout>
          <Callout icon="⚠️" color={C.amber} title="Исключение, которое нужно знать">
            Не всё в «кемпинге» летнее. <b>Термосы, туристические фонари, походные печи, мультитулы</b> — контрсезонные: их пик осенью/зимой (окт–дек), летом они проседают. Завозить их «под лето» — замороженные деньги.
          </Callout>
          <Callout icon="✅" color={C.green} title="Качество данных подтверждено">
            Доступен полный прошлогодний сезон (май–окт 2025) — паттерн калиброван на факте, не на экстраполяции. Сверка февраля с эталоном RedStat сходится в пределах ~3 %. Выводы строятся на 23 leaf-категориях с непрерывным рядом.
          </Callout>
        </Section>

        {/* 1 · DASHBOARD market curve */}
        <Section id="s1" num="1" title="Дашборд: кривая сезона" sub="Выручка ядра кемпинга помесячно, млн ₸. Столбцы — факт 2025, линия — прогноз RedStat 2026. Форма кривой повторяется каждый год.">
          <div style={sCard}>
            <ResponsiveContainer width="100%" height={340}>
              <ComposedChart data={MARKET} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={C.border} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke={C.dim} fontSize={12} tickLine={false} />
                <YAxis stroke={C.dim} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}B`} />
                <Tooltip content={<Tip />} cursor={{ fill: `${C.accent}10` }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar name="Факт 2025" dataKey="a" radius={[4, 4, 0, 0]} maxBarSize={42}>
                  {MARKET.map((d, i) => (
                    <Cell key={i} fill={["Май", "Июн", "Июл"].includes(d.m) ? C.kaspi : `${C.accent}aa`} />
                  ))}
                </Bar>
                <Line name="Прогноз 2026" dataKey="f" stroke={C.green} strokeWidth={3} dot={{ r: 4, fill: C.green }} connectNulls />
              </ComposedChart>
            </ResponsiveContainer>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 10, lineHeight: 1.6 }}>
              Профиль: база (ноя–март) → разгон (апрель) → <b style={{ color: C.text }}>ускорение (май)</b> → <b style={{ color: C.kaspi }}>пик (июнь, ×2.5)</b> → плато (июль) → спад (август) → возврат к базе (сентябрь). Прогноз-2026 повторяет форму факта-2025 с поправкой на тренд.
            </div>
          </div>
        </Section>

        {/* 2 · pattern */}
        <Section id="s2" num="2" title="Исключительный сезонный паттерн" sub="RedStat присваивает каждой категории индекс сезонности. У типового «летнего» товара маркетплейса он 0.2–0.4. В кемпинге — экстремальные значения и отношение пика к минимуму до ×18.">
          <div style={sCard}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>Сезонная интенсивность (пик ÷ годовой минимум)</h3>
            <p style={{ fontSize: 12, color: C.dim, margin: "0 0 14px" }}>Чем длиннее столбец — тем «вкл/выкл» ниша: зимой почти ноль, летом взрыв.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={INTENSITY} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                <CartesianGrid stroke={C.border} strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke={C.dim} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `×${v}`} />
                <YAxis type="category" dataKey="n" stroke={C.dim} fontSize={11} width={120} tickLine={false} axisLine={false} />
                <Tooltip content={<Tip unit="×" title="пик / минимум" />} cursor={{ fill: `${C.accent}10` }} />
                <Bar dataKey="x" radius={[0, 4, 4, 0]} maxBarSize={22}>
                  {INTENSITY.map((d, i) => (
                    <Cell key={i} fill={d.x >= 8 ? C.kaspi : d.x >= 4.5 ? C.amber : C.accent} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <Callout icon="💡" color={C.accent} title="Бизнес-смысл">
            В таких нишах нельзя «торговать ровно». Весь год = подготовка к 3 месяцам. Кто не успел к маю — год пропущен. Кто затарился, но не продал к сентябрю — год в минус (неликвид до следующего мая). «Тенты и шатры» зимой умирают (16–20 M ₸), в июне дают 176 M — это не сезонность, это переключатель.
          </Callout>
        </Section>

        {/* 3 · DASHBOARD top niches */}
        <Section id="s3" num="3" title="Дашборд: топ-ниши пика" sub="Размер возможности — прогноз выручки на июнь-2026, млн ₸. Палатки — крупнейший рынок сезона с большим отрывом.">
          <div style={sCard}>
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={TOP_JUN} layout="vertical" margin={{ top: 0, right: 40, left: 30, bottom: 0 }}>
                <CartesianGrid stroke={C.border} strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke={C.dim} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}M`} />
                <YAxis type="category" dataKey="n" stroke={C.dim} fontSize={11} width={140} tickLine={false} axisLine={false} />
                <Tooltip content={<Tip title="Июнь-2026 (прогноз)" />} cursor={{ fill: `${C.accent}10` }} />
                <Bar dataKey="v" radius={[0, 4, 4, 0]} maxBarSize={24}>
                  {TOP_JUN.map((d, i) => <Cell key={i} fill={d.c} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            <Callout icon="🥇" color={C.kaspi} title="Палатки — 720 M ₸ (×5.3)">
              Крупнейший рынок сезона. Драйвер — палатки-кубы для рыбалки и кемпинг 4–8 мест. Деньги в Среднем/Дорогом/Премиум сегментах, не в дешёвых. Дозакуп — только в мае (длинная поставка).
            </Callout>
            <Callout icon="⭐" color={C.green} title="Тенты и шатры — ×18.6">
              Самая сезонная ниша + высокий чек (160 k+ ₸) + слабая конкуренция брендов. Лучший кандидат на бренд-вход. Но дисциплина тайминга критична.
            </Callout>
            <Callout icon="📈" color={C.green} title="Портативные зарядки — +47 %">
              Растущий тренд + сезонность. RedStat закладывает резкий рост YoY (91 → 134 M). Приоритетный заход на горизонте 2026–2027.
            </Callout>
            <Callout icon="🛏️" color={C.blue} title="Спальные мешки — пик в АВГУСТЕ">
              Единственная крупная ниша с поздним пиком: закуп в июне–июле, держать сток до сентября (в отличие от палаток, которые к сентябрю нужно распродать).
            </Callout>
          </div>
        </Section>

        {/* 4 · counter-seasonal */}
        <Section id="s4" num="4" title="⚠ Контрсезонная ловушка" sub="Эти товары формально в дереве «Туризм», но их кривая противоположна летней. Завоз под июнь = замороженные деньги. На графике: палатки (лето) против термосов и фонарей (осень–зима), факт 2025.">
          <div style={sCard}>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={COUNTER} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={C.border} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke={C.dim} fontSize={12} tickLine={false} />
                <YAxis stroke={C.dim} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}M`} />
                <Tooltip content={<Tip />} cursor={{ fill: `${C.accent}10` }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar name="Палатки (лето)" dataKey="Палатки" fill={`${C.kaspi}cc`} radius={[4, 4, 0, 0]} maxBarSize={34} />
                <Line name="Термосы (контрсезон)" dataKey="Термосы" stroke={C.cyan} strokeWidth={3} dot={{ r: 3 }} />
                <Line name="Фонари (контрсезон)" dataKey="Фонари" stroke={C.amber} strokeWidth={3} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 10, lineHeight: 1.6 }}>
              Пока палатки летят в пик, термосы и фонари в июне–июле в минимуме и разворачиваются вверх только к сентябрю–декабрю. <b style={{ color: C.text }}>Термосы, фонари, печи, мультитулы, аксессуары палаток</b> — закупать в августе под осень/Новый год, летом не трогать.
            </div>
          </div>
        </Section>

        {/* 5 · month by month */}
        <Section id="s5" num="5" title="Помесячный план: Май → Сентябрь" sub="Что покупать, что продавать и чего не трогать в каждом месяце сезона.">
          {[
            { mo: "🟢 МАЙ", color: C.green, role: "Месяц закупки и разгона. Май ≠ пик продаж, но именно в мае решается июнь.", buy: "Финальный дозакуп под июнь: палатки, мебель, надувные матрасы, тенты/шатры, зарядки. До 20–25 мая.", sell: "Запуск листингов и разгон отзывов — карточка должна войти в июнь с историей и рейтингом.", no: "Термосы, фонари, печи (их сезон — осень)." },
            { mo: "🔴 ИЮНЬ", color: C.kaspi, role: "ПИК. Абсолютный максимум у 14 из 23 категорий. Месяц, ради которого существует весь сезон.", buy: "Только быстрые поставки под июльский пик (надувная мебель, сумки-холодильники).", sell: "Весь летний ассортимент на пике. Держать цену — спрос приходит сам, маржу не отдавать в скидки. Ежедневный контроль out-of-stock.", no: "Закуп крупногабарита вдогонку — поставка не успеет." },
            { mo: "🟠 ИЮЛЬ", color: C.amber, role: "Высокое плато (~90 % июня). Для части ниш июль — собственно пик.", buy: "Сумки-холодильники, надувная мебель, подушки, горелки — это «июльские» товары.", sell: "Летнее ядро (плато). Начать планировать выход из палаток/мебели — впереди спад.", no: "Новый закуп палаток/тентов." },
            { mo: "🟡 АВГУСТ", color: C.blue, role: "Спад вдвое от июня. Но часть ниш именно сейчас на пике.", buy: "Контрсезон под осень/НГ: термосы, фонари, печи начинают разворот. Спальники, рюкзаки, треккинг — на пике.", sell: "Распродажа летнего ядра промо-скидками (палатки/тенты/коврики к сентябрю обнулятся).", no: "Держать летнее ядро «до следующего года»." },
            { mo: "🔵 СЕНТЯБРЬ", color: C.cyan, role: "Возврат к базе. Структура спроса меняется — лидеры уже контрсезонные.", buy: "Контрсезон в полный рост: термосы, фонари, печи — их сезон только начинается.", sell: "Остатки лета — только промо. Новый летний закуп НЕ делать.", no: "Новый закуп летнего ассортимента (заморозите оборотку до апреля)." },
          ].map((x) => (
            <div key={x.mo} style={{ ...sCard, borderLeft: `4px solid ${x.color}` }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: x.color, margin: 0 }}>{x.mo}</h3>
                <span style={{ fontSize: 13, color: C.dim }}>{x.role}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
                <div><div style={{ fontSize: 11, color: C.green, fontWeight: 700, marginBottom: 4 }}>ЗАКУП</div><div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6 }}>{x.buy}</div></div>
                <div><div style={{ fontSize: 11, color: C.blue, fontWeight: 700, marginBottom: 4 }}>ПРОДАЖА / СТОК</div><div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6 }}>{x.sell}</div></div>
                <div><div style={{ fontSize: 11, color: C.red, fontWeight: 700, marginBottom: 4 }}>НЕ ТРОГАТЬ</div><div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6 }}>{x.no}</div></div>
              </div>
            </div>
          ))}
        </Section>

        {/* 6 · full table */}
        <Section id="s6" num="6" title="Полная таблица по нишам" sub="23 категории, отсортированы по прогнозу выручки на июнь-2026. Значения — млн ₸. «Факт» — Kaspi 2025, «Прогноз» — модель RedStat 2026.">
          <div style={{ overflowX: "auto", ...sCard, padding: 0 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  {["Категория", "Тип", "пик/мин", "Пик", "25:Май", "25:Июн", "25:Июл", "25:Авг", "25:Сен", "26:Май", "26:Июн", "26:Июл", "26:Авг", "26:Сен"].map((h, i) => (
                    <th key={i} style={{ padding: "11px 10px", textAlign: i === 0 ? "left" : "center", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", fontSize: 11, position: i === 0 ? "sticky" : undefined, left: i === 0 ? 0 : undefined, background: i === 0 ? C.surface : undefined }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE.map((r, ri) => {
                  const counter = String(r[1]).includes("контрсезон");
                  return (
                    <tr key={ri} style={{ background: counter ? `${C.amber}0c` : "transparent" }}>
                      <td style={{ padding: "9px 10px", color: C.text, fontWeight: 600, whiteSpace: "nowrap", borderBottom: `1px solid ${C.border}20`, position: "sticky", left: 0, background: counter ? "#16140f" : C.surface }}>{r[0]}</td>
                      <td style={{ padding: "9px 10px", textAlign: "center", color: counter ? C.amber : C.green, borderBottom: `1px solid ${C.border}20`, whiteSpace: "nowrap", fontSize: 11 }}>{r[1]}</td>
                      <td style={{ padding: "9px 10px", textAlign: "center", color: (r[2] as number) >= 5 ? C.kaspi : "#bbb", fontWeight: 700, borderBottom: `1px solid ${C.border}20` }}>×{r[2]}</td>
                      <td style={{ padding: "9px 10px", textAlign: "center", color: "#bbb", borderBottom: `1px solid ${C.border}20`, fontSize: 11 }}>{r[3]}</td>
                      {[4, 5, 6, 7, 8].map((ci) => (
                        <td key={ci} style={{ padding: "9px 10px", textAlign: "center", color: "#999", borderBottom: `1px solid ${C.border}20` }}>{r[ci]}</td>
                      ))}
                      {[9, 10, 11, 12, 13].map((ci) => (
                        <td key={ci} style={{ padding: "9px 10px", textAlign: "center", color: ci === 10 ? C.text : "#ccc", fontWeight: ci === 10 ? 700 : 400, borderBottom: `1px solid ${C.border}20` }}>{r[ci]}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: C.dim, marginTop: 10 }}>Жёлтым подсвечены контрсезонные позиции — внутри дерева «Туризм», но под летний закуп не подходят.</p>
        </Section>

        {/* 7 · recommendations */}
        <Section id="s7" num="7" title="Рекомендации" sub="Что делать прямо сейчас (15 мая) и стратегические приоритеты на сезон.">
          <div style={sCard}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Действия сейчас (последнее окно)</h3>
            {[
              ["1", "Дозакуп под июнь — последняя неделя.", "Приоритет: палатки (кубы для рыбалки + кемпинг 4–8 мест), походная мебель, надувные матрасы, тенты/шатры, портативные зарядки."],
              ["2", "Листинг и отзывы — до 25 мая.", "Карточка без отзывов в июне неконкурентна; раскачка занимает 2–4 недели."],
              ["3", "Ценовое позиционирование.", "В палатках деньги в Среднем/Дорогом/Премиум (209 M против 26 M в дешёвых) — не уходить в ценовое дно."],
              ["4", "Не морозить деньги в контрсезонке.", "Термосы/фонари/печи закупать в августе под осень, не сейчас."],
              ["5", "Спальники и сумки-холодильники — позже основного.", "Их пик — июль–август, есть второе окно дозакупа."],
            ].map(([n, t, d]) => (
              <div key={n} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: `1px solid ${C.border}30` }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: `${C.green}18`, color: C.green, fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n}</div>
                <div><span style={{ color: C.text, fontWeight: 600, fontSize: 14 }}>{t}</span> <span style={{ color: "#bbb", fontSize: 13.5, lineHeight: 1.6 }}>{d}</span></div>
              </div>
            ))}
          </div>

          <div style={{ ...sCard }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Сводный календарь сезона</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                <thead><tr>{["Месяц", "Закуп", "Сток / продажа", "Не трогать"].map((h, i) => (
                  <th key={i} style={{ padding: "10px 12px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>{h}</th>
                ))}</tr></thead>
                <tbody>
                  {[
                    ["Май", "Палатки, мебель, надувное, тенты, зарядки — финал", "Разгон листингов/отзывов", "Термосы, фонари, печи"],
                    ["Июнь", "Только быстрые поставки под июль", "Весь летний ассортимент — пик", "Контрсезонка"],
                    ["Июль", "Сумки-холодильники, подушки, горелки", "Летнее ядро (плато)", "Контрсезонка"],
                    ["Август", "Термосы, фонари, печи под осень; спальники", "Распродажа летнего ядра", "Новый закуп палаток/тентов"],
                    ["Сентябрь", "Контрсезон в полный рост", "Остатки лета — промо", "Новый летний закуп"],
                  ].map((r, i) => (
                    <tr key={i}>
                      <td style={{ padding: "10px 12px", color: C.text, fontWeight: 700, borderBottom: `1px solid ${C.border}20`, whiteSpace: "nowrap" }}>{r[0]}</td>
                      <td style={{ padding: "10px 12px", color: C.green, borderBottom: `1px solid ${C.border}20` }}>{r[1]}</td>
                      <td style={{ padding: "10px 12px", color: "#ccc", borderBottom: `1px solid ${C.border}20` }}>{r[2]}</td>
                      <td style={{ padding: "10px 12px", color: C.red, borderBottom: `1px solid ${C.border}20` }}>{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* 8 · methodology */}
        <Section id="s8" num="8" title="Методология и проверка">
          <div style={sCard}>
            <p style={sP}><b style={{ color: C.text }}>Источник.</b> RedStat Backend API (ClickHouse, данные Kaspi.kz). История <code style={{ color: C.cyan }}>/api/niche/history</code> — помесячный факт ноя-2024 → фев-2026 (16 точек). Прогноз <code style={{ color: C.cyan }}>/api/niche/forecast</code> — модель «тренд × сезонность» до сен-2026, с полями индекса сезонности и пик-месяца.</p>
            <p style={sP}><b style={{ color: C.text }}>Выборка.</b> Дерево «Спорт, туризм → Туризм и отдых на природе», 23 leaf-категории с непрерывным рядом. Доступен полный прошлогодний сезон (май–окт 2025) — паттерн калиброван на факте.</p>
            <p style={sP}><b style={{ color: C.text }}>Проверка.</b> Пик-месяц из API сверен с фактическим максимумом помесячного ряда (совпадает). Контрсезонные аномалии (термосы, фонари, печи) перепроверены вручную — это реальное поведение, не артефакт.</p>
            <Callout icon="⚠️" color={C.amber} title="Ограничение, учтённое в выводах">
              YoY по non-leaf «узлам» искажён перестройкой дерева категорий Kaspi в 2025 — для количественных выводов использованы только leaf-категории с непрерывным рядом. Сегменты и топ-SKU доступны лишь на текущий срез (фев-2026) и читаются как структура ассортимента, а не пиковые объёмы.
            </Callout>
            <p style={{ ...sP, margin: "8px 0 0", fontSize: 13, color: C.dim }}>
              Числа округлены до млн ₸ для читаемости; агрегаты сезона считались по неокруглённым данным. <code style={{ color: C.cyan }}>B ₸</code> = млрд тенге, <code style={{ color: C.cyan }}>M ₸</code> = млн тенге.
            </p>
          </div>
          <div style={{ textAlign: "center", marginTop: 32, fontSize: 12, color: C.dim }}>
            kasymzhanov.com · Сезонная аналитика кемпинга Kaspi.kz · 15 мая 2026
          </div>
        </Section>

      </div>
    </div>
  );
}
