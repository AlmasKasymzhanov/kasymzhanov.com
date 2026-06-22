import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/supabase-server";
import { LoginScreen } from "@/components/login-screen";
import { dict } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: dict.en.login.title,
  description: dict.en.login.description,
  robots: { index: false, follow: false },
  alternates: { canonical: "/en/login", languages: { "ru-RU": "/login", "en-US": "/en/login" } },
};

// English login (media side). Mirrors /login; defaults the return path to the
// EN home so an English visitor stays in the English site after signing in.
export default async function LoginPageEn({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const dest = next && next.startsWith("/") && !next.startsWith("//") ? next : "/en";

  const user = await getSessionUser();
  if (user?.email) redirect(dest);

  return <LoginScreen locale="en" dest={dest} />;
}
