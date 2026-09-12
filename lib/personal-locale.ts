export type PersonalLocale = "ru" | "kz" | "en";

export function personalLocalePrefix(locale: PersonalLocale): string {
  if (locale === "en") return "/en";
  if (locale === "kz") return "/kz";
  return "";
}

export function personalHomePath(locale: PersonalLocale): string {
  return personalLocalePrefix(locale) || "/";
}
