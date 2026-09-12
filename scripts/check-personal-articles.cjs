const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function loadSource(file, globals = {}) {
  const exports = {};
  const { outputText } = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  vm.runInNewContext(outputText, { exports, ...globals }, { filename: file });
  return exports;
}

const { selectPersonalArticleSections: select } = loadSource("lib/personal-article-sections.ts");
const articles = Array.from({ length: 7 }, (_, index) => ({
  slug: `article-${index}`,
  datePublished: `2026-07-0${index + 1}`,
}));
const slugs = (items) => Array.from(items, (article) => article.slug);
const originalOrder = slugs(articles);
let sections = select(articles, { "article-0": 100, "article-1": 30, "article-2": 30, "article-6": 2 });
assert.deepEqual(slugs(sections.popular), ["article-0", "article-2", "article-1"]);
assert.deepEqual(slugs(sections.recent), ["article-6", "article-5", "article-4"]);
assert.deepEqual(slugs(articles), originalOrder, "Selection must not reorder the shared catalogue");
assert.equal(new Set([...sections.popular, ...sections.recent].map((a) => a.slug)).size, 6);
sections = select(articles, {});
assert.equal(sections.popular.length, 0, "Unavailable counts must not fabricate popularity");
assert.deepEqual(slugs(sections.recent), ["article-6", "article-5", "article-4"]);
assert.equal(select(articles, { "article-0": NaN, "article-1": Infinity, "article-2": -1, "article-3": 0 }).popular.length, 0);
assert.equal(select([], {}).recent.length, 0);

function trackerHarness({ mode = "production", hostname = "kasymzhanov.com", visibility = "visible" } = {}) {
  const requests = [];
  const listeners = new Map();
  const ref = { current: null };
  let effect;
  const document = {
    visibilityState: visibility,
    addEventListener: (type, callback) => listeners.set(type, callback),
    removeEventListener: (type, callback) => { if (listeners.get(type) === callback) listeners.delete(type); },
  };
  const { ArticleViewTracker } = loadSource("components/article-view-tracker.tsx", {
    require: () => ({ useRef: () => ref, useEffect: (callback) => { effect = callback; } }),
    process: { env: { NODE_ENV: mode } },
    window: { location: { hostname } },
    document,
    fetch: (url, options) => { requests.push({ url, options }); return Promise.resolve({ ok: true }); },
  });
  return {
    requests,
    listeners,
    mount(slug = "article-0") { ArticleViewTracker({ slug }); return effect(); },
    visible() { document.visibilityState = "visible"; listeners.get("visibilitychange")?.(); },
  };
}

for (const config of [{ mode: "development" }, { hostname: "localhost" }, { hostname: "127.0.0.1" }, { hostname: "[::1]" }]) {
  const tracker = trackerHarness(config);
  tracker.mount();
  assert.equal(tracker.requests.length, 0, "Local previews must not increment public counts");
}
const visible = trackerHarness();
const cleanup = visible.mount();
visible.visible();
cleanup();
assert.equal(visible.listeners.size, 0);
visible.mount(); // React effect replay with the same component ref.
assert.equal(visible.requests.length, 1, "Effect replay and tab switching must not double count");
assert.equal(visible.requests[0].url, "/api/views");
assert.equal(visible.requests[0].options.method, "POST");
assert.equal(JSON.parse(visible.requests[0].options.body).slug, "article-0");
visible.mount("article-1");
assert.equal(visible.requests.length, 2, "Opening a different article counts a new visit");
const hidden = trackerHarness({ visibility: "hidden" });
hidden.mount();
assert.equal(hidden.requests.length, 0);
hidden.visible();
assert.equal(hidden.requests.length, 1);

console.log("PASS: article ranking, distinct sections, missing data, and view tracking lifecycle (mocked; no database writes).");
