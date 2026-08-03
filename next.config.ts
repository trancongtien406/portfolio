import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  typedRoutes: true,
  // Cho phép images từ các subdomain
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.tiendev.id.vn",
      },
    ],
  },
};

export default nextConfig;
