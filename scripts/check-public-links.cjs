// Follow public HTML links from the reading-route audit, without entering account actions.
const fs = require("node:fs");
const base = process.env.SITE_CHECK_BASE || "http://127.0.0.1:3000";
const seeds = JSON.parse(fs.readFileSync(".cache/personal-route-check.json", "utf8")).results;
const queue = [...new Set(seeds.map(row => row.route))];
const seen = new Set(queue);
const results = [];
const excluded = /^\/(?:api|auth|i|courses|course-3|social|export|canon)(?:\/|$)/;
async function worker() {
  while (queue.length) {
    const route = queue.shift();
    try {
      const response = await fetch(new URL(route, base), { signal: AbortSignal.timeout(60000) });
      const html = await response.text();
      results.push({ route, status: response.status, finalUrl: response.url, ok: response.ok });
      for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
        const href = match[1].replaceAll("&amp;", "&");
        if (!href || href.startsWith("#")) continue;
        const url = new URL(href, response.url);
        if (![new URL(base).origin, "https://kasymzhanov.com", "https://www.kasymzhanov.com"].includes(url.origin)) continue;
        if (excluded.test(url.pathname) || /\.[a-z0-9]+$/i.test(url.pathname)) continue;
        // Query variants do not represent another page; this avoids unbounded search URLs.
        const next = url.pathname;
        if (!seen.has(next)) { seen.add(next); queue.push(next); }
      }
    } catch (error) { results.push({ route, ok: false, error: error.message }); }
  }
}
(async () => {
  await Promise.all([worker(), worker(), worker()]);
  const failed = results.filter(row => !row.ok);
  for (const row of failed) console.error("FAIL", row);
  fs.writeFileSync(".cache/public-link-check.json", JSON.stringify({ base, results }, null, 2));
  console.log(`${results.length - failed.length}/${results.length} public page links passed`);
  if (failed.length) process.exitCode = 1;
})();
