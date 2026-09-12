import { IconlyArrowLeft } from "@/components/iconly-icons";
import { ResearchFact } from "@/components/canon/research-editorial";
import { ResearchReadingTime } from "@/components/canon/research-reading-time";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./report.module.css";

export const dynamic = "force-static";

const sections = [
  "Коротко: что запускать",
  "Период и рамки анализа",
  "Как читать показатели",
  "Структура рынка",
  "Рейтинг направлений",
  "Спрос с сентября по ноябрь",
  "Ценовые диапазоны",
  "Товары для сравнения",
  "Что пишут покупатели",
  "Какие продукты запускать",
  "Сколько заказать на старте",
  "Что не запускать первым",
  "Календарь запуска",
  "Документы и требования Kaspi",
  "Экономика одной продажи",
  "Как проверить продукт",
  "Показатели и причины остановки",
  "Что происходит на рынке",
  "Итоговое решение",
  "Что делать дальше",
];

function headingText(children: ReactNode): string {
  if (Array.isArray(children)) return children.map(headingText).join("");
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  return "";
}

function slugifyHeading(children: ReactNode): string {
  const text = headingText(children);
  return text
    .toLocaleLowerCase("ru")
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/(^-|-$)/g, "");
}

function sectionHeadingId(children: ReactNode): string {
  const text = headingText(children);
  const section = text.match(/^(\d+)\./)?.[1];
  return section ? `section-${section}` : `section-${slugifyHeading(children)}`;
}

const markdownComponents: Components = {
  h2: ({ children }) => <h2 id={sectionHeadingId(children)}>{children}</h2>,
  h3: ({ children }) => <h3 id={`detail-${slugifyHeading(children)}`}>{children}</h3>,
  table: ({ children }) => (
    <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Таблица данных">
      <table>{children}</table>
    </div>
  ),
  a: ({ href = "", children }) => {
    if (!href.startsWith("http://") && !href.startsWith("https://")) {
      return <span className={styles.internalReference}>{children}</span>;
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

function reportMarkdown(): string {
  const reportPath = path.join(
    process.cwd(),
    "app",
    "reports",
    "cosmetics-autumn-2026",
    "report.md",
  );

  return readFileSync(reportPath, "utf8").replace(/^# .+\r?\n/, "");
}

export default function CosmeticsAutumn2026Report() {
  const report = reportMarkdown();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.backRow}>
          <Link href="/"><IconlyArrowLeft size={17} className="reading-inline-icon" /> kasymzhanov.com</Link>
          <span>Доступ по прямой ссылке</span>
        </div>

        <header className={`research-header ${styles.hero}`}>
          <div className={styles.eyebrow}>Аналитический отчёт</div>
          <h1>
            Что запускать в косметике
            {" "}
            на Kaspi.kz осенью 2026
          </h1>
          <p className={`research-lead ${styles.deck}`}>
            Я проанализировал, какие товары выбрать, сколько они могут стоить,
            на что жалуются покупатели и как подготовить запуск по неделям.
          </p>
          <p className={styles.byline}>
            Подготовил <strong>Алмас Касымжанов</strong>
          </p>



          <div className={styles.scopeNote}>
            <strong>О чём этот отчёт.</strong> Я рассмотрел рынок Казахстана и
            продажи на Kaspi.kz с горизонтом запуска с сентября по ноябрь 2026
            года. Основной сценарий — выпуск продукции под собственной маркой.
            Продажу уже существующих брендов я разобрал отдельно.
          </div>

<ResearchReadingTime />
</header>
<div className="research-facts"><ResearchFact label={<>Рынок за период</>} value={<>10,59 млрд ₸</>} /><ResearchFact label={<>Продажи</>} value={<>2,75 млн</>} /><ResearchFact label={<>Товарные позиции</>} value={<>87 400</>} /><ResearchFact label={<>Проверенный период</>} value={<>Июнь 2026</>} /></div>


        <nav className={styles.toc} aria-label="Содержание отчёта">
          <div className={styles.tocTitle}>Содержание</div>
          <ol>
            {sections.map((section, index) => (
              <li key={section}>
                <a href={`#section-${index + 1}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className={styles.report}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {report}
          </ReactMarkdown>
        </article>

        <footer className={styles.footer}>
          <div>Almas Kasymzhanov · 24 июля 2026</div>
          <Link href="/">kasymzhanov.com</Link>
        </footer>
      </div>
    </div>
  );
}
