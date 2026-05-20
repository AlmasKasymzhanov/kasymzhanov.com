"use client";

import {
  LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, ReferenceLine,
} from "recharts";

/* ════════════════════════════════════════════════════════════════════════
   HINOKO — Research-отчёт
   Дизайн-канон: Bloomberg minimalism × 10b platform tokens.
   TT Norms Pro — текст. Menlo — все числовые значения (tabular-nums).
   Геометрия: малые радиусы, монохром, единственный синий акцент.
   ════════════════════════════════════════════════════════════════════════ */

/* ─────────────────────────── design tokens ──────────────────────────── */
const C = {
  bg: "#0a0a0a",
  surface: "#111111",
  surfaceAlt: "#161616",
  surfaceHi: "#1a1a1a",
  border: "#1f1f1f",
  borderStrong: "#2e2e2e",
  text: "#ededed",
  textDim: "#a3a3a3",
  textFaint: "#666666",
  accent: "#2a82ff",       // Geist blue (dark mode)
  accentSoft: "#1e3a66",
  good: "#00c781",
  mid: "#f7b955",
  bad: "#ff4444",
};

const FONT_TEXT = "var(--font-tt-norms), system-ui, -apple-system, sans-serif";
const FONT_NUM = "var(--font-menlo), ui-monospace, SFMono-Regular, monospace";

/* ─────────────────────────── data ───────────────────────────────────── */

// Сезонность — combined индексы (Kaspi M, WB W) для иллюстрации dual-peak
const SEASONALITY = [
  { m: "Янв", kaspiW: 0.41, kaspiM: 0.55, wbW: 0.31, wbM: 0.36 },
  { m: "Фев", kaspiW: 1.36, kaspiM: 1.43, wbW: 0.49, wbM: 0.58 },
  { m: "Мар", kaspiW: 2.06, kaspiM: 1.72, wbW: 1.53, wbM: 1.59 },
  { m: "Апр", kaspiW: 0.87, kaspiM: 0.78, wbW: 1.49, wbM: 1.23 },
  { m: "Май", kaspiW: 0.34, kaspiM: 0.38, wbW: 1.14, wbM: 0.93 },
  { m: "Июн", kaspiW: 0.28, kaspiM: 0.34, wbW: 0.64, wbM: 0.52 },
  { m: "Июл", kaspiW: 0.32, kaspiM: 0.33, wbW: 0.59, wbM: 0.47 },
  { m: "Авг", kaspiW: 1.25, kaspiM: 1.04, wbW: 1.46, wbM: 1.12 },
  { m: "Сен", kaspiW: 2.44, kaspiM: 2.16, wbW: 1.72, wbM: 1.81 },
  { m: "Окт", kaspiW: 1.65, kaspiM: 1.65, wbW: 1.24, wbM: 1.62 },
  { m: "Ноя", kaspiW: 0.68, kaspiM: 0.97, wbW: 0.81, wbM: 1.07 },
  { m: "Дек", kaspiW: 0.34, kaspiM: 0.63, wbW: 0.56, wbM: 0.71 },
];

// Kaspi M ценовые сегменты (Feb 2026)
const KASPI_SEGMENTS = [
  { seg: "Низкий", asp: 7651, rev: 8.5, units: 26.0 },
  { seg: "Бюджет", asp: 12623, rev: 12.8, units: 22.1 },
  { seg: "Средний", asp: 17808, rev: 21.6, units: 25.4 },
  { seg: "Дорогой", asp: 23255, rev: 17.9, units: 14.5 },
  { seg: "Премиум", asp: 60341, rev: 39.2, units: 12.0 },
];

// WB исторический рост (млн ₽)
const WB_GROWTH = [
  { y: "2020", wb: 750 },
  { y: "2021", wb: 2420 },
  { y: "2022", wb: 6110 },
  { y: "2023", wb: 11820 },
  { y: "2024", wb: 20600 },
  { y: "2025", wb: 49900 },
];

// Топ-13 Kaspi M (LTM 16 мес, share %)
const KASPI_BRANDS = [
  { n: "Без бренда", v: 41.0, c: C.textDim, tag: "unbranded" },
  { n: "ZENGR", v: 9.6, c: C.text, tag: "mass" },
  { n: "MINESTONE", v: 8.6, c: C.accent, tag: "premium incumbent ★" },
  { n: "Deri Love", v: 6.0, c: C.text, tag: "fashion" },
  { n: "adidas", v: 4.8, c: C.text, tag: "global" },
  { n: "Adidas (dupl.)", v: 4.8, c: C.text, tag: "global" },
  { n: "Tuba", v: 4.7, c: C.text, tag: "KZ outdoor" },
  { n: "LC Waikiki", v: 3.4, c: C.text, tag: "mass" },
  { n: "Nike", v: 3.2, c: C.text, tag: "global" },
  { n: "Ferrari", v: 1.8, c: C.text, tag: "fashion" },
  { n: "FLOW.WE", v: 1.5, c: C.text, tag: "local" },
  { n: "KOCMOC", v: 1.3, c: C.text, tag: "local" },
  { n: "Columbia", v: 1.1, c: C.good, tag: "global outdoor ★" },
];

