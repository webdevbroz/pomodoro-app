import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: ['app/src/**/*.{ts,tsx}', 'app/src/components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'app-background': 'var(--app-background)',
        'on-light-background': 'var(--on-light-background)',
        'on-dark-background': 'var(--on-dark-background)',
        'settings-background': 'var(--settings-background)',
        'primary-dark': 'var(--primary-dark)',
        'secondary-peach': 'var(--secondary-peach)',
        'secondary-aqua': 'var(--secondary-aqua)',
        'secondary-purple': 'var(--secondary-purple)',
      },
      fontFamily: {
        kumbh: ['var(--font-kumbh-sans)', ...fontFamily.sans],
        space: ['var(--font-space-mono)', ...fontFamily.sans],
        roboto: ['var(--font-roboto-slab)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0px' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
