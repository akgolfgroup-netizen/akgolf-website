import { NextResponse } from "next/server";
import { Resend } from "resend";
import { env } from "@/lib/env";

const CONTACT_EMAIL = env.CONTACT_EMAIL;

function getResend() {
  return env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = (formData.get("email") as string)?.trim();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Ugyldig e-postadresse." },
        { status: 400 }
      );
    }

    const resend = getResend();
    if (resend) {
      await resend.emails.send({
        from: "AK Golf <noreply@akgolf.no>",
        to: CONTACT_EMAIL,
        subject: "Nyhetsbrev-påmelding",
        text: `Ny nyhetsbrev-påmelding: ${email}`,
      });
    } else {
      console.log("[newsletter] Ny påmelding (Resend ikke konfigurert):", email);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[newsletter] Feil ved mottak:", error);
    return NextResponse.json(
      { error: "Noe gikk galt. Prøv igjen senere." },
      { status: 500 }
    );
  }
}
