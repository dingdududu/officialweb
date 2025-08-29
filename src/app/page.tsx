import metadataJson from "../data/metadata.json";
import type { Metadata } from "next";
import Image from "next/image";

interface CustomOpenGraph {
  title?: string;
  description?: string;
  url?: string;
  type?: string;
  images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
  site_name?: string; 
}

// 自定义 Script 类型
interface CustomScript {
  type: string;
  innerHTML: string;
}

interface CustomMetadata extends Omit<Metadata, 'other'> {
  other?: {
    script?: CustomScript;
  };
  twitter?: {
    card?: string;
    site?: string;
    title?: string;
    description?: string;
    images?: string[];
    creator?: string;
  };
}

export async function generateMetadata(): Promise<CustomMetadata> {
  const pageData = metadataJson.home;
  return {
    metadataBase: new URL(pageData.url),
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    robots: "index, follow",
    openGraph: {
      title: pageData.ogTitle,
      description: pageData.ogDescription,
      url: pageData.url,
      type: "website",
      images: [
        {
          url: `${metadataJson.baseUrl}${pageData.ogImage}`,
          width: 1200,
          height: 630,
          alt: pageData.ogTitle,
        },
      ],
      site_name: metadataJson.siteName || "Apparel Stock Hub",
    } as CustomOpenGraph,
    twitter: {
      card: "summary_large_image",
      title: pageData.ogTitle,
      description: pageData.ogDescription,
      images: [`${metadataJson.baseUrl}${pageData.ogImage}`],
      creator: "@apparelstockhub",
    },
    alternates: {
      canonical: pageData.url,
    },
    other: {
      script: {
        type: "application/ld+json",
        innerHTML: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: metadataJson.siteName,
            url: pageData.url,
            logo: `${pageData.url}/images/logo.png`,
            sameAs: [
              `${pageData.url}`
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "Ready-Stock Apparel Catalog",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Product", name: "Jeans (Men/Women)" } },
              { "@type": "Offer", itemOffered: { "@type": "Product", name: "T-shirts & Tops" } },
              { "@type": "Offer", itemOffered: { "@type": "Product", name: "Jackets & Outerwear" } },
              { "@type": "Offer", itemOffered: { "@type": "Product", name: "Kidswear" } },
              { "@type": "Offer", itemOffered: { "@type": "Product", name: "Shoes & Accessories" } }
            ],
          },
        ]),
      },
    },
  };
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: metadataJson.siteName,
            description: metadataJson.home.description,
            url: metadataJson.home.url,
            image: `${metadataJson.home.url}${metadataJson.home.ogImage}`,
          }),
        }}
      />
    <div className="flex flex-col gap-8">
      {/* 首页大图区域 */}
      <section
        className="relative h-[300px] sm:h-[400px] lg:h-[500px] flex items-center pt-2 sm:pt-4 lg:pt-6 overflow-hidden"
        // aria-label内容要根据实际情况更改
        aria-label="Inflight Entertainment Hero Section"
      >
        <picture>
          <source srcSet="/images/hero.avif" type="image/avif" />
          <source srcSet="/images/hero.webp" type="image/webp" />
          <Image
            src="/images/hero-optimized.png"
            alt="Inflight Entertainment Hero"
            fill
            className="object-cover"
            priority
            quality={85}
          />
        </picture>
        <div className="flex flex-col items-start ml-4 sm:ml-16 lg:ml-60 p-4 relative z-10">
          <h1 className="font-bold text-white text-xl sm:text-3xl lg:text-4xl mb-2 leading-tight">
            Genuine sources<br />where value begins
          </h1>
          <h2 className="text-white text-sm sm:text-base lg:text-lg leading-relaxed w-full sm:w-[320px] lg:w-[400px] ">
            We offer a wide range of authentic clothing at unbeatable prices, ensuring that you can find exactly what you need. Quality, variety, and affordability—everything you’re looking for, all in one place.
          </h2>
        </div>
      </section>

      {/* 首页下方内容 */}
      
      <div className="max-w-[100%] sm:max-w-[600px] lg:max-w-[800px] mx-auto text-left p-4 mb-4">
  <h2 className="text-lg sm:text-xl font-bold mb-2" aria-label="Manufacturing">
    Manufacturing
  </h2>
  <p>
    In our craft, mastery comes from dedication. We believe that excellence in manufacturing demands precision, patience, and an unwavering commitment to every detail. From fabric selection to final stitching, we uphold a spirit of craftsmanship that ensures every garment meets the highest standards.
  </p>
  <h2 className="text-lg sm:text-xl font-bold mb-2 mt-6" aria-label="Trading">
    Trading
  </h2>
  <p>
    Trust is the foundation of our business. We believe that lasting partnerships are built on honesty, reliability, and a genuine understanding of our clients’ needs. By offering a wide variety of styles at competitive prices, we ensure that our customers can source with confidence, knowing they are getting both value and peace of mind.
  </p>
</div>
    </div>
    </>
  );
}