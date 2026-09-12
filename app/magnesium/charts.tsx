"use client";

import { useState } from "react";
import { LineChart, type LineChartTooltipSlotProps } from "@/components/charts/line-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { ChartTooltipContent } from "@/components/charts/chart-tooltip";
import { ResearchFigure } from "@/components/canon/research-editorial";
import { categoryNames, colors, compactMoney, data, july, money, monthLabel, number, ordersLabel, percent } from "./data";
import styles from "./research.module.css";

function PeriodTooltip({ xLabel, points }: LineChartTooltipSlotProps) {
  const missing = ["Май", "Июн"].includes(xLabel);
  return <ChartTooltipContent title={`${xLabel} 2026${xLabel === "Июл" ? " · отдельный срез" : ""}`}
    rows={points.map(point => ({ label: point.series, value: point.value === null ? "Нет сопоставимых данных" : point.formatted, color: point.color }))}
    note={missing ? "Месяц исключён из расчётов. Это не нулевые продажи." : xLabel === "Июл" ? "Изменение к апрелю не рассчитывается." : undefined} />;
}

function MetricSwitch({ metric, onChange }: { metric: "revenue" | "orders"; onChange: (value: "revenue" | "orders") => void }) {
  return <div className={styles.controls} role="group" aria-label="Показатель графика">
    {([['revenue', 'Выручка'], ['orders', 'Заказы']] as const).map(([value, label]) => <button type="button" key={value} aria-pressed={metric === value} onClick={() => onChange(value)}>{label}</button>)}
  </div>;
}

export function TargetDynamics() {
  const [metric, setMetric] = useState<"revenue" | "orders">("revenue");
  const [selection, setSelection] = useState("Все линейки");
  const selected = data.targets.filter(target => selection === "Все линейки" || target.name === selection);
  return <ResearchFigure title="Четыре месяца динамики. Июль — отдельная точка."
    caption="Источник: Redstat. Январь–апрель и июль 2026. Май и июнь: нет сопоставимых данных. Чтобы рассмотреть небольшие линейки, выберите одну из них; шкала пересчитается для выбранного ряда.">
    <div className={styles.chartControls}>
      <MetricSwitch metric={metric} onChange={setMetric} />
      <label className={styles.selectLabel}>Линейка<select value={selection} onChange={e => setSelection(e.target.value)}>{["Все линейки", ...data.targets.map(t => t.name)].map(name => <option key={name}>{name}</option>)}</select></label>
    </div>
    <LineChart data={selected.map(target => ({ name: target.name, color: colors[target.name], data: target.months.map(row => ({ x: monthLabel(row.month), y: row[metric] })) }))}
      height={280} legend="top" markers="always" pointTargetSize={24} yBaselineZero curve="linear" emphasisSeries={selected[0].name}
      bands={[{ from: "Май", to: "Июн", label: "Нет данных" }]} xAxis={{ ticks: 7 }} yAxis={{ ticks: 3 }}
      formatValue={metric === "revenue" ? money : ordersLabel} yAxisFormat={metric === "revenue" ? compactMoney : number}
      animation={{ enabled: false }} slots={{ tooltip: PeriodTooltip }}
      description={`${metric === "revenue" ? "Выручка в тенге" : "Количество заказов"} пяти линеек. В мае и июне данных нет. Июль отделён от апреля. Значения доступны в таблице ниже.`} />
  </ResearchFigure>;
}

