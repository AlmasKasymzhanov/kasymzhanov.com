"use client";
import { IconlyChevronDown } from "@/components/iconly-icons";
import { ResearchFact } from "@/components/canon/research-editorial";

import { DataTable, type DataTableColumn } from "@/components/charts/data-table";

const CHART_1_ROWS = [
  ["Body armor", "246.0 million ₽", "16,115", "15,266 ₽"],
  ["Camouflage suits", "241.4 million ₽", "65,676", "3,676 ₽"],
  ["Night-vision devices", "96.3 million ₽", "3,680", "26,158 ₽"],
  ["Thermal imagers", "75.9 million ₽", "2,832", "26,814 ₽"],
  ["Camouflage netting", "66.3 million ₽", "28,505", "2,326 ₽"],
  ["First-aid kits", "51.9 million ₽", "33,673", "1,543 ₽"],
  ["Load-bearing vests", "51.8 million ₽", "8,095", "6,398 ₽"],
  ["Drone detectors", "10.7 million ₽", "225", "47,339 ₽"],
];

const CHART_1_COLUMNS: readonly DataTableColumn[] = [
  { header: "Category" },
  { header: "Estimated 30-day sales value" },
  { header: "Estimated sales" },
  { header: "Sales value per sale" },
];

export function Grafik1() {
  return (
    <figure className="research-note">
      <figcaption className="mb-5">
        <span className="block text-[15px] font-medium text-[var(--color-text)] leading-snug">The largest specialized categories</span>
        <span className="mt-2 block font-mono text-[12px] leading-relaxed text-[var(--color-dim)]">Estimated 30-day sales value, sales, and sales value per estimated sale for June 18–July 17, 2026.</span>
      </figcaption>
      <div className="space-y-4">
        {CHART_1_ROWS.map(([category, value, sales, perSale]) => {
          const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
          const max = 246;
          const width = `${(numeric / max) * 100}%`;
          return (
            <div key={category} data-chart-inspect tabIndex={0} data-chart-title={category} data-chart-rows={JSON.stringify([{label: "Estimated sales value", value}, {label: "Estimated sales", value: sales}, {label: "Value per sale", value: perSale}])} className="grid grid-cols-[1fr_auto] items-center gap-3 sm:grid-cols-[200px_1fr_auto] sm:gap-4">
              <span className="text-[13px] font-medium text-[var(--color-text)] leading-snug">{category}</span>
              <div className="order-3 col-span-2 sm:order-none sm:col-span-1">
                <div className="h-2 w-full rounded-[2px] bg-[var(--color-bg)]">
                  <div className="h-full rounded-[2px] bg-[var(--viz-wb)]" style={{ width }} />
                </div>
              </div>
              <div className="text-right font-mono text-[12px] tabular-nums text-[var(--color-dim)]">
                <span className="block text-[var(--color-text)]">{value}</span>
                <span className="block text-[12px]">{sales} · {perSale}</span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-6 font-mono text-[12px] leading-relaxed text-[var(--color-dim)]">
        Source: author’s calculation from MPStats. Sales value and sales are estimates from an external service.
      </p>
      <details className="mt-4 border-t border-[var(--color-border)] pt-3">
        <summary className="reading-disclosure"><span>Chart data</span><IconlyChevronDown size={17} /></summary>
        <DataTable columns={CHART_1_COLUMNS} rows={CHART_1_ROWS} className="mb-0" />
      </details>
    </figure>
  );
}

const LONG_VIEW_COLUMNS: readonly DataTableColumn[] = [
  { header: "Category" },
  { header: "Long-view ratio (last 3 vs first 3 windows)" },
  { header: "June vs July window" },
];

const LONG_VIEW_ROWS = [
  ["Camouflage netting", "3.5×", "-40.8%"],
  ["Body armor", "1.7×", "-14.8%"],
  ["Camouflage suits", "1.3×", "—"],
  ["Load-bearing vests", "0.42× (down to 42%)", "—"],
  ["Quadcopter accessories", "0.86×", "-11.5%"],
  ["Generators", "—", "+18.7%"],
  ["Scopes", "—", "+9.2%"],
  ["Drone detectors", "—", "-48.4%"],
  ["Hemostatic tourniquets", "—", "-46.3%"],
  ["Field rations", "—", "-43.7%"],
  ["Tactical belts", "—", "-43.6%"],
];

export function Grafik2() {
  return (
    <figure className="research-note">
      <figcaption className="mb-5">
        <span className="block text-[15px] font-medium text-[var(--color-text)] leading-snug">Long view and short view diverge</span>
        <span className="mt-2 block font-mono text-[12px] leading-relaxed text-[var(--color-dim)]">
          Long-term ratios compare the average of the first three historical windows with the average of the last three. The adjacent June–July window is shown separately because it overlaps with the previous window.
        </span>
      </figcaption>
      <DataTable columns={LONG_VIEW_COLUMNS} rows={LONG_VIEW_ROWS} />
      <p className="mt-4 font-mono text-[12px] leading-relaxed text-[var(--color-dim)]">
        Source: author’s calculation from sequential and adjacent MPStats downloads. The window ending July 17 is not included in long-term ratios because it overlaps with the previous window.
      </p>
    </figure>
  );
}

const SUPPLY_COLUMNS: readonly DataTableColumn[] = [
  { header: "Category" },
  { header: "Sales value change" },
  { header: "Listings change" },
  { header: "Sellers change" },
];

const SUPPLY_ROWS = [
  ["Body armor", "-14.8%", "+48.9%", "+22.9%"],
  ["Drone detectors", "-48.4%", "+14.6%", "+13.4%"],
  ["Quadcopter accessories", "-11.5%", "+12.4%", "—"],
];

export function Grafik3() {
  return (
    <figure className="research-note">
      <figcaption className="mb-5">
        <span className="block text-[15px] font-medium text-[var(--color-text)] leading-snug">More sellers, less money</span>
        <span className="mt-2 block font-mono text-[12px] leading-relaxed text-[var(--color-dim)]">
          Supply expanded while estimated sales value contracted in the adjacent windows ending June 17 and July 17, 2026.
        </span>
      </figcaption>
      <DataTable columns={SUPPLY_COLUMNS} rows={SUPPLY_ROWS} />
      <p className="mt-4 font-mono text-[12px] leading-relaxed text-[var(--color-dim)]">
        Source: author’s calculation from MPStats downloads for windows ending June 17 and July 17, 2026. In quadcopter accessories there were 98,464 listings, but only 5,093 recorded sales over 30 days—5.2%.
      </p>
    </figure>
  );
}

export function SupplyCallout() {
  return (
    <aside className="research-note" aria-labelledby="supply-callout-title-en">
      <h3 id="supply-callout-title-en" className="text-[17px] font-medium leading-snug text-[var(--color-text)]">Supply expanded while sales value shrank</h3>
      <p className="mt-2 font-mono text-[12px] text-[var(--color-dim)]">Selected categories · June vs July 2026 windows</p>
      <div className="research-facts">
        {[
          { label: "Body armor listings", value: "+48.9%" },
          { label: "Body armor sellers", value: "+22.9%" },
          { label: "Body armor sales value", value: "-14.8%", accent: true },
          { label: "Drone-detector listings", value: "+14.6%" },
          { label: "Drone-detector sellers", value: "+13.4%" },
          { label: "Drone-detector sales value", value: "-48.4%", accent: true },
        ].map((metric) => (
          <ResearchFact key={metric.label} label={metric.label} value={metric.value} />
        ))}
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-[var(--color-dim)]">
        A bigger storefront does not mean bigger demand. More listings and sellers do not imply that each seller earned more.
      </p>
    </aside>
  );
}
