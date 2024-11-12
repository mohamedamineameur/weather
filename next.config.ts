import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, 
  swcMinify: true,       
  images: {
    unoptimized: process.env.NODE_ENV === "production" && !!process.env.GITHUB_ACTIONS,
  },

  basePath: process.env.NODE_ENV === "production" ? "/weather" : "", 
  async redirects() {
    return [
      {
        source: "/old-route",
        destination: "/new-route",
        permanent: true,
      },
    ];
  },

  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
