import withPWA from "next-pwa";

const withPWACfg = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Isso impede que o Webpack tente processar os binários do 'ws'
      config.externals.push("ws", "bufferutil", "utf-8-validate");
    }
    return config;
  },
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
