import { getPublishedArticles, getViews } from "@/components/articles";
import { PersonalContentRow } from "@/components/personal-content-row";
import type { PersonalLocale } from "@/lib/personal-locale";

type Resource = { slug: string; title: string; href: string };

const COPY: Record<PersonalLocale, { title: string; resources: Resource[] }> = {
  ru: {
    title: "Инструменты и исследования",
    resources: [
      { slug: "kaspi-mcp", title: "Kaspi MCP", href: "/blog/kaspi-mcp" },
      { slug: "kaspi-top-30-june-2026", title: "30 ниш Kaspi: что я бы проверял к осени", href: "/reports/kaspi-top-30-june-2026" },
    ],
  },
  kz: {
    title: "Құралдар мен зерттеулер",
    resources: [
      { slug: "kaspi-mcp", title: "Kaspi MCP", href: "/blog/kaspi-mcp" },
      { slug: "kaspi-top-30-june-2026", title: "Kaspi-дегі 30 тауаша: күзге қарай нені тексерер едім", href: "/reports/kaspi-top-30-june-2026" },
    ],
  },
  en: {
    title: "Tools and research",
    resources: [
      { slug: "kaspi-mcp", title: "Kaspi MCP", href: "/en/blog/kaspi-mcp" },
      { slug: "kaspi-top-30-june-2026", title: "30 Kaspi niches I would examine before autumn", href: "/reports/kaspi-top-30-june-2026" },
    ],
  },
};

export async function PersonalResources({ locale }: { locale: PersonalLocale }) {
  const copy = COPY[locale];
  const catalogue = getPublishedArticles("ru");
  const resources = copy.resources.flatMap((resource) => {
    const article = catalogue.find((item) => item.slug === resource.slug);
    return article ? [{ ...resource, datePublished: article.datePublished, readMin: article.readMin }] : [];
  });
  if (resources.length === 0) return null;
  const views = await getViews(resources.map((resource) => resource.slug));

  return (
    <section id="resources" aria-labelledby="resources-title" className="scroll-mt-8  pb-20 pt-10">
      <h2 id="resources-title" className="text-[18px] font-normal leading-6 tracking-[-0.012em]">
        {copy.title}
      </h2>
      <ul className="mt-6 ">
        {resources.map((resource) => (
          <li key={resource.slug}>
            <PersonalContentRow
              href={resource.href}
              title={resource.title}
              datePublished={resource.datePublished}
              readMin={resource.readMin}
              views={views[resource.slug]}
              locale={locale}
              languageLabel={locale !== "ru" && !resource.href.startsWith("/en/") ? "RU" : undefined}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
