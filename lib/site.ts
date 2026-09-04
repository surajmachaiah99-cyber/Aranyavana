/**
 * Canonical site constants.
 *
 * Single source of truth for every fact that appears in more than one
 * place on the site — location, contact details, inventory counts,
 * geometry of the estate/lake. If a component needs any of these
 * strings, it should import from here rather than hardcode.
 *
 * When one of these values changes, edit it here — nowhere else.
 */
export const SITE = {
  brand: 'Aranyavana',
  product: 'Udyana',
  legalName: 'Aranyavana Infra Developers LLP',

  url: 'https://www.aranyavana.com',
  email: 'hello@aranyavana.com',

  // Phone: display form for humans, digits-only form for tel: and wa.me links.
  phone: '+91 94227 99976',
  phoneRaw: '919422799976',
  whatsappUrl:
    'https://wa.me/919422799976?text=I%27d%20like%20to%20know%20more%20about%20Udyana',

  // Social. Handle string is what shows in the footer; URL is what opens.
  // Kept as a single source so the two never drift apart.
  instagramUrl: 'https://www.instagram.com/aranyavana.life/',
  instagramHandle: '@aranyavana.life',

  // Canonical location. Do not use "Kudlur", "Magadi", or "NH-75" anywhere.
  location: 'Solur, Nelamangala',
  locationLong: 'Solur, Nelamangala · Bangalore Rural',
  state: 'Karnataka',
  country: 'India',

  inventory: {
    /**
     * The estate is 15 acres and contains 69 estate plots in total.
     * `remainingPlots` is the number currently available for sale;
     * update `updatedLabel` in the same edit whenever this changes.
     */
    totalPlots: 69,
    remainingPlots: 18,
    plotSizeSqft: 6000,
    plotSizeDisplay: '6,000 sq.ft',

    estateAcres: 15,
    lakeAcres: 60,
    totalAcres: 75,
    ratio: '1:4',

    /**
     * Manual "as of" label for the scarcity counter.
     * DO NOT auto-compute this from build time — the word "Updated"
     * to a reader implies human confirmation of live inventory, not a
     * timestamp of the last unrelated deploy. Update this string only
     * when you have re-verified `remainingPlots` against the sales log.
     */
    updatedLabel: 'November 2026',
  },
} as const;

export type SiteConfig = typeof SITE;

/**
 * The homepage's numbered top-level sections, in scroll order.
 *
 * Renumbering rules:
 *   - Sections declared here render numeric badges (01, 02, 03...).
 *   - Balance and LegalStanding are intentionally NOT listed --
 *     they're unnumbered interludes between numbered blocks.
 *   - Insert or remove an entry here and every component picks up
 *     the new number automatically via `sectionNum(slug)`. Do NOT
 *     hardcode section numbers anywhere else.
 */
export const SECTIONS = [
  { slug: 'philosophy', name: 'The Aranyavana Philosophy' },
  { slug: 'verification', name: 'Independent Verification' },
  { slug: 'offering', name: 'The Offering' },
  { slug: 'material-study', name: 'Material Study' },
  { slug: 'investment-thesis', name: 'The Investment Thesis' },
  { slug: 'founder-letter', name: 'A Note From the Co-Founder' },
] as const;

export type SectionSlug = (typeof SECTIONS)[number]['slug'];

/**
 * Given a section slug, returns its zero-padded ordinal ('01', '02'...).
 * Empty string if the slug is not registered.
 */
export function sectionNum(slug: SectionSlug): string {
  const idx = SECTIONS.findIndex((s) => s.slug === slug);
  return idx === -1 ? '' : String(idx + 1).padStart(2, '0');
}
