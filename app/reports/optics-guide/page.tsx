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

/* ───── Metric Card ───── */
function MetricCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div style={{ ...sCard, borderTop: `2px solid ${color}`, textAlign: "center", padding: "28px 20px" }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: C.dim, marginBottom: 10, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color, letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: C.dim, marginTop: 8 }}>{sub}</div>}
    </div>
  );
}

/* ───── Score Bar ───── */
function Stars({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 3 }}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} style={{ width: 8, height: 8, borderRadius: 2, background: i < count ? C.accent : `${C.faint}44`, transition: "background 0.2s" }} />
      ))}
    </span>
  );
}

/* ───── Bar Chart (CSS) ───── */
function BarChart({ data, maxVal, color, unit }: { data: { label: string; value: number }[]; maxVal: number; color: string; unit?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 11, color: C.dim, width: 70, textAlign: "right", flexShrink: 0 }}>{d.label}</span>
          <div style={{ flex: 1, height: 22, background: `${color}11`, borderRadius: 4, overflow: "hidden", position: "relative" }}>
            <div style={{ width: `${Math.max((d.value / maxVal) * 100, 1)}%`, height: "100%", background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: 4, transition: "width 0.8s ease" }} />
          </div>
          <span style={{ fontSize: 11, color: C.text, width: 80, textAlign: "right", fontFamily: "monospace", flexShrink: 0 }}>
            {d.value >= 1000000 ? (d.value / 1000000).toFixed(1) + "M" : d.value >= 1000 ? (d.value / 1000).toFixed(0) + "K" : d.value}
            {unit ? ` ${unit}` : ""}
          </span>
        </div>
      ))}
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
            <th key={i} style={{ padding: "10px 12px", textAlign: i === 0 ? "left" : "right", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", fontSize: 11 }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: highlight !== undefined && ri === highlight ? `${C.accent}12` : "transparent" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: "10px 12px", textAlign: ci === 0 ? "left" : "right", color: ci === 0 ? C.text : "#ccc", borderBottom: `1px solid ${C.border}20`, fontWeight: ci === 0 ? 500 : 400, whiteSpace: "nowrap" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ───── SWOT cell ───── */
function SwotCell({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div style={{ ...sCard, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: 20 }}>
      <div style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.04em" }}>{title}</span>
      </div>
      <ul style={{ margin: 0, paddingLeft: 16, listStyle: "disc" }}>
        {items.map((item, i) => (
          <li key={i} style={{ ...sP, marginBottom: 6, fontSize: 13 }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/*                  MAIN PAGE                      */
/* ═══════════════════════════════════════════════ */
export default function OpticsGuideReport() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ═══ Header ═══ */}
        <div style={{ marginBottom: 16 }}>
          <Link href="/" style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}>&larr; kasymzhanov.com</Link>
        </div>

        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, background: `${C.accent}18`, color: C.accent, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", marginBottom: 16, textTransform: "uppercase" }}>
            Enterprise Report
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Разбор сезонного товара:<br />Оптика на Kaspi.kz
          </h1>
          <p style={{ color: C.dim, fontSize: 14, margin: "12px 0 0" }}>
            Подготовил <strong style={{ color: C.text }}>Алмас Касымжанов</strong> · Пример разбора сезонного товара для группы
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, color: C.dim }}>
            <span>Данные: <strong style={{ color: C.text }}>Redstat.kz</strong></span>
            <span>Период: <strong style={{ color: C.text }}>Январь 2026</strong></span>
            <span>Дата: <strong style={{ color: C.text }}>5 марта 2026</strong></span>
          </div>
        </div>

        {/* ═══ TOC ═══ */}
        <div style={{ ...sCard, marginBottom: 48, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.dim, marginBottom: 12 }}>Содержание</div>
          {[
            ["sec-1", "1. Резюме для принятия решений"],
            ["sec-2", "2. Обзор трёх сегментов рынка"],
            ["sec-3", "3. Сегмент: Солнцезащитные очки"],
            ["sec-4", "4. Сегмент: Очки для зрения"],
            ["sec-5", "5. Сегмент: Смарт-очки"],
            ["sec-6", "6. Сравнительный анализ"],
            ["sec-7", "7. Сезонность и тренды"],
            ["sec-8", "8. Конкурентная среда и SWOT"],
            ["sec-9", "9. Рекомендации и план"],
            ["sec-10", "10. Приложение"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ display: "block", fontSize: 13, color: C.accent, textDecoration: "none", padding: "4px 0" }}>{label}</a>
          ))}
        </div>

        {/* ═══ Section 1: Executive Summary ═══ */}
        <Section id="sec-1" title="1. Резюме для принятия решений">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
            <MetricCard label="Солнцезащитные" value="111.0M ₸" sub="55 498 заказов/мес | Gini 0.772" color={C.amber} />
            <MetricCard label="Очки для зрения" value="27.5M ₸" sub="11 370 заказов/мес | Gini 0.631" color={C.green} />
            <MetricCard label="Смарт-очки" value="110.1M ₸" sub="1 155 заказов/мес | Gini 0.777" color={C.blue} />
          </div>

          <DataTable
            headers={["Показатель", "Солнцезащитные", "Очки для зрения", "Смарт-очки"]}
            rows={[
              ["Выручка (янв 2026)", "111.0 млн ₸", "27.5 млн ₸", "110.1 млн ₸"],
              ["Заказы", "55 498", "11 370", "1 155"],
              ["Средний чек", "1 999 ₸", "2 417 ₸", "95 288 ₸"],
              ["Джини (монополизация)", "0.772", "0.631", "0.777"],
              ["Доля NoBrand", "33.2%", "15.1%", "11.1%"],
              ["Рост за год", "Сезонный", "Стабильный +35%", "Взрывной ×48"],
              ["Рекомендация", "Основной объём", "Стабильный доход", "Стратегический рост"],
            ]}
          />

          <div style={{ ...sCard, borderColor: C.green, borderWidth: 2 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green, fontSize: 18 }}>Вердикт</h3>
            <p style={sP}><strong style={{ color: C.text }}>новый продавец следует входить на Kaspi.kz одновременно в два сегмента:</strong></p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
              {[
                { num: 1, color: C.green, title: "Очки для зрения — первоочередной вход", text: "Самый здоровый рынок (Gini 0.631 = умеренная конкуренция), высокая доля брендов (84.9%), стабильный рост заказов (+175% за год: 4 126 → 11 370). Это «хлеб» — стабильный, предсказуемый доход." },
                { num: 2, color: C.amber, title: "Солнцезащитные очки — параллельный вход для объёма", text: "Рынок с большим спросом (55K заказов/мес), но высокой конкуренцией. Фокус на брендированном среднем ценовом сегменте (3 000–8 000 ₸), где NoBrand слаб." },
                { num: 3, color: C.blue, title: "Смарт-очки — наблюдать и готовиться", text: "Рынок монополизирован Ray-Ban (73.4%), но растёт взрывными темпами. Вход оправдан только с уникальным продуктом или эксклюзивным дистрибьюторским соглашением." },
              ].map(v => (
                <div key={v.num} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: `${v.color}22`, color: v.color, fontSize: 15, fontWeight: 700, flexShrink: 0 }}>{v.num}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: v.color, marginBottom: 4 }}>{v.title}</div>
                    <p style={{ ...sP, margin: 0 }}>{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ═══ Section 2: Market Overview ═══ */}
        <Section id="sec-2" title="2. Обзор трёх сегментов рынка">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Иерархия в каталоге Kaspi</h3>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: C.dim, lineHeight: 2, background: "#0d0d18", borderRadius: 8, padding: 16 }}>
              <div><span style={{ color: C.amber }}>Сегмент 1:</span> Аксессуары → Очки и аксессуары → Солнцезащитные очки</div>
              <div><span style={{ color: C.green }}>Сегмент 2:</span> Аптека → Оптика → Очки для зрения</div>
              <div><span style={{ color: C.blue }}>Сегмент 3:</span> Телефоны и гаджеты → Смарт-очки → Смарт-очки</div>
            </div>
          </div>

          <DataTable
            headers={["Метрика", "Солнцезащитные", "Очки для зрения", "Смарт-очки"]}
            rows={[
              ["Выручка общая", "111.0 млн ₸", "27.5 млн ₸", "110.1 млн ₸"],
              ["Выручка брендов", "74.2 млн ₸ (66.8%)", "23.3 млн ₸ (84.9%)", "97.8 млн ₸ (88.9%)"],
              ["Выручка NoBrand", "36.8 млн ₸ (33.2%)", "4.1 млн ₸ (15.1%)", "12.2 млн ₸ (11.1%)"],
              ["Заказы всего", "55 498", "11 370", "1 155"],
              ["Заказы брендов", "13 828 (24.9%)", "8 428 (74.1%)", "586 (50.7%)"],
              ["Заказы NoBrand", "41 670 (75.1%)", "2 942 (25.9%)", "569 (49.3%)"],
              ["Средний чек общий", "1 999 ₸", "2 417 ₸", "95 288 ₸"],
              ["Средний чек бренд", "5 364 ₸", "2 769 ₸", "166 966 ₸"],
              ["Средний чек NoBrand", "883 ₸", "1 406 ₸", "21 468 ₸"],
              ["Кол-во SKU", "3 249", "1 719", "96"],
              ["Кол-во брендов", "256", "43", "19"],
              ["Gini (монополизация)", "0.772", "0.631", "0.777"],
              ["Парето (ТОП-20%)", "80.9%", "68.1%", "83.0%"],
            ]}
          />
        </Section>

        {/* ═══ Section 3: Sunglasses ═══ */}
        <Section id="sec-3" title="3. Сегмент: Солнцезащитные очки">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Выручка", value: "111.0M ₸", color: C.amber },
              { label: "Заказы", value: "55 498", color: C.amber },
              { label: "SKU", value: "3 249", color: C.dim },
              { label: "Бренды", value: "256", color: C.dim },
            ].map(m => (
              <div key={m.label} style={{ ...sCard, padding: "16px 14px", textAlign: "center", marginBottom: 0 }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Бренды vs NoBrand — ключевой разрыв</h3>
            <DataTable
              headers={["Показатель", "Бренды", "NoBrand", "Разница"]}
              rows={[
                ["Выручка", "74.2 млн ₸ (66.8%)", "36.8 млн ₸ (33.2%)", "Бренды 2×"],
                ["Заказы", "13 828 (24.9%)", "41 670 (75.1%)", "NoBrand 3×"],
                ["Средний чек", "5 364 ₸", "883 ₸", "Бренды 6×"],
                ["Медианный чек", "4 990 ₸", "1 874 ₸", "Бренды 2.7×"],
                ["SKU", "1 758 (54.1%)", "1 491 (45.9%)", "≈ паритет"],
                ["Выручка/SKU", "42 189 ₸", "24 674 ₸", "Бренды 1.7×"],
              ]}
            />
            <div style={{ background: `${C.amber}10`, border: `1px solid ${C.amber}33`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#ccc" }}>
              <strong style={{ color: C.amber }}>Для новый продавец:</strong> Огромная возможность в среднем ценовом сегменте (2 000–8 000 ₸). NoBrand-покупатели берут по 883 ₸, бренды — по 5 364 ₸. Между ними — пустота, которую можно занять.
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Монополизация</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[
                { label: "Gini общий", value: "0.772", verdict: "Высокая" },
                { label: "Gini брендов", value: "0.727", verdict: "Высокая" },
                { label: "Gini NoBrand", value: "0.814", verdict: "Очень высокая" },
                { label: "Парето", value: "80.9%", verdict: "ТОП-20% = 80.9%" },
              ].map(g => (
                <div key={g.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: C.dim }}>{g.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: C.red, marginTop: 4 }}>{g.value}</div>
                  <div style={{ fontSize: 10, color: C.dim }}>{g.verdict}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>ТОП-15 брендов</h3>
            <DataTable
              headers={["#", "Бренд", "Выручка", "SKU", "Продавцов", "Рейтинг"]}
              rows={[
                ["1", "Без бренда", "36.8 млн ₸", "1 491", "2", "83.3"],
                ["2", "Alberto Casiano", "19.6 млн ₸", "241", "1", "98.2"],
                ["3", "BLUE ELEPHANT", "10.3 млн ₸", "116", "1", "98.2"],
                ["4", "Ray-Ban", "8.5 млн ₸", "4", "5", "90.1"],
                ["5", "Maybach", "3.7 млн ₸", "67", "4", "87.4"],
                ["6", "FashionLab", "3.5 млн ₸", "58", "1", "96.6"],
                ["7", "WHIEDA", "3.0 млн ₸", "16", "11", "87.6"],
                ["8", "vimi-life", "2.1 млн ₸", "109", "1", "90.4"],
                ["9", "Sairmar", "1.6 млн ₸", "96", "1", "88.8"],
                ["10", "KDEAM", "1.5 млн ₸", "35", "3", "81.9"],
                ["11", "QOSYMSHA", "1.5 млн ₸", "43", "1", "93.4"],
                ["12", "LTW TRADE", "1.4 млн ₸", "54", "1", "91.5"],
                ["13", "MAXCON", "1.4 млн ₸", "50", "1", "91.5"],
                ["14", "NAUSCHA", "1.1 млн ₸", "2", "1", "85.0"],
                ["15", "Chrome Hearts", "0.7 млн ₸", "20", "1", "86.8"],
              ]}
            />
            <div style={{ background: `${C.accent}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc" }}>
              <strong style={{ color: C.accent }}>Ключевое:</strong> Ray-Ban — 4 SKU, 8.5M выручки = ~2.1M/SKU в месяц. Большинство лидеров (Alberto Casiano, BLUE ELEPHANT, FashionLab) = 1 продавец на бренд. <strong style={{ color: C.text }}>новый продавец может воспроизвести эту модель.</strong>
            </div>
          </div>
        </Section>

        {/* ═══ Section 4: Prescription Glasses ═══ */}
        <Section id="sec-4" title="4. Сегмент: Очки для зрения">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Выручка", value: "27.5M ₸", color: C.green },
              { label: "Заказы", value: "11 370", color: C.green },
              { label: "SKU", value: "1 719", color: C.dim },
              { label: "Бренды", value: "43", color: C.dim },
            ].map(m => (
              <div key={m.label} style={{ ...sCard, padding: "16px 14px", textAlign: "center", marginBottom: 0 }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>

          <div style={{ ...sCard, borderColor: `${C.green}44` }}>
            <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, background: `${C.green}18`, color: C.green, fontSize: 11, fontWeight: 600, marginBottom: 12 }}>Рекомендован для входа</div>
            <h3 style={{ ...sH3, marginTop: 0 }}>Почему этот сегмент — приоритет</h3>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {[
                "Gini 0.631 — самый здоровый рынок из трёх (умеренная конкуренция)",
                "84.9% выручки — брендированная продукция (покупатели доверяют брендам)",
                "Рост заказов +175% за год (4 126 → 11 370)",
                "Лидер имеет лишь 17.8% рынка — легко попасть в ТОП-5",
                "Минимальная сезонность — вход в любое время года",
              ].map((s, i) => <li key={i} style={{ ...sP, marginBottom: 8 }}>{s}</li>)}
            </ul>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Бренды vs NoBrand</h3>
            <DataTable
              headers={["Показатель", "Бренды", "NoBrand", "Разница"]}
              rows={[
                ["Выручка", "23.3 млн ₸ (84.9%)", "4.1 млн ₸ (15.1%)", "Бренды 5.6×"],
                ["Заказы", "8 428 (74.1%)", "2 942 (25.9%)", "Бренды 2.9×"],
                ["Средний чек", "2 769 ₸", "1 406 ₸", "Бренды 2×"],
                ["SKU", "1 385 (80.6%)", "334 (19.4%)", "Бренды 4.1×"],
                ["Выручка/SKU", "16 853 ₸", "12 387 ₸", "Бренды 1.4×"],
                ["Выр./Продавец", "10.9 млн ₸", "2.1 млн ₸", "Бренды 5.2×"],
              ]}
            />
            <p style={{ ...sP, color: C.green }}>Брендовый продавец зарабатывает в <strong>5 раз больше</strong> небрендового. Самый сильный аргумент за вход с брендом.</p>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>ТОП-15 брендов</h3>
            <DataTable
              headers={["#", "Бренд", "Выручка", "SKU", "Продавцов", "Рейтинг"]}
              rows={[
                ["1", "Elite Optical N.K.Karl", "4.9 млн ₸", "323", "1", "89.1"],
                ["2", "Без бренда", "4.1 млн ₸", "334", "2", "80.6"],
                ["3", "МОСТ", "3.1 млн ₸", "234", "3", "77.5"],
                ["4", "Health Priority", "2.6 млн ₸", "15", "6", "81.4"],
                ["5", "FEDROV", "2.1 млн ₸", "192", "2", "71.3"],
                ["6", "Xiaomi", "1.8 млн ₸", "11", "1", "84.5"],
                ["7", "4Life", "1.7 млн ₸", "37", "1", "81.4"],
                ["8", "Ralph", "1.0 млн ₸", "97", "2", "71.3"],
                ["9", "Geek", "0.8 млн ₸", "84", "3", "65.1"],
                ["10", "Marcello", "0.8 млн ₸", "72", "2", "72.9"],
              ]}
            />
            <div style={{ background: `${C.green}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc" }}>
              <strong style={{ color: C.green }}>Health Priority</strong> — самый эффективный бренд: 2.6M с 15 SKU = <strong style={{ color: C.text }}>173K ₸/SKU в месяц</strong>. Модель: узкий, но точный ассортимент. новый продавец может её воспроизвести.
            </div>
          </div>
        </Section>

        {/* ═══ Section 5: Smart Glasses ═══ */}
        <Section id="sec-5" title="5. Сегмент: Смарт-очки">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Выручка", value: "110.1M ₸", color: C.blue },
              { label: "Заказы", value: "1 155", color: C.blue },
              { label: "Ср. чек", value: "95 288 ₸", color: C.blue },
              { label: "Рост", value: "×48", color: C.cyan },
            ].map(m => (
              <div key={m.label} style={{ ...sCard, padding: "16px 14px", textAlign: "center", marginBottom: 0 }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Взрывной рост: ×48 за 8 месяцев</h3>
            <BarChart
              color={C.blue}
              maxVal={110100000}
              data={[
                { label: "Апр 2025", value: 6200000 },
                { label: "Май 2025", value: 2300000 },
                { label: "Июн 2025", value: 4100000 },
                { label: "Июл 2025", value: 42400000 },
                { label: "Авг 2025", value: 9600000 },
                { label: "Сен 2025", value: 24800000 },
                { label: "Окт 2025", value: 30100000 },
                { label: "Ноя 2025", value: 78100000 },
                { label: "Дек 2025", value: 73300000 },
                { label: "Янв 2026", value: 110100000 },
              ]}
              unit="₸"
            />
            <p style={{ ...sP, marginTop: 16 }}>Скачок в июле 2025 (42.4M) вероятно связан с выходом Ray-Ban Meta на казахстанский рынок.</p>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>ТОП-10 брендов</h3>
            <DataTable
              headers={["#", "Бренд", "Выручка", "SKU", "Продавцов", "Ср. чек", "Рейтинг"]}
              rows={[
                ["1", "Ray-Ban", "80.8 млн ₸", "27", "2", "363 700 ₸", "94.7"],
                ["2", "Без бренда", "12.2 млн ₸", "34", "8", "31 100 ₸", "80.7"],
                ["3", "KHANY", "4.8 млн ₸", "2", "1", "61 700 ₸", "86.0"],
                ["4", "Ravilo", "4.1 млн ₸", "2", "1", "63 600 ₸", "84.2"],
                ["5", "SMART GLASSESS", "3.2 млн ₸", "11", "9", "28 400 ₸", "70.2"],
                ["6", "Meta", "3.1 млн ₸", "4", "1", "457 700 ₸", "80.7"],
                ["7", "Oakley", "0.5 млн ₸", "1", "1", "459 400 ₸", "57.9"],
                ["8", "Rokid", "0.4 млн ₸", "1", "1", "212 500 ₸", "59.6"],
                ["9", "EX", "0.4 млн ₸", "1", "1", "47 900 ₸", "59.6"],
                ["10", "LEMNISCATA", "0.2 млн ₸", "1", "1", "30 900 ₸", "42.1"],
              ]}
            />
            <div style={{ background: `${C.red}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc" }}>
              <strong style={{ color: C.red }}>Ray-Ban = 73.4% рынка.</strong> 80.8M из 110.1M. Абсолютная монополия. Вход оправдан только с уникальным продуктом или дистрибьюторским соглашением.
            </div>
          </div>
        </Section>

        {/* ═══ Section 6: Comparative Analysis ═══ */}
        <Section id="sec-6" title="6. Сравнительный анализ">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Матрица привлекательности</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr>{["Критерий", "Солнцезащитные", "Очки для зрения", "Смарт-очки"].map((h, i) => (
                    <th key={i} style={{ padding: "10px 12px", textAlign: i === 0 ? "left" : "center", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {[
                    ["Размер рынка", 5, 3, 5],
                    ["Объём заказов", 5, 3, 1],
                    ["Здоровье конкуренции", 2, 4, 2],
                    ["Доступность входа", 3, 5, 1],
                    ["Сила бренда", 4, 5, 5],
                    ["Рост рынка", 3, 4, 5],
                    ["Средний чек", 1, 2, 5],
                    ["Маржинальность", 2, 3, 5],
                  ].map((row, ri) => (
                    <tr key={ri}>
                      <td style={{ padding: "10px 12px", color: C.text, fontWeight: 500, borderBottom: `1px solid ${C.border}20` }}>{row[0]}</td>
                      {[1, 2, 3].map(ci => (
                        <td key={ci} style={{ padding: "10px 12px", textAlign: "center", borderBottom: `1px solid ${C.border}20` }}>
                          <Stars count={row[ci] as number} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Эффективность: выручка на 1 SKU</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, textAlign: "center" }}>
              {[
                { seg: "Солнцезащитные", val: "42 189 ₸", color: C.amber },
                { seg: "Очки для зрения", val: "16 853 ₸", color: C.green },
                { seg: "Смарт-очки", val: "1 578 098 ₸", color: C.blue },
              ].map(s => (
                <div key={s.seg} style={{ padding: 16 }}>
                  <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>{s.seg} (бренды)</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
                </div>
              ))}
            </div>
            <p style={{ ...sP, textAlign: "center", marginTop: 8 }}>Один SKU смарт-очков = <strong style={{ color: C.text }}>37× больше выручки</strong>, чем один SKU солнцезащитных. Но ценник тоже 37× выше.</p>
          </div>
        </Section>

        {/* ═══ Section 7: Seasonality ═══ */}
        <Section id="sec-7" title="7. Сезонность и тренды">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.amber }}>Солнцезащитные — выраженная сезонность</h3>
            <BarChart
              color={C.amber}
              maxVal={270300000}
              data={[
                { label: "Дек 2024", value: 35100000 },
                { label: "Янв 2025", value: 79900000 },
                { label: "Фев 2025", value: 136800000 },
                { label: "Мар 2025", value: 200600000 },
                { label: "Апр 2025", value: 198000000 },
                { label: "Июн 2025", value: 270300000 },
                { label: "Авг 2025", value: 147700000 },
                { label: "Сен 2025", value: 93300000 },
                { label: "Окт 2025", value: 91500000 },
                { label: "Ноя 2025", value: 102100000 },
                { label: "Дек 2025", value: 82400000 },
                { label: "Янв 2026", value: 111000000 },
              ]}
              unit="₸"
            />
            <p style={{ ...sP, marginTop: 16 }}>
              <strong style={{ color: C.amber }}>Пик: июнь (270M)</strong>. Сезон: февраль–июнь. Оптимальный вход — <strong style={{ color: C.text }}>январь-февраль</strong>, чтобы к пику набрать отзывы.
            </p>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green }}>Очки для зрения — стабильный рост</h3>
            <BarChart
              color={C.green}
              maxVal={27500000}
              data={[
                { label: "Дек 2024", value: 20300000 },
                { label: "Янв 2025", value: 25000000 },
                { label: "Фев 2025", value: 25400000 },
                { label: "Мар 2025", value: 23900000 },
                { label: "Апр 2025", value: 20400000 },
                { label: "Май 2025", value: 18700000 },
                { label: "Июн 2025", value: 16500000 },
                { label: "Сен 2025", value: 20200000 },
                { label: "Ноя 2025", value: 23600000 },
                { label: "Дек 2025", value: 21000000 },
                { label: "Янв 2026", value: 27500000 },
              ]}
              unit="₸"
            />
            <p style={{ ...sP, marginTop: 16 }}>
              Рост заказов: <strong style={{ color: C.green }}>+175%</strong> за год (4 126 → 11 370). Январь 2026 — новый рекорд выручки. Вход возможен <strong style={{ color: C.text }}>в любое время года</strong>.
            </p>
          </div>
        </Section>

        {/* ═══ Section 8: SWOT ═══ */}
        <Section id="sec-8" title="8. Конкурентная среда и SWOT">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Карта конкурентов: Солнцезащитные</h3>
            <DataTable
              headers={["Бренд", "Позиционирование", "Выр./SKU", "Угроза"]}
              rows={[
                ["Alberto Casiano", "Масс-маркет бренд, 241 SKU", "~81K ₸", "Высокая"],
                ["BLUE ELEPHANT", "Масс-маркет, 116 SKU", "~89K ₸", "Средняя"],
                ["Ray-Ban", "Премиум, 4 SKU", "~2.1M ₸", "Нет (другой сегмент)"],
                ["FashionLab", "Fashion, 58 SKU", "~60K ₸", "Средняя"],
                ["Maybach", "Премиум-копия, 67 SKU", "~55K ₸", "Низкая"],
              ]}
            />
            <div style={{ background: `${C.amber}10`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#ccc" }}>
              <strong style={{ color: C.amber }}>Свободная ниша:</strong> Средний ценовой сегмент (3 000–8 000 ₸) с сильным брендингом. Текущие лидеры — безликие масс-маркет бренды.
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Карта конкурентов: Очки для зрения</h3>
            <DataTable
              headers={["Бренд", "Позиционирование", "Угроза"]}
              rows={[
                ["Elite Optical N.K.Karl", "Лидер, широкий ассортимент", "Средняя"],
                ["МОСТ", "Локальный бренд, 3 продавца", "Низкая"],
                ["Health Priority", "Здоровье-ориентированный", "Низкая"],
                ["FEDROV", "Ноунейм с объёмом", "Низкая"],
              ]}
            />
            <div style={{ background: `${C.green}10`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#ccc" }}>
              <strong style={{ color: C.green }}>Свободная ниша:</strong> «Молодёжные очки для зрения» — стильные оправы по 2 500–5 000 ₸. Текущие лидеры ориентированы на функциональность, не на дизайн.
            </div>
          </div>

          <h3 style={{ ...sH3, marginTop: 32 }}>SWOT-анализ входа новый продавец на Kaspi</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <SwotCell title="Сильные стороны" color={C.green} items={[
              "Готовый бренд (Собственный бренд →новый продавец)",
              "Опыт в очковой индустрии",
              "Понимание целевой аудитории",
            ]} />
            <SwotCell title="Слабые стороны" color={C.red} items={[
              "Нет опыта на Kaspi",
              "Нужны карточки и описания с нуля",
              "Начало с нуля по отзывам",
            ]} />
            <SwotCell title="Возможности" color={C.blue} items={[
              "Растущий рынок (+35% очки для зрения, ×48 смарт-очки)",
              "Низкий Gini в оптике (0.631)",
              "33% солнцезащитных — NoBrand (можно забрать)",
            ]} />
            <SwotCell title="Угрозы" color={C.amber} items={[
              "Alberto Casiano / BLUE ELEPHANT в солнцезащитных",
              "Ray-Ban в смарт-очках (73.4% рынка)",
              "Сезонность солнцезащитных",
            ]} />
          </div>
        </Section>

        {/* ═══ Section 9: Recommendations ═══ */}
        <Section id="sec-9" title="9. Рекомендации и пошаговый план">
          <div style={{ ...sCard, borderColor: C.accent }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.accent, fontSize: 18 }}>Стратегия: «Два фронта + наблюдение»</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { months: "Месяц 1-2", seg: "Очки для зрения", desc: "стабильный доход", color: C.green },
                { months: "Месяц 2-3", seg: "Солнцезащитные", desc: "масштабирование к лету", color: C.amber },
                { months: "Месяц 6+", seg: "Смарт-очки", desc: "стратегический вход", color: C.blue },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ width: 90, fontSize: 12, fontWeight: 600, color: C.dim, flexShrink: 0 }}>{s.months}</div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, color: s.color }}>{s.seg}</div>
                    <div style={{ fontSize: 12, color: C.dim }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action plan */}
          {[
            { title: "Этап 1: Подготовка (недели 1-2)", color: C.dim, items: [
              "Регистрация продавца на Kaspi.kz — создание магазина новый продавец",
              "Изучение требований Kaspi к карточкам товаров",
              "Подготовка фотоматериалов: 5-7 фото на SKU",
              "Ценовое позиционирование: очки для зрения 2 500 – 5 000 ₸, солнцезащитные 3 500 – 8 000 ₸",
            ]},
            { title: "Этап 2: Запуск «Очки для зрения» (недели 2-4)", color: C.green, items: [
              "Загрузить первые 15-25 SKU — начать с бестселлеров (ориентир: Health Priority = 2.6M с 15 SKU)",
              "Описания карточек: «здоровье глаз», «защита от экрана», «стильный дизайн»",
              "Kaspi Red (рассрочка) для товаров выше 3 000 ₸",
              "Цель на 1 мес: 200-300 заказов, 500K – 1M ₸ выручки, ТОП-20 брендов",
            ]},
            { title: "Этап 3: Запуск «Солнцезащитные» (недели 4-6)", color: C.amber, items: [
              "Загрузить 20-40 SKU в среднем ценовом сегменте (3 000–8 000 ₸)",
              "ИЗБЕГАТЬ ценовой войны с NoBrand (883 ₸) — там маржа отсутствует",
              "Позиционирование: «Дизайнерские солнцезащитные по справедливой цене»",
              "Цель на 3 мес: 500-1 000 заказов/мес, 2-4M ₸, в пик (май-июнь) до 6-8M ₸",
            ]},
            { title: "Этап 4: Масштабирование (месяцы 3-6)", color: C.accent, items: [
              "Расширение ассортимента до 50-80 SKU в каждой категории",
              "A/B тестирование цен на основе данных RedStat",
              "Работа с отзывами: быстрые ответы, QR-коды в упаковке",
              "Мониторинг доли рынка, Gini, Rev/SKU через RedStat",
            ]},
          ].map((stage, i) => (
            <div key={i} style={{ ...sCard, borderLeft: `3px solid ${stage.color}` }}>
              <h3 style={{ ...sH3, marginTop: 0, color: stage.color }}>{stage.title}</h3>
              {stage.items.map((item, j) => (
                <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 1, background: stage.color, flexShrink: 0, marginTop: 6 }} />
                  <span style={{ ...sP, margin: 0 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}

          {/* Financial projections */}
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Финансовые ориентиры: Консервативный сценарий (6 мес)</h3>
            <DataTable
              headers={["Месяц", "Очки для зрения", "Солнцезащитные", "Итого"]}
              rows={[
                ["1", "300K ₸", "—", "300K ₸"],
                ["2", "600K ₸", "500K ₸", "1.1M ₸"],
                ["3", "1M ₸", "1.5M ₸", "2.5M ₸"],
                ["4 (апрель)", "1.2M ₸", "3M ₸", "4.2M ₸"],
                ["5 (май)", "1.2M ₸", "5M ₸", "6.2M ₸"],
                ["6 (июнь — пик)", "1.5M ₸", "6M ₸", "7.5M ₸"],
                ["ИТОГО за 6 мес", "5.8M ₸", "16M ₸", "~22M ₸"],
              ]}
              highlight={6}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
              <div style={{ textAlign: "center", padding: 16, borderRadius: 8, background: `${C.dim}10` }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>Консервативный</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: C.text }}>~22M ₸</div>
                <div style={{ fontSize: 12, color: C.dim }}>за 6 месяцев</div>
              </div>
              <div style={{ textAlign: "center", padding: 16, borderRadius: 8, background: `${C.green}10` }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>Оптимистичный</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: C.green }}>~35M ₸</div>
                <div style={{ fontSize: 12, color: C.dim }}>за 6 месяцев</div>
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>KPI для отслеживания</h3>
            <DataTable
              headers={["Метрика", "Инструмент", "Частота", "Цель"]}
              rows={[
                ["Выручка новый продавец", "Kaspi Seller + RedStat", "Еженедельно", "Рост MoM"],
                ["Доля рынка", "RedStat (бренд / ниша)", "Ежемесячно", "> 1% за 3 мес"],
                ["Средний чек", "RedStat", "Ежемесячно", "Выше NoBrand"],
                ["Кол-во отзывов", "Kaspi", "Еженедельно", "> 5 на SKU за 2 мес"],
                ["Rev/SKU", "RedStat", "Ежемесячно", "> среднего по нише"],
                ["Позиция в рейтинге", "RedStat", "Ежемесячно", "ТОП-10 за 6 мес"],
              ]}
            />
          </div>
        </Section>

        {/* ═══ Section 10: Appendix ═══ */}
        <Section id="sec-10" title="10. Приложение: Источники и методология">
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Источник данных</h3>
            <p style={sP}><strong style={{ color: C.text }}>Redstat.kz</strong> — данные за январь 2026 (факт), история за 12-14 месяцев</p>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Расшифровка метрик</h3>
            <DataTable
              headers={["Метрика", "Описание"]}
              rows={[
                ["Gini (Джини)", "Мера монополизации: 0 = равенство, 1 = монополия. <0.3 здоровая, 0.5-0.7 повышенная, >0.7 высокая"],
                ["Парето", "Доля выручки ТОП-20% продавцов. 80% = «правило Парето»"],
                ["NoBrand Share", "Доля выручки товаров без бренда. Высокий = возможность для нового бренда"],
                ["Rev/SKU", "Выручка на 1 товар. Эффективность ассортимента"],
                ["Rev/Merchant", "Выручка на 1 продавца. Заработок типичного продавца"],
                ["Index NB/B", "Соотношение NoBrand к брендам. 0.58 = NoBrand = 58% от бренда"],
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
