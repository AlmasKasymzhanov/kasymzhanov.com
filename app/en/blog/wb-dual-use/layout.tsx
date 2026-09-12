import { redirect } from "next/navigation";
import { ARTICLES } from "@/lib/article-catalogue";

export default function EnglishArticleLayout({ children }: { children: React.ReactNode }) {
  // The Russian article was revised; the older English draft is not published.
  // Apply the same publication gate to direct/search visits as to the catalogue.
  if (!ARTICLES.find(article => article.slug === "wb-dual-use")?.enReady) {
    redirect("/blog/wb-dual-use");
  }
  return children;
}
