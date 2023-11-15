/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'dn5hzapyfrpio.cloudfront.net'],
  },
};

module.exports = nextConfig;
