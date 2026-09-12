"use client";
import { MaterialViews } from "@/components/engagement/material-views";
import { IconlyArrowLeft, IconlyArrowRight } from "@/components/iconly-icons";
import { ResearchSection, ResearchFact } from "@/components/canon/research-editorial";

import Link from "next/link";
import { useState } from "react";

/* ───── design tokens ───── */
const C = {
  bg: "var(--personal-paper)",
  surface: "var(--report-surface)",
  border: "var(--personal-border)",
  accent: "var(--personal-text)",
  green: "var(--personal-text)",
  text: "var(--personal-text)",
  dim: "var(--personal-muted)",
  faint: "var(--personal-border)",
  red: "var(--personal-text)",
  amber: "var(--personal-text)",
};

/* ───── style helpers ───── */
const sSection: React.CSSProperties = { marginBottom: 48 };
const sH2: React.CSSProperties = { fontSize: 22, fontWeight: 500, margin: "0 0 20px", color: C.text, letterSpacing: "-0.01em" };
const sH3: React.CSSProperties = { fontSize: 16, fontWeight: 500, margin: "28px 0 12px", color: C.text };
const sP: React.CSSProperties = { fontSize: 17, lineHeight: 1.7, color: "var(--personal-text)", margin: "0 0 12px" };
const sCard: React.CSSProperties = { margin: "28px 0", padding: 0 };
const sCode: React.CSSProperties = { background: "var(--personal-rail-hover)", color: C.accent, padding: "2px 7px", borderRadius: 4, fontSize: 12, fontFamily: "var(--font-mono)" };
const sCodeBlock: React.CSSProperties = { background: "var(--personal-paper)", border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 20px", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--personal-text)", lineHeight: 1.6, overflowX: "auto", whiteSpace: "pre", marginBottom: 12, position: "relative" };
const sBadge = (color: string): React.CSSProperties => ({ display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 500, background: `color-mix(in srgb, ${color} 9%, transparent)`, color, marginRight: 6 });
const sStepNum: React.CSSProperties = { display: "none" };

/* ───── CopyBtn ───── */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      style={{ position: "absolute", top: 8, right: 8, background: copied ? `color-mix(in srgb, ${C.green} 13%, transparent)` : `color-mix(in srgb, ${C.accent} 13%, transparent)`, color: copied ? C.green : C.accent, border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontWeight: 500, transition: "all 0.2s" }}
    >
      {copied ? "Скопировано!" : "Копировать"}
    </button>
  );
}

/* ───── Collapsible JSON block ───── */
function JsonBlock({ title, json }: { title: string; json: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 8, marginBottom: 12 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 14px", color: C.dim, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
      >
        <span style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>&#9654;</span>
        {title}
      </button>
      {open && (
        <div style={{ ...sCodeBlock, marginTop: 8 }}>
          <CopyBtn text={json} />
          {json}
        </div>
      )}
    </div>
  );
}

/* ───── Prompt block (collapsible with copy) ───── */
function PromptBlock({ prompt }: { prompt: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 12 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ background: `color-mix(in srgb, ${C.accent} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${C.accent} 27%, transparent)`, borderRadius: 6, padding: "6px 14px", color: C.accent, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontWeight: 500 }}
      >
        <span style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>&#9654;</span>
        Промпт для Claude после скачивания
      </button>
      {open && (
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 6 }}>
            Скачайте JSON из Hoppscotch &rarr; загрузите в Claude &rarr; вставьте этот промпт:
          </div>
          <div style={{ ...sCodeBlock, whiteSpace: "pre-wrap", fontSize: 12, lineHeight: 1.6 }}>
            <CopyBtn text={prompt} />
            {prompt}
          </div>
        </div>
      )}
    </div>
  );
}

