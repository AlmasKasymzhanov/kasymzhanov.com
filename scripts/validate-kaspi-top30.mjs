import { readFileSync } from "node:fs";
import { niches, firstPriorityNames } from "../app/reports/kaspi-top-30-june-2026/data.ts";

const sourcePath = process.argv[2] ?? "C:/Projects/redstat-backend/docs/KASPI_TOP_30_NICHES_JUNE_2026.md";
const markdown = readFileSync(sourcePath, "utf8");
const number = (value) => Number(
  value
    .replace(/[₸%+\s]/g, "")
    .replace(/[−–—]/g, "-")
    .replace(",", "."),
);
const rowsIn = (block) => block
  .split(/\r?\n/)
  .filter((line) => /^\|\s*\d+\s*\|/.test(line));

// Public labels may be shortened or normalized typographically. Validation
// always resolves them back to the stable source name stored in data.ts.
const sourceNameAliases = new Map([
  ["Двигатели в сборе", "Двигатель в сборе"],
  ["Силовые тренажёры", "Силовые тренажеры"],
  ["Портативные зарядные станции", "Портативные зарядные устройства для кемпинга"],
  ["Велотренажёры", "Велотренажеры"],
]);
const sourceNameOf = (name) => sourceNameAliases.get(name) ?? name;

const marketBlock = markdown
  .split("## 3. Рынок и конкуренция")[1]
  .split("## 4. Отзывы")[0];
const market = rowsIn(marketBlock).map((line) => {
  const cells = line.split("|").slice(1, -1).map((value) => value.trim());
  return {
    rank: number(cells[0]),
    name: cells[1],
    revenue: number(cells[2]),
    growth: number(cells[3]),
    orders: number(cells[4]),
    averageCheck: number(cells[5]),
    activeSku: number(cells[6]),
    sellers: number(cells[7]),
    unbrandedShare: number(cells[8]),
  };
});

const reviewBlock = markdown
  .split("## 4. Отзывы")[1]
  .split("### Что можно")[0];
const reviews = reviewBlock
  .split(/\r?\n/)
  .filter((line) => /^\|\s*[^|]+\|\s*\d/.test(line))
  .map((line) => {
    const cells = line.split("|").slice(1, -1).map((value) => value.trim());
    return {
      name: cells[0],
      medianReviews: number(cells[1]),
      lowReviewRevenueShare: number(cells[3]),
    };
  });

const marketFields = [
  "revenue",
  "growth",
  "orders",
  "averageCheck",
  "activeSku",
  "sellers",
  "unbrandedShare",
];
const reviewFields = ["medianReviews", "lowReviewRevenueShare"];
const numericMismatches = [];
const marketBySourceName = new Map(market.map((row) => [sourceNameOf(row.name), row]));
const reviewsBySourceName = new Map(reviews.map((row) => [sourceNameOf(row.name), row]));

for (const local of niches) {
  const source = marketBySourceName.get(local.sourceName);
  if (!source) {
    numericMismatches.push(`missing market source ${local.sourceName}`);
    continue;
  }
  if (local.rank !== source.rank) {
    numericMismatches.push(`${local.sourceName} rank: ${local.rank} != ${source.rank}`);
  }
  for (const field of marketFields) {
    if (Math.abs(local[field] - source[field]) > 0.001) {
      numericMismatches.push(`${local.sourceName} ${field}: ${local[field]} != ${source[field]}`);
    }
  }
}

for (const local of niches) {
  const source = reviewsBySourceName.get(local.sourceName);
  if (!source) {
    numericMismatches.push(`missing review source ${local.sourceName}`);
    continue;
  }
  for (const field of reviewFields) {
    if (Math.abs(local[field] - source[field]) > 0.001) {
      numericMismatches.push(`${local.sourceName} ${field}: ${local[field]} != ${source[field]}`);
    }
  }
}

const filterIssues = niches
  .filter((niche) => niche.revenue < 50
    || niche.activeSku < 10
    || niche.activeSku > 300
    || niche.sellers < 3
    || niche.sellers > 100
    || niche.unbrandedShare <= 0)
  .map((niche) => niche.name);

const domainIssues = niches
  .filter((niche) => niche.orders <= 0
    || niche.medianReviews < 0
    || niche.lowReviewRevenueShare < 0
    || niche.lowReviewRevenueShare > 100)
  .map((niche) => niche.name);

const localSourceNames = new Set(niches.map((niche) => niche.sourceName));

// Public revenue is rounded to 0.1M, while the average check was calculated
// before that rounding. The tolerance accounts for both visible roundings.
const averageCheckRoundingIssues = niches
  .filter((niche) => {
    const checkFromVisibleRevenue = niche.revenue * 1000 / niche.orders;
    const roundingTolerance = 50 / niche.orders + 0.051;
    return Math.abs(niche.averageCheck - checkFromVisibleRevenue) > roundingTolerance;
  })
  .map((niche) => niche.name);

const result = {
  sourceMarketRows: market.length,
  sourceReviewRows: reviews.length,
  publicRows: niches.length,
  uniqueNames: new Set(niches.map((niche) => niche.name)).size,
  uniqueSourceNames: localSourceNames.size,
  uniqueRanks: new Set(niches.map((niche) => niche.rank)).size,
  marketSourcesWithoutLocal: [...marketBySourceName.keys()].filter((name) => !localSourceNames.has(name)),
  reviewSourcesWithoutLocal: [...reviewsBySourceName.keys()].filter((name) => !localSourceNames.has(name)),
  numericMismatches,
  filterIssues,
  domainIssues,
  averageCheckRoundingIssues,
  shortlistMissing: firstPriorityNames.filter(
    (name) => !niches.some((niche) => niche.name === name),
  ),
  shortlistOutsideCheck: firstPriorityNames.filter(
    (name) => niches.find((niche) => niche.name === name)?.status !== "check",
  ),
};

console.log(JSON.stringify(result, null, 2));

if (Object.values(result).some((value) => Array.isArray(value) && value.length > 0)
  || result.sourceMarketRows !== 30
  || result.sourceReviewRows !== 30
  || result.publicRows !== 30
  || result.uniqueNames !== 30
  || result.uniqueSourceNames !== 30
  || result.uniqueRanks !== 30) {
  process.exitCode = 1;
}
