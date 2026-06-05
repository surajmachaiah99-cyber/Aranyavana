'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.35 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const initial = reduce ? 'visible' : 'hidden';

  return (
    <section
      id="top"
      className="relative isolate h-[100svh] min-h-[760px] w-full overflow-hidden bg-[#14221a]"
    >
      {/* Background — lake video stays, overlay shifts to charcoal → forest green */}
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
          {/* Fallback gradient — visible until media drops in */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,#1f2a1f_0%,#14221a_70%)] -z-10" />
        </div>

        {/* Charcoal/olive → forest green wash — light at top so the lake shows
            through, deeper at the bottom for CTA legibility. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0e161266_0%,#14221a4d_30%,#14221a80_65%,#14221acc_100%)]" />
        {/* Soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#0a110d_100%)] opacity-50" />
      </div>

      {/* Content — top spacer → centered stack → CTA at the floor */}
      <motion.div
        variants={container}
        initial={initial}
        animate="visible"
        className="container-edit relative z-10 h-full flex flex-col items-center justify-between pt-32 md:pt-40 pb-16 md:pb-20 text-center"
      >
        {/* Spacer for nav clearance */}
        <span aria-hidden="true" />

        {/* Centered editorial stack */}
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          {/* Tagline */}
          <motion.p
            variants={item}
            className="font-body font-light text-[#E5D9C4]/85 text-[clamp(0.72rem,0.95vw,0.88rem)] tracking-[0.4em] uppercase"
          >
            premium - Lake Front Estate plots · Solur, off NH-75
          </motion.p>

          {/* Hairline divider */}
          <motion.span
            variants={item}
            aria-hidden="true"
            className="block h-px w-14 md:w-20 bg-[#D1C2A5]/45 my-9 md:my-12"
          />

          {/* Project title */}
          <motion.h1
            variants={item}
            className="font-display italic font-light text-cream text-[clamp(4.5rem,11vw,9.5rem)] leading-[0.95] tracking-tight"
          >
            Udyana
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            variants={item}
            className="mt-6 md:mt-9 font-display italic font-light text-[#E5D9C4] text-[clamp(1.25rem,2.1vw,1.95rem)] leading-snug max-w-2xl"
          >
            Where the lake holds time still.
          </motion.p>

          {/* Developer credit */}
          <motion.p
            variants={item}
            className="mt-10 md:mt-14 font-body font-light text-[#D1C2A5] text-[0.7rem] md:text-[0.78rem] tracking-[0.5em] uppercase"
          >
            By Aranyavana
          </motion.p>
        </div>

        {/* CTA — centered at the floor */}
        <motion.div variants={item}>
          <a
            href="#enquiry"
            className="group inline-flex items-center justify-center px-9 md:px-11 py-3.5 md:py-4 border border-[#D1C2A5]/65 text-[#D1C2A5] font-body font-light text-[0.72rem] md:text-[0.78rem] tracking-[0.35em] uppercase transition-[background-color,border-color,color,box-shadow] duration-700 ease-editorial hover:bg-[#D1C2A5]/10 hover:border-[#E5D9C4] hover:text-[#E5D9C4] hover:shadow-[0_0_42px_-6px_rgba(229,217,196,0.4)]"
          >
            Request a Private Briefing
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
