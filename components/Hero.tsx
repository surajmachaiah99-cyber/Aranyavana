'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden"
    >
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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,#3a4a3a_0%,#1c1a17_70%)] -z-10" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-earth/85 via-earth/45 to-earth/20" />
        <div className="absolute inset-0 hero-vignette" />
      </div>

      <div className="container-edit relative z-10 h-full flex flex-col justify-end pb-32 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="max-w-3xl"
        >
          <p className="eyebrow mb-6">· Udyana by Aranyavana</p>

          <h1 className="font-display font-light text-cream leading-[0.95] text-[clamp(2.75rem,7vw,6.5rem)] tracking-tight">
            <span className="block">Some investments grow.</span>
            <span className="block italic font-light text-cream/95">
              Some breathe.
            </span>
          </h1>

          <p className="mt-7 max-w-xl font-body font-light text-mist text-[1.05rem] leading-relaxed">
            Premium lakefront estate plots off the Bangalore–Mangalore Highway.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <a href="#enquiry" className="btn-ghost-sand">
              REQUEST AN INVITATION
            </a>
            <span className="font-body font-light text-mist/55 text-[0.75rem] tracking-wide">
              By Appointment Only · 18 Estate Plots Remaining
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="font-sc text-[0.65rem] tracking-widest2 text-mist/60">
          SCROLL
        </span>
        <span className="block h-12 w-px bg-mist/50 origin-top animate-scroll-pulse" />
      </motion.div>
    </section>
  );
}
