import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merkevare-analyse",
  description:
    "Gratis profesjonell merkevare-analyse for golfklubber. Last opp logoen og motta fargeanalyse, typografi og logo-regler innen 24 timer.",
  openGraph: {
    title: "Gratis merkevare-analyse for golfklubber — AK Golf",
    description:
      "Få en komplett analyse av klubbens merkevare — farger, typografi og logo-regler — helt gratis.",
    url: "https://akgolf.no/produkter/merkevare",
  },
};

export default function MerkevareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
