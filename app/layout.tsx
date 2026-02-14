import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
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
        className={`${dmSans.variable} ${dmSerifDisplay.variable} ${jetbrainsMono.variable} h-full`}
      >
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
      </body>
    </html>
  );
}
