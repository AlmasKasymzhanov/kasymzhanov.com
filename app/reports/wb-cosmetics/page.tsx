"use client";

import { useState } from "react";
import Link from "next/link";

const C = {
  bg: "#0a0a0f", surface: "#111119", border: "#1e1e30",
  accent: "#9b59b6", green: "#00d2a0", text: "#e8e8f0",
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
  return (<div style={{ overflowX: "auto", marginBottom: 16 }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}><thead><tr>{headers.map((h, i) => (<th key={i} style={{ padding: "10px 12px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", fontSize: 11 }}>{h}</th>))}</tr></thead><tbody>{rows.map((row, ri) => (<tr key={ri} style={{ background: highlight !== undefined && ri === highlight ? `${C.accent}12` : "transparent" }}>{row.map((cell, ci) => (<td key={ci} style={{ padding: "10px 12px", textAlign: "left", color: ci === 0 ? C.text : "#ccc", borderBottom: `1px solid ${C.border}20`, fontWeight: ci === 0 ? 500 : 400, whiteSpace: ci === 0 ? "nowrap" : "normal" }}>{cell}</td>))}</tr>))}</tbody></table></div>);
}

function MetricCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (<div style={{ ...sCard, padding: "16px 20px", flex: 1, minWidth: 140 }}><div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>{label}</div><div style={{ fontSize: 22, fontWeight: 700, color: color || C.text }}>{value}</div>{sub && <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>{sub}</div>}</div>);
}

function Insight({ text, type = "info" }: { text: string; type?: "info" | "warning" | "success" }) {
  const color = type === "warning" ? C.amber : type === "success" ? C.green : C.blue;
  return <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 14, margin: "12px 0", fontSize: 13, color: "#bbb", lineHeight: 1.6 }}><strong style={{ color }}>Инсайт: </strong>{text}</div>;
}

