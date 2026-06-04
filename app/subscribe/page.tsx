import Link from "next/link";
import type { Metadata } from "next";
import { SubscribeForm } from "@/components/subscribe-form";
import { GoogleButton } from "@/components/google-button";

export const metadata: Metadata = {
  title: "Подписка — Almas Kasymzhanov",
  description:
    "Подпишитесь на рассылку: разборы ниш маркетплейсов, юнит-экономика и аналитика — на почту. Бесплатно.",
};

export default function SubscribePage() {
  return (
    <div className="max-w-md mx-auto px-6 py-24">
      <Link
        href="/"
        className="text-sm text-dim hover:text-[var(--color-text)] transition-colors no-underline mb-10 inline-block"
      >
        ← На главную
      </Link>

      <h1 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--color-text)] mb-3">
        Подпишитесь на рассылку
      </h1>
      <p className="text-[14px] text-dim leading-relaxed mb-8">
        Разборы ниш маркетплейсов, юнит-экономика и мои ошибки — на почту.
        Бесплатно, без спама. Отписаться можно в один клик.
      </p>

      <SubscribeForm source="subscribe_page" />

      <div className="flex items-center gap-3 my-6 max-w-md">
        <span className="h-px flex-1 bg-[var(--color-border)]" />
        <span className="text-[12px] text-dim">или</span>
        <span className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      <GoogleButton label="Подписаться через Google" />

      <p className="text-[12px] text-dim leading-relaxed mt-8">
        Подписываясь, вы принимаете{" "}
        <Link href="/privacy" className="text-[var(--color-text)] hover:opacity-80 no-underline">
          Политику конфиденциальности
        </Link>{" "}
        и{" "}
        <Link href="/terms" className="text-[var(--color-text)] hover:opacity-80 no-underline">
          Оферту
        </Link>
        .
      </p>
    </div>
  );
}
