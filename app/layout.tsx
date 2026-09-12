import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SOCIAL_SAMEAS } from "@/lib/social";
import { HtmlLang } from "@/components/html-lang";
import "./globals.css";

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
  title: "Kasymzhanov",
  description:
    "Kasymzhanov — независимое дата-медиа. Расследования, аналитика и дата-журналистика о рынках, экономике и технологиях. Данные вместо мнений.",
  metadataBase: new URL("https://kasymzhanov.com"),
  openGraph: {
    title: "Kasymzhanov",
    description:
      "Kasymzhanov — независимое дата-медиа. Расследования, аналитика и дата-журналистика о рынках, экономике и технологиях. Данные вместо мнений.",
    url: "https://kasymzhanov.com",
    siteName: "kasymzhanov.com",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kasymzhanov",
    description:
      "Kasymzhanov — независимое дата-медиа. Расследования, аналитика и дата-журналистика о рынках, экономике и технологиях. Данные вместо мнений.",
    creator: "@akasymzhanov",
    site: "@akasymzhanov",
  },
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
                  url: "https://kasymzhanov.com/authors/almas-kasymzhanov",
                  email: "almas@kasymzhanov.com",
                  jobTitle: "Дата-журналист, аналитик, предприниматель",
                  description:
                    "Автор Kasymzhanov — независимого дата-медиа о рынках, экономике и технологиях.",
                  sameAs: SOCIAL_SAMEAS,
                },
                {
                  "@type": "NewsMediaOrganization",
                  "@id": "https://kasymzhanov.com/#publisher",
                  name: "Kasymzhanov",
                  url: "https://kasymzhanov.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://kasymzhanov.com/icon-192.png",
                    width: 192,
                    height: 192,
                  },
                  founder: { "@id": "https://kasymzhanov.com/#almas-kasymzhanov" },
                  foundingDate: "2026",
                  ethicsPolicy: "https://kasymzhanov.com/standards",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://kasymzhanov.com/#website",
                  name: "Kasymzhanov",
                  url: "https://kasymzhanov.com",
                  description:
                    "Независимое дата-медиа. Расследования, аналитика и дата-журналистика. Данные вместо мнений.",
                  publisher: { "@id": "https://kasymzhanov.com/#publisher" },
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
