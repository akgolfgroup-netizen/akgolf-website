import type { Metadata } from "next";
import { ACADEMY_FAQ } from "@/lib/website-constants";

export const metadata: Metadata = {
  title: "Academy",
  description:
    "Individuell coaching og skreddersydde utviklingsplaner for voksne golfere. Evidensbasert metode med dokumenterte resultater.",
  openGraph: {
    title: "AK Golf Academy — Individuell coaching for voksne golfere",
    description:
      "1:1 coaching, videoanalyse, IUP-plan og mental trening. Skreddersydd for ambisiøse spillere.",
    url: "https://akgolf.no/academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "AK Golf Academy — Individuell coaching for voksne golfere",
    description:
      "1:1 coaching, videoanalyse, IUP-plan og mental trening. Skreddersydd for deg.",
  },
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ACADEMY_FAQ.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
