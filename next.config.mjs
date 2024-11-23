/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.daisyui.com',
      },
    ],

    localPatterns: [
      {
        pathname: '/public/logo/**',
        pathname: '/public/image/**',
        search: '',
      }
    ]
  },
  
};

export default nextConfig;
