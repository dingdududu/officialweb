import Link from "next/link";
export const metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: "首页 - 你的商务推广网站",
  description: "这里是你的公司/产品/服务简介，利于SEO收录。",
  openGraph: {
    title: "首页 - 你的商务推广网站",
    description: "这里是你的公司/产品/服务简介。",
    images: [
      {
        url: "/images/og-image.jpg", // 你的分享图路径
        width: 800,                  // w
        height: 600,                 // h
      },
    ],
  },
};


import { products } from "@/data/products";

export default function Products() {
  return (
    <div className="flex flex-col min-h-screen pt-[85px]">
  <div className="max-w-[1400px] mx-auto w-full px-6">
    <h1 className="text-3xl font-bold mb-8 text-center pt-20">热销产品</h1>
    {/* 产品网格 */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center  group">
    {/* 图片区域，无圆角，有阴影，有动效 */}
    <Link href={`/products/${product.slug}`} className="w-full">
    <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden shadow-sm">
      <img
        src={product.productImage}
        alt={product.name}
        className="w-full h-full object-contain group-hover:scale-105 transition cursor-pointer"
      />
    </div>
    </Link>
    {/* 产品名和价钱区域，宽度与图片一致，无圆角无动效 */}
    <div className="w-full mt-[5px] p-4 flex flex-col items-center">
      <div className="font-medium text-base mb-1">{product.name}</div>
      <div className="text-pink-600 font-bold text-lg">{product.price}</div>
    </div>
  </div>

))}
        </div>
      </div>
    </div>
  );
}