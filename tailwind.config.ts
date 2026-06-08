import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Spec-driven palette ──
        soleil:    '#E8A642', // primary amber/gold
        harvest:   '#C47B1A',
        dusk:      '#F2C96A',
        canopy:    '#2D5C2E', // deep forest green
        fern:      '#4A7C45',
        meadow:    '#6B9B52', // brighter green — gradient pair for fern
        bark:      '#2A1F14', // darkest brown — dark surfaces + text on light
        soil:      '#4A3520',
        clay:      '#8B6B47', // muted accent / borders / micro-labels
        stone:     '#C4AA8A',
        parchment: '#F0E8D8', // text on dark surfaces
        paper:     '#FAF6EF', // page background (light)
        cerulean:  '#4E7FA8',
        twilight:  '#2B5078',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        body:    ['var(--font-jost)', 'Jost', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.25em',
        button:  '0.15em',
        nav:     '0.08em',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'ken-burns':    'kenBurns 24s ease-in-out infinite alternate',
        'scroll-pulse': 'scrollPulse 2.4s ease-in-out infinite',
      },
      keyframes: {
        kenBurns: {
          '0%':   { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.12) translate(-1.5%, -1.5%)' },
        },
        scrollPulse: {
          '0%, 100%': { transform: 'scaleY(0.4) translateY(0)',   opacity: '0.35' },
          '50%':      { transform: 'scaleY(1) translateY(40%)',   opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
