"use client";
import { ResearchSection, ResearchFact, ResearchNote, ResearchFigure, ResearchSummary } from "@/components/canon/research-editorial";

import { ContentEngagement } from "@/components/engagement/content-engagement";
import { ArticleHeader } from "@/components/canon/article-header";
import { ChartTooltipScope } from "@/components/charts/chart-tooltip";
import { IconlyArrowUpRight, IconlyChevronDown, IconlyArrowLeft } from "@/components/iconly-icons";
import { BarChart } from "@/components/charts/bar-chart";
import { DataTable } from "@/components/charts/data-table";
import { PersonalFooter } from "@/components/personal-footer";
import { PersonalShell } from "@/components/personal-shell";
import { ReadTracker } from "@/components/read-tracker";
import { ArticleViewTracker } from "@/components/article-view-tracker";
import {
  firstPriorityNames,
  niches,
  statusCopy,
  statusOrder,
  type Niche,
  type NicheStatus,
} from "./data";

const SLUG = "kaspi-top-30-june-2026";
const ACCENT = "var(--chart-accent)";
const NEUTRAL = "var(--brock-neutral)";
const WHATSAPP_NUMBER = "77028290908";
const WHATSAPP_MESSAGE = "Здравствуйте, Алмас! Хочу обсудить персональное исследование категории или ниши на Kaspi под мою задачу.";
const PERSONAL_ANALYSIS_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  : "mailto:almas@kasymzhanov.com?subject=Персональное%20исследование%20Kaspi";
const REDSTAT_REGISTER_URL = "https://app.redstat.kz/register";

type RedStatPlacement = "top" | "middle" | "end";

const redStatUrl = (placement: RedStatPlacement) =>
  `${REDSTAT_REGISTER_URL}?utm_source=kasymzhanov&utm_medium=editorial&utm_campaign=kaspi_top30_june_2026&utm_content=${placement}`;

const revenueLeaders = [...niches].sort((a, b) => b.revenue - a.revenue).slice(0, 10);
const candidates = niches
  .filter((niche) => niche.status === "check" || niche.status === "test")
  .sort((a, b) => b.growth - a.growth);
const reviewExamples = niches.filter((niche) =>
  [...firstPriorityNames, "Виброплатформы", "Ванны", "Межкомнатные двери", "Тестомесы"].includes(niche.name),
);
const vibro = niches.find((niche) => niche.name === "Виброплатформы")!;

const formatNumber = (value: number, maximumFractionDigits = 1) =>
  value.toLocaleString("ru-RU", { maximumFractionDigits });
const formatGrowth = (value: number) =>
  `${value > 0 ? "+" : value < 0 ? "−" : ""}${formatNumber(Math.abs(value))}%`;
const formatRevenue = (value: number) => `${formatNumber(value)} млн ₸`;

const statusTone: Record<NicheStatus, string> = {
  check: "border-[var(--personal-teal)] text-[var(--color-text)]",
  test: "border-[var(--color-border)] text-[var(--color-text)]",
  seasonal: "border-[var(--color-border)] text-[var(--color-dim)]",
  restricted: "border-[var(--personal-red)] text-[var(--color-text)]",
};

function SectionHeading({ number, title, deck }: { number: string; title: string; deck?: string }) { return <header className="research-section-heading"><h2>{title}</h2>{deck && <p>{deck}</p>}</header>; }

function Metric({ label, value, note }: { label: string; value: string; note: string }) { return <ResearchFact label={label} value={value} note={note} />; }

function ChartFrame({ children, note }: { children: React.ReactNode; note: string }) { return <ResearchFigure caption={<>Источник: агрегированные рыночные данные, опубликованный срез июня 2026 года. {note}</>}>{children}</ResearchFigure>; }

function StatusBadge({ status }: { status: NicheStatus }) { return <span className="text-[13px] text-[var(--personal-muted)]">{statusCopy[status].label}</span>; }

function NicheCard({ niche }: { niche: Niche }) { return <details className="research-niche"><summary><span>{niche.name}</span><IconlyChevronDown size={16} /></summary><p className="text-[13px] text-[var(--personal-muted)]">{statusCopy[niche.status].label} · {niche.season}</p><ResearchFact label="Выручка" value={formatRevenue(niche.revenue)} /><ResearchFact label="Изменение за май–июнь" value={formatGrowth(niche.growth)} /><ResearchFact label="Средний чек" value={`${formatNumber(niche.averageCheck)} тыс. ₸`} /><ResearchFact label="Медиана отзывов" value={niche.medianReviews} /><p className="mt-5">{niche.verdict}</p></details>; }

