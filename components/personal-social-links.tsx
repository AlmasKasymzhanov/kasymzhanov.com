import {
  IconlyEmail,
  IconlyGithub,
  IconlyInstagram,
  IconlyLinkedIn,
  IconlyTelegram,
  IconlyX,
} from "@/components/iconly-icons";
import type { PersonalLocale } from "@/lib/personal-locale";

const SOCIAL_LINKS = [
  { label: "Telegram", href: "https://t.me/akasymzhanov", Icon: IconlyTelegram },
  { label: "X / Twitter", href: "https://x.com/akasymzhanov", Icon: IconlyX },
  { label: "Instagram", href: "https://www.instagram.com/akasymzhanovv/", Icon: IconlyInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/akasymzhanov/", Icon: IconlyLinkedIn },
  { label: "GitHub", href: "https://github.com/AlmasKasymzhanov", Icon: IconlyGithub },
  { label: "Email", href: "mailto:almas@kasymzhanov.com", Icon: IconlyEmail },
];

export function PersonalSocialLinks({ locale }: { locale: PersonalLocale }) {
  const navLabel =
    locale === "en"
      ? "Contact and social links"
      : locale === "kz"
        ? "Байланыстар мен әлеуметтік желілер"
        : "Контакты и социальные сети";
  const newTabLabel =
    locale === "en"
      ? " (opens in a new tab)"
      : locale === "kz"
        ? " (жаңа қойындыда ашылады)"
        : " (откроется в новой вкладке)";

  return (
    <nav aria-label={navLabel}>
      <ul className="grid max-w-[580px] grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
        {SOCIAL_LINKS.map(({ label, href, Icon }) => {
          const external = !href.startsWith("mailto:");

          return (
            <li key={label}>
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="inline-flex min-h-8 items-center gap-2 rounded-[3px] text-[14px] font-normal text-[var(--personal-muted)] no-underline transition-colors duration-[120ms] ease-out hover:text-[var(--personal-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--personal-text)]"
              >
                <Icon size={17} className="shrink-0" />
                <span>{label}</span>
                {external && (
                  <span className="sr-only">{newTabLabel}</span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
