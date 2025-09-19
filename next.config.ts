import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 15+: use serverExternalPackages instead of experimental.serverComponentsExternalPackages
  serverExternalPackages: ["cloudinary"],
  images: {
    formats: ["image/avif", "image/webp"],
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
