'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Hero — luxury minimalist lakefront brief.
 *
 * Layered, top → bottom:
 *  1. Lake video (kept) with slow Ken Burns
 *  2. Deep forest-green wash + vignette so type stays legible
 *  3. Top: spaced-out brand tagline
 *  4. Center: "Udyana" + lyric subheading + "BY ARANYAVANA" credit
 *  5. Bottom: a single transparent gold-bordered CTA
 */
export default function Hero() {
  const reduce = useReducedMotion();

  // Champagne / cream palette per spec
  const champagne = '#D1C2A5';
  const cream = '#E5D9C4';
  const titleCream = '#F4ECDD';

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[760px] w-full overflow-hidden"
    >
      {/* ── Background layer ── */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 ${
            reduce ? '' : 'animate-ken-burns'
          } will-change-transform`}
        >
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-lake.jpg"
            aria-hidden="true"
          >
            <source src="/videos/hero-lake.mp4" type="video/mp4" />
          </video>
          {/* Fallback gradient — only seen if the video fails */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_70%,#3a4a3a_0%,#14221a_70%)]" />
        </div>

        {/* Deep forest wash: muted charcoal-olive top → rich forest green bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1410]/50 via-[#14221a]/55 to-[#14221a]/95" />
        {/* Atmospheric vignette */}
        <div className="absolute inset-0 hero-vignette" />
      </div>

      {/* ── Content stack ── */}
      <div className="container-edit relative z-10 h-full flex flex-col items-center justify-between pt-32 md:pt-40 pb-16 md:pb-20 text-center">
        {/* Top brand tagline */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="font-body font-light text-[0.7rem] md:text-[0.78rem] tracking-[0.35em]"
          style={{ color: cream }}
        >
          CURATED NATURE LIVING · SOLUR, off NH-75
        </motion.p>

        {/* Center group: title + subheading + credit */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          className="flex flex-col items-center"
        >
          <h1
            className="font-display italic font-light leading-[0.92] tracking-[-0.015em] text-[clamp(4.5rem,13vw,10rem)]"
            style={{ color: titleCream }}
          >
            Udyana
          </h1>

          <p
            className="mt-7 md:mt-9 font-display italic font-light leading-snug text-[clamp(1.15rem,2.1vw,1.6rem)] max-w-xl"
            style={{ color: cream }}
          >
            Where the lake holds time still.
          </p>

          <p
            className="mt-10 md:mt-12 font-body font-light text-[0.65rem] md:text-[0.72rem] tracking-[0.45em]"
            style={{ color: champagne }}
          >
            BY ARANYAVANA
          </p>
        </motion.div>

        {/* Bottom CTA — centered, transparent, thin champagne-gold border */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
        >
          <a
            href="#enquiry"
            className="group inline-flex items-center justify-center px-9 md:px-11 py-4 md:py-[1.05rem] border border-[#D1C2A5]/70 text-[#D1C2A5] font-body font-light text-[0.74rem] md:text-[0.8rem] tracking-[0.28em] transition-[background-color,border-color,box-shadow,color] duration-700 ease-editorial hover:bg-[#D1C2A5]/10 hover:border-[#E5D9C4] hover:text-[#F4ECDD] hover:shadow-[0_0_28px_-2px_rgba(209,194,165,0.35)]"
          >
            REQUEST A PRIVATE BRIEFING
          </a>
        </motion.div>
      </div>
    </section>
  );
}
