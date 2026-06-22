import type { Metadata } from "next";
import { ArticleJsonLd } from "@/components/articles";

const title = "Lick Beauty: Seven Million Followers vs. 420 Tenge | Almas Kasymzhanov";
const description =
  "Seven million followers, lip glosses, ₸3.3M in revenue. A data look at why creator brands die after the launch.";
const image = "/blog/why-blogger-brands-fail/likbeauty.webp";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://kasymzhanov.com/en/blog/why-blogger-brands-fail",
    languages: {
      "ru-RU": "https://kasymzhanov.com/blog/why-blogger-brands-fail",
      "en-US": "https://kasymzhanov.com/en/blog/why-blogger-brands-fail",
    },
  },
  openGraph: {
    title,
    description,
    url: "https://kasymzhanov.com/en/blog/why-blogger-brands-fail",
    type: "article",
    locale: "en_US",
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ArticleJsonLd slug="why-blogger-brands-fail" description={description} locale="en" />
    </>
  );
}
