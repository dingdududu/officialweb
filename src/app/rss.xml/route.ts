import { NextResponse } from 'next/server';

export async function GET() {
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>FirstWeb Business</title>
    <description>Latest business updates</description>
    <link>https://firstweb-black.vercel.app</link>
    
    <item>
      <title>Our Services</title>
      <description>Professional business services</description>
      <link>https://firstweb-black.vercel.app/services</link>
      <pubDate>2025-01-20T12:00:00.000Z</pubDate>
    </item>
    
    <item>
      <title>Our Products</title>
      <description>Quality business products</description>
      <link>https://firstweb-black.vercel.app/products</link>
      <pubDate>2025-01-19T12:00:00.000Z</pubDate>
    </item>
    
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}