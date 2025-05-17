import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: process.env.MINIO_PROTOCAL,
        hostname: process.env.MINIO_ENPOINT,
        port: process.env.MINIO_PORT,
        pathname: "/mappy/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
