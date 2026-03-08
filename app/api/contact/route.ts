import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "post@akgolf.no";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim() || "";
    const handicap = (formData.get("handicap") as string)?.trim() || "";
    const program = (formData.get("program") as string)?.trim() || "";
    const message = (formData.get("message") as string)?.trim() || "";

    if (!name || !email) {
      return NextResponse.json(
        { error: "Navn og e-post er påkrevd." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Ugyldig e-postadresse." },
        { status: 400 }
      );
    }

    // Build email body
    const lines = [
      `Navn: ${name}`,
      `E-post: ${email}`,
      phone && `Telefon: ${phone}`,
      handicap && `Handicap: ${handicap}`,
      program && `Program: ${program}`,
      message && `\nMelding:\n${message}`,
    ].filter(Boolean);

    // Send via Resend (falls back to console log if API key is placeholder)
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_PLACEHOLDER") {
      await getResend().emails.send({
        from: "AK Golf <noreply@akgolf.no>",
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: `Ny søknad: ${name}${program ? ` — ${program}` : ""}`,
        text: lines.join("\n"),
      });
    } else {
      console.log("[contact] Ny søknad mottatt (Resend ikke konfigurert):\n", lines.join("\n"));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] Feil ved mottak:", error);
    return NextResponse.json(
      { error: "Noe gikk galt. Prøv igjen senere." },
      { status: 500 }
    );
  }
}
