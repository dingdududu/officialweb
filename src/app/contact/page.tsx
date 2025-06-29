export const metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: "首页 - 你的商务推广网站",
  description: "这里是你的公司/产品/服务简介，利于SEO收录。",
  openGraph: {
    title: "首页 - 你的商务推广网站",
    description: "这里是你的公司/产品/服务简介。",
    images: [
      {
        url: "/images/og-image.jpg", // 你的分享图路径
        width: 800, // w
        height: 600, // h
      },
    ],
  },
};

import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <div>
      <h1 className=" mb-8  pt-[120px]   text-center">
        Please give us your contact details, and we will contact you right away.
      </h1>
      <ContactForm />
    </div>
  );
}