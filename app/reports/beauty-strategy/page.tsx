"use client";

import { useState } from "react";
import Link from "next/link";

const C = {
  bg: "#0a0a0f", surface: "#111119", border: "#1e1e30",
  accent: "#f59e0b", green: "#00d2a0", text: "#e8e8f0",
  dim: "#999", faint: "#444", red: "#f87171", amber: "#f59e0b",
  blue: "#60a5fa", pink: "#f472b6", cyan: "#22d3ee", purple: "#a78bfa",
};

const sSection: React.CSSProperties = { marginBottom: 56 };
const sH2: React.CSSProperties = { fontSize: 22, fontWeight: 700, margin: "0 0 24px", color: C.text, letterSpacing: "-0.01em", borderBottom: `1px solid ${C.border}`, paddingBottom: 12 };
const sH3: React.CSSProperties = { fontSize: 16, fontWeight: 600, margin: "28px 0 12px", color: C.text };
const sP: React.CSSProperties = { fontSize: 14, lineHeight: 1.75, color: "#ccc", margin: "0 0 12px" };
const sCard: React.CSSProperties = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px", marginBottom: 16 };
const sBadge = (color: string): React.CSSProperties => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: `${color}18`, color, fontSize: 11, fontWeight: 600 });

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (<div id={id} style={sSection}><h2 onClick={() => setOpen(!open)} style={{ ...sH2, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, userSelect: "none" }}><span style={{ fontSize: 14, color: C.dim, transform: open ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s", display: "inline-block" }}>&#9654;</span>{title}</h2>{open && children}</div>);
}

function DataTable({ headers, rows, highlight }: { headers: string[]; rows: (string | number)[][]; highlight?: number }) {
  return (<div style={{ overflowX: "auto", marginBottom: 16 }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}><thead><tr>{headers.map((h, i) => (<th key={i} style={{ padding: "10px 12px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", fontSize: 11 }}>{h}</th>))}</tr></thead><tbody>{rows.map((row, ri) => (<tr key={ri} style={{ background: highlight !== undefined && ri === highlight ? `${C.accent}12` : "transparent" }}>{row.map((cell, ci) => (<td key={ci} style={{ padding: "10px 12px", textAlign: "left", color: ci === 0 ? C.text : "#ccc", borderBottom: `1px solid ${C.border}20`, fontWeight: ci === 0 ? 500 : 400 }}>{cell}</td>))}</tr>))}</tbody></table></div>);
}

function MetricCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (<div style={{ ...sCard, padding: "16px 20px", flex: 1, minWidth: 140 }}><div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>{label}</div><div style={{ fontSize: 22, fontWeight: 700, color: color || C.text }}>{value}</div>{sub && <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>{sub}</div>}</div>);
}

export default function StrategyReport() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>

        <div style={{ marginBottom: 16 }}><Link href="/" style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}>&larr; kasymzhanov.com</Link></div>

        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
          <div style={sBadge(C.accent)}><span style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>Strategic Recommendations</span></div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "16px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Стратегические рекомендации<br />по Beauty-портфелю
          </h1>
          <p style={{ color: C.dim, fontSize: 14, margin: "12px 0 0" }}>
            Подготовил <strong style={{ color: C.text }}>Алмас Касымжанов</strong>
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, color: C.dim, flexWrap: "wrap" }}>
            <span>Дата: <strong style={{ color: C.text }}>Март 2026</strong></span>
            <span>Площадки: <strong style={{ color: C.text }}>Kaspi.kz + Wildberries</strong></span>
            <span>Брендов: <strong style={{ color: C.text }}>21</strong></span>
          </div>
          <p style={{ ...sP, marginTop: 16, fontSize: 13, color: C.dim }}>Финальный стратегический документ на основе трёх предыдущих отчётов: рынок Kaspi, портфель 21 бренда, рынок WB. Содержит приоритизацию, план по кварталам, ценовую политику, канальную стратегию и конкретные действия.</p>
        </div>

        {/* ═══ TOC ═══ */}
        <div style={{ ...sCard, marginBottom: 48, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.dim, marginBottom: 12 }}>Содержание</div>
          {[
            ["s1", "1. Executive Summary — ключевые решения"],
            ["s2", "2. Матрица приоритизации: 21 бренд x 2 площадки"],
            ["s3", "3. Канальная стратегия: где продавать каждый бренд"],
            ["s4", "4. Категорийная стратегия: в какие ниши заходить"],
            ["s5", "5. Ценовая политика и борьба с подделками"],
            ["s6", "6. Сезонный план на 12 месяцев"],
            ["s7", "7. Топ-5 быстрых побед (Quick Wins)"],
            ["s8", "8. Топ-5 стратегических инициатив (6+ месяцев)"],
            ["s9", "9. Риски и митигация"],
            ["s10", "10. KPI и метрики успеха"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ display: "block", padding: "5px 0", fontSize: 13, color: C.accent, textDecoration: "none" }}>{label}</a>
          ))}
        </div>

        {/* ═══ 1. EXEC SUMMARY ═══ */}
        <Section id="s1" title="1. Executive Summary — ключевые решения">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
            <MetricCard label="Суммарный рынок" value="~175B" sub="KZT/мес (Kaspi + WB)" color={C.accent} />
            <MetricCard label="Портфель: Kaspi" value="~900M" sub="KZT/мес (21 бренд)" color={C.green} />
            <MetricCard label="Портфель: WB" value="~3.7B" sub="RUB/год (21 бренд)" color={C.purple} />
            <MetricCard label="Потенциал роста" value="x2-3" sub="за 12 месяцев" color={C.cyan} />
          </div>
          <div style={sCard}>
            <h3 style={{ ...sH3, margin: "0 0 16px" }}>5 стратегических решений</h3>
            <div style={{ fontSize: 14, lineHeight: 2.2, color: "#ccc" }}>
              <div style={{ display: "flex", gap: 12, marginBottom: 8 }}><span style={{ ...sBadge(C.red), minWidth: 28, textAlign: "center" }}>1</span><span><strong style={{ color: C.text }}>Масштабировать COSRX через маркетинг.</strong> Snail 96, BHA Blackhead, AHA Toner уже на Kaspi (16M). Нужен маркетинг, не завоз. Потенциал: 16M → 50M+.</span></div>
              <div style={{ display: "flex", gap: 12, marginBottom: 8 }}><span style={{ ...sBadge(C.red), minWidth: 28, textAlign: "center" }}>2</span><span><strong style={{ color: C.text }}>Поднять цены на Dr. Althea, Round Lab, AXIS-Y с 1K до 3-5K KZT.</strong> 50% негативных отзывов = подделки. Причина: при 1K KZT нет маржи для оригинала.</span></div>
              <div style={{ display: "flex", gap: 12, marginBottom: 8 }}><span style={{ ...sBadge(C.amber), minWidth: 28, textAlign: "center" }}>3</span><span><strong style={{ color: C.text }}>Kaspi = основная площадка для 15 из 21 бренда.</strong> WB = масштабирование только для Celimax, Round Lab, VT Cosmetics. Остальные — сначала Kaspi.</span></div>
              <div style={{ display: "flex", gap: 12, marginBottom: 8 }}><span style={{ ...sBadge(C.amber), minWidth: 28, textAlign: "center" }}>4</span><span><strong style={{ color: C.text }}>Наборы = главная сезонная стратегия.</strong> 8 марта (1B KZT) и НГ (1.1B KZT) — два пика. Премиум-наборы (34K+) = 43% рынка.</span></div>
              <div style={{ display: "flex", gap: 12, marginBottom: 8 }}><span style={{ ...sBadge(C.green), minWidth: 28, textAlign: "center" }}>5</span><span><strong style={{ color: C.text }}>Шампуни (630M KZT) и тканевые маски (122M KZT) — белые пятна.</strong> Treecell → шампуни, Mediheal → маски. Нет сильного лидера ни в одной.</span></div>
            </div>
          </div>
        </Section>

        {/* ═══ 2. PRIORITY MATRIX ═══ */}
        <Section id="s2" title="2. Матрица приоритизации: 21 бренд x 2 площадки">
          <p style={sP}>Каждый бренд оценен по двум осям: текущая позиция и потенциал роста. Результат — 4 стратегических группы.</p>

          <div style={{ ...sCard, borderTop: `3px solid ${C.green}` }}>
            <h3 style={{ ...sH3, margin: "0 0 12px", color: C.green }}>Группа A: Масштабировать (сильная позиция + высокий потенциал)</h3>
            <DataTable headers={["Бренд", "Kaspi/мес", "WB/мес", "Приоритетная площадка", "Ключевое действие"]} rows={[
              ["Celimax", "239M KZT", "620M KZT", "Обе (лидер на обеих)", "Расширить Dual Barrier: SPF, маска. Наборы к пикам."],
              ["Dr. Althea", "171M KZT", "< топ-200", "Kaspi (доминант)", "Поднять цену 1K→3-5K. QR-верификация. Выход на WB."],
              ["Skin1004", "136M KZT", "< топ-200", "Kaspi", "Madagascar SPF + Premium Set. Начать WB-экспансию."],
              ["Round Lab", "86M KZT", "240M KZT", "WB (2.8x выше)", "WB-фокус. На Kaspi — борьба с подделками."],
              ["AXIS-Y", "78M KZT", "< топ-200", "Kaspi", "Mugwort + TXA линейки. Цены вверх."],
            ]} />
          </div>

          <div style={{ ...sCard, borderTop: `3px solid ${C.blue}` }}>
            <h3 style={{ ...sH3, margin: "0 0 12px", color: C.blue }}>Группа B: Раскрутить (продукт есть, продаж мало)</h3>
            <DataTable headers={["Бренд", "Kaspi", "WB", "Главная возможность"]} rows={[
              ["COSRX", "16M", "< топ-200", "Snail 96, BHA, AHA уже на Kaspi — нужен маркетинг для масштабирования до 50M+"],
              ["VT Cosmetics", "47M (Kaspi) / 115M (WB)", "23M RUB", "PDRN линейка полная. 47M/мес. Набор PDRN 25-30K. Один из самых перспективных."],
              ["Anua", "49M", "< топ-200", "49M/мес с 20+ SKU. Heartleaf тонер, Azelaic, PDRN, Ceramide. Тренд-ингредиенты."],
              ["Mediheal", "4M", "< топ-200", "Тканевые маски: ниша 122M, лидер = Китай. Забрать."],
              ["Sen Sulu / The Yeon", "135M", "—", "Уже #1 в 5 нишах декора на Kaspi. Расширить палитру."],
            ]} />
          </div>

          <div style={{ ...sCard, borderTop: `3px solid ${C.cyan}` }}>
            <h3 style={{ ...sH3, margin: "0 0 12px", color: C.cyan }}>Группа C: Активировать (карточки есть, продаж нет)</h3>
            <DataTable headers={["Бренд", "Потенциал", "Стратегия входа"]} rows={[
              ["Treecell", "15M+ KZT", "Шампуни 630M без лидера. Night Collagen = уникальный. Kaspi первым."],
              ["Beplain", "10M+ KZT", "Набор Mung Bean 15-18K. 50 отзывов. Блогеры. Kaspi."],
              ["Skinfood", "10M+ KZT", "Rice Brightening Set. Уникальное «рисовое» позиционирование."],
              ["Moda Moda", "5M+ KZT", "Оттеночные шампуни. Краска для волос = 161M ниша."],
              ["TFIT", "3M+ KZT", "Консилеры. Расширить палитру. Нишевый."],
            ]} />
          </div>

          <div style={{ ...sCard, borderTop: `3px solid ${C.dim}` }}>
            <h3 style={{ ...sH3, margin: "0 0 12px", color: C.dim }}>Группа D: Отложить / Переоценить</h3>
            <DataTable headers={["Бренд", "Причина", "Рекомендация"]} rows={[
              ["Bueno", "Не представлен на Kaspi и вне топ-200 WB", "Оценить спрос перед инвестициями"],
              ["Healthy", "Не представлен", "Нет данных для оценки"],
              ["Bohicare", "Нулевые продажи, неизвестность", "SPF-крем может сработать, но нужен маркетинг"],
              ["Mizon / Green Monster", "1M KZT, минимальная узнаваемость", "Пересмотреть через 6 мес"],
              ["Mommy Care", "15M, но техника (массажёры), не косметика", "Отдельная стратегия, не beauty-портфель"],
            ]} />
          </div>
        </Section>

        {/* ═══ 3. CHANNEL STRATEGY ═══ */}
        <Section id="s3" title="3. Канальная стратегия: где продавать каждый бренд">
          <DataTable headers={["Бренд", "Kaspi", "WB", "Офлайн", "Комментарий"]} rows={[
            ["Celimax", "★★★ Основа", "★★★ Масштаб", "★★ Бренд", "Мультиканальный лидер"],
            ["Dr. Althea", "★★★ Доминант", "★★ Запуск", "★ Позже", "Сначала чистка Kaspi от подделок"],
            ["Skin1004", "★★★ Основа", "★★ Запуск", "★ Позже", "Madagascar — узнаваемая линейка"],
            ["Round Lab", "★★ Поддержка", "★★★ Фокус", "★ Позже", "WB = 2.8x выручка Kaspi"],
            ["AXIS-Y", "★★★ Основа", "★ Позже", "—", "Сначала стабилизировать Kaspi"],
            ["VT Cosmetics", "★★ Рост", "★★★ Уже есть", "—", "PDRN тренд на обеих площадках"],
            ["COSRX", "★★★ Первый", "★★ Второй", "★★ Бренд", "Глобальный бренд — сразу два канала"],
            ["Anua", "★★★ Основа", "★ Позже", "—", "Kaspi — быстрее наберёт обороты"],
            ["Mediheal", "★★★ Первый", "★ Позже", "—", "Маски — Kaspi. Потом WB."],
            ["Treecell", "★★★ Первый", "★ Позже", "—", "Шампуни — начать с Kaspi"],
            ["Sen Sulu", "★★★ Доминант", "—", "★★ Бренд", "КЗ-бренд, Kaspi + офлайн"],
            ["Beplain", "★★★ Запуск", "★ Позже", "—", "Kaspi первым, WB потом"],
            ["Skinfood", "★★★ Запуск", "★ Позже", "—", "Kaspi первым"],
          ]} />
          <p style={{ ...sP, fontSize: 12, color: C.dim }}>★★★ = приоритетный канал, ★★ = вторичный, ★ = планировать, — = не рекомендуется сейчас</p>

          <div style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "#ccc", lineHeight: 1.6 }}>
            <strong style={{ color: C.accent }}>Ключевой принцип: </strong>Kaspi = основная площадка для 15 из 21 бренда. WB = площадка масштабирования для тройки лидеров (Celimax, Round Lab, VT Cosmetics). Не распылять ресурсы — сначала доминировать на одной площадке, потом расширяться.
          </div>
        </Section>

        {/* ═══ 4. CATEGORY STRATEGY ═══ */}
        <Section id="s4" title="4. Категорийная стратегия: в какие ниши заходить">
          <DataTable headers={["Ниша Kaspi", "Выручка", "YoY рост", "Бренды портфеля", "Стратегия"]} rows={[
            ["Кремы и сыворотки", "1 712M", "+58%", "Dr. Althea #1, Celimax #3, Skin1004 #5", "Удерживать лидерство. Расширять линейки."],
            ["Тоники", "290M", "+39%", "Celimax #1 (21%!)", "Доминирование. Защита доли."],
            ["Умывание", "517M", "+38%", "Round Lab #2, Celimax #3", "Рост. Round Lab — бороться с подделками."],
            ["Наборы", "862M", "+73%", "Sen Sulu #1, Celimax #3, Skin1004 #4", "Сезонная ставка: 8 марта + НГ."],
            ["Маски для лица", "122M", "+43%", "AXIS-Y #2, Skin1004 #3", "ВХОД для Mediheal (тканевые маски)."],
            ["Патчи", "45M", "+114%", "COSRX #3", "Самый быстрый рост. COSRX усилить."],
            ["Шампуни", "630M", "+80%", "Нет лидера", "ВХОД для Treecell. Белое пятно."],
            ["Тональные", "536M", "+5%", "Sen Sulu #7, MISSHA #9", "Замедление. Не инвестировать агрессивно."],
            ["Кремы для тела", "400M", "+101%", "Нет бренда", "Возможность для расширения линеек Celimax/Skin1004."],
            ["Декор (пудры, тени, помады)", "~500M", "+20-60%", "Sen Sulu = #1 в 5 нишах", "Sen Sulu — расширять палитру."],
          ]} />

          <div style={{ borderLeft: `3px solid ${C.green}`, paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "#ccc", lineHeight: 1.6 }}>
            <strong style={{ color: C.green }}>Три ключевые возможности: </strong>1) <strong>Шампуни (630M)</strong> — ноль лидеров среди уходовых брендов → Treecell. 2) <strong>Тканевые маски (122M)</strong> — лидер = Китай → Mediheal. 3) <strong>Кремы для тела (400M, +101%)</strong> — самый быстрорастущий крупный сегмент → расширение линеек.
          </div>
        </Section>

        {/* ═══ 5. PRICING ═══ */}
        <Section id="s5" title="5. Ценовая политика и борьба с подделками">
          <div style={sCard}>
            <h3 style={{ ...sH3, margin: "0 0 12px", color: C.red }}>Правило #1: Минимальная цена на Kaspi = 3 000 KZT</h3>
            <p style={sP}>При цене &lt;2K KZT — 50% негативных отзывов = подделки. При 5K+ — подделки падают до 5-10%. При 10K+ — практически исчезают.</p>
            <DataTable headers={["Бренд", "Текущая цена", "Целевая цена", "Обоснование"]} rows={[
              ["Dr. Althea 345 Relief", "1K", "3-5K", "50% негативов = подделки. +200% маржа."],
              ["Round Lab Dokdo", "1K", "2-3K", "5.2% негативов. Средний чек падает."],
              ["AXIS-Y Dark Spot Serum", "1K", "3-4K", "Чек упал в 2 раза. Демпинг."],
              ["Celimax Dual Barrier", "2K", "3-4K", "1.6% негативов — лучше, но можно поднять."],
              ["VT Cosmetics PDRN", "14K", "14K (сохранить)", "1.4% негативов. Цена защищает."],
              ["Skin1004 Set", "9K", "9-12K", "Наборы = премиум. Можно выше."],
            ]} />
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, margin: "0 0 12px" }}>Комплекс мер против подделок</h3>
            <div style={{ fontSize: 13, lineHeight: 2, color: "#ccc" }}>
              <div><span style={sBadge(C.red)}>Критично</span> Поднять минимальную цену до 3K KZT — отсекает 80% подделочников</div>
              <div style={{ marginTop: 4 }}><span style={sBadge(C.red)}>Критично</span> QR-верификация на упаковке — покупатель сканирует → видит «оригинал»</div>
              <div style={{ marginTop: 4 }}><span style={sBadge(C.amber)}>Высокий</span> «Авторизованный дистрибьютор» в заголовке карточки Kaspi</div>
              <div style={{ marginTop: 4 }}><span style={sBadge(C.amber)}>Высокий</span> Ограничить число продавцов (Dr. Althea: 67 → 10-15 авторизованных)</div>
              <div style={{ marginTop: 4 }}><span style={sBadge(C.blue)}>Средний</span> Фото с оригинального склада в галерее карточки</div>
              <div style={{ marginTop: 4 }}><span style={sBadge(C.blue)}>Средний</span> Ответ на каждый негативный отзыв о подделке</div>
              <div style={{ marginTop: 4 }}><span style={sBadge(C.dim)}>Долгосрочно</span> Юридическое преследование продавцов подделок</div>
            </div>
          </div>
        </Section>

        {/* ═══ 6. SEASONAL PLAN ═══ */}
        <Section id="s6" title="6. Сезонный план на 12 месяцев">
          <DataTable headers={["Месяц", "Фокус", "Бренды", "Ключевые категории", "Действия"]} rows={[
            ["Апрель", "Пост-8 марта + SPF", "Skin1004, Round Lab", "SPF-кремы, тоники", "Запуск SPF-линеек к лету"],
            ["Май", "Летний уход", "Celimax, Treecell", "Тоники, шампуни, умывание", "Лёгкие текстуры. Запуск Treecell."],
            ["Июнь", "Пик шампуней", "Treecell, Round Lab", "Шампуни (пик), тоники", "Масштабирование Treecell."],
            ["Июль-Август", "Лето / помады", "Sen Sulu, Celimax", "Помады (пик), SPF", "Sen Sulu декор. Celimax SPF."],
            ["Сентябрь", "Осенний уход", "Dr. Althea, AXIS-Y", "Кремы, сыворотки", "Восстановление после лета."],
            ["Октябрь", "Подготовка к Жума", "Все бренды", "Все категории", "Закупка наборов. Акционные цены."],
            ["Ноябрь", "Kaspi Жума", "Все бренды", "Наборы, кремы, декор", "Скидки 20-30%. Максимум продаж."],
            ["Декабрь", "Новый год = ПИК", "Celimax, Skin1004, Sen Sulu", "Наборы (1126M!)", "Подарочные сеты. Премиум."],
            ["Январь", "COSRX запуск", "COSRX, Mediheal", "Патчи, маски, умывание", "Завоз Snail 96 + BHA. Mediheal маски."],
            ["Февраль", "Подготовка 8 марта", "Все бренды", "Наборы, тональные", "Закупка наборов за 4-6 нед."],
            ["Март", "8 марта = ПИК #2", "Celimax, Skin1004, AXIS-Y", "Наборы (1029M!), тональные", "Максимальные продажи наборов."],
          ]} />
        </Section>

        {/* ═══ 7. QUICK WINS ═══ */}
        <Section id="s7" title="7. Топ-5 быстрых побед (ближайшие 30 дней)">
          <div style={sCard}>
            <div style={{ fontSize: 13, lineHeight: 2.5, color: "#ccc" }}>
              {[
                { n: "1", t: "Масштабировать COSRX через маркетинг", d: "Snail 96, BHA Blackhead, AHA Toner уже на Kaspi (16M). Нужен маркетинг, не завоз: набрать 500+ отзывов на Snail 96 (321 сейчас) и BHA (99 сейчас). Потенциал: 16M → 50M+.", impact: "50M+ KZT/мес", effort: "Средний" },
                { n: "2", t: "Поднять цену Dr. Althea 345 Relief с 1K до 3-5K", d: "Отсечёт 80% подделок. Маржа вырастет x3. Негативные отзывы упадут на 40-50%.", impact: "Маржа x3", effort: "Низкий" },
                { n: "3", t: "QR-верификация на Dr. Althea, Round Lab, AXIS-Y", d: "Стикер QR → покупатель сканирует → «Оригинал подтверждён». Стоимость: ~$0.05/шт. Эффект: +15-20% конверсия.", impact: "+15-20% конверсия", effort: "Низкий" },
                { n: "4", t: "Создать наборы к Kaspi Жума / НГ из Celimax + Skin1004", d: "Наборы = 862M ниша, премиум (34K+) = 43%. Dual Barrier Set (27K) уже = 23M. Добавить: Madagascar Premium Set.", impact: "30M+ KZT в пик", effort: "Низкий" },
                { n: "5", t: "Запустить VT Cosmetics PDRN набор по 25-30K", d: "PDRN = тренд 2025-2026. Высокий чек = мало подделок. 70 отзывов с рейтингом 5.0. Масштабировать.", impact: "20M+ KZT/мес", effort: "Низкий" },
              ].map((item) => (
                <div key={item.n} style={{ ...sCard, borderLeft: `3px solid ${C.green}`, margin: "0 0 12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{item.n}. {item.t}</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <span style={sBadge(C.green)}>{item.impact}</span>
                      <span style={sBadge(C.dim)}>Усилия: {item.effort}</span>
                    </div>
                  </div>
                  <p style={{ ...sP, margin: 0, fontSize: 13 }}>{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ═══ 8. STRATEGIC INITIATIVES ═══ */}
        <Section id="s8" title="8. Топ-5 стратегических инициатив (6+ месяцев)">
          <div style={sCard}>
            <div style={{ fontSize: 13, lineHeight: 2.5, color: "#ccc" }}>
              {[
                { n: "1", t: "Treecell → шампуни (630M, белое пятно)", d: "Ни одного сильного beauty-бренда в шампунях Kaspi. Night Collagen Shampoo — уникальный продукт. План: запуск 3-5 SKU → набор 200+ отзывов → масштабирование. Горизонт: 3-6 мес до 15M/мес.", color: C.cyan },
                { n: "2", t: "Mediheal → тканевые маски (122M, лидер = Китай)", d: "Gegemoon (Китай) = #1 с 13M. Mediheal = мировой лидер масок, но на Kaspi = 4M. Завести 10-15 SKU тканевых масок. Горизонт: 3-6 мес до 30M/мес.", color: C.cyan },
                { n: "3", t: "Dr. Althea, Skin1004, AXIS-Y → выход на WB", d: "Лидеры Kaspi, но вне топ-200 WB. Продукт проверен → масштабировать на WB с теми же SKU. Подкатегория «Корейские бренды» WB (228M RUB) = выделенная витрина. Горизонт: 6-9 мес.", color: C.blue },
                { n: "4", t: "Beplain + Skinfood → активация с нуля", d: "Beplain: Mung Bean Set 15-18K + блогеры. Skinfood: Rice Brightening Set + уникальное позиционирование. Обе — через программу первых отзывов. Горизонт: 4-6 мес до 10M/мес каждый.", color: C.blue },
                { n: "5", t: "Кремы для тела → расширение линеек (+101% YoY)", d: "400M ниша, самый быстрый рост среди крупных. La Roche-Posay = #1 (6.5%). Фрагментированный рынок. Celimax или Skin1004 могут выпустить body-линейку.", color: C.purple },
              ].map((item) => (
                <div key={item.n} style={{ ...sCard, borderLeft: `3px solid ${item.color}`, margin: "0 0 12px" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 8 }}>{item.n}. {item.t}</div>
                  <p style={{ ...sP, margin: 0, fontSize: 13 }}>{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ═══ 9. RISKS ═══ */}
        <Section id="s9" title="9. Риски и митигация">
          <DataTable headers={["Риск", "Вероятность", "Влияние", "Митигация"]} rows={[
            ["Подделки уничтожают репутацию бренда", "Высокая", "Критичное", "QR-верификация + цены >3K + ограничение продавцов"],
            ["Демпинг между продавцами", "Высокая", "Высокое", "Авторизованная дистрибуция. MAP (minimum advertised price)."],
            ["Новые конкуренты копируют стратегию", "Средняя", "Среднее", "Скорость. First-mover advantage в шампунях и масках."],
            ["Зависимость от Kaspi как канала", "Средняя", "Высокое", "WB как второй канал. Офлайн для брендинга."],
            ["Сезонный кассовый разрыв (лето)", "Средняя", "Среднее", "SPF-продукты и шампуни = летние ниши."],
            ["Изменение алгоритмов Kaspi/WB", "Низкая", "Высокое", "Диверсификация каналов. Отзывы как стабильный фактор."],
          ]} />
        </Section>

        {/* ═══ 10. KPI ═══ */}
        <Section id="s10" title="10. KPI и метрики успеха">
          <DataTable headers={["KPI", "Текущее", "Цель 6 мес", "Цель 12 мес", "Как измерять"]} rows={[
            ["Суммарная выручка Kaspi", "~900M KZT/мес", "1.4B", "2B", "RedStat помесячно"],
            ["Суммарная выручка WB", "~975M KZT/мес", "1.5B", "2.5B", "MPStats помесячно"],
            ["Количество брендов >50M на Kaspi", "6", "8", "10", "RedStat бренд-сплит"],
            ["COSRX выручка на Kaspi", "16M", "30M", "50M", "RedStat"],
            ["Treecell выручка (шампуни)", "<1M", "5M", "15M", "RedStat"],
            ["Средний рейтинг портфеля", "4.8", "4.85", "4.9", "Kaspi/WB"],
            ["% негативных отзывов о подделках", "~30%", "<15%", "<5%", "Анализ отзывов"],
            ["Доля наборов в выручке", "~15%", "25%", "30%", "RedStat, пики 8 мар/НГ"],
          ]} />

          <div style={{ ...sCard, borderLeft: `3px solid ${C.accent}`, marginTop: 24 }}>
            <h3 style={{ ...sH3, margin: "0 0 8px", color: C.accent }}>Периодичность мониторинга</h3>
            <div style={{ fontSize: 13, lineHeight: 2, color: "#ccc" }}>
              <div><strong style={{ color: C.text }}>Еженедельно:</strong> Топ-SKU продажи, негативные отзывы, цены конкурентов</div>
              <div><strong style={{ color: C.text }}>Ежемесячно:</strong> Бренд-сплит по категориям, YoY динамика, доля рынка</div>
              <div><strong style={{ color: C.text }}>Ежеквартально:</strong> Стратегический обзор: новые ниши, конкуренты, ценовые сдвиги</div>
              <div><strong style={{ color: C.text }}>Перед сезоном:</strong> За 6 нед до 8 марта и НГ — ревизия наборов, акций, запасов</div>
            </div>
          </div>
        </Section>

        {/* ═══ FOOTER ═══ */}
        <div style={{ marginTop: 40, padding: "24px", background: `${C.accent}08`, borderRadius: 12, border: `1px solid ${C.accent}30` }}>
          <p style={{ ...sP, margin: "0 0 12px", fontSize: 13, color: C.dim }}>
            Проанализировано: <strong style={{ color: C.text }}>73 000+ ниш Kaspi</strong> &middot; <strong style={{ color: C.text }}>930 000+ SKU WB</strong> &middot; <strong style={{ color: C.text }}>35 000+ отзывов</strong> &middot; <strong style={{ color: C.text }}>21 бренд</strong> &middot; <strong style={{ color: C.text }}>16 месяцев данных Kaspi</strong> &middot; <strong style={{ color: C.text }}>74 месяца трендов WB</strong>
          </p>
          <p style={{ ...sP, margin: "0 0 8px", fontSize: 13, color: C.dim }}>
            Источники данных: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "none", fontWeight: 600 }}>RedStat.kz</a> &middot; <a href="https://mpstats.io" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "none", fontWeight: 600 }}>MPStats</a>
          </p>
          <p style={{ ...sP, margin: 0, fontSize: 13, color: C.dim }}>
            Связанные отчёты: <a href="/reports/kaspi-cosmetics" style={{ color: C.accent, textDecoration: "none" }}>Рынок Kaspi</a> &middot; <a href="/reports/kaspi-brand-portfolio" style={{ color: C.accent, textDecoration: "none" }}>21 бренд на Kaspi</a> &middot; <a href="/reports/wb-cosmetics" style={{ color: C.accent, textDecoration: "none" }}>Рынок WB</a>
          </p>
        </div>

      </div>
    </div>
  );
}
