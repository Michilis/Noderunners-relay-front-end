import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Noderunners Relay',
  description: 'High-performance Nostr relay',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script 
          src="https://www.unpkg.com/nostr-login@latest/dist/unpkg.js"
          data-dark-mode="true"
          data-theme="ocean"
          data-no-banner="false"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}