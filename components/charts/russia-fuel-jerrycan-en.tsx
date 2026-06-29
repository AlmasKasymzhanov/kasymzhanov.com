"use client";

/**
 * Brock UI charts (EN) for "The State Shut Down the Statistics. The Market
 * Opened a Jerrycan" (russia-fuel-jerrycan). Native-English transcreation of the
 * RU chart module. FT / Bloomberg / Tufte canon: monochrome graphite
 * (--brock-neutral) for context + exactly ONE warm accent (--brock-accent) for
 * "the crisis signal". Every chart carries a takeaway title, a plain-words colour
 * LEGEND and a one-line "what it means" note. Data: MPStats (Wildberries),
 * Redstat (Kaspi), Google Trends, Yandex Wordstat — verified against raw reports.
 * Search queries are English glosses of the original Russian Wordstat phrases.
 */

import { ColumnChart } from "@/components/charts/column-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";
import { Term } from "@/components/canon/term";

const num = (v: number) => v.toLocaleString("en-US");
const ACCENT = "var(--brock-accent)";
const NEUTRAL = "var(--brock-neutral)";

/* Daily order labels: Mar 1 … Jun 27 (119 days), generated once. */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS: string[] = (() => {
  const out: string[] = [];
  const d = new Date(2026, 2, 1); // 1 March
  for (let i = 0; i < 119; i++) {
    out.push(`${MONTHS[d.getMonth()]} ${d.getDate()}`);
    d.setDate(d.getDate() + 1);
  }
  return out;
})();

// Daily orders, fuel jerrycans, Wildberries (MPStats). Mar 1 – Jun 27.
const ORDERS_2026 = [
  297, 325, 248, 279, 269, 256, 279, 255, 245, 277, 272, 271, 322, 323, 302, 281, 334, 323, 389, 375, 354, 321, 275, 335, 348, 279, 293, 327, 327, 337, 366,
  373, 463, 536, 514, 557, 551, 615, 594, 594, 606, 604, 553, 580, 641, 697, 895, 813, 597, 725, 708, 582, 437, 453, 397, 491, 461, 369, 465, 409, 519,
  577, 681, 709, 656, 696, 840, 582, 604, 429, 463, 536, 557, 582, 532, 508, 449, 597, 623, 617, 625, 501, 585, 536, 689, 700, 576, 647, 629, 658, 721, 1104,
  1043, 973, 916, 884, 807, 622, 788, 894, 840, 752, 699, 685, 796, 978, 967, 1103, 807, 658, 676, 857, 1018, 1123, 1427, 1220, 1110, 1013, 830,
];
const ORDERS_2025 = [
  160, 144, 195, 205, 179, 176, 186, 147, 210, 242, 229, 256, 212, 230, 236, 255, 254, 204, 238, 241, 266, 242, 261, 321, 260, 254, 252, 273, 361, 323, 324,
  307, 316, 297, 251, 186, 226, 251, 238, 249, 274, 260, 251, 286, 325, 363, 328, 328, 310, 301, 316, 420, 403, 380, 348, 395, 409, 404, 385, 422, 445,
  448, 438, 476, 513, 498, 522, 386, 399, 289, 379, 372, 361, 425, 368, 350, 291, 283, 326, 349, 362, 373, 467, 475, 467, 465, 392, 396, 426, 455, 441, 522,
  564, 539, 485, 591, 553, 491, 470, 518, 419, 408, 514, 529, 501, 465, 543, 503, 569, 553, 550, 449, 444, 436, 435, 470, 503, 407, 424,
];

const LABEL_TIPS: Record<string, string> = {
  "UK · 2021": "Halfords: jerrycan sales +1,656% over the weekend of 25–26 Sep 2021 (≈17×); “jerry can” the 4th-most-searched term on its site. Retailer data via CNBC / City A.M.",
  "US · 2021": "Google Trends “gas can”: on day 5 of the Colonial Pipeline outage (May 2021), a peak of ×3.5 vs base. This is search, not sales — no direct jerrycan-sales data exists.",
  "Russia · 2026": "Wildberries (MPStats): 23 June 2026 — a peak of 1,427 jerrycans in a single day, +228% year on year. Sales.",
};

