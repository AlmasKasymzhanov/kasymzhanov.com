// Render the real reading components without a browser or database.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup: render } = require("react-dom/server");

const resolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...args) {
  return resolve.call(this, name.startsWith("@/") ? path.join(process.cwd(), name.slice(2)) : name, ...args);
};
for (const ext of [".ts", ".tsx"]) {
  require.extensions[ext] = function (module, filename) {
    const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2022 },
      fileName: filename,
    });
    module._compile(outputText, filename);
  };
}

const { BarChart } = require("../components/charts/bar-chart.tsx");
const { ColumnChart } = require("../components/charts/column-chart.tsx");
const { LineChart } = require("../components/charts/line-chart.tsx");
const { ChartTooltipContent } = require("../components/charts/chart-tooltip.tsx");
const { ArticleHeader } = require("../components/canon/article-header.tsx");

for (const Chart of [BarChart, ColumnChart]) {
  const html = render(React.createElement(Chart, {
    data: [{ label: "Positive", value: 12.5 }, { label: "Zero", value: 0 }, { label: "Negative", value: -7.25 }],
    formatValue: value => `${value} mln`, animation: { enabled: false },
  }));
  for (const value of ["Positive", "Zero", "Negative", "12.5 mln", "0 mln", "-7.25 mln"]) assert.ok(html.includes(value), value);
  assert.equal((html.match(/role="graphics-symbol"/g) || []).length, 3, "Zero remains a reachable mark");
  assert.ok(html.includes('role="group"'), "The plot must not hide interactive descendants as an image");
  assert.ok(!html.includes("NaN") && !html.includes("Infinity"));
  assert.doesNotThrow(() => render(React.createElement(Chart, { data: [0, 0, 0] })));
}

const line = render(React.createElement(LineChart, {
  x: ["Jan", "Feb", "Mar"], xScale: "point",
  data: [{ name: "Observed", data: [0, null, 25] }, { name: "Forecast", data: [2, 10, 30] }],
  animation: { enabled: false }, formatValue: value => `${value} units`,
}));
assert.ok(line.includes('role="group"'));
assert.ok(line.includes("0 units") && line.includes("30 units"));
assert.ok(!line.includes("NaN") && !line.includes("Infinity"));
assert.equal((line.match(/aria-roledescription="data point"/g) || []).length, 5, "Missing data is not turned into a zero point");

const tooltip = render(React.createElement(ChartTooltipContent, {
  title: "June", rows: [{ label: "Revenue", value: "0 ₸" }, { label: "Growth", value: "−39.4%" }], note: "Estimate",
}));
for (const text of ["June", "Revenue", "0 ₸", "−39.4%", "Estimate"]) assert.ok(tooltip.includes(text));

const english = render(React.createElement(ArticleHeader, {
  slug: "wb-dual-use", locale: "en", kicker: "Research", title: "English article title",
  subtitle: "English introduction", date: "July 20, 2026", readMin: 15,
}));
assert.ok(english.includes("English article title"), "Missing catalogue translation must not replace an existing English heading with Russian");
assert.ok(english.toLowerCase().includes('datetime="2026-07-20"'));
console.log("PASS: chart rendering, zero/negative/missing values, accessible marks, exact tooltip values, and English title fallback.");
