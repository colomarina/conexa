import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        port: '',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
  // Esta es la configuración recomendada para CSS Modules
  cssModules: true,
  cssLoaderOptions: {
    modules: {
      namedExport: false,
    },
  },
};

export default nextConfig;