const labelTip = (label: string): React.ReactNode => {
  const tip = LABEL_TIPS[label];
  return tip ? <Term tip={tip}>{label}</Term> : label;
};

/* Plain-words colour legend under each chart — the orange/grey decoder. */
function Legend({ items }: { items: { color: string; label: string; faint?: boolean }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3.5 font-mono text-[11px] leading-snug text-[var(--color-dim)]">
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

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-dim)] mb-2">
      {children}
    </p>
  );
}

/* Ranked phrase list with mini progress bars — mobile-safe (the full phrase sits
 * on its own line and wraps; the bar scales to the largest value). */
function PhraseBars({
  items,
  valueFmt = num,
}: {
  items: { label: string; value: number; accent?: boolean }[];
  valueFmt?: (v: number) => string;
}) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <div className="space-y-3">
      {items.map((it) => (
        <div key={it.label}>
          <div className="flex items-baseline justify-between gap-3 mb-1.5">
            <span className="font-mono text-[12.5px] text-[var(--color-text)] leading-snug">{it.label}</span>
            <span className="font-mono text-[12px] text-[var(--color-dim)] tabular-nums shrink-0">{valueFmt(it.value)}</span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--color-border)]/50 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${(it.value / max) * 100}%`, background: it.accent ? ACCENT : NEUTRAL }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Chart 1 (HERO). Jerrycans spiked the day fuel was pulled ── */
export function Grafik1() {
  return (
    <>
      <LineChart
        height={300}
        lineWidth={2}
        markers="none"
        directLabels={false}
        xScale="point"
        x={DAY_LABELS}
        data={[
          { name: "2026", data: ORDERS_2026, emphasis: true },
          { name: "2025", data: ORDERS_2025, color: NEUTRAL, dashed: true },
        ]}
        bands={[{ from: "Jun 20", to: "Jun 22" }]}
        events={[{ x: "Jun 23", label: "Jun 23" }]}
        xAxis={{ ticks: 8 }}
        yAxis={{ title: "orders per day", max: 1700 }}
        formatValue={(v: number) => num(Math.round(v))}
      />
      <Legend
        items={[
          { color: ACCENT, label: "2026 — the year of the shortage" },
          { color: NEUTRAL, label: "2025 — an ordinary year (baseline)" },
          { color: ACCENT, faint: true, label: "shaded band — days fuel sales were banned (Jun 20–22)" },
        ]}
      />
    </>
  );
}

/* ── Chart 2A. Season or panic? — how many times demand grew ── */
export function Grafik2a() {
  const mult = (v: number) => `${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}×`;
  return (
    <>
      <BarChart
        barThickness={36}
        gap={16}
        barRadius={2}
        labelWidth={56}
        xAxis={{ max: 4, hideTicks: true }}
        slots={{ tooltip: () => null }}
        data={[
          { label: "2025", value: 1.88, color: NEUTRAL },
          { label: "2026", value: 3.51 },
        ]}
        dataLabels={{ show: true, format: mult }}
        formatValue={mult}
      />
      <Legend
        items={[
          { color: ACCENT, label: "2026 — up 3.5×: nearly double the usual (the anomaly)" },
          { color: NEUTRAL, label: "2025 — up 1.9×: ordinary summer seasonality" },
        ]}
      />
    </>
  );
}

/* ── Chart 3-search. The market gave itself away — anatomy of 1.94M + tell-tales ──
 * Top: leading phrasings of the "jerrycan" query in a month (1.94M total; nearly a
 * third literally "for fuel"). Bottom: tell-tale phrases — panic and shortage in
 * plain words. From a full read of Wordstat's top-2,000 queries. */
export function Grafik3search() {
  return (
    <div className="space-y-6">
      <div>
        <SubLabel>Top “jerrycan” searches in a month, impressions (Wordstat)</SubLabel>
        <PhraseBars
          items={[
            { label: "“jerrycan” — total", value: 1940545, accent: true },
            { label: "“jerrycan for fuel”", value: 575733 },
            { label: "“buy a jerrycan”", value: 446730 },
            { label: "“jerrycan, litres”", value: 358254 },
            { label: "“20 L jerrycan”", value: 332259 },
            { label: "“buy a jerrycan for fuel”", value: 227636 },
            { label: "“20-litre jerrycan”", value: 224431 },
          ]}
        />
      </div>
      <div className="border-t border-[var(--color-border)] pt-5">
        <SubLabel>Tell-tale phrases: panic and shortage in plain words, impressions</SubLabel>
        <PhraseBars
          items={[
            { label: "“filling jerrycans at the station”", value: 93139, accent: true },
            { label: "“can you put fuel in a jerrycan”", value: 75533 },
            { label: "“fuel into a jerrycan at the pump”", value: 55012 },
            { label: "“jerrycan Crimean bridge”", value: 30155 },
            { label: "“jerrycans across the bridge”", value: 24620 },
            { label: "“jerrycans banned”", value: 21569 },
          ]}
        />
      </div>
    </div>
  );
}

/* ── Chart 5. The jerrycan as a crisis gauge: three countries, one script ──
 * Three separate panels — DIFFERENT kinds of data, so each on its own scale. */
export function Grafik5() {
  const panel = (
    label: string,
    value: number,
    fmt: (v: number) => string,
    max: number,
    accent: boolean,
  ) => (
    <div>
      <SubLabel>{labelTip(label)}</SubLabel>
      <BarChart
        barThickness={28}
        gap={10}
        barRadius={2}
        labelWidth={1}
        xAxis={{ max, hideTicks: true }}
        slots={{ tooltip: () => null }}
        data={[{ label: "", value, ...(accent ? {} : { color: NEUTRAL }) }]}
        dataLabels={{ show: true, format: fmt }}
        formatValue={fmt}
      />
    </div>
  );
  return (
    <>
      <div className="space-y-5">
        {panel("UK · 2021", 1656, (v) => `+${num(v)}% · sales`, 1880, false)}
        {panel("US · 2021", 250, () => `search ×3.5`, 285, false)}
        {panel("Russia · 2026", 228, (v) => `+${num(v)}% · sales`, 260, true)}
      </div>
      <Legend
        items={[
          { color: ACCENT, label: "Russia — our case" },
          { color: NEUTRAL, label: "UK and US — for comparison" },
        ]}
      />
    </>
  );
}

/* ── Chart 6. Kazakhstan — a smooth seasonal hill, no spike ──
 * Only screenshot-verified Kaspi 2026 data (Dec 2025 → May 2026). All bars neutral:
 * the point is the absence of an anomaly (no single outlier day like Russia's Jun 23). */
export function Grafik6() {
  return (
    <>
      <ColumnChart
        height={240}
        barRadius={2}
        data={[
          { label: "Dec", value: 1452, color: NEUTRAL },
          { label: "Jan", value: 1432, color: NEUTRAL },
          { label: "Feb", value: 1145, color: NEUTRAL },
          { label: "Mar", value: 1671, color: NEUTRAL },
          { label: "Apr", value: 1868, color: NEUTRAL },
          { label: "May", value: 1976, color: NEUTRAL },
        ]}
        yAxis={{ max: 2200 }}
        slots={{ tooltip: () => null }}
        formatValue={(v: number) => num(v)}
      />
      <Legend
        items={[
          { color: NEUTRAL, label: "Kazakhstan (Kaspi) — monthly orders: smooth seasonality, no outlier" },
        ]}
      />
    </>
  );
}

/* ── Regions chart. Where "jerrycan" was searched the hardest ──
 * Wordstat affinity index: 100 = the national average. Crimea ×4.5–5.5 — an
 * independent confirmation of the shortage's epicentre (that "Crimean bridge"). */
export function GrafikRegions() {
  return (
    <>
      <PhraseBars
        valueFmt={(v: number) => `×${(v / 100).toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`}
        items={[
          { label: "Simferopol", value: 545, accent: true },
          { label: "Sevastopol", value: 502, accent: true },
          { label: "Republic of Crimea", value: 456, accent: true },
          { label: "Rostov-on-Don", value: 177 },
          { label: "Krasnodar", value: 166 },
          { label: "Moscow", value: 146 },
        ]}
      />
      <Legend
        items={[
          { color: ACCENT, label: "Crimea — the epicentre: interest 4.5–5.5× above average" },
          { color: NEUTRAL, label: "the south and Moscow — above average, but milder" },
        ]}
      />
    </>
  );
}

/* ── Articles chart. The crisis paid the patient — two "Demidovsky" SKUs surged ──
 * Monthly sales of the top SKUs (MPStats, Mar→Jun). Whoever held stock caught the
 * spike; newcomers with empty shelves missed it. SKUs + tooltips linking to WB. */
export function GrafikArtikuly() {
  const cardTip = (sku: string, full: string, jun: number, growth: string) => (
    <>
      Article {sku}, Demidovsky brand. {full}. June: {num(jun)} sales, {growth} vs May.{" "}
      <a
        href={`https://www.wildberries.ru/catalog/${sku}/detail.aspx`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-brand)] hover:underline"
      >
        Product page on WB →
      </a>
    </>
  );
  return (
    <>
      <LineChart
        height={240}
        lineWidth={2.5}
        markers="always"
        directLabels
        xScale="point"
        x={["Mar", "Apr", "May", "Jun"]}
        data={[
          { name: "10 L", data: [656, 1067, 1763, 3835], emphasis: true },
          { name: "20 L", data: [406, 328, 645, 2033], color: NEUTRAL },
        ]}
        yAxis={{ title: "sales / month", max: 4200 }}
        formatValue={(v: number) => num(Math.round(v))}
      />
      <div className="flex flex-col gap-1.5 mt-3.5 font-mono text-[11px] leading-snug text-[var(--color-dim)]">
        <span className="inline-flex items-start gap-1.5">
          <span aria-hidden className="inline-block w-3 h-3 rounded-[2px] shrink-0 mt-0.5" style={{ background: ACCENT }} />
          <span>
            Demidovsky, 10 L aluminium —{" "}
            <Term tip={cardTip("292065586", "Fuel jerrycan, 10 L, aluminium", 3835, "+118%")}>art. 292065586</Term>, +118% in June
          </span>
        </span>
        <span className="inline-flex items-start gap-1.5">
          <span aria-hidden className="inline-block w-3 h-3 rounded-[2px] shrink-0 mt-0.5" style={{ background: NEUTRAL }} />
          <span>
            Demidovsky, 20 L aluminium —{" "}
            <Term tip={cardTip("292065587", "Fuel jerrycan, 20 L, aluminium", 2033, "+215%")}>art. 292065587</Term>, +215% in June
          </span>
        </span>
      </div>
    </>
  );
}

/* ── Arbitrage chart. The crisis pulled two markets' prices apart ──
 * The same 20 L plastic jerrycan: Russia (WB) climbs from normal times into the
 * crisis, Kazakhstan (Kaspi) stays flat — the gap widens from ×1.5 to ×3.
 * Rate 0.159 ₽/₸ (CBR, 27 Jun 2026). Not investment advice. */
export function GrafikArbitrage() {
  return (
    <>
      <LineChart
        height={240}
        lineWidth={2.5}
        markers="always"
        directLabels
        xScale="point"
        x={["Normal times", "Crisis (June)"]}
        data={[
          { name: "Russia", data: [1220, 2400], emphasis: true },
          { name: "Kazakhstan", data: [780, 780], color: NEUTRAL, dashed: true },
        ]}
        yAxis={{ title: "₽ per 20 L", max: 2700 }}
        formatValue={(v: number) => `${num(Math.round(v))} ₽`}
      />
      <Legend
        items={[
          { color: ACCENT, label: "Russia (Wildberries) — climbing: ~1,200 → ~2,400 ₽" },
          { color: NEUTRAL, label: "Kazakhstan (Kaspi, art. 109030553) — flat at ~780 ₽ (4,900 ₸)" },
        ]}
      />
    </>
  );
}
