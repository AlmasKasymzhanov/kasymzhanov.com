"use client";
import { MaterialViews } from "@/components/engagement/material-views";
import { IconlyArrowRight, IconlyArrowLeft, IconlyChevronDown } from "@/components/iconly-icons";

import { useState, useMemo, useCallback, useRef } from "react";
import Link from "next/link";

/* ───────────────────────── types ───────────────────────── */

interface NicheRow {
  name: string;
  subgroup: string;
  product: string;
  seasonNum: number;
  seasonLabel: string;
  comFBO: number;
  comFBS: number;
  items: number;
  newItems: number;
  newItemsPct: number;
  itemsInStock: number;
  itemsMoving: number;
  pctMoving: number;
  itemsWithSales: number;
  pctWithSales: number;
  pctSalesMoving: number;
  brands: number;
  brandsWithSales: number;
  sellers: number;
  sellersWithSales: number;
  sellPct: number;
  sales: number;
  revenue: number;
  lostRev: number;
  lostRevPct: number;
  potential: number;
  avgBuyoutPctRet: number;
  buyoutPct: number;
  totalStock: number;
  frozenStock: number;
  frozenStockPct: number;
  turnoverDays: number;
  avgPrice: number;
  medianPrice: number;
  avgPriceSales: number;
  medianPriceSales: number;
  avgRating: number;
  avgRatingSales: number;
  avgFracRating: number;
  avgFracRatingSales: number;
  clicks: number;
  cartPct: number;
  orderPct: number;
  revPerItem: number;
  avgCheck: number;
  score: number;
  rank: number;
}

type SortKey = keyof NicheRow;

/* ───────────────────── CSV parsing ─────────────────────── */

function parseNum(v: string): number {
  if (!v || v === "nan" || v === "NaN" || v === "") return 0;
  return parseFloat(v.replace(",", ".")) || 0;
}

const SEASON_MAP: Record<number, string> = {
  1: "Низкая",
  2: "Умеренная",
  3: "Высокая",
};

/* ───────────────────── scoring ──────────────────────────── */

type LookupTable = [number, number][];

function lookup(value: number, table: LookupTable): number {
  let result = 0;
  for (const [threshold, coefficient] of table) {
    if (value >= threshold) result = coefficient;
    else break;
  }
  return result;
}

const T_REVENUE: LookupTable = [
  [0, 0.05], [500000, 0.1], [1000000, 0.15], [5000000, 0.2],
  [10000000, 0.25], [30000000, 0.3], [50000000, 0.35], [75000000, 0.4],
  [100000000, 0.45], [150000000, 0.5], [200000000, 0.55], [300000000, 0.6],
  [400000000, 0.65], [500000000, 0.7], [600000000, 0.75], [700000000, 0.8],
  [800000000, 0.85], [900000000, 0.9], [1000000000, 0.95], [5000000000, 1.0],
];

const T_REV_PER_ITEM: LookupTable = [
  [0, 0], [15000, 0.1], [30000, 0.2], [45000, 0.3], [60000, 0.4],
  [80000, 0.5], [100000, 0.6], [150000, 0.7], [200000, 0.8],
  [250000, 0.9], [300000, 1.0],
];

const T_LOST_REV: LookupTable = [
  [0, 0.05], [0.05, 0.1], [0.1, 0.15], [0.15, 0.2], [0.2, 0.25],
  [0.25, 0.3], [0.3, 0.35], [0.35, 0.4], [0.4, 0.45], [0.45, 0.5],
  [0.5, 0.55], [0.55, 0.6], [0.6, 0.65], [0.65, 0.7], [0.7, 0.75],
  [0.75, 0.8], [0.8, 0.85], [0.85, 0.9], [0.9, 0.95], [0.95, 1.0],
];

const T_TURNOVER: LookupTable = [
  [0, 1.0], [30, 0.8], [60, 0.6], [90, 0.3], [120, 0.1], [240, 0],
];

const T_ITEMS_WITH_SALES: LookupTable = [
  [0, 0.05], [0.05, 0.1], [0.1, 0.15], [0.15, 0.2], [0.2, 0.25],
  [0.25, 0.3], [0.3, 0.35], [0.35, 0.4], [0.4, 0.45], [0.45, 0.5],
  [0.5, 0.55], [0.55, 0.6], [0.6, 0.65], [0.65, 0.7], [0.7, 0.75],
  [0.75, 0.8], [0.8, 0.85], [0.85, 0.9], [0.9, 0.95], [0.95, 1.0],
];