/* ───── Endpoint Card ───── */
function EndpointCard({ num, name, method, url, params, desc, useCase, jsonExample, prompt }: {
  num: number; name: string; method?: string; url: string;
  params?: { name: string; desc: string; example: string }[];
  desc: string; useCase: string; jsonExample?: string; prompt?: string;
}) {
  const fullUrl = `https://mpstats.io/api${url}${params ? "?" + params.map(p => `${p.name}=${p.example}`).join("&") : ""}`;
  return (
    <div style={sCard}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ ...sStepNum, background: `color-mix(in srgb, ${C.green} 13%, transparent)`, color: C.green }}>{num}</span>
        <span style={{ fontSize: 15, fontWeight: 500, color: C.text }}>{name}</span>
        <span style={sBadge(C.green)}>{method || "GET"}</span>
      </div>
      <p style={{ ...sP, marginBottom: 8 }}>{desc}</p>
      <div style={{ ...sCodeBlock, fontSize: 11 }}>
        <CopyBtn text={fullUrl} />
        <span style={{ color: C.green }}>GET</span>{" "}
        <span style={{ color: C.accent }}>{url}</span>
        {params && params.map(p => (
          <span key={p.name}>
            {"\n  "}<span style={{ color: C.amber }}>{p.name}</span>=<span style={{ color: "#aaa" }}>{p.example}</span>
          </span>
        ))}
      </div>
      {params && (
        <div style={{ marginBottom: 8 }}>
          {params.map(p => (
            <div key={p.name} style={{ fontSize: 12, color: "#aaa", marginBottom: 4, paddingLeft: 8 }}>
              <span style={sCode}>{p.name}</span> — {p.desc}
            </div>
          ))}
        </div>
      )}
      <div style={{ fontSize: 12, color: C.dim, marginTop: 8 }}>
        <strong style={{ color: C.amber }}>Когда использовать:</strong> {useCase}
      </div>
      {jsonExample && <JsonBlock title="Пример ответа (JSON)" json={jsonExample} />}
      {prompt && <PromptBlock prompt={prompt} />}
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/*                  MAIN PAGE                      */
/* ═══════════════════════════════════════════════ */
export default function MpstatsApiGuide() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "var(--font-body)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <Link href="/tools/wb-analyzer" style={{ color: C.dim, fontSize: 13, textDecoration: "none" }}>
            <IconlyArrowLeft size={17} className="reading-inline-icon" /> WB Niche Analyzer
          </Link>
          <h1 style={{ fontSize: 28, fontWeight: 500, margin: "16px 0 8px", letterSpacing: "-0.02em" }}>
            MPStats API Гайд
          </h1>
          <MaterialViews />
          <p style={{ color: C.dim, fontSize: 14, margin: 0 }}>
            Пошаговая инструкция по работе с API для выгрузки данных Wildberries
          </p>
        </div>

        {/* ═══ Section 1: Что такое API? ═══ */}
        <div style={sSection}>
          <h2 style={sH2}>1. Что такое API?</h2>
          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Простая аналогия</h3>
            <p style={sP}>
              Представьте ресторан. Вы (программа) сидите за столиком. Кухня (сервер MPStats) готовит блюда (данные).
              Вы не можете зайти на кухню сами — вам нужен <strong style={{ color: C.accent }}>официант (API)</strong>.
            </p>
            <div style={{ display: "block", alignItems: "center", padding: "16px 0", textAlign: "center" }}>
              <div style={{ ...sCard, marginBottom: 0, padding: 12 }}>
                <div style={{ fontSize: 16, marginBottom: 4 }}>&#128187;</div>
                <div style={{ fontSize: 11, color: C.dim }}>Вы (Hoppscotch)</div>
              </div>
              <div style={{ color: C.accent, fontSize: 16 }}>&rarr;</div>
              <div style={{ ...sCard, marginBottom: 0, padding: 12, borderColor: C.accent }}>
                <div style={{ fontSize: 16, marginBottom: 4 }}>&#129309;</div>
                <div style={{ fontSize: 11, color: C.accent }}>API (официант)</div>
              </div>
              <div style={{ color: C.accent, fontSize: 16 }}>&rarr;</div>
              <div style={{ ...sCard, marginBottom: 0, padding: 12 }}>
                <div style={{ fontSize: 16, marginBottom: 4 }}>&#127859;</div>
                <div style={{ fontSize: 11, color: C.dim }}>Сервер (кухня)</div>
              </div>
            </div>
            <p style={sP}>
              Вы отправляете <strong style={{ color: C.green }}>запрос</strong> (например: &laquo;дай мне все подкатегории раздела Здоровье&raquo;),
              а API возвращает <strong style={{ color: C.green }}>ответ</strong> — данные в формате JSON.
            </p>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Что такое JSON?</h3>
            <p style={sP}>JSON — это просто текст, структурированный в пары &laquo;ключ: значение&raquo;. Вот пример:</p>
            <div style={sCodeBlock}>
{`{
  "name": "Компрессионные чулки",
  "revenue": 180900882,
  "sales": 129102,
  "items": 37382,
  "rating": 4.86
}`}
            </div>
            <p style={{ ...sP, marginBottom: 0 }}>
              Это читается так: ниша &laquo;Компрессионные чулки&raquo;, выручка 180.9M, продаж 129K, товаров 37K, рейтинг 4.86.
            </p>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Зачем нужен API?</h3>
            <div style={{ display: "block" }}>
              {[
                { icon: "&#9889;", title: "Скорость", desc: "Выгрузка 100K+ товаров за секунды" },
                { icon: "&#128202;", title: "Массовый анализ", desc: "Все бренды, продавцы, отзывы разом" },
                { icon: "&#129302;", title: "Автоматизация", desc: "Можно загрузить данные в Claude для AI-анализа" },
                { icon: "&#128200;", title: "Исторические данные", desc: "Тренды ниши за 5 лет" },
              ].map((item, i) => (
                <div key={i} style={{ padding: "16px 0" }}>
                  <div style={{ fontSize: 16, marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: item.icon }} />
                  <div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: C.dim }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ Section 2: Как получить API-ключ ═══ */}
        <div style={sSection}>
          <h2 style={sH2}>2. Как получить API-ключ MPStats</h2>
          <div style={sCard}>
            {[
              "Зайдите на mpstats.io и авторизуйтесь",
              "Откройте Настройки аккаунта (иконка профиля → Настройки)",
              "Найдите раздел API и нажмите \"Получить API-токен\"",
              "Скопируйте токен — это строка вида 69a694...ffe2d",
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                <span style={sStepNum}>{i + 1}</span>
                <span style={{ ...sP, margin: 0, paddingTop: 3 }}>{step}</span>
              </div>
            ))}
            <div style={{ padding: "16px 0", marginTop: 12, fontSize: 13, color: C.red }}>
              <strong>Важно:</strong> API-ключ — это как пароль. Никому не показывайте и не публикуйте его. Нужна платная подписка MPStats с доступом к API.
            </div>
          </div>
        </div>

        {/* ═══ Section 3: Инструменты ═══ */}
        <div style={sSection}>
          <h2 style={sH2}>3. Инструменты для работы с API</h2>
          <div style={{ display: "block" }}>
            <div style={{ ...sCard, borderColor: C.green }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: C.green, marginBottom: 8 }}>Hoppscotch</div>
              <div style={sBadge(C.green)}>Бесплатно</div>
              <div style={sBadge(C.green)}>Рекомендуем</div>
              <p style={{ ...sP, marginTop: 12 }}>
                Работает прямо в браузере. Зайдите на <strong>hoppscotch.io</strong>, никакой установки.
              </p>
              <p style={{ ...sP, marginBottom: 0 }}>
                Внизу страницы вы сможете скачать готовую коллекцию запросов и импортировать в Hoppscotch.
              </p>
            </div>
            <div style={sCard}>
              <div style={{ fontSize: 15, fontWeight: 500, color: C.text, marginBottom: 8 }}>Postman</div>
              <div style={sBadge(C.amber)}>Платный</div>
              <p style={{ ...sP, marginTop: 12 }}>
                Профессиональный инструмент. Если уже пользуетесь — работайте в нём. Запросы те же самые.
              </p>
            </div>
          </div>
        </div>

        {/* ═══ Section 4: Первый запрос ═══ */}
        <div style={sSection}>
          <h2 style={sH2}>4. Первый запрос — Пошаговый туториал</h2>
          <div style={sCard}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 16 }}>
              <span style={sStepNum}>1</span>
              <div>
                <div style={{ fontWeight: 500, color: C.text, marginBottom: 4 }}>Откройте Hoppscotch</div>
                <p style={{ ...sP, margin: 0 }}>Зайдите на <span style={sCode}>hoppscotch.io</span> в браузере</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 16 }}>
              <span style={sStepNum}>2</span>
              <div>
                <div style={{ fontWeight: 500, color: C.text, marginBottom: 4 }}>Метод: GET</div>
                <p style={{ ...sP, margin: 0 }}>Убедитесь что выбран метод <span style={sCode}>GET</span> (по умолчанию)</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 16 }}>
              <span style={sStepNum}>3</span>
              <div>
                <div style={{ fontWeight: 500, color: C.text, marginBottom: 4 }}>Вставьте URL</div>
                <div style={{ ...sCodeBlock, marginTop: 8, fontSize: 11 }}>
                  <CopyBtn text="https://mpstats.io/api/wb/get/category/subcategories?d1=2026-02-01&d2=2026-03-01&path=Здоровье" />
                  https://mpstats.io/api/wb/get/category/subcategories?d1=2026-02-01&d2=2026-03-01&path=Здоровье
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 16 }}>
              <span style={sStepNum}>4</span>
              <div>
                <div style={{ fontWeight: 500, color: C.text, marginBottom: 4 }}>Добавьте заголовок авторизации</div>
                <p style={{ ...sP, margin: "0 0 8px" }}>Вкладка <span style={sCode}>Headers</span> &rarr; добавьте:</p>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 0 }}>
                  <tbody>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ padding: "8px 12px", color: C.accent, fontWeight: 500 }}>X-Mpstats-TOKEN</td>
                      <td style={{ padding: "8px 12px", color: C.dim }}>ваш_api_ключ_из_mpstats</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "8px 12px", color: C.accent, fontWeight: 500 }}>Content-Type</td>
                      <td style={{ padding: "8px 12px", color: C.dim }}>application/json</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={sStepNum}>5</span>
              <div>
                <div style={{ fontWeight: 500, color: C.text, marginBottom: 4 }}>Нажмите Send</div>
                <p style={{ ...sP, margin: 0 }}>Получите JSON с подкатегориями раздела &laquo;Здоровье&raquo; — выручка, товары, бренды, продавцы по каждой.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ Section 5: Эндпоинты — Анализ ниши ═══ */}
        <div style={sSection}>
          <h2 style={sH2}>5. Эндпоинты: Анализ ниши</h2>
          <p style={sP}>Эти запросы помогут понять нишу целиком: размер, тренды, конкуренты.</p>

          <EndpointCard
            num={1}
            name="Подкатегории"
            url="/wb/get/category/subcategories"
            params={[
              { name: "d1", desc: "Начало периода", example: "2026-02-01" },
              { name: "d2", desc: "Конец периода", example: "2026-03-01" },
              { name: "path", desc: "Путь категории (например: Здоровье, Здоровье/Ортопедия)", example: "Здоровье" },
            ]}
            desc="Возвращает все подкатегории с метриками: товары, продажи, выручка, бренды, продавцы, средняя цена."
            useCase="Первый шаг — найти перспективные подкатегории внутри большого раздела."
            jsonExample={`[
  {
    "name": "Компрессионный трикотаж",
    "items": 37382,
    "items_with_sells": 5048,
    "sales": 129102,
    "revenue": 180900882,
    "avg_price": 1564,
    "rating": 4.86
  },
  ...
]`}
            prompt={`Я загружаю JSON с подкатегориями Wildberries из MPStats API (эндпоинт /wb/get/category/subcategories).

Проанализируй все подкатегории и составь рейтинг ТОП-10 самых перспективных для выхода нового продавца. Для каждой подкатегории оцени:

1. Объём рынка (выручка, продажи)
2. Конкуренция (количество товаров, % товаров с продажами)
3. Средний чек и маржинальность
4. Рейтинг — есть ли проблемы с качеством (низкий рейтинг = возможность)

Выведи результат в таблице с колонками: Подкатегория | Выручка | Продажи | Товаров | % с продажами | Ср.цена | Рейтинг | Вердикт (подходит / требует проверки / не подходит)

В конце дай ТОП-3 рекомендации: в какую подкатегорию лучше всего зайти и почему.`}
          />

          <EndpointCard
            num={2}
            name="Тренды ниши (до 5 лет)"
            url="/wb/get/category/trends"
            params={[
              { name: "d1", desc: "Начало (можно с 2020 года)", example: "2024-01-01" },
              { name: "d2", desc: "Конец", example: "2026-03-01" },
              { name: "path", desc: "Путь категории", example: "Здоровье/Ортопедия" },
            ]}
            desc="Помесячные данные: выручка, товары, продажи, средняя цена. Показывает рост или падение ниши."
            useCase="Проверить: ниша растёт или умирает? Есть ли сезонность?"
            jsonExample={`[
  {
    "date": "2024-01-01",
    "items": 120000,
    "sales": 450000,
    "revenue": 550000000,
    "average_order_value": 1222
  },
  ...
]`}
            prompt={`Я загружаю JSON с трендами ниши Wildberries за несколько лет (эндпоинт /wb/get/category/trends).

Проанализируй динамику ниши:

1. **Тренд выручки**: растёт, падает или стагнирует? Посчитай % изменения по годам
2. **Сезонность**: есть ли пики/спады? В какие месяцы максимум и минимум продаж?
3. **Средний чек**: как менялся? Рынок идёт в премиум или в эконом?
4. **Количество товаров**: растёт ли конкуренция? Как быстро приходят новые продавцы?
5. **Прогноз**: на основе тренда — что ожидать в ближайшие 6-12 месяцев?

Вердикт:  Ниша растёт — заходить /  Стагнация — осторожно /  Падение — не заходить

Покажи ключевые цифры: выручка год назад vs сейчас, % роста, пиковые месяцы.`}
          />

          <EndpointCard
            num={3}
            name="Ценовые сегменты"
            url="/wb/get/category/price_segmentation"
            params={[
              { name: "d1", desc: "Начало", example: "2026-02-01" },
              { name: "d2", desc: "Конец", example: "2026-03-01" },
              { name: "path", desc: "Путь категории", example: "Здоровье/Ортопедия" },
            ]}
            desc="Разбивка ниши по ценовым диапазонам: сколько товаров, выручка, упущенная прибыль в каждом сегменте."
            useCase="Определить в каком ценовом сегменте больше денег и меньше конкуренции."
            jsonExample={`[
  {
    "range": "500-1200",
    "items": 15000,
    "revenue": 85000000,
    "sales": 95000,
    "lost_profit_percent": 18
  },
  ...
]`}
            prompt={`Я загружаю JSON с ценовой сегментацией ниши Wildberries (эндпоинт /wb/get/category/price_segmentation).

Проанализируй ценовые сегменты и помоги выбрать оптимальный для входа:

1. **Какой сегмент самый денежный?** Где максимальная выручка?
2. **Какой сегмент наименее конкурентный?** Где меньше всего товаров на рубль выручки?
3. **Упущенная выручка**: в каком сегменте самый высокий % упущенной прибыли? (это сигнал — спрос есть, товаров не хватает)
4. **Средняя выручка на товар**: посчитай для каждого сегмента (выручка / товары)

Выведи таблицу: Ценовой сегмент | Товаров | Выручка | Продажи | Упущ. прибыль % | Выручка/товар

Рекомендация: в какой ценовой сегмент заходить и какую цену ставить? Обоснуй цифрами.`}
          />

          <EndpointCard
            num={4}
            name="ТОП бренды в нише"
            url="/wb/get/category/brands"
            params={[
              { name: "d1", desc: "Начало", example: "2026-02-01" },
              { name: "d2", desc: "Конец", example: "2026-03-01" },
              { name: "path", desc: "Путь категории", example: "Здоровье/Ортопедия" },
            ]}
            desc="Все бренды в нише с выручкой, продажами, количеством товаров и рейтингом."
            useCase="Узнать кто лидеры рынка, какая доля у 'безбрендовых' товаров."
            prompt={`Я загружаю JSON со всеми брендами в нише Wildberries (эндпоинт /wb/get/category/brands).

Проведи конкурентный анализ брендов:

1. **ТОП-10 брендов по выручке** — таблица: Бренд | Выручка | Продажи | Товаров | Ср.цена | Рейтинг
2. **Концентрация рынка**: какую долю забирает ТОП-3 и ТОП-10? Рынок монополизирован или раздроблен?
3. **Безбрендовые товары**: какая доля выручки у товаров без бренда? (если >30% — можно зайти без бренда)
4. **Слабые места лидеров**: у кого низкий рейтинг? У кого мало товаров, но высокая выручка?
5. **Окно возможности**: есть ли бренды с высокими продажами но низким рейтингом? (их клиенты недовольны — можно забрать)

Вердикт: стоит ли создавать свой бренд или можно работать без бренда? Обоснуй данными.`}
          />

          <EndpointCard
            num={5}
            name="ТОП продавцы в нише"
            url="/wb/get/category/sellers"
            params={[
              { name: "d1", desc: "Начало", example: "2026-02-01" },
              { name: "d2", desc: "Конец", example: "2026-03-01" },
              { name: "path", desc: "Путь категории", example: "Здоровье/Ортопедия" },
            ]}
            desc="Все продавцы: выручка, количество товаров, бренды, % товаров с продажами."
            useCase="Изучить конкурентов: сколько зарабатывают, сколько SKU держат."
            prompt={`Я загружаю JSON со всеми продавцами в нише Wildberries (эндпоинт /wb/get/category/sellers).

Проанализируй конкурентную среду:

1. **ТОП-10 продавцов по выручке** — таблица: Продавец | Выручка | Продажи | Товаров | % с продажами | Брендов
2. **Распределение выручки**: какую долю забирает ТОП-5? Есть ли монополист (>30% рынка)?
3. **Средняя выручка на продавца**: сколько зарабатывает типичный продавец?
4. **Барьер входа**: сколько SKU нужно чтобы конкурировать? У успешных продавцов 1-2 товара или 50+?
5. **Эффективность**: кто умудряется делать выручку с минимальным количеством SKU? (их стратегию копировать)

Сделай вывод: насколько тяжело конкурировать? Какая стратегия лучше — много дешёвых SKU или 2-3 качественных?`}
          />

          <EndpointCard
            num={6}
            name="Дневные метрики категории"
            url="/wb/get/category/by_date"
            params={[
              { name: "d1", desc: "Начало", example: "2026-02-01" },
              { name: "d2", desc: "Конец", example: "2026-03-01" },
              { name: "path", desc: "Путь категории", example: "Здоровье/Ортопедия" },
            ]}
            desc="Ежедневная статистика категории: остатки, цена, товары, продажи, выручка, рейтинг."
            useCase="Увидеть ежедневную динамику: пики продаж, влияние акций."
            prompt={`Я загружаю JSON с ежедневной статистикой категории Wildberries (эндпоинт /wb/get/category/by_date).

Проанализируй ежедневную динамику ниши:

1. **Пики продаж**: в какие дни были максимальные продажи и выручка? Это были акции WB?
2. **Средние показатели**: средняя дневная выручка, средние продажи, средний чек
3. **Тренд внутри месяца**: начало vs конец — растёт или падает?
4. **Колебания цены**: как менялась средняя цена? Были ли распродажи?
5. **Остатки**: как менялись остатки? Есть ли дефицит товаров?

Выяви закономерности: в какие дни недели продажи выше? Есть ли корреляция между ценой и продажами?`}
          />
        </div>

        {/* ═══ Section 6: Товары в нише ═══ */}
        <div style={sSection}>
          <h2 style={sH2}>6. Товары в нише</h2>

          <EndpointCard
            num={7}
            name="Все товары в категории"
            url="/wb/get/category"
            params={[
              { name: "d1", desc: "Начало", example: "2026-02-01" },
              { name: "d2", desc: "Конец", example: "2026-03-01" },
              { name: "path", desc: "Путь категории", example: "Здоровье/Ортопедия" },
            ]}
            desc="Выгрузка ВСЕХ товаров в категории с выручкой, продажами, ценой, рейтингом, отзывами, брендом и продавцом."
            useCase="Найти ТОП-товары в нише по выручке. Получить артикулы (SKU) для детального анализа."
            jsonExample={`{
  "data": [
    {
      "id": 40435840,
      "name": "Компрессионные чулки 1 класса",
      "brand": "HEEBERMED",
      "seller": "...",
      "revenue": 6858265,
      "sales": 6452,
      "final_price": 1023,
      "rating": 5,
      "comments": 27609
    },
    ...
  ],
  "total": 166354
}`}
            prompt={`Я загружаю JSON со всеми товарами в категории Wildberries (эндпоинт /wb/get/category).

Проведи полный анализ товаров в нише:

1. **ТОП-20 товаров по выручке** — таблица: SKU | Название | Бренд | Выручка | Продажи | Цена | Рейтинг | Отзывы
2. **Ценовые паттерны**: какая цена у ТОП-товаров? Есть ли связь между ценой и продажами?
3. **Рейтинг vs продажи**: товары с рейтингом <4.5 и высокими продажами — почему покупают несмотря на плохой рейтинг?
4. **Отзывы**: у кого больше всего отзывов? (их нужно анализировать первыми — запрос #10)
5. **Бренды-лидеры**: какие бренды доминируют в ТОП-20?
6. **Возможности**: товары с высоким рейтингом но низкими продажами — что мешает? Товары с низким рейтингом и высокими продажами — можно сделать лучше

Дай список из 5 SKU (артикулов) для детального анализа отзывов. Объясни почему именно эти.`}
          />
        </div>

        {/* ═══ Section 7: Анализ товара ═══ */}
        <div style={sSection}>
          <h2 style={sH2}>7. Анализ конкретного товара</h2>
          <p style={sP}>
            Замените <span style={sCode}>40435840</span> на артикул нужного товара (SKU из предыдущего шага).
          </p>

          <EndpointCard
            num={8}
            name="Информация о товаре"
            url="/wb/get/item/40435840"
            desc="Полная информация: название, бренд, продавец, цена, рейтинг, количество отзывов, скидки."
            useCase="Быстро узнать всё о конкретном товаре-конкуренте."
            prompt={`Я загружаю JSON с информацией о товаре на Wildberries (эндпоинт /wb/get/item/{sku}).

Проанализируй карточку товара конкурента:

1. **Позиционирование**: какой ценовой сегмент? Премиум, средний, эконом?
2. **Рейтинг и отзывы**: сколько отзывов, какой рейтинг? Это сильная или слабая карточка?
3. **Ценообразование**: текущая цена, скидка, SPP — адекватная ли цена для этой категории?
4. **Бренд**: известный или нет? Можно ли конкурировать без бренда?
5. **Оценка карточки**: что сделано хорошо, что можно улучшить в своём товаре?

Дай рекомендацию: какую цену ставить, чтобы конкурировать с этим товаром?`}
          />

          <EndpointCard
            num={9}
            name="Продажи и остатки по дням"
            url="/wb/get/item/40435840/sales"
            params={[
              { name: "d1", desc: "Начало", example: "2026-02-01" },
              { name: "d2", desc: "Конец", example: "2026-03-01" },
            ]}
            desc="Ежедневные данные: продажи, остатки, цена, скидки, позиция в поиске, позиция в категории."
            useCase="Понять сколько штук в день продаёт конкурент и как меняется его цена."
            jsonExample={`[
  {
    "data": "2026-03-01",
    "balance": 326,
    "sales": 52,
    "rating": 5,
    "final_price": 1023,
    "comments": 27609,
    "search_position_avg": 12
  },
  ...
]`}
            prompt={`Я загружаю JSON с ежедневными продажами товара на Wildberries (эндпоинт /wb/get/item/{sku}/sales).

Проанализируй динамику продаж конкурента:

1. **Объём продаж**: среднее количество продаж в день, общие продажи за период
2. **Выручка**: посчитай дневную и месячную выручку (продажи × цена)
3. **Остатки**: хватает ли товара? Были ли дни с нулевым остатком (out of stock)?
4. **Ценовая стратегия**: менял ли продавец цену? Как это повлияло на продажи?
5. **Позиция в поиске**: стабильная или скачет? Какая средняя позиция?
6. **Прогноз**: при такой динамике, сколько товара нужно закупить на месяц чтобы конкурировать?

Вывод: сколько штук в месяц продаёт этот товар? Какой минимальный запас нужен для старта?`}
          />

          <EndpointCard
            num={10}
            name="ВСЕ отзывы товара"
            url="/wb/get/item/40435840/comments"
            desc="Полная выгрузка всех отзывов: текст, оценка (1-5), дата, наличие фото. Главный эндпоинт для анализа в Claude."
            useCase="Выгрузить отзывы → загрузить JSON в Claude → получить анализ болей покупателей и стратегию улучшения товара."
            jsonExample={`{
  "comments": [
    {
      "date": "2026-03-06",
      "valuation": 5,
      "text": "Отличные чулки, ...",
      "hasphoto": 0
    },
    {
      "date": "2026-03-01",
      "valuation": 2,
      "text": "Размер не совпал...",
      "hasphoto": 1
    },
    ...
  ]
}`}
            prompt={`Я загружаю JSON со ВСЕМИ отзывами товара на Wildberries (эндпоинт /wb/get/item/{sku}/comments).

Проведи глубокий анализ отзывов:

### НЕГАТИВНЫЕ ОТЗЫВЫ (1-3 звезды) — ГЛАВНЫЙ ФОКУС:
- ТОП-5 самых частых жалоб с конкретными цитатами из отзывов
- Для каждой жалобы: сколько раз встречается, насколько критична (влияет ли на возврат), можно ли исправить
- Категории проблем: качество материала, размерная сетка, доставка/упаковка, несоответствие описанию, функционал

### ПОЗИТИВНЫЕ ОТЗЫВЫ (4-5 звёзд):
- ТОП-5 плюсов, за что хвалят больше всего
- Что покупатели отмечают как «лучше ожиданий»
- Какие характеристики упоминают чаще всего

### СКРЫТЫЕ ИНСАЙТЫ:
- Какие функции/характеристики покупатели ХОТЯТ, но их нет?
- За что готовы платить больше?
- Какие улучшения просят в отзывах?

### ПЛАН ДЕЙСТВИЙ:
- 5 конкретных улучшений товара для максимального эффекта (по приоритету)
- Что написать в карточке товара, чтобы закрыть основные боли
- Какие УТП вынести на главное фото

Будь конкретным: приводи цитаты, считай проценты, давай actionable рекомендации.`}
          />

          <EndpointCard
            num={11}
            name="Похожие товары-конкуренты"
            url="/wb/get/item/40435840/similar"
            desc="Товары, которые WB считает конкурентами: название, бренд, цена, продажи, выручка."
            useCase="Найти прямых конкурентов товара и сравнить их цены и продажи."
            prompt={`Я загружаю JSON с похожими товарами на Wildberries (эндпоинт /wb/get/item/{sku}/similar).

Проанализируй конкурентное окружение товара:

1. **Таблица конкурентов**: Название | Бренд | Цена | Продажи | Выручка | Рейтинг | Отзывы
2. **Ценовой диапазон**: от минимальной до максимальной цены конкурентов. Где оптимальная точка?
3. **Лидер vs аутсайдер**: кто продаёт больше всех и почему? Кто продаёт меньше всех — в чём причина?
4. **Средние показатели**: средняя цена, средние продажи, средний рейтинг конкурентов
5. **Дифференциация**: что можно сделать по-другому? Какие УТП использовать чтобы выделиться?

Рекомендация: какую цену ставить, на какой рейтинг целиться, какие конкуренты наиболее уязвимы?`}
          />
        </div>

        {/* ═══ Section 8: Практические сценарии ═══ */}
        <div style={sSection}>
          <h2 style={sH2}>8. Практические сценарии</h2>

          <div style={{ ...sCard, borderColor: C.accent }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.accent }}>Сценарий 1: Найти ТОП-товар и выгрузить отзывы для Claude</h3>
            {[
              { step: "Выберите нишу через WB Analyzer или MPStats → Внешняя аналитика → Выбор ниши", badge: "Нахождение ниши" },
              { step: "Отправьте запрос #7 (Все товары в категории) → найдите ТОП-товар по выручке → запомните его SKU", badge: "ТОП товар" },
              { step: "Отправьте запрос #10 (Все отзывы) с этим SKU → получите JSON со всеми отзывами", badge: "Отзывы" },
              { step: "Скопируйте JSON ответ → сохраните как файл reviews.json", badge: "Сохранение" },
              { step: "Загрузите reviews.json в проект Claude → вставьте промпт анализа (см. секцию 9)", badge: "Анализ" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                <span style={sStepNum}>{i + 1}</span>
                <div>
                  <span style={{ ...sBadge(C.green), marginBottom: 4 }}>{s.badge}</span>
                  <p style={{ ...sP, margin: "4px 0 0" }}>{s.step}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Сценарий 2: Проверить тренд ниши</h3>
            <p style={sP}>Отправьте запрос #2 (Тренды) с периодом 2 года. Если выручка стабильно растёт — ниша перспективная. Если падает — лучше не заходить.</p>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Сценарий 3: Сравнить конкурентов</h3>
            <p style={sP}>Запрос #5 (Продавцы) покажет всех продавцов с выручкой. Посмотрите: сколько продавцов, как распределена выручка, есть ли монополист.</p>
          </div>
        </div>

        {/* ═══ Section 9: Загрузка в Claude ═══ */}
        <div style={sSection}>
          <h2 style={sH2}>9. Загрузка данных в Claude</h2>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>Как сохранить данные из Hoppscotch</h3>
            {[
              "Отправьте запрос в Hoppscotch и получите ответ",
              "В окне ответа нажмите кнопку Copy (скопировать весь JSON)",
              "Откройте текстовый редактор (Блокнот) → вставьте → сохраните как .json файл",
              "Загрузите файл в проект Claude (Projects → загрузить файл)",
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <span style={sStepNum}>{i + 1}</span>
                <span style={{ ...sP, margin: 0, paddingTop: 3 }}>{step}</span>
              </div>
            ))}
          </div>

          <div style={{ ...sCard, borderColor: C.accent }}>
            <h3 style={{ ...sH3, marginTop: 0, color: C.accent }}>Промпт для Claude</h3>
            <p style={sP}>Скопируйте этот промпт и вставьте в Claude вместе с загруженными файлами:</p>
            <div style={{ ...sCodeBlock, whiteSpace: "pre-wrap", fontSize: 12, lineHeight: 1.7 }}>
              <CopyBtn text={`Ты — старший аналитик маркетплейсов с 10-летним опытом в e-commerce и product development. Твоя задача — провести глубокий анализ ниши и товарных позиций на Wildberries на основе загруженных данных.

## Что я загружаю:

1. **JSON/Excel с метриками ниши** — выгрузка из MPStats API, содержит: выручку, количество товаров, продавцов, брендов, рейтинг и другие метрики.

2. **JSON с отзывами** — выгрузка отзывов по конкретному артикулу через /wb/get/item/{sku}/comments.

## Что нужно сделать:

### ЧАСТЬ 1: Анализ ниши (по метрикам)

Оцени нишу по критериям и дай вердикт по каждому ( хорошо /  нормально /  плохо):

- **Объём рынка**: выручка, рост, потенциал
- **Конкуренция**: товары, продавцы, бренды, % товаров с продажами
- **Входной барьер**: средний чек, нужен ли бренд, минимальный бюджет
- **Ликвидность**: оборачиваемость, % выкупа
- **Упущенная выручка**: неудовлетворённый спрос (>20% — хороший сигнал)
- **Сезонность**: стабильность спроса
- **Общий вердикт**: стоит ли заходить, для какого уровня продавца

### ЧАСТЬ 2: Анализ отзывов

**А) Негативные отзывы (1-3 звезды) — ГЛАВНЫЙ ФОКУС:**
- ТОП-5 самых частых жалоб с примерами цитат
- Для каждой жалобы: частота, критичность, можно ли исправить
- Категории: качество, функциональность, доставка/упаковка, несоответствие описанию

**Б) Позитивные отзывы (4-5 звёзд):**
- ТОП-5 плюсов, за что хвалят, что "лучше ожиданий"

**В) Скрытые инсайты:**
- Какие функции покупатели ХОТЯТ, но их нет?
- За что готовы платить больше?

### ЧАСТЬ 3: Стратегия выхода

1. **Продуктовая стратегия**: Что исправить? 3-5 улучшений для максимального эффекта
2. **Ценовая стратегия**: Какой ценовой сегмент выбрать
3. **Карточка товара**: Какие УТП вынести, какие боли закрыть в описании
4. **Риски**: 3 главных риска и как их минимизировать
5. **Первые шаги**: План на первый месяц

Используй структурированный формат с таблицами и текстовыми заключениями без цветных индикаторов. Будь конкретным — цифры, проценты, примеры.`} />
{`Ты — старший аналитик маркетплейсов с 10-летним опытом
в e-commerce и product development. Твоя задача — провести
глубокий анализ ниши и товарных позиций на Wildberries
на основе загруженных данных.

## Что я загружаю:

1. JSON/Excel с метриками ниши — выгрузка из MPStats API
2. JSON с отзывами — выгрузка через /wb/get/item/{sku}/comments

## Что нужно сделать:

### ЧАСТЬ 1: Анализ ниши (по метрикам)
Оцени по критериям ( хорошо /  нормально /  плохо):
- Объём рынка, Конкуренция, Входной барьер
- Ликвидность, Упущенная выручка, Сезонность

### ЧАСТЬ 2: Анализ отзывов
- ТОП-5 жалоб из негативных отзывов + цитаты
- ТОП-5 плюсов из позитивных
- Скрытые инсайты: чего хотят, но нет

### ЧАСТЬ 3: Стратегия выхода
- Продуктовая стратегия (что исправить)
- Ценовая стратегия
- Карточка товара (УТП, боли)
- Риски + План на первый месяц`}
            </div>
          </div>
        </div>

        {/* ═══ Section 10: Скачать коллекцию ═══ */}
        <div style={sSection}>
          <h2 style={sH2}>10. Скачать готовую коллекцию для Hoppscotch</h2>
          <div style={{ ...sCard, borderColor: C.green, textAlign: "center", padding: "32px 24px" }}>
            <p style={{ ...sP, fontSize: 15, marginBottom: 20 }}>
              11 готовых запросов к MPStats API — импортируйте в Hoppscotch и сразу начинайте работать.
            </p>
            <a
              href="/mpstats-hoppscotch.json"
              download="mpstats-hoppscotch.json"
              style={{ display: "inline-block", background: C.green, color: "#000", padding: "12px 32px", borderRadius: 8, fontSize: 15, fontWeight: 500, textDecoration: "none", letterSpacing: "-0.01em" }}
            >
              Скачать коллекцию MPStats API
            </a>
            <div style={{ marginTop: 24 }}>
              <h3 style={{ ...sH3, marginTop: 0 }}>Как импортировать</h3>
              {[
                "Скачайте файл mpstats-hoppscotch.json",
                "Откройте hoppscotch.io → Collections (левая панель)",
                "Нажмите Import → выберите скачанный файл",
                "Замените <YOUR_TOKEN> на ваш API-ключ в каждом запросе",
                "Готово! Все 11 запросов доступны в коллекции",
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8, textAlign: "left" }}>
                  <span style={sStepNum}>{i + 1}</span>
                  <span style={{ ...sP, margin: 0, paddingTop: 3 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ Footer nav ═══ */}
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24 }}>
          <Link href="/tools/wb-analyzer/guide" style={{ color: C.accent, fontSize: 14, textDecoration: "none" }}>
            <IconlyArrowLeft size={17} className="reading-inline-icon" /> Инструкция WB Analyzer
          </Link>
          <Link href="/tools/wb-analyzer" style={{ color: C.accent, fontSize: 14, textDecoration: "none" }}>
            WB Niche Analyzer <IconlyArrowRight size={17} className="reading-inline-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}
