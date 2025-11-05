/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "u9a6wmr3as.ufs.sh" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;
