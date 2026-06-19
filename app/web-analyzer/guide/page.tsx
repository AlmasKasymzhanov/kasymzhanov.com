import Link from "next/link";

/* ───── design tokens (same as analyzer) ───── */
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
};

/* ───── reusable style helpers ───── */
const sSection: React.CSSProperties = {
  marginBottom: 48,
};

const sH2: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  margin: "0 0 20px",
  color: C.text,
  letterSpacing: "-0.01em",
};

const sH3: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  margin: "28px 0 12px",
  color: C.text,
};

const sP: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.7,
  color: "#ccc",
  margin: "0 0 12px",
};

const sCard: React.CSSProperties = {
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: 10,
  padding: "20px 24px",
  marginBottom: 16,
};

const sCode: React.CSSProperties = {
  background: "rgba(108,92,231,0.12)",
  color: C.accent,
  padding: "2px 7px",
  borderRadius: 4,
  fontSize: 12,
  fontFamily: "monospace",
};

const sBadge = (color: string): React.CSSProperties => ({
  display: "inline-block",
  padding: "3px 10px",
  borderRadius: 6,
  fontSize: 11,
  fontWeight: 600,
  background: `${color}18`,
  color,
  marginRight: 6,
});

/* ───── strategy filter table ───── */
function FilterTable({
  rows,
}: {
  rows: { filter: string; value: string; why: string }[];
}) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: 13,
        marginTop: 12,
        marginBottom: 8,
      }}
    >
      <thead>
        <tr
          style={{
            borderBottom: `1px solid ${C.border}`,
            textAlign: "left",
          }}
        >
          <th style={{ padding: "8px 12px", color: C.dim, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Фильтр
          </th>
          <th style={{ padding: "8px 12px", color: C.dim, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Значение
          </th>
          <th style={{ padding: "8px 12px", color: C.dim, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Почему
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr
            key={i}
            style={{ borderBottom: `1px solid ${C.border}` }}
          >
            <td style={{ padding: "8px 12px", color: C.accent, fontWeight: 500 }}>
              {r.filter}
            </td>
            <td style={{ padding: "8px 12px", color: C.text, fontWeight: 600 }}>
              {r.value}
            </td>
            <td style={{ padding: "8px 12px", color: "#aaa", fontSize: 12 }}>
              {r.why}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ───── step component ───── */
function Step({
  num,
  title,
  children,
}: {
  num: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "rgba(108,92,231,0.15)",
          color: C.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          fontWeight: 700,
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {num}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>
          {title}
        </div>
        <div style={{ fontSize: 13, color: "#bbb", lineHeight: 1.6 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ───── scoring weight bar ───── */
function WeightBar({
  label,
  weight,
  description,
}: {
  label: string;
  weight: number;
  description: string;
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: C.text, fontWeight: 500 }}>{label}</span>
        <span style={{ color: C.accent, fontWeight: 700 }}>{weight} баллов</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: C.border }}>
        <div
          style={{
            height: 6,
            borderRadius: 3,
            background: C.accent,
            width: `${weight}%`,
          }}
        />
      </div>
      <div style={{ fontSize: 11, color: C.dim, marginTop: 3 }}>{description}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*                  PAGE                       */
/* ═══════════════════════════════════════════ */

export default function GuidePage() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 20px 80px" }}>
        {/* header */}
        <div style={{ marginBottom: 40 }}>
          <Link
            href="/web-analyzer"
            style={{ fontSize: 12, color: C.dim, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 16 }}
          >
            ← Назад к анализатору
          </Link>
          <h1
            style={{
              fontSize: 30,
              fontWeight: 700,
              margin: "0 0 8px",
              letterSpacing: "-0.02em",
            }}
          >
            Инструкция: WB Niche Analyzer
          </h1>
          <p style={{ fontSize: 15, color: C.dim, margin: 0 }}>
            Как находить прибыльные ниши на Wildberries с помощью данных MPStats
          </p>
        </div>

        {/* ── 1. Как получить данные ── */}
        <section style={sSection}>
          <h2 style={sH2}>1. Как получить данные из MPStats</h2>

          <div style={sCard}>
            <Step num={1} title="Откройте MPStats">
              Зайдите на{" "}
              <span style={sCode}>mpstats.io</span> и авторизуйтесь.
              Убедитесь, что у вас есть активная подписка.
            </Step>
            <Step num={2} title="Перейдите в раздел «Выбор ниши»">
              <span style={sCode}>Меню</span> →{" "}
              <span style={sCode}>WB</span> →{" "}
              <span style={sCode}>Внешняя аналитика</span> →{" "}
              <span style={sCode}>Выбор ниши</span>
            </Step>
            <Step num={3} title="Скачайте CSV">
              В нижнем левом углу таблицы нажмите кнопку{" "}
              <span style={sCode}>Скачать</span>. Файл скачается в формате CSV
              (~3 МБ, ~7 500 ниш).
            </Step>
            <Step num={4} title="Загрузите в анализатор">
              Откройте{" "}
              <Link href="/web-analyzer" style={{ color: C.accent, textDecoration: "none", fontWeight: 500 }}>
                WB Niche Analyzer
              </Link>
              , перетащите CSV-файл в зону загрузки или кликните для выбора файла.
            </Step>
          </div>

          <div
            style={{
              ...sCard,
              borderColor: "rgba(108,92,231,0.3)",
              background: "rgba(108,92,231,0.06)",
            }}
          >
            <div style={{ fontSize: 13, color: C.accent, fontWeight: 600, marginBottom: 6 }}>
              Метод «Инсайт»
            </div>
            <p style={{ ...sP, margin: 0 }}>
              MPStats использует метод «Инсайт» — продажи и выручка в CSV-файле
              уже отражают реальные выкупы, а не заказы. Наш анализатор берёт эти
              данные напрямую и <strong style={{ color: C.text }}>НЕ</strong>{" "}
              умножает на % выкупа повторно. Это даёт максимально точные цифры.
            </p>
          </div>
        </section>

        {/* ── 2. Ключевые метрики ── */}
        <section style={sSection}>
          <h2 style={sH2}>2. Ключевые метрики — что означает каждый столбец</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { name: "Активные товары", desc: "Товары с движением (просмотры, клики, добавления в корзину). Показывает реальный размер конкуренции в нише — сколько карточек «живые»." },
              { name: "% с продажами", desc: "Доля активных товаров, у которых есть реальные продажи. Если 60% — значит 6 из 10 карточек продают. Чем выше — тем более «рабочая» ниша." },
              { name: "% выкупа", desc: "Какой % заказов реально выкупают (не возвращают). Ниже 50% — ниша с высоким процентом возвратов, выше 80% — стабильные товары." },
              { name: "Оборачиваемость", desc: "Сколько дней товар лежит на складе до продажи. < 30 дн — быстро продаётся, > 120 дн — замороженные деньги." },
              { name: "Выручка", desc: "Общая месячная выручка ниши по всем продавцам. Показывает объём рынка: сколько денег крутится в нише." },
              { name: "Выр/тов", desc: "Выручка делённая на количество товаров с продажами. Сколько зарабатывает одна средняя карточка. Ключевая метрика для оценки потенциала." },
              { name: "% упущенной", desc: "Какой % потенциального спроса не удовлетворён (товара нет в наличии, но спрос есть). Высокий % = дефицит = возможность для входа." },
              { name: "Средний чек", desc: "Средняя стоимость одного заказа. Определяет стартовый бюджет: чек 500₽ и чек 50 000₽ — это разные бизнес-модели." },
              { name: "Рейтинг", desc: "Средний дробный рейтинг товаров с продажами. Выше 4.8 — рынок «переоценён», сложно конкурировать. Ниже 4.2 — есть шанс выделиться качеством." },
              { name: "Балл (Score)", desc: "Комплексная оценка 0–100 баллов по 7 метрикам. Учитывает выручку, эффективность, дефицит, оборачиваемость, конкуренцию и рейтинг." },
            ].map((m) => (
              <div key={m.name} style={sCard}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.accent, marginBottom: 4 }}>
                  {m.name}
                </div>
                <div style={{ fontSize: 12, color: "#bbb", lineHeight: 1.55 }}>
                  {m.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Скоринг ── */}
        <section style={sSection}>
          <h2 style={sH2}>3. Как работает скоринг</h2>
          <p style={sP}>
            Каждая ниша получает балл от 0 до 100. Балл складывается из 7 метрик,
            каждая с определённым весом. Чем выше балл — тем привлекательнее ниша
            по совокупности факторов.
          </p>

          <div style={sCard}>
            <WeightBar label="Выручка на 1 товар" weight={20} description="Главная метрика: сколько зарабатывает одна карточка. Чем больше — тем выгоднее заходить." />
            <WeightBar label="% упущенной выручки" weight={20} description="Дефицит на рынке. Высокий % = товара не хватает = есть спрос на новых продавцов." />
            <WeightBar label="Оборачиваемость" weight={20} description="Скорость продаж. Быстрая оборачиваемость = меньше замороженных денег. ИНВЕРСНАЯ: меньше дней = больше баллов." />
            <WeightBar label="% товаров с продажами" weight={20} description="Какая доля товаров реально продаёт. Высокий % = больше шансов что ваш товар тоже будет продавать." />
            <WeightBar label="Выручка ниши" weight={10} description="Общий объём рынка. Маленький рынок — потолок роста ограничен, большой — больше возможностей." />
            <WeightBar label="% продавцов с продажами" weight={5} description="Какая доля продавцов реально зарабатывает. Низкий % — рынок жёсткий, высокий — место есть." />
            <WeightBar label="Рейтинг конкурентов" weight={5} description="Средний рейтинг товаров с продажами. ИНВЕРСНАЯ: ниже рейтинг конкурентов = легче конкурировать." />
          </div>

          <div
            style={{
              ...sCard,
              borderColor: "rgba(0,210,160,0.2)",
              background: "rgba(0,210,160,0.04)",
            }}
          >
            <p style={{ ...sP, margin: 0, fontSize: 13 }}>
              <strong style={{ color: C.green }}>Ориентиры:</strong>{" "}
              Балл <span style={{ color: C.green, fontWeight: 700 }}>60+</span> — отличная ниша,{" "}
              <span style={{ color: "#a29bfe", fontWeight: 700 }}>40–60</span> — хорошая с оговорками,{" "}
              <span style={{ color: C.dim, fontWeight: 700 }}>&lt; 40</span> — слабая или перегретая.
            </p>
          </div>
        </section>

        {/* ── 4. Три стратегии ── */}
        <section style={sSection}>
          <h2 style={sH2}>4. Три стратегии поиска ниш</h2>
          <p style={sP}>
            Выберите стратегию под свой уровень и бюджет. Каждая стратегия — это набор фильтров, которые нужно установить в анализаторе. После применения фильтров отсортируйте по баллу (столбец «Балл» ↓) и изучайте ТОП.
          </p>

          {/* ── Новичок ── */}
          <div
            style={{
              ...sCard,
              borderLeft: `3px solid ${C.green}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={sBadge(C.green)}>НОВИЧОК</span>
              <span style={{ fontSize: 13, color: C.dim }}>
                Бюджет 100–500К ₽ &middot; Первый запуск на WB
              </span>
            </div>
            <p style={{ ...sP, fontSize: 13 }}>
              Цель — найти нишу с низким порогом входа, быстрой оборачиваемостью и высоким % выкупа.
              Избегаем крупных ниш с тысячами конкурентов. Ищем «тихие гавани» с реальным спросом.
            </p>

            <FilterTable
              rows={[
                { filter: "Выручка", value: "1–5 млн, 5–10 млн, 10–20 млн", why: "Не слишком маленький рынок (есть спрос), но и не гигантский (там крупняки)" },
                { filter: "Средний чек", value: "1–1.5к, 1.5–2.5к, 2.5–5к", why: "Доступная закупка, быстрые продажи. Чек 5К+ требует большего стартового капитала" },
                { filter: "% выкупа", value: "70–80%, 80–90%, 90%+", why: "Минимум возвратов — критично для новичка, каждый возврат = убыток" },
                { filter: "Оборачиваемость", value: "< 30 дн, 30–45", why: "Деньги не должны зависать. < 45 дней = оборот капитала каждый месяц" },
                { filter: "Активные товары", value: "до 1 000, 1–3 тыс, 3–5 тыс", why: "Малая конкуренция. Легче выйти в ТОП органически" },
                { filter: "% с продажами", value: "40–50%, 50–60%, 60%+", why: "Больше половины карточек продают — ниша живая, шанс есть" },
                { filter: "Сезонность", value: "Низкая, Умеренная", why: "Высокая сезонность = риск зависнуть с остатками в несезон" },
              ]}
            />

            <div style={{ fontSize: 12, color: C.dim, marginTop: 8, fontStyle: "italic" }}>
              После фильтрации → сортировка по «Балл» ↓ → изучаем ТОП-20
            </div>
          </div>

          {/* ── Средний продавец ── */}
          <div
            style={{
              ...sCard,
              borderLeft: `3px solid ${C.accent}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={sBadge(C.accent)}>СРЕДНИЙ</span>
              <span style={{ fontSize: 13, color: C.dim }}>
                Бюджет 500К–3М ₽ &middot; Есть опыт на WB
              </span>
            </div>
            <p style={{ ...sP, fontSize: 13 }}>
              Цель — масштабирование. Ищем ниши с реальным дефицитом (высокая упущенная выручка),
              хорошей оборачиваемостью и средним чеком от 1 500 ₽ для приемлемой маржинальности.
            </p>

            <FilterTable
              rows={[
                { filter: "Выручка", value: "10–20 млн, 20–50 млн, 50–100 млн", why: "Ёмкий рынок. Есть куда расти, хватит объёма для стабильных продаж" },
                { filter: "Средний чек", value: "1.5–2.5к, 2.5–5к, 5–7.5к, 7.5–10к", why: "Средний ценовой сегмент: хорошая маржа + достаточный объём" },
                { filter: "% выкупа", value: "60–70%, 70–80%, 80%+", why: "Приемлемый уровень возвратов, при 60%+ бизнес-модель работает" },
                { filter: "Оборачиваемость", value: "< 30 дн, 30–45, 45–60, 60–90", why: "До 90 дней допустимо при хорошей марже и объёме" },
                { filter: "% упущенной", value: "20–30%, 30–40%, 40–50%, 50%+", why: "Главное оружие среднего продавца: заходим туда, где спрос не удовлетворён" },
                { filter: "Активные товары", value: "3–5 тыс, 5–10 тыс, 10–25 тыс", why: "Конкуренция есть, но управляемая. Есть место для качественного товара" },
                { filter: "% с продажами", value: "30–40%, 40–50%, 50%+", why: "Минимум 30% карточек продают — ниша рабочая" },
              ]}
            />

            <div style={{ fontSize: 12, color: C.dim, marginTop: 8, fontStyle: "italic" }}>
              Фокус на столбцах: Выр/тов, % упущ., Оборач., Потенциал
            </div>
          </div>

          {/* ── Крупный продавец ── */}
          <div
            style={{
              ...sCard,
              borderLeft: `3px solid ${C.amber}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={sBadge(C.amber)}>КРУПНЫЙ</span>
              <span style={{ fontSize: 13, color: C.dim }}>
                Бюджет 3М+ ₽ &middot; Масштабирование бизнеса
              </span>
            </div>
            <p style={{ ...sP, fontSize: 13 }}>
              Цель — захват крупных ниш с максимальным неудовлетворённым спросом.
              Бюджет позволяет работать с длинной оборачиваемостью и высоким чеком.
              Ключевая метрика — потенциал (выручка + упущенная выручка).
            </p>

            <FilterTable
              rows={[
                { filter: "Выручка", value: "50–100 млн, 100–200М, 200М+", why: "Большой рынок = большие деньги. На малом рынке крупному нечего делать" },
                { filter: "Средний чек", value: "Любой (но предпочт. 2.5к+)", why: "При масштабе работает любой чек, но высокий чек = меньше логистики на ₽ выручки" },
                { filter: "% выкупа", value: "50–60%, 60–70%, 70%+", why: "При больших объёмах даже 50% выкупа окупается, но 70%+ — комфортнее" },
                { filter: "Оборачиваемость", value: "< 30 дн, 30–45, 45–60, 60–90, 90–120", why: "Бюджет позволяет ждать. До 120 дней окупается при крупных объёмах" },
                { filter: "% упущенной", value: "30–40%, 40–50%, 50%+", why: "Максимальный дефицит = максимальная возможность. Крупный игрок может закрыть этот спрос" },
                { filter: "Активные товары", value: "10–25 тыс, 25–50 тыс, 50 тыс+", why: "Большая ниша с множеством карточек, но крупный продавец может занять долю объёмом" },
              ]}
            />

            <div style={{ fontSize: 12, color: C.dim, marginTop: 8, fontStyle: "italic" }}>
              Фокус на столбцах: Потенциал, Выручка, % упущ., Продажи
            </div>
          </div>
        </section>

        {/* ── 5. Красные флаги ── */}
        <section style={sSection}>
          <h2 style={sH2}>5. Красные флаги — когда НЕ заходить в нишу</h2>

          <div
            style={{
              ...sCard,
              borderColor: "rgba(248,113,113,0.3)",
              background: "rgba(248,113,113,0.04)",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                {
                  flag: "% с продажами < 10%",
                  why: "9 из 10 карточек не продают. Ниша мертва или слишком нишевая. Ваш товар с 90% вероятностью тоже не продаст.",
                },
                {
                  flag: "Оборачиваемость 240+ дней",
                  why: "Товар лежит на складе 8 месяцев. Ваши деньги заморожены, а WB начнёт брать плату за хранение.",
                },
                {
                  flag: "% выкупа < 30%",
                  why: "7 из 10 заказов возвращают. Расходы на обратную логистику съедят всю прибыль. Типично для одежды с проблемами с размерами.",
                },
                {
                  flag: "Рейтинг 4.8+",
                  why: "Конкуренты с идеальным рейтингом. Чтобы конкурировать, нужно такое же качество + отзывы. Новичку сюда не пробиться.",
                },
                {
                  flag: "Выручка < 500К ₽",
                  why: "Рынок слишком мал. Даже если займёте 50%, это 250К выручки — не бизнес, а хобби.",
                },
                {
                  flag: "% продавцов с продажами < 5%",
                  why: "Из 100 продавцов зарабатывают только 5. Вероятность оказаться в числе 95 неудачников — слишком велика.",
                },
              ].map((f, i) => (
                <div key={i}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.red, marginBottom: 4 }}>
                    {f.flag}
                  </div>
                  <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.5 }}>
                    {f.why}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. Пошаговый алгоритм ── */}
        <section style={sSection}>
          <h2 style={sH2}>6. Пошаговый алгоритм работы</h2>

          <div style={sCard}>
            <Step num={1} title="Определите свой уровень">
              Новичок, средний или крупный продавец? От этого зависит набор фильтров.
              Если сомневаетесь — начните с «Новичок».
            </Step>
            <Step num={2} title="Нажмите «▼ Фильтры» и установите значения">
              Кликайте по диапазонам в каждом слайсере. Можно выбрать несколько
              значений в одном фильтре. Число справа от диапазона показывает
              количество ниш, которые попадут в этот бакет.
            </Step>
            <Step num={3} title="Отсортируйте по баллу">
              Кликните на заголовок столбца <strong style={{ color: C.text }}>«Балл»</strong> — ниши
              отсортируются от лучших к худшим. Зелёные баллы (60+) — приоритет.
            </Step>
            <Step num={4} title="Изучите ТОП-20 и отметьте интересные">
              Кликните по строке, чтобы поставить галочку ☑. Обращайте внимание
              на столбцы <strong style={{ color: C.text }}>Выр/тов</strong>,{" "}
              <strong style={{ color: C.text }}>% упущ.</strong>,{" "}
              <strong style={{ color: C.text }}>Оборач.</strong> и{" "}
              <strong style={{ color: C.text }}>% выкупа</strong>.
            </Step>
            <Step num={5} title="Экспортируйте выбранные ниши">
              Нажмите <strong style={{ color: C.accent }}>«⬇ Выбранные (N)»</strong> — скачается
              CSV только с отмеченными нишами. Удобно для дальнейшего анализа.
            </Step>
            <Step num={6} title="Проверьте каждую нишу в MPStats детально">
              Вернитесь в MPStats и проанализируйте каждую выбранную нишу:
              тренды продаж, топ товары, ценовая сегментация, анализ карточек конкурентов.
              Наш анализатор — это фильтр первого этапа, не финальное решение.
            </Step>
          </div>
        </section>

        {/* ── 7. Комбинации фильтров (Pro tips) ── */}
        <section style={sSection}>
          <h2 style={sH2}>7. Продвинутые комбинации фильтров</h2>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>
              <span style={sBadge(C.green)}>COMBO</span> Товары с быстрым стартом
            </h3>
            <p style={{ ...sP, fontSize: 13 }}>
              Ниши, где можно начать продавать в первый же месяц.
            </p>
            <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.8, paddingLeft: 12, borderLeft: `2px solid ${C.border}` }}>
              Оборачиваемость: <strong style={{ color: C.text }}>{"< 30 дн"}</strong><br />
              % выкупа: <strong style={{ color: C.text }}>80%+</strong><br />
              % с продажами: <strong style={{ color: C.text }}>50%+</strong><br />
              Средний чек: <strong style={{ color: C.text }}>1–5к</strong><br />
              → Сортировка по Балл ↓
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>
              <span style={sBadge(C.accent)}>COMBO</span> Дефицитные ниши (голубой океан)
            </h3>
            <p style={{ ...sP, fontSize: 13 }}>
              Ниши, где спрос значительно превышает предложение.
            </p>
            <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.8, paddingLeft: 12, borderLeft: `2px solid ${C.border}` }}>
              % упущенной: <strong style={{ color: C.text }}>40%+</strong><br />
              Выручка: <strong style={{ color: C.text }}>5 млн+</strong><br />
              % выкупа: <strong style={{ color: C.text }}>60%+</strong><br />
              → Сортировка по Потенциал ↓
            </div>
          </div>

          <div style={sCard}>
            <h3 style={{ ...sH3, marginTop: 0 }}>
              <span style={sBadge(C.amber)}>COMBO</span> Высокомаржинальные ниши
            </h3>
            <p style={{ ...sP, fontSize: 13 }}>
              Ниши с высоким чеком и хорошей выручкой на карточку.
            </p>
            <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.8, paddingLeft: 12, borderLeft: `2px solid ${C.border}` }}>
              Средний чек: <strong style={{ color: C.text }}>7.5к+</strong><br />
              Выручка: <strong style={{ color: C.text }}>10 млн+</strong><br />
              Активные товары: <strong style={{ color: C.text }}>до 10 тыс</strong><br />
              % с продажами: <strong style={{ color: C.text }}>30%+</strong><br />
              → Сортировка по Выр/тов ↓
            </div>
          </div>
        </section>

        {/* ── footer ── */}
        <div
          style={{
            borderTop: `1px solid ${C.border}`,
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/web-analyzer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 8,
              background: C.accent,
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Открыть анализатор →
          </Link>
          <Link
            href="/web-analyzer"
            style={{ fontSize: 12, color: C.dim, textDecoration: "none" }}
          >
            kasymzhanov.com
          </Link>
        </div>
      </div>
    </div>
  );
}
