"use client";

import Link from "next/link";
// 这里的 usePathname 用于获取当前路径，便于高亮当前页面
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";



const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

    const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About us" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/faqs", label: "FAQs"},
    { href: "/contact", label: "Contact us" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-[#f7fafd] shadow transition-all duration-300 ${
        scrolled ? "h-[60px]" : "h-[85px]"
      }`}
      style={{
        boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="flex items-center justify-center mx-auto" style={{ height: "100%" }}>
       
        <Link href="/" >
         <img
          src="/images/logo.png"
          alt="Logo"
          style={{
           
            width: scrolled ? 90 : 126,
            height: scrolled ? 48 : 68,
            transition: "all 0.3s",
          }}
          className="object-contain mr-8"
        />
        </Link>
        <div className="flex space-x-8 items-center relative h-full">
          {navItems.map((item) => {
          
            const isActive = pathname === item.href;
            return (
              <div key={item.href} className="relative h-full flex items-center">
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative px-4 py-2 rounded-md transition
                  ${isActive ? "font-bold text-black" : "text-gray-900"}
                  ${!isActive ? "hover:shadow-lg hover:bg-white hover:text-black hover:rounded-lg" : ""}
                  `}              
            >
              {item.label}
              </Link>
              {isActive && (
                  <span
                    className="absolute left-0 right-0 bottom-0 h-[2px] rounded bg-neutral-700 opacity-80"
                  />
                )}
            </div>
          );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;