// Бенчмарки конкурентов (USD MSRP)
const BENCHMARKS = [
  { brand: "Arc'teryx", product: "Alpha SV", tech: "GORE-TEX Pro ePE", price: 899, tier: "Premium" },
  { brand: "Arc'teryx", product: "Beta AR", tech: "GORE-TEX Pro ePE", price: 650, tier: "Premium" },
  { brand: "TNF", product: "Summit Verbier", tech: "GORE-TEX Pro", price: 700, tier: "Premium" },
  { brand: "Patagonia", product: "Triolet", tech: "GORE-TEX Pro", price: 449, tier: "Premium" },
  { brand: "Mammut", product: "Nordwand Adv", tech: "GORE-TEX 3L", price: 699, tier: "Premium" },
  { brand: "Columbia", product: "OutDry Ex", tech: "OutDry Ex", price: 230, tier: "Mid+" },
  { brand: "OR", product: "Helium UL", tech: "Toray Dermizax", price: 225, tier: "Mid+" },
  { brand: "Patagonia", product: "Torrentshell 3L", tech: "H2No 3L", price: 189, tier: "Mid" },
  { brand: "Marmot", product: "Minimalist", tech: "Pertex Shield", price: 185, tier: "Mid" },
  { brand: "Patagonia", product: "Calcite", tech: "H2No 2.5L", price: 179, tier: "Mid" },
  { brand: "Columbia", product: "AmpliDry II", tech: "Omni-Tech 2.5L", price: 160, tier: "Mid" },
  { brand: "Marmot", product: "PreCip 3L", tech: "NanoPro 3L", price: 160, tier: "Mid" },
  { brand: "BD", product: "Stormline", tech: "BD.dry", price: 150, tier: "Mid" },
  { brand: "Marmot", product: "PreCip Eco", tech: "NanoPro 2.5L", price: 120, tier: "Entry+" },
  { brand: "HINOKO", product: "Shell v1.0", tech: "Sympatex / Toray 2.5L", price: 96, tier: "Hinoko ★" },
  { brand: "TNF", product: "Resolve 2", tech: "DryVent 2L", price: 99, tier: "Entry" },
  { brand: "Columbia", product: "Watertight II", tech: "Omni-Tech 2L", price: 85, tier: "Entry" },
  { brand: "Decathlon", product: "Forclaz MT500", tech: "Forclaz proprietary", price: 60, tier: "Mass" },
];

// Финансовые сценарии Year 1
const SCENARIOS = [
  { s: "Low", share: 0.3, gmvUsd: 10800, units: 112, sept: 33, net: -22000 },
  { s: "Base", share: 0.7, gmvUsd: 25200, units: 263, sept: 78, net: -15000 },
  { s: "High", share: 1.5, gmvUsd: 54000, units: 562, sept: 170, net: -4000 },
];

// Календарь запуска
const CALENDAR = [
  { phase: "Май–Авг 26", action: "Спека, прототипы, factory partner, контент", color: C.accent },
  { phase: "Сен 26", action: "Production run #1 (300 шт)", color: C.accent },
  { phase: "Окт 26", action: "Soft-launch Kaspi", color: C.good },
  { phase: "Ноя–Янв 27", action: "Маркетинг, контент, инфлюенсеры", color: C.textDim },
  { phase: "Фев 27", action: "Production run #2 (500–700 шт)", color: C.accent },
  { phase: "Мар 27", action: "Весенний пик — первая коммерческая волна", color: C.good },
  { phase: "Май–Июл 27", action: "Сток заморожен. Контент + brand build", color: C.textFaint },
  { phase: "Авг 27", action: "Production run #3 (1000+ шт)", color: C.accent },
  { phase: "Сен 27", action: "ГЛАВНЫЙ ПИК (target 80–150 шт/мес)", color: C.good },
];

// Риски
const RISKS = [
  { r: "Продукт не дотягивает до tech-ожиданий", p: "Высокая", s: "Тier-1 фабрика, 2 раунда тестов, QC агент" },
  { r: "Цена 45k слишком высока для нового бренда", p: "Средняя", s: "Pre-launch survey, A/B тест 39/45k, рассрочка Kaspi" },
  { r: "MINESTONE / Columbia реакция", p: "Низк.–средн.", s: "Differentiation по narrative, не по цене" },
  { r: "Сезонный провал съедает cash flow", p: "Высокая", s: "Не закупать на лето, 3-4 мес buffer" },
  { r: "Brand awareness = 0", p: "Очень высок.", s: "Контент + инфлюенсеры + PFAS-free USP" },
];

/* ─────────────────────────── reusable bits ──────────────────────────── */

