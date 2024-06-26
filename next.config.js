/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
    unoptimized: false,
  },
  // pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js']
};

module.exports = nextConfig;
