import type { Metadata } from 'next';
import { kumbh, roboto, space } from './src/lib/fonts';
import './src/styles/globals.css';

export const metadata: Metadata = {
  title: 'Pomodoro app',
  description: 'A time management application based on the pomodoro technique',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${kumbh.variable} ${roboto.variable} ${space.variable}`}>{children}</body>
    </html>
  );
}
