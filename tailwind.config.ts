import type { Config } from 'tailwindcss';

const { fontFamily } = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        kumbh: ['var(--font-kumbh-sans)', ...fontFamily.sans],
        space: ['var(--font-space-mono)', ...fontFamily.sans],
        roboto: ['var(--font-roboto-slab)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
