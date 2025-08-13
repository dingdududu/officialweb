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
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Our Mission</h2>
        <p className="mt-4 mb-4" style={{ textIndent: "2em" }}>
          We are a vertically integrated apparel company dedicated to delivering quality products, a broad range of styles, and exceptional value to customers worldwide. Based in Guangzhou, China, we unite advanced manufacturing capabilities with flexible trading solutions to serve markets efficiently and reliably. Over the years, we have established long-term, active partnerships with leading supermarkets and top e-commerce platforms across the globe, giving us deep insight into international market demands. Our experienced team—seasoned in both production and global trade—ensures that every order is handled with precision, timeliness, and a commitment to customer satisfaction.
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 pt-4">Our Services</h2>
        <p className="mt-4 mb-4" style={{ textIndent: "2em" }}>
          From OEM and ODM production to wholesale and retail supply, we offer a wide range of apparel solutions tailored to different business models. Our flexible trade terms—including FOB, CIF, and others—allow us to adapt to the specific needs of each client. With an extensive product catalog covering multiple styles, fabrics, and sizes, and supported by an experienced team, we ensure that every partner can source exactly what they need with efficiency, reliability, and confidence.
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 pt-4">About Stock</h2>
        <p className="mt-4 mb-4" style={{ textIndent: "2em" }}>
          Through our close connections within the local garment industry association, we have access to surplus inventory from reputable manufacturing enterprises. These stocks often arise when orders—sometimes for well-known international brands—cannot be delivered due to various business or buyer-related issues. As a result, we are able to offer genuine, brand-level apparel at significantly reduced prices, providing our clients with products that combine exceptional quality and outstanding value.
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