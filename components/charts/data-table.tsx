"use client";

/**
 * DataTable — editorial data table, Brock UI canon (the roadmap's third Core
 * component, scaffolded here for the Lick Beauty article). FT/Bloomberg table
 * grammar, not a spreadsheet:
 *
 *  - NO zebra striping; hairline row separators only (Tufte data-ink).
 *  - Header row in Hack mono, uppercase, dim — labels, not chrome.
 *  - First column is the entity (sans, foreground); numeric columns are Hack
 *    mono, right-aligned, tabular-nums so digits line up vertically.
 *  - Signed deltas use teal / violet around zero; magnitude heatmaps are
 *    opt-in with explicit domains. Color supplements the visible number.
 *  - Optional `highlightRow` tinted with the chart accent (the row that
 *    carries the story), optional methodology `caption`, and a `source` line
 *    in the FT footer position.
 *  - Horizontal scroll on narrow widths (the table never breaks the column);
 *    fully theme-token driven for dark/light.
 *
 * Zero-dependency, self-contained palette so the component is insulated from
 * any single article's accent token.
 */

import type { ReactNode } from "react";
import { heatEncoding, finiteValue, type HeatScale } from "@/lib/chart-encoding";
import { HeatLegend, InlineDataBar } from "./table-visuals";
import { usePathname } from "next/navigation";
import { localeFromPathname, dict } from "@/lib/i18n";

const DELTA_UP = "var(--chart-above)";
const DELTA_DOWN = "var(--chart-below)";

export type DataTableAlign = "left" | "right";

export type DataTableColumn = {
  /** Column header text (rendered in Hack mono, uppercase, dim). */
  header: string;
  /** Cell alignment. Defaults: first column left, the rest right. */
  align?: DataTableAlign;
  /** Render cells in Hack mono. Defaults to true for non-first columns. */
  mono?: boolean;
  /**
   * Column kind. `"delta"` expects a numeric cell and renders a signed,
   * colour-coded percentage (above / below zero). `"text"` (default) renders
   * the cell as-is.
   */
  type?: "text" | "delta";
  /** Render text cells in the foreground colour instead of dim (emphasis). */
  emphasis?: boolean;
  /** Formatter for `delta` cells. Default: one decimal + "%". */
  format?: (value: number) => string;
  /** Quantitative scale. Pass numeric cells; do not parse formatted text. */
  heatmap?: HeatScale;
  /** Part-to-whole bar with a known denominator. */
  barMax?: number;
};

export type DataTableProps = {
  columns: readonly DataTableColumn[];
  /** Row-major cells. A `delta` column expects a number; others accept any node. */
  rows: readonly (readonly (ReactNode | number | string)[])[];
  /** 0-based index of the row to tint with `accent` (the story row). */
  highlightRow?: number;
  /** Accent used for the highlight tint. Default: a neutral graphite. */
  accent?: string;
  /** Override the `delta` column up/down colours (default green/red) so a
   *  story can match its own palette. Opt-in; report tables stay on defaults. */
  deltaUpColor?: string;
  deltaDownColor?: string;
  /** Small methodology note rendered above the source line (italic, dim). */
  caption?: string;
  /** Source attribution (FT footer). Prefixed with "Источник:". */
  source?: ReactNode;
  className?: string;
  "data-testid"?: string;
};

const defaultDelta = (v: number) =>
  `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v).toLocaleString("ru-RU", {
    maximumFractionDigits: 1,
  })}%`;

function DeltaCell({
  value,
  format,
  up = DELTA_UP,
  down = DELTA_DOWN,
}: {
  value: number;
  format?: (v: number) => string;
  up?: string;
  down?: string;
}) {
  const fmt = format ?? defaultDelta;
  const color = value > 0 ? up : value < 0 ? down : "var(--color-dim)";
  return (
    <span className="font-mono font-medium tabular-nums" style={{ color }}>
      {fmt(value)}
    </span>
  );
}

