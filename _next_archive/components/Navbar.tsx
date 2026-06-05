'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-700 ease-editorial ${
          scrolled
            ? 'bg-earth/90 backdrop-blur-md border-b border-bark/40'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container-edit flex items-center justify-between py-5">
          <a
            href="#top"
            className="font-sc text-mist text-[0.78rem] tracking-widest2 hover:text-sand transition-colors duration-500"
            aria-label="Aranyavana — home"
          >
            ARANYAVANA
          </a>

          <nav className="hidden md:flex items-center gap-10">
            <span className="font-body font-light text-[0.85rem] text-mist/70 italic">
              Udyana
            </span>
            <a
              href="#enquiry"
              className="font-sc text-[0.7rem] tracking-widest2 text-sand border border-sand/60 px-5 py-3 hover:bg-sand hover:text-earth transition-colors duration-700 ease-editorial"
            >
              REQUEST INVITATION
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Open menu"
          >
            <span className="block h-px w-6 bg-mist" />
            <span className="block h-px w-6 bg-mist" />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-earth transition-opacity duration-700 ease-editorial md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div className="container-edit flex items-center justify-between py-5">
          <span className="font-sc text-mist text-[0.78rem] tracking-widest2">
            ARANYAVANA
          </span>
          <button
            type="button"
            onClick={close}
            className="font-sc text-[0.7rem] tracking-widest2 text-sand"
            aria-label="Close menu"
          >
            CLOSE
          </button>
        </div>

        <nav className="container-edit flex flex-col items-start gap-10 mt-24">
          <a
            href="#thesis"
            onClick={close}
            className="font-display font-light text-cream text-5xl"
          >
            The Thesis
          </a>
          <a
            href="#assets"
            onClick={close}
            className="font-display font-light text-cream text-5xl"
          >
            The Offering
          </a>
          <a
            href="#architecture"
            onClick={close}
            className="font-display font-light text-cream text-5xl"
          >
            The Architecture
          </a>
          <a
            href="#investment"
            onClick={close}
            className="font-display font-light text-cream text-5xl"
          >
            Investment
          </a>
          <a
            href="#enquiry"
            onClick={close}
            className="mt-8 btn-ghost-sand"
          >
            REQUEST INVITATION
          </a>
        </nav>
      </div>
    </>
  );
}
