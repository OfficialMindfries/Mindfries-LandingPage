import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile in a parent dir was being picked up.
  turbopack: { root: __dirname },
  // Blog images are served from Sanity's CDN
  images: { remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }] },
};

export default nextConfig;
