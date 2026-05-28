import type { Metadata } from "next";
import { Stream3Page } from "./stream3";

export const metadata: Metadata = {
  title: "AI-аналитик маркетплейсов — поток 3 | Алмас Касымжанов",
  description:
    "Двухнедельный курс для селлеров Kaspi и Wildberries. Свой дашборд, AI-агент, коннектор для разговора с магазином в чате. Плюс белый ввоз из Китая и внешний трафик.",
};

export default function Page() {
  return <Stream3Page />;
}
