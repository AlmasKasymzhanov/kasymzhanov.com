import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep local production verification separate from an open dev server.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Ensure the bundled «Выбор ниши» snapshot ships with the web-analyzer
  // serverless function so it can read it at runtime (used as a data fallback
  // while the live MPStats API is unavailable).
  outputFileTracingIncludes: {
    "/api/web-analyzer/niches": ["./app/api/web-analyzer/snapshot.csv"],
  },
  async redirects() {
    return [
      // Keep indexed biographies pointing to the single, current personal profile.
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/en/about", destination: "/en#about", permanent: true },
      { source: "/authors/almas-kasymzhanov", destination: "/#about", permanent: true },
      { source: "/en/authors/almas-kasymzhanov", destination: "/en#about", permanent: true },
      { source: "/blog", destination: "/latest", permanent: true },
      { source: "/data", destination: "/latest", permanent: true },
      { source: "/en/data", destination: "/en/latest", permanent: true },
      { source: "/subscribe", destination: "/newsletter", permanent: true },
      // Stable ASCII address for the report whose Cyrillic directory is not
      // resolved consistently by the local Windows route compiler.
      { source: "/электроника/report/2026/лето-осень", destination: "/reports/kaspi-electronics-2026", permanent: false },
      { source: "/%D1%8D%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%BE%D0%BD%D0%B8%D0%BA%D0%B0/report/2026/%D0%BB%D0%B5%D1%82%D0%BE-%D0%BE%D1%81%D0%B5%D0%BD%D1%8C", destination: "/reports/kaspi-electronics-2026", permanent: false },
      // Короткая клиентская ссылка: kasymzhanov.com/elki → отчёт для клиента.
      { source: "/elki", destination: "/clients/elki", permanent: false },
      // Кириллический алиас на отчёт по нишам WB. Основной адрес — латиница:
      // её проще копировать в переписку (кириллица превращается в %D0%B0%D0%BD…).
      { source: "/анализ", destination: "/analiz", permanent: false },
    ];
  },
};

export default nextConfig;
