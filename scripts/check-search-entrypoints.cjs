// Regression checks for Google/bookmark entry points. Read-only; never enters auth flows.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.env.SITE_CHECK_BASE || "http://127.0.0.1:3000";
const oldProfiles = ["/about", "/authors/almas-kasymzhanov"];
const results = [];
async function request(path, options = {}) {
  return fetch(new URL(path, base), { signal: AbortSignal.timeout(60000), ...options });
}
async function check(path, run) {
  try { await run(); results.push({ path, ok: true }); }
  catch (error) { results.push({ path, ok: false, error: error.message }); console.error("FAIL", path, error.message); }
}
(async () => {
  for (const prefix of ["", "/en"]) {
    const home = prefix || "/";
    const target = home + "#about";
    for (const profile of oldProfiles) {
      for (const suffix of ["", "/", "?utm_source=google"]) {
        const path = prefix + profile + suffix;
        await check(path, async () => {
          let response = await request(path, { redirect: "manual" });
          // Next normalizes a trailing slash before applying the legacy redirect.
          if (suffix === "/") {
            assert.equal(response.status, 308);
            response = await request(response.headers.get("location"), { redirect: "manual" });
          }
          assert.equal(response.status, 308, "permanent HTTP redirect");
          const location = new URL(response.headers.get("location"), base);
          assert.equal(location.pathname, home);
          assert.equal(location.hash, "#about");
          if (suffix.startsWith("?")) assert.equal(location.searchParams.get("utm_source"), "google");
        });
      }
    }
    await check(home, async () => {
      const response = await request(target);
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.ok(html.includes('id="about"'));
      assert.ok(html.includes(prefix ? "Hi, I’m Almas." : "Привет, я Алмас."));
      assert.ok(html.includes("ProofTotal"));
      assert.ok(html.includes(`rel="canonical" href="https://kasymzhanov.com${home === "/" ? "" : home}"`) || html.includes(`rel="canonical" href="https://kasymzhanov.com${home}"`));
      assert.doesNotMatch(html, /NewsMediaOrganization|независимое дата-медиа|About the publication|Об издании/);
      assert.ok(html.includes(prefix ? "personal blog" : "Личный блог"));
    });
  }
  await check("/sitemap.xml", async () => {
    const response = await request("/sitemap.xml");
    assert.equal(response.status, 200);
    const xml = await response.text();
    assert.doesNotMatch(xml, /\/(?:about|authors\/almas-kasymzhanov)(?:<|\")/);
    assert.match(xml, /\/standards</);
    assert.match(xml, /\/en</);
  });
  await check("/en/blog/wb-dual-use", async () => {
    const response = await request("/en/blog/wb-dual-use", { redirect: "manual" });
    assert.equal(response.status, 307, "unpublished translation uses the current Russian article");
    assert.equal(new URL(response.headers.get("location"), base).pathname, "/blog/wb-dual-use");
  });
  for (const path of ["/llms.txt", "/llms-full.txt"]) await check(path, async () => {
    const response = await request(path);
    assert.equal(response.status, 200);
    const text = await response.text();
    assert.ok(text.includes("ProofTotal"));
    assert.doesNotMatch(text.split("## Блог")[0].split("АНАТОМИЯ")[0], /независимого дата-медиа|Основатель.*Brock UI/);
  });
  // A deliberately closed client report must remain closed, not redirect to a public page.
  for (const path of ["/analiz", "/not-a-real-page-entrypoint-check"]) await check(path, async () => {
    assert.equal((await request(path)).status, 404);
  });
  fs.mkdirSync(".cache", { recursive: true });
  fs.writeFileSync(".cache/search-entrypoint-check.json", JSON.stringify({ base, results }, null, 2));
  console.log(`${results.filter(r => r.ok).length}/${results.length} search entry-point checks passed`);
  if (results.some(r => !r.ok)) process.exitCode = 1;
})();
