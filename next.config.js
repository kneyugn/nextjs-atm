/** @type {import('next').NextConfig} */
const nextConfig = {
  generateEtags: false,
  experimental: {
    instrumentationHook: true,
  },
};

module.exports = nextConfig;
