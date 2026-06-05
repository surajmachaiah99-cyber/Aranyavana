'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-700 ease-editorial ${
        scrolled
          ? 'bg-[#0e1612]/85 backdrop-blur-md border-b border-[#D1C2A5]/15'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-edit flex items-center justify-center py-6 md:py-8">
        <a
          href="#top"
          className="font-sc text-[#D1C2A5] text-xl md:text-3xl tracking-widest3 hover:text-[#E5D9C4] transition-colors duration-500"
          aria-label="Aranyavana — home"
        >
          ARANYAVANA
        </a>
      </div>
    </header>
  );
}
