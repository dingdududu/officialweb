import { qaList } from "@/data/qaList";
import FQAList from "@/app/components/FQAList";
import metadataJson from "@/data/metadata.json";
import type { Metadata } from "next";
import { Suspense } from "react";

// 定义 metadataJson 的类型
interface MetadataJson {
   baseUrl: string;
  faqs: {
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
  baseUrl?: string;
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
  }>;
  type?: string;
  site_name?: string;
}

// 自定义 Metadata 类型
type CustomMetadata = Metadata & {
  openGraph?: CustomOpenGraph;
};

export const metadata: CustomMetadata = {
   metadataBase: new URL(metadataJsonTyped.baseUrl),
  title: metadataJsonTyped.faqs.title,
  description: metadataJsonTyped.faqs.description,
  keywords: metadataJsonTyped.faqs.keywords,
  robots: "index, follow",
  openGraph: {
    title: metadataJsonTyped.faqs.ogTitle,
    description: metadataJsonTyped.faqs.ogDescription,
    url: metadataJsonTyped.faqs.url,
    images: [
      {
        url: metadataJsonTyped.faqs.ogImage,
        width: 800,
        height: 600,
      },
    ],
    type: "website",
    site_name: metadataJsonTyped.siteName,
  },
  alternates: {
    canonical: metadataJsonTyped.faqs.url,
  },
};



export default function FAQs() {
  // FAQ 结构化数据组件
 const FAQStructuredData = () =>  {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: metadataJsonTyped.faqs.title,
    description: metadataJsonTyped.faqs.description,
    url: metadataJsonTyped.faqs.url,
    mainEntity: qaList.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.answer,
      },
    })),
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: metadataJsonTyped.faqs.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FAQs",
        item: metadataJsonTyped.faqs.url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
  return (
    <>
      {/* 结构化数据 */}
      <FAQStructuredData />

      <main className="flex flex-col min-h-screen pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 pb-20">
        <div className="max-w-[90%] sm:max-w-[85%] lg:max-w-[1200px] mx-auto w-full">
          
          {/* 页面标题区域 */}
          <header className="text-center mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed text-left">
              Find answers to common questions about our products and services. 
              Can't find what you're looking for? Feel free to contact us.
            </p>
          </header>

          {/* FAQ 内容区域 */}
          <section aria-labelledby="faq-content">
            <h2 id="faq-content" className="sr-only">FAQ Content</h2>
            <Suspense fallback={
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-gray-100 animate-pulse rounded-lg h-16 w-full" />
                ))}
              </div>
            }>
              <FQAList />
            </Suspense>
          </section>

          {/* 联系我们区域 */}
          <section className="mt-12 lg:mt-16 text-center bg-gray-50 rounded-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              Still have questions?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Our team is here to help you with any additional questions you may have.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Contact us for more help"
            >
              Contact Us
            </a>
          </section>

        </div>
      </main>
    </>
  );
}