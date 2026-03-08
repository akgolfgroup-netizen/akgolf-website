import type { Metadata } from "next";
import { ACADEMY_FAQ } from "@/lib/website-constants";

export const metadata: Metadata = {
  title: "Coaching",
  description:
    "1:1 coaching, gruppetimer og bedriftsgolf. Skreddersydde opplegg for voksne spillere som vil ta spillet til neste nivå.",
  openGraph: {
    title: "AK Golf Coaching — 1:1 og gruppetimer for voksne golfere",
    description:
      "Individuell coaching, videoanalyse, IUP-plan og mental trening. Skreddersydd for ambisiøse spillere.",
    url: "https://akgolf.no/coaching",
  },
  twitter: {
    card: "summary_large_image",
    title: "AK Golf Coaching — 1:1 og gruppetimer for voksne golfere",
    description:
      "Individuell coaching, videoanalyse, IUP-plan og mental trening. Skreddersydd for deg.",
  },
};

export default function CoachingLayout({
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
