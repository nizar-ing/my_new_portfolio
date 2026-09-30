import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: '/portfoliodetail/:path*',
        destination: '/projects',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
