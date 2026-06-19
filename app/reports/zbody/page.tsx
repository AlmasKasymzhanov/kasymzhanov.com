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

/* ───── Bar Chart (CSS) ───── */
function BarChart({ data, maxVal, color, unit }: { data: { label: string; value: number }[]; maxVal: number; color: string; unit?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 11, color: C.dim, width: 90, textAlign: "right", flexShrink: 0 }}>{d.label}</span>
          <div style={{ flex: 1, height: 22, background: `${color}11`, borderRadius: 4, overflow: "hidden", position: "relative" }}>
            <div style={{ width: `${Math.max((d.value / maxVal) * 100, 1)}%`, height: "100%", background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: 4, transition: "width 0.8s ease" }} />
          </div>
          <span style={{ fontSize: 11, color: C.text, width: 80, textAlign: "right", fontFamily: "monospace", flexShrink: 0 }}>
            {d.value >= 1000000000 ? (d.value / 1000000000).toFixed(1) + "B" : d.value >= 1000000 ? (d.value / 1000000).toFixed(1) + "M" : d.value >= 1000 ? (d.value / 1000).toFixed(0) + "K" : d.value}
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

/* ───── Funnel Step ───── */
function FunnelStep({ step, label, detail, color }: { step: number; label: string; detail: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${color}22`, border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color, flexShrink: 0 }}>{step}</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{label}</div>
        <div style={{ fontSize: 12, color: C.dim }}>{detail}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/*                  MAIN PAGE                      */
/* ═══════════════════════════════════════════════ */
export default function ZBodyReport() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ═══ Header ═══ */}
        <div style={{ marginBottom: 16 }}>
          <Link href="/" style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}>&larr; kasymzhanov.com</Link>
        </div>

        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, background: `${C.pink}18`, color: C.pink, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", marginBottom: 16, textTransform: "uppercase" }}>
            Enterprise-стратегия
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            ZBODY — Стратегия создания<br />Phygital-бренда
          </h1>
          <p style={{ color: "#ccc", fontSize: 15, margin: "12px 0 0" }}>
            HealthTech + E-commerce экосистема
          </p>
          <p style={{ color: C.dim, fontSize: 14, margin: "12px 0 0" }}>
            Подготовил <strong style={{ color: C.text }}>Алмас Касымжанов</strong>
          </p>
          <p style={{ color: C.dim, fontSize: 13, margin: "4px 0 0" }}>
            Для <strong style={{ color: C.pink }}>Зарины Гусман</strong> <span style={{ color: C.dim }}>(@zarinochka_kz)</span>
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, color: C.dim, flexWrap: "wrap" }}>
            <span>Версия: <strong style={{ color: C.text }}>Final v3.0</strong></span>
            <span>Дата: <strong style={{ color: C.text }}>Март 2026</strong></span>
            <span>Статус: <strong style={{ color: C.green }}>Конфиденциально</strong></span>
          </div>
        </div>

        {/* ═══ TOC ═══ */}
        <div style={{ ...sCard, marginBottom: 48, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.dim, marginBottom: 12 }}>Содержание</div>
          {[
            ["sec-1", "1. Executive Summary"],
            ["sec-2", "2. Профиль основателя"],
            ["sec-3", "3. Анализ рынка"],
            ["sec-4", "4. Конкурентный ландшафт"],
            ["sec-5", "5. Бизнес-модель — Phygital-воронка"],
            ["sec-6", "6. Продуктовая линейка + анализ Kaspi.kz"],
            ["sec-7", "7. Unit-экономика (3 сценария)"],
            ["sec-8", "8. Финансовая модель (12 месяцев)"],
            ["sec-9", "9. Дорожная карта"],
            ["sec-10", "10. Технический стек"],
            ["sec-11", "11. Маркетинговая стратегия"],
            ["sec-12", "12. Риски и митигация"],
            ["sec-13", "13. Next Steps — ближайшие 2 недели"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ display: "block", fontSize: 13, color: C.accent, textDecoration: "none", padding: "4px 0" }}>{label}</a>
          ))}
        </div>

        {/* ═══ 1. Executive Summary ═══ */}
        <Section id="sec-1" title="1. Executive Summary">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            <MetricCard label="Выручка Год 1" value="₸150M+" sub="~$300K" color={C.accent} />
            <MetricCard label="Загрузки приложения" value="35 000" sub="за 12 месяцев" color={C.green} />
            <MetricCard label="LTV Phygital-клиента" value="₸42 000" sub="x5.25 vs только товары" color={C.pink} />
            <MetricCard label="LTV / CAC" value="8.4" sub="Рекуррентный доход 65%" color={C.amber} />
          </div>

          <div style={{ ...sCard, borderColor: C.green, borderWidth: 2 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.green, fontSize: 18 }}>Возможность</h3>
            <p style={sP}>
              <strong style={{ color: C.text }}>Рынок фитнес-услуг Казахстана — ₸235 млрд с ростом +28% в год.</strong> При этом ни одного казахстанского wellness-приложения не существует. Ниша полностью пустая.
            </p>
            <p style={sP}>
              Зарина Гусман (250K подписчиков, 3 194 публикации, сеть BodyPro из 13 филиалов в 9 городах) запустила вирусный челлендж приседаний с массовым вовлечением. Модель <strong style={{ color: C.pink }}>Phygital (Physical + Digital)</strong>: физический товар = точка входа, приложение = retention + основная прибыль, комьюнити = organic growth engine.
            </p>
          </div>

          <h3 style={sH3}>Целевые показатели на 12 месяцев</h3>
          <DataTable
            headers={["Метрика", "Значение"]}
            rows={[
              ["Загрузки приложения", "35 000+"],
              ["Платящие подписчики app", "3 500"],
              ["Выручка app-подписки", "₸75M (~$150K)"],
              ["Выручка товары (Kaspi + сайт)", "₸55M (~$110K)"],
              ["Выручка челленджи/марафоны", "₸25M (~$50K)"],
              ["Общая выручка Год 1", "₸155M (~$310K)"],
              ["Операционная прибыль (40%)", "₸62M (~$124K)"],
            ]}
            highlight={5}
          />

          <div style={{ ...sCard, background: `${C.accent}08`, borderColor: C.accent }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.accent }}>Почему именно сейчас</h3>
            <ul style={{ ...sP, paddingLeft: 20 }}>
              <li>Фитнес-рынок КЗ растёт +28% ежегодно</li>
              <li>Проникновение фитнеса всего 3.3% — огромный потенциал</li>
              <li>Kaspi-экосистема = встроенная логистика + рассрочка + 14M пользователей</li>
              <li>Zero competition в digital-wellness на казахском и русском</li>
            </ul>
          </div>
        </Section>

        {/* ═══ 2. Профиль основателя ═══ */}
        <Section id="sec-2" title="2. Профиль основателя">
          <DataTable
            headers={["Параметр", "Детали"]}
            rows={[
              ["Instagram", "@zarinochka_kz — 250K подписчиков, 3 194 публикации, высокий ER"],
              ["Бизнес", "BodyPro (@bodyprokz) — 13 филиалов в 9 городах Казахстана"],
              ["Медийность", "Harper's Bazaar KZ, ELLE KZ, Esquire KZ"],
              ["Аудитория", "Женщины 25-45, КЗ и СНГ, мотивированы здоровьем"],
              ["Вирусный формат", "Марафон 60 дней + челлендж приседаний — массовое участие"],
              ["Активные марафоны", "Марафон стройного тела (6.04-26.04), платный"],
              ["Дополнительные проекты", "@zpowerkz, организация концертов (Jay Sean, Nana Darkman)"],
              ["Франшизная модель", "BodyPro работает по франшизе в 9 городах → опыт масштабирования"],
            ]}
          />

          <h3 style={sH3}>Сравнение с Kayla Itsines на старте</h3>
          <DataTable
            headers={["Параметр", "Kayla (2013)", "Зарина (2026)"]}
            rows={[
              ["Подписчики", "~50K Instagram", "250K Instagram, 3 194 публикаций"],
              ["Вирусный формат", "BBG 12-week program", "Марафон 60 дней + челлендж приседаний"],
              ["Существующий бизнес", "Нет (персональный тренер)", "BodyPro — 13 филиалов в 9 городах КЗ"],
              ["Текущая монетизация", "Нет", "Марафон стройного тела (платный), розыгрыши"],
              ["Дополнительные проекты", "Нет", "@zpowerkz, организация концертов"],
              ["Конкуренция в digital", "Умеренная (2013)", "Нулевая в КЗ (2026)"],
              ["Рынок", "Англоязычный", "Русскоязычный, 100M+ СНГ"],
            ]}
          />

          <div style={{ ...sCard, borderColor: C.green, borderWidth: 2 }}>
            <p style={sP}>
              <strong style={{ color: C.green }}>Вывод:</strong> Зарина имеет <strong style={{ color: C.text }}>лучшую стартовую позицию</strong>, чем Kayla в 2013: больше подписчиков, работающий бизнес, нулевая конкуренция. Kayla из этой позиции построила бизнес на $400M.
            </p>
          </div>
        </Section>

        {/* ═══ 3. Анализ рынка ═══ */}
        <Section id="sec-3" title="3. Анализ рынка">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
            <MetricCard label="Фитнес-рынок КЗ" value="₸235 млрд" sub="~$470M, 2025" color={C.accent} />
            <MetricCard label="Рост YoY" value="+28%" sub="2025 vs 2024" color={C.green} />
            <MetricCard label="Проникновение" value="3.3%" sub="в Алматы/Астане >10%" color={C.amber} />
          </div>

          <h3 style={sH3}>Фитнес-рынок Казахстана</h3>
          <DataTable
            headers={["Показатель", "Значение", "Источник"]}
            rows={[
              ["Оборот фитнес-услуг КЗ, 2025", "₸235 млрд (~$470M)", "FitnessData"],
              ["Рост YoY", "+28% (2025), +30% (2024)", "FitnessData"],
              ["Занимающихся фитнесом", "~650 000 человек", "FitnessData"],
              ["Проникновение фитнеса", "3.3%", "FitnessData"],
              ["Фитнес-объектов в КЗ", "2 200+", "FitnessData"],
              ["Средний абонемент (год)", "₸130 000", "FitnessData"],
              ["Спортивные услуги РК, 2024", "₸269 млрд ($517M)", "Energyprom.kz"],
            ]}
          />

          <h3 style={sH3}>TAM → SAM → SOM</h3>
          <BarChart
            data={[
              { label: "TAM (глобальный)", value: 12000 },
              { label: "SAM (СНГ)", value: 3000 },
              { label: "SOM (Год 1)", value: 234 },
            ]}
            maxVal={12000}
            color={C.accent}
            unit="$M"
          />

          <div style={{ marginTop: 16 }}>
            <DataTable
              headers={["Уровень", "Аудитория", "Объём"]}
              rows={[
                ["TAM", "Глобальный рынок фитнес-приложений", "$12B (прогноз $38B к 2034)"],
                ["SAM", "Русскоязычная женская аудитория 25-45, фитнес", "~15M человек в СНГ"],
                ["SOM (Год 1)", "250K аудитория → 35K загрузок → 3500 платящих", "₸150M+ (~$300K)"],
              ]}
            />
          </div>

          <h3 style={sH3}>E-commerce и Kaspi</h3>
          <DataTable
            headers={["Показатель", "Значение"]}
            rows={[
              ["E-commerce рынок КЗ", "₸3.15 трлн"],
              ["Kaspi.kz — активных пользователей", "14M+"],
              ["Комиссия Kaspi: спортивные товары", "10.9%"],
              ["Комиссия Kaspi: одежда и обувь", "13.5%"],
              ["Kaspi Red (рассрочка)", "Ключевой драйвер покупок"],
            ]}
          />
        </Section>

        {/* ═══ 4. Конкурентный ландшафт ═══ */}
        <Section id="sec-4" title="4. Конкурентный ландшафт">
          <DataTable
            headers={["Компания", "Страна", "Модель", "Выручка", "Что берём для ZBody"]}
            rows={[
              ["BetterMe", "Украина", "App + товары", "$80-150M", "Quiz-воронка, подписочная модель"],
              ["Sweat (Kayla)", "Австралия", "Influencer → App", "Exit $400M", "Influencer-first, community"],
              ["Gymshark", "UK", "Одежда + App", "£556M", "66-дневный челлендж, амбассадоры"],
              ["Noom", "США", "App + AI-коучинг", "$1B ARR", "Поведенческая психология, AI"],
              ["POPFLEX", "США", "Одежда + App", "$35M+", "Дизайн как контент"],
              ["FitStars", "Россия", "Платформа тренировок", "~$5M", "Русскоязычный контент"],
              ["Секта", "Россия", "TG-бот + марафоны", "~$10M", "Telegram-first, комьюнити"],
            ]}
          />

          <div style={{ ...sCard, background: `${C.amber}08`, borderColor: C.amber }}>
            <p style={sP}>
              <strong style={{ color: C.amber }}>Ключевой инсайт:</strong> В Казахстане прямых конкурентов нет. Аудитория использует BetterMe (англоязычный) или Instagram-марафоны без системного продукта. <strong style={{ color: C.text }}>ZBody = первое казахстанское wellness-приложение.</strong>
            </p>
          </div>
        </Section>

        {/* ═══ 5. Бизнес-модель ═══ */}
        <Section id="sec-5" title="5. Бизнес-модель — Phygital-воронка">
          <div style={{ ...sCard, padding: "28px 24px" }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.pink }}>Путь клиента</h3>
            <FunnelStep step={1} label="Instagram (250K)" detail="Бесплатный контент, Stories, Reels" color={C.pink} />
            <FunnelStep step={2} label="Челлендж (30 дней)" detail="Бесплатный, массовое участие, Telegram-группа" color={C.accent} />
            <FunnelStep step={3} label="Quiz-воронка" detail="«Какой у тебя тип фигуры?» → персональный план" color={C.blue} />
            <FunnelStep step={4} label="Физический товар (₸6-15K)" detail="Резинки/леггинсы через Kaspi. QR-код → 1 мес бесплатно в app" color={C.green} />
            <FunnelStep step={5} label="App-подписка (₸2 500/мес)" detail="Тренировки, питание, AI-рекомендации, трекинг" color={C.amber} />
            <FunnelStep step={6} label="Community + Upsell" detail="66-дневные челленджи, спортпит, BodyPro скидки, VIP" color={C.red} />
          </div>

          <h3 style={sH3}>Почему связка даёт x5 LTV</h3>
          <DataTable
            headers={["Сценарий", "Средний LTV", "Объяснение"]}
            rows={[
              ["A: Только товары", "₸8 000", "Одна покупка. Нет повторных касаний"],
              ["B: Товары + App", "₸28 800", "Товар + подписка 8 мес + cross-sell"],
              ["C: Полный Phygital", "₸42 000+", "Товар + подписка + марафоны + спортпит + BodyPro"],
            ]}
            highlight={2}
          />

          <BarChart
            data={[
              { label: "Только товары", value: 8000 },
              { label: "Товары + App", value: 28800 },
              { label: "Phygital", value: 42000 },
            ]}
            maxVal={42000}
            color={C.pink}
            unit="₸"
          />
        </Section>

        {/* ═══ 6. Продуктовая линейка ═══ */}
        <Section id="sec-6" title="6. Продуктовая линейка">
          <h3 style={sH3}>Физические товары</h3>
          <DataTable
            headers={["Продукт", "Себестоимость", "Цена", "Маржа", "Канал"]}
            rows={[
              ["Фитнес-резинки ZBody (набор 3 шт)", "₸1 200", "₸5 990", "80%", "Kaspi, App"],
              ["Леггинсы «Squat Collection»", "₸4 500", "₸14 990", "70%", "Kaspi, Instagram"],
              ["Спортивный топ ZBody", "₸2 500", "₸9 990", "75%", "Kaspi"],
              ["Коврик для йоги (QR → тренировка)", "₸2 000", "₸7 990", "75%", "Kaspi"],
              ["Бутылка-трекер воды", "₸800", "₸3 990", "80%", "Kaspi, App"],
              ["Стартовый набор «30 дней»", "₸3 000", "₸11 990", "75%", "Kaspi"],
              ["Протеиновые батончики (12 шт)", "₸2 400", "₸5 990", "60%", "Kaspi (Фаза 2)"],
              ["Коллагеновые капсулы (30 дней)", "₸1 500", "₸4 990", "70%", "Kaspi (Фаза 2)"],
            ]}
          />

          <h3 style={sH3}>Цифровые продукты</h3>
          <DataTable
            headers={["Продукт", "Цена", "Маржа", "Описание"]}
            rows={[
              ["App Free", "₸0", "—", "Базовый челлендж, 3 тренировки, лидерборд"],
              ["App Premium", "₸2 500/мес", "~85%", "Все тренировки, питание СНГ, AI, офлайн"],
              ["App VIP", "₸7 500/мес", "~90%", "Premium + коучинг Зарины, скидки BodyPro"],
              ["Годовая Premium", "₸19 990/год", "~90%", "Скидка 33% vs помесячная"],
              ["TG-марафон (4 нед)", "₸5-10K", "~95%", "Закрытая группа, задания, бот-трекинг"],
              ["Quiz → план", "Бесплатно", "—", "10 вопросов → персональный план → paywall"],
            ]}
          />

          <div style={{ ...sCard, background: `${C.green}08`, borderColor: C.green }}>
            <p style={sP}>
              <strong style={{ color: C.green }}>Ключевая связка:</strong> Каждый физический товар содержит QR-код → 1 месяц бесплатного Premium в приложении. Товар = инструмент привлечения для app.
            </p>
          </div>

          <h3 style={{ ...sH3, color: C.amber, fontSize: 18, marginTop: 32 }}>Анализ товарных категорий на Kaspi.kz</h3>
          <p style={sP}>
            Проверка наличия и конкурентной среды каждой категории ZBody на маркетплейсе Kaspi.kz (данные на март 2026):
          </p>

          <DataTable
            headers={["Товар ZBody", "На Kaspi?", "Конкуренция", "Бренды", "Возможность"]}
            rows={[
              ["Фитнес-резинки", "✅ Есть", "Средняя", "Много no-name, мало брендов", "🟢 Высокая"],
              ["Леггинсы спортивные", "✅ Есть", "Средняя", "Sports Enterprise, LIMIKO, Alamata", "🟡 Средняя"],
              ["Коврик для йоги", "✅ Есть", "Высокая (1000+ моделей)", "FLO, Nanofit, no-name", "🔴 Низкая"],
              ["Бутылка спортивная", "✅ Есть", "Высокая (1000+ моделей)", "Sea&Sky, StatiX, no-name", "🔴 Низкая"],
              ["Протеиновые батончики", "✅ Есть", "Средняя", "BombBar, Daribar, Pump Up, ONLYFIT", "🟡 Средняя"],
              ["Коллаген капсулы", "✅ Есть", "Средняя", "Natural Health, GLS, Эвалар, TURAN", "🟡 Средняя"],
            ]}
          />

          <h3 style={sH3}>Рекомендуемый порядок запуска</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div style={{ ...sCard, borderTop: `2px solid ${C.green}` }}>
              <div style={{ fontSize: 11, color: C.green, fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>Фаза 1 — Запускать первыми</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>Фитнес-резинки</div>
              <div style={{ fontSize: 12, color: C.dim }}>Мало брендов на Kaspi, низкий MOQ, маржа 80%, идеальная связка с челленджем приседаний. Комиссия Kaspi 10.9%</div>
            </div>
            <div style={{ ...sCard, borderTop: `2px solid ${C.blue}` }}>
              <div style={{ fontSize: 11, color: C.blue, fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>Фаза 2 — Запускать вторыми</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>Леггинсы + Спортпит</div>
              <div style={{ fontSize: 12, color: C.dim }}>Леггинсы «Squat Collection» = product-market fit с аудиторией. Батончики — white-label. Комиссия 13.5% / 10.9%</div>
            </div>
            <div style={{ ...sCard, borderTop: `2px solid ${C.dim}` }}>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>Фаза 3 — Отложить</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>Коврики, бутылки, коллаген</div>
              <div style={{ fontSize: 12, color: C.dim }}>Слишком много конкурентов (1000+ моделей). Запускать когда бренд ZBody уже узнаваем</div>
            </div>
          </div>

          <div style={{ ...sCard, background: `${C.amber}08`, borderColor: C.amber }}>
            <p style={sP}>
              <strong style={{ color: C.amber }}>Ключевой инсайт:</strong> Фитнес-резинки — единственная категория с низкой конкуренцией брендов на Kaspi и идеальным product-market fit с аудиторией Зарины (челлендж приседаний). <strong style={{ color: C.text }}>Это must-have для запуска в Фазе 1.</strong>
            </p>
          </div>
        </Section>

        {/* ═══ 7. Unit-экономика ═══ */}
        <Section id="sec-7" title="7. Unit-экономика (3 сценария)">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
            <div style={{ ...sCard, borderTop: `2px solid ${C.dim}` }}>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>Сценарий A: Товары</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: C.dim }}>₸9M</div>
              <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>LTV/CAC: 2.67</div>
            </div>
            <div style={{ ...sCard, borderTop: `2px solid ${C.blue}` }}>
              <div style={{ fontSize: 11, color: C.blue, fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>Сценарий B: Товары + App</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: C.blue }}>₸26M</div>
              <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>LTV/CAC: 3.6</div>
            </div>
            <div style={{ ...sCard, borderTop: `2px solid ${C.green}` }}>
              <div style={{ fontSize: 11, color: C.green, fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>Сценарий C: Phygital</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: C.green }}>₸47M</div>
              <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>LTV/CAC: 8.4</div>
            </div>
          </div>

          <h3 style={sH3}>Сводное сравнение</h3>
          <DataTable
            headers={["Метрика", "A: Товары", "B: Товары+App", "C: Phygital"]}
            rows={[
              ["Выручка", "₸32M", "₸64.4M", "₸133.5M"],
              ["Прибыль", "₸9M", "₸26M", "₸47M"],
              ["LTV", "₸8 000", "₸28 800", "₸42 000"],
              ["LTV/CAC", "2.67", "3.6", "8.4"],
              ["Рекуррентный доход", "0%", "50%", "65%"],
              ["Масштабируемость", "Низкая", "Средняя", "Высокая"],
            ]}
            highlight={2}
          />

          <BarChart
            data={[
              { label: "A: Товары", value: 32 },
              { label: "B: Товары+App", value: 64 },
              { label: "C: Phygital", value: 134 },
            ]}
            maxVal={134}
            color={C.green}
            unit="M₸"
          />
        </Section>

        {/* ═══ 8. Финансовая модель ═══ */}
        <Section id="sec-8" title="8. Финансовая модель (12 месяцев)">
          <p style={sP}>Базовый сценарий C (Phygital). Курс: 1 USD ≈ 500 KZT</p>

          <DataTable
            headers={["Мес", "Загрузки", "Платящие", "Товары ₸", "App ₸", "Челленджи ₸", "ИТОГО ₸", "Расходы ₸", "Прибыль ₸"]}
            rows={[
              ["1", "0", "0", "0", "0", "0", "0", "2.5M", "-2.5M"],
              ["2", "0", "0", "1.5M", "0", "5M", "6.5M", "3M", "3.5M"],
              ["3", "3K", "300", "3M", "540K", "0", "3.5M", "5M", "-1.5M"],
              ["4", "5.5K", "600", "3.5M", "1.1M", "0", "4.6M", "3.5M", "1.1M"],
              ["5", "8K", "1K", "5M", "1.8M", "7.5M", "14.3M", "4M", "10.3M"],
              ["6", "11K", "1.3K", "4M", "2.3M", "0", "6.3M", "3.5M", "2.8M"],
              ["7", "14K", "1.6K", "4.5M", "2.9M", "0", "7.4M", "4M", "3.4M"],
              ["8", "17K", "1.9K", "5.5M", "3.4M", "7.5M", "16.4M", "4.5M", "11.9M"],
              ["9", "19.5K", "2.1K", "4M", "3.8M", "0", "7.8M", "3.5M", "4.3M"],
              ["10", "21.5K", "2.3K", "5M", "4.1M", "0", "9.1M", "4M", "5.1M"],
              ["11", "23.5K", "2.4K", "5.5M", "4.3M", "7.5M", "17.3M", "4M", "13.3M"],
              ["12", "25K", "2.5K", "6.5M", "4.5M", "0", "11M", "4M", "7M"],
            ]}
            highlight={11}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
            <MetricCard label="Итого выручка Год 1" value="₸104.3M" sub="~$209K" color={C.accent} />
            <MetricCard label="Итого прибыль Год 1" value="₸58.8M" sub="~$118K" color={C.green} />
          </div>

          <h3 style={sH3}>Помесячная выручка</h3>
          <BarChart
            data={[
              { label: "Мес 1", value: 0 },
              { label: "Мес 2", value: 6.5 },
              { label: "Мес 3", value: 3.5 },
              { label: "Мес 4", value: 4.6 },
              { label: "Мес 5", value: 14.3 },
              { label: "Мес 6", value: 6.3 },
              { label: "Мес 7", value: 7.4 },
              { label: "Мес 8", value: 16.4 },
              { label: "Мес 9", value: 7.8 },
              { label: "Мес 10", value: 9.1 },
              { label: "Мес 11", value: 17.3 },
              { label: "Мес 12", value: 11 },
            ]}
            maxVal={17.3}
            color={C.accent}
            unit="M₸"
          />
        </Section>

        {/* ═══ 9. Дорожная карта ═══ */}
        <Section id="sec-9" title="9. Дорожная карта">
          <h3 style={{ ...sH3, color: C.green }}>Фаза 1: LAUNCH (Месяцы 1-3) — Бюджет: ₸10.5M</h3>
          <DataTable
            headers={["#", "Действие", "Срок", "Бюджет", "KPI"]}
            rows={[
              ["1", "Регистрация бренда ZBody + домен", "Нед 1-2", "₸300K", "Бренд зарегистрирован"],
              ["2", "Telegram-группа «Челлендж Зарины»", "Нед 1", "₸0", "3K+ участников"],
              ["3", "Платный TG-марафон 30 дней", "Нед 3-6", "₸200K", "500+ участников, ₸5M"],
              ["4", "Заказ резинок ZBody (500-1000 шт)", "Нед 2-8", "₸1.2M", "Товар готов к мес 3"],
              ["5", "MVP приложения (Flutter)", "Нед 1-12", "₸7M", "Beta к месяцу 3"],
              ["6", "Quiz-воронка", "Нед 4-6", "₸100K", "5K+ прохождений"],
              ["7", "Опрос аудитории", "Нед 1-2", "₸0", "2K+ ответов"],
              ["8", "Контент-план на 3 месяца", "Нед 2-3", "₸500K", "90 единиц контента"],
            ]}
          />

          <h3 style={{ ...sH3, color: C.blue }}>Фаза 2: GROWTH (Месяцы 4-9) — Бюджет: ₸23M</h3>
          <DataTable
            headers={["#", "Действие", "Срок", "Бюджет", "KPI"]}
            rows={[
              ["1", "Публичный запуск App (iOS + Android)", "Мес 4", "₸3M", "10K загрузок к мес 6"],
              ["2", "Леггинсы «Squat Collection» на Kaspi", "Мес 5", "₸5M", "Sold out первой партии"],
              ["3", "Амбассадорская программа (30 чел)", "Мес 4-5", "₸2M", "30 активных амбассадоров"],
              ["4", "66-дневный челлендж #ZBody66", "Мес 6-8", "₸1M", "5K+ участников"],
              ["5", "Интеграция BodyPro → App", "Мес 6-7", "₸2M", "300+ cross-sell"],
              ["6", "Маркетинг: 5-10 инфлюенсеров КЗ", "Мес 4-9", "₸5M", "+10K загрузок"],
              ["7", "Запуск спортпита (white-label)", "Мес 7-8", "₸3M", "2K продаж к мес 9"],
              ["8", "App v1.0 (питание + AI)", "Мес 7", "₸5M", "MAU 8K+"],
            ]}
          />

          <h3 style={{ ...sH3, color: C.pink }}>Фаза 3: SCALE (Месяцы 10-18) — Бюджет: ₸35M</h3>
          <DataTable
            headers={["#", "Действие", "Срок", "Бюджет", "KPI"]}
            rows={[
              ["1", "Казахский язык — полная локализация", "Мес 10-11", "₸3M", "Первое wellness-app на казахском"],
              ["2", "Выход на Узбекистан и Кыргызстан", "Мес 12-14", "₸5M", "5K загрузок из УЗ+КГ"],
              ["3", "B2B wellness (корпоративные программы)", "Мес 12-15", "₸3M", "5 корп. клиентов"],
              ["4", "Wearable-интеграция (Apple Watch, Mi Band)", "Мес 12-13", "₸4M", "Автотрекинг 30% юзеров"],
              ["5", "AI-coach (персонализация)", "Мес 14-16", "₸8M", "Retention D30 >35%"],
              ["6", "Полная линейка одежды (5+ SKU)", "Мес 12-18", "₸10M", "₸30M+ товарная выручка"],
              ["7", "Привлечение инвестиций (pre-Seed)", "Мес 15-18", "₸2M", "Питч-дек готов"],
            ]}
          />
        </Section>

        {/* ═══ 10. Технический стек ═══ */}
        <Section id="sec-10" title="10. Технический стек">
          <DataTable
            headers={["Компонент", "Решение", "Стоимость", "Обоснование"]}
            rows={[
              ["Мобильное приложение", "Flutter", "₸7-12M за MVP", "Один код → iOS + Android, 2-3 мес"],
              ["Backend", "Supabase", "Бесплатно до 50K MAU", "PostgreSQL + Auth + Storage"],
              ["Веб (quiz, лендинг)", "Vercel + Next.js", "Бесплатно", "CDN, автоскейлинг"],
              ["No-code MVP (Фаза 0)", "Telegram Web App", "₸500K-1M", "Запуск за 2-4 недели"],
              ["Telegram-бот", "Telegraf.js + Supabase", "₸300K", "Трекинг, напоминания, streak"],
              ["Платежи", "Apple IAP + Google + Kaspi", "—", "App store + локальный Kaspi"],
              ["Аналитика", "Amplitude", "Бесплатно до 50K MAU", "Funnels, retention, behavior"],
            ]}
          />

          <div style={{ ...sCard, background: `${C.cyan}08`, borderColor: C.cyan }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.cyan }}>Контент: адаптация под СНГ</h3>
            <ul style={{ ...sP, paddingLeft: 20 }}>
              <li>Планы питания: плов, бешбармак, лагман, курт, баурсаки (с расчётом КБЖУ)</li>
              <li>Замены продуктов: адаптация под Kaspi Delivery / Magnum / Small</li>
              <li>Сканер штрихкодов казахстанских продуктов</li>
              <li>Локализация: русский + казахский — первое wellness-app с полной КЗ-локализацией</li>
            </ul>
          </div>
        </Section>

        {/* ═══ 11. Маркетинговая стратегия ═══ */}
        <Section id="sec-11" title="11. Маркетинговая стратегия">
          <h3 style={sH3}>Каналы продвижения</h3>
          <DataTable
            headers={["Канал", "Действие", "Ожидаемый результат"]}
            rows={[
              ["Instagram Stories", "Ежедневные stories с трекером, Q&A", "50K+ охват/день"],
              ["Instagram Reels", "Дизайн-процесс, before/after", "500K+ views/reel"],
              ["Telegram", "Закрытая группа, ежедневная мотивация", "5K+ участников"],
              ["TikTok", "Короткие тренировки, challenge-видео", "Новая аудитория 18-25"],
              ["YouTube", "Длинные тренировки 20-40 мин", "SEO-трафик, доверие"],
            ]}
          />

          <h3 style={sH3}>Viral-механики</h3>
          <DataTable
            headers={["#", "Механика", "Описание"]}
            rows={[
              ["1", "#ZBodyChallenge", "Хештег + репост лучших → бесплатный UGC"],
              ["2", "Quiz-воронка", "«Узнай тип фигуры за 2 мин» → 10 вопросов → paywall"],
              ["3", "Referral «Приведи подругу»", "Обе получают 1 неделю Premium бесплатно"],
              ["4", "Streak-механика", "7 дней = бейдж, 30 = скидка, 66 = сертификат"],
              ["5", "Before/After контест", "Лучшая трансформация = полный набор товаров"],
            ]}
          />

          <h3 style={sH3}>Коллаборации в Казахстане</h3>
          <DataTable
            headers={["Партнёр", "Формат"]}
            rows={[
              ["Kaspi.kz", "Featured seller, промо в приложении Kaspi"],
              ["Magnum", "Здоровые продукты с QR → рецепт в приложении"],
              ["Фитнес-клубы КЗ", "Cross-promo, QR-коды в залах"],
              ["Микро-инфлюенсеры (10-50K)", "Region-specific промо в городах КЗ"],
            ]}
          />
        </Section>

        {/* ═══ 12. Риски ═══ */}
        <Section id="sec-12" title="12. Риски и митигация">
          <DataTable
            headers={["#", "Риск", "Вероятность", "Влияние", "Митигация"]}
            rows={[
              ["1", "Низкая конверсия free→paid", "Средняя", "Высокое", "Quiz-воронка: конверсия 10-15%. A/B тесты"],
              ["2", "Высокий churn (>15%/мес)", "Средняя", "Высокое", "66-дневные челленджи, streak, community"],
              ["3", "Задержка разработки MVP", "Высокая", "Среднее", "Начать с Telegram Web App, Flutter параллельно"],
              ["4", "BetterMe выходит на рус. рынок", "Низкая", "Высокое", "Локальная идентичность: казахский, Kaspi, BodyPro"],
              ["5", "Низкий спрос на товары", "Средняя", "Среднее", "Тестовые партии 500 шт, предзаказы через IG"],
              ["6", "Зависимость от бренда Зарины", "Высокая", "Высокое", "Добавлять других тренеров. ZBody отдельно от Зарины"],
              ["7", "Медицинские claim'ы", "Низкая", "Среднее", "Фокус на wellness, не лечение. Юр. экспертиза"],
              ["8", "Курсовые колебания ₸/$", "Средняя", "Среднее", "Предзаказы, локальные производители"],
              ["9", "Knockoffs на Kaspi", "Высокая", "Среднее", "Товарный знак, дизайн-патент, community-loyalty"],
              ["10", "Burnout основателя", "Средняя", "Высокое", "Делегирование: SMM, контент, ops к месяцу 4"],
            ]}
          />
        </Section>

        {/* ═══ 13. Next Steps ═══ */}
        <Section id="sec-13" title="13. Next Steps — ближайшие 2 недели">
          <DataTable
            headers={["#", "Действие", "Дедлайн", "Ответственный"]}
            rows={[
              ["1", "Запустить Telegram-группу «Челлендж ZBody»", "День 1-2", "Зарина"],
              ["2", "Провести опрос аудитории (1000+ ответов)", "День 3-5", "Зарина + SMM"],
              ["3", "Зарегистрировать товарный знак ZBody + домен", "День 1-7", "Юрист"],
              ["4", "Найти Flutter-студию: 3 КП, бюджет ₸7-12M", "День 7-14", "Алмас / CTO"],
              ["5", "Заказать первую партию резинок (500-1000 шт)", "День 7-14", "Зарина + закупщик"],
            ]}
          />

          <div style={{ ...sCard, borderColor: C.pink, borderWidth: 2, marginTop: 24 }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.pink, fontSize: 18 }}>Главный вывод</h3>
            <p style={sP}>
              <strong style={{ color: C.text }}>Зарина Гусман имеет лучшую стартовую позицию, чем Kayla Itsines в 2013:</strong> больше подписчиков, работающий бизнес (13 филиалов BodyPro), нулевая конкуренция в digital-wellness Казахстана. Kayla из схожей позиции построила бизнес на $400M.
            </p>
            <p style={sP}>
              Модель Phygital (товары + приложение + комьюнити) даёт <strong style={{ color: C.green }}>x5.25 LTV</strong> по сравнению с продажей только товаров и <strong style={{ color: C.green }}>65% рекуррентного дохода</strong>.
            </p>
            <p style={{ ...sP, color: C.pink, fontWeight: 600, fontSize: 15 }}>
              Рекомендация: запускать по сценарию C (Phygital) с первого дня.
            </p>
          </div>
        </Section>

        {/* ═══ Sources ═══ */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
          <h3 style={{ ...sH3, color: C.dim }}>Источники данных</h3>
          <ol style={{ ...sP, paddingLeft: 20, fontSize: 12, color: C.dim }}>
            <li>FitnessData / Informburo.kz — рынок фитнес-услуг Казахстана 2025</li>
            <li>Energyprom.kz — спортивные услуги РК 2024</li>
            <li>Kaspi Guide — комиссии маркетплейса</li>
            <li>Sifted.eu — BetterMe: $80-150M revenue, 110M users</li>
            <li>Fortune — Kayla Itsines: Sweat sold for $400M</li>
            <li>Collabstr — Gymshark 2023 revenue £556.2M</li>
            <li>Sacra — Noom: $1B ARR, $3.7B valuation</li>
            <li>Shopify Masters — POPFLEX: 800% growth</li>
            <li>WebMedia / Paladin — Flutter MVP: $20-50K, 2-4 months</li>
            <li>Harper&apos;s Bazaar KZ / ELLE KZ — интервью Зарины Гусман</li>
          </ol>
        </div>

        {/* ═══ Footer ═══ */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: C.dim }}>
            Подготовлено <strong style={{ color: C.text }}>Алмасом Касымжановым</strong> | Март 2026
          </p>
          <p style={{ fontSize: 12, color: C.faint, marginTop: 4 }}>
            Для обсуждения: @akasymzhanov
          </p>
        </div>

      </div>
    </div>
  );
}
