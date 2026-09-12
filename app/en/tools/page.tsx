import { PersonalArticleList } from "@/components/personal-article-list";
import { getPublishedArticles } from "@/components/articles";
import type { Metadata } from "next";
import { PersonalDocument } from "@/components/personal-document";
const TOOLS = [
  {
    title: "MCP Connector for Kaspi",
    desc: "How Claude pulls niches, prices, and no-brand share on Kaspi — a practical case with code.",
    href: "/en/blog/kaspi-mcp",
    badge: "Case",
    soon: false,
  },
  {
    title: "WB Niche Analyzer",
    desc: "Upload a CSV from MPStats → instant Wildberries niche analysis: revenue, brands, price segments, monopoly.",
    href: "/tools/wb-analyzer",
    badge: "Analyzer",
    soon: true,
  },
  {
    title: "MPStats API Guide",
    desc: "Step-by-step guide to working with the MPStats API — from the first request to analyzing data in Claude.",
    href: "/tools/mpstats-api",
    badge: "Guide",
    soon: true,
  },
  {
    title: "AI for Sellers",
    desc: "NotebookLM + Claude: unlimited knowledge base + analyst brain. MCP, Claude for Sheets, API integrations.",
    href: "/tools/ai-seller-guide",
    badge: "Guide",
    soon: true,
  },
];

export const metadata: Metadata = {
  title: "Tools — Kasymzhanov",
  description: "Tools, guides, and practical cases for marketplace analytics.",
  alternates: {
    canonical: "/en/tools",
    languages: { "ru-RU": "/tools", "en-US": "/en/tools", "x-default": "/tools" },
  },
};


export default function ToolsPage() {
 return <PersonalDocument locale="en">
   <header className="pb-8"><h1>Tools</h1><p className="mt-6 text-[var(--personal-muted)]">Tools, guides, and practical cases for marketplace data analysis.</p></header>
   <PersonalArticleList locale="en" articles={getPublishedArticles("en").filter(article => article.slug === "kaspi-mcp")} />
   <p className="personal-kicker mt-10 mb-3">In progress</p>
   <ul className="">
    {TOOLS.filter(tool => tool.soon).map(tool => <li key={tool.title} className="py-5">
      <div><div className="flex flex-wrap items-center gap-2"><h2 className="!text-[17px]">{tool.title}</h2><span className="rounded-full bg-[var(--personal-rail-hover)] px-2 py-0.5 text-[11px] text-[var(--personal-muted)]">Soon</span></div><p className="personal-caption mt-2">{tool.desc}</p></div>
    </li>)}
   </ul>
 </PersonalDocument>;
}
