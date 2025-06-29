import type { Metadata } from "next";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "./globals.css";
import { Open_Sans } from "next/font/google";


const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata:Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: "首页 - 你的商务推广网站",
  description: "这里是你的公司/产品/服务简介，利于SEO收录。",
  keywords: ["商务", "推广", "网站"],
  robots: "index, follow",
  openGraph: {
    title: "首页 - 你的商务推广网站",
    description: "这里是你的公司/产品/服务简介。",
    url:"/faqs",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg", // 你的分享图路径
        width: 800,                  // w
        height: 600,                 // h
      },
    ],
  },
  alternates: {
    canonical: "/faqs", 
  },
};


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
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}