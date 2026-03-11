import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const portalUrl = process.env.PORTAL_URL || "https://portal.akgolf.no";
    return [
      {
        source: "/portal/:path*",
        destination: `${portalUrl}/portal/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/academy", destination: "/coaching", permanent: true },
      { source: "/utvikling", destination: "/produkter", permanent: true },
      { source: "/treningsplan", destination: "/produkter/treningsplan", permanent: true },
      { source: "/merkevare", destination: "/produkter/merkevare", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://accounts.google.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' blob: data: https://*.stripe.com https://*.googleusercontent.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://api.stripe.com https://*.supabase.co https://api.anthropic.com",
              "frame-src https://js.stripe.com https://hooks.stripe.com https://accounts.google.com",
              "form-action 'self' https://hooks.stripe.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
