import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure the bundled «Выбор ниши» snapshot ships with the web-analyzer
  // serverless function so it can read it at runtime (used as a data fallback
  // while the live MPStats API is unavailable).
  outputFileTracingIncludes: {
    "/api/web-analyzer/niches": ["./app/api/web-analyzer/snapshot.csv"],
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

class VeliteWebpackPlugin {
  static started = false;
  apply(compiler: any) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      const { build } = await import("velite");
      await build({ watch: dev, clean: !dev });
    });
  }
}

export default nextConfig;
