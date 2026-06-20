import Image from "next/image";
import Link from "next/link";
import { Masthead } from "@/components/canon/masthead";
import { HeaderSearch } from "@/components/canon/header-search";
import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { SocialIcon } from "@/components/social-icons";
import { HeaderAuth } from "@/components/canon/header-auth";

const DESCRIPTION =
  "kasymzhanov.com — независимое издание дата-журналиста, аналитика и предпринимателя " +
  "Алмаса Касымжанова. Аналитика рынков, событий и экономики.";

const SOCIAL = [
  { icon: "github", href: "https://github.com/AlmasKasymzhanov" },
  { icon: "linkedin", href: "https://www.linkedin.com/in/akasymzhanov/" },
  { icon: "telegram", href: "https://t.me/akasymzhanov" },
  { icon: "instagram", href: "https://www.instagram.com/almas_kasymzhanov/" },
  { icon: "facebook", href: "https://www.facebook.com/almaskassymzhanov" },
  { icon: "threads", href: "https://www.threads.net/@almas_kasymzhanov" },
  { icon: "youtube", href: "https://www.youtube.com/@akasymzhanovv" },
];

const PROJECTS = [
  {
    name: "10b.kz",
    url: "https://10b.kz",
    logoBlack: "/logos/10b-black.svg",
    logoWhite: "/logos/10b-white.svg",
    logoH: "h-5",
    desc: "Аналитика госзакупок Казахстана: тендеры, поставщики, суммы контрактов.",
  },
  {
    name: "Redstat",
    url: "https://redstat.kz",
    logoBlack: "/logos/redstat-black.png",
    logoWhite: "/logos/redstat-white.png",
    logoH: "h-4",
    desc: "Аналитика маркетплейса Kaspi: ниши, цены, продавцы и спрос.",
  },
];

// Inline brand link — turns to the accent on hover.
function SiteLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--color-text)] underline decoration-1 underline-offset-2 hover:text-[var(--color-brand)] transition-colors"
    >
      {children}
    </a>
  );
}

function Socials({ className = "" }: { className?: string }) {
  return (
    <nav className={`flex items-center gap-4 ${className}`}>
      {SOCIAL.map((s) => (
        <a
          key={s.href}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.icon}
          className="text-[var(--color-dim)] hover:text-[var(--color-brand)] transition-colors"
        >
          <SocialIcon name={s.icon} size={18} />
        </a>
      ))}
    </nav>
  );
}

function GmailIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path fill="#ea4435" d="M16.58,19.1068l-12.69-8.0757A3,3,0,0,1,7.1109,5.97l9.31,5.9243L24.78,6.0428A3,3,0,0,1,28.22,10.9579Z" />
      <path fill="#00ac47" d="M25.5,5.5h4a0,0,0,0,1,0,0v18a3,3,0,0,1-3,3h0a3,3,0,0,1-3-3V7.5a2,2,0,0,1,2-2Z" transform="rotate(180 26.5 16)" />
      <path fill="#ffba00" d="M29.4562,8.0656c-.0088-.06-.0081-.1213-.0206-.1812-.0192-.0918-.0549-.1766-.0823-.2652a2.9312,2.9312,0,0,0-.0958-.2993c-.02-.0475-.0508-.0892-.0735-.1354A2.9838,2.9838,0,0,0,28.9686,6.8c-.04-.0581-.09-.1076-.1342-.1626a3.0282,3.0282,0,0,0-.2455-.2849c-.0665-.0647-.1423-.1188-.2146-.1771a3.02,3.02,0,0,0-.24-.1857c-.0793-.0518-.1661-.0917-.25-.1359-.0884-.0461-.175-.0963-.267-.1331-.0889-.0358-.1837-.0586-.2766-.0859s-.1853-.06-.2807-.0777a3.0543,3.0543,0,0,0-.357-.036c-.0759-.0053-.1511-.0186-.2273-.018a2.9778,2.9778,0,0,0-.4219.0425c-.0563.0084-.113.0077-.1689.0193a33.211,33.211,0,0,0-.5645.178c-.0515.022-.0966.0547-.1465.0795A2.901,2.901,0,0,0,23.5,8.5v5.762l4.72-3.3043a2.8878,2.8878,0,0,0,1.2359-2.8923Z" />
      <path fill="#4285f4" d="M5.5,5.5h0a3,3,0,0,1,3,3v18a0,0,0,0,1,0,0h-4a2,2,0,0,1-2-2V8.5a3,3,0,0,1,3-3Z" />
      <path fill="#c52528" d="M2.5439,8.0656c.0088-.06.0081-.1213.0206-.1812.0192-.0918.0549-.1766.0823-.2652A2.9312,2.9312,0,0,1,2.7426,7.32c.02-.0475.0508-.0892.0736-.1354A2.9719,2.9719,0,0,1,3.0316,6.8c.04-.0581.09-.1076.1342-.1626a3.0272,3.0272,0,0,1,.2454-.2849c.0665-.0647.1423-.1188.2147-.1771a3.0005,3.0005,0,0,1,.24-.1857c.0793-.0518.1661-.0917.25-.1359A2.9747,2.9747,0,0,1,4.3829,5.72c.089-.0358.1838-.0586.2766-.0859s.1853-.06.2807-.0777a3.0565,3.0565,0,0,1,.357-.036c.076-.0053.1511-.0186.2273-.018a2.9763,2.9763,0,0,1,.4219.0425c.0563.0084.113.0077.169.0193a2.9056,2.9056,0,0,1,.286.0888,2.9157,2.9157,0,0,1,.2785.0892c.0514.022.0965.0547.1465.0795a2.9745,2.9745,0,0,1,.3742.21A2.9943,2.9943,0,0,1,8.5,8.5v5.762L3.78,10.9579A2.8891,2.8891,0,0,1,2.5439,8.0656Z" />
    </svg>
  );
}

