// app/components/Navbar.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold text-xl">MyApp</div>
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>
      <ul className={`flex gap-3 mt-3`}>
        <li>
          <Link href="/" className={`text-white ${pathname === '/' ? 'text-yellow-500' : ''}`}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/novel" className={`text-white ${pathname === '/novel' ? 'text-yellow-500' : ''}`}>
            Novel
          </Link>
        </li>
        <li>
          <Link href="/liveblocks" className={`text-white ${pathname === '/liveblocks' ? 'text-yellow-500' : ''}`}>
            Liveblocks
          </Link>
        </li>
      </ul>
    </nav>
  );
}
