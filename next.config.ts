import type { NextConfig } from "next";

const withPWA = require("next-pwa");

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/notes",
        permanent: true,
      },
    ];
  },
};

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  ...nextConfig,
});
