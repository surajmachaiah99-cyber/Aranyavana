'use client';

import { useEffect } from 'react';
import { LANDSCAPES, HOMES } from '@/lib/homes';

/**
 * HomesThatBreathe — Section 03 · Aranyavana Earthscapes
 *
 * On-page presence is now a TEASER: two-card grid + photo gallery +
 * package name/price lines, with a single CTA to request the private
 * briefing. The full space programs, materials, features, upgrades,
 * and investment tiers used to live inline as accordion rows; that
 * detail now lives at /dossier and is gated by the enquiry cookie.
 *
 * Scoping strategy (unchanged)
 *   - All styles live under `.s3` (and prefixed `s3-*`, `pkg-*`).
 *   - The `.pkg-*` accordion rules are retained but dormant in the
 *     stylesheet -- no elements consume them any more, and the spec
 *     allowed the dead rules to remain rather than be pruned.
 *   - Body font 'Montserrat', display 'Cormorant Garamond'.
 *
 * Interactions
 *   - Static teasers -- no accordion, no click-to-expand.
 *   - Reveal animation uses IntersectionObserver adding `.is-visible`
 *     to elements with `.fade-up`. Delays d1..d5 = 0/0.1/0.2/0.3/0.4s.
 *   - CTA circle scales + ring expands on hover; the arrow nudges right.
 */

// Types + data now live in lib/homes.ts, imported at the top of this
// file. Both this component and app/dossier/page.tsx read from that
// single source so the price/name shown here and the detail shown in
// the dossier can never drift apart.


// ────────────────────────────────────────────────────────────────────
// SVG marks
// ────────────────────────────────────────────────────────────────────

function LeafMark() {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M18 32 Q18 18 18 10" stroke="#4A7C45" strokeWidth="1.2" />
      <path d="M18 10 Q8 4 4 2 Q10 10 18 18" fill="#2D5C2E" opacity="0.7" />
      <path d="M18 16 Q28 10 32 2 Q26 10 18 18" fill="#4A7C45" opacity="0.8" />
      <path d="M10 32 Q18 30 26 32" stroke="#C4AA8A" strokeWidth="0.7" fill="none" />
    </svg>
  );
}

