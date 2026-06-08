'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Ritual steps data — promoted to module scope so the tab switcher
 * inside SeedballSection can render the right SVG, body and sub-label
 * for whichever step is currently active.
 */
const RITUAL_STEPS = [
  {
    id: '01',
    title: 'The Land Is Read',
    body: 'Before seeding, we study the land — its topography, water flow, wind corridors, and existing ecology. The seedball species are chosen to belong here.',
    tag: '· Site Ecology Study',
    Icon: () => (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="22" r="10" stroke="#c4aa87" strokeWidth="0.8" opacity="0.4" />
        <circle cx="20" cy="22" r="6" fill="rgba(196,170,135,0.15)" stroke="#c4aa87" strokeWidth="0.5" />
        <line x1="20" y1="12" x2="20" y2="6" stroke="#c4aa87" strokeWidth="0.8" opacity="0.4" />
        <line x1="20" y1="6" x2="17" y2="10" stroke="#c4aa87" strokeWidth="0.6" opacity="0.3" />
        <line x1="20" y1="6" x2="23" y2="10" stroke="#c4aa87" strokeWidth="0.6" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'The Seeding',
    body: '5,000 seedballs — hand-rolled in clay, soil, and native seed — are scattered across the land by hand. No machinery. No chemicals. Just intention and earth.',
    tag: '· By Hand · By Intention',
    Icon: () => (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="24" r="8" fill="rgba(196,170,135,0.12)" stroke="#c4aa87" strokeWidth="0.7" />
        <path d="M12 24 Q20 10 28 24" stroke="#c4aa87" strokeWidth="0.6" fill="none" opacity="0.4" />
        <circle cx="20" cy="24" r="3" fill="rgba(196,170,135,0.3)" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'The Forest Begins',
    body: 'Months before residents arrive, the land is already transforming. Native trees take root. Wildlife returns. The community inherits a living ecosystem, not a cleared site.',
    tag: '· Living Before Sold',
    Icon: () => (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M20 34 L20 18" stroke="#c4aa87" strokeWidth="0.8" opacity="0.5" />
        <path d="M20 22 Q26 16 30 18" stroke="#c4aa87" strokeWidth="0.6" fill="none" opacity="0.4" />
        <path d="M20 26 Q14 20 10 22" stroke="#c4aa87" strokeWidth="0.6" fill="none" opacity="0.4" />
        <ellipse cx="20" cy="34" rx="6" ry="2" stroke="#c4aa87" strokeWidth="0.5" opacity="0.3" />
      </svg>
    ),
  },
] as const;

/**
 * SeedballSection — direct port of aranyavana-seedball-integration.html
 *
 * Lossless port rules followed:
 *  - Every CSS rule preserved character-for-character (delivered via a
 *    single <style dangerouslySetInnerHTML> tag at component mount, so
 *    selector specificity matches the source file exactly).
 *  - Class namespace .ara-sb and every sb- prefixed class kept verbatim.
 *  - All copy preserved verbatim, including Kannada script translations
 *    (ಬಿಲ್ವ, ಪೂವರಸು, ಹುಣಸೆ, ಕೃಷ್ಣಚೂಡ, ಕಣಿಕೊನ್ನೆ, ಸೀಮೆ ಹುಣಸೆ).
 *  - SVG paths, viewBoxes, stroke widths preserved; React requires
 *    camelCase prop names so stroke-width → strokeWidth etc.
 *  - The original IIFE IntersectionObserver is reproduced in useEffect
 *    with a cleanup that disconnects on unmount.
 *
 * Insertion point per the integration brief: immediately after the
 * hero section's closing tag — i.e. between <Hero /> and <Thesis />
 * in app/page.tsx.
 */

const SEEDBALL_STYLES = `
  /* ── TOKENS (scoped, won't override site :root) ── */
  .ara-sb {
    --sb-forest:     #1a2318;
    --sb-moss:       #2e3d28;
    --sb-bark:       #5c4a32;
    --sb-sand:       #c4aa87;
    --sb-parchment:  #f0e8d8;
    --sb-cream:      #faf6ef;
  }

  /* ── RESET within scope only ── */
  .ara-sb *, .ara-sb *::before, .ara-sb *::after {
    box-sizing: border-box;
  }

  /* ── WRAPPER ── */
  .ara-sb {
    width: 100%;
    overflow-x: hidden;
    background: var(--sb-forest);
    color: var(--sb-parchment);
    font-family: 'Jost', sans-serif;
    font-weight: 300;
  }

  /* ── SHARED UTILITIES ── */
  .ara-sb .sb-section-label {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 10px;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--sb-sand);
    margin-bottom: 20px;
    opacity: 0.7;
  }
  .ara-sb .sb-full-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(196,170,135,0.2), transparent);
  }
  .ara-sb .sb-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .ara-sb .sb-reveal.sb-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .ara-sb .sb-reveal-d1 { transition-delay: 0.1s; }
  .ara-sb .sb-reveal-d2 { transition-delay: 0.2s; }
  .ara-sb .sb-reveal-d3 { transition-delay: 0.3s; }

  /* ══════════════════════════════════════════
     SECTION A — PHILOSOPHY
  ══════════════════════════════════════════ */
  .ara-sb .sb-philosophy {
    padding: 100px 24px;
    max-width: 1100px;
    margin: 0 auto;
  }
  .ara-sb .sb-section-number {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: 0.3em;
    color: rgba(196,170,135,0.25);
    margin-bottom: 48px;
  }
  .ara-sb .sb-philosophy-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: start;
  }
  @media (max-width: 768px) {
    .ara-sb .sb-philosophy-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }
  .ara-sb .sb-philosophy-heading {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(30px, 4.5vw, 50px);
    line-height: 1.15;
    color: var(--sb-cream);
    margin: 0 0 8px 0;
  }
  .ara-sb .sb-philosophy-heading em {
    font-style: italic;
    color: var(--sb-sand);
  }
  .ara-sb .sb-blockquote {
    border-left: 1px solid rgba(196,170,135,0.3);
    padding: 4px 0 4px 24px;
    margin: 36px 0 0 0;
  }
  .ara-sb .sb-blockquote p {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: clamp(17px, 2.2vw, 22px);
    line-height: 1.6;
    color: var(--sb-sand);
    font-weight: 300;
    margin: 0;
  }
  .ara-sb .sb-philosophy-body p {
    font-size: 14px;
    line-height: 2;
    color: rgba(240,232,216,0.68);
    margin-bottom: 18px;
  }
  .ara-sb .sb-philosophy-body p:last-child { margin-bottom: 0; }
  .ara-sb .sb-philosophy-body strong {
    color: var(--sb-parchment);
    font-weight: 400;
  }

  /* ── Philosophy closer ──
     Full-width punchline below the 2-col grid. Inherits the Thesis
     section's strongest line, now used as the editorial exit of the
     philosophy block (eliminates the standalone Thesis section). */
  .ara-sb .sb-philosophy-closer {
    grid-column: 1 / -1;
    margin-top: 72px;
    padding-top: 56px;
    border-top: 1px solid rgba(196,170,135,0.12);
    text-align: center;
  }
  .ara-sb .sb-philosophy-closer-dot {
    display: block;
    width: 4px;
    height: 4px;
    background: var(--sb-sand);
    border-radius: 50%;
    margin: 0 auto 28px;
    opacity: 0.7;
  }
  .ara-sb .sb-philosophy-closer-quote {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 300;
    font-size: clamp(26px, 4.2vw, 48px);
    line-height: 1.2;
    letter-spacing: -0.005em;
    color: var(--sb-cream);
    max-width: 820px;
    margin: 0 auto;
  }
  .ara-sb .sb-philosophy-closer-quote span {
    display: block;
  }
  .ara-sb .sb-philosophy-closer-quote em {
    font-style: italic;
    color: var(--sb-sand);
  }

  /* ══════════════════════════════════════════
     SECTION B — RITUAL STEPS
  ══════════════════════════════════════════ */
  .ara-sb .sb-ritual {
    background: var(--sb-moss);
    padding: 100px 24px;
  }
  .ara-sb .sb-ritual-inner {
    max-width: 1100px;
    margin: 0 auto;
  }
  .ara-sb .sb-ritual-header {
    text-align: center;
    margin-bottom: 64px;
  }
  .ara-sb .sb-ritual-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(28px, 4.5vw, 48px);
    color: var(--sb-cream);
    line-height: 1.2;
    margin: 0 0 16px 0;
  }
  .ara-sb .sb-ritual-title em {
    font-style: italic;
    color: var(--sb-sand);
  }
  .ara-sb .sb-ritual-desc {
    font-size: 13px;
    color: rgba(240,232,216,0.55);
    letter-spacing: 0.04em;
    line-height: 1.85;
    max-width: 500px;
    margin: 0 auto;
  }
  .ara-sb .sb-steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(196,170,135,0.08);
  }
  @media (max-width: 768px) {
    .ara-sb .sb-steps-grid { grid-template-columns: 1fr; }
  }
  .ara-sb .sb-step-card {
    background: var(--sb-moss);
    padding: 44px 32px;
    position: relative;
    transition: background 0.4s ease;
  }
  .ara-sb .sb-step-card:hover { background: #344a2e; }
  .ara-sb .sb-step-num {
    position: absolute;
    top: 20px;
    right: 24px;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 64px;
    color: rgba(196,170,135,0.06);
    line-height: 1;
  }
  .ara-sb .sb-step-icon {
    width: 38px;
    height: 38px;
    margin-bottom: 24px;
    opacity: 0.65;
  }
  .ara-sb .sb-step-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: 21px;
    color: var(--sb-cream);
    margin: 0 0 12px 0;
    line-height: 1.3;
  }
  .ara-sb .sb-step-body {
    font-size: 13px;
    line-height: 1.9;
    color: rgba(240,232,216,0.58);
    margin: 0;
  }
  .ara-sb .sb-step-tag {
    display: inline-block;
    margin-top: 20px;
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 9px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--sb-sand);
    opacity: 0.55;
  }

  /* ── RITUAL TAB SWITCHER ──
     Replaces the original .sb-steps-grid card layout. The old
     .sb-step-* rules above are kept dormant for easy revert. */
  .ara-sb .sb-tabs {
    max-width: 980px;
    margin: 0 auto;
  }
  .ara-sb .sb-tab-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-bottom: 1px solid rgba(196,170,135,0.18);
    margin-bottom: 56px;
  }
  @media (max-width: 768px) {
    .ara-sb .sb-tab-strip {
      grid-template-columns: 1fr;
      gap: 1px;
      background: rgba(196,170,135,0.1);
      border-bottom: none;
    }
  }
  .ara-sb .sb-tab-btn {
    appearance: none;
    background: transparent;
    border: none;
    padding: 26px 18px;
    text-align: left;
    cursor: pointer;
    position: relative;
    font: inherit;
    color: rgba(240,232,216,0.55);
    transition: color 0.4s ease, background 0.4s ease;
  }
  .ara-sb .sb-tab-btn:hover { color: rgba(240,232,216,0.85); }
  .ara-sb .sb-tab-btn:focus-visible {
    outline: 1px solid var(--sb-sand);
    outline-offset: -2px;
  }
  .ara-sb .sb-tab-btn.is-active { color: var(--sb-cream); }
  @media (max-width: 768px) {
    .ara-sb .sb-tab-btn { background: var(--sb-moss); padding: 22px 24px; }
  }
  .ara-sb .sb-tab-btn::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    bottom: -1px;
    height: 1px;
    background: var(--sb-sand);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @media (max-width: 768px) {
    .ara-sb .sb-tab-btn::after { bottom: 0; }
  }
  .ara-sb .sb-tab-btn.is-active::after { transform: scaleX(1); }

  .ara-sb .sb-tab-num {
    display: block;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 300;
    font-size: 13px;
    color: var(--sb-sand);
    opacity: 0.7;
    margin-bottom: 6px;
    letter-spacing: 0.05em;
  }
  .ara-sb .sb-tab-title {
    display: block;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: clamp(16px, 2vw, 20px);
    letter-spacing: -0.005em;
    line-height: 1.3;
  }

  /* Tab panel — body styling matches the user-supplied snippet */
  .ara-sb .sb-tab-panel {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 36px;
    align-items: start;
    padding: 8px 18px;
  }
  @media (max-width: 768px) {
    .ara-sb .sb-tab-panel { grid-template-columns: 1fr; gap: 20px; }
  }
  .ara-sb .sb-tab-icon { width: 56px; height: 56px; opacity: 0.75; }
  .ara-sb .sb-tab-icon svg { width: 100%; height: 100%; }

  .ara-sb .sb-tab-body {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 1.65;
    letter-spacing: 0.03em;
    color: var(--sb-parchment);
    margin: 0;
    max-width: 580px;
  }
  .ara-sb .sb-tab-tag {
    display: inline-block;
    margin-top: 24px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--sb-sand);
    opacity: 0.7;
  }

  /* ══════════════════════════════════════════
     SECTION C — SPECIES STRIP
  ══════════════════════════════════════════ */
  .ara-sb .sb-species {
    padding: 90px 24px;
    max-width: 1100px;
    margin: 0 auto;
  }
  .ara-sb .sb-species-heading {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(26px, 3.8vw, 42px);
    color: var(--sb-cream);
    margin: 0 0 10px 0;
  }
  .ara-sb .sb-species-heading em {
    font-style: italic;
    color: var(--sb-sand);
  }
  .ara-sb .sb-species-sub {
    font-size: 13px;
    color: rgba(196,170,135,0.55);
    letter-spacing: 0.04em;
    margin-bottom: 48px;
    line-height: 1.8;
  }
  .ara-sb .sb-species-scroll {
    display: flex;
    gap: 2px;
    overflow-x: auto;
    padding-bottom: 12px;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .ara-sb .sb-species-scroll::-webkit-scrollbar { display: none; }
  .ara-sb .sb-species-card {
    flex: 0 0 190px;
    background: rgba(46,61,40,0.45);
    border: 1px solid rgba(196,170,135,0.1);
    padding: 28px 22px;
    transition: border-color 0.3s, background 0.3s;
    cursor: default;
  }
  .ara-sb .sb-species-card:hover {
    border-color: rgba(196,170,135,0.28);
    background: rgba(46,61,40,0.75);
  }
  .ara-sb .sb-species-name {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: 17px;
    color: var(--sb-cream);
    margin-bottom: 4px;
  }
  .ara-sb .sb-species-local {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 11px;
    color: var(--sb-sand);
    opacity: 0.58;
    margin-bottom: 14px;
    letter-spacing: 0.04em;
  }
  .ara-sb .sb-species-desc {
    font-size: 12px;
    line-height: 1.8;
    color: rgba(240,232,216,0.48);
  }
`;

/**
 * RitualTabs — click-to-switch tab UI that replaces the original
 * 3-card grid. Tabs read 01/02/03 with the step title. Active tab
 * gets a gold underline; the panel below cross-fades between steps
 * via AnimatePresence. Body styling per the supplied Montserrat
 * snippet, mapped to the scoped .sb-tab-* classes above so it stays
 * inside the .ara-sb namespace and doesn't leak.
 */
function RitualTabs() {
  const [activeId, setActiveId] = useState<(typeof RITUAL_STEPS)[number]['id']>('01');
  const active = RITUAL_STEPS.find((s) => s.id === activeId) ?? RITUAL_STEPS[0];

  return (
    <div className="sb-tabs">
      <div className="sb-tab-strip" role="tablist" aria-label="Seeding ritual steps">
        {RITUAL_STEPS.map((step) => {
          const isActive = step.id === activeId;
          return (
            <button
              key={step.id}
              type="button"
              role="tab"
              id={`sb-tab-${step.id}`}
              aria-selected={isActive}
              aria-controls={`sb-panel-${step.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(step.id)}
              className={`sb-tab-btn${isActive ? ' is-active' : ''}`}
            >
              <span className="sb-tab-num">{step.id}</span>
              <span className="sb-tab-title">{step.title}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.id}
          role="tabpanel"
          id={`sb-panel-${active.id}`}
          aria-labelledby={`sb-tab-${active.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="sb-tab-panel"
        >
          <div className="sb-tab-icon">
            <active.Icon />
          </div>
          <div>
            <p className="sb-tab-body">{active.body}</p>
            <span className="sb-tab-tag">{active.tag}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function SeedballSection() {
  // Mirrors the original IIFE in aranyavana-seedball-integration.html.
  // Scope-limited to .ara-sb .sb-reveal so it never double-fires on the
  // site's existing framer-motion reveal elements.
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>('.ara-sb .sb-reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('sb-visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SEEDBALL_STYLES }} />

      <div className="ara-sb">
        {/* ── PHILOSOPHY ── */}
        <div className="sb-full-divider" />
        <div className="sb-philosophy">
          <div className="sb-section-label sb-reveal">· The Aranyavana Philosophy ·</div>
          <div className="sb-section-number sb-reveal sb-reveal-d1">01</div>
          <div className="sb-philosophy-grid">
            <div>
              <h2 className="sb-philosophy-heading sb-reveal sb-reveal-d2">
                Every project<br />begins with<br /><em>a seedball.</em>
              </h2>
              <div className="sb-blockquote sb-reveal sb-reveal-d3">
                <p>&ldquo;We think in generations.<br />So do you.&rdquo;</p>
              </div>
            </div>
            <div className="sb-philosophy-body sb-reveal sb-reveal-d2">
              <p>Most developers begin with machinery — grading, flattening, imposing geometry on the earth. At Aranyavana, our first act is the opposite.</p>
              <p>Before a single boundary is marked, before any road is laid or structure rises, <strong>we seed the land.</strong> Thousands of native seedballs, hand-scattered across every project we build.</p>
              <p>This is not a gesture. It is a <strong>founding principle.</strong> A declaration that the land we steward is already alive — and our job is to deepen that life, not erase it.</p>
              <p>By the time our communities are complete, the forest has already begun. Trees that will stand for a hundred years. Long after our names are forgotten.</p>
            </div>

            {/* ── Closing punchline — absorbed from the deleted Thesis section ── */}
            <figure className="sb-philosophy-closer sb-reveal sb-reveal-d3">
              <span aria-hidden="true" className="sb-philosophy-closer-dot" />
              <blockquote className="sb-philosophy-closer-quote">
                <span>Nature is not the backdrop to life here.</span>
                <span><em>Nature is the architect.</em></span>
              </blockquote>
            </figure>
          </div>
        </div>

        {/* ── RITUAL STEPS ── */}
        <div className="sb-full-divider" />
        <div className="sb-ritual">
          <div className="sb-ritual-inner">
            <div className="sb-ritual-header">
              <div className="sb-section-label sb-reveal">· The Seeding Ritual ·</div>
              <h2 className="sb-ritual-title sb-reveal sb-reveal-d1">
                How <em>every</em> Aranyavana<br />project begins.
              </h2>
              <p className="sb-ritual-desc sb-reveal sb-reveal-d2">
                A practice repeated at Udyana, and at every community we build hereafter. This is how Aranyavana begins.
              </p>
            </div>
            <RitualTabs />
          </div>
        </div>

        {/* ── SPECIES STRIP ── */}
        <div className="sb-full-divider" />
        <div className="sb-species">
          <div className="sb-section-label sb-reveal">· Native Species · Udyana · Kudlur</div>
          <h2 className="sb-species-heading sb-reveal sb-reveal-d1">
            Trees seeded at <em>Udyana.</em>
          </h2>
          <p className="sb-species-sub sb-reveal sb-reveal-d2">
            Selected for their ecological value, longevity, and deep roots in this landscape.
          </p>
          <div className="sb-species-scroll sb-reveal sb-reveal-d3">
            <div className="sb-species-card">
              <div className="sb-species-name">Bael Tree</div>
              <div className="sb-species-local">ಬಿಲ್ವ · Bilva</div>
              <div className="sb-species-desc">
                Sacred and medicinal. Drought-resilient. Can live for centuries, becoming a landmark of the estate.
              </div>
            </div>
            <div className="sb-species-card">
              <div className="sb-species-name">Indian Tulip</div>
              <div className="sb-species-local">ಪೂವರಸು · Poovarasu</div>
              <div className="sb-species-desc">
                Fast-growing canopy tree. Creates natural shade corridors along lakefront edges.
              </div>
            </div>
            <div className="sb-species-card">
              <div className="sb-species-name">Tamarind</div>
              <div className="sb-species-local">ಹುಣಸೆ · Hunase</div>
              <div className="sb-species-desc">
                Ancient, gnarled, magnificent. A tamarind tree planted today will feed generations for two centuries.
              </div>
            </div>
            <div className="sb-species-card">
              <div className="sb-species-name">Peacock Flower</div>
              <div className="sb-species-local">ಕೃಷ್ಣಚೂಡ</div>
              <div className="sb-species-desc">
                Vivid orange blooms. Attracts birds and butterflies. Transforms the lakefront into a living canvas each season.
              </div>
            </div>
            <div className="sb-species-card">
              <div className="sb-species-name">Laburnum</div>
              <div className="sb-species-local">ಕಣಿಕೊನ್ನೆ · Kanikonne</div>
              <div className="sb-species-desc">
                The golden shower tree. Cascades of yellow blossoms mark the seasons. A tree of celebration and abundance.
              </div>
            </div>
            <div className="sb-species-card">
              <div className="sb-species-name">Manila Tamarind</div>
              <div className="sb-species-local">ಸೀಮೆ ಹುಣಸೆ · Seeme Hunase</div>
              <div className="sb-species-desc">
                Nitrogen-fixing. Soil restoring. Every tree improves the land around it for decades.
              </div>
            </div>
          </div>
        </div>
        <div className="sb-full-divider" />
      </div>
    </>
  );
}
