import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merkevare for Golfklubber",
  description:
    "Få din golfklubbs merkevare analysert gratis. Komplett brand guide med fargeanalyse, logo-regler og designsystem — levert på 24 timer.",
  openGraph: {
    title: "Merkevare for Golfklubber — AK Golf Utvikling",
    description:
      "Gratis merkevare-analyse for golfklubber. Farger, typografi, logo-regler og komplett designsystem.",
    url: "https://akgolf.no/merkevare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merkevare for Golfklubber — AK Golf Utvikling",
    description:
      "Gratis merkevare-analyse for golfklubber. Farger, typografi, logo-regler og komplett designsystem.",
  },
};

export default function MerkevareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