function PlainParagraph({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 text-[16px] leading-[1.8] text-[var(--color-dim)]">{children}</p>;
}

const redStatCopy: Record<RedStatPlacement, { kicker: string; title: string; body: string; cta: string }> = {
  top: {
    kicker: "Самостоятельная аналитика · redstat.kz",
    title: "Хотите так же проверить свою категорию?",
    body: "В RedStat вы можете сами открыть нужную нишу и посмотреть выручку, динамику, товары и продавцов. Это хороший первый шаг, если хотите быстро понять рынок до закупки.",
    cta: "Посмотреть свою категорию",
  },
  middle: {
    kicker: "Проверьте свою нишу · redstat.kz",
    title: "В списке нет вашей категории? Посмотрите её самостоятельно",
    body: "В RedStat можно сравнивать категории, изучать конкуренцию, цены и тренды. Выберите интересующую нишу и проверьте, что в ней происходит сейчас.",
    cta: "Открыть RedStat бесплатно",
  },
  end: {
    kicker: "Продолжить самостоятельно · redstat.kz",
    title: "Начните с цифр по своей категории",
    body: "Если персональное исследование пока не нужно, откройте RedStat и проведите первый анализ сами. Найдите категорию, посмотрите рынок и сохраните направления, которые хотите проверить глубже.",
    cta: "Начать анализ в RedStat",
  },
};

function RedStatCallout({ placement }: { placement: RedStatPlacement }) {
  const copy = redStatCopy[placement];
  return <aside data-redstat-placement={placement} className="reading-panel reading-offer">
    <p className="reading-eyebrow">{copy.kicker}</p>
    <h3>{copy.title}</h3><p>{copy.body}</p>
    <a href={redStatUrl(placement)} target="_blank" rel="noopener noreferrer" data-redstat-cta={placement} className="reading-text-action reading-offer-action"><span>{copy.cta}</span><IconlyArrowUpRight size={17} /></a>
  </aside>;
}

const analysisFeatures = [
  ["Объём рынка", "Я покажу размер категории, её динамику и сезонность. Сразу станет понятно, перед нами большой рынок или красивая витрина без глубины."],
  ["Конкуренты", "Я разберу, кто забирает продажи, какие товары двигает вперёд и как строит ассортимент."],
  ["Товары", "Я найду позиции, которые действительно тянут категорию, и отделю устойчивый спрос от случайного всплеска."],
  ["Отзывы", "Я прочитаю, за что покупателей цепляют сильные карточки и на какие проблемы они жалуются снова и снова."],
  ["Цены", "Я разложу рынок по ценовым полкам и покажу, где продавцы уже толкаются локтями, а где ещё есть пространство."],
  ["Вывод", "Я соберу всё в понятную карту: что стоит проверять дальше, где лежат риски и чем можно отличиться."],
] as const;

function AnalysisLink({ label }: { label: string }) {
  return <a href={PERSONAL_ANALYSIS_URL} target="_blank" rel="noopener noreferrer" data-personal-analysis-cta className="reading-text-action reading-offer-action"><span>{label}</span><IconlyArrowUpRight size={17} /></a>;
}

function PersonalAnalysisOffer({ placement }: { placement: "top" | "middle" | "end" }) {
  return <aside id={placement === "end" ? "personal-analysis" : undefined} className="reading-panel reading-offer">
    <p className="reading-eyebrow">Персональное исследование</p>
    <h3>Разберу вашу категорию под конкретную задачу</h3>
    <p>Изучу рынок, конкурентов, товары и отзывы покупателей. Покажу, какие направления стоит проверять дальше, где лежат риски и чем можно отличиться.</p>
    {placement === "end" && <details className="reading-details reading-offer-details"><summary><span>Что входит в исследование</span><IconlyChevronDown size={17} /></summary><dl className="reading-offer-features">{analysisFeatures.map(([title, body]) => <div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl></details>}
    <AnalysisLink label="Обсудить исследование" />
  </aside>;
}

export default function KaspiTop30JuneReport() {
  return (
    <PersonalShell locale="ru">
      <ArticleViewTracker slug={SLUG} />
      <ReadTracker slug={SLUG} />


      <div className="min-w-0 max-w-[800px] xl:ml-16">
        <ArticleHeader slug={SLUG} kicker="Исследование · Kaspi" title="30 ниш Kaspi: что я бы проверял к осени" subtitle="Подписчик спросил, с каким товаром сейчас заходить на Kaspi. Я собрал данные по рынку и выбрал 30 ниш, которые стоит проверить подробнее: от беговых дорожек до виброплатформ." date="2 августа 2026" readMin={16} />
        <nav aria-label="Содержание отчёта" className="reading-contents"><a href="#short-answer">Короткий ответ</a><a href="#vibro">Виброплатформы</a><a href="#all-30">Все 30 ниш</a><a href="#method">Методика</a></nav>

        <ChartTooltipScope><article className="article-story-body reading-body research-article">
            <section className="research-section">
              <p className="mb-7 font-heading text-[26px] font-normal leading-[1.2] tracking-[-0.02em]">
                Если вы пришли сюда из Telegram после моего Reels, вы по адресу. Ниже не «волшебные товары», а список ниш, которые стоит проверить подробнее.
              </p>
              <PlainParagraph>
                Вопрос «с чем заходить на Kaspi» звучит просто, но одного правильного ответа для всех нет. У кого-то есть склад и доставка крупногабаритного товара. Кто-то умеет работать с электроникой и гарантией. А кто-то только начинает и не может заморозить несколько миллионов тенге в остатках.
              </PlainParagraph>
              <PlainParagraph>
                Поэтому я сделал так: сначала отобрал категории с заметной выручкой, не слишком огромным количеством товаров и продавцов, а затем проверил рост, сезонность и отзывы. После этого красивый список заметно сократился.
              </PlainParagraph>
              <div className="my-8 reading-note">
                <p className="font-heading text-[22px] font-normal leading-tight">Сразу важная оговорка</p>
                <p className="mt-3 text-[14px] leading-[1.7] text-[var(--color-dim)]">
                  Я не предлагаю воспринимать этот отчёт как команду закупать товар. С его помощью я выбираю, что проверять дальше: поставщика, маржу, доставку, возвраты, документы и тестовую партию.
                </p>
              </div>
            </section>



            <section id="short-answer" className="research-section">
              <div className="mx-auto max-w-[800px]">
                <SectionHeading number="01 · Короткий ответ" title="Что я бы проверял в первую очередь" deck="Сначала я оставил пять ниш, которые выглядят логичнее остальных. Но даже здесь я бы не переходил к закупке, пока не проверил конкретные товары." />
                <ResearchSummary title="Срез исследования">
                  <Metric label="Ниш в срезе" value="30" note="После первичного фильтра рынка" />
                  <Metric label="Первый шорт-лист" value="5" note="Для подробной проверки к осени" />
                  <Metric label="Самый большой рынок" value="414,8 млн ₸" note="Беговые дорожки в июне" />
                  <Metric label="Самый резкий рост" value="+728,9%" note="Но это летние тенты для бассейнов" />
                  <Metric label="Виброплатформы" value="62,3 млн ₸" note="Только как небольшой тест с отличием" />
                </ResearchSummary>

                <ResearchSummary title="Первый шорт-лист">
                  {firstPriorityNames.map((name) => {
                    const niche = niches.find((item) => item.name === name)!;
                    return (
                      <ResearchFact key={name} label={name} value={formatRevenue(niche.revenue)} note={niche.season} />
                    );
                  })}
                </ResearchSummary>
              </div>
            </section>

            <section className="research-section">
              <SectionHeading number="02 · Размер рынка" title="Большая выручка ещё не означает хороший вход" deck="В первой десятке я вижу много летних и технически сложных товаров. Поэтому я никогда не выбираю нишу только по одной большой цифре." />
              <ChartFrame note="Выручка расчётная; столбики начинаются от нуля.">
                <BarChart
                  accent={ACCENT}
                  barRadius={2}
                  labelWidth={190}
                  barThickness={24}
                  gap={10}
                  header={{ title: "10 крупнейших рынков из выборки", subtitle: "Расчётная выручка за июнь 2026 · млн ₸" }}
                  data={revenueLeaders.map((niche) => ({
                    label: niche.name,
                    value: niche.revenue,
                    color: firstPriorityNames.includes(niche.name) ? ACCENT : NEUTRAL,
                    highlight: firstPriorityNames.includes(niche.name),
                  }))}
                  dataLabels={{ show: true, format: (value) => formatNumber(value) }}
                  formatValue={formatRevenue}
                  xAxisFormat={(value) => `${formatNumber(value, 0)} млн`}
                  description="Рейтинг десяти крупнейших ниш по расчётной выручке июня 2026 года"
                />
              </ChartFrame>

              <div className="mx-auto mt-10 max-w-[760px]">
                <PlainParagraph>
                  Например, садовая мебель дала <strong className="text-[var(--color-text)]">321,1 млн ₸</strong>, но исторически от августа к сентябрю категория снижалась на 42,2%. Если зайти в неё в конце лета, можно купить красивый отчёт о прошлом и склад товара на будущее лето.
                </PlainParagraph>
                <PlainParagraph>
                  Поэтому дальше я смотрю на направление рынка: растёт он прямо сейчас или уже разворачивается вниз.
                </PlainParagraph>
              </div>

              <ChartFrame note="Показаны только кандидаты из групп «проверить сейчас» и «небольшой тест».">
                <BarChart
                  accent={ACCENT}
                  barRadius={2}
                  labelWidth={190}
                  barThickness={22}
                  gap={9}
                  header={{ title: "Кандидаты движутся в разные стороны", subtitle: "Изменение выручки от майского среза к июньскому" }}
                  data={candidates.map((niche) => ({
                    label: niche.name,
                    value: niche.growth,
                    color: niche.name === "Виброплатформы" ? ACCENT : undefined,
                    highlight: niche.name === "Виброплатформы",
                    note: niche.name === "Виброплатформы" ? "проверить причину" : undefined,
                  }))}
                  dataLabels={{ show: true, format: formatGrowth }}
                  formatValue={(value) => formatGrowth(value)}
                  xAxisFormat={(value) => formatGrowth(value)}
                  description="Изменение выручки кандидатов между майским и июньским срезами"
                />
              </ChartFrame>
            </section>

            <section id="vibro" className="research-section">
              <div className="mx-auto min-w-0 max-w-[800px] py-12 md:py-16 research-flow">
                <div className="min-w-0">
                  <p className="font-mono text-[12px] font-normal uppercase tracking-[0.16em] text-[var(--personal-muted)]">Отдельно про видео</p>
                  <h2 className="mt-4 max-w-[720px] break-words font-heading text-[32px] font-normal leading-[0.98] tracking-[-0.035em] sm:text-[38px] md:text-[52px]">Виброплатформы в отчёте остаются</h2>
                  <p className="mt-6 max-w-[720px] text-[17px] leading-[1.7] opacity-80">
                    На видео я называю их одним из вариантов, и это корректно. Здесь есть рынок и заметная доля товаров без указанного бренда. Но я не советую просто привезти ещё одну такую же модель.
                  </p>
                  <p className="mt-5 max-w-[720px] text-[17px] leading-[1.7] opacity-80">
                    Возможность я вижу в новинке, полезной функции, лучшей комплектации, понятной инструкции или сервисе. Из-за снижения рынка и сильных карточек конкурентов начинал бы только с маленькой партии.
                  </p>
                </div>
                <div className="min-w-0 self-start research-facts">
                  {[
                    ["Выручка", formatRevenue(vibro.revenue)],
                    ["Заказы", formatNumber(vibro.orders, 0)],
                    ["Средний чек", `${formatNumber(vibro.averageCheck)} тыс. ₸`],
                    ["Активные SKU", String(vibro.activeSku)],
                    ["Продавцы", String(vibro.sellers)],
                    ["Без бренда", `${formatNumber(vibro.unbrandedShare)}%`],
                  ].map(([label, value]) => (
                    <ResearchFact key={label} label={label} value={value} />
                  ))}
                </div>
              </div>
            </section>

            <section className="research-section">
              <SectionHeading number="03 · Отзывы" title="Отзывы показывают, насколько трудно карточке без истории" deck="Я не придумывал жалобы покупателей: текстовых отзывов для честного массового вывода здесь недостаточно. Вместо этого я смотрю на количество отзывов и на то, получают ли выручку карточки без накопленной истории." />
              <ChartFrame note="Это доля денег, а не доля количества карточек. Остаток до 100% приходится на карточки с 10 отзывами и больше.">
                <BarChart
                  accent={ACCENT}
                  barRadius={2}
                  labelWidth={190}
                  barThickness={22}
                  gap={9}
                  header={{ title: "Где карточки без накопленной истории получают выручку", subtitle: "Доля выручки у активных SKU с 0-9 отзывами" }}
                  data={reviewExamples.map((niche) => ({
                    label: niche.name,
                    value: niche.lowReviewRevenueShare,
                    color: niche.name === "Виброплатформы" ? ACCENT : undefined,
                    highlight: niche.name === "Виброплатформы",
                  }))}
                  dataLabels={{ show: true, format: (value) => `${formatNumber(value)}%` }}
                  formatValue={(value) => `${formatNumber(value)}%`}
                  xAxisFormat={(value) => `${formatNumber(value, 0)}%`}
                  xAxis={{ max: 100, title: "Доля выручки категории" }}
                  description="Доля выручки активных карточек с числом отзывов от нуля до девяти в выбранных нишах. Остальная выручка приходится на карточки с десятью отзывами и больше."
                />
              </ChartFrame>

              <div className="mx-auto mt-8 max-w-[900px] border-[var(--color-border)]">
                <p className="font-mono text-[12px] font-normal uppercase tracking-[0.1em] text-[var(--personal-muted)]">Как читать каждый столбец</p>
                <p className="mt-3 max-w-[760px] text-[14px] leading-[1.7] text-[var(--color-dim)]">
                  За 100% я беру всю выручку категории за июнь. Цветной столбец показывает, сколько из этих денег получили активные карточки с 0-9 отзывами. Всё, что осталось до 100%, получили карточки с 10 отзывами и больше. Само число отзывов не показывает дату создания карточки, поэтому 0-9 отзывов я использую только как признак небольшой накопленной истории.
                </p>
                <div className="mt-6 overflow-hidden border-[var(--color-border)] research-flow">
                  {reviewExamples.map((niche) => {
                    const establishedShare = 100 - niche.lowReviewRevenueShare;
                    return (
                      <div key={niche.name} className="">
                        <h3 className="min-h-[2.6em] font-heading text-[17px] font-normal leading-[1.3]">{niche.name}</h3>
                        <p className="mt-4 font-mono text-[12px] leading-[1.65]">
                          <span className="font-normal text-[var(--personal-muted)]">{formatNumber(niche.lowReviewRevenueShare)}%</span> выручки: карточки с 0-9 отзывами
                        </p>
                        <p className="mt-2 font-mono text-[12px] leading-[1.65] text-[var(--color-dim)]">
                          <span className="font-normal text-[var(--color-text)]">{formatNumber(establishedShare)}%</span> выручки: карточки с 10 отзывами и больше
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-5 text-[13px] leading-[1.7] text-[var(--color-dim)]">
                  Например, 53,1% у ванн означает: из каждых 100 ₸ выручки 53,1 ₸ получили карточки с 0-9 отзывами, остальные 46,9 ₸ получили карточки с 10 отзывами и больше.
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-[900px] research-flow">
                {[
                  ["Медиана отзывов", "Если медиана равна 31, это значит: у половины продающихся карточек не больше 31 отзыва, у второй половины не меньше."],
                  ["Выручка карточек с 0-9 отзывами", "Показывает, могут ли карточки без длинной истории уже получать продажи. Остаток до 100% относится к карточкам с 10 отзывами и больше. Это полезный сигнал, но не гарантия лёгкого входа."],
                  ["Активный SKU", "Это конкретный товар, по которому в выбранном периоде были продажи. Просто созданные и никому не нужные карточки сюда не входят."],
                  ["Без бренда", "Это доля выручки товаров, у которых бренд не указан. Она не даёт права копировать чужой товар и не означает отсутствие конкуренции."],
                ].map(([term, explanation]) => (
                  <div key={term} className="border-t border-[var(--color-border)] pt-4">
                    <h3 className="font-mono text-[12px] font-normal uppercase tracking-[0.06em]">{term}</h3>
                    <p className="mt-3 text-[13px] leading-[1.7] text-[var(--color-dim)]">{explanation}</p>
                  </div>
                ))}
              </div>
            </section>

            <RedStatCallout placement="middle" />



            <section id="all-30" className="research-section">
              <div className="mx-auto max-w-[800px]">
                <SectionHeading number="04 · Все 30 ниш" title="Мой вывод по каждой категории" deck="Я разделил список на четыре группы. Так проще понять, что проверять сейчас, где ограничиться тестом, а что отложить." />

                {statusOrder.map((status, groupIndex) => {
                  const group = niches.filter((niche) => niche.status === status);
                  return (
                    <section key={status} className={groupIndex === 0 ? "" : "mt-16"}>
                      <div className="mb-7 border-t border-[var(--personal-border)] pt-4 research-flow">
                        <div><StatusBadge status={status} /></div>
                        <div>
                          <h2 className="font-heading text-[30px] font-normal leading-none tracking-[-0.025em]">{statusCopy[status].title}</h2>
                          <p className="mt-3 max-w-[720px] text-[14px] leading-[1.7] text-[var(--color-dim)]">{statusCopy[status].description}</p>
                        </div>
                      </div>
                      <div className=" research-flow">
                        {group.map((niche) => <NicheCard key={niche.name} niche={niche} />)}
                      </div>
                    </section>
                  );
                })}
              </div>
            </section>

            <section className="research-section">
              <SectionHeading number="05 · Все цифры" title="Таблица для самостоятельной проверки" deck="Если хотите сравнить ниши по одному показателю, здесь собраны все исходные цифры. На телефоне таблицу можно прокручивать вбок." />
              <DataTable
                columns={[
                  { header: "Ниша", align: "left", mono: false },
                  { header: "Выручка, млн ₸", heatmap: { max: Math.max(...niches.map(n => n.revenue)) }, format: v => formatNumber(v) },
                  { header: "Май→июнь", type: "delta", heatmap: { min: -Math.max(...niches.map(n => Math.abs(n.growth))), max: Math.max(...niches.map(n => Math.abs(n.growth))), center: 0 } },
                  { header: "Заказы", format: v => formatNumber(v, 0) },
                  { header: "Ср. чек, тыс. ₸", format: v => formatNumber(v) },
                  { header: "SKU" },
                  { header: "Продавцы" },
                  { header: "Без бренда", barMax: 100, format: v => `${formatNumber(v)}%` },
                  { header: "0-9 отзывов", barMax: 100, format: v => `${formatNumber(v)}%` },
                ]}
                rows={niches.map((niche) => [
                  niche.name,
                  niche.revenue,
                  niche.growth,
                  niche.orders,
                  niche.averageCheck,
                  niche.activeSku,
                  niche.sellers,
                  niche.unbrandedShare,
                  niche.lowReviewRevenueShare,
                ])}
                caption="Показатели расчётные и нужны для сравнения категорий, а не для бухгалтерской сверки."
                source="Агрегированные рыночные данные · июнь 2026"
              />
            </section>

            <section id="method" className="research-section">
              <div className="mx-auto max-w-[800px] py-12 md:py-16">
                <SectionHeading number="06 · Что делать дальше" title="Как я бы проверял нишу перед закупкой" />
                <div className="border-[var(--color-border)] research-flow">
                  {[
                    ["1", "Выбрать 5-10 конкретных товаров", "Я сравню цену, продажи, продавцов, рейтинг и характеристики. Категория помогает сориентироваться, но деньги зарабатывает конкретный товар."],
                    ["2", "Посчитать все расходы", "Закупка, доставка, комиссия, упаковка, реклама, возвраты, гарантия, налоги и деньги, которые будут лежать в остатках."],
                    ["3", "Прочитать отрицательные отзывы", "Я посмотрю свежие отзывы на 1-3 звезды у лидеров по выручке и найду повторяющиеся проблемы, а не одну случайную жалобу."],
                    ["4", "Запустить маленький тест", "Я начну с одной-трёх моделей и ограниченной партии. До старта задам условия остановки по марже, возвратам и сроку продажи."],
                  ].map(([number, title, body]) => (
                    <div key={number} className="">
                      <p className="font-mono text-[12px] font-normal text-[var(--personal-muted)]">ШАГ {number}</p>
                      <h3 className="mt-4 font-heading text-[25px] font-normal leading-tight">{title}</h3>
                      <p className="mt-4 text-[14px] leading-[1.7] text-[var(--color-dim)]">{body}</p>
                    </div>
                  ))}
                </div>

                <div className="reading-panel reading-methodology" aria-labelledby="calculation-heading">
                  <p className="reading-eyebrow">Методика и источники данных</p>
                  <h3 id="calculation-heading">Как я считал</h3>
                  <div className="mt-5 space-y-4 text-[14px] leading-[1.75] text-[var(--color-dim)]">
                    <p>Я взял опубликованный сопоставимый срез июня 2026 года и оставил конечные категории с выручкой от 50 млн ₸, от 10 до 300 активных SKU, от 3 до 100 продавцов и ненулевой выручкой у товаров без указанного бренда.</p>
                    <p>В Reels я использовал более строгий порог: от 10% безбрендовой выручки. Для расширенного списка из 30 ниш я ослабил только этот порог до ненулевой доли, после чего отдельно проверил динамику, сезонность и отзывы.</p>
                    <p>Рост сравнивает сопоставимые майский и июньский периоды. Сезонность показывает, как категория вела себя по полным месяцам 2025 года. Это ориентир, а не обещание, что рынок повторит прошлый год.</p>
                    <p>Данных текстовых отзывов по всем 30 нишам недостаточно, чтобы честно назвать массовые жалобы. Поэтому я не стал их придумывать и использовал только количественные показатели отзывов.</p>
                  </div>

                  <div className="reading-formulas">
                    {[
                      ["Средний чек", "Выручка категории ÷ количество заказов. Считается до округления показанных на странице цифр."],
                      ["Рост май→июнь", "(Выручка июня ÷ выручка мая − 1) × 100%. Сравниваются одинаковые по логике месячные срезы."],
                      ["Доля без бренда", "Выручка товаров без указанного бренда ÷ вся выручка категории × 100%. Это доля денег, а не доля карточек."],
                      ["Доля карточек с <10 отзывами", "Выручка активных SKU, у которых меньше 10 отзывов, ÷ вся выручка категории × 100%."],
                      ["Медиана отзывов", "Я беру серединное значение: у половины активных SKU отзывов не больше этого числа, у второй половины не меньше."],
                      ["Активные SKU и продавцы", "Считаются только товары и продавцы с зафиксированными продажами в выбранном периоде."],
                    ].map(([title, formula]) => (
                      <div key={title} className="">
                        <p className="font-mono text-[12px] font-normal uppercase tracking-[0.07em] text-[var(--personal-muted)]">{title}</p>
                        <p className="mt-3 text-[13px] leading-[1.65] text-[var(--color-dim)]">{formula}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 font-mono text-[12px] leading-relaxed text-[var(--color-dim)]">
                    Почему видимое деление иногда отличается на десятые: на странице я округляю выручку до 0,1 млн ₸, а средний чек считаю раньше по полному значению. В расчёте я использую точное число, не сокращённую подпись.
                  </p>
                <div className="reading-methodology-limitations">
                  <p className="font-mono text-[12px] font-normal uppercase tracking-[0.12em] text-[var(--personal-muted)]">Ограничения</p>
                  <ul className="mt-5 grid gap-3 text-[13px] leading-[1.65] text-[var(--color-dim)] md:grid-cols-2 md:gap-x-8">
                    <li>Цифры расчётные и нужны для сравнения ниш.</li>
                    <li>Для июня я использовал опубликованный месячный срез примерно за четыре недели.</li>
                    <li>Неполный июльский период я не использовал.</li>
                    <li>Спрос не подтверждает маржинальность и наличие поставщика.</li>
                    <li>Высокая доля товаров без бренда не отменяет права на товарные знаки.</li>
                    <li>Технические и регулируемые товары требуют отдельной проверки.</li>
                  </ul>
                  <p className="mt-6 border-t border-[var(--color-border)] pt-4 font-mono text-[12px] leading-relaxed text-[var(--color-dim)]">
                    Я выпускаю Kaspi Market как независимый редакционный проект Kasymzhanov. Проект не связан с Kaspi.kz и не является официальным продуктом компании.
                  </p>
                </div>
                </div>
              </div>
            </section>

            <section className="research-section reading-offers" aria-label="Продолжить исследование">
              <PersonalAnalysisOffer placement="end" />

              <div className="mt-8">
                <RedStatCallout placement="end" />
              </div>

              <ContentEngagement slug={SLUG} trackViews={false} />
            </section>
        </article></ChartTooltipScope>

        <div className="mx-auto max-w-[800px] pt-8">
          <PersonalFooter locale="ru" />
        </div>
      </div>
    </PersonalShell>
  );
}
