/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },

  /**
   * Cache-Control overrides.
   *
   * Next.js's default for statically rendered pages is
   * `s-maxage=31536000, stale-while-revalidate` (1 YEAR of shared-cache).
   * On Hostinger that means the CDN can hold an HTML response for a year
   * across edges, and after a redeploy, old visitors keep getting HTML
   * pointing at hashed bundle filenames that no longer exist — so the
   * page renders unstyled. That's what bit us when the link was shared.
   *
   * We override the HTML cache to:
   *   - browser: revalidate every navigation (`max-age=0, must-revalidate`)
   *   - CDN:     cache for 5 min, serve stale up to 10 min while
   *              revalidating (`s-maxage=300, stale-while-revalidate=600`)
   *
   * Hashed bundles under `/_next/static/*` are content-addressed and
   * immutable, so we deliberately do NOT override them — Next.js's
   * `immutable, max-age=31536000` is correct there.
   */
  async headers() {
    const noStaleHtml = [
      {
        key: 'Cache-Control',
        value:
          'public, max-age=0, must-revalidate, s-maxage=300, stale-while-revalidate=600',
      },
    ];

    return [
      { source: '/', headers: noStaleHtml },
      { source: '/index', headers: noStaleHtml },
    ];
  },
};

export default nextConfig;
