import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Тренажёры, фитнес и климат на Kaspi.kz — enterprise-аналитика спроса за полтора года",
  description:
    "29 категорий Kaspi.kz за 16 месяцев: сезонность фитнеса (пик ноябрь, провал лето — зеркало кемпинга), взрыв степперов ×18, монополия GENAU в беговых дорожках, матрица роста/падения, очистители/увлажнители, рекомендации и тайминг закупа.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
