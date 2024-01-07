import '@/app/styles/globals.css';
import type { Metadata } from 'next';
import { kumbh, roboto, space } from '../lib/fonts';
import StoreProvider from '@/lib/store-provider';

export const metadata: Metadata = {
  title: 'Pomodoro app',
  description: 'A time management application based on the pomodoro technique',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${kumbh.variable} ${roboto.variable} ${space.variable}`}>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">
              <div className="container flex max-w-[1440px] flex-col items-center lg:pt-6">{children}</div>
            </main>
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
