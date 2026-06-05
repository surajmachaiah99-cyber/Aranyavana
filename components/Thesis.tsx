import SectionReveal from '@/components/SectionReveal';

/**
 * Page 2 — "The Thesis"
 *
 * Editorial layout: a left-anchored vertical tagline acts as a typographic
 * sidebar against a generous main column. Background carries the hero's
 * forest-green register (#14221a) into a slightly deeper tone so the page
 * reads as one continuous descent into the brand.
 */
export default function Thesis() {
  // Palette tokens kept local so this section can be tuned without
  // pulling other sections along.
  const gold = '#D1C2A5';      // champagne accent
  const cream = '#E5D9C4';     // warm cream
  const headline = '#F4ECDD';  // title cream (matches hero)
  const body = '#F4F0E7';      // crisp warm white for paragraphs
  const label = '#8E938A';     // muted grey-green for labels

  return (
    <section
      id="thesis"
      className="relative overflow-hidden bg-[#14221a]"
    >
      {/* Deep gradient that finishes the hero's forest-green wash, then
          settles into near-black so the next section can lift off. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#14221a] via-[#111c15] to-[#0d1610]"
      />
      {/* Ambient radial glow — barely-there warmth from the upper-right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgba(209,194,165,0.06)_0%,transparent_55%)]"
      />

      <div className="container-edit relative grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-20 py-32 md:py-40 lg:py-48">
        {/* ── LEFT VERTICAL SIDEBAR ─────────────────────────────────────────
            Hidden on mobile/tablet, visible from lg up. Sticky-anchored so
            the brand thread stays on screen while the reader moves through
            the body copy. */}
        <aside
          aria-hidden="true"
          className="hidden lg:block lg:col-span-1"
        >
          <div className="sticky top-32 flex justify-center">
            <span
              className="font-body font-light text-[0.7rem] tracking-[0.55em] uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-180"
              style={{ color: gold }}
            >
              Curated Nature Living
            </span>
          </div>
        </aside>

        {/* ── MAIN EDITORIAL COLUMN ──────────────────────────────────────── */}
        <SectionReveal className="lg:col-span-10 lg:col-start-2 max-w-[720px]">
          {/* Section label */}
          <p
            className="font-body font-light text-[0.7rem] tracking-[0.4em] uppercase"
            style={{ color: label }}
          >
            The Thesis
          </p>

          {/* Thin rule */}
          <span
            aria-hidden="true"
            className="mt-6 block h-px w-12"
            style={{ backgroundColor: gold, opacity: 0.55 }}
          />

          {/* Headline */}
          <h2
            className="mt-10 font-display font-light leading-[1.04] tracking-[-0.005em] text-[clamp(2.5rem,5vw,4.25rem)]"
            style={{ color: headline }}
          >
            The Architecture of Silence
          </h2>

          {/* Body paragraphs */}
          <div className="mt-14 space-y-9 font-body font-light text-[1.02rem] md:text-[1.08rem] leading-[1.95]" style={{ color: body }}>
            <p>
              Most modern real estate developments begin by stripping the
              earth, flattening the topography, and forcing rigid geometric
              grids onto the landscape.{' '}
              <strong
                className="font-medium"
                style={{ color: headline }}
              >
                Udyana does the opposite.
              </strong>
            </p>

            <p>
              The master plan of Udyana is an exercise in listening. We did
              not design a layout or a conventional villa project. Instead,
              we traced the natural contours of the land, mapped the wind
              corridors, and allowed a{' '}
              <span style={{ color: gold }}>15-acre living lake</span>{' '}
              to dictate the entire rhythm of the community.
            </p>

            <p>
              This is a low-density, high-stewardship ecosystem where
              infrastructure bows to nature — ensuring that your estate plot
              remains private, pristine, and fundamentally connected to the
              earth.
            </p>
          </div>

          {/* Pull-quote — core philosophy */}
          <figure className="mt-24 md:mt-28 flex flex-col items-center text-center">
            {/* Top decorative rule with flanking dots */}
            <div
              aria-hidden="true"
              className="flex items-center gap-3 mb-10"
            >
              <span className="block h-[1px] w-10" style={{ backgroundColor: gold, opacity: 0.55 }} />
              <span className="block h-1 w-1 rounded-full" style={{ backgroundColor: gold, opacity: 0.7 }} />
              <span className="block h-[1px] w-10" style={{ backgroundColor: gold, opacity: 0.55 }} />
            </div>

            <blockquote
              className="font-display italic font-light leading-[1.25] tracking-[-0.005em] text-[clamp(1.65rem,3.2vw,2.6rem)] max-w-[640px]"
              style={{ color: headline }}
            >
              Nature is not the backdrop to life here.
              <br className="hidden md:block" />{' '}
              <span style={{ color: gold }}>Nature is the architect.</span>
            </blockquote>
          </figure>
        </SectionReveal>
      </div>
    </section>
  );
}
