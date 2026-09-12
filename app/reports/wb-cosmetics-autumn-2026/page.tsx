"use client";
import { HeatCell, HeatLegend, InlineDataBar } from "@/components/charts/table-visuals";
import { ResearchFact } from "@/components/canon/research-editorial";
import { ResearchReadingTime } from "@/components/canon/research-reading-time";


import { useMemo, useState } from "react";
import Link from "next/link";
import { cosmeticRows, type CosmeticRow } from "./data";
import styles from "./report.module.css";

type SortKey = "revenue" | "growthUnits" | "entryLift" | "turnover" | "frozen";

const candidates = [
  { name: "Лаки и спреи для волос", revenue: "229,4 млн ₽", units: "×1,15", autumn: "×1,45", turnover: "91 день", decision: "Только тест", tone: "pilot" },
  { name: "Гидролаты", revenue: "33,0 млн ₽", units: "×1,24", autumn: "×1,27", turnover: "132 дня", decision: "Микропилот", tone: "pilot" },
  { name: "Мицеллярный рефил", revenue: "186,7 млн ₽*", units: "×0,85", autumn: "×1,06", turnover: "108 дней", decision: "Наблюдать формат", tone: "watch" },
  { name: "Автозагар", revenue: "133,8 млн ₽", units: "×2,53", autumn: "×0,47", turnover: "90 дней", decision: "Не осенью", tone: "stop" },
  { name: "CC-кремы", revenue: "120,8 млн ₽", units: "×1,37", autumn: "×1,23", turnover: "189 дней", decision: "Не запускать", tone: "stop" },
  { name: "Оттеночные бальзамы", revenue: "176,6 млн ₽", units: "×1,23", autumn: "×1,03", turnover: "46 дней", decision: "Не запускать", tone: "stop" },
  { name: "Жидкое мыло", revenue: "416,5 млн ₽", units: "×1,04", autumn: "×1,09", turnover: "123 дня", decision: "Не запускать", tone: "stop" },
  { name: "Краски для волос", revenue: "1 047,7 млн ₽", units: "×1,02", autumn: "×0,62", turnover: "94 дня", decision: "Не запускать", tone: "stop" },
];

const reviewRows = [
  { name: "Гидролаты", sku: 3, text: 512, negative: 58, complaints: "запах — 28; упаковка и протечки — 9; отсутствие эффекта — 6; старая партия — 5" },
  { name: "Спреи для волос", sku: 3, text: 1167, negative: 156, complaints: "упаковка — 54; несоответствие ожиданиям — 28; налёт и текстура — 16; запах — 11" },
  { name: "Жидкое мыло", sku: 1, text: 389, negative: 38, complaints: "протечки и повреждения — 14; запах — 6; несоответствие — 3" },
  { name: "CC-кремы", sku: 3, text: 1873, negative: 271, complaints: "оттенок — 59; реакции кожи — 35; вскрытая или повреждённая упаковка — 32; текстура — 19" },
];

const timeline = [
  { date: "24–31 июля", task: "Выбрать один формат. Получить три предложения, INCI, документы, размеры упаковки и полную стоимость ввоза.", gate: "Нет полного комплекта — останавливаемся." },
  { date: "1–10 августа", task: "Получить образцы. Проверить формулу, документы, коды товара и схему маркировки.", gate: "Формула или документы не подходят — останавливаемся." },
  { date: "11–20 августа", task: "Проверить протечки, падения, дозатор, запах и стабильность. Пересчитать экономику.", gate: "Маржа ниже порога — заказ не размещаем." },
  { date: "21–31 августа", task: "Подготовить маркировку, карточку и контент. Заказать только 100–300 единиц.", gate: "Никакого масштабирования до первых продаж." },
  { date: "Сентябрь", task: "Запустить пилот. Каждый день следить за ценой, рекламой, конверсией, возвратами и жалобами.", gate: "Первые 14–21 день — только сбор фактов." },
  { date: "Октябрь", task: "Решить, нужен ли повторный заказ.", gate: "Повтор — только при положительной фактической марже." },
];

const sortLabels: Record<SortKey, string> = {
  revenue: "по выручке",
  growthUnits: "по росту в штуках",
  entryLift: "по осеннему входу",
  turnover: "по оборачиваемости",
  frozen: "по замороженному остатку",
};

