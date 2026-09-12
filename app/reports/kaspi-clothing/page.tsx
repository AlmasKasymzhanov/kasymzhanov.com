"use client";
import { IconlyArrowLeft } from "@/components/iconly-icons";
import { ResearchSection, ResearchFact, ResearchNote, ResearchFigure } from "@/components/canon/research-editorial";
import { ResearchReadingTime } from "@/components/canon/research-reading-time";

import { ResearchBars as BarChart } from "@/components/charts/research-bars";

import { useState } from "react";
import Link from "next/link";

/* ───── design tokens ───── */
const C = {
  bg: "var(--personal-paper)", surface: "var(--report-surface)", border: "var(--personal-border)",
  accent: "var(--personal-text)", green: "var(--personal-text)", text: "var(--personal-text)",
  dim: "var(--personal-muted)", faint: "var(--personal-border)", red: "var(--personal-text)", amber: "var(--personal-text)",
  blue: "var(--personal-text)", pink: "var(--personal-text)", cyan: "var(--personal-text)",
};

/* ───── style helpers ───── */
const sSection: React.CSSProperties = { marginBottom: 56 };
const sH2: React.CSSProperties = { fontSize: 22, fontWeight: 500, margin: "0 0 24px", color: C.text, letterSpacing: "-0.01em", borderBottom: `1px solid ${C.border}`, paddingBottom: 12 };
const sH3: React.CSSProperties = { fontSize: 16, fontWeight: 500, margin: "28px 0 12px", color: C.text };
const sP: React.CSSProperties = { fontSize: "var(--reading-body-size)", lineHeight: 1.75, color: "var(--personal-text)", margin: "0 0 12px" };
const sCard: React.CSSProperties = { margin: "24px 0", padding: 0 };

/* ───── Collapsible Section ───── */
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) { return <ResearchSection id={id} title={title}>{children}</ResearchSection>; }

/* ───── Metric Card ───── */
function MetricCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) { return <ResearchFact label={label} value={value} note={sub} />; }

/* ───── Bar Chart (CSS) ───── */


/* ───── Data Table ───── */
function DataTable({ headers, rows, highlight }: { headers: string[]; rows: (string | number)[][]; highlight?: number }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: 16 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>{headers.map((h, i) => (
            <th key={i} style={{ padding: "10px 12px", textAlign: i === 0 ? "left" : "right", color: C.dim, fontWeight: 500, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", fontSize: 11 }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: highlight !== undefined && ri === highlight ? `color-mix(in srgb, ${C.accent} 7%, transparent)` : "transparent" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: "10px 12px", textAlign: ci === 0 ? "left" : "right", color: ci === 0 ? C.text : "var(--personal-text)", borderBottom: `1px solid color-mix(in srgb, ${C.border} 13%, transparent)`, fontWeight: ci === 0 ? 500 : 400, whiteSpace: "nowrap" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/*                  MAIN PAGE                      */
/* ═══════════════════════════════════════════════ */
export default function KaspiClothingReport() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "var(--font-body)" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ═══ Header ═══ */}
        <div style={{ marginBottom: 16 }}>
          <Link href="/" style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}><IconlyArrowLeft size={17} className="reading-inline-icon" /> kasymzhanov.com</Link>
        </div>

        <div className="research-header" style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "inline-block", padding: "16px 0", color: C.accent, fontSize: 11, fontWeight: 400, letterSpacing: "0.05em", marginBottom: 16, textTransform: "none" }}>
            Аналитический отчёт
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 500, margin: "0 0 8px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Одежда на Kaspi.kz: рынок, тренды, возможности
          </h1>
<p className="research-lead">Объём рынка одежды, динамика категорий и конкурентная среда: какие направления стоит изучить подробнее.</p>
          <p style={{ color: C.dim, fontSize: 14, margin: "12px 0 0" }}>
            Подготовил <strong style={{ color: C.text }}>Алмас Касымжанов</strong>
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, color: C.dim }}>
            <span>Данные: <strong style={{ color: C.text }}>агрегированные данные Kaspi.kz</strong></span>
            <span>Период: <strong style={{ color: C.text }}>Дек 2024 — Янв 2026</strong></span>
            <span>Дата: <strong style={{ color: C.text }}>9 марта 2026</strong></span>
          </div>

