import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Utvikling & Teknologi",
  description:
    "Digitale treningsverktøy og sportslig rådgiving for golfklubber, forbund og trenere. QR-treningsskilt, IUP-plattform og sportsplaner.",
};

export default function UtviklingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
