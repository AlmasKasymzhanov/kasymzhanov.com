"use client";

/**
 * English Brock UI charts for "Silicon on Coal" (/en/blog/nvidia-kazakhstan).
 * Mirrors the RU module (nvidia-kazakhstan.tsx) — same data, palette and canon;
 * only the labels, tooltips, axis text and value formats are English. Kept as a
 * separate module so the RU charts stay untouched.
 */

import { ColumnChart } from "@/components/charts/column-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";
import { DuelChart } from "@/components/charts/duel-chart";
import { Term } from "@/components/canon/term";

const num = (v: number) => v.toLocaleString("en-US");
const NEUTRAL = "var(--brock-neutral)";

const LABEL_TIPS: Record<string, string> = {
  // Chart 1
  "Stated": "Stated total — $10bn across several agreements (the government's words)",
  "Stage 1 (stated)": "Stated first stage — about $5bn, incl. ~$1bn from Kazakhtelecom; 125 MW live in 2027",
  "Firmly named": "Firmly named capital — about $1bn from Kazakhtelecom; the rest promised to be raised",
  // Chart 3
  "Old Ekibastuz units": "Ekibastuz's old subcritical units — estimated 900–1,000 g CO₂/kWh",
  'GRES-3 ("clean coal")': 'GRES-3 — ultra-supercritical units ("clean coal"), estimate without CO₂ capture',
  "Kazakhstan (grid)": "Kazakhstan — average grid carbon intensity (Ember, 2025)",
  "World (avg.)": "World — average value",
  "EU (avg.)": "European Union — average value",
  "Wind / solar": "Wind and solar generation",
  // Chart 5
  "N. Virginia (2030)": "Northern Virginia — forecast data-center share by 2030 (29–46%)",
  '"Valley" at 1 GW': '"Data Center Valley" at full 1 GW capacity — author\'s calc (8.9 ÷ 117.9 TWh)',
  "Kazakhstan now": "Kazakhstan — all data centers today (under 1%)",
  // Chart 7
  "Alstom service (HV gear)": "Alstom high-voltage equipment service (20/220/500 kV) — lot 4439122",
  "Turbine-hall fireproofing": "Fireproofing of the turbine hall",
  "Lift, power unit #7": "Lift replacement on power unit #7 — lot 4443640",
  "Ash-dump remediation": "Remediation of the industrial-waste (ash) dump — lot 4451958",
  "Backup-transformer overhaul": "Major overhaul of the backup transformer",
  // Chart 8
  "Kazakhstan": "Kazakhstan — the allowance price in the national trading system (KZ ETS) is about $1 a tonne; permits are handed out free and exchange trading has been suspended since 2022.",
  "EU": "European Union — the allowance price in the EU ETS, around €70 a tonne.",
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

const hasTip = (label: string): boolean => label in LABEL_TIPS;

/* ── Chart 1. Ten billion on paper — the "stated → firm" funnel ── */
export function Grafik1() {
  return (
    <BarChart
      barThickness={40}
      gap={16}
      barRadius={2}
      labelWidth={150}
      xAxis={{ max: 13.5 }}
      slots={{ tooltip: () => null }}
      formatLabel={labelTip}
      labelInteractive={hasTip}
      data={[
        { label: "Stated", value: 10, color: NEUTRAL, pattern: "hatched" },
        { label: "Stage 1 (stated)", value: 5, color: NEUTRAL, pattern: "hatched" },
        { label: "Firmly named", value: 1 },
      ]}
      formatValue={(v: number) =>
        v === 1 ? "$1bn · Kazakhtelecom (state)" : `$${num(v)}bn`
      }
    />
  );
}

/* ── Chart 2. New coal for the digital future — capacity by year ── */
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
      referenceLine={{ value: 1000, label: '"Valley" demand — 1 GW' }}
      yAxis={{ max: 10000 }}
      slots={{ tooltip: () => null }}
      formatValue={(v: number) => `${num(v)} MW`}
    />
  );
}

/* ── Chart 3. The dirtiest outlet — carbon intensity ── */
export function Grafik3() {
  return (
    <BarChart
      barThickness={28}
      gap={10}
      barRadius={2}
      labelWidth={210}
      xAxis={{ max: 1500 }}
      slots={{ tooltip: () => null }}
      formatLabel={labelTip}
      labelInteractive={hasTip}
      data={[
        { label: "Old Ekibastuz units", value: 950, pattern: "hatched" },
        { label: 'GRES-3 ("clean coal")', value: 800, pattern: "hatched" },
        { label: "Kazakhstan (grid)", value: 604 },
        { label: "World (avg.)", value: 450, color: NEUTRAL },
        { label: "USA", value: 385, color: NEUTRAL },
        { label: "EU (avg.)", value: 250, color: NEUTRAL },
        { label: "Wind / solar", value: 35, color: NEUTRAL },
      ]}
      formatValue={(v: number) => `${num(v)} g/kWh`}
    />
  );
}

