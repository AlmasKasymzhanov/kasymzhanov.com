import Link from "next/link";
import { PersonalDocument } from "@/components/personal-document";
import { SubscribeForm } from "@/components/subscribe-form";
import { type Locale } from "@/lib/i18n";

export function NewsletterLanding({ locale }: { locale: Locale }) {
  const copy = locale === "en"
    ? {
        eyebrow: "The newsletter",
        title: "New posts from the blog",
        deck: "I share new posts about technology, marketplaces, and the products I am building.",
        bullets: ["New articles and research", "The method and limitations behind the numbers", "Practical findings that do not fit into the article"],
        cadence: "Sent when there is something worth opening. No daily noise.",
        privacy: "By subscribing you agree to the privacy policy. Unsubscribe at any time.",
      }
    : {
        eyebrow: "Рассылка",
        title: "Новые записи из блога",
        deck: "Присылаю новые статьи о технологиях, маркетплейсах и продуктах, которые развиваю.",
        bullets: ["Новые статьи и исследования", "Методика и ограничения цифр", "Практические находки, не вошедшие в материал"],
        cadence: "Письмо приходит, когда есть что открыть. Без ежедневного шума.",
        privacy: "Подписываясь, вы соглашаетесь с политикой конфиденциальности. Отписаться можно в любой момент.",
      };
  return <PersonalDocument locale={locale}>
    <header><p className="personal-kicker">{copy.eyebrow}</p><h1 className="mt-5">{copy.title}</h1><p className="mt-6 text-[var(--personal-muted)]">{copy.deck}</p></header>
    <ul className="my-8 list-disc space-y-3 pl-5 text-[var(--personal-muted)]">{copy.bullets.map(item => <li key={item}>{item}</li>)}</ul>
    <SubscribeForm source={locale === "en" ? "newsletter-en" : "newsletter"} />
    <p className="mt-4 text-[var(--personal-muted)]">{copy.cadence}</p>
    <p className="personal-caption mt-3">{copy.privacy} <Link href="/privacy">{locale === "en" ? "Read it" : "Подробнее"}</Link></p>
  </PersonalDocument>;
}
