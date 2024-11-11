import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["v5.airtableusercontent.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,  // якщо також хочете ігнорувати помилки ESLint
  },
};

export default nextConfig;
