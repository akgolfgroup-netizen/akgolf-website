"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { WebsiteNav } from "@/components/website/WebsiteNav";
import { WebsiteFooter } from "@/components/website/WebsiteFooter";

function SuccessContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan_id");
  const tier = searchParams.get("tier");
  const isSubscription = tier === "standard" || tier === "premium";

  return (
    <div className="text-center max-w-lg mx-auto">
      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1 className="w-heading-lg mb-4">Betaling mottatt!</h1>
      <p className="text-ink-50 mb-8">
        {isSubscription
          ? "Din treningsplan er klar. Logg inn for a se hele planen i dashboardet."
          : "Din treningsplan er klar. Du vil motta en e-post med bekreftelse og tilgang til planen din."
        }
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {isSubscription ? (
          <Link href="/auth/login" className="w-btn w-btn-gold">
            Logg inn og se dashboard
          </Link>
        ) : planId ? (
          <Link href={`/treningsplan/preview/${planId}`} className="w-btn w-btn-primary">
            Se din treningsplan
          </Link>
        ) : null}
        <Link href="/treningsplan" className="w-btn w-btn-ghost">
          Tilbake til treningsplan
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <>
      <WebsiteNav />
      <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <div className="w-container">
          <Suspense fallback={
            <div className="text-center">
              <p className="text-ink-50">Laster...</p>
            </div>
          }>
            <SuccessContent />
          </Suspense>
        </div>
      </main>
      <WebsiteFooter />
    </>
  );
}
