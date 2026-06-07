'use client';

import { useEffect } from 'react';

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
            <div className="sb-steps-grid">
              <div className="sb-step-card sb-reveal">
                <div className="sb-step-num">01</div>
                <svg className="sb-step-icon" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="22" r="10" stroke="#c4aa87" strokeWidth="0.8" opacity="0.4" />
                  <circle cx="20" cy="22" r="6" fill="rgba(196,170,135,0.15)" stroke="#c4aa87" strokeWidth="0.5" />
                  <line x1="20" y1="12" x2="20" y2="6" stroke="#c4aa87" strokeWidth="0.8" opacity="0.4" />
                  <line x1="20" y1="6" x2="17" y2="10" stroke="#c4aa87" strokeWidth="0.6" opacity="0.3" />
                  <line x1="20" y1="6" x2="23" y2="10" stroke="#c4aa87" strokeWidth="0.6" opacity="0.3" />
                </svg>
                <h3 className="sb-step-title">The Land Is Read</h3>
                <p className="sb-step-body">
                  Before seeding, we study the land — its topography, water flow, wind corridors, and existing ecology. The seedball species are chosen to belong here.
                </p>
                <span className="sb-step-tag">· Site Ecology Study</span>
              </div>
              <div className="sb-step-card sb-reveal sb-reveal-d1">
                <div className="sb-step-num">02</div>
                <svg className="sb-step-icon" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="24" r="8" fill="rgba(196,170,135,0.12)" stroke="#c4aa87" strokeWidth="0.7" />
                  <path d="M12 24 Q20 10 28 24" stroke="#c4aa87" strokeWidth="0.6" fill="none" opacity="0.4" />
                  <circle cx="20" cy="24" r="3" fill="rgba(196,170,135,0.3)" />
                </svg>
                <h3 className="sb-step-title">The Seeding</h3>
                <p className="sb-step-body">
                  5,000 seedballs — hand-rolled in clay, soil, and native seed — are scattered across the land by hand. No machinery. No chemicals. Just intention and earth.
                </p>
                <span className="sb-step-tag">· By Hand · By Intention</span>
              </div>
              <div className="sb-step-card sb-reveal sb-reveal-d2">
                <div className="sb-step-num">03</div>
                <svg className="sb-step-icon" viewBox="0 0 40 40" fill="none">
                  <path d="M20 34 L20 18" stroke="#c4aa87" strokeWidth="0.8" opacity="0.5" />
                  <path d="M20 22 Q26 16 30 18" stroke="#c4aa87" strokeWidth="0.6" fill="none" opacity="0.4" />
                  <path d="M20 26 Q14 20 10 22" stroke="#c4aa87" strokeWidth="0.6" fill="none" opacity="0.4" />
                  <ellipse cx="20" cy="34" rx="6" ry="2" stroke="#c4aa87" strokeWidth="0.5" opacity="0.3" />
                </svg>
                <h3 className="sb-step-title">The Forest Begins</h3>
                <p className="sb-step-body">
                  Months before residents arrive, the land is already transforming. Native trees take root. Wildlife returns. The community inherits a living ecosystem, not a cleared site.
                </p>
                <span className="sb-step-tag">· Living Before Sold</span>
              </div>
            </div>
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