export function DataTable({
  columns,
  rows,
  highlightRow,
  accent = "var(--brock-neutral)",
  deltaUpColor,
  deltaDownColor,
  caption,
  source,
  className,
  "data-testid": dataTestId,
}: DataTableProps) {
  const t = dict[localeFromPathname(usePathname() ?? "/")].table;
  const align = (c: DataTableColumn, i: number): DataTableAlign =>
    c.align ?? (i === 0 ? "left" : "right");
  const isMono = (c: DataTableColumn, i: number): boolean =>
    c.mono ?? i !== 0;

  return (
    <div
      className={`my-6 overflow-hidden rounded-[3px] border border-[var(--color-border)] ${className ?? ""}`}
      data-testid={dataTestId}
      data-chart-type="data-table"
    >
      {columns.filter(c => c.heatmap).map(c => <div className="px-4" key={c.header}><HeatLegend label={c.header} scale={c.heatmap!} format={c.format ?? (c.type === "delta" ? defaultDelta : undefined)} /></div>)}
      <div
        className="overflow-x-auto"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "thin" }}
      >
        <table
          className="w-full text-[13px]"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr className="bg-[var(--color-surface)]">
              {columns.map((c, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`whitespace-nowrap border-b border-[var(--color-border)] px-4 py-2.5 font-mono text-[12px] font-medium tracking-wider text-[var(--color-dim)] uppercase ${
                    align(c, i) === "left" ? "text-left" : "text-right"
                  }`}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => {
              const isLast = ri === rows.length - 1;
              const tint =
                highlightRow === ri
                  ? { backgroundColor: `color-mix(in srgb, ${accent} 10%, transparent)` }
                  : undefined;
              return (
                <tr
                  key={ri}
                  style={tint}
                  className={
                    isLast ? "" : "border-b border-[var(--color-border)]/40"
                  }
                >
                  {row.map((cell, ci) => {
                    const col = columns[ci];
                    const a = align(col, ci);
                    const mono = isMono(col, ci);
                    const heat = col.heatmap && finiteValue(cell) ? heatEncoding(cell, col.heatmap) : null;
                    return (
                      <td
                        key={ci}
                        style={heat ? { backgroundColor: heat.backgroundColor, color: "var(--personal-text)" } : undefined}
                        className={`whitespace-nowrap px-4 py-2.5 ${
                          a === "left" ? "text-left" : "text-right"
                        } ${
                          ci === 0
                            ? "font-medium text-[var(--color-text)]"
                            : col.emphasis
                              ? "text-[var(--color-text)]"
                              : "text-[var(--color-dim)]"
                        } ${mono ? "font-mono tabular-nums" : ""}`}
                      >
                        {col.barMax && finiteValue(cell) ? (
                          <InlineDataBar value={cell} max={col.barMax} label={col.header}>{col.format ? col.format(cell) : cell}</InlineDataBar>
                        ) : col.heatmap && finiteValue(cell) ? (
                          <span tabIndex={0} data-chart-inspect data-chart-title={`${typeof row[0] === "string" ? row[0] : ""} · ${col.header}`}
                            data-chart-rows={JSON.stringify([{ label: col.header, value: `${cell.toLocaleString("ru-RU", { maximumFractionDigits: 20 })}${col.type === "delta" ? "%" : ""}` }])}>
                            {col.type === "delta" ? <DeltaCell value={cell} format={col.format} up="var(--personal-text)" down="var(--personal-text)" /> : col.format ? col.format(cell) : cell}
                          </span>
                        ) : col.type === "delta" && finiteValue(cell) ? (
                          <DeltaCell
                            value={cell}
                            format={col.format}
                            up={deltaUpColor}
                            down={deltaDownColor}
                          />
                        ) : (
                          col.format && finiteValue(cell) ? col.format(cell) : cell
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {(caption || source) && (
        <div className="border-t border-[var(--color-border)]/60">
          {caption && (
            <p className="chart-caption border-l-2 border-[var(--color-border)] px-4 pt-2 font-sans text-[12px] text-[var(--color-dim)] italic">
              {caption}
            </p>
          )}
          {source && (
            <p className="px-4 py-2 text-left font-mono text-[12px] text-[var(--color-dim)]">
              {t.source} {source}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