const T_SELLERS_WITH_SALES: LookupTable = [
  [0, 0.05], [0.05, 0.1], [0.1, 0.15], [0.15, 0.2], [0.2, 0.25],
  [0.25, 0.3], [0.3, 0.35], [0.35, 0.4], [0.4, 0.45], [0.45, 0.5],
  [0.5, 0.55], [0.55, 0.6], [0.6, 0.65], [0.65, 0.7], [0.7, 0.75],
  [0.75, 0.8], [0.8, 0.85], [0.85, 0.9], [0.9, 0.95], [0.95, 1.0],
];

const T_RATING: LookupTable = [
  [0, 1.0], [3, 0.9], [3.3, 0.8], [3.6, 0.7], [3.8, 0.6],
  [4, 0.5], [4.2, 0.4], [4.4, 0.3], [4.6, 0.2], [4.8, 0.1], [5, 0],
];

const WEIGHTS = {
  revenue: 10,
  revPerItem: 20,
  lostRev: 20,
  turnover: 20,
  itemsWithSales: 20,
  sellersWithSales: 5,
  rating: 5,
};

function computeScore(r: Omit<NicheRow, "score" | "rank">): number {
  return (
    WEIGHTS.revenue * lookup(r.revenue, T_REVENUE) +
    WEIGHTS.revPerItem * lookup(r.revPerItem, T_REV_PER_ITEM) +
    WEIGHTS.lostRev * lookup(r.lostRevPct, T_LOST_REV) +
    WEIGHTS.turnover * lookup(r.turnoverDays, T_TURNOVER) +
    WEIGHTS.itemsWithSales * lookup(r.pctSalesMoving, T_ITEMS_WITH_SALES) +
    WEIGHTS.sellersWithSales * lookup(r.sellPct, T_SELLERS_WITH_SALES) +
    WEIGHTS.rating * lookup(r.avgFracRatingSales, T_RATING)
  );
}

function parseCSV(text: string): NicheRow[] {
  const clean = text.replace(/^\uFEFF/, "");
  const lines = clean.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  const rows: Omit<NicheRow, "score" | "rank">[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(";").map((c) => c.replace(/^"|"$/g, ""));
    if (cols.length < 49) continue;

    const name = cols[0];
    const parts = name.split("/");
    const subgroup = (parts[0] || "").trim();
    const product = (parts[1] || name).trim();

    const seasonNum = parseNum(cols[1]);
    const items = parseNum(cols[5]);
    const newItems = parseNum(cols[6]);
    const itemsMoving = parseNum(cols[9]);
    const itemsWithSales = parseNum(cols[11]);
    const revenue = parseNum(cols[21]);
    const lostRev = parseNum(cols[22]);
    const sales = parseNum(cols[20]);
    const avgBuyoutPctRet = parseNum(cols[26]);
    const turnoverDays = parseNum(cols[33]);
    const sellersWithSales = parseNum(cols[18]);
    const sellers = parseNum(cols[17]);
    const avgFracRatingSales = parseNum(cols[45]);

    const pctSalesMoving = itemsMoving > 0 ? itemsWithSales / itemsMoving : 0;
    const buyoutPct = avgBuyoutPctRet > 0 ? avgBuyoutPctRet / 100 : 0;
    const lostRevPct = revenue + lostRev > 0 ? lostRev / (revenue + lostRev) : 0;
    const revPerItem = itemsWithSales > 0 ? revenue / itemsWithSales : 0;
    const sellPct = parseNum(cols[19]) / 100;
    const avgCheck = sales > 0 ? revenue / sales : 0;
    const newItemsPct = items > 0 ? newItems / items : 0;

    rows.push({
      name,
      subgroup,
      product,
      seasonNum,
      seasonLabel: SEASON_MAP[seasonNum] || `${seasonNum}`,
      comFBO: parseNum(cols[3]),
      comFBS: parseNum(cols[4]),
      items,
      newItems,
      newItemsPct,
      itemsInStock: parseNum(cols[7]),
      itemsMoving,
      pctMoving: parseNum(cols[10]),
      itemsWithSales,
      pctWithSales: parseNum(cols[12]),
      pctSalesMoving,
      brands: parseNum(cols[14]),
      brandsWithSales: parseNum(cols[15]),
      sellers,
      sellersWithSales,
      sellPct,
      sales,
      revenue,
      lostRev,
      lostRevPct,
      potential: parseNum(cols[24]),
      avgBuyoutPctRet,
      buyoutPct,
      totalStock: parseNum(cols[29]),
      frozenStock: parseNum(cols[30]),
      frozenStockPct: parseNum(cols[32]),
      turnoverDays,
      avgPrice: parseNum(cols[36]),
      medianPrice: parseNum(cols[37]),
      avgPriceSales: parseNum(cols[40]),
      medianPriceSales: parseNum(cols[41]),
      avgRating: parseNum(cols[42]),
      avgRatingSales: parseNum(cols[43]),
      avgFracRating: parseNum(cols[44]),
      avgFracRatingSales,
      clicks: parseNum(cols[46]),
      cartPct: parseNum(cols[47]),
      orderPct: parseNum(cols[48]),
      revPerItem,
      avgCheck,
    });
  }

  // Score and rank
  const scored = rows.map((r) => ({ ...r, score: computeScore(r), rank: 0 }));
  scored.sort((a, b) => b.score - a.score);
  scored.forEach((r, i) => (r.rank = i + 1));

  return scored;
}

