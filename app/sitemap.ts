import type { MetadataRoute } from "next";

const BASE_URL = "https://kasymzhanov.com";

/* Editorial pages that exist in both languages (RU at "/", EN at "/en").
   Each is emitted twice — once per language URL — with hreflang `alternates`
   so Google pairs them. Course pages stay RU-only and are not mirrored. */
const BILINGUAL = ["", "/blog/russia-fuel-jerrycan", "/blog/nvidia-kazakhstan", "/blog/why-blogger-brands-fail", "/blog/kaspi-mcp"];

/* RU-only routes (no EN counterpart). */
const RU_ONLY = [
  "/blog",
  "/analytics",
  "/tools",
  "/tools/wb-analyzer",
  "/tools/wb-analyzer/guide",
  "/tools/mpstats-api",
  "/tools/ai-seller-guide",
  "/contacts",
  "/sellers-forum",
  "/sellers-forum/razbor",
  "/sellers-forum/guide",
  "/stream-3",
  "/reports/zbody",
  "/reports/kaspi-clothing",
  "/reports/bg-optic",
  "/reports/optics-guide",
  "/reports/trend-hunting",
  "/reports/kaspi-3-niches",
  "/reports/kaspi-preorder-guide",
  "/reports/kaspi-preorder-niches",
  "/reports/foot-stretcher-analysis",
  "/reports/towel-warmer-analysis",
  "/reports/kaspi-camping",
  "/reports/kaspi-fitness",
  "/reports/hinoko-report",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const priority = (r: string) => (r === "" ? 1 : r === "/blog" ? 0.9 : 0.7);

  const bilingual: MetadataRoute.Sitemap = BILINGUAL.flatMap((route) => {
    const ru = `${BASE_URL}${route}`;
    const en = `${BASE_URL}/en${route}`;
    const languages = { "ru-RU": ru, "en-US": en, "x-default": ru };
    const base = {
      lastModified: now,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: priority(route),
      alternates: { languages },
    };
    return [
      { url: ru, ...base },
      { url: en, ...base },
    ];
  });

  const ruOnly: MetadataRoute.Sitemap = RU_ONLY.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "/blog" ? ("weekly" as const) : ("monthly" as const),
    priority: priority(route),
  }));

  return [...bilingual, ...ruOnly];
}
