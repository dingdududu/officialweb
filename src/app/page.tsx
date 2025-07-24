import metadataJson from "../data/metadata.json";
import type { Metadata } from "next";

interface CustomOpenGraph {
  title?: string;
  description?: string;
  url?: string;
  type?: string;
  images?: Array<{ url: string; width?: number; height?: number }>;
  site_name?: string; 
}

// 自定义 Script 类型
interface CustomScript {
  type: string;
  innerHTML: string;
}

interface CustomMetadata extends Omit<Metadata, 'other'> {
  other?: {
    script?: CustomScript;
  };
}

export async function generateMetadata(): Promise<CustomMetadata> {
  const pageData = metadataJson.home;
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
      images: [
        {
          url: pageData.ogImage,
          width: 800,
          height: 600,
        },
      ],

      site_name: metadataJson.siteName || "Your Business Name",
    } as CustomOpenGraph, // 类型断言
    alternates: {
      canonical: pageData.url,
    },
    other: {
      script: {
        type: "application/ld+json",
        innerHTML: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Inflight Entertainment",
            description:
              "Personal entertainment options on transatlantic flights.",
          },
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Business Class Seats",
            description: "High comfort lie-flat seats on A330 Business Cabin.",
          },
        ]),
      },
    },
  };

}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: metadataJson.siteName,
            description: metadataJson.home.description,
            url: metadataJson.home.url,
            image: `${metadataJson.home.url}${metadataJson.home.ogImage}`,
          }),
        }}
      />
    <div className="flex flex-col gap-8">
      {/* 首页大图区域 */}
      <section
        className="relative h-[300px] sm:h-[400px] lg:h-[500px] flex items-center pt-4 sm:pt-8 lg:pt-12 overflow-hidden"
        // aria-label内容要根据实际情况更改
        aria-label="Inflight Entertainment Hero Section"
      >
        <img
          src="/images/hero.jpg"
          alt="Inflight Entertainment Hero"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="flex flex-col items-start ml-4 sm:ml-16 lg:ml-60 p-4 relative z-10">
          <h1 className="font-bold text-white text-xl sm:text-3xl lg:text-4xl mb-2 leading-tight">
            Entertainment
          </h1>
          <h2 className="text-white text-base sm:text-lg lg:text-xl leading-relaxed w-full sm:w-[400px] lg:w-[450px]">
            Inflight Entertainment All seats feature in-seat IFE screens with
            films, TV, Music on demand putting you in charge of your own
            personal entertainment selection as you cross the Atlantic. Play,
            pause, rewind or fast-forward a wide range of blockbuster movies,
            classic films, TV programmes and box sets or music videos at your
            leisure.
          </h2>
        </div>
      </section>

      {/* 首页下方内容 */}
      <div className="max-w-[100%] sm:max-w-[600px] lg:max-w-[800px] mx-auto text-left p-4 mb-8 sm:mb-12 lg:mb-16">
        {/* 下面的aria-label是为了设置无障碍访问的标签，所以里面的内容要根据实际情况更改 */}
        <h2
          className="text-lg sm:text-xl font-bold mb-2"
          aria-label="Seats Information"
        >
          Seats
        </h2>
        <p>
          High comfort seats The A330 Business Cabin is furnished with a fully
          lie-flat 6.5ft long bed. And with a width of 22 inches, you'll have
          plenty of room to stretch out as you dream your way across the
          Atlantic.AerClub is the loyalty programme of Aer Lingus. Join today
          and start collecting straight away towards reward flights and tier
          benefits. It's our way of saying thanks for choosing to fly with us.
          More details on how it works
        </p>
      </div>
      <div className="max-w-[100%] sm:max-w-[600px] lg:max-w-[800px] mx-auto text-left p-4 mb-8 sm:mb-12 lg:mb-16">
        {/* 下面的aria-label是为了设置无障碍访问的标签，所以里面的内容要根据实际情况更改 */}
        <h2
          className="text-lg sm:text-xl font-bold mb-2"
          aria-label="Dining Information"
        >
          Dining
        </h2>
        <p>
          Across all our Transatlantic flights we provide a delicious
          complimentary meal or you can choose from a selection of tempting
          pre-order meal options.If you already have an Aer Lingus account
          separate to AerClub, please log in using your original details to
          upgrade to your new AerClub account.
        </p>
      </div>
    </div>
    </>
  );
}
