const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const data = require('../lib/data/magnesium-market.json');
const sum = (rows, key) => rows.reduce((s, row) => s + (row[key] ?? 0), 0);
const july = data.market.find(row => row.month === '2026-07');
assert.deepEqual([july.revenue, july.orders, july.skus, july.brands, july.medianPrice, july.revenuePerOrder], [195043903, 30607, 587, 217, 7621, 6373]);
assert.equal(data.targets.length, 5);
assert.equal(data.variants.length, 11);
assert.equal(data.competitors.length, 217);
const expected = { 'Magne B6': [87145829, 16215], Magnerot: [15486186, 2631], Magnefar: [3892923, 1089], Magnetab: [1638963, 355], Magnicum: [114607, 29] };
for (const target of data.targets) {
  assert.deepEqual([sum(target.months, 'revenue'), sum(target.months, 'orders')], expected[target.name]);
  assert.deepEqual([target.revenue, target.orders], expected[target.name]);
  assert.equal(target.months.filter(row => row.revenue !== null).length, 5);
}
for (const rows of [data.market, ...data.targets.map(t => t.months)]) {
  for (const month of ['2026-05', '2026-06']) {
    const row = rows.find(row => row.month === month);
    assert(row); assert.equal(row.revenue, null); assert.equal(row.orders, null);
  }
  assert(rows.find(row => row.month === '2026-04').revenue !== null);
  assert(rows.find(row => row.month === '2026-07').revenue !== null);
}
assert.equal(data.targets.find(t => t.name === 'Magnicum').months.find(r => r.month === '2026-03').revenue, 0, 'A real observed zero must remain zero');
assert.equal(sum(data.targets.map(t => t.months.at(-1)), 'revenue'), 17393810);
assert.equal(sum(data.variants, 'revenue'), 17393810);
assert.equal(sum(data.variants, 'orders'), 2490);
assert.equal(sum(data.competitors, 'revenue'), july.revenue);
assert.equal(sum(data.segments, 'revenue'), july.revenue);
assert.equal(sum(data.segments, 'orders'), july.orders);
const categories2025 = data.categories.filter(row => row.month.startsWith('2025'));
assert.equal(categories2025.length, 24);
assert.equal(sum(categories2025, 'revenue'), 35130084603);
assert.equal(sum(categories2025, 'orders'), 6619059);
for (const row of data.economics) {
  const ceiling = row.price * (1 - .109 - .05 - .01 - .15) - row.delivery;
  assert(Math.abs(ceiling - row.costCeiling) < 1, `Cost threshold rounding: ${row.name}`);
}
const publicData = JSON.stringify(data);
assert(!/coverage_status|seller_slots|internal_(?:source|file)|[A-Z]:\\|\.jsonl|\.xlsx|SHA256SUMS/i.test(publicData));
assert.equal(data.source, 'Redstat');

// Exercise the actual line renderer: each series must have two disjoint paths,
// four consecutive observations and one July observation, never a May/June mark.
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...args) { return originalResolve.call(this, name.startsWith('@/') ? path.join(process.cwd(), name.slice(2)) : name, ...args); };
for (const ext of ['.ts', '.tsx']) require.extensions[ext] = (module, file) => {
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2022 }, fileName: file });
  module._compile(output.outputText, file);
};
const { LineChart } = require('../components/charts/line-chart.tsx');
const { definedPointIndex } = require('../components/charts/line-chart-export.ts');
const points = data.targets[0].months.map(row => ({ y: row.revenue }));
assert.equal(definedPointIndex(points, 4, 1), 6, 'ArrowRight must skip May/June and reach July');
assert.equal(definedPointIndex(points, 5, -1), 3, 'ArrowLeft must skip May/June and reach April');
assert.equal(definedPointIndex([{ y: null }, { y: 0 }, { y: null }], 0, 1), 1);
assert.equal(definedPointIndex([{ y: null }, { y: null }], 0, 1), null);
const rendered = renderToStaticMarkup(React.createElement(LineChart, { data: data.targets.map(target => ({ name: target.name, data: target.months.map(row => ({ x: row.month, y: row.revenue })) })), markers: 'always', yBaselineZero: true, animation: { enabled: false } }));
assert.equal((rendered.match(/aria-roledescription="data point"/g) || []).length, 25);
const paths = [...rendered.matchAll(/<path[^>]*class="brock-line"[^>]*d="([^"]+)"/g)].map(match => match[1]);
assert.equal(paths.length, 5);
for (const d of paths) assert.equal((d.match(/M /g) || []).length, 2, 'Each line must break before the July observation');
assert(!/aria-label="[^\"]+2026-0[56]:/.test(rendered));
console.log('PASS: exact KPIs, totals, category history, package reconciliation, cost ceilings, public fields and five disconnected time series.');

if (process.argv.includes('--http')) (async () => {
  const base = process.env.SITE_CHECK_BASE || 'http://localhost:3000';
  const route = '/magnesium';
  const oldRoute = '/blog/rynok-magnievyh-preparatov-kaspi-2026';
  for (let i = 0; i < 2; i++) {
    const response = await fetch(base + route); assert.equal(response.status, 200);
    const html = await response.text();
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
    assert(html.includes(`https://kasymzhanov.com${route}`));
    assert(/<meta name="robots" content="noindex, nofollow"/.test(html));
    assert(html.includes('application/ld+json') && html.includes('og:image'));
    assert(html.includes('data-content-engagement="rynok-magnievyh-preparatov-kaspi-2026"'));
    // Next's serialized stream can contain IDs such as 2a:\"; require a
    // drive-letter boundary and a real path segment, not a stream marker.
    assert(!/coverage_status|seller_slots|internal_(?:source|file)|\.jsonl|\.xlsx|\b[A-Z]:\\{1,2}[A-Z0-9_]/i.test(html));
    assert(!html.includes('NaN'));
  }
  assert.equal((await fetch(base + oldRoute, { redirect: 'manual' })).status, 404);
  for (const routeList of ['/', '/en', '/latest', '/kaspi', '/tools', '/search?q=магния', '/sitemap.xml', '/feed.xml', '/en/feed.xml']) {
    const response = await fetch(base + routeList); assert.equal(response.status, 200);
    const html = await response.text();
    assert(!html.includes(route) && !html.includes(oldRoute), `Client report exposed at ${routeList}`);
    assert(!html.includes('Рынок магния на Kaspi'), `Client report title exposed at ${routeList}`);
  }
  const image = await fetch(base + route + '/opengraph-image');
  assert.equal(image.status, 200); assert(image.headers.get('content-type').startsWith('image/png'));
  console.log('PASS: short route and reload, noindex, canonical, participation, no public discovery links, removed old route and Open Graph image.');
})().catch(error => { console.error(error); process.exitCode = 1; });