export function MarketDynamics() {
  const [metric, setMetric] = useState<"revenue" | "orders">("revenue");
  return <ResearchFigure title="587 активных SKU в актуальном срезе" caption="Источник: Redstat. Весь магниевый контур, 2026 год. Разрыв между апрелем и июлем отражает отсутствие сопоставимого покрытия; он не позволяет сделать вывод о падении рынка.">
    <MetricSwitch metric={metric} onChange={setMetric} />
    <LineChart data={[{ name: "Магниевый контур", color: "var(--chart-accent)", data: data.market.map(row => ({ x: monthLabel(row.month), y: row[metric] })) }]}
      height={250} yBaselineZero markers="always" pointTargetSize={24} xAxis={{ ticks: 7 }} yAxis={{ ticks: 3 }} legend="none"
      bands={[{ from: "Май", to: "Июн", label: "Нет данных" }]}
      formatValue={metric === "revenue" ? money : ordersLabel} yAxisFormat={metric === "revenue" ? compactMoney : number}
      animation={{ enabled: false }} slots={{ tooltip: PeriodTooltip }} />
  </ResearchFigure>;
}

export function CompetitorRanking() {
  const leaders = data.competitors.slice(0, 10);
  return <ResearchFigure title="Десять брендов получают около 53% выручки" caption="Источник: Redstat. Выручка брендов магниевого контура, июль 2026. Бренд производителя и продуктовая линейка — разные уровни: например, Sanofi и Magne B6 нельзя складывать как независимых конкурентов.">
    <BarChart data={leaders.map((row, i) => ({ label: row.name, value: row.revenue, color: i === 0 ? "var(--chart-accent)" : "var(--brock-neutral)" }))}
      labelWidth={168} barThickness={32} gap={10} formatValue={money} dataLabels={{ show: true, format: compactMoney }}
      xAxis={{ hideTicks: true }} animation={{ enabled: false }} description="Solgar — крупнейший бренд: 27,03 млн тенге и 13,9% выручки рынка. Далее NOW и GLS Pharmaceuticals. Полные данные приведены в таблице." />
  </ResearchFigure>;
}

export function PriceSegments() {
  const [metric, setMetric] = useState<"revenue" | "orders">("revenue");
  const rows = [...data.segments].sort((a, b) => b[metric] - a[metric]);
  return <ResearchFigure title="59,3% денег — в дорогом и премиальном сегментах" caption="Источник: Redstat. Ценовые сегменты магниевого контура, июль 2026. Доли выручки и заказов имеют разные знаменатели. Названия сегментов взяты из исследования; это не единые ценовые пороги для всех категорий.">
    <MetricSwitch metric={metric} onChange={setMetric} />
    <BarChart data={rows.map(row => ({ label: row.name, value: row[metric], color: "var(--chart-accent)" }))}
      labelWidth={132} barThickness={32} gap={12} xAxis={{ hideTicks: true }}
      formatValue={value => `${metric === "revenue" ? money(value) : ordersLabel(value)} · ${percent(value / (metric === "revenue" ? july.revenue! : july.orders!) * 100)}`}
      dataLabels={{ show: true, format: metric === "revenue" ? compactMoney : number }} animation={{ enabled: false }} />
  </ResearchFigure>;
}

export function CategorySeasonality() {
  const [category, setCategory] = useState(categoryNames[0]);
  const rows = data.categories.filter(row => row.name === category && row.month.startsWith("2025"));
  return <ResearchFigure title="У витаминов максимум 2025 года пришёлся на ноябрь" caption="Источник: Redstat. Полный 2025 год, выручка категорий. При переключении категории вертикальная шкала меняется. Это история категорий, а не подтверждённая сезонность пяти целевых препаратов.">
    <div className={styles.controls} role="group" aria-label="Категория для сезонности">
      {categoryNames.map(name => <button type="button" key={name} aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>)}
    </div>
    <LineChart data={[{ name: category, color: category === categoryNames[0] ? "var(--chart-accent)" : "var(--chart-secondary)", data: rows.map(row => ({ x: monthLabel(row.month), y: row.revenue })) }]}
      height={260} yBaselineZero markers="always" pointTargetSize={24} legend="none" xAxis={{ ticks: 6 }} yAxis={{ ticks: 3 }}
      formatValue={money} yAxisFormat={compactMoney} animation={{ enabled: false }} />
  </ResearchFigure>;
}
