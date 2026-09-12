"use client";
import { ResearchSection, ResearchFact, ResearchNote, ResearchFigure } from "@/components/canon/research-editorial";
import { ResearchReadingTime } from "@/components/canon/research-reading-time";


const C = {
  bg: "var(--personal-paper)", surface: "var(--report-surface)", border: "var(--personal-border)",
  accent: "var(--personal-text)", green: "var(--personal-text)", text: "var(--personal-text)",
  dim: "var(--personal-muted)", red: "var(--personal-text)", amber: "var(--personal-text)",
  blue: "var(--personal-text)", pink: "var(--personal-text)", cyan: "var(--personal-text)",
  kaspi: "var(--personal-text)", wb: "var(--personal-text)",
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

function Section({ id, num, title, color, children }: { id: string; num: string; title: string; color?: string; children: React.ReactNode }) { return <ResearchSection id={id} title={title}>{children}</ResearchSection>; }

function MetricGrid({ items }: { items: { label: string; value: string; sub?: string }[] }) { return <div className="research-facts">{items.map((item, i) => <ResearchFact key={i} label={item.label} value={item.value} note={item.sub} />)}</div>; }

export default function FootStretcherAnalysisPage() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "var(--font-body)" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* HEADER */}
        <div className="research-header" style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={sBadge(C.wb)}>Wildberries</span>
            <span style={sBadge(C.kaspi)}>Kaspi.kz</span>
            <span style={sBadge(C.accent)}>Enterprise</span>
            <span style={sBadge(C.green)}>Микро-ниша</span>
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 500, margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Тренажёр для растяжки подъёма стопы
          </h1>
          <p className="research-lead" style={{ fontSize: 16, color: C.dim, margin: 0, lineHeight: 1.6 }}>
            Полный Enterprise-анализ микро-ниши: рынок WB (агрегированные данные Wildberries, годовой срез), проверка Kaspi.kz (агрегированные рыночные данные), unit-экономика, стратегия дифференциации, сезонность, рекомендации по входу.
          </p>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 12 }}>
            18 апреля 2026 · Данные: агрегированные данные Wildberries WB (18.04.2025–17.04.2026), агрегированные рыночные данные Kaspi (Feb 2026), live Kaspi, 1688
          </div>

