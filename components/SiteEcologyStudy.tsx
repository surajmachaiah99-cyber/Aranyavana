'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * SiteEcologyStudy — Independent Spatial Risk Report panel for Udyana.
 *
 * Architecture
 * ─────────────
 *  - SiteEcologyTrigger  : button that replaces the `· Site Ecology Study`
 *                          tag inside ritual step 01. Wears `sb-tab-tag` so
 *                          its typography is literally inherited from the
 *                          existing tag style; `se-trigger` only adds button
 *                          reset + the rotating chevron + hover affordance.
 *  - SiteEcologyAccordion: collapsible report panel. Animates height
 *                          0 ↔ measured scrollHeight, stagger-fades children
 *                          on open, supports Escape key and swipe-up to close,
 *                          smooth-scrolls into view on open / back to trigger
 *                          on close, recalculates height on resize.
 *  - SE_STYLES           : scoped CSS string consumed by SeedballSection's
 *                          <style> injector. Uses the Aranyavana palette
 *                          consistent with .ara-sb. The body font is
 *                          Montserrat (the spec called for Jost, but Jost
 *                          is not loaded anywhere in this project — using
 *                          Montserrat matches the rest of the site).
 *
 * Surgical isolation
 * ──────────────────
 *  - `se-` prefix on every class — no collision with existing rules
 *  - No modifications to any existing CSS or component
 *  - Trigger reuses an existing class for visual continuity; adds nothing
 *    that visitors will perceive as a typography change
 */

