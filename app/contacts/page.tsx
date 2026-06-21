import type { Metadata } from "next";
import { SiteHeader, SiteFooter, AuthorBlock, Socials } from "@/components/canon/site-chrome";
import { SocialIcon } from "@/components/social-icons";

export const metadata: Metadata = {
  title: "Контакты — Almas Kasymzhanov",
  description:
    "Связаться с Алмасом Касымжановым: Telegram-канал, почта, телефон. Маркетплейс-аналитика, дата-журналистика, консалтинг.",
};

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 3h3.5l1.5 5-2.2 1.3a12 12 0 0 0 5.7 5.7L16.5 18l5 1.5V22a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z" />
    </svg>
  );
}

// Iconly — Arrow Right 2 (Light).
function ArrowRight() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14.43 5.93L20.5 12L14.43 18.07" />
      <path d="M3.5 12H20.33" />
    </svg>
  );
}

const METHODS = [
  {
    icon: <SocialIcon name="telegram" size={18} />,
    label: "Telegram-канал",
    value: "@akasymzhanov",
    href: "https://t.me/akasymzhanov",
    external: true,
  },
  {
    icon: <MailIcon />,
    label: "Почта",
    value: "almas@kasymzhanov.com",
    href: "mailto:almas@kasymzhanov.com",
    external: false,
  },
  {
    icon: <PhoneIcon />,
    label: "Телефон",
    value: "+7 702 829 09 08",
    href: "tel:+77028290908",
    external: false,
  },
];

export default function ContactsPage() {
  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <SiteHeader />

        <main className="w-full max-w-[680px] mx-auto px-6 py-12 md:py-16">
          <header className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-brand)] mb-4">
              Связаться
            </p>
            <h1 className="text-[28px] md:text-[38px] font-bold tracking-tight text-[var(--color-text)] leading-[1.12] mb-5">
              Контакты
            </h1>
            <p className="text-[15px] md:text-[16px] text-[var(--color-dim)] leading-relaxed">
              Дата-журналистика, аналитика маркетплейсов, enterprise-разборы и консалтинг. Самый быстрый способ - Telegram-канал: оттуда можно написать мне в личку. Для деловых писем - почта и телефон.
            </p>
          </header>

          <hr className="border-[var(--color-border)] mb-10" />

          <div className="flex flex-col gap-3">
            {METHODS.map((m) => (
              <a
                key={m.href}
                href={m.href}
                {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 px-5 py-4 rounded-[3px] border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-dim)] transition-colors no-underline"
              >
                <span className="text-[var(--color-dim)] group-hover:text-[var(--color-brand)] transition-colors shrink-0">
                  {m.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-[0.16em] text-[var(--color-dim)]">{m.label}</span>
                  <span className="block text-[14px] text-[var(--color-text)] truncate">{m.value}</span>
                </span>
                <span className="ml-auto text-[var(--color-dim)] group-hover:text-[var(--color-text)] transition-colors">
                  <ArrowRight />
                </span>
              </a>
            ))}
          </div>

          <div className="mt-10">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-4">Соцсети</p>
            <Socials />
          </div>
        </main>

        <div className="flex-1" aria-hidden />
        <AuthorBlock variant="horizontal" />
        <SiteFooter />
      </div>
    </div>
  );
}