const nf = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });
const one = new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function money(value: number) {
  if (value >= 1_000_000_000) return `${one.format(value / 1_000_000_000)} млрд ₽`;
  if (value >= 1_000_000) return `${one.format(value / 1_000_000)} млн ₽`;
  return `${nf.format(value)} ₽`;
}

function DecisionTag({ tone, children }: { tone: string; children: React.ReactNode }) {
  return <span className={`${styles.tag} ${styles[tone]}`}>{children}</span>;
}

function MetricHelp({ children }: { children: React.ReactNode }) {
  return <span className={styles.metricHelp}>{children}</span>;
}

export default function WBCosmeticsAutumnReport() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("revenue");

  const rows = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("ru-RU");
    return cosmeticRows
      .filter((row) => !normalized || row.name.toLocaleLowerCase("ru-RU").includes(normalized))
      .toSorted((a, b) => {
        if (sortKey === "turnover" || sortKey === "frozen") return a[sortKey] - b[sortKey];
        return b[sortKey] - a[sortKey];
      });
  }, [query, sortKey]);

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.topline}>
          <Link href="/" className={styles.homeLink}>kasymzhanov.com</Link>
          <span>Отчёт по прямой ссылке · 24 июля 2026</span>
        </div>

        <header className={`research-header ${styles.hero}`}>
          <div className={styles.eyebrow}>Wildberries · Россия · осень 2026</div>
          <h1>Какие ниши косметики можно запускать сейчас</h1>
          <p className={`research-lead ${styles.lead}`}>
            Проверили 154 косметические подкатегории, сезонный спрос, конкуренцию, остатки,
            карточки товаров и 11&nbsp;824 строки отзывов. Крупную закупку косметики из Китая
            к осени делать рано. Два направления можно довести до небольшого теста.
          </p>
          <p className={styles.byline}>Подготовил: <strong>Алмас Касымжанов</strong></p>


