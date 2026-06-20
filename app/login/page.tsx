import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/supabase-server";
import { SiteHeader, SiteFooter } from "@/components/canon/site-chrome";
import { CourseAccess } from "@/components/course-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Вход — kasymzhanov.com",
  description: "Войдите, чтобы ставить лайки, комментировать и подписаться на рассылку.",
  robots: { index: false, follow: false },
};

// Site login (media side) — separate from the course gate. Returns the visitor
// to ?next (must be an in-site path) or the homepage. Shared Supabase identity.
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const dest = next && next.startsWith("/") && !next.startsWith("//") ? next : "/";

  const user = await getSessionUser();
  if (user?.email) redirect(dest);

  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <SiteHeader />

        <main className="flex-1 flex items-center justify-center px-6 py-16 md:py-24">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-3">[ Вход ]</p>
              <h1 className="text-[26px] md:text-[32px] font-bold tracking-tight leading-[1.1] mb-3">
                Войдите в kasymzhanov.com
              </h1>
              <p className="text-[14px] md:text-[15px] text-[var(--color-dim)] leading-relaxed">
                Чтобы ставить лайки, комментировать материалы и подписаться на рассылку. Вход = регистрация.
              </p>
            </div>
            <CourseAccess
              next={dest}
              label=""
              note="Вход = регистрация. Нужен только для лайков, комментариев и подписки — ничего лишнего."
            />
          </div>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