/* ── Chart 4 (lead). Two lines that aren't meant to meet ── */
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
          name: "actual",
          emphasis: true,
          data: [100, 106, 112, 115, 116],
        },
        {
          key: "promise",
          name: "promised",
          dashed: true,
          data: [100, 94, 85, 78, 74],
        },
      ]}
      events={[{ x: "2030", label: "2030: emissions still rising" }]}
      yAxis={{ title: "emissions, index (2024 = 100)" }}
      formatValue={(v: number) => `${num(Math.round(v))}`}
    />
  );
}

/* ── Chart 5. Where data centers have already overloaded the grid ── */
export function Grafik5() {
  return (
    <BarChart
      barThickness={28}
      gap={10}
      barRadius={2}
      labelWidth={190}
      xAxis={{ max: 56 }}
      slots={{ tooltip: () => null }}
      formatLabel={labelTip}
      labelInteractive={hasTip}
      data={[
        { label: "N. Virginia (2030)", value: 37, pattern: "hatched" },
        { label: "Ireland", value: 22 },
        { label: '"Valley" at 1 GW', value: 7, pattern: "hatched" },
        { label: "USA", value: 2.5, color: NEUTRAL },
        { label: "EU", value: 2.5, color: NEUTRAL },
        { label: "Kazakhstan now", value: 0.8, color: NEUTRAL },
      ]}
      formatValue={(v: number) => `${num(v)}%`}
    />
  );
}

/* ── Chart 6. The same race, the opposite fuel — duel ── */
export function Grafik6() {
  return (
    <DuelChart
      leftLabel="Narvik"
      rightLabel="Ekibastuz"
      leftTag="Norway · renewables"
      rightTag="Kazakhstan · coal"
      verdictSide="right"
      rows={[
        {
          param: "Carbon intensity",
          left: { value: "~17 g/kWh", n: 17 },
          right: { value: "604 g/kWh", n: 604, worse: true },
        },
        {
          param: "Power price",
          left: { value: "3–4 ¢/kWh", n: 3.5 },
          right: { value: "~2.5 ¢ [est.]", n: 2.5 },
        },
        {
          param: "Carbon price",
          left: { value: "~€70/t (EU ETS)", n: 70 },
          right: { value: "~$0.87/t (KZ ETS)", n: 0.87, worse: true },
        },
        {
          param: "Financing maturity",
          left: { value: "closed bank financing" },
          right: { value: "framework + term sheet", worse: true },
        },
        {
          param: "Anchor client",
          left: { value: "Microsoft · $14bn" },
          right: { value: "not announced", worse: true },
        },
        {
          param: "New generation",
          left: { value: "renewables PPA" },
          right: { value: "new coal units", worse: true },
        },
      ]}
    />
  );
}

/* ── Chart 7. Patching the plant for a data center — GRES-1 procurement ── */
export function Grafik7() {
  return (
    <BarChart
      barThickness={28}
      gap={10}
      barRadius={2}
      labelWidth={215}
      xAxis={{ max: 760 }}
      slots={{ tooltip: () => null }}
      formatLabel={labelTip}
      labelInteractive={hasTip}
      data={[
        { label: "Alstom service (HV gear)", value: 480.9 },
        { label: "Turbine-hall fireproofing", value: 168.9, color: NEUTRAL },
        { label: "Lift, power unit #7", value: 29.0, color: NEUTRAL },
        { label: "Ash-dump remediation", value: 15.0, color: NEUTRAL },
        { label: "Backup-transformer overhaul", value: 11.3, color: NEUTRAL },
      ]}
      formatValue={(v: number) => `₸${num(v)}M`}
    />
  );
}

/* ── Chart 8. The price of a tonne of CO₂ — regulatory arbitrage ($1 vs €70) ── */
export function Grafik8() {
  return (
    <BarChart
      barThickness={40}
      gap={16}
      barRadius={2}
      labelWidth={120}
      xAxis={{ max: 82 }}
      slots={{ tooltip: () => null }}
      formatLabel={labelTip}
      labelInteractive={hasTip}
      data={[
        { label: "Kazakhstan", value: 1 },
        { label: "EU", value: 70, color: NEUTRAL },
      ]}
      formatValue={(v: number) => (v === 1 ? "~$1" : "~€70")}
    />
  );
}
