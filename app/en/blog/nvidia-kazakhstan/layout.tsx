import type { Metadata } from "next";
import { ArticleJsonLd } from "@/components/articles";

const title = "Silicon on Coal | Almas Kasymzhanov";
const description =
  "Kazakhstan signed $10bn in deals with NVIDIA and Firebird — and the power for the AI will be dug out of coal. A data breakdown of what was signed, what it costs, and where we've seen this movie before.";
const image = "/blog/nvidia-kazakhstan/cover.webp";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://kasymzhanov.com/en/blog/nvidia-kazakhstan",
    languages: {
      "ru-RU": "https://kasymzhanov.com/blog/nvidia-kazakhstan",
      "en-US": "https://kasymzhanov.com/en/blog/nvidia-kazakhstan",
    },
  },
  openGraph: {
    title,
    description,
    url: "https://kasymzhanov.com/en/blog/nvidia-kazakhstan",
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
      <ArticleJsonLd slug="nvidia-kazakhstan" description={description} locale="en" />
    </>
  );
}
