import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /** Fewer tiny Framer chunks in dev — helps avoid occasional webpack/HMR “module is not a function” cascades. */
    optimizePackageImports: ["framer-motion"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