<ResearchReadingTime />
</header>
<div className="research-facts"><ResearchFact label={<>рубрика «Красоты» разобрана</>} value={<>331</>} /><ResearchFact label={<>косметические ниши в расчёте</>} value={<>154</>} /><ResearchFact label={<>ниш прошли все условия</>} value={<>0</>} /><ResearchFact label={<>направления оставлены для пилота</>} value={<>2</>} /></div>


        <nav className={styles.toc} aria-label="Содержание отчёта">
          <a href="#decision">Решение</a>
          <a href="#method">Как выбирали</a>
          <a href="#candidates">Кандидаты</a>
          <a href="#reviews">Отзывы</a>
          <a href="#timing">План запуска</a>
          <a href="#suppliers">Поставщики</a>
          <a href="#economics">Экономика</a>
          <a href="#all">Все 154 ниши</a>
        </nav>

        <section id="decision" className={styles.section}>
          <div className={styles.sectionKicker}>Короткий ответ</div>
          <h2>Большой заказ сейчас не размещать</h2>
          <div className={styles.decisionBox}>
            <div className={styles.decisionMark}>Стоп</div>
            <div>
              <h3>Ни одна ниша не прошла все проверки одновременно</h3>
              <p>
                В косметике много продаж, но одного большого оборота недостаточно. Растущая категория
                может оказаться летней, перегруженной остатками, зависимой от одного продавца или требовать
                десятки оттенков. Без конкретной формулы, тары, документов и цены поставщика нельзя понять,
                будет ли товар приносить деньги.
              </p>
            </div>
          </div>
          <div className={styles.choiceGrid}>
            <article className={styles.choiceCard}>
              <DecisionTag tone="pilot">Можно довести до теста</DecisionTag>
              <h3>Спрей для волос без цветовой матрицы</h3>
              <p>Лучший осенний сигнал среди крупных направлений. Сначала проверяем формат, распылитель, фиксацию, белый налёт, документы и экономику.</p>
            </article>
            <article className={styles.choiceCard}>
              <DecisionTag tone="watch">Только микропилот</DecisionTag>
              <h3>Гидролат</h3>
              <p>Простой одиночный SKU и есть рост доли продаж, но рынок небольшой, а деньги в остатках лежат долго. Подходит только для дешёвого теста гипотезы.</p>
            </article>
            <article className={styles.choiceCard}>
              <DecisionTag tone="stop">Не брать в запуск</DecisionTag>
              <h3>Оттенки, тяжёлые жидкости и сложная регуляторика</h3>
              <p>CC-кремы, краски, оттеночные бальзамы, жидкое мыло и автозагар не подходят под условия клиента или под осенний срок.</p>
            </article>
          </div>
        </section>

        <section id="method" className={styles.section}>
          <div className={styles.sectionKicker}>Методика</div>
          <h2>Что должна была доказать ниша</h2>
          <p className={styles.intro}>
            Категории не ранжировались одним общим баллом. Сильная выручка не должна перекрывать
            плохую оборачиваемость или слабый осенний спрос. Поэтому каждая ниша проходила четыре
            независимые проверки.
          </p>
          <div className={styles.gates}>
            <article><span>01</span><h3>Спрос</h3><p>Растут продажи в штуках и доля категории на Wildberries, а не только сумма в рублях.</p></article>
            <article><span>02</span><h3>Осень</h3><p>Спрос усиливался при входе в сентябрь и октябрь 2025 года, а не заканчивался вместе с летом.</p></article>
            <article><span>03</span><h3>Операции</h3><p>Приемлемые выкуп, оборачиваемость, остатки и доля реально продающихся карточек.</p></article>
            <article><span>04</span><h3>Запуск</h3><p>Нет глубокой палитры, рынок не держится на одном продавце, документы и экономика выполнимы.</p></article>
          </div>
          <div className={styles.note}>
            <strong>Как читать сезонность.</strong> В доступной истории есть одна полная осень — 2025 год.
            Поэтому осенний коэффициент показывает момент входа, но ещё не доказывает повторяемость из года в год.
          </div>
        </section>

        <section id="candidates" className={styles.section}>
          <div className={styles.sectionKicker}>Сравнение</div>
          <h2>Ближайшие кандидаты и причины отказа</h2>
          <div className={styles.tableWrap}>
            <table className={styles.comparisonTable}>
              <thead><tr><th>Ниша</th><th>Выручка за 30 дней</th><th>Рост доли, шт.</th><th>Вход в осень</th><th>Оборот</th><th>Решение</th></tr></thead>
              <tbody>
                {candidates.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td><td>{item.revenue}</td><td>{item.units}</td><td>{item.autumn}</td><td>{item.turnover}</td>
                    <td><DecisionTag tone={item.tone}>{item.decision}</DecisionTag></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.footnote}>* Для мицеллярного рефила показан оборот всей родительской категории «Снятие макияжа».</p>

          <div className={styles.detailGrid}>
            <article className={styles.detailCard}>
              <div className={styles.cardTop}><h3>1. Спреи для волос</h3><DecisionTag tone="pilot">Условный пилот</DecisionTag></div>
              <div className="research-facts"><ResearchFact label={<>рынок</>} value={<>229,4 млн ₽</>} /><ResearchFact label={<>вход в осень</>} value={<>×1,45</>} /><ResearchFact label={<>выкуп</>} value={<>94,6%</>} /></div>
              <p><b>Почему интересно.</b> Девять из десяти заказов выкупаются, остатки и оборот лучше многих соседних ниш, а сентябрь–октябрь были заметно сильнее июля–августа.</p>
              <p><b>Что мешает.</b> 1&nbsp;089 активных продавцов, средний чек 747 ₽ и комиссия агрегированные данные Wildberries 32,5–36%. Аэрозоли сложнее перевозить. Новые карточки 2026 года пока не доказали лёгкий вход.</p>
              <p><b>Что тестировать.</b> Один неаэрозольный pump-SKU либо готовый аэрозоль от производителя с документами ЕАЭС. Нужны проверки распыления, фиксации, вычёсывания, налёта и протечки.</p>
            </article>
            <article className={styles.detailCard}>
              <div className={styles.cardTop}><h3>2. Гидролаты</h3><DecisionTag tone="watch">Микропилот</DecisionTag></div>
              <div className="research-facts"><ResearchFact label={<>рынок</>} value={<>33,0 млн ₽</>} /><ResearchFact label={<>вход в осень</>} value={<>×1,27</>} /><ResearchFact label={<>оборот</>} value={<>132 дня</>} /></div>
              <p><b>Почему интересно.</b> Одна формула без размеров и оттенков. Доля продаж и выручки выросла примерно в 1,24 раза. Концентрация умеренная.</p>
              <p><b>Что мешает.</b> На одного активного продавца приходится только 94 тыс. ₽ в месяц. 82,4% остатка заморожено, а новые карточки дают 61–78 тыс. ₽.</p>
              <p><b>Что тестировать.</b> Розовую воду или розмариновый гидролат небольшой партией. Обещания о росте волос нельзя переносить в карточку без подтверждения.</p>
            </article>
            <article className={styles.detailCard}>
              <div className={styles.cardTop}><h3>3. Мицеллярный рефил</h3><DecisionTag tone="watch">Следить за форматом</DecisionTag></div>
              <div className="research-facts"><ResearchFact label={<>продажи SKU</>} value={<>3 072</>} /><ResearchFact label={<>цена</>} value={<>314 ₽</>} /><ResearchFact label={<>динамика ниши</>} value={<>×0,85</>} /></div>
              <p>Новый рефил Vivienne Sabo на 440 мл сделал 832&nbsp;981 ₽ за 30 дней. Это хороший сигнал упаковочного формата, но не новой ниши: родительская категория снижается, продукт тяжёлый, а результат получил известный бренд.</p>
            </article>
            <article className={styles.detailCard}>
              <div className={styles.cardTop}><h3>Почему не берём лидеров</h3><DecisionTag tone="stop">Отказ</DecisionTag></div>
              <ul className={styles.cleanList}>
                <li><b>Автозагар:</b> быстрый рост, но осенью спрос падал; требуется государственная регистрация.</li>
                <li><b>CC-кремы:</b> 59,6% выручки у одного продавца, 189 дней оборота и обязательная палитра.</li>
                <li><b>Оттеночные товары:</b> хорошая оборачиваемость не компенсирует десятки цветов.</li>
                <li><b>Жидкое мыло:</b> тяжёлый низкочековый товар и 2&nbsp;144 активных продавца.</li>
                <li><b>Кондиционеры:</b> выдача смешана с парфюмированными мистами, поэтому агрегат ненадёжен.</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="reviews" className={styles.section}>
          <div className={styles.sectionKicker}>Отзывы покупателей</div>
          <h2>Что люди считают настоящей проблемой товара</h2>
          <p className={styles.intro}>
            Отзывы в этой выборке — живые строки агрегированные данные Wildberries, полученные 24 июля 2026 года.
            Это не все отзывы всей косметики: изучены 10 артикулов в четырёх направлениях,
            которые были ближе всего к решению о запуске.
          </p>
          <div className="research-facts"><ResearchFact label={<>строки ответа</>} value={<>11 824</>} /><ResearchFact label={<>отзыв с текстом</>} value={<>3 941</>} /><ResearchFact label={<>отзыва с оценкой 1–3</>} value={<>523</>} /><ResearchFact label={<>жалоба размечена по темам</>} value={<>291</>} /></div>
          <div className={styles.tableWrap}>
            <table className={styles.reviewTable}>
              <thead><tr><th>Направление</th><th>SKU</th><th>С текстом</th><th>Оценка 1–3</th><th>Что повторяется</th></tr></thead>
              <tbody>{reviewRows.map((row) => <tr key={row.name}><td>{row.name}</td><td>{row.sku}</td><td>{nf.format(row.text)}</td><td>{row.negative}</td><td>{row.complaints}</td></tr>)}</tbody>
            </table>
          </div>
          <div className={styles.note}>
            Жалобы на «подделку» считаются заявлением покупателя, а не установленным фактом.
            Доля негативных отзывов также не равна проценту брака: в расчёте только люди,
            которые оставили текст, а не все покупатели.
          </div>
          <h3 className={styles.subhead}>Что обязательно проверить на образцах</h3>
          <div className={styles.checkGrid}>
            <span>Пломба первого вскрытия</span><span>Протечки при хранении на боку</span><span>Падение упаковки</span>
            <span>Работа каждой помпы и клапана</span><span>Совместимость формулы с тарой</span><span>Стабильность запаха между партиями</span>
            <span>Фактический объём</span><span>Микробиология и стабильность</span><span>Прослеживаемость каждой партии</span>
          </div>
          <p className={styles.sources}>Три артикула дополнительно сверены на Wildberries: <a href="https://www.wildberries.ru/catalog/14387230/detail.aspx" target="_blank" rel="noreferrer">14387230</a>, <a href="https://www.wildberries.ru/catalog/448032861/detail.aspx" target="_blank" rel="noreferrer">448032861</a>, <a href="https://www.wildberries.ru/catalog/137993565/detail.aspx" target="_blank" rel="noreferrer">137993565</a>.</p>
        </section>

        <section id="timing" className={styles.section}>
          <div className={styles.sectionKicker}>Календарь</div>
          <h2>Если запускать осенью — только готовый продукт</h2>
          <p className={styles.intro}>Этот график подходит товару с уже существующей формулой и применимыми документами ЕАЭС. Для новой private-label формулы из Китая он слишком короткий.</p>
          <div className={styles.timeline}>
            {timeline.map((step) => <article key={step.date}><time>{step.date}</time><div><p>{step.task}</p><strong>{step.gate}</strong></div></article>)}
          </div>
          <div className={styles.timingSplit}>
            <article><span>Готовый товар ЕАЭС</span><strong>Пилот в сентябре</strong><p>100–300 единиц. Масштабирование только после 14–21 дня фактических продаж.</p></article>
            <article><span>Новый private label из Китая</span><strong>I квартал 2027</strong><p>Ноябрь–декабрь возможны лишь при уже готовых документах, формуле и упаковке.</p></article>
          </div>
        </section>

        <section id="suppliers" className={styles.section}>
          <div className={styles.sectionKicker}>1688</div>
          <h2>Как выбирать поставщика</h2>
          <p className={styles.intro}>Низкая цена и высокий рейтинг на площадке — только начало. По каждой формуле нужны минимум три фабрики и подтверждения по четырём блокам.</p>
          <div className={styles.supplierGrid}>
            <article><h3>Компания</h3><ul><li>Business licence и юридическое лицо</li><li>Фабрика или торговая компания</li><li>Видео и адрес производства</li><li>Опыт экспорта косметики</li></ul></article>
            <article><h3>Качество</h3><ul><li>GMP или ISO 22716</li><li>Полный INCI и COA</li><li>Микробиология и стабильность</li><li>Образец будущей формулы</li></ul></article>
            <article><h3>Упаковка</h3><ul><li>Материал флакона и прокладки</li><li>Leak, drop и transport tests</li><li>Пломба первого вскрытия</li><li>Место для Data Matrix</li></ul></article>
            <article><h3>Коммерция</h3><ul><li>Цена на 100, 300, 1 000 и 3 000 шт.</li><li>Размеры и вес короба</li><li>Срок производства и повтора</li><li>Условия компенсации брака</li></ul></article>
          </div>
        </section>

        <section id="economics" className={styles.section}>
          <div className={styles.sectionKicker}>Юнит-экономика</div>
          <h2>Сначала находим предел закупочной цены</h2>
          <div className={styles.formula}>Цена продажи − комиссия WB − логистика − хранение − реклама − возвраты − налоги − ввоз − маркировка − документы = вклад в прибыль</div>
          <p className={styles.intro}>Финальной прибыли в отчёте нет намеренно. Без предложения фабрики, веса, размеров, маршрута, налогового режима и рекламного бюджета любое число было бы выдумкой.</p>
          <div className={styles.stressGrid}>
            <span>Цена продажи −10%</span><span>Реклама +5 п. п.</span><span>Логистика +20%</span>
            <span>Выкуп хуже на 5 п. п.</span><span>Курс валюты +10%</span><span>Хранение дольше на 2 месяца</span>
          </div>
          <p className={styles.plainCallout}>Заказ можно подтверждать только тогда, когда экономика остаётся положительной не только в базовом, но и в стрессовом сценарии.</p>
        </section>

        <section id="all" className={styles.section}>
          <div className={styles.sectionKicker}>Полная проверка</div>
          <h2>Все 154 косметические подкатегории</h2>
          <p className={styles.intro}>Таблица нужна, чтобы было видно не только выбранные направления, но и весь отсев. Найдите категорию по названию или отсортируйте рынок по нужному показателю.</p>
          <div className={styles.controls}>
            <label><span>Поиск</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Например: маски, паста, крем" /></label>
            <label><span>Сортировка</span><select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>{Object.entries(sortLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <a className={styles.download} href="/reports/wb-cosmetics-autumn-2026/all-cosmetics-autumn-2026.csv" download>Скачать полный CSV</a>
          </div>
          <div className={styles.legend}>
            <MetricHelp><b>Рост доли</b> — апрель–июнь 2026 к январю–марту 2026, с поправкой на весь WB.</MetricHelp>
            <MetricHelp><b>Вход в осень</b> — сентябрь–октябрь к июлю–августу 2025.</MetricHelp>
            <MetricHelp><b>Заморожено</b> — доля остатка, которая не успевает обернуться в нормальный срок.</MetricHelp>
          </div>
          <HeatLegend label="Выручка, ₽ · нелинейная шкала √: небольшие ниши виднее. Шкала сохраняется при поиске" scale={{ max: Math.max(...cosmeticRows.map(r => r.revenue)), curve: "sqrt" }} format={money} />
          <HeatLegend label="Коэффициенты · ниже / выше базы, не оценка качества ниши" scale={{ min: 0, max: 2, center: 1 }} format={v => v === 2 ? "×2+" : `×${v}`} />
          <div className={`${styles.tableWrap} ${styles.marketTableWrap}`}>
            <table className={styles.marketTable}>
              <thead><tr><th>Ниша</th><th>Выручка, 30 дней</th><th>Продажи</th><th>Средний чек</th><th>Продавцы</th><th>Рост доли</th><th>Вход в осень</th><th>Оборот</th><th>Заморожено</th><th>Проверки</th></tr></thead>
              <tbody>{rows.map((row: CosmeticRow) => (
                <tr key={row.name}>
                  <td>{row.name.replace("Красота / ", "")}</td>
                  <HeatCell value={row.revenue} label={`${row.name} · выручка за 30 дней, ₽`} scale={{ max: Math.max(...cosmeticRows.map(r => r.revenue)), curve: "sqrt" }}>{money(row.revenue)}</HeatCell><td>{nf.format(row.units)}</td><td>{nf.format(row.ticket)} ₽</td><td>{nf.format(row.sellers)}</td>
                  <HeatCell value={row.growthUnits} label={`${row.name} · рост доли, коэффициент`} scale={{ min: 0, max: 2, center: 1 }}>×{one.format(row.growthUnits)}</HeatCell>
                  <HeatCell value={row.entryLift} label={`${row.name} · вход в осень, коэффициент`} scale={{ min: 0, max: 2, center: 1 }}>×{one.format(row.entryLift)}</HeatCell>
                  <td>{nf.format(row.turnover)} дн.</td><td><InlineDataBar value={row.frozen} label="Доля замороженного остатка">{one.format(row.frozen)}%</InlineDataBar></td>
                  <td><div className={styles.gateSummary}><span>Спрос: {row.demand ? "пройден" : "не пройден"}</span><span>Осень: {row.autumn ? "пройдена" : "не пройдена"}</span><span>Операции: {row.operations ? "пройдены" : "не пройдены"}</span></div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className={styles.resultsLine}>Показано: <strong>{rows.length}</strong> из 154. Полный итог: ни одна категория не прошла спрос и осенний вход одновременно.</div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionKicker}>Границы вывода</div>
          <h2>Что эти цифры не обещают</h2>
          <div className={styles.limitGrid}>
            <p>агрегированные данные Wildberries оценивает рынок, но не является бухгалтерской отчётностью Wildberries.</p>
            <p>Одна наблюдаемая осень не доказывает многолетнюю сезонность.</p>
            <p>Выдача до 500 товаров и 200 продавцов не всегда покрывает всю нишу.</p>
            <p>Модель «упущенной выручки» не равна свободному спросу.</p>
            <p>Тарифы WB нужно пересчитать в кабинете перед поставкой.</p>
            <p>Документы определяются по точной формуле, упаковке и кодам товара.</p>
          </div>
          <div className={styles.sources}>
            Данные рынка: агрегированные данные Wildberries · Требования к косметике: <a href="https://eec.eaeunion.org/comission/department/deptexreg/tr/bezopParfum.php" target="_blank" rel="noreferrer">ЕЭК, ТР ТС 009/2011</a> · Маркировка: <a href="https://markirovka.ru/knowledge/tovarnye-gruppy/kosmetika-bytovaya-himiya/kosmetika-bytovaya-khimiya-i-tovary-lichnoy-gigieny-podlezhashchie-obyazatelnoy-markirovke" target="_blank" rel="noreferrer">«Честный знак»</a>
          </div>
        </section>

        <footer className={styles.footer}>
          <div><strong>Almas Kasymzhanov</strong><span>Аналитика маркетплейсов</span></div>
          <p>Срез данных: 30 дней по 23 июля 2026 года включительно. Решение подготовлено 24 июля 2026 года.</p>
        </footer>
      </div>
    </div>
  );
}
