import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages
  output: 'export',
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gzchanfer.com",
      },
    ],
  },
  
  // Ensure trailing slash for static export
  trailingSlash: true,
};

export default nextConfig;
