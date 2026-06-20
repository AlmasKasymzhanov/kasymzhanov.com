export const metadata = {
  title: "Контакты — Almas Kasymzhanov",
  description: "Связаться с Алмасом Касымжановым — маркетплейс-аналитика и консалтинг.",
};

const LINKS = [
  { label: "GitHub", href: "https://github.com/AlmasKasymzhanov", icon: "gh" },
  { label: "Telegram", href: "https://t.me/almaskasymzhanov", icon: "tg" },
  { label: "Instagram", href: "https://www.instagram.com/almas_kasymzhanov/", icon: "ig" },
  { label: "Email", href: "mailto:almas@kasymzhanov.com", icon: "mail" },
];

export default function ContactsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3 font-heading">
          Контакты
        </h1>
        <p className="text-dim max-w-lg leading-relaxed">
          Marketplace-аналитика, консалтинг, enterprise-отчёты.
        </p>
      </div>

      <div className="flex flex-col gap-3 max-w-sm">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className="flex items-center gap-3 px-5 py-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all no-underline group"
          >
            <span className="text-sm font-medium text-white group-hover:text-accent transition-colors">
              {link.label}
            </span>
            <span className="text-dim ml-auto text-xs">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
