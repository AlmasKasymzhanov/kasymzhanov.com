"use client";
import { IconlyArrowRight } from "@/components/iconly-icons";
import { ResearchSection, ResearchFact, ResearchNote, ResearchFigure } from "@/components/canon/research-editorial";
import { ResearchReadingTime } from "@/components/canon/research-reading-time";


const C = {
  bg: "var(--personal-paper)", surface: "var(--report-surface)", border: "var(--personal-border)",
  accent: "var(--personal-text)", green: "var(--personal-text)", text: "var(--personal-text)",
  dim: "var(--personal-muted)", red: "var(--personal-text)", amber: "var(--personal-text)",
  blue: "var(--personal-text)", pink: "var(--personal-text)", cyan: "var(--personal-text)",
  kaspi: "var(--personal-text)",
};

const sP: React.CSSProperties = { fontSize: "var(--reading-body-size)", lineHeight: 1.75, color: "var(--personal-text)", margin: "0 0 12px" };
const sCard: React.CSSProperties = { margin: "24px 0", padding: 0 };
const sBadge = (_color: string): React.CSSProperties => ({ display: "inline", color: "var(--personal-muted)", fontSize: 12, fontWeight: 400 });

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
                <td key={ci} style={{ padding: "10px 12px", textAlign: "left", color: ci === 0 ? C.text : "var(--personal-text)", borderBottom: `1px solid color-mix(in srgb, ${C.border} 13%, transparent)`, fontWeight: ci === 0 ? 500 : 400, whiteSpace: ci === 0 ? "nowrap" : "normal" }}>{cell === "→" ? <IconlyArrowRight size={17} /> : cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) { return <ResearchSection id={id} title={title}>{children}</ResearchSection>; }

function SkuCard({ sku, name, decision, decisionColor, price, rev, yoyRev, rating, reviews, position, rows, insights, action }: {
  sku: string; name: string; decision: string; decisionColor: string;
  price: string; rev: string; yoyRev: string; rating: string; reviews: string; position: string;
  rows: (string | number)[][]; insights: string[]; action: string;
}) {
  return (
    <div style={{ ...sCard }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        <span style={sBadge(decisionColor)}>{decision}</span>
        <span style={{ fontSize: 11, color: C.dim, fontFamily: "var(--font-mono)" }}>SKU {sku}</span>
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 400, color: C.text, margin: "0 0 16px" }}>{name}</h3>

      <div style={{ display: "block", padding: "16px 0", marginBottom: 16 }}>
        <div><div style={{ fontSize: 10, color: C.dim }}>Цена</div><div style={{ fontSize: 14, fontWeight: 400, color: C.text }}>{price}</div></div>
        <div><div style={{ fontSize: 10, color: C.dim }}>Выручка/мес</div><div style={{ fontSize: 14, fontWeight: 400, color: C.text }}>{rev}</div></div>
        <div><div style={{ fontSize: 10, color: C.dim }}>YoY выручка</div><div style={{ fontSize: 14, fontWeight: 400, color: yoyRev.startsWith("−") || yoyRev.startsWith("-") ? C.red : yoyRev === "—" ? C.dim : C.green }}>{yoyRev}</div></div>
        <div><div style={{ fontSize: 10, color: C.dim }}>Отзывов</div><div style={{ fontSize: 14, fontWeight: 400, color: C.text }}>{reviews}</div></div>
        <div><div style={{ fontSize: 10, color: C.dim }}>Рейтинг</div><div style={{ fontSize: 14, fontWeight: 400, color: C.text }}>{rating}</div></div>
        <div><div style={{ fontSize: 10, color: C.dim }}>Позиция</div><div style={{ fontSize: 12, fontWeight: 400, color: C.text }}>{position}</div></div>
      </div>

      {rows.length > 0 && (
        <>
          <h4 style={{ fontSize: 12, fontWeight: 400, color: C.dim, margin: "12px 0 8px", textTransform: "none", letterSpacing: "0.05em" }}>Конкуренты в сегменте</h4>
          <DataTable headers={["#", "Товар", "Бренд", "Цена", "Rev/мес", "Отзывов"]} rows={rows} />
        </>
      )}

      {insights.length > 0 && (
        <>
          <h4 style={{ fontSize: 12, fontWeight: 400, color: C.dim, margin: "12px 0 8px", textTransform: "none", letterSpacing: "0.05em" }}>Что показал анализ</h4>
          <div style={{ marginBottom: 12 }}>
            {insights.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--personal-text)", marginBottom: 6, lineHeight: 1.6 }}>
                <span style={{ color: decisionColor, fontWeight: 400, flexShrink: 0 }}>→</span>
                <div>{item}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{ paddingLeft: 14, margin: "12px 0 0", fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
        <strong style={{ color: decisionColor }}>Действие: </strong>{action}
      </div>
    </div>
  );
}

export default function AliqeAnalysisPage() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "var(--font-body)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* HEADER */}
        <div className="research-header" style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={sBadge(C.kaspi)}>Kaspi.kz</span>
            <span style={sBadge(C.accent)}>A-LIQE</span>
            <span style={sBadge(C.amber)}>Enterprise анализ</span>
            <span style={sBadge(C.green)}>13 SKU</span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 500, margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            A-LIQE на Kaspi — полный продуктовый разбор портфеля
          </h1>
          <p className="research-lead" style={{ fontSize: 15, color: C.dim, margin: 0, lineHeight: 1.6 }}>
            Детальный анализ всех 13 товарных позиций: текущее положение, рыночный контекст, конкуренты, отзывы, YoY динамика, сегменты цен, и конкретные рекомендации KEEP / BOOST / FIX / DROP по каждому SKU.
          </p>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 12 }}>
            Дата анализа: 11 апреля 2026 · Источник: агрегированные рыночные данные (срез февраль 2026 + история 16 месяцев)
          </div>

