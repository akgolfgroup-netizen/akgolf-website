import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CookieConsent } from "@/components/website/CookieConsent";
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
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
