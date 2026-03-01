"use client";

import Link from "next/link";

export default function UpgradePage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gold"
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        </div>
        <h1 className="w-heading-md mb-4">Oppgrader til Standard</h1>
        <p className="text-ink-50 mb-8">
          Du har en Basis-plan. Oppgrader til Standard for a fa tilgang til
          dashboardet med ukeplan, ovelser, tester og progresjon.
        </p>
        <Link href="/treningsplan#priser" className="w-btn w-btn-gold">
          Se priser og oppgrader
        </Link>
        <div className="mt-4">
          <Link
            href="/treningsplan"
            className="text-sm text-ink-50 hover:text-gold transition-colors"
          >
            Tilbake til treningsplan
          </Link>
        </div>
      </div>
    </div>
  );
}
