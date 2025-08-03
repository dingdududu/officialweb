import ContactForm from "../components/ContactForm";
import metadataJson from "@/data/metadata.json";
import type { Metadata } from "next";

// 定义 metadataJson 的类型
interface MetadataJson {
  baseUrl: string;
  contact: {
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
  title: metadataJsonTyped.contact.title,
  description: metadataJsonTyped.contact.description,
  keywords: metadataJsonTyped.contact.keywords,
  robots: "index, follow",
  openGraph: {
    title: metadataJsonTyped.contact.ogTitle,
    description: metadataJsonTyped.contact.ogDescription,
    url: `${metadataJsonTyped.baseUrl}/contact`,
    images: [
      {
        url: `${metadataJsonTyped.baseUrl}${metadataJsonTyped.contact.ogImage}`,
        width: 800,
        height: 600,
      },
    ],
    type: "website",
    siteName: metadataJsonTyped.siteName,
  },
  alternates: {
    canonical: `${metadataJsonTyped.baseUrl}/contact`,
  },
};

export default function Contact() {
  return (
    <>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "联系我们",
            description: metadataJsonTyped.contact.description,
            url: `${metadataJsonTyped.baseUrl}/contact`,
          }),
        }}
      />

      <main className="flex flex-col min-h-screen pt-16 sm:pt-20 md:pt-24">
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 pt-12 sm:pt-16 md:pt-20 text-center leading-tight">
            Please give us your contact details, and we will contact you right away.
          </h1>
          <ContactForm />
        </div>
      </main>
    </>
  );
}