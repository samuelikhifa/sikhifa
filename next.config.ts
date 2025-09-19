import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 15+: use serverExternalPackages instead of experimental.serverComponentsExternalPackages
  serverExternalPackages: ["cloudinary"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
