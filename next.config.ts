// @ts-nocheck
/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  
  },

  async redirects() {
    // 开发环境不启用重定向，避免图片优化 400
    if (process.env.NODE_ENV === 'development') {
      return [];
    }

    // 生产环境启用 HTTP -> HTTPS 重定向，但排除 _next 路径
    return [
      {
        source: '/llms.txt',
        destination: '/api/llms.txt',
        permanent: true,
      },
      {
        source: '/((?!_next).*)',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://apparelstockhub.com/:path*',
        permanent: true,
      },
      // www 域名跳转到主域名
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.apparelstockhub.com',
          },
        ],
        destination: 'https://apparelstockhub.com/:path*',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
