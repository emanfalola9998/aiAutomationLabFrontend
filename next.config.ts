import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['picsum.photos'], // Add any external domains you need
  },
};

export default nextConfig;
