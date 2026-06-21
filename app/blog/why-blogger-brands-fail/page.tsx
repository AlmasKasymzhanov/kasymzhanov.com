"use client";

import Image from "next/image";
import { ReadTracker } from "@/components/read-tracker";
import { SiteHeader, SiteFooter, AuthorBlock } from "@/components/canon/site-chrome";
import { ArticleHeader } from "@/components/canon/article-header";
import { EngagementProvider } from "@/components/engagement/engagement-provider";
import { EngagementBar } from "@/components/engagement/engagement-bar";
import { Comments } from "@/components/engagement/comments";
import { ColumnChart } from "@/components/charts/column-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";

const BROCK_LINK = (
  <a href="https://brockui.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Brock UI</a>
);

const LICK_RED = "#e5484d";

function RevenueChart() {
  return (
    <figure className="my-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[3px] p-5">
      <ColumnChart
        height={240}
        barRadius={2}
        accent="var(--color-dim)"
        header={{ title: "Выручка Lick Beauty", subtitle: "Все SKU · авг 2025 – фев 2026" }}
        data={[
          { label: "Авг 2025", value: 43.6 },
          { label: "Дек 2025", value: 16.0 },
          { label: "Янв 2026", value: 6.3 },
          { label: "Фев 2026", value: 3.3, highlight: true, color: LICK_RED },
        ]}
        dataLabels={{
          show: true,
          format: (v) => v.toLocaleString("ru-RU", { maximumFractionDigits: 1 }),
        }}
        formatValue={(v) => `${v.toLocaleString("ru-RU", { maximumFractionDigits: 1 })} млн ₸`}
        yAxisFormat={(v) => `${v.toLocaleString("ru-RU", { maximumFractionDigits: 1 })} млн`}
        yAxis={{ max: 48 }}
        annotations={[
          { x: "Фев 2026", y: 34, text: "−92% от пика", color: LICK_RED, anchor: "top", arrow: false },
        ]}
        caption="* Сентябрь–ноябрь 2025 года: данных нет"
      />
      <figcaption className="font-mono text-[11px] text-[var(--color-dim)] mt-4">
        Источник: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2">redstat.kz</a>
        <span className="text-[var(--color-border)] mx-1.5">·</span>Графики: {BROCK_LINK}
      </figcaption>
    </figure>
  );
}

