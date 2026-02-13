import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Junior Academy",
  description:
    "Strukturert talentutvikling for unge golfere. Aldersinndelte programmer fra grunnlag til pre-elite med individuell oppfølging.",
};

export default function JuniorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
