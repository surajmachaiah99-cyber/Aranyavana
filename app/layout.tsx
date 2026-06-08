import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import Grain from '@/components/Grain';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-jost',
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
      className={`${cormorant.variable} ${jost.variable} scroll-smooth`}
    >
      <body className="bg-paper font-body text-bark antialiased">
        <Grain />
        {children}
      </body>
    </html>
  );
}
