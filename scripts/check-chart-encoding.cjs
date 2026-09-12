const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const mod = { exports: {} };
new Function('module', 'exports', ts.transpileModule(fs.readFileSync('lib/chart-encoding.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText)(mod, mod.exports);
const { heatEncoding: heat, barFraction, sparklinePoints } = mod.exports;
// Actual edge cases: centered scales, clipping, absent observations and zero ranges.
assert.equal(heat(100, { min: 0, center: 100, max: 200 }).intensity, 0);
assert.equal(heat(50, { min: 0, center: 100, max: 200 }).intensity, heat(150, { min: 0, center: 100, max: 200 }).intensity);
assert.notEqual(heat(50, { min: 0, center: 100, max: 200 }).color, heat(150, { min: 0, center: 100, max: 200 }).color);
assert.equal(heat(350, { min: 0, center: 100, max: 200 }).intensity, 1);
assert.equal(heat(0, { max: 100 }).intensity, 0);
for (const v of [null, undefined, NaN, Infinity]) assert.equal(heat(v, { max: 100 }), null);
assert.equal(heat(0, { max: 0 }), null);
assert.equal(heat(25, { max: 100, curve: 'sqrt' }).intensity, 0.5);
assert.ok(heat(0.1, { max: 100 }).backgroundColor.includes('0.03%'));
assert.equal(barFraction(25, 100), 0.25);
assert.equal(barFraction(125, 100), 1);
assert.equal(barFraction(null, 100), null);
const points = sparklinePoints([0, null, 10, -10]);
assert.ok(points[0]); assert.equal(points[1], null);
assert.ok(points[2].y < points[0].y && points[0].y < points[3].y);
assert.deepEqual(sparklinePoints([null, undefined]), []);
for (const p of sparklinePoints([0, 0, 0])) assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y));
const rgb = h => h.match(/[a-f0-9]{2}/gi).map(n => parseInt(n, 16) / 255);
const lum = c => c.map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4).reduce((s, n, i) => s + n * [.2126, .7152, .0722][i], 0);
const contrast = (a, b) => (Math.max(lum(a), lum(b)) + .05) / (Math.min(lum(a), lum(b)) + .05);
for (const theme of [{ bg: 'ffffff', text: '242424', colors: ['005ed9','7955b7','087e76','946021'] }, { bg: '000000', text: 'd4d4d4', colors: ['2a82ff','ad95ec','49b9ae','d6a15d'] }]) {
  const bg = rgb(theme.bg), text = rgb(theme.text);
  for (const color of theme.colors) {
    const mark = rgb(color);
    assert.ok(contrast(mark, bg) >= 3, 'Chart mark contrast: ' + color);
    for (const alpha of [0, .08, .16, .24, .32]) {
      const fill = mark.map((n, i) => n * alpha + bg[i] * (1 - alpha));
      assert.ok(contrast(text, fill) >= 4.5, 'Heatmap text contrast: ' + color);
    }
  }
}
console.log('Chart encoding: domains, gaps, shares and both-theme contrast passed.');
