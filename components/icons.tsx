import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  width: 40,
  height: 40,
  viewBox: '0 0 40 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function WaveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M3 14c4 0 4 4 8 4s4-4 8-4 4 4 8 4 4-4 8-4 4 4 8 4" transform="translate(-3 1)" />
      <path d="M3 22c4 0 4 4 8 4s4-4 8-4 4 4 8 4 4-4 8-4 4 4 8 4" transform="translate(-3 0)" opacity="0.6" />
      <path d="M3 30c4 0 4 4 8 4s4-4 8-4 4 4 8 4 4-4 8-4 4 4 8 4" transform="translate(-3 -1)" opacity="0.3" />
    </svg>
  );
}

export function HorizonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <line x1="4" y1="24" x2="36" y2="24" />
      <line x1="4" y1="28" x2="36" y2="28" strokeDasharray="2 4" opacity="0.6" />
      <circle cx="20" cy="14" r="5" />
    </svg>
  );
}

export function GroveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <rect x="6" y="6" width="28" height="28" />
      <path d="M14 28v-6m0 0c-2 0-3-2-3-4s1-4 3-4 3 2 3 4-1 4-3 4Z" />
      <path d="M26 28v-7m0 0c-2 0-3-2-3-4s1-4 3-4 3 2 3 4-1 4-3 4Z" />
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
