import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { STRIPE_PRODUCTS, type PlanTier } from "@/lib/stripe/products";
import { createServiceClient } from "@/lib/supabase/server";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(request: NextRequest) {
  try {
    const { planId, tier } = await request.json();

    if (!planId || !tier) {
      return NextResponse.json({ error: "Mangler planId eller tier" }, { status: 400 });
    }

    if (!["basis", "standard", "premium"].includes(tier)) {
      return NextResponse.json({ error: "Ugyldig tier" }, { status: 400 });
    }

    // Fetch plan email for Stripe pre-fill
    const supabase = createServiceClient();
    const { data: plan } = await supabase
      .from("plans")
      .select("email")
      .eq("id", planId)
      .single();

    const product = STRIPE_PRODUCTS[tier as PlanTier];
    const origin = request.headers.get("origin") || "https://akgolf.no";

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: product.mode,
      line_items: [{ price: product.priceId, quantity: 1 }],
      success_url: `${origin}/treningsplan/success?plan_id=${planId}&tier=${tier}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/treningsplan/preview/${planId}`,
      metadata: {
        plan_id: planId,
        tier,
      },
      customer_email: plan?.email || undefined,
      payment_method_types: ["card"],
      locale: "nb",
    };

    const session = await getStripe().checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Kunne ikke opprette checkout-sesjon" }, { status: 500 });
  }
}
