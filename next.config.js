/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    imageSizes: [100, 200, 300, 400, 500],
    deviceSizes: [580, 1024, 1284, 1400, 1600, 1800],
    domains: ['res.cloudinary.com', 'dn5hzapyfrpio.cloudfront.net'],
  },
};

module.exports = nextConfig;
