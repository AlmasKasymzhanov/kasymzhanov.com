import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HINOKO — Research-отчёт по запуску в нише outdoor / водоотталкивающие куртки",
  description:
    "Исследование запуска бренда HINOKO: лёгкая техническая куртка в духе Arc'teryx. Глобальные тренды outdoor apparel ($17–22 млрд TAM), детальная аналитика Kaspi.kz ($11.6M LTM) и Wildberries ($549M 2025), white space на Kaspi M Премиум, целевая цена 45,000 ₸, календарь запуска до сентября 2027.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
