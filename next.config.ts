import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Air filters moved out of the HVAC category into a section of their own.
      {
        source: "/products/hvac/air-filters",
        destination: "/products/air-filters",
        permanent: true,
      },
      {
        source: "/en/products/hvac/air-filters",
        destination: "/en/products/air-filters",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
