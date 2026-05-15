import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кемпинговые товары на Kaspi.kz — сезонная аналитика и прогноз май–сентябрь 2026",
  description:
    "Сезонный паттерн ниши «Туризм и отдых на природе» на Kaspi.kz: 23 категории, пик в июне (×2.8 к минимуму, отдельные ниши ×18), прогноз май–сентябрь 2026, контрсезонная ловушка, помесячный план закупа и распродажи, рекомендации.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