/* ──────────────────── filter definitions ──────────────────── */

interface FilterDef {
  key: string;
  label: string;
  thresholds: number[];
  labels: string[];
  getValue: (r: NicheRow) => number;
  isString?: false;
}

interface StringFilterDef {
  key: string;
  label: string;
  options: string[];
  getValue: (r: NicheRow) => string;
  isString: true;
}

type AnyFilterDef = FilterDef | StringFilterDef;

const FILTERS: AnyFilterDef[] = [
  {
    key: "season",
    label: "Сезонность",
    options: ["Низкая", "Умеренная", "Высокая"],
    getValue: (r) => r.seasonLabel,
    isString: true,
  },
  {
    key: "itemsMoving",
    label: "Активные товары",
    thresholds: [0, 1000, 3000, 5000, 10000, 25000, 50000, 100000, 250000, 500000],
    labels: ["до 1 000", "1–3 тыс", "3–5 тыс", "5–10 тыс", "10–25 тыс", "25–50 тыс", "50–100 тыс", "100–250 тыс", "250–500 тыс", "500 тыс+"],
    getValue: (r) => r.itemsMoving,
  },
  {
    key: "buyoutPct",
    label: "% выкупа",
    thresholds: [0, 0.3, 0.5, 0.6, 0.7, 0.8, 0.9],
    labels: ["< 30%", "30–50%", "50–60%", "60–70%", "70–80%", "80–90%", "90%+"],
    getValue: (r) => r.buyoutPct,
  },
  {
    key: "avgCheck",
    label: "Средний чек",
    thresholds: [0, 300, 600, 1000, 1500, 2500, 5000, 7500, 10000, 15000, 30000, 50000],
    labels: ["< 300₽", "300–600", "600–1к", "1–1.5к", "1.5–2.5к", "2.5–5к", "5–7.5к", "7.5–10к", "10–15к", "15–30к", "30–50к", "50к+"],
    getValue: (r) => r.avgCheck,
  },
  {
    key: "turnoverDays",
    label: "Оборачиваемость",
    thresholds: [0, 30, 45, 60, 90, 120, 240],
    labels: ["< 30 дн", "30–45", "45–60", "60–90", "90–120", "120–240", "240+"],
    getValue: (r) => r.turnoverDays,
  },
  {
    key: "revenue",
    label: "Выручка",
    thresholds: [0, 1000000, 5000000, 10000000, 20000000, 50000000, 100000000, 200000000, 500000000, 1000000000],
    labels: ["< 1 млн", "1–5 млн", "5–10 млн", "10–20 млн", "20–50 млн", "50–100 млн", "100–200М", "200–500М", "500М–1Б", "1 млрд+"],
    getValue: (r) => r.revenue,
  },
  {
    key: "lostRevPct",
    label: "% упущенной",
    thresholds: [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5],
    labels: ["< 5%", "5–10%", "10–15%", "15–20%", "20–30%", "30–40%", "40–50%", "50%+"],
    getValue: (r) => r.lostRevPct,
  },
  {
    key: "pctSalesMoving",
    label: "% с продажами",
    thresholds: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
    labels: ["< 10%", "10–20%", "20–30%", "30–40%", "40–50%", "50–60%", "60–70%", "70–80%", "80–90%", "90%+"],
    getValue: (r) => r.pctSalesMoving,
  },
];

