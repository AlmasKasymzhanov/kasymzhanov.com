import { PersonalArticleList } from "@/components/personal-article-list";
import { getPublishedArticles } from "@/components/articles";
import type { Metadata } from "next";
import { PersonalDocument } from "@/components/personal-document";
const TOOLS = [
  {
    title: "MCP-коннектор для Kaspi",
    desc: "Как Claude сам достаёт ниши, цены и долю «без бренда» на Kaspi — практический кейс с кодом.",
    href: "/blog/kaspi-mcp",
    badge: "Кейс",
    soon: false,
  },
  {
    title: "WB Niche Analyzer",
    desc: "Загрузите CSV из MPStats → мгновенный анализ ниши Wildberries: выручка, бренды, ценовые сегменты, монополизация.",
    href: "/tools/wb-analyzer",
    badge: "Анализатор",
    soon: true,
  },
  {
    title: "MPStats API Гайд",
    desc: "Пошаговый гайд по работе с API MPStats — от первого запроса до анализа данных в Claude.",
    href: "/tools/mpstats-api",
    badge: "Гайд",
    soon: true,
  },
  {
    title: "AI для селлеров",
    desc: "NotebookLM + Claude: база знаний без лимитов + мозг-аналитик. MCP, Claude for Sheets, API-интеграции.",
    href: "/tools/ai-seller-guide",
    badge: "Гайд",
    soon: true,
  },
];

export const metadata: Metadata = {
  title: "Инструменты — Kasymzhanov",
  description: "Инструменты, гайды и практические кейсы для аналитики маркетплейсов.",
  alternates: {
    canonical: "/tools",
    languages: { "ru-RU": "/tools", "en-US": "/en/tools", "x-default": "/tools" },
  },
};


export default function ToolsPage() {
 return <PersonalDocument locale="ru">
   <header className="pb-8"><h1>Инструменты</h1><p className="mt-6 text-[var(--personal-muted)]">Инструменты, гайды и практические кейсы для работы с данными маркетплейсов.</p></header>
   <PersonalArticleList locale="ru" articles={getPublishedArticles("ru").filter(article => article.slug === "kaspi-mcp")} />
   <p className="personal-kicker mt-10 mb-3">В работе</p>
   <ul className="">
    {TOOLS.filter(tool => tool.soon).map(tool => <li key={tool.title} className="py-5">
      <div><div className="flex flex-wrap items-center gap-2"><h2 className="!text-[17px]">{tool.title}</h2><span className="rounded-full bg-[var(--personal-rail-hover)] px-2 py-0.5 text-[12px] text-[var(--personal-muted)]">Скоро</span></div><p className="personal-caption mt-2">{tool.desc}</p></div>
    </li>)}
   </ul>
 </PersonalDocument>;
}
