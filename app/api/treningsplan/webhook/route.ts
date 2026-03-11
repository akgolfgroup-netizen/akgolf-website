import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";
import { env } from "@/lib/env";
import { createServiceClient } from "@/lib/supabase/server";

function getStripe() {
  return new Stripe(env.STRIPE_SECRET_KEY);
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createServiceClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const planId = session.metadata?.plan_id;
      const tier = session.metadata?.tier;

      if (!planId) break;

      // Try to find user by email for linking
      const customerEmail = session.customer_details?.email;
      let userId: string | null = null;
      if (customerEmail) {
        const { data: plans } = await supabase
          .from("plans")
          .select("user_id")
          .eq("id", planId)
          .single();
        userId = plans?.user_id || null;

        // If plan has no user_id, try to find by email in profiles
        if (!userId) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("email", customerEmail)
            .single();
          userId = profile?.id || null;
        }
      }

      // Update plan status to paid + link user if found
      await supabase
        .from("plans")
        .update({
          status: "paid",
          tier: tier || "basis",
          stripe_session_id: session.id,
          stripe_payment_intent: typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id || null,
          paid_at: new Date().toISOString(),
          ...(userId ? { user_id: userId } : {}),
        })
        .eq("id", planId);

      // Revalidate dashboard cache
      if (userId) {
        revalidatePath("/treningsplan/dashboard", "layout");
      }

      // For subscriptions, also create subscription record
      if (session.subscription && session.customer) {
        await supabase.from("subscriptions").insert({
          user_id: userId || session.client_reference_id || null,
          tier: tier || "standard",
          status: "active",
          stripe_customer_id: typeof session.customer === "string"
            ? session.customer
            : session.customer.id,
          stripe_subscription_id: typeof session.subscription === "string"
            ? session.subscription
            : session.subscription.id,
        });
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      await supabase
        .from("subscriptions")
        .update({
          status: subscription.status === "active" ? "active" : "past_due",
          current_period_start: new Date(subscription.start_date * 1000).toISOString(),
          current_period_end: subscription.cancel_at
            ? new Date(subscription.cancel_at * 1000).toISOString()
            : null,
          cancel_at_period_end: subscription.cancel_at_period_end,
        })
        .eq("stripe_subscription_id", subscription.id);
      
      // Revalidate dashboard
      revalidatePath("/treningsplan/dashboard", "layout");
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await supabase
        .from("subscriptions")
        .update({ status: "canceled" })
        .eq("stripe_subscription_id", subscription.id);
      
      // Revalidate dashboard
      revalidatePath("/treningsplan/dashboard", "layout");
      break;
    }
  }

  return NextResponse.json({ received: true });
}
