"use client";

import { useState } from "react";
import Link from "next/link";

/* ───── design tokens ───── */
const C = {
  bg: "#0a0a0f", surface: "#111119", border: "#1e1e30",
  accent: "#6c5ce7", green: "#00d2a0", text: "#e8e8f0",
  dim: "#999", faint: "#444", red: "#f87171", amber: "#f59e0b",
  blue: "#60a5fa", pink: "#f472b6", cyan: "#22d3ee",
};

/* ───── style helpers ───── */
const sSection: React.CSSProperties = { marginBottom: 56 };
const sH2: React.CSSProperties = { fontSize: 22, fontWeight: 700, margin: "0 0 24px", color: C.text, letterSpacing: "-0.01em", borderBottom: `1px solid ${C.border}`, paddingBottom: 12 };
const sH3: React.CSSProperties = { fontSize: 16, fontWeight: 600, margin: "28px 0 12px", color: C.text };
const sP: React.CSSProperties = { fontSize: 14, lineHeight: 1.75, color: "#ccc", margin: "0 0 12px" };
const sCard: React.CSSProperties = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px", marginBottom: 16 };

/* ───── Collapsible Section ───── */
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div id={id} style={sSection}>
      <h2 onClick={() => setOpen(!open)} style={{ ...sH2, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, userSelect: "none" }}>
        <span style={{ fontSize: 14, color: C.dim, transform: open ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s", display: "inline-block" }}>&#9654;</span>
        {title}
      </h2>
      {open && children}
    </div>
  );
}

