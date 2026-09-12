import { IconlyArrowUpRight } from "@/components/iconly-icons";
import { getKaspiMarketArticles } from "@/components/articles";
import { SectionFront } from "@/components/section-front";
import { SubscribeForm } from "@/components/subscribe-form";
import type { Locale } from "@/lib/i18n";
export function KaspiMarketPage({ locale }: { locale: Locale }) {
  const copy = locale === "en"
    ? {
        eyebrow: "Kaspi market analytics",
        deck: "Category, product, demand, and competition analytics for current sellers and those preparing to enter Kaspi.",
        question: "Want to know what is really happening in your category?",
        questionBody: "I will prepare research around your specific decision: estimate market size and demand, map prices and assortments, analyze competitors, their listings and reviews, and identify unmet customer needs. This is useful whether you already sell and want to expand or are choosing a niche before entering Kaspi.",
        ask: "Discuss the research",
        whatsappText: "Hello! I would like to discuss personal research for a category or niche on Kaspi.",
        disclaimer: "Kaspi Market is an independent editorial project by Kasymzhanov. It is not affiliated with or endorsed by Kaspi.kz.",
      }
    : {
        eyebrow: "Аналитика рынка Kaspi",
        deck: "Аналитика категорий, товаров, спроса и конкуренции для действующих продавцов и тех, кто планирует выходить на Kaspi.",
        question: "Хотите понять, что на самом деле происходит в вашей категории?",
        questionBody: "Я подготовлю персональное исследование под вашу задачу: оценю объём рынка и спрос, разберу цены, ассортимент, конкурентов, их карточки и отзывы, найду незакрытые потребности покупателей. Такой разбор подходит и действующим продавцам, которые хотят расшириться, и тем, кто только выбирает нишу для выхода на Kaspi.",
        ask: "Обсудить исследование",
        whatsappText: "Здравствуйте! Хочу обсудить персональное исследование категории или ниши на Kaspi.",
        disclaimer: "Kaspi Market — независимый редакционный проект Kasymzhanov. Раздел не связан с Kaspi.kz и не является его официальным продуктом.",
      };
  const whatsappHref = `https://wa.me/77028290908?text=${encodeURIComponent(copy.whatsappText)}`;


  return <SectionFront locale={locale} eyebrow={copy.eyebrow} title="Kaspi Market" description={copy.deck} articles={getKaspiMarketArticles(locale)}>
    <section className="mt-12"><h2>{copy.question}</h2><p className="mt-4 text-[var(--personal-muted)]">{copy.questionBody}</p><a className="mt-4 inline-flex min-h-11 items-center" href={whatsappHref} target="_blank" rel="noopener noreferrer">{copy.ask} <IconlyArrowUpRight size={17} className="reading-inline-icon" /></a></section>
    <section className="mt-10 border-t border-[var(--personal-border)] pt-8"><SubscribeForm source={locale === "en" ? "kaspi-en" : "kaspi"} /></section>
    <p className="personal-caption mt-6">{copy.disclaimer}</p>
  </SectionFront>;
}
