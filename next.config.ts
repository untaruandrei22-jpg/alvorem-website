import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: false,
      },
      {
        source: "/careers",
        destination: "/",
        permanent: false,
      },
      {
        source: "/pricing",
        destination: "/",
        permanent: false,
      },
      {
        source: "/solutions",
        destination: "/",
        permanent: false,
      },
      {
        source: "/work",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
