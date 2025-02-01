import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  // ignore lint error
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "100MB",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn2.thecatapi.com",
      },
      {
        protocol: "https",
        hostname: "*.media.tumblr.com",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        pathname: "/v1/storage/buckets/**",
      },
    ],
  },
};

module.exports = nextConfig;

export default nextConfig;
