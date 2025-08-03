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
  metadataBase: new URL(metadataJson.baseUrl), 
  title: metadataJson.about.title, // 直接使用 about.title
  description: metadataJson.about.description,
  keywords: metadataJson.about.keywords,
  robots: "index, follow", // 手动添加，metadata.json 无此字段
  openGraph: {
    title: metadataJson.about.ogTitle,
    description: metadataJson.about.ogDescription,
    url: metadataJson.about.url,
    images: [
      {
        url: metadataJson.about.ogImage,
        width: 800, // 假设宽度
        height: 600, // 假设高度
      },
    ],
    type: "website",
    site_name: metadataJson.siteName , 
  }, 
  alternates: {
    canonical:metadataJson.about.url, // 使用 about 的 url 作为规范链接
  },

  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: metadataJson.siteName,
    description: metadataJson.about.description,
    url: metadataJson.baseUrl,
    logo: `${metadataJson.baseUrl}/images/logo.png`, // 假设 logo 路径

  } , 
};

export default function About() {

  return (
    <>
    
      <script
  type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadata.jsonLd),
        }}
      />
    
    <div className="flex flex-col min-h-screen pt-16 sm:pt-20 md:pt-24 max-w-[90%] sm:max-w-[85%] md:max-w-[800px] mx-auto text-base sm:text-lg py-4 px-2 sm:px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
        About Us
      </h1>
      <section className="mt-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Our Story</h2>
        <p className="mt-4 mb-4" style={{ textIndent: "2em" }}>
          Sydney is home to must-visit icons like the Sydney Harbour Bridge and
          Opera House, but this Harbour City is constantly evolving. New rooftop
          bars, theatre shows, and designer shops pop up at every turn, and the
          urban excitement is perfectly balanced by afternoons spent lying on
          the sand. Plus, with diverse destinations at its doorstep, Sydney is
          the perfect base for day trips and weekends away.
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Our Services</h2>
        <p className="mt-4 mb-4" style={{ textIndent: "2em" }}>
          We offer a range of services including business promotion, product
          marketing, and event planning, tailored to meet your needs in Sydney
          and beyond.
        </p>
      </section>
        <div className="mt-8 flex flex-col items-center">
        <div className="w-full aspect-video max-w-[800px]">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>
    </div>
    </>
  );
}