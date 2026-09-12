// Offline adapter: pass the prepared research directory as the only argument.
// Only explicitly selected publication fields enter the generated static dataset.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const directory = process.argv[2];
assert(directory, 'Usage: node scripts/import-magnesium-market.mjs <research-directory>');
const checksums = new Map(readFileSync(join(directory, 'SHA256SUMS.txt'), 'utf8').trim().split(/\r?\n/).map(line => {
  const [, hash, name] = line.match(/^([a-f0-9]+)\s+(.+)$/i) ?? [];
  return [name, hash?.toLowerCase()];
}));
function read(name) {
  const bytes = readFileSync(join(directory, name));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), checksums.get(name), `Checksum mismatch: ${name}`);
  return bytes.toString('utf8').replace(/^\uFEFF/, '');
}
function csv(name) {
  const text = read(name), rows = []; let row = [], value = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') { if (quoted && text[i + 1] === '"') { value += '"'; i++; } else quoted = !quoted; }
    else if (!quoted && (ch === ',' || ch === '\n')) {
      row.push(value.replace(/\r$/, '')); value = '';
      if (ch === '\n') { if (row.some(Boolean)) rows.push(row); row = []; }
    } else value += ch;
  }
  assert(!quoted, `Unterminated CSV quote: ${name}`);
  if (value || row.length) { row.push(value.replace(/\r$/, '')); rows.push(row); }
  const headers = rows.shift();
  return rows.map(values => { assert.equal(values.length, headers.length); return Object.fromEntries(headers.map((h, i) => [h, values[i]])); });
}
const number = value => { if (value === '') return null; const n = Number(value); assert(Number.isFinite(n)); return n; };
const shortName = value => value.split(' (')[0];
const period = value => value.slice(0, 7);
const summary = JSON.parse(read('ENTERPRISE_SUMMARY.json'));
const targets = ['Magne B6', 'Magnerot', 'Magnefar', 'Magnetab', 'Magnicum'];
const wide = csv('target_monthly_wide.csv');
const targetRows = csv('target_monthly.csv');
const data = {
  source: 'Redstat', researchDate: '2026-09-11', latestMonth: '2026-07',
  availableMonths: ['2026-01', '2026-02', '2026-03', '2026-04', '2026-07'],
  missingMonths: ['2026-05', '2026-06'],
  targets: targets.map(name => {
    const total = summary.exact_target_totals.find(r => shortName(r.target) === name);
    const months = wide.map(row => {
      const prefix = Object.keys(row).find(key => key.startsWith(name + ' (') && key.endsWith(' revenue')).replace(/ revenue$/, '');
      const detail = targetRows.find(r => r.month === row.month && shortName(r.target) === name);
      return { month: period(row.month), revenue: number(row[`${prefix} revenue`]), orders: number(row[`${prefix} orders`]), medianPrice: detail ? number(detail.median_listing_price) : null };
    });
    assert.equal(months.reduce((s, r) => s + (r.revenue ?? 0), 0), total.revenue);
    assert.equal(months.reduce((s, r) => s + (r.orders ?? 0), 0), total.orders);
    return { name, revenue: total.revenue, orders: total.orders, months };
  }),
  market: csv('magnesium_market_monthly.csv').map(r => ({ month: period(r.month), revenue: number(r.revenue), orders: number(r.orders), skus: number(r.active_skus), brands: number(r.active_brands), revenuePerOrder: number(r.realized_revenue_per_order), medianPrice: number(r.median_listing_price) })),
  competitors: csv('magnesium_competitors_latest.csv').map(r => ({ name: r.brand, revenue: number(r.revenue), orders: number(r.orders), skus: number(r.active_skus), share: number(r.revenue_share_pct), revenuePerOrder: number(r.realized_revenue_per_order) })),
  segments: csv('magnesium_price_segments_monthly.csv').filter(r => r.month === '2026-07-01').map(r => ({ name: r.segment, revenue: number(r.revenue), orders: number(r.orders), share: number(r.revenue_share_pct), revenuePerOrder: number(r.realized_revenue_per_order), medianPrice: number(r.median_listing_price) })),
  categories: csv('category_context_2025_2026.csv').filter(r => ['Витамины и БАД', 'Витаминные препараты'].includes(r.category_name)).map(r => ({ month: period(r.month), name: r.category_name, revenue: number(r.revenue), orders: number(r.orders), skus: number(r.skus), brands: number(r.brands) })),
  variants: csv('target_variant_monthly.csv').filter(r => r.month === '2026-07-01').map(r => ({ id: r.sku, name: r.sku_name, target: shortName(r.target), revenue: number(r.revenue), orders: number(r.orders), revenuePerOrder: number(r.realized_revenue_per_order), medianPrice: number(r.median_listing_price) })),
  economics: csv('pl_screen_latest_target_variants.csv').map(r => ({ id: r.sku, name: r.sku_name, target: shortName(r.target), price: number(r.selling_price), delivery: number(r.delivery_national_incl_16pct_vat), commissionLow: number(r.commission_at_6_4pct), commissionHigh: number(r.commission_at_10_9pct), logisticsShareLow: number(r.platform_logistics_share_low_pct), logisticsShareHigh: number(r.platform_logistics_share_high_pct), costCeiling: number(r.landed_cogs_ceiling_for_15pct_contribution) })),
};
const july = data.market.find(r => r.month === '2026-07');
assert.equal(july.revenue, summary.latest_magnesium_market.revenue);
assert.equal(july.orders, summary.latest_magnesium_market.orders);
for (const rows of [data.market, ...data.targets.map(t => t.months)]) for (const month of data.missingMonths) {
  const row = rows.find(r => r.month === month); assert(row); assert.equal(row.revenue, null); assert.equal(row.orders, null);
}
const sum = (rows, key) => rows.reduce((s, r) => s + r[key], 0);
assert.equal(sum(data.variants, 'revenue'), sum(data.targets.map(t => t.months.at(-1)), 'revenue'));
assert.equal(sum(data.segments, 'revenue'), july.revenue);
assert.equal(sum(data.segments, 'orders'), july.orders);
assert.equal(sum(data.categories.filter(r => r.month.startsWith('2025')), 'revenue'), summary.category_context.vitamins_and_vitamin_drugs_2025_revenue);
const output = JSON.stringify(data, null, 2) + '\n';
assert(!/coverage_status|seller_slots|internal_(?:source|file)|[A-Z]:\\|\.jsonl|\.xlsx|SHA256SUMS/i.test(output));
writeFileSync(resolve('lib/data/magnesium-market.json'), output);
console.log(`Imported verified publication data: ${data.targets.length} lines, ${data.variants.length} July variants, ${data.competitors.length} competitors. Missing months preserved as null.`);
