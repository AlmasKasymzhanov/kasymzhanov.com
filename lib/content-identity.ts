/** Stable storage keys: preserve published slugs and distinguish nested guides. */
export function contentSlug(pathname: string): string {
  const path = decodeURIComponent(pathname.split(/[?#]/)[0]).replace(/^\/en(?=\/)/, "").replace(/\/$/, "");
  if (path.startsWith("/электроника/")) return "kaspi-electronics-2026";
  if (path === "/web-analyzer/guide") return "wb-analyzer-guide";
  return path.replace(/^\/(?:blog|reports|tools)\//, "").replace(/^\//, "").replaceAll("/", "-");
}

export function contentLoginHref(pathname: string): string {
  const base = pathname.startsWith("/en/") ? "/en" : "";
  return `${base}/login?next=${encodeURIComponent(`${pathname}#comments`)}`;
}

/** A root canonical inherited from the site layout must not share the homepage. */
export function contentShareUrl(pathname: string, canonical?: string | null): string {
  const fallback = new URL(pathname.split(/[?#]/)[0], "https://kasymzhanov.com");
  try {
    const url = new URL(canonical ?? "", fallback.origin);
    const sameLanguage = url.pathname.startsWith("/en/") === fallback.pathname.startsWith("/en/");
    if (url.origin === fallback.origin && sameLanguage && url.pathname !== "/" && contentSlug(url.pathname) === contentSlug(pathname)) {
      url.search = "";
      url.hash = "";
      return url.href;
    }
  } catch { /* Use the material's own public path. */ }
  return fallback.href;
}
