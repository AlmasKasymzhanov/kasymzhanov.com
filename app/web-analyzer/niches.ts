/* ───────────────────────────────────────────────────────────────
   Shared niche data layer.

   Single source of truth for the NicheRow shape, scoring and the two
   ways data enters the analyzer:
     • parseCSV()        — manual upload of the MPStats «Выбор ниши» CSV
     • mapApiRow()       — rows from the MPStats Analytics API
                           (POST /api/analytics/v1/wb/subject/list)

   Both paths feed scoreAndRank() so the result is identical regardless
   of source. Imported by both the client page and the server route.
   ─────────────────────────────────────────────────────────────── */

/* ───────────────────────── types ───────────────────────── */

export interface NicheRow {
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

export type SortKey = keyof NicheRow;

type RawRow = Omit<NicheRow, "score" | "rank">;

export const SEASON_MAP: Record<number, string> = {
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

function computeScore(r: RawRow): number {
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

/** Score every row, sort by score desc, assign 1-based rank. */
export function scoreAndRank(rows: RawRow[]): NicheRow[] {
  const scored = rows.map((r) => ({ ...r, score: computeScore(r), rank: 0 }));
  scored.sort((a, b) => b.score - a.score);
  scored.forEach((r, i) => (r.rank = i + 1));
  return scored;
}

/* ───────────────────── derived fields ───────────────────── */

/** Fill the computed/derived fields shared by both the CSV and API paths. */
function withDerived(
  base: Omit<RawRow, "newItemsPct" | "pctSalesMoving" | "lostRevPct" | "buyoutPct" | "revPerItem" | "avgCheck" | "seasonLabel">
): RawRow {
  const pctSalesMoving = base.itemsMoving > 0 ? base.itemsWithSales / base.itemsMoving : 0;
  const buyoutPct = base.avgBuyoutPctRet > 0 ? base.avgBuyoutPctRet / 100 : 0;
  const lostRevPct = base.revenue + base.lostRev > 0 ? base.lostRev / (base.revenue + base.lostRev) : 0;
  const revPerItem = base.itemsWithSales > 0 ? base.revenue / base.itemsWithSales : 0;
  const avgCheck = base.sales > 0 ? base.revenue / base.sales : 0;
  const newItemsPct = base.items > 0 ? base.newItems / base.items : 0;
  return {
    ...base,
    seasonLabel: SEASON_MAP[base.seasonNum] || `${base.seasonNum}`,
    newItemsPct,
    pctSalesMoving,
    lostRevPct,
    buyoutPct,
    revPerItem,
    avgCheck,
  };
}

/* ───────────────────── CSV parsing ─────────────────────── */

function parseNum(v: string): number {
  if (!v || v === "nan" || v === "NaN" || v === "") return 0;
  return parseFloat(v.replace(",", ".")) || 0;
}

/** Parse the MPStats «Выбор ниши» CSV export (semicolon-separated). */
export function parseCSV(text: string): NicheRow[] {
  const clean = text.replace(/^﻿/, "");
  const lines = clean.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  const rows: RawRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(";").map((c) => c.replace(/^"|"$/g, ""));
    if (cols.length < 49) continue;

    const name = cols[0];
    const parts = name.split("/");
    const subgroup = (parts[0] || "").trim();
    const product = (parts[1] || name).trim();

    const seasonNum = parseNum(cols[1]);

    rows.push(
      withDerived({
        name,
        subgroup,
        product,
        seasonNum,
        comFBO: parseNum(cols[3]),
        comFBS: parseNum(cols[4]),
        items: parseNum(cols[5]),
        newItems: parseNum(cols[6]),
        itemsInStock: parseNum(cols[7]),
        itemsMoving: parseNum(cols[9]),
        pctMoving: parseNum(cols[10]),
        itemsWithSales: parseNum(cols[11]),
        pctWithSales: parseNum(cols[12]),
        brands: parseNum(cols[14]),
        brandsWithSales: parseNum(cols[15]),
        sellers: parseNum(cols[17]),
        sellersWithSales: parseNum(cols[18]),
        sellPct: parseNum(cols[19]) / 100,
        sales: parseNum(cols[20]),
        revenue: parseNum(cols[21]),
        lostRev: parseNum(cols[22]),
        potential: parseNum(cols[24]),
        avgBuyoutPctRet: parseNum(cols[26]),
        totalStock: parseNum(cols[29]),
        frozenStock: parseNum(cols[30]),
        frozenStockPct: parseNum(cols[32]),
        turnoverDays: parseNum(cols[33]),
        avgPrice: parseNum(cols[36]),
        medianPrice: parseNum(cols[37]),
        avgPriceSales: parseNum(cols[40]),
        medianPriceSales: parseNum(cols[41]),
        avgRating: parseNum(cols[42]),
        avgRatingSales: parseNum(cols[43]),
        avgFracRating: parseNum(cols[44]),
        avgFracRatingSales: parseNum(cols[45]),
        clicks: parseNum(cols[46]),
        cartPct: parseNum(cols[47]),
        orderPct: parseNum(cols[48]),
      })
    );
  }

  return scoreAndRank(rows);
}

/* ───────────────────── MPStats API mapping ───────────────── */

/**
 * Shape of one record from POST /api/analytics/v1/wb/subject/list.
 * Numeric fields sometimes arrive as strings ("34.00"), so everything is
 * coerced through num() below.
 */
export interface MpSubject {
  id: number;
  name: string;
  first_date?: string;
  seasonality_level?: number | string;
  commision_fbo?: number | string;
  commision_fbs?: number | string;
  items?: number | string;
  items_new?: number | string;
  items_with_count?: number | string;
  live_items?: number | string;
  live_items_percent?: number | string;
  items_with_sells?: number | string;
  items_with_sells_percent?: number | string;
  brands?: number | string;
  brands_with_sells?: number | string;
  sellers?: number | string;
  sellers_with_sells?: number | string;
  sellers_with_sells_percent?: number | string;
  sales?: number | string;
  revenue?: number | string;
  lost_profit?: number | string;
  revenue_potential?: number | string;
  purchase_after_return?: number | string;
  count_sum?: number | string;
  frozen_stocks?: number | string;
  frozen_stocks_percent?: number | string;
  turnover_in_days?: number | string;
  avg_price_final?: number | string;
  median_price_final?: number | string;
  avg_price_final_with_sells?: number | string;
  median_price_final_with_sells?: number | string;
  avg_rating?: number | string;
  avg_rating_with_sells?: number | string;
  comment_valuation_average?: number | string;
  comment_valuation_with_sells?: number | string;
  add_to_cart_percent?: number | string;
  cart_to_order_percent?: number | string;
  [k: string]: unknown;
}

function num(v: unknown): number {
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  if (typeof v === "string") {
    const n = parseFloat(v.replace(",", "."));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

/**
 * Map one MPStats subject record to a NicheRow.
 * Field correspondence verified against the live CSV export — see
 * memory/mpstats-niche-api.md for the full table. Note the API does not
 * expose «Количество кликов на карточку», so `clicks` is 0 on this path.
 */
export function mapApiRow(s: MpSubject): RawRow {
  const name = s.name || "";
  const parts = name.split("/");
  const subgroup = (parts[0] || "").trim();
  const product = (parts[1] || name).trim();

  return withDerived({
    name,
    subgroup,
    product,
    seasonNum: num(s.seasonality_level),
    comFBO: num(s.commision_fbo),
    comFBS: num(s.commision_fbs),
    items: num(s.items),
    newItems: num(s.items_new),
    itemsInStock: num(s.items_with_count),
    itemsMoving: num(s.live_items),
    pctMoving: num(s.live_items_percent),
    itemsWithSales: num(s.items_with_sells),
    pctWithSales: num(s.items_with_sells_percent),
    brands: num(s.brands),
    brandsWithSales: num(s.brands_with_sells),
    sellers: num(s.sellers),
    sellersWithSales: num(s.sellers_with_sells),
    sellPct: num(s.sellers_with_sells_percent) / 100,
    sales: num(s.sales),
    revenue: num(s.revenue),
    lostRev: num(s.lost_profit),
    potential: num(s.revenue_potential),
    avgBuyoutPctRet: num(s.purchase_after_return),
    totalStock: num(s.count_sum),
    frozenStock: num(s.frozen_stocks),
    frozenStockPct: num(s.frozen_stocks_percent),
    turnoverDays: num(s.turnover_in_days),
    avgPrice: num(s.avg_price_final),
    medianPrice: num(s.median_price_final),
    avgPriceSales: num(s.avg_price_final_with_sells),
    medianPriceSales: num(s.median_price_final_with_sells),
    avgRating: num(s.avg_rating),
    avgRatingSales: num(s.avg_rating_with_sells),
    avgFracRating: num(s.comment_valuation_average),
    avgFracRatingSales: num(s.comment_valuation_with_sells),
    clicks: 0,
    cartPct: num(s.add_to_cart_percent),
    orderPct: num(s.cart_to_order_percent),
  });
}

/** Map a full page of API subjects and score+rank them. */
export function buildRowsFromApi(subjects: MpSubject[]): NicheRow[] {
  return scoreAndRank(subjects.map(mapApiRow));
}
