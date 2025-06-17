export const metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: "首页 - 你的商务推广网站",
  description: "这里是你的公司/产品/服务简介，利于SEO收录。",
  openGraph: {
    title: "首页 - 你的商务推广网站",
    description: "这里是你的公司/产品/服务简介。",
    images: [
      {
        url: "/images/og-image.jpg", // 你的分享图路径
        width: 800,                  // w
        height: 600,                 // h
      },
    ],
  },
};
export default function Products() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-4">产品</h1>
      <p>这里是产品页面的内容。</p>
    </div>
  );
}