/* ───── Author block sections (reused on home aside + article bottom) ───── */
function AboutSection() {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-5">Обо мне</p>
      <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[var(--color-border)] mb-4">
        <Image src="/avatar/almas.webp" alt="Алмас Касымжанов" fill sizes="80px" className="object-cover object-[center_24%]" />
      </div>
      <h2 className="text-[17px] font-bold tracking-tight mb-3">Алмас Касымжанов</h2>
      <div className="space-y-2 text-[12.5px] text-[var(--color-dim)] leading-relaxed">
        <p>Дата-журналист · аналитик · предприниматель</p>
        <p>1,6 млрд заказов прошли через мои алгоритмы.</p>
        <p>
          Разработал <SiteLink href="https://10b.kz">10b.kz</SiteLink>,{" "}
          <SiteLink href="https://redstat.kz">redstat.kz</SiteLink>
        </p>
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-4">Проекты</p>
      <div className="space-y-4">
        {PROJECTS.map((p) => (
          <div key={p.name}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={p.name}
              className="group inline-flex items-center gap-2 no-underline hover:opacity-70 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logoWhite} alt={p.name} className={`${p.logoH} w-auto block [.light_&]:hidden`} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logoBlack} alt="" className={`${p.logoH} w-auto hidden [.light_&]:block`} />
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="shrink-0 text-[var(--color-dim)] group-hover:text-[var(--color-brand)] transition-colors"
              >
                <path d="M8 16L16 8M16 8H10M16 8V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <p className="text-[12px] text-[var(--color-dim)] leading-relaxed mt-1">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsSection() {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-3">Контакты</p>
      <p className="text-[12px] text-[var(--color-dim)] leading-relaxed mb-3">Есть вопрос или идея? Напишите — отвечу.</p>
      <a
        href="mailto:almaskasymzhanov@gmail.com"
        className="inline-flex items-center gap-2 text-[13px] text-[var(--color-text)] no-underline hover:text-[var(--color-brand)] transition-colors"
      >
        <GmailIcon size={16} />
        almaskasymzhanov@gmail.com
      </a>
    </div>
  );
}

function SocialsSection() {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-3">Социальные сети</p>
      <p className="text-[12px] text-[var(--color-dim)] mb-4">Подписывайтесь на мои соцсети</p>
      <Socials />
    </div>
  );
}

// Author block — vertical (home left aside) or horizontal band (article bottom). Same content.
export function AuthorBlock({ variant = "vertical" }: { variant?: "vertical" | "horizontal" }) {
  if (variant === "horizontal") {
    return (
      <section className="border-t border-[var(--color-border)] px-6 md:px-12 py-10 md:py-12">
        <div className="grid gap-10 md:gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <AboutSection />
          <ProjectsSection />
          <div className="space-y-8">
            <ContactsSection />
            <SocialsSection />
          </div>
        </div>
      </section>
    );
  }
  return (
    <>
      <AboutSection />
      <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
        <ProjectsSection />
      </div>
      <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
        <ContactsSection />
      </div>
      <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
        <SocialsSection />
      </div>
    </>
  );
}

// Main site header — centered masthead (links home), language · theme · search · login.
export function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-border)]">
      <div className="relative grid grid-cols-3 items-center px-6 md:px-12 py-5">
        <div className="justify-self-start" aria-hidden />
        <div className="justify-self-center text-center">
          <Link href="/" aria-label="На главную" className="no-underline">
            <Masthead size="xl" surnameOnly />
          </Link>
        </div>
        <div className="justify-self-end flex items-center gap-3 md:gap-4">
          <div className="hidden sm:flex items-center gap-3 md:gap-4">
            <LangToggle />
            <ThemeToggle />
          </div>
          <HeaderSearch />
          <HeaderAuth />
        </div>
      </div>
    </header>
  );
}

// Main site footer — masthead, description, colophon, requisites + legal.
export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="px-6 md:px-12 py-10 md:py-14">
        <Link href="/" aria-label="На главную" className="no-underline inline-block">
          <Masthead size="lg" surnameOnly />
        </Link>
        <p className="mt-5 text-[13px] md:text-[14px] text-[var(--color-dim)] leading-relaxed max-w-3xl">
          {DESCRIPTION}
        </p>
        <p className="mt-4 text-[12px] text-[var(--color-dim)]/70">
          Иллюстрации — Higgsfield AI · пайплайн Claude Code + MCP
        </p>
      </div>
      <div className="border-t border-[var(--color-border)] px-6 md:px-12 py-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-[12px] text-[var(--color-dim)]">
        <div className="flex flex-col gap-1 leading-relaxed">
          <span>© 2026 kasymzhanov.com · ИП «Касымжанов А.Ж.» · ИИН 930422350609</span>
          <span>
            <a href="tel:+77028290908" className="no-underline hover:text-[var(--color-brand)] transition-colors">
              +7 702 829 09 08
            </a>
            {" · "}
            <a href="mailto:almaskasymzhanov@gmail.com" className="no-underline hover:text-[var(--color-brand)] transition-colors">
              almaskasymzhanov@gmail.com
            </a>
          </span>
        </div>
        <nav className="flex items-center gap-5 shrink-0">
          <Link href="/privacy" className="no-underline hover:text-[var(--color-brand)] hover:underline underline-offset-4 decoration-1 transition-colors">
            Политика конфиденциальности
          </Link>
          <Link href="/terms" className="no-underline hover:text-[var(--color-brand)] hover:underline underline-offset-4 decoration-1 transition-colors">
            Оферта
          </Link>
        </nav>
      </div>
    </footer>
  );
}
