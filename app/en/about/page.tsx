import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProjectsSection, ContactsSection, SocialsSection } from "@/components/canon/site-chrome";
import { SubscribeForm } from "@/components/subscribe-form";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About — Kasymzhanov",
  description:
    "Independent data media. Almas Kasymzhanov — data journalist, analyst, and founder. Investigations, analytics, and data journalism on markets, the economy, and technology.",
  alternates: {
    canonical: "/en/about",
    languages: { "ru-RU": "/about", "en-US": "/en/about", "x-default": "/about" },
  },
  openGraph: {
    title: "About — Kasymzhanov",
    description:
      "Independent data media. Almas Kasymzhanov — data journalist, analyst, and founder. Investigations, analytics, and data journalism on markets, the economy, and technology.",
    url: "https://kasymzhanov.com/en/about",
    locale: "en_US",
    type: "profile",
  },
};

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className=" pt-4">
      <p className="text-[28px] md:text-[36px] font-normal tracking-tight text-[var(--color-text)]">{value}</p>
      <p className="text-[12px] md:text-[13px] text-[var(--color-dim)] mt-1 leading-relaxed">{label}</p>
    </div>
  );
}

function PressItem({ href, title, source, date }: { href: string; title: string; source: string; date: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block  py-4"
    >
      <p className="text-[13px] text-[var(--color-brand)] uppercase tracking-[0.1em] mb-1">{source}</p>
      <p className="text-[15px] md:text-[16px] font-normal text-[var(--color-text)] group-hover:text-[var(--color-brand)] transition-colors leading-snug">
        {title}
      </p>
      <p className="text-[12px] text-[var(--color-dim)] mt-1">{date}</p>
    </a>
  );
}

export default function AboutPageEn() {
  const t = dict.en;
  const L = "en" as const;

  return <PersonalDocument locale={"en"}>
          {/* ── Hero ── */}
          <header className="grid gap-6 items-start mb-12">
            <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden border border-[var(--color-border)] shrink-0">
              <Image
                src="/avatar/almas.webp"
                alt={t.name}
                fill
                sizes="72px"
                className="object-cover object-[50%_16.5%]"
                priority
              />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-4">
                {t.about.publication}
              </p>
              <h1 className="text-[28px] md:text-[42px] font-normal tracking-tight text-[var(--color-text)] leading-[1.05] mb-5">
                {t.about.title}
              </h1>
              <p className="text-[17px] md:text-[20px] text-[var(--color-dim)] leading-relaxed mb-6">
                {t.about.subtitle}
              </p>
              <p className="text-[14px] md:text-[15px] leading-relaxed text-[var(--color-text)]/90 border-l-2 border-[var(--color-brand)] pl-4">
                {t.about.manifesto}
              </p>
              <Link href="/en/standards" className="mt-5 inline-block font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-brand)]  ">
                Editorial standards →
              </Link>
            </div>
          </header>

          {/* ── Bio ── */}
          <section className="mb-16 md:mb-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-5">{t.about.label}</p>
            <div className="grid gap-8 md:gap-12 md:grid-cols-[2fr_1fr]">
              <p className="text-[15px] md:text-[16px] leading-[1.75] text-[var(--color-text)]">
                {t.about.bio}
              </p>
              <div className="space-y-4">
                <ContactsSection locale={L} />
                <SocialsSection locale={L} />
              </div>
            </div>
          </section>

          {/* ── Metrics ── */}
          <section className="mb-16 md:mb-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-8">{t.about.metrics}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <Metric value="1.6B" label="Orders processed by the author's algorithms" />
              <Metric value="6+" label="Years analyzing marketplaces and public procurement" />
              <Metric value="3" label="Projects: 10b.kz, Redstat, Brock UI" />
              <Metric value="2" label="Languages: Russian and English" />
            </div>
          </section>

          {/* ── Projects ── */}
          <section className="mb-16 md:mb-24">
            <ProjectsSection locale={L} />
          </section>

          {/* ── Press ── */}
          <section className="mb-16 md:mb-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-5">{t.about.press}</p>
            <div className="grid gap-x-8 md:grid-cols-2">
              <PressItem
                href="https://forbes.kz/"
                title="The Jerrycan Crisis: charts and data"
                source="Forbes Kazakhstan"
                date="2026"
              />
            </div>
            <p className="text-[12px] text-[var(--color-dim)] mt-6">
              Materials and charts for Forbes Kazakhstan based on MPStats and Redstat data.
            </p>
          </section>

          {/* ── CTA ── */}
          <section className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 md:p-10">
            <p className="text-[17px] md:text-[20px] font-normal tracking-tight text-[var(--color-text)] mb-3">{t.about.cta}</p>
            <div className="max-w-md">
              <SubscribeForm source="about-en" />
            </div>
            <p className="text-[12px] text-[var(--color-dim)] mt-4">
              Or reach out directly:{" "}
              <Link href="mailto:almas@kasymzhanov.com" className="text-[var(--color-text)] hover:text-[var(--color-brand)] transition-colors">
                almas@kasymzhanov.com
              </Link>
            </p>
          </section>
        </PersonalDocument>;
}