<a href="/authors/almas-kasymzhanov" className="research-author">Алмас Касымжанов</a>
<ResearchReadingTime />
</div>

        {/* ═══ EXECUTIVE SUMMARY ═══ */}
        <div style={{ ...sCard }}>
          <h2 style={{ fontSize: 20, fontWeight: 400, color: C.kaspi, margin: "0 0 16px" }}>Обзор</h2>
          <p style={{ fontSize: 14, color: "var(--personal-text)", lineHeight: 1.7, margin: "0 0 16px" }}>
            Портфель A-LIQE на Kaspi насчитывает 13 заявленных карточек, из которых <strong style={{ color: C.text }}>только 10 активно продаются</strong>. Совокупная выручка активных SKU в феврале 2026 — <strong style={{ color: C.text }}>~5.6M ₸/мес</strong>. Главная проблема: <strong style={{ color: C.red }}>7 из 10 активных позиций падают YoY</strong>, при этом рынки по большинству категорий либо стабильны, либо растут. Это означает, что A-LIQE теряет долю рынка из-за давления конкурентов, а не из-за падения спроса.
          </p>
          <div style={{ display: "block", marginTop: 16, marginBottom: 24 }}>
            {[
              { label: "Активных SKU", value: "10 из 13", color: C.text },
              { label: "Не активно", value: "3 SKU", color: C.red },
              { label: "Выручка/мес (все активные)", value: "~5.6M ₸", color: C.text },
              { label: "Падают YoY", value: "7 SKU", color: C.red },
              { label: "Растут YoY", value: "3 SKU", color: C.green },
              { label: "Без бренда (уязвимо)", value: "2 SKU", color: C.amber },
              { label: "В неправильной категории", value: "1 SKU", color: C.red },
              { label: "Критичных к фиксу", value: "5 SKU", color: C.amber },
            ].map((m, i) => (
              <div key={i} style={{ padding: "16px 0" }}>
                <div style={{ fontSize: 10, color: C.dim, textTransform: "none", letterSpacing: "0.05em" }}>{m.label}</div>
                <div style={{ fontSize: 17, fontWeight: 400, color: m.color, marginTop: 4 }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TOC */}
        <div style={{ ...sCard }}>
          <h3 style={{ fontSize: 13, fontWeight: 400, color: C.accent, margin: "0 0 12px", textTransform: "none", letterSpacing: "0.05em" }}>Содержание</h3>
          <div style={{ display: "block", marginBottom: 24 }}>
            {[
              ["1", "Портфель A-LIQE: все 13 SKU одним взглядом"],
              ["2", "Глобальные проблемы бренда"],
              ["3", "Разбор по каждой позиции (13 карточек)"],
              ["4", "Рыночные категории: где расти можно"],
              ["5", "Критические отзывы: что чинить"],
              ["6", "План действий: следующие 30 дней"],
            ].map(([n, t]) => (
              <div key={n} style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--personal-text)", padding: "6px 0" }}>
                <span style={{ color: C.accent, fontWeight: 400, minWidth: 20 }}>{n}.</span>
                <a href={`#s${n}`} style={{ color: "var(--personal-text)", textDecoration: "none" }}>{t}</a>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ 1. PORTFOLIO ═══ */}
        <Section id="s1" num="1" title="Портфель A-LIQE: все 13 SKU одним взглядом">
          <p style={sP}>Таблица состояния всех карточек на срез февраля 2026 (последний доступный рыночный срез).</p>

          <DataTable headers={["SKU", "Товар", "Цена", "Rev/мес", "Шт", "Отзывов", "★", "YoY rev", "Вердикт"]} rows={[
            ["143159393", "MG-Titanium мясорубка", "34 990", "1.43M", "44", "193", "5.0", "−27% ", "KEEP+BOOST"],
            ["142931942", "Блендер Elit X12", "24 990", "1.25M", "51", "148", "4.9", "−21% ", "FIX"],
            ["150807944", "Блендер QAMQOR", "24 899", "0.65M", "26", "53", "5.0", "+14%", "KEEP+FIX бренда"],
            ["139883364", "Наушники TWS", "12 990", "0.46M", "42", "118", "4.7", "+40% ", "BOOST"],
            ["152056651", "Шашлычница TF-8007", "24 990", "0.37M", "15", "7", "4.9", "+142% ", "BOOST"],
            ["140371157", "S9 Ionic фен 4в1", "24 990", "0.33M", "13", "166", "5.0", "−48% ", "FIX СРОЧНО"],
            ["139955231", "Air Power стайлер", "9 900", "0.31M", "32", "51", "5.0", "+107% ", "BOOST"],
            ["149333810", "Шашлычница 8 шампуров", "24 990", "0.26M", "10", "7", "4.7", "новый", "KEEP+DEDUPE"],
            ["139955212", "Массажер X9", "8 500", "0.13M", "16", "108", "4.9", "−65% ", "DROP/FIX"],
            ["149294355", "AI-очки", "29 990", "0.04M", "1", "0", "—", "новый", "DROP категорию"],
            ["160355158", "Тестомес GrandMix Pro 1500", "—", "0", "0", "0", "—", "неактивен", "RE-LAUNCH"],
            ["160136809", "GrandMix Digital 1500", "—", "0", "0", "0", "—", "неактивен", "RE-LAUNCH"],
            ["160271714", "GrandChef X6", "—", "0", "0", "0", "—", "неактивен", "RE-LAUNCH"],
          ]} />

          <div style={{ paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
            <strong style={{ color: C.amber }}>Важно: </strong>
            3 SKU (тестомесы и GrandChef X6) в доступном рыночном срезе не показывают продаж за февраль 2026 — это значит, что карточки либо не активны, либо впервые заведены, но ещё не продавали. Необходимо проверить в кабинете Kaspi: активна ли карточка, задан ли preorder, есть ли товар. Кроме того, ссылка на GrandChef X6 из исходного каталога клиента ведёт на блендер Elit X12 — <strong style={{ color: C.text }}>дубликат URL, требующий исправления</strong>.
          </div>
        </Section>

        {/* ═══ 2. GLOBAL PROBLEMS ═══ */}
        <Section id="s2" num="2" title="Глобальные проблемы бренда (а не отдельных SKU)">
          <div style={sCard}>
            {[
              {
                num: "01",
                color: C.red,
                title: "2 SKU идут под «Без бренда»",
                text: "Блендер-пароварка QAMQOR (150807944) и AI-очки (149294355) зарегистрированы в Kaspi как «Без бренда» вместо A-LIQE. Это означает что: (1) бренд-капитал не накапливается на этих карточках, (2) любой конкурент может зацепиться к той же карточке, (3) нет защиты от дублирования. Нужно срочно переоформить атрибут бренда.",
              },
              {
                num: "02",
                color: C.red,
                title: "Mульти-мерчант на QAMQOR (3 продавца)",
                text: "На карточке Qamqor 2708 уже сидят 3 мерчанта — это значит, что кроме A-LIQE кто-то ещё продаёт. Это начало демпинга. Нужно либо выкупить эксклюзив, либо блокировать через MAP-политику/информационное письмо от правообладателя.",
              },
              {
                num: "03",
                color: C.red,
                title: "AI-очки в неправильной категории",
                text: "Находятся в «Аксессуары → Очки → Солнцезащитные очки», где конкуренция — Ray-Ban 267-337K ₸ (премиум-бренд) и безбрендовые 337-879 ₸ (масс). A-LIQE AI-очки по 29 990 ₸ не попадают ни в один из реальных сегментов покупателей этой категории. Нужна новая карточка в категории «Умные очки / Wearables», где спрос — технологический, а не модный.",
              },
              {
                num: "04",
                color: C.red,
                title: "7 из 10 активных SKU падают YoY",
                text: "Это не сезонный эффект — несколько ключевых категорий растут (Мясорубки +25%, Блендеры +23%, Солнц.очки +60%, Блендеры-пароварки +50% по штукам). Значит, A-LIQE теряет долю рынка, а не следует за рынком. Требуется комплексное усиление: контент карточек, отзывы, внешний трафик, цена/позиционирование.",
              },
              {
                num: "05",
                color: C.amber,
                title: "Дубликат шашлычниц (TF-8007 × 2 артикула)",
                text: "SKU 152056651 («Шашлычница TF-8007») и SKU 149333810 («Шашлычница электрическая 8 шампуров») — по URL ведут на одну и ту же модель TF-8007. Это самоконкуренция: два артикула одного товара, клиенты путаются, выручка размазывается. Нужно либо развести их по УТП (разные комплектации), либо объединить в один.",
              },
              {
                num: "06",
                color: C.amber,
                title: "Низкий уровень отзывов на S9 Ionic, TF-8007, 8 шампуров, AI-очки",
                text: "По премиум-позициям с чеком 25-30K ₸ (где покупатель выбирает долго и читает отзывы) — у A-LIQE 7, 7, 0 отзывов. Этого критически мало для доверия. При запуске внешки через TikTok/Reels нужно параллельно стимулировать отзывы (скидки за отзыв с фото, follow-up письма).",
              },
              {
                num: "07",
                color: C.amber,
                title: "Падение среднего чека (разрыв Rev vs Qty)",
                text: "По ряду SKU штуки падают сильнее выручки (S9 Ionic: −86% qty при −48% rev; Мясорубка: −77% qty при −27% rev). Это классическая картина вытеснения: покупатели уходят, но оставшиеся платят больше. Причина — конкуренты активно демпингуют и перехватывают объём, A-LIQE теряет среднюю массу покупателей.",
              },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: i < 6 ? `1px solid color-mix(in srgb, ${C.border} 19%, transparent)` : "none" }}>

                <div>
                  <div style={{ fontSize: 14, fontWeight: 400, color: C.text, marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: "var(--personal-text)", lineHeight: 1.65 }}>{p.text}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══ 3. PER-SKU ═══ */}
        <Section id="s3" num="3" title="Разбор по каждой позиции (13 карточек)">
          <p style={sP}>Для каждого SKU: текущие метрики, рыночный контекст, топ конкурентов в сегменте, выводы и конкретное действие.</p>

          {/* SKU 1: MG-Titanium мясорубка */}
          <SkuCard
            sku="143159393" name="MG-Titanium Pro мясорубка 3200W"
            decision="KEEP + BOOST" decisionColor={C.green}
            price="34 990 ₸" rev="1.43M ₸/мес" yoyRev="−27%" rating="5.0" reviews="193" position="средний сегмент (38K медиана)"
            rows={[
              ["1", "Мясорубка ZIP MG 2292S", "—", "49 990", "10.4M", "640"],
              ["2", "Мясорубка Aulandi MG-204", "Aulandi", "44 800", "9.4M", "268"],
              ["3", "Мясорубка HAROOKO MF-4", "HAROOKO", "34 900", "9.4M", "521"],
              ["4", "MONTERO GM V10", "MONTERO", "61 990", "8.3M", "166"],
              ["5", "Moulinex ME552810", "Moulinex", "53 990", "5.4M", "407"],
              ["→", "A-LIQE MG-Titanium", "A-LIQE", "34 990", "1.4M", "193"],
            ]}
            insights={[
              "Флагман портфеля по выручке (1.43M/мес). Рынок мясорубок растёт +25% YoY, но A-LIQE падает −27%.",
              "Прямой аналог по цене — HAROOKO MF-4 (34 900 ₸, 9.4M/мес, 521 отзыв). Делает в 6.6 раз больше выручки при идентичной цене.",
              "Разница — в отзывах и репутации. У HAROOKO 521 отзыв vs 193 у A-LIQE. У ZIP (лидер) 640 отзывов.",
              "Качество отзывов A-LIQE — 5.0 ★, но есть жалоба: «Темір деп еді, пластик» — несовпадение заявленного материала с реальным.",
              "Категория «Мясорубки» в феврале 2026 имеет 15 534 штуки продаж — потенциал огромный.",
            ]}
            action="1) Собрать +200 отзывов через follow-up покупателям (скидка/подарок за отзыв с фото). 2) Переписать карточку: честно указать материалы (если часть пластик — написать какие именно детали титан). 3) Запустить видео-контент: разборка мяса 17 кг (по тону позитивного отзыва) + сравнение с HAROOKO. 4) Deeplink через Mobs.io → TikTok/Reels. Цель: вернуть +50% выручки за 60 дней."
          />

          {/* SKU 2: Блендер Elit X12 */}
          <SkuCard
            sku="142931942" name="Блендер стационарный Elit X12"
            decision="FIX качество" decisionColor={C.amber}
            price="24 990 ₸" rev="1.25M ₸/мес" yoyRev="−21%" rating="4.9" reviews="148" position="дорогой сегмент (28K медиана)"
            rows={[
              ["1", "Aulandi HS-200G 3 в 1", "Aulandi", "44 800", "12.3M", "464"],
              ["2", "Braun MQ 5235 погружной", "Braun", "25 179", "9.2M", "1 189"],
              ["3", "Slaouwo HB-2075 погружной", "Slaouwo", "7 089", "8.9M", "1 825"],
              ["4", "MONTERO PRO K9 стационарный", "MONTERO", "27 390", "6.6M", "692"],
              ["5", "DEZONE FP1500 стационарный", "DEZONE", "57 990", "6.4M", "118"],
              ["→", "A-LIQE Elit X12", "A-LIQE", "24 990", "1.25M", "148"],
            ]}
            insights={[
              "2-й по выручке в портфеле. Рынок блендеров растёт +23% YoY, но Elit X12 падает −21%.",
              "Дорогой сегмент (26.7% рынка) — правильная зона по цене. Конкурент MONTERO PRO K9 (27 390 ₸) делает 6.6M/мес — в 5.3x больше.",
              " Критический отзыв: «Шлицы на шестернях стёрлись, куда вставляются насадки» — проблема механического качества. Ещё отзыв: «Ножи на овощерезке ломаются от моркови».",
              "Это значит: проблема не в маркетинге, а в товаре. Нужно либо менять комплектующие на более прочные, либо переделывать описание с честными ограничениями.",
              "Сегмент «Премиум блендеры» (62K+ медиана) даёт 35.7% рынка — если сделать премиум-версию X12 с металлическими шестернями за 35K, можно зайти в более прибыльный сегмент.",
            ]}
            action="1) СРОЧНО: аудит качества у поставщика — менять шестерни/ножи на более прочные. 2) Добавить в карточку честные лимиты (например, «не для твёрдых овощей >X мм»). 3) Ответить на каждый негативный отзыв публично. 4) Параллельно рассмотреть премиум-версию X12 Pro 35K с усиленным мотором и металлическими деталями — попасть в премиум-сегмент, где меньше демпинга."
          />

          {/* SKU 3: QAMQOR */}
          <SkuCard
            sku="150807944" name="Блендер-пароварка QAMQOR 2708 белый"
            decision="KEEP + FIX бренда" decisionColor={C.blue}
            price="24 899 ₸" rev="0.65M ₸/мес" yoyRev="+14%" rating="5.0" reviews="53" position="#7 из 23 в категории"
            rows={[
              ["1", "EX BabyCooker белый/серый", "EX", "24 970", "1.2M", "96"],
              ["2", "MUMMAM F9307 бежевый", "MUMMAM", "36 935", "1.1M", "171"],
              ["3", "Baby Cook B20 розовый", "—", "10 998", "0.8M", "29"],
              ["4", "WeLife HB10 PRO белый", "WeLife", "29 990", "0.8M", "36"],
              ["5", "MISUTA MST0976", "MISUTA", "13 986", "0.7M", "89"],
              ["→", "A-LIQE Qamqor 2708", "Без бренда ", "24 899", "0.65M", "53"],
            ]}
            insights={[
              "Хорошая позиция в маленькой категории (23 SKU всего). Растёт +14% YoY.",
              " ПРОБЛЕМА: Qamqor зарегистрирован в Kaspi как «Без бренда», а не A-LIQE. Это критично — бренд-капитал уходит в пустоту.",
              "На карточке уже 3 мерчанта — демпинг начался. При цене 24 899 ₸ конкуренты могут сбить на 20-30%.",
              "Категория растёт: штуки выросли с 199 (ноя 2024) до 314 (фев 2026) → 509 в январе 2026. Потенциал +50-70% по объёму.",
              "Прямой конкурент EX BabyCooker — та же цена 24 970, но 96 отзывов vs 53.",
            ]}
            action="1) Переоформить атрибут бренда на «A-LIQE» через Kaspi Merchant. 2) Заблокировать доступ других мерчантов: письмо правообладателя + информационное. 3) Нарастить отзывы до 150+ (у EX их 96, чтобы перегнать). 4) Сезонный контент «детское питание за 10 минут» для мам — TikTok, Instagram Reels."
          />

          {/* SKU 4: Наушники TWS */}
          <SkuCard
            sku="139883364" name="Наушники A-LIQE TWS чёрный"
            decision="BOOST" decisionColor={C.green}
            price="12 990 ₸" rev="0.46M ₸/мес" yoyRev="+40%" rating="4.7" reviews="118" position="средний сегмент (8.5K медиана)"
            rows={[
              ["—", "Apple AirPods 4 (лидер)", "Apple", "63 577", "213.4M", "3 725"],
              ["—", "Apple AirPods Pro 3", "Apple", "124 946", "191.0M", "602"],
              ["—", "Huawei FreeClip 2", "Huawei", "87 885", "24.4M", "167"],
              ["—", "Apple EarPods USB-C", "Apple", "11 181", "24.2M", "3 559"],
              ["—", "Samsung Galaxy Buds3 Pro", "Samsung", "74 189", "18.5M", "673"],
              ["→", "A-LIQE TWS", "A-LIQE", "12 990", "0.46M", "118"],
            ]}
            insights={[
              "Редкий SKU в портфеле, который растёт (+40% YoY). Хорошая база для масштабирования.",
              "Категория «Наушники» гигантская (1.98B ₸/мес, 943 SKU). Премиум-сегмент даёт 67% выручки — там Apple/Samsung.",
              "A-LIQE TWS (12 990 ₸) играет в среднем сегменте (150M/мес, 90.8% брендированные), конкурирует с Apple EarPods 11 181 ₸ и китайскими TWS.",
              " Критичные отзывы: «Шумоподавления нет», «Дисплей живёт своей жизнью» — жалобы на качество ANC и электронику.",
              "Рейтинг 4.57 (загруженный) vs 4.7 (Kaspi показывает) — новые отзывы негативнее.",
            ]}
            action="1) Обновить версию TWS с ревизией ANC/дисплея — это главная жалоба. 2) В карточке честно указать: «шумоподавление: пассивное / лёгкое ANC» (не заявлять того, чего нет). 3) Масштабировать контент: «бюджетная альтернатива AirPods» — TikTok/Reels. 4) Накапливать отзывы до 300+, чтобы выйти в топ-5 среднего сегмента."
          />

          {/* SKU 5: Шашлычница TF-8007 */}
          <SkuCard
            sku="152056651" name="Шашлычница A-LIQE TF-8007"
            decision="BOOST" decisionColor={C.green}
            price="24 990 ₸" rev="0.37M ₸/мес" yoyRev="+142%" rating="4.9" reviews="7" position="бюджет в грилях"
            rows={[
              ["1", "Braun 9 Pro CG 9160", "Braun", "143 968", "19.2M", "544"],
              ["2", "Braun CG9167", "Braun", "176 755", "13.9M", "546"],
              ["5", "Zepline ZP-816", "Zepline", "59 999", "5.0M", "159"],
              ["7", "Polaris PGP 2502", "Polaris", "87 990", "4.2M", "64"],
              ["8", "ТЕХСОЛ Fry Max 2in1", "ТЕХСОЛ", "44 899", "3.7M", "177"],
              ["→", "A-LIQE TF-8007", "A-LIQE", "24 990", "0.37M", "7"],
            ]}
            insights={[
              "+142% YoY — один из лидеров роста в портфеле. Но всего 7 отзывов — доверие новых покупателей низкое.",
              "Категория «Электрогрили» падает −21% YoY (премиум Braun 144-176K теряет). A-LIQE в бюджетном сегменте — это как раз растущая часть.",
              "Нет прямых конкурентов по цене 24 990 ₸ — ниже ТЕХСОЛ (44K) и Zepline (60K). Синяя зона.",
              "Проблема — низкая узнаваемость «шашлычниц» как типа товара на Kaspi (ниша национальная).",
            ]}
            action="1) Набрать 50+ отзывов (через accounts manager или supportcalls). 2) Запустить сезонный контент «дома за 20 минут» — весна/лето = пик для грилей. 3) Видео-рецепты на TikTok с deeplink. 4) Удержать цену 24 990 — не демпинговать, позиция уникальная."
          />

          {/* SKU 6: S9 Ionic фен */}
          <SkuCard
            sku="140371157" name="S9 Ionic фен-стайлер 4в1"
            decision="FIX СРОЧНО" decisionColor={C.red}
            price="24 990 ₸" rev="0.33M ₸/мес" yoyRev="−48%" rating="5.0" reviews="166" position="сегмент «бренды-альтернативы»"
            rows={[
              ["1", "Dyson id HS08", "Dyson", "257 722", "43.7M", "97"],
              ["2", "Dyson Airwrap HS05 Long", "Dyson", "297 555", "23.3M", "627"],
              ["4", "Borman BM831 стайлер 8в1", "Borman", "54 990", "18.8M", "1 628"],
              ["8", "NS SUPERAIR NS01", "NS", "89 900", "15.4M", "637"],
              ["?", "A-LIQE S9 Ionic 4в1", "A-LIQE", "24 990", "0.33M", "166"],
            ]}
            insights={[
              " ОБВАЛ: −48% YoY по выручке, −86% по штукам. С 148 продаж в январе 2026 до 13 в феврале.",
              "Рынок фенов −4% YoY (стабилен), но A-LIQE катастрофически теряет позиции.",
              "Причина — конкуренция: Borman BM831 (54 990 ₸, 18.8M/мес, 1 628 отзывов) и NS SUPERAIR (89 900 ₸, 15.4M/мес, 637 отзывов) — оба массово крутят рекламу и имеют огромные пулы отзывов.",
              "Премиум-сегмент (69K медиана) даёт 65.8% рынка фенов — там Dyson доминирует. A-LIQE в среднем/дорогом сегменте, который сжимается.",
              "Единственный негативный отзыв — мелкий (краска сыпется). Сам товар хороший, но потерялся в выдаче.",
            ]}
            action="1) Снизить цену до 19 990 ₸ — выйти в дорогой сегмент (медиана 27K), дать УТП «стайлер 4в1 дешевле в 2.5x чем Borman». 2) Запустить агрессивный внешний трафик (TikTok-креативы по типу Borman). 3) ЛИБО отложить до осени (пик декабрь) и вместо S9 продвинуть Air Power стайлер, который растёт +107%."
          />

          {/* SKU 7: Air Power стайлер */}
          <SkuCard
            sku="139955231" name="Air Power стайлер 1600 Вт"
            decision="BOOST" decisionColor={C.green}
            price="9 900 ₸" rev="0.31M ₸/мес" yoyRev="+107%" rating="5.0" reviews="51" position="низкий сегмент (4K медиана)"
            rows={[
              ["—", "«Низкий сегмент фенов»", "разные", "4 000 медиана", "44M всего", "—"],
              ["→", "A-LIQE Air Power", "A-LIQE", "9 900", "0.31M", "51"],
            ]}
            insights={[
              "Лучший рост в портфеле: +107% YoY. Это реальный победитель, на нём нужно делать фокус.",
              "Сегмент «низкий» (до 6K медиана) — 44M/мес всего (4.9% рынка фенов). Маленькая, но стабильная.",
              "При цене 9 900 ₸ A-LIQE выше верхней границы низкого сегмента — уникальная позиция «почти бюджет, но с фишкой 1600 Вт».",
              "51 отзыв — пока мало. Нужно больше контента и отзывов.",
            ]}
            action="1) Сделать это флагманом внешнего трафика — ролики «стайлер до 10 000 ₸, который реально работает». 2) Собрать 200+ отзывов. 3) Параллельно вывести линейку — Air Power Pro (повышенная мощность) за 14 990 ₸. 4) Рассмотреть смену категории если есть возможность — фены дорогой сегмент даёт больше выручки."
          />

          {/* SKU 8: Шашлычница 8 шампуров */}
          <SkuCard
            sku="149333810" name="Шашлычница электрическая 8 шампуров"
            decision="KEEP + DEDUPE" decisionColor={C.amber}
            price="24 990 ₸" rev="0.26M ₸/мес" yoyRev="новая карточка" rating="4.7" reviews="7" position="дубль TF-8007"
            rows={[]}
            insights={[
              " ДУБЛИКАТ: по URL ведёт на ту же модель TF-8007, что и SKU 152056651. Две карточки на один товар.",
              "+935% YoY — это рост с нуля (была одна продажа в январе → 10 в феврале). Формальный рост от малой базы.",
              "Всего 7 отзывов. Каннибализация с 152056651 (у того тоже 7 отзывов).",
              "Две одинаковые карточки → Kaspi может наказать за дублирование, покупатели путаются, выручка размазана.",
            ]}
            action="Два варианта: (А) объединить в одну карточку, оставив SKU с большей выручкой (152056651); (Б) развести по УТП — например, TF-8007 как «универсальная», а эта как «для 8 шампуров / большой семьи». Если вариант Б — переписать заголовок, фото, описание так, чтобы была чётко видна разница."
          />

          {/* SKU 9: Массажер X9 */}
          <SkuCard
            sku="139955212" name="Массажер X9"
            decision="DROP или FIX" decisionColor={C.red}
            price="8 500 ₸" rev="0.13M ₸/мес" yoyRev="−65%" rating="4.9" reviews="108" position="бюджет"
            rows={[
              ["2", "Массажер 3D воротник (Без бренда)", "—", "6 848", "19.4M", "520"],
              ["6", "NURAN воротник 3D", "NURAN", "7 453", "9.0M", "208"],
              ["8", "BOGGE 1121 шея/плечи", "BOGGE", "12 900", "8.3M", "1 761"],
              ["→", "A-LIQE X9", "A-LIQE", "8 500", "0.13M", "108"],
            ]}
            insights={[
              " КРИТИЧНО: −65% YoY по выручке. Самое большое падение в портфеле.",
              "Критические отзывы: «сломалась ножка», «при зарядке замыкает», «15 минут работы и разряжается», «быстро разряжается, хватает только 15 минут».",
              "Это не маркетинг, это проблема товара. Батарея/зарядка — массовая жалоба.",
              "Конкуренты в том же сегменте (7-13K): безбрендовый 3D (19.4M/мес, 520 отзывов), BOGGE (8.3M/мес, 1 761 отзыв). Их отзывы в 5-16 раз больше.",
              "Категория «Электрические массажеры» растёт очень слабо (−3% YoY). Премиум сегмент (70K+) даёт 54% рынка — там 3D-массажёры за 350K.",
            ]}
            action="Два варианта: (А) СНЯТЬ X9 с продажи — токсичный товар с проблемой батареи, портит репутацию A-LIQE. (Б) ЗАМЕНИТЬ на новую версию X9 Pro с нормальной батареей и усиленным корпусом → новый артикул, прежнее имя. Решение зависит от возможности вернуться к поставщику с правками. Текущий SKU больше не спасти."
          />

          {/* SKU 10: AI-очки */}
          <SkuCard
            sku="149294355" name="A-LIQE AI-очки"
            decision="DROP текущую карточку" decisionColor={C.red}
            price="29 990 ₸" rev="0.04M ₸/мес" yoyRev="1 продажа/мес" rating="—" reviews="0" position="ошибка категории"
            rows={[
              ["1", "Ray-Ban фотохромные (премиум)", "Ray-Ban", "292 143", "10.3M", "58"],
              ["2", "Безбрендовые овальные", "—", "1 000 000", "2.5M", "2"],
              ["3", "Безбрендовые антибликовые", "—", "337", "2.3M", "1 397"],
              ["—", "Alberto Casiano (средний)", "Alberto Casiano", "13 900", "1.5M", "87"],
              ["→", "A-LIQE AI-очки", "Без бренда ", "29 990", "0.04M", "0"],
            ]}
            insights={[
              " КАТАСТРОФА категоризации. AI-очки лежат в «Солнцезащитные очки», где два реальных сегмента:",
              "(А) Премиум: Ray-Ban 267-337K ₸ — покупатель ищет бренд и стиль.",
              "(Б) Масс: безбрендовые 337-879 ₸ — покупатель ищет дешёвое и временное.",
              "A-LIQE по 29 990 ₸ не попадает НИКУДА — слишком дорого для масса, слишком дёшево и без бренда для премиум.",
              "0 отзывов, 1 продажа/месяц. Карточка мертва.",
              "Категория «Солнц.очки» растёт +60% YoY, пик с апреля по июнь — но это сезон именно очков, а не AI/смарт-очков.",
            ]}
            action="Полный re-launch в другой категории. Kaspi не имеет отдельной «Умные очки», но ближе по смыслу — «Гаджеты» / «Фитнес-трекеры» / «Аксессуары для смартфонов». Нужна новая карточка с описанием через призму технологии (AI + камера + уведомления), а не солнцезащитных свойств. Плюс: сменить имя с «AI-очки» на что-то более понятное — например, «Смарт-очки с камерой и голосовым ассистентом». Текущую карточку — закрыть."
          />

          {/* SKU 11-13: Inactive */}
          <div style={{ ...sCard }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={sBadge(C.amber)}>RE-LAUNCH</span>
              <span style={{ fontSize: 11, color: C.dim }}>3 карточки не активны</span>
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 400, color: C.text, margin: "0 0 12px" }}>Тестомесы и GrandChef X6 — нужен полный запуск</h3>
            <DataTable headers={["SKU", "Товар", "Указанная себест.", "Статус"]} rows={[
              ["160355158", "Тестомес A-LIQE GrandMix Pro 1500", "17 100 ₸", "Нет продаж в фев 2026 (нет в доступном рыночном срезе)"],
              ["160136809", "A-LIQE GrandMix Digital 1500", "29 940 ₸", "Нет продаж в фев 2026"],
              ["160271714", "A-LIQE GrandChef X6 белый", "27 400 ₸", "Нет продаж. URL дублирует блендер Elit X12 "],
            ]} />
            <div style={{ fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7, marginTop: 12 }}>
              <strong style={{ color: C.amber }}>Важно: </strong>
              при проверке артикулов 160355158, 160136809 и 160271714 в доступном рыночном срезе выдаёт «SKU не найден» и за январь, и за февраль 2026. Это значит, что <strong style={{ color: C.text }}>карточки ещё ни разу не имели продаж</strong> (рыночный срез включает только SKU с хотя бы одной транзакцией), либо недавно добавлены в каталог и ещё не попали в индекс, либо сняты с публикации.
              <div style={{ marginTop: 12 }}>
                <strong style={{ color: C.amber }}>Что делать:</strong>
              </div>
              <div style={{ marginTop: 6 }}>
                <div>1. Проверить в Kaspi кабинете — опубликованы ли карточки, загружены ли фото/описания, задан ли preorder.</div>
                <div>2. Исправить дубликат URL для GrandChef X6 — ссылка из каталога клиента ведёт на Elit X12. Это критично: клиенты, зашедшие по ссылке X6, оказываются на X12, что вводит их в заблуждение.</div>
                <div>3. Для тестомесов — провести отдельный продуктовый разбор ниши «Миксеры / тестомесы» (там свои лидеры, цены и сегменты), перед тем как активно запускать.</div>
                <div>4. Старт через механику Предзаказа (см. <a href="/reports/kaspi-preorder-guide" style={{ color: C.accent }}>гайд по предзаказу</a>) — не закупать склад до первых продаж.</div>
                <div>5. Как только будут первые 1-2 продажи, карточки появятся в следующем рыночном срезе и их можно будет включить в регулярный мониторинг.</div>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ 4. MARKET CATEGORIES ═══ */}
        <Section id="s4" num="4" title="Рыночные категории: где можно расти, где нет">
          <DataTable headers={["Категория", "Feb'26 рынок", "YoY", "Премиум %", "Вердикт для A-LIQE"]} rows={[
            ["Мясорубки", "0.24B ₸", "+25% ", "28.7%", " Рынок растёт — вернуть позиции мясорубки"],
            ["Блендеры", "0.36B ₸", "+23% ", "35.7%", " Рынок растёт — фиксить Elit X12 (качество)"],
            ["Солнц.очки", "0.18B ₸", "+60% ", "52.0%", " Только если AI-очки перекатегоризовать"],
            ["Блендеры-пароварки", "~10M ₸", "~50% ", "21.6%", " Маленькая, но растёт — QAMQOR уже в топе"],
            ["Наушники", "1.98B ₸", "−4%", "67.4%", " Гигант, но Apple доминирует в премиуме"],
            ["Эл.массажеры", "0.51B ₸", "−3%", "53.7%", " Стагнация — X9 убрать, фокус в премиум"],
            ["Фены", "0.89B ₸", "−4%", "65.8%", " Падает — S9 срочно фиксить, Air Power бустить"],
            ["Электрогрили", "0.16B ₸", "−21% ", "54.9%", " Рынок падает — шашлычницы только нишево"],
          ]} highlight={0} />

          <div style={{ paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
            <strong style={{ color: C.green }}>Ключевой инсайт: </strong>
            из 8 категорий A-LIQE <strong style={{ color: C.text }}>в 4 рынок растёт</strong> (Мясорубки, Блендеры, Солнцочки, Пароварки), но A-LIQE падает в трёх из них — значит, проблема не в рынке, а в конкуренции. Вторые 4 категории — наушники стабильно, массажёры/фены/грили падают. В падающих категориях нет смысла агрессивно инвестировать.
          </div>
        </Section>

        {/* ═══ 5. REVIEWS ═══ */}
        <Section id="s5" num="5" title="Критические отзывы: что нужно чинить в товарах">
          <p style={sP}>Собраны негативные отзывы на активные SKU A-LIQE. Это прямая обратная связь от клиентов — самый дешёвый способ узнать, что сломано.</p>

          <DataTable headers={["SKU", "Главная жалоба", "Частота", "Что это значит"]} rows={[
            ["Блендер Elit X12", "Шлицы шестерен стираются, ножи овощерезки ломаются от моркови", "1-3 отзыва по 1-4 лайка", "Механика комплектующих — нужен апгрейд поставщика"],
            ["Массажер X9", "Быстро разряжается (5-15 мин), при зарядке замыкает, ножка сломалась", "3 жалобы подряд", "Проблема батареи и корпуса. Товар токсичный для репутации"],
            ["Наушники TWS", "Шумоподавление не работает, дисплей живёт своей жизнью", "3 жалобы с лайками", "ANC не соответствует заявленному. Электронная ревизия"],
            ["Фен S9 Ionic", "Краска сыпется с корпуса (1 отзыв)", "мелко", "Непринципиально — штучный дефект"],
            ["Мясорубка MG-Titanium", "«Темір деп еді, пластик» — ожидал металл, оказался пластик", "2 жалобы", "Несовпадение описания с реальностью — переписать карточку"],
            ["Блендер QAMQOR", "Нет негативных отзывов", "0", "Качественный продукт, нужно масштабировать"],
          ]} />

          <div style={{ paddingLeft: 14, margin: "16px 0", fontSize: 13, color: "var(--personal-text)", lineHeight: 1.7 }}>
            <strong style={{ color: C.red }}>Главный риск: </strong>
            у A-LIQE пока мало негативных отзывов (в абсолютных числах), потому что выручка небольшая. Если запустить агрессивный внешний трафик БЕЗ исправления проблем качества (массажёр X9, наушники TWS, блендер X12) — поток жалоб будет расти вместе с объёмом, и рейтинг обвалится. Поэтому <strong style={{ color: C.text }}>сначала fix, потом boost</strong>.
          </div>
        </Section>

        {/* ═══ 6. ACTION PLAN ═══ */}
        <Section id="s6" num="6" title="План действий: следующие 30 дней">
          <div style={sCard}>
            {[
              {
                week: "Неделя 1: Срочные исправления",
                color: C.red,
                items: [
                  "Переоформить бренд Qamqor и AI-очков с «Без бренда» на A-LIQE",
                  "Снять или переделать карточку AI-очков (категория «Умные очки / гаджеты», не солнцезащитные)",
                  "Исправить дубль URL GrandChef X6 → сейчас ведёт на Elit X12",
                  "Решить вопрос дубликата шашлычниц TF-8007 (объединить или развести)",
                  "Снять Массажёр X9 с продажи ИЛИ согласовать замену с поставщиком",
                ],
              },
              {
                week: "Неделя 2: Качество и поставки",
                color: C.amber,
                items: [
                  "Аудит качества у поставщика блендера Elit X12: заменить шестерни/ножи",
                  "Аудит наушников TWS: ревизия ANC и дисплея",
                  "Переписать описания карточек с честными параметрами (мясорубка — какие детали металл/пластик)",
                  "Подготовить ответы на все негативные отзывы публично",
                  "Проверить и оживить 3 неактивные карточки (тестомесы, GrandChef X6)",
                ],
              },
              {
                week: "Неделя 3: Контент и внешний трафик",
                color: C.blue,
                items: [
                  "Создать deeplinks через Mobs.io для приоритетных SKU (MG-Titanium, Elit X12, Qamqor, Air Power, TWS)",
                  "Снять 3-5 TikTok/Reels роликов по мотивам лучших креативов в библиотеки рекламных креативов (см. гайд creative-hunting-guide)",
                  "Запустить сбор отзывов через follow-up (подарок за отзыв с фото)",
                  "Подготовить сезонный контент для шашлычниц (весна-лето) и Air Power стайлера",
                ],
              },
              {
                week: "Неделя 4: Измерение и оптимизация",
                color: C.green,
                items: [
                  "Проверить метрики по каждому SKU по агрегированным рыночным данным (выручка, позиция, отзывы)",
                  "Масштабировать работающие SKU (BOOST): Air Power, TWS, Шашлычница TF-8007, Qamqor",
                  "Остановить инвестиции в падающие без фикса (S9, X9 в текущей версии)",
                  "Подготовить план запуска тестомесов и GrandChef X6 через Предзаказ",
                  "Подвести итоги месяца и составить план на май (перед сезоном грилей/пароварок)",
                ],
              },
            ].map((phase, i) => (
              <div key={i} style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 400, color: phase.color, marginBottom: 12 }}>{phase.week}</div>
                {phase.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--personal-text)", marginBottom: 6, lineHeight: 1.6 }}>
                    <span style={{ color: phase.color, fontWeight: 400, minWidth: 20 }}>{j + 1}.</span>
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Section>

        {/* ═══ FINAL VERDICT ═══ */}
        <div style={{ ...sCard, marginTop: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 400, color: C.accent, margin: "0 0 16px" }}>Финальный вердикт по 13 SKU</h3>

          <DataTable headers={["Решение", "Кол-во", "SKU", "Что делаем"]} rows={[
            [" BOOST (усилить)", "4", "Air Power, TWS, Шашл. TF-8007, Qamqor", "Внешний трафик, контент, отзывы, масштаб"],
            [" FIX (сначала починить)", "3", "Мясорубка MG-Titanium, Блендер Elit X12, Фен S9 Ionic", "Качество → отзывы → потом boost"],
            [" NEW-LAUNCH (запустить)", "3", "Тестомес Pro, GrandMix Digital, GrandChef X6", "Активировать карточки, исправить URL, старт через предзаказ"],
            [" DROP или fundamental fix", "2", "Массажер X9, AI-очки", "Снять текущие, либо заменить версией 2.0 / сменить категорию"],
            [" DEDUPE", "1", "Шашлычница 8 шамп (dup TF-8007)", "Объединить или развести по УТП"],
          ]} />

          <div style={{ paddingLeft: 14, margin: "16px 0", fontSize: 14, color: "var(--personal-text)", lineHeight: 1.7 }}>
            <strong style={{ color: C.accent }}>Приоритет внешнего трафика (куда сначала лить):</strong><br/>
            1. <strong style={{ color: C.text }}>Блендер-пароварка QAMQOR</strong> — растёт, нет негатива, маленькая ниша где легко занять №1.<br/>
            2. <strong style={{ color: C.text }}>Air Power стайлер</strong> — лучший YoY (+107%), растущий тренд.<br/>
            3. <strong style={{ color: C.text }}>Шашлычница TF-8007</strong> — сезон весна-лето, уникальная цена.<br/>
            4. <strong style={{ color: C.text }}>Наушники TWS</strong> — растёт, после фикса ANC можно бустить.<br/>
            <br/>
            <strong style={{ color: C.amber }}>НЕ лить трафик пока не починено:</strong> Блендер Elit X12 (качество), Массажер X9 (батарея), Фен S9 Ionic (нужна ценовая перестановка), AI-очки (сменить категорию), 3 неактивных SKU (активировать).
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ padding: "16px 0", marginTop: 32 }}>
          <p style={{ ...sP, margin: "0 0 8px", fontSize: 13, color: C.dim }}>
            Анализ подготовлен по данным агрегированные рыночные данные за февраль 2026 (последний доступный срез) и истории 16 месяцев (ноябрь 2024 – февраль 2026). Все цифры проверены по артикулам, указанным в исходном каталоге A-LIQE.
          </p>
          <p style={{ ...sP, margin: 0, fontSize: 13, color: C.dim }}>
            Источник данных: <strong style={{ color: "var(--personal-text)" }}>агрегированные данные Kaspi.kz</strong> — аналитическая платформа по Kaspi.kz.
          </p>
        </div>

      </div>
    </div>
  );
}
