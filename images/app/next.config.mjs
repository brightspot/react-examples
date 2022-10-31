/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GRAPHQL_CLIENT_ID: '000001842a2bd8c4afa5afeb7d1d0000',
    GRAPHQL_CLIENT_SECRET: 'd0L1yBNNplbxKKQTfQXfJFC3bMpVUy2bTernZIG',
    GRAPHQL_URL: 'http://localhost/graphql/delivery/images',
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        // pathname: '/image/upload/**',
      },
    ],
  },
}

export default nextConfig
