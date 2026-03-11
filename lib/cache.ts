/**
 * Caching utilities for the application
 * Combines React cache() for Server Components and unstable_cache for data fetching
 */

import { unstable_cache } from "next/cache";
import { cache } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

// Cache revalidation times (in seconds)
const CACHE_TIMES = {
  SHORT: 60,      // 1 minute - for frequently changing data
  MEDIUM: 300,    // 5 minutes - for semi-static data
  LONG: 3600,     // 1 hour - for rarely changing data
  DAY: 86400,     // 24 hours - for static data
} as const;

// Cache tags for revalidation
export const CACHE_TAGS = {
  PLAN: "plan",
  USER_PLANS: "user-plans",
  STRIPE_PRODUCTS: "stripe-products",
  USER_PROFILE: "user-profile",
} as const;

/**
 * Cache individual plan data
 * Revalidates every 5 minutes
 */
export const getCachedPlan = unstable_cache(
  async (planId: string, supabase: SupabaseClient) => {
    const { data, error } = await supabase
      .from("plans")
      .select("id, category, tier, status, full_plan, created_at, updated_at")
      .eq("id", planId)
      .single();

    if (error) {
      console.error("[cache] Error fetching plan:", error);
      return null;
    }

    return data;
  },
  [CACHE_TAGS.PLAN],
  { 
    revalidate: CACHE_TIMES.MEDIUM,
    tags: [CACHE_TAGS.PLAN],
  }
);

/**
 * Cache user plans list
 * Revalidates every 5 minutes
 */
export const getCachedUserPlans = unstable_cache(
  async (userId: string, supabase: SupabaseClient) => {
    const { data, error } = await supabase
      .from("plans")
      .select("id, category, tier, status, full_plan, created_at, updated_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[cache] Error fetching user plans:", error);
      return [];
    }

    return data || [];
  },
  [CACHE_TAGS.USER_PLANS],
  {
    revalidate: CACHE_TIMES.MEDIUM,
    tags: [CACHE_TAGS.USER_PLANS],
  }
);

/**
 * Get active paid plan for user (Standard/Premium)
 */
export const getCachedActivePlan = unstable_cache(
  async (userId: string, supabase: SupabaseClient) => {
    const { data, error } = await supabase
      .from("plans")
      .select("id, category, tier, status, full_plan")
      .eq("user_id", userId)
      .in("tier", ["standard", "premium"])
      .eq("status", "paid")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  },
  [CACHE_TAGS.USER_PLANS],
  {
    revalidate: CACHE_TIMES.SHORT, // Shorter cache for active plan
    tags: [CACHE_TAGS.USER_PLANS, CACHE_TAGS.PLAN],
  }
);

/**
 * Get any paid plan (for Basis tier fallback)
 */
export const getCachedAnyPaidPlan = unstable_cache(
  async (userId: string, supabase: SupabaseClient) => {
    const { data, error } = await supabase
      .from("plans")
      .select("id")
      .eq("user_id", userId)
      .eq("status", "paid")
      .limit(1);

    if (error || !data || data.length === 0) {
      return null;
    }

    return data[0];
  },
  [CACHE_TAGS.USER_PLANS],
  {
    revalidate: CACHE_TIMES.SHORT,
    tags: [CACHE_TAGS.USER_PLANS],
  }
);

/**
 * React cache for dashboard data
 * Prevents duplicate fetches in the same render
 */
export const getDashboardPlan = cache(async (userId: string, supabase: SupabaseClient) => {
  // First try Standard/Premium
  const activePlan = await getCachedActivePlan(userId, supabase);
  
  if (activePlan?.full_plan) {
    return {
      plan: activePlan,
      hasFullPlan: true,
    };
  }

  // Check for Basis tier
  const anyPlan = await getCachedAnyPaidPlan(userId, supabase);
  
  return {
    plan: activePlan,
    hasFullPlan: false,
    hasBasisPlan: !!anyPlan,
  };
});

/**
 * Cache Stripe products configuration
 * Revalidates every 24 hours (rarely changes)
 */
export const getCachedStripeProducts = unstable_cache(
  async () => {
    // Import dynamically to avoid circular dependencies
    const { STRIPE_PRODUCTS } = await import("@/lib/stripe/products");
    return STRIPE_PRODUCTS;
  },
  [CACHE_TAGS.STRIPE_PRODUCTS],
  {
    revalidate: CACHE_TIMES.DAY,
    tags: [CACHE_TAGS.STRIPE_PRODUCTS],
  }
);

// Re-export cache times for use in other files
export { CACHE_TIMES };
