import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  transpilePackages: ["@misael1981/rangooo-database"],
  serverExternalPackages: [],
}

export default nextConfig
