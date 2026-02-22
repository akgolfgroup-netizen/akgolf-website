import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const klubbnavn = formData.get("klubbnavn") as string;
    const kontaktperson = formData.get("kontaktperson") as string;
    const epost = formData.get("epost") as string;
    const telefon = formData.get("telefon") as string;
    const nettside = formData.get("nettside") as string;
    const logo = formData.get("logo") as File | null;

    if (!klubbnavn || !kontaktperson || !epost || !logo) {
      return NextResponse.json(
        { error: "Mangler påkrevde felt: klubbnavn, kontaktperson, e-post og logo." },
        { status: 400 }
      );
    }

    // Save logo to uploads directory
    const uploadsDir = path.join(process.cwd(), "uploads", "merkevare");
    await mkdir(uploadsDir, { recursive: true });

    const timestamp = Date.now();
    const safeKlubb = klubbnavn.toLowerCase().replace(/[^a-z0-9æøå-]/gi, "-").replace(/-+/g, "-");
    const ext = path.extname(logo.name) || ".svg";
    const filename = `${safeKlubb}-${timestamp}${ext}`;
    const filepath = path.join(uploadsDir, filename);

    const bytes = new Uint8Array(await logo.arrayBuffer());
    await writeFile(filepath, bytes);

    // Lead data for downstream processing (Notion integration in Steg 2)
    const lead = {
      klubbnavn,
      kontaktperson,
      epost,
      telefon: telefon || "",
      nettside: nettside || "",
      logoPath: filepath,
      logoFilename: filename,
      opprettet: new Date().toISOString(),
    };

    // Log lead for now — Notion creation will be wired in Steg 2
    console.log("[merkevare] Ny lead mottatt:", JSON.stringify(lead, null, 2));

    return NextResponse.json({
      success: true,
      message: "Takk! Vi har mottatt din henvendelse.",
      lead: { klubbnavn, kontaktperson, epost },
    });
  } catch (error) {
    console.error("[merkevare] Feil ved mottak:", error);
    return NextResponse.json(
      { error: "Noe gikk galt. Prøv igjen senere." },
      { status: 500 }
    );
  }
}
