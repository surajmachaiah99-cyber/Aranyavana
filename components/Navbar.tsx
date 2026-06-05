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
          className="group flex flex-col items-center gap-1 text-[#D1C2A5] hover:text-[#E5D9C4] transition-colors duration-500"
          aria-label="Aranyavana — Curated Nature Living"
        >
          <span className="font-sc text-xl md:text-3xl tracking-widest3 leading-none">
            ARANYAVANA
          </span>
          <span className="font-display italic font-light text-[0.7rem] md:text-[0.85rem] text-[#D1C2A5]/65 group-hover:text-[#E5D9C4]/75 tracking-[0.05em] leading-none transition-colors duration-500">
            Curated Nature Living
          </span>
        </a>
      </div>
    </header>
  );
}