/* ───── Data Table ───── */
function DataTable({ headers, rows, highlight }: { headers: string[]; rows: (string | number)[][]; highlight?: number }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: 16 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>{headers.map((h, i) => (
            <th key={i} style={{ padding: "10px 12px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", fontSize: 11 }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: highlight !== undefined && ri === highlight ? `${C.accent}12` : "transparent" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: "10px 12px", textAlign: "left", color: ci === 0 ? C.text : "#ccc", borderBottom: `1px solid ${C.border}20`, fontWeight: ci === 0 ? 500 : 400, whiteSpace: ci === 0 ? "nowrap" : "normal" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ───── Step Card ───── */
function StepCard({ num, title, desc, color, items }: { num: number; title: string; desc: string; color: string; items: string[] }) {
  return (
    <div style={{ ...sCard, borderTop: `2px solid ${color}` }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: `${color}22`, color, fontSize: 15, fontWeight: 700, flexShrink: 0 }}>{num}</span>
        <div>
          <div style={{ fontWeight: 700, color, fontSize: 15 }}>{title}</div>
          <p style={{ ...sP, margin: "4px 0 0" }}>{desc}</p>
        </div>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 6, paddingLeft: 46 }}>
          <span style={{ width: 5, height: 5, borderRadius: 1, background: color, flexShrink: 0, marginTop: 7 }} />
          <span style={{ ...sP, margin: 0 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/*                  MAIN PAGE                      */
/* ═══════════════════════════════════════════════ */
export default function TrendHuntingGuide() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ═══ Header ═══ */}
        <div style={{ marginBottom: 16 }}>
          <Link href="/" style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}>&larr; kasymzhanov.com</Link>
        </div>

        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, background: `${C.accent}18`, color: C.accent, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", marginBottom: 16, textTransform: "uppercase" }}>
            Enterprise Guide
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Поиск трендовых товаров<br />и новинок для маркетплейсов
          </h1>
          <p style={{ color: C.dim, fontSize: 14, margin: "12px 0 0" }}>
            Подготовил <strong style={{ color: C.text }}>Алмас Касымжанов</strong>
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, color: C.dim }}>
            <span>Актуально: <strong style={{ color: C.text }}>Март 2026</strong></span>
            <span>Рынки: <strong style={{ color: C.text }}>Amazon, Kaspi, Wildberries</strong></span>
          </div>
        </div>

        {/* ═══ TOC ═══ */}
        <div style={{ ...sCard, marginBottom: 48, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.dim, marginBottom: 12 }}>Содержание</div>
          {[
            ["sec-1", "1. Философия: Как думать о трендах"],
            ["sec-2", "2. Воронка поиска: От идеи до закупки"],
            ["sec-3", "3. Helium 10: Поиск товаров на Amazon"],
            ["sec-4", "4. Niche Scraper и ShopHunter: Spy за Shopify"],
            ["sec-5", "5. Minea и PipiAds: Spy за рекламой"],
            ["sec-6", "6. Бесплатные источники: TikTok, Reddit, TrendHunter"],
            ["sec-7", "7. Google Trends и Exploding Topics"],
            ["sec-8", "8. СНГ: Kaspi.kz (Redstat) и Wildberries"],
            ["sec-9", "9. Методы валидации товара"],
            ["sec-10", "10. Сезонность и тайминг"],
            ["sec-11", "11. Чеклист: Пошаговый алгоритм"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ display: "block", fontSize: 13, color: C.accent, textDecoration: "none", padding: "4px 0" }}>{label}</a>
          ))}
        </div>

        {/* ═══ Section 1: Philosophy ═══ */}
        <Section id="sec-1" title="1. Философия: Как думать о трендах">
          <div style={{ ...sCard, borderColor: C.green, borderWidth: 2 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green, fontSize: 18 }}>Главный принцип</h3>
            <p style={sP}>
              <strong style={{ color: C.text }}>Тренд — не угадывание. Тренд — это данные.</strong> Ключ не в интуиции, а в системном подходе: мониторинг западных рынков, валидация через метрики, адаптация на СНГ.
            </p>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Откуда приходят тренды</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { stage: "Зарождение", where: "Kickstarter, Indiegogo, ProductHunt", time: "6-12 мес до массового рынка", color: C.cyan },
                { stage: "Ранний рост", where: "Amazon US/EU, TikTok Shop US", time: "3-6 мес до СНГ", color: C.blue },
                { stage: "Вирусный пик", where: "TikTok/Instagram Reels, Reddit", time: "1-3 мес до СНГ", color: C.pink },
                { stage: "Массовый рынок", where: "AliExpress, 1688.com", time: "Готово к закупке", color: C.amber },
                { stage: "Локальная адаптация", where: "Kaspi.kz, Wildberries", time: "Момент входа", color: C.green },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 16, padding: "14px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, marginTop: 5, flexShrink: 0 }} />
                  <div style={{ width: 120, flexShrink: 0 }}>
                    <div style={{ fontWeight: 600, color: s.color, fontSize: 13 }}>{s.stage}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: C.text }}>{s.where}</div>
                    <div style={{ fontSize: 11, color: C.dim }}>{s.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Два типа трендов</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ padding: 16, borderRadius: 8, background: `${C.green}08`, border: `1px solid ${C.green}22` }}>
                <div style={{ fontWeight: 700, color: C.green, marginBottom: 8, fontSize: 14 }}>Сезонные волны</div>
                <p style={{ ...sP, margin: 0 }}>Повторяются каждый год: летние товары, школьный сезон, Новый год. Предсказуемы через Google Trends и историю продаж. Подготовка за 2-3 месяца до пика.</p>
              </div>
              <div style={{ padding: 16, borderRadius: 8, background: `${C.accent}08`, border: `1px solid ${C.accent}22` }}>
                <div style={{ fontWeight: 700, color: C.accent, marginBottom: 8, fontSize: 14 }}>Новинки и хайпы</div>
                <p style={{ ...sP, margin: 0 }}>Новые продукты, вирусные товары с TikTok, инновации с Amazon. Окно входа — 1-4 месяца. Кто первый на рынке СНГ, тот забирает сливки.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ Section 2: Funnel ═══ */}
        <Section id="sec-2" title="2. Воронка поиска: От идеи до закупки">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <StepCard num={1} title="Генерация идей" desc="Собираем 50-100 потенциальных товаров из разных источников" color={C.cyan} items={[
              "Amazon Best Sellers + Movers & Shakers — ежедневный мониторинг",
              "TikTok #TikTokMadeMeBuyIt + #TikTokShopFinds — вирусные товары",
              "Niche Scraper / ShopHunter — что продают Shopify-магазины",
              "Minea / PipiAds — какие товары рекламируют (TikTok, Facebook, Pinterest)",
              "TrendHunter.com — статьи о зарождающихся трендах",
              "Google Trends + Exploding Topics — растущие запросы",
              "Reddit r/AmazonSeller, r/ecommerce — реальные кейсы",
            ]} />
            <StepCard num={2} title="Первичный фильтр" desc="Из 100 идей оставляем 10-15 перспективных" color={C.blue} items={[
              "Есть ли растущий спрос? (Google Trends: линия вверх, не пик и спад)",
              "Средний чек $15-70 (оптимальный диапазон для маржи)",
              "Не слишком сезонный (или вы готовы к сезону заранее)",
              "Можно улучшить? (читаем негативные отзывы на Amazon — 1-3 звезды)",
              "Можно брендировать? (упаковка, дизайн, инструкция на русском/казахском)",
            ]} />
            <StepCard num={3} title="Глубокая валидация" desc="10-15 товаров проверяем через Helium 10 и Redstat" color={C.green} items={[
              "Helium 10 Black Box: продажи/мес, BSR, количество отзывов",
              "Amazing (Chrome Extension): данные по каждой карточке прямо на выдаче Amazon",
              "Конкуренция: отзывов у ТОП-10 < 500 = вход реален",
              "Маржа: цена продажи - себестоимость - доставка - комиссия > 30%",
              "Redstat.kz: выручка ниши на Kaspi, Gini (< 0.7), доля NoBrand",
            ]} />
            <StepCard num={4} title="Тест и закупка" desc="3-5 финалистов: заказываем образцы" color={C.amber} items={[
              "Образцы с Alibaba / 1688 — проверка качества",
              "Тестовая партия 50-200 шт — проверка спроса",
              "Фото + карточка товара — профессиональный контент",
              "Запуск на Kaspi / WB — первые продажи и отзывы",
            ]} />
          </div>
        </Section>

        {/* ═══ Section 3: Helium 10 ═══ */}
        <Section id="sec-3" title="3. Helium 10: Поиск товаров на Amazon">
          <div style={{ ...sCard, borderColor: `${C.amber}44` }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.amber }}>Helium 10 — главный инструмент Amazon-ресёрча</h3>
            <p style={sP}>30+ инструментов в одном. Для поиска трендовых товаров используем два ключевых: Black Box и Keyword Research.</p>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Black Box — поиск товаров по фильтрам</h3>
            <p style={sP}>Главный инструмент для систематического поиска. Вкладка Products → Advanced mode.</p>
            <h3 style={sH3}>Рекомендуемые настройки Advanced</h3>
            <DataTable
              headers={["Параметр", "Значение", "Почему"]}
              rows={[
                ["Category", "Выбрать 2-3 интересные", "Home & Kitchen, Sports, Patio — лучшие для старта"],
                ["Monthly Revenue", "$5,000 — $50,000", "Есть спрос, но не гиганты с огромными бюджетами"],
                ["Price", "$20 — $50", "Оптимальная маржа при импульсных покупках"],
                ["Review Count", "0 — 300", "Низкий барьер входа — реально набрать отзывы"],
                ["Review Rating", "1.0 — 4.0", "Товары с проблемами = возможность сделать лучше"],
                ["Monthly Sales", "200 — 2,000 шт", "Стабильный спрос без монополии"],
                ["Weight", "0 — 2 lbs", "Лёгкий = дешёвая FBA и доставка из Китая"],
                ["Product Size", "Small / Standard", "Помещается в shoebox = дешевле хранение"],
              ]}
            />

            <div style={{ fontFamily: "monospace", fontSize: 12, color: C.dim, lineHeight: 2, background: "#0d0d18", borderRadius: 8, padding: 16, marginTop: 12 }}>
              <div><span style={{ color: C.amber }}>Workflow Black Box:</span></div>
              <div>1. Выставляем фильтры → жмём Search</div>
              <div>2. Сортируем результаты по <span style={{ color: C.green }}>Revenue</span> (убывание)</div>
              <div>3. Смотрим: Review Count {"<"} 300 + Revenue {">"} $5K = <span style={{ color: C.green }}>перспективный</span></div>
              <div>4. Кликаем на товар → открывается Amazon</div>
              <div>5. На Amazon включаем <span style={{ color: C.cyan }}>Amazing Extension</span> для глубокого анализа выдачи</div>
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.cyan }}>Amazing (Chrome Extension) — анализ выдачи Amazon</h3>
            <p style={sP}>
              Chrome-расширение от <a href="https://amazing.com/" target="_blank" rel="noopener" style={{ color: C.cyan, textDecoration: "none", borderBottom: `1px solid ${C.cyan}44` }}>Amazing.com</a> (бывший Zoof). Работает <strong style={{ color: C.text }}>прямо на странице поиска Amazon</strong>: вводите запрос → включаете расширение → видите выручку, продажи, BSR и тренды по <em>каждой карточке</em> на выдаче. Не нужно открывать каждый товар отдельно.
            </p>

            <div style={{ fontFamily: "monospace", fontSize: 12, color: C.dim, lineHeight: 2, background: "#0d0d18", borderRadius: 8, padding: 16 }}>
              <div><span style={{ color: C.cyan }}>Workflow Amazing Extension:</span></div>
              <div>1. Открываем Amazon → вводим запрос (напр. <span style={{ color: C.green }}>&quot;bug zapper&quot;</span>)</div>
              <div>2. Нажимаем иконку расширения в Chrome → открывается оверлей</div>
              <div>3. Видим по <span style={{ color: C.green }}>каждому товару на выдаче</span>:</div>
              <div>   — Monthly Revenue, Monthly Sales, BSR</div>
              <div>   — Price, Reviews, Sales History (графики)</div>
              <div>4. Сверху: <span style={{ color: C.amber }}>Total Monthly Revenue</span> всей выдачи (размер ниши)</div>
              <div>5. Ищем товары с высокой выручкой + мало отзывов = <span style={{ color: C.green }}>возможность</span></div>
            </div>

            <DataTable
              headers={["Метрика в оверлее", "На что смотреть"]}
              rows={[
                ["Tot. Monthly Revenue", "Общая выручка выдачи — размер ниши. > $500K = крупная ниша"],
                ["Mo. Revenue (каждого)", "Выручка конкретного товара в месяц. $5K-50K = sweet spot"],
                ["Mo. Sales", "Количество продаж. Стабильные > 100/мес = подтверждённый спрос"],
                ["BSR", "Best Sellers Rank. Чем ниже, тем больше продаж"],
                ["D. Sales", "Продажи за день — видно текущую динамику"],
                ["Reviews", "< 300 у конкурента = реально обогнать набрав отзывы"],
                ["Sales History", "Мини-график тренда. Линия вверх = растущий спрос"],
              ]}
            />

            <div style={{ background: `${C.cyan}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc", marginTop: 12 }}>
              <strong style={{ color: C.cyan }}>Главное преимущество:</strong> Amazing показывает данные <strong style={{ color: C.text }}>всей выдачи разом</strong> — не нужно заходить на каждую карточку. Открыли запрос → включили → видите всю картину ниши за 10 секунд.
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Black Box → вкладка Keywords</h3>
            <p style={sP}>Поиск не по товарам, а по поисковым запросам. Находит растущие запросы = растущий спрос.</p>
            <DataTable
              headers={["Параметр", "Значение", "Зачем"]}
              rows={[
                ["Search Volume", "1,000 — 20,000", "Достаточный спрос, не перегретый"],
                ["Word Count", "3+", "Длинные запросы = конкретный товар, не общая категория"],
                ["Competing Products", "< 200", "Мало конкурентов по этому запросу"],
                ["Sort by", "Search Volume Trend", "Показывает растущие запросы первыми"],
              ]}
            />
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Где искать на Amazon (без инструментов)</h3>
            <DataTable
              headers={["Страница", "URL", "Что даёт"]}
              rows={[
                ["Best Sellers", "amazon.com/bestsellers", "ТОП товаров по категориям — текущий спрос"],
                ["Movers & Shakers", "amazon.com/gp/movers-and-shakers", "Рост BSR за 24ч — emerging тренды"],
                ["New Releases", "amazon.com/gp/new-releases", "Новинки с лучшими продажами"],
                ["Most Wished For", "amazon.com/gp/most-wished-for", "Товары в вишлистах — будущий спрос"],
              ]}
            />
            <div style={{ background: `${C.amber}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc" }}>
              <strong style={{ color: C.amber }}>Метод:</strong> Открываем Movers & Shakers → находим интересный товар → включаем Amazing Extension → смотрим данные по всей выдаче → если подходит под критерии — добавляем в список кандидатов.
            </div>
          </div>
        </Section>

        {/* ═══ Section 4: Niche Scraper + ShopHunter ═══ */}
        <Section id="sec-4" title="4. Niche Scraper и ShopHunter: Spy за Shopify">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green }}>Зачем следить за Shopify</h3>
            <p style={sP}>Shopify-магазины — это DTC-бренды (direct-to-consumer). Если DTC-бренд растёт и тратит деньги на рекламу — значит, товар продаётся. Эти товары можно адаптировать для Kaspi/WB.</p>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.accent }}>Niche Scraper — сканер Shopify-магазинов</h3>
            <p style={sP}>Сканирует тысячи Shopify-магазинов и показывает их бестселлеры, рекламу и тренды.</p>

            <h3 style={sH3}>Как работать с Niche Scraper</h3>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: C.dim, lineHeight: 2, background: "#0d0d18", borderRadius: 8, padding: 16 }}>
              <div><span style={{ color: C.accent }}>Product Scraper:</span></div>
              <div>1. Заходим в <span style={{ color: C.accent }}>Product Scraper</span></div>
              <div>2. Фильтруем по категории (Home, Health, Fashion...)</div>
              <div>3. Сортируем по <span style={{ color: C.green }}>Orders</span> или <span style={{ color: C.green }}>Trending</span></div>
              <div>4. Смотрим: сколько заказов, какая цена, какой магазин</div>
              <div></div>
              <div><span style={{ color: C.accent }}>Store Analyzer:</span></div>
              <div>1. Вставляем URL любого Shopify-магазина</div>
              <div>2. Видим: трафик, бестселлеры, новые товары</div>
              <div>3. Находим интересный товар → ищем его на AliExpress/1688</div>
              <div></div>
              <div><span style={{ color: C.accent }}>Hand Picked (Winning Products):</span></div>
              <div>1. Ежедневная подборка товаров, отобранных вручную</div>
              <div>2. С рекламными креативами и данными по продажам</div>
              <div>3. Готовые идеи для быстрого тестирования</div>
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.blue }}>ShopHunter — трекер магазинов</h3>
            <p style={sP}>Отслеживает продажи Shopify-магазинов в реальном времени. Показывает, какие товары реально продаются, а не просто лежат в каталоге.</p>
            <DataTable
              headers={["Функция", "Как использовать"]}
              rows={[
                ["Sales Tracker", "Добавляем интересный магазин → видим реальные продажи каждый день"],
                ["Store Discovery", "Находим растущие Shopify-магазины в нужной категории"],
                ["Product Alerts", "Настраиваем уведомления: новый товар у конкурента = сигнал"],
                ["Top Products", "Рейтинг товаров по продажам — что реально покупают"],
              ]}
            />
            <div style={{ background: `${C.blue}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc" }}>
              <strong style={{ color: C.blue }}>Связка:</strong> Находим растущий магазин в ShopHunter → анализируем его бестселлеры в Niche Scraper → проверяем рекламу в Minea → проверяем нишу на Kaspi через Redstat.
            </div>
          </div>
        </Section>

        {/* ═══ Section 5: Minea + PipiAds ═══ */}
        <Section id="sec-5" title="5. Minea и PipiAds: Spy за рекламой">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.pink }}>Почему рекламный spy — это мощно</h3>
            <p style={sP}>Если кто-то тратит деньги на рекламу товара — значит, товар продаётся. Рекламный spy показывает, какие товары прямо сейчас продвигают другие продавцы. Это самый быстрый индикатор после TikTok.</p>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.accent }}>Minea — мульти-платформенный Ad Spy</h3>
            <p style={sP}>Крупнейшая база рекламы ecommerce. Покрывает TikTok Ads, Facebook Ads, Pinterest Ads и influencer-маркетинг.</p>

            <h3 style={sH3}>Как работать с Minea</h3>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: C.dim, lineHeight: 2, background: "#0d0d18", borderRadius: 8, padding: 16 }}>
              <div><span style={{ color: C.accent }}>Поиск трендовых товаров:</span></div>
              <div>1. Идём в <span style={{ color: C.accent }}>Ad Search</span> → выбираем платформу (TikTok / Facebook / Pinterest)</div>
              <div>2. Фильтры: <span style={{ color: C.green }}>Ecommerce</span> тип + <span style={{ color: C.green }}>Last 7 days</span></div>
              <div>3. Сортируем по <span style={{ color: C.green }}>Likes / Engagement</span></div>
              <div>4. Смотрим: какой товар, сколько лайков, какой магазин</div>
              <div>5. Кликаем → видим лендинг, цену, креатив</div>
              <div></div>
              <div><span style={{ color: C.accent }}>Анализ конкретного товара:</span></div>
              <div>1. Нашли товар → жмём <span style={{ color: C.accent }}>Shop Analysis</span></div>
              <div>2. Видим: все объявления этого магазина, их длительность</div>
              <div>3. Если реклама крутится {">"} 2 недель = товар <span style={{ color: C.green }}>приносит прибыль</span></div>
              <div>4. Если реклама пропала через 2-3 дня = <span style={{ color: C.red }}>не сработало</span></div>
            </div>

            <div style={{ background: `${C.accent}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc", marginTop: 12 }}>
              <strong style={{ color: C.accent }}>Правило длительности:</strong> Реклама крутится более 14 дней = товар прибыльный. Рекламодатель не будет платить за рекламу убыточного товара.
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.pink }}>PipiAds — TikTok Ads специалист</h3>
            <p style={sP}>Фокусируется именно на TikTok — крупнейшая база TikTok-рекламы для ecommerce.</p>

            <h3 style={sH3}>Как работать с PipiAds</h3>
            <DataTable
              headers={["Раздел", "Что делать", "На что смотреть"]}
              rows={[
                ["Ad Search", "Фильтр: Ecommerce + Shopify + Last 7 days", "Товары с высоким engagement = вирусный потенциал"],
                ["Winning Products", "Раздел с автоматически отобранными хитами", "Товары, которые активно рекламируют прямо сейчас"],
                ["Advertiser Spy", "Вводим домен конкурента", "Все его рекламные объявления, креативы, длительность"],
                ["Creative Insights", "Анализ рекламных видео", "Какой формат видео работает: длина, стиль, hook"],
              ]}
            />

            <div style={{ fontFamily: "monospace", fontSize: 12, color: C.dim, lineHeight: 2, background: "#0d0d18", borderRadius: 8, padding: 16, marginTop: 12 }}>
              <div><span style={{ color: C.pink }}>Workflow PipiAds:</span></div>
              <div>1. Ad Search → фильтр Last 7 days + Ecommerce</div>
              <div>2. Сортируем по <span style={{ color: C.green }}>Impressions</span> или <span style={{ color: C.green }}>Likes</span></div>
              <div>3. Находим товар с {">"} 100K impressions</div>
              <div>4. Проверяем магазин → сколько продаж (через Niche Scraper)</div>
              <div>5. Ищем товар на AliExpress/1688 → считаем маржу</div>
              <div>6. Проверяем на Kaspi через <span style={{ color: C.green }}>Redstat</span> → пусто? <span style={{ color: C.green }}>GO!</span></div>
            </div>
          </div>
        </Section>

        {/* ═══ Section 6: Free Sources ═══ */}
        <Section id="sec-6" title="6. Бесплатные источники: TikTok, Reddit, TrendHunter">

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.pink }}>TikTok — самый быстрый индикатор</h3>
            <p style={sP}>TikTok — место, где продуктовые тренды зарождаются раньше, чем в поисковиках. Товар может набрать миллионы просмотров за 48 часов.</p>

            <h3 style={sH3}>Хештеги для мониторинга</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {[
                "#TikTokMadeMeBuyIt", "#TikTokShopFinds", "#ViralTikTokProducts",
                "#AmazonFinds", "#AmazonMustHaves", "#TikTokShop",
                "#ProductReview", "#UnboxingTikTok", "#GadgetsTikTok",
                "#HomeFinds", "#CleanTok", "#BookTok",
              ].map(tag => (
                <span key={tag} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, background: `${C.pink}15`, color: C.pink, fontWeight: 500 }}>{tag}</span>
              ))}
            </div>

            <DataTable
              headers={["Метод", "Описание"]}
              rows={[
                ["Поисковая строка TikTok", "Вбиваем категорию товара → сортируем по «Популярное» → смотрим просмотры"],
                ["TikTok Shop → Trending", "Раздел Shop показывает реальные продажи, а не просто хайп"],
                ["Сохраняем в закладки", "Каждый день 5-10 минут скроллинга → сохраняем интересное → анализируем через неделю"],
              ]}
            />

            <div style={{ background: `${C.pink}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc", marginTop: 12 }}>
              <strong style={{ color: C.pink }}>TikTok Creative Center:</strong>{" "}
              <a href="https://ads.tiktok.com/business/creativecenter/inspiration/topads/pc/en?region=KZ" target="_blank" rel="noopener" style={{ color: C.pink, textDecoration: "none", borderBottom: `1px solid ${C.pink}44` }}>ads.tiktok.com/business/creativecenter</a> — официальный инструмент TikTok для анализа топовых рекламных креативов. Фильтруйте по региону (KZ, RU), категории и периоду. Показывает самые эффективные рекламные видео — какие товары сейчас продвигают и какие форматы работают.
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.cyan }}>TrendHunter.com — статьи о трендах</h3>
            <p style={sP}>Крупнейшее в мире комьюнити по трендам (160K+ участников). Публикуют статьи о зарождающихся трендах в технологиях, моде, lifestyle, дизайне, еде.</p>
            <DataTable
              headers={["Раздел", "Как использовать"]}
              rows={[
                ["Trending", "Ежедневная подборка самых горячих трендов — скроллим и сохраняем"],
                ["Categories", "Фильтруем по нужной категории: Tech, Fashion, Lifestyle, Food"],
                ["Trend Reports", "Глубокие аналитические отчёты по индустриям (AI-генерированные)"],
                ["Search", "Вбиваем конкретный товар/категорию — видим все связанные тренды"],
              ]}
            />
            <div style={{ background: `${C.cyan}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc" }}>
              <strong style={{ color: C.cyan }}>Как использовать:</strong> TrendHunter — не для цифр, а для идей. Читаем статьи → видим зарождающийся тренд → проверяем через Google Trends (есть ли рост?) → проверяем через Helium 10 (есть ли продажи на Amazon?).
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.blue }}>Reddit и UGC-комьюнити</h3>
            <p style={sP}>Reddit — золотая жила для поиска реальных проблем и потребностей. Люди пишут честно, без рекламы.</p>
            <DataTable
              headers={["Сабреддит", "Что мониторить"]}
              rows={[
                ["r/AmazonSeller", "Кейсы продавцов: что продают, какие маржи, что работает"],
                ["r/FulfillmentByAmazon", "FBA-специфика: тренды, проблемы, инсайты"],
                ["r/ecommerce", "Общие тренды ecommerce, новые инструменты, стратегии"],
                ["r/dropshipping", "Что сейчас продают дропшипперы — ранний индикатор"],
                ["r/BuyItForLife", "Товары высокого качества — возможность для premium-сегмента"],
                ["r/shutupandtakemymoney", "Вирусные товары, импульсные покупки"],
              ]}
            />
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Другие бесплатные источники</h3>
            <DataTable
              headers={["Платформа", "Метод", "Для чего"]}
              rows={[
                ["Etsy", "Trending + Best Sellers по категориям", "Handmade и уникальные товары, растущие ниши"],
                ["Kickstarter / Indiegogo", "Кампании с 500%+ финансированием", "Инновации за 6-12 мес до массового рынка"],
                ["ProductHunt", "Ежедневные новинки, фильтр по категории", "Tech-товары и гаджеты раннего этапа"],
                ["Temu / Shein", "Бестселлеры и Trending Now", "Что уже массово продаётся из Китая"],
                ["YouTube", "Product review каналы, unboxing", "Какие товары набирают просмотры = спрос"],
                ["Pinterest", "Trending Pins по категориям", "Визуальные тренды в декоре, моде, DIY"],
                ["Facebook Ad Library", "Поиск по рекламодателю/теме", "Бесплатный spy за рекламой конкурентов"],
              ]}
            />
          </div>
        </Section>

        {/* ═══ Section 7: Google Trends + Exploding Topics ═══ */}
        <Section id="sec-7" title="7. Google Trends и Exploding Topics">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.blue }}>Google Trends — первый шаг для любого товара</h3>
            <p style={sP}>20+ лет данных, бесплатно. Показывает рост/спад интереса, сезонность, географию спроса.</p>

            <div style={{ fontFamily: "monospace", fontSize: 12, color: C.dim, lineHeight: 2, background: "#0d0d18", borderRadius: 8, padding: 16 }}>
              <div>1. Вводим товар в <span style={{ color: C.accent }}>trends.google.com</span></div>
              <div>2. Период: <span style={{ color: C.accent }}>5 лет</span> (видим повторяющиеся паттерны)</div>
              <div>3. География: Worldwide → потом Казахстан / Россия</div>
              <div>4. Линия стабильно вверх = <span style={{ color: C.green }}>растущий тренд</span></div>
              <div>5. Пик повторяется каждый год = <span style={{ color: C.amber }}>сезонный товар</span></div>
              <div>6. Один пик и спад = <span style={{ color: C.red }}>хайп (не входить)</span></div>
              <div>7. Смотрим <span style={{ color: C.accent }}>Related Queries → Rising</span> = растущие запросы</div>
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green }}>Exploding Topics — AI тренд-радар</h3>
            <p style={sP}>AI анализирует миллионы источников и находит тренды за 6+ месяцев до массового рынка. Есть отдельная база Trending Products с данными по продажам.</p>
            <DataTable
              headers={["Раздел", "Как использовать"]}
              rows={[
                ["Trending Topics", "Фильтруем по категории → смотрим статус: Exploding, Regular, Peaked"],
                ["Trending Products", "Товары с растущим спросом: фильтр по категории, revenue, reviews"],
                ["Topic Alerts", "Настраиваем алерты → получаем уведомления когда тема растёт"],
                ["Trend Status", "Exploding = ранний рост. Regular = стабильный. Peaked = поздно"],
              ]}
            />
          </div>
        </Section>

        {/* ═══ Section 8: CIS Markets ═══ */}
        <Section id="sec-8" title="8. СНГ: Kaspi.kz (Redstat) и Wildberries">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green }}>Redstat.kz — аналитика Kaspi.kz</h3>
            <p style={sP}>Бесплатная аналитика продаж Kaspi.kz. Показывает выручку, заказы, бренды, монополизацию по каждой нише. ML-прогнозы на 6 месяцев вперёд.</p>
            <DataTable
              headers={["Метод", "Как"]}
              rows={[
                ["Растущие ниши", "Фильтр по росту выручки MoM > 20%. Если ниша растёт 3+ месяца подряд — это тренд"],
                ["Низкая монополизация", "Gini < 0.65 = есть место для новых. Gini > 0.8 = монополия, не входить"],
                ["Высокая доля NoBrand", "NoBrand > 30% = покупатели берут без оглядки на бренд. Возможность для своего бренда"],
                ["Пустые ниши", "Мало SKU (< 200) + высокая выручка/SKU = мало конкурентов, много спроса"],
                ["ML-прогноз", "Predict показывает рост на 6 мес вперёд. Растущий прогноз = подтверждение тренда"],
              ]}
            />
          </div>

          <div style={{ ...sCard, borderColor: `${C.green}44` }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green }}>Стратегия: Запад → СНГ</h3>
            <p style={sP}><strong style={{ color: C.text }}>1.</strong> Находим растущий товар на Amazon (Helium 10 / Movers & Shakers)</p>
            <p style={sP}><strong style={{ color: C.text }}>2.</strong> Подтверждаем через рекламу (Minea / PipiAds — товар рекламируют)</p>
            <p style={sP}><strong style={{ color: C.text }}>3.</strong> Проверяем на Kaspi через Redstat: есть ли ниша? Какой Gini? Сколько продавцов?</p>
            <p style={sP}><strong style={{ color: C.text }}>4.</strong> Если ниша пустая или низкая конкуренция — вы первые на рынке с 3-6 мес преимуществом</p>
            <p style={sP}><strong style={{ color: C.text }}>5.</strong> Даже если есть аналоги — улучшаем: упаковка, описание на казахском, фото, Kaspi Red</p>
          </div>
        </Section>

        {/* ═══ Section 9: Validation ═══ */}
        <Section id="sec-9" title="9. Методы валидации товара">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Чеклист валидации: 10 критериев</h3>
            <DataTable
              headers={["#", "Критерий", "Хорошо", "Плохо"]}
              rows={[
                ["1", "Google Trends", "Линия вверх 6+ мес", "Пик и спад (хайп прошёл)"],
                ["2", "Amazon BSR (Helium 10)", "50-300 в субкатегории", "> 5000 (мало продаж)"],
                ["3", "Отзывы ТОП-10", "< 500 у лидеров", "> 2000 (высокий барьер)"],
                ["4", "Средний чек", "$15-70", "< $10 (нет маржи)"],
                ["5", "Маржа после всех расходов", "> 30%", "< 20% (не выжить)"],
                ["6", "Вес/габариты", "< 2 кг, компактный", "> 5 кг (дорогая доставка)"],
                ["7", "Реклама (Minea/PipiAds)", "Крутится > 14 дней", "Нет рекламы или < 3 дня"],
                ["8", "Kaspi: Gini ниши", "< 0.65 (есть место)", "> 0.8 (монополия)"],
                ["9", "Kaspi: NoBrand доля", "> 25% (можно с брендом)", "< 5% (бренды доминируют)"],
                ["10", "Сезонность", "Круглый год или вы к сезону", "Узкий пик, опоздали"],
              ]}
            />
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.red }}>Красные флаги: Когда НЕ входить</h3>
            {[
              "Товар уже на спаде в Google Trends (пик был 3+ мес назад)",
              "ТОП-3 на Amazon имеют 10K+ отзывов (доминируют гиганты)",
              "Gini на Kaspi > 0.8 — один продавец забирает всё",
              "Маржа < 20% после комиссий, доставки и возвратов",
              "Товар запрещён/ограничен на маркетплейсе (сертификаты, лицензии)",
              "Слишком тяжёлый (> 5 кг) — доставка съедает маржу",
              "Нельзя брендировать или улучшить — будете конкурировать только ценой",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: 1, background: C.red, flexShrink: 0, marginTop: 6 }} />
                <span style={{ ...sP, margin: 0 }}>{item}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══ Section 10: Seasonality ═══ */}
        <Section id="sec-10" title="10. Сезонность и тайминг">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Календарь сезонных возможностей</h3>
            <DataTable
              headers={["Период", "Категории", "Когда готовиться"]}
              rows={[
                ["Январь-Февраль", "Спортивные товары, ЗОЖ (новогодние цели), зимняя одежда", "Ноябрь"],
                ["Март", "8 Марта: подарки, косметика, аксессуары", "Январь"],
                ["Апрель-Май", "Сад, дача, outdoor, велосипеды, самокаты", "Февраль"],
                ["Июнь-Август", "Пляжные товары, солнцезащита, кемпинг, путешествия", "Апрель"],
                ["Сентябрь", "Школа: канцелярия, рюкзаки, форма, электроника", "Июль"],
                ["Октябрь-Ноябрь", "Осенняя одежда, home-декор, умные устройства", "Август"],
                ["Декабрь", "Подарки, игрушки, гаджеты, сладости, украшения", "Октябрь"],
              ]}
            />
            <div style={{ background: `${C.amber}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc", marginTop: 12 }}>
              <strong style={{ color: C.amber }}>Правило:</strong> Готовиться к сезону минимум за 2 месяца. Закупка + доставка + фото + карточка = 4-6 недель. Опоздать = потерять 70% сезонного спроса.
            </div>
          </div>
        </Section>

        {/* ═══ Section 11: Checklist ═══ */}
        <Section id="sec-11" title="11. Чеклист: Пошаговый алгоритм">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.accent, fontSize: 18 }}>Ежедневный ритуал (30 мин)</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { time: "5 мин", task: "Amazon Movers & Shakers — 3 категории", color: C.amber },
                { time: "5 мин", task: "TikTok: скролл #TikTokMadeMeBuyIt, сохраняем интересное", color: C.pink },
                { time: "5 мин", task: "Google Trends: проверяем вчерашние находки", color: C.blue },
                { time: "5 мин", task: "TrendHunter.com: скроллим Trending", color: C.cyan },
                { time: "5 мин", task: "Minea / PipiAds: новые рекламы за последние 24ч", color: C.accent },
                { time: "5 мин", task: "Redstat.kz: проверяем кандидатов на Kaspi", color: C.green },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: i < 5 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ width: 50, fontSize: 12, fontWeight: 600, color: C.dim, flexShrink: 0, fontFamily: "monospace" }}>{s.time}</div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, marginTop: 5, flexShrink: 0 }} />
                  <div style={{ fontSize: 13, color: C.text }}>{s.task}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, fontSize: 18 }}>Еженедельная глубокая сессия (2 часа)</h3>
            {[
              "Из накопленных за неделю идей отобрать ТОП-5",
              "Каждый проверить через Google Trends (5 лет + 12 мес)",
              "Helium 10 Black Box + Amazing Extension: продажи, BSR, отзывы, маржа",
              "Minea: крутится ли реклама? Как долго? Какой engagement?",
              "Redstat.kz: ниша на Kaspi, Gini, NoBrand, выручка",
              "Оценить маржу: цена продажи - себестоимость (1688/Alibaba) - доставка - комиссия",
              "По 2-3 лучшим — написать поставщикам за ценой и MOQ",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, borderRadius: "50%", background: `${C.accent}22`, color: C.accent, fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <span style={{ ...sP, margin: 0 }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ ...sCard, borderColor: C.green, borderWidth: 2 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green, fontSize: 18 }}>Наш стек инструментов</h3>
            <p style={{ ...sP, marginBottom: 16 }}>Все инструменты доступны через общий аккаунт. Доступ предоставляется участникам.</p>
            <DataTable
              headers={["Инструмент", "Для чего"]}
              rows={[
                ["Helium 10", "Amazon: поиск товаров (Black Box), ключевые слова (Keywords)"],
                ["Amazing", "Chrome Extension: анализ всей выдачи Amazon разом — выручка, продажи, BSR каждой карточки"],
                ["Niche Scraper", "Shopify: сканер магазинов, бестселлеры, winning products"],
                ["ShopHunter", "Shopify: трекер продаж магазинов в реальном времени"],
                ["Minea", "Ad Spy: реклама TikTok, Facebook, Pinterest — какие товары продвигают"],
                ["PipiAds", "TikTok Ad Spy: крупнейшая база TikTok-рекламы для ecommerce"],
                ["Exploding Topics", "Тренд-радар: тренды за 6 мес до массового рынка"],
                ["Google Trends", "Бесплатно: сезонность, рост/спад интереса, география"],
                ["Redstat.kz", "Бесплатно: аналитика Kaspi.kz — выручка, Gini, NoBrand, ML-прогнозы"],
              ]}
            />
          </div>
        </Section>

        {/* ═══ Footer ═══ */}
        <div style={{ paddingTop: 32, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
          <p style={{ ...sP, fontSize: 12, color: C.faint }}>
            Подготовил Алмас Касымжанов | <Link href="/" style={{ color: C.accent, textDecoration: "none" }}>kasymzhanov.com</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