<a href="/authors/almas-kasymzhanov" className="research-author">Алмас Касымжанов</a>
<ResearchReadingTime />
</div>

        {/* TOC */}
        <div style={{ ...sCard }}>
          <h2 style={{ fontSize: 14, fontWeight: 400, color: C.accent, margin: "0 0 12px", textTransform: "none", letterSpacing: "0.05em" }}>Содержание</h2>
          {[
            ["0", "Обзор"],
            ["1", "Wildberries: анализ ниши"],
            ["2", "Wildberries: unit-экономика"],
            ["3", "Wildberries: стратегия дифференциации"],
            ["4", "Wildberries: рекомендации"],
            ["5", "Kaspi.kz: анализ и возможности"],
            ["6", "Kaspi.kz: рекомендации"],
            ["7", "WB vs Kaspi: сравнение и общая стратегия"],
          ].map(([n, t]) => (
            <div key={n} style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--personal-text)", padding: "5px 0" }}>
              <span style={{ color: C.accent, fontWeight: 400, minWidth: 20 }}>{n}.</span>
              <a href={`#s${n}`} style={{ color: "var(--personal-text)", textDecoration: "none" }}>{t}</a>
            </div>
          ))}
        </div>

        {/* ═══ 0. EXEC SUMMARY ═══ */}
        <Section id="s0" num="0" title="Обзор">
          <div style={{ display: "block", marginBottom: 20 }}>
            <div style={{ ...sCard, marginBottom: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 400, color: C.wb, marginBottom: 10 }}>WILDBERRIES</div>
              <div style={{ fontSize: 16, fontWeight: 400, color: C.text }}>9,09 млн ₽</div>
              <div style={{ fontSize: 12, color: C.dim, marginTop: 2 }}>выручка/год · 3 176 продаж</div>
              <div style={{ fontSize: 13, color: C.amber, fontWeight: 400, marginTop: 10 }}>Foot Beauty = 96,5% рынка</div>
              <div style={{ fontSize: 12, color: "var(--personal-text)", marginTop: 6, lineHeight: 1.6 }}>
                Монополия одного продавца. Хронические стокауты (lost profit 15–47%). Комиссия 27,5%. Выкуп 63%.
              </div>
            </div>
            <div style={{ ...sCard, marginBottom: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 400, color: C.kaspi, marginBottom: 10 }}>KASPI.KZ</div>
              <div style={{ fontSize: 16, fontWeight: 400, color: C.text }}>0 SKU</div>
              <div style={{ fontSize: 12, color: C.dim, marginTop: 2 }}>ниша пустая · спрос не доказан</div>
              <div style={{ fontSize: 13, color: C.green, fontWeight: 400, marginTop: 10 }}>Чистое поле</div>
              <div style={{ fontSize: 12, color: "var(--personal-text)", marginTop: 6, lineHeight: 1.6 }}>
                Ни одного конкурента. Комиссия 10,9%. Выкуп ~95%+. Потолок рынка КЗ — 1–4 млн ₸/год.
              </div>
            </div>
          </div>

          <div style={{ paddingLeft: 14, fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
            <strong style={{ color: C.amber }}>Ключевой вывод: </strong>
            при текущей закупке 128 юаней (10 176 ₸/шт) продавать на WB по рыночной цене (2 700–3 500 ₽) <strong style={{ color: C.red }}>убыточно</strong>.
            Единственный рабочий путь — <strong style={{ color: C.green }}>премиум-набор 5 500–6 500 ₽</strong> с дифференциацией от Foot Beauty.
            На Kaspi — дополнительный канал без конкуренции по 12 000–15 000 ₸.
          </div>
        </Section>

        {/* ═══ 1. WB NICHE ═══ */}
        <Section id="s1" num="1" title="Wildberries: анализ ниши" color={C.wb}>
          <MetricGrid items={[
            { label: "Выручка/год", value: "9,09 М ₽", sub: "факт + 30–50% потерь на OOS" },
            { label: "Продажи/год", value: "3 176 шт" },
            { label: "SKU с продажами", value: "43", sub: "из 474 созданных" },
            { label: "Средний чек", value: "3 174 ₽" },
            { label: "Комиссия FBO", value: "27,5%" },
            { label: "Выкуп", value: "63%", sub: "ниже нормы WB (70–80%)" },
          ]} />

          <h3 style={sH3}>Монополия Foot Beauty (ИП Корзоев А.В.)</h3>
          <DataTable
            headers={["Бренд", "SKU", "Продажи", "Выручка", "Доля рынка"]}
            rows={[
              ["Foot Beauty", "41", "2 901", "8,77 М ₽", "96,5%"],
              ["(Без бренда)", "238", "91", "170 К ₽", "1,9%"],
              ["Moby Kids", "3", "75", "95 К ₽", "1,1%"],
              ["Остальные", "192", "109", "60 К ₽", "0,5%"],
            ]}
          />
          <div style={{ paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
            <strong style={{ color: C.red }}>Слабые места Foot Beauty: </strong>
            Lost profit 15–47% на топовых SKU (хронические стокауты, balance 0–3 при 1.5+ продаж/день). Stock utilization 13–65% — половину времени товара нет в наличии.
            Реальный спрос <strong style={{ color: C.text }}>на 30–50% выше</strong> зафиксированного (потенциал ниши 12–14 М ₽/год).
          </div>

          <h3 style={sH3}>Разбивка по типу продукта</h3>
          <DataTable
            headers={["Тип", "SKU", "Продажи", "Выручка", "Ср. цена"]}
            rows={[
              ["Одинарный тренажёр", "11", "1 906 (65%)", "5,55 М ₽", "3 089 ₽"],
              ["Комплект 2 шт", "12", "516 (18%)", "2,19 М ₽", "5 280 ₽"],
              ["С сумкой", "2", "153 (5%)", "538 К ₽", "3 575 ₽"],
              ["Мягкий", "2", "187 (6%)", "360 К ₽", "2 673 ₽"],
              ["Резинки (допник)", "1", "139 (5%)", "129 К ₽", "1 137 ₽"],
            ]}
          />

          <h3 style={sH3}>Топ-цвета (Foot Beauty)</h3>
          <DataTable
            headers={["Цвет", "Продажи", "Выручка", "Доля"]}
            rows={[
              ["Розовый", "740", "2,14 М ₽", "24,4%"],
              ["Светлый песок", "369", "1,22 М ₽", "13,9%"],
              ["Серебристый", "377", "1,12 М ₽", "12,8%"],
              ["Фиолетовый", "367", "1,06 М ₽", "12,1%"],
              ["Золотистый", "303", "839 К ₽", "9,6%"],
              ["Нюдовый", "109", "705 К ₽", "8,0%"],
            ]}
          />

          <h3 style={sH3}>Сезонность (оценка по целевой аудитории)</h3>
          <p style={sP}>Ниша привязана к балетному/танцевальному/гимнастическому циклу. Целевая аудитория — девочки и женщины 10–35 лет.</p>
          <DataTable
            headers={["Период", "Спрос", "Причина"]}
            rows={[
              ["Сентябрь–Октябрь", " Пик", "Начало учебного года, набор в танц. школы"],
              ["Ноябрь–Декабрь", "Средний+", "Подготовка к новогодним концертам, подарки"],
              ["Январь–Февраль", " Пик", "Зимние тренировки, подарки «на НГ» дошли"],
              ["Март–Апрель", "Средний+", "Весенние экзамены, отчётные концерты, 8 Марта"],
              ["Май", "Средний", "Выпускные"],
              ["Июнь–Август", " Спад", "Каникулы, лагеря"],
            ]}
          />
        </Section>

        {/* ═══ 2. WB UNIT ECONOMICS ═══ */}
        <Section id="s2" num="2" title="Wildberries: unit-экономика" color={C.wb}>

          <h3 style={sH3}>Себестоимость (данные поставщика 1688)</h3>
          <DataTable
            headers={["Статья", "Сумма"]}
            rows={[
              ["FOB (128 юаней × 150 шт)", "1 341 150 ₸"],
              ["Логистика China → Almaty (230 кг × $1.5)", "165 255 ₸"],
              ["Внутренняя логистика", "20 000 ₸"],
              ["ИТОГО", "1 526 405 ₸"],
              ["За штуку до Алматы", "10 176 ₸ ≈ 1 754 ₽"],
              ["+ Алматы → WB склад (Подольск)", "+350 ₽"],
              ["+ Упаковка", "+80 ₽"],
              ["COGS до склада WB", "2 184 ₽/шт"],
            ]}
          />

          <h3 style={sH3}>Юнит-экономика при разных ценах (на 100 шт отправленных)</h3>
          <DataTable
            headers={["Цена", "Выкуп", "Выручка", "Комиссия 27,5%", "WB логист.", "COGS", "Возврат лог.", "Прибыль", "ROI"]}
            rows={[
              ["3 000 ₽", "63 шт", "189 000", "−51 975", "−12 000", "−218 400", "−3 700", " −97 075", "−44%"],
              ["3 500 ₽", "63 шт", "220 500", "−60 638", "−12 000", "−218 400", "−3 700", " −74 238", "−34%"],
              ["4 500 ₽", "63 шт", "283 500", "−77 963", "−12 000", "−218 400", "−3 700", " −28 563", "−13%"],
              ["5 500 ₽", "63 шт", "346 500", "−95 288", "−12 000", "−218 400", "−3 700", " +17 112", "+8%"],
              ["6 000 ₽", "63 шт", "378 000", "−103 950", "−12 000", "−218 400", "−3 700", " +39 950", "+18%"],
              ["6 500 ₽", "63 шт", "409 500", "−112 613", "−12 000", "−218 400", "−3 700", " +62 787", "+29%"],
            ]}
          />

          <div style={{ ...sCard }}>
            <div style={{ fontSize: 14, fontWeight: 400, color: C.red, marginBottom: 8 }}>Точка безубыточности: 5 126 ₽</div>
            <p style={{ ...sP, margin: 0 }}>
              При текущих ценах Foot Beauty (2 700–3 500 ₽ за одинарный) — убыток до 1 541 ₽ на каждой проданной штуке.
              Продавать по рыночной цене при закупке 128 юаней <strong style={{ color: C.red }}>невозможно</strong>.
            </p>
          </div>
        </Section>

        {/* ═══ 3. WB DIFFERENTIATION ═══ */}
        <Section id="s3" num="3" title="Wildberries: стратегия дифференциации" color={C.wb}>
          <p style={sP}>
            Единственный путь продавать при COGS 2 184 ₽ — <strong style={{ color: C.text }}>не конкурировать с Foot Beauty по цене</strong>, а создать товар из другой категории: «профессиональный набор» вместо «кусок дерева в пакете».
          </p>

          <h3 style={sH3}>Состав премиум-набора «6-в-1»</h3>
          <DataTable
            headers={["Компонент", "Что даёт покупателю", "Доп. COGS", "Есть у Foot Beauty?"]}
            rows={[
              ["Тренажёр из бука (лак, скруглённые углы)", "Премиальный вид, нет заноз", "0 ₽ (в цене FOB)", "Базовое дерево, без обработки"],
              ["3 резинки разной жёсткости (light/medium/heavy)", "Прогрессивная нагрузка", "~80 ₽", "Нет"],
              ["Неопреновая подкладка на подъём", "Решает жалобу №1 (боль/синяки)", "~50 ₽", "Нет"],
              ["Сумка-чехол (брендированная)", "Портативность, подарочный вид", "~120 ₽", "Только у «с сумкой» (3 575 ₽)"],
              ["Карточка с QR → видеокурс 12 упражнений", "Обучение + engagement", "~15 ₽", "Нет"],
              ["Антискользящие накладки (4 шт)", "Решает жалобу: тренажёр скользит", "~20 ₽", "Нет"],
            ]}
          />

          <div style={{ ...sCard }}>
            <div style={{ fontSize: 14, fontWeight: 400, color: C.green, marginBottom: 8 }}>
              Доп. COGS за аксессуары: ~285 ₽ → итого COGS набора ≈ 2 470 ₽
            </div>
            <p style={{ ...sP, margin: 0 }}>
              При продаже за 5 990 ₽ — маржа ~1 000 ₽/шт (ROI 25%+). Набор визуально и по содержанию несравним с голым тренажёром FB за 3 000 ₽.
            </p>
          </div>

          <h3 style={sH3}>Позиционирование: почему покупатель заплатит 6 000 вместо 3 000</h3>
          <DataTable
            headers={["Критерий", "Foot Beauty (3 000 ₽)", "Ваш набор (5 990 ₽)"]}
            rows={[
              ["Комплектация", "Голый тренажёр", "6-в-1: тренажёр + 3 резинки + подкладка + сумка"],
              ["Материал", "Дерево без обработки", "Бук, мат-лак, скруглённые углы"],
              ["Упаковка", "Полиэтиленовый пакет", "Картонная коробка (подарочный вид)"],
              ["Инструкция", "Нет", "QR → видеокурс 12 упражнений"],
              ["Решение боли", "Синяки на подъёме", "Неопреновая подкладка + антискольз."],
              ["Подарочность", " Не подарок", " Готовый подарок (1 сент, 8 марта, НГ)"],
            ]}
          />

          <h3 style={sH3}>Расширение аудитории</h3>
          <p style={sP}>Foot Beauty позиционирует только для балета. Реальная аудитория шире:</p>
          <DataTable
            headers={["Сегмент", "Размер рынка", "Как привлечь"]}
            rows={[
              ["Художественная гимнастика", "Крупнейший (больше балета в РФ)", "SEO: «тренажер для гимнастки подъем стопы»"],
              ["Балет / современный танец", "Основной текущий", "Визуал с пуантами, студийное фото"],
              ["Фигурное катание", "Средний", "Эстетика стопы влияет на оценку"],
              ["Йога / пилатес / barre", "Растущий (25–40 женщины)", "«Гибкость стопы для лотоса и pigeon pose»"],
              ["Реабилитация (после травм)", "Нишевый", "«Восстановление подвижности голеностопа»"],
            ]}
          />

          <h3 style={sH3}>Жалобы покупателей Foot Beauty (из отзывов WB)</h3>
          {[
            { problem: "Боль/синяки на подъёме стопы", solution: "Неопреновая подкладка в комплекте", status: " решаем" },
            { problem: "Нет инструкции, не понятно как пользоваться", solution: "QR → видеокурс 12 упражнений", status: " решаем" },
            { problem: "Дерево с занозами, не обработано", solution: "Бук + мат-лак + скруглённые углы", status: " решаем" },
            { problem: "Скользит по полу", solution: "4 антискользящие силиконовые ножки", status: " решаем" },
            { problem: "Одна жёсткость — либо слишком жёстко, либо слишком мягко", solution: "3 резинки light/medium/heavy", status: " решаем" },
            { problem: "Негде хранить / неудобно носить в студию", solution: "Брендированная сумка-чехол", status: " решаем" },
          ].map((v, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "16px 0", marginBottom: 8 }}>
              <span style={{ color: C.green, fontSize: 14, flexShrink: 0 }}>{v.status}</span>
              <div>
                <div style={{ fontSize: 12, color: C.red, fontWeight: 400 }}>Жалоба: {v.problem}</div>
                <div style={{ fontSize: 12, color: C.green, marginTop: 2 }}>Решение: {v.solution}</div>
              </div>
            </div>
          ))}
        </Section>

        {/* ═══ 4. WB RECOMMENDATIONS ═══ */}
        <Section id="s4" num="4" title="Wildberries: рекомендации" color={C.wb}>

          <h3 style={sH3}>1. Закупка</h3>
          <div style={sCard}>
            <DataTable
              headers={["Сценарий", "Объём", "Бюджет", "Рекомендация"]}
              rows={[
                ["Тест (проверка гипотезы)", "30 шт × 3 цвета = 30 шт", "~350 000 ₸", " Начать с этого"],
                ["Масштаб (если тест плюсовой)", "150 шт × 3 цвета", "~1 750 000 ₸", "После 20+ продаж с ROI > 15%"],
                ["Если FOB снизится до 60 юаней", "200 шт", "~1 100 000 ₸", "Идеальный сценарий — маржа 40%+"],
              ]}
            />
            <div style={{ paddingLeft: 14, fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
              <strong style={{ color: C.amber }}>Критически важно: </strong>
              параллельно с тестом вести переговоры с фабриками (не торговыми компаниями) на 1688/Alibaba. Целевая цена — 50–60 юаней за набор. При 50 юанях COGS падает до ~1 100 ₽ → безубыточность при 2 800 ₽ → можно конкурировать с Foot Beauty лоб в лоб.
            </div>
          </div>

          <h3 style={sH3}>2. Цветовая гамма</h3>
          <DataTable
            headers={["Приоритет", "Цвет", "Доля продаж FB", "Для старта"]}
            rows={[
              ["1", "Розовый / пыльная роза", "25,5%", " 40% партии"],
              ["2", "Фиолетовый / лавандовый", "15,3%", " 30% партии"],
              ["3", "Бежевый / нюдовый", "12,4%", " 30% партии"],
              ["4", "Серебристый", "12,8%", "Второй волной"],
              ["5", "Золотистый", "9,6%", "Второй волной"],
            ]}
          />

          <h3 style={sH3}>3. Формат набора</h3>
          <div style={{ ...sCard }}>
            <div style={{ fontSize: 14, fontWeight: 400, color: C.green, marginBottom: 10 }}>Рекомендуемый формат: Набор «6-в-1» по 5 990 ₽</div>
            <p style={{ ...sP, margin: 0 }}>
              Тренажёр + 3 резинки + неопреновая подкладка + сумка + карточка с QR → видеокурс + антискользящие ножки. Доп. COGS ~285 ₽, итого ~2 470 ₽. Название карточки: «Профессиональный набор для растяжки подъёма стопы 6-в-1 [БРЕНД] — тренажёр + резинки + сумка».
            </p>
          </div>

          <h3 style={sH3}>4. Стратегия входа на WB</h3>
          {[
            { step: "1", color: C.accent, title: "Тестовая партия (июль–август 2026)", text: "30 шт авиакарго, 3 цвета. Цена 5 990 ₽. Профессиональные фото (6+ ракурсов, с балериной). Видеокурс на YouTube (12 упражнений)." },
            { step: "2", color: C.blue, title: "Запуск (сентябрь — пик сезона)", text: "FBO, склад Подольск. Самовыкупы 5–10 шт для разгона карточки. Реклама в поиске по «тренажер подъем стопы», «тренажер для балета», «тренажер для гимнастики стопы»." },
            { step: "3", color: C.amber, title: "Захват стокаутов FB (октябрь+)", text: "Мониторить наличие Foot Beauty. Когда их баланс = 0 (это происходит 35–50% времени), увеличивать рекламный бюджет. Их покупатели переходят к первому доступному конкуренту." },
            { step: "4", color: C.green, title: "Масштаб (ноябрь–декабрь)", text: "Если ROI > 15% — контейнер 150+ шт. Расширить цвета (серебристый, золотой). Добавить «мягкий» вариант по 3 990 ₽." },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 14, padding: "16px 0", marginBottom: 10 }}>

              <div>
                <div style={{ fontSize: 13, fontWeight: 400, color: C.text, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: "var(--personal-text)", lineHeight: 1.6 }}>{s.text}</div>
              </div>
            </div>
          ))}
        </Section>

        {/* ═══ 5. KASPI ═══ */}
        <Section id="s5" num="5" title="Kaspi.kz: анализ и возможности" color={C.kaspi}>

          <MetricGrid items={[
            { label: "SKU на Kaspi", value: "0", sub: "ниша полностью пустая" },
            { label: "Конкуренты", value: "0", sub: "ни одного продавца" },
            { label: "Комиссия Kaspi", value: "10,9%", sub: "vs 27,5% на WB" },
            { label: "Kaspi Pay", value: "0,95%", sub: "с каждой продажи" },
            { label: "Выкуп", value: "~95%+", sub: "покупатель платит вперёд" },
            { label: "COGS (до Алматы)", value: "10 176 ₸", sub: "уже на месте" },
          ]} />

          <h3 style={sH3}>Результаты проверки</h3>
          <DataTable
            headers={["Поисковый запрос", "агрегированные рыночные данные", "Kaspi.kz live"]}
            rows={[
              ["«тренажер стопы»", "0 результатов", "Нет релевантных"],
              ["«подъем стопы»", "1 (корректор, не наш товар)", "Ортопедические накладки"],
              ["«тренажер балет»", "0 результатов", "Нет"],
              ["«растяжка стопы»", "0 результатов", "Ленты для растяжки (не то)"],
              ["«foot stretcher»", "0 результатов", "Нет"],
            ]}
          />

          <div style={{ paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
            <strong style={{ color: C.green }}>Чистое поле: </strong>
            ни одного конкурента, ни одного аналога. Foot Beauty не вышел на Kaspi. Единственный КЗ-магазин bileshop.kz продаёт деревянный foot stretcher отдельно от маркетплейса.
          </div>

          <h3 style={sH3}>Unit-экономика Kaspi</h3>
          <DataTable
            headers={["Цена продажи", "Комиссия + Pay (11,85%)", "COGS", "Прибыль", "Маржа"]}
            rows={[
              ["12 000 ₸", "−1 422 ₸", "−10 176 ₸", " +402 ₸", "3,4%"],
              ["15 000 ₸", "−1 778 ₸", "−10 176 ₸", " +3 047 ₸", "20,3%"],
              ["18 000 ₸", "−2 133 ₸", "−10 176 ₸", " +5 691 ₸", "31,6%"],
              ["20 000 ₸", "−2 370 ₸", "−10 176 ₸", " +7 454 ₸", "37,3%"],
            ]}
          />

          <div style={{ paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
            <strong style={{ color: C.amber }}>Ключевое преимущество Kaspi: </strong>
            нет проблемы возвратов (выкуп ~95%+ vs 63% на WB), комиссия 11,85% вместо 27,5%, товар уже в Алматы (не нужно везти в Подольск). При цене 15 000 ₸ маржа 20% — <strong style={{ color: C.text }}>выше, чем на WB при 5 990 ₽</strong>.
          </div>

          <h3 style={sH3}>Оценка потолка рынка КЗ</h3>
          <DataTable
            headers={["Фактор", "Оценка"]}
            rows={[
              ["Балетные школы (Алматы + Астана + обл.)", "30–50 школ"],
              ["Учениц в школе (в среднем)", "50–100 человек"],
              ["% кто купит тренажёр", "10–20%"],
              ["Потенциальные покупки/год", "150–1 000 шт"],
              ["При чеке 15 000 ₸", "2,25–15 М ₸/год"],
              ["Реалистичная оценка (первый год)", "200–400 шт = 3–6 М ₸"],
            ]}
          />
        </Section>

        {/* ═══ 6. KASPI RECOMMENDATIONS ═══ */}
        <Section id="s6" num="6" title="Kaspi.kz: рекомендации" color={C.kaspi}>

          <div style={sCard}>
            <div style={{ fontSize: 14, fontWeight: 400, color: C.kaspi, marginBottom: 10 }}>Стратегия: дополнительный канал через Предзаказ</div>
            <p style={sP}>Kaspi — не основной канал (рынок КЗ слишком мал для микро-ниши), но идеальный <strong style={{ color: C.text }}>бонусный канал без риска</strong>: нет конкуренции, товар уже в Алматы, высокий выкуп, низкая комиссия.</p>

            {[
              { step: "1", title: "Выложить 2–3 карточки по предзаказу (preorder=14)", text: "Набор «Профессиональный 6-в-1» за 15 000 ₸ + одинарный тренажёр за 8 000 ₸. Три цвета." },
              { step: "2", title: "Ценообразование: выше WB", text: "На Kaspi нет конкуренции → цена не привязана к рынку WB. 15 000–18 000 ₸ — нормально для Kaspi." },
              { step: "3", title: "Целевая аудитория: танцевальные школы Алматы", text: "Instagram-реклама в аккаунтах балетных студий. Прямые предложения школам (оптовая скидка от 5 шт)." },
              { step: "4", title: "Если пойдёт 5–10 продаж/мес — перейти на обычный склад", text: "Держать 15–20 шт на складе, убрать предзаказ, ускорить доставку." },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
                <span style={{ color: C.kaspi, fontWeight: 400, fontSize: 14, flexShrink: 0, width: 24 }}>{s.step}.</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 400, color: C.text, marginBottom: 2 }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: "var(--personal-text)", lineHeight: 1.6 }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══ 7. WB vs KASPI ═══ */}
        <Section id="s7" num="7" title="WB vs Kaspi: сравнение и общая стратегия">

          <h3 style={sH3}>Сравнительная таблица</h3>
          <DataTable
            headers={["Параметр", "Wildberries", "Kaspi.kz", "Кто лучше"]}
            rows={[
              ["Размер рынка", "9,09 М ₽/год (12–14 потенц.)", "3–6 М ₸/год (оценка)", "WB в 5–8 раз больше"],
              ["Конкуренция", "Foot Beauty 96,5%", "0 конкурентов", "Kaspi (пустое поле)"],
              ["Комиссия", "27,5% (FBO)", "10,9% + 0,95% Pay", "Kaspi в 2,3 раза ниже"],
              ["Выкуп", "63% (37% возвратов)", "~95%+ (оплата вперёд)", "Kaspi кратно лучше"],
              ["COGS до склада", "2 184 ₽", "10 176 ₸ (≈ 1 754 ₽)", "Kaspi (нет лог. в РФ)"],
              ["Безубыточность", "5 126 ₽ (выше рынка!)", "10 800 ₸ (ниже целевой цены)", "Kaspi"],
              ["Маржа при целевой цене", "~18% при 6 000 ₽", "~20% при 15 000 ₸", "Паритет"],
              ["Сезонность", "Сент–Окт, Янв–Фев = пики", "Аналогично (те же школы)", "="],
              ["Логистика", "Алматы → Подольск (350 ₽/шт)", "Уже в Алматы", "Kaspi"],
              ["Масштабируемость", "3 000+ продаж/год возможно", "200–400 продаж/год потолок", "WB"],
              ["Риск входа", "Высокий (FB монополия + цена)", "Низкий (нет конкуренции)", "Kaspi"],
            ]}
          />

          <h3 style={sH3}>Общая стратегия: два канала параллельно</h3>
          <div style={{ display: "block", marginBottom: 24 }}>
            <div style={{ ...sCard, marginBottom: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 400, color: C.wb, marginBottom: 10 }}>WB — основной канал (объём)</div>
              <ul style={{ fontSize: 12, color: "var(--personal-text)", lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
                <li>Набор 6-в-1 по 5 990 ₽</li>
                <li>Премиум-позиционирование</li>
                <li>Захват стокаутов Foot Beauty</li>
                <li>Тест 30 шт → масштаб 150+</li>
                <li>Старт: сентябрь 2026</li>
                <li>Цель: 30–50 продаж/мес</li>
              </ul>
            </div>
            <div style={{ ...sCard, marginBottom: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 400, color: C.kaspi, marginBottom: 10 }}>Kaspi — бонусный канал (маржа)</div>
              <ul style={{ fontSize: 12, color: "var(--personal-text)", lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
                <li>Тот же набор по 15 000 ₸</li>
                <li>Предзаказ (preorder=14)</li>
                <li>0 конкурентов, 0 риска</li>
                <li>Запуск сразу (товар в Алматы)</li>
                <li>Старт: можно уже сейчас</li>
                <li>Цель: 5–15 продаж/мес</li>
              </ul>
            </div>
          </div>

          <div style={{ ...sCard, marginTop: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 400, color: C.accent, marginBottom: 10 }}>Итоговый вердикт</div>
            <div style={{ fontSize: 13, color: "var(--personal-text)", lineHeight: 1.8 }}>
              <p style={{ margin: "0 0 8px" }}>
                <strong style={{ color: C.text }}>При 128 юаней:</strong> WB рискованный (работает только при 5 990+ ₽ с премиум-набором), Kaspi безопасный (маржа 20% при 15 000 ₸).
              </p>
              <p style={{ margin: "0 0 8px" }}>
                <strong style={{ color: C.text }}>При 50–60 юаней (если договоритесь с фабрикой):</strong> WB становится основным каналом с маржой 35–45% по рыночной цене 3 500 ₽. Тогда Kaspi — просто бонус.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: C.green }}>Рекомендация:</strong> запустить на Kaspi сейчас (пока товар в Алматы), параллельно вести переговоры с фабриками за 50–60 юаней, к сентябрю выйти на WB с тестовой партией.
              </p>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}
