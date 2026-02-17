import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_URL = "https://akgolf.no";

export const metadata: Metadata = {
  title: {
    default: "AK Golf Group",
    template: "%s | AK Golf Group",
  },
  description:
    "Premium golfutvikling for ambisiøse spillere. Individuell coaching, juniorakademi og teknologiløsninger for golfens fremtid.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "AK Golf Group",
    url: SITE_URL,
    title: "AK Golf Group — Premium golfutvikling",
    description:
      "Individuell coaching, juniorakademi og teknologiløsninger for ambisiøse golfere som krever resultater.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AK Golf Group — Premium golfutvikling",
    description:
      "Individuell coaching, juniorakademi og teknologiløsninger for ambisiøse golfere som krever resultater.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" className="h-full">
      <body
        className={`${inter.variable} h-full`}
      >
        <a href="#main-content" className="w-skip-link">
          Gå til hovedinnhold
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AK Golf Group",
              url: SITE_URL,
              logo: `${SITE_URL}/icon`,
              description:
                "Premium golfutvikling for ambisiøse spillere. Individuell coaching, juniorakademi og teknologiløsninger.",
              contactPoint: {
                "@type": "ContactPoint",
                email: "post@akgolf.no",
                telephone: "+47-900-00-000",
                contactType: "customer service",
                availableLanguage: "Norwegian",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Oslo",
                addressCountry: "NO",
              },
            }),
          }}
        />
        {/* Film grain texture — editorial depth */}
        <svg
          className="fixed inset-0 z-[9998] pointer-events-none w-full h-full opacity-[0.018]"
          aria-hidden="true"
        >
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        {children}
      </body>
    </html>
  );
}