export const SE_STYLES = `
  /* ── TRIGGER ──
     Was originally paired with .sb-tab-tag inside SeedballSection's
     ritual tab 01. Now that the report has been promoted to a
     standalone section (02), the trigger renders outside .ara-sb
     scope -- so .se-trigger-btn provides the typography that
     sb-tab-tag used to inherit, and .se-trigger keeps the button
     reset + rotating chevron behaviour. */
  .se-trigger-btn {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #C4AA8A;
  }
  .se-trigger {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font: inherit;
    color: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
    opacity: inherit;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: color 0.3s ease, opacity 0.3s ease;
  }
  .se-trigger:hover,
  .se-trigger:focus-visible {
    color: #faf6ef;
    opacity: 1;
    outline: none;
  }
  .se-trigger-arrow {
    display: inline-block;
    font-size: 1.1em;
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .se-trigger[aria-expanded="true"] .se-trigger-arrow {
    transform: rotate(90deg);
  }

  /* ── PANEL ── */
  .se-panel {
    overflow: hidden;
    height: 0;
    transition: height 0.72s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .se-panel-inner { padding: 56px 0 8px; }
  .se-rule {
    width: 100%;
    height: 1px;
    background: rgba(196, 170, 138, 0.12);
    margin-bottom: 56px;
  }

  /* ── Section label ── */
  .se-section-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.30em;
    text-transform: uppercase;
    color: #8B6B47;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
  }
  .se-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(196, 170, 138, 0.10);
  }

  /* ── Report header ── */
  .se-report-header { margin-bottom: 56px; }
  .se-report-eyebrow {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 300;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #8B6B47;
    display: block;
    margin-bottom: 16px;
  }
  .se-report-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(30px, 4vw, 48px);
    font-weight: 300;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: #F0E8D8;
    margin-bottom: 16px;
  }
  .se-report-title em { font-style: italic; color: #F2C96A; }
  .se-report-sub {
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    font-weight: 300;
    line-height: 1.85;
    color: #C4AA8A;
    max-width: 520px;
  }

  /* ── Clearance grid ── */
  .se-clearance-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: rgba(196, 170, 138, 0.08);
    border: 1px solid rgba(196, 170, 138, 0.08);
    margin-bottom: 1px;
  }
  .se-clearance-cell {
    background: rgba(20, 35, 18, 0.97);
    padding: 36px 28px;
    position: relative;
    transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .se-clearance-cell:hover { background: rgba(30, 48, 26, 0.99); }
  .se-clearance-cell::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #4A7C45, #6B9B52);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .se-clearance-cell:hover::before { transform: scaleX(1); }
  .se-clearance-tick {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: rgba(74, 124, 69, 0.14);
    border: 1px solid rgba(74, 124, 69, 0.28);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 12px;
    color: #6B9B52;
  }
  .se-clearance-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #4A7C45;
    display: block;
    margin-bottom: 10px;
  }
  .se-clearance-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(17px, 1.8vw, 22px);
    font-weight: 300;
    color: #F0E8D8;
    line-height: 1.25;
    margin-bottom: 12px;
  }
  .se-clearance-desc {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 300;
    line-height: 1.75;
    color: rgba(196, 170, 138, 0.52);
  }

  /* ── Data grid ── */
  .se-data-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: rgba(196, 170, 138, 0.08);
    border: 1px solid rgba(196, 170, 138, 0.08);
    border-top: none;
    margin-bottom: 64px;
  }
  .se-data-cell {
    background: rgba(20, 35, 18, 0.97);
    padding: 40px 36px;
    position: relative;
    transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .se-data-cell:hover { background: rgba(30, 48, 26, 0.99); }
  .se-data-cell::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .se-data-cell.se-water::before { background: linear-gradient(90deg, #2D5C2E, #6B9B52); }
  .se-data-cell.se-soil::before  { background: linear-gradient(90deg, #8B6B47, #C4AA8A); }
  .se-data-cell:hover::before    { transform: scaleX(1); }
  .se-cell-icon {
    font-size: 17px;
    margin-bottom: 16px;
    display: block;
    opacity: 0.55;
  }
  .se-cell-category {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #8B6B47;
    display: block;
    margin-bottom: 8px;
  }
  .se-cell-headline {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(20px, 2.2vw, 30px);
    font-weight: 300;
    color: #F0E8D8;
    line-height: 1.15;
    margin-bottom: 24px;
  }
  .se-data-rows {
    display: flex;
    flex-direction: column;
    border-top: 1px solid rgba(196, 170, 138, 0.08);
    padding-top: 20px;
  }
  .se-data-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 9px 0;
    border-bottom: 1px solid rgba(196, 170, 138, 0.05);
    gap: 16px;
  }
  .se-data-row:last-child { border-bottom: none; }
  .se-data-key {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 300;
    color: #C4AA8A;
    opacity: 0.68;
    flex-shrink: 0;
  }
  .se-data-val {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 15px;
    font-weight: 300;
    color: #F0E8D8;
    text-align: right;
  }
  .se-data-val.se-positive {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.05em;
    color: #6B9B52;
    text-align: right;
  }

  /* ── Spatial metrics ── */
  .se-metrics-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: rgba(196, 170, 138, 0.08);
    border: 1px solid rgba(196, 170, 138, 0.08);
    margin-bottom: 64px;
  }
  .se-metric {
    background: rgba(20, 35, 18, 0.97);
    padding: 36px 24px;
    text-align: center;
    transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .se-metric:hover { background: rgba(30, 48, 26, 0.99); }
  .se-metric-val {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(34px, 4vw, 52px);
    font-weight: 300;
    line-height: 1;
    letter-spacing: -0.03em;
    color: #F2C96A;
    display: block;
    margin-bottom: 8px;
  }
  .se-metric-sup {
    font-size: 0.40em;
    color: #F2C96A;
    letter-spacing: 0;
    vertical-align: top;
    margin-top: 0.16em;
    display: inline-block;
  }
  .se-metric-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 300;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #8B6B47;
    display: block;
    margin-bottom: 6px;
  }
  .se-metric-desc {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 300;
    color: rgba(196, 170, 138, 0.38);
    line-height: 1.5;
  }

  /* ── Species strip ── */
  .se-bio-scroll {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1px;
    background: rgba(196, 170, 138, 0.08);
    border: 1px solid rgba(196, 170, 138, 0.08);
    margin-bottom: 64px;
  }
  .se-bio-card {
    background: rgba(20, 35, 18, 0.97);
    padding: 26px 22px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .se-bio-card:hover { background: rgba(30, 48, 26, 0.99); }
  .se-bio-emoji {
    font-size: 22px;
    line-height: 1;
    margin-bottom: 4px;
  }
  .se-bio-category {
    font-family: 'Montserrat', sans-serif;
    font-size: 8px;
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #4A7C45;
  }
  .se-bio-name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 15px;
    font-weight: 300;
    color: #F0E8D8;
    line-height: 1.25;
  }
  .se-bio-sci {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 11px;
    font-weight: 300;
    color: #C4AA8A;
    opacity: 0.55;
  }
  .se-bio-status {
    font-family: 'Montserrat', sans-serif;
    font-size: 8px;
    font-weight: 300;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #6B9B52;
    margin-top: 4px;
  }

  /* ── BIO SUBTEXT (intro line above each sub-section) ── */
  .se-bio-subtext {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(196, 170, 138, 0.55);
    margin-bottom: 16px;
    max-width: 560px;
  }
  .se-bio-subtext-2 { margin-top: 32px; }

  /* ── 2-COL variant (confirmed sightings) ── */
  .se-bio-scroll-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: rgba(196, 170, 138, 0.08);
    border: 1px solid rgba(196, 170, 138, 0.08);
    margin-bottom: 0;
  }

  /* ── 4-COL variant (regional vegetation) ── */
  .se-bio-scroll-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: rgba(196, 170, 138, 0.08);
    border: 1px solid rgba(196, 170, 138, 0.08);
    margin-bottom: 0;
  }

  /* ── Muted card variant (regional, not site-confirmed) ── */
  .se-bio-card-muted { opacity: 0.72; }
  .se-bio-card-muted .se-bio-name { color: #C4AA8A; }
  .se-bio-status-muted { color: #8B6B47 !important; }

  /* ── Responsive overrides for the new variants ── */
  @media (max-width: 1024px) {
    .se-bio-scroll-4 { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 540px) {
    .se-bio-scroll-2 { grid-template-columns: 1fr; }
    .se-bio-scroll-4 { grid-template-columns: 1fr; }
  }

  /* ── Eco-compliance ── */
  .se-compliance {
    background: rgba(20, 35, 18, 0.6);
    border: 1px solid rgba(196, 170, 138, 0.08);
    border-left: 3px solid rgba(74, 124, 69, 0.38);
    padding: 36px 40px;
    margin-bottom: 56px;
  }
  .se-compliance-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #4A7C45;
    display: block;
    margin-bottom: 16px;
  }
  .se-compliance-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(20px, 2.2vw, 28px);
    font-weight: 300;
    color: #F0E8D8;
    margin-bottom: 16px;
    line-height: 1.2;
  }
  .se-compliance-title em { font-style: italic; color: #F2C96A; }
  .se-compliance-body {
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    font-weight: 300;
    line-height: 1.85;
    color: #C4AA8A;
    max-width: 640px;
    margin-bottom: 28px;
  }
  .se-compliance-items { display: flex; flex-wrap: wrap; gap: 10px; }
  .se-compliance-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 300;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #C4AA8A;
    border: 1px solid rgba(196, 170, 138, 0.12);
    padding: 7px 14px;
    border-radius: 1px;
  }
  .se-compliance-item::before {
    content: '✓';
    color: #6B9B52;
    font-size: 10px;
  }

  /* ── Source note ── */
  .se-source {
    padding: 24px 0;
    border-top: 1px solid rgba(196, 170, 138, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }
  .se-source-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 300;
    letter-spacing: 0.12em;
    color: rgba(196, 170, 138, 0.32);
  }
  .se-source-badge {
    font-family: 'Montserrat', sans-serif;
    font-size: 8px;
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(196, 170, 138, 0.28);
    border: 1px solid rgba(196, 170, 138, 0.10);
    padding: 5px 12px;
    border-radius: 1px;
  }

  /* ── Close button ── */
  .se-close-row {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 0 8px;
    border-top: 1px solid rgba(196, 170, 138, 0.08);
  }
  .se-close-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 300;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: #8B6B47;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    transition: color 0.3s ease;
  }
  .se-close-btn:hover,
  .se-close-btn:focus-visible {
    color: #C4AA8A;
    outline: none;
  }

  /* ── EMAIL GATE (replaces sections 02, 04, 05 until an email is captured) ── */
  .se-gate {
    border: 1px solid rgba(196, 170, 138, 0.15);
    background: rgba(20, 35, 18, 0.4);
    padding: 40px 44px;
    margin-bottom: 64px;
  }
  .se-gate-form {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 28px;
  }
  .se-gate-input {
    flex: 1;
    min-width: 240px;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(196, 170, 138, 0.3);
    padding: 12px 4px;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 300;
    color: #F0E8D8;
    transition: border-color 0.3s ease;
  }
  .se-gate-input:focus {
    outline: none;
    border-bottom-color: #F2C96A;
  }
  .se-gate-input::placeholder { color: rgba(196, 170, 138, 0.45); }
  .se-gate-submit {
    background: #F2C96A;
    color: #1a2318;
    border: none;
    padding: 14px 28px;
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  .se-gate-submit:hover:not(:disabled) { background: #C4AA8A; }
  .se-gate-submit:disabled { opacity: 0.6; cursor: not-allowed; }
  .se-gate-microcopy {
    margin-top: 16px;
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.04em;
    color: rgba(196, 170, 138, 0.5);
  }
  .se-gate-error {
    margin-top: 12px;
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 400;
    color: #F2C96A;
  }
  @media (max-width: 540px) {
    .se-gate { padding: 32px 24px; }
    .se-gate-form { flex-direction: column; }
    .se-gate-submit { width: 100%; }
  }

  /* ── abbr styling ──
     Confirmed acronym expansions render with a subtle dotted
     underline to signal 'hover to see the full name' without shouting.
     Applied only within .se-panel so it doesn't leak to any legal-
     copy pages that may also use <abbr>. */
  .se-panel abbr[title] {
    text-decoration: underline dotted;
    text-decoration-color: rgba(196, 170, 138, 0.5);
    text-underline-offset: 3px;
    cursor: help;
  }

  /* ── Stagger fade-in ── */
  .se-fade {
    opacity: 0;
    transform: translateY(18px);
    transition:
      opacity 0.72s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.72s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .se-fade.se-visible {
    opacity: 1;
    transform: none;
  }
  .se-d2 { transition-delay: 0.08s; }
  .se-d3 { transition-delay: 0.16s; }
  .se-d4 { transition-delay: 0.24s; }
  .se-d5 { transition-delay: 0.32s; }
  .se-d6 { transition-delay: 0.40s; }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .se-clearance-grid { grid-template-columns: repeat(2, 1fr); }
    .se-metrics-row    { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .se-panel-inner    { padding: 44px 0 8px; }
    .se-data-grid      { grid-template-columns: 1fr; }
    .se-data-cell      { padding: 32px 24px; }
    .se-bio-scroll     { grid-template-columns: repeat(3, 1fr); }
    .se-compliance     { padding: 28px 24px; }
  }
  @media (max-width: 540px) {
    .se-clearance-grid { grid-template-columns: 1fr; }
    .se-clearance-cell { padding: 28px 20px; }
    .se-bio-scroll     { grid-template-columns: repeat(2, 1fr); }
    .se-metrics-row    { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 380px) {
    .se-bio-scroll     { grid-template-columns: 1fr; }
  }
`;

