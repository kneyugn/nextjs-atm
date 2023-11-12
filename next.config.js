/** @type {import('next').NextConfig} */
const nextConfig = {
  generateEtags: false,
  experimental: {
    instrumentationHook: true,
  },
  output: 'standalone'
};

module.exports = nextConfig;
