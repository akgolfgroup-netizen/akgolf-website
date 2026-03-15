"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { CreditCard, AlertCircle, Loader2, ShieldCheck } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Props {
  clientSecret: string;
  bookingId: string;
  serviceName: string;
  amount: number; // øre
  allowVipps: boolean;
  onVipps: () => void;
  onSuccess: () => void;
}

function CheckoutForm({ bookingId, serviceName, onSuccess }: {
  bookingId: string;
  serviceName: string;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url:
          window.location.origin +
          "/booking?confirmed=true&bookingId=" +
          bookingId,
      },
    });

    if (confirmError) {
      setError(confirmError.message ?? "Betalingen feilet. Prøv igjen.");
      setLoading(false);
    } else if (paymentIntent?.status === "succeeded") {
      onSuccess();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gold/5 border border-gold/20">
        <CreditCard size={18} className="text-gold" />
        <span className="font-medium text-navy text-sm">{serviceName}</span>
      </div>

      <div className="rounded-xl border border-ink-20 bg-white p-4">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 px-4 py-3 rounded-xl bg-error/5 border border-error/20"
        >
          <AlertCircle size={16} className="text-error flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error">{error}</p>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gold text-white font-semibold hover:bg-gold-dark transition-colors disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Behandler betaling...
          </>
        ) : (
          <>
            <ShieldCheck size={18} />
            Betal nå
          </>
        )}
      </button>

      <p className="text-xs text-center text-ink-40">
        Sikker betaling via Stripe. AK Golf lagrer ikke kortinformasjon.
      </p>
    </form>
  );
}

function VippsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#FF5B24" />
      <path
        d="M6 8.5C7.5 8.5 8.5 9.5 9.5 11L12 15L14.5 11C15.5 9.5 16.5 8.5 18 8.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PaymentStep({
  clientSecret,
  bookingId,
  serviceName,
  amount,
  allowVipps,
  onVipps,
  onSuccess,
}: Props) {
  const priceNok = amount / 100;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-navy mb-2">Betaling</h2>
      <p className="text-ink-50 mb-2">
        Totalt: <span className="font-semibold text-gold">{priceNok.toLocaleString("nb-NO")} kr</span>
      </p>
      <p className="text-ink-40 text-sm mb-8">Velg betalingsmetode og fullfør bookingen.</p>

      <div className="max-w-md space-y-4">
        {/* Stripe Elements */}
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
              variables: {
                colorPrimary: "#B8975C",
                colorBackground: "#FFFFFF",
                colorText: "#0F2950",
                colorDanger: "#EF4444",
                fontFamily: "Inter, sans-serif",
                borderRadius: "12px",
                spacingUnit: "4px",
              },
            },
          }}
        >
          <CheckoutForm
            bookingId={bookingId}
            serviceName={serviceName}
            onSuccess={onSuccess}
          />
        </Elements>

        {/* Vipps option */}
        {allowVipps && (
          <>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-ink-20" />
              <span className="text-xs text-ink-40">eller</span>
              <div className="flex-1 h-px bg-ink-20" />
            </div>

            <button
              onClick={onVipps}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-[#FF5B24] text-[#FF5B24] font-semibold hover:bg-[#FF5B24] hover:text-white transition-all"
            >
              <VippsIcon />
              Betal med Vipps
            </button>
          </>
        )}
      </div>
    </div>
  );
}