// ─────────────────────────────────────────────────────────────────────
// TRIGGER — replaces <span class="sb-tab-tag">· Site Ecology Study</span>
// in ritual step 01. Reuses sb-tab-tag for typography inheritance.
// ─────────────────────────────────────────────────────────────────────
export function SiteEcologyTrigger({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      id="seToggle"
      className="se-trigger-btn se-trigger"
      aria-expanded={isOpen}
      aria-controls="sePanel"
      onClick={onToggle}
    >
      · {isOpen ? 'Close the report' : 'Open the full report'}
      <span className="se-trigger-arrow" aria-hidden="true">
        ›
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────
// EMAIL GATE — replaces sections 02, 04, 05 until an email is captured.
// ─────────────────────────────────────────────────────────────────────
function EcologyReportGate({ onUnlock }: { onUnlock: () => void }) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/ecology-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }
      onUnlock();
    } catch {
      setError('Network error. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="se-fade se-d3 se-gate">
      <span className="se-report-eyebrow">· Independent Verification</span>
      <h3 className="se-report-title" style={{ fontSize: 'clamp(24px, 3vw, 34px)' }}>
        The full report.
      </h3>
      <p className="se-report-sub">
        Satellite analysis cross-referenced with STRRPA, BMRDA, TGR and village
        land records. Prepared independently by Agentaly Property Research.
      </p>
      <form onSubmit={submit} noValidate className="se-gate-form">
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className="se-gate-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          aria-label="Email address"
        />
        <button type="submit" className="se-gate-submit" disabled={submitting}>
          {submitting ? 'Sending' : 'Receive the report'}
        </button>
      </form>
      {error && (
        <p role="alert" className="se-gate-error">
          {error}
        </p>
      )}
      <p className="se-gate-microcopy">
        Sent immediately. No follow-up unless you ask for it. By submitting,
        you agree to our{' '}
        <a
          href="/privacy"
          style={{
            color: 'inherit',
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ACCORDION — full spatial-risk-report panel.
// ─────────────────────────────────────────────────────────────────────
export function SiteEcologyAccordion({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const prevOpenRef = useRef(false);
  const [reportUnlocked, setReportUnlocked] = useState(false);
  const skipUnlockEffect = useRef(true);

  // Open / close height animation + stagger fades + scroll-into-view
  useEffect(() => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    if (!panel || !inner) return;

    const wasOpen = prevOpenRef.current;
    prevOpenRef.current = isOpen;

    const timers: ReturnType<typeof setTimeout>[] = [];

    if (isOpen) {
      // Open: set measured height, let CSS transition animate to it,
      // then switch to 'auto' so future content changes are not capped.
      panel.style.height = inner.scrollHeight + 'px';

      timers.push(
        setTimeout(() => {
          if (panelRef.current) panelRef.current.style.height = 'auto';
        }, 750),
      );

      const fades = panel.querySelectorAll<HTMLElement>('.se-fade');
      fades.forEach((el, i) => {
        timers.push(
          setTimeout(() => el.classList.add('se-visible'), 90 + i * 32),
        );
      });

      timers.push(
        setTimeout(() => {
          if (!panelRef.current) return;
          const rect = panelRef.current.getBoundingClientRect();
          const offset = rect.top + window.scrollY - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }, 100),
      );
    } else if (wasOpen) {
      // Close (only when previously open — skip on initial mount).
      // Snap from 'auto' to measured px so CSS can animate to 0.
      if (panel.style.height === 'auto' || panel.style.height === '') {
        panel.style.height = panel.scrollHeight + 'px';
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (panelRef.current) panelRef.current.style.height = '0';
        });
      });

      const fades = panel.querySelectorAll<HTMLElement>('.se-fade');
      fades.forEach((el) => el.classList.remove('se-visible'));
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        const trigger = document.getElementById('seToggle');
        trigger?.focus();
      }
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [isOpen, onClose]);

  // Unlock reveal: when the reader submits their email, sections 02/04/05
  // mount below the gate. The panel is at height:auto by this point, so
  // browsers handle the height growth naturally. We only need to stagger
  // fades on the newly-mounted .se-fade elements so they animate in like
  // the rest of the report.
  useEffect(() => {
    if (skipUnlockEffect.current) {
      skipUnlockEffect.current = false;
      return;
    }
    if (!isOpen || !panelRef.current) return;
    const fades = panelRef.current.querySelectorAll<HTMLElement>(
      '.se-fade:not(.se-visible)',
    );
    const timers: ReturnType<typeof setTimeout>[] = [];
    fades.forEach((el, i) => {
      timers.push(setTimeout(() => el.classList.add('se-visible'), 40 + i * 32));
    });
    return () => timers.forEach(clearTimeout);
  }, [reportUnlocked, isOpen]);

  // Swipe-up to close + resize recalculation
  useEffect(() => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    if (!panel || !inner) return;

    let touchStartY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY === null) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (diff < -60 && panel.scrollTop === 0) onClose();
      touchStartY = null;
    };
    panel.addEventListener('touchstart', onTouchStart, { passive: true });
    panel.addEventListener('touchend', onTouchEnd, { passive: true });

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (!isOpen) return;
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (panelRef.current && innerRef.current) {
          panelRef.current.style.height =
            innerRef.current.scrollHeight + 'px';
        }
      }, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      panel.removeEventListener('touchstart', onTouchStart);
      panel.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [isOpen, onClose]);

  const handleCloseClick = () => {
    onClose();
    setTimeout(() => {
      const trigger = document.getElementById('seToggle');
      if (!trigger) return;
      trigger.focus();
      const rect = trigger.getBoundingClientRect();
      window.scrollTo({
        top: rect.top + window.scrollY - 120,
        behavior: 'smooth',
      });
    }, 180);
  };

  return (
    <div
      ref={panelRef}
      className="se-panel"
      id="sePanel"
      role="region"
      aria-labelledby="seToggle"
    >
      <div ref={innerRef} className="se-panel-inner">
        <div className="se-rule" />

        {/* ── REPORT HEADER ── */}
        <div className="se-report-header se-fade">
          <span className="se-report-eyebrow">
            · Independent Spatial Risk Report · Udyana · Solur, Nelamangala · Karnataka
          </span>
          <h2 className="se-report-title">
            The land, <em>independently verified.</em>
          </h2>
          <p className="se-report-sub">
            Before the first seedball was placed, Udyana underwent a
            comprehensive independent spatial risk analysis — checking
            government land records, village maps, STRRPA master plan data,{' '}
            <abbr title="Bangalore Metropolitan Region Development Authority">
              BMRDA
            </abbr>{' '}
            zoning data, and water body boundaries. What follows is what the
            data confirmed.
          </p>
        </div>

        {/* ── 01: LAND CLEARANCE ── */}
        <div className="se-fade se-d2" style={{ marginBottom: 64 }}>
          <div className="se-section-label">01 · Land Clearance Verification</div>
          <div className="se-clearance-grid">
            <div className="se-clearance-cell">
              <div className="se-clearance-tick">✓</div>
              <span className="se-clearance-label">· Village Map</span>
              <div className="se-clearance-title">
                Safe as per<br />Village Records
              </div>
              <p className="se-clearance-desc">
                Village map analysis confirms the property boundary is clearly
                demarcated, free from encroachment disputes, and accurately
                recorded in local land registers.
              </p>
            </div>
            <div className="se-clearance-cell">
              <div className="se-clearance-tick">✓</div>
              <span className="se-clearance-label">· Government Land</span>
              <div className="se-clearance-title">
                Clear of All<br />Government Claims
              </div>
              <p className="se-clearance-desc">
                Independent data confirms the estate is safely distanced from
                government land, scrubland, high-tension corridors, forest
                land, and protected water body buffers.
              </p>
            </div>
            <div className="se-clearance-cell">
              <div className="se-clearance-tick">✓</div>
              <span className="se-clearance-label">· Green Belt Zoning</span>
              <div className="se-clearance-title">
                Agriculture &amp;<br />Forest Zone
              </div>
              <p className="se-clearance-desc">
                STRRPA master plan designates this land as Green Belt
                Agriculture Zone — legally protecting the surrounding area from
                high-density residential or industrial development. Your
                horizon stays permanent.
              </p>
            </div>
            <div className="se-clearance-cell">
              <div className="se-clearance-tick">✓</div>
              <span className="se-clearance-label">· Lake Boundary</span>
              <div className="se-clearance-title">
                60-Acre Lake<br />Independently Confirmed
              </div>
              <p className="se-clearance-desc">
                Spatial satellite analysis confirms the perennial water body
                adjoining the estate measures approximately 60 acres — four
                times the estate footprint. A permanent, legally protected
                water body.
              </p>
            </div>
          </div>
        </div>

        {/* ── 02: SITE DATA (gated behind email capture) ── */}
        {reportUnlocked ? (
        <div className="se-fade se-d3" style={{ marginBottom: 64 }}>
          <div className="se-section-label">02 · Site Data</div>
          <div className="se-data-grid">
            <div className="se-data-cell se-water">
              <span className="se-cell-icon" aria-hidden="true">◉</span>
              <span className="se-cell-category">· Water Body</span>
              <h3 className="se-cell-headline">
                60-Acre<br />Perennial Lake
              </h3>
              <div className="se-data-rows">
                <div className="se-data-row">
                  <span className="se-data-key">Lake Area</span>
                  <span className="se-data-val">~60 Acres</span>
                </div>
                <div className="se-data-row">
                  <span className="se-data-key">Lake Type</span>
                  <span className="se-data-val">Perennial · Year-round</span>
                </div>
                <div className="se-data-row">
                  <span className="se-data-key">Estate-to-Lake Ratio</span>
                  <span className="se-data-val">1 : 4</span>
                </div>
                <div className="se-data-row">
                  <span className="se-data-key">Water Body Status</span>
                  <span className="se-data-val se-positive">
                    ✓ Legally Protected
                  </span>
                </div>
                <div className="se-data-row">
                  <span className="se-data-key">Catchment Classification</span>
                  <span className="se-data-val">TGR Zone 1</span>
                </div>
              </div>
            </div>
            <div className="se-data-cell se-soil">
              <span className="se-cell-icon" aria-hidden="true">◈</span>
              <span className="se-cell-category">· Soil &amp; Land Profile</span>
              <h3 className="se-cell-headline">
                Lakeside<br />Ecology Zone
              </h3>
              <div className="se-data-rows">
                <div className="se-data-row">
                  <span className="se-data-key">Soil Character</span>
                  <span className="se-data-val">
                    Moist · High organic content
                  </span>
                </div>
                <div className="se-data-row">
                  <span className="se-data-key">Proximity to Lake</span>
                  <span className="se-data-val">Direct lakefront</span>
                </div>
                <div className="se-data-row">
                  <span className="se-data-key">Govt Land Clearance</span>
                  <span className="se-data-val se-positive">✓ Clear</span>
                </div>
                <div className="se-data-row">
                  <span className="se-data-key">Scrubland / Forest Risk</span>
                  <span className="se-data-val se-positive">
                    ✓ None identified
                  </span>
                </div>
                <div className="se-data-row">
                  <span className="se-data-key">High-Tension Corridor</span>
                  <span className="se-data-val se-positive">
                    ✓ Safe distance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        ) : (
          <EcologyReportGate onUnlock={() => setReportUnlocked(true)} />
        )}

        {/* ── 03: SPATIAL METRICS ── */}
        <div className="se-fade se-d3" style={{ marginBottom: 64 }}>
          <div className="se-section-label">03 · Spatial Metrics</div>
          <div className="se-metrics-row">
            <div className="se-metric">
              <span className="se-metric-val">
                60<span className="se-metric-sup">Acres</span>
              </span>
              <span className="se-metric-label">· Living Lake</span>
              <span className="se-metric-desc">
                Independently confirmed. Perennial, year-round.
              </span>
            </div>
            <div className="se-metric">
              <span className="se-metric-val">
                75<span className="se-metric-sup">Acres</span>
              </span>
              <span className="se-metric-label">· Total Site Area</span>
              <span className="se-metric-desc">
                15 acres estate · 60 acres lake
              </span>
            </div>
            <div className="se-metric">
              <span className="se-metric-val">1:4</span>
              <span className="se-metric-label">· Land-to-Water Ratio</span>
              <span className="se-metric-desc">
                Four acres of water for every acre of land
              </span>
            </div>
            <div className="se-metric">
              <span className="se-metric-val">
                1<span className="se-metric-sup">km</span>
              </span>
              <span className="se-metric-label">· From NH 75</span>
              <span className="se-metric-desc">
                Accessible. Protected. Private.
              </span>
            </div>
          </div>
        </div>

        {reportUnlocked && (
          <>
        {/* ── 04: SITE ECOLOGY & WILDLIFE ──
            Restructured into two sub-sections to keep verifiable claims
            (Kingfisher + Peafowl, confirmed sightings) cleanly separated
            from regional vegetation context (Acacia / Neem / Tamarind /
            Cluster Fig) — characteristic of the zone, but not a site
            inventory. Builds trust by being precise about provenance. */}
        <div className="se-fade se-d4" style={{ marginBottom: 64 }}>
          <div className="se-section-label">
            04 · Site Ecology &amp; Wildlife
          </div>

          {/* 4a: Confirmed field sightings */}
          <p className="se-bio-subtext">
            Confirmed during independent site visits — photographed and logged on
            location.
          </p>
          <div className="se-bio-scroll-2">
            <div className="se-bio-card">
              <span className="se-bio-emoji" aria-hidden="true">◉</span>
              <span className="se-bio-category">· Avifauna · Confirmed</span>
              <span className="se-bio-name">Common Kingfisher</span>
              <span className="se-bio-sci">Alcedo atthis</span>
              <span className="se-bio-status">· Photographed on site</span>
            </div>
            <div className="se-bio-card">
              <span className="se-bio-emoji" aria-hidden="true">◉</span>
              <span className="se-bio-category">· Avifauna · Confirmed</span>
              <span className="se-bio-name">Indian Peafowl</span>
              <span className="se-bio-sci">Pavo cristatus</span>
              <span className="se-bio-status">· Live sighting on site</span>
            </div>
          </div>

          {/* 4b: Regional vegetation context */}
          <p className="se-bio-subtext se-bio-subtext-2">
            The surrounding scrub and dry-deciduous landscape is characteristic
            of this region — typically supporting the following native species.
          </p>
          <div className="se-bio-scroll-4">
            <div className="se-bio-card se-bio-card-muted">
              <span className="se-bio-emoji" aria-hidden="true">◈</span>
              <span className="se-bio-category">· Flora · Regional</span>
              <span className="se-bio-name">Acacia</span>
              <span className="se-bio-sci">Acacia spp.</span>
              <span className="se-bio-status se-bio-status-muted">
                · Native scrub species
              </span>
            </div>
            <div className="se-bio-card se-bio-card-muted">
              <span className="se-bio-emoji" aria-hidden="true">◈</span>
              <span className="se-bio-category">· Flora · Regional</span>
              <span className="se-bio-name">Neem</span>
              <span className="se-bio-sci">Azadirachta indica</span>
              <span className="se-bio-status se-bio-status-muted">
                · Native scrub species
              </span>
            </div>
            <div className="se-bio-card se-bio-card-muted">
              <span className="se-bio-emoji" aria-hidden="true">◈</span>
              <span className="se-bio-category">· Flora · Regional</span>
              <span className="se-bio-name">Tamarind</span>
              <span className="se-bio-sci">Tamarindus indica</span>
              <span className="se-bio-status se-bio-status-muted">
                · Native scrub species
              </span>
            </div>
            <div className="se-bio-card se-bio-card-muted">
              <span className="se-bio-emoji" aria-hidden="true">◈</span>
              <span className="se-bio-category">· Flora · Regional</span>
              <span className="se-bio-name">Cluster Fig</span>
              <span className="se-bio-sci">Ficus racemosa</span>
              <span className="se-bio-status se-bio-status-muted">
                · Native scrub species
              </span>
            </div>
          </div>
        </div>

        {/* ── 05: ECO-COMPLIANCE ── */}
        <div className="se-compliance se-fade se-d5">
          <span className="se-compliance-label">
            · Ecological Compliance · TGR Catchment Zone 1 · BMRDA{' '}
            <abbr title="Agricultural Conservation Zone">ACZ</abbr> Zone 2
          </span>
          <h3 className="se-compliance-title">
            Protected by law.<br />
            <em>Designed for the long term.</em>
          </h3>
          <p className="se-compliance-body">
            Udyana sits within a designated ecological protection zone — a
            classification that prevents industrial discharge, over-extraction
            of groundwater, and construction without environmental compliance.
            Far from a constraint, this designation is the legal guarantee
            that the lake and its surrounding ecology will remain intact for
            the lifetime of your estate. The restrictions that apply here are
            the same ones that protect your investment from encroachment and
            environmental degradation.
          </p>
          <div className="se-compliance-items">
            <span className="se-compliance-item">
              Rainwater Harvesting Mandated
            </span>
            <span className="se-compliance-item">No Industrial Discharge</span>
            <span className="se-compliance-item">
              Agriculture &amp; Forest Development Only
            </span>
            <span className="se-compliance-item">
              Groundwater Protection Zone
            </span>
            <span className="se-compliance-item">
              Permanent Ecological Buffer
            </span>
          </div>
        </div>
          </>
        )}

        {/* ── SOURCE ── */}
        <div className="se-source se-fade se-d6">
          <span className="se-source-text">
            · Source: Independent Spatial Risk Analysis · Agentaly Property
            Research · Satellite data cross-referenced with STRRPA, BMRDA,
            TGR, and village records
          </span>
          <span className="se-source-badge">· Verified Report</span>
        </div>

        {/* ── CLOSE ── */}
        <div className="se-close-row se-fade se-d6">
          <button
            type="button"
            id="seClose"
            className="se-close-btn"
            onClick={handleCloseClick}
          >
            <span
              aria-hidden="true"
              style={{ display: 'inline-block', transform: 'rotate(-90deg)' }}
            >
              ›
            </span>
            Close Ecology Report
          </button>
        </div>
      </div>
    </div>
  );
}
