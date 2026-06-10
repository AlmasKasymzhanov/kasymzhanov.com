"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

// Sign-out for the course area. Clears the Supabase session cookie and sends the
// visitor back to /courses, which then renders the access (sign-in) screen.
export function CourseSignOut({ to = "/courses" }: { to?: string }) {
  const [supabase] = useState(() => createSupabaseBrowser());
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    await supabase.auth.signOut();
    router.replace(to);
    router.refresh();
  }

  return (
    <button
      onClick={signOut}
      disabled={loading}
      className="text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-text)] px-2.5 py-1 transition-colors disabled:opacity-50"
    >
      {loading ? "Выходим…" : "Выйти"}
    </button>
  );
}
