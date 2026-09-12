import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/components/articles";

const SITE = "https://kasymzhanov.com";
const RELEASE = "2026-09-13";

const BILINGUAL = [
  "",
  "/latest",
  "/market",
  "/kaspi",
  "/technology",
  "/kazakhstan",
  "/tools",
  "/newsletter",
  "/standards",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = BILINGUAL.flatMap((route) => {
    const ru = `${SITE}${route}`;
    const en = `${SITE}/en${route}`;
    const languages = { "ru-RU": ru, "en-US": en, "x-default": ru };
    const common = {
      lastModified: RELEASE,
      changeFrequency: route === "" || route === "/latest" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route === "/latest" ? 0.9 : 0.75,
      alternates: { languages },
    };
    return [{ url: ru, ...common }, { url: en, ...common }];
  });

  const articlePages: MetadataRoute.Sitemap = getPublishedArticles("ru").flatMap((article) => {
    const ru = `${SITE}${article.href}`;
    const modified = article.dateModified ?? article.datePublished;
    if (!article.enReady) {
      return [{ url: ru, lastModified: modified, changeFrequency: "monthly" as const, priority: 0.8 }];
    }
    const en = `${SITE}/en${article.href}`;
    const common = {
      lastModified: modified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages: { "ru-RU": ru, "en-US": en, "x-default": ru } },
    };
    return [{ url: ru, ...common }, { url: en, ...common }];
  });

  return [...staticPages, ...articlePages];
}
