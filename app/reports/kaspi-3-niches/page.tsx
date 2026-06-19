"use client";

import { useState } from "react";
import Link from "next/link";

/* ───── design tokens (identical to kaspi-cosmetics) ───── */
const C = {
  bg: "#0a0a0f", surface: "#111119", border: "#1e1e30",
  accent: "#e8729a", green: "#00d2a0", text: "#e8e8f0",
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

function DataTable({ headers, rows, highlight }: { headers: string[]; rows: (string | number)[][]; highlight?: number }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: 16 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead><tr>{headers.map((h, i) => (<th key={i} style={{ padding: "10px 12px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", fontSize: 11 }}>{h}</th>))}</tr></thead>
        <tbody>{rows.map((row, ri) => (<tr key={ri} style={{ background: highlight !== undefined && ri === highlight ? `${C.accent}12` : "transparent" }}>{row.map((cell, ci) => (<td key={ci} style={{ padding: "10px 12px", textAlign: "left", color: ci === 0 ? C.text : "#ccc", borderBottom: `1px solid ${C.border}20`, fontWeight: ci === 0 ? 500 : 400, whiteSpace: ci === 0 ? "nowrap" : "normal" }}>{cell}</td>))}</tr>))}</tbody>
      </table>
    </div>
  );
}

function MetricCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{ ...sCard, padding: "16px 20px", flex: 1, minWidth: 140 }}>
      <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: color || C.text }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Insight({ text, type = "info" }: { text: string; type?: "info" | "warning" | "success" }) {
  const color = type === "warning" ? C.amber : type === "success" ? C.green : C.blue;
  return <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 14, margin: "12px 0", fontSize: 13, color: "#ccc", lineHeight: 1.6 }}><strong style={{ color }}>Инсайт: </strong>{text}</div>;
}

function Rec({ text }: { text: string }) {
  return <div style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: 14, margin: "12px 0", fontSize: 13, color: "#ccc", lineHeight: 1.6 }}><strong style={{ color: C.accent }}>Рекомендация: </strong>{text}</div>;
}

function Quote({ text, color = C.red }: { text: string; color?: string }) {
  return <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 14, margin: "8px 0", fontSize: 13, color: "#bbb", lineHeight: 1.6, fontStyle: "italic" }}>«{text}»</div>;
}

