import Link from 'next/link';
import { socialLinks } from "./socialLinks";
// 放在 Footer 组件里
const shareUrl = encodeURIComponent(typeof window !== "undefined" ? window.location.href : "https://你的网址.com");
const shareTitle = encodeURIComponent(typeof document !== "undefined" ? document.title : "你的页面标题");


export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{
        background: '#eef6fc',
        minHeight: 200,
        color: '#222',
      }}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center py-8 px-4 h-[200px]">
        {/* 菜单 */}
        <div className="flex flex-col md:flex-row gap-6 mb-4 md:mb-0">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About us</Link>
          <Link href="/services" className="hover:underline">Services</Link>
          <Link href="/products" className="hover:underline">Products</Link>
          <Link href="/contact" className="hover:underline">Contact us</Link>
        </div>
        {/* 社交媒体 */}
        {/* <div className="flex flex-wrap gap-4 justify-center"> */}
        <div className="flex gap-4">
          {socialLinks.map(link => (
            <a
              key={link.label}
              href={link.getHref(shareUrl, shareTitle)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              <img src={link.icon} alt={link.label} className="w-7 h-7" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}