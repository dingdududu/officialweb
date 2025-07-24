"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact us" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const idx = navItems.findIndex((item) => item.href === pathname);
    if (idx !== -1 && menuRefs.current[idx]) {
      const el = menuRefs.current[idx];
      setUnderlineStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [pathname, isOpen, scrolled]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-[#f7fafd] shadow transition-all duration-300 ${
        scrolled ? "h-[60px]" : "h-[85px]"
      }`}
      style={{
        boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
       
        className="max-w-6xl mx-auto flex items-center px-4"
        style={{ height: "100%" }}
      >

        {/* LOGO */}
        <div className="flex-1 flex">
          <Link href="/" className="flex-shrink-0 mr-24">
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{
                width: scrolled ? 90 : 126,
                height: scrolled ? 48 : 68,
                transition: "all 0.3s",
              }}
              className="object-contain"
            />
          </Link>
        </div>
        {/* 菜单 */}
        <div className="flex items-center relative h-full">
          {/* 菜单项 */}

          <div className="hidden md:flex md:space-x-8 items-center whitespace-nowrap">

            {/*下横线效果*/}
            <span
              className="hidden md:block absolute bottom-0 h-[2px] rounded bg-neutral-700 opacity-80 transition-all duration-300"
              style={{
                left: underlineStyle.left,
                width: underlineStyle.width,
              }}
            />

            {navItems.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <div
                  key={item.href}
                  ref={(el) => {
                    menuRefs.current[idx] = el;
                  }}
                  className="relative w-full md:w-auto h-full flex items-center justify-center"
                >
                  <Link
                    href={item.href}
                    className={`block px-6 py-3 md:px-4 md:py-2 rounded-md transition ${
                      isActive ? "font-bold text-black" : "text-gray-900"
                    } ${
                      !isActive
                        ? "hover:shadow-lg hover:bg-white hover:text-black hover:rounded-lg"
                        : ""
                    }

                    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        {/* 汉堡按钮（右侧） */}
        <div className="flex-1 flex justify-end">

          <button
            className="md:hidden text-3xl text-gray-900 focus:outline-none p-3 z-20 ml-auto mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            ☰
          </button>
        </div>
      </div>
      {/* 移动端右侧弹出菜单 */}
      <div
        className={`
      fixed top-0 right-0 h-full w-48 bg-[#f7fafd] shadow-lg z-40
      transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "translate-x-full"}
      md:hidden
    `}
      >

        <button
          className="absolute top-4 right-4 text-3xl z-50"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          ×
        </button>
        <nav className="flex flex-col items-center mt-16 space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-lg font-medium px-4 py-2 rounded  ${
                pathname === item.href
                  ? "font-bold text-black"
                  : "text-gray-900"
              } hover:bg-gray-100 active:bg-gray-200 transition`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
