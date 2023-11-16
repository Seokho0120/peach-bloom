/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'dn5hzapyfrpio.cloudfront.net'],
  },
};

module.exports = nextConfig;