function Section({
  num, title, subtitle, children, id,
}: { num: string; title: string; subtitle?: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} style={{ marginBottom: 72, scrollMarginTop: 24 }}>
      <div style={{ borderTop: `1px solid ${C.borderStrong}`, paddingTop: 24, marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: subtitle ? 8 : 0 }}>
          <span style={{ fontFamily: FONT_NUM, fontSize: 11, color: C.textFaint, letterSpacing: "0.1em" }}>
            §{num}
          </span>
          <h2 style={{
            fontFamily: FONT_TEXT, fontSize: 24, fontWeight: 600, color: C.text,
            margin: 0, letterSpacing: "-0.01em", lineHeight: 1.2,
          }}>{title}</h2>
        </div>
        {subtitle && (
          <p style={{
            fontFamily: FONT_TEXT, fontSize: 13, color: C.textDim, margin: "0 0 0 32px",
            maxWidth: 720, lineHeight: 1.55,
          }}>{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function Card({ children, pad = 24, accent }: { children: React.ReactNode; pad?: number; accent?: string }) {
  return (
    <div style={{
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderLeft: accent ? `2px solid ${accent}` : `1px solid ${C.border}`,
      borderRadius: 4,
      padding: pad,
    }}>{children}</div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: FONT_NUM, fontSize: 10, color: C.textFaint,
      letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8,
    }}>{children}</div>
  );
}

function Num({ children, size = 14, color = C.text, weight = 400 }:
  { children: React.ReactNode; size?: number; color?: string; weight?: number }) {
  return (
    <span style={{
      fontFamily: FONT_NUM, fontSize: size, color, fontWeight: weight,
      fontVariantNumeric: "tabular-nums",
    }}>{children}</span>
  );
}

function P({ children, dim = false }: { children: React.ReactNode; dim?: boolean }) {
  return (
    <p style={{
      fontFamily: FONT_TEXT, fontSize: 14, lineHeight: 1.65,
      color: dim ? C.textDim : C.text, margin: "0 0 12px",
    }}>{children}</p>
  );
}

function KPI({ label, value, unit, sub, delta, deltaPositive }:
  { label: string; value: string; unit?: string; sub?: string; delta?: string; deltaPositive?: boolean }) {
  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4,
      padding: "16px 18px", flex: 1, minWidth: 160,
    }}>
      <Label>{label}</Label>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <Num size={26} color={C.text} weight={500}>{value}</Num>
        {unit && <Num size={12} color={C.textDim}>{unit}</Num>}
      </div>
      {(sub || delta) && (
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
          {delta && (
            <Num size={11} color={deltaPositive ? C.good : C.bad}>
              {deltaPositive ? "▲ " : "▼ "}{delta}
            </Num>
          )}
          {sub && (
            <span style={{ fontFamily: FONT_TEXT, fontSize: 11, color: C.textFaint }}>{sub}</span>
          )}
        </div>
      )}
    </div>
  );
}

