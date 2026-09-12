import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SOCIAL_SAMEAS } from "@/lib/social";
import { HtmlLang } from "@/components/html-lang";
import "./globals.css";
import { personalMetadata, PERSONAL_DESCRIPTION } from "@/lib/site-metadata";

// One quiet sans-serif for reading and interface text.
const geist = localFont({
  src: "../public/fonts/Geist-Variable.woff2",
  variable: "--font-geist-local",
  display: "swap",
  weight: "100 900",
  style: "normal",
});

// Menlo is reserved for dates, numbers, and compact service labels.
const menlo = localFont({
  src: [
    {
      path: "../public/fonts/Menlo-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Menlo-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-menlo-local",
  display: "swap",
});

export const metadata: Metadata = {
  ...personalMetadata("Алмас Касымжанов · личный сайт", PERSONAL_DESCRIPTION, "/"),
  // Each route owns its canonical URL; do not make child pages canonical to home.
  alternates: undefined,
  metadataBase: new URL("https://kasymzhanov.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${geist.variable} ${menlo.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLMs Full" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" hrefLang="ru" title="Алмас Касымжанов — RSS (RU)" />
        <link rel="alternate" type="application/rss+xml" href="/en/feed.xml" hrefLang="en" title="Almas Kasymzhanov — RSS (EN)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://kasymzhanov.com/#almas-kasymzhanov",
                  name: "Almas Kasymzhanov",
                  alternateName: "Алмас Касымжанов",
                  url: "https://kasymzhanov.com/#about",
                  email: "almas@kasymzhanov.com",
                  jobTitle: "Предприниматель и аналитик",
                  description:
                    PERSONAL_DESCRIPTION,
                  sameAs: SOCIAL_SAMEAS,
                },
                {
                  "@type": "WebSite",
                  "@id": "https://kasymzhanov.com/#website",
                  name: "Алмас Касымжанов · личный сайт",
                  url: "https://kasymzhanov.com",
                  description:
                    PERSONAL_DESCRIPTION,
                  publisher: { "@id": "https://kasymzhanov.com/#almas-kasymzhanov" },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://kasymzhanov.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var m = localStorage.getItem('theme');
            var dark = m === 'dark' || ((m === 'system' || !m) && window.matchMedia('(prefers-color-scheme: dark)').matches);
            if (!dark) document.documentElement.classList.add('light');
          } catch (e) {
            document.documentElement.classList.add('light');
          }
        `}} />
      </head>
      <body><HtmlLang />{children}{process.env.VERCEL === "1" && <Analytics />}</body>
    </html>
  );
}