function getBucket(value: number, thresholds: number[]): number {
  let bucket = 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (value >= thresholds[i]) bucket = i;
    else break;
  }
  return bucket;
}

type ActiveFilters = Record<string, Set<number | string>>;

/* ──────────────────── formatting ──────────────────────────── */

function fmtMoney(v: number): string {
  if (v >= 1e9) return (v / 1e9).toFixed(1) + "Б";
  if (v >= 1e6) return (v / 1e6).toFixed(1) + "М";
  return v.toLocaleString("ru-RU", { maximumFractionDigits: 0 });
}

function fmtNum(v: number): string {
  return v.toLocaleString("ru-RU", { maximumFractionDigits: 0 });
}

function fmtPct(v: number): string {
  return (v * 100).toFixed(1) + "%";
}

function fmtDec(v: number, d: number): string {
  return v.toFixed(d);
}

/* ───────────────────── CSV export ────────────────────────── */

const EXPORT_COLS: { label: string; key: SortKey; fmt?: (r: NicheRow) => string }[] = [
  { label: "#", key: "rank" },
  { label: "Предмет", key: "product" },
  { label: "Подгруппа", key: "subgroup" },
  { label: "Сезон", key: "seasonLabel" },
  { label: "Товары", key: "items" },
  { label: "Новинки", key: "newItems" },
  { label: "Активные", key: "itemsMoving" },
  { label: "С продажами", key: "itemsWithSales" },
  { label: "% с прод. (движ)", key: "pctSalesMoving", fmt: (r) => (r.pctSalesMoving * 100).toFixed(1) },
  { label: "% выкупа", key: "buyoutPct", fmt: (r) => (r.buyoutPct * 100).toFixed(1) },
  { label: "Оборач.", key: "turnoverDays" },
  { label: "Выручка", key: "revenue" },
  { label: "Выр/тов", key: "revPerItem", fmt: (r) => r.revPerItem.toFixed(0) },
  { label: "% упущ.", key: "lostRevPct", fmt: (r) => (r.lostRevPct * 100).toFixed(1) },
  { label: "Потенциал", key: "potential" },
  { label: "Ср.чек", key: "avgCheck", fmt: (r) => r.avgCheck.toFixed(0) },
  { label: "Ср.цена с прод.", key: "avgPriceSales" },
  { label: "Медиана с прод.", key: "medianPriceSales" },
  { label: "Рейтинг", key: "avgFracRatingSales" },
  { label: "Продавцы", key: "sellers" },
  { label: "% прод.", key: "sellPct", fmt: (r) => (r.sellPct * 100).toFixed(1) },
  { label: "Продажи", key: "sales" },
  { label: "Клики", key: "clicks" },
  { label: "% корз.", key: "cartPct" },
  { label: "% заказ.", key: "orderPct" },
  { label: "Балл", key: "score", fmt: (r) => r.score.toFixed(1) },
];

