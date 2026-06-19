"use client";

import Link from "next/link";
import { useState } from "react";

/* ───── design tokens ───── */
const C = {
  bg: "#0a0a0f",
  surface: "#111119",
  border: "#1e1e30",
  accent: "#6c5ce7",
  green: "#00d2a0",
  text: "#e8e8f0",
  dim: "#999",
  faint: "#444",
  red: "#f87171",
  amber: "#f59e0b",
  pink: "#e84393",
};

/* ───── style helpers ───── */
const sSection: React.CSSProperties = { marginBottom: 48 };
const sH2: React.CSSProperties = { fontSize: 22, fontWeight: 700, margin: "0 0 20px", color: C.text, letterSpacing: "-0.01em" };
const sH3: React.CSSProperties = { fontSize: 16, fontWeight: 600, margin: "28px 0 12px", color: C.text };
const sP: React.CSSProperties = { fontSize: 14, lineHeight: 1.7, color: "#ccc", margin: "0 0 12px" };
const sCard: React.CSSProperties = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px 24px", marginBottom: 16 };
const sCode: React.CSSProperties = { background: "rgba(108,92,231,0.12)", color: C.accent, padding: "2px 7px", borderRadius: 4, fontSize: 12, fontFamily: "monospace" };
const sCodeBlock: React.CSSProperties = { background: "#0d0d18", border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 20px", fontSize: 12, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", color: "#c8c8d8", lineHeight: 1.6, overflowX: "auto", whiteSpace: "pre", marginBottom: 12, position: "relative" };
const sBadge = (color: string): React.CSSProperties => ({ display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: `${color}18`, color, marginRight: 6 });
const sStepNum: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: `${C.accent}22`, color: C.accent, fontSize: 13, fontWeight: 700, marginRight: 10, flexShrink: 0 };
const sTip: React.CSSProperties = { background: `${C.green}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc", marginTop: 12, marginBottom: 12 };
const sWarn: React.CSSProperties = { background: `${C.amber}10`, borderRadius: 8, padding: "14px 16px", fontSize: 13, color: "#ccc", marginTop: 12, marginBottom: 12 };

/* ───── CopyBtn ───── */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      style={{ position: "absolute", top: 8, right: 8, background: copied ? `${C.green}22` : `${C.accent}22`, color: copied ? C.green : C.accent, border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}
    >
      {copied ? "Скопировано!" : "Копировать"}
    </button>
  );
}

/* ───── Collapsible section ───── */
function Collapsible({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginTop: 8, marginBottom: 12 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 14px", color: C.dim, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
      >
        <span style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>&#9654;</span>
        {title}
      </button>
      {open && <div style={{ marginTop: 8 }}>{children}</div>}
    </div>
  );
}

/* ───── Comparison table ───── */
function CompareTable({ rows }: { rows: { feature: string; claude: string; notebook: string; combo: string }[] }) {
  const th: React.CSSProperties = { padding: "8px 12px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: C.dim, borderBottom: `1px solid ${C.border}`, textAlign: "left" };
  const td: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#ccc", borderBottom: `1px solid ${C.border}08` };
  return (
    <div style={{ overflowX: "auto", marginBottom: 16 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", background: C.surface, borderRadius: 10, overflow: "hidden" }}>
        <thead>
          <tr>
            <th style={th}>Критерий</th>
            <th style={{ ...th, color: C.accent }}>Claude</th>
            <th style={{ ...th, color: C.green }}>NotebookLM</th>
            <th style={{ ...th, color: C.pink }}>Связка</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ ...td, fontWeight: 500, color: C.text }}>{r.feature}</td>
              <td style={td}>{r.claude}</td>
              <td style={td}>{r.notebook}</td>
              <td style={{ ...td, color: C.green, fontWeight: 500 }}>{r.combo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════ */
/*                 PAGE                    */
/* ═══════════════════════════════════════ */

export default function AiSellerGuidePage() {

  const mcpConfig = `{
  "mcpServers": {
    "notebooklm": {
      "command": "npx",
      "args": ["notebooklm-mcp@latest"]
    }
  }
}`;

  const promptMultiNiche = `Я загружаю JSON с подкатегориями Wildberries из MPStats API (эндпоинт /wb/get/category/subcategories).

Проанализируй все подкатегории и составь рейтинг ТОП-10 самых перспективных для выхода нового продавца. Для каждой подкатегории оцени:

1. Объём рынка (выручка, продажи)
2. Конкуренция (количество товаров, % товаров с продажами)
3. Средний чек и маржинальность
4. Рейтинг — есть ли проблемы с качеством (низкий рейтинг = возможность)

Выведи результат в таблице с колонками: Подкатегория | Выручка | Продажи | Товаров | % с продажами | Ср.цена | Рейтинг | Вердикт (🟢/🟡/🔴)

В конце дай ТОП-3 рекомендации: в какую подкатегорию лучше всего зайти и почему.`;

  const promptSingleNiche = `Я загружаю JSON со всеми товарами одной ниши Wildberries из MPStats API (эндпоинт /wb/get/category).

Ты — аналитик маркетплейсов. Дай полный разбор ниши так, чтобы я мог принять решение: заходить или нет.

### 1. ОБЗОР НИШИ (таблица)
| Метрика | Значение |
|---------|---------|
| Общая выручка за период | ... |
| Общее кол-во продаж | ... |
| Кол-во товаров (всего) | ... |
| Кол-во товаров с продажами | ... (и % от общего) |
| Средний чек | ... |
| Медианная цена | ... |
| Средний рейтинг ниши | ... |
| Среднее кол-во отзывов | ... |

### 2. МОНОПОЛИЗАЦИЯ
- Какой % выручки забирает ТОП-10 товаров?
- Какой % забирает ТОП-1?
- Есть ли шанс новичку пробиться или рынок «закрыт»?
- Вердикт: Низкая / Средняя / Высокая монополизация

### 3. БРЕНДЫ
- Топ-5 брендов по выручке (таблица: бренд | выручка | доля | кол-во SKU)
- Есть ли товары без бренда с хорошими продажами? (возможность для NoBrand)

### 4. ЦЕНОВЫЕ СЕГМЕНТЫ
Разбей все товары на сегменты по цене и покажи:
| Сегмент | Кол-во товаров | Выручка | Продажи | Ср.рейтинг |
В каком ценовом сегменте лучшее соотношение спроса и конкуренции?

### 5. СЛАБЫЕ ИГРОКИ (возможности)
Найди товары с высокими продажами, но низким рейтингом (ниже 4.5) — это прямые возможности для входа с лучшим качеством. Таблица ТОП-5:
| Название | Цена | Продажи | Выручка | Рейтинг | Отзывы | Что можно улучшить |

### 6. СИЛЬНЫЕ ИГРОКИ (ориентиры)
ТОП-5 товаров по выручке — на кого равняться:
| Название | Бренд | Цена | Продажи | Выручка | Рейтинг | Отзывы |

### 7. ФИНАЛЬНЫЙ ВЕРДИКТ
Дай чёткий ответ: ЗАХОДИТЬ / ЗАХОДИТЬ С ОСТОРОЖНОСТЬЮ / НЕ ЗАХОДИТЬ

Причины (3 пункта):
- ...
- ...
- ...

Рекомендуемая стратегия входа:
- Ценовой сегмент: ...
- Позиционирование: ...
- Минимальный бюджет на старт (примерная оценка): ...
- Главный риск: ...
- Главное преимущество новичка: ...`;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* ───── header ───── */}
      <div style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #1a1040 50%, #0a0a1a 100%)", padding: "60px 20px 48px", textAlign: "center" }}>
        <Link href="/tools" style={{ color: C.dim, fontSize: 12, textDecoration: "none", display: "inline-block", marginBottom: 16, border: `1px solid ${C.border}`, borderRadius: 6, padding: "4px 12px" }}>← Все инструменты</Link>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          AI для продавцов маркетплейсов
        </h1>
        <p style={{ fontSize: 15, color: C.dim, maxWidth: 600, margin: "0 auto" }}>
          NotebookLM — ваша персональная база знаний с AI-аналитиком. Загружайте данные, получайте ответы.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          <span style={sBadge(C.green)}>NotebookLM</span>
          <span style={sBadge(C.accent)}>Claude</span>
          <span style={sBadge(C.pink)}>MPSTATS API</span>
        </div>
      </div>

      {/* ───── content ───── */}
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "40px 20px 80px" }}>

        {/* ══════════════════════════════════════ */}
        {/*  SECTION 1: Почему NotebookLM          */}
        {/* ══════════════════════════════════════ */}
        <div style={sSection}>
          <h2 style={sH2}>1. Зачем нужен NotebookLM</h2>

          <p style={sP}>
            Когда вы работаете с Claude, у него есть <strong style={{ color: C.text }}>контекстное окно</strong> — это максимум информации, который он может «держать в голове» одновременно. Загрузили большой файл — окно заполнилось. Второй файл уже может не влезть. А третий точно нет.
          </p>

          <p style={sP}>
            <strong style={{ color: C.green }}>NotebookLM от Google</strong> — это ваша персональная база данных с AI. Вы загружаете туда <strong style={{ color: C.text }}>сколько угодно документов</strong> — отчёты, выгрузки, PDF, таблицы — и AI отвечает строго по вашим данным. Никаких выдумок, только факты из ваших файлов.
          </p>

          <div style={sCard}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 12px" }}>Простая аналогия:</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: `${C.accent}10`, borderRadius: 8, padding: 14 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: C.accent, margin: "0 0 6px" }}>Claude</p>
                <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>Гениальный аналитик с маленьким рабочим столом. Может обработать один документ за раз, но делает это блестяще.</p>
              </div>
              <div style={{ background: `${C.green}10`, borderRadius: 8, padding: 14 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: C.green, margin: "0 0 6px" }}>NotebookLM</p>
                <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>Огромный архив со своим библиотекарем. Храните все данные, спрашивайте — он найдёт и покажет.</p>
              </div>
            </div>
          </div>

          <CompareTable rows={[
            { feature: "Объём данных", claude: "Ограничен контекстным окном (~200K токенов)", notebook: "До 50 источников на ноутбук, без лимита размера", combo: "Безлимитное хранение + глубокий анализ" },
            { feature: "Точность ответов", claude: "Может «додумывать» если данных мало", notebook: "Строго по загруженным документам", combo: "Факты из NotebookLM + аналитика Claude" },
            { feature: "Глубина анализа", claude: "Лучший в мире по рассуждениям", notebook: "Хорош для поиска и саммари, слабее в стратегии", combo: "Лучшее из двух миров" },
            { feature: "Форматы файлов", claude: "PDF, текст, изображения", notebook: "PDF, Google Docs/Slides, веб-ссылки, аудио, текст", combo: "Все форматы покрыты" },
            { feature: "Стоимость", claude: "Бесплатно (с лимитами) или $20/мес", notebook: "Полностью бесплатно", combo: "Бесплатно или $20/мес" },
          ]} />
        </div>

        {/* ══════════════════════════════════════ */}
        {/*  SECTION 2: Начало работы               */}
        {/* ══════════════════════════════════════ */}
        <div style={sSection}>
          <h2 style={sH2}>2. Начало работы с NotebookLM</h2>

          <div style={sCard}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
              <span style={sStepNum}>1</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 4px" }}>Откройте NotebookLM</p>
                <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>
                  Перейдите на <a href="https://notebooklm.google.com" target="_blank" rel="noopener" style={{ color: C.green, textDecoration: "none", borderBottom: `1px solid ${C.green}44` }}>notebooklm.google.com</a> и войдите через Google-аккаунт. Ничего скачивать не нужно — всё работает в браузере.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
              <span style={sStepNum}>2</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 4px" }}>Создайте ноутбук</p>
                <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>
                  Нажмите <strong style={{ color: C.text }}>«New Notebook»</strong>. Дайте ему понятное название — например, «Анализ ниши Одежда WB» или «Выгрузки MPSTATS Март 2026».
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
              <span style={sStepNum}>3</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 4px" }}>Загрузите данные</p>
                <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>
                  Нажмите <strong style={{ color: C.text }}>«Add source»</strong> и загрузите файлы. Можно загрузить до 50 источников в один ноутбук.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={sStepNum}>4</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 4px" }}>Задавайте вопросы</p>
                <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>
                  В поле чата внизу пишите вопросы. NotebookLM ответит <strong style={{ color: C.text }}>строго по вашим данным</strong> и покажет ссылки на источники.
                </p>
              </div>
            </div>
          </div>

          <div style={sTip}>
            <strong style={{ color: C.green }}>Бесплатный тариф</strong> — до 100 ноутбуков, до 50 источников в каждом. Для работы с маркетплейсами этого более чем достаточно.
          </div>
        </div>

        {/* ══════════════════════════════════════ */}
        {/*  SECTION 3: Какие файлы загружать       */}
        {/* ══════════════════════════════════════ */}
        <div style={sSection}>
          <h2 style={sH2}>3. Какие файлы принимает NotebookLM</h2>

          <p style={sP}>NotebookLM принимает не все форматы. Вот полный список и как адаптировать ваши данные:</p>

          <div style={{ overflowX: "auto", marginBottom: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: C.surface, borderRadius: 10, overflow: "hidden" }}>
              <thead>
                <tr>
                  {["Формат", "Принимает?", "Что делать"].map(h => (
                    <th key={h} style={{ padding: "8px 12px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: C.dim, borderBottom: `1px solid ${C.border}`, textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { format: "PDF", ok: "✅ Да", note: "Загружайте напрямую. Идеально для отчётов PwC, презентаций, каталогов." },
                  { format: "Google Docs", ok: "✅ Да", note: "Подключается напрямую из Google Drive." },
                  { format: "Google Slides", ok: "✅ Да", note: "Подключается напрямую из Google Drive." },
                  { format: "Веб-ссылки (URL)", ok: "✅ Да", note: "Вставляете ссылку — NotebookLM сам вытянет содержимое страницы." },
                  { format: "Скопированный текст", ok: "✅ Да", note: "Вставьте текст прямо в поле «Paste text»." },
                  { format: "YouTube видео", ok: "✅ Да", note: "Вставьте ссылку на видео — NotebookLM расшифрует аудио." },
                  { format: "CSV / Excel", ok: "⚠️ Не напрямую", note: "Конвертируйте в Google Sheets → подключите из Drive. Или скопируйте в текст." },
                  { format: "JSON", ok: "⚠️ Не напрямую", note: "Нужно адаптировать (инструкция ниже)." },
                  { format: "Аудио (MP3, WAV)", ok: "✅ Да", note: "Загружайте — NotebookLM расшифрует в текст." },
                ].map((r, i) => (
                  <tr key={i}>
                    <td style={{ padding: "8px 12px", fontSize: 13, fontWeight: 500, color: C.text, borderBottom: `1px solid ${C.border}08` }}>{r.format}</td>
                    <td style={{ padding: "8px 12px", fontSize: 13, color: r.ok.includes("✅") ? C.green : C.amber, borderBottom: `1px solid ${C.border}08` }}>{r.ok}</td>
                    <td style={{ padding: "8px 12px", fontSize: 13, color: "#ccc", borderBottom: `1px solid ${C.border}08` }}>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 style={sH3}>Как загрузить JSON в NotebookLM</h3>
          <p style={sP}>JSON-файлы (выгрузки из MPSTATS API, Kaspi API и т.д.) NotebookLM напрямую не принимает. Но есть 3 способа:</p>

          <div style={sCard}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.green, margin: "0 0 10px" }}>Способ 1: Через Google Sheets (рекомендуемый)</p>
            <ol style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
              <li>Откройте <a href="https://sheets.google.com" target="_blank" rel="noopener" style={{ color: C.accent, textDecoration: "none" }}>Google Sheets</a> → создайте новую таблицу</li>
              <li>Скопируйте JSON-данные</li>
              <li>В Google Sheets: <strong style={{ color: C.text }}>Данные → Импорт → Вставить текст</strong></li>
              <li>Или используйте формулу <span style={sCode}>=IMPORTDATA(&quot;url&quot;)</span> если данные доступны по ссылке</li>
              <li>В NotebookLM нажмите «Add source» → «Google Sheets» → выберите таблицу</li>
            </ol>
          </div>

          <div style={sCard}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.accent, margin: "0 0 10px" }}>Способ 2: Конвертировать JSON → текст</p>
            <ol style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
              <li>Откройте JSON-файл в любом текстовом редакторе (Блокнот, VS Code)</li>
              <li>Скопируйте всё содержимое</li>
              <li>В NotebookLM нажмите «Add source» → «Paste text»</li>
              <li>Вставьте JSON как текст — NotebookLM его поймёт</li>
            </ol>
          </div>

          <div style={sCard}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.pink, margin: "0 0 10px" }}>Способ 3: Попросить Claude конвертировать</p>
            <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>
              Загрузите JSON в Claude и попросите: <em style={{ color: C.dim }}>«Конвертируй этот JSON в читаемую таблицу текстом»</em>. Затем скопируйте результат в NotebookLM как текст.
            </p>
          </div>

          <div style={sTip}>
            <strong style={{ color: C.green }}>Совет:</strong> для больших JSON-выгрузок из MPSTATS (тысячи товаров) лучше всего работает Способ 1 через Google Sheets — данные будут структурированы и NotebookLM сможет отвечать точнее.
          </div>
        </div>

        {/* ══════════════════════════════════════ */}
        {/*  SECTION 4: Что загружать селлеру       */}
        {/* ══════════════════════════════════════ */}
        <div style={sSection}>
          <h2 style={sH2}>4. Что загружать в NotebookLM селлеру</h2>
          <p style={sP}>Создайте ноутбук для каждой задачи и загрузите туда все релевантные данные:</p>

          <div style={sCard}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 12px" }}>📊 Ноутбук «Анализ ниш»</p>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
              <li>Выгрузки из MPSTATS по подкатегориям (CSV или через Google Sheets)</li>
              <li>Отчёты PwC / Data Insight / Similar Web по рынку e-commerce (PDF)</li>
              <li>Скриншоты топ-товаров конкурентов</li>
              <li>Статьи и обзоры рынка (веб-ссылки)</li>
            </ul>
          </div>

          <div style={sCard}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 12px" }}>💰 Ноутбук «Мой бизнес»</p>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
              <li>Отчёты продаж из личного кабинета WB/Kaspi (Excel → Google Sheets)</li>
              <li>Себестоимости товаров</li>
              <li>Рекламные расходы</li>
              <li>Логистика и комиссии</li>
            </ul>
          </div>

          <div style={sCard}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 12px" }}>🔍 Ноутбук «Конкуренты»</p>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
              <li>Карточки конкурентов (веб-ссылки на товары)</li>
              <li>Отзывы конкурентов — скопировать текстом (находите слабые места!)</li>
              <li>Ценовая история из MPSTATS</li>
              <li>Рекламные креативы конкурентов</li>
            </ul>
          </div>

          <div style={sWarn}>
            <strong style={{ color: C.amber }}>Важно:</strong> NotebookLM отвечает <strong style={{ color: C.text }}>строго по загруженным документам</strong>. Если вы спросите что-то, чего нет в ваших файлах — он так и скажет. Это плюс: никаких «галлюцинаций» и выдуманных данных.
          </div>
        </div>

        {/* ══════════════════════════════════════ */}
        {/*  SECTION 5: Фишки NotebookLM            */}
        {/* ══════════════════════════════════════ */}
        <div style={sSection}>
          <h2 style={sH2}>5. Главные фишки NotebookLM</h2>

          <div style={sCard}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.green, margin: "0 0 8px" }}>🎙 Audio Overview — AI-подкаст по вашим данным</p>
            <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>
              NotebookLM может сгенерировать <strong style={{ color: C.text }}>подкаст-обсуждение</strong> на основе ваших загруженных данных. Два AI-ведущих обсуждают ваши отчёты, выделяют главное, спорят. Можно слушать на ходу — например, в дороге на склад.
            </p>
          </div>

          <div style={sCard}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.accent, margin: "0 0 8px" }}>📋 Автоматическое саммари</p>
            <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>
              При загрузке документов NotebookLM сам генерирует краткое содержание каждого источника. Полезно когда у вас 20 файлов и нужно быстро понять, что где.
            </p>
          </div>

          <div style={sCard}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.pink, margin: "0 0 8px" }}>🔗 Ссылки на источники</p>
            <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>
              Каждый ответ NotebookLM содержит <strong style={{ color: C.text }}>ссылки на конкретные места в документах</strong>, откуда взята информация. Можно кликнуть и проверить.
            </p>
          </div>

          <div style={sCard}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.amber, margin: "0 0 8px" }}>📌 Заметки и закладки</p>
            <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>
              Можно сохранять ответы как заметки прямо в ноутбуке. Создавайте свою базу инсайтов по нишам.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════ */}
        {/*  SECTION 6: Примеры вопросов            */}
        {/* ══════════════════════════════════════ */}
        <div style={sSection}>
          <h2 style={sH2}>6. Какие вопросы задавать NotebookLM</h2>
          <p style={sP}>После загрузки данных по нише, задавайте вопросы в чате. Примеры:</p>

          {[
            { q: "Какие 5 товаров в этой нише приносят больше всего выручки?", desc: "NotebookLM найдёт топ-товары из ваших данных" },
            { q: "Есть ли товары с высокими продажами, но низким рейтингом (ниже 4.5)?", desc: "Найдёт слабых конкурентов — ваша точка входа" },
            { q: "Какой процент выручки забирает топ-10 товаров?", desc: "Покажет уровень монополизации ниши" },
            { q: "Какой ценовой сегмент самый прибыльный?", desc: "Подскажет оптимальную цену для вашего товара" },
            { q: "Сравни бренды по количеству SKU и выручке", desc: "Выявит крупных игроков и свободные ниши" },
            { q: "Есть ли товары без бренда с хорошими продажами?", desc: "Шанс зайти без раскрученного бренда" },
          ].map((item, i) => (
            <div key={i} style={{ ...sCard, display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ ...sStepNum, background: `${C.green}22`, color: C.green, fontSize: 11 }}>?</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: "0 0 4px" }}>«{item.q}»</p>
                <p style={{ fontSize: 12, color: C.dim, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════ */}
        {/*  SECTION 7: Практический пример          */}
        {/* ══════════════════════════════════════ */}
        <div style={sSection}>
          <h2 style={sH2}>7. Практический пример: анализ ниши «Пакет для вакууматора»</h2>
          <p style={sP}>Разберём на реальном примере — у нас есть JSON-файл из MPSTATS API с данными по нише <strong style={{ color: C.text }}>«Бытовая техника → Техника для кухни → Хранение продуктов → Пакет для вакууматора»</strong>.</p>

          <h3 style={sH3}>Шаг 1: Получаем данные из MPSTATS API</h3>
          <p style={sP}>На прошлом занятии мы делали GET-запрос в Hoppscotch:</p>
          <div style={{ ...sCodeBlock, whiteSpace: "pre-wrap" }}>
            <CopyBtn text="https://mpstats.io/api/wb/get/category?d1=2026-01-26&d2=2026-02-24&path=Бытовая техника/Техника для кухни/Хранение продуктов/Пакет для вакууматора" />
{`GET https://mpstats.io/api/wb/get/category
  ?d1=2026-01-26
  &d2=2026-02-24
  &path=Бытовая техника/Техника для кухни/Хранение продуктов/Пакет для вакууматора

Заголовок: X-Mpstats-TOKEN: ваш_токен`}
          </div>
          <p style={sP}>API вернул JSON-файл (~0.45 MB) со всеми товарами в нише. Скачали его на компьютер.</p>

          <h3 style={sH3}>Шаг 2: Смотрим что внутри JSON</h3>
          <p style={sP}>Каждый товар в файле выглядит так:</p>
          <div style={{ ...sCodeBlock, whiteSpace: "pre-wrap", fontSize: 11 }}>
{`{
  "id": 506290093,
  "name": "Пакеты для вакууматора рифленые в рулоне 5 шт",
  "brand": "SUVI",
  "seller": "ООО Суви Групп",
  "balance": 546,          ← остаток на складе
  "comments": 2866,        ← количество отзывов
  "rating": 5,             ← рейтинг товара
  "final_price": 606,      ← текущая цена (₽)
  "start_price": 2999,     ← цена до скидки
  "revenue": 1234567,      ← выручка за период
  "sales": 890,            ← количество продаж
  "category_url": "Бытовая техника/Техника для кухни/..."
  ... и ещё ~40 полей по каждому товару
}`}
          </div>

          <div style={sTip}>
            <strong style={{ color: C.green }}>Ключевые поля для анализа:</strong>{" "}
            <span style={sCode}>revenue</span> (выручка), <span style={sCode}>sales</span> (продажи), <span style={sCode}>final_price</span> (цена), <span style={sCode}>rating</span> (рейтинг), <span style={sCode}>comments</span> (отзывы), <span style={sCode}>brand</span> (бренд), <span style={sCode}>seller</span> (продавец), <span style={sCode}>balance</span> (остатки).
          </div>

          <h3 style={sH3}>Шаг 3: Загружаем в NotebookLM</h3>
          <div style={sCard}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
              <span style={sStepNum}>A</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 4px" }}>Создайте ноутбук</p>
                <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>Откройте <a href="https://notebooklm.google.com" target="_blank" rel="noopener" style={{ color: C.green, textDecoration: "none", borderBottom: `1px solid ${C.green}44` }}>notebooklm.google.com</a> → «New Notebook» → назовите «Анализ: Пакет для вакууматора WB»</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
              <span style={sStepNum}>B</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 4px" }}>Конвертируйте JSON</p>
                <p style={{ fontSize: 13, color: "#ccc", margin: "0 0 6px" }}>NotebookLM не принимает JSON напрямую. Выберите один из способов:</p>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
                  <li><strong style={{ color: C.green }}>Быстрый:</strong> откройте JSON в Блокноте → Ctrl+A (выделить всё) → Ctrl+C (копировать) → в NotebookLM нажмите «Add source» → «Paste text» → Ctrl+V (вставить)</li>
                  <li><strong style={{ color: C.accent }}>Через Google Sheets:</strong> импортируйте JSON в Google Sheets → подключите Sheets как источник</li>
                  <li><strong style={{ color: C.pink }}>Через Claude:</strong> загрузите JSON в Claude → попросите «Конвертируй в читаемую таблицу» → скопируйте результат в NotebookLM</li>
                </ul>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={sStepNum}>C</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 4px" }}>Задайте промт</p>
                <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>После загрузки — вставьте промт из раздела ниже в чат NotebookLM. Он проанализирует все товары и даст вердикт.</p>
              </div>
            </div>
          </div>

          <h3 style={sH3}>Шаг 4: Промт для анализа этой ниши</h3>
          <p style={sP}>Скопируйте и вставьте в чат NotebookLM после загрузки данных:</p>
          <div style={{ ...sCodeBlock, whiteSpace: "pre-wrap" }}>
            <CopyBtn text={`Проанализируй загруженные данные по нише "Пакет для вакууматора" на Wildberries.

Мне нужен полный отчёт для принятия решения: заходить в эту нишу или нет.

1. ОБЗОР НИШИ
Посчитай общую выручку, количество продаж, среднюю цену, медианную цену, средний рейтинг. Сколько всего товаров и сколько из них реально продаются?

2. ТОП-10 ТОВАРОВ ПО ВЫРУЧКЕ
Таблица: название | бренд | цена | продажи | выручка | рейтинг | отзывы

3. МОНОПОЛИЗАЦИЯ
Какой процент общей выручки забирают ТОП-10 товаров? А ТОП-1? Есть ли шанс новичку?

4. БРЕНДЫ
Какие бренды доминируют? Есть ли товары без бренда с хорошими продажами?

5. ЦЕНОВЫЕ СЕГМЕНТЫ
Разбей товары по ценовым диапазонам (до 500₽, 500-1000₽, 1000-2000₽, 2000+₽). В каком сегменте лучшее соотношение спроса и конкуренции?

6. СЛАБЫЕ КОНКУРЕНТЫ
Найди товары с высокими продажами но рейтингом ниже 4.5 — это возможности для входа с лучшим качеством.

7. ВЕРДИКТ
Чёткий ответ: ЗАХОДИТЬ / С ОСТОРОЖНОСТЬЮ / НЕ ЗАХОДИТЬ
И конкретная стратегия: какой ценовой сегмент, какое позиционирование, примерный бюджет на старт.`} />
{`Проанализируй загруженные данные по нише "Пакет для вакууматора" на Wildberries.

Мне нужен полный отчёт для принятия решения: заходить в эту нишу или нет.

1. ОБЗОР НИШИ
Посчитай общую выручку, количество продаж, среднюю цену, медианную цену,
средний рейтинг. Сколько всего товаров и сколько из них реально продаются?

2. ТОП-10 ТОВАРОВ ПО ВЫРУЧКЕ
Таблица: название | бренд | цена | продажи | выручка | рейтинг | отзывы

3. МОНОПОЛИЗАЦИЯ
Какой процент общей выручки забирают ТОП-10 товаров? А ТОП-1?
Есть ли шанс новичку?

4. БРЕНДЫ
Какие бренды доминируют? Есть ли товары без бренда с хорошими продажами?

5. ЦЕНОВЫЕ СЕГМЕНТЫ
Разбей товары по ценовым диапазонам (до 500₽, 500-1000₽, 1000-2000₽, 2000+₽).
В каком сегменте лучшее соотношение спроса и конкуренции?

6. СЛАБЫЕ КОНКУРЕНТЫ
Найди товары с высокими продажами но рейтингом ниже 4.5 —
это возможности для входа с лучшим качеством.

7. ВЕРДИКТ
Чёткий ответ: ЗАХОДИТЬ / С ОСТОРОЖНОСТЬЮ / НЕ ЗАХОДИТЬ
И конкретная стратегия: какой ценовой сегмент, какое позиционирование,
примерный бюджет на старт.`}
          </div>

          <div style={sWarn}>
            <strong style={{ color: C.amber }}>Этот же промт работает и в Claude:</strong> просто загрузите JSON-файл в чат Claude через кнопку «+» → «Add files» и вставьте этот промт. Claude даст ещё более глубокий анализ с рекомендациями.
          </div>
        </div>

        {/* ══════════════════════════════════════ */}
        {/*  SECTION 8: Промты для анализа          */}
        {/* ══════════════════════════════════════ */}
        <div style={sSection}>
          <h2 style={sH2}>8. Универсальные промты для других ниш</h2>
          <p style={sP}>Эти промты можно использовать и в NotebookLM (после загрузки данных), и в Claude (загрузив JSON в чат):</p>

          <h3 style={sH3}>Промт 1: Анализ нескольких подкатегорий</h3>
          <p style={{ fontSize: 12, color: C.dim, margin: "0 0 8px" }}>Используйте когда загрузили данные по целой категории и хотите выбрать лучшую подкатегорию для входа.</p>
          <div style={{ ...sCodeBlock, whiteSpace: "pre-wrap" }}>
            <CopyBtn text={promptMultiNiche} />
            {promptMultiNiche}
          </div>

          <h3 style={sH3}>Промт 2: Глубокий анализ одной ниши</h3>
          <p style={{ fontSize: 12, color: C.dim, margin: "0 0 8px" }}>Используйте когда определились с нишей и хотите получить полный отчёт для принятия решения: заходить или нет.</p>
          <div style={{ ...sCodeBlock, whiteSpace: "pre-wrap" }}>
            <CopyBtn text={promptSingleNiche} />
            {promptSingleNiche}
          </div>
        </div>

        {/* ══════════════════════════════════════ */}
        {/*  SECTION 9: Готовые отчёты              */}
        {/* ══════════════════════════════════════ */}
        <div style={sSection}>
          <h2 style={sH2}>9. Готовые аналитические отчёты</h2>
          <p style={sP}>Детальные отчёты по нишам Wildberries, подготовленные с помощью MPSTATS + AI-анализа:</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Link href="/reports/kaspi-clothing" style={{ textDecoration: "none" }}>
              <div style={{ ...sCard, marginBottom: 0, cursor: "pointer", transition: "all 0.2s", borderColor: C.border }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 6px" }}>👗 Отчёт: Одежда на Kaspi</p>
                <p style={{ fontSize: 12, color: C.dim, margin: 0 }}>Полный разбор ниши: выручка, бренды, монополизация, ценовые сегменты, точки входа</p>
              </div>
            </Link>
            <Link href="/reports/optics-guide" style={{ textDecoration: "none" }}>
              <div style={{ ...sCard, marginBottom: 0, cursor: "pointer", transition: "all 0.2s", borderColor: C.border }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 6px" }}>🕶 Разбор: Оптика (сезонный товар)</p>
                <p style={{ fontSize: 12, color: C.dim, margin: 0 }}>Пример анализа сезонного товара: 3 сегмента, SWOT, план входа, прогноз выручки</p>
              </div>
            </Link>
          </div>

          <div style={sTip}>
            <strong style={{ color: C.green }}>Совет:</strong> загрузите эти отчёты в свой NotebookLM и задавайте дополнительные вопросы — AI ответит по данным из отчёта.
          </div>
        </div>

        {/* ══════════════════════════════════════ */}
        {/*  SECTION 10: Продвинутый уровень — MCP   */}
        {/* ══════════════════════════════════════ */}
        <div style={sSection}>
          <div style={{ background: `linear-gradient(135deg, ${C.accent}08, ${C.pink}08)`, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 24px 4px" }}>
            <h2 style={{ ...sH2, margin: "0 0 8px" }}>
              <span style={sBadge(C.pink)}>Дополнение</span> Интеграция NotebookLM + Claude Desktop
            </h2>
            <p style={sP}>
              Иногда ответы NotebookLM могут быть недостаточно глубокими — особенно когда нужна сложная аналитика, стратегические рекомендации или расчёты. Это нормально — NotebookLM создан для работы с фактами, а не для глубоких рассуждений.
            </p>
            <p style={sP}>
              <strong style={{ color: C.text }}>Решение:</strong> подключить Claude Desktop напрямую к NotebookLM через MCP (Model Context Protocol). Claude будет использовать NotebookLM как свою базу данных — спрашивать факты и анализировать их своим мощным мозгом.
            </p>

            <div style={sWarn}>
              <strong style={{ color: C.amber }}>Это продвинутый уровень.</strong> Требует установки дополнительных программ. Если вам хватает NotebookLM + Claude по отдельности — можно пропустить этот блок.
            </div>

            <h3 style={sH3}>Что нужно установить</h3>

            <div style={sCard}>
              <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 10px" }}>1. Node.js — движок для запуска скриптов</p>
              <p style={{ fontSize: 13, color: "#ccc", margin: "0 0 8px" }}>
                <strong style={{ color: C.text }}>Что это:</strong> Node.js — это программа, которая позволяет запускать JavaScript-код на вашем компьютере. Она нужна для MCP-серверов, которые связывают Claude с другими сервисами.
              </p>
              <p style={{ fontSize: 13, color: "#ccc", margin: "0 0 8px" }}>
                <strong style={{ color: C.text }}>Скачать:</strong>{" "}
                <a href="https://nodejs.org" target="_blank" rel="noopener" style={{ color: C.green, textDecoration: "none", borderBottom: `1px solid ${C.green}44` }}>nodejs.org</a> → нажмите большую зелёную кнопку «LTS» (стабильная версия)
              </p>
              <p style={{ fontSize: 13, color: "#ccc", margin: "0 0 8px" }}>
                <strong style={{ color: C.text }}>Установка:</strong> запустите скачанный файл → жмите «Next» на каждом шаге → «Install» → «Finish». На шаге «Tools for Native Modules» галочку <strong style={{ color: C.text }}>НЕ ставьте</strong> — это не нужно.
              </p>
              <p style={{ fontSize: 13, color: C.dim, margin: 0 }}>
                После установки можно проверить: откройте терминал (Win+R → <span style={sCode}>cmd</span> → Enter) и введите <span style={sCode}>node --version</span>. Должен показать номер версии.
              </p>
            </div>

            <div style={sCard}>
              <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 10px" }}>2. Claude Desktop — приложение Claude на компьютер</p>
              <p style={{ fontSize: 13, color: "#ccc", margin: "0 0 8px" }}>
                <strong style={{ color: C.text }}>Что это:</strong> обычный Claude, но в виде приложения на компьютере. Обычного сайта claude.ai в браузере будет недостаточно — MCP работает только в приложении.
              </p>
              <p style={{ fontSize: 13, color: "#ccc", margin: "0 0 8px" }}>
                <strong style={{ color: C.text }}>Скачать:</strong>{" "}
                <a href="https://claude.ai/download" target="_blank" rel="noopener" style={{ color: C.accent, textDecoration: "none", borderBottom: `1px solid ${C.accent}44` }}>claude.ai/download</a> → нажмите «Download for Windows» (или Mac)
              </p>
              <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>
                Установите, войдите в аккаунт и закройте приложение — оно создаст нужную папку для настроек.
              </p>
            </div>

            <h3 style={sH3}>Пошаговая настройка MCP</h3>

            <div style={sCard}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 16 }}>
                <span style={sStepNum}>1</span>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 4px" }}>Найдите файл настроек Claude Desktop</p>
                  <p style={{ fontSize: 13, color: "#ccc", margin: "0 0 8px" }}>
                    Откройте Claude Desktop → Меню (☰) → <strong style={{ color: C.text }}>Settings</strong> → в левом меню внизу найдите <strong style={{ color: C.text }}>Developer</strong> → нажмите <strong style={{ color: C.text }}>Edit Config</strong>
                  </p>
                  <p style={{ fontSize: 13, color: "#ccc", margin: "0 0 8px" }}>
                    Откроется папка с файлом <span style={sCode}>claude_desktop_config.json</span> — это и есть файл настроек.
                  </p>

                  <Collapsible title="Если кнопка Edit Config не открывает файл">
                    <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
                      <p style={{ margin: "0 0 8px" }}><strong style={{ color: C.text }}>Способ 1 (Windows):</strong> Нажмите <span style={sCode}>Win + R</span>, введите <span style={sCode}>%APPDATA%\Claude</span> и нажмите Enter.</p>
                      <p style={{ margin: "0 0 8px" }}><strong style={{ color: C.text }}>Способ 2 (ручной путь):</strong> Откройте Проводник → в адресной строке введите:<br /><span style={sCode}>C:\Users\[ВАШЕ_ИМЯ]\AppData\Roaming\Claude</span><br />Замените [ВАШЕ_ИМЯ] на имя вашего пользователя Windows (например, Almas, Arman и т.д.)</p>
                      <p style={{ margin: "0 0 8px" }}><strong style={{ color: C.text }}>Не видите папку AppData?</strong> Она скрыта по умолчанию. В Проводнике нажмите «Вид» (вверху) → поставьте галочку «Скрытые элементы».</p>
                      <p style={{ margin: "0 0 8px" }}><strong style={{ color: C.text }}>Папки Claude нет?</strong> Запустите Claude Desktop хотя бы раз, войдите в аккаунт, закройте — папка создастся автоматически. Если всё равно нет — создайте папку <span style={sCode}>Claude</span> вручную в <span style={sCode}>%APPDATA%</span>.</p>
                      <p style={{ margin: 0 }}><strong style={{ color: C.text }}>Mac:</strong> Откройте Finder → нажмите <span style={sCode}>Cmd + Shift + G</span> → вставьте путь:<br /><span style={sCode}>~/Library/Application Support/Claude/</span></p>
                    </div>
                  </Collapsible>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 16 }}>
                <span style={sStepNum}>2</span>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 4px" }}>Откройте файл в текстовом редакторе</p>
                  <p style={{ fontSize: 13, color: "#ccc", margin: "0 0 8px" }}>
                    Правая кнопка мыши на файле <span style={sCode}>claude_desktop_config.json</span> → «Открыть с помощью» → выберите:
                  </p>
                  <ul style={{ margin: "0 0 8px", paddingLeft: 20, fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
                    <li><strong style={{ color: C.text }}>Блокнот (Notepad)</strong> — уже встроен в Windows, ничего ставить не нужно</li>
                    <li><strong style={{ color: C.text }}>Notepad++</strong> — бесплатный, удобнее для JSON (<a href="https://notepad-plus-plus.org/downloads/" target="_blank" rel="noopener" style={{ color: C.accent, textDecoration: "none" }}>скачать</a>)</li>
                    <li><strong style={{ color: C.text }}>VS Code</strong> — если хотите идти дальше в автоматизацию (<a href="https://code.visualstudio.com" target="_blank" rel="noopener" style={{ color: C.accent, textDecoration: "none" }}>скачать</a>)</li>
                  </ul>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 16 }}>
                <span style={sStepNum}>3</span>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 4px" }}>Вставьте настройки MCP</p>
                  <p style={{ fontSize: 13, color: "#ccc", margin: "0 0 8px" }}>
                    Если файл пустой или содержит <span style={sCode}>{`{}`}</span>, замените всё содержимое на:
                  </p>
                  <div style={{ ...sCodeBlock, whiteSpace: "pre-wrap" }}>
                    <CopyBtn text={mcpConfig} />
                    {mcpConfig}
                  </div>
                  <p style={{ fontSize: 13, color: "#ccc", margin: "0 0 8px" }}>
                    Если в файле уже есть содержимое (например, <span style={sCode}>{`"preferences": {...}`}</span>), добавьте блок <span style={sCode}>mcpServers</span> через запятую:
                  </p>
                  <div style={{ ...sCodeBlock, whiteSpace: "pre-wrap" }}>
                    <CopyBtn text={`{
  "preferences": {
    ...ваши текущие настройки...
  },
  "mcpServers": {
    "notebooklm": {
      "command": "npx",
      "args": ["notebooklm-mcp@latest"]
    }
  }
}`} />
{`{
  "preferences": {
    ...ваши текущие настройки...
  },
  "mcpServers": {
    "notebooklm": {
      "command": "npx",
      "args": ["notebooklm-mcp@latest"]
    }
  }
}`}
                  </div>
                  <p style={{ fontSize: 12, color: C.dim, margin: 0 }}>Обратите внимание на запятую после закрывающей скобки preferences — без неё файл не будет работать.</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={sStepNum}>4</span>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 4px" }}>Сохраните и перезапустите Claude Desktop</p>
                  <p style={{ fontSize: 13, color: "#ccc", margin: "0 0 8px" }}>
                    Сохраните файл (<span style={sCode}>Ctrl + S</span>). Затем <strong style={{ color: C.text }}>полностью закройте</strong> Claude Desktop:
                  </p>
                  <ul style={{ margin: "0 0 8px", paddingLeft: 20, fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
                    <li>Найдите иконку Claude в трее (внизу справа, рядом с часами)</li>
                    <li>Нажмите стрелочку <span style={sCode}>^</span> чтобы показать скрытые значки</li>
                    <li>Правая кнопка по иконке Claude → <strong style={{ color: C.text }}>Quit</strong> или <strong style={{ color: C.text }}>Закрыть окно</strong></li>
                  </ul>
                  <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>
                    Откройте Claude Desktop заново. Зайдите в Settings → Developer — должен появиться сервер <strong style={{ color: C.green }}>notebooklm</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div style={sWarn}>
              <strong style={{ color: C.amber }}>Если MCP-сервер не появляется:</strong> это может быть связано с версией Claude Desktop или песочницей Windows. В этом случае используйте NotebookLM и Claude по отдельности — это тоже отлично работает. Открываете NotebookLM в одной вкладке, Claude — в другой. Копируете факты из NotebookLM → вставляете в Claude для глубокого анализа.
            </div>
          </div>
        </div>

        {/* ───── footer ───── */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 32, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: C.faint }}>kasymzhanov.com · AI для продавцов маркетплейсов · 2026</p>
        </div>
      </div>
    </div>
  );
}
