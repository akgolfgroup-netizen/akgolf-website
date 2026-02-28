"use client";

import { useSyncExternalStore, useCallback } from "react";
import Link from "next/link";

const STORAGE_KEY = "akgolf_cookie_consent";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(STORAGE_KEY),
    () => "1", // Server: assume consent to avoid flash
  );

  const handleAccept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "1");
    window.dispatchEvent(new Event("storage"));
  }, []);

  if (consent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-ink-90 text-ink-20 border-t border-ink-70">
      <div className="w-container flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <p className="text-sm text-center sm:text-left">
          Vi bruker informasjonskapsler for å forbedre din opplevelse.
        </p>
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/personvern" className="text-sm text-ink-40 hover:text-ink-20 transition-colors">
            Les mer
          </Link>
          <button onClick={handleAccept} className="w-btn w-btn-primary text-sm !py-2 !px-5">
            Godta
          </button>
        </div>
      </div>
    </div>
  );
}