/* ───── Niche MoM change — diverging BarChart (niche vs Lick) ───── */
const pctFmt = (v: number) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v)}%`;

function NicheChangeChart() {
  return (
    <figure className="my-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[3px] p-5">
      <BarChart
        accent="var(--color-dim)"
        barRadius={2}
        labelWidth={132}
        barThickness={22}
        gap={10}
        header={{ title: "Февраль просел у всех. Lick — вдвое сильнее", subtitle: "Изменение выручки, янв → фев 2026" }}
        data={[
          { label: "Lick / LICK", value: -48, highlight: true, color: LICK_RED },
          { label: "Sen Sulu (лидер)", value: -18 },
          { label: "LUXVISAGE", value: -14 },
          { label: "Romand", value: -6 },
          { label: "Maybelline", value: -2 },
          { label: "Vivienne Sabo", value: 7 },
        ]}
        dataLabels={{ show: true, format: pctFmt }}
        formatValue={pctFmt}
        xAxis={{ hideTicks: true }}
      />
      <figcaption className="font-mono text-[11px] text-[var(--color-dim)] mt-4">
        Источник: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2">redstat.kz</a>
        <span className="text-[var(--color-border)] mx-1.5">·</span>Графики: {BROCK_LINK}
      </figcaption>
    </figure>
  );
}

/* ───── PUSY Revenue Chart ───── */
const PUSY_GREEN = "#22c55e";
const fmtRub = (v: number) =>
  v >= 1000
    ? `${(v / 1000).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} млрд ₽`
    : `${v} млн ₽`;

function PusyRevenueChart() {
  return (
    <figure className="my-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[3px] p-5">
      <LineChart
        height={240}
        accent={PUSY_GREEN}
        curve="linear"
        markers="auto"
        lastValueDot
        directLabels
        xScale="point"
        header={{ title: "Выручка PUSY", subtitle: "ООО «Дрожь Бьюти» · 2022 → 2024 · рост ×18" }}
        x={["2022", "2023", "2024"]}
        data={[{ name: "PUSY", data: [176, 1540, 3250], color: PUSY_GREEN, emphasis: true }]}
        formatValue={fmtRub}
        yAxisFormat={(v) =>
          v >= 1000
            ? `${(v / 1000).toLocaleString("ru-RU", { maximumFractionDigits: 1 })} млрд`
            : `${v} млн`
        }
      />
      <figcaption className="font-mono text-[11px] text-[var(--color-dim)] mt-4">
        Источник: <a href="https://spark-interfax.ru" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2">СПАРК-Интерфакс</a>
        <span className="text-[var(--color-border)] mx-1.5">·</span>Графики: {BROCK_LINK}
      </figcaption>
    </figure>
  );
}

/* ───── Table ───── */
function Table({ headers, rows, highlightRow, source, sourceNode }: { headers: string[]; rows: (string | number | React.ReactNode)[][]; highlightRow?: number; source?: string; sourceNode?: React.ReactNode }) {
  return (
    <div className="my-6 border border-[var(--color-border)] rounded-[3px] overflow-hidden">
      <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "thin" }}>
        <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr className="bg-[var(--color-surface)]">
              {headers.map((h, i) => (
                <th key={i} className={`py-2.5 px-4 font-mono font-medium text-[var(--color-dim)] border-b border-[var(--color-border)] whitespace-nowrap text-[11px] uppercase tracking-wider ${i === 0 ? "text-left" : "text-right"}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className={`${highlightRow === ri ? "bg-[#e5484d0a]" : ""} ${ri !== rows.length - 1 ? "border-b border-[var(--color-border)]/10" : ""}`}>
                {row.map((cell, ci) => (
                  <td key={ci} className={`py-2.5 px-4 whitespace-nowrap ${ci === 0 ? "text-left font-medium text-[var(--color-text)] text-[13px]" : "text-right font-mono text-[var(--color-dim)] text-[13px]"}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2 border-t border-[var(--color-border)]/30">{sourceNode ? <>Источник: {sourceNode}</> : <>Источник: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">redstat.kz</a>{source && <><span className="text-[var(--color-border)] mx-1.5">·</span>{source}</>}</>}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════ */
export default function LiqBeautyArticle() {
  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <ReadTracker slug="why-blogger-brands-fail" />
        <SiteHeader />
        <EngagementProvider slug="why-blogger-brands-fail">
        <article className="w-full max-w-[680px] mx-auto px-6 py-12 md:py-20">

        <ArticleHeader
          kicker="Анатомия запуска"
          title={<>Lick&nbsp;Beauty: семь миллионов против четырёхсот двадцати</>}
          subtitle={
            <>
              Данные не смотрят сторис. <span className="font-mono">7</span> млн подписчиков и блеск за <span className="font-mono">5 990</span> ₸ - против китайской реплики за <span className="font-mono">420</span> ₸, которая продаёт в семнадцать раз больше. Это не невезение. Это модель. Дальше - только цифры.
            </>
          }
          slug="why-blogger-brands-fail"
          date="25 марта 2026"
          readMin={7}
          hero={{
            src: "/blog/why-blogger-brands-fail/likbeauty.webp",
            alt: "Иллюстрация к материалу о Lick Beauty",
            credit: "Иллюстрация: Алмас Касымжанов · Higgsfield AI",
          }}
        />

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Intro ─── */}
        <div className="mb-12">
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Есть такой момент, знакомый каждому, кто работает с данными маркетплейсов. Ты открываешь панель аналитики, вбиваешь название бренда, о котором весь казахстанский Instagram гудел прошлым летом, - и видишь график, похожий на кардиограмму пациента, которого перестали лечить. Пик, и длинное, ровное, безнадёжное сползание вниз.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Именно это я увидел, когда набрал «Lick Beauty» в Redstat.
          </p>

          <RevenueChart />

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Август 2025-го - <span className="font-mono">43.6</span> миллиона тенге. Декабрь - <span className="font-mono">16</span>. Январь - <span className="font-mono">6.3</span>. Февраль - <span className="font-mono">3.3</span>. Минус девяносто два процента от пика. Каждый месяц хуже предыдущего. Без единого исключения.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Данным, надо сказать, всё равно, сколько у тебя подписчиков. Они не смотрят сторис. Не подписаны ни на кого. Не ставят лайки. Они просто считают. И то, что они насчитали, - повод для длинного и честного разговора.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Не о конкретных людях - о модели. О модели, которая раз за разом приводит к одному результату. В Алматы, в Москве, в Лос-Анджелесе. У блогеров с семью миллионами подписчиков и у блогеров с десятью. Модель одна - результат один.
          </p>

          <div className="flex flex-col gap-4 my-8">
            <div className="border border-[var(--color-border)] rounded-[3px] overflow-hidden">
              <Image src="/blog/why-blogger-brands-fail/lick-beauty.webp" alt="Lick beauty на Redstat — выручка и продажи за февраль 2026" width={1200} height={800} className="w-full h-auto" />
              <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5">Скриншот: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">redstat.kz</a> <span className="text-[var(--color-border)] mx-1.5">·</span> бренд «Lick beauty» <span className="text-[var(--color-border)] mx-1.5">·</span> февраль 2026</p>
            </div>
            <div className="border border-[var(--color-border)] rounded-[3px] overflow-hidden">
              <Image src="/blog/why-blogger-brands-fail/lick.webp" alt="LICK на Redstat — выручка и продажи за февраль 2026" width={1200} height={800} className="w-full h-auto" />
              <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5">Скриншот: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">redstat.kz</a> <span className="text-[var(--color-border)] mx-1.5">·</span> бренд «LICK» <span className="text-[var(--color-border)] mx-1.5">·</span> февраль 2026</p>
            </div>
          </div>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── За кулисами ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">За кулисами красивого запуска</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Для тех, кто не в контексте - а таких, подозреваю, немного, - объясню. Арман Юсупов и Карина Оксукпаева - это, пожалуй, самая узнаваемая пара казахстанского Instagram. Он - около двух миллионов подписчиков. Она - около пяти. Создатели Yuframe, команды, которая начала снимать вайны ещё в 2015-м и стала культурным явлением задолго до того, как в Казахстане научились произносить слово «инфлюенсер» без ухмылки. Серийные предприниматели - продакшн-студия 2ANY1, проект «Поток», франшизный бизнес в нескольких городах.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Люди, которые умеют делать. Это важно зафиксировать с самого начала, чтобы потом, когда пойдут жёсткие цифры, никто не подумал, что я занимаюсь разоблачением бездарностей. Бездарности не набирают семь миллионов подписчиков.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            В июле 2025-го они запустили бренд косметики. Блеск для губ Cherry 01. Цена: <span className="font-mono">4 499</span> тенге. Компания StartUp Studio, зарегистрированная в Алматы в ноябре 2024-го на имя Юсупова и его друга Рустема Жали. Производство: Китай, что, надо оговориться, абсолютно стандартная практика: так делают и PUSY, и VOIS, и половина того, что стоит на полках «Золотого яблока».
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-6">
            <div className="my-8 border border-[var(--color-border)] rounded-[3px] overflow-hidden max-w-[520px] mx-auto">
              <Image src="/blog/why-blogger-brands-fail/lick-insta.webp" alt="Пост запуска Lick Beauty в Instagram — «Как мы создали LICK?»" width={1200} height={1200} className="w-full h-auto" />
              <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5">Пост запуска Lick Beauty <span className="text-[var(--color-border)] mx-1.5">·</span> Instagram <a href="https://www.instagram.com/yusupov21/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">@yusupov21</a></p>
            </div>
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-6">
            В декабре добавили три оттенка - Twinkle, Cocoa и Marshmallow по <span className="font-mono">5 990</span> тенге. И вот что произошло дальше.
          </p>

          <Table
            headers={["Период", "Событие", "Выручка", "Продажи"]}
            rows={[
              ["Авг 2025", "Запуск Cherry 01", "43.6 млн ₸", "7 241 шт"],
              ["Дек 2025", "Три новых SKU", "16 млн ₸", "2 638 шт"],
              ["Янв 2026", "Спад", "6.3 млн ₸", "1 124 шт"],
              ["Фев 2026", "Продолжение", "3.3 млн ₸", "596 шт"],
            ]}
            highlightRow={3}
          />

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Запуск - всплеск - спад. Второй запуск - всплеск поменьше - спад побольше. Это не сбой. Это паттерн.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            В августе блеск купили <span className="font-mono">7 241</span> человек. В феврале - все четыре товара, вместе взятые - <span className="font-mono">596</span>.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Конечно, семь миллионов подписчиков - это не семь миллионов покупателей. Аудитория разрозненная: часть за пределами Казахстана, часть - мужчины, часть просто не видит сторис. Охват у крупных блогеров - обычно <span className="font-mono">5–15%</span> от базы. Допустим, реальная целевая - <span className="font-mono">250–350</span> тысяч человек. Купили - <span className="font-mono">596</span>. Даже по самым щадящим оценкам - меньше <span className="font-mono">0.2%</span>. При норме инфлюенс-маркетинга в <span className="font-mono">1–3%</span>.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Сезонность ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Февраль виноват? Спросим у конкурентов</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-6">
            Когда я показал эти цифры коллегам, первая реакция была предсказуемой: «Февраль короткий, праздники прошли, все просели». Нормальная гипотеза. Разумная. И абсолютно проверяемая - потому что у нас есть данные не только по Lick Beauty.
          </p>

          <NicheChangeChart />

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Ниша просела на <span className="font-mono">2–18%</span>. Lick - на <span className="font-mono">48%</span>. Сезонность объясняет от силы треть. Остальные тридцать процентных пунктов - это не февраль. Это что-то другое.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── 420 тенге ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Четыреста двадцать тенге</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            А теперь - факт, ради которого, возможно, и стоило садиться за эту статью.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            На Kaspi в категории «Помады, контуры, блески» есть товары без зарегистрированного бренда. Просто «Без бренда». За февраль они суммарно заработали <span className="font-mono">7.1</span> миллиона тенге. <span className="font-mono">55</span> SKU, почти <span className="font-mono">12</span> тысяч продаж. В два с лишним раза больше, чем Lick Beauty.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-6">
            Я полез внутрь - и обнаружил кое-что неожиданное. Большинство этих «безбрендовых» товаров - Rhode. Тот самый бренд Хейли Бибер. Только вот оригинальный Rhode Peptide Lip Tint стоит ~<span className="font-mono">$16</span> - примерно <span className="font-mono">7 500</span> тенге. А на Kaspi он продаётся по <span className="font-mono">420–515</span> тенге. С одной фотографией на карточке. Без описания. Без истории бренда. Очевидно - китайские реплики, которые используют название и визуал Rhode.
          </p>

          <div className="my-6 border border-[var(--color-border)] rounded-[3px] overflow-hidden">
            <Image src="/blog/why-blogger-brands-fail/rhode-redstat.webp" alt="Rhode Espresso на Redstat — 1.6 млн тенге выручки за февраль 2026" width={1200} height={800} className="w-full h-auto" />
            <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5">Rhode Espresso на Kaspi.kz <span className="text-[var(--color-border)] mx-1.5">·</span> Скриншот: <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">redstat.kz</a></p>
          </div>

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            <span className="font-mono">3 274</span> продажи в месяц. У Cherry 01 от Lick Beauty - <span className="font-mono">195</span>.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Реплика с одной картинкой продаёт в семнадцать раз больше, чем оригинальный бренд с семимиллионной аудиторией.
          </p>

          <Table
            headers={["Товар", "Цена", "Выручка (фев)", "Продажи"]}
            rows={[
              [<a key="e" href="https://kaspi.kz/shop/p/rhode-blesk-dlja-gub-espresso-142386324" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Rhode Espresso <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "421 ₸", "1 600 604 ₸", "3 274"],
              [<a key="t" href="https://kaspi.kz/shop/p/rhode-blesk-dlja-gub-toast-144626391" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Rhode Toast <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "515 ₸", "525 066 ₸", "990"],
              [<a key="r" href="https://kaspi.kz/shop/p/rhode-blesk-dlja-gub-ribbon-145296485" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Rhode Ribbon <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "498 ₸", "403 578 ₸", "745"],
              [<a key="f" href="https://kaspi.kz/shop/p/blesk-dlja-gub-blesk-dlja-gub-fruktovyi-blesk-1-sht-152798242" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Фруктовый Блеск (ноунейм) <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "298 ₸", "361 685 ₸", "1 368"],
              [<a key="rj" href="https://kaspi.kz/shop/p/rhode-blesk-dlja-gub-raspberry-jelly-142387040" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Rhode Raspberry Jelly <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "403 ₸", "293 371 ₸", "661"],
            ]}
          />
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            И вот тут я подхожу к штуке, которую на наших рынках знает каждый продавец, но которую почему-то забывают, когда разговор заходит о «брендах блогеров». В маркетинговых учебниках это называют красивым словом «ценовая эластичность спроса». На нашем рынке формулируют проще: цена решает. В Казахстане, в России, во всём СНГ - цена была, есть и будет главным фильтром покупки. Не бренд. Не подписчики. Не сторис. Цена.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Реплика за <span className="font-mono">420</span> тенге - это импульсная покупка. Увидела в выдаче - добавила в корзину - не думая. Даже если качество так себе - четыреста двадцать тенге не жалко. А блеск за <span className="font-mono">5 990</span> - это осознанное решение. Покупатель должен <em>знать</em>, что именно этот блеск ему нужен. А откуда он это знает? Из сторис. Которые были полгода назад.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Запуск это не бизнес ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Запуск - это не бизнес. Это аплодисменты</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            В театре бывает так: спектакль закончился, зрители хлопают, актёры кланяются, все счастливы. А потом наступает завтра. Нужно снова выходить на сцену. И послезавтра. И через месяц. И через год. И зрители каждый раз - новые. И им плевать, что вчера был аншлаг.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Запуск бренда блогера - это аплодисменты. Один раз. Блогер записывает серию сторис, показывает продукт, говорит сокровенное: «Я так долго к этому шла». Аудитория покупает. Не блеск - причастность. Не товар - лояльность. Кусочек жизни человека, за которым наблюдают каждый день.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Первый месяц - это не продажи. Это одноразовая конвертация социального капитала в деньги. Капитал копился годами. Конвертация происходит за неделю. Дальше капитал обнуляется. Начинается бизнес.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            А бизнес - это логистика, закупки, остатки на складе, карточки, SEO, реклама, ценообразование, контроль дистрибуции, юнит-экономика, повторные покупки, ассортимент, каналы. Длинный и скучный перечень, в котором нет ни одного пункта, решаемого сторис.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── 19 продавцов ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Девятнадцать продавцов одной баночки</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Вот тут я залез глубже, чем обычно. Посмотрел не просто продажи - залез в конкретный SKU. 143562625: «Lick beauty Lip Gloss блеск для губ вишневый Cherry 01». Одна карточка на Kaspi. Один товар. Одна и та же баночка.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Девятнадцать продавцов. Каждый - со своей ценой.
          </p>

          <div className="my-6 border border-[var(--color-border)] rounded-[3px] overflow-hidden">
            <Image src="/blog/why-blogger-brands-fail/lick-lip-gloss.webp" alt="Cherry 01 на Kaspi — 19 продавцов, разброс цен от 5 800 до 16 995 тенге" width={1200} height={800} className="w-full h-auto" />
            <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5">Скриншот: <a href="https://kaspi.kz/shop/p/lick-beauty-lip-gloss-blesk-dlja-gub-vishnevyi-cherry-01-143562625" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Kaspi.kz</a> <span className="text-[var(--color-border)] mx-1.5">·</span> Lick beauty Lip Gloss Cherry 01</p>
          </div>

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Сами авторы - LICK - ставят <span className="font-mono">5 990</span> тенге. Но три продавца на той же карточке - <span className="font-mono">5 800</span>. Дешевле автора. Зачем переплачивать бренду, если рядом - тот же товар за меньшие деньги?
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            На другом конце - ИП Metaverse. Тот же блеск. Та же карточка. <span className="font-mono">16 995</span> тенге. Почти в три раза дороже. Между ними - ещё пятнадцать продавцов. Один из них - ELEXIR COLLECTION - с рейтингом <span className="font-mono">3.0</span>, статусом TERRIBLE и <span className="font-mono">13%</span> возвратов. Этот продавец с ужасной репутацией торгует вашим блеском за <span className="font-mono">8 900</span> тенге.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-6">
            Для покупателя на Kaspi всё это - одно лицо. Лицо вашего бренда.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-6">
            Это не перекупщики. Скорее - неуправляемая дистрибуция. Похоже, команда Lick раздала товар сторонним продавцам, но не выстроила контроль рекомендованных розничных цен. Итог: одна баночка - от <span className="font-mono">5 800</span> до <span className="font-mono">16 995</span> тенге. Разброс в три раза. Нет единой ценовой политики - нет контроля над брендом. Это азбука, которую почему-то никто не читает.
          </p>

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-2">
            Новые SKU - Twinkle, Cocoa, Marshmallow - продаёт один продавец. Сами авторы. Но даже без ценового хаоса:
          </p>

          <Table
            headers={["Товар", "Выручка (фев)", "Продажи", "Динамика"]}
            rows={[
              [<a key="c" href="https://kaspi.kz/shop/p/lick-beauty-lip-gloss-blesk-dlja-gub-vishnevyi-cherry-01-143562625" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Cherry 01 <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "898 256 ₸", "195 шт", <span className="text-[#e5484d] font-bold">−56.5%</span>],
              [<a key="tw" href="https://kaspi.kz/shop/p/lick-lip-gloss-blesk-dlja-gub-twinkle-152237502" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Twinkle <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "1 087 278 ₸", "178 шт", <span className="text-[#e5484d] font-bold">−35.3%</span>],
              [<a key="co" href="https://kaspi.kz/shop/p/lick-lip-gloss-blesk-dlja-gub-cocoa-152237715" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Cocoa <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "942 864 ₸", "154 шт", <span className="text-[#e5484d] font-bold">−36.2%</span>],
              [<a key="ma" href="https://kaspi.kz/shop/p/lick-lip-gloss-blesk-dlja-gub-marshmallow-152237844" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Marshmallow <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "365 252 ₸", "64 шт", <span className="text-[#e5484d] font-bold">−66.6%</span>],
            ]}
          />

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Marshmallow - минус <span className="font-mono">66.6%</span> за месяц. При рейтинге <span className="font-mono">4.8–5.0</span> и <span className="font-mono">1 390</span> отзывах у Cherry. Покупатели довольны. Продукт - нормальный. Проблема не в качестве.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Продукт который покупают один раз ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Продукт, который покупают один раз</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Проблема - в самом продукте.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Блеск для губ - разовая покупка. Одного тюбика хватает на месяцы. Купил - поставил на полку - забыл. Нет повторных продаж. Нет LTV. Клиент пришёл и ушёл.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Это как ресторан, который продаёт только одно блюдо - притом настолько сытное, что после него не хочется есть неделю. Отличное блюдо. Все хвалят. Все рекомендуют. Но никто не возвращается.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Если бы в линейке были расходники - мицеллярная вода, тоники, маски, патчи - покупатели приходили бы каждый месяц. Блеск - это красивый сувенир, который купили один раз по сторис. Через месяц нет повода вернуться.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── PUSY ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Те, кто строил</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Любой диагноз убедителен ровно настолько, насколько убедительно лечение. Если проблема - в модели, то где-то должны существовать люди, которые построили другую модель и выиграли.
          </p>

          <h3 className="text-[17px] font-bold text-[var(--color-text)] mt-10 mb-4">PUSY: 500 тысяч подписчиков и 3.2 миллиарда</h3>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            В конце 2021 года Илона Дрожь - мастер по ламинированию бровей, около 500 тысяч подписчиков - и серийный предприниматель Артём Бородавкин основали PUSY. Бородавкин стал генеральным директором ООО «Дрожь Бьюти». Илона стала лицом. Он строил бизнес. Она давала ему лицо. Буквально.
          </p>

          <div className="my-6 border border-[var(--color-border)] rounded-[3px] overflow-hidden max-w-[520px] mx-auto">
            <Image src="/blog/why-blogger-brands-fail/ilona-drozh.webp" alt="Илона Дрожь — основательница бренда PUSY" width={1200} height={1200} className="w-full h-auto" />
            <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5">Илона Дрожь <span className="text-[var(--color-border)] mx-1.5">·</span> Instagram <a href="https://www.instagram.com/ilona.drozh/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">@ilona.drozh</a></p>
          </div>

          <PusyRevenueChart />

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Рентабельность - <span className="font-mono">25%</span>. Для бренда с блогерскими корнями - аномалия.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            По данным аналитики маркетплейсов (MPSTATS), за 30 дней - с 26 января по 24 февраля 2026 года - PUSY заработал только на Wildberries <span className="font-mono">74.6</span> миллиона рублей. Средняя дневная выручка - <span className="font-mono">2.4</span> миллиона. Ещё <span className="font-mono">13.5</span> миллионов - упущенная выручка: товар кончился на складе, а спрос остался. PUSY <em>теряет</em> из-за нехватки товара больше, чем Lick Beauty <em>зарабатывает</em> за месяц.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-6">
            У бренда - <span className="font-mono">1 377</span> SKU. У Lick Beauty - четыре.
          </p>

          <Table
            headers={["Товар", "Выручка (30д, WB)", "Продажи"]}
            rows={[
              [<a key="p1" href="https://www.wildberries.ru/catalog/755406779/detail.aspx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Гель для бровей Lamination, 5 мл <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "7.85 млн ₽", "16 601"],
              ["Гель фиксирующий стойкий", "5.15 млн ₽", "10 822"],
              [<a key="p3" href="https://www.wildberries.ru/catalog/211695539/detail.aspx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Гель для бровей версия 2.0 <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "4.91 млн ₽", "6 596"],
              [<a key="p4" href="https://www.wildberries.ru/catalog/564679782/detail.aspx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Шампунь и бальзам-кондиционер <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "4.03 млн ₽", "4 703"],
              [<a key="p5" href="https://www.wildberries.ru/catalog/434888804/detail.aspx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Мини-гель SUPER FIX <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "3.33 млн ₽", "10 308"],
              [<a key="p6" href="https://www.wildberries.ru/catalog/564580844/detail.aspx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">Маска для волос с кератином <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "1.71 млн ₽", "3 274"],
              [<a key="p7" href="https://www.wildberries.ru/catalog/105037347/detail.aspx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-dim)] hover:underline decoration-dotted underline-offset-2 transition-colors">SOS-тоник для лица <svg className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>, "1.10 млн ₽", "1 259"],
            ]}
            sourceNode={<><a href="https://mpstats.io" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">MPSTATS</a> <span className="text-[var(--color-border)] mx-1.5">·</span> Wildberries</>}
          />

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Гели для бровей - расходник номер один. Заканчивается - покупают снова. Но PUSY не остановился на гелях. Шампуни, маски, тоники, тушь, автозагар - <span className="font-mono">1 377</span> позиций. Каждая - расходник. Каждая - повод вернуться. Основной ценовой сегмент - <span className="font-mono">400–1 060</span> рублей.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Что сделал Бородавкин? Он не снимал сторис. Он строил: производство, логистику, маркетплейсы, финансы. Wildberries, Ozon, Магнит Косметик, Золотое Яблоко, Л&apos;Этуаль, четыре маркетплейса Китая. В 2025-м - Amazon и ближневосточный Noon. Сотни микроблогеров вместо одного большого.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-8">
            Lick Beauty - четыре SKU. Один маркетплейс. Один рынок.
          </p>

          <h3 className="text-[17px] font-bold text-[var(--color-text)] mt-10 mb-4">VOIS: вообще без блогера - 2.5 миллиарда рублей</h3>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            А вот кейс, который ломает вообще всю привычную схему.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            VOIS - бренд уходовой косметики. Основан в 2021-м Исламом Гедиевым из Кисловодска и Владимиром Загорским из белорусского Воложина. Двое предпринимателей. Никакого блогера-основателя. Вообще.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            По данным Forbes и СПАРК, выручка VOIS в 2024-м - <span className="font-mono">2.5</span> миллиарда рублей. Рост с <span className="font-mono">388</span> миллионов за год. В <span className="font-mono">6.5</span> раз. Прибыль - <span className="font-mono">592</span> миллиона. Гедиеву - <span className="font-mono">30</span> лет. Победитель Forbes «30 до 30» 2025 года.
          </p>

          <div className="my-6 border border-[var(--color-border)] rounded-[3px] overflow-hidden">
            <Image src="/blog/why-blogger-brands-fail/vois-forbes.webp" alt="VOIS — Forbes «30 до 30» 2025, выручка 2.5 млрд рублей" width={1200} height={800} className="w-full h-auto" />
            <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5">VOIS <span className="text-[var(--color-border)] mx-1.5">·</span> <a href="https://www.wildberries.ru/brands/vois" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Wildberries</a></p>
          </div>

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Их находка: они первыми в России начали нанимать блогеров в штат. Не на разовые интеграции. В штат. Сейчас - <span className="font-mono">200</span> креаторов. Половина компании. Постоянный конвейер контента, который работает каждый день, а не когда у кого-то настроение снять сторис. Выручка - с <span className="font-mono">388</span> млн до <span className="font-mono">2.5</span> млрд за год, <span className="font-mono">+544%</span> (в <span className="font-mono">6.5</span> раз).
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Мировые кейсы ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">От Алматы до Лос-Анджелеса: один и тот же паттерн</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Если бы история Lick Beauty была уникальной - можно было бы списать на невезение. Но она не уникальная. Она - правило.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Джаклин Хилл. Один из крупнейших бьюти-блогеров YouTube. Jaclyn Cosmetics - запуск 2019-го через Forma Brands. Покупатели нашли в помадах посторонние волокна. Полный возврат, перезапуск, выход в Ulta Beauty.
          </p>

          <div className="my-6 border border-[var(--color-border)] rounded-[3px] overflow-hidden">
            <Image src="/blog/why-blogger-brands-fail/jaclyn-hill.webp" alt="Jaclyn Cosmetics — бренд Джаклин Хилл, закрытие в 2024 году" width={1200} height={800} className="w-full h-auto" />
            <p className="font-mono text-[11px] text-[var(--color-dim)] text-left px-4 py-2.5">Jaclyn Cosmetics <span className="text-[var(--color-border)] mx-1.5">·</span> Источник: <a href="https://cosmeticsbusiness.com/jaclyn-hill-make-up-brand-jaclyn-cosmetics-closing" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Cosmetics Business</a></p>
          </div>

          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Январь 2023-го - Forma подаёт на банкротство. Январь 2024-го - Jaclyn Cosmetics закрывается. Хилл предлагали выкупить бренд. Отказалась. Новый президент Forma после этого сказал фразу, которую стоит вырезать в камне: «Product first, not influencer first». Продукт - на первом месте. Не инфлюенсер.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Разные страны. Разные отрасли. Разные масштабы. Один и тот же финал.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Конвейер ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Конвейер</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Есть деталь, которая мне как аналитику кажется самой красноречивой во всей этой истории.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Lick Beauty - не единственный бьюти-бренд Юсупова. Те же учредители - Юсупов и Жали - владеют компанией Glam Me, которая выпускает BlushMe - румяна от Айым Сейтметовой, бывшей участницы Yuframe.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Модель поставлена на конвейер. Блогер из ближнего круга - бренд - Китай - сторис - выручка первого месяца. Повторить.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Конвейер сам по себе - не порок. Порок - когда в конвейере не предусмотрена та часть, где бизнес продолжает работать после того, как сторис закончились.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Рынок ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Даже если стать первым - хватит ли рынка?</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Допустим, всё починили. Навели порядок в дистрибуции, расширили линейку, нашли операционного партнёра. Стали номером один.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Лидер ниши Sen Sulu - <span className="font-mono">26</span> миллионов тенге в месяц. Вся категория помад на Kaspi - ~<span className="font-mono">116</span> миллионов. Это <span className="font-mono">$230</span> тысяч на всю нишу. На весь Kaspi. Для бренда с аудиторией в семь миллионов - это потолок одного кабинета.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            Казахстан - не приговор. Но Kaspi в одиночку - добровольное ограничение.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Что видно из данных ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Что видно из данных, но не видно из сторис</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Это не претензии. Это вещи, которые видны, когда смотришь на рынок из-за цифр, а не из-за камеры телефона.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-3">
            <strong className="text-[var(--color-text)]">Расходники.</strong> Мицеллярная вода, тоники, маски, патчи - всё, что заканчивается. Один блеск - LTV ~<span className="font-mono">5 500</span> тенге. Линейка расходников - <span className="font-mono">40–60</span> тысяч в год. Разница в <span className="font-mono">8–10</span> раз.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-3">
            <strong className="text-[var(--color-text)]">Цена.</strong> На наших рынках цена - главный фильтр. Реплики Rhode по <span className="font-mono">420</span> тенге - импульсная покупка. Блеск за <span className="font-mono">5 990</span> - осознанное решение, которое без повторного прогрева не принимается. Не можешь конкурировать ценой - давай ценность, которая оправдывает разницу.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-3">
            <strong className="text-[var(--color-text)]">Партнёр с юнит-экономикой.</strong> У PUSY - Бородавкин. У VOIS - Загорский и Гедиев. У Lick Beauty - два блогера и друг-соучредитель.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-3">
            <strong className="text-[var(--color-text)]">Каналы.</strong> WB и Ozon уже в Казахстане. Российский рынок в <span className="font-mono">10–15</span> раз больше.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-3">
            <strong className="text-[var(--color-text)]">Контроль дистрибуции.</strong> <span className="font-mono">19</span> продавцов, разброс от <span className="font-mono">5 800</span> до <span className="font-mono">16 995</span>, продавец с <span className="font-mono">13%</span> возвратов - хаос.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            <strong className="text-[var(--color-text)]"><span className="font-mono">200</span> микроблогеров вместо одного мегаблогера.</strong> Конвейер, который не зависит от настроения одного человека.
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Финал ─── */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-text)] mb-6">Хайп заканчивается. Процессы - нет</h2>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Арман и Карина - талантливые люди. Это нужно сказать без оговорок. Семь миллионов подписчиков не покупаются и не накручиваются. Yuframe - культурное явление. Рейтинги Lick - <span className="font-mono">4.8–5.0</span>. Покупатели довольны. Эти люди умеют создавать вещи, которые нравятся аудитории.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Но нравиться аудитории и работать как бизнес - два разных ремесла. Подписчики - это внимание. Бизнес - это повторные продажи. Между первым и вторым - операции, логистика, финансы и партнёр, который всё это строит.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            Модель «запустить блеск и продавать через сторис» не работает. Ни здесь, ни в Америке, ни у кого. Работает другое: партнёр-операционщик. Расходники. Армия микроблогеров. Много каналов. Контроль цен.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            <span className="font-mono">43.6</span> миллиона тенге в августе - это не бизнес. Это вспышка. Бизнес - то, что остаётся, когда вспышка гаснет.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8] mb-5">
            У Lick Beauty рейтинг <span className="font-mono">5.0</span>. Продукт хороший. Аудитория огромная. Шанс - есть. Но для этого нужно перестать продавать блеск через сторис и начать строить компанию.
          </p>
          <p className="text-[15px] text-[var(--color-dim)] leading-[1.8]">
            И напоследок - помните тот факт из середины? Китайские реплики Rhode по <span className="font-mono">420</span> тенге - с одной фотографией на карточке, без подписчиков, без лица, без единого сторис - за февраль заработали на Kaspi <span className="font-mono">7.1</span> миллиона тенге. Lick Beauty с аудиторией в семь миллионов - <span className="font-mono">3.3</span> миллиона. Стоит ли вкладывать месяцы работы, производство, логистику, прогрев многомиллионной аудитории - чтобы в итоге продавать в два раза меньше, чем реплика с одной фотографией и ценником <span className="font-mono">420</span> тенге?
          </p>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        {/* ─── Источники ─── */}
        <div className="mb-12">
          <h2 className="text-[16px] font-bold tracking-tight text-[var(--color-text)] mb-4">Источники</h2>
          <div className="font-mono text-[11px] text-[var(--color-dim)]/70 leading-relaxed space-y-3">
            <p>Данные о продажах Lick Beauty, Sen Sulu, LUXVISAGE, Vivienne Sabo, Romand, Maybelline и товаров «Без бренда» на Kaspi.kz - <a href="https://redstat.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Redstat</a>, система аналитики маркетплейсов.</p>
            <p>Данные о выручке PUSY (ООО «Дрожь Бьюти», ИНН 9705156525) - <a href="https://spark-interfax.ru" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">СПАРК-Интерфакс</a>; <a href="https://shoppers.media" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Shoppers.media</a>, 31.10.2025; <a href="https://saby.ru" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Saby.ru</a>.</p>
            <p>Данные о продажах PUSY на Wildberries за 26.01–24.02.2026 - <a href="https://mpstats.io" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">MPSTATS</a>.</p>
            <p>Данные о выручке VOIS (ООО «Рокет Лаунч») - <a href="https://www.forbes.ru/svoi-biznes/537023-kak-brend-kosmetiki-s-marketplejsov-zarabatyvaet-milliardy-za-scet-stata-blogerov" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Forbes.ru</a>, 01.07.2025; <a href="https://spark-interfax.ru" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">СПАРК-Интерфакс</a>.</p>
            <p>Информация о структуре компаний StartUp Studio и Glam Me - <a href="https://finratings.kz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Finratings.kz</a>, 08.08.2025.</p>
            <p>Jaclyn Cosmetics / Forma Brands - <a href="https://cosmeticsbusiness.com/jaclyn-hill-make-up-brand-jaclyn-cosmetics-closing" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Cosmetics Business</a>; <a href="https://www.businessoffashion.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Business of Fashion</a>, 01.01.2024; <a href="https://www.retaildive.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Retail Dive</a>, 05.01.2024.</p>
            <p>Российский рынок косметики - <a href="https://www.kommersant.ru" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">Коммерсантъ FM</a>, 30.10.2025; <a href="https://style.rbc.ru" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dim)] hover:text-[var(--color-text)] hover:underline decoration-dotted underline-offset-2 transition-colors">РБК Стиль</a>, 23.04.2025.</p>
          </div>
        </div>

        {/* ─── Вовлечённость ─── */}
        <div className="mt-12 flex justify-end">
          <EngagementBar />
        </div>
        <Comments />
        </article>
        </EngagementProvider>

        <div className="flex-1" aria-hidden />
        <AuthorBlock variant="horizontal" />
        <SiteFooter />
      </div>
    </div>
  );
}
