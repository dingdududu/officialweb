import TikTokEmbed from "../components/TikTokEmbed";
import metadataJson from "@/data/metadata.json";
import type { Metadata } from "next";

interface CustomOpenGraph {
  title?: string;
  description?: string;
  url?: string;
  type?: string;
  images?: Array<{ url: string; width?: number; height?: number }>;
  site_name?: string;
}

interface OrganizationJsonLd {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  logo: string;
}

type CustomMetadata = Metadata & {
  openGraph?: CustomOpenGraph;
  jsonLd?: OrganizationJsonLd;
};

export const metadata: CustomMetadata = {
  metadataBase: new URL(metadataJson.baseUrl),
  title: metadataJson.services.title,
  description: metadataJson.services.description,
  keywords: metadataJson.services.keywords,
  robots: "index, follow",
  openGraph: {
    title: metadataJson.services.ogTitle,
    description: metadataJson.services.ogDescription,
    url: metadataJson.services.url,
    images: [
      {
        url: metadataJson.services.ogImage,
        width: 800,
        height: 600,
      },
    ],
    type: "website",
    site_name: metadataJson.siteName,
  },
  alternates: {
    canonical: metadataJson.services.url,
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: metadataJson.siteName,
    description: metadataJson.services.description,
    url: metadataJson.services.url,
    logo: `${metadataJson.services.url}/images/logo.png`,
  },
};

export default function Services() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadata.jsonLd),
        }}
      />

      {/* ✅ 改进容器布局 */}
      <div className="flex flex-col min-h-screen pt-16 sm:pt-20 md:pt-24">
        <div className="max-w-4xl mx-auto w-full py-8">
          {/* 标题区域 - 增加左右间距 */}
          <div className="px-6 sm:px-8 lg:px-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center leading-tight">
              Services
            </h1>
          </div>

          {/* 文字内容区域 - 增加左右间距 */}
          <div className="px-6 sm:px-8 lg:px-12 text-base sm:text-lg">
            <p
              className="mt-8 mb-4 leading-relaxed"
              style={{ textIndent: "2em" }}
            >
              Sydney is the largest city in Australia. It is world-renowned for
              its landmarks such as the Opera House and Sydney Harbour Bridge,
              its beautiful harbor, and its vast range of entertainment and fine
              dining. 40 things to do in Sydney sounds like a lot, and it is,
              but there are many more places we could have added to this list.
              <br />
              <br />
              In a single day you have the option to surf at one of the greatest
              beaches in the world, learn about Sydney's vibrant culture both on
              land and at sea, and enjoy a show at the Opera House.
            </p>
          </div>

          {/* YouTube 视频区域 - 保持较小的左右间距 */}
          <div className="mt-8 px-4 sm:px-6">
            <div className="flex justify-center">
              <div className="w-full aspect-video max-w-[600px] sm:max-w-[700px] lg:max-w-[800px]">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
                  title="Services Overview Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* 分隔线 - 增加左右间距 */}
          <div className="px-6 sm:px-8 lg:px-12">
            <hr className="my-8 border-t border-gray-300" />
          </div>

          {/* 第二段文字 - 增加左右间距 */}
          <div className="px-6 sm:px-8 lg:px-12 text-base sm:text-lg">
            <p
              className="mt-8 mb-4 leading-relaxed"
              style={{ textIndent: "2em" }}
            >
              NVIDIA Blackwell includes NVIDIA Confidential Computing, which
              protects sensitive data and AI models from unauthorized access
              with strong hardware-based security. NVIDIA Blackwell is the first
              TEE-I/O capable GPU in the industry, while providing the most
              performant confidential compute solution with TEE-I/O capable
              hosts and inline protection over NVIDIA NVLink™. NVIDIA Blackwell
              Confidential Computing delivers nearly identical throughput
              performance compared to unencrypted modes. Enterprises can now
              secure even the largest models in a performant way, in addition to
              protecting AI intellectual property (IP) and securely enabling
              confidential AI training, inference, and federated learning.
            </p>
          </div>

          {/* ✅ 静态 TikTok 链接（服务端渲染友好） */}
          {/* <div className="mt-8 px-4 sm:px-6">
            <div className="flex justify-center">
              <div className="w-full max-w-[350px] sm:max-w-[400px] lg:max-w-[500px]">
                <a 
                  href="https://www.tiktok.com/@la259_/video/7508781238694546696" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block aspect-[9/16] bg-gradient-to-br from-pink-400 to-purple-600 rounded-lg overflow-hidden shadow-lg relative group hover:scale-105 transition-transform"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                    <div className="text-5xl mb-4">📱</div>
                    <div className="text-center">
                      <div className="text-lg font-bold mb-2">@la259_</div>
                      <div className="text-sm opacity-90 mb-3">Services showcase video</div>
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                        点击观看 TikTok 视频
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div> */}
          <TikTokEmbed
            videoId="7508781238694546696"
            username="la259_"
            description="Professional services showcase"
            // coverImage="/images/tiktok-cover.jpg" // 可选：如果你有封面图片
          />
        </div>
      </div>
    </>
  );
}
