import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'Payoneer LATAM Partner Ecosystem',
  description: 'Expand your business into Latin America with Payoneer\'s curated partner ecosystem. Connect with vetted local experts in legal, tax, logistics, and marketing across Mexico, Brazil, Argentina, and Colombia.',
  openGraph: {
    title: 'Payoneer LATAM Partner Ecosystem',
    description: 'Expand your business into Latin America with Payoneer\'s curated partner ecosystem.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        {children}
        <Script
          src="//go.payoneer.com/js/forms2/js/forms2.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
