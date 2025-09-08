import { products } from '@/data/products';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://apparelstockhub.com';

  // 静态页面
  const staticPages = [
    `${baseUrl}/`,
    `${baseUrl}/about`,
    `${baseUrl}/products`,
    `${baseUrl}/contact`,
    `${baseUrl}/faqs`,
  ];

  // 动态产品页面
  const productPages = products.map((product) => `${baseUrl}/products/${product.slug}`);

  const urls = [...staticPages, ...productPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => `  <url><loc>${url}</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod></url>`) 
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
