"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Loader2 } from "lucide-react";
import { WebsiteNav } from "@/components/website/WebsiteNav";
import { WebsiteFooter } from "@/components/website/WebsiteFooter";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type PageState = "loading" | "form" | "success" | "error";

export default function SetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-gold" />
      </div>
    }>
      <SetPasswordContent />
    </Suspense>
  );
}

function SetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<PageState>("loading");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function exchangeCode() {
      const code = searchParams.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error("Code exchange failed:", error);
          setState("error");
          setError("Lenken er ugyldig eller utløpt. Be om en ny invitasjon.");
          return;
        }
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setState("form");
      } else {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event) => {
            if (event === "SIGNED_IN" || event === "PASSWORD_RECOVERY") {
              setState("form");
              subscription.unsubscribe();
            }
          }
        );

        setTimeout(() => {
          setState((prev) => {
            if (prev === "loading") {
              setError("Kunne ikke verifisere invitasjonen. Prøv å klikke lenken i e-posten på nytt.");
              return "error";
            }
            return prev;
          });
        }, 5000);
      }
    }

    exchangeCode();
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Passordet må være minst 8 tegn.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passordene er ikke like.");
      return;
    }

    setSubmitting(true);

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setError("Kunne ikke sette passord. Prøv igjen.");
      setSubmitting(false);
      return;
    }

    setState("success");
    setTimeout(() => router.push("/portal"), 2000);
  }

  return (
    <>
      <WebsiteNav />
      <main className="min-h-screen flex items-center justify-center px-4 pt-[52px]">
        <div className="w-full max-w-md">
          {state === "loading" && (
            <div className="text-center py-20">
              <Loader2 size={24} className="animate-spin text-gold mx-auto mb-4" />
              <p className="text-ink-50">Verifiserer invitasjon...</p>
            </div>
          )}

          {state === "error" && (
            <div className="w-card text-center">
              <div className="w-16 h-16 rounded-2xl bg-error/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="w-heading-sm mb-2">Noe gikk galt</h1>
              <p className="text-ink-50 mb-6">{error}</p>
              <a
                href="mailto:post@akgolf.no"
                className="text-sm text-gold hover:text-gold-dark transition-colors"
              >
                Kontakt oss for hjelp
              </a>
            </div>
          )}

          {state === "form" && (
            <div className="w-card">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-navy/5 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 className="w-heading-md mb-2">Velg passord</h1>
                <p className="text-ink-50">
                  Sett et passord for å logge inn på spillerportalen.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="password" className="w-label">
                    Passord
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-input"
                    placeholder="Minst 8 tegn"
                  />
                </div>

                <div>
                  <label htmlFor="confirm" className="w-label">
                    Bekreft passord
                  </label>
                  <input
                    id="confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-input"
                    placeholder="Gjenta passordet"
                  />
                </div>

                {error && (
                  <p className="text-sm text-error">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-btn w-btn-gold w-full disabled:opacity-50"
                >
                  {submitting ? "Lagrer..." : "Sett passord og logg inn"}
                </button>
              </form>
            </div>
          )}

          {state === "success" && (
            <div className="w-card text-center">
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="w-heading-sm mb-2">Passord satt!</h1>
              <p className="text-ink-50">
                Du blir nå sendt til spillerportalen...
              </p>
            </div>
          )}
        </div>
      </main>
      <WebsiteFooter />
    </>
  );
}
