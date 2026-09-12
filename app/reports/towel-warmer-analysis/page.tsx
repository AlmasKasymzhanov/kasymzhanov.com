"use client";
import { ResearchSection, ResearchFact, ResearchNote, ResearchFigure } from "@/components/canon/research-editorial";
import { ResearchReadingTime } from "@/components/canon/research-reading-time";


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
const sH3: React.CSSProperties = { fontSize: 16, fontWeight: 500, color: C.accent, margin: "28px 0 16px" };

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
                <td key={ci} style={{ padding: "10px 12px", textAlign: "left", color: ci === 0 ? C.text : "var(--personal-text)", borderBottom: `1px solid color-mix(in srgb, ${C.border} 13%, transparent)`, fontWeight: ci === 0 ? 500 : 400 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) { return <ResearchSection id={id} title={title}>{children}</ResearchSection>; }

function MetricGrid({ items }: { items: { label: string; value: string; sub?: string }[] }) { return <div className="research-facts">{items.map((item, i) => <ResearchFact key={i} label={item.label} value={item.value} note={item.sub} />)}</div>; }

export default function TowelWarmerAnalysisPage() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "var(--font-body)" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* HEADER */}
        <div className="research-header" style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={sBadge(C.wb)}>Wildberries</span>
            <span style={sBadge(C.accent)}>Enterprise-анализ</span>
            <span style={sBadge(C.amber)}>Точка входа</span>
            <span style={sBadge(C.green)}>600 М ₽/год</span>
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 500, margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Полотенцесушители: Enterprise-анализ точки входа на WB
          </h1>
          <p className="research-lead" style={{ fontSize: 16, color: C.dim, margin: 0, lineHeight: 1.6 }}>
            Полный разбор ниши полотенцесушителей (электрические + водяные) на Wildberries: рынок 600 млн ₽/год, конкурентный ландшафт, unit-экономика двух моделей (12 000 ₸ и 33 000 ₸), стратегия входа.
          </p>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 12 }}>
            18 апреля 2026 · Данные: агрегированные данные Wildberries (18.04.2025–17.04.2026), 63 855 SKU, Wildberries
          </div>

