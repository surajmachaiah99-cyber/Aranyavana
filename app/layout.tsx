import type { Metadata } from 'next';
import { Cormorant_Garamond, Cormorant_SC, DM_Sans } from 'next/font/google';
import './globals.css';
import Cursor from '@/components/Cursor';
import Grain from '@/components/Grain';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const cormorantSC = Cormorant_SC({
  subsets: ['latin'],
  weight: ['300', '500'],
  variable: '--font-cormorant-sc',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Udyana by Aranyavana · Lakefront Estate Plots, Karnataka',
  description:
    'Premium lakefront estate plots in Kudlur, Solur — off the Bangalore–Mangalore Highway. A 15-acre living lake, 18 estate plots, by appointment only.',
  metadataBase: new URL('https://aranyavana.in'),
  openGraph: {
    title: 'Udyana by Aranyavana',
    description:
      'Some investments grow. Some breathe. Premium lakefront estate plots off the Bangalore–Mangalore Highway.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cormorantSC.variable} ${dmSans.variable} scroll-smooth`}
    >
      <body className="bg-earth font-body text-sky antialiased">
        <Grain />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
