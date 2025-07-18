import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  experimental: { 
    serverActions: { 
      bodySizeLimit: '5mb', // 画像の最大サイズを5MBに設定 
    }, 
  },
};

export default nextConfig;
