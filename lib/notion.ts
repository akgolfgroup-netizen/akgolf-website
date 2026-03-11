import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const BRAND_GUIDE_DB_ID = process.env.NOTION_BRAND_GUIDE_DB_ID!;

interface BrandGuideLead {
  klubbnavn: string;
  kontaktperson: string;
  epost: string;
  telefon?: string;
  nettside?: string;
  logoPath?: string;
}

export async function createBrandGuideLead(lead: BrandGuideLead) {
  const response = await notion.pages.create({
    parent: { database_id: BRAND_GUIDE_DB_ID },
    properties: {
      Klubbnavn: {
        title: [{ text: { content: lead.klubbnavn } }],
      },
      Kontaktperson: {
        rich_text: [{ text: { content: lead.kontaktperson } }],
      },
      "E-post": {
        email: lead.epost,
      },
      ...(lead.telefon && {
        Telefon: {
          phone_number: lead.telefon,
        },
      }),
      ...(lead.nettside && {
        Nettside: {
          url: lead.nettside,
        },
      }),
      Status: {
        select: { name: "Ny" },
      },
      ...(lead.logoPath && {
        "Brand Guide path": {
          rich_text: [{ text: { content: lead.logoPath } }],
        },
      }),
    },
  });

  return response;
}
