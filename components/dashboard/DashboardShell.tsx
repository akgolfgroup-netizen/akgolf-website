"use client";

import { createContext, useContext } from "react";
import { DashboardNav } from "./DashboardNav";
import { DashboardHeader } from "./DashboardHeader";
import type { GeneratedPlan } from "@/lib/ai/plan-schema";

interface PlanContextValue {
  plan: GeneratedPlan;
  planId: string;
  category: string;
  tier: string;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within DashboardShell");
  return ctx;
}

export function DashboardShell({
  plan,
  planId,
  category,
  tier,
  userEmail,
  children,
}: {
  plan: GeneratedPlan;
  planId: string;
  category: string;
  tier: string;
  userEmail: string;
  children: React.ReactNode;
}) {
  return (
    <PlanContext.Provider value={{ plan, planId, category, tier }}>
      <div className="min-h-screen bg-ink-05">
        <DashboardHeader userEmail={userEmail} category={category} />

        <div className="flex">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-60 fixed top-14 bottom-0 border-r border-ink-10 bg-white overflow-y-auto">
            <DashboardNav />
          </aside>

          {/* Main content */}
          <main className="flex-1 lg:ml-60 pb-24 lg:pb-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>

        {/* Mobile bottom tab bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-ink-10 z-40">
          <DashboardNav mobile />
        </div>
      </div>
    </PlanContext.Provider>
  );
}
