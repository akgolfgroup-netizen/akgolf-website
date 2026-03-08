import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/portal/:path*",
        destination: `${process.env.PORTAL_URL}/portal/:path*`,
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
};

export default nextConfig;
