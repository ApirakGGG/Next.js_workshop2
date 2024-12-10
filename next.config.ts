import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    WEATHER_API: process.env.WEATHER_API,
  },
};

export default nextConfig;
