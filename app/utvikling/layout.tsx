import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Utvikling & Teknologi",
  description:
    "Digitale treningsverktøy og sportslig rådgiving for golfklubber, forbund og trenere. QR-treningsskilt, IUP-plattform og sportsplaner.",
  openGraph: {
    title: "Utvikling & Teknologi — Digitale verktøy for golf",
    description:
      "QR-treningsskilt, IUP-plattform, analyseverktøy og sportsplaner for golfklubber og trenere.",
    url: "https://akgolf.no/utvikling",
  },
  twitter: {
    card: "summary_large_image",
    title: "Utvikling & Teknologi — Digitale verktøy for golf",
    description:
      "QR-treningsskilt, IUP-plattform, analyseverktøy og sportsplaner for golfklubber og trenere.",
  },
};

export default function UtviklingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
