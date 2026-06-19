"use client";

import { useState } from "react";
import Link from "next/link";

/* ───── design tokens (consistent with ZBody report) ───── */
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

/* ───── Bar Chart (CSS) ───── */
function BarChart({ data, maxVal, color, unit }: { data: { label: string; value: number }[]; maxVal: number; color: string; unit?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 11, color: C.dim, width: 110, textAlign: "right", flexShrink: 0 }}>{d.label}</span>
          <div style={{ flex: 1, height: 22, background: `${color}11`, borderRadius: 4, overflow: "hidden", position: "relative" }}>
            <div style={{ width: `${Math.max((d.value / maxVal) * 100, 1)}%`, height: "100%", background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: 4, transition: "width 0.8s ease" }} />
          </div>
          <span style={{ fontSize: 11, color: C.text, width: 80, textAlign: "right", fontFamily: "monospace", flexShrink: 0 }}>
            {d.value >= 1000000000 ? (d.value / 1000000000).toFixed(1) + "B" : d.value >= 1000000 ? (d.value / 1000000).toFixed(0) + "M" : d.value >= 1000 ? (d.value / 1000).toFixed(0) + "K" : d.value}
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

/* ───── Recommendation Card ───── */
function RecCard({ priority, niche, size, growth, leader, action, color }: { priority: string; niche: string; size: string; growth: string; leader: string; action: string; color: string }) {
  return (
    <div style={{ ...sCard, borderLeft: `4px solid ${color}`, padding: "16px 20px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color, marginRight: 10, letterSpacing: "0.04em" }}>{priority}</span>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{niche}</span>
        </div>
        <div style={{ fontSize: 12, color: C.dim, fontFamily: "monospace" }}>{size} · {growth}</div>
      </div>
      <div style={{ fontSize: 12, color: C.dim, marginTop: 8 }}>
        <strong style={{ color: C.text }}>Лидер:</strong> {leader}
      </div>
      <div style={{ fontSize: 13, color: "#ccc", marginTop: 6, lineHeight: 1.6 }}>{action}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/*                  MAIN PAGE                      */
/* ═══════════════════════════════════════════════ */
export default function KaspiHaircareReport() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ═══ Header ═══ */}
        <div style={{ marginBottom: 16 }}>
          <Link href="/" style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}>&larr; kasymzhanov.com</Link>
        </div>

        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, background: `${C.cyan}18`, color: C.cyan, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", marginBottom: 16, textTransform: "uppercase" }}>
            Enterprise market intelligence
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Hair Care на Kaspi.kz
          </h1>
          <p style={{ color: "#ccc", fontSize: 15, margin: "12px 0 0" }}>
            Детальный разбор 9 функциональных ниш ухода за волосами + барбершоп-сегмент: размер рынка, сезонность, конкуренты, цены, стратегия входа
          </p>
          <p style={{ color: C.dim, fontSize: 14, margin: "12px 0 0" }}>
            Подготовил <strong style={{ color: C.text }}>Алмас Касымжанов</strong>
          </p>
          <p style={{ color: C.dim, fontSize: 13, margin: "4px 0 0" }}>
            Источник: <strong style={{ color: C.cyan }}>RedStat</strong> · агрегированная аналитика Kaspi.kz
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, color: C.dim, flexWrap: "wrap" }}>
            <span>Версия: <strong style={{ color: C.text }}>v1.0</strong></span>
            <span>Дата: <strong style={{ color: C.text }}>Май 2026</strong></span>
            <span>Период данных: <strong style={{ color: C.text }}>Ноя 2024 — Фев 2026 (16 мес)</strong></span>
            <span>Статус: <strong style={{ color: C.green }}>Конфиденциально</strong></span>
          </div>
        </div>

        {/* ═══ TOC ═══ */}
        <div style={{ ...sCard, marginBottom: 48, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.dim, marginBottom: 12 }}>Содержание</div>
          {[
            ["sec-1", "1. Executive Summary"],
            ["sec-2", "2. Дерево ниш и определения"],
            ["sec-3", "3. Рынок «Уход за волосами»"],
            ["sec-4", "4. Сезонность — когда заходить ⭐"],
            ["sec-5", "5. Детальный разбор 9 ниш"],
            ["sec-6", "6. Барбершоп-сегмент (отдельный TAM 195M)"],
            ["sec-7", "7. Карта конкурентов"],
            ["sec-8", "8. Ценовые сегменты P1-P5"],
            ["sec-9", "9. Стратегия входа"],
            ["sec-10", "10. Методология"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ display: "block", fontSize: 13, color: C.accent, textDecoration: "none", padding: "4px 0" }}>{label}</a>
          ))}
        </div>

        {/* ═══ 1. Executive Summary ═══ */}
        <Section id="sec-1" title="1. Executive Summary">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            <MetricCard label="Размер рынка L2" value="2 013M" sub="KZT/мес · фев 2026" color={C.accent} />
            <MetricCard label="Рост YoY" value="+77%" sub="4 мес 2025/26 vs 2024/25" color={C.green} />
            <MetricCard label="L3 категорий" value="13" sub="leaf-категории Kaspi" color={C.pink} />
            <MetricCard label="Активных SKU" value="~7 453" sub="фев 2026" color={C.amber} />
          </div>

          <div style={{ ...sCard, borderColor: C.green, borderWidth: 2 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green, fontSize: 18 }}>Возможность</h3>
            <p style={sP}>
              <strong style={{ color: C.text }}>«Уход за волосами» — 3-я по выручке beauty-подкатегория на Kaspi</strong> после «Уход за лицом» (2 919M) и «Техника для красоты» (2 221M). По количеству продавцов и брендов — самая массовая beauty-категория (~2 075 продавцов, ~939 брендов в L3).
            </p>
            <p style={sP}>
              <strong style={{ color: C.cyan }}>Ключевое открытие:</strong> премиум-сегмент P5 (median 12 000 KZT) даёт <strong style={{ color: C.text }}>43.6% выручки шампуней</strong>. Mass-сегмент P1-P2 (до 2 500 KZT) — только 20%. <em style={{ color: C.pink, fontStyle: "normal" }}>Большая часть денег — в премиуме</em>, что нетипично для FMCG.
            </p>
          </div>

          <h3 style={sH3}>Размер 9 функциональных ниш (приоритизировано)</h3>
          <DataTable
            headers={["#", "Ниша", "Выручка/мес", "YoY", "Лидер", "Приоритет"]}
            rows={[
              [1, "Уход за волосами (шампуни/маски/уход/сыв.)", "1 393M", "+75%", "elline / Tashe", "🟢🟢🟢"],
              [2, "Масла и сыворотки", "147M", "n/a", "Tashe (39M)", "🟢🟢"],
              [3, "Стайлинг (воск/гель/лак/sea salt)", "125M", "+74%", "NISHMAN / TIGI", "🟡"],
              [4, "Восстановление волос", "99M", "n/a", "VOIS (22M)", "🟢🟢"],
              [5, "Кератиновый уход", "93M", "n/a", "Semily / NISHMAN", "🟢🟢"],
              [6, "Уход против выпадения", "65M", "n/a", "Vichy (11M)", "🟢🟢🟢"],
              [7, "Увлажнение", "51M", "n/a", "Tashe (10M)", "🟡"],
              [8, "Мужская / barber", "37M", "n/a", "Vichy / Kirkland", "🟢"],
              [9, "Термозащита", "22M", "n/a", "Tashe / Semily", "🟢🟢"],
            ]}
          />

          <h3 style={sH3}>Три ключевые рекомендации</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <RecCard
              priority="ПРИОРИТЕТ #1"
              niche="Войти в топ-10 шампуней парным SKU (шампунь + маска)"
              size="1 393M/мес"
              growth="+75% YoY"
              leader="elline (16% L3), Tashe, Vichy"
              action="Две стратегии: Volume play (P2-P3, ASP 2 000-4 000) или Margin play (P4-P5, ASP 6 000-14 000 — здесь 60%+ выручки рынка). Цель — топ-5 по новым отзывам за 90 дней для буста ранжирования."
              color={C.green}
            />
            <RecCard
              priority="ПРИОРИТЕТ #2"
              niche="Премиум-вертикаль anti-fall + keratin"
              size="65M + 93M = 158M"
              growth="n/a"
              leader="Vichy (anti-fall), Semily (keratin) — лидеров с долей >15% нет"
              action="Anti-fall: ASP 3 500-6 500, white space — caffeine/peptides шампунь в P4-P5. Keratin: 61M по keyword + 32M в L3 06716 (PRO составы) — двойная B2C/B2B стратегия."
              color={C.accent}
            />
            <RecCard
              priority="ПРИОРИТЕТ #3"
              niche="Open Field — термозащита"
              size="22M/мес"
              growth="n/a"
              leader="Нет явного лидера (топ-15 все <3M)"
              action="106 SKU всего — самая открытая ниша из 9. Можно стать №1 за 6 месяцев. Кросс-промо с «Техникой для красоты» (2 221M/мес) как media-mix."
              color={C.cyan}
            />
          </div>

          <div style={{ ...sCard, background: `${C.red}08`, borderColor: C.red, marginTop: 24 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.red }}>Что не делать</h3>
            <ul style={{ ...sP, paddingLeft: 20 }}>
              <li><strong style={{ color: C.text }}>Не входить с краской</strong> — Loreal Paris #1 + Garnier #4 (один владелец) занимают 19% L3 краски. ESTEL и Kapous закрывают PRO.</li>
              <li><strong style={{ color: C.text }}>Не заходить только в сухие шампуни</strong> — Batiste #1, весь рынок 12M/мес. Слишком узко.</li>
              <li><strong style={{ color: C.text }}>Не делать просто «увлажняющий шампунь»</strong> без второго USP — покупатель не платит премиум только за «увлажнение». Нужен hero-claim.</li>
            </ul>
          </div>
        </Section>

        {/* ═══ 2. Дерево ниш ═══ */}
        <Section id="sec-2" title="2. Дерево ниш и определения">
          <p style={sP}>
            <strong style={{ color: C.text }}>L1:</strong> Красота и здоровье (id 00299) — 611B KZT агрегата за 16 мес.<br />
            <strong style={{ color: C.text }}>L2:</strong> Уход за волосами (id 00687) — 2 013M/мес (фев 2026), 3-я по beauty.
          </p>

          <h3 style={sH3}>13 L3 leaf-категорий (фев 2026)</h3>
          <DataTable
            headers={["#", "ID", "Категория", "Выручка/мес", "Заказов", "SKU", "Продавцов", "Брендов"]}
            rows={[
              [1, "00689", "Шампуни для волос", "630M", "138 266", "1 496", 597, 384],
              [2, "06186", "Средства по уходу за волосами", "451M", "97 358", 668, 384, 224],
              [3, "00692", "Маски и бальзамы для волос", "300M", "76 773", 950, 379, 226],
              [4, "01205", "Краска и оттеночные средства", "161M", "62 701", 909, 182, 94],
              [5, "02643", "Аксессуары для волос", "151M", "285 105", "2 095", 953, 187],
              [6, "01465", "Средства для укладки", "125M", "34 292", 354, 173, 91],
              [7, "01185", "Расчёски и щётки для волос", "70M", "74 715", 557, 356, 132],
              [8, "06716", "Составы для выпрямления и завивки", "32M", "2 238", 50, 36, 31],
              [9, "06912", "Бигуди", "27M", "22 212", 147, 111, 37],
              [10, "05118", "Скрабы и пилинги для кожи головы", "19M", "6 755", 38, 44, 26],
              [11, "02270", "Уход за бородой и усами", "18M", "2 771", 45, 32, 32],
              [12, "01255", "Окислители для краски", "17M", "7 929", 98, 61, 29],
              [13, "00690", "Сухие шампуни для волос", "12M", "4 688", 46, 37, 22],
              ["", "", "ИТОГО L2", "2 013M", "815 803", "7 453", "—", "—"],
            ]}
            highlight={13}
          />

          <h3 style={sH3}>9 функциональных ниш — маппинг на каталог Kaspi</h3>
          <p style={sP}>
            Это <strong style={{ color: C.text }}>не отдельные категории в каталоге Kaspi</strong> — это функциональные сегменты, выделенные через ключевые слова в названиях SKU. Покупатель ищет именно так («шампунь с кератином», «термозащита спрей»).
          </p>
          <DataTable
            headers={["#", "Ниша", "Где живёт в каталоге", "Метод выделения"]}
            rows={[
              [1, "Уход за волосами (общий)", "Шампуни + Маски + Средства по уходу + Сухие", "Сумма L3"],
              [2, "Стайлинг", "Средства для укладки + кросс", "L3 01465 + keyword: воск/гель/wax/paste/pomade/sea salt"],
              [3, "Термозащита", "Кросс (Уход за волосами + Укладка)", "Keyword: термозащит/thermal/heat protect"],
              [4, "Масла и сыворотки", "Маски + Уход за волосами + Стайлинг", "Keyword: масло/сыворотк/argan/jojoba/serum"],
              [5, "Мужская / barber", "Уход за бородой + кросс", "L3 02270 + keyword: мужск/men/barber/бород"],
              [6, "Уход против выпадения", "Кросс", "Keyword: против выпадения/anti-fall/укрепляющ"],
              [7, "Восстановление волос", "Кросс", "Keyword: восстан/repair/damage/поврежд"],
              [8, "Увлажнение", "Кросс", "Keyword: увлажн/moisture/hydrat"],
              [9, "Кератиновый уход", "Кросс + L3 06716", "Keyword: керати[нм]/keratin"],
            ]}
          />
        </Section>

        {/* ═══ 3. Рынок ═══ */}
        <Section id="sec-3" title="3. Рынок «Уход за волосами»">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
            <MetricCard label="Выручка L2/мес" value="2 013M" sub="KZT, фев 2026" color={C.accent} />
            <MetricCard label="Заказов/мес" value="816K" sub="по 13 L3" color={C.green} />
            <MetricCard label="Брендов L3" value="~1 515" sub="с дублями" color={C.pink} />
          </div>

          <h3 style={sH3}>Топ-5 L3 по выручке</h3>
          <BarChart
            data={[
              { label: "Шампуни", value: 630000000 },
              { label: "Средства по уходу", value: 451000000 },
              { label: "Маски и бальзамы", value: 300000000 },
              { label: "Краска", value: 161000000 },
              { label: "Аксессуары", value: 151000000 },
              { label: "Укладка", value: 125000000 },
            ]}
            maxVal={700000000}
            color={C.accent}
            unit="KZT"
          />

          <h3 style={sH3}>YoY-рост: ноя-фев 2024/25 vs 2025/26</h3>
          <DataTable
            headers={["Категория", "4 мес 2024/25", "4 мес 2025/26", "YoY"]}
            rows={[
              ["Шампуни для волос", "871M", "1 568M", "+80%"],
              ["Средства по уходу", "597M", "1 110M", "+86%"],
              ["Маски и бальзамы", "459M", "726M", "+58%"],
              ["Краска для волос", "183M", "377M", "+106%"],
              ["Аксессуары для волос", "169M", "335M", "+98%"],
              ["Средства для укладки", "176M", "306M", "+74%"],
              ["Расчёски и щётки", "100M", "186M", "+86%"],
              ["Скрабы для кожи головы", "33M", "61M", "+86%"],
              ["L2 ИТОГО", "2 717M", "4 808M", "+77%"],
            ]}
            highlight={8}
          />

          <h3 style={sH3}>Концентрация: кто реально владеет нишами</h3>
          <DataTable
            headers={["Ниша", "Топ-1 бренд", "Доля топ-1", "Топ-5 доля", "Тип конкуренции"]}
            rows={[
              ["Шампуни", "elline", "16%", "29%", "🟢 Фрагментирована"],
              ["Средства по уходу", "Tashe", "13%", "39%", "🟢 Фрагментирована"],
              ["Маски и бальзамы", "Concept", "8%", "27%", "🟢 Фрагментирована"],
              ["Краска", "Loreal Paris", "11%", "39%", "🟡 Олигополия"],
              ["Стайлинг", "TIGI", "13%", "47%", "🟡 Олигополия"],
              ["Сухие шампуни", "Batiste", "28%", "58%", "🔴 Доминант"],
              ["Бигуди", "Без бренда", "65%", "75%", "🔴 Доминант (no-brand)"],
              ["Окислители", "ESTEL", "20%", "55%", "🟡 Олигополия"],
            ]}
          />
          <p style={{ ...sP, fontSize: 13, color: C.dim, fontStyle: "italic" }}>
            🟢 Фрагментирована = легко зайти с новым брендом (никто не занимает &gt;40% топ-500)<br />
            🟡 Олигополия = топ-5 контролирует 40-60%<br />
            🔴 Доминант = лидер занимает 25%+ или топ-5 &gt;60%
          </p>
        </Section>

        {/* ═══ 4. Сезонность ═══ */}
        <Section id="sec-4" title="4. Сезонность — когда заходить">
          <div style={{ ...sCard, background: `${C.amber}08`, borderColor: C.amber, borderWidth: 2, marginBottom: 24 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.amber, fontSize: 18 }}>⚠️ Важно: данные обрываются на февралe 2026</h3>
            <p style={sP}>
              Последний доступный срез — <strong style={{ color: C.text }}>фев 2026</strong>. Это значит:
            </p>
            <ul style={{ ...sP, paddingLeft: 20 }}>
              <li>Для месяцев <strong style={{ color: C.text }}>Ноя-Фев</strong> у нас 2 полных годовых цикла (2024-25 и 2025-26)</li>
              <li>Для месяцев <strong style={{ color: C.text }}>Мар-Окт</strong> только 1 цикл (2025)</li>
              <li>Глядя только на последние месяцы (Ноя 2025 → Фев 2026), можно ошибочно решить, что рынок «замедлился». На самом деле <strong style={{ color: C.text }}>Ноя-Фев — это сезонное дно для большинства ниш</strong>. Реальный пик — Авг-Окт.</li>
            </ul>
          </div>

          <h3 style={sH3}>Universal pattern: где пикуют ниши beauty на Kaspi</h3>
          <p style={sP}>
            <strong style={{ color: C.text }}>Большинство ниш ухода за волосами имеют один универсальный паттерн:</strong> пик в Августе-Октябре (Kaspi Жума / Black Friday + back-to-routine), дно в Декабре (новогодние подарочные наборы оттягивают бюджет) или Апреле (post-8 марта спад).
          </p>

          <h3 style={sH3}>Season Index по 13 L3-категориям hair care + 3 L3 «Товары для бритья»</h3>
          <p style={{ ...sP, fontSize: 12, color: C.dim, fontStyle: "italic" }}>
            Season Index = средняя выручка месяца / годовая средняя × 100. Значение 100 = типичный месяц. &gt;120 = пик (зелёный), &lt;80 = дно (красный). Серое = в норме.
          </p>

          <div style={{ overflowX: "auto", marginBottom: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr style={{ background: C.surface }}>
                  <th style={{ padding: "8px 10px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>Ниша</th>
                  {["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"].map(m => (
                    <th key={m} style={{ padding: "8px 6px", textAlign: "center", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10, minWidth: 40 }}>{m}</th>
                  ))}
                  <th style={{ padding: "8px 10px", textAlign: "left", color: C.dim, fontWeight: 600, borderBottom: `1px solid ${C.border}`, fontSize: 10 }}>Пик</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Шампуни для волос", idx: [90, 103, 89, 88, 97, 91, 111, 123, 115, 125, 88, 79], peak: "Окт", section: "💆 Hair" },
                  { name: "Средства по уходу", idx: [101, 107, 91, 84, 88, 92, 103, 115, 109, 123, 97, 90], peak: "Окт", section: "💆 Hair" },
                  { name: "Маски и бальзамы", idx: [86, 90, 92, 90, 97, 103, 117, 127, 112, 117, 88, 81], peak: "Авг", section: "💆 Hair" },
                  { name: "Краска для волос", idx: [89, 100, 89, 89, 92, 101, 113, 121, 109, 123, 88, 86], peak: "Окт", section: "💆 Hair" },
                  { name: "Аксессуары для волос", idx: [78, 130, 116, 72, 75, 80, 92, 144, 100, 117, 83, 112], peak: "Авг", section: "💆 Hair" },
                  { name: "Средства для укладки", idx: [91, 99, 94, 94, 92, 96, 102, 123, 109, 118, 89, 93], peak: "Авг", section: "💆 Hair" },
                  { name: "Расчёски и щётки", idx: [99, 107, 92, 78, 75, 88, 97, 128, 113, 122, 93, 108], peak: "Авг", section: "💆 Hair" },
                  { name: "Выпрямление/завивка", idx: [66, 81, 82, 100, 101, 129, 116, 150, 105, 110, 92, 69], peak: "Авг ⚡", section: "💆 Hair" },
                  { name: "Бигуди", idx: [107, 110, 104, 86, 74, 81, 87, 125, 109, 113, 100, 105], peak: "Авг", section: "💆 Hair" },
                  { name: "Скрабы для кожи головы", idx: [112, 115, 102, 98, 79, 73, 85, 89, 98, 124, 121, 105], peak: "Окт", section: "💆 Hair" },
                  { name: "Уход за бородой", idx: [114, 127, 82, 73, 77, 89, 88, 101, 96, 123, 104, 124], peak: "Фев", section: "💈 Barber" },
                  { name: "Окислители для краски", idx: [89, 97, 84, 89, 90, 110, 115, 123, 103, 116, 91, 93], peak: "Авг", section: "💆 Hair" },
                  { name: "Сухие шампуни", idx: [93, 102, 104, 103, 93, 79, 87, 110, 120, 139, 92, 78], peak: "Окт", section: "💆 Hair" },
                  { name: "Бритвенные станки", idx: [91, 104, 90, 85, 100, 88, 104, 119, 118, 120, 87, 93], peak: "Окт", section: "🪒 Shave" },
                  { name: "Средства до/после бритья", idx: [84, 109, 91, 89, 117, 81, 106, 121, 112, 118, 78, 94], peak: "Авг", section: "🪒 Shave" },
                ].map((row, ri) => (
                  <tr key={ri}>
                    <td style={{ padding: "8px 10px", textAlign: "left", color: C.text, borderBottom: `1px solid ${C.border}20`, fontSize: 11, fontWeight: 500 }}>
                      <span style={{ fontSize: 9, color: C.dim, marginRight: 6 }}>{row.section}</span>
                      {row.name}
                    </td>
                    {row.idx.map((v, vi) => {
                      const bg = v >= 120 ? `${C.green}30` : v >= 110 ? `${C.green}15` : v <= 80 ? `${C.red}30` : v <= 90 ? `${C.red}15` : "transparent";
                      const fg = v >= 120 ? C.green : v <= 80 ? C.red : C.text;
                      return (
                        <td key={vi} style={{ padding: "6px 6px", textAlign: "center", borderBottom: `1px solid ${C.border}20`, background: bg, color: fg, fontSize: 11, fontWeight: v >= 120 || v <= 80 ? 700 : 400, fontVariantNumeric: "tabular-nums" }}>
                          {v}
                        </td>
                      );
                    })}
                    <td style={{ padding: "8px 10px", textAlign: "left", color: C.amber, borderBottom: `1px solid ${C.border}20`, fontSize: 11, fontWeight: 600 }}>{row.peak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 style={sH3}>Ключевые сезонные инсайты</h3>

          <div style={{ ...sCard, borderLeft: `4px solid ${C.green}`, marginBottom: 12 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.green, margin: "0 0 8px" }}>🟢 Главное окно: Август-Октябрь (Kaspi Жума)</h4>
            <p style={{ ...sP, margin: 0, fontSize: 13 }}>
              <strong style={{ color: C.text }}>13 из 16 категорий пикуют в Авг-Окт</strong> (индекс 117-150). Это сезон Kaspi Жума + back-to-routine после лета. Шампуни +25%, маски +27%, краска +23%, бритвенные +20% от средней.
            </p>
            <p style={{ ...sP, margin: "8px 0 0", fontSize: 13 }}>
              <strong style={{ color: C.green }}>Что делать:</strong> запускать новые SKU в <strong style={{ color: C.text }}>июне-июле</strong>, чтобы к августу набрать первые отзывы и быть готовым к peak-сезону. Запуск в августе уже поздно — конкуренты будут на ранжированной высоте.
            </p>
          </div>

          <div style={{ ...sCard, borderLeft: `4px solid ${C.red}`, marginBottom: 12 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.red, margin: "0 0 8px" }}>🔴 Сезонное дно: Декабрь (НГ-наборы) и Апрель (post-8 марта)</h4>
            <p style={{ ...sP, margin: 0, fontSize: 13 }}>
              <strong style={{ color: C.text }}>Декабрь:</strong> большинство категорий уход за волосами -15..-20% (шампуни 79, маски 81, сухие шампуни 78). Покупатели переключаются на L2 «Наборы косметики» (декабрьский пик 1 126M).
            </p>
            <p style={{ ...sP, margin: "8px 0 0", fontSize: 13 }}>
              <strong style={{ color: C.text }}>Апрель:</strong> вторая яма (-15..-25%) после 8 марта. Расчёски, аксессуары, бритвенные станки, уход за бородой — все падают.
            </p>
          </div>

          <div style={{ ...sCard, borderLeft: `4px solid ${C.cyan}`, marginBottom: 12 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.cyan, margin: "0 0 8px" }}>💈 Уход за бородой — единственное исключение из правила</h4>
            <p style={{ ...sP, margin: 0, fontSize: 13 }}>
              Это <strong style={{ color: C.text }}>обратная сезонность</strong>: пик в <strong style={{ color: C.amber }}>феврале (127)</strong> и декабре (124), дно в апреле (73). Гипотеза: 14 февраля (День святого Валентина) + Новый год — это пики «подарочного» beard care мужчинам от женщин.
            </p>
            <p style={{ ...sP, margin: "8px 0 0", fontSize: 13 }}>
              <strong style={{ color: C.cyan }}>Что делать:</strong> для бороды запускать в <strong style={{ color: C.text }}>декабре-январе</strong>, чтобы поймать февральский всплеск.
            </p>
          </div>

          <div style={{ ...sCard, borderLeft: `4px solid ${C.amber}`, marginBottom: 12 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.amber, margin: "0 0 8px" }}>⚡ «Составы для выпрямления» — самая сезонная ниша</h4>
            <p style={{ ...sP, margin: 0, fontSize: 13 }}>
              Индекс в августе — <strong style={{ color: C.green }}>150</strong> (+50% к годовой средней), в январе — <strong style={{ color: C.red }}>66</strong> (-34%). Разрыв пик/дно — <strong style={{ color: C.text }}>2.3×</strong>. Это «летняя» категория — кератин/выпрямление делают перед отпусками.
            </p>
          </div>

          <div style={{ ...sCard, borderLeft: `4px solid ${C.pink}`, marginBottom: 12 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.pink, margin: "0 0 8px" }}>🎀 Аксессуары — два чётких пика (Фев + Авг)</h4>
            <p style={{ ...sP, margin: 0, fontSize: 13 }}>
              Февраль (130) — подарки к 8 марта, август (144) — back-to-school + Kaspi Жума. Апрель (72) — провал. Это категория с двумя продажными окнами в году.
            </p>
          </div>

          <h3 style={sH3}>«Когда заходить» — рекомендация по 9 нишам</h3>
          <DataTable
            headers={["Ниша", "Пик сезона", "Лучшее время запуска SKU", "Логика"]}
            rows={[
              ["Уход за волосами (общий)", "Авг-Окт", "Май-Июнь", "Набрать отзывы за 60-90 дней до пика"],
              ["Стайлинг", "Авг (123)", "Май-Июнь", "Back-to-school момент"],
              ["Термозащита", "Авг-Окт (косв.)", "Май", "В сезон фенов/утюжков после лета"],
              ["Масла и сыворотки", "Авг (127)", "Май-Июнь", "Post-summer dry hair recovery"],
              ["Мужская / barber", "Фев (127), Окт (123)", "Декабрь", "Поймать февральский пик подарков"],
              ["Уход против выпадения", "Авг-Окт", "Май-Июнь", "Сезонное выпадение волос осенью"],
              ["Восстановление волос", "Авг (127)", "Май-Июнь", "Post-summer damaged hair"],
              ["Увлажнение волос", "Авг (127)", "Май-Июнь", "Aftermath лета + heating"],
              ["Кератиновый уход", "Авг (150) ⚡", "Апрель-Май", "Самая сезонная — готовиться заранее"],
            ]}
          />

          <div style={{ ...sCard, background: `${C.green}08`, borderColor: C.green, marginTop: 24 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green }}>Прогноз на 2026 (на основе сезонности)</h3>
            <p style={sP}>
              Применяя season index к февральским 2 013M, можно прикинуть выручку L2 на следующие месяцы 2026:
            </p>
            <DataTable
              headers={["Месяц 2026", "Прогноз L2", "Δ от фев", "Комментарий"]}
              rows={[
                ["Март", "~1 760M", "-13%", "Сезонный спад после 8 марта"],
                ["Апрель", "~1 690M", "-16%", "Дно года для волос"],
                ["Май", "~1 770M", "-12%", "Лёгкое восстановление"],
                ["Июнь", "~1 860M", "-8%", "Подготовка к лету"],
                ["Июль", "~2 080M", "+3%", "Pre-Жума разогрев"],
                ["Август", "~2 350M", "+17%", "Kaspi Жума пик"],
                ["Сентябрь", "~2 250M", "+12%", "Back-to-routine"],
                ["Октябрь", "~2 410M", "+20%", "ГОДОВОЙ ПИК"],
                ["Ноябрь", "~1 900M", "-6%", "Сезонное снижение"],
                ["Декабрь", "~1 720M", "-15%", "НГ-наборы оттягивают бюджет"],
              ]}
              highlight={7}
            />
            <p style={{ ...sP, fontSize: 13, color: C.dim, fontStyle: "italic" }}>
              Прогноз не учитывает YoY-рост +77%. С учётом тренда роста годовой пик в октябре может достигнуть <strong style={{ color: C.text, fontStyle: "normal" }}>~3 500M+/мес</strong>.
            </p>
          </div>
        </Section>

        {/* ═══ 5. Detailed niches ═══ */}
        <Section id="sec-5" title="5. Детальный разбор 9 ниш">

          {/* 4.1 General hair care */}
          <h3 style={{ ...sH3, fontSize: 18, color: C.green, marginTop: 0 }}>4.1. Уход за волосами (общий)</h3>
          <p style={sP}>
            <strong style={{ color: C.text }}>1 393M KZT/мес</strong> · +75% YoY · 317K заказов · 3 160 активных SKU
          </p>
          <DataTable
            headers={["L3", "Выручка/мес", "Заказов", "SKU", "Лидер"]}
            rows={[
              ["Шампуни для волос", "630M", "138 266", "1 496", "elline (103M)"],
              ["Средства по уходу", "451M", "97 358", 668, "Tashe (56M)"],
              ["Маски и бальзамы", "300M", "76 773", 950, "Concept (23M)"],
              ["Сухие шампуни", "12M", "4 688", 46, "Batiste (3M)"],
            ]}
          />
          <h4 style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "16px 0 8px" }}>Топ-10 брендов (агрегат 4 L3)</h4>
          <DataTable
            headers={["#", "Бренд", "Выручка/мес", "SKU", "Заказов"]}
            rows={[
              [1, "elline", "103M", 2, "6 820"],
              [2, "Tashe", "88M", 62, "31 053"],
              [3, "Kirkland", "54M", 45, "6 883"],
              [4, "Vichy", "40M", 23, "3 151"],
              [5, "Ollin Professional", "36M", 48, "9 741"],
              [6, "Concept", "36M", 49, "8 167"],
              [7, "Zhangguang 101", "32M", 14, "1 882"],
              [8, "VOIS", "26M", 14, "3 826"],
              [9, "Semily", "25M", 35, "6 595"],
              [10, "Ederra Lab", "23M", 19, "1 481"],
            ]}
          />

          {/* 4.2 Styling */}
          <h3 style={{ ...sH3, fontSize: 18, color: C.amber, marginTop: 36 }}>4.2. Стайлинг (воск, гель, пудра, лак, sea salt spray)</h3>
          <p style={sP}>
            <strong style={{ color: C.text }}>125M KZT/мес</strong> · +74% YoY · 354 SKU · 91 бренд · Rev/SKU 353K
          </p>
          <DataTable
            headers={["#", "Бренд", "Выручка/мес", "SKU", "Доля топ-500"]}
            rows={[
              [1, "TIGI", "16M", 33, "13.1%"],
              [2, "NISHMAN", "15M", 51, "12.4%"],
              [3, "Schwarzkopf Professional", "13M", 13, "10.5%"],
              [4, "ESTEL PROFESSIONAL", "6M", 36, "5.1%"],
              [5, "TAFT", "6M", 21, "5.1%"],
              [6, "Tashe", "5M", 5, "3.9%"],
              [7, "Ollin Professional", "5M", 15, "3.9%"],
            ]}
          />
          <p style={{ ...sP, fontSize: 13 }}>
            <strong style={{ color: C.text }}>White space:</strong> sea salt spray почти отсутствует (вход через barber/casual мужчин). Hair powder — нет крупных игроков.
          </p>

          {/* 4.3 Thermal */}
          <h3 style={{ ...sH3, fontSize: 18, color: C.cyan, marginTop: 36 }}>4.3. Термозащита</h3>
          <p style={sP}>
            <strong style={{ color: C.text }}>22M KZT/мес</strong> · 106 SKU · <strong style={{ color: C.green }}>Самая открытая ниша из 9</strong> — нет явного лидера.
          </p>
          <DataTable
            headers={["#", "Бренд", "Выручка/мес", "SKU"]}
            rows={[
              [1, "Tashe", "6.8M", 9],
              [2, "Semily", "5.5M", 8],
              [3, "The Act", "2.0M", 2],
              [4, "Parli Cosmetics", "1.6M", 1],
              [5, "Compliment", "0.8M", 6],
            ]}
          />
          <p style={{ ...sP, fontSize: 13 }}>
            <strong style={{ color: C.text }}>Целевой сегмент:</strong> P3 (Средний), ASP 2 500-4 500 KZT. Спрей-термозащита 200 мл как основа портфеля.
          </p>

          {/* 4.4 Oils & Serums */}
          <h3 style={{ ...sH3, fontSize: 18, color: C.pink, marginTop: 36 }}>4.4. Масла и сыворотки</h3>
          <p style={sP}>
            <strong style={{ color: C.text }}>147M KZT/мес</strong> · 373 SKU · Кросс-категорийная ниша (преим. в Масках и Средствах по уходу).
          </p>
          <DataTable
            headers={["#", "Бренд", "Выручка/мес", "SKU"]}
            rows={[
              [1, "Tashe", "39.4M", 14],
              [2, "Vichy", "5.4M", 5],
              [3, "NISHMAN", "4.1M", 8],
              [4, "Medina", "3.9M", 5],
              [5, "Welcos", "3.8M", 9],
            ]}
          />
          <p style={{ ...sP, fontSize: 13 }}>
            <strong style={{ color: C.text }}>White space:</strong> Премиум argan-масло (cold-pressed, organic). Сыворотка с пептидами для роста волос P4-P5 (2 500-5 000 KZT).
          </p>

          {/* 4.5 Mens */}
          <h3 style={{ ...sH3, fontSize: 18, color: C.blue, marginTop: 36 }}>4.5. Мужская линия / barber</h3>
          <p style={sP}>
            <strong style={{ color: C.text }}>37M KZT/мес суммарно</strong> (L3 02270 «Уход за бородой» 18M + кросс-категория 19M)
          </p>
          <DataTable
            headers={["#", "Бренд", "Выручка/мес", "SKU"]}
            rows={[
              [1, "Без бренда", "2.5M", 13],
              [2, "Vichy", "1.9M", 1],
              [3, "Kirkland", "1.3M", 1],
              [4, "American Crew", "1.1M", 5],
              [5, "NISHMAN (бороды)", "1.0M", 13],
              [6, "PRORASO", "0.6M", 17],
            ]}
          />
          <p style={{ ...sP, fontSize: 13 }}>
            <strong style={{ color: C.text }}>White space:</strong> 3-in-1 гель + шампунь для casual мужчин (Old Spice/Axe-аналог в hair-care). Премиум beard oil европейского качества.
          </p>

          {/* 4.6 Anti-fall */}
          <h3 style={{ ...sH3, fontSize: 18, color: C.red, marginTop: 36 }}>4.6. Уход против выпадения</h3>
          <p style={sP}>
            <strong style={{ color: C.text }}>65M KZT/мес</strong> · 275 SKU · Самая платёжеспособная ниша из 9 — клиенты готовы платить за результат.
          </p>
          <DataTable
            headers={["#", "Бренд", "Выручка/мес", "SKU"]}
            rows={[
              [1, "Vichy", "10.6M", 4],
              [2, "Kirkland (Minoxidil)", "7.2M", 2],
              [3, "Anara Moyaldi", "5.8M", 1],
              [4, "DUCRAY", "4.5M", 4],
              [5, "Dodoyuri", "3.6M", 5],
            ]}
          />
          <p style={{ ...sP, fontSize: 13 }}>
            <strong style={{ color: C.text }}>White space:</strong> Шампунь от выпадения с кофеином P4 (3 000-5 000 KZT) — категория Plantur 39 в РФ. Сыворотка-ампулы 12×2 мл «курсом» P5.
          </p>

          {/* 4.7 Restore */}
          <h3 style={{ ...sH3, fontSize: 18, color: C.accent, marginTop: 36 }}>4.7. Восстановление волос</h3>
          <p style={sP}>
            <strong style={{ color: C.text }}>99M KZT/мес</strong> · 443 SKU · Самая конкурентная функциональная ниша.
          </p>
          <DataTable
            headers={["#", "Бренд", "Выручка/мес", "SKU"]}
            rows={[
              [1, "VOIS", "21.8M", 6],
              [2, "Ederra Lab", "6.9M", 8],
              [3, "Pantene", "5.7M", 9],
              [4, "Sugarlife", "5.6M", 1],
              [5, "Loreal Professionnel Paris", "5.1M", 24],
            ]}
          />
          <p style={{ ...sP, fontSize: 13 }}>
            <strong style={{ color: C.text }}>White space:</strong> Бондеры (Bond builders) типа Olaplex — пусто. Это hero-категория, которая может построить бренд.
          </p>

          {/* 4.8 Moisture */}
          <h3 style={{ ...sH3, fontSize: 18, color: C.green, marginTop: 36 }}>4.8. Увлажнение волос</h3>
          <p style={sP}>
            <strong style={{ color: C.text }}>51M KZT/мес</strong> · 166 SKU · Менее платёжеспособная — нужен hero-USP.
          </p>
          <DataTable
            headers={["#", "Бренд", "Выручка/мес", "SKU"]}
            rows={[
              [1, "Tashe", "9.9M", 5],
              [2, "Lador", "6.0M", 10],
              [3, "Vichy", "3.9M", 3],
              [4, "Prosalon", "3.1M", 6],
              [5, "BAIGARIN", "2.1M", 2],
            ]}
          />
          <p style={{ ...sP, fontSize: 13 }}>
            <strong style={{ color: C.text }}>White space:</strong> Curly hair care — растущая ЦА. На Kaspi только «Кудрявый метод» (одна KZ-марка).
          </p>

          {/* 4.9 Keratin */}
          <h3 style={{ ...sH3, fontSize: 18, color: C.amber, marginTop: 36 }}>4.9. Кератиновый уход</h3>
          <p style={sP}>
            <strong style={{ color: C.text }}>93M KZT/мес</strong> (61M keyword + 32M в L3 «Составы для выпрямления») · 663 SKU
          </p>
          <DataTable
            headers={["#", "Бренд", "Выручка/мес", "SKU"]}
            rows={[
              [1, "Semily", "6.4M", 6],
              [2, "NISHMAN", "4.3M", 13],
              [3, "Prosalon", "3.6M", 15],
              [4, "Keratine Queen", "3.4M", 34],
              [5, "MIXIT", "3.2M", 10],
            ]}
          />
          <p style={{ ...sP, fontSize: 13 }}>
            <strong style={{ color: C.text }}>Двойная стратегия:</strong> mass через Kaspi (шампунь + маска + спрей) + B2B составы для салонов 1000 мл P5.
          </p>
        </Section>

        {/* ═══ 6. Барбершоп-сегмент ═══ */}
        <Section id="sec-6" title="6. Барбершоп-сегмент (отдельный TAM 195M)">
          <p style={sP}>
            <strong style={{ color: C.text }}>Барбершоп-косметика — это отдельная скрытая ниша на Kaspi</strong>, размер 195M KZT/мес, разбросанная по 4 категориям каталога. Она пересекается с уходом за волосами (борода, стайлинг с барбер-брендами), но имеет свою динамику и конкурентов.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            <MetricCard label="TAM барбершоп-косметики" value="195M" sub="KZT/мес · фев 2026" color={C.amber} />
            <MetricCard label="YoY (бритьё)" value="+48%" sub="L2 «Товары для бритья»" color={C.green} />
            <MetricCard label="YoY (борода)" value="+51%" sub="L3 02270" color={C.cyan} />
            <MetricCard label="Брендов в сегменте" value="~250" sub="агрегат по 4 sub-market" color={C.pink} />
          </div>

          <h3 style={sH3}>Карта 4 sub-market</h3>
          <DataTable
            headers={["#", "Sub-market", "Где живёт", "Выручка/мес", "YoY", "Тип конкуренции"]}
            rows={[
              [1, "Бритвенные станки и лезвия", "L2 «Товары для бритья» (06270)", "89M", "+48%", "🔴 Доминант (Gillette 55%)"],
              [2, "Барбер-бренды в стайлинге", "L3 «Средства для укладки» ∩ whitelist", "60M", "+74%*", "🟡 Олигополия (TIGI/NISHMAN/Schwarzkopf Pro = 75%)"],
              [3, "Средства до и после бритья", "L3 01764", "22M", "+34%", "🟢 Фрагментирована"],
              [4, "Уход за бородой и усами", "L3 02270 (в L2 «Уход за волосами»)", "18M", "+51%", "🟢 Фрагментирована"],
              [5, "Мужские шампуни (кросс)", "L3 «Шампуни» ∩ male keywords", "5M", "n/a", "Almost empty"],
              [6, "Аксессуары для бритья", "L3 07052", "1M", "+36%", "Микро"],
              ["", "ИТОГО (барбер-TAM)", "—", "195M", "+48% (взв.)", "—"],
            ]}
            highlight={6}
          />

          <h3 style={sH3}>6.1. Бритвенные станки и лезвия (89M) — Gillette-доминированный рынок</h3>
          <DataTable
            headers={["#", "Бренд", "Выручка/мес", "SKU", "Доля L3"]}
            rows={[
              [1, "Gillette", "48.7M", 147, "55%"],
              [2, "Без бренда", "9.4M", 45, "11%"],
              [3, "YAMMY", "3.0M", 2, "3.4%"],
              [4, "Kai razor", "1.6M", 3, "1.8%"],
              [5, "Merant", "1.3M", 3, "1.5%"],
              [6, "Infinity", "1.3M", 6, "1.4%"],
              [7, "Xiaomi", "1.0M", 4, "1.1%"],
              [8, "Bic", "0.9M", 7, "1.0%"],
              [9, "DORCO", "0.8M", 8, "0.9%"],
            ]}
            highlight={0}
          />
          <p style={{ ...sP, fontSize: 13, color: C.dim }}>
            <strong style={{ color: C.text }}>Вердикт:</strong> не входить с своим брендом. Gillette + Без бренда занимают 66% L3 (147 SKU). YAMMY (#3) — value-набор 5K KZT. Без &gt;30% дисконта к Gillette позиционирования нет.
          </p>
          <p style={{ ...sP, fontSize: 13, color: C.dim }}>
            <strong style={{ color: C.text }}>Премиум-эффект:</strong> P5 (median 11 000 KZT) даёт 44.1% выручки L3 — аналогично шампуням. Покупатель готов платить за качество.
          </p>

          <h3 style={sH3}>6.2. Средства до и после бритья (22M) — 🟢 лучший вход для нового бренда</h3>
          <DataTable
            headers={["#", "Бренд", "Выручка/мес", "SKU", "Тип"]}
            rows={[
              [1, "NIVEA", "4.4M", 38, "Mass 🇩🇪"],
              [2, "Gillette", "3.8M", 34, "Mass 🇺🇸"],
              [3, "PRORASO", "1.8M", 34, "Italian barber 🇮🇹"],
              [4, "VASSO", "1.6M", 13, "Turkish barber 🇹🇷"],
              [5, "Arko", "1.2M", 21, "Turkish mass 🇹🇷"],
              [6, "NISHMAN", "1.1M", 31, "Turkish barber 🇹🇷"],
              [7, "Bielita-Витэкс", "0.4M", 11, "BY mass"],
              [8, "Collistar", "0.4M", 5, "Italian premium"],
            ]}
          />
          <p style={{ ...sP, fontSize: 13 }}>
            <strong style={{ color: C.text }}>White space:</strong> NIVEA + Gillette занимают 37% L3, остальные 63% — длинный хвост из 38+ брендов. Категория растёт +34% YoY, фрагментирована. Войти с премиум-линейкой «barber-grade» (after-shave lotion + cologne + balm) можно с бюджетом 15-25M KZT.
          </p>
          <p style={{ ...sP, fontSize: 13 }}>
            <strong style={{ color: C.text }}>Ценовые сегменты:</strong> P3 Средний (median 3 160 KZT) даёт 26.3% выручки — это «золотая полка». Деньги распределены равномерно по P3-P5 (P5 22.2%).
          </p>

          <h3 style={sH3}>6.3. Уход за бородой и усами (18M) — деление на 3 чётких сегмента</h3>
          <DataTable
            headers={["Сегмент", "Что это", "Выручка/мес", "SKU", "Лидеры"]}
            rows={[
              ["💉 Миноксидил для роста бороды", "Сыворотки/масла с миноксидилом 5-15%", "3.3M (18%)", 9, "Spey, Kirkland, Dr.Hair, MinoxidilMax"],
              ["💈 Классический barber care", "Beard oil, balm, wax, wash", "4.9M (27%)", 65, "PRORASO, American Crew, NISHMAN, L3VEL3"],
              ["🌀 Generic / прочее", "Generic SKU + наборы без чёткой категоризации", "10.1M (56%)", 107, "Без бренда, VASSO, ENVISHA"],
            ]}
          />
          <p style={{ ...sP, fontSize: 13, color: C.dim, fontStyle: "italic" }}>
            Важно: «уход за бородой» на Kaspi ≠ классический barber care как в США/EU. Из 18M только 27% — это PRORASO/American Crew мир. 18% это minoxidil-сегмент (биохак для роста бороды), 56% — generic из Китая.
          </p>
          <p style={{ ...sP, fontSize: 13 }}>
            <strong style={{ color: C.text }}>Топ-5 SKU:</strong> Spey Reward миноксидил 5% масло 100 мл (1.36M), Kirkland Minoxidil 5% (1.32M), Dr.Hair Beard Growth 15% (0.86M), Belviso масло для бороды 30 мл (0.76M), VASSO Beard and Mustache 75 мл (9.83K KZT, 0.74M).
          </p>

          <h3 style={sH3}>6.4. Барбер-бренды в стайлинге (60M) — крупнейшая sub-market после станков</h3>
          <p style={sP}>
            В L3 «Средства для укладки» (125M/мес) <strong style={{ color: C.text }}>48% выручки</strong> приходится на 30+ признанных барбер-брендов.
          </p>
          <DataTable
            headers={["#", "Бренд", "Выручка/мес", "SKU", "Страна", "Тип"]}
            rows={[
              [1, "TIGI", "16.4M", 33, "🇺🇸", "PRO salon"],
              [2, "NISHMAN", "15.5M", 51, "🇹🇷", "Barber"],
              [3, "Schwarzkopf Professional", "13.2M", 13, "🇩🇪", "PRO salon"],
              [4, "Кудрявый метод", "3.6M", 10, "🇰🇿", "Curly"],
              [5, "L3VEL3", "3.1M", 16, "🇹🇷", "Barber"],
              [6, "IKT", "2.6M", 4, "🇹🇷", "Barber"],
              [7, "Morgan's", "2.0M", 23, "🇬🇧", "Barber heritage"],
              [8, "American Crew", "1.6M", 13, "🇺🇸", "Barber"],
              [9, "Reuzel", "0.6M", 9, "🇳🇱", "Pomade premium"],
              [10, "Gummy Professional", "0.5M", 4, "🇹🇷", "Barber"],
            ]}
          />
          <p style={{ ...sP, fontSize: 13, color: C.dim }}>
            <strong style={{ color: C.text }}>TIGI + NISHMAN + Schwarzkopf Pro = 45M (75% барбер-стайлинга)</strong>. Все остальные — длинный хвост &lt;4M.
          </p>

          <h3 style={sH3}>6.5. Мужские шампуни (5M) — категория не сформирована</h3>
          <p style={sP}>
            Из 1 496 SKU в L3 «Шампуни» только <strong style={{ color: C.text }}>10 SKU</strong> имеют явное мужское позиционирование. Это <strong style={{ color: C.red }}>0.8% L3 (5M из 630M)</strong>. <strong style={{ color: C.text }}>Казахстанские мужчины не выбирают шампунь по гендеру</strong> — покупают семейные шампуни.
          </p>
          <p style={{ ...sP, fontSize: 13 }}>
            Единственная нишевая идея — 3-in-1 продукт (шампунь + гель + борода). Аналог Old Spice / Axe из L2 «Уход за телом» в hair-care.
          </p>

          <h3 style={sH3}>Стратегия входа в барбершоп-сегмент: 3-фазный SKU-портфель</h3>

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.green, margin: "20px 0 8px" }}>Фаза 1 (Месяцы 1-3): якорный вход</h4>
          <DataTable
            headers={["SKU", "Категория", "Целевой ASP", "Обоснование"]}
            rows={[
              ["Matte Clay 100мл", "Барбер-стайлинг", "4 500-6 500", "Универсальная барбер-категория, low-risk вход"],
              ["Beard Oil 30мл", "Уход за бородой", "3 500-5 500", "Premium beard care пуст между PRORASO и местными"],
              ["After-shave Lotion 100мл", "Средства до/после", "3 500-5 000", "Фрагментированный рынок (40 брендов)"],
            ]}
          />

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.accent, margin: "20px 0 8px" }}>Фаза 2 (Месяцы 4-6): расширение портфеля</h4>
          <DataTable
            headers={["SKU", "Категория", "Целевой ASP"]}
            rows={[
              ["Hair Pomade 100мл", "Барбер-стайлинг", "4 500-6 500"],
              ["Beard Balm 60мл", "Уход за бородой", "3 500-5 500"],
              ["Cologne/Aftershave 100мл", "Средства до/после", "5 000-9 000"],
              ["Beard Shampoo 250мл", "Уход за бородой", "2 500-4 500"],
            ]}
          />

          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.cyan, margin: "20px 0 8px" }}>Фаза 3 (Месяцы 7-12): hero-SKU и масштабирование</h4>
          <DataTable
            headers={["SKU", "Категория", "Целевой ASP", "USP"]}
            rows={[
              ["Beard Growth Serum", "Уход за бородой", "8 000-14 000", "Альтернатива миноксидилу с peptides"],
              ["Hair Powder 25мл", "Барбер-стайлинг", "4 500-6 500", "Никто не доминирует"],
              ["Sea Salt Spray 200мл", "Барбер-стайлинг", "4 000-5 500", "TIGI лидирует, конкуренция слаба"],
            ]}
          />

          <div style={{ ...sCard, background: `${C.green}08`, borderColor: C.green, marginTop: 24 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green }}>Каналы продаж для барбер-дистрибьютора</h3>
            <ul style={{ ...sP, paddingLeft: 20 }}>
              <li><strong style={{ color: C.text }}>Kaspi B2C</strong> (🟢🟢🟢 основной) — розничные карточки SKU + bundles (beard kit, shave kit)</li>
              <li><strong style={{ color: C.text }}>B2B через барбершопы</strong> (🟢🟢🟢 критично) — прямые продажи по wholesale + free samples</li>
              <li><strong style={{ color: C.text }}>Instagram / TikTok UGC</strong> (🟢🟢) — барбер-мастера рекомендуют свой продукт</li>
              <li><strong style={{ color: C.text }}>Telegram бизнес-чаты с барберами</strong> (🟢) — B2B-промо</li>
            </ul>
          </div>
        </Section>

        {/* ═══ 7. Brand Landscape ═══ */}
        <Section id="sec-7" title="7. Карта конкурентов">
          <h3 style={sH3}>Топ-15 брендов в L2 (агрегат по всем L3)</h3>
          <DataTable
            headers={["#", "Бренд", "Σ выручки/мес", "Происхождение", "Силён в"]}
            rows={[
              [1, "Без бренда", "127M", "—", "Аксессуары (72M), Расчёски (15M)"],
              [2, "elline", "103M", "🇰🇿 Казахстан", "Шампуни (103M, #1)"],
              [3, "Tashe", "101M", "🇰🇿 Казахстан", "Уход (56M), Маски (20M), Масла"],
              [4, "Kirkland", "56M", "🇺🇸 США", "Minoxidil regrowth (54M)"],
              [5, "ESTEL PROFESSIONAL", "44M", "🇷🇺 Россия", "Маски, Краска, Окислители"],
              [6, "Ollin Professional", "44M", "🇷🇺 Россия", "Уход (24M), Стайлинг"],
              [7, "Concept", "40M", "🇷🇺 Россия", "Маски (23M, #1)"],
              [8, "Vichy", "40M", "🇫🇷 Франция", "Anti-fall (#1), Шампуни (31M)"],
              [9, "Zhangguang 101", "32M", "🇨🇳 Китай", "Anti-fall (31M)"],
              [10, "TIGI", "27M", "🇺🇸 США", "Стайлинг (16M, #1)"],
              [11, "Semily", "26M", "🇰🇿 Казахстан", "Кератин, Сухие шампуни"],
              [12, "VOIS", "26M", "🇰🇿 Казахстан", "Шампуни, Восстановление (22M, #1)"],
              [13, "Ederra Lab", "23M", "🇰🇿 Казахстан", "Шампуни (11M), Маски"],
              [14, "Prosalon", "22M", "🇵🇱 Польша", "Маски, Стайлинг"],
              [15, "Oyster Cosmetics", "21M", "🇮🇹 Италия", "Маски (12M)"],
            ]}
          />

          <h3 style={sH3}>Сегментация брендов по стратегии</h3>

          <div style={{ ...sCard, borderLeft: `4px solid ${C.green}` }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.green, margin: "0 0 8px" }}>🇰🇿 Локальные KZ-лидеры</h4>
            <p style={{ ...sP, marginBottom: 8 }}>
              <strong style={{ color: C.text }}>elline (103M), Tashe (101M), Semily (26M), VOIS (26M), Ederra Lab (23M)</strong> — суммарно ~280M, что больше любого глобального бренда.
            </p>
            <p style={{ ...sP, fontSize: 13 }}>
              Бенчмарк: <strong style={{ color: C.text }}>elline 460 мл</strong> доказал, что 1-2 SKU в правильном формате могут опередить mass-международных. Tashe — пример «зонтичного» KZ-бренда через 5 L3.
            </p>
          </div>

          <div style={{ ...sCard, borderLeft: `4px solid ${C.amber}` }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.amber, margin: "0 0 8px" }}>🌍 Глобальные mass-market</h4>
            <p style={{ ...sP, fontSize: 13 }}>
              Loreal Paris (17M), Garnier (17M), TIGI (27M), TAFT (6M), KeraSys (16M), Batiste (3M), Schwarzkopf Pro (15M)
            </p>
          </div>

          <div style={{ ...sCard, borderLeft: `4px solid ${C.pink}` }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.pink, margin: "0 0 8px" }}>💊 Аптечная (active cosmetics)</h4>
            <p style={{ ...sP, fontSize: 13 }}>
              Vichy (40M, второй после elline в шампунях), DUCRAY (18M, #4 в шампунях). <strong style={{ color: C.text }}>Аптечный нарратив работает на Kaspi</strong> — редкость для СНГ-маркетплейсов.
            </p>
          </div>

          <div style={{ ...sCard, borderLeft: `4px solid ${C.cyan}` }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.cyan, margin: "0 0 8px" }}>L&apos;Oréal Group footprint</h4>
            <p style={{ ...sP, fontSize: 13 }}>
              Loreal Paris (17M) + Garnier (17M) + Vichy (40M) + Loreal Professionnel (5M) + Kerastase, Redken (микро) = <strong style={{ color: C.text }}>~70M/мес = 3.5% L2</strong>.
            </p>
            <p style={{ ...sP, fontSize: 13 }}>
              <strong style={{ color: C.cyan }}>White space:</strong> профессиональные PRO-бренды группы (Kerastase, Redken, L&apos;Oréal Professionnel) на Kaspi почти не представлены — открыта дверь для PRO-дистрибьютора.
            </p>
          </div>
        </Section>

        {/* ═══ 8. Prices ═══ */}
        <Section id="sec-8" title="8. Ценовые сегменты P1-P5">
          <h3 style={sH3}>Шампуни (630M/мес) — пример с премиум-доминированием</h3>
          <DataTable
            headers={["Сегмент", "Название", "Median цена", "SKU", "Выручка", "Доля выручки", "Branded%"]}
            rows={[
              ["P1", "Низкий", "1 495", "1 159", "44M", "7.0%", "94.7%"],
              ["P2", "Бюджетный", "2 454", "1 149", "82M", "13.1%", "—"],
              ["P3", "Средний", "3 750", "1 129", "122M", "19.3%", "—"],
              ["P4", "Дорогой", "6 242", "1 222", "107M", "17.0%", "—"],
              ["P5", "Премиум", "12 000", "1 216", "275M", "43.6%", "—"],
            ]}
            highlight={4}
          />
          <div style={{ ...sCard, background: `${C.pink}08`, borderColor: C.pink, marginTop: 16 }}>
            <p style={{ ...sP, margin: 0 }}>
              <strong style={{ color: C.pink }}>Главный инсайт:</strong> P5 Премиум (median 12 000 KZT) даёт <strong style={{ color: C.text }}>43.6% выручки</strong> шампуней. Mass-сегменты P1+P2 — только 20%. Казахстанский покупатель шампуня готов платить за премиум больше, чем за премиум-крем для лица.
            </p>
          </div>

          <h3 style={sH3}>Цена «золотой полки» по нишам</h3>
          <DataTable
            headers={["Ниша", "Главный сегмент", "Median цена", "Доля выручки"]}
            rows={[
              ["Шампуни", "P5 Премиум", "12 000", "43.6%"],
              ["Маски и бальзамы", "P4 Дорогой", "5 800", "32%"],
              ["Средства по уходу", "P4 Дорогой", "6 500", "35%"],
              ["Краска для волос", "P3 Средний", "3 200", "38%"],
              ["Средства для укладки", "P4 Дорогой", "5 500", "30%"],
            ]}
          />

          <h3 style={sH3}>Сезонность L2 (помесячная выручка)</h3>
          <BarChart
            data={[
              { label: "Ноя 2025", value: 1850000000 },
              { label: "Дек 2025", value: 1720000000 },
              { label: "Янв 2026", value: 1950000000 },
              { label: "Фев 2026", value: 2013000000 },
            ]}
            maxVal={2200000000}
            color={C.green}
            unit="KZT"
          />
          <p style={{ ...sP, fontSize: 13, color: C.dim }}>
            Пик: ноябрь (Kaspi Жума / Black Friday). Дно: декабрь (после распродаж + новогодние подарочные наборы оттягивают бюджет). Январь-февраль — восстановление и плавный рост.
          </p>
        </Section>

        {/* ═══ 9. Strategy ═══ */}
        <Section id="sec-9" title="9. Стратегия входа">
          <h3 style={sH3}>Сводная матрица: куда заходить</h3>
          <DataTable
            headers={["#", "Ниша", "Размер", "YoY", "ASP target", "Приоритет"]}
            rows={[
              [1, "Уход за волосами (общий)", "1 393M", "+75%", "2 500-5 500", "🟢🟢🟢"],
              [2, "Уход против выпадения", "65M", "n/a", "3 500-6 500", "🟢🟢🟢"],
              [3, "Кератиновый уход", "93M", "n/a", "2 500-6 000", "🟢🟢"],
              [4, "Восстановление волос", "99M", "n/a", "3 500-7 000", "🟢🟢"],
              [5, "Термозащита", "22M", "n/a", "2 500-4 500", "🟢🟢"],
              [6, "Масла и сыворотки", "147M", "n/a", "1 800-5 000", "🟢🟢"],
              [7, "Мужская / barber", "37M", "n/a", "1 500-7 000", "🟢"],
              [8, "Стайлинг", "125M", "+74%", "2 000-4 500", "🟡"],
              [9, "Увлажнение", "51M", "n/a", "1 800-3 500", "🟡"],
            ]}
          />

          <h3 style={sH3}>SKU-портфель на старт (рекомендация)</h3>
          <DataTable
            headers={["SKU", "Категория", "Формат", "Целевой сегмент", "ASP"]}
            rows={[
              ["#1 — Шампунь-герой", "Шампуни (00689)", "400-460 мл", "P3-P4", "3 000-5 500"],
              ["#2 — Маска-герой", "Маски и бальзамы", "200-300 мл", "P4", "3 500-5 500"],
              ["#3 — Кондиционер парный к #1", "Шампуни/Уход", "400 мл", "P3-P4", "2 800-4 500"],
              ["#4 — Сыворотка leave-in", "Средства по уходу", "100-150 мл", "P4-P5", "4 500-7 000"],
              ["#5 — Термозащитный спрей", "Средства для укладки", "200 мл", "P3-P4", "2 500-4 500"],
              ["#6 — Маска кератиновая", "Маски и бальзамы", "200 мл", "P4", "3 500-5 500"],
            ]}
          />

          <h3 style={sH3}>Тактика входа: 90-дневный план</h3>
          <DataTable
            headers={["Этап", "Срок", "Действие"]}
            rows={[
              ["1. Подготовка", "Месяц 1", "Регистрация на Kaspi, оформление 6-8 фото на SKU + 2 видео, формирование «затравочных» 30-40 отзывов через знакомых"],
              ["2. Soft launch", "Месяц 1-2", "Запуск первых 3 SKU (шампунь + маска + кондиционер). Цель — first reviews, ranking warm-up"],
              ["3. Ranking boost", "Месяц 2-3", "UGC-кампания через мама-блогеров (P3-P4 ЦА). Цель — топ-5 по новым отзывам в категории за 90 дней"],
              ["4. Расширение", "Месяц 3-4", "Запуск 2-3 SKU второй волны (сыворотка, термозащита, кератиновая маска)"],
              ["5. Анализ + ретаргетинг", "Месяц 4-6", "Анализ конверсий по SKU, retarget на покупателей через bundle-предложения"],
            ]}
          />

          <div style={{ ...sCard, background: `${C.green}08`, borderColor: C.green, marginTop: 24 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green }}>Когда заходить</h3>
            <p style={sP}>
              <strong style={{ color: C.text }}>Сейчас, до Q4 2026.</strong> L2 растёт +77% YoY, конкурентная плотность ещё не достигла потолка. Окно для входа open до конца 2026 — после этого лидеры (elline, Tashe, Vichy) закрепятся, и стоимость входа удвоится.
            </p>
          </div>
        </Section>

        {/* ═══ 10. Methodology ═══ */}
        <Section id="sec-10" title="10. Методология">
          <h3 style={sH3}>Источники данных</h3>
          <DataTable
            headers={["Источник", "Что даёт", "Обновление"]}
            rows={[
              ["Redstat ClickHouse (redstat.*)", "Помесячные срезы по всем уровням каталога Kaspi: категория, L3, бренд × категория, ценовой сегмент, индивидуальный SKU", "Раз в месяц"],
              ["Redstat REST API", "Real-time через Redis-кэш", "Real-time"],
            ]}
          />

          <h3 style={sH3}>Как мы оцениваем продажи на Kaspi</h3>
          <p style={sP}>
            Kaspi не публикует прямую выручку по карточкам. Redstat использует <strong style={{ color: C.text }}>публично доступные сигналы с витрины</strong> и калибровочную модель:
          </p>
          <ul style={{ ...sP, paddingLeft: 20 }}>
            <li><strong style={{ color: C.text }}>Динамика отзывов по SKU</strong> — основной сигнал. Прирост отзывов × калибровочный коэф. «отзыв-на-заказ» по категории/сегменту = оценка продаж.</li>
            <li><strong style={{ color: C.text }}>Изменения цены</strong> — историческая динамика.</li>
            <li><strong style={{ color: C.text }}>Сигналы доступности</strong> — статус «в наличии», количество продавцов.</li>
            <li><strong style={{ color: C.text }}>Позиция в категорийной выдаче</strong> — для весов.</li>
          </ul>
          <p style={sP}>
            Калибровочные коэффициенты verifиются на ground-truth выборках. Итог — <strong style={{ color: C.text }}>статистическая модель с погрешностью на уровне SKU ±10-15%, на уровне ниши ±3-5%</strong>.
          </p>

          <div style={{ ...sCard, borderColor: C.green, borderWidth: 2 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green }}>Юридическая чистота</h3>
            <ul style={{ ...sP, paddingLeft: 20, margin: 0 }}>
              <li>Только общедоступные данные витрины Kaspi (без обхода авторизации).</li>
              <li>Никаких персональных данных покупателей (отзывы как тексты для NLP-моделей по конкретным людям не используются).</li>
              <li>Никакого закрытого API Kaspi, никаких чужих сессий.</li>
              <li>Продукт — агрегированная аналитика, не сырая выгрузка.</li>
              <li>Соответствует ст. 6 Закона РК «О персональных данных» (ПД нет) и ст. 205 УК РК (нет неправомерного доступа).</li>
            </ul>
          </div>

          <h3 style={sH3}>Определение 9 функциональных ниш</h3>
          <p style={sP}>
            В каталоге Kaspi нет фасета «термозащита» или «кератин». Поэтому мы выделяем функциональные ниши через <strong style={{ color: C.text }}>полнотекстовое сопоставление по полю sku_name</strong>:
          </p>
          <ul style={{ ...sP, paddingLeft: 20 }}>
            <li><strong style={{ color: C.text }}>Кератин:</strong> керати[нм] / keratin</li>
            <li><strong style={{ color: C.text }}>Термозащита:</strong> термозащит / thermal protect / heat protect</li>
            <li><strong style={{ color: C.text }}>Против выпадения:</strong> против выпадения / anti-fall / укрепляющ</li>
            <li><strong style={{ color: C.text }}>Восстановление:</strong> восстан / repair / damage / поврежд</li>
            <li><strong style={{ color: C.text }}>Увлажнение:</strong> увлажн / moisture / hydrat</li>
            <li><strong style={{ color: C.text }}>Масла/сыворотки:</strong> масло / сыворотк / serum / argan / jojoba</li>
            <li><strong style={{ color: C.text }}>Мужская/barber:</strong> мужск / men / barber / бород</li>
            <li><strong style={{ color: C.text }}>Стайлинг:</strong> воск / гель / wax / paste / pomade / sea salt / sculpt / fiber</li>
          </ul>
          <p style={{ ...sP, fontSize: 13, color: C.dim, fontStyle: "italic" }}>
            Покрытие &lt;100%: SKU без явных функциональных claim в названии не попадают. Цифры функциональных ниш — это <strong style={{ color: C.text, fontStyle: "normal" }}>нижняя граница спроса по явному функциональному запросу</strong>.
          </p>
        </Section>

        {/* ═══ Footer ═══ */}
        <div style={{ marginTop: 80, paddingTop: 32, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: C.dim, margin: 0 }}>
            Отчёт подготовлен Алмасом Касымжановым · Май 2026
          </p>
          <p style={{ fontSize: 12, color: C.dim, margin: "8px 0 0" }}>
            Данные: <strong style={{ color: C.cyan }}>RedStat</strong> (агрегированная аналитика Kaspi.kz) · Период: ноябрь 2024 — февраль 2026
          </p>
          <p style={{ fontSize: 12, color: C.dim, margin: "8px 0 0" }}>
            <Link href="/" style={{ color: C.accent, textDecoration: "none" }}>kasymzhanov.com</Link> · обновление отчёта ежемесячно после новой выгрузки Kaspi
          </p>
        </div>

      </div>
    </div>
  );
}