/* ═══════════════════ MAIN ═══════════════════ */
export default function WBCosmeticsReport() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>

        <div style={{ marginBottom: 16 }}><Link href="/" style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}>&larr; kasymzhanov.com</Link></div>

        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
          <div style={sBadge(C.accent)}><span style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>Enterprise Analytics Report</span></div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "16px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Рынок «Красота»<br />на Wildberries
          </h1>
          <p style={{ color: C.dim, fontSize: 14, margin: "12px 0 0" }}>
            Подготовил <strong style={{ color: C.text }}>Алмас Касымжанов</strong>
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, color: C.dim, flexWrap: "wrap" }}>
            <span>Период: <strong style={{ color: C.text }}>Апр 2025 — Мар 2026</strong></span>
            <span>SKU с продажами: <strong style={{ color: C.text }}>930 000+</strong></span>
            <span>Брендов: <strong style={{ color: C.text }}>64 700+</strong></span>
            <span>Тренды: <strong style={{ color: C.text }}>6+ лет</strong></span>
          </div>
        </div>

        {/* ═══ TOC ═══ */}
        <div style={{ ...sCard, marginBottom: 48, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.dim, marginBottom: 12 }}>Содержание</div>
          {[
            ["s1", "1. Executive Summary"],
            ["s2", "2. TAM и структура рынка"],
            ["s3", "3. Тренды — рост рынка за 6 лет"],
            ["s4", "4. Топ-30 брендов категории «Красота»"],
            ["s5", "5. Концентрация рынка и конкурентная среда"],
            ["s6", "6. Все 21 бренд клиента — полные данные за год"],
            ["s7", "7. Celimax — детальный разбор (#1 портфеля на WB)"],
            ["s8", "8. Round Lab — детальный разбор (#2)"],
            ["s9", "9. VT Cosmetics — детальный разбор (#3)"],
            ["s10", "10. Skin1004, Anua, COSRX — средний уровень на WB"],
            ["s11", "11. Kaspi vs WB — сравнение площадок"],
            ["s12", "12. Рекомендации"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ display: "block", padding: "5px 0", fontSize: 13, color: C.accent, textDecoration: "none" }}>{label}</a>
          ))}
        </div>

        {/* ═══ 1. EXECUTIVE SUMMARY ═══ */}
        <Section id="s1" title="1. Executive Summary">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
            <MetricCard label="Выручка/мес (март 2026)" value="29.2B" sub="RUB (~146B KZT)" color={C.accent} />
            <MetricCard label="Продажи" value="42M" sub="единиц/мес" />
            <MetricCard label="SKU с продажами" value="930K" sub="из 13.6M всего" />
            <MetricCard label="Брендов с продажами" value="64.7K" sub="из 115.8K" />
          </div>
          <div style={sCard}>
            <h3 style={{ ...sH3, margin: "0 0 12px" }}>Ключевые выводы</h3>
            <div style={{ fontSize: 13, lineHeight: 2, color: "#ccc" }}>
              <div>1. Рынок <strong style={{ color: C.green }}>вырос x16 за 6 лет</strong> (с 2.4B до 38B RUB/мес). Стабильный рост продолжается.</div>
              <div>2. <strong style={{ color: C.text }}>«Уход за кожей»</strong> — крупнейшая подкатегория (8.0B RUB, 27%), опережает макияж и парфюмерию.</div>
              <div>3. <strong style={{ color: C.green }}>Все 21 бренд верифицированы на WB.</strong> Лидеры: Celimax (2.2B RUB/год), Round Lab (699M), VT Cosmetics (279M), Skin1004 (267M), Anua (197M).</div>
              <div>4. <strong style={{ color: C.accent }}>Celimax — #9 во всей «Красоте» WB</strong> (124M RUB в марте 2026, 2.2B RUB за год) — сильнее, чем GARNIER (#15), ESTEL (#14), LA ROCHE-POSAY.</div>
              <div>5. На WB есть выделенная подкатегория <strong style={{ color: C.text }}>«Корейские бренды»</strong> (228M RUB/мес) — отдельная витрина.</div>
              <div>6. Только <strong style={{ color: C.amber }}>6.8% SKU имеют продажи</strong> — рынок перенасыщен карточками без оборота.</div>
              <div>7. Средний рейтинг категории <strong style={{ color: C.text }}>4.73</strong> — высокий порог качества.</div>
            </div>
          </div>
        </Section>

        {/* ═══ 2. TAM ═══ */}
        <Section id="s2" title="2. TAM и структура рынка">
          <p style={sP}>Рынок «Красота» на WB состоит из 23 подкатегорий. Данные за март 2026.</p>
          <DataTable headers={["#", "Подкатегория", "Выручка/мес", "Продажи", "SKU с прод.", "Брендов", "Рейтинг"]} rows={[
            ["1", "Уход за кожей", "7 981M", "14.5M", "207K", "19 182", "4.83"],
            ["2", "Мужская линия", "6 860M", "6.5M", "100K", "13 272", "4.84"],
            ["3", "Аксессуары", "5 696M", "10.8M", "167K", "19 291", "4.84"],
            ["4", "Волосы", "4 604M", "7.2M", "122K", "9 683", "4.83"],
            ["5", "Парфюмерия", "4 073M", "4.4M", "159K", "17 239", "4.52"],
            ["6", "Инстр. для парикмахеров", "3 417M", "5.7M", "89K", "6 564", "4.92"],
            ["7", "Макияж", "3 358M", "7.6M", "127K", "9 102", "4.76"],
            ["8", "Детская декор. косметика", "2 975M", "5.1M", "68K", "12 052", "4.87"],
            ["9", "Ногти", "1 811M", "4.0M", "120K", "7 019", "4.81"],
            ["10", "Подарочные наборы", "1 255M", "2.1M", "17K", "3 623", "4.89"],
            ["11", "Профессиональная косметика", "904M", "1.5M", "5K", "1 220", "4.99"],
            ["12", "Для мам и малышей", "725M", "1.6M", "10K", "2 261", "4.91"],
            ["13", "Косметические аппараты", "570M", "312K", "8K", "1 300", "4.89"],
            ["14", "Аптечная косметика", "551M", "956K", "13K", "2 573", "4.86"],
            ["15", "Гигиена полости рта", "475M", "998K", "8K", "1 613", "4.91"],
            ["16", "Мебель для салонов", "442M", "193K", "7K", "1 043", "4.86"],
            ["17", "Средства личной гигиены", "262M", "671K", "5K", "1 127", "4.85"],
            ["18", "Наборы для ухода", "259M", "386K", "1K", "559", "4.98"],
            ["19", "Корейские бренды", "228M", "370K", "2K", "496", "4.97"],
            ["20", "Для загара", "214M", "370K", "5K", "1 312", "4.82"],
            ["21", "Органическая косметика", "172M", "460K", "4K", "882", "4.94"],
            ["22", "Израильская косметика", "74M", "48K", "2K", "91", "4.93"],
          ]} />
          <Insight text="На WB «Корейские бренды» = отдельная подкатегория (228M RUB, 496 брендов). Это отдельная витрина, через которую покупатели целенаправленно ищут K-beauty. На Kaspi такой выделенной категории нет." type="success" />
          <Insight text="Топ-4 подкатегории (кожа, мужская, аксессуары, волосы) = 85% рынка. «Профессиональная косметика» (904M) имеет рейтинг 4.99 — почти идеальный." />
        </Section>

        {/* ═══ 3. TRENDS ═══ */}
        <Section id="s3" title="3. Тренды — рост рынка за 6 лет">
          <p style={sP}>Помесячная динамика рынка «Красота» на WB за 6+ лет (74 точки данных).</p>

          <DataTable headers={["Период", "Выручка/мес", "Продажи/мес", "SKU", "Рост"]} rows={[
            ["2020 (старт данных)", "~2.4B", "~5M", "133K", "—"],
            ["2021 (среднее)", "~5B", "~12M", "~300K", "x2.1"],
            ["2022 (среднее)", "~11B", "~24M", "~1M", "x2.2"],
            ["2023 (среднее)", "~28B", "~56M", "~4M", "x2.5"],
            ["2024 (среднее)", "~40B", "~66M", "~9M", "x1.4"],
            ["Январь 2026", "33.9B", "51.6M", "12.8M", "—"],
            ["Февраль 2026", "35.7B", "54.2M", "13.8M", "+5% мм"],
            ["Март 2026", "38.2B*", "53.7M", "21.7M", "+7% мм"],
          ]} />
          <p style={{ ...sP, fontSize: 11, color: C.dim }}>* данные за неполный март (27 дней)</p>

          <Insight text="Рынок вырос x16 за 6 лет. Но темпы замедляются: x2.5 в 2023, x1.4 в 2024. Рынок переходит от взрывного роста к зрелости." type="warning" />

          <div style={{ ...sCard, borderLeft: `3px solid ${C.green}` }}>
            <h3 style={{ ...sH3, margin: "0 0 8px", color: C.green }}>Ключевые тренды</h3>
            <div style={{ fontSize: 13, lineHeight: 2, color: "#ccc" }}>
              <div>1. <strong style={{ color: C.text }}>SKU-инфляция:</strong> количество товаров выросло с 133K до 21.7M (x163!), но только 6.8% имеют продажи. Рынок перенасыщен «мёртвыми» карточками.</div>
              <div>2. <strong style={{ color: C.text }}>Консолидация брендов:</strong> топ-10 = 24% рынка, топ-50 = 54%. Средние бренды сжимаются.</div>
              <div>3. <strong style={{ color: C.text }}>Рост среднего чека:</strong> от ~400₽ в 2020 до ~700₽+ в 2026. Покупатели готовы платить больше.</div>
              <div>4. <strong style={{ color: C.text }}>Сезонность:</strong> пики в ноябре (распродажи WB) и декабре (НГ). Провалы в январе-феврале.</div>
              <div>5. <strong style={{ color: C.text }}>Подкатегория «Корейские бренды»</strong> — отдельная витрина, растущая: 228M RUB при 496 брендах.</div>
            </div>
          </div>
        </Section>

        {/* ═══ 4. TOP BRANDS ═══ */}
        <Section id="s4" title="4. Топ-30 брендов категории «Красота»">
          <p style={sP}>Ранжирование по выручке за март 2026. Бренды клиента выделены.</p>
          <DataTable headers={["#", "Бренд", "Выручка", "Продажи", "SKU", "Ср. цена", "Рейтинг"]} rows={[
            ["1", "Без бренда", "988M", "1.36M", "1.64M", "—", "4.75"],
            ["2", "The Act", "250M", "289K", "1 221", "~865₽", "4.93"],
            ["3", "LUXVISAGE", "223M", "778K", "11.9K", "~287₽", "4.92"],
            ["4", "СВЕЖАЯ НОТА", "196M", "395K", "54", "~496₽", "5.00"],
            ["5", "L'OREAL PARIS", "190M", "258K", "8.4K", "~736₽", "4.83"],
            ["6", "Гельтек", "182M", "139K", "645", "~1 305₽", "4.91"],
            ["7", "Faberlic", "165M", "617K", "1.6K", "~267₽", "4.96"],
            ["8", "Tashe", "131M", "235K", "1.0K", "~557₽", "4.90"],
            ["9", "Celimax ★", "124M", "97K", "4.0K", "~1 278₽", "4.89"],
            ["10", "Kapous", "117M", "208K", "12.4K", "~563₽", "4.89"],
            ["11", "Semily", "117M", "290K", "533", "~403₽", "4.98"],
            ["12", "Marrakech", "115M", "188K", "257", "~613₽", "4.96"],
            ["13", "ARAVIA Laboratories", "115M", "258K", "2.1K", "~446₽", "4.93"],
            ["14", "ESTEL", "113M", "161K", "3.5K", "~701₽", "4.98"],
            ["15", "GARNIER", "109M", "299K", "6.2K", "~364₽", "4.84"],
            ["16", "Dove", "108M", "298K", "4.1K", "~362₽", "4.79"],
            ["17", "FOXY EXPERT", "105M", "293K", "1.2K", "~358₽", "4.98"],
            ["18", "MIXIT", "103M", "171K", "4.2K", "~603₽", "4.91"],
            ["19", "ARAVIA Professional", "102M", "173K", "4.5K", "~591₽", "4.91"],
            ["20", "RELOUIS", "100M", "336K", "13.0K", "~298₽", "4.89"],
          ]} highlight={8} />
          <p style={sP}>... позиция #65: <strong>Round Lab</strong> (48M) | позиция #181: <strong>VT Cosmetics</strong> (23M)</p>

          <Insight text="Celimax = #9 — выше GARNIER (#15), ESTEL (#14), MIXIT (#18). При среднем чеке ~1 278₽ (самый высокий в топ-10 после Гельтек). Это не массовый бренд — это премиум с объёмом." type="success" />
          <Insight text="«Без бренда» = #1 (988M, 3.4% рынка). На WB доля безбрендовых ниже, чем на Kaspi — покупатели WB более бренд-ориентированы." />
        </Section>

        {/* ═══ 5. CONCENTRATION ═══ */}
        <Section id="s5" title="5. Концентрация рынка и конкурентная среда">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            <MetricCard label="Топ-10 брендов" value="24%" sub="от выручки топ-200" />
            <MetricCard label="Топ-50 брендов" value="54%" sub="от выручки топ-200" />
            <MetricCard label="SKU с продажами" value="6.8%" sub="из 13.6M всего" color={C.amber} />
            <MetricCard label="Средний рейтинг" value="4.73" sub="высокий порог" />
          </div>
          <Insight text="Рынок умеренно концентрирован: топ-10 = 24%. Для сравнения, на Kaspi в кремах Dr. Althea (#1) = 8.3% — аналогичный уровень. Нет абсолютного монополиста." />
          <Insight text="6.8% SKU с продажами = 93.2% «мёртвых» карточек. Это означает, что просто создать карточку недостаточно — нужен маркетинг, отзывы, оптимизация." type="warning" />
        </Section>

        {/* ═══ 6. CLIENT BRANDS ═══ */}
        <Section id="s6" title="6. Все 21 бренд клиента на Wildberries">
          <p style={sP}>Полные данные по каждому бренду за год (апрель 2025 — март 2026). Источник: MPStats Insight, экспорт по брендам. Выкупы до 11.03.2026.</p>

          <DataTable headers={["#", "Бренд", "Выручка/год", "~Выручка/мес", "Продажи/год", "Выкупы/год", "SKU", "Ср. рейтинг", "Отзывов"]} rows={[
            ["1", "Celimax", "2 235M", "~186M", "1 629K", "1 306K", "16 674", "4.83", "727K"],
            ["2", "Round Lab", "699M", "~58M", "529K", "282K", "15 048", "4.77", "184K"],
            ["3", "VT Cosmetics", "279M", "~23M", "154K", "224K", "12 993", "4.68", "60K"],
            ["4", "Skin1004", "267M", "~22M", "214K", "187K", "19 737", "4.67", "96K"],
            ["5", "Anua", "197M", "~16M", "113K", "84K", "18 914", "4.66", "47K"],
            ["6", "Sen Sulu", "68M", "~6M", "84K", "73K", "1 739", "4.66", "17K"],
            ["7", "Dr. Althea", "53M", "~4M", "39K", "47K", "2 838", "4.63", "14K"],
            ["8", "AXIS-Y", "50M", "~4M", "48K", "35K", "938", "4.62", "18K"],
            ["9", "COSRX", "49M", "~4M", "48K", "23K", "10 105", "4.69", "58K"],
            ["10", "TFIT", "39M", "~3M", "31K", "17K", "511", "4.83", "6K"],
            ["11", "Mediheal", "26M", "~2M", "19K", "13K", "3 664", "4.84", "12K"],
            ["12", "Mizon", "22M", "~2M", "21K", "21K", "6 676", "4.75", "94K"],
            ["13", "Bueno", "21M", "~2M", "11K", "6K", "688", "4.80", "13K"],
            ["14", "Bohicare", "20M", "~2M", "8K", "5K", "58", "4.98", "5K"],
            ["15", "Beplain", "4M", "~0.3M", "3K", "1K", "499", "4.61", "689"],
            ["16", "Mommy Care", "3M", "~0.3M", "2K", "1K", "140", "4.50", "3K"],
            ["17", "The Yeon", "1M", "~0.1M", "2K", "1K", "79", "4.78", "1K"],
            ["18", "Skinfood", "1M", "~0.1M", "1K", "0.4K", "376", "4.74", "764"],
            ["19", "Moda Moda", "0.07M", "~0M", "110", "444", "14", "4.63", "304"],
            ["20", "Treecell", "0.03M", "~0M", "25", "59", "400", "4.56", "177"],
            ["21", "Healthy Place", "0.02M", "~0M", "29", "579", "27", "4.92", "149"],
          ]} highlight={0} />

          <Insight text="Celimax = абсолютный лидер: 2.2B RUB/год, 727K отзывов, 16.7K SKU. Это в 32 раза больше, чем #2 (Round Lab). На WB Celimax — безоговорочный #1 из портфеля." type="success" />
          <Insight text="Bohicare — аномалия: всего 58 SKU, но 20M RUB/год и рейтинг 4.98 (лучший в портфеле!). Премиум-позиционирование работает на WB." type="success" />
          <Insight text="Treecell, Moda Moda, Healthy Place — практически отсутствуют на WB (менее 100 продаж за год). Площадка не освоена." type="warning" />

          <h3 style={sH3}>Топ-3 SKU по выручке для каждого бренда</h3>

          {[
            { brand: "Celimax", items: ["Сыворотка Vita-A Retinol Shot — 114M, 66K продаж, 15K отзывов", "Тонер Dual Barrier — 98M, 62K продаж, 8K отзывов", "Крем-бустер Vita-A Retinol — 89M, 57K продаж, 11K отзывов"] },
            { brand: "Round Lab", items: ["SPF крем SPF50 — 43M, 29K продаж, 5K отзывов", "Пенка Dokdo с морской водой — 40M, 32K продаж, 7K отзывов", "Сыворотка от пигментации с витамином С — 14M, 9K продаж"] },
            { brand: "VT Cosmetics", items: ["Reedle Shot 300 сыворотка — 10M, 3.4K продаж, 637 отзывов", "PDRN 100 сыворотка — 8M, 1.8K продаж, 430 отзывов", "Сыворотка с микроиглами — 6M, 3.3K продаж"] },
            { brand: "Skin1004", items: ["Centella Sun Serum SPF50 — 18M, 15K продаж, 3K отзывов", "Осветляющая сыворотка Centella 100мл — 6M, 2.6K продаж", "Brightening Capsule Ampoule — 5M, 3.5K продаж"] },
            { brand: "Anua", items: ["Сыворотка с ниацинамидом 10% — 6M, 3.2K продаж, 649 отзывов", "Сыворотка с азелаиновой кислотой — 5M, 2.3K продаж", "Осветляющая сыворотка с ниацинамидом 30мл — 5M, 2.6K продаж"] },
            { brand: "Dr. Althea", items: ["Крем с ресвератролом — 9M, 5.7K продаж, 1K отзывов", "Крем восстанавливающий — 6M, 3.9K продаж, 886 отзывов", "Крем 147 Barrier — 3M, 2.1K продаж, 433 отзыва"] },
            { brand: "COSRX", items: ["Сыворотка от прыщей — 2M, 1.2K продаж, 364 отзыва", "Гель-пенка для умывания — 2M, 1.4K продаж, 567 отзывов", "Патчи Acne Pimple Master — 2M, 4.6K продаж, 2.3K отзывов"] },
            { brand: "Bueno", items: ["Anti Wrinkle Peptide Cream — 2M, 672 продажи, 357 отзывов", "Патчи Bakuchiol для глаз — 1M, 625 продаж, 174 отзыва", "MGF Peptide Cream Plus — 1M, 473 продажи, 186 отзывов"] },
            { brand: "Bohicare", items: ["Anti-age Lifting крем — 3M, 754 продажи, 700 отзывов (4 380₽!)", "SPF LightAIR Veggie — 2M, 887 продаж, 737 отзывов", "Гидрофильный бальзам — 2M, 791 продажа, 424 отзыва"] },
          ].map(({brand, items}) => (
            <div key={brand} style={{ ...sCard, padding: "16px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 8 }}>{brand}</div>
              {items.map((item, i) => (
                <div key={i} style={{ fontSize: 12, color: "#ccc", lineHeight: 1.8 }}>{i+1}. {item}</div>
              ))}
            </div>
          ))}
        </Section>

        {/* ═══ 7. CELIMAX ═══ */}
        <Section id="s7" title="7. Celimax — #9 в «Красоте» WB">
          <p style={{ ...sP, fontSize: 12, color: C.dim }}>Данные ниже: метрики за март 2026 (API MPStats). Годовые данные — в секции 6.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            <MetricCard label="Выручка (март 2026)" value="124M" sub="RUB (~620M KZT)" color={C.green} />
            <MetricCard label="Продажи (март)" value="97 360" sub="ед./мес" />
            <MetricCard label="Средний чек" value="1 278₽" sub="~6 400 KZT" />
            <MetricCard label="Рейтинг" value="4.89" sub="276 отзывов/SKU" />
          </div>

          <DataTable headers={["Метрика", "Значение", "Комментарий"]} rows={[
            ["Всего SKU", "3 968", "Широкий ассортимент"],
            ["SKU с продажами", "1 291 (32.5%)", "Выше среднего по рынку (6.8%)"],
            ["Продавцов", "614", "Из них с продажами: 263 (42.8%)"],
            ["Ср. продажи/SKU", "75.4 шт/мес", "Выше топ-10 средних"],
            ["Ср. выручка/SKU", "96 429₽/мес", "Сильный показатель"],
            ["Остаток на складе", "139 656 шт", "~1.4 мес запаса"],
            ["Стоимость остатка", "185M RUB", "Больше месячной выручки"],
          ]} />

          <h3 style={sH3}>Дневные продажи (март 2026)</h3>
          <p style={sP}>Среднедневные продажи: ~3 600 единиц. Пиковые дни: начало месяца (4 500-5 500). Спад в середине (2 400-3 000). Стабилизация к концу (2 600-3 400).</p>
          <div style={{ ...sCard, padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 80 }}>
              {[4644,5541,4944,4846,4625,4188,4496,4467,5073,5156,4757,3111,2997,3168,2934,2469,2589,2687,2656,2867,2741,2887,2278,3376,2824,2419,2620].map((v, i) => (
                <div key={i} style={{ flex: 1, background: v > 4000 ? C.green : v > 3000 ? C.blue : C.dim, height: `${(v / 5600) * 100}%`, borderRadius: 2, minWidth: 4 }} title={`День ${i + 1}: ${v} шт`} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: C.dim }}>
              <span>1 мар</span><span>15 мар</span><span>27 мар</span>
            </div>
          </div>

          <Insight text="Celimax — единственный бренд портфеля в топ-10 WB. 32.5% SKU имеют продажи — в 5 раз выше среднего (6.8%). Бренд хорошо оптимизирован на площадке." type="success" />

          <div style={{ ...sCard, borderLeft: `3px solid ${C.blue}` }}>
            <h3 style={{ ...sH3, margin: "0 0 8px", color: C.blue }}>Сравнение Celimax: Kaspi vs WB</h3>
            <DataTable headers={["Метрика", "Kaspi", "WB", "Вывод"]} rows={[
              ["Выручка/мес", "~239M KZT", "124M RUB (~620M KZT)", "WB = 2.6x Kaspi"],
              ["Средний чек", "~2 000 KZT", "1 278₽ (~6 400 KZT)", "WB чек 3.2x выше"],
              ["Позиция", "#1 в тониках, #3 в кремах", "#9 во всей «Красоте»", "Сильный на обеих"],
              ["Продавцов", "~68", "614", "WB = 9x больше продавцов"],
            ]} />
            <p style={sP}><strong style={{ color: C.green }}>Celimax = сильнейший бренд портфеля на обеих площадках.</strong> На WB выручка в пересчёте на KZT в 2.6 раза больше, чем на Kaspi. Средний чек на WB выше — покупатели готовы платить за бренд.</p>
          </div>
        </Section>

        {/* ═══ 8. ROUND LAB ═══ */}
        <Section id="s8" title="8. Round Lab — #65 в «Красоте» WB">
          <p style={{ ...sP, fontSize: 12, color: C.dim }}>Данные ниже: метрики за март 2026 (API MPStats). Годовая выручка: 699M RUB (секция 6).</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            <MetricCard label="Выручка (март 2026)" value="48M" sub="RUB (~240M KZT)" color={C.blue} />
            <MetricCard label="Продажи (март)" value="31 956" sub="ед./мес" />
            <MetricCard label="Средний чек" value="1 487₽" sub="~7 400 KZT" />
            <MetricCard label="Рейтинг" value="4.79" sub="82 отзыва/SKU" />
          </div>

          <DataTable headers={["Метрика", "Значение", "Комментарий"]} rows={[
            ["Всего SKU", "3 565", ""],
            ["SKU с продажами", "634 (17.8%)", "Ниже Celimax (32.5%)"],
            ["Продавцов", "468", "С продажами: 159 (34%)"],
            ["Ср. продажи/SKU", "50.4 шт/мес", "Умеренный"],
            ["Остаток на складе", "52 372 шт", "~1.6 мес запаса"],
          ]} />

          <h3 style={sH3}>Дневные продажи (март 2026)</h3>
          <div style={{ ...sCard, padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 80 }}>
              {[1315,1540,1646,1337,1181,1124,1349,1470,1420,1250,1356,1065,1084,1182,1146,956,1084,978,1136,1088,1000,1063,863,1318,1045,969,991].map((v, i) => (
                <div key={i} style={{ flex: 1, background: v > 1400 ? C.green : v > 1100 ? C.blue : C.dim, height: `${(v / 1700) * 100}%`, borderRadius: 2, minWidth: 4 }} title={`День ${i + 1}: ${v} шт`} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: C.dim }}>
              <span>1 мар</span><span>15 мар</span><span>27 мар</span>
            </div>
          </div>

          <Insight text="Round Lab на WB стабильнее, чем на Kaspi (где замедляется). Среднедневные: ~1 200 шт. Без резких провалов. Рейтинг 4.79 — ниже Celimax (4.89), но в рамках нормы." />

          <div style={{ ...sCard, borderLeft: `3px solid ${C.blue}` }}>
            <h3 style={{ ...sH3, margin: "0 0 8px", color: C.blue }}>Round Lab: Kaspi vs WB</h3>
            <DataTable headers={["Метрика", "Kaspi", "WB"]} rows={[
              ["Выручка/мес", "~86M KZT", "48M RUB (~240M KZT)"],
              ["Средний чек", "~2 920 KZT", "1 487₽ (~7 400 KZT)"],
              ["Рейтинг", "4.8 (7 191 отзывов)", "4.79 (82 отзыва/SKU)"],
              ["Проблемы", "Подделки 50% негативов", "Менее выраженные"],
            ]} />
            <p style={sP}><strong style={{ color: C.text }}>На WB Round Lab = 2.8x выручка Kaspi.</strong> Средний чек 2.5x выше. Проблема подделок менее острая — WB-инфраструктура (FBO) снижает риск.</p>
          </div>
        </Section>

        {/* ═══ 9. VT COSMETICS ═══ */}
        <Section id="s9" title="9. VT Cosmetics — #181 в «Красоте» WB">
          <p style={{ ...sP, fontSize: 12, color: C.dim }}>Данные ниже: метрики за март 2026 (API MPStats). Годовая выручка: 279M RUB (секция 6).</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            <MetricCard label="Выручка (март 2026)" value="23M" sub="RUB (~115M KZT)" color={C.purple} />
            <MetricCard label="Продажи (март)" value="12 325" sub="ед./мес" />
            <MetricCard label="Средний чек" value="1 874₽" sub="~9 400 KZT — самый высокий" color={C.green} />
            <MetricCard label="Рейтинг" value="4.65" sub="28 отзывов/SKU" color={C.amber} />
          </div>

          <DataTable headers={["Метрика", "Значение", "Комментарий"]} rows={[
            ["Всего SKU", "3 342", ""],
            ["SKU с продажами", "639 (19.1%)", "Между Round Lab и Celimax"],
            ["Продавцов", "335", "С продажами: 114 (34%)"],
            ["Ср. продажи/SKU", "19.3 шт/мес", "Ниже Round Lab (50.4)"],
            ["Остаток на складе", "27 407 шт", "~2.2 мес запаса"],
            ["Стоимость остатка", "54.6M RUB", "2.4x месячной выручки — затоваривание?"],
          ]} />

          <h3 style={sH3}>Дневные продажи (март 2026)</h3>
          <div style={{ ...sCard, padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 80 }}>
              {[573,562,801,525,490,436,439,435,433,474,479,436,430,529,495,402,432,363,365,453,371,417,364,449,391,397,384].map((v, i) => (
                <div key={i} style={{ flex: 1, background: v > 550 ? C.green : v > 450 ? C.blue : C.dim, height: `${(v / 850) * 100}%`, borderRadius: 2, minWidth: 4 }} title={`День ${i + 1}: ${v} шт`} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: C.dim }}>
              <span>1 мар</span><span>15 мар</span><span>27 мар</span>
            </div>
          </div>

          <Insight text="VT Cosmetics — самый высокий средний чек из трёх (1 874₽ = ~9 400 KZT). Но рейтинг 4.65 = ниже порога комфорта (4.8+). Остаток 2.2 мес — возможно затоваривание." type="warning" />
          <Insight text="На Kaspi VT Cosmetics = 14M KZT, рейтинг 5.0 (70 отзывов, 1 негативный). На WB = 23M RUB (~115M KZT), но рейтинг ниже. PDRN-линейка работает на обеих площадках, но WB-аудитория строже к рейтингу." />
        </Section>

        {/* ═══ 10. OUT OF TOP 200 ═══ */}
        <Section id="s10" title="10. Бренды портфеля вне топ-200">
          <p style={sP}>18 из 21 бренда не попали в топ-200 «Красоты» WB. Порог входа: ~21M RUB/мес (~105M KZT).</p>

          <div style={sCard}>
            <h3 style={{ ...sH3, margin: "0 0 12px" }}>Что это значит для стратегии</h3>
            <div style={{ fontSize: 13, lineHeight: 2, color: "#ccc" }}>
              <div>1. <strong style={{ color: C.text }}>Skin1004</strong> — #5 на Kaspi (136M KZT), на WB 267M RUB/год (22M/мес) — присутствует, но значительно слабее. SPF Sun Serum = основной SKU (18M).</div>
              <div>2. <strong style={{ color: C.text }}>Anua</strong> — на Kaspi 49M, на WB 197M RUB/год (16M/мес). Сыворотка с ниацинамидом = топ-SKU. Потенциал роста через маркетинг.</div>
              <div>3. <strong style={{ color: C.text }}>COSRX</strong> — на Kaspi 16M, на WB 49M RUB/год (4M/мес). 10K SKU, 58K отзывов — бренд узнаваем, но продажи распределены тонко.</div>
              <div>4. <strong style={{ color: C.text }}>Dr. Althea</strong> — #1 на Kaspi (171M KZT), но на WB всего 53M RUB/год (4M/мес). Крем с ресвератролом = основной SKU (9M). Потенциал масштабирования на WB.</div>
              <div>5. <strong style={{ color: C.text }}>AXIS-Y</strong> — #8 на Kaspi (78M KZT), на WB 50M RUB/год (4M/мес). Осветляющая сыворотка = топ-SKU (8M). Начальный уровень.</div>
            </div>
          </div>

          <Insight text="Все 5 брендов присутствуют на WB с продажами — не «с нуля». Dr. Althea (53M/год), Skin1004 (267M/год) — бренды уже знает WB-аудитория. Задача = масштабирование, не запуск." type="success" />
        </Section>

        {/* ═══ 11. KASPI vs WB ═══ */}
        <Section id="s11" title="11. Kaspi vs WB — сравнение площадок">
          <DataTable headers={["Метрика", "Kaspi «Красота»", "WB «Красота»", "Разница"]} rows={[
            ["Выручка/мес", "~16B KZT*", "29.2B RUB (~146B KZT)", "WB = 9x"],
            ["Кол-во заказов", "~12M/мес*", "42M/мес", "WB = 3.5x"],
            ["Брендов с продажами", "~5 000*", "64 700", "WB = 13x"],
            ["SKU с продажами", "~30 000*", "930 000", "WB = 31x"],
            ["Средний рейтинг", "4.8-4.9", "4.73", "Kaspi чуть выше"],
            ["Проблема подделок", "Высокая (<2K KZT)", "Ниже (FBO-контроль)", "Kaspi хуже"],
            ["Сезонные пики", "8 марта, НГ", "11.11, НГ, 8 марта", "Похожие"],
          ]} />
          <p style={{ ...sP, fontSize: 11, color: C.dim }}>* оценка по данным RedStat за февраль 2026</p>

          <div style={sCard}>
            <h3 style={{ ...sH3, margin: "0 0 12px" }}>Где какой бренд сильнее</h3>
            <DataTable headers={["Бренд", "Kaspi/мес (KZT)", "WB/мес (RUB)", "WB ≈ KZT", "Сильнее на"]} rows={[
              ["Celimax", "239M", "186M", "~930M", "WB (3.9x)"],
              ["Dr. Althea", "171M", "4M", "~22M", "Kaspi (7.8x)"],
              ["Skin1004", "136M", "22M", "~112M", "Kaspi (1.2x)"],
              ["Sen Sulu / The Yeon", "167M", "6M", "~30M", "Kaspi (5.6x)"],
              ["Round Lab", "86M", "58M", "~290M", "WB (3.4x)"],
              ["AXIS-Y", "78M", "4M", "~21M", "Kaspi (3.7x)"],
              ["Anua", "49M", "16M", "~82M", "WB (1.7x)"],
              ["VT Cosmetics", "47M", "23M", "~117M", "WB (2.5x)"],
              ["Mommy Care", "30M", "0.3M", "~1.5M", "Kaspi (20x)"],
              ["COSRX", "16M", "4M", "~20M", "WB (1.3x)"],
              ["Mediheal", "8M", "2M", "~11M", "WB (1.4x)"],
              ["Mizon", "5M", "2M", "~9M", "WB (1.8x)"],
              ["TFIT", "3M", "3M", "~16M", "WB (5.3x)"],
              ["Bueno", "3M", "2M", "~9M", "WB (3x)"],
              ["Bohicare", "2.6M", "2M", "~8M", "WB (3x)"],
              ["Beplain", "1.4M", "0.3M", "~2M", "WB (1.4x)"],
              ["Treecell", "0.5M", "~0", "~0", "Kaspi"],
              ["Skinfood", "0.3M", "0.1M", "~0.4M", "Равно"],
              ["Healthy Place", "0.04M", "~0", "~0.2M", "WB"],
            ]} />
          </div>

          <Insight text="Три группы: 1) WB-лидеры (Celimax 930M, Round Lab 290M, VT 117M, Anua 82M) — масштабировать на WB. 2) Kaspi-лидеры (Dr. Althea 171M, Skin1004 136M, AXIS-Y 78M) — доминировать на Kaspi. 3) Сбалансированные (COSRX, Mediheal, TFIT, Bueno, Bohicare) — развивать обе площадки." type="success" />
          <Insight text="TFIT — неожиданность: на Kaspi 3M, а на WB 16M (в пересчёте на KZT). Консилеры лучше продаются на WB. Bohicare: 58 SKU, но 20M/год при рейтинге 4.98 — премиум работает." />
        </Section>

        {/* ═══ 12. RECS ═══ */}
        <Section id="s12" title="12. Рекомендации">

          <div style={sCard}>
            <h3 style={{ ...sH3, margin: "0 0 16px" }}>Стратегия по площадкам</h3>
            <div style={{ fontSize: 13, lineHeight: 2.2, color: "#ccc" }}>
              {[
                { n: "1", t: "WB = площадка масштабирования для Celimax", d: "Уже #9. Увеличить ассортимент (32.5% SKU с продажами — есть куда расти). Участие в WB-акциях. Таргет: топ-5." },
                { n: "2", t: "Round Lab — усилить на WB", d: "#65 → цель #30-40. Средний чек 1 487₽ — выше Kaspi. Проблема подделок менее острая. Сфокусировать маркетинг." },
                { n: "3", t: "VT Cosmetics — улучшить рейтинг", d: "4.65 = ниже порога. Рейтинг — #1 фактор конверсии на WB. Работа с отзывами, качество описаний, фотоконтент." },
                { n: "4", t: "Dr. Althea, Skin1004, AXIS-Y — выход на WB", d: "Сильные на Kaspi, слабые на WB. Проверенный спрос → можно масштабировать на WB с теми же SKU." },
                { n: "5", t: "COSRX на WB: 49M RUB/год, но тонко", d: "Присутствует (10K SKU, 58K отзывов), но выручка размазана. Топ — патчи (2M) и пенка (2M). Фокус на Snail Mucin и BHA для роста." },
                { n: "6", t: "Подкатегория «Корейские бренды» на WB", d: "228M RUB отдельная витрина. Оптимизировать карточки для попадания в этот раздел — дополнительный трафик." },
                { n: "7", t: "Kaspi = основа для большинства брендов", d: "15 из 21 бренда сильнее (или только) на Kaspi. Не терять фокус на основной площадке." },
                { n: "8", t: "Средний чек на WB выше", d: "Celimax: 1 278₽ (WB) vs ~400₽ эквивалент (Kaspi). Покупатели WB платят больше. Не демпинговать." },
              ].map((item) => (
                <div key={item.n} style={{ marginBottom: 8 }}>
                  <span style={{ color: C.accent, fontWeight: 700, marginRight: 8 }}>{item.n}.</span>
                  <strong style={{ color: C.text }}>{item.t}:</strong> {item.d}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 24, padding: "20px 24px", background: `${C.accent}08`, borderRadius: 12, border: `1px solid ${C.accent}30` }}>
            <p style={{ ...sP, margin: "0 0 8px", fontSize: 13, color: C.dim }}>
              Проанализировано: <strong style={{ color: C.text }}>930 000+ SKU</strong> &middot; <strong style={{ color: C.text }}>64 700+ брендов</strong> &middot; <strong style={{ color: C.text }}>74 месяца трендов</strong> &middot; <strong style={{ color: C.text }}>все 21 бренд</strong> клиента с полными данными за год &middot; <strong style={{ color: C.text }}>110K+ SKU</strong> портфеля на WB &middot; <strong style={{ color: C.text }}>1.3M+ отзывов</strong>
            </p>
            <p style={{ ...sP, margin: 0, fontSize: 13, color: C.dim }}>
              Источник данных: <a href="https://mpstats.io" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "none", fontWeight: 600 }}>MPStats</a>
            </p>
          </div>
        </Section>

      </div>
    </div>
  );
}