function HouseMark() {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M18 4 L32 18 L4 18 Z" stroke="#C47B1A" strokeWidth="1.2" fill="rgba(232,166,66,0.12)" />
      <rect x="10" y="18" width="16" height="14" stroke="#C47B1A" strokeWidth="1.2" fill="rgba(232,166,66,0.06)" />
      <rect x="15" y="24" width="6" height="8" stroke="#C47B1A" strokeWidth="0.8" fill="none" />
      <path d="M6 32 Q18 29 30 32" stroke="#C4AA8A" strokeWidth="0.7" fill="none" />
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────────
// Scoped styles — palette + layout for the .s3 namespace
// ────────────────────────────────────────────────────────────────────

const S3_STYLES = `
  .s3 {
    --bark:       #2A1F14;
    --soil:       #4A3520;
    --clay:       #8B6B47;
    --stone:      #C4AA8A;
    --parchment:  #F0E8D8;
    --paper:      #FAF6EF;
    --harvest:    #C47B1A;
    --dusk:       #F2C96A;
    --canopy:     #2D5C2E;
    --fern:       #4A7C45;
    --meadow:     #6B9B52;
    --divide:     rgba(42,31,20,0.08);
    --ease:       cubic-bezier(0.16, 1, 0.3, 1);

    position: relative;
    background: var(--paper);
    color: var(--bark);
    padding: 140px 60px;
    overflow: hidden;
    font-family: 'Montserrat', sans-serif;
  }
  .s3, .s3 * { box-sizing: border-box; }
  .s3::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 40% at 100% 0%, rgba(45,92,46,0.04) 0%, transparent 70%),
      radial-gradient(ellipse 50% 60% at 0% 100%, rgba(232,166,66,0.05) 0%, transparent 70%);
    pointer-events: none;
  }
  .s3-inner { max-width: 1280px; margin: 0 auto; position: relative; z-index: 1; }

  /* ── Reveal primitive ── */
  .s3 .fade-up {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
  }
  .s3 .fade-up.is-visible { opacity: 1; transform: translateY(0); }
  .s3 .fade-up.d1 { transition-delay: 0s; }
  .s3 .fade-up.d2 { transition-delay: 0.1s; }
  .s3 .fade-up.d3 { transition-delay: 0.2s; }
  .s3 .fade-up.d4 { transition-delay: 0.3s; }
  .s3 .fade-up.d5 { transition-delay: 0.4s; }

  /* ── Top badge: "03 ──── · Material Study · Tropical Modern Architecture · Udyana" ── */
  .s3-badge {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 56px;
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--clay);
  }
  .s3-badge-num {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.1em;
    color: var(--stone);
    text-transform: none;
  }
  .s3-badge-rule {
    flex: 0 0 84px;
    height: 1px;
    background: var(--stone);
    opacity: 0.55;
  }

  /* ── Header: 2-col title + intro ── */
  .s3-header {
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: 60px;
    align-items: end;
    margin-bottom: 64px;
  }
  .s3-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(40px, 4.6vw, 64px);
    line-height: 1.04;
    letter-spacing: -0.02em;
    color: var(--bark);
    margin: 0;
  }
  .s3-title em {
    font-style: italic;
    color: var(--harvest);
  }
  .s3-intro {
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    font-weight: 300;
    line-height: 1.9;
    letter-spacing: 0.01em;
    color: var(--clay);
    max-width: 420px;
    align-self: end;
    margin: 0;
  }

  .s3-divider {
    width: 100%;
    height: 1px;
    background: var(--divide);
    margin-bottom: 72px;
  }

  /* ── Two-card grid ── */
  .s3-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    background: rgba(42,31,20,0.06);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 80px;
  }
  .s3-card {
    background: var(--paper);
    padding: 64px 52px;
    position: relative;
    transition: background 0.5s var(--ease);
  }
  .s3-card::after {
    content: '';
    position: absolute;
    left: 0; right: 0; bottom: 0;
    height: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.6s var(--ease);
  }
  .s3-card.landscape::after { background: linear-gradient(90deg, var(--canopy), var(--meadow)); }
  .s3-card.homes::after     { background: linear-gradient(90deg, var(--harvest), var(--dusk)); }
  .s3-card:hover { background: #F5EDDF; }
  .s3-card:hover::after { transform: scaleX(1); }

  .card-num {
    position: absolute;
    top: 36px; right: 44px;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 72px;
    line-height: 1;
    letter-spacing: -0.04em;
    color: rgba(42,31,20,0.06);
    user-select: none;
    transition: color 0.5s ease;
  }
  .s3-card:hover .card-num { color: rgba(42,31,20,0.10); }

  .card-mark { width: 36px; height: 36px; margin-bottom: 36px; }
  .card-mark svg { width: 100%; height: 100%; }

  .card-type {
    display: block;
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .s3-card.landscape .card-type { color: var(--fern); }
  .s3-card.homes .card-type     { color: var(--harvest); }

  .card-headline {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(28px, 2.8vw, 38px);
    line-height: 1.1;
    color: var(--bark);
    margin: 0 0 20px;
  }
  .card-headline em { font-style: italic; color: var(--harvest); }

  .card-body {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.8;
    letter-spacing: 0.01em;
    color: var(--clay);
    margin: 0 0 40px;
    max-width: 360px;
  }

  /* ── Accordion ── */
  .card-packages {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--divide);
    padding-top: 12px;
  }
  .pkg-row {
    position: relative;
    border-bottom: 1px solid var(--divide);
  }
  .pkg-line {
    appearance: none;
    background: transparent;
    border: none;
    width: 100%;
    padding: 18px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    cursor: pointer;
    font: inherit;
    color: inherit;
    text-align: left;
  }
  .pkg-line:focus-visible {
    outline: 1px dashed var(--stone);
    outline-offset: 2px;
  }
  .pkg-name {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 19px;
    color: var(--bark);
    transition: color 0.35s var(--ease), transform 0.35s var(--ease);
  }
  .pkg-tag {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--stone);
    transition: color 0.35s var(--ease);
  }
  .pkg-chev {
    width: 8px; height: 8px;
    border-right: 1px solid var(--stone);
    border-bottom: 1px solid var(--stone);
    transform: rotate(-45deg);
    transition: transform 0.4s var(--ease), border-color 0.4s var(--ease);
  }
  .pkg-row.is-open .pkg-chev {
    transform: rotate(45deg);
  }
  .s3-card.landscape .pkg-row:hover .pkg-name,
  .s3-card.landscape .pkg-row.is-open .pkg-name {
    color: var(--canopy);
    transform: translateX(4px);
  }
  .s3-card.landscape .pkg-row:hover .pkg-tag,
  .s3-card.landscape .pkg-row.is-open .pkg-tag {
    color: var(--fern);
  }
  .s3-card.landscape .pkg-row:hover { border-bottom-color: rgba(45,92,46,0.45); }

  .s3-card.homes .pkg-row:hover .pkg-name,
  .s3-card.homes .pkg-row.is-open .pkg-name {
    color: var(--harvest);
    transform: translateX(4px);
  }
  .s3-card.homes .pkg-row:hover .pkg-tag,
  .s3-card.homes .pkg-row.is-open .pkg-tag {
    color: var(--harvest);
  }
  .s3-card.homes .pkg-row:hover { border-bottom-color: rgba(196,123,26,0.45); }

  .pkg-panel {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 0.5s var(--ease), opacity 0.5s var(--ease);
  }
  .pkg-row.is-open .pkg-panel {
    max-height: 1400px;
    opacity: 1;
  }
  .pkg-panel-inner {
    padding: 4px 0 28px;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    font-weight: 300;
    line-height: 1.7;
    letter-spacing: 0.01em;
    color: var(--clay);
  }
  .pkg-tagline {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 16px;
    color: var(--soil);
    margin: 0 0 20px;
  }
  .pkg-sec-label {
    display: block;
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--clay);
    opacity: 0.85;
    margin: 22px 0 10px;
  }
  .pkg-includes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 24px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .pkg-includes li {
    position: relative;
    padding-left: 14px;
    line-height: 1.7;
  }
  .pkg-includes li::before {
    content: '';
    position: absolute;
    left: 0; top: 0.65em;
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--fern);
    opacity: 0.8;
  }
  .s3-card.homes .pkg-includes li::before { background: var(--harvest); }

  .pkg-table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 4px;
  }
  .pkg-table th, .pkg-table td {
    text-align: left;
    padding: 7px 0;
    border-bottom: 1px solid var(--divide);
    font-weight: 300;
    vertical-align: top;
  }
  .pkg-table th {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    color: var(--soil);
    width: 42%;
    padding-right: 16px;
  }
  .pkg-table td {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    color: var(--clay);
  }
  .pkg-table tr:last-child th,
  .pkg-table tr:last-child td { border-bottom: none; }

  .pkg-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 18px;
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    color: var(--soil);
    margin: 0 0 4px;
    line-height: 1.7;
  }
  .pkg-meta strong {
    font-weight: 400;
    color: var(--bark);
    letter-spacing: 0.04em;
  }
  .pkg-meta-note {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 14px;
    color: var(--soil);
    margin: 0 0 6px;
  }

  .pkg-features {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .pkg-features li {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 6px 12px;
    border: 1px solid var(--divide);
    border-radius: 999px;
    color: var(--soil);
  }

  .pkg-invest-label {
    display: inline-block;
    margin: 4px 0 10px;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 17px;
    color: var(--bark);
  }
  .s3-card.landscape .pkg-invest-line { color: var(--canopy); }
  .s3-card.homes .pkg-invest-line { color: var(--harvest); }
  .pkg-invest-line {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.04em;
    margin: 0;
  }

  /* ── Static teaser row (replaces the previous accordion pkg-row) ──
     Detail moved to /dossier; the row here is name + price only. */
  .pkg-teaser {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 24px;
    padding: 18px 0;
    border-bottom: 1px solid var(--divide);
  }
  .pkg-teaser:last-child { border-bottom: none; }
  .pkg-teaser-tag {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--stone);
    flex-shrink: 0;
  }
  .s3-card.landscape .pkg-teaser-tag { color: var(--canopy); }
  .s3-card.homes .pkg-teaser-tag { color: var(--harvest); }

  /* ── Bottom strip: note + CTA ── */
  .s3-bottom {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 40px;
    align-items: center;
  }
  .s3-note {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 20px;
    font-weight: 300;
    line-height: 1.5;
    color: var(--clay);
    max-width: 480px;
    margin: 0;
  }
  .s3-note strong {
    font-style: normal;
    font-weight: 400;
    color: var(--bark);
  }

  .s3-cta {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    text-decoration: none;
    cursor: pointer;
  }
  .cta-circle {
    position: relative;
    width: 100px; height: 100px;
    border-radius: 50%;
    background: var(--bark);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.4s var(--ease), background 0.3s ease;
  }
  .cta-circle::after {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 1px solid rgba(42,31,20,0.15);
    transition: inset 0.4s var(--ease), opacity 0.4s ease;
  }
  .s3-cta:hover .cta-circle {
    transform: scale(1.08);
    background: var(--soil);
  }
  .s3-cta:hover .cta-circle::after {
    inset: -14px;
    opacity: 0.5;
  }
  .cta-arrow {
    font-size: 22px;
    color: var(--dusk);
    transition: transform 0.3s ease;
  }
  .s3-cta:hover .cta-arrow { transform: translateX(3px); }
  .cta-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--clay);
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .s3 { padding: 100px 28px; }
    .s3-header { grid-template-columns: 1fr; gap: 24px; }
    .s3-intro { max-width: 100%; }
    .s3-grid { grid-template-columns: 1fr; }
    .s3-card { padding: 48px 32px; }
    .pkg-includes { grid-template-columns: 1fr; }
    .s3-bottom { grid-template-columns: 1fr; text-align: center; }
    .s3-note { max-width: 100%; }
    .s3-cta { align-self: center; }
    .pkg-line { gap: 12px; }
  }
`;

// ────────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────────

export default function HomesThatBreathe() {
  // Static teasers -- no expand/collapse. Full detail moved to /dossier.

  // Reveal on scroll per the spec's IntersectionObserver settings.
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.s3 .fade-up');
    if (!targets.length) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      targets.forEach((t) => t.classList.add('is-visible'));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );

    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  // Homes slider — direct port of the spec's IIFE per its framework note:
  // "wrap the above inside a useEffect ... in the relevant component file".
  // Uses DOM queries (not React state) so the spec's behavior is preserved
  // byte-for-byte: 4.5s autoplay, dot/thumb/arrow/keyboard/swipe controls,
  // pause-on-hover, prefers-reduced-motion bail-out.
  useEffect(() => {
    const track = document.getElementById('hsTrack');
    if (!track) return; // slider not on this page

    const slides = track.querySelectorAll<HTMLElement>('.hs-slide');
    const dots = document.querySelectorAll<HTMLButtonElement>('#hsDots .hs-dot');
    const thumbs = document.querySelectorAll<HTMLElement>('#hsThumbs .hs-thumb');
    const counter = document.getElementById('hsCurrent');
    const total = slides.length;
    if (!total) return;

    let current = 0;
    let timer: ReturnType<typeof setInterval> | null = null;
    const DELAY = 4500;

    const goTo = (n: number) => {
      slides[current]?.classList.remove('hs-active');
      dots[current]?.classList.remove('hs-dot-active');
      thumbs[current]?.classList.remove('hs-thumb-active');
      current = ((n % total) + total) % total;
      slides[current]?.classList.add('hs-active');
      dots[current]?.classList.add('hs-dot-active');
      thumbs[current]?.classList.add('hs-thumb-active');
      if (counter) counter.textContent = String(current + 1);
      resetTimer();
    };

    const resetTimer = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), DELAY);
    };

    const btnNext = document.getElementById('hsNext');
    const btnPrev = document.getElementById('hsPrev');
    const onNext = () => goTo(current + 1);
    const onPrev = () => goTo(current - 1);
    btnNext?.addEventListener('click', onNext);
    btnPrev?.addEventListener('click', onPrev);

    const dotHandlers: Array<() => void> = [];
    dots.forEach((d) => {
      const h = () => goTo(parseInt(d.dataset.i ?? '0', 10));
      dotHandlers.push(h);
      d.addEventListener('click', h);
    });

    const thumbHandlers: Array<() => void> = [];
    thumbs.forEach((t) => {
      const h = () => goTo(parseInt(t.dataset.i ?? '0', 10));
      thumbHandlers.push(h);
      t.addEventListener('click', h);
    });

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft') goTo(current - 1);
    };
    document.addEventListener('keydown', onKeydown);

    let touchStartX: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartX === null) return;
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
      touchStartX = null;
    };
    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchend', onTouchEnd, { passive: true });

    const onMouseEnter = () => {
      if (timer) clearInterval(timer);
    };
    const onMouseLeave = () => resetTimer();
    track.addEventListener('mouseenter', onMouseEnter);
    track.addEventListener('mouseleave', onMouseLeave);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      slides.forEach((s) => {
        s.style.transition = 'none';
      });
    } else {
      resetTimer();
    }

    return () => {
      if (timer) clearInterval(timer);
      btnNext?.removeEventListener('click', onNext);
      btnPrev?.removeEventListener('click', onPrev);
      dots.forEach((d, i) => d.removeEventListener('click', dotHandlers[i]));
      thumbs.forEach((t, i) => t.removeEventListener('click', thumbHandlers[i]));
      document.removeEventListener('keydown', onKeydown);
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchend', onTouchEnd);
      track.removeEventListener('mouseenter', onMouseEnter);
      track.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: S3_STYLES }} />

      <section id="earthscapes" className="s3">
        <div className="s3-inner">
          {/* Badge */}
          <div className="s3-badge fade-up d1">
            <span className="s3-badge-num">03</span>
            <span className="s3-badge-rule" />
            <span>· Material Study · Tropical Modern Architecture · Udyana</span>
          </div>

          {/* Header */}
          <div className="s3-header">
            <h2 className="s3-title fade-up d1">
              Homes That{' '}
              <em>Breathe.</em>
            </h2>
            <p className="s3-intro fade-up d2">
              To protect the long-term aesthetic value and environmental
              integrity of Udyana, every estate is shaped by a Tropical Modern
              design language — homes of CSEB, stone, lime and timber that age
              gracefully alongside the forest.
            </p>
          </div>

          <div className="s3-divider fade-up d2" />

          {/* Two-card grid */}
          <div className="s3-grid">
            {/* ── LANDSCAPE ── */}
            <article className="s3-card landscape fade-up d3">
              <span className="card-num">01</span>
              <div className="card-mark"><LeafMark /></div>
              <span className="card-type">Landscape Design</span>
              <h3 className="card-headline">
                Let the land<br /> come <em>alive.</em>
              </h3>
              <p className="card-body">
                Two landscape packages designed around native ecology, slow
                living and the unique character of your plot — from a first
                grove of trees to a private woodland sanctuary.
              </p>

              <div className="card-packages">
                {LANDSCAPES.map((p) => (
                  <div key={p.id} className="pkg-teaser">
                    <span className="pkg-name">{p.name}</span>
                    <span className="pkg-teaser-tag">{p.investment}</span>
                  </div>
                ))}
              </div>
            </article>

            {/* ── HOMES ── */}
            <article className="s3-card homes fade-up d4">
              <span className="card-num">02</span>
              <div className="card-mark"><HouseMark /></div>
              <span className="card-type">Construction Packages</span>
              <h3 className="card-headline">
                A home that<br /> <em>breathes</em> with<br /> the forest.
              </h3>
              <p className="card-body">
                Two nature-rooted home designs — built with CSEB, stone, lime
                and timber. Conceived as retreats, not residences. Each one
                grows more beautiful as the land around it matures.
              </p>

              <div className="card-packages">
                {HOMES.map((h) => (
                  <div key={h.id} className="pkg-teaser">
                    <span className="pkg-name">{h.name}</span>
                    <span className="pkg-teaser-tag">
                      {h.trigger} · {h.area}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>

          {/* ── HOMES THAT BREATHE · PHOTO SLIDER ──
             Drop-in slider per the aranyavana-homes-slider spec.
             Lives as a full-width row between the 2-card grid and the
             bottom CTA strip — i.e. NOT inside either card, per spec's
             "Do not insert it inside a card" rule. */}
          <div className="ht-slider-wrap fade-up d5">
            <div className="hs-track" id="hsTrack">
              <div className="hs-slide hs-active" data-index="0">
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/vanasiri-canopy.jpg"
                    alt="Earth-block villa integrated with forest canopy"
                    loading="lazy"
                  />
                  <div className="hs-overlay" />
                </div>
                <div className="hs-caption">
                  <span className="hs-caption-sub">
                    CSEB · Compressed Stabilised Earth Blocks
                  </span>
                  <p className="hs-caption-main">
                    Born from the earth. Held by the forest.
                  </p>
                </div>
              </div>

              <div className="hs-slide" data-index="1">
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/vanasiri-windows.jpg"
                    alt="Panoramic windows and surrounding tree canopy"
                    loading="lazy"
                  />
                  <div className="hs-overlay" />
                </div>
                <div className="hs-caption">
                  <span className="hs-caption-sub">
                    Passive Cooling · Panoramic Windows
                  </span>
                  <p className="hs-caption-main">
                    Light pours in. The canopy holds court outside.
                  </p>
                </div>
              </div>

              <div className="hs-slide" data-index="2">
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/vanasiri-courtyard.jpg"
                    alt="Stone courtyard with seating and climbing vines"
                    loading="lazy"
                  />
                  <div className="hs-overlay" />
                </div>
                <div className="hs-caption">
                  <span className="hs-caption-sub">
                    Thermal Comfort · Natural Materials
                  </span>
                  <p className="hs-caption-main">
                    Where stone, vine, and silence meet.
                  </p>
                </div>
              </div>

              <div className="hs-slide" data-index="3">
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/vanasiri-entry.jpg"
                    alt="Terracotta roof entry with natural timber details"
                    loading="lazy"
                  />
                  <div className="hs-overlay" />
                </div>
                <div className="hs-caption">
                  <span className="hs-caption-sub">
                    Terracotta Roof · Timber Entry
                  </span>
                  <p className="hs-caption-main">
                    Terracotta fired by sun. Cooled by shadow.
                  </p>
                </div>
              </div>
            </div>

            <div className="hs-controls">
              <div className="hs-dots" id="hsDots">
                <button
                  type="button"
                  className="hs-dot hs-dot-active"
                  data-i="0"
                  aria-label="Slide 1"
                />
                <button type="button" className="hs-dot" data-i="1" aria-label="Slide 2" />
                <button type="button" className="hs-dot" data-i="2" aria-label="Slide 3" />
                <button type="button" className="hs-dot" data-i="3" aria-label="Slide 4" />
              </div>
              <div className="hs-counter">
                <span className="hs-counter-current" id="hsCurrent">
                  1
                </span>{' '}
                / 4
              </div>
              <div className="hs-arrows">
                <button
                  type="button"
                  className="hs-arrow"
                  id="hsPrev"
                  aria-label="Previous slide"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="hs-arrow"
                  id="hsNext"
                  aria-label="Next slide"
                >
                  →
                </button>
              </div>
            </div>

            <div className="hs-thumbs" id="hsThumbs">
              <div className="hs-thumb hs-thumb-active" data-i="0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/vanasiri-canopy.jpg" alt="Slide 1 thumbnail" loading="lazy" />
              </div>
              <div className="hs-thumb" data-i="1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/vanasiri-windows.jpg" alt="Slide 2 thumbnail" loading="lazy" />
              </div>
              <div className="hs-thumb" data-i="2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/vanasiri-courtyard.jpg" alt="Slide 3 thumbnail" loading="lazy" />
              </div>
              <div className="hs-thumb" data-i="3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/vanasiri-entry.jpg" alt="Slide 4 thumbnail" loading="lazy" />
              </div>
            </div>

            <div className="hs-tags">
              <span className="hs-tag">Thermal Comfort</span>
              <span className="hs-tag">Born from the Earth</span>
              <span className="hs-tag">Passive Cooling</span>
              <span className="hs-tag">Extensions of the Forest Canopy</span>
              <span className="hs-tag">Terracotta Roof</span>
            </div>
          </div>

          {/* Bottom strip — teaser closes with the dossier hand-off. Full
              space programs, materials, and finish schedules live at
              /dossier and are unlocked by submitting the enquiry form. */}
          <div className="s3-bottom fade-up d5">
            <p className="s3-note">
              Full space programs, material specifications, and finish
              schedules are shared at the{' '}
              <strong>private briefing.</strong>
            </p>
            <a href="#enquiry" className="s3-cta" aria-label="Request a private briefing">
              <span className="cta-circle">
                <span className="cta-arrow" aria-hidden="true">→</span>
              </span>
              <span className="cta-label">Request a Private Briefing</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
