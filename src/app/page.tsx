
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

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      {/* 首页大图区域 */}
      <section
        className="relative bg-cover bg-center h-[500px] flex items-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="flex flex-col items-start" style={{ marginLeft: 250 }}>
          <h1
            className="font-bold text-white mb-[10px]"
            style={{ fontSize: 30, lineHeight: "30px", height: 30 }}
          >
            Entertainment
          </h1>
          <h2
            className="text-white"
            style={{ fontSize: 16, lineHeight: "28px", height: 28, width: 450 }}
          >
            Inflight Entertainment All seats feature in-seat IFE screens with films, TV, Music on demand putting you in charge of your own personal entertainment selection as you cross the Atlantic. Play, pause, rewind or fast-forward a wide range of blockbuster movies, classic films, TV programmes and box sets or music videos at your leisure.
          </h2>
        </div>
      </section>

      {/* 首页下方内容 */}
      <div className="max-w-[800px] mx-auto text-left justify-center mb-[60px]">
        <h2 className="text-xl font-bold mb-2">Seats</h2>
        <p>High comfort seats The A330 Business Cabin is furnished with a fully lie-flat 6.5ft long bed. And with a width of 22 inches, you'll have plenty of room to stretch out as you dream your way across the Atlantic.AerClub is the loyalty programme of Aer Lingus. Join today and start collecting straight away towards reward flights and tier benefits. It's our way of saying thanks for choosing to fly with us. More details on how it works</p>
      </div>
      <div className="max-w-[800px] mx-auto text-left justify-center mb-[100px]">
        <h2 className="text-xl font-bold mb-2">Dining</h2>
        <p>Across all our Transatlantic flights we provide a delicious complimentary meal or you can choose from a selection of tempting pre-order meal options.If you already have an Aer Lingus account separate to AerClub, please log in using your original details to upgrade to your new AerClub account.</p>
      </div>
    </div>
  );
}