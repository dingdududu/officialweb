import { socialLinks } from "./socialLinks";

// 放在 Footer 组件里，这里的websie和title要根据实际情况修改
const shareUrl = encodeURIComponent(
  typeof window !== "undefined"
    ? window.location.href
    : process.env.NEXT_PUBLIC_SITE_URL || "https://yourwebsite.com"
);

const shareTitle = encodeURIComponent(
  typeof document !== "undefined"
    ? document.title
    : process.env.NEXT_PUBLIC_DEFAULT_TITLE || "Your Website Title"
);

const mobileSocialLinks = socialLinks.filter((link) =>
  ["X", "WhatsApp", "Line", "Instagram", "Signal"].includes(link.label)
);

export default function Footer() {

  return (
    <div className="mt-24">
    <footer
      className="w-full bg-[#eef6fc] text-[#222]"
      role="contentinfo"
    >
      <div className="max-w-screen-xl mx-auto flex flex-col gap-6 py-4 px-4 sm:py-6 sm:px-6 ">
        {/* 社交链接 - 移动端垂直，桌面端居中 */}
        <div className="flex flex-row items-center justify-center gap-3 md:flex-row md:justify-center md:gap-4">
          {mobileSocialLinks.map((link) => (
            <a
              key={link.label}
              href={link.getHref(shareUrl, shareTitle)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} link, opens in new window`}
              title={`${link.label} - Share on ${link.label}`}
            >
              <img
                src={link.icon}
                alt={`${link.label} icon`}
                className="w-6 h-6 sm:w-7 sm:h-7 transition-transform hover:scale-110"
              />
            </a>
          ))}
          <div className="hidden md:flex md:flex-row md:items-center md:gap-4">
            {socialLinks
              .filter((link) => !mobileSocialLinks.includes(link))
              .map((link) => (
                <a
                  key={link.label}
                  href={link.getHref(shareUrl, shareTitle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} link, opens in new window`}
                  title={`${link.label} - Share on ${link.label}`}
                >
                  <img
                    src={link.icon}
                    alt={`${link.label} icon`}
                    className="w-6 h-6 sm:w-7 sm:h-7 transition-transform hover:scale-110"
                  />
                </a>
              ))}
          </div>
        </div>
        {/* 版权信息 - 另起一行居中 */}
        <div className="flex justify-center">
          <small className="text-center text-sm md:text-base">
            © {new Date().getFullYear()} Apparel Stock Hub. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
    </div>
  );
}
