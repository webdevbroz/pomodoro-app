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
      <body className={`${kumbh.variable} ${roboto.variable} ${space.variable}`}>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">
            <div className="container max-w-[1440px] pb-8 pt-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
