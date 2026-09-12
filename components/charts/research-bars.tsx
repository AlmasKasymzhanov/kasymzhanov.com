"use client";

import { BarChart } from "./bar-chart";

/** Legacy reports keep their data and units while sharing the chart interaction. */
export function ResearchBars({ data, maxVal, color, unit }: {
  data: { label: string; value: number }[]; maxVal: number; color: string; unit?: string;
}) {
  const format = (value: number) => `${value.toLocaleString("ru-RU", { maximumFractionDigits: 20 })}${unit ? ` ${unit}` : ""}`;
  return <BarChart data={data.map(point => ({ ...point, color: "var(--chart-accent)" }))} labelWidth={136}
    barThickness={32} gap={8} xAxis={{ max: maxVal, hideTicks: true }}
    formatValue={format} dataLabels={{ show: true, format: value => value.toLocaleString("ru-RU", { notation: "compact", maximumFractionDigits: 1 }) }}
    animation={{ enabled: false }} />;
}
