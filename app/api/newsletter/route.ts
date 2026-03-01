import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "post@akgolf.no";

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

    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_PLACEHOLDER") {
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
