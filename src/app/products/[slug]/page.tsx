"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductSlider from "@/app/components/ProductSlider";
import { products } from "@/data/products";

type Props = {
  params: { slug: string };
};

export default function ProductDetail({ params }: Props) {
  const { slug } = params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return <div className="text-center py-20">Cant find product</div>;
  const getEmbedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("embed/")) return url;
  const match = url.match(/v=([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

 return (
  <div className="flex flex-col min-h-screen pt-[85px] max-w-[1200px] mx-auto px-4 pb-20">
    <div className="flex flex-col md:flex-row gap-24 mt-8 items-start">
      {/* 左侧轮播 */}
      <div className="flex-shrink-0" style={{ width: 650 }}>
        <ProductSlider
          images={product.images}
          alt={product.name}
          title={product.name}
        />
      </div>
      {/* 右侧文字区域 */}
      <div className="flex-1 flex flex-col gap-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {product.name}
        </h1>
        <div className="text-2xl text-[#f5a623] font-semibold">
          {product.price}
        </div>
        <div className="text-base text-gray-700 leading-relaxed">
          {product.description}
        </div>
        {/* 产品规格列表 */}
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          {product.specs.map((spec, idx) => (
            <li key={idx}>{spec}</li>
          ))}
        </ul>
      </div>
    </div>
    {/* Product Details 标题和横线 */}
    <div className="mt-10">
      <div className="flex justify-center mt-10">
        <span className="text-xl font-semibold text-gray-800">Product Details</span>
      </div>
      <hr className="border-gray-200 mb-8" />
      {/* 居中视频 */}
      <div className="flex justify-center">
        <div className="aspect-video max-w-2xl w-full rounded overflow-hidden bg-black mt-10 mb-8">
          <iframe
            src={getEmbedUrl(product.videoUrl) || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
            title="Product Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
);
}