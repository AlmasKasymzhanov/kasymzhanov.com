"use client";
import { ResearchReadingTime } from "@/components/canon/research-reading-time";


/* ───── design tokens ───── */
const C = {
  bg: "var(--personal-paper)", surface: "var(--report-surface)", border: "var(--personal-border)",
  accent: "var(--personal-text)", green: "var(--personal-text)", text: "var(--personal-text)",
  dim: "var(--personal-muted)", red: "var(--personal-text)", amber: "var(--personal-text)",
  blue: "var(--personal-text)", pink: "var(--personal-text)", cyan: "var(--personal-text)",
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

function CostBreakdown({ title, badge, badgeColor, rows, totals }: {
  title: string; badge: string; badgeColor: string;
  rows: { label: string; calc: string; amount: string }[];
  totals: { cost: string; prices: { price: string; commission: string; commRate: string; kaspiPay: string; netRevenue: string; profit: string; margin: string; markup: string; verdict: string }[] };
}) {
  return (
    <div style={{ ...sCard, marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={sBadge(badgeColor)}>{badge}</span>
        <h2 style={{ fontSize: 17, fontWeight: 400, color: C.text, margin: 0 }}>{title}</h2>
      </div>

      <h3 style={{ fontSize: 13, fontWeight: 400, color: C.dim, margin: "0 0 12px", textTransform: "none", letterSpacing: "0.05em" }}>Себестоимость на склад в Алматы</h3>
      <DataTable headers={["Статья", "Расчёт", "Сумма"]} rows={rows.map(r => [r.label, r.calc, r.amount])} />
      <div style={{ paddingLeft: 14, margin: "12px 0 24px", fontSize: 14, fontWeight: 400, color: C.text }}>
        Себестоимость: {totals.cost}
      </div>

      <h3 style={{ fontSize: 13, fontWeight: 400, color: C.dim, margin: "0 0 12px", textTransform: "none", letterSpacing: "0.05em" }}>Сценарии продажной цены</h3>
      {totals.prices.map((p, i) => (
        <div key={i} style={{ padding: "16px 0", marginBottom: 12 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "baseline" }}>
            <div><span style={{ fontSize: 11, color: C.dim }}>Цена Kaspi</span><div style={{ fontSize: 18, fontWeight: 400, color: C.text }}>{p.price}</div></div>
            <div><span style={{ fontSize: 11, color: C.dim }}>Комиссия {p.commRate}</span><div style={{ fontSize: 13, color: C.red }}>−{p.commission}</div></div>
            <div><span style={{ fontSize: 11, color: C.dim }}>Kaspi Pay 1.5%</span><div style={{ fontSize: 13, color: C.red }}>−{p.kaspiPay}</div></div>
            <div><span style={{ fontSize: 11, color: C.dim }}>Нетто</span><div style={{ fontSize: 13, color: "var(--personal-text)" }}>{p.netRevenue}</div></div>
            <div><span style={{ fontSize: 11, color: C.dim }}>Прибыль</span><div style={{ fontSize: 16, fontWeight: 400, color: p.verdict.includes("") ? C.green : p.verdict.includes("") ? C.amber : C.red }}>{p.profit}</div></div>
            <div><span style={{ fontSize: 11, color: C.dim }}>Маржа</span><div style={{ fontSize: 16, fontWeight: 400, color: p.verdict.includes("") ? C.green : p.verdict.includes("") ? C.amber : C.red }}>{p.margin}</div></div>
            <div><span style={{ fontSize: 11, color: C.dim }}>Наценка</span><div style={{ fontSize: 13, color: "var(--personal-text)" }}>{p.markup}</div></div>
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 8 }}>{p.verdict}</div>
        </div>
      ))}
    </div>
  );
}


export default function UnitEconomicsPage() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "var(--font-body)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* HEADER */}
        <div className="research-header" style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={sBadge(C.accent)}>Юнит-экономика</span>
            <span style={sBadge(C.amber)}>4 позиции</span>
            <span style={sBadge(C.green)}>1688 → Kaspi</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 500, margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Расчёт юнит-экономики: чемоданы и степперы
          </h1>
          <p style={{ fontSize: 15, color: C.dim, margin: 0, lineHeight: 1.6 }}>
            Детальный расчёт себестоимости, маржи и прибыли на единицу товара. Источник закупки: 1688.com. Целевая площадка: Kaspi.kz. Бюджет: 7 000 000 ₸.
          </p>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 12 }}>
            Дата расчёта: 9 апреля 2026 · Рыночные данные: агрегированные рыночные данные, февраль 2026
          </div>

