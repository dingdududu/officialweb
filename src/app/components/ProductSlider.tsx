"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { socialLinks } from "./socialLinks";

const Slider = dynamic(() => import("react-slick").then((mod) => mod.default), {
  ssr: false,
}) as React.FC<any>;

type Props = {
  images: string[];
  alt: string;
  title: string;
};

export default function ProductSlider({ images, alt, title }: Props) {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<any>(null);
  const sliderSocials = socialLinks.filter((link) =>
    ["X", "Instagram", "WhatsApp","Signal", "Pinterest", "Facebook"].includes(link.label)
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: false,
    afterChange: (idx: number) => setCurrent(idx),
  };

  const currentImgUrl = images[current];

  // 这里的产品图片这个文字等上线后可以用网址替换
  const shareTitle = title || "产品图片";

  return (
    <div className="relative" style={{ width: 650, height: 500 }}>
      {/* 左箭头 */}
      <button
        className="absolute left-[-12px] top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-3 hover:bg-gray-100 z-10"
        onClick={() => sliderRef.current?.slickPrev()}
        aria-label="last slide"
        type="button"
        style={{ left: -12 }}
      >
        <FaChevronLeft size={24} />
      </button>
      {/* 轮播图 */}
      <Slider ref={sliderRef} {...settings}>
        {images.map((img, idx) => (
          <div
            key={idx}
            className="flex justify-center items-center w-full h-full"
          >
            <img
              src={img}
              alt={alt}
              className="object-contain mx-auto"
              style={{
                maxWidth: 650,
                maxHeight: 500,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        ))}
      </Slider>
      {/* 右箭头 */}
      <button
        className="absolute right-[-12px] top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-3 hover:bg-gray-100 z-10"
        onClick={() => sliderRef.current?.slickNext()}
        aria-label="next slide"
        type="button"
        style={{ right: -12 }}
      >
        <FaChevronRight size={24} />
      </button>
        {/* 这下面是轮播下的社媒分享图标 */}
      <div className="flex gap-4 justify-center mt-10">
        {sliderSocials.map((link) => (
          <a
            key={link.label}
            href={link.getHref(currentImgUrl, shareTitle)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
          >
            <img
              src={link.icon}
              alt={link.label}
              className="w-5 h-5"
              style={{ display: "block" }}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
