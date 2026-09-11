import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vanilla mockup JS attaches document listeners once; Strict Mode remounts
  // would leave a dead DOM while blocking re-init.
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/before-you-trade-trading-sessions",
        destination: "/education/best-times-to-trade",
        permanent: true,
      },
      {
        source: "/pairs-to-trade",
        destination: "/education/pairs-to-trade",
        permanent: true,
      },
    ];
  },
  images: {
    // Local files under /public (e.g. /assets/hero/Hero-background.png) work by default.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
