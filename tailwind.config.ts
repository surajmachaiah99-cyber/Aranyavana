import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        earth: '#1C1A17',
        stone: '#2E2B27',
        bark: '#4A4035',
        sand: '#C4A882',
        mist: '#E8E0D4',
        water: '#7B9E9B',
        leaf: '#4D5C3A',
        sky: '#D6DDD8',
        cream: '#F5F0E8',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        body: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        sc: ['var(--font-cormorant-sc)', 'Cormorant SC', 'serif'],
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.4em',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'ken-burns': 'kenBurns 24s ease-in-out infinite alternate',
        'scroll-pulse': 'scrollPulse 2.4s ease-in-out infinite',
      },
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.12) translate(-1.5%, -1.5%)' },
        },
        scrollPulse: {
          '0%, 100%': { transform: 'scaleY(0.4) translateY(0)', opacity: '0.35' },
          '50%': { transform: 'scaleY(1) translateY(40%)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