/* ═══════════════════ MAIN ═══════════════════ */
export default function ThreeNichesReport() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>

        <div style={{ marginBottom: 16 }}><Link href="/" style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}>&larr; kasymzhanov.com</Link></div>

        {/* ═══ HEADER ═══ */}
        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
          <div style={sBadge(C.accent)}><span style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>Enterprise Analytics Report</span></div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "16px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            3 ниши Kaspi.kz:<br />текстиль, мебель, вертикальные пылесосы
          </h1>
          <p style={{ color: C.dim, fontSize: 14, margin: "12px 0 0" }}>
            Подготовил <strong style={{ color: C.text }}>Алмас Касымжанов</strong>
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, color: C.dim, flexWrap: "wrap" }}>
            <span>Дата: <strong style={{ color: C.text }}>5 апреля 2026</strong></span>
            <span>Срез: <strong style={{ color: C.text }}>февраль 2026</strong></span>
            <span>История: <strong style={{ color: C.text }}>16 месяцев</strong></span>
            <span>Источник: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" style={{ color: C.text, textDecoration: "none" }}>RedStat.kz</a></span>
          </div>
          <p style={{ ...sP, marginTop: 16, fontSize: 13, color: C.dim }}>Детальный анализ <strong style={{ color: C.text }}>трёх ниш Kaspi.kz</strong> для принятия решения о заходе: домашний текстиль, мебель и вертикальные/беспроводные пылесосы. Динамика 16 месяцев, сегменты, бренды, топ-SKU, AI-анализ отзывов бестселлеров, стратегия входа.</p>
        </div>

        {/* ═══ TOC ═══ */}
        <div style={{ ...sCard, marginBottom: 48, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.dim, marginBottom: 12 }}>Содержание</div>
          {[
            ["s1", "1. Executive Summary — сравнение 3 ниш"],
            ["s2", "2. Домашний текстиль — 2.84B ₸/мес (+40% YoY)"],
            ["s3", "3. Мебель — 14.63B ₸/мес (+32% YoY)"],
            ["s4", "4. Вертикальные пылесосы — DREAME против всех"],
            ["s5", "5. AI-анализ отзывов топ-SKU"],
            ["s6", "6. Сценарии входа и бюджеты"],
            ["s7", "7. Red flags: чего не делать"],
            ["s8", "8. Финальные рекомендации"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ display: "block", padding: "5px 0", fontSize: 13, color: C.accent, textDecoration: "none" }}>{label}</a>
          ))}
        </div>

        {/* ═══ 1. EXECUTIVE SUMMARY ═══ */}
        <Section id="s1" title="1. Executive Summary">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
            <MetricCard label="Мебель" value="14.63B" sub="+32% YoY · 411K заказов" color={C.accent} />
            <MetricCard label="Домашний текстиль" value="2.84B" sub="+40% YoY · 568K заказов" color={C.green} />
            <MetricCard label="Пылесосы (всё)" value="2.92B" sub="+18% YoY · 90K заказов" color={C.blue} />
            <MetricCard label="Вертикальные" value="~705M" sub="DREAME 57%" color={C.purple} />
          </div>

          <p style={sP}>Из трёх ниш <strong style={{ color: C.text }}>две имеют явный потенциал входа</strong> (мебель и текстиль), а третья — вертикальные пылесосы — ограничена монополией DREAME. Ключевая находка: <strong style={{ color: C.red }}>топ-1 диван на Kaspi (62M ₸/мес) имеет средний рейтинг 2.33⭐</strong> — это сигнал системного кризиса качества и окно для захода.</p>

          <DataTable headers={["Критерий", "Текстиль", "Мебель", "Верт. пылесосы"]} rows={[
            ["Выручка/мес (Feb'26)", "2.84B ₸", "14.63B ₸", "~0.70B ₸"],
            ["YoY (нояб-фев)", "+40%", "+32%", "+18%"],
            ["Активных SKU", "6 751", "5 199", "37 (из 450 общих)"],
            ["Продавцов", "1 936", "1 848", "~30"],
            ["Средний чек", "~5 000 ₸", "~35 600 ₸", "~155 000 ₸"],
            ["Доля «Без бренда»", "~55%", "~80% топ-SKU", "<5%"],
            ["Маржа (оценка)", "30-50%", "40-60%", "15-25%"],
            ["Порог входа", "Низкий (7-9M)", "Высокий (24-30M)", "Высокий (18-25M)"],
            ["Рычаг (рекомендация)", "🥈 Вторая линейка", "🥇 Основной заход", "🥉 Пропустить"],
          ]} highlight={1} />

          <div style={sCard}>
            <h3 style={{ ...sH3, margin: "0 0 12px" }}>Главные выводы одним списком</h3>
            <div style={{ fontSize: 13, lineHeight: 2, color: "#ccc" }}>
              <div>1. <strong style={{ color: C.text }}>Мебель — лучший рычаг:</strong> 14.6B рынок, кризис качества лидера (2.33⭐) = окно для захода с сервисом</div>
              <div>2. <strong style={{ color: C.text }}>Текстиль — самый быстрый рост:</strong> +40% YoY, низкий порог, премиум-сегмент даёт маржу</div>
              <div>3. <strong style={{ color: C.text }}>Вертикальные пылесосы — зрелый рынок:</strong> DREAME держит 57%, маржа зажата, YoY всего +18%</div>
              <div>4. <strong style={{ color: C.amber }}>Моно-мерчант модель</strong> работает в обеих выгодных нишах (JASA, NikStory, formfix, Курак корпе)</div>
              <div>5. <strong style={{ color: C.red }}>Токсичные соседи по карточке</strong> губят репутацию в мебели — лучше свой бренд + свой ИП</div>
              <div>6. <strong style={{ color: C.green }}>Кросс-сейл мебель ↔ текстиль</strong> — покупатель дивана = потенциальный покупатель пледа/подушек</div>
            </div>
          </div>
        </Section>

        {/* ═══ 2. HOME TEXTILE ═══ */}
        <Section id="s2" title="2. Домашний текстиль — 2.84B ₸/мес (+40% YoY)">
          <p style={sP}>Категория <code style={{ color: C.dim, fontSize: 11 }}>00674</code> — один из самых быстрорастущих сегментов на Kaspi. Средний чек ~5K ₸, 568K заказов/мес, 1 936 продавцов.</p>

          <h3 style={sH3}>Помесячная динамика (16 мес)</h3>
          <DataTable headers={["Месяц", "Выручка", "Заказов", "SKU", "Продавцов"]} rows={[
            ["2024-11", "2.58B", "405K", "4 468", "1 310"],
            ["2024-12", "2.84B", "465K", "4 877", "1 446"],
            ["2025-02", "2.16B", "389K", "4 560", "1 486"],
            ["2025-05", "1.93B", "401K", "4 242", "1 364"],
            ["2025-08", "2.73B", "560K", "5 790", "1 518"],
            ["2025-11", "3.52B", "651K", "6 731", "1 815"],
            ["2025-12", "4.16B (пик)", "836K", "7 830", "2 084"],
            ["2026-01", "2.66B", "540K", "5 935", "1 789"],
            ["2026-02", "2.84B", "568K", "6 751", "1 936"],
          ]} highlight={6} />
          <Insight text="Декабрь — абсолютный рекорд (+47% к среднему). Классическая подарочная сезонность: постельное бельё, пледы, декоративные подушки покупают как подарки." type="success" />

          <h3 style={sH3}>Структура по L2 (февраль 2026)</h3>
          <DataTable headers={["Категория", "Выручка", "Доля", "Тип"]} rows={[
            ["Ковры и ковровые дорожки", "540M", "19%", "Group"],
            ["Шторы и карнизы", "480M", "17%", "Group"],
            ["Постельное бельё", "420M", "15%", "Group"],
            ["Подушки", "280M", "10%", "Group"],
            ["Текстиль для кухни", "240M", "9%", "Group"],
            ["Пледы и покрывала", "200M", "7%", "Leaf"],
            ["Полотенца", "200M", "7%", "Leaf"],
            ["Чехлы и накидки для мебели", "190M", "7%", "Leaf"],
            ["Одеяла", "140M", "5%", "Leaf"],
            ["Корпе", "110M", "4%", "Leaf"],
          ]} />

          <h3 style={sH3}>Ценовые сегменты: где прячется премиум</h3>
          <DataTable headers={["Leaf", "Премиум медиана", "Доля премиума", "Брендированность в премиуме"]} rows={[
            ["Корпе", "88 299 ₸", "43.6%", "43%"],
            ["Одеяла", "29 990 ₸", "35.6%", "79%"],
            ["Полотенца", "8 500 ₸", "26.0%", "69%"],
            ["Пледы и покрывала", "20 994 ₸", "20.4%", "59%"],
            ["Чехлы для мебели", "20 000 ₸", "16.3%", "31%"],
          ]} highlight={0} />
          <Insight text="Корпе — самая концентрированная мини-категория: 93 SKU, 43.6% выручки в премиум-сегменте с медианой 88K ₸. Этно-продукт с сверхвысокой маржой." type="success" />
          <Insight text="Одеяла — 79% премиум-сегмента брендированы. formfix утяжелённое одеяло Gravio (59 990 ₸) — лидер категории." />

          <h3 style={sH3}>Топ-10 SKU домашнего текстиля</h3>
          <DataTable headers={["#", "Товар", "Бренд", "Цена", "Rev/мес", "Мерч.", "Рейтинг"]} rows={[
            ["1", "Ортопед. подушка 40x60 мемориформ", "formfix", "19 990", "6M", "1", "4.9"],
            ["2", "Подушка 50x70 бамбук", "NikStory", "4 630", "6M", "1", "5.0"],
            ["3", "Ковёр 200x300 безворс.", "Без бренда", "6 799", "6M", "20", "4.9"],
            ["4", "Комплект Ease 2-сп хлопок муслин", "Без бренда", "6 700", "6M", "23", "4.8"],
            ["5", "Курак корпе 220x80 хлопок", "Курак корпе", "72 151", "6M", "24", "4.8"],
            ["6", "Корпе 230x80 вата бежевый", "Без бренда", "54 589", "6M", "19", "4.8"],
            ["7", "Ортопед. подушка NikStory memory", "NikStory", "5 520", "5M", "1", "4.9"],
            ["8", "Подушка пух искусств.", "Aline Home", "1 272", "5M", "21", "4.8"],
            ["9", "ABB корпе 230x80 вата", "ABB", "76 067", "5M", "16", "4.8"],
            ["10", "Подушка 50x70 шёлк", "VITAS", "1 968", "5M", "36", "4.8"],
          ]} />

          <Insight text="Моно-мерчант стратегия доминирует: все SKU NikStory и formfix продаются через ОДНОГО продавца. Это контроль цены, карточки и отзывов. Противоположность — ковры/шторы (20-60 мерчантов = демпинг)." type="success" />

          <h3 style={sH3}>Топ брендов текстиля</h3>
          <DataTable headers={["Бренд", "Rev из топ-50", "SKU", "Стратегия"]} rows={[
            ["NikStory", "26M", "6", "Моно-мерчант, подушки/memory foam"],
            ["formfix", "20M", "5", "Ортопед./утяжелённые, премиум"],
            ["Aline Home", "9M", "2", "Бюджетные подушки"],
            ["Курак корпе", "6M", "1", "Этно-корпе премиум"],
            ["ABB", "5M", "1", "Корпе премиум"],
            ["VITAS", "5M", "1", "Шёлковые подушки"],
            ["BM HOME", "5M", "1", "Наборы полотенец"],
            ["DECO HOME", "4M", "1", "Готовые комплекты штор"],
            ["Без бренда", "66M", "18", "Массовые карточки, 20-67 мерч."],
          ]} />

          <Rec text="Вход в текстиль = идти в премиум-сегмент узкой leaf-категории с собственным брендом. Оптимально: утяжелённые одеяла (79% brand), корпе (этно-тренд), ортопедические подушки memory foam." />
          <Rec text="Избегать: ковры 200x300 «Китай безворс.» (20+ мерчантов, маржа <10%), массовые шторы 400x280, бюджетные полотенца <1K (1100+ SKU, медиана 700 ₸)." />
        </Section>

        {/* ═══ 3. FURNITURE ═══ */}
        <Section id="s3" title="3. Мебель — 14.63B ₸/мес (+32% YoY)">
          <p style={sP}>Категория <code style={{ color: C.dim, fontSize: 11 }}>00239</code> — <strong style={{ color: C.text }}>крупнейшая из трёх ниш</strong>. Средний чек ~35K ₸, 411K заказов/мес, Revenue/SKU = 2.81M (самый высокий из трёх).</p>

          <h3 style={sH3}>Помесячная динамика (ключевые точки)</h3>
          <DataTable headers={["Месяц", "Выручка", "Заказов", "SKU", "Продавцов"]} rows={[
            ["2024-11", "15.42B", "342K", "4 249", "1 579"],
            ["2025-01", "8.89B (мин)", "259K", "3 355", "1 516"],
            ["2025-02", "11.28B", "294K", "4 022", "1 674"],
            ["2025-08", "15.59B", "424K", "5 052", "1 741"],
            ["2025-11", "20.11B (пик)", "500K", "5 635", "1 837"],
            ["2025-12", "17.69B", "483K", "5 342", "1 819"],
            ["2026-01", "12.33B", "391K", "4 423", "1 720"],
            ["2026-02", "14.63B", "411K", "5 199", "1 848"],
          ]} highlight={4} />
          <Insight text="Пик — ноябрь 2025 (20.11B, Чёрная пятница + рассрочки Kaspi). Активный сезон август-ноябрь. Январь и апрель-май — провалы. Склад под сезон надо готовить за 2-3 месяца." type="success" />

          <h3 style={sH3}>Структура по L2 (10 подкатегорий)</h3>
          <DataTable headers={["Категория", "Выручка", "Доля", "SKU", "Rev/SKU"]} rows={[
            ["Спальня", "4.58B", "31%", "1 100", "4.16M"],
            ["Гостиная", "3.34B", "23%", "772", "4.32M"],
            ["Кухня", "3.29B", "23%", "860", "3.83M"],
            ["Офис и кабинет", "1.10B", "8%", "473", "2.32M"],
            ["Детская комната", "920M", "6%", "445", "2.07M"],
            ["Прихожая", "553M", "4%", "436", "1.27M"],
            ["Ванная комната", "317M", "2%", "146", "2.17M"],
            ["Системы хранения", "285M", "2%", "344", "0.83M"],
          ]} />
          <Insight text="Три категории (Спальня + Гостиная + Кухня) = 77% мебельного рынка. Всё остальное — периферия." />

          <h3 style={sH3}>Топ-15 SKU мебели (февраль 2026)</h3>
          <DataTable headers={["#", "Товар", "Бренд", "Цена", "Rev/мес", "Мерч.", "Рейтинг"]} rows={[
            ["1", "Диван Rio 400x90 велюр беж.", "Без бренда", "148 888", "62M", "57", "4.6 ⚠"],
            ["2", "Стол-трансформер Элегант 400x100", "Без бренда", "76 420", "48M", "24", "4.9"],
            ["3", "Диван Morbido Комфорт 210x80", "Morbido", "49 998", "45M", "59", "4.7"],
            ["4", "Шкаф Ваша Мебель Модерн 280x230", "Ваша Мебель", "138 499", "45M", "51", "4.8"],
            ["5", "Стол-трансформер Gloria 300x100", "Без бренда", "70 038", "35M", "24", "4.9"],
            ["6", "Стул Чили 86x45 серый", "Без бренда", "9 779", "31M", "24", "4.9"],
            ["7", "Диван Nasip Raiana 230x70", "Без бренда", "64 416", "28M", "47", "4.6"],
            ["8", "Диван Morbido Комфорт 210x80 беж.", "Morbido", "49 898", "28M", "44", "4.6"],
            ["9", "Стул Oleandro 79x54", "Без бренда", "19 127", "27M", "20", "4.8"],
            ["10", "Комплект ELDAR стол+8 стульев", "ELDAR", "121 998", "27M", "19", "4.8"],
            ["11", "Диван Айша 220x90", "Без бренда", "56 999", "26M", "35", "4.5"],
            ["12", "Шкаф Aisha Pro 1103", "Aisha", "56 890", "25M", "19", "4.4"],
            ["13", "Стул JASA QAZ 95x55", "JASA", "10 999", "25M", "1", "4.9"],
            ["14", "Диван TURAN HOME Lavida 360x100", "TURAN HOME", "317 680", "23M", "35", "4.9"],
            ["15", "Стул OleandroW 80x57", "Без бренда", "18 841", "23M", "30", "4.9"],
          ]} highlight={0} />

          <Insight text="80% топ-SKU мебели идут под «Без бренда». Реальные бренды (Morbido, ELDAR, Ваша Мебель) — это ИП-бренды, распространяемые через сеть 20-60 мерчантов. Исключение — JASA (стулья): 25M/мес через ОДНОГО мерчанта. Моно-бренд-модель работает." type="success" />
          <Insight text="🚨 Диван Rio (62M/мес, топ-1) имеет СВЕЖИЙ средний рейтинг 2.33⭐ (Kaspi показывает старое взвешенное 4.6). 1151 отзыв, 157 негативных — системный кризис качества. Детали в секции 5." type="warning" />
        </Section>

        {/* ═══ 4. VACUUMS ═══ */}
        <Section id="s4" title="4. Вертикальные пылесосы — DREAME против всех">
          <p style={sP}>Kaspi <strong style={{ color: C.text }}>не выделяет</strong> вертикальные пылесосы в отдельную категорию — все типы лежат в leaf «Пылесосы» <code style={{ color: C.dim, fontSize: 11 }}>00036</code>. Вертикальные/беспроводные/wet&amp;dry выделены из топ-250 SKU по названию и занимают <strong style={{ color: C.text }}>~24-32% общего рынка пылесосов</strong>.</p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            <MetricCard label="Всего пылесосов" value="2.92B" sub="Feb 2026, 90K заказов" />
            <MetricCard label="Вертикальных" value="~705M" sub="24-32% рынка" color={C.purple} />
            <MetricCard label="DREAME доля" value="57%" sub="16 SKU, 402M" color={C.accent} />
            <MetricCard label="Премиум (&gt;120K)" value="40.5%" sub="от всего рынка пылесосов" color={C.green} />
          </div>

          <h3 style={sH3}>Ценовые сегменты всего рынка пылесосов (Feb 2026)</h3>
          <DataTable headers={["Сегмент", "Медиана", "Выручка", "Доля", "SKU", "Брендированность"]} rows={[
            ["Низкий (<15K)", "17 999", "266M", "9.1%", "359", "79.4%"],
            ["Бюджетный", "29 926", "271M", "9.3%", "379", "88.4%"],
            ["Средний", "48 470", "515M", "17.6%", "364", "89.3%"],
            ["Дорогой", "87 218", "686M", "23.5%", "373", "93.0%"],
            ["Премиум (>120K)", "203 123", "1 182M", "40.5%", "372", "96.5%"],
          ]} highlight={4} />
          <Insight text="Премиум-сегмент = 40.5% всего рынка пылесосов. Это фактически и есть рынок вертикальных/wet&dry — классические мешковые на премиум-сегмент давно не претендуют." type="success" />

          <h3 style={sH3}>Бренды внутри вертикального сегмента</h3>
          <DataTable headers={["#", "Бренд", "Выручка", "Доля", "SKU", "Позиционирование"]} rows={[
            ["1", "DREAME", "402M", "57%", "16", "Доминант (H13/H14/H15, G10, Z30)"],
            ["2", "Deerma", "93M", "13%", "5", "Xiaomi sub-brand, handheld <20K"],
            ["3", "Dyson", "82M", "12%", "9", "Премиум 347-500K ₸"],
            ["4", "Xiaomi", "65M", "9%", "3", "Средний (G20, G20 Lite, G20 Max)"],
            ["5", "NEXME", "43M", "6%", "2", "Локальный копикат DREAME G10"],
            ["6", "Karcher", "11M", "2%", "1", "Нишевый cordless"],
            ["7", "ALMIA", "9M", "1%", "1", "Казахстанский (ALM-V12)"],
          ]} highlight={0} />

          <h3 style={sH3}>Топ-10 вертикальных SKU</h3>
          <DataTable headers={["#", "Модель", "Бренд", "Цена", "Rev/мес"]} rows={[
            ["1", "H13 Pro Plus Mix чёрный", "DREAME", "151 190", "122M"],
            ["2", "H13 Pro Plus (дубль-карточка)", "DREAME", "153 214", "49M"],
            ["3", "H15 Pro Heat чёрный", "DREAME", "396 242", "45M"],
            ["4", "Vacuum Cleaner G20 Lite", "Xiaomi", "47 659", "41M"],
            ["5", "DX700S серый", "Deerma", "17 300", "38M"],
            ["6", "G10 белый (копикат)", "NEXME", "69 990", "38M"],
            ["7", "Wet and Dry G10 чёрный", "DREAME", "87 990", "35M"],
            ["8", "H14 Dual чёрный", "DREAME", "392 277", "34M"],
            ["9", "Wet and Dry G10 Combo", "DREAME", "145 990", "31M"],
            ["10", "V15s Detect Submarine", "Dyson", "390 003", "28M"],
          ]} highlight={0} />

          <Insight text="DREAME H13 Pro Plus = 122M/мес. Это эквивалент Dr. Althea 345 Relief в beauty — один SKU, определяющий всю нишу. Dyson V15 (347K ₸) = 22M/мес. DREAME H13 (151K ₸) = 122M/мес. В 5.5 раз больше выручки при вдвое меньшей цене — DREAME выиграл value battle." type="success" />
          <Insight text="Бороться с DREAME в лоб нельзя. Единственные варианты: (а) авторизованный продавец на мульти-мерчант карточке с локализацией как USP; (б) OEM-бренд в бюджет-сегменте 40-60K (пустая ниша между Deerma и Xiaomi); (в) пропустить нишу." type="warning" />
        </Section>

        {/* ═══ 5. REVIEWS ═══ */}
        <Section id="s5" title="5. AI-анализ отзывов топ-SKU — чего реально боятся покупатели">

          <h3 style={sH3}>🪑 Диван Rio (Без бренда, 62M ₸/мес, 1 151 отзыв) — 2.33⭐ 🚨</h3>
          <p style={{ ...sP, fontSize: 13 }}>Лидер категории диванов, который собирает новые отзывы с катастрофической оценкой. AI выявил 4 блока проблем:</p>

          <div style={{ ...sCard, borderLeft: `3px solid ${C.red}` }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: C.red, margin: "0 0 12px" }}>1. Катастрофическое качество сборки и материалов</h4>
            <Quote text="Не покупайте у них диваны, качество ноль, из дивана выходит насекомые" />
            <Quote text="Диван хорош но сделали с дефектом, швы не правильно сшили и склеили с браком" />
            <Quote text="Диван өте күшті, ұнады, бірақ жеткізіп беру дамымаған... 44 лайков" />
          </div>

          <div style={{ ...sCard, borderLeft: `3px solid ${C.amber}` }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: C.amber, margin: "0 0 12px" }}>2. Мошенничество: не тот цвет, отсутствуют подушки, брак</h4>
            <Quote text="Диван мен айтқан цветін әкелмеді. Өтірік айтады екен... Басқа түсін берген" color={C.amber} />
            <Quote text="Диванный сапасы жаман, отзывта мүлдем басқаша жазылған... сырты бүтін, іші түтін" color={C.amber} />
          </div>

          <div style={{ ...sCard, borderLeft: `3px solid ${C.red}` }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: C.red, margin: "0 0 12px" }}>3. Логистика — отдельный кризис</h4>
            <Quote text="газель 1 күн кеш келді, далаға тастап кетті, айдан кешке дейін далада тұрды (44 лайка)" />
            <Quote text="привезли оставили на улице под дождем и уехали... еще за то что занесли в квартиру хотели деньги взять (22 лайка)" />
            <Quote text="сатушы сборкаға 30000 тг сұрады... отказ жасап (36 лайков)" />
          </div>

          <div style={{ ...sCard, borderLeft: `3px solid ${C.red}` }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: C.red, margin: "0 0 12px" }}>4. Токсичные ИП, генерирующие негатив</h4>
            <p style={{ fontSize: 13, color: "#bbb", margin: "0 0 8px" }}>AI выявил конкретные магазины, портящие репутацию карточки:</p>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8 }}>
              • <strong>Premium MATRAS</strong> — каркасы из гнилого дерева<br />
              • <strong>ИП Байтукина</strong> — продаёт дефект, отказ в возврате<br />
              • <strong>NEO диван</strong> — системные жалобы<br />
              • <strong>MEBEL_DIN</strong> — грубая логистика
            </div>
          </div>

          <Insight text="Это не «плохие отзывы у плохого товара». Это структурная болезнь мульти-мерчант карточек, где 57 продавцов сражаются за каждый заказ демпингом и экономией на всём. Клиент, заходящий с контролем качества + честной логистикой, получает моментальное преимущество." type="success" />

          {/* ─── VAC REVIEWS ─── */}
          <h3 style={sH3}>🧹 DREAME H13 Pro Plus (122M ₸/мес, 2 436 отзывов) — 4.05⭐</h3>
          <p style={{ ...sP, fontSize: 13 }}>Лидер вертикальных пылесосов. Тон поляризованный: любят за скорость влажной уборки, ненавидят за ключевые недостатки.</p>

          <DataTable headers={["Проблема", "Лайков", "Суть"]} rows={[
            ["Слабая мощность сухой уборки", "41+26", "Плохо собирает шерсть и крошки с ковров"],
            ["Запах из контейнера грязной воды", "41+30", "«Так пахнет как будто кто-то умер»"],
            ["Протекание воды", "59+26", "Лужи в щелях и на неровностях"],
            ["Слабый аккумулятор", "41+26", "Быстрая разрядка, долгая зарядка"],
            ["Нет локализации", "26+23", "Инструкция и голос — на китайском"],
            ["Плохая манёвренность", "18+16", "Не пролезает под низкую мебель"],
          ]} />

          <Rec text="Любой продавец DREAME, запустивший локализацию (русско-казахская инструкция, видео, наклейки на корпусе), получит конкурентное преимущество. Это простой USP, которого сейчас нет у 90% продавцов." />

          {/* ─── TEXTILE REVIEWS ─── */}
          <h3 style={sH3}>🛏️ formfix Ортопедическая подушка (6M ₸/мес, 434 отзыва) — 4.74⭐</h3>
          <p style={{ ...sP, fontSize: 13 }}>Премиум-пример в текстиле. Проблемы мягче, но показательны:</p>
          <DataTable headers={["Проблема", "Лайков", "Суть"]} rows={[
            ["Комплектная наволочка", "9+3", "«Похожа на чехол, не входит в комплект»"],
            ["Период адаптации", "9", "Первые 3-7 ночей — боль в шее"],
            ["Завышенные ожидания", "9", "«Поверила рекламе, купила дорогую»"],
            ["Долговечность", "1", "Дырочки за пару дней"],
          ]} />
          <Insight text="Для любого бренда в текстильной premium-категории: честно прописать период адаптации, качественная наволочка в комплекте, управлять ожиданиями в карточке." type="success" />
        </Section>

        {/* ═══ 6. SCENARIOS ═══ */}
        <Section id="s6" title="6. Сценарии входа и бюджеты">

          <div style={{ ...sCard, borderTop: `3px solid ${C.green}` }}>
            <h3 style={{ ...sH3, margin: "0 0 12px" }}>Сценарий A: Консерватор — 8-10M ₸</h3>
            <p style={{ ...sP, fontSize: 13 }}>Заход: <strong style={{ color: C.text }}>Премиум-подушки или ортопед. матрасы в Домашнем текстиле</strong>. 3-5 SKU (memory foam, утяжелённая, шёлк, бамбук, подарочная). Моно-мерчант, свой бренд, средний чек 15-30K. Модель NikStory/formfix.</p>
            <p style={{ ...sP, fontSize: 12, color: C.dim }}>Ожидание: 5-15M ₸/мес к 6-му месяцу. Риски: низкие. ROI: 30-40% годовых.</p>
          </div>

          <div style={{ ...sCard, borderTop: `3px solid ${C.accent}` }}>
            <h3 style={{ ...sH3, margin: "0 0 12px" }}>Сценарий B: Амбициозный — 24-30M ₸ 🥇</h3>
            <p style={{ ...sP, fontSize: 13 }}>Заход: <strong style={{ color: C.text }}>собственный бренд диванов 150-250K ₸</strong>. 2-3 модели × 3 цвета = 6-9 SKU. Моно-мерчант. USP — «диван без сюрпризов» на фоне 2.33⭐ у Rio. Казахстанское или турецкое производство (не Китай).</p>
            <p style={{ ...sP, fontSize: 12, color: C.dim }}>Ожидание: 30-60M ₸/мес к 9-12 месяцу. Риски: средние-высокие (капитал, логистика). ROI: 50-80% годовых при успехе.</p>
          </div>

          <div style={{ ...sCard, borderTop: `3px solid ${C.purple}` }}>
            <h3 style={{ ...sH3, margin: "0 0 12px" }}>Сценарий C: Портфель — 40M+ ₸</h3>
            <p style={{ ...sP, fontSize: 13 }}>1) <strong style={{ color: C.text }}>Мебель, диваны 150-250K</strong> — 25M ₸ (основа). 2) <strong style={{ color: C.text }}>Текстиль премиум, одеяла + корпе</strong> — 8M ₸ (вторая линейка, кросс-сейл к мебели). 3) Отложенный третий ход на 2027.</p>
            <p style={{ ...sP, fontSize: 12, color: C.dim }}>Преимущество: кросс-сейл «покупатель дивана = покупатель пледа/подушек». Диверсификация сезонности: мебель = осень, текстиль = декабрь.</p>
          </div>

          <DataTable headers={["Ниша", "Stock", "Маркетинг", "Логистика", "Оборотка", "Итого"]} rows={[
            ["Текстиль премиум", "3-5M", "1-1.5M", "0.5M", "2M", "7-9M ₸"],
            ["Мебель (1 линия × 3 цвета)", "15-20M", "2-3M", "2M", "5M", "24-30M ₸"],
            ["Верт. пылесосы (OEM бренд)", "12-18M", "2-3M", "1M", "3M", "18-25M ₸"],
          ]} />
        </Section>

        {/* ═══ 7. RED FLAGS ═══ */}
        <Section id="s7" title="7. Red flags: чего не делать">

          <div style={{ ...sCard, borderLeft: `3px solid ${C.red}` }}>
            <h3 style={{ ...sH3, margin: "0 0 12px", color: C.red }}>В мебели</h3>
            <div style={{ fontSize: 13, lineHeight: 1.9, color: "#ccc" }}>
              ❌ Мульти-мерчант без контроля «соседей» — токсичные ИП (Premium MATRAS, Байтукина, NEO диван) убьют ваши отзывы<br />
              ❌ Скрытые доплаты за занос/сборку (30K ₸ сверху) — #1 причина 1-звёздных отзывов<br />
              ❌ Несоответствие цвета/комплектации фото — топ-3 причина возвратов<br />
              ❌ Игнорирование сообщений — путь в чёрный список Kaspi<br />
              ❌ Отсутствие инструкции по сборке на русском/казахском в коробке
            </div>
          </div>

          <div style={{ ...sCard, borderLeft: `3px solid ${C.amber}` }}>
            <h3 style={{ ...sH3, margin: "0 0 12px", color: C.amber }}>В текстиле</h3>
            <div style={{ fontSize: 13, lineHeight: 1.9, color: "#ccc" }}>
              ❌ Плохая комплектная наволочка у ортопедических подушек (главный раздражитель)<br />
              ❌ Завышенные ожидания в рекламе («memory foam = волшебство» — нужна адаптация)<br />
              ❌ Отсутствие размерной точности (пледы 150x200 «минус 3-5 см» в реальности)<br />
              ❌ Дешёвая упаковка для подарочного декабрьского сегмента<br />
              ❌ Заход в массовые безбрендовые ниши (ковры 200x300, шторы 400x280) — демпинг
            </div>
          </div>

          <div style={{ ...sCard, borderLeft: `3px solid ${C.blue}` }}>
            <h3 style={{ ...sH3, margin: "0 0 12px", color: C.blue }}>В пылесосах</h3>
            <div style={{ fontSize: 13, lineHeight: 1.9, color: "#ccc" }}>
              ❌ Отсутствие видео-инструкции на русском/казахском (главная претензия к DREAME)<br />
              ❌ Нет follow-up о сливе контейнера после уборки → запах → возврат<br />
              ❌ Слабый аккумулятор без возможности замены через того же продавца<br />
              ❌ Карточка обещает «мощно» — а пылесос не берёт ковры<br />
              ❌ Заход в лоб против DREAME без уникального USP
            </div>
          </div>
        </Section>

        {/* ═══ 8. FINAL RECS ═══ */}
        <Section id="s8" title="8. Финальные рекомендации">

          <div style={sCard}>
            <h3 style={{ ...sH3, margin: "0 0 16px" }}>Стратегический приоритет</h3>
            <div style={{ fontSize: 13, lineHeight: 2.2, color: "#ccc" }}>
              {[
                { n: "1", t: "🥇 Мебель (диваны 150-250K)", d: "Максимальный рычаг: 14.6B рынок, 2.33⭐ у лидера = открытое окно. Требует капитала (24-30M) и логистики, но единственная ниша с реальным шансом потеснить топ-SKU за 6-9 месяцев." },
                { n: "2", t: "🥈 Текстиль премиум (подушки/одеяла/корпе)", d: "Идеальная вторая нога: +40% YoY, низкий порог входа (7-9M), высокая маржа в премиум-сегменте. Кросс-сейл с мебелью." },
                { n: "3", t: "🥉 Вертикальные пылесосы — пропустить", d: "DREAME держит 57%, маржа 15-25%, YoY всего +18%. Высокий гарантийный риск. Заходить только при наличии китайских связей или эксклюзивной дистрибуции DREAME." },
                { n: "4", t: "Моно-мерчант > мульти-мерчант", d: "NikStory, formfix, JASA, Курак корпе, Euromebel доказывают: один магазин + один бренд + 100% контроль = стабильный доход без демпинга. Мульти-мерчант работает только для генерик-SKU." },
                { n: "5", t: "Отзывы = конверсия", d: "Kaspi — рынок отзывов, а не рынок продуктов. Топ-1 диван с 2.33⭐ зарабатывает 62M только потому, что нет альтернатив. Первый продавец с нормальным качеством забирает позицию." },
                { n: "6", t: "Сезонность разная", d: "Мебель = август-ноябрь (пик 20B), текстиль = декабрь (+47%), пылесосы = ноябрь-декабрь. Склад готовится за 2-3 месяца до сезона." },
                { n: "7", t: "Сервис как USP", d: "В мебели — честная логистика (занос/сборка в цену или чётко в карточке), оперативный возврат, ответ на каждый отзыв <24ч. В пылесосах — локализация и follow-up." },
                { n: "8", t: "Контроль качества обязателен", d: "Минимум 1 проверяющий на отгрузку в мебели. В текстиле — размерный контроль. Без этого — путь Диван Rio: 62M выручки при 2.33⭐ и 157 негативных отзывов." },
              ].map((item) => (
                <div key={item.n} style={{ marginBottom: 10 }}>
                  <span style={{ color: C.accent, fontWeight: 700, marginRight: 8 }}>{item.n}.</span>
                  <strong style={{ color: C.text }}>{item.t}:</strong> {item.d}
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...sCard, borderTop: `3px solid ${C.accent}` }}>
            <h3 style={{ ...sH3, margin: "0 0 12px" }}>4 вопроса для финализации</h3>
            <div style={{ fontSize: 13, lineHeight: 1.9, color: "#ccc" }}>
              1. Какой бюджет на первый заход? (сценарий A/B/C)<br />
              2. Есть ли опыт/связи в Китае? (возможен ли OEM вертикалок)<br />
              3. Есть ли логистический партнёр в КЗ для крупногабарита? (реально ли мебель)<br />
              4. Моно-мерчант или есть сеть перекупов? (определяет брендирование)
            </div>
          </div>

          <div style={{ marginTop: 24, padding: "20px 24px", background: `${C.accent}08`, borderRadius: 12, border: `1px solid ${C.accent}30` }}>
            <p style={{ ...sP, margin: "0 0 8px", fontSize: 13, color: C.dim }}>
              Проанализировано: <strong style={{ color: C.text }}>3 категории · 6 751 + 5 199 + 450 SKU</strong> · <strong style={{ color: C.text }}>16 месяцев истории</strong> (нояб. 2024 — фев. 2026) · <strong style={{ color: C.text }}>4 021 отзыв</strong> топ-SKU с AI-анализом
            </p>
            <p style={{ ...sP, margin: 0, fontSize: 13, color: C.dim }}>
              Источник данных: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "none", fontWeight: 600 }}>RedStat.kz</a>
            </p>
          </div>
        </Section>

      </div>
    </div>
  );
}
