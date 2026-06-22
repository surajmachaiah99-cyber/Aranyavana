import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.aranyavana.com';

/**
 * Next.js automatically serves this at /robots.txt.
 * Allows all crawlers and points them at the sitemap so search
 * engines can discover the site structure without manual submission.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
