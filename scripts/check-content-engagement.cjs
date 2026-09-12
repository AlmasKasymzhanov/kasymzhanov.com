// Storage compatibility and public URLs, without writing likes/comments/shares.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  module._compile(outputText, filename);
};
const { contentSlug, contentLoginHref, contentShareUrl } = require('../lib/content-identity.ts');
const { ARTICLES } = require('../lib/article-catalogue.ts');
for (const article of ARTICLES) {
  assert.equal(contentSlug(article.href), article.slug, 'Published counters retain their storage key');
  assert.equal(contentSlug('/en' + article.href), article.slug, 'Translations retain the existing shared discussion');
}
assert.notEqual(contentSlug('/tools/wb-analyzer'), contentSlug('/tools/wb-analyzer/guide'));
assert.notEqual(contentSlug('/tools/mpstats-api'), contentSlug('/tools/wb-analyzer/guide'));
assert.equal(contentSlug('/web-analyzer/guide'), contentSlug('/tools/wb-analyzer/guide'));
assert.equal(contentSlug('/электроника/report/2026/лето-осень'), 'kaspi-electronics-2026');
for (const path of ['/reports/kaspi-camping', '/tools/wb-analyzer/guide', '/en/blog/kaspi-mcp']) {
  const login = new URL(contentLoginHref(path), 'https://kasymzhanov.com');
  assert.equal(login.searchParams.get('next'), path + '#comments');
  assert.equal(login.pathname, path.startsWith('/en/') ? '/en/login' : '/login');
  const expected = 'https://kasymzhanov.com' + path;
  for (const canonical of [null, '/', 'https://kasymzhanov.com/', 'https://other.example' + path]) {
    assert.equal(contentShareUrl(path + '?utm_source=test#comments', canonical), expected);
  }
  assert.equal(contentShareUrl(path, expected + '?utm_source=test#comments'), expected);
}
assert.equal(contentShareUrl('/en/blog/kaspi-mcp', 'https://kasymzhanov.com/blog/kaspi-mcp'), 'https://kasymzhanov.com/en/blog/kaspi-mcp');
assert.equal(contentShareUrl('/web-analyzer/guide', 'https://kasymzhanov.com/tools/wb-analyzer/guide'), 'https://kasymzhanov.com/tools/wb-analyzer/guide');
console.log('PASS: published storage keys, guide isolation, aliases, localized login returns, and clean material share URLs.');

// Optional local server coverage. Uses the existing full reading-page inventory.
if (process.argv.includes('--routes')) (async () => {
  const routes = JSON.parse(fs.readFileSync('.cache/typography-browser-audit.json', 'utf8')).desktop.map(row => row.route);
  const results = [];
  for (const route of routes) {
    const response = await fetch('http://127.0.0.1:3000' + route);
    const html = await response.text();
    const keys = [...html.matchAll(/data-content-engagement="([^"]+)"/g)].map(match => match[1]);
    results.push({ route, status: response.status, keys });
    assert.equal(response.status, 200, route);
    assert.deepEqual(keys, [contentSlug(route)], route + ': exactly one material discussion');
    console.log('PASS', route);
  }
  fs.writeFileSync('.cache/content-engagement-routes.json', JSON.stringify(results, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
