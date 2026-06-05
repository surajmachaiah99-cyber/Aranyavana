import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  width: 56,
  height: 56,
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 0.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

/**
 * WaveIcon — hand-drawn ripple. Three irregular wave lines with a small
 * floating leaf above the surface for life.
 */
export function WaveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M6 30 C 12 26, 18 34, 24 30 S 36 26, 42 30 S 54 34, 60 30" />
      <path d="M4 38 C 11 34, 17 41, 24 38 S 37 33, 44 38 S 56 41, 62 38" opacity="0.7" />
      <path d="M6 46 C 13 43, 19 49, 26 46 S 38 42, 45 46 S 56 49, 60 46" opacity="0.45" />
      {/* Floating leaf */}
      <path d="M30 18 C 30 14, 33 12, 36 14 C 38 16, 36 20, 32 21 Z" />
      <path d="M30 18 L 35 16" opacity="0.6" />
    </svg>
  );
}

/**
 * HorizonIcon — sun rising over a thin distant road, with a curving
 * line suggesting the approach to Udyana.
 */
export function HorizonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      {/* Sun */}
      <circle cx="38" cy="22" r="8" />
      {/* Faint rays */}
      <path d="M38 8 L 38 4" opacity="0.5" />
      <path d="M48 12 L 51 9" opacity="0.5" />
      <path d="M28 12 L 25 9" opacity="0.5" />
      {/* Horizon */}
      <path d="M4 38 C 16 36, 32 39, 60 37" />
      {/* Road curving in */}
      <path d="M12 60 C 22 52, 32 46, 40 38" strokeDasharray="1.5 3" opacity="0.7" />
      <path d="M22 60 C 28 54, 34 48, 40 38" opacity="0.85" />
    </svg>
  );
}

/**
 * GroveIcon — open frame holding two organic trees with a small
 * sun/moon between them — evoking a private estate clearing.
 */
export function GroveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      {/* Outer frame, slightly off-square */}
      <path d="M6 8 L 58 7 L 58 56 L 7 57 Z" />
      {/* Left tree */}
      <path d="M20 50 L 20 36" />
      <path d="M20 36 C 14 36, 12 30, 14 26 C 11 26, 10 22, 13 19 C 14 14, 19 13, 22 16 C 26 14, 30 18, 28 23 C 30 26, 28 31, 24 32 C 24 35, 22 37, 20 36 Z" />
      {/* Right tree */}
      <path d="M44 50 L 44 32" />
      <path d="M44 32 C 38 33, 36 26, 39 22 C 36 22, 36 16, 41 15 C 43 11, 48 12, 50 16 C 54 16, 56 22, 51 25 C 52 30, 48 33, 44 32 Z" />
      {/* Sun between */}
      <circle cx="32" cy="22" r="2.5" />
    </svg>
  );
}

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <line x1="2" y1="8" x2="14" y2="8" />
      <polyline points="10,4 14,8 10,12" />
    </svg>
  );
}
