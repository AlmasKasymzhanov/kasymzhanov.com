"use client";

import type { CSSProperties, ReactNode } from "react";
import { barFraction, heatEncoding, sparklinePoints, type HeatScale } from "@/lib/chart-encoding";

/** Inside ChartTooltipScope: hover, focus and touch share the article tooltip. */
export function HeatCell({ value, scale, label, children, style }: {
  value: number | null | undefined; scale: HeatScale; label: string; children?: ReactNode; style?: CSSProperties;
}) {
  const encoding = heatEncoding(value, scale);
  const formatted = value == null || !Number.isFinite(value) ? "Нет данных" : value.toLocaleString("ru-RU", { maximumFractionDigits: 20 });
  return <td className="viz-heat-cell" style={{ ...style, backgroundColor: encoding?.backgroundColor }}>
    <span tabIndex={0} data-chart-inspect data-chart-title={label}
      data-chart-rows={JSON.stringify([{ label: "Значение", value: formatted }])}>
      {children ?? (encoding ? formatted : "—")}
    </span>
  </td>;
}

export function HeatLegend({ scale, label, format = (n: number) => n.toLocaleString("ru-RU") }: {
  scale: HeatScale; label: string; format?: (n: number) => string;
}) {
  const min = scale.min ?? 0;
  const mid = min + (scale.max - min) * (scale.curve === "sqrt" ? 0.25 : 0.5);
  const ticks = scale.center == null ? [min, mid, scale.max] : [min, scale.center, scale.max];
  return <div className="viz-heat-legend"><span>{label}</span><span className="viz-heat-key">
    {ticks.map(n => <span key={n}><i aria-hidden style={{ backgroundColor: heatEncoding(n, scale)?.backgroundColor }} />{format(n)}</span>)}
  </span></div>;
}

/** A part-to-whole data bar, not task progress. The number is always visible. */
export function InlineDataBar({ value, max = 100, label, children }: {
  value: number | null | undefined; max?: number; label: string; children?: ReactNode;
}) {
  const fraction = barFraction(value, max);
  return <span className="viz-inline-bar" tabIndex={0} data-chart-inspect data-chart-title={label}
    data-chart-rows={JSON.stringify([{ label, value: fraction == null ? "Нет данных" : `${value?.toLocaleString("ru-RU")} / ${max.toLocaleString("ru-RU")}` }])}>
    <span className="viz-inline-bar-number">{children ?? (fraction == null ? "—" : `${value?.toLocaleString("ru-RU", { maximumFractionDigits: 1 })}%`)}</span>
    <span className="viz-inline-bar-track" aria-hidden><span style={{ width: `${(fraction ?? 0) * 100}%` }} /></span>
  </span>;
}

export function TableSparkline({ values, labels, label, unit = "", color = "var(--chart-accent)" }: {
  values: readonly (number | null | undefined)[]; labels: readonly string[]; label: string; unit?: string; color?: string;
}) {
  const points = sparklinePoints(values);
  let path = "", pen = false;
  points.forEach(p => { if (!p) { pen = false; return; } path += `${pen ? "L" : "M"}${p.x},${p.y} `; pen = true; });
  return <span className="viz-sparkline" tabIndex={0} data-chart-inspect data-chart-title={label}
    data-chart-rows={JSON.stringify(values.map((v, i) => ({ label: labels[i] ?? String(i + 1), value: v == null || !Number.isFinite(v) ? "Нет данных" : `${v.toLocaleString("ru-RU", { maximumFractionDigits: 20 })}${unit ? ` ${unit}` : ""}` })))}>
    <svg viewBox="0 0 116 32" width="116" height="32" role="img" aria-label={`${label}. ${labels[0]}–${labels.at(-1)}. Точные значения при фокусе или нажатии.`}>
      <path d="M3 29H113" stroke="var(--personal-border)" />
      <path d={path} fill="none" stroke={color} strokeWidth="1.75" />
      {points.at(-1) && <circle cx={points.at(-1)!.x} cy={points.at(-1)!.y} r="2.5" fill={color} />}
    </svg>
  </span>;
}