function exportCSV(rows: NicheRow[], filename: string) {
  const header = EXPORT_COLS.map((c) => c.label).join(";");
  const body = rows
    .map((r) =>
      EXPORT_COLS.map((c) => {
        if (c.fmt) return c.fmt(r);
        const v = r[c.key];
        return typeof v === "number" ? String(v) : `"${v}"`;
      }).join(";")
    )
    .join("\n");
  const blob = new Blob(["\uFEFF" + header + "\n" + body], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ───────────────────── styles ────────────────────────────── */

const C = {
  bg: "var(--personal-paper)",
  surface: "var(--report-surface)",
  border: "var(--personal-border)",
  accent: "var(--report-accent)",
  green: "var(--report-green)",
  text: "var(--personal-text)",
  dim: "var(--personal-muted)",
  faint: "var(--personal-border)",
  hoverRow: "var(--personal-rail-hover)",
};

/* ──────────────────── column config ──────────────────────── */

interface ColDef {
  label: string;
  key: SortKey;
  align: "left" | "center" | "right";
  w: number;
  render: (r: NicheRow) => React.ReactNode;
}

function rankColor(rank: number): string {
  if (rank <= 10) return C.green;
  if (rank <= 50) return "#a29bfe";
  return "#555";
}

function scoreColor(score: number): string {
  if (score >= 60) return C.green;
  if (score >= 40) return "#a29bfe";
  return "#555";
}

const COLUMNS: ColDef[] = [
  { label: "#", key: "rank", align: "center", w: 42, render: (r) => <span style={{ color: rankColor(r.rank), fontWeight: 500, fontSize: 12 }}>{r.rank}</span> },
  { label: "Предмет", key: "product", align: "left", w: 150, render: (r) => <span title={r.name} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>{r.product}</span> },
  { label: "Подгруппа", key: "subgroup", align: "left", w: 120, render: (r) => <span style={{ color: C.dim, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>{r.subgroup}</span> },
  { label: "Сезон", key: "seasonLabel", align: "center", w: 70, render: (r) => <span style={{ fontSize: 11, color: r.seasonLabel === "Высокая" ? "#f59e0b" : r.seasonLabel === "Умеренная" ? "#a29bfe" : C.dim }}>{r.seasonLabel}</span> },
  { label: "Товары", key: "items", align: "right", w: 72, render: (r) => fmtNum(r.items) },
  { label: "Новинки", key: "newItems", align: "right", w: 68, render: (r) => fmtNum(r.newItems) },
  { label: "Активные", key: "itemsMoving", align: "right", w: 72, render: (r) => fmtNum(r.itemsMoving) },
  { label: "С продаж.", key: "itemsWithSales", align: "right", w: 72, render: (r) => fmtNum(r.itemsWithSales) },
  { label: "% с прод.", key: "pctSalesMoving", align: "right", w: 62, render: (r) => fmtPct(r.pctSalesMoving) },
  { label: "% выкупа", key: "buyoutPct", align: "right", w: 62, render: (r) => fmtPct(r.buyoutPct) },
  { label: "Оборач.", key: "turnoverDays", align: "right", w: 55, render: (r) => String(r.turnoverDays) },
  { label: "Выручка", key: "revenue", align: "right", w: 88, render: (r) => <span style={{ fontWeight: 500 }}>{fmtMoney(r.revenue)}</span> },
  { label: "Выр/тов", key: "revPerItem", align: "right", w: 78, render: (r) => fmtNum(Math.round(r.revPerItem)) },
  { label: "% упущ.", key: "lostRevPct", align: "right", w: 58, render: (r) => fmtPct(r.lostRevPct) },
  { label: "Потенциал", key: "potential", align: "right", w: 88, render: (r) => fmtMoney(r.potential) },
  { label: "Ср.чек", key: "avgCheck", align: "right", w: 68, render: (r) => fmtNum(Math.round(r.avgCheck)) },
  { label: "Ср.цена\u2606", key: "avgPriceSales", align: "right", w: 72, render: (r) => fmtNum(Math.round(r.avgPriceSales)) },
  { label: "Медиана\u2606", key: "medianPriceSales", align: "right", w: 72, render: (r) => fmtNum(Math.round(r.medianPriceSales)) },
  { label: "Рейтинг", key: "avgFracRatingSales", align: "right", w: 58, render: (r) => fmtDec(r.avgFracRatingSales, 2) },
  { label: "Прод-цы", key: "sellers", align: "right", w: 65, render: (r) => fmtNum(r.sellers) },
  { label: "% прод.", key: "sellPct", align: "right", w: 55, render: (r) => fmtPct(r.sellPct) },
  { label: "Продажи", key: "sales", align: "right", w: 72, render: (r) => fmtNum(r.sales) },
  { label: "Клики", key: "clicks", align: "right", w: 52, render: (r) => fmtNum(r.clicks) },
  { label: "% корз.", key: "cartPct", align: "right", w: 55, render: (r) => fmtDec(r.cartPct, 1) },
  { label: "% заказ.", key: "orderPct", align: "right", w: 55, render: (r) => fmtDec(r.orderPct, 1) },
  { label: "Балл", key: "score", align: "right", w: 48, render: (r) => <span style={{ color: scoreColor(r.score), fontWeight: 500 }}>{fmtDec(r.score, 1)}</span> },
];

/* ───────────────────── components ────────────────────────── */

function SlicerPanel({
  data,
  activeFilters,
  onToggle,
  otherFiltered,
}: {
  data: NicheRow[];
  activeFilters: ActiveFilters;
  onToggle: (filterKey: string, value: number | string) => void;
  otherFiltered: (excludeKey: string) => NicheRow[];
}) {
  return (
    <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "0 0 8px" }}>
      {FILTERS.map((f) => {
        const pool = otherFiltered(f.key);
        if (f.isString) {
          const counts = new Map<string, number>();
          f.options.forEach((o) => counts.set(o, 0));
          pool.forEach((r) => {
            const v = f.getValue(r);
            counts.set(v, (counts.get(v) || 0) + 1);
          });
          const active = activeFilters[f.key] || new Set();
          return (
            <div key={f.key} style={{ minWidth: 120, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 10px", flexShrink: 0 }}>
              <div style={{ fontSize: 10, color: C.dim, marginBottom: 6, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {f.label}
                {active.size > 0 && (
                  <span onClick={() => active.forEach((v) => onToggle(f.key, v))} style={{ cursor: "pointer", color: C.accent, fontSize: 12 }}>✕</span>
                )}
              </div>
              {f.options.map((opt) => {
                const cnt = counts.get(opt) || 0;
                const isActive = active.has(opt);
                return (
                  <div
                    key={opt}
                    onClick={() => onToggle(f.key, opt)}
                    style={{
                      fontSize: 11,
                      padding: "3px 6px",
                      borderRadius: 4,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 6,
                      background: isActive ? "var(--personal-rail-hover)" : "transparent",
                      color: isActive ? "#fff" : cnt > 0 ? C.text : C.faint,
                    }}
                  >
                    <span>{opt}</span>
                    <span style={{ color: C.dim, fontSize: 10 }}>{cnt}</span>
                  </div>
                );
              })}
            </div>
          );
        }

        const bucketCounts = new Map<number, number>();
        for (let i = 0; i < f.thresholds.length; i++) bucketCounts.set(i, 0);
        pool.forEach((r) => {
          const b = getBucket(f.getValue(r), f.thresholds);
          bucketCounts.set(b, (bucketCounts.get(b) || 0) + 1);
        });
        const active = activeFilters[f.key] || new Set();
        return (
          <div key={f.key} style={{ minWidth: 130, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 10px", flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: C.dim, marginBottom: 6, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {f.label}
              {active.size > 0 && (
                <span onClick={() => active.forEach((v) => onToggle(f.key, v))} style={{ cursor: "pointer", color: C.accent, fontSize: 12 }}>✕</span>
              )}
            </div>
            {f.labels.map((lbl, i) => {
              const cnt = bucketCounts.get(i) || 0;
              const isActive = active.has(i);
              return (
                <div
                  key={i}
                  onClick={() => onToggle(f.key, i)}
                  style={{
                    fontSize: 11,
                    padding: "3px 6px",
                    borderRadius: 4,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 6,
                    background: isActive ? "var(--personal-rail-hover)" : "transparent",
                    color: isActive ? "#fff" : cnt > 0 ? C.text : C.faint,
                  }}
                >
                  <span>{lbl}</span>
                  <span style={{ color: C.dim, fontSize: 10 }}>{cnt}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/* ───────────────────── main page ──────────────────────────── */

export default function WbAnalyzerPage() {
  const [data, setData] = useState<NicheRow[]>([]);
  const [fileName, setFileName] = useState("");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [showFilters, setShowFilters] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);
  const PER_PAGE = 50;

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      setData(parsed);
      setFileName(file.name);
      setPage(0);
      setSelected(new Set());
      setActiveFilters({});
      setSearch("");
      setSortKey("rank");
      setSortAsc(true);
    };
    reader.readAsText(file, "utf-8");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const toggleFilter = useCallback((filterKey: string, value: number | string) => {
    setActiveFilters((prev) => {
      const next = { ...prev };
      const s = new Set(next[filterKey] || []);
      if (s.has(value)) s.delete(value);
      else s.add(value);
      if (s.size === 0) delete next[filterKey];
      else next[filterKey] = s;
      return next;
    });
    setPage(0);
  }, []);

  const resetAll = useCallback(() => {
    setActiveFilters({});
    setSearch("");
    setPage(0);
  }, []);

  // filter logic: check if a row passes a given filter
  const passesFilter = useCallback(
    (r: NicheRow, filterKey: string, vals: Set<number | string>): boolean => {
      const def = FILTERS.find((f) => f.key === filterKey);
      if (!def) return true;
      if (def.isString) return vals.has(def.getValue(r));
      return vals.has(getBucket(def.getValue(r), def.thresholds));
    },
    []
  );

  // rows filtered by all filters except one (for slicer counts)
  const otherFiltered = useCallback(
    (excludeKey: string): NicheRow[] => {
      let rows = data;
      if (search) {
        const q = search.toLowerCase();
        rows = rows.filter((r) => r.name.toLowerCase().includes(q));
      }
      for (const [fk, vals] of Object.entries(activeFilters)) {
        if (fk === excludeKey) continue;
        rows = rows.filter((r) => passesFilter(r, fk, vals));
      }
      return rows;
    },
    [data, search, activeFilters, passesFilter]
  );

  // fully filtered rows
  const filtered = useMemo(() => {
    let rows = data;
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter((r) => r.name.toLowerCase().includes(q));
    }
    for (const [fk, vals] of Object.entries(activeFilters)) {
      rows = rows.filter((r) => passesFilter(r, fk, vals));
    }
    return rows;
  }, [data, search, activeFilters, passesFilter]);

  // sorted
  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string" && typeof bv === "string") {
        return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      const an = av as number;
      const bn = bv as number;
      return sortAsc ? an - bn : bn - an;
    });
    return arr;
  }, [filtered, sortKey, sortAsc]);

  // paginated
  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const pageRows = sorted.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(key === "product" || key === "subgroup" || key === "seasonLabel");
    }
    setPage(0);
  };

  const toggleSelect = (rank: number) => {
    setSelected((prev) => {
      const s = new Set(prev);
      if (s.has(rank)) s.delete(rank);
      else s.add(rank);
      return s;
    });
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  // ───── upload screen ─────
  if (!data.length) {
    return (
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, background: C.bg }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 500, margin: "0 0 8px", color: C.text }}>
            WB Niche Analyzer
          </h1>
          <MaterialViews />
          <p style={{ color: C.dim, fontSize: 14, margin: 0 }}>
            Загрузите CSV из MPStats (Внешняя аналитика → Выбор ниши)
          </p>
          <div style={{ display: "inline-block", marginTop: 8, padding: "3px 10px", borderRadius: 4, background: "var(--personal-rail-hover)", color: C.accent, fontSize: 11, fontWeight: 500 }}>
            Инсайт — данные продаж/выручки используются напрямую
          </div>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            <Link
              href="/tools/wb-analyzer/guide"
              style={{ fontSize: 13, color: C.accent, textDecoration: "none", fontWeight: 500 }}
            >
              Инструкция: как анализировать ниши <IconlyArrowRight size={17} className="reading-inline-icon" />
            </Link>
            <Link
              href="/tools/mpstats-api"
              style={{ fontSize: 13, color: C.green, textDecoration: "none", fontWeight: 500 }}
            >
              API Гайд: выгрузка данных из MPStats <IconlyArrowRight size={17} className="reading-inline-icon" />
            </Link>
          </div>
        </div>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          style={{
            width: 420,
            maxWidth: "90vw",
            border: `2px dashed ${C.border}`,
            borderRadius: 3,
            padding: "48px 24px",
            textAlign: "center",
            cursor: "pointer",
            transition: "border-color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>📂</div>
          <div style={{ fontSize: 14, color: C.text, marginBottom: 4 }}>
            Перетащите CSV или кликните
          </div>
          <div style={{ fontSize: 12, color: C.faint }}>
            Формат: MPStats «Выбор ниши» (.csv, UTF-8)
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
    );
  }

  // ───── main table screen ─────
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontSize: 13 }}>
      {/* toolbar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: C.bg, borderBottom: `1px solid ${C.border}`, padding: "10px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontWeight: 500, fontSize: 15, marginRight: 4 }}>WB Niche Analyzer</span>
          <span style={{ padding: "2px 8px", borderRadius: 4, background: "var(--personal-rail-hover)", color: C.accent, fontSize: 10, fontWeight: 500 }}>
            Инсайт
          </span>
          <span style={{ color: C.dim, fontSize: 12 }}>{fileName}</span>
          <div style={{ flex: 1 }} />
          <input
            type="text"
            placeholder="Поиск по названию…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            style={{ width: 200, padding: "6px 10px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 12, outline: "none" }}
          />
          <button onClick={() => setShowFilters(!showFilters)} style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${C.border}`, background: showFilters ? "var(--personal-rail-hover)" : C.surface, color: showFilters ? C.accent : C.dim, fontSize: 12, cursor: "pointer", fontWeight: 500 }}>
            <IconlyChevronDown size={17} className={`reading-inline-icon ${showFilters ? "rotate-180" : ""}`} /> Фильтры {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          {(activeFilterCount > 0 || search) && (
            <button onClick={resetAll} style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, color: "#f87171", fontSize: 12, cursor: "pointer" }}>
              ✕ Сброс
            </button>
          )}
          <Link href="/tools/wb-analyzer/guide" style={{ padding: "6px 10px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, color: C.dim, fontSize: 13, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", fontWeight: 500 }}>
            ?
          </Link>
          <Link href="/tools/mpstats-api" style={{ padding: "6px 10px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, color: C.green, fontSize: 12, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", fontWeight: 500 }}>
            API
          </Link>
          <button onClick={() => fileRef.current?.click()} style={{ padding: "6px 10px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, color: C.dim, fontSize: 14, cursor: "pointer" }}>
            📂
          </button>
          <input ref={fileRef} type="file" accept=".csv" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          <button
            onClick={() => exportCSV(sorted, "wb_niches_filtered.csv")}
            style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, color: C.green, fontSize: 12, cursor: "pointer", fontWeight: 500 }}
          >
            ⬇ CSV ({sorted.length})
          </button>
          {selected.size > 0 && (
            <button
              onClick={() => exportCSV(data.filter((r) => selected.has(r.rank)), "wb_niches_selected.csv")}
              style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${C.accent}`, background: "var(--personal-rail-hover)", color: C.accent, fontSize: 12, cursor: "pointer", fontWeight: 500 }}
            >
              ⬇ Выбранные ({selected.size})
            </button>
          )}
        </div>

        {/* filter slicers */}
        {showFilters && (
          <div style={{ marginTop: 10 }}>
            <SlicerPanel data={data} activeFilters={activeFilters} onToggle={toggleFilter} otherFiltered={otherFiltered} />
          </div>
        )}

        {/* stats bar */}
        <div style={{ marginTop: 8, display: "flex", gap: 16, fontSize: 11, color: C.dim }}>
          <span>Всего: {data.length}</span>
          <span>Отфильтровано: {sorted.length}</span>
          {selected.size > 0 && <span style={{ color: C.accent }}>Выбрано: {selected.size}</span>}
          <span>Стр. {page + 1} / {totalPages || 1}</span>
        </div>
      </div>

      {/* table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: COLUMNS.reduce((s, c) => s + c.w, 30) }}>
          <thead>
            <tr style={{ position: "sticky", top: 0, background: C.surface, zIndex: 10 }}>
              <th style={{ width: 30, padding: "8px 4px", borderBottom: `1px solid ${C.border}` }}></th>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  style={{
                    width: col.w,
                    padding: "8px 6px",
                    textAlign: col.align,
                    fontSize: 10,
                    fontWeight: 500,
                    color: sortKey === col.key ? C.accent : C.dim,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    borderBottom: `1px solid ${C.border}`,
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    userSelect: "none",
                  }}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span style={{ marginLeft: 2, fontSize: 9 }}>
                      <IconlyChevronDown size={15} className={`reading-inline-icon ${sortAsc ? "rotate-180" : ""}`} />
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((r) => {
              const isSel = selected.has(r.rank);
              return (
                <tr
                  key={r.rank}
                  onClick={() => toggleSelect(r.rank)}
                  style={{
                    cursor: "pointer",
                    background: isSel ? "var(--personal-rail-hover)" : "transparent",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSel) e.currentTarget.style.background = C.hoverRow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isSel ? "var(--personal-rail-hover)" : "transparent";
                  }}
                >
                  <td style={{ textAlign: "center", padding: "6px 4px", fontSize: 12 }}>
                    {isSel ? "☑" : "☐"}
                  </td>
                  {COLUMNS.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        padding: "6px",
                        textAlign: col.align,
                        fontSize: 12,
                        whiteSpace: "nowrap",
                        maxWidth: col.w,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {col.render(r)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "16px 0", borderTop: `1px solid ${C.border}` }}>
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, color: page === 0 ? C.faint : C.text, fontSize: 12, cursor: page === 0 ? "default" : "pointer" }}
          >
            <IconlyArrowLeft size={17} className="reading-inline-icon" /> Назад
          </button>
          <span style={{ padding: "6px 0", fontSize: 12, color: C.dim }}>
            {page + 1} / {totalPages}
          </span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
            style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, color: page >= totalPages - 1 ? C.faint : C.text, fontSize: 12, cursor: page >= totalPages - 1 ? "default" : "pointer" }}
          >
            Далее <IconlyArrowRight size={17} className="reading-inline-icon" />
          </button>
        </div>
      )}
    </div>
  );
}
