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
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const initial = reduce ? 'visible' : 'hidden';

  return (
    <section
      id="top"
      className="relative isolate h-[100svh] min-h-[760px] w-full overflow-hidden bg-bark"
    >
      {/* Background — atmospheric gradient base, then spec-defined hero overlay. */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 ${
            reduce ? '' : 'animate-ken-burns'
          } will-change-transform`}
        >
          {/* Bark-base radial backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,#3a2c1f_0%,#2a1f14_70%)]" />
        </div>

        {/* Hero overlay per spec:
            linear-gradient(160deg, rgba(43,80,120,0.4) 0%, rgba(42,31,20,0.6) 100%) */}
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(43,80,120,0.40)_0%,rgba(42,31,20,0.60)_100%)]" />
        {/* Soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(20,15,10,0.85)_100%)] opacity-50" />
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
          {/* Tagline — Jost micro-label, parchment with amber accent feel */}
          <motion.p
            variants={item}
            className="font-body font-light text-parchment/85 text-[clamp(0.72rem,0.95vw,0.88rem)] tracking-[0.4em] uppercase"
          >
            premium - Lake Front Estate plots · Solur, off NH-75
          </motion.p>

          {/* Hairline divider — amber */}
          <motion.span
            variants={item}
            aria-hidden="true"
            className="block h-px w-14 md:w-20 bg-soleil/45 my-9 md:my-12"
          />

          {/* Project title — Cormorant italic, paper cream */}
          <motion.h1
            variants={item}
            className="font-display italic font-light text-paper text-[clamp(4.5rem,11vw,9.5rem)] leading-[0.95] tracking-tight"
          >
            Udyana
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            variants={item}
            className="mt-6 md:mt-9 font-display italic font-light text-parchment text-[clamp(1.25rem,2.1vw,1.95rem)] leading-snug max-w-2xl"
          >
            Where the lake holds time still.
          </motion.p>

          {/* Developer credit — Jost tracked uppercase, amber tint */}
          <motion.p
            variants={item}
            className="mt-10 md:mt-14 font-body font-light text-soleil/80 text-[0.7rem] md:text-[0.78rem] tracking-[0.5em] uppercase"
          >
            By Aranyavana
          </motion.p>
        </div>

        {/* CTA — primary amber per spec */}
        <motion.div variants={item}>
          <a href="#enquiry" className="btn-fill-sand">
            Request a Private Briefing
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
