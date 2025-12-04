import withPWA from "next-pwa";

const withPWACfg = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "u9a6wmr3as.ufs.sh" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default withPWACfg(nextConfig);
