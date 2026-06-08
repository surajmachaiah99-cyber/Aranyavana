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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-[300ms] ease-editorial ${
        scrolled
          ? 'bg-bark/90 backdrop-blur-md border-b border-soleil/15'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-edit flex items-center justify-center py-6 md:py-8">
        <a
          href="#top"
          className={`group flex flex-col items-center gap-1 transition-colors duration-[300ms] ease-editorial ${
            scrolled ? 'text-parchment' : 'text-parchment'
          } hover:text-soleil`}
          aria-label="Aranyavana — Curated Nature Living"
        >
          {/* Brand wordmark — Jost (per spec: nav uses sans), tracked uppercase */}
          <span className="font-body text-xl md:text-3xl tracking-[0.3em] leading-none uppercase">
            ARANYAVANA
          </span>
          {/* Tagline — italic Cormorant for the soft brand line */}
          <span className="font-display italic font-light text-[0.7rem] md:text-[0.85rem] text-parchment/65 group-hover:text-soleil/85 tracking-[0.05em] leading-none transition-colors duration-[300ms] ease-editorial">
            Curated Nature Living
          </span>
        </a>
      </div>
    </header>
  );
}
