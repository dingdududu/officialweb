
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://firstweb-black.vercel.app';
  const currentDate = new Date().toISOString();
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FirstWeb Business - Latest Updates</title>
    <description>Stay updated with our latest business insights, services, and industry news. Professional business solutions and expert advice.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <generator>Next.js RSS Generator</generator>
    <managingEditor>lyn668@gmail.com (FirstWeb Business)</managingEditor>
    <webMaster>lyn668@gmail.com (FirstWeb Business)</webMaster>
    <image>
      <url>${baseUrl}/images/logo.png</url>
      <title>FirstWeb Business</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
    
    <item>
      <title>Professional Business Services - Transform Your Business</title>
      <description><![CDATA[Discover our comprehensive range of professional business services designed to help your company grow and succeed in today's competitive market. From consulting to digital solutions, we've got you covered.]]></description>
      <link>${baseUrl}/services</link>
      <guid isPermaLink="true">${baseUrl}/services</guid>
      <pubDate>${currentDate}</pubDate>
      <author>lyn668@gmail.com (FirstWeb Business)</author>
      <category>Business Services</category>
    </item>
    
    <item>
      <title>Featured Products - Innovation for Your Success</title>
      <description><![CDATA[Explore our latest products and cutting-edge solutions tailored for modern business needs. Each product is designed with quality and efficiency in mind to drive your business forward.]]></description>
      <link>${baseUrl}/products</link>
      <guid isPermaLink="true">${baseUrl}/products</guid>
      <pubDate>${new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()}</pubDate>
      <author>lyn668@gmail.com (FirstWeb Business)</author>
      <category>Products</category>
    </item>
    
    <item>
      <title>About FirstWeb - Your Trusted Business Partner</title>
      <description><![CDATA[Learn about our mission, vision, and the experienced team behind FirstWeb Business. Discover how we've been helping businesses achieve their goals through innovative solutions and exceptional service.]]></description>
      <link>${baseUrl}/about</link>
      <guid isPermaLink="true">${baseUrl}/about</guid>
      <pubDate>${new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()}</pubDate>
      <author>lyn668@gmail.com (FirstWeb Business)</author>
      <category>Company</category>
    </item>
    
    <item>
      <title>Frequently Asked Questions - Quick Answers</title>
      <description><![CDATA[Get instant answers to the most common questions about our services, pricing, and processes. Our comprehensive FAQ section helps you understand how we can best serve your business needs.]]></description>
      <link>${baseUrl}/faqs</link>
      <guid isPermaLink="true">${baseUrl}/faqs</guid>
      <pubDate>${new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()}</pubDate>
      <author>lyn668@gmail.com (FirstWeb Business)</author>
      <category>Support</category>
    </item>
    
    <item>
      <title>Contact Us - Let's Start Your Success Journey</title>
      <description><![CDATA[Ready to take your business to the next level? Contact our expert team today for a free consultation. We're here to understand your needs and provide customized solutions that drive results.]]></description>
      <link>${baseUrl}/contact</link>
      <guid isPermaLink="true">${baseUrl}/contact</guid>
      <pubDate>${new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()}</pubDate>
      <author>lyn668@gmail.com (FirstWeb Business)</author>
      <category>Contact</category>
    </item>
    
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}