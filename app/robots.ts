import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/merkevare/takk"],
    },
    sitemap: "https://akgolf.no/sitemap.xml",
  };
}
