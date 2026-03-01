"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return !localStorage.getItem("cookie_consent");
}

function getServerSnapshot() {
  return false;
}

export function CookieConsent() {
  const shouldShow = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);

  function accept(level: "all" | "necessary") {
    localStorage.setItem("cookie_consent", level);
    setDismissed(true);
  }

  if (!shouldShow || dismissed) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4">
      <div className="w-container">
        <div className="bg-ink-100 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xl border border-ink-80">
          <p className="text-sm text-ink-20 flex-1">
            Vi bruker informasjonskapsler for å forbedre opplevelsen din.{" "}
            <Link
              href="/personvern"
              className="text-gold underline underline-offset-2 hover:text-gold-text transition-colors"
            >
              Les mer
            </Link>
          </p>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => accept("necessary")}
              className="text-xs text-ink-30 hover:text-white transition-colors px-3 py-2"
            >
              Kun nødvendige
            </button>
            <button
              onClick={() => accept("all")}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gold text-ink-100 text-xs font-medium hover:bg-gold-text transition-colors"
            >
              Godta alle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
