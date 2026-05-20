import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = localFont({
  src: "../public/fonts/GeistVF.woff2",
  variable: "--font-geist",
  display: "swap",
});

const menlo = localFont({
  src: [
    { path: "../public/fonts/Menlo-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Menlo-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-menlo",
  display: "swap",
});

const ttNorms = localFont({
  src: "../public/fonts/TTNormsProVariable.ttf",
  variable: "--font-tt-norms",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Almas Kasymzhanov",
  description: "Founder of Redstat & 10b.kz — Marketplace Analytics & Data Products",
  metadataBase: new URL("https://akasymzhanov.com"),
  openGraph: {
    title: "Almas Kasymzhanov",
    description: "Founder of Redstat & 10b.kz — Marketplace Analytics & Data Products",
    url: "https://akasymzhanov.com",
    siteName: "akasymzhanov.com",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Almas Kasymzhanov",
    description: "Founder of Redstat & 10b.kz — Marketplace Analytics & Data Products",
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
    <html lang="ru" className={`${geist.variable} ${menlo.variable} ${ttNorms.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLMs Full" />
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var t = localStorage.getItem('theme');
            if (t !== 'dark') {
              document.documentElement.classList.add('light');
            }
          } catch (e) {
            document.documentElement.classList.add('light');
          }
        `}} />
      </head>
      <body>{children}<Analytics /></body>
    </html>
  );
}
