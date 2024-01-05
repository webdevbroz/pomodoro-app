import { Kumbh_Sans, Roboto_Slab, Space_Mono } from 'next/font/google';

export const kumbh = Kumbh_Sans({
  subsets: ['latin'],
  variable: '--font-kumbh-sans',
});

export const roboto = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
});

export const space = Space_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-space-mono',
});
