'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Variabel warna
const colors = {
  navbar: {
    background: 'bg-teal-700',
    shadow: 'shadow-md',
  },
  text: {
    primary: 'text-black',
    secondary: 'text-gray-600',
  },
  link: {
    active: 'font-semibold',
    hover: 'hover:text-black',
    underline: 'bg-black',
  },
  effects: {
    hover: 'hover:scale-105',
  }
};

export default function Navbar() {
  const currentPath = usePathname();
  
  // Animated underline component
  const Underline = () => (
    <span className={`absolute bottom-0 left-0 h-0.5 ${colors.link.underline} w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
  );

  return (
    <nav className={`sticky top-0 z-50 flex justify-between items-center px-6 py-6 ${colors.navbar.shadow} ${colors.navbar.background} font-poppins`}>
      <div className={`flex text-3xl font-semibold ml-10 ${colors.effects.hover} transition-transform`}>
        {/*<Image src="/Asset/Logo.png" width={50} height={50} alt="Logo" />*/}
        <Link href="/">Keuchik Pulo Redeup</Link>
      </div>
      
      <div className="flex space-x-8 font-medium mr-10">
        
      </div>
    </nav>
  );
}