import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";

const roots = [
  "app/reports",
  "app/электроника/report",
];

function walk(path) {
  return readdirSync(path).flatMap((name) => {
    const child = join(path, name);
    return statSync(child).isDirectory() ? walk(child) : [child];
  });
}

const files = roots
  .flatMap(walk)
  .filter((path) => [".ts", ".tsx", ".md"].includes(extname(path)));

const replacements = [
  [/https:\/\/redstat\.kz/gi, "https://kasymzhanov.com/kaspi"],
  [/https:\/\/mpstats\.io(?:\/integrations\/docs\/description\/)?/gi, "https://kasymzhanov.com/kaspi"],
  [/RedStat Backend API \(ClickHouse, Kaspi\.kz\)/gi, "агрегированные рыночные данные Kaspi.kz"],
  [/RedStat Backend API/gi, "агрегированные рыночные данные"],
  [/RedStat\s*\/\s*ClickHouse/gi, "агрегированные рыночные данные Kaspi.kz"],
  [/RedStat API/gi, "агрегированные рыночные данные"],
  [/RedStat Intelligence/gi, "Аналитика Kaspi Market"],
  [/REDSTAT\s*·\s*KASPI\.KZ/gi, "АГРЕГИРОВАННЫЕ ДАННЫЕ · KASPI.KZ"],
  [/MPStats Insight/gi, "агрегированные данные Wildberries"],
  [/MPStats API/gi, "агрегированные данные Wildberries"],
  [/MPStats/gi, "агрегированные данные Wildberries"],
  [/MPStat\b/gi, "агрегированные данные Wildberries"],
  [/RedStat\.kz/gi, "агрегированные данные Kaspi.kz"],
  [/Redstat\.kz/gi, "агрегированные данные Kaspi.kz"],
  [/RedStat/gi, "агрегированные рыночные данные"],
  [/Redstat/gi, "агрегированные рыночные данные"],
  [/AlgaTop/gi, "практические материалы для продавцов"],
  [/algatop\.kz\/blog/gi, "отраслевые материалы для продавцов"],
  [/nisha\.kz/gi, "отраслевые обзоры"],
  [/iBot\.kz/gi, "инструменты мониторинга"],
  [/Minea/gi, "библиотеки рекламных креативов"],
  [/ClickHouse/gi, "агрегированный массив данных"],
  [/\/api\/niche\/history/gi, "помесячный ряд"],
  [/\/api\/niche\/forecast/gi, "сезонная оценка"],
  [/\/category-segments/gi, "ценовые сегменты"],
  [/\/category-brand/gi, "структура брендов"],
  [/\/sku-v1/gi, "товарный срез"],
  [/\/forecast\b/gi, "прогнозный ряд"],
  [/последний доступный в агрегированные рыночные данные/gi, "последний доступный рыночный срез"],
  [/появятся в агрегированные рыночные данные/gi, "появятся в следующем рыночном срезе"],
  [/нет в агрегированные рыночные данные/gi, "нет в доступном рыночном срезе"],
  [/агрегированные рыночные данные индексирует/gi, "рыночный срез включает"],
  [/API агрегированные данные Wildberries/gi, "агрегированные данные Wildberries"],
  [/Методика API:/gi, "Данные рынка:"],
  [/прогноз агрегированные рыночные данные/gi, "расчётный прогноз"],
  [/модель агрегированные рыночные данные/gi, "расчётная модель"],
  [/через агрегированные рыночные данные/gi, "по агрегированным рыночным данным"],
  [/на агрегированные рыночные данные/gi, "по агрегированным рыночным данным"],
  [/в агрегированные рыночные данные/gi, "в доступном рыночном срезе"],
  [/данных агрегированные рыночные данные и агрегированные данные Wildberries/gi, "агрегированных данных Kaspi и Wildberries"],
  [/<a href="https:\/\/kasymzhanov\.com\/kaspi"[^>]*>(агрегированные[^<]+)<\/a>/gi, "$1"],
];

const changed = [];
for (const file of files) {
  const before = readFileSync(file, "utf8");
  const after = replacements.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    before,
  );
  if (after !== before) {
    writeFileSync(file, after, "utf8");
    changed.push(file);
  }
}

console.log(`Scrubbed ${changed.length} public report files.`);
for (const file of changed) console.log(file);
