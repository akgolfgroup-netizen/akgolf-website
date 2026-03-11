/**
 * Environment variable validation with Zod
 * Validates all env vars at build/startup time
 * Centralizes env handling across the application
 */

import { z } from "zod";

// Define environment schema with validation rules
const envSchema = z.object({
  // Supabase - Required for auth and database
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("SUPABASE_URL must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "SUPABASE_ANON_KEY is required"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),
  
  // Anthropic AI - Required for training plan generation
  ANTHROPIC_API_KEY: z.string().min(1, "ANTHROPIC_API_KEY is required"),
  
  // Stripe - Required for payments
  STRIPE_SECRET_KEY: z.string().startsWith("sk_", "STRIPE_SECRET_KEY must start with sk_"),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_", "STRIPE_WEBHOOK_SECRET must start with whsec_"),
  STRIPE_PRICE_BASIS: z.string().startsWith("price_", "STRIPE_PRICE_BASIS must be a valid Stripe price ID"),
  STRIPE_PRICE_STANDARD: z.string().startsWith("price_", "STRIPE_PRICE_STANDARD must be a valid Stripe price ID"),
  STRIPE_PRICE_PREMIUM: z.string().startsWith("price_", "STRIPE_PRICE_PREMIUM must be a valid Stripe price ID"),
  
  // Resend - Optional (falls back to console logging)
  RESEND_API_KEY: z.string().startsWith("re_").optional(),
  
  // App configuration - With sensible defaults
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://akgolf.no"),
  PORTAL_URL: z.string().url().optional().default("https://portal.akgolf.no"),
  CONTACT_EMAIL: z.string().email().default("post@akgolf.no"),
});

// Validate environment variables
type Env = z.infer<typeof envSchema>;

let parsedEnv: Env;

try {
  parsedEnv = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error("\n❌ Environment validation failed:");
    console.error("=" .repeat(50));
    error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      console.error(`  • ${path}: ${issue.message}`);
    });
    console.error("=" .repeat(50));
    console.error("\nPlease check your .env.local file or environment configuration.\n");
  }
  throw new Error("Environment validation failed");
}

// Export validated environment variables
export const env = parsedEnv;

// Type export for use in other files
export type { Env };
