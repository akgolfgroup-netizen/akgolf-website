"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function DashboardHeader({
  userEmail,
  category,
}: {
  userEmail: string;
  category: string;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/treningsplan");
  };

  return (
    <header className="sticky top-0 z-40 bg-ink-100 text-white border-b border-white/10">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
        <div className="flex items-center gap-4">
          <Link
            href="/treningsplan"
            className="text-sm font-semibold text-gold tracking-wide"
          >
            AK Golf
          </Link>
          <span className="hidden sm:inline text-ink-30">|</span>
          <span className="hidden sm:inline text-sm text-ink-30">
            Treningsplan
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/15 text-gold text-xs font-mono font-semibold tracking-wider">
            Kat. {category}
          </span>
          <span className="hidden sm:inline text-xs text-ink-40 truncate max-w-[180px]">
            {userEmail}
          </span>
          <button
            onClick={handleLogout}
            className="text-xs text-ink-40 hover:text-white transition-colors"
          >
            Logg ut
          </button>
        </div>
      </div>
    </header>
  );
}
