import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Isso libera todas as imagens do Cloudinary
      },
    ],
  },
};

export default nextConfig;
