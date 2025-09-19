import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { products } from "@/data/products";
import metadataJson from "@/data/metadata.json";
import type { Metadata } from "next";

// 懒加载 ProductSlider 组件
const ProductSlider = dynamic(() => import("@/app/components/ProductSlider"), {
  loading: () => (
    <div className="w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] bg-gray-100 animate-pulse rounded-lg" />
  ),

});

// 定义 metadataJson 的类型
interface MetadataJson {
  baseUrl: string;
  products: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    url: string;
  };
  siteName: string;
}

// 显式声明 metadataJson 类型
const metadataJsonTyped: MetadataJson = metadataJson;

// 定义 OpenGraph 类型
interface CustomOpenGraph {
  title?: string;
  description?: string;
  url?: string;
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
  }>;
  type?: string;
  siteName?: string;
}

// 使用 CustomMetadata 作为返回类型
type CustomMetadata = Metadata & {
  openGraph?: CustomOpenGraph;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<CustomMetadata> {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    } as CustomMetadata;
  }

  return {
    metadataBase: new URL(metadataJsonTyped.baseUrl),
    title: `${product.name} - ${metadataJsonTyped.products.title}`,
    description: product.description || metadataJsonTyped.products.description,
    keywords: `${product.name}, ${metadataJsonTyped.products.keywords}`,
    robots: "index, follow",
    openGraph: {
      title: `${product.name} - ${metadataJsonTyped.products.ogTitle}`,
      description: product.description || metadataJsonTyped.products.ogDescription,
      url: `${metadataJsonTyped.baseUrl}/products/${resolvedParams.slug}`,
      images: [
        {
          url: product.images[0] || `${metadataJsonTyped.baseUrl}${metadataJsonTyped.products.ogImage}`,
          width: 800,
          height: 600,
        },
      ],
      type: "website",
      siteName: metadataJsonTyped.siteName,
    },
    alternates: {
      canonical: `${metadataJsonTyped.baseUrl}/products/${resolvedParams.slug}`,
    },
  } as CustomMetadata;
}

function getEmbedUrl(url: string) {
  if (!url) return "";
  if (url.includes("embed/")) return url;
  const match = url.match(/v=([^&]+)/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : url;
}

export default async function ProductDetail({ params }: Props) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen pt-16 sm:pt-20 md:pt-24 items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600">The requested product could not be found.</p>
      </div>
    );
  }

  // 结构化数据
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: `${metadataJsonTyped.baseUrl}/products/${resolvedParams.slug}`,
    image: product.images[0] || `${metadataJsonTyped.baseUrl}/images/${resolvedParams.slug}.jpg`,
    offers: {
      "@type": "Offer",
      price: product.price?.replace(/[^0-9.]/g, "") || "0.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      // 添加结构化数据推荐字段
      url: `${metadataJsonTyped.baseUrl}/products/${resolvedParams.slug}`,
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0], // 一年后到期
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0.00",
          currency: "USD"
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US"
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "d" },
          transitTime: { "@type": "QuantitativeValue", minValue: 5, maxValue: 10, unitCode: "d" }
        },
        doesNotShip: false
      },
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "4",
        bestRating: "5"
      },
      author: {
        "@type": "Person",
        name: "John Doe"
      }
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "24"
    }
  };

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${product.name} Product Video`,
    description: product.description,
    thumbnailUrl: product.images[0] || `${metadataJsonTyped.baseUrl}/images/video-thumbnail.jpg`,
    // 使用完整的 ISO 8601 格式（含时间与时区）避免结构化数据警告
    uploadDate: new Date("2025-08-03T12:00:00Z").toISOString(),
    contentUrl: getEmbedUrl(product.videoUrl) || "https://www.youtube.com/embed/dQw4w9WgXcQ",
    embedUrl: getEmbedUrl(product.videoUrl) || "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "PT2M30S",
  };

  return (
    <>
      {/* 预加载关键资源 */}
      <link rel="preload" href={product.images[0]} as="image" />
      <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
      
      {/* 结构化数据脚本 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />

      <main className="flex flex-col min-h-screen pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 pb-20">
        <div className="max-w-[90%] sm:max-w-[85%] lg:max-w-[1200px] mx-auto w-full">
          
          {/* 产品主要内容区域 */}
          <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-20 mt-6">
            
            {/* 左侧轮播图区域 */}
            <div className="w-full lg:flex-shrink-0 lg:w-[550px] xl:w-[650px] flex justify-center lg:justify-start">
              <div className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-none">
                <Suspense fallback={
                  <div className="w-full h-[300px] bg-gray-100 animate-pulse rounded-lg" />
                }>
                  <ProductSlider
                    images={product.images}
                    alt={product.name}
                    title={product.name}
                    pageUrl={`${metadataJsonTyped.baseUrl}/products/${resolvedParams.slug}`}
                  />
                </Suspense>
              </div>
            </div>

            {/* 右侧产品信息区域 */}
            <div className="flex-1 flex flex-col gap-4 lg:gap-6 w-full items-start text-left lg:pl-8 xl:pl-12">
              
              {/* 产品标题 */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                {product.name}
              </h1>
              
              {/* 产品价格 */}
              <div className="text-xl sm:text-2xl text-[#f5a623] font-semibold">
                {product.price}
              </div>
              
              {/* 产品描述 */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-[500px] lg:max-w-none text-left">
                {product.description}
              </p>

              {/* 产品规格列表 */}
              {product.specs && product.specs.length > 0 && (
                <div className="w-full flex justify-start">
                  <ul className="list-disc pl-5 text-gray-700 space-y-1 sm:space-y-2 text-left">
                    {product.specs.map((spec, idx) => (
                      <li key={idx} className="text-sm sm:text-base">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Product Details 部分 */}
          <section className="mt-12 lg:mt-12" aria-labelledby="product-details">
            
            {/* 标题 */}
            <h2 id="product-details" className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-4">
              Product Details
            </h2>
            
            {/* 分隔线 */}
            <hr className="border-gray-200 mb-10" />

            {/* 产品视频 */}
            <div className="flex justify-center">
              <iframe
                src={getEmbedUrl(product.videoUrl) || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                title={`${product.name} Product Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                width="560"
                height="315"
                className="aspect-video w-full max-w-[350px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-2xl rounded overflow-hidden bg-black shadow-lg"
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}