<a href="/#about" className="research-author">Алмас Касымжанов</a>
<ResearchReadingTime />
</div>

        {/* TOC */}
        <div style={{ ...sCard }}>
          <h2 style={{ fontSize: 14, fontWeight: 400, color: C.wb, margin: "0 0 12px", textTransform: "none", letterSpacing: "0.05em" }}>Содержание</h2>
          {[
            ["0", "Обзор & Вердикт"],
            ["1", "Рынок: 600 М ₽, структура, конкуренция"],
            ["2", "Ценовые сегменты и sweet spot"],
            ["3", "Топ-конкуренты и слабые места"],
            ["4", "Наши 2 модели: детальный разбор"],
            ["5", "Unit-экономика обеих моделей"],
            ["6", "Сезонность"],
            ["7", "Стратегия дифференциации"],
            ["8", "Рекомендации: стратегия входа"],
          ].map(([n, t]) => (
            <div key={n} style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--personal-text)", padding: "5px 0" }}>
              <span style={{ color: C.wb, fontWeight: 400, minWidth: 20 }}>{n}.</span>
              <a href={`#s${n}`} style={{ color: "var(--personal-text)", textDecoration: "none" }}>{t}</a>
            </div>
          ))}
        </div>

        {/* ═══ 0. EXEC SUMMARY ═══ */}
        <Section id="s0" num="0" title="Обзор & Вердикт">
          <MetricGrid items={[
            { label: "Рынок/год", value: "600 М ₽", sub: "94 686 продаж" },
            { label: "Электрические", value: "64%", sub: "384 М ₽ — основной сегмент" },
            { label: "Sweet spot", value: "5–10К ₽", sub: "60% всей выручки (358 М ₽)" },
            { label: "Фрагментация", value: "Высокая", sub: "Топ-1 = 24%, топ-5 = 52%" },
            { label: "Комиссия FBO", value: "27,5%" },
            { label: "Новые SKU (≤180д)", value: "478", sub: "9,5% рынка = вход возможен" },
          ]} />

          <div style={{ ...sCard }}>
            <div style={{ fontSize: 16, fontWeight: 400, color: C.green, marginBottom: 10 }}>Вердикт:  ЗАХОДИТЬ — но только с Моделью 1 (маленький, 12 000 ₸)</div>
            <div style={{ fontSize: 13, color: "var(--personal-text)", lineHeight: 1.8 }}>
              <p style={{ margin: "0 0 8px" }}>
                <strong style={{ color: C.text }}>Модель 1 (550мм, себестоимость 12 000 ₸ ≈ 2 069 ₽):</strong> маржа 25–35% при продаже 5 500–7 500 ₽. Попадает в sweet spot (5–10К) — 60% рынка. ROI 30–50%. <span style={{ color: C.green }}>Рекомендуем.</span>
              </p>
              <p style={{ margin: "0 0 8px" }}>
                <strong style={{ color: C.text }}>Модель 2 (100×15, себестоимость 33 000 ₸ ≈ 5 690 ₽):</strong> маржа 5–12% при 10 000–14 000 ₽. Тонкая экономика, габаритный товар (106 см!), высокие логистические риски. <span style={{ color: C.red }}>Не рекомендуем для старта.</span>
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: C.accent }}>Главное преимущество ниши:</strong> рынок в 66 раз больше foot stretcher, фрагментированный (нет монополиста), хронические стокауты у топов (14–64% lost profit), новички успешно заходят (9,5% рынка за 6 месяцев).
              </p>
            </div>
          </div>
        </Section>

        {/* ═══ 1. MARKET ═══ */}
        <Section id="s1" num="1" title="Рынок: 600 М ₽, структура, конкуренция">
          <h3 style={sH3}>Общие метрики</h3>
          <DataTable
            headers={["Метрика", "Значение"]}
            rows={[
              ["Всего SKU в нише", "63 855"],
              ["SKU с продажами", "4 235 (6,6%)"],
              ["Продажи/год", "94 686 шт"],
              ["Выручка/год", "599,9 млн ₽"],
              ["Средний чек", "10 379 ₽"],
              ["Комиссия FBO", "27,5%"],
              ["Комиссия FBS", "31%"],
            ]}
          />

          <h3 style={sH3}>Структура по типу</h3>
          <DataTable
            headers={["Тип", "SKU (с продажами)", "Продажи", "Выручка", "Доля"]}
            rows={[
              ["Электрические", "2 375", "56 363", "383,7 М ₽", "64,0%"],
              ["Водяные", "1 414", "29 997", "175,5 М ₽", "29,3%"],
              ["Прочие (комбинированные, аксессуары)", "446", "8 326", "40,6 М ₽", "6,8%"],
            ]}
          />

          <h3 style={sH3}>Топ-10 брендов</h3>
          <DataTable
            headers={["Бренд", "SKU", "Продажи", "Выручка", "Доля"]}
            rows={[
              ["EL-TERM", "288", "21 557", "131,2 М ₽", "21,9%"],
              ["Evikon", "28", "9 030", "45,1 М ₽", "7,5%"],
              ["TERMINUS", "4 134", "5 879", "39,6 М ₽", "6,6%"],
              ["Forb", "13", "5 721", "39,5 М ₽", "6,6%"],
              ["Рэмо", "46", "5 436", "25,7 М ₽", "4,3%"],
              ["WORK", "55", "3 530", "25,3 М ₽", "4,2%"],
              ["gentle", "12", "3 777", "24,0 М ₽", "4,0%"],
              ["WIEKK", "14", "2 133", "17,4 М ₽", "2,9%"],
              ["СТЕЛМИКС", "27", "3 926", "17,3 М ₽", "2,9%"],
              ["TEVONA", "34", "1 954", "17,3 М ₽", "2,9%"],
            ]}
          />

          <div style={{ paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
            <strong style={{ color: C.green }}>Фрагментация = окно для входа: </strong>
            Топ-1 (EL-TERM) = 21,9%. Топ-5 = 46%. Это <strong style={{ color: C.text }}>здоровый конкурентный рынок</strong> без монополиста. Для сравнения: в foot stretcher Foot Beauty = 96,5%.
          </div>
        </Section>

        {/* ═══ 2. PRICE SEGMENTS ═══ */}
        <Section id="s2" num="2" title="Ценовые сегменты и sweet spot">
          <DataTable
            headers={["Сегмент", "SKU", "Продажи", "Выручка", "Доля"]}
            rows={[
              ["< 3 000 ₽", "320", "14 272", "32,1 М ₽", "5,4%"],
              ["3 000–5 000 ₽", "582", "17 306", "64,2 М ₽", "10,7%"],
              ["5 000–10 000 ₽ ", "1 571", "50 649", "358,4 М ₽", "59,7%"],
              ["10 000–20 000 ₽", "1 390", "11 123", "123,3 М ₽", "20,6%"],
              ["20 000–50 000 ₽", "368", "1 321", "21,7 М ₽", "3,6%"],
              ["50 000+ ₽", "4", "15", "0,2 М ₽", "0,0%"],
            ]}
          />

          <div style={{ ...sCard }}>
            <div style={{ fontSize: 14, fontWeight: 400, color: C.accent, marginBottom: 8 }}>Sweet spot: 5 000–10 000 ₽ = 60% всего рынка</div>
            <p style={{ ...sP, margin: 0 }}>
              1 571 SKU, 50 649 продаж, 358,4 М ₽ выручки. Средний чек в сегменте: 7 532 ₽. Средний рейтинг топ-20: 5.0, средние отзывы: 276.
              <strong style={{ color: C.text }}> Именно сюда нужно целиться.</strong>
            </p>
          </div>
        </Section>

        {/* ═══ 3. COMPETITORS ═══ */}
        <Section id="s3" num="3" title="Топ-конкуренты и слабые места">
          <h3 style={sH3}>Топ-10 SKU по выручке (годовой)</h3>
          <DataTable
            headers={["SKU", "Бренд", "Продажи", "Выручка", "Цена", "Lost profit"]}
            rows={[
              ["270909276 — Электрический, ванная", "Forb", "947", "9,15 М", "8 400 ₽", "33,2%"],
              ["220429295 — Электрич. с терморег.", "Classmark", "881", "7,76 М", "8 199 ₽", "35,9%"],
              ["223242897 — ГРАС 40×70", "EL-TERM", "1 006", "6,43 М", "6 272 ₽", "14,8%"],
              ["223242887 — ЛИОН 50×70", "EL-TERM", "916", "5,87 М", "7 375 ₽", "22,5%"],
              ["156396928 — Электрич. с терморег.", "gentle", "664", "5,71 М", "8 256 ₽", "14,5%"],
              ["156396019 — Электрич. с терморег.", "gentle", "810", "5,67 М", "6 663 ₽", "63,8% "],
              ["377531344 — 60×49 белый", "Forb", "801", "5,61 М", "6 066 ₽", "57,8% "],
              ["222194352 — Водяной 500×700", "EL-TERM", "953", "5,40 М", "6 177 ₽", "19,7%"],
              ["160028163 — С терморегулятором", "Forb", "560", "5,38 М", "6 513 ₽", "55,1% "],
              ["381143249 — Водяной 50×60", "Evikon", "844", "5,33 М", "6 796 ₽", "15,9%"],
            ]}
          />

          <div style={{ paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
            <strong style={{ color: C.red }}>Хронические стокауты: </strong>
            3 из 10 топовых SKU теряют <strong style={{ color: C.text }}>55–64%</strong> потенциальной выручки из-за отсутствия на складе. Ещё 4 теряют 15–36%.
            Это системная проблема всей ниши — <strong style={{ color: C.green }}>возможность для нового продавца с надёжным снабжением</strong>.
          </div>

          <h3 style={sH3}>Топ-5 продавцов</h3>
          <DataTable
            headers={["Продавец", "SKU", "Продажи", "Выручка", "Доля"]}
            rows={[
              ["ООО Терминус (EL-TERM + TERMINUS)", "548", "24 528", "146,4 М ₽", "24,4%"],
              ["ООО Эвикон (Evikon)", "28", "9 030", "45,1 М ₽", "7,5%"],
              ["ИП Горонович Н.А. (EL-TERM)", "96", "7 180", "43,3 М ₽", "7,2%"],
              ["ИП Зингер Р.Е. (Forb)", "11", "5 744", "39,7 М ₽", "6,6%"],
              ["ИП Карленков А.А. (WORK)", "55", "3 530", "25,3 М ₽", "4,2%"],
            ]}
          />
        </Section>

        {/* ═══ 4. OUR MODELS ═══ */}
        <Section id="s4" num="4" title="Наши 2 модели: детальный разбор">
          <div style={{ display: "block", marginBottom: 24 }}>
            <div style={{ ...sCard, marginBottom: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 400, color: C.green, marginBottom: 6 }}>МОДЕЛЬ 1 — РЕКОМЕНДУЕМ</div>
              <h3 style={{ fontSize: 16, fontWeight: 400, color: C.text, margin: "0 0 12px" }}>Электрический 550мм с терморегулятором</h3>
              <DataTable
                headers={["Параметр", "Значение"]}
                rows={[
                  ["Аналог на WB (SKU 189300015)", "gentle — 3 780 ₽"],
                  ["Себестоимость", "12 000 ₸ ≈ 2 069 ₽"],
                  ["Аналог: продажи/год", "431 шт"],
                  ["Аналог: выручка/год", "1,75 М ₽"],
                  ["Рейтинг аналога", "5.0 (289 отзывов)"],
                  ["Габариты короба", "63 × 42 × 12 см"],
                  ["Stock utilization аналога", "54%"],
                  ["Попадание в sweet spot", " 5–10К ₽ при наценке"],
                ]}
              />
            </div>
            <div style={{ ...sCard, marginBottom: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 400, color: C.red, marginBottom: 6 }}>МОДЕЛЬ 2 — НЕ ДЛЯ СТАРТА</div>
              <h3 style={{ fontSize: 16, fontWeight: 400, color: C.text, margin: "0 0 12px" }}>Электрический 100×15 см</h3>
              <DataTable
                headers={["Параметр", "Значение"]}
                rows={[
                  ["Аналог на WB (SKU 678911253)", "MGD — 13 621 ₽"],
                  ["Себестоимость", "33 000 ₸ ≈ 5 690 ₽"],
                  ["Аналог: продажи/год", "47 шт"],
                  ["Аналог: выручка/год", "590 К ₽"],
                  ["Рейтинг аналога", "4.0 (11 отзывов)"],
                  ["Габариты короба", "106 × 15 × 11 см"],
                  ["Lost profit аналога", "86% (!!)"],
                  ["Попадание в sweet spot", " 10–20К (20,6% рынка)"],
                ]}
              />
            </div>
          </div>
        </Section>

        {/* ═══ 5. UNIT ECONOMICS ═══ */}
        <Section id="s5" num="5" title="Unit-экономика обеих моделей">

          <h3 style={{ ...sH3, color: C.green }}>Модель 1: Электрический 550мм (COGS 12 000 ₸)</h3>
          <DataTable
            headers={["Статья", "Сумма"]}
            rows={[
              ["Себестоимость товара", "12 000 ₸ ≈ 2 069 ₽"],
              ["Логистика Китай → Алматы (доля)", "~300 ₽"],
              ["Логистика Алматы → WB (Подольск)", "~400 ₽ (5–8 кг)"],
              ["Упаковка (короб, пенопласт)", "~150 ₽"],
              ["ИТОГО COGS до WB", "~2 919 ₽"],
            ]}
          />
          <DataTable
            headers={["Цена продажи", "Выручка (−27,5%)", "WB логистика", "COGS", "Прибыль/шт", "Маржа", "ROI"]}
            rows={[
              ["5 000 ₽", "3 625 ₽", "−200 ₽", "−2 919 ₽", " +506 ₽", "10,1%", "17%"],
              ["5 500 ₽", "3 988 ₽", "−200 ₽", "−2 919 ₽", " +869 ₽", "15,8%", "30%"],
              ["6 000 ₽", "4 350 ₽", "−200 ₽", "−2 919 ₽", " +1 231 ₽", "20,5%", "42%"],
              ["6 500 ₽", "4 713 ₽", "−200 ₽", "−2 919 ₽", " +1 594 ₽", "24,5%", "55%"],
              ["7 000 ₽", "5 075 ₽", "−200 ₽", "−2 919 ₽", " +1 956 ₽", "27,9%", "67%"],
              ["7 500 ₽", "5 438 ₽", "−200 ₽", "−2 919 ₽", " +2 319 ₽", "30,9%", "79%"],
              ["8 000 ₽", "5 800 ₽", "−200 ₽", "−2 919 ₽", " +2 681 ₽", "33,5%", "92%"],
            ]}
          />

          <div style={{ ...sCard }}>
            <div style={{ fontSize: 14, fontWeight: 400, color: C.green, marginBottom: 8 }}>Оптимальная цена: 6 000–7 500 ₽</div>
            <p style={{ ...sP, margin: 0 }}>
              Маржа 20–31%, ROI 42–79%. Попадает в sweet spot 5–10К ₽ (60% рынка).
              Аналог gentle продаёт за 3 780 ₽ — но у него <strong style={{ color: C.text }}>другая модель</strong> (голый тренажёр).
              Топы (EL-TERM, Forb) продают за 6 000–8 500 ₽ — это <strong style={{ color: C.text }}>наш ценовой диапазон</strong>.
            </p>
          </div>

          <h3 style={{ ...sH3, color: C.red }}>Модель 2: Электрический 100×15 (COGS 33 000 ₸)</h3>
          <DataTable
            headers={["Цена продажи", "Выручка (−27,5%)", "WB логистика", "COGS (~6 540 ₽)", "Прибыль/шт", "Маржа"]}
            rows={[
              ["10 000 ₽", "7 250 ₽", "−300 ₽", "−6 540 ₽", " +410 ₽", "4,1%"],
              ["12 000 ₽", "8 700 ₽", "−300 ₽", "−6 540 ₽", " +1 860 ₽", "15,5%"],
              ["14 000 ₽", "10 150 ₽", "−300 ₽", "−6 540 ₽", " +3 310 ₽", "23,6%"],
            ]}
          />

          <div style={{ paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
            Маржа нормальная при 12–14К ₽, но: аналог (MGD) продаёт всего <strong style={{ color: C.text }}>47 шт/год</strong> (4 шт/мес), и у него
            <strong style={{ color: C.red }}> lost profit 86%</strong> — значит товар почти не завозили. Спрос не доказан масштабно.
            Габарит 106 см → дорогая логистика + хрупкость.
            <strong style={{ color: C.amber }}> Рекомендация: отложить до масштабирования Модели 1.</strong>
          </div>
        </Section>

        {/* ═══ 6. SEASONALITY ═══ */}
        <Section id="s6" num="6" title="Сезонность">
          <p style={sP}>
            Полотенцесушители — товар для ванных комнат, привязан к циклу ремонтов и обустройства жилья.
          </p>
          <DataTable
            headers={["Период", "Спрос", "Причина"]}
            rows={[
              ["Март–Май", " Пик", "Весенний ремонт, подготовка к лету, новосёлы"],
              ["Июнь–Август", "Средний+", "Продолжение ремонтов, летний отпуск = обустройство"],
              ["Сентябрь–Октябрь", " Пик", "Осенний ремонт, подготовка к зиме, новостройки"],
              ["Ноябрь", "Высокий", "Чёрная пятница, Kaspi Juma-аналоги на WB"],
              ["Декабрь", "Средний", "Подарки (полотенцесушитель не типичный подарок, но апселл)"],
              ["Январь–Февраль", " Спад", "Пост-праздничное затишье, зимние холода (ремонт откладывается)"],
            ]}
          />
          <div style={{ paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
            <strong style={{ color: C.green }}>Лучший момент для входа: </strong>
            февраль–март (закупка), старт продаж март–апрель (начало весеннего ремонтного пика).
            Или август (закупка) → сентябрь (осенний пик).
          </div>
        </Section>

        {/* ═══ 7. DIFFERENTIATION ═══ */}
        <Section id="s7" num="7" title="Стратегия дифференциации">
          <p style={sP}>
            Ниша фрагментирована — не нужно «убивать» одного монополиста. Достаточно выделиться по 3–4 параметрам, чтобы занять свою долю.
          </p>

          <h3 style={sH3}>Конкурентные преимущества для выделения</h3>
          <DataTable
            headers={["Стратегия", "Что делать", "COGS", "Есть у топов?"]}
            rows={[
              ["Терморегулятор с дисплеем", "Вместо простого вкл/выкл — цифровой дисплей с t° (40–65°)", "+300–500 ₽", "У 30% SKU (EL-TERM, gentle)"],
              ["Wi-Fi / Smart Home", "Управление с телефона, таймер, расписание", "+500–800 ₽", "Только у Fopo (4,7М выручки)"],
              ["Крючки + полка", "4 крючка для полотенец + верхняя полка", "+100–200 ₽", "Мало кто совмещает оба"],
              ["Антикоррозийная обработка", "Нержавейка 304 вместо 201, маркировать на упаковке", "+200–400 ₽", "У премиума, не у бюджета"],
              ["Установочный комплект в коробке", "Все крепежи + инструкция + уровень", "+50–100 ₽", "Часто жалуются что крепежа нет"],
              ["Кабель с вилкой 150+ см", "Длинный кабель (жалоба: короткий не достаёт)", "+30 ₽", "Нет — стандарт 100 см"],
              ["Гарантия 2 года (QR на карточке)", "Повышает доверие при похожих ценах", "0 ₽", "1 год стандарт"],
              ["Цвет: матовый чёрный / золото", "Дизайнерские ванные = спрос на нестандартные цвета", "+100–200 ₽", "Чёрный есть, золото — редко"],
            ]}
          />

          <h3 style={sH3}>Жалобы покупателей топов (из отзывов WB)</h3>
          {[
            { problem: "Нет крепежа / дюбелей в комплекте", solution: "Полный установочный комплект + инструкция с QR-видео" },
            { problem: "Короткий кабель (не достаёт до розетки)", solution: "Кабель 150 см + скрытое подключение «в розетку»" },
            { problem: "Нагревается неравномерно (верх горячий, низ холодный)", solution: "Терморегулятор + жидкостный нагрев (не плёночный)" },
            { problem: "Ржавеет через 6 месяцев", solution: "Нержавейка 304, маркировка «AISI 304» на упаковке" },
            { problem: "Упаковка повреждена при доставке", solution: "Усиленная коробка + пенопластовые уголки" },
            { problem: "Нет термостата — невозможно регулировать температуру", solution: "Встроенный терморегулятор с дисплеем (40–65°C)" },
          ].map((v, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "16px 0", marginBottom: 8 }}>
              <span style={{ color: C.green, fontSize: 14, flexShrink: 0 }}></span>
              <div>
                <div style={{ fontSize: 12, color: C.red, fontWeight: 400 }}>Жалоба: {v.problem}</div>
                <div style={{ fontSize: 12, color: C.green, marginTop: 2 }}>Решение: {v.solution}</div>
              </div>
            </div>
          ))}

          <h3 style={sH3}>Рекомендуемая конфигурация для входа</h3>
          <div style={{ ...sCard }}>
            <div style={{ fontSize: 15, fontWeight: 400, color: C.green, marginBottom: 10 }}>
              «Электрический полотенцесушитель 550мм с терморегулятором и полным комплектом»
            </div>
            <div style={{ display: "block", marginBottom: 24 }}>
              {[
                "Нержавейка AISI 304 (не 201)",
                "Терморегулятор с дисплеем (40–65°C)",
                "4 крючка для полотенец",
                "Кабель 150 см с вилкой",
                "Установочный комплект (дюбели, анкера, уровень)",
                "Инструкция на русском + QR → видео установки",
                "Гарантия 2 года",
                "Усиленная упаковка (пенопласт + картон)",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--personal-text)" }}>
                  <span style={{ color: C.green }}></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, fontSize: 13, color: C.text, fontWeight: 400 }}>
              COGS ≈ 2 919 ₽ + доп. комплектация ~500 ₽ = ~3 420 ₽ → Продажа: 6 500–7 500 ₽ → Маржа: 22–30%
            </div>
          </div>
        </Section>

        {/* ═══ 8. ENTRY STRATEGY ═══ */}
        <Section id="s8" num="8" title="Рекомендации: стратегия входа">

          <h3 style={sH3}>Пошаговый план</h3>
          {[
            {
              phase: "Фаза 1 — Сертификация и проверка качества (2–4 недели)",
              color: C.accent,
              items: [
                "Оформить сертификат ТР ТС 004/2011 (электробезопасность) + ТР ТС 020/2011 (ЭМС) — без них WB заблокирует карточку",
                "Проверить нагрев: замерить t° каждой перекладины через 15 / 30 / 60 мин (термометром или тепловизором). Убедиться что нагрев равномерный — жалоба №1 в отзывах конкурентов",
                "Проверить качество материала: магнитом определить нержавейку 304 (не магнитится) vs 201 (магнитится). Если 304 — указать AISI 304 на упаковке",
                "Проверить длину кабеля (конкуренты жалуются на короткий — убедиться что ≥ 150 см)",
                "Проверить комплектацию: крепёж, дюбели, инструкция — всё ли есть в коробке",
                "Изучить отзывы конкурентов (gentle, EL-TERM, Forb) на WB: выписать топ-5 жалоб и убедиться что наш товар их закрывает",
              ],
            },
            {
              phase: "Фаза 2 — Подготовка карточки (1–2 недели)",
              color: C.blue,
              items: [
                "Профессиональные фото (8+ ракурсов: товар, в ванной, крупный план терморегулятора, комплектация, инфографика с размерами)",
                "Видео установки (30 сек) + видео работы с термометром (доказать равномерный нагрев)",
                "Создать бренд: название, логотип, вкладыш с QR на видео-инструкцию по установке",
                "Упаковка: усиленная коробка + пенопластовые уголки (жалоба конкурентов — повреждения при доставке)",
              ],
            },
            {
              phase: "Фаза 3 — Запуск на WB (1–2 недели)",
              color: C.amber,
              items: [
                "Начать с FBS из Алматы (Акент) — минимальный риск, без заморозки на складе WB",
                "Цена старта: 5 990 ₽ (ниже EL-TERM/Forb, но с лучшей комплектацией)",
                "Название карточки: «Полотенцесушитель электрический [БРЕНД] 550мм с терморегулятором, нержавейка AISI 304, полный комплект»",
                "SEO: «полотенцесушитель электрический в ванную», «полотенцесушитель с терморегулятором», «электросушитель для полотенец»",
              ],
            },
            {
              phase: "Фаза 4 — Продвижение (первые 30 дней)",
              color: C.pink,
              items: [
                "Реклама в поиске по топ-5 ключевым запросам (бюджет: 30 000–50 000 ₽/мес)",
                "Самовыкупы 10–15 шт для разгона карточки + первые отзывы",
                "Мониторинг стокаутов конкурентов (EL-TERM, Forb, gentle) — увеличивать бюджет рекламы когда их нет в наличии",
                "Цель: выйти на 20–30 продаж/мес к концу первого месяца",
              ],
            },
            {
              phase: "Фаза 5 — Масштабирование",
              color: C.green,
              items: [
                "Перевести на FBW Актобе (до Казани 4 дня, покрытие ПФО/Урал)",
                "При ROI > 25% — отгрузка на центральный склад Подольск (полное покрытие РФ)",
                "Добавить цвета: золото, графит, хром",
                "Добавить Модель 2 (100×15) если Модель 1 стабильно в плюсе",
                "Цель: 50–100 продаж/мес = 3,6–9 М ₽/год",
              ],
            },
          ].map((p, i) => (
            <div key={i} style={{ ...sCard }}>
              <h3 style={{ fontSize: 15, fontWeight: 400, color: p.color, margin: "0 0 12px" }}>{p.phase}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {p.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--personal-text)", lineHeight: 1.6 }}>
                    <span style={{ color: p.color, fontWeight: 400, flexShrink: 0 }}>☐</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <h3 style={sH3}>Финансовый план (консервативный)</h3>
          <DataTable
            headers={["Показатель", "Тестовая фаза (мес 1–3)", "Масштаб (мес 4–12)"]}
            rows={[
              ["Партия", "50–100 шт", "200–500 шт"],
              ["Бюджет закупки", "750 000 ₸", "2–4 М ₸"],
              ["Цена продажи", "5 990–6 500 ₽", "6 500–7 500 ₽"],
              ["Продажи/мес", "15–30 шт", "50–100 шт"],
              ["Выручка/мес", "90–195 К ₽", "325–750 К ₽"],
              ["Маржа/мес (при 22%)", "20–43 К ₽", "72–165 К ₽"],
              ["ROI за период", "25–40%", "40–70%"],
            ]}
          />

          <h3 style={sH3}>Варианты логистики для тестового запуска</h3>
          <div style={{ display: "block", marginBottom: 20 }}>
            <div style={{ ...sCard, marginBottom: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 400, color: C.blue, marginBottom: 8 }}>ВАРИАНТ А — FBS из Алматы (Акент)</div>
              <div style={{ fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
                <p style={{ margin: "0 0 8px" }}>Отгрузка каждого заказа напрямую из Алматы через FBS. Товар хранится у себя, отправляется при заказе.</p>
                <div style={{ fontSize: 12, color: C.dim }}>
                  <div style={{ marginBottom: 4 }}><strong style={{ color: C.text }}>Плюсы:</strong> минимальный риск, нет предоплаты за хранение WB, полный контроль остатков</div>
                  <div style={{ marginBottom: 4 }}><strong style={{ color: C.text }}>Минусы:</strong> дольше доставка до покупателя (5–8 дней до Москвы), ниже ранжирование в выдаче</div>
                  <div><strong style={{ color: C.text }}>Для кого:</strong> тестовый запуск первых 20–50 шт, проверка спроса</div>
                </div>
              </div>
            </div>
            <div style={{ ...sCard, marginBottom: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 400, color: C.green, marginBottom: 8 }}>ВАРИАНТ Б — FBO/FBW со склада Актобе</div>
              <div style={{ fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
                <p style={{ margin: "0 0 8px" }}>Отгрузка на склад WB в Актобе (FBW). Оттуда до Казани — 4 дня, хорошее ранжирование на ПФО и Урал.</p>
                <div style={{ fontSize: 12, color: C.dim }}>
                  <div style={{ marginBottom: 4 }}><strong style={{ color: C.text }}>Плюсы:</strong> быстрая доставка в ПФО/Урал (4 дня до Казани), лучше ранжирование чем FBS, WB берёт логистику на себя</div>
                  <div style={{ marginBottom: 4 }}><strong style={{ color: C.text }}>Минусы:</strong> нужно отправить партию на склад WB, хранение за счёт продавца</div>
                  <div><strong style={{ color: C.text }}>Для кого:</strong> масштабирование после теста FBS, до выхода на центральные склады (Подольск)</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ ...sCard }}>
            <div style={{ fontSize: 15, fontWeight: 400, color: C.accent, marginBottom: 10 }}>Итоговый вердикт</div>
            <div style={{ fontSize: 13, color: "var(--personal-text)", lineHeight: 1.8 }}>
              <p style={{ margin: "0 0 10px" }}>
                <strong style={{ color: C.green }}> Заходить с Моделью 1 (550мм, 12 000 ₸).</strong> Рынок 600 М ₽, фрагментированный, sweet spot 5–10К ₽ — наш COGS позволяет продавать в этом диапазоне с маржой 20–30%. Хронические стокауты конкурентов = окно для входа.
              </p>
              <p style={{ margin: "0 0 10px" }}>
                <strong style={{ color: C.red }}> Модель 2 (100×15, 33 000 ₸) — отложить.</strong> Маржа тонкая, габарит сложный, спрос не доказан (47 шт/год у аналога). Запускать как расширение линейки после успеха Модели 1.
              </p>
              <p style={{ margin: "0 0 10px" }}>
                <strong style={{ color: C.blue }}>Рекомендуемый путь:</strong> Тест через FBS Алматы (20–50 шт, минимальный риск) → при 15+ продаж/мес перевести на FBW Актобе (покрытие ПФО/Урал за 4 дня) → при 50+ продаж/мес отгрузить на центральный склад Подольск (полное покрытие РФ).
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: C.accent }}>Стартовый бюджет (FBS тест):</strong> 20–50 шт × 12 000 ₸ = 240 000–600 000 ₸ (товар) + 30 000–50 000 ₽ на рекламу. Без риска заморозки на складе WB.
              </p>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}
