'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

/**
 * BuildSection — "Build on Your Land"
 *
 * Earthscapes (landscape packages) + Construction (Udyana Nest / Canopy).
 * Tailwind-native port of the supplied spec using the project's existing
 * palette tokens (bark, soil, clay, stone, parchment, paper, soleil,
 * harvest, dusk, canopy, fern, + newly-added meadow).
 *
 * Reveal animation matches the spec's IntersectionObserver behaviour
 * (threshold 0.1, rootMargin -50px, once) via Framer Motion's
 * whileInView with delays d1..d4 = 0s / 0.1s / 0.2s / 0.3s. Respects
 * prefers-reduced-motion.
 *
 * Insertion point: between <Architectural /> and <Financial /> in
 * app/page.tsx — i.e. immediately after "Homes That Breathe." and
 * immediately before "Wealth Preservation through Ecological Scarcity."
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  },
});

const REVEAL_VIEWPORT = {
  once: true,
  amount: 0.1,
  margin: '0px 0px -50px 0px',
} as const;

type Package = { name: string; tag: string };

const LANDSCAPE_PACKAGES: Package[] = [
  { name: 'Nature Starter',   tag: 'From ₹1.5 Lakhs' },
  { name: 'Udyana Forest',    tag: 'From ₹4 Lakhs' },
  { name: 'Airbnb Landscape', tag: 'From ₹6 Lakhs' },
  { name: 'Edible Forest',    tag: 'Custom' },
];

const HOME_PACKAGES: Package[] = [
  { name: 'Udyana Nest',   tag: '1 BHK · From ₹22 Lakhs' },
  { name: 'Udyana Canopy', tag: '2 BHK · From ₹34 Lakhs' },
];

function LandscapeIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M18 32 Q18 18 18 10" stroke="#4A7C45" strokeWidth="1.2" />
      <path d="M18 10 Q8 4 4 2 Q10 10 18 18" fill="#2D5C2E" opacity="0.7" />
      <path d="M18 16 Q28 10 32 2 Q26 10 18 18" fill="#4A7C45" opacity="0.8" />
      <path d="M10 32 Q18 30 26 32" stroke="#C4AA8A" strokeWidth="0.7" fill="none" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M18 4 L32 18 L4 18 Z" stroke="#C47B1A" strokeWidth="1.2" fill="rgba(232,166,66,0.12)" />
      <rect x="10" y="18" width="16" height="14" stroke="#C47B1A" strokeWidth="1.2" fill="rgba(232,166,66,0.06)" />
      <rect x="15" y="24" width="6" height="8" stroke="#C47B1A" strokeWidth="0.8" fill="none" />
      <path d="M6 32 Q18 29 30 32" stroke="#C4AA8A" strokeWidth="0.7" fill="none" />
    </svg>
  );
}

export default function BuildSection() {
  const reduce = useReducedMotion();
  const initial = reduce ? 'visible' : 'hidden';

  return (
    <section
      id="build"
      className="relative overflow-hidden bg-paper py-[100px] px-7 min-[900px]:py-[140px] min-[900px]:px-[60px]"
    >
      {/* Atmospheric corner gradients — matches .build-section::before */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(45,92,46,0.04)_0%,transparent_70%),radial-gradient(ellipse_50%_60%_at_0%_100%,rgba(232,166,66,0.05)_0%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="mb-20 grid grid-cols-1 gap-6 min-[900px]:grid-cols-2 min-[900px]:items-end min-[900px]:gap-[60px]">
          <motion.div
            initial={initial}
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            variants={fadeUp(0)}
          >
            <span className="mb-5 block font-body text-[10px] font-light uppercase tracking-[0.28em] text-clay">
              · Aranyavana Earthscapes ·
            </span>
            <h2 className="font-display font-light leading-[1.05] tracking-[-0.02em] text-bark text-[clamp(40px,4.5vw,60px)]">
              What will you<br />
              build on your<br />
              <em className="italic text-harvest">land?</em>
            </h2>
          </motion.div>

          <motion.p
            initial={initial}
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            variants={fadeUp(0.1)}
            className="font-body text-[15px] font-light leading-[1.9] text-clay min-[900px]:max-w-[380px] min-[900px]:self-end min-[900px]:pb-1.5"
          >
            Your estate plot is a canvas. Aranyavana Earthscapes helps you
            shape it — from living landscapes rooted in native ecology, to
            nature homes built for slow, intentional living.
          </motion.p>
        </div>

        {/* ── DIVIDER ────────────────────────────────────────────── */}
        <motion.div
          aria-hidden="true"
          initial={initial}
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          variants={fadeUp(0.1)}
          className="mb-20 h-px w-full bg-[rgba(42,31,20,0.08)]"
        />

        {/* ── OFFERING GRID (two cards) ──────────────────────────── */}
        <motion.div
          initial={initial}
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          variants={fadeUp(0.2)}
          className="mb-20 grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-[rgba(42,31,20,0.06)] min-[900px]:grid-cols-2"
        >
          {/* ── LANDSCAPE ── */}
          <article className="group relative overflow-hidden bg-paper px-8 py-12 transition-colors duration-500 ease-editorial hover:bg-[#F5EDDF] min-[900px]:px-[52px] min-[900px]:py-16">
            {/* Ghost number */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-11 top-9 select-none font-display text-[72px] font-light leading-none tracking-[-0.04em] text-[rgba(42,31,20,0.06)] transition-colors duration-500 group-hover:text-[rgba(42,31,20,0.1)]"
            >
              01
            </span>

            {/* Gradient underline sweep on hover (was ::after) */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-canopy to-meadow transition-transform duration-700 ease-editorial group-hover:scale-x-100"
            />

            <div className="mb-9 h-9 w-9">
              <LandscapeIcon />
            </div>

            <span className="mb-4 block font-body text-[9px] font-normal uppercase tracking-[0.28em] text-fern">
              Landscape Design
            </span>

            <h3 className="mb-5 font-display font-light leading-[1.1] text-bark text-[clamp(30px,3vw,42px)]">
              Let the land<br />
              come <em className="italic text-harvest">alive.</em>
            </h3>

            <p className="mb-10 max-w-[340px] font-body text-[14px] font-light leading-[1.8] text-clay">
              Four landscape packages designed around native ecology, slow
              living, and the unique character of your plot. From a first
              grove of trees to a full edible forest sanctuary.
            </p>

            <div className="flex flex-col border-t border-[rgba(42,31,20,0.08)] pt-7">
              {LANDSCAPE_PACKAGES.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between border-b border-[rgba(42,31,20,0.06)] py-3"
                >
                  <span className="font-display text-[17px] font-light text-bark">
                    {p.name}
                  </span>
                  <span className="font-body text-[9px] font-light uppercase tracking-[0.18em] text-stone">
                    {p.tag}
                  </span>
                </div>
              ))}
            </div>
          </article>

          {/* ── HOMES ── */}
          <article className="group relative overflow-hidden bg-paper px-8 py-12 transition-colors duration-500 ease-editorial hover:bg-[#F5EDDF] min-[900px]:px-[52px] min-[900px]:py-16">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-11 top-9 select-none font-display text-[72px] font-light leading-none tracking-[-0.04em] text-[rgba(42,31,20,0.06)] transition-colors duration-500 group-hover:text-[rgba(42,31,20,0.1)]"
            >
              02
            </span>

            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-harvest to-dusk transition-transform duration-700 ease-editorial group-hover:scale-x-100"
            />

            <div className="mb-9 h-9 w-9">
              <HomeIcon />
            </div>

            <span className="mb-4 block font-body text-[9px] font-normal uppercase tracking-[0.28em] text-harvest">
              Construction Packages
            </span>

            <h3 className="mb-5 font-display font-light leading-[1.1] text-bark text-[clamp(30px,3vw,42px)]">
              A home that<br />
              <em className="italic text-harvest">breathes</em> with<br />
              the forest.
            </h3>

            <p className="mb-10 max-w-[340px] font-body text-[14px] font-light leading-[1.8] text-clay">
              Two nature-rooted home designs — built with CSEB, stone, lime,
              and timber. Conceived as retreats, not residences. Each one
              designed to grow more beautiful as the land around it matures.
            </p>

            <div className="flex flex-col border-t border-[rgba(42,31,20,0.08)] pt-7">
              {HOME_PACKAGES.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between border-b border-[rgba(42,31,20,0.06)] py-3"
                >
                  <span className="font-display text-[17px] font-light text-bark">
                    {p.name}
                  </span>
                  <span className="font-body text-[9px] font-light uppercase tracking-[0.18em] text-stone">
                    {p.tag}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </motion.div>

        {/* ── BOTTOM STRIP (note + CTA) ──────────────────────────── */}
        <motion.div
          initial={initial}
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          variants={fadeUp(0.3)}
          className="grid grid-cols-1 items-center gap-10 text-center min-[900px]:grid-cols-[1fr_auto] min-[900px]:text-left"
        >
          <p className="mx-auto font-display text-[20px] font-light italic leading-[1.5] text-clay min-[900px]:mx-0 min-[900px]:max-w-[480px]">
            Every detail is{' '}
            <strong className="font-normal not-italic text-bark">
              curated by Aranyavana
            </strong>
            {' '}— so your land becomes exactly what you imagined it could be.
          </p>

          <a
            href="#enquiry"
            className="group inline-flex flex-col items-center gap-3.5 self-center no-underline"
          >
            <span className="relative flex h-[100px] w-[100px] items-center justify-center rounded-full bg-bark transition-all duration-[400ms] ease-editorial group-hover:scale-[1.08] group-hover:bg-soil">
              {/* Expanding ring (was ::after) */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1.5 rounded-full border border-[rgba(42,31,20,0.15)] transition-all duration-[400ms] ease-editorial group-hover:-inset-3.5 group-hover:opacity-50"
              />
              <span
                aria-hidden="true"
                className="text-[22px] text-dusk transition-transform duration-300 group-hover:translate-x-[3px]"
              >
                →
              </span>
            </span>
            <span className="font-body text-[9px] font-normal uppercase tracking-[0.25em] text-clay">
              Enquire Now
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
