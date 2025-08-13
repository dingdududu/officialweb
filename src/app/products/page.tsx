import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import metadataJson from "@/data/metadata.json";
import type { Metadata } from "next";

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
  };
  siteName: string;
}

const metadataJsonTyped: MetadataJson = metadataJson;

export const metadata: Metadata = {
  metadataBase: new URL(metadataJsonTyped.baseUrl),
  title: metadataJsonTyped.products.title,
  description: metadataJsonTyped.products.description,
  keywords: metadataJsonTyped.products.keywords,
  robots: "index, follow",
  openGraph: {
    title: metadataJsonTyped.products.ogTitle,
    description: metadataJsonTyped.products.ogDescription,
    url: `${metadataJsonTyped.baseUrl}/products`,
    images: [
      {
        url: `${metadataJsonTyped.baseUrl}${metadataJsonTyped.products.ogImage}`,
        width: 800,
        height: 600,
      },
    ],
    type: "website",
    siteName: metadataJsonTyped.siteName,
  },
  alternates: {
    canonical: `${metadataJsonTyped.baseUrl}/products`,
  },
};

export default function Products() {
  return (
    <>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "热销产品",
            description: metadataJsonTyped.products.description,
            url: `${metadataJsonTyped.baseUrl}/products`,
          }),
        }}
      />

      <main className="flex flex-col min-h-screen pt-16 sm:pt-20 md:pt-24">
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center pt-12 sm:pt-16 md:pt-20">
            热销产品
          </h1>

          {/* 产品网格 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 pb-8 sm:pb-12">
            {products.map((product) => (
              <article
                key={product.id}
                className="flex flex-col items-center group"
              >
                {/* 图片区域，无圆角，有阴影，有动效 */}
                <Link
                  href={`/products/${product.slug}`}
                  className="w-full"
                  aria-label={`查看${product.name}详情`}
                >
                  <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden shadow-sm">
                    <Image
                      src={product.productImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-contain group-hover:scale-105 transition cursor-pointer"
                      loading="lazy"
                      quality={85}
                    />
                  </div>
                </Link>

                {/* 产品名和价钱区域，宽度与图片一致，无圆角无动效 */}
                <div className="w-full mt-[5px] p-3 sm:p-4 flex flex-col items-center">
                  <h2 className="font-medium text-sm sm:text-base mb-1 leading-tight h-8 sm:h-10 flex items-center w-full justify-center">
                    <span
                      className="w-full overflow-hidden px-2"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        textAlign: product.name.length > 25 ? "left" : "center", // 根据长度判断
                      }}
                    >
                      {product.name}
                    </span>
                  </h2>
                  <div className="text-pink-600 font-bold text-base sm:text-lg">
                    {product.price}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
