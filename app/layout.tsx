import type { Metadata } from 'next';
import { kumbh, roboto, space } from './styles/fonts';
import './styles/globals.css';

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
