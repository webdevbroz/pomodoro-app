import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
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
        'primary-dark': 'var(--primary-dark)',
        'secondary-peach': 'var(--secondary-peach)',
        'secondary-aqua': 'var(--secondary-aqua)',
        'secondary-purple': 'var(--secondary-purple)',
        'desaturated-blue': 'var(--desaturated-blue)',
        'dark-blue': 'var(--dark-blue)',
      },
      dropShadow: {
        primary: ['-70px -30px 50px rgb(39 44 90 / 100%)', '30px 30px 70px rgb(18 21 48 / 100%)'],
      },
      height: {
        '112': '27rem',
      },
      width: {
        '29': '7.313rem',
        '34': '9.75rem',
        '128': '32rem',
      },
      minWidth: {
        '1': '23rem',
      },
      maxHeight: {
        '128': '41rem',
        '132': '50rem',
        '142': '64rem',
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
