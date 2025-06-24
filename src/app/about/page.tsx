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
export default function About() {
  return (
    <div className="flex flex-col min-h-screen pt-[135px] max-w-[800px] mx-auto text-justify py-8 px-4" >
      <h1 className="text-3xl font-bold mb-4  text-center ">Introduce us</h1>
      <p className="mt-8 mb-4"
  style={{ textIndent: "2em" }} // 首行缩进两个汉字宽度
>
  Sydney is home to must-visit icons like the Sydney Harbour Bridge and Opera House, but this Harbour City is constantly evolving. New rooftop bars, theatre shows and designer shops pop up at every turn, and the urban excitement is perfectly balanced by afternoons spent lying on the sand. Plus, with diverse destinations at its doorstep, Sydney is the perfect base for day trips and weekends away.
    </p>
    </div>
  );
}