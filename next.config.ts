import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure the bundled «Выбор ниши» snapshot ships with the web-analyzer
  // serverless function so it can read it at runtime (used as a data fallback
  // while the live MPStats API is unavailable).
  outputFileTracingIncludes: {
    "/api/web-analyzer/niches": ["./app/api/web-analyzer/snapshot.csv"],
  },
};

export default nextConfig;
