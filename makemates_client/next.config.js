/** @type {import('next').NextConfig} */
// (https://placehold.co/400x400?text=Image)

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

module.exports = nextConfig;
