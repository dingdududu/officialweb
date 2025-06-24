export type SocialLink = {
  label: string;
  icon: string;
  getHref: (url: string, title: string) => string;
};

export const socialLinks: SocialLink[] = [
  // X (Twitter)
  {
    label: "X",
    icon: "/images/x.svg",
    getHref: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
  },
  // Bluesky
  {
    label: "Bluesky",
    icon: "/images/bluesky.svg",
    getHref: () => "https://bsky.app/"
  },
  // Facebook
  {
    label: "Facebook",
    icon: "/images/facebook.svg",
    getHref: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },
  // WhatsApp
  {
    label: "WhatsApp",
    icon: "/images/whatsapp.svg",
    getHref: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`
  },
  // Flickr
  {
    label: "Flickr",
    icon: "/images/flickr.svg",
    getHref: () => "https://flickr.com/"
  },
  // Instagram
  {
    label: "Instagram",
    icon: "/images/instagram.svg",
    getHref: (url) =>
      `https://instagram.com/?url=${encodeURIComponent(url)}`
  },
  // Line
  {
    label: "Line",
    icon: "/images/line.svg",
    getHref: (url) =>
      `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`
  },
  // Pinterest
  {
    label: "Pinterest",
    icon: "/images/pinterest.svg",
    getHref: (url, title) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`
  },
  // signal
  {
  label: "Signal",
  icon: "/images/signal.svg",
  getHref: (url, title) =>
    `https://signal.me/#p/+?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`
},
  // Reddit
  {
    label: "Reddit",
    icon: "/images/reddit.svg",
    getHref: (url, title) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  },
  // RSS
  {
    label: "RSS",
    icon: "/images/rss.svg",
    getHref: () => "/rss.xml"
  },
  // Telegram
  {
    label: "Telegram",
    icon: "/images/telegram.svg",
    getHref: (url, title) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
  },
  // TikTok
  {
    label: "TikTok",
    icon: "/images/tiktok.svg",
    getHref: () => "https://tiktok.com/"
  },
  // YouTube
  {
    label: "YouTube",
    icon: "/images/youtube.svg",
    getHref: () => "https://youtube.com/"
  },
  // Mastodon
  {
    label: "Mastodon",
    icon: "/images/mastodon.svg",
    getHref: (url, title) =>
      `https://mastodon.social/share?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`
  },
  // WeChat
  {
    label: "WeChat",
    icon: "/images/wechat.svg",
    getHref: () => "https://wechat.com/"
  },
//   // Weibo
//   {
//     label: "Weibo",
//     icon: "/images/weibo.svg",
//     getHref: (url, title) =>
//       `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
//   },
//   // QQ
//   {
//     label: "QQ",
//     icon: "/images/qq.svg",
//     getHref: (url, title) =>
//       `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
//   },
//   // VK
//   {
//     label: "VK",
//     icon: "/images/vk.svg",
//     getHref: (url, title) =>
//       `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
//   }
];