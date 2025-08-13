import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const env = process.env.NODE_ENV
  const publicEnv = process.env.NEXT_PUBLIC_ENV || ''
  const host = process.env.NEXT_PUBLIC_HOST || '' // 你可以在环境变量里设置当前访问域名

  const baseUrl =
    env === 'development'
      ? 'http://localhost:3000'
      : host
      ? `https://${host}`
      : 'https://apparelstockhub.com'

  // 预发布环境判断：NEXT_PUBLIC_ENV=staging 或域名包含 "staging"
  const isStaging = publicEnv === 'staging' || host.includes('staging')

  if (env === 'development') {
    // 本地开发，允许全部抓取
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
          disallow: [],
        },
      ],
      sitemap: `${baseUrl}/sitemap.xml`,
    }
  } else if (isStaging) {
    // 预发布环境，禁止抓取
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
      sitemap: `${baseUrl}/sitemap.xml`,
    }
  } else {
    // 生产环境，正常放行，屏蔽敏感路径
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/api/', '/_next/', '/admin/', '/.well-known/'],
        },
      ],
      sitemap: `${baseUrl}/sitemap.xml`,
    }
  }
}
