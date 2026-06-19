"use client";

import { useState } from "react";
import Link from "next/link";

/* ───── design tokens ───── */
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

/* ═══════════════════ MAIN ═══════════════════ */
export default function BeautyMarketReport() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>

        <div style={{ marginBottom: 16 }}><Link href="/" style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}>&larr; kasymzhanov.com</Link></div>

        {/* ═══ HEADER ═══ */}
        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
          <div style={sBadge(C.accent)}><span style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>Enterprise Analytics Report</span></div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "16px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Рынок «Красота и здоровье»<br />на Kaspi.kz
          </h1>
          <p style={{ color: C.dim, fontSize: 14, margin: "12px 0 0" }}>
            Подготовил <strong style={{ color: C.text }}>Алмас Касымжанов</strong>
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, color: C.dim, flexWrap: "wrap" }}>
            <span>Дата: <strong style={{ color: C.text }}>Март 2026</strong></span>
            <span>Период: <strong style={{ color: C.text }}>Ноябрь 2024 — Февраль 2026</strong></span>
            <span>Ниш: <strong style={{ color: C.text }}>73 000+</strong></span>
            <span>Источник: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" style={{ color: C.text, textDecoration: "none" }}>RedStat.kz</a></span>
          </div>
          <p style={{ ...sP, marginTop: 16, fontSize: 13, color: C.dim }}>Данный отчёт покрывает <strong style={{ color: C.text }}>весь рынок «Красота и здоровье»</strong> на Kaspi.kz: структуру, ключевые ниши, топ-бренды, сезонность, ценовые сегменты, динамику год к году, точки роста и стратегические рекомендации.</p>
        </div>

        {/* ═══ TOC ═══ */}
        <div style={{ ...sCard, marginBottom: 48, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.dim, marginBottom: 12 }}>Содержание</div>
          {[
            ["s1", "1. Executive Summary"],
            ["s2", "2. TAM и структура рынка"],
            ["s3", "3. Уход за лицом — крупнейшая подкатегория"],
            ["s4", "4. Декоративная косметика"],
            ["s5", "5. Уход за волосами"],
            ["s6", "6. Уход за телом"],
            ["s7", "7. Парфюмерия, наборы, техника"],
            ["s8", "8. Сезонность — помесячная динамика"],
            ["s9", "9. Год к году (YoY)"],
            ["s10", "10. Ценовые сегменты"],
            ["s11", "11. Уход vs Декоративная косметика"],
            ["s12", "12. Проблема подделок"],
            ["s13", "13. Точки роста и белые пятна"],
            ["s14", "14. Инсайты и рекомендации"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ display: "block", padding: "5px 0", fontSize: 13, color: C.accent, textDecoration: "none" }}>{label}</a>
          ))}
        </div>

        {/* ═══ 1. EXECUTIVE SUMMARY ═══ */}
        <Section id="s1" title="1. Executive Summary">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
            <MetricCard label="TAM (16 мес)" value="612B" sub="KZT выручки" color={C.accent} />
            <MetricCard label="Заказов (фев 2026)" value="198M" sub="#1 на Kaspi по объёму" />
            <MetricCard label="SKU" value="1.5M" sub="товарных позиций" />
            <MetricCard label="Брендов" value="271K" sub="на площадке" />
          </div>
          <p style={sP}>«Красота и здоровье» — <strong style={{ color: C.text }}>крупнейшая категория Kaspi по количеству заказов</strong> (198M за 16 мес — больше, чем телефоны и бытовая техника). По выручке — 7-я (612B KZT), уступая высокочековым электронике и авто.</p>
          <div style={sCard}>
            <h3 style={{ ...sH3, margin: "0 0 12px" }}>Ключевые выводы отчёта</h3>
            <div style={{ fontSize: 13, lineHeight: 2, color: "#ccc" }}>
              <div>1. Рынок растёт <strong style={{ color: C.green }}>+40-80% YoY</strong> по ключевым нишам (кремы, шампуни, наборы)</div>
              <div>2. <strong style={{ color: C.text }}>Уходовая косметика = 1.7x выручка</strong> декоративной, но по заказам равны</div>
              <div>3. Два пиковых сезона: <strong style={{ color: C.amber }}>8 марта</strong> (наборы 1B+, тональные 991M) и <strong style={{ color: C.amber }}>Новый год</strong> (наборы 1.1B+)</div>
              <div>4. <strong style={{ color: C.red }}>Подделки</strong> — системная проблема: при цене SKU &lt;2K KZT до 50% негативных отзывов о фейках</div>
              <div>5. <strong style={{ color: C.green }}>Патчи</strong> — самый быстрорастущий сегмент (+114% YoY), но мелкий (45M)</div>
              <div>6. <strong style={{ color: C.text }}>Шампуни (630M)</strong> — крупная ниша без выраженного лидера-бренда</div>
              <div>7. Оптимальная ценовая зона для косметики: <strong style={{ color: C.green }}>6-10K KZT</strong> (52% рынка кремов, минимум подделок)</div>
              <div>8. Премиум-наборы (&gt;34K) = <strong style={{ color: C.green }}>43% выручки</strong> категории наборов</div>
            </div>
          </div>
        </Section>

        {/* ═══ 2. TAM ═══ */}
        <Section id="s2" title="2. TAM и структура рынка">
          <p style={sP}>Рынок состоит из <strong style={{ color: C.text }}>19 L2-подкатегорий</strong>. Ниже — полная структура с выручкой за февраль 2026.</p>
          <DataTable headers={["#", "Подкатегория", "Выручка (фев 2026)", "% рынка", "Продавцов", "SKU", "Брендов"]} rows={[
            ["1", "Уход за лицом", "2 919M", "18.3%", "1 438", "6 388", "882"],
            ["2", "Техника для красоты", "2 221M", "13.9%", "884", "1 830", "493"],
            ["3", "Уход за волосами", "2 013M", "12.6%", "2 075", "7 375", "939"],
            ["4", "Декоративная косметика", "1 716M", "10.8%", "1 093", "4 904", "587"],
            ["5", "Парфюмерия", "1 650M", "10.3%", "404", "2 334", "356"],
            ["6", "Уход за телом", "1 012M", "6.3%", "1 311", "4 142", "888"],
            ["7", "Массажеры и кресла", "1 003M", "6.3%", "542", "865", "271"],
            ["8", "Наборы косметики", "862M", "5.4%", "388", "944", "242"],
            ["9", "Уход за полостью рта", "577M", "3.6%", "784", "1 922", "362"],
            ["10", "Маникюр и педикюр", "538M", "3.4%", "727", "3 514", "480"],
            ["11", "Брови и ресницы", "501M", "3.1%", "689", "2 096", "358"],
            ["12", "Аксессуары", "199M", "1.2%", "740", "1 010", "175"],
            ["13", "Мебель для салонов", "184M", "1.2%", "36", "83", "24"],
            ["14", "Депиляция и эпиляция", "182M", "1.1%", "195", "587", "104"],
            ["15", "Товары для бритья", "111M", "0.7%", "244", "502", "106"],
            ["16", "Инструменты для укладки", "81M", "0.5%", "251", "498", "110"],
            ["17", "Тату и перманент", "60M", "0.4%", "54", "199", "59"],
            ["18", "Ароматерапия", "22M", "0.1%", "81", "218", "42"],
            ["19", "Аппаратная косметология", "5M", "0.0%", "11", "12", "9"],
          ]} />
          <Insight text="Топ-4 подкатегории (уход за лицом, техника, волосы, декор) = 56% рынка. Это основное поле для косметических брендов." />
          <Rec text="Фокус для косметического дистрибьютора: Уход за лицом (2.9B), Декор (1.7B), Волосы (2B), Наборы (862M). Техника и парфюмерия — другие компетенции." />
        </Section>

        {/* ═══ 3. SKINCARE ═══ */}
        <Section id="s3" title="3. Уход за лицом — крупнейшая подкатегория (2 919M)">
          <DataTable headers={["Leaf-ниша", "Выручка (фев 2026)", "% от L2", "Продавцов", "SKU", "Брендов"]} rows={[
            ["Кремы и сыворотки", "1 712M", "59%", "864", "3 095", "551"],
            ["Средства для умывания", "517M", "18%", "493", "954", "287"],
            ["Тоники, тонеры", "290M", "10%", "334", "546", "194"],
            ["Маски для лица", "122M", "4%", "298", "627", "170"],
            ["Снятие макияжа", "84M", "3%", "129", "158", "64"],
            ["Скрабы и пилинги", "64M", "2%", "148", "199", "96"],
            ["Патчи", "45M (+114% YoY)", "2%", "99", "182", "62"],
            ["Уход за губами", "37M", "1%", "178", "282", "100"],
          ]} />

          <h3 style={sH3}>Кремы и сыворотки (1 712M) — топ-10 брендов</h3>
          <DataTable headers={["#", "Бренд", "Выручка (фев 2026)", "SKU", "Продавцов", "Заказов (фев 2026)"]} rows={[
            ["1", "Dr. Althea", "142M", "62", "67", "28 901"],
            ["2", "Bioderma", "96M", "60", "31", "11 523"],
            ["3", "Celimax", "89M", "74", "68", "20 542"],
            ["4", "MEDI-PEEL", "63M", "82", "44", "11 701"],
            ["5", "Skin1004", "55M", "89", "66", "15 177"],
            ["6", "La Roche-Posay", "55M", "37", "20", "4 652"],
            ["7", "ANGIOPHARM", "51M", "56", "33", "3 571"],
            ["8", "AXIS-Y", "47M", "43", "43", "20 872"],
            ["9", "Round Lab", "39M", "58", "54", "9 947"],
            ["10", "Без бренда", "39M", "133", "111", "11 997"],
          ]} highlight={0} />
          <Insight text="Dr. Althea (#1, 142M) вырос с 36M за 16 месяцев (+133% YoY) и стал лидером кремов. Bioderma (#2, 96M) — стабильна, но доминирует в других нишах (умывание #1, снятие макияжа #1)." />
          <Insight text="«Без бренда» = 39M (2.3% ниши) при 133 SKU и 111 продавцах. Низкая выручка на единицу → пространство для брендированных продуктов." type="success" />

          <h3 style={sH3}>Средства для умывания (517M) — топ-10</h3>
          <DataTable headers={["#", "Бренд", "Выручка (фев 2026)", "SKU", "Заказов (фев 2026)"]} rows={[
            ["1", "Bioderma", "49M", "25", "7 030"],
            ["2", "Round Lab", "36M", "30", "12 330"],
            ["3", "Celimax", "35M", "25", "8 876"],
            ["4", "Skin1004", "25M", "35", "10 077"],
            ["5", "La Roche-Posay", "21M", "13", "1 894"],
            ["6", "CeraVe", "20M", "18", "8 796"],
            ["7", "ANGIOPHARM", "15M", "18", "1 681"],
            ["8", "Dr. Althea", "15M", "14", "2 662"],
            ["9", "LAGOM", "13M", "9", "3 095"],
            ["10", "Sugarlife", "12M", "10", "5 557"],
          ]} />
          <Insight text="Bioderma удерживает #1 в умывании (мицеллярная вода). Но Round Lab (#2) и Celimax (#3) наращивают долю. Sugarlife — локальный КЗ-бренд в топ-10." />

          <h3 style={sH3}>Тоники и тонеры (290M) — топ-10</h3>
          <DataTable headers={["#", "Бренд", "Выручка (фев 2026)", "Доля ниши", "Заказов (фев 2026)"]} rows={[
            ["1", "Celimax", "61M", "21%", "11 016"],
            ["2", "BIDALLI", "14M", "5%", "1 265"],
            ["3", "Paula's Choice", "12M", "4%", "959"],
            ["4", "AXIS-Y", "12M", "4%", "4 799"],
            ["5", "Round Lab", "10M", "3%", "2 425"],
            ["6", "Dr. Althea", "10M", "3%", "1 489"],
            ["7", "MEDI-PEEL", "10M", "3%", "1 755"],
            ["8", "Skin1004", "10M", "3%", "2 753"],
            ["9", "ANGIOPHARM", "9M", "3%", "1 026"],
            ["10", "Sugarlife", "6M", "2%", "1 981"],
          ]} highlight={0} />
          <Insight text="Celimax доминирует в тониках с 21% долей — больше, чем #2 + #3 + #4 вместе. Рост x3.2 за год (19M → 61M)." type="success" />

          <h3 style={sH3}>Патчи (45M) — самый быстрорастущий сегмент</h3>
          <DataTable headers={["#", "Бренд", "Выручка (фев 2026)", "SKU", "Заказов (фев 2026)"]} rows={[
            ["1", "SADOER", "6M", "39", "7 306"],
            ["2", "MeyRim", "4M", "6", "3 216"],
            ["3", "COSRX", "4M", "4", "2 337"],
            ["4", "DOBRAVA beauty", "3M", "6", "735"],
            ["5", "MEDI-PEEL", "2M", "8", "885"],
          ]} />
          <Insight text="Патчи выросли +114% YoY (21M → 45M). Ниша маленькая, но темп роста максимальный во всём beauty. SADOER (Китай) лидирует." />
        </Section>

        {/* ═══ 4. DECOR ═══ */}
        <Section id="s4" title="4. Декоративная косметика (1 716M)">
          <DataTable headers={["Leaf-ниша", "Выручка (фев 2026)", "SKU", "Брендов", "#1 бренд"]} rows={[
            ["Тональные средства", "536M", "758", "170", "RoRoBell (72M)"],
            ["Помады, блески", "209M", "1 077", "153", "Sen Sulu (26M)"],
            ["Румяна, бронзеры", "203M", "500", "110", "HOURGLASS (30M)"],
            ["Тушь", "149M", "355", "84", "Loreal Paris (23M)"],
            ["Пудры", "116M", "250", "81", "Sen Sulu (24M)"],
            ["Тени для век", "97M", "358", "96", "Sen Sulu (18M)"],
            ["Корректоры и консилеры", "95M", "218", "62", "Sen Sulu (30M)"],
            ["Основы и фиксаторы", "82M", "153", "69", "LUXVISAGE (10M)"],
            ["Контур для глаз", "65M", "361", "105", "Vivienne Sabo (7M)"],
          ]} />
          <Insight text="Sen Sulu — #1 в 5 из 9 ниш декоративки (пудры, тени, корректоры, помады, контур). Суммарная выручка ~135M/мес. Казахстанский бренд." type="success" />
          <Insight text="RoRoBell — #1 в тональных (72M). Три оттенка Bfadation по 13-16K = 67M. Единственный бренд в премиум-тональном сегменте." />

          <h3 style={sH3}>Тональные средства (536M) — топ-10</h3>
          <DataTable headers={["#", "Бренд", "Выручка (фев 2026)", "SKU", "Заказов (фев 2026)"]} rows={[
            ["1", "RoRoBell", "72M", "6", "5 102"],
            ["2", "PRE MORE", "51M", "16", "5 574"],
            ["3", "Eveline Cosmetics", "36M", "30", "11 376"],
            ["4", "LUXVISAGE", "31M", "22", "15 331"],
            ["5", "Estee Lauder", "28M", "20", "1 284"],
            ["6", "Henlics", "24M", "12", "9 093"],
            ["7", "Sen Sulu", "18M", "5", "2 906"],
            ["8", "Influence", "18M", "15", "4 802"],
            ["9", "MISSHA", "18M", "30", "7 686"],
            ["10", "Loreal Paris", "13M", "22", "1 692"],
          ]} />
          <Insight text="Декоративка более фрагментирована, чем уходовая. Нет бренда с >15% долей в тональных (RoRoBell = 13%). В уходовых Dr. Althea = 8.3%." />
          <Rec text="Декоративная косметика — менее концентрированный рынок с возможностью для новых брендов, особенно в сегменте помад и теней." />
        </Section>

        {/* ═══ 5. HAIR ═══ */}
        <Section id="s5" title="5. Уход за волосами (2 013M)">
          <DataTable headers={["Leaf-ниша", "Выручка (фев 2026)", "SKU", "Брендов"]} rows={[
            ["Шампуни", "630M", "1 496", "384"],
            ["Средства по уходу", "451M", "668", "224"],
            ["Маски и бальзамы", "300M", "950", "226"],
            ["Краска для волос", "161M", "909", "94"],
            ["Аксессуары для волос", "151M", "2 095", "187"],
            ["Средства для укладки", "125M", "354", "91"],
          ]} />
          <h3 style={sH3}>Шампуни (630M) — топ-10</h3>
          <DataTable headers={["#", "Бренд", "Выручка (фев 2026)", "SKU", "Заказов (фев 2026)"]} rows={[
            ["1", "elline", "103M", "1", "6 820"],
            ["2", "Vichy", "32M", "15", "2 861"],
            ["3", "VOIS", "18M", "4", "1 569"],
            ["4", "KeraSys", "16M", "43", "5 595"],
            ["5", "Без бренда", "15M", "36", "6 267"],
            ["6", "DUCRAY", "14M", "16", "1 686"],
            ["7", "Concept", "14M", "28", "3 345"],
            ["8", "ESTEL PROFESSIONAL", "13M", "40", "2 157"],
            ["9", "Tashe", "13M", "19", "4 328"],
            ["10", "Ederra Lab", "11M", "11", "761"],
          ]} />
          <Insight text="elline — аномалия: 103M с 1 SKU (один шампунь). Vichy (#2) = медицинский позиционинг. Профессиональные бренды (Concept, ESTEL) = 27M." type="warning" />
          <Insight text="Шампуни — 630M ниша без выраженного лидера-бренда среди косметических. Это белое пятно для брендов с фокусом на hair care." type="success" />
          <Rec text="Для входа в шампуни рекомендуется позиционирование «премиум hair care» (средний чек 5-10K) — между массовыми (1-3K) и профессиональными (10K+)." />
        </Section>

        {/* ═══ 6. BODY ═══ */}
        <Section id="s6" title="6. Уход за телом (1 012M)">
          <DataTable headers={["Leaf-ниша", "Выручка (фев 2026)", "Брендов", "#1 бренд"]} rows={[
            ["Кремы и масла для тела", "400M", "380", "La Roche-Posay (26M)"],
            ["Дезодоранты", "196M", "135", "Vichy (25M)"],
            ["Средства для душа", "159M", "217", "Bioderma (16M)"],
            ["Гигиенические прокладки", "94M", "65", "—"],
            ["Скрабы для тела", "36M", "56", "The Act (10M)"],
          ]} />
          <Insight text="Уход за телом — территория медицинских/аптечных брендов (La Roche-Posay, Bioderma, Vichy). Мало конкуренции со стороны косметических брендов." />
          <Rec text="Кремы для тела (400M) — крупная ниша с мощным YoY ростом (+101%). Возможность для брендов с уходовой линейкой расширить ассортимент на тело." />
        </Section>

        {/* ═══ 7. PERFUME + SETS + TECH ═══ */}
        <Section id="s7" title="7. Парфюмерия, наборы, техника">
          <h3 style={sH3}>Парфюмерия (1 650M) — топ-10</h3>
          <DataTable headers={["#", "Бренд", "Выручка (фев 2026)", "SKU"]} rows={[
            ["1", "Yves Saint Laurent", "84M", "41"],
            ["2", "Avon", "75M", "190"],
            ["3", "MILLAC", "69M", "5"],
            ["4", "CHANEL", "68M", "33"],
            ["5", "Giorgio Armani", "58M", "37"],
            ["6", "Dior", "51M", "26"],
            ["7", "TOM FORD", "40M", "23"],
            ["8", "Versace", "40M", "30"],
            ["9", "Jean Paul Gaultier", "35M", "18"],
            ["10", "Mary Kay", "33M", "24"],
          ]} />
          <Insight text="Парфюмерия = территория люксовых домов (YSL, CHANEL, Dior, Armani). Avon (#2) — аномалия за счёт объёма SKU (190 позиций). MILLAC (#3, 69M с 5 SKU) — нишевый с высоким средним чеком." />

          <h3 style={sH3}>Наборы косметики (862M) — стратегическая категория</h3>
          <DataTable headers={["#", "Бренд", "Выручка (фев 2026)", "SKU", "Заказов (фев 2026)"]} rows={[
            ["1", "Sen Sulu", "127M", "27", "2 467"],
            ["2", "Без бренда", "106M", "107", "13 981"],
            ["3", "Celimax", "41M", "14", "2 379"],
            ["4", "Skin1004", "40M", "21", "4 922"],
            ["5", "Amennissa", "29M", "10", "1 619"],
            ["6", "Ederra Lab", "28M", "13", "716"],
            ["7", "SADOER", "22M", "58", "11 092"],
            ["8", "MIXIT", "18M", "16", "2 173"],
            ["9", "Sugarlife", "15M", "8", "3 086"],
            ["10", "AXIS-Y", "12M", "7", "893"],
          ]} />
          <Insight text="«Без бренда» = 106M (12%) в наборах — огромное пространство для брендированных наборов. Sen Sulu лидирует (127M) за счёт декоративных сетов." type="success" />
          <Rec text="Наборы — ключевая категория для подарочных сезонов (8 марта, НГ). Премиум-наборы (>34K) = 43% выручки. Рекомендуется формировать подарочные сеты из уходовых линеек." />

          <h3 style={sH3}>Техника для красоты (2 221M) — для справки</h3>
          <DataTable headers={["Ниша", "Выручка (фев 2026)", "Продавцов"]} rows={[
            ["Фены", "891M", "268"],
            ["Щипцы", "385M", "246"],
            ["Машинки для стрижки", "259M", "206"],
            ["Малая косметологическая техника", "208M", "136"],
            ["Электробритвы", "164M", "127"],
            ["Эпиляторы", "103M", "85"],
          ]} />
        </Section>

        {/* ═══ 8. SEASONS ═══ */}
        <Section id="s8" title="8. Сезонность — помесячная динамика">
          <p style={sP}>Анализ 16 месяцев помесячных данных по 12 ключевым leaf-категориям.</p>

          <DataTable headers={["Категория", "Мин. месяц", "Мин. выручка", "Макс. месяц", "Макс. выручка", "Амплитуда"]} rows={[
            ["Кремы/сыворотки", "Дек 2024", "868M", "Фев 2026", "1 712M", "x2.0"],
            ["Тональные", "Дек 2024", "322M", "Фев 2025", "991M", "x3.1"],
            ["Наборы", "Май 2025", "381M", "Дек 2025", "1 126M", "x3.0"],
            ["Помады", "Янв 2025", "146M", "Авг 2025", "335M", "x2.3"],
            ["Румяна", "Апр 2025", "115M", "Дек 2025", "256M", "x2.2"],
            ["Патчи", "Дек 2024", "20M", "Фев 2026", "45M", "x2.3"],
            ["Шампуни", "Дек 2024", "236M", "Авг 2025", "623M", "x2.6"],
            ["Кремы для тела", "Дек 2024", "160M", "Дек 2025", "432M", "x2.7"],
          ]} />

          <h3 style={sH3}>Сезонная матрица: категория x квартал</h3>
          <DataTable headers={["Категория", "Q1 (Янв-Мар)", "Q2 (Апр-Июн)", "Q3 (Июл-Сен)", "Q4 (Окт-Дек)"]} rows={[
            ["Кремы/сыворотки", "Рост → Пик (8М)", "Стабильно", "Стабильно", "Высокий (НГ)"],
            ["Тональные", "ПИК (8М: 991M!)", "Спад", "Рост (осень)", "Высокий"],
            ["Наборы", "ПИК #2 (8М: 1029M)", "Спад", "Рост", "ПИК #1 (НГ: 1126M)"],
            ["Помады", "Рост к 8М", "Дно", "Высокий (осень)", "ПИК (323M)"],
            ["Шампуни", "Рост", "Высокий", "ПИК (лето)", "Спад"],
            ["Кремы для тела", "Рост (8М)", "Стабильно", "Стабильно", "ПИК (НГ: 432M)"],
          ]} />

          <div style={{ ...sCard, borderLeft: `3px solid ${C.amber}` }}>
            <h3 style={{ ...sH3, margin: "0 0 12px", color: C.amber }}>Календарь закупок для beauty-дистрибьютора</h3>
            <div style={{ fontSize: 13, lineHeight: 2, color: "#ccc" }}>
              <div><strong style={{ color: C.text }}>Январь-Февраль:</strong> Закупка наборов и тональных к 8 марта. Пик #2 наборов (1029M).</div>
              <div><strong style={{ color: C.text }}>Март:</strong> Продажи 8 марта. Тональные 991M — рекорд. Кремы на пике.</div>
              <div><strong style={{ color: C.text }}>Апрель-Май:</strong> SPF-кремы, тоники, умывание — переход к летнему уходу.</div>
              <div><strong style={{ color: C.text }}>Июнь-Август:</strong> Шампуни пик. Помады растут. Лёгкие текстуры.</div>
              <div><strong style={{ color: C.text }}>Сентябрь-Октябрь:</strong> Осенний уход: кремы, сыворотки, восстановление после лета.</div>
              <div><strong style={{ color: C.text }}>Ноябрь (Kaspi Жума):</strong> Все категории +20-40%. Скидки решают.</div>
              <div><strong style={{ color: C.text }}>Декабрь:</strong> Наборы ПИК #1 (1126M). Подарочные сеты = 43% выручки.</div>
            </div>
          </div>
        </Section>

        {/* ═══ 9. YOY ═══ */}
        <Section id="s9" title="9. Год к году (YoY)">
          <p style={sP}>Сравнение ноябрь-февраль 2024/25 vs 2025/26 (4 мес, пересекающийся период).</p>
          <DataTable headers={["Категория", "Нояб-Фев 24/25", "Нояб-Фев 25/26", "YoY"]} rows={[
            ["Кремы для тела", "796M", "1 603M", "+101%"],
            ["Патчи", "86M", "165M", "+92%"],
            ["Шампуни", "1 313M", "2 361M", "+80%"],
            ["Наборы", "1 890M", "3 262M", "+73%"],
            ["Румяна", "539M", "894M", "+66%"],
            ["Кремы/сыворотки", "4 069M", "6 424M", "+58%"],
            ["Маски для лица", "345M", "493M", "+43%"],
            ["Тоники", "790M", "1 100M", "+39%"],
            ["Помады", "796M", "1 001M", "+26%"],
            ["Скрабы", "226M", "267M", "+18%"],
            ["Тональные", "2 083M", "2 190M", "+5%"],
          ]} highlight={0} />
          <Insight text="Весь beauty-рынок растёт. Но темпы неравномерны: кремы для тела (+101%) и патчи (+92%) — лидеры роста. Тональные (+5%) и скрабы (+18%) — замедление, возможно насыщение." />
          <Insight text="Наборы выросли на 73% (1.89B → 3.26B) — подтверждение тренда на подарочные сеты." type="success" />
        </Section>

        {/* ═══ 10. PRICE SEGMENTS ═══ */}
        <Section id="s10" title="10. Ценовые сегменты">
          <h3 style={sH3}>Кремы и сыворотки — распределение по цене</h3>
          <DataTable headers={["Сегмент", "Медиана цены", "Выручка (фев 2026)", "Доля рынка", "% брендированных"]} rows={[
            ["Низкий", "1K", "135M", "8%", "92%"],
            ["Бюджетный", "3K", "311M", "18%", "96%"],
            ["Средний", "6K", "440M", "26%", "95%"],
            ["Дорогой", "10K", "449M", "26%", "95%"],
            ["Премиум", "23K", "376M", "22%", "99%"],
          ]} />
          <Insight text="Средний + Дорогой (медиана 6-10K) = 52% рынка кремов. Это оптимальная ценовая зона: достаточная маржа, минимум подделок, максимальный объём." type="success" />

          <h3 style={sH3}>Наборы — премиум доминирует</h3>
          <DataTable headers={["Сегмент", "Медиана", "Выручка (фев 2026)", "Доля"]} rows={[
            ["Низкий", "2K", "64M", "7%"],
            ["Бюджетный", "5K", "87M", "10%"],
            ["Средний", "9K", "167M", "19%"],
            ["Дорогой", "15K", "172M", "20%"],
            ["Премиум", "34K", "371M", "43%"],
          ]} highlight={4} />
          <Insight text="Премиум-наборы (34K+) = 43% выручки категории. Покупатели готовы платить за подарочные сеты. Это не «дешёвый» рынок." type="success" />
          <Rec text="Формировать наборы в диапазоне 15-35K (дорогой + премиум = 63% рынка). Ниже 5K — территория «без бренда» и SADOER." />

          <h3 style={sH3}>Тональные — дорогой сегмент = 31%</h3>
          <DataTable headers={["Сегмент", "Медиана", "Выручка (фев 2026)", "Доля"]} rows={[
            ["Низкий", "2K", "106M", "20%"],
            ["Бюджетный", "4K", "95M", "18%"],
            ["Средний", "7K", "75M", "14%"],
            ["Дорогой", "10K", "166M", "31%"],
            ["Премиум", "25K", "93M", "17%"],
          ]} highlight={3} />
          <Insight text="В тональных дорогой сегмент (медиана 10K) = 31% рынка. RoRoBell Bfadation (13K) попадает точно сюда — поэтому он #1." />
        </Section>

        {/* ═══ 11. CARE vs DECOR ═══ */}
        <Section id="s11" title="11. Уход vs Декоративная косметика">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            <MetricCard label="Уход за лицом" value="2 919M" sub="790K заказов, ср. чек 3.7K" color={C.green} />
            <MetricCard label="Декоративная косметика" value="1 716M" sub="759K заказов, ср. чек 2.3K" color={C.pink} />
          </div>
          <DataTable headers={["Метрика", "Уход за лицом", "Декоративка", "Соотношение"]} rows={[
            ["Выручка (фев 2026)", "2 919M", "1 716M", "1.7 : 1"],
            ["Заказов (фев 2026)", "790 859", "759 458", "1.04 : 1"],
            ["Средний чек", "3 690 KZT", "2 260 KZT", "1.6x"],
            ["SKU", "6 388", "4 904", "1.3x"],
            ["Брендов", "882", "587", "1.5x"],
            ["YoY (кремы/тональные)", "+58%", "+5%", "Уход растёт быстрее"],
          ]} />
          <Insight text="По заказам уход и декор практически равны (~760-790K). Разница в выручке (1.7x) — за счёт более высокого среднего чека в уходе (3.7K vs 2.3K)." />
          <Insight text="Уходовая косметика растёт значительно быстрее: кремы +58% vs тональные +5%. Глобальный тренд «skincare first» подтверждается данными Kaspi." type="success" />
          <Rec text="Приоритет для дистрибьютора: уходовая косметика (выше чек, быстрее рост). Декор — как дополнение для полноты ассортимента и подарочных наборов." />
        </Section>

        {/* ═══ 12. FAKES ═══ */}
        <Section id="s12" title="12. Проблема подделок">
          <p style={sP}>Анализ 35 000+ отзывов по beauty-SKU выявил системную проблему: <strong style={{ color: C.red }}>подделки = причина #1 негативных отзывов</strong>.</p>
          <DataTable headers={["Ценовой сегмент SKU", "% негатива о подделках", "Типичные бренды-жертвы"]} rows={[
            ["<2K KZT", "50%+", "Dr. Althea (1K), Round Lab (1K), AXIS-Y (1K)"],
            ["2-5K KZT", "25-30%", "Celimax (2K), Skin1004 (3K)"],
            ["5-10K KZT", "5-10%", "Anua (5K), MEDI-PEEL (4-7K)"],
            [">10K KZT", "<3%", "RoRoBell (13K), VT Cosmetics (14K), Наборы"],
          ]} highlight={0} />
          <div style={sCard}>
            <h3 style={{ ...sH3, margin: "0 0 8px" }}>Цитаты покупателей</h3>
            <div style={{ borderLeft: `3px solid ${C.red}`, paddingLeft: 14, margin: "8px 0", fontSize: 13, color: "#bbb", lineHeight: 1.6 }}>
              «Товар оказался подделкой. Упаковка и консистенция отличаются от оригинала, вызывает раздражение кожи.»
            </div>
            <div style={{ borderLeft: `3px solid ${C.red}`, paddingLeft: 14, margin: "8px 0", fontSize: 13, color: "#bbb", lineHeight: 1.6 }}>
              «Обожгла всё лицо, вечером умылась — на утро увидела ужас. Спас Бепантен.»
            </div>
            <div style={{ borderLeft: `3px solid ${C.red}`, paddingLeft: 14, margin: "8px 0", fontSize: 13, color: "#bbb", lineHeight: 1.6 }}>
              «Подделкасын салып жіберген» — подделку прислали.
            </div>
          </div>
          <Insight text="Корневая причина: при цене 1K KZT маржа продавца = 100-200 KZT. Подделка обходится в 300-500 KZT → маржа x2-3. Экономический стимул продавать фейк." type="warning" />
          <Rec text="Для авторизованного дистрибьютора: не продавать ниже 3-5K; QR-верификация на упаковке; маркировка «авторизованный дистрибьютор» в карточке; фото с оригинального склада." />
        </Section>

        {/* ═══ 13. GROWTH SPOTS ═══ */}
        <Section id="s13" title="13. Точки роста и белые пятна">
          <div style={{ ...sCard, borderTop: `3px solid ${C.green}` }}>
            <h3 style={{ ...sH3, margin: "0 0 8px", color: C.green }}>Быстрорастущие ниши</h3>
            <DataTable headers={["Ниша", "Выручка (фев 2026)", "YoY рост", "Комментарий"]} rows={[
              ["Патчи", "45M", "+114%", "Маленькая, но самая быстрая. SADOER лидирует."],
              ["Кремы для тела", "400M", "+101%", "Крупная ниша. La Roche-Posay = #1 (26M)."],
              ["Шампуни", "630M", "+80%", "Крупная, нет выраженного бренда-лидера."],
              ["Наборы", "862M", "+73%", "Подарочная категория. Два пика (8М, НГ)."],
              ["Румяна", "203M", "+66%", "Рост декоративки в сегменте «щёки»."],
            ]} />
          </div>

          <div style={{ ...sCard, borderTop: `3px solid ${C.cyan}` }}>
            <h3 style={{ ...sH3, margin: "0 0 8px", color: C.cyan }}>Белые пятна (ниши без сильного лидера)</h3>
            <DataTable headers={["Ниша", "Выручка (фев 2026)", "Проблема", "Возможность"]} rows={[
              ["Шампуни (630M)", "630M", "#1 = elline (103M с 1 SKU — аномалия)", "Нет бренда с широкой линейкой hair care"],
              ["Маски для лица (122M)", "122M", "#1 = Gegemoon (Китай, 13M)", "Нет сильного уходового бренда в масках"],
              ["Кремы для тела (400M)", "400M", "#1 = La Roche-Posay (26M = 6.5%)", "Фрагментированный рынок без доминанта"],
              ["Без бренда в наборах", "106M (12%)", "107 SKU от 65 продавцов", "Брендированные наборы заберут долю"],
            ]} />
          </div>

          <div style={{ ...sCard, borderTop: `3px solid ${C.amber}` }}>
            <h3 style={{ ...sH3, margin: "0 0 8px", color: C.amber }}>Замедляющиеся ниши</h3>
            <DataTable headers={["Ниша", "Выручка (фев 2026)", "YoY", "Комментарий"]} rows={[
              ["Тональные", "536M", "+5%", "Возможно, насыщение. Или перетекание в BB/CC кремы."],
              ["Скрабы", "64M", "+18%", "Ниже среднего роста. Тренд на мягкое очищение?"],
            ]} />
          </div>
        </Section>

        {/* ═══ 14. RECOMMENDATIONS ═══ */}
        <Section id="s14" title="14. Инсайты и рекомендации">

          <div style={sCard}>
            <h3 style={{ ...sH3, margin: "0 0 16px" }}>Стратегические рекомендации для beauty-дистрибьютора на Kaspi</h3>
            <div style={{ fontSize: 13, lineHeight: 2.2, color: "#ccc" }}>
              {[
                { n: "1", t: "Ценовая политика", d: "Оптимальная зона — 6-10K KZT за единицу (52% рынка кремов). Ниже 3K — территория подделок. Наборы — 15-35K (63% рынка наборов)." },
                { n: "2", t: "Борьба с подделками", d: "QR-верификация, маркировка «авторизованный дистрибьютор», фото с оригинального склада, ответы на негативные отзывы." },
                { n: "3", t: "Сезонная стратегия", d: "Два ключевых пика: 8 марта (наборы 1B, тональные 991M) и Новый год (наборы 1.1B). Закупка за 4-6 недель до пика." },
                { n: "4", t: "Наборы как стратегия", d: "43% выручки наборов = премиум (34K+). Формировать подарочные сеты из уходовых линеек для обоих пиков." },
                { n: "5", t: "Уход > Декор", d: "Уходовая косметика растёт быстрее (+58% vs +5%), средний чек выше (3.7K vs 2.3K). Приоритет ассортимента — уход." },
                { n: "6", t: "Hair care — белое пятно", d: "Шампуни 630M (+80% YoY) без сильного бренда. Возможность для входа с премиум hair care линейкой." },
                { n: "7", t: "Патчи — тренд", d: "+114% YoY. Маленькая ниша (45M), но растёт быстрее всех. Первопроходцы получат долю." },
                { n: "8", t: "Отзывы = конверсия", d: "На Kaspi отзывы решают всё. Минимум 50-100 отзывов на SKU перед масштабированием. Фото-отзывы удваивают конверсию." },
                { n: "9", t: "Кремы для тела", d: "+101% YoY, 400M ниша. Фрагментированная (La Roche-Posay #1 с 6.5%). Возможность для брендов расширить линейку на тело." },
                { n: "10", t: "Мониторинг конкурентов", d: "Dr. Althea вырос до #1 в кремах за год (36M → 142M). Bioderma — #2 в кремах, но #1 в умывании. Рынок динамичный — лидеры меняются быстро." },
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
              Проанализировано: <strong style={{ color: C.text }}>73 000+ ниш</strong> &middot; <strong style={{ color: C.text }}>16 месяцев данных</strong> (ноябрь 2024 — февраль 2026) &middot; <strong style={{ color: C.text }}>35 000+ отзывов</strong> покупателей Kaspi.kz
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
