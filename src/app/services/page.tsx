// 导入 metadata.json，路径根据项目结构调整
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
  metadataBase: new URL(metadataJson.services.url), 
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
        url: `${metadataJson.services.url}${metadataJson.services.ogImage}`,
        width: 800, // 假设宽度
        height: 600, // 假设高度
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
    logo: `${metadataJson.services.url}/images/logo.png`, // 假设 logo 路径

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
    <div className="flex flex-col min-h-screen pt-16 sm:pt-20 md:pt-24 max-w-[800px] mx-auto text-base sm:text-lg py-8 px-4">
      <h1 className="text-3xl font-bold mb-4  text-center">Services</h1>
      <p className="mt-8 mb-4" style={{ textIndent: "2em" }}>
        Sydney is the largest city in Australia. It is world-renowned for its landmarks such as the Opera House and Sydney Harbour Bridge, its beautiful harbor, and its vast range of entertainment and fine dining. 40 things to do in Sydney sounds like a lot, and it is, but there are many more places we could have added to this list.
        <br /><br />
        In a single day you have the option to surf at one of the greatest beaches in the world, learn about Sydney’s vibrant culture both on land and at sea, and enjoy a show at the Opera House.
      </p>
      {/* 视频封面区域 */}
      <div className="mt-8 flex flex-col items-center">
  <div className="w-full aspect-video max-w-[600px] sm:max-w-[800px]">
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      title="Services Overview Video" // 提升可访问性
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full rounded-lg shadow-lg"
    ></iframe>
  </div>
</div>
    {/* 横线分隔 */}
    <hr className="my-8 border-t border-gray-300" />
    {/* 第二段文字模块 */}
      <p className="mt-16 mb-4" style={{ textIndent: "2em" }}>
        NVIDIA Blackwell includes NVIDIA Confidential Computing, which protects sensitive data and AI models from unauthorized access with strong hardware-based security. NVIDIA Blackwell is the first TEE-I/O capable GPU in the industry, while providing the most performant confidential compute solution with TEE-I/O capable hosts and inline protection over  NVIDIA NVLink™. NVIDIA Blackwell Confidential Computing delivers nearly identical throughput performance compared to unencrypted modes. Enterprises can now secure even the largest models in a performant way, in addition to protecting AI intellectual property (IP) and securely enabling confidential AI training, inference, and federated learning.
      </p>
      {/* TikTok 视频模块 */}
      <div className="mt-8 flex flex-col items-center">
        <div className="w-full aspect-video max-w-[800px]">
          <iframe
            width="100%"
            height="100%"
            src="https://www.tiktok.com/embed/v2/你的视频ID"
            title="Services TikTok Video" // 提升可访问性
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>
    </div>
    </>
  );
}