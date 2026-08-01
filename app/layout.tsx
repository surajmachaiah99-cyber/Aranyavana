import type { Metadata } from 'next';
import { Cormorant_Garamond, Cormorant_SC, Montserrat } from 'next/font/google';
import './globals.css';
import Grain from '@/components/Grain';
import { SITE } from '@/lib/site';

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

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Udyana by Aranyavana · Lakefront Estate Plots, Karnataka',
  description:
    `Premium lakefront estate plots in ${SITE.location} — off the Bangalore–Mangalore Highway. A 60-acre living lake, 18 estate plots, by appointment only.`,
  metadataBase: new URL('https://www.aranyavana.com'),
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
      className={`${cormorant.variable} ${cormorantSC.variable} ${montserrat.variable} scroll-smooth`}
    >
      <body className="bg-earth font-body text-sky antialiased">
        <Grain />
        {children}
      </body>
    </html>
  );
}
