import type { Metadata } from "next";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "./globals.css";
import { Open_Sans } from "next/font/google";
import metadataJson from "../data/metadata.json";


const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });

// 定义自定义 OpenGraph 类型
interface CustomOpenGraph {
  title?: string;
  description?: string;
  url?: string;
  type?: string;
  images?: Array<{ url: string; width?: number; height?: number }>;
  site_name?: string;
}

// 定义自定义 Metadata 类型
interface CustomMetadata extends Omit<Metadata, 'openGraph'> {
  openGraph?: CustomOpenGraph;
}

export function generateMetadata({ params }: { params: { slug?: string } }) {
  const page = params?.slug ? 'products' : 'home'; // 动态路由判断
  const pageData = metadataJson[page] || metadataJson.home; // 回退到 home
  return {
    metadataBase: new URL(pageData.url),
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    robots: "index, follow",
    openGraph: {
      title: pageData.ogTitle,
      description: pageData.ogDescription,
      url: pageData.url,
      type: "website",
      images: [{ url: pageData.ogImage, width: 800, height: 600 }],
      site_name: metadataJson.siteName || "Your Business Name",
    } as CustomOpenGraph,
    alternates: {
      canonical: pageData.url,
    },
  } as CustomMetadata;


  
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 z-[0] pt-[85px] md:pt-[60px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}