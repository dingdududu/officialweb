"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { socialLinks } from "./socialLinks";

const Slider = dynamic(() => import("react-slick").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] bg-gray-100 animate-pulse rounded-lg" />
  ),
}) as React.FC<any>;

type Props = {
  images: string[];
  alt: string;
  title: string;
  pageUrl: string; // 新增参数
};

export default function ProductSlider({ images, alt, title, pageUrl }: Props) {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<any>(null);
  const [iconSize, setIconSize] = useState(16);
  const sliderSocials = socialLinks.filter((link) =>
    ["X", "Instagram", "WhatsApp", "Signal", "Pinterest", "Facebook"].includes(link.label)
  );

  useEffect(() => {
    const handleResize = () => setIconSize(window.innerWidth >= 640 ? 24 : 16);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: images.length > 1,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: false,
    lazyLoad: "ondemand" as const,
    afterChange: (idx: number) => setCurrent(idx),
    appendDots: (dots: React.ReactNode[]) => (
      <div style={{ marginTop: "8px", marginBottom: "12px" }}>
        <ul style={{ margin: "0", padding: "0" }}>{dots}</ul>
      </div>
    ),
    customPaging: () => <div className="custom-dot bg-gray-300 w-2 h-2 rounded-full"></div>,
  };

  const currentImgUrl = images[current];
  const shareTitle = `${title} - ${pageUrl}`;

  return (
    <div className="w-full max-w-[300px] xs:max-w-[320px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[550px] xl:max-w-[650px] mx-auto">
      <div className="relative">
        {images.length > 1 && (
          <button
            className="absolute top-1/2 -translate-y-1/2 -left-10 sm:-left-12 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 hover:shadow-md transition-all z-20 hidden sm:block"
            onClick={() => sliderRef.current?.slickPrev()}
            aria-label="Previous slide"
          >
            <FaChevronLeft size={iconSize} className="text-gray-700" />
          </button>
        )}
        <Slider ref={sliderRef} className="slick-slider-custom">
          {images.map((img, idx) => (
            <div key={idx} className="outline-none">
              <div className="relative w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] overflow-hidden">
                <Image
                  src={img}
                  alt={`${alt} - Image ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 320px) 300px, (max-width: 640px) 400px, (max-width: 1024px) 450px, 650px"
                  priority={idx === 0}
                  quality={85}
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </div>
            </div>
          ))}
        </Slider>
        {images.length > 1 && (
          <button
            className="absolute top-1/2 -translate-y-1/2 -right-10 sm:-right-12 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 hover:shadow-md transition-all z-20 hidden sm:block"
            onClick={() => sliderRef.current?.slickNext()}
            aria-label="Next slide"
          >
            <FaChevronRight size={iconSize} className="text-gray-700" />
          </button>
        )}
      </div>
      <div className="w-full flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
        {sliderSocials.map((link) => (
          <a
            key={link.label}
            href={link.getHref(currentImgUrl, shareTitle)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.label}`}
            className="hover:scale-110 transition-transform"
          >
            <Image
              src={link.icon}
              alt={`${link.label} icon`}
              width={32}
              height={32}
              className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8"
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </div>
  );
}