/* Row helpers — display:contents позволяет children жить в одной grid-сетке родителя */
function Row({ b }: { b: typeof KASPI_BRANDS[number] }) {
  const isStar = b.tag.includes("★");
  return (
    <div style={{ display: "contents" }}>
      <div style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}`, fontFamily: FONT_TEXT, fontSize: 13, color: C.text, display: "flex", alignItems: "center", gap: 8 }}>
        {isStar && <span style={{ color: b.c, fontSize: 10 }}>●</span>}
        {b.n}
      </div>
      <div style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center" }}>
        <div style={{ height: 6, width: `${(b.v / 41) * 100}%`, background: b.c, opacity: b.c === C.textDim ? 0.4 : 0.7, borderRadius: 1 }} />
      </div>
      <div style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}`, textAlign: "right" }}>
        <Num color={b.c}>{b.v.toFixed(1)}%</Num>
      </div>
      <div style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}`, textAlign: "right" }}>
        <span style={{ fontFamily: FONT_NUM, fontSize: 10, color: isStar ? b.c : C.textFaint, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          {b.tag}
        </span>
      </div>
    </div>
  );
}

function ScenarioRow({ s }: { s: typeof SCENARIOS[number] }) {
  const isBase = s.s === "Base";
  const bg = isBase ? C.accentSoft + "30" : "transparent";
  const cellBase: React.CSSProperties = {
    padding: "14px 12px",
    borderBottom: `1px solid ${C.border}`,
    background: bg,
  };
  const cells: string[] = [
    `${s.share}%`,
    `$${s.gmvUsd.toLocaleString()}`,
    s.units.toString(),
    s.sept.toString(),
    `$${(s.gmvUsd * 0.4).toFixed(0)}`,
    `$${s.net.toLocaleString()}`,
  ];
  return (
    <div style={{ display: "contents" }}>
      <div style={{
        ...cellBase,
        fontFamily: FONT_TEXT, fontSize: 14, fontWeight: isBase ? 600 : 400,
        color: isBase ? C.accent : C.text,
      }}>
        {isBase && "★ "}{s.s}
      </div>
      {cells.map((v, idx) => (
        <div key={idx} style={{ ...cellBase, textAlign: "right" }}>
          <Num color={isBase ? C.accent : C.text} weight={isBase ? 500 : 400}>{v}</Num>
        </div>
      ))}
    </div>
  );
}

/* Tooltip типизирован any — recharts ^3.8 TS-friendly hack из памяти */
function Tip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: C.surfaceHi, border: `1px solid ${C.borderStrong}`,
      borderRadius: 4, padding: "8px 10px", fontFamily: FONT_NUM, fontSize: 11,
    }}>
      <div style={{ color: C.textDim, marginBottom: 4 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ color: p.color, display: "flex", justifyContent: "space-between", gap: 12 }}>
          <span style={{ color: C.textDim }}>{p.name}</span>
          <span style={{ color: p.color, fontVariantNumeric: "tabular-nums" }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ═════════════════════════════ PAGE ═════════════════════════════════ */
export default function Page() {
  return (
    <div style={{
      background: C.bg, color: C.text, minHeight: "100vh",
      fontFamily: FONT_TEXT, fontSize: 14, lineHeight: 1.5,
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 24px 80px" }}>

        {/* ─────────── HEADER STRIP ─────────── */}
        <header style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <a href="/" style={{ fontFamily: FONT_NUM, fontSize: 11, color: C.textDim, textDecoration: "none", letterSpacing: "0.08em" }}>
                ← AKASYMZHANOV.COM
              </a>
              <span style={{ color: C.textFaint }}>/</span>
              <span style={{ fontFamily: FONT_NUM, fontSize: 11, color: C.textFaint, letterSpacing: "0.08em" }}>
                REPORTS / HINOKO
              </span>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <Num size={11} color={C.textFaint}>v1.0 · 2026-05-20</Num>
              <Num size={11} color={C.textFaint}>CONFIDENTIAL</Num>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${C.borderStrong}`, paddingTop: 32 }}>
            <Label>Research-отчёт по запуску</Label>
            <h1 style={{
              fontFamily: FONT_TEXT, fontSize: 48, fontWeight: 700, color: C.text,
              margin: "8px 0 16px", letterSpacing: "-0.025em", lineHeight: 1.05,
            }}>HINOKO</h1>
            <p style={{
              fontFamily: FONT_TEXT, fontSize: 17, color: C.textDim, margin: 0,
              maxWidth: 720, lineHeight: 1.55,
            }}>
              Лёгкая водоотталкивающая техническая куртка для outdoor / кемпинга / хайкинга.
              Запуск на Kaspi.kz с calendar до сентября 2027. Эстетика и функция в духе Arc'teryx,
              реальное позиционирование в премиум-сегменте локального маркетплейса.
            </p>
          </div>

          {/* Meta строка */}
          <div style={{
            marginTop: 32, padding: "16px 0",
            borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
          }}>
            <div>
              <Label>Бренд</Label>
              <div style={{ fontFamily: FONT_TEXT, fontSize: 14, color: C.text }}>Hinoko</div>
            </div>
            <div>
              <Label>Категория</Label>
              <div style={{ fontFamily: FONT_TEXT, fontSize: 14, color: C.text }}>Outdoor apparel</div>
            </div>
            <div>
              <Label>Первый SKU</Label>
              <div style={{ fontFamily: FONT_TEXT, fontSize: 14, color: C.text }}>Shell jacket 2.5L</div>
            </div>
            <div>
              <Label>Целевые рынки</Label>
              <div style={{ fontFamily: FONT_TEXT, fontSize: 14, color: C.text }}>Kaspi.kz · WB (Y2)</div>
            </div>
          </div>
        </header>

        {/* ─────────── §00 EXECUTIVE SUMMARY ─────────── */}
        <Section num="00" title="Executive summary" subtitle="Финальная рекомендация исследования.">
          <Card accent={C.accent} pad={28}>
            <P>
              <strong style={{ color: C.text, fontWeight: 600 }}>Решение: запускать.</strong>{" "}
              Первый рынок — <strong style={{ color: C.text }}>Kaspi.kz</strong>. Первый продукт —
              лёгкая техническая 2.5L shell-куртка с PFAS-free мембраной. Целевая цена{" "}
              <Num color={C.accent}>35 000–55 000 ₸</Num> (<Num color={C.accent}>$75–120</Num>).
              Target Q1 пика — <Num color={C.accent}>80–150 единиц/месяц</Num> в сентябре 2027.
            </P>
            <div style={{
              marginTop: 16, padding: 16, background: C.surfaceAlt,
              borderRadius: 4, borderLeft: `2px solid ${C.good}`,
            }}>
              <P dim>
                <strong style={{ color: C.text }}>White space найден:</strong> Kaspi M Премиум-сегмент
                (39% выручки M-категории). MINESTONE удерживает $100 ASP без technical narrative,
                Columbia (единственный global outdoor) на 1.1%. Hinoko позиционируется как локальный
                технический outdoor-бренд с реальной мембраной — позиция, которую сейчас никто не занимает.
              </P>
            </div>
          </Card>

          {/* KPI ROW */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
            <KPI label="Mировой TAM" value="$17–22" unit="млрд" sub="technical outdoor apparel 2024" />
            <KPI label="WB категория" value="$549" unit="M" delta="+110% CAGR 4y" deltaPositive />
            <KPI label="Kaspi категория" value="$11.6" unit="M LTM" delta="+39% YoY avg" deltaPositive />
            <KPI label="Hinoko Yr1 SAM" value="$1.4" unit="M" sub="Kaspi M outdoor Premium" />
            <KPI label="Target ASP" value="45 000" unit="₸" sub="≈ $96" />
            <KPI label="Стартовый капитал" value="$60–70" unit="K" sub="на Y1" />
          </div>
        </Section>

        {/* ─────────── §01 МАРКЕТ-ОЦЕНКА ─────────── */}
        <Section num="01" title="Размер рынка" subtitle="Глобальный outdoor apparel TAM, Kaspi vs WB.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Card>
              <Label>Мировые источники outdoor apparel TAM 2024</Label>
              <div style={{ marginTop: 12 }}>
                {[
                  { src: "Global Market Insights", val: "$17.47B", cagr: "+5.5%" },
                  { src: "Business Research Insights", val: "$22.15B", cagr: "+5.8%" },
                  { src: "Research & Markets", val: "$37.1B", cagr: "+6.9%", note: "incl. accessories" },
                  { src: "WiseGuyReports (jackets-only)", val: "$6.16B", cagr: "+4.7%" },
                ].map((s) => (
                  <div key={s.src} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "baseline",
                    padding: "10px 0", borderBottom: `1px solid ${C.border}`,
                  }}>
                    <div>
                      <div style={{ fontFamily: FONT_TEXT, fontSize: 13, color: C.text }}>{s.src}</div>
                      {s.note && <div style={{ fontFamily: FONT_TEXT, fontSize: 11, color: C.textFaint }}>{s.note}</div>}
                    </div>
                    <div style={{ display: "flex", gap: 16 }}>
                      <Num color={C.text} weight={500}>{s.val}</Num>
                      <Num color={C.good} size={12}>{s.cagr}</Num>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.borderStrong}` }}>
                <P dim>
                  Консервативный диапазон для pure technical outdoor apparel = <Num color={C.text}>$17–22B</Num>.
                  Jackets-only субсегмент = <Num color={C.text}>$5.5–7B</Num>.
                </P>
              </div>
            </Card>

            <Card>
              <Label>WB категория «Ветровка» — взрывной рост</Label>
              <div style={{ height: 220, marginTop: 12 }}>
                <ResponsiveContainer>
                  <BarChart data={WB_GROWTH} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
                    <XAxis dataKey="y" stroke={C.textFaint} tick={{ fontFamily: FONT_NUM, fontSize: 10 }} axisLine={{ stroke: C.borderStrong }} tickLine={false} />
                    <YAxis stroke={C.textFaint} tick={{ fontFamily: FONT_NUM, fontSize: 10 }}
                      tickFormatter={(v: number) => `${v / 1000}B`}
                      axisLine={{ stroke: C.borderStrong }} tickLine={false} />
                    <Tooltip content={<Tip />} cursor={{ fill: C.surfaceAlt }} />
                    <Bar dataKey="wb" name="WB млн ₽" fill={C.accent} radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ marginTop: 8 }}>
                <P dim>
                  2020 → 2025: <Num color={C.text}>0.75B → 49.9B ₽</Num>.
                  4-year CAGR <Num color={C.good}>+110–115%</Num>. В 2026 замедление до{" "}
                  <Num color={C.mid}>+17–40%</Num> YoY (зрелость).
                </P>
              </div>
            </Card>
          </div>

          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <Card>
              <Label>WB vs Kaspi</Label>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
                <Num size={32} color={C.accent} weight={500}>47×</Num>
                <span style={{ fontFamily: FONT_TEXT, fontSize: 12, color: C.textDim }}>WB крупнее</span>
              </div>
              <P dim>$549M (WB 2025) vs $11.6M (Kaspi LTM)</P>
            </Card>
            <Card>
              <Label>Per-capita покупки</Label>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
                <Num size={32} color={C.accent} weight={500}>6.2×</Num>
                <span style={{ fontFamily: FONT_TEXT, fontSize: 12, color: C.textDim }}>больше в РФ</span>
              </div>
              <P dim>$3.81 vs $0.61 на человека в год</P>
            </Card>
            <Card>
              <Label>Hinoko SAM на Kaspi</Label>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
                <Num size={32} color={C.text} weight={500}>$1.4M</Num>
                <span style={{ fontFamily: FONT_TEXT, fontSize: 12, color: C.textDim }}>в год</span>
              </div>
              <P dim>M Premium outdoor (≈30% × $3.6M M-категории)</P>
            </Card>
          </div>
        </Section>

        {/* ─────────── §02 СЕЗОННОСТЬ ─────────── */}
        <Section num="02" title="Сезонность"
          subtitle="Двойной пик: март-апрель + сентябрь. Сентябрь главный (idx 1.7-2.4×). Январь и июнь-июль — глубокие троги. Паттерн универсален на обоих маркетплейсах.">
          <Card>
            <div style={{ height: 360 }}>
              <ResponsiveContainer>
                <LineChart data={SEASONALITY} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
                  <XAxis dataKey="m" stroke={C.textFaint} tick={{ fontFamily: FONT_NUM, fontSize: 11 }} axisLine={{ stroke: C.borderStrong }} tickLine={false} />
                  <YAxis stroke={C.textFaint} tick={{ fontFamily: FONT_NUM, fontSize: 11 }}
                    tickFormatter={(v: number) => v.toFixed(1)}
                    axisLine={{ stroke: C.borderStrong }} tickLine={false}
                    label={{ value: "Индекс сезонности", angle: -90, position: "insideLeft", style: { fontFamily: FONT_NUM, fontSize: 10, fill: C.textFaint } }}
                  />
                  <Tooltip content={<Tip />} cursor={{ stroke: C.borderStrong }} />
                  <ReferenceLine y={1} stroke={C.borderStrong} strokeDasharray="4 4" />
                  <Line dataKey="kaspiM" name="Kaspi M" stroke={C.accent} strokeWidth={2.5} dot={{ r: 3, fill: C.accent }} />
                  <Line dataKey="kaspiW" name="Kaspi W" stroke={C.accent} strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                  <Line dataKey="wbM" name="WB M" stroke={C.text} strokeWidth={2.5} dot={{ r: 3, fill: C.text }} />
                  <Line dataKey="wbW" name="WB W" stroke={C.text} strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{
              marginTop: 16, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
              paddingTop: 16, borderTop: `1px solid ${C.border}`,
            }}>
              <div>
                <Label>Главный пик</Label>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <Num size={20} color={C.good} weight={500}>Сен</Num>
                  <Num size={11} color={C.textDim}>idx 1.7-2.4×</Num>
                </div>
              </div>
              <div>
                <Label>Весенний пик</Label>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <Num size={20} color={C.text} weight={500}>Мар</Num>
                  <Num size={11} color={C.textDim}>idx 1.5-2.1×</Num>
                </div>
              </div>
              <div>
                <Label>Зимний трог</Label>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <Num size={20} color={C.bad} weight={500}>Янв</Num>
                  <Num size={11} color={C.textDim}>idx 0.3-0.5</Num>
                </div>
              </div>
              <div>
                <Label>Летний трог</Label>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <Num size={20} color={C.bad} weight={500}>Июн-Июл</Num>
                  <Num size={11} color={C.textDim}>idx 0.3-0.6</Num>
                </div>
              </div>
            </div>
          </Card>
          <div style={{ marginTop: 16 }}>
            <P dim>
              <strong style={{ color: C.text }}>Импликация:</strong> 60-70% годового стока должно
              приходиться на февральскую и августовскую закупки. Май-июль — не закупать.
              Peak/trough ratio: Kaspi 7-9×, WB 5-5.5×.
            </P>
          </div>
        </Section>

        {/* ─────────── §03 KASPI BRAND LANDSCAPE ─────────── */}
        <Section num="03" title="Kaspi — конкурентный ландшафт M-категории"
          subtitle="Top-15 брендов по LTM-выручке. Цель — занять место рядом с Columbia (единственный global outdoor) и потеснить MINESTONE через technical narrative.">
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(160px, 1.2fr) 1fr 80px 120px", gap: 0 }}>
              {/* header */}
              <div style={{ padding: "10px 12px", borderBottom: `1px solid ${C.borderStrong}`, fontFamily: FONT_NUM, fontSize: 10, color: C.textFaint, letterSpacing: "0.1em" }}>
                BRAND
              </div>
              <div style={{ padding: "10px 12px", borderBottom: `1px solid ${C.borderStrong}`, fontFamily: FONT_NUM, fontSize: 10, color: C.textFaint, letterSpacing: "0.1em" }}>
                BAR
              </div>
              <div style={{ padding: "10px 12px", borderBottom: `1px solid ${C.borderStrong}`, fontFamily: FONT_NUM, fontSize: 10, color: C.textFaint, letterSpacing: "0.1em", textAlign: "right" }}>
                SHARE
              </div>
              <div style={{ padding: "10px 12px", borderBottom: `1px solid ${C.borderStrong}`, fontFamily: FONT_NUM, fontSize: 10, color: C.textFaint, letterSpacing: "0.1em", textAlign: "right" }}>
                TAG
              </div>
              {KASPI_BRANDS.map((b) => (
                <Row key={b.n} b={b} />
              ))}
            </div>
          </Card>

          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            <KPI label="HHI (top-200)" value="1297" sub="W категория" />
            <KPI label="Эфф. конкурентов" value="8" sub="W (10000/HHI)" />
            <KPI label="Top-3 share" value="42.8" unit="%" sub="W" />
            <KPI label="«Без бренда»" value="35" unit="%" sub="W доля категории" />
          </div>
        </Section>

        {/* ─────────── §04 PRICE POSITIONING ─────────── */}
        <Section num="04" title="Цена и позиционирование Hinoko"
          subtitle="MSRP-карта Tier 1-3 брендов в USD. Hinoko v1.0 садится между entry-mid global brands и локальным премиумом Kaspi.">
          <Card>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT_TEXT, fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.borderStrong}` }}>
                    {["Бренд", "Продукт", "Технология", "MSRP USD", "Tier"].map((h) => (
                      <th key={h} style={{
                        textAlign: h === "MSRP USD" ? "right" : "left",
                        padding: "12px 14px",
                        fontFamily: FONT_NUM, fontSize: 10, color: C.textFaint,
                        letterSpacing: "0.1em", fontWeight: 400,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {BENCHMARKS.map((b, i) => {
                    const isHinoko = b.brand === "HINOKO";
                    return (
                      <tr key={i} style={{
                        borderBottom: `1px solid ${C.border}`,
                        background: isHinoko ? C.accentSoft + "40" : "transparent",
                      }}>
                        <td style={{ padding: "8px 14px", color: isHinoko ? C.accent : C.text, fontWeight: isHinoko ? 600 : 400 }}>
                          {isHinoko && <span style={{ color: C.accent }}>★ </span>}{b.brand}
                        </td>
                        <td style={{ padding: "8px 14px", color: C.textDim }}>{b.product}</td>
                        <td style={{ padding: "8px 14px", color: C.textDim, fontSize: 12 }}>{b.tech}</td>
                        <td style={{ padding: "8px 14px", textAlign: "right" }}>
                          <Num color={isHinoko ? C.accent : C.text} weight={isHinoko ? 500 : 400}>${b.price}</Num>
                        </td>
                        <td style={{ padding: "8px 14px" }}>
                          <span style={{
                            fontFamily: FONT_NUM, fontSize: 10, letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: isHinoko ? C.accent : C.textFaint,
                          }}>{b.tier}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Kaspi M segments */}
          <div style={{ marginTop: 24 }}>
            <Label>Kaspi M ценовые сегменты — где главная маржа</Label>
            <Card>
              <div style={{ height: 240 }}>
                <ResponsiveContainer>
                  <BarChart data={KASPI_SEGMENTS} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke={C.border} strokeDasharray="2 4" vertical={false} />
                    <XAxis dataKey="seg" stroke={C.textFaint} tick={{ fontFamily: FONT_NUM, fontSize: 11 }} axisLine={{ stroke: C.borderStrong }} tickLine={false} />
                    <YAxis stroke={C.textFaint} tick={{ fontFamily: FONT_NUM, fontSize: 11 }}
                      tickFormatter={(v: number) => `${v}%`}
                      axisLine={{ stroke: C.borderStrong }} tickLine={false} />
                    <Tooltip content={<Tip />} cursor={{ fill: C.surfaceAlt }} />
                    <Bar dataKey="rev" name="Доля выручки %" fill={C.accent} radius={[2, 2, 0, 0]} />
                    <Bar dataKey="units" name="Доля штук %" fill={C.textDim} radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <P dim>
                Премиум-сегмент (ASP <Num color={C.text}>60 341 ₸</Num>) = <Num color={C.accent}>39%</Num> выручки
                M-категории при <Num color={C.text}>12%</Num> штук. <Num color={C.good}>87%</Num> брендированно.
                Hinoko заходит чуть ниже Премиума (45 000 ₸) — широкий accessible price-point с premium-характеристиками.
              </P>
            </Card>
          </div>
        </Section>

        {/* ─────────── §05 PRODUCT SPEC ─────────── */}
        <Section num="05" title="Hinoko Shell-Jacket v1.0 — продуктовая спецификация"
          subtitle="Реалистичный benchmark: между Marmot PreCip ($120) и Columbia AmpliDry ($160). Не Arc'teryx.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Card>
              <Label>Минимальная спецификация</Label>
              {[
                ["Тип", "2.5L rain shell"],
                ["Мембрана", "Sympatex / Toray 2.5L proprietary"],
                ["Водонепрониц.", "10 000 mm WP"],
                ["Паропрониц.", "5 000 g/m²/24h MVTR"],
                ["DWR", "PFAS-free C0 (обязательно)"],
                ["Швы", "Полностью проклеенные"],
                ["Капюшон", "Регулируемый, helmet-compat."],
                ["Карманы", "2 нагрудных waterproof + 1 внутренний"],
                ["Вес M-размер", "< 500 г"],
                ["Гарантия", "2 года"],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: "flex", justifyContent: "space-between", padding: "8px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}>
                  <span style={{ fontFamily: FONT_TEXT, fontSize: 13, color: C.textDim }}>{k}</span>
                  <span style={{ fontFamily: FONT_NUM, fontSize: 12, color: C.text }}>{v}</span>
                </div>
              ))}
            </Card>

            <Card>
              <Label>Юнит-экономика</Label>
              {[
                ["Розничная цена", "45 000 ₸ ($96)", C.accent],
                ["Себестоимость CIF", "12-18 K ₸ ($26-39)", C.text],
                ["Kaspi комиссия", "−10%", C.bad],
                ["Эквайринг", "−5%", C.bad],
                ["Доставка", "−3%", C.bad],
                ["Возвраты резерв", "−8%", C.bad],
                ["Net per unit", "≈ 18 300 ₸ ($39)", C.good],
                ["Net margin", "≈ 40%", C.good],
              ].map(([k, v, color]) => (
                <div key={k} style={{
                  display: "flex", justifyContent: "space-between", padding: "8px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}>
                  <span style={{ fontFamily: FONT_TEXT, fontSize: 13, color: C.textDim }}>{k}</span>
                  <Num color={color}>{v}</Num>
                </div>
              ))}
            </Card>
          </div>
        </Section>

        {/* ─────────── §06 CALENDAR ─────────── */}
        <Section num="06" title="Календарь запуска"
          subtitle="От прототипирования к главному коммерческому пику Year 1 — сентябрь 2027.">
          <Card>
            {CALENDAR.map((c, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "140px 12px 1fr",
                gap: 16, alignItems: "center", padding: "12px 0",
                borderBottom: i < CALENDAR.length - 1 ? `1px solid ${C.border}` : "none",
              }}>
                <Num color={C.textDim} size={12}>{c.phase}</Num>
                <div style={{
                  width: 8, height: 8, borderRadius: 8, background: c.color,
                  boxShadow: `0 0 0 3px ${c.color}20`,
                }} />
                <span style={{ fontFamily: FONT_TEXT, fontSize: 13, color: C.text }}>{c.action}</span>
              </div>
            ))}
          </Card>
        </Section>

        {/* ─────────── §07 SCENARIOS ─────────── */}
        <Section num="07" title="Финансовые сценарии Year 1"
          subtitle="Допущения: ASP 45 000 ₸, CIF $32/unit, Kaspi+эквайринг+логистика 18%, возвраты 10%, маркетинг $20-30K.">
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr 1fr 1fr 1fr 1fr", gap: 0 }}>
              {["", "Доля Kaspi M", "GMV годовой", "Единиц/год", "Сент пик, шт", "Net contrib.", "Net Y1 (incl. mkt)"].map((h) => (
                <div key={h} style={{
                  padding: "10px 12px", borderBottom: `1px solid ${C.borderStrong}`,
                  fontFamily: FONT_NUM, fontSize: 10, color: C.textFaint,
                  letterSpacing: "0.1em", textAlign: h === "" ? "left" : "right",
                }}>{h.toUpperCase()}</div>
              ))}
              {SCENARIOS.map((s) => (
                <ScenarioRow key={s.s} s={s} />
              ))}
            </div>
            <div style={{
              marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.borderStrong}`,
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24,
            }}>
              <div>
                <Label>Минимальный starting capital</Label>
                <Num size={28} color={C.text} weight={500}>~$29K</Num>
                <P dim>Для soft-launch октября 2026 (1 production run + бренд + контент + Kaspi setup)</P>
              </div>
              <div>
                <Label>Полный Year 1 (3 production runs + маркетинг)</Label>
                <Num size={28} color={C.accent} weight={500}>~$60-70K</Num>
                <P dim>Year 1 — investment year. Break-even в Year 2 при Base-сценарии</P>
              </div>
            </div>
          </Card>
        </Section>

        {/* ─────────── §08 RISKS ─────────── */}
        <Section num="08" title="Риски и митигации">
          <Card>
            {RISKS.map((r, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr 140px 2fr",
                gap: 24, alignItems: "flex-start", padding: "16px 0",
                borderBottom: i < RISKS.length - 1 ? `1px solid ${C.border}` : "none",
              }}>
                <div style={{ fontFamily: FONT_TEXT, fontSize: 13, color: C.text }}>{r.r}</div>
                <div>
                  <span style={{
                    fontFamily: FONT_NUM, fontSize: 10,
                    color: r.p === "Высокая" || r.p === "Очень высок." ? C.bad : r.p.includes("средн") ? C.mid : C.good,
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    padding: "3px 8px",
                    background: (r.p === "Высокая" || r.p === "Очень высок." ? C.bad : r.p.includes("средн") ? C.mid : C.good) + "15",
                    borderRadius: 2,
                  }}>{r.p}</span>
                </div>
                <div style={{ fontFamily: FONT_TEXT, fontSize: 13, color: C.textDim }}>{r.s}</div>
              </div>
            ))}
          </Card>
        </Section>

        {/* ─────────── §09 METHODOLOGY ─────────── */}
        <Section num="09" title="Методология и источники"
          subtitle="Все цифры верифицированы 4-7 кросс-проверками. Артефакты задокументированы.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <Card>
              <Label>Kaspi.kz</Label>
              <div style={{ fontFamily: FONT_TEXT, fontSize: 13, color: C.text, marginBottom: 8 }}>
                RedStat Backend API
              </div>
              <P dim>
                Категории <Num color={C.text} size={12}>01160</Num> +{" "}
                <Num color={C.text} size={12}>01161</Num>.
                16 месяцев факта (Nov-2024 → Feb-2026) + 7 месяцев прогноза.
                4 кросс-верификации. Endpoints: history, forecast, detail, sku-v1, category-brand, category-segments.
              </P>
            </Card>
            <Card>
              <Label>Wildberries</Label>
              <div style={{ fontFamily: FONT_TEXT, fontSize: 13, color: C.text, marginBottom: 8 }}>
                MPSTATS API
              </div>
              <P dim>
                Категории «Ветровка» (W+M).{" "}
                <Num color={C.text} size={12}>75</Num> месяцев факта (с Feb 2020).
                Endpoints: trends, by_date, category, brands, sellers.
                Top-200 брендов = 68% (W) / 80% (M) выручки категории.
              </P>
            </Card>
            <Card>
              <Label>Global brand intel</Label>
              <div style={{ fontFamily: FONT_TEXT, fontSize: 13, color: C.text, marginBottom: 8 }}>
                Perplexity Pro Research
              </div>
              <P dim>
                <Num color={C.text} size={12}>106</Num> цитированных источников.
                Amer Sports 10-K, VF Corp 10-K, Columbia 10-K, Patagonia Work in Progress 2025,
                OIA, Global Market Insights, ECDB, leave-russia.org.
              </P>
            </Card>
          </div>

          <div style={{ marginTop: 24, padding: "20px 0", borderTop: `1px solid ${C.border}` }}>
            <Label>Конверсия валют (приблизительно май 2026)</Label>
            <div style={{ display: "flex", gap: 32, marginTop: 8 }}>
              <Num color={C.text}>1 USD ≈ 470 ₸ / 85 ₽</Num>
              <Num color={C.textDim}>1 ₽ ≈ 5.5 ₸</Num>
              <Num color={C.textDim}>1 EUR ≈ 510 ₸ / 92 ₽</Num>
            </div>
          </div>
        </Section>

        {/* ─────────── FOOTER ─────────── */}
        <footer style={{
          marginTop: 80, paddingTop: 32, borderTop: `1px solid ${C.borderStrong}`,
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 10, color: C.textFaint, letterSpacing: "0.12em", marginBottom: 6 }}>
              HINOKO LAUNCH RESEARCH · v1.0
            </div>
            <div style={{ fontFamily: FONT_TEXT, fontSize: 12, color: C.textDim }}>
              Подготовлено на основе RedStat Backend (Kaspi), MPSTATS API (WB) и Perplexity Research (Global).
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <a href="/" style={{
              fontFamily: FONT_NUM, fontSize: 11, color: C.accent,
              textDecoration: "none", letterSpacing: "0.08em",
            }}>
              AKASYMZHANOV.COM →
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
