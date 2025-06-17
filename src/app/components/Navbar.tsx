import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm h-[85px] flex items-center">
      <div className="flex items-center mx-auto" style={{ height: 85 }}>
        <img
          src="/images/logo.png"
          alt="Logo"
          style={{ width: 126, height: 68 }}
          className="object-contain"
        />
        <div className="flex space-x-8 ml-[70px] items-center">
          <Link href="/" className="text-gray-900 hover:text-blue-600 transition">首页</Link>
          <Link href="/about" className="text-gray-900 hover:text-blue-600 transition">关于我们</Link>
          <Link href="/services" className="text-gray-900 hover:text-blue-600 transition">服务</Link>
          <Link href="/products" className="text-gray-900 hover:text-blue-600 transition">产品</Link>
          <Link href="/qas" className="text-gray-900 hover:text-blue-600 transition">常见问题</Link>
          <Link href="/contact" className="text-gray-900 hover:text-blue-600 transition">联系我们</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;