import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academy",
  description:
    "Individuell coaching og skreddersydde utviklingsplaner for voksne golfere. Evidensbasert metode med dokumenterte resultater.",
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
