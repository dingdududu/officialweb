import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/admin/', '/.well-known/'],
    },
    sitemap: 'https://firstweb-black.vercel.app/sitemap.xml',
  }
}