import Image from "next/image";
import Link from "next/link";
import { Socials } from "@/components/canon/site-chrome";
import { PersonalDocument } from "@/components/personal-document";
import { PersonalArticleList } from "@/components/personal-article-list";
import { getPublishedArticles } from "@/components/articles";
import { type Locale } from "@/lib/i18n";

export function AuthorPage({ locale }: { locale: Locale }) {
  const isEn = locale === "en";
  const articles = getPublishedArticles(locale);
  const copy = isEn
    ? { eyebrow: "Author", title: "Almas Kasymzhanov", role: "Data journalist · analyst · founder", bio: "Almas Kasymzhanov reports on digital markets, technology, and Central Asia. He founded 10b.kz, Redstat, and ProofTotal; more than 1.6 billion marketplace orders have passed through systems he built.", disclosure: "When a story uses data or expertise connected to those projects, the relationship is disclosed in the story and governed by the publication's editorial standards.", work: "Published work", standards: "Editorial standards" }
    : { eyebrow: "Автор", title: "Алмас Касымжанов", role: "Дата-журналист · аналитик · предприниматель", bio: "Алмас Касымжанов пишет о цифровых рынках, технологиях и Центральной Азии. Основал 10b.kz, Redstat и ProofTotal; через построенные им системы прошло более 1,6 млрд заказов маркетплейсов.", disclosure: "Если материал использует данные или экспертизу, связанную с этими проектами, эта связь раскрывается в материале и регулируется редакционными стандартами издания.", work: "Материалы автора", standards: "Редакционные стандарты" };
  return <PersonalDocument locale={locale}>
    <header className="pb-10">
      <div className="relative size-[72px] overflow-hidden rounded-full"><Image src="/avatar/almas.webp" alt={copy.title} fill sizes="72px" className="object-cover object-[50%_16.5%]" priority /></div>
      <h1 className="mt-6">{copy.title}</h1>
      <p className="mt-4 text-[var(--personal-muted)]">{copy.role}</p>
      <p className="mt-6 text-[var(--personal-muted)]">{copy.bio}</p>
      <p className="mt-4 text-[var(--personal-muted)]">{copy.disclosure} <Link href={isEn ? "/en/standards" : "/standards"}>{copy.standards}</Link>.</p>
      <div className="mt-6"><Socials /></div>
    </header>
    <section className="border-t border-[color-mix(in_srgb,var(--personal-border)_30%,transparent)] pt-8">
      <h2 className="mb-4">{copy.work}</h2>
      <PersonalArticleList articles={articles} locale={locale} />
    </section>
  </PersonalDocument>;
}
