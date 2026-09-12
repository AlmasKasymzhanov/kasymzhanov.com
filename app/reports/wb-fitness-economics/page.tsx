"use client";
import { ResearchSection, ResearchFact, ResearchNote, ResearchFigure } from "@/components/canon/research-editorial";
import { ResearchReadingTime } from "@/components/canon/research-reading-time";


/* ───── design tokens ───── */
const C = {
  bg: "var(--personal-paper)", surface: "var(--report-surface)", border: "var(--personal-border)",
  accent: "var(--personal-text)", green: "var(--personal-text)", text: "var(--personal-text)",
  dim: "var(--personal-muted)", red: "var(--personal-text)", amber: "var(--personal-text)",
  blue: "var(--personal-text)", pink: "var(--personal-text)", cyan: "var(--personal-text)",
  wb: "var(--personal-text)",
};

const sP: React.CSSProperties = { fontSize: "var(--reading-body-size)", lineHeight: 1.75, color: "var(--personal-text)", margin: "0 0 12px" };
const sCard: React.CSSProperties = { margin: "24px 0", padding: 0 };
const sBadge = (_color: string): React.CSSProperties => ({ display: "inline", color: "var(--personal-muted)", fontSize: 12, fontWeight: 400 });

function DataTable({ headers, rows, highlight }: { headers: string[]; rows: (string | number)[][]; highlight?: number }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: 16 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>{headers.map((h, i) => (
            <th key={i} style={{ padding: "10px 12px", textAlign: "left", color: C.dim, fontWeight: 500, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", fontSize: 11 }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: highlight !== undefined && ri === highlight ? `color-mix(in srgb, ${C.accent} 7%, transparent)` : "transparent" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: "10px 12px", textAlign: "left", color: ci === 0 ? C.text : "var(--personal-text)", borderBottom: `1px solid color-mix(in srgb, ${C.border} 13%, transparent)`, fontWeight: ci === 0 ? 500 : 400, whiteSpace: ci === 0 ? "nowrap" : "normal" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PriceScenario({ price, commission, commRate, net, cost, profit, margin, verdict }: {
  price: string; commission: string; commRate: string; net: string; cost: string; profit: string; margin: string; verdict: string;
}) { return <ResearchNote title={`Цена ${price}`}><div className="research-facts"><ResearchFact label={`Комиссия ${commRate}`} value={`−${commission}`} /><ResearchFact label="Нетто" value={net} /><ResearchFact label="Себестоимость" value={cost} /><ResearchFact label="Прибыль" value={profit} /><ResearchFact label="Маржа" value={margin} /></div><p>{verdict}</p></ResearchNote>; }

export default function WbFitnessEconomicsPage() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "var(--font-body)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* HEADER */}
        <div className="research-header" style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={sBadge(C.wb)}>Wildberries</span>
            <span style={sBadge(C.amber)}>Юнит-экономика</span>
            <span style={sBadge(C.green)}>1688 → FBO Россия</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 500, margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Юнит-экономика: фитнес-набор для Wildberries
          </h1>
          <p className="research-lead" style={{ fontSize: 15, color: C.dim, margin: 0, lineHeight: 1.6 }}>
            Детальный расчёт себестоимости и маржи по коммерческому предложению от фабрики (1688.com). Целевой рынок: Wildberries Россия, FBO.
          </p>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 12 }}>
            Дата расчёта: 9 апреля 2026 · Данные поставщика: коммерческое предложение от фабрики
          </div>

<a href="/#about" className="research-author">Алмас Касымжанов</a>
<ResearchReadingTime />
</div>

        {/* ═══ SUPPLIER QUOTE ═══ */}
        <div style={{ ...sCard }}>
          <h2 style={{ fontSize: 15, fontWeight: 400, color: C.amber, margin: "0 0 16px" }}>Коммерческое предложение от фабрики (500 комплектов)</h2>

          <DataTable headers={["#", "Позиция", "Материал", "Размер", "Кол-во", "Цена/шт", "Сумма"]} rows={[
            ["1", "Йога-ролик (колонна для МФР)", "EVA-пена", "45 × 15 см", "500", "¥21.00", "¥10 500"],
            ["2", "Массажный мяч с шипами", "PVC", "7.5 см / 65 г", "500", "¥2.80", "¥1 400"],
            ["3", "Эластичная фитнес-лента", "TPE", "600 × 50 × 1.1 мм", "500", "¥1.80", "¥900"],
            ["4", "Сетчатый мешок для хранения", "—", "45 × 15 см", "500", "¥2.60", "¥1 300"],
            ["5", "Упаковочная коробка", "—", "54 × 16 × 16 см", "500", "¥2.80", "¥1 400"],
            ["6", "Упаковочный труд", "—", "—", "500", "¥1.00", "¥500"],
            ["7", "Сервисный сбор 3%", "—", "—", "—", "—", "¥480"],
            ["8", "Логистика внутри Китая (56 коробок)", "—", "—", "56 кор.", "—", "¥8 400"],
          ]} />

          <div style={{ paddingLeft: 14, margin: "16px 0", fontSize: 14, fontWeight: 400, color: C.text }}>
            Итого за 500 комплектов: ¥24 880 ($3 554) · На один комплект: ¥49.76
          </div>

          <p style={{ ...sP, fontSize: 12, color: C.dim, marginTop: 8 }}>
            Фабрика выставляет quote на комплекты (500 шт). Из каждого комплекта получаем <strong style={{ color: C.text }}>3 отдельных SKU для продажи на WB</strong>: йога-ролик, массажный мяч, фитнес-резинки. Сетчатый мешок и коробка — упаковка. Стратегия: 3 отдельные карточки на WB = 3 точки входа в категорию «Спортивные товары».
          </p>
        </div>

        {/* ═══ PARAMETERS ═══ */}
        <div style={{ ...sCard }}>
          <h2 style={{ fontSize: 15, fontWeight: 400, color: C.blue, margin: "0 0 16px" }}>Параметры расчёта</h2>
          <DataTable headers={["Параметр", "Значение", "Примечание"]} rows={[
            ["Курс CNY → RUB", "1¥ = 12.5 ₽", "Апрель 2026"],
            ["Курс USD → RUB", "1$ = 87 ₽", ""],
            ["Карго Китай → Москва (FBO)", "$3/кг = 261 ₽/кг", "Авиа-карго до склада WB"],
            ["Расчёт веса", "Max (факт, объёмный)", "Объёмный = Д×Ш×В / 5000"],
            ["Факт. вес комплекта", "~0.9 кг", "Ролик 500г + мяч 65г + лента 100г + мешок 30г + коробка 200г"],
            ["Объёмный вес комплекта", "2.76 кг", "54 × 16 × 16 см ÷ 5000"],
            ["Вес для расчёта карго", "2.76 кг", "Объёмный > фактического"],
            ["Комиссия WB (Спорт)", "15%", "Категория «Спортивные товары»"],
            ["WB FBO логистика", "80 ₽", "Доставка до покупателя (средняя, спорт)"],
            ["WB хранение (5 дней оборот)", "15 ₽", "Приблизительно"],
          ]} />
        </div>

        {/* ═══ INDIVIDUAL ITEMS — PRIMARY ═══ */}
        <div style={{ ...sCard, marginTop: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 400, color: C.text, margin: "0 0 8px" }}>Юнит-экономика: 3 отдельных SKU на Wildberries</h2>
          <p style={sP}>Из 500 комплектов фабрики получаем <strong style={{ color: C.text }}>500 роликов + 500 мячей + 500 резинок</strong> — каждый товар идёт как отдельная карточка на WB. Три точки входа в категорию, три потока продаж, три пула отзывов.</p>

          <div style={{ ...sCard }}>
            <h3 style={{ fontSize: 15, fontWeight: 400, color: C.cyan, margin: "0 0 12px" }}>Йога-ролик EVA 45×15 см (¥21.00)</h3>
            <DataTable headers={["Статья", "Расчёт", "Сумма"]} rows={[
              ["Закупка", "21¥ × 12.5", "263 ₽"],
              ["Упаковка + мешок", "~(2.60 + 2.80 + 1.00)¥ × 12.5 / 3 (доля ролика)", "27 ₽"],
              ["Сервис 3%", "", "9 ₽"],
              ["Доля логистики КНР", "~¥8 × 12.5", "100 ₽"],
              ["Карго (объёмный вес 46×15×15÷5000 = 2.07 кг)", "2.07 × 261", "540 ₽"],
              ["WB FBO логистика", "", "80 ₽"],
              ["WB хранение", "", "15 ₽"],
            ]} />
            <div style={{ paddingLeft: 14, margin: "8px 0 16px", fontSize: 14, fontWeight: 400, color: C.text }}>
              Себестоимость: 1 034 ₽
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                { p: "990 ₽", profit: "−192 ₽", m: "−19.4%", v: "" },
                { p: "1 290 ₽", profit: "63 ₽", m: "4.9%", v: "" },
                { p: "1 490 ₽", profit: "233 ₽", m: "15.6%", v: "" },
                { p: "1 790 ₽", profit: "488 ₽", m: "27.3%", v: "" },
                { p: "1 990 ₽", profit: "658 ₽", m: "33.1%", v: "" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "16px 0", fontSize: 12 }}>
                  <div style={{ fontWeight: 400, color: C.text }}>{s.p}</div>
                  <div style={{ color: s.v === "" ? C.green : s.v === "" ? C.amber : C.red }}>{s.profit} · {s.m} {s.v}</div>
                </div>
              ))}
            </div>
            <p style={{ ...sP, fontSize: 12, marginTop: 12 }}>
              <strong style={{ color: C.text }}>Референс WB:</strong> арт. 343128594 — «МФР ролик массажный валик 45см» (Валики спортивные). Типичные цены аналогов: 800–1 800 ₽. Оптимальная цена: <strong style={{ color: C.green }}>1 490–1 790 ₽</strong> (маржа 16–27%).
            </p>
          </div>

          <div style={{ ...sCard }}>
            <h3 style={{ fontSize: 15, fontWeight: 400, color: C.pink, margin: "0 0 12px" }}>Массажный мяч с шипами PVC 7.5 см (¥2.80)</h3>
            <DataTable headers={["Статья", "Расчёт", "Сумма"]} rows={[
              ["Закупка", "2.80¥ × 12.5", "35 ₽"],
              ["Упаковка (инд.)", "~¥2 × 12.5", "25 ₽"],
              ["Сервис 3%", "", "2 ₽"],
              ["Доля логистики КНР", "", "30 ₽"],
              ["Карго (лёгкий: 0.1 кг)", "0.1 × 261", "26 ₽"],
              ["WB FBO логистика", "", "50 ₽"],
              ["WB хранение", "", "10 ₽"],
            ]} />
            <div style={{ paddingLeft: 14, margin: "8px 0 16px", fontSize: 14, fontWeight: 400, color: C.text }}>
              Себестоимость: 178 ₽
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                { p: "290 ₽", profit: "69 ₽", m: "23.6%", v: "" },
                { p: "390 ₽", profit: "154 ₽", m: "39.3%", v: "" },
                { p: "490 ₽", profit: "239 ₽", m: "48.7%", v: "" },
                { p: "590 ₽", profit: "324 ₽", m: "54.8%", v: "" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "16px 0", fontSize: 12 }}>
                  <div style={{ fontWeight: 400, color: C.text }}>{s.p}</div>
                  <div style={{ color: C.green }}>{s.profit} · {s.m} {s.v}</div>
                </div>
              ))}
            </div>
            <p style={{ ...sP, fontSize: 12, marginTop: 12 }}>
              <strong style={{ color: C.text }}>Референс WB:</strong> арт. 288688789 — «Мяч массажный с шипами для МФР» (Мячи спортивные). Себестоимость мизерная (178 ₽). Даже при цене 290 ₽ маржа 24%. <strong style={{ color: C.green }}>Лучшая юнитка среди всех отдельных позиций.</strong>
            </p>
          </div>

          <div style={{ ...sCard }}>
            <h3 style={{ fontSize: 15, fontWeight: 400, color: C.accent, margin: "0 0 12px" }}>Фитнес-резинки набор 5 шт. TPE (¥1.80)</h3>
            <DataTable headers={["Статья", "Расчёт", "Сумма"]} rows={[
              ["Закупка", "1.80¥ × 12.5", "23 ₽"],
              ["Упаковка (пакет + инструкция)", "~¥2 × 12.5", "25 ₽"],
              ["Сервис 3%", "", "1 ₽"],
              ["Доля логистики КНР", "", "30 ₽"],
              ["Карго (лёгкий: 0.15 кг)", "0.15 × 261", "39 ₽"],
              ["WB FBO логистика", "", "50 ₽"],
              ["WB хранение", "", "10 ₽"],
            ]} />
            <div style={{ paddingLeft: 14, margin: "8px 0 16px", fontSize: 14, fontWeight: 400, color: C.text }}>
              Себестоимость: 178 ₽
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                { p: "490 ₽", profit: "239 ₽", m: "48.7%", v: "" },
                { p: "690 ₽", profit: "409 ₽", m: "59.2%", v: "" },
                { p: "990 ₽", profit: "664 ₽", m: "67.0%", v: "" },
                { p: "1 290 ₽", profit: "919 ₽", m: "71.2%", v: "" },
                { p: "1 590 ₽", profit: "1 174 ₽", m: "73.8%", v: "" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "16px 0", fontSize: 12 }}>
                  <div style={{ fontWeight: 400, color: C.text }}>{s.p}</div>
                  <div style={{ color: C.green }}>{s.profit} · {s.m} {s.v}</div>
                </div>
              ))}
            </div>
            <p style={{ ...sP, fontSize: 12, marginTop: 12 }}>
              <strong style={{ color: C.text }}>Референс WB:</strong> арт. 273928439 — «Фитнес резинки» набор 5 шт. (Эспандеры). Типичные цены: 390–1 590 ₽. Себестоимость 178 ₽ при закупке ¥1.80/шт. <strong style={{ color: C.green }}>Маржа 49–74% — абсолютный чемпион по рентабельности.</strong> Лёгкие, компактные, минимальное карго.
            </p>
          </div>
        </div>

        {/* ═══ SUMMARY ═══ */}
        <div style={{ ...sCard, marginTop: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 400, color: C.accent, margin: "0 0 20px" }}>Сводная таблица: 3 SKU</h2>
          <DataTable headers={["SKU", "Себестоимость", "Оптим. цена WB", "Прибыль/шт", "Маржа", "Вердикт"]} rows={[
            ["Фитнес-резинки 5 шт.", "178 ₽", "690 ₽", "409 ₽", "59.2%", " Лучшая юнитка — чемпион"],
            ["Массажный мяч с шипами", "178 ₽", "390 ₽", "154 ₽", "39.3%", " Отличная маржа"],
            ["Йога-ролик EVA 45 см", "1 034 ₽", "1 490 ₽", "233 ₽", "15.6%", " Средняя маржа (тяжёлый)"],
          ]} highlight={0} />

          <div style={{ paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
            Три отдельные карточки на WB = три потока продаж + три набора отзывов. Лёгкие товары (резинки 100 г, мяч 65 г) имеют минимальное карго и максимальную маржу. Ролик тяжелее (объёмный вес 2.07 кг), но всё равно в плюсе при 1 490+ ₽.
          </div>
        </div>

        {/* ═══ OPTIONAL: SET ═══ */}
        <div style={{ ...sCard, marginTop: 32, opacity: 0.85 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={sBadge(C.dim)}>Опционально</span>
            <h2 style={{ fontSize: 16, fontWeight: 400, color: C.text, margin: 0 }}>Вариант: продажа наборами (ролик + мяч + лента + мешок)</h2>
          </div>
          <p style={sP}>Если появится спрос на комплект (подарочный или для начинающих) — экономика набора:</p>
          <DataTable headers={["Статья", "Расчёт", "Сумма"]} rows={[
            ["Закупка (all-in от фабрики)", "49.76¥ × 12.5", "622 ₽"],
            ["Карго (объёмный вес 2.76 кг)", "2.76 × 261", "720 ₽"],
            ["WB FBO логистика + хранение", "", "95 ₽"],
          ]} />
          <div style={{ paddingLeft: 14, margin: "8px 0 16px", fontSize: 14, fontWeight: 400, color: C.text }}>
            Себестоимость набора: 1 437 ₽ · Break-even: 1 691 ₽ · Для маржи 20%: 2 211 ₽
          </div>
          <PriceScenario price="1 990 ₽" commRate="15%" commission="299 ₽" net="1 692 ₽" cost="1 437 ₽" profit="254 ₽" margin="12.8%" verdict=" Рабочая цена. Минимум для набора" />
          <PriceScenario price="2 290 ₽" commRate="15%" commission="344 ₽" net="1 947 ₽" cost="1 437 ₽" profit="509 ₽" margin="22.2%" verdict=" Хорошая маржа. Подарочное/комплексное позиционирование" />
          <PriceScenario price="2 990 ₽" commRate="15%" commission="449 ₽" net="2 542 ₽" cost="1 437 ₽" profit="1 104 ₽" margin="36.9%" verdict=" Премиум. Бренд + сертификация + качественная упаковка" />
          <p style={{ ...sP, fontSize: 12, color: C.dim, marginTop: 8 }}>
            Набор проходит при 2 000+ ₽, но маржа ниже отдельных позиций из-за объёмного веса коробки (2.76 кг вместо 0.9 кг факт). Имеет смысл как <strong style={{ color: C.text }}>4-я карточка на WB</strong> для расширения охвата.
          </p>
        </div>

        {/* ═══ BREAK-EVEN ═══ */}
        <div style={{ ...sCard, marginTop: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 400, color: C.amber, margin: "0 0 20px" }}>Критические точки (break-even)</h2>
          <DataTable headers={["Товар", "Себестоимость", "Break-even (при 15% WB)", "Цена для 15% маржи", "Цена для 20% маржи"]} rows={[
            ["Набор", "1 437 ₽", "1 691 ₽", "2 053 ₽", "2 211 ₽"],
            ["Йога-ролик", "1 034 ₽", "1 217 ₽", "1 477 ₽", "1 591 ₽"],
            ["Массажный мяч", "178 ₽", "209 ₽", "254 ₽", "274 ₽"],
            ["Фитнес-резинки", "178 ₽", "209 ₽", "254 ₽", "274 ₽"],
          ]} />
          <p style={{ ...sP, fontSize: 12, color: C.dim }}>
            Break-even = себестоимость ÷ (1 − комиссия WB 15%). Ниже этой цены — чистый убыток.
          </p>
        </div>

        {/* ═══ BUDGET ═══ */}
        <div style={{ ...sCard, marginTop: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 400, color: C.green, margin: "0 0 20px" }}>Бюджет: 500 комплектов → 1 500 единиц товара</h2>

          <p style={sP}>Закупаем 500 комплектов у фабрики → разбираем на 3 отдельных SKU → получаем 1 500 единиц для продажи на WB через 3 карточки.</p>

          <DataTable headers={["Статья", "Расчёт", "Сумма"]} rows={[
            ["Закупка 500 комплектов (от фабрики)", "¥24 880 × 12.5", "~311 000 ₽"],
            ["Карго: 500 роликов (объёмн. 2.07 кг)", "500 × 2.07 × 261", "270 135 ₽"],
            ["Карго: 500 мячей (0.1 кг)", "500 × 0.1 × 261", "13 050 ₽"],
            ["Карго: 500 резинок (0.15 кг)", "500 × 0.15 × 261", "19 575 ₽"],
            ["WB FBO логистика + хранение (1 500 шт)", "1 500 × ~63 ₽ ср.", "94 500 ₽"],
            ["Итого инвестиция", "", "~708 260 ₽"],
          ]} />

          <h3 style={{ fontSize: 14, fontWeight: 400, color: C.text, margin: "20px 0 12px" }}>Прогноз: 3 отдельных SKU</h3>
          <DataTable headers={["SKU", "Штук", "Цена WB", "Выручка", "Себестоимость всего", "Прибыль"]} rows={[
            ["Йога-ролик 45 см", "500", "1 490 ₽", "745 000 ₽", "517 000 ₽", "116 500 ₽"],
            ["Массажный мяч с шипами", "500", "390 ₽", "195 000 ₽", "89 000 ₽", "76 500 ₽"],
            ["Фитнес-резинки 5 шт.", "500", "690 ₽", "345 000 ₽", "89 000 ₽", "204 500 ₽"],
            ["ИТОГО", "1 500 шт", "—", "1 285 000 ₽", "695 000 ₽", "397 500 ₽"],
          ]} highlight={3} />

          <div style={{ ...sCard }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
              <div><div style={{ fontSize: 11, color: C.dim }}>Инвестиция</div><div style={{ fontSize: 16, fontWeight: 400, color: C.text }}>~708 000 ₽</div></div>
              <div><div style={{ fontSize: 11, color: C.dim }}>Выручка (при 100% продаже)</div><div style={{ fontSize: 16, fontWeight: 400, color: C.text }}>1 285 000 ₽</div></div>
              <div><div style={{ fontSize: 11, color: C.dim }}>Чистая прибыль</div><div style={{ fontSize: 16, fontWeight: 400, color: C.green }}>397 500 ₽</div></div>
              <div><div style={{ fontSize: 11, color: C.dim }}>ROI</div><div style={{ fontSize: 16, fontWeight: 400, color: C.green }}>56.1%</div></div>
            </div>
          </div>

          <div style={{ paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
            <strong style={{ color: C.green }}>Где основная прибыль: </strong>
            <strong style={{ color: C.text }}>фитнес-резинки дают 204 500 ₽ (51% всей прибыли)</strong> при инвестиции всего 89K ₽ — ROI резинок в отдельности = 230%. Мячи — второй по ROI (86%). Ролик — самый капиталоёмкий (517K из 695K), но маржа самая низкая (15.6%) из-за объёмного веса.
          </div>
        </div>

        {/* ═══ KEY INSIGHTS ═══ */}
        <div style={{ ...sCard, marginTop: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 400, color: C.text, margin: "0 0 20px" }}>Ключевые выводы</h2>
          {[
            { icon: "", title: "Фитнес-резинки — абсолютный чемпион", text: "Себестоимость 178 ₽, WB цена 690–990 ₽, маржа 59–67%. Лёгкие (100 г), компактные, минимальное карго. Дают 51% всей прибыли при 13% инвестиции. Базовый фитнес-аксессуар со стабильным спросом." },
            { icon: "", title: "Массажный мяч — лучший по ROI на вложение", text: "Себестоимость 178 ₽, WB цена 390 ₽, маржа 39%. При 500 штуках вложение всего 89K ₽ → прибыль 76.5K ₽ (ROI 86%). Маленький (65 г), карго = 26 ₽/шт — почти бесплатное." },
            { icon: "", title: "Йога-ролик — якорный товар для витрины", text: "Маржа 15.6% — скромнее остальных, но это визуально крупный товар, который формирует витрину магазина на WB. 500 шт × 1 490 ₽ = 745K выручки. Через ролик покупатели находят мяч и резинки (cross-sell)." },
            { icon: "", title: "Объёмный вес — главный враг ролика", text: "Ролик 45×15×15 см → объёмный вес 2.07 кг при факте 0.5 кг. Карго 540 ₽ против 26–39 ₽ у мяча/резинок. Это 52% себестоимости ролика. Решение: искать карго дешевле $2.5/кг или отправлять ж/д." },
            { icon: "", title: "3 карточки = 3 точки входа", text: "Каждый SKU — отдельная карточка со своим набором отзывов, SEO и выдачей. Покупатели ищут «фитнес резинки», «массажный мяч», «йога ролик» по отдельности. Три карточки = три потока трафика." },
          ].map((item, i) => (
            <div key={i} style={{ paddingLeft: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 400, color: C.text, marginBottom: 4 }}>{item.icon} {item.title}</div>
              <div style={{ fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>{item.text}</div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ padding: "16px 0", marginTop: 32 }}>
          <p style={{ ...sP, margin: "0 0 8px", fontSize: 13, color: C.dim }}>
            Расчёты верифицированы программно. Комиссия WB: 15% (категория «Спортивные товары»). FBO логистика — средние значения по категории, апрель 2026.
          </p>
          <p style={{ ...sP, margin: 0, fontSize: 13, color: C.dim }}>
            Источник закупки: коммерческое предложение от фабрики (1688.com), 500 комплектов.
            WB референсы: арт. 343128594, 288688789, 273928439.
          </p>
        </div>

      </div>
    </div>
  );
}
