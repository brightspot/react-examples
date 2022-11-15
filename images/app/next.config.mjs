/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  swcMinify: true,
  env: {
    GRAPHQL_URL: 'http://localhost/graphql/delivery/images',
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
      },
    ],
  },
}

export default nextConfig
