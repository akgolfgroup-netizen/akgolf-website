import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personvern",
  description:
    "Personvernerklæring for AK Golf Group. Les om hvordan vi behandler dine personopplysninger.",
};

export default function PersonvernLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
