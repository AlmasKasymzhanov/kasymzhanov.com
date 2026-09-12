// Read-only smoke check of the public reading surfaces against the local server.
const fs = require("node:fs");
const path = require("node:path");
const base = process.env.SITE_CHECK_BASE || "http://127.0.0.1:3000";
const bilingual = ["", "/latest", "/market", "/kaspi", "/kaspi/fast", "/kaspi/slow", "/kaspi/research", "/kaspi/snapshots", "/technology", "/kazakhstan", "/tools", "/about", "/newsletter", "/standards", "/authors/almas-kasymzhanov", "/search?q=Kaspi"];
const routes = bilingual.flatMap(route => [route || "/", `/en${route}`]);
function pages(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) pages(file);
    else if (item.name === "page.tsx") routes.push("/" + path.relative("app", path.dirname(file)).split(path.sep).join("/"));
  }
}
for (const dir of ["app/blog", "app/en/blog", "app/reports", "app/web-analyzer", "app/tools", "app/sellers-forum"]) pages(dir);
routes.push("/clients/elki", "/электроника/report/2026/лето-осень", "/analytics", "/contacts", "/privacy", "/terms", "/login", "/en/login", "/data", "/en/data", "/subscribe", "/stream-3", "/stream-4");
const unique = [...new Set(routes)];
const results = [];
async function fetchPage(route) {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const response = await fetch(base + route, { signal: AbortSignal.timeout(90000) });
      const html = await response.text();
      if (response.status >= 500 && attempt < 3) continue;
      return { response, html };
    } catch (error) {
      if (attempt === 3) throw error;
      // The development server can briefly disconnect while Next restarts its worker.
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}
async function worker() {
  while (unique.length) {
    const route = unique.shift();
    try {
      const { response, html } = await fetchPage(route);
      const mains = (html.match(/<main[\s>]/g) || []).length;
      const staleIdentity = /независимо(?:е|го) (?:дата-медиа|дата-издани)|independent (?:data media|publication)|Об издании|About the publication/i.test(html);
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
      const canonicalOk = !canonical || new URL(canonical).pathname.replace(/\/$/, "") === new URL(response.url).pathname.replace(/\/$/, "");
      const ok = response.status === 200 && mains === 1 && html.includes('personal-rail') && !html.includes('href="/kz"') && !staleIdentity && canonicalOk;
      results.push({ route, finalUrl: response.url, status: response.status, mains, staleIdentity, canonical, canonicalOk, ok });
      if (!ok) console.log("FAIL", route, response.status, "main:", mains);
      else if (results.length % 10 === 0) console.log(`Checked ${results.length} routes`);
    } catch (error) { results.push({ route, ok: false, error: error.message }); console.log("FAIL", route, error.message); }
  }
}
(async () => {
  await Promise.all([worker(), worker()]);
  const kz = await fetch(base + "/kz", { redirect: "manual" });
  const redirectOk = [307, 308].includes(kz.status) && kz.headers.get("location") === "/";
  console.log(`${results.filter(r => r.ok).length}/${results.length} public routes passed; KZ redirect: ${redirectOk ? "PASS" : "FAIL"}`);
  fs.mkdirSync(".cache", { recursive: true });
  fs.writeFileSync(".cache/personal-route-check.json", JSON.stringify({ results, redirectOk }, null, 2));
  if (results.some(r => !r.ok) || !redirectOk) process.exitCode = 1;
})();
