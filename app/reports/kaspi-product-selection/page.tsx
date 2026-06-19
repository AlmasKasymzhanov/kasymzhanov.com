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
const sBadge = (color: string): React.CSSProperties => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: `${color}18`, color, fontSize: 11, fontWeight: 600, letterSpacing: "0.03em" });

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

/* ───── Verdict Badge ───── */
function Verdict({ type, text }: { type: "no" | "yes" | "maybe"; text: string }) {
  const color = type === "no" ? C.red : type === "yes" ? C.green : C.amber;
  return <span style={sBadge(color)}>{text}</span>;
}

/* ───── MetricCard ───── */
function MetricCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{ ...sCard, padding: "16px 20px", flex: 1, minWidth: 140 }}>
      <div style={{ fontSize: 11, color: C.dim, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: color || C.text }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

/* ───── Quote ───── */
function Quote({ text, rating }: { text: string; rating: number }) {
  const color = rating <= 2 ? C.red : rating === 3 ? C.amber : C.green;
  return (
    <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 14, margin: "8px 0", fontSize: 13, color: "#bbb", lineHeight: 1.6 }}>
      <span style={{ ...sBadge(color), marginRight: 8, fontSize: 10 }}>{rating}/5</span>
      {text}
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/*                  MAIN PAGE                      */
/* ═══════════════════════════════════════════════ */
export default function KaspiProductSelection() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ═══ Header ═══ */}
        <div style={{ marginBottom: 16 }}>
          <Link href="/" style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}>&larr; kasymzhanov.com</Link>
        </div>

        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, background: `${C.accent}18`, color: C.accent, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", marginBottom: 16, textTransform: "uppercase" }}>
            Enterprise Analytics Report
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Подбор товаров для входа<br />на Kaspi.kz
          </h1>
          <p style={{ color: C.dim, fontSize: 14, margin: "12px 0 0" }}>
            Подготовил <strong style={{ color: C.text }}>Алмас Касымжанов</strong> &middot; на основе данных <strong style={{ color: C.text }}>RedStat</strong>
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, color: C.dim, flexWrap: "wrap" }}>
            <span>Дата: <strong style={{ color: C.text }}>26 марта 2026</strong></span>
            <span>Данные: <strong style={{ color: C.text }}>73 000+ ниш</strong></span>
            <span>Бюджет: <strong style={{ color: C.text }}>5-7M KZT</strong></span>
            <span>Стратегия: <strong style={{ color: C.text }}>Закрытый бренд</strong></span>
          </div>
        </div>

        {/* ═══ TOC ═══ */}
        <div style={{ ...sCard, marginBottom: 48, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.dim, marginBottom: 12 }}>Содержание</div>
          {[
            ["sec-rejected", "1. Отклонённые товары — почему НЕТ (5 позиций)"],
            ["sec-recommended", "2. Рекомендуемые ниши — почему ДА (3 позиции)"],
            ["sec-reviews", "3. Анализ отзывов — боли покупателей"],
            ["sec-trends", "4. Тренды ShopHunter — что залетает прямо сейчас"],
            ["sec-mktu", "5. Товарные знаки и МКТУ — BRAVAX & AYOVA"],
            ["sec-hidden", "6. Скрытые растущие ниши"],
            ["sec-plan", "7. Финальный план действий"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ display: "block", padding: "6px 0", fontSize: 13, color: C.blue, textDecoration: "none" }}>{label}</a>
          ))}
        </div>

        {/* ═══ SECTION 1: REJECTED ═══ */}
        <Section id="sec-rejected" title="1. Отклонённые товары — почему НЕТ">
          <p style={sP}>Клиент предложил 5 товаров для входа через OEM (MOQ от 500 шт). Каждый проанализирован по данным RedStat: выручка, конкуренция, бренды, отзывы.</p>

          <DataTable headers={["Товар", "Выручка/мес", "Продавцов", "Гл. проблема", "Вердикт"]} rows={[
            ["Лапшарезка", "71M", "32", "Рынок слишком мал, лидер 16M", "НЕТ"],
            ["Смарт-часы", "1 876M", "158", "Apple/Garmin = 77% монополия", "НЕТ"],
            ["Воздухоочиститель", "599M", "157", "MOQ 500 = 12.5M > бюджета", "УСЛОВНО"],
            ["Кухонный комбайн", "1 371M", "35", "KENWOOD = 62% монополия", "НЕТ"],
            ["Женская одежда", "393M", "314", "314 продавцов, 47% демпинг", "НЕТ"],
          ]} />

          {/* Лапшарезка */}
          <div style={sCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ ...sH3, margin: 0 }}>Лапшарезка</h3>
              <Verdict type="no" text="НЕТ" />
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
              <MetricCard label="Выручка/мес" value="71M" sub="слишком мало" color={C.red} />
              <MetricCard label="Лидер (MOZZY)" value="16M" sub="потолок бренда" />
              <MetricCard label="Отзывы лидера" value="5.0" sub="0 негативных — нечего улучшать" color={C.green} />
            </div>
            <p style={sP}><strong style={{ color: C.red }}>Проблема:</strong> MOQ 500 шт x ~20K = 10M инвестиция в рынок 71M. Лидер (MOZZY) делает 16M. Даже при 10% рынка = распродажа 6-10 месяцев. У конкурентов рейтинг 5.0, 0 негативных отзывов — нечего улучшать, не на чём дифференцироваться.</p>
          </div>

          {/* Смарт-часы */}
          <div style={sCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ ...sH3, margin: 0 }}>Смарт-часы</h3>
              <Verdict type="no" text="НЕТ" />
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
              <MetricCard label="Apple" value="42.5%" sub="798M/мес" color={C.red} />
              <MetricCard label="Garmin" value="23.1%" sub="434M/мес" />
              <MetricCard label="Без бренда" value="0.7%" sub="13M — мёртвая зона" color={C.red} />
            </div>
            <p style={sP}><strong style={{ color: C.red }}>Проблема:</strong> Apple + Garmin + Huawei + Samsung = 81.5% рынка. Доля без бренда = 0.7%. Единственный локальный бренд NOLIMIT (87M) строил репутацию годами — 0 негативных из 1084 отзывов. OEM-часы без экосистемы = мёртвый товар.</p>
            <Quote text="Перешёл с Apple Watch из-за частой зарядки. Хожу несколько дней, 78%. Очень круто." rating={5} />
            <p style={{ ...sP, fontSize: 12, color: C.dim }}>Покупатели мигрируют между Apple/Huawei/Garmin. OEM не рассматривают.</p>
          </div>

          {/* Воздухоочиститель */}
          <div style={sCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ ...sH3, margin: 0 }}>Воздухоочиститель</h3>
              <Verdict type="maybe" text="УСЛОВНО" />
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
              <MetricCard label="Рост за 9 мес" value="+229%" sub="182M → 599M" color={C.green} />
              <MetricCard label="umeko (локальный)" value="100M" sub="3 SKU, 2 продавца" color={C.green} />
              <MetricCard label="MOQ x себест." value="12.5M" sub="> бюджета 7M" color={C.red} />
            </div>
            <p style={sP}><strong style={{ color: C.amber }}>Вердикт:</strong> Ниша интересная — растёт +229%, локальные бренды работают (umeko 100M, GENAU 18M). Но MOQ 500 x ~25K = 12.5M, вдвое больше бюджета. Рассмотреть как 4-ю позицию на зимний сезон 2026/2027.</p>
            <Quote text="Ничего такого, просто фильтр с вентилятором. Не может это стоить столько денег. Разницу до/после вообще не заметил." rating={1} />
            <Quote text="60м2 деп алдап, 10м2 тазаламайды — не покрывает заявленную площадь" rating={1} />
            <p style={{ ...sP, fontSize: 12, color: C.dim }}>Xiaomi: инструкция на китайском, приложение не подключается в КЗ — серая поставка.</p>
          </div>

          {/* Кухонный комбайн */}
          <div style={sCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ ...sH3, margin: 0 }}>Кухонный комбайн</h3>
              <Verdict type="no" text="НЕТ" />
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
              <MetricCard label="KENWOOD доля" value="62%" sub="851M/мес — монополия" color={C.red} />
              <MetricCard label="1 SKU KENWOOD" value="780M" sub="Cooking Chef 950K" />
              <MetricCard label="Отзывы KENWOOD" value="5.0" sub="0 негативных из 1764!" color={C.green} />
            </div>
            <p style={sP}><strong style={{ color: C.red }}>Проблема:</strong> KENWOOD + Thermomix = 78% рынка. Один SKU за 950K делает 780M/мес. Покупатели приходят конкретно за KENWOOD. MOQ 500 x ~40K = 20M — втрое больше бюджета.</p>
          </div>

          {/* Женская одежда */}
          <div style={sCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ ...sH3, margin: 0 }}>Женская повседневная одежда</h3>
              <Verdict type="no" text="НЕТ" />
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
              <MetricCard label="Продавцов" value="314" sub="кровавый океан" color={C.red} />
              <MetricCard label="Без бренда" value="47%" sub="186M — демпинг" color={C.red} />
              <MetricCard label="Потолок SKU" value="3M" sub="максимум на 1 позицию" />
            </div>
            <p style={sP}><strong style={{ color: C.red }}>Проблема:</strong> 314 продавцов, 727 SKU, 122 бренда. 47% рынка = без бренда = дикий демпинг. MOQ 500 шт размажутся по размерам (S/M/L/XL) и цветам = 5 штук каждого варианта. Возвраты 15-25%.</p>
          </div>
        </Section>

        {/* ═══ SECTION 2: RECOMMENDED ═══ */}
        <Section id="sec-recommended" title="2. Рекомендуемые ниши — почему ДА">
          <p style={sP}>Из 73 000+ ниш отобраны 3 позиции по критериям: закрытые бренды работают, есть проблемы у конкурентов (можно улучшить), бюджет влезает, сезоны дополняют друг друга.</p>

          {/* Чемоданы */}
          <div style={{ ...sCard, borderTop: `3px solid ${C.green}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ ...sH3, margin: 0 }}>Чемоданы — летняя сезонка</h3>
              <Verdict type="yes" text="AYOVA" />
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
              <MetricCard label="Выручка/мес" value="294M" sub="пик 486M (+65%)" color={C.green} />
              <MetricCard label="Продавцов" value="66" sub="умеренно" />
              <MetricCard label="Без бренда" value="52M" sub="18% — есть пространство" color={C.green} />
              <MetricCard label="BRAUER (закр.)" value="21M" sub="1 продавец, 146K" color={C.green} />
            </div>
            <DataTable headers={["Бренд", "Выручка", "SKU", "Продавцов", "Модель"]} rows={[
              ["QAZAQSUMKA", "57M", "81", "24", "Открытый"],
              ["Без бренда", "52M", "72", "33", "—"],
              ["Xiaomi", "40M", "22", "2", "Полуоткрытый"],
              ["BRAUER", "21M", "9", "1", "Закрытый"],
              ["FASHION", "20M", "22", "14", "Открытый"],
            ]} highlight={3} />
            <p style={sP}>Пик: май-сентябрь (travel season). Инвестиция: 2.5M. Целевая цена: 25-70K. Маржа: ~69%.</p>
          </div>

          {/* Степперы */}
          <div style={{ ...sCard, borderTop: `3px solid ${C.accent}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ ...sH3, margin: 0 }}>Степперы — взрывной тренд +1700%</h3>
              <Verdict type="yes" text="BRAVAX" />
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
              <MetricCard label="Рост за 14 мес" value="+1700%" sub="18M → 336M" color={C.accent} />
              <MetricCard label="GENAU (закр.)" value="56M" sub="3 SKU, 1 продавец, 5.0" color={C.green} />
              <MetricCard label="Закр. бренды" value="8/10" sub="топ-брендов = 1 продавец" color={C.green} />
            </div>
            <DataTable headers={["Бренд", "Выручка", "SKU", "Продавцов", "Цена"]} rows={[
              ["GENAU", "56M", "3", "1", "68K"],
              ["Без бренда", "54M", "9", "13", "15K"],
              ["ART FiT", "23M", "3", "1", "23K"],
              ["BATR.KZ", "21M", "6", "1", "28K"],
              ["Aq-Jol", "19M", "3", "1", "30K"],
            ]} highlight={0} />
            <p style={sP}>Пик: октябрь-февраль (домашний фитнес). Инвестиция: 1.5M. Целевой сегмент: 25-40K. Маржа: ~47%.</p>
          </div>

          {/* Камеры */}
          <div style={{ ...sCard, borderTop: `3px solid ${C.blue}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ ...sH3, margin: 0 }}>Камеры видеонаблюдения — стабильный рост</h3>
              <Verdict type="yes" text="BRAVAX" />
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
              <MetricCard label="Рост YoY" value="+26%" sub="стабильный, без сезонности" color={C.blue} />
              <MetricCard label="PROMAX (закр.)" value="17M" sub="1 продавец, комплекты" color={C.green} />
              <MetricCard label="Imou рейтинг" value="5.0" sub="0 негативных — эталон" color={C.green} />
            </div>
            <DataTable headers={["Бренд", "Выручка", "SKU", "Продавцов", "Цена"]} rows={[
              ["Imou", "32M", "22", "12", "13-16K"],
              ["Без бренда", "24M", "28", "14", "9K"],
              ["PROMAX", "17M", "4", "1", "120-145K"],
              ["EZVIZ", "15M", "12", "9", "12K"],
              ["LIDERMAX", "15M", "8", "6", "8K"],
            ]} highlight={2} />
            <p style={sP}>Круглый год. Два направления: WiFi камеры (12-14K) + комплекты NVR (90-130K). Инвестиция: 2M. Маржа: 55-59%.</p>
          </div>

          {/* Season synergy */}
          <div style={{ ...sCard, padding: "20px 24px" }}>
            <h3 style={{ ...sH3, margin: "0 0 16px" }}>Синергия сезонов</h3>
            <div style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 2, color: "#ccc" }}>
              <div><span style={{ color: C.dim, width: 60, display: "inline-block" }}>Мес:</span> Янв Фев Мар Апр <span style={{ color: C.green }}>Май Июн Июл Авг</span> Сен <span style={{ color: C.accent }}>Окт Ноя</span> Дек</div>
              <div><span style={{ color: C.green }}>AYOVA чемоданы:</span>{" "} ░░░ ░░░ ░░░ ░░░ <span style={{ color: C.green, fontWeight: 700 }}>▓▓▓ ▓▓▓ ▓▓▓ ▓▓▓</span> ░░░ ░░░ ░░░ ▒▒▒</div>
              <div><span style={{ color: C.accent }}>BRAVAX степперы:</span> <span style={{ color: C.accent, fontWeight: 700 }}>▓▓▓ ▓▓▓</span> ░░░ ░░░ ░░░ ░░░ ░░░ ░░░ ░░░ <span style={{ color: C.accent, fontWeight: 700 }}>▓▓▓ ▓▓▓ ▓▓▓</span></div>
              <div><span style={{ color: C.blue }}>BRAVAX камеры:{" "}</span> <span style={{ color: C.blue }}>▒▒▒ ▒▒▒ ▒▒▒ ▒▒▒ ▒▒▒ ▒▒▒ ▒▒▒ ▒▒▒ ▒▒▒ ▒▒▒ ▒▒▒ ▒▒▒</span></div>
            </div>
            <p style={{ ...sP, marginTop: 12, fontSize: 12 }}>▓ = пик &nbsp; ▒ = стабильно &nbsp; ░ = низкий сезон. Каждый месяц минимум одна ниша в пике.</p>
          </div>
        </Section>

        {/* ═══ SECTION 3: REVIEWS ═══ */}
        <Section id="sec-reviews" title="3. Анализ отзывов — боли покупателей">

          <h3 style={sH3}>Степперы — главные жалобы</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
            <div style={{ ...sCard, borderLeft: `3px solid ${C.red}` }}><div style={{ fontSize: 11, color: C.dim }}>Проблема #1</div><div style={{ fontSize: 15, fontWeight: 700, color: C.red }}>Скрип 60%+</div><p style={{ ...sP, fontSize: 12, margin: "4px 0 0" }}>негативных отзывов</p></div>
            <div style={{ ...sCard, borderLeft: `3px solid ${C.amber}` }}><div style={{ fontSize: 11, color: C.dim }}>Проблема #2</div><div style={{ fontSize: 15, fontWeight: 700, color: C.amber }}>Поломки 2-4 нед</div><p style={{ ...sP, fontSize: 12, margin: "4px 0 0" }}>цилиндры текут</p></div>
            <div style={{ ...sCard, borderLeft: `3px solid ${C.pink}` }}><div style={{ fontSize: 11, color: C.dim }}>Проблема #3</div><div style={{ fontSize: 15, fontWeight: 700, color: C.pink }}>Ложная нагрузка</div><p style={{ ...sP, fontSize: 12, margin: "4px 0 0" }}>120кг → ломается при 65кг</p></div>
          </div>
          <Quote text="С первых минут использования он начал сильно скрипеть, тренироваться невозможно." rating={1} />
          <Quote text="Металл ролика при регулировке нагрузки гнётся во время тренировки. Отвёз сварщикам." rating={1} />
          <Quote text="Не скрипит, все работает. Продавец связался по WhatsApp, уточнил детали. Мега быстрая доставка." rating={5} />
          <p style={{ ...sP, fontSize: 12, color: C.dim }}>GENAU: 90 отзывов, 0 негативных, 5.0. Секрет: качество + сервис + честные характеристики.</p>

          <h3 style={sH3}>Чемоданы — главные жалобы</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
            <div style={{ ...sCard, borderLeft: `3px solid ${C.red}` }}><div style={{ fontSize: 11, color: C.dim }}>Проблема #1</div><div style={{ fontSize: 15, fontWeight: 700, color: C.red }}>Колёса ломаются</div><p style={{ ...sP, fontSize: 12, margin: "4px 0 0" }}>40% негативов</p></div>
            <div style={{ ...sCard, borderLeft: `3px solid ${C.amber}` }}><div style={{ fontSize: 11, color: C.dim }}>Проблема #2</div><div style={{ fontSize: 15, fontWeight: 700, color: C.amber }}>Замок — брак</div><p style={{ ...sP, fontSize: 12, margin: "4px 0 0" }}>20% негативов</p></div>
            <div style={{ ...sCard, borderLeft: `3px solid ${C.pink}` }}><div style={{ fontSize: 11, color: C.dim }}>Проблема #3</div><div style={{ fontSize: 15, fontWeight: 700, color: C.pink }}>Запах пластика</div><p style={{ ...sP, fontSize: 12, margin: "4px 0 0" }}>15% негативов</p></div>
          </div>
          <Quote text="Не выдержал даже одной поездки — колесо отлетело. Очень хлипкие колёса." rating={1} />
          <Quote text="Бумага прочнее этого чемодана. Рассыпался при укладке вещей." rating={1} />
          <Quote text="Передний доступ к загрузке — фаворит! Качество супер, лёгкие и вместительные." rating={5} />

          <h3 style={sH3}>Камеры — главные жалобы</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
            <div style={{ ...sCard, borderLeft: `3px solid ${C.red}` }}><div style={{ fontSize: 11, color: C.dim }}>Проблема #1</div><div style={{ fontSize: 15, fontWeight: 700, color: C.red }}>WiFi отваливается</div><p style={{ ...sP, fontSize: 12, margin: "4px 0 0" }}>30% негативов</p></div>
            <div style={{ ...sCard, borderLeft: `3px solid ${C.amber}` }}><div style={{ fontSize: 11, color: C.dim }}>Проблема #2</div><div style={{ fontSize: 15, fontWeight: 700, color: C.amber }}>Видео ≠ заявленному</div><p style={{ ...sP, fontSize: 12, margin: "4px 0 0" }}>25% негативов</p></div>
            <div style={{ ...sCard, borderLeft: `3px solid ${C.pink}` }}><div style={{ fontSize: 11, color: C.dim }}>Проблема #3</div><div style={{ fontSize: 15, fontWeight: 700, color: C.pink }}>Приложение — мусор</div><p style={{ ...sP, fontSize: 12, margin: "4px 0 0" }}>15% негативов</p></div>
          </div>
          <Quote text="WiFi 3 метров — дальше не держит. Потеря каждые 2 часа." rating={2} />
          <Quote text="Камера не видит QR-код. Просто лежит без дела." rating={1} />
          <Quote text="Imou — motion detection работает на ура. Автоматически определила ориентацию." rating={5} />
        </Section>

        {/* ═══ SECTION 4: TRENDS ═══ */}
        <Section id="sec-trends" title="4. Тренды ShopHunter — что залетает прямо сейчас">
          <p style={sP}>Стратегия: не изобретать — брать то, что уже залетает на Amazon, и переносить на Kaspi.</p>

          <DataTable headers={["Модель", "Выручка/мес", "Тренд", "Фишка", "Цена Kaspi"]} rows={[
            ["Front-Open Carry-On", "$254K", "+908% за неделю!", "Передний доступ + USB", "25-35K"],
            ["NOBL Award-Winning", "$1M", "Стабильно", "USB + подстаканник + phone mount", "35-50K"],
            ["Carry-On Closet", "$236K", "Стабильно", "Встроенный организатор", "40-55K"],
            ["Aesthetic Stepper", "$356K", "Пик янв → стабильно", "Пастельные цвета (лаванда)", "25-35K"],
          ]} highlight={0} />

          <div style={{ ...sCard, borderLeft: `3px solid ${C.green}` }}>
            <h3 style={{ ...sH3, margin: "0 0 8px", color: C.green }}>Carry-On с передним доступом — #1 приоритет</h3>
            <p style={sP}>+908% за неделю на Amazon. На Kaspi передний доступ есть только у BRAUER за 146K. AYOVA может дать это за 25-35K — в 4x дешевле.</p>
          </div>

          <div style={{ ...sCard, borderLeft: `3px solid ${C.accent}` }}>
            <h3 style={{ ...sH3, margin: "0 0 8px", color: C.accent }}>Пастельный степпер — голубой океан</h3>
            <p style={sP}>$356K/мес на Amazon. На Kaspi все степперы чёрные/серые. Лавандовый/мятный BRAVAX = Instagram-контент = органическая реклама. ЦА — девушки 20-35.</p>
          </div>
        </Section>

        {/* ═══ SECTION 5: MKTU ═══ */}
        <Section id="sec-mktu" title="5. Товарные знаки и МКТУ">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            <div style={sCard}>
              <h3 style={{ ...sH3, margin: "0 0 12px" }}>BRAVAX</h3>
              <p style={{ ...sP, fontSize: 12 }}>Словесный знак (белый/чёрный/серый)</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <span style={sBadge(C.blue)}>Класс 07</span>
                <span style={sBadge(C.blue)}>Класс 09</span>
                <span style={sBadge(C.blue)}>Класс 11</span>
              </div>
            </div>
            <div style={sCard}>
              <h3 style={{ ...sH3, margin: "0 0 12px" }}>AYOVA</h3>
              <p style={{ ...sP, fontSize: 12 }}>Графический знак (красный квадрат). Заявка #148654</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <span style={sBadge(C.pink)}>08</span>
                <span style={sBadge(C.pink)}>09</span>
                <span style={sBadge(C.pink)}>11</span>
                <span style={sBadge(C.pink)}>18</span>
                <span style={sBadge(C.pink)}>22</span>
                <span style={sBadge(C.pink)}>25</span>
              </div>
            </div>
          </div>

          <DataTable headers={["Ниша", "Класс МКТУ", "BRAVAX", "AYOVA", "Решение"]} rows={[
            ["Чемоданы", "18", "—", "ЕСТЬ", "AYOVA"],
            ["Степперы", "28", "—", "—", "РАСШИРИТЬ BRAVAX!"],
            ["Камеры", "09", "ЕСТЬ", "ЕСТЬ", "BRAVAX"],
            ["Гантели (бонус)", "28", "—", "—", "Тот же класс, что степперы"],
          ]} highlight={1} />

          <div style={{ ...sCard, borderLeft: `3px solid ${C.red}`, marginTop: 16 }}>
            <h3 style={{ ...sH3, margin: "0 0 8px", color: C.red }}>БЛОКЕР: Степперы — класс 28 отсутствует</h3>
            <p style={sP}>Ни один ТЗ не покрывает класс 28 (спортивные товары). Необходимо расширить BRAVAX на класс 28. Срок: 3-6 мес, стоимость: ~100-150K KZT. Пока идёт процедура — продавать без закрытия бренда.</p>
          </div>
        </Section>

        {/* ═══ SECTION 6: HIDDEN GEMS ═══ */}
        <Section id="sec-hidden" title="6. Скрытые растущие ниши">
          <p style={sP}>Скрининг 73 000+ ниш по фильтрам: growing x leaf x low sellers x high rev/merchant.</p>

          <div style={{ ...sCard, borderTop: `3px solid ${C.cyan}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ ...sH3, margin: 0 }}>Смарт-очки — 0 → 168M за 14 мес</h3>
              <span style={sBadge(C.cyan)}>Наблюдать</span>
            </div>
            <p style={sP}>Самый быстрорастущий товар на Kaspi. Ниша не существовала до января 2025. Ray-Ban Meta = 75%, но закрытые OEM-бренды (Ravilo 8M, Rokid 7M) уже работают. МКТУ 09 покрыт. Зайти как 4-ю позицию при росте до 300M+.</p>
          </div>

          <div style={{ ...sCard, borderTop: `3px solid ${C.green}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ ...sH3, margin: 0 }}>Гантели — бонус к BRAVAX</h3>
              <Verdict type="yes" text="Рекомендуется" />
            </div>
            <p style={sP}>178M/мес, 16 000 заказов, средний чек 11K. Тот же класс МКТУ 28, что и степперы. Кросс-продажи: покупатель степпера → гантели BRAVAX. Пастельные гантели = уникальность. Инвестиция: 500K-1M.</p>
            <DataTable headers={["Бренд", "Выручка", "Продавцов", "Модель"]} rows={[
              ["Sport&Fitness", "78M", "16", "Открытый"],
              ["Без бренда", "44M", "20", "—"],
              ["MFIT", "16M", "1", "Закрытый"],
              ["ART FiT", "5M", "1", "Закрытый"],
            ]} />
          </div>
        </Section>

        {/* ═══ SECTION 7: PLAN ═══ */}
        <Section id="sec-plan" title="7. Финальный план действий">

          <DataTable headers={["Направление", "Бюджет", "Бренд", "МКТУ", "Закупка", "Пик продаж"]} rows={[
            ["Чемоданы", "2.5M", "AYOVA", "18 (есть)", "Мар-Апр", "Май-Сент"],
            ["Степперы", "1.5M", "BRAVAX", "28 (расширить!)", "Апр-Май", "Окт-Фев"],
            ["Камеры", "2.0M", "BRAVAX", "09 (есть)", "Апрель", "Круглый год"],
            ["Гантели (бонус)", "0.5-1M", "BRAVAX", "28 (тот же)", "Апрель", "Круглый год"],
          ]} />

          <div style={{ ...sCard, background: `${C.green}08`, borderColor: `${C.green}30` }}>
            <h3 style={{ ...sH3, margin: "0 0 12px", color: C.green }}>Срочные действия (Апрель 2026)</h3>
            <div style={{ fontSize: 13, lineHeight: 2, color: "#ccc" }}>
              <div>1. Подать заявку на расширение BRAVAX на класс 28 МКТУ</div>
              <div>2. Закрыть AYOVA на Kaspi для категории «Чемоданы»</div>
              <div>3. Закрыть BRAVAX на Kaspi для категории «Камеры»</div>
              <div>4. Найти OEM-фабрики: carry-on с USB + пастельные степперы</div>
              <div>5. Заказать образцы (2-3 варианта каждого)</div>
              <div>6. Подготовить контент: фото, видео, инфографика</div>
            </div>
          </div>

          <div style={{ marginTop: 24, padding: "20px 24px", background: `${C.accent}08`, borderRadius: 12, border: `1px solid ${C.accent}30` }}>
            <p style={{ ...sP, margin: 0, fontSize: 13, color: C.dim }}>
              Данные: <strong style={{ color: C.text }}>RedStat API</strong> (ClickHouse, 73 000+ ниш, нояб 2024 - фев 2026) + <strong style={{ color: C.text }}>ShopHunter</strong> (Amazon трекинг).
              Отзывы: живые отзывы покупателей Kaspi.kz.
            </p>
          </div>
        </Section>

      </div>
    </div>
  );
}
