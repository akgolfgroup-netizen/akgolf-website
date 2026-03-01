// Stripe product configuration for training plans
// Products and prices are created in Stripe Dashboard — these are lookup keys

export const STRIPE_PRODUCTS = {
  basis: {
    name: "AI Treningsplan — Basis",
    priceId: process.env.STRIPE_PRICE_BASIS!,
    mode: "payment" as const, // One-time payment
    amount: 19900, // 199 NOK in øre
  },
  standard: {
    name: "AI Treningsplan — Standard",
    priceId: process.env.STRIPE_PRICE_STANDARD!,
    mode: "subscription" as const,
    amount: 69900, // 699 NOK per season
  },
  premium: {
    name: "AI Treningsplan — Premium",
    priceId: process.env.STRIPE_PRICE_PREMIUM!,
    mode: "subscription" as const,
    amount: 199900, // 1999 NOK per year
  },
} as const;

export type PlanTier = keyof typeof STRIPE_PRODUCTS;