<a href="/authors/almas-kasymzhanov" className="research-author">Алмас Касымжанов</a>
<ResearchReadingTime />
</div>

        {/* ═══ PARAMETERS ═══ */}
        <div style={{ ...sCard }}>
          <h2 style={{ fontSize: 15, fontWeight: 400, color: C.blue, margin: "0 0 16px" }}>Базовые параметры расчёта</h2>
          <DataTable headers={["Параметр", "Значение", "Примечание"]} rows={[
            ["Курс CNY → KZT", "1¥ = 68 ₸", "Актуальный на апрель 2026"],
            ["Курс USD → KZT", "1$ = 475 ₸", ""],
            ["Карго Китай → Алматы", "$4/кг = 1 900 ₸/кг", "По весу или объёмному — что больше"],
            ["Объёмный вес", "Д × Ш × В (см) ÷ 6000", "Стандарт карго-компаний"],
            ["Таможня (ИП упрощёнка)", "4% от закупочной стоимости", ""],
            ["Комиссия Kaspi: Аксессуары", "13.5%", "Чемоданы → Сумки, чемоданы → Аксессуары"],
            ["Комиссия Kaspi: Спорт", "10.9%", "Степперы → Тренажёры → Спорт, туризм"],
            ["Kaspi Pay (эквайринг)", "1.5%", "С каждой продажи"],
            ["Упаковка + маркировка", "300–500 ₸/шт", "Чемоданы 500, степперы 300"],
          ]} />
        </div>

        {/* ═══ MARKET CONTEXT ═══ */}
        <div style={{ ...sCard }}>
          <h2 style={{ fontSize: 15, fontWeight: 400, color: C.green, margin: "0 0 16px" }}>Рыночный контекст: ценовые сегменты на Kaspi (февраль 2026)</h2>

          <h3 style={{ fontSize: 13, fontWeight: 400, color: C.text, margin: "16px 0 8px" }}>Чемоданы (2 481 SKU, leaf 00640)</h3>
          <DataTable headers={["Сегмент", "SKU", "Выручка/мес", "Доля", "Лидеры"]} rows={[
            ["< 15K ₸ (одиночные, бюджет)", "17", "31M", "40%", "VALIZ 10-12K, Travel 10K"],
            ["15–25K ₸", "3", "3M", "4%", "—"],
            ["25–40K ₸ (комплекты, средний)", "15", "24M", "31%", "QAZAQSUMKA 31-33K"],
            ["40–70K ₸ (премиум)", "12", "13M", "18%", "Xiaomi 50-66K, Longstar 55K"],
            ["> 70K ₸ (ультрапремиум)", "3", "6M", "7%", "BRAUER 146K"],
          ]} />

          <h3 style={{ fontSize: 13, fontWeight: 400, color: C.text, margin: "20px 0 8px" }}>Степперы (184 SKU, leaf 00898)</h3>
          <DataTable headers={["Сегмент", "SKU", "Выручка/мес", "Доля", "Лидеры"]} rows={[
            ["< 15K ₸ (ультрабюджет)", "1", "36M", "17%", "Один безбрендовый SKU — монстр (14 733 ₸, 2 566 шт/мес)"],
            ["15–25K ₸ (бюджет)", "10", "32M", "16%", "NAZARMIR 16.5K, R&A 20K"],
            ["25–40K ₸ (основной)", "28", "86M", "42%", "Aq-Jol 25-30K, BATR.KZ 28K, MULU 34K, ART FiT 40K"],
            ["40–70K ₸ (премиум)", "11", "52M", "25%", "DELOVOI 57-60K, NEXEL 50K, BATR.KZ uStepper 49K"],
          ]} />

          <div style={{ paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "var(--personal-text)", lineHeight: 1.6 }}>
            <strong style={{ color: C.green }}>Ключевое наблюдение: </strong>
            <strong style={{ color: C.text }}>100% степперов в топ-25 продаются через 1 мерчанта</strong> (моно-мерчант модель). Это означает, что каждый бренд создаёт свою карточку и контролирует цену полностью — нет мульти-мерчантного демпинга как в чемоданах. Моно-мерчант = контроль = маржа.
          </div>
        </div>

        {/* ═══ POSITION 1: CARRY-ON CLOSET ═══ */}
        <CostBreakdown
          title="Carry-On Closet — чемодан-гардероб (20&quot;)"
          badge="Позиция 1" badgeColor={C.amber}
          rows={[
            { label: "Закупка 1688", calc: "480¥ × 68", amount: "32 640 ₸" },
            { label: "Кастомизация (лого)", calc: "10¥ × 68", amount: "680 ₸" },
            { label: "Карго (объёмный вес)", calc: "55×40×25 см ÷ 6000 = 9.2 кг × 1 900 ₸", amount: "17 480 ₸" },
            { label: "Таможня 4%", calc: "32 640 × 4%", amount: "1 306 ₸" },
            { label: "Упаковка + маркировка", calc: "", amount: "500 ₸" },
          ]}
          totals={{
            cost: "52 606 ₸",
            prices: [
              { price: "59 990 ₸", commRate: "13.5%", commission: "8 099 ₸", kaspiPay: "900 ₸", netRevenue: "50 991 ₸", profit: "−1 615 ₸", margin: "−2.7%", markup: "−3.1%", verdict: " Убыток. При 60K не проходит — карго + закупка слишком дорогие" },
              { price: "69 990 ₸", commRate: "13.5%", commission: "9 449 ₸", kaspiPay: "1 050 ₸", netRevenue: "59 491 ₸", profit: "6 886 ₸", margin: "9.8%", markup: "13.1%", verdict: " Минимально рентабельно. Конкурирует с Xiaomi (50-66K) и Longstar (55K) — нужен сильный USP" },
              { price: "79 990 ₸", commRate: "13.5%", commission: "10 799 ₸", kaspiPay: "1 200 ₸", netRevenue: "67 991 ₸", profit: "15 386 ₸", margin: "19.2%", markup: "29.2%", verdict: " Хорошая маржа, но цена высокая — нужно обосновать «чемодан-шкаф» как отдельный продукт" },
            ],
          }}
        />

        {/* ═══ POSITION 2: FRONT-OPEN ═══ */}
        <CostBreakdown
          title="Front-Open Carry-On — передний доступ (20&quot;)"
          badge="Позиция 2" badgeColor={C.green}
          rows={[
            { label: "Закупка 1688", calc: "385¥ × 68", amount: "26 180 ₸" },
            { label: "Кастомизация (лого)", calc: "10¥ × 68", amount: "680 ₸" },
            { label: "Карго (объёмный вес)", calc: "55×40×25 см ÷ 6000 = 9.2 кг × 1 900 ₸", amount: "17 480 ₸" },
            { label: "Таможня 4%", calc: "26 180 × 4%", amount: "1 047 ₸" },
            { label: "Упаковка + маркировка", calc: "", amount: "500 ₸" },
          ]}
          totals={{
            cost: "45 887 ₸",
            prices: [
              { price: "59 990 ₸", commRate: "13.5%", commission: "8 099 ₸", kaspiPay: "900 ₸", netRevenue: "50 991 ₸", profit: "5 104 ₸", margin: "8.5%", markup: "11.1%", verdict: " Проходит, но тонко. Единственный чемодан с передним доступом дешевле BRAUER (146K)" },
              { price: "64 990 ₸", commRate: "13.5%", commission: "8 774 ₸", kaspiPay: "975 ₸", netRevenue: "55 241 ₸", profit: "9 354 ₸", margin: "14.4%", markup: "20.4%", verdict: " Хорошая маржа. Позиционирование: «BRAUER за полцены». Передний доступ + USB = уникальный USP" },
              { price: "69 990 ₸", commRate: "13.5%", commission: "9 449 ₸", kaspiPay: "1 050 ₸", netRevenue: "59 491 ₸", profit: "13 604 ₸", margin: "19.4%", markup: "29.6%", verdict: " Отличная маржа. При наличии USB-зарядки + ноутбук-секции — обоснованная цена" },
            ],
          }}
        />

        {/* ═══ POSITION 3: COLORFUL ═══ */}
        <CostBreakdown
          title="Цветной дизайнерский чемодан (20&quot;)"
          badge="Позиция 3" badgeColor={C.pink}
          rows={[
            { label: "Закупка 1688", calc: "180¥ × 68", amount: "12 240 ₸" },
            { label: "Кастомизация (лого)", calc: "10¥ × 68", amount: "680 ₸" },
            { label: "Карго (объёмный вес)", calc: "55×38×23 см ÷ 6000 = 8.0 кг × 1 900 ₸", amount: "15 200 ₸" },
            { label: "Таможня 4%", calc: "12 240 × 4%", amount: "490 ₸" },
            { label: "Упаковка + маркировка", calc: "", amount: "500 ₸" },
          ]}
          totals={{
            cost: "29 110 ₸",
            prices: [
              { price: "34 990 ₸", commRate: "13.5%", commission: "4 724 ₸", kaspiPay: "525 ₸", netRevenue: "29 741 ₸", profit: "632 ₸", margin: "1.8%", markup: "2.2%", verdict: " Еле в ноль. Карго (15K) дороже самого чемодана (12K) — убивает экономику" },
              { price: "39 990 ₸", commRate: "13.5%", commission: "5 399 ₸", kaspiPay: "600 ₸", netRevenue: "33 991 ₸", profit: "4 882 ₸", margin: "12.2%", markup: "16.8%", verdict: " Нормальная маржа. Конкурирует с QAZAQSUMKA (31-33K за комплект). Дизайн и цвет — USP" },
              { price: "44 990 ₸", commRate: "13.5%", commission: "6 074 ₸", kaspiPay: "675 ₸", netRevenue: "38 241 ₸", profit: "9 132 ₸", margin: "20.3%", markup: "31.4%", verdict: " Хорошая маржа. Продавать как дизайнерский / подарочный вариант" },
            ],
          }}
        />

        {/* ═══ POSITION 4: STEPPER ═══ */}
        <CostBreakdown
          title="Мини-степпер дизайнерский (пастельные цвета)"
          badge="Позиция 4 — лучшая юнитка" badgeColor={C.green}
          rows={[
            { label: "Закупка 1688", calc: "105¥ × 68", amount: "7 140 ₸" },
            { label: "Кастомизация", calc: "Нет (цвета из каталога)", amount: "0 ₸" },
            { label: "Карго (фактический вес)", calc: "Факт. 9 кг > объёмн. 5.7 кг → 9.0 кг × 1 900 ₸", amount: "17 100 ₸" },
            { label: "Таможня 4%", calc: "7 140 × 4%", amount: "286 ₸" },
            { label: "Упаковка + маркировка", calc: "", amount: "300 ₸" },
          ]}
          totals={{
            cost: "24 826 ₸",
            prices: [
              { price: "29 990 ₸", commRate: "10.9%", commission: "3 269 ₸", kaspiPay: "450 ₸", netRevenue: "26 271 ₸", profit: "1 446 ₸", margin: "4.8%", markup: "5.8%", verdict: " Проходит, но тонко. Дешевле Aq-Jol (25K) — агрессивный вход для набора отзывов" },
              { price: "34 990 ₸", commRate: "10.9%", commission: "3 814 ₸", kaspiPay: "525 ₸", netRevenue: "30 651 ₸", profit: "5 826 ₸", margin: "16.6%", markup: "23.5%", verdict: " Оптимальная цена. Уровень MULU (34K). Пастельные цвета = уникальный USP, которого нет ни у кого" },
              { price: "39 990 ₸", commRate: "10.9%", commission: "4 359 ₸", kaspiPay: "600 ₸", netRevenue: "35 031 ₸", profit: "10 206 ₸", margin: "25.5%", markup: "41.1%", verdict: " Отличная маржа. Уровень ART FiT / Guvea. Позиционирование — дизайнерский premium" },
            ],
          }}
        />

        {/* ═══ SUMMARY TABLE ═══ */}
        <div style={{ ...sCard, marginTop: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 400, color: C.accent, margin: "0 0 20px" }}>Сводная таблица: оптимальные сценарии</h2>
          <DataTable headers={["Позиция", "Себестоимость", "Цена Kaspi", "Прибыль/шт", "Маржа", "Наценка", "Вердикт"]} rows={[
            ["Carry-On Closet 480¥", "52 606 ₸", "69 990 ₸", "6 886 ₸", "9.8%", "13.1%", " Дорого, только 70K+"],
            ["Front-Open 385¥", "45 887 ₸", "64 990 ₸", "9 354 ₸", "14.4%", "20.4%", " Уникальный USP"],
            ["Цветной 180¥", "29 110 ₸", "39 990 ₸", "4 882 ₸", "12.2%", "16.8%", " Только 40K+"],
            ["Степпер 105¥", "24 826 ₸", "34 990 ₸", "5 826 ₸", "16.6%", "23.5%", " Лучшая маржа"],
          ]} highlight={3} />
        </div>

        {/* ═══ BUDGET SCENARIOS ═══ */}
        <div style={{ ...sCard, marginTop: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 400, color: C.green, margin: "0 0 20px" }}>Раскладка на бюджет 7 000 000 ₸</h2>

          <h3 style={{ fontSize: 14, fontWeight: 400, color: C.text, margin: "20px 0 12px" }}>Сценарий A: Фокус на степперы</h3>
          <DataTable headers={["Товар", "Себест.", "Штук", "Инвестиция", "Выручка", "Прибыль"]} rows={[
            ["Степпер 105¥ (× 34 990 ₸)", "24 826 ₸", "280 шт", "6 951 280 ₸", "9 797 200 ₸", "1 631 080 ₸"],
          ]} />
          <div style={{ paddingLeft: 14, margin: "8px 0 20px", fontSize: 13, color: "var(--personal-text)" }}>
            <strong style={{ color: C.green }}>Маржа: 16.6%</strong> · Минимальный риск · Один SKU, один склад · Моно-мерчант стратегия · Пик продаж: октябрь–январь (ЗОЖ + Новый год)
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 400, color: C.text, margin: "20px 0 12px" }}>Сценарий B: Микс 50/50 (рекомендуемый)</h3>
          <DataTable headers={["Товар", "Себест.", "Штук", "Инвестиция", "Выручка", "Прибыль"]} rows={[
            ["Степпер 105¥ (× 34 990 ₸)", "24 826 ₸", "140 шт", "3 475 640 ₸", "4 898 600 ₸", "815 640 ₸"],
            ["Front-Open 385¥ (× 64 990 ₸)", "45 887 ₸", "75 шт", "3 441 525 ₸", "4 874 250 ₸", "701 550 ₸"],
            ["ИТОГО", "—", "215 шт", "6 917 165 ₸", "9 772 850 ₸", "1 517 190 ₸"],
          ]} highlight={2} />
          <div style={{ paddingLeft: 14, margin: "8px 0 20px", fontSize: 13, color: "var(--personal-text)" }}>
            <strong style={{ color: C.accent }}>Маржа: 15.5%</strong> · Диверсификация · Два сезонных пика: чемоданы (лето) + степперы (зима) · Два USP: пастельные цвета + передний доступ
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 400, color: C.text, margin: "20px 0 12px" }}>Сценарий C: Широкий микс</h3>
          <DataTable headers={["Товар", "Себест.", "Штук", "Инвестиция", "Выручка", "Прибыль"]} rows={[
            ["Степпер 105¥ (× 34 990 ₸)", "24 826 ₸", "100 шт", "2 482 600 ₸", "3 499 000 ₸", "582 600 ₸"],
            ["Front-Open 385¥ (× 64 990 ₸)", "45 887 ₸", "50 шт", "2 294 350 ₸", "3 249 500 ₸", "467 700 ₸"],
            ["Цветной 180¥ (× 39 990 ₸)", "29 110 ₸", "70 шт", "2 037 700 ₸", "2 799 300 ₸", "341 740 ₸"],
            ["ИТОГО", "—", "220 шт", "6 814 650 ₸", "9 547 800 ₸", "1 392 040 ₸"],
          ]} highlight={3} />
          <div style={{ paddingLeft: 14, margin: "8px 0", fontSize: 13, color: "var(--personal-text)" }}>
            <strong style={{ color: C.amber }}>Маржа: 14.6%</strong> · Максимальная диверсификация · Три товарные линейки · Больше SKU = больше карточек на Kaspi = больше точек входа
          </div>
        </div>

        {/* ═══ KEY INSIGHTS ═══ */}
        <div style={{ ...sCard, marginTop: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 400, color: C.text, margin: "0 0 20px" }}>Ключевые выводы</h2>

          {[
            { icon: "", title: "Карго — главный убийца маржи", text: "Для чемоданов карго = 33–60% себестоимости (15–17K при закупке 12–33K). Объёмный вес (9.2 кг) для чемодана 20\" в 2× превышает фактический (4 кг). Решение: торговать за $3/кг (−4 200 ₸/шт) или отправлять ж/д ($1.5–2/кг)." },
            { icon: "", title: "Степпер: парадокс", text: "Закупка 7K, а карго 17K — карго стоит в 2.4× дороже товара. НО маржа всё равно лучшая (16.6%), потому что на Kaspi степперы продаются за 30–40K с моно-мерчант стратегией (0 конкуренция на карточке, полный контроль цены)." },
            { icon: "", title: "Front-Open = blue ocean", text: "На всём Kaspi нет чемодана с передним доступом дешевле 146K ₸ (BRAUER). Можно выставить 65K и быть в 2× дешевле единственного конкурента. Плюс USB-зарядка — этого нет вообще ни у кого." },
            { icon: "", title: "Carry-On Closet (480¥) слишком дорогой", text: "При 480¥ минимальная рентабельная цена = 70K ₸. Это уже Xiaomi-территория (50–66K). Нужно торговать фабрику до 350–380¥ или отложить запуск." },
            { icon: "", title: "Рекомендация: Сценарий B (микс 50/50)", text: "140 степперов + 75 Front-Open = 6.9M ₸. Два сезонных пика (чемоданы летом, степперы зимой). Ожидаемая прибыль 1.52M ₸ при полной продаже (маржа 15.5%)." },
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
            Все расчёты верифицированы программно (Node.js калькулятор). Рыночные данные: <strong style={{ color: C.text }}>агрегированные рыночные данные, февраль 2026</strong>.
          </p>
          <p style={{ ...sP, margin: 0, fontSize: 13, color: C.dim }}>
            Закупочные цены: <strong style={{ color: C.text }}>1688.com</strong> (оптовая площадка Alibaba Group). Комиссии Kaspi актуальны на апрель 2026.
          </p>
        </div>

      </div>
    </div>
  );
}
