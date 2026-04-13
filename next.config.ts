import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dodamdodam-storage.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
