"use client";
import { ResearchFact } from "@/components/canon/research-editorial";

import { ResearchReadingTime } from "@/components/canon/research-reading-time";
import { MetaLabel } from "@/components/canon/meta-label";
import { LineChart } from "@/components/charts/line-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { ColumnChart } from "@/components/charts/column-chart";

/* Client report: seasonal Kaspi niches for a Christmas-tree wholesale producer.
   Canon: monochrome mono-editorial, Brock UI charts, ONE warm accent per chart
   (the site-wide --brock-accent orange), graphite context series. Standalone
   chrome (no blog engagement machinery) — the page lives on a client subdomain. */

const ACCENT = "var(--personal-text)";
const NEUTRAL = "var(--brock-neutral)";

// База продавцов — Google Sheets (12 115 контактов, A/B/C/D)
const BASE_URL =
  "https://docs.google.com/spreadsheets/d/1Fgcj39fDKyxYZCvmWUm3kaSUpYZ9xbqh/edit?usp=sharing&ouid=100115474296150625914&rtpof=true&sd=true";

/* ───── CTA: переход в базу продавцов ───── */
function BaseCTA() {
  return (
    <div className="mt-12  border-[var(--color-border)]    ">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-[var(--color-dim)] mb-1.5">
            База продавцов
          </p>
          <p className="text-[15px] font-normal leading-tight">12 115 контактов с телефонами</p>
          <p className="text-[12.5px] text-[var(--color-dim)] mt-1 leading-snug">
            Google Таблица: приоритет A/B/C/D, город, размер, рейтинг, ассортимент
          </p>
        </div>
        <a
          href={BASE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center justify-center gap-2 whitespace-nowrap
                     bg-[var(--color-text)] text-[var(--color-bg)] font-mono text-[13px] font-normal
                     uppercase tracking-[0.08em] px-5 py-3 rounded-[3px] no-underline
                     hover:opacity-80 transition-opacity
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-[var(--color-text)]"
        >
          Открыть базу
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="translate-y-[0.5px]">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

const fmtMln = (v: number) =>
  v >= 1000
    ? `${(v / 1000).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} млрд ₸`
    : `${v.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} млн ₸`;

const SOURCE = (
  <figcaption className="font-mono text-[12px] text-[var(--color-dim)] mt-4">
    Источник:{" "}
    <a
      href="https://redstat.kz"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--color-dim)] hover:text-[var(--color-text)]   "
    >
      redstat.kz
    </a>
    <span className="text-[var(--color-border)] mx-1.5">·</span>данные Kaspi.kz
  </figcaption>
);

/* ───── Section heading ───── */
function SectionHead({ n, label, title }: { n: string; label: string; title: React.ReactNode }) {
  return (
    <header className="mt-16 mb-6">
      <MetaLabel items={[`Раздел ${n}`, label]} className="mb-3" />
      <h2 className="text-[22px] md:text-[26px] font-normal tracking-tight leading-[1.2]">{title}</h2>
    </header>
  );
}

/* ───── Mono table on thin rules ───── */
function MonoTable({
  head,
  rows,
  numeric = [],
}: {
  head: string[];
  rows: (string | React.ReactNode)[][];
  numeric?: number[];
}) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full font-mono text-[12.5px] leading-relaxed border-collapse">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th
                key={i}
                className={`border-b border-[var(--color-text)] pb-2 pr-4 text-[12px] uppercase tracking-[0.14em] text-[var(--color-dim)] font-normal ${
                  numeric.includes(i) ? "text-right pr-0 pl-4" : "text-left"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td
                  key={ci}
                  className={`border-b border-[var(--color-border)] py-2 pr-4 align-top ${
                    numeric.includes(ci) ? "text-right pr-0 pl-4 tabular-nums" : ""
                  }`}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ───── Stat strip ─────
   Значение разбито на число + единицу: число и «млрд ₸» переносятся как единое
   целое (whitespace-nowrap), поэтому знак ₸ никогда не отрывается на отдельную
   строку. Единая сетка-бордер работает и в 2 колонки (моб.), и в 4 (десктоп). */
function StatStrip() {
  const stats = [
    { k: "НГ-товары, дек 2025", num: "3,82", unit: "млрд ₸", d: "+47% год к году" },
    { k: "Ниша «Новогодние ёлки»", num: "1,75", unit: "млрд ₸", d: "294 продавца · +27%" },
    { k: "Продавцов НГ-товаров", num: "2 749", unit: "", d: "декабрь 2025" },
    { k: "База для обзвона", num: "12 115", unit: "", d: "продавцов с телефонами · A/B/C/D" },
  ];
  return <div className="research-facts">{stats.map(s => <ResearchFact key={s.k} label={s.k} value={`${s.num}${s.unit ? ` ${s.unit}` : ""}`} note={s.d} />)}</div>;
}

/* ───── Charts ───── */
function ClusterLineChart() {
  return (
    <figure className="my-8   border-[var(--color-border)]  p-3 ">
      <LineChart
        height={260}
        accent={ACCENT}
        curve="linear"
        markers="auto"
        lastValueDot
        xScale="point"
        header={{
          title: "Два сезона, и второй выше первого на 47%",
          subtitle: "Выручка кластера «Новогодние товары», млн ₸ в месяц",
        }}
        x={[
          "ноя 24", "дек 24", "янв 25", "фев 25", "мар 25", "апр 25", "май 25", "июн 25",
          "июл 25", "авг 25", "сен 25", "окт 25", "ноя 25", "дек 25", "янв 26", "фев 26",
          "мар 26", "апр 26", "май 26", "июн 26", "июл 26",
        ]}
        data={[
          {
            name: "НГ-товары",
            data: [
              914.6, 2601, 36.1, 29.4, 16.2, 17.2, 19, 26.2, 25.7, 32.2, 49.5, 192.8,
              1441.1, 3823, 53.9, 43.7, 21, 23.3, 24.6, 18.1, 22.5,
            ],
            color: ACCENT,
            emphasis: true,
          },
        ]}
        formatValue={fmtMln}
        yAxisFormat={(v: number) => (v >= 1000 ? `${(v / 1000).toLocaleString("ru-RU")} млрд` : `${v} млн`)}
      />
      {SOURCE}
    </figure>
  );
}

function CategoriesBarChart() {
  return (
    <figure className="my-8   border-[var(--color-border)]  p-3 ">
      <BarChart
        accent={ACCENT}
        barRadius={2}
        labelWidth={168}
        barThickness={20}
        gap={10}
        header={{
          title: "Ёлки - почти половина всего кластера",
          subtitle: "Ниши НГ-кластера, выручка за декабрь 2025, млн ₸",
        }}

        data={[
          { label: "Новогодние ёлки", value: 1746.8, color: ACCENT },
          { label: "Электрогирлянды", value: 812.2, color: NEUTRAL },
          { label: "Ёлочные игрушки", value: 438.4, color: NEUTRAL },
          { label: "Новогодний декор", value: 348.6, color: NEUTRAL },
          { label: "Фейерверки", value: 230.3, color: NEUTRAL },
          { label: "Хвойные украшения", value: 89.6, color: NEUTRAL },
          { label: "Мишура, дождик", value: 58.2, color: NEUTRAL },
          { label: "Световые фигуры", value: 44.4, color: NEUTRAL },
        ]}
        dataLabels={{ show: true, format: (v: number) => v.toLocaleString("ru-RU", { maximumFractionDigits: 0 }) }}
        formatValue={fmtMln}
        xAxis={{ hideTicks: true }}
      />
      {SOURCE}
    </figure>
  );
}

function TimingChart() {
  return (
    <figure className="my-8   border-[var(--color-border)]  p-3 ">
      <ColumnChart
        height={230}
        barRadius={2}
        accent={ACCENT}
        header={{
          title: "94% сезона - это ноябрь и декабрь",
          subtitle: "Доля месяца в выручке сезона 2025/26, ниша «Новогодние ёлки»",
        }}

        data={[
          { label: "сен", value: 0.8, color: NEUTRAL },
          { label: "окт", value: 4.4, color: NEUTRAL },
          { label: "ноя", value: 31.5, color: ACCENT },
          { label: "дек", value: 62.9, color: ACCENT },
          { label: "янв", value: 0.4, color: NEUTRAL },
        ]}
        dataLabels={{ show: true, format: (v: number) => `${v}%` }}
        formatValue={(v: number) => `${v}% сезона`}
        yAxisFormat={(v: number) => `${v}%`}
        caption="Закупка решается в августе-октябре: к ноябрю склад уже должен стоять."
      />
      {SOURCE}
    </figure>
  );
}

function SeasonMapChart() {
  return (
    <figure className="my-8   border-[var(--color-border)]  p-3 ">
      <BarChart
        accent={ACCENT}
        barRadius={2}
        labelWidth={190}
        barThickness={18}
        gap={9}
        header={{
          title: "Сезонная карта Kaspi: где живут ваши покупатели",
          subtitle: "Продавце-мест в нишах сезонного класса · июнь 2026",
        }}

        data={[
          { label: "Умеренно-сезонные", value: 52173, color: NEUTRAL },
          { label: "Новогодний (ваш)", value: 39565, color: ACCENT },
          { label: "Позднее лето", value: 32480, color: NEUTRAL },
          { label: "Осень", value: 28304, color: NEUTRAL },
          { label: "Лето", value: 27297, color: NEUTRAL },
          { label: "Растущие", value: 21990, color: NEUTRAL },
          { label: "Kaspi Juma", value: 21444, color: NEUTRAL },
          { label: "Весна", value: 16322, color: NEUTRAL },
          { label: "Школьный сезон", value: 13121, color: NEUTRAL },
        ]}
        dataLabels={{ show: true, format: (v: number) => v.toLocaleString("ru-RU") }}
        formatValue={(v: number) => `${v.toLocaleString("ru-RU")} продавце-мест`}
        xAxis={{ hideTicks: true }}
      />
      {SOURCE}
    </figure>
  );
}

function SummerChart() {
  return (
    <figure className="my-8   border-[var(--color-border)]  p-3 ">
      <BarChart
        accent={ACCENT}
        barRadius={2}
        labelWidth={190}
        barThickness={18}
        gap={9}
        header={{
          title: "Летники: кому зимой нечем торговать",
          subtitle: "Сезонные летние ниши, выручка за июнь 2026, млн ₸",
        }}

        data={[
          { label: "Кондиционеры", value: 4214, color: NEUTRAL },
          { label: "Бассейны", value: 1957, color: ACCENT },
          { label: "Велосипеды", value: 837, color: NEUTRAL },
          { label: "Палатки", value: 416, color: NEUTRAL },
          { label: "Электровелосипеды", value: 391, color: NEUTRAL },
          { label: "Вентиляторы", value: 352, color: NEUTRAL },
          { label: "Садовая мебель", value: 321, color: NEUTRAL },
          { label: "Детские электромобили", value: 226, color: NEUTRAL },
        ]}
        dataLabels={{ show: true, format: (v: number) => v.toLocaleString("ru-RU") }}
        formatValue={fmtMln}
        xAxis={{ hideTicks: true }}
      />
      {SOURCE}
    </figure>
  );
}

function BaseCompositionChart() {
  return (
    <figure className="my-8   border-[var(--color-border)]  p-3 ">
      <ColumnChart
        height={230}
        barRadius={2}
        accent={ACCENT}
        header={{
          title: "12 115 продавцов, размечены по приоритету обзвона",
          subtitle: "Число продавцов с телефоном в каждом классе A/B/C/D",
        }}

        data={[
          { label: "A", value: 2996, color: ACCENT },
          { label: "B", value: 6377, color: NEUTRAL },
          { label: "C", value: 2272, color: NEUTRAL },
          { label: "D", value: 553, color: NEUTRAL },
        ]}
        dataLabels={{ show: true, format: (v: number) => v.toLocaleString("ru-RU") }}
        formatValue={(v: number) => `${v.toLocaleString("ru-RU")} продавцов`}
        yAxisFormat={(v: number) => v.toLocaleString("ru-RU")}
        caption="A + B = 9 373 продавца с реальным потенциалом закупа. D (5%) - только неактивные и с плохим рейтингом."
      />
      {SOURCE}
    </figure>
  );
}

/* ═════════════════════════════════════════════════════════════════ */

export default function ElkiClientReport() {
  return (
    <div className="reading-body text-[var(--color-text)]">
      <div className="w-full">
        {/* Slim client chrome: masthead + report brand, no site nav */}
        <header className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-[var(--color-border)]">

          <p className="font-mono text-[12px] sm:text-[12px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[var(--color-dim)] text-right shrink-0">
            RedStat<span className="hidden sm:inline"> · аналитика Kaspi.kz</span>
          </p>
        </header>

        <article className="w-full max-w-[800px]">
          <MetaLabel items={["Июль 2026", "Клиентский отчёт", "Kaspi.kz"]} className="mb-5" />
          <h1 className="text-[28px] md:text-[36px] font-normal tracking-tight leading-[1.15] mb-5">
            Сезонные ниши Kaspi.kz: рынок, продавцы, план обзвона
          </h1>
          <p className="text-[14px] md:text-[15px] text-[var(--color-dim)] leading-relaxed">
            Рынок новогодних и сезонных товаров на Kaspi.kz и база продавцов с прямыми контактами,
            приоритизированная под холодный обзвон оптового поставщика ёлок. Данные: ноябрь 2024 -
            июль 2026, 3 484 ниши, 663 тыс. товаров.
          </p>

          <ResearchReadingTime />
          <StatStrip />

          {/* ── 1. Рынок ── */}
          <SectionHead n="01" label="Рынок" title="Новогодние товары - самый быстрорастущий сезон Kaspi" />
          <p className="text-[14px] leading-relaxed mb-4">
            Кластер «Новогодние товары» (12 ниш: ёлки, гирлянды, игрушки, декор, хвоя, мишура) сделал
            в декабре 2025 года <b>3,82 млрд ₸</b> - на 47% больше, чем годом ранее. Число продавцов
            выросло с 1 894 до 2 749. Рынок растёт и по деньгам, и по конкуренции - оптовый поставщик,
            который первым доберётся до этих продавцов, забирает канал на годы.
          </p>
          <ClusterLineChart />
          <CategoriesBarChart />
          <p className="text-[14px] leading-relaxed mb-4">
            Быстрее всего растут сопутствующие ниши: ёлочные игрушки <b>+107%</b>, хвойные украшения{" "}
            <b>+104%</b>, искусственный снег <b>+120%</b>. Для производителя ёлок это готовый аргумент
            в разговоре: «возьмёте ёлки - дадим и сопутствующий ассортимент».
          </p>
          <div className="border-l-2 border-[var(--color-text)] pl-4 my-6">
            <p className="text-[13px] leading-relaxed text-[var(--color-dim)]">
              <b className="text-[var(--color-text)]">Прогноз сезона 2026/27.</b> При сохранении темпа
              (+25-40% консервативно против +47% факта) декабрь 2026 даст 4,8-5,4 млрд ₸, сезон
              октябрь-декабрь целиком - до 7,5 млрд ₸. В 2025-м спрос обогнал предложение: лидеры ниши
              распродались до 20 декабря.
            </p>
          </div>

          {/* ── 2. Ёлки ── */}
          <SectionHead n="02" label="Ваша ниша" title="Ёлки: 294 продавца, и почти все - ваши потенциальные клиенты" />
          <p className="text-[14px] leading-relaxed mb-4">
            Ниша «Новогодние ёлки» - 1,75 млрд ₸ за декабрь 2025 (79 400 заказов, средний чек 22 000 ₸).
            При этом <b>у 207 из 294 продавцов ёлки «Без бренда»</b> - они закупают у оптовиков и не
            привязаны к поставщику. Это ровно ваша целевая аудитория.
          </p>
          <TimingChart />

          <h3 className="font-normal text-[15px] mt-10 mb-1">Ценовая структура ниши</h3>
          <MonoTable
            head={["Сегмент", "Товаров", "Медианная цена", "Брендовых", "Комментарий"]}
            numeric={[1, 2, 3]}
            rows={[
              ["Низкий", "24", "1 250 ₸", "29%", "мини-ёлки, сувенирные"],
              ["Бюджетный", "43", "3 900 ₸", "40%", "до 90 см"],
              ["Средний", "47", "15 000 ₸", "47%", "120-180 см, ПВХ"],
              ["Дорогой", "37", "44 800 ₸", "51%", "180-210 см, комбинированные"],
              ["Премиум", "41", "88 000 ₸", "51%", "литые 210-270 см - основная выручка"],
            ]}
          />
          <p className="text-[14px] leading-relaxed mb-4">
            Выручка смещена в «Дорогой» и «Премиум»: покупатель на Kaspi готов платить за литую ёлку
            180-240 см. Если в вашей линейке есть такие позиции - ведите разговор с продавцами именно с них.
          </p>

          <h3 className="font-normal text-[15px] mt-10 mb-1">Бренды в нише: с кем конкурируете за полку</h3>
          <MonoTable
            head={["Бренд", "Продавцов", "Выручка, млн ₸", "Статус"]}
            numeric={[1, 2]}
            rows={[
              [<b key="nb">Без бренда</b>, "207", "645,8", <b key="nb2">открытый рынок - цель №1</b>],
              ["ЕЛКА МАРКЕТ", "47", "152,5", "открытая марка"],
              ["LILU", "1", "81,0", "закрытый бренд"],
              ["FNIX", "1", "59,0", "закрытый бренд"],
              ["NSShop", "8", "57,9", "полузакрытая марка"],
              ["Елки от Насти", "8", "44,1", "локальная марка"],
              ["AmiVi / Toyla", "1+1", "84,9", "закрытые бренды"],
            ]}
          />
          <p className="text-[14px] leading-relaxed mb-4">
            <b>70% продавцов ниши - 207 из 294 - работают на карточках «Без бренда»</b>, где продавать может
            кто угодно (это 37% всей выручки ниши). Рынок ещё не поделён под бренды. Окно, чтобы посадить
            сотни продавцов на вашу продукцию, открыто, но LILU, FNIX и AmiVi уже строят закрытые бренды.
          </p>

          {/* ── 3. Сезонка ── */}
          <SectionHead n="03" label="Сезонка" title="Карта сезонных продавцов Kaspi" />
          <p className="text-[14px] leading-relaxed mb-4">
            RedStat классифицирует каждую нишу Kaspi по типу сезонности - всего сезонных ниш больше
            2 500. Продавцы «летних» ниш - второй по ценности сегмент: им нечем торговать зимой,
            и ёлки закрывают их мёртвый сезон.
          </p>
          <SeasonMapChart />
          <SummerChart />

          {/* ── 4. База ── */}
          <SectionHead n="04" label="База продавцов" title="База: каждый контакт - с телефоном и портретом магазина" />
          <p className="text-[14px] leading-relaxed mb-4">
            Собрали <b>12 115 продавцов с прямыми телефонами</b> (99% всех найденных). По каждому - прямой
            телефон, город, юридический адрес, размер, рейтинг, надёжность и ассортимент. База
            передаётся отдельным файлом Excel и в ленты не публикуется.
          </p>
          <BaseCompositionChart />
          <MonoTable
            head={["Приоритет", "Продавцов", "Доля"]}
            numeric={[1, 2]}
            rows={[
              [<b key="a">A - звонить первыми</b>, "2 996", "25%"],
              [<b key="b">B - второй круг</b>, "6 377", "53%"],
              [<b key="c">C - рассылка</b>, "2 272", "19%"],
              [<b key="d">D - не звонить</b>, "553", "5%"],
            ]}
          />
          <p className="text-[14px] leading-relaxed mb-4">
            Внутри базы: <b>385 продавцов со своим брендом</b> (системные, под контракт) и{" "}
            <b>2 619 новичков «на разгон»</b> - молодые магазины в целевых нишах, на контакт идут легче всех.
            География: Алматы - 3 439, Астана - 1 668, Алматинская обл. - 1 105, Шымкент - 984, дальше
            Жамбылская обл., Караганда, Тараз и все регионы РК.
          </p>
          <MonoTable
            head={["Поле", "Зачем при звонке"]}
            rows={[
              ["Магазин, телефон, город, юр. адрес", "прямой выход на владельца / закуп"],
              ["Сегмент заказов (100 / 1 000 / 10 000+)", "оценка объёма закупа до звонка"],
              ["Рейтинг, % отмен, лет на Kaspi", "отсев ненадёжных"],
              ["Сегменты сезонности и категории", "скрипт: «вы торгуете бассейнами - зимой…»"],
              ["Свой бренд (если есть)", "системные продавцы, разговор про контракт"],
              ["Приоритет A/B/C/D + скоринг", "порядок обзвона"],
            ]}
          />
          <h3 className="font-normal text-[15px] mt-10 mb-1">Как читается приоритет</h3>
          <MonoTable
            head={["Класс", "Кто это", "Что делать"]}
            rows={[
              [<b key="a">A</b>, "уже продают НГ-товары, магазин 1 000+ заказов, хороший рейтинг", "звонить первыми, август-сентябрь"],
              [<b key="b">B</b>, "сезонщики (лето/школа/осень) с объёмом - зимой полка пустая", "второй круг: «зимний ассортимент»"],
              [<b key="c">C</b>, "мелкие и молодые; крупные сети (тендерный закуп)", "рассылка, не тратить звонки"],
              [<b key="d">D</b>, "плохой рейтинг, высокие отмены, неактивные", "не звонить"],
            ]}
          />

          {/* ── 5. План ── */}
          <SectionHead n="05" label="План действий" title="Календарь обзвона под сезон 2026/27" />
          <MonoTable
            head={["Когда", "Что делать", "Почему"]}
            rows={[
              [<b key="1">июль-август</b>, "прозвон сегмента «А»", "поставщика и предзаказы выбирают сейчас"],
              [<b key="2">август-сентябрь</b>, "сегмент «B»: летники", "их сезон кончается, ищут зимний товар"],
              [<b key="3">сентябрь-октябрь</b>, "«C» рассылкой; повторный заход к отказам «А»", "первые продажи ёлок - октябрь"],
              [<b key="4">ноябрь</b>, "быстрые допоставки", "31% сезона; лидеры распродаются к 20 декабря"],
              [<b key="5">февраль-март</b>, "итоги сезона по данным RedStat", "заготовка под предзаказы следующего года"],
            ]}
          />
          <p className="text-[14px] leading-relaxed mb-4 text-[var(--color-dim)]">
            Дополнительно к базе в сезон отслеживаем: новых продавцов ёлок (заходят в сентябре-октябре -
            самые горячие лиды), цены конкурентов по вашим позициям и долю полки ваших клиентов.
            Это отдельный режим сопровождения - обсудим после первого прогона базы.
          </p>

          {/* ── CTA: открыть базу ── */}
          <BaseCTA />
        </article>

        <footer className="border-t border-[var(--color-border)] px-4 sm:px-6 py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[12px] sm:text-[12px] text-[var(--color-dim)] leading-relaxed max-w-[60ch]">
            RedStat · аналитика маркетплейса Kaspi.kz · подготовлено для внутреннего использования
            заказчика, июль 2026. Выручка - оценка по методологии RedStat. Вопросы:{" "}
            <a href="mailto:almas@kasymzhanov.com" className="hover:text-[var(--color-text)] underline   whitespace-nowrap">
              almas@kasymzhanov.com
            </a>
          </p>
          <a
            href={BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--color-dim)] hover:text-[var(--color-text)] underline   whitespace-nowrap"
          >
            База продавцов →
          </a>
        </footer>
      </div>
    </div>
  );
}
