import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile in a parent dir was being picked up.
  turbopack: { root: __dirname },
};

export default nextConfig;
