import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hair Care + Barber на Kaspi.kz — Enterprise Report",
  description:
    "Детальный разбор 9 функциональных ниш ухода за волосами + барбершоп-сегмент на Kaspi.kz: 2 013M KZT/мес (hair) + 195M (barber), +77% YoY, сезонные паттерны, 741 бренд, ~7 453 SKU. Стратегия входа для дистрибьютора.",
};

export default function HaircareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
