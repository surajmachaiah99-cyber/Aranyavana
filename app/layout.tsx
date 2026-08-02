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

const OG_IMAGE_URL = `${SITE.url}/og-image.jpg`;

export const metadata: Metadata = {
  title: 'Udyana by Aranyavana · Lakefront Estate Plots, Karnataka',
  description: `Lakefront estate plots in ${SITE.location} — off the Bangalore–Mangalore Highway. A ${SITE.inventory.lakeAcres}-acre living lake, ${SITE.inventory.totalPlots} estate plots, ${SITE.inventory.remainingPlots} available. By appointment only.`,
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: 'Udyana by Aranyavana',
    description: `Some investments grow. Some breathe. Lakefront estate plots in ${SITE.location}, off the Bangalore–Mangalore Highway.`,
    url: SITE.url,
    siteName: SITE.brand,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: `${SITE.product} by ${SITE.brand} — a ${SITE.inventory.lakeAcres}-acre living lake at ${SITE.location}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Udyana by Aranyavana',
    description: `Some investments grow. Some breathe. Lakefront estate plots in ${SITE.location}, off the Bangalore–Mangalore Highway.`,
    images: [OG_IMAGE_URL],
  },
};

/**
 * Structured data (JSON-LD).
 *
 * Serialised once at build time from the canonical SITE constants.
 * Includes Organization (Aranyavana Infra Developers LLP as the
 * legal entity) and Place (Udyana as the property), each carrying
 * the postal address, phone, and canonical URL. Update lib/site.ts
 * to update either.
 */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}#organization`,
      name: SITE.brand,
      legalName: SITE.legalName,
      url: SITE.url,
      email: SITE.email,
      telephone: SITE.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.location,
        addressRegion: SITE.state,
        addressCountry: SITE.country,
      },
    },
    {
      '@type': 'Place',
      '@id': `${SITE.url}#place`,
      name: `${SITE.product} by ${SITE.brand}`,
      description: `A ${SITE.inventory.estateAcres}-acre gated eco-community of ${SITE.inventory.totalPlots} lakefront estate plots, anchored by a ${SITE.inventory.lakeAcres}-acre perennial lake in ${SITE.location}, ${SITE.state}.`,
      url: SITE.url,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.location,
        addressRegion: SITE.state,
        addressCountry: SITE.country,
      },
      telephone: SITE.phone,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cormorantSC.variable} ${montserrat.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body className="bg-earth font-body text-sky antialiased">
        <Grain />
        {children}
      </body>
    </html>
  );
}
