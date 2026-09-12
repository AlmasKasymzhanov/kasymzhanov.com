const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const resolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...args) {
  return resolve.call(this, name.startsWith('@/') ? path.join(process.cwd(), name.slice(2)) : name, ...args);
};
require.extensions['.ts'] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  module._compile(outputText, filename);
};
const { buildRss, rssResponse } = require('../lib/rss.ts');
const { getPublishedArticles } = require('../lib/article-catalogue.ts');
fs.mkdirSync('.cache', { recursive: true });
for (const locale of ['ru', 'en']) {
  const xml = buildRss(locale);
  const articles = getPublishedArticles(locale);
  assert.equal((xml.match(/<item>/g) || []).length, articles.length);
  assert.ok(xml.includes('rel="self" type="application/rss+xml"'));
  assert.ok(!xml.includes('Invalid Date') && !xml.includes('<enclosure'));
  const links = [...xml.matchAll(/<guid isPermaLink="true">([^<]+)<\/guid>/g)].map(match => match[1]);
  assert.equal(new Set(links).size, articles.length, 'Every material has a stable unique ID');
  assert.ok(links.every(link => link.startsWith(`https://kasymzhanov.com/${locale === 'en' ? 'en/' : ''}`)));
  if (locale === 'ru') assert.ok(links.some(link => link.endsWith('/reports/kaspi-top-30-june-2026')), 'Public research belongs in RSS');
  assert.equal(rssResponse(locale).headers.get('content-type'), 'application/rss+xml; charset=utf-8');
  fs.writeFileSync(`.cache/rss-${locale}.xml`, xml);
  console.log(`PASS RSS ${locale}: ${articles.length} published materials, unique links, valid dates and XML content type`);
}
