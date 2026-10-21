import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve image sources directly: Vercel's optimizer returns HTTP 402 when
    // its image allowance is exhausted, even while Cloudinary files are available.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
};

export default nextConfig;
