import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Treningsplan",
  description:
    "Personalisert 12-ukers golfplan generert av AI. Svar på fire spørsmål og få en skreddersydd treningsplan basert på AK Golf sin proprietære metodikk.",
  openGraph: {
    title: "AI Treningsplan — Personalisert golftrening fra AK Golf",
    description:
      "Fire spørsmål. En personlig plan. Generert på sekunder.",
    url: "https://akgolf.no/produkter/treningsplan",
  },
};

export default function TreningsplanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