<ResearchReadingTime />
</div>

        {/* ═══ TOC ═══ */}
        <div style={{ ...sCard, marginBottom: 48, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 400, color: C.dim, marginBottom: 12 }}>Содержание</div>
          {[
            ["sec-1", "1. Резюме: Одежда — это серьёзно"],
            ["sec-2", "2. Рынок в цифрах"],
            ["sec-3", "3. Подкатегории: Кто покупает"],
            ["sec-4", "4. ТОП ниши по выручке"],
            ["sec-5", "5. Бренды vs NoBrand"],
            ["sec-6", "6. Тренды и динамика роста"],
            ["sec-7", "7. Сезонность"],
            ["sec-8", "8. Расчётный прогноз на 2026"],
            ["sec-9", "9. Источники данных"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ display: "block", fontSize: 13, color: C.accent, textDecoration: "none", padding: "4px 0" }}>{label}</a>
          ))}
        </div>

        {/* ═══ Section 1: Обзор ═══ */}
        <Section id="sec-1" title="1. Резюме: Одежда — это серьёзно">
          <div className="research-facts" >
            <MetricCard label="Годовая выручка 2025" value="73.5 млрд ₸" sub="~$147M" color={C.accent} />
            <MetricCard label="Заказов за 2025" value="13.9M" sub="~1.2M заказов/мес в среднем" color={C.green} />
            <MetricCard label="Рост заказов YoY" value="x2.2" sub="Дек 2024 → Дек 2025" color={C.amber} />
          </div>

          <div style={{ ...sCard }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green, fontSize: 18 }}>Главный вывод</h3>
            <p style={sP}>
              <strong style={{ color: C.text }}>Одежда на Kaspi — рынок на 73 миллиарда тенге в год с ростом заказов в 2.2 раза за 12 месяцев.</strong>
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
              {[
                { num: 1, color: C.green, title: "Рынок не монополизирован", text: "Gini 0.655 — умеренная конкуренция. Для сравнения: Телефоны — 0.978 (полная монополия Samsung/Apple). В одежде есть место для новых игроков." },
                { num: 2, color: C.amber, title: "NoBrand зарабатывает", text: "36% выручки = 3.5 млрд ₸/мес — это товары без бренда. Средний чек NoBrand 5 118 ₸ — всего на 25% ниже брендов. Порог входа низкий." },
                { num: 3, color: C.blue, title: "138K SKU, постоянный рост", text: "Ассортимент огромный и продолжает расти. Заказы растут быстрее выручки — покупатели приходят на Kaspi за одеждой всё активнее." },
              ].map(v => (
                <div key={v.num} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>

                  <div>
                    <div style={{ fontWeight: 400, color: v.color, marginBottom: 4 }}>{v.title}</div>
                    <p style={{ ...sP, margin: 0 }}>{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ═══ Section 2: Market Numbers ═══ */}
        <Section id="sec-2" title="2. Рынок в цифрах">
          <p style={sP}>Данные за ноябрь 2025 — пиковый месяц по выручке:</p>
          <div style={{ display: "block", marginBottom: 24 }}>
            {[
              { label: "Выручка/мес", value: "9.7 млрд", color: C.accent },
              { label: "Заказов/мес", value: "1.66M", color: C.green },
              { label: "SKU", value: "138K", color: C.dim },
              { label: "Ср. чек", value: "5 857 ₸", color: C.amber },
            ].map(m => (
              <div key={m.label} style={{ ...sCard, padding: "16px 14px", textAlign: "center", marginBottom: 0 }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 16, fontWeight: 400, color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>

          <DataTable
            headers={["Показатель", "Ноябрь 2025"]}
            rows={[
              ["Выручка", "9 698 млн ₸"],
              ["Заказы", "1 655 774"],
              ["SKU", "138 445"],
              ["Средний чек", "5 857 ₸"],
              ["Ср. чек брендов", "6 370 ₸"],
              ["Ср. чек NoBrand", "5 118 ₸"],
              ["Доля брендов", "64%"],
              ["Доля NoBrand", "36%"],
              ["Gini (монополизация)", "0.655 — умеренная"],
            ]}
          />
        </Section>

        {/* ═══ Section 3: Subcategories ═══ */}
        <Section id="sec-3" title="3. Подкатегории: Кто покупает">
          <DataTable
            headers={["Подкатегория", "Выручка", "Заказы", "Бренды %", "Ср. чек", "Gini"]}
            rows={[
              ["Женщинам", "6 524M ₸", "1 151 681", "60%", "5 665 ₸", "0.665"],
              ["Мужчинам", "2 100M ₸", "282 034", "78%", "7 447 ₸", "0.614"],
              ["Мальчикам", "420M ₸", "80 802", "63%", "5 202 ₸", "0.571"],
              ["Девочкам", "396M ₸", "85 666", "59%", "4 627 ₸", "0.563"],
              ["Малышам", "257M ₸", "55 591", "72%", "4 617 ₸", "0.636"],
            ]}
          />

          <div style={{ display: "block", marginTop: 8, marginBottom: 24 }}>
            <div style={{ ...sCard, marginBottom: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 400, color: C.pink, marginBottom: 8 }}>Женская одежда — 67% рынка</div>
              <p style={{ ...sP, margin: 0 }}>6.5 млрд ₸/мес, 1.15M заказов. Самый крупный и конкурентный сегмент. Gini 0.665 — умеренная монополизация.</p>
            </div>
            <div style={{ ...sCard, marginBottom: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 400, color: C.blue, marginBottom: 8 }}>Мужская — 78% брендов</div>
              <p style={{ ...sP, margin: 0 }}>Самая высокая доля брендов. Средний чек 7 447 ₸ — на 31% выше женской. Мужчины на Kaspi покупают бренды.</p>
            </div>
          </div>

          <div style={{ ...sCard, marginTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 400, color: C.green, marginBottom: 8 }}>Детская одежда — недооценённый сегмент</div>
            <p style={{ ...sP, margin: 0 }}>Суммарно 1.07 млрд ₸/мес (Мальчики + Девочки + Малыши). Gini 0.56-0.57 — самая здоровая конкуренция во всей одежде. Низкий порог входа.</p>
          </div>
        </Section>

        {/* ═══ Section 4: Top Niches ═══ */}
        <Section id="sec-4" title="4. ТОП ниши по выручке">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.pink }}>Женская одежда — ТОП-10</h3>
            <BarChart
              color={C.pink}
              maxVal={322000000}
              data={[
                { label: "Брюки", value: 322000000 },
                { label: "Платья", value: 313000000 },
                { label: "Футболки", value: 293000000 },
                { label: "Спорт. кост.", value: 200000000 },
                { label: "Джинсы", value: 167000000 },
                { label: "Юбки", value: 145000000 },
                { label: "Спецодежда", value: 85000000 },
                { label: "Топы/майки", value: 77000000 },
                { label: "Шорты", value: 39000000 },
                { label: "Намазники", value: 37000000 },
              ]}
              unit="₸"
            />
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.blue }}>Мужская одежда — ТОП-10</h3>
            <BarChart
              color={C.blue}
              maxVal={212000000}
              data={[
                { label: "Футболки", value: 212000000 },
                { label: "Спорт. кост.", value: 191000000 },
                { label: "Брюки", value: 111000000 },
                { label: "Спецодежда", value: 97000000 },
                { label: "Джинсы", value: 46000000 },
                { label: "Рубашки", value: 33000000 },
                { label: "Шорты", value: 22000000 },
                { label: "Нац. кост.", value: 20000000 },
                { label: "Плавки", value: 18000000 },
                { label: "Карнавал.", value: 11000000 },
              ]}
              unit="₸"
            />
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green }}>Детская одежда — ТОП-5</h3>
            <DataTable
              headers={["Ниша", "Выручка/мес"]}
              rows={[
                ["Платья и сарафаны для девочек", "35M ₸"],
                ["Футболки для мальчиков", "36M ₸"],
                ["Комплекты для девочек", "32M ₸"],
                ["Футболки для девочек", "28M ₸"],
                ["Спортивные костюмы для мальчиков", "28M ₸"],
              ]}
            />
          </div>
        </Section>

        {/* ═══ Section 5: Brand vs NoBrand ═══ */}
        <Section id="sec-5" title="5. Бренды vs NoBrand">
          <div className="research-facts" >
            <MetricCard label="Бренды" value="64%" sub="6 225M ₸ | чек 6 370 ₸" color={C.accent} />
            <MetricCard label="NoBrand" value="36%" sub="3 473M ₸ | чек 5 118 ₸" color={C.amber} />
          </div>

          <div style={{ ...sCard }}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Ключевой инсайт</h3>
            <p style={sP}>
              В одежде разрыв между чеком бренда и NoBrand — всего <strong style={{ color: C.text }}>25%</strong> (6 370 vs 5 118 ₸).
              Для сравнения: в электронике бренды дороже в 10 раз. В одежде NoBrand-продавцы конкурируют на равных.
            </p>
            <p style={sP}>
              <strong style={{ color: C.amber }}>3.5 млрд ₸ в месяц</strong> — это выручка NoBrand в одежде. Это не «делать нечего» — это огромный рынок без барьеров.
            </p>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Динамика Brand/NoBrand по месяцам</h3>
            <DataTable
              headers={["Месяц", "Бренды %", "NoBrand %", "Чек бренд", "Чек NoBrand"]}
              rows={[
                ["Дек 2024", "61%", "39%", "8 125 ₸", "7 270 ₸"],
                ["Мар 2025", "67%", "33%", "6 593 ₸", "5 547 ₸"],
                ["Июн 2025", "65%", "35%", "4 865 ₸", "4 006 ₸"],
                ["Авг 2025", "65%", "35%", "4 864 ₸", "3 948 ₸"],
                ["Ноя 2025", "64%", "36%", "6 370 ₸", "5 118 ₸"],
                ["Дек 2025", "59%", "41%", "5 092 ₸", "4 367 ₸"],
                ["Янв 2026", "66%", "34%", "5 215 ₸", "4 707 ₸"],
              ]}
            />
            <p style={{ ...sP, color: C.green }}>
              Доля NoBrand стабильно <strong>35-41%</strong> весь год. В декабре растёт до 41% — сезонные покупатели берут без оглядки на бренд.
            </p>
          </div>
        </Section>

        {/* ═══ Section 6: Trends ═══ */}
        <Section id="sec-6" title="6. Тренды и динамика роста">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Выручка по месяцам</h3>
            <BarChart
              color={C.accent}
              maxVal={9698000000}
              data={[
                { label: "Дек 2024", value: 5405000000 },
                { label: "Янв 2025", value: 5053000000 },
                { label: "Фев 2025", value: 5829000000 },
                { label: "Мар 2025", value: 6311000000 },
                { label: "Апр 2025", value: 4900000000 },
                { label: "Май 2025", value: 1520000000 },
                { label: "Июн 2025", value: 7054000000 },
                { label: "Июл 2025", value: 1789000000 },
                { label: "Авг 2025", value: 8017000000 },
                { label: "Сен 2025", value: 7156000000 },
                { label: "Окт 2025", value: 8761000000 },
                { label: "Ноя 2025", value: 9698000000 },
                { label: "Дек 2025", value: 7441000000 },
                { label: "Янв 2026", value: 2933000000 },
              ]}
              unit="₸"
            />
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Заказы по месяцам</h3>
            <BarChart
              color={C.green}
              maxVal={1783358}
              data={[
                { label: "Дек 2024", value: 696017 },
                { label: "Янв 2025", value: 748317 },
                { label: "Фев 2025", value: 865545 },
                { label: "Мар 2025", value: 1017620 },
                { label: "Апр 2025", value: 987175 },
                { label: "Май 2025", value: 360307 },
                { label: "Июн 2025", value: 1560137 },
                { label: "Июл 2025", value: 449064 },
                { label: "Авг 2025", value: 1783358 },
                { label: "Сен 2025", value: 1417197 },
                { label: "Окт 2025", value: 1507893 },
                { label: "Ноя 2025", value: 1655774 },
                { label: "Дек 2025", value: 1561118 },
                { label: "Янв 2026", value: 583154 },
              ]}
            />
          </div>

          <div style={{ ...sCard }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green }}>Рост год к году</h3>
            <div style={{ display: "block", marginBottom: 24 }}>
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>Выручка Дек 2024 → Дек 2025</div>
                <div style={{ fontSize: 16, fontWeight: 400, color: C.green }}>+38%</div>
                <div style={{ fontSize: 12, color: C.dim }}>5.4 → 7.4 млрд ₸</div>
              </div>
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>Заказы Дек 2024 → Дек 2025</div>
                <div style={{ fontSize: 16, fontWeight: 400, color: C.amber }}>x2.2</div>
                <div style={{ fontSize: 12, color: C.dim }}>696K → 1.56M</div>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ Section 7: Seasonality ═══ */}
        <Section id="sec-7" title="7. Сезонность">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Паттерн сезонности</h3>
            <DataTable
              headers={["Период", "Характеристика", "Выручка"]}
              rows={[
                ["Янв-Мар", "Весенний рост, подготовка к сезону", "5.0-6.3 млрд ₸"],
                ["Апр", "Переходный месяц", "4.9 млрд ₸"],
                ["Май", "Провал (в 4x ниже пика)", "1.5 млрд ₸"],
                ["Июн", "Летний пик", "7.1 млрд ₸"],
                ["Июл", "Провал (в 4x ниже пика)", "1.8 млрд ₸"],
                ["Авг-Ноя", "Осенний пик — максимум года", "7.2-9.7 млрд ₸"],
                ["Дек", "Зимние продажи, подарки", "7.4 млрд ₸"],
              ]}
            />
            <div style={{ padding: "16px 0", fontSize: 13, color: "var(--personal-text)" }}>
              <strong style={{ color: C.amber }}>Важно для планирования:</strong> Май и июль — глубокие провалы. Пик продаж — сентябрь-ноябрь. Закупки на осенний сезон нужно делать в июне-июле.
            </div>
          </div>
        </Section>

        {/* ═══ Section 8: Forecast ═══ */}
        <Section id="sec-8" title="8. Расчётный прогноз на 2026">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Сценарий динамики рынка</h3>
            <DataTable
              headers={["Месяц", "Прогноз выручки", "Прогноз заказов"]}
              rows={[
                ["Февраль 2026", "8.0 млрд ₸", "1 489K"],
                ["Март 2026", "8.6 млрд ₸", "1 709K"],
                ["Апрель 2026", "6.6 млрд ₸", "1 622K"],
                ["Май 2026", "2.0 млрд ₸", "580K"],
                ["Июнь 2026", "9.4 млрд ₸", "2 466K"],
                ["Июль 2026", "2.4 млрд ₸", "698K"],
              ]}
              highlight={4}
            />
            <div style={{ display: "block", marginTop: 16, marginBottom: 24 }}>
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>Прогноз на июнь 2026</div>
                <div style={{ fontSize: 16, fontWeight: 400, color: C.green }}>9.4 млрд ₸</div>
                <div style={{ fontSize: 12, color: C.dim }}>Рекордные 2.47M заказов</div>
              </div>
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>Тренд</div>
                <div style={{ fontSize: 16, fontWeight: 400, color: C.accent }}>Рост</div>
                <div style={{ fontSize: 12, color: C.dim }}>Рынок продолжает расти</div>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ Section 9: Sources + QR ═══ */}
        <Section id="sec-9" title="9. Источники данных">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Источник</h3>
            <p style={sP}>Агрегированные показатели продаж Kaspi.kz за декабрь 2024 — январь 2026 и расчётный сценарий на февраль–июль 2026.</p>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Расшифровка метрик</h3>
            <DataTable
              headers={["Метрика", "Описание"]}
              rows={[
                ["Gini (Джини)", "Мера монополизации: 0 = равенство, 1 = монополия. < 0.5 здоровая, 0.5-0.7 умеренная, > 0.7 высокая"],
                ["NoBrand", "Товары без бренда. Высокая доля = низкий порог входа для новых продавцов"],
                ["SKU", "Количество уникальных товарных позиций"],
                ["Средний чек", "Средняя стоимость одного заказа"],
                ["YoY", "Year-over-Year — сравнение год к году"],
              ]}
            />
          </div>

          {/* Kaspi Market */}
          <div style={{ ...sCard, textAlign: "center", padding: "40px 24px" }}>
            <div style={{ fontSize: 16, fontWeight: 400, color: C.text, marginBottom: 8 }}>Больше исследований Kaspi Market</div>
            <p style={{ ...sP, textAlign: "center", marginBottom: 24 }}>Рыночные срезы, глубокие исследования и практические разборы категорий Kaspi</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://kasymzhanov.com/kaspi&bgcolor=111119&color=e8e8f0"
              alt="QR-код раздела Kaspi Market"
              width={200}
              height={200}
              style={{ margin: "0 auto", borderRadius: 8, display: "block" }}
            />
            <p style={{ fontSize: 13, color: C.accent, marginTop: 16 }}>kasymzhanov.com/kaspi</p>
          </div>
        </Section>

        {/* ═══ Footer ═══ */}
        <div style={{ paddingTop: 32, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
          <p style={{ ...sP, fontSize: 12, color: "var(--personal-muted)" }}>
            Подготовил Almas Kasymzhanov | <Link href="/" style={{ color: C.accent, textDecoration: "none" }}>kasymzhanov.com</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
