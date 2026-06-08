import SectionReveal from '@/components/SectionReveal';

/**
 * The Thesis — light editorial section.
 *
 * Paper-light page surface lifting into the new amber/bark system.
 * Left rail keeps the vertical "Curated Nature Living" wordmark.
 */
export default function Thesis() {
  // Local palette pinned to spec tokens so this section can be tuned
  // without pulling other sections along.
  const amber = '#E8A642';      // soleil
  const headline = '#2A1F14';   // bark — primary text on light
  const body = '#4A3520';       // soil — body copy on light
  const label = '#8B6B47';      // clay — muted micro-labels

  return (
    <section id="thesis" className="relative overflow-hidden bg-paper">
      {/* Soft section transition gradient (paper → parchment) per spec.
          Lifts the eye downward into the next section. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(160deg,#FAF6EF_0%,#F0E8D8_100%)]"
      />
      {/* Faint amber halo, upper-right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgba(232,166,66,0.07)_0%,transparent_55%)]"
      />

      <div className="container-edit relative grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-20 py-32 md:py-40 lg:py-48">
        {/* ── LEFT VERTICAL SIDEBAR ──────────────────────────────────── */}
        <aside aria-hidden="true" className="hidden lg:block lg:col-span-1">
          <div className="sticky top-32 flex justify-center">
            <span
              className="font-body font-light text-[0.7rem] tracking-[0.55em] uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-180"
              style={{ color: amber }}
            >
              Curated Nature Living
            </span>
          </div>
        </aside>

        {/* ── MAIN EDITORIAL COLUMN ──────────────────────────────────── */}
        <SectionReveal className="lg:col-span-10 lg:col-start-2 max-w-[720px]">
          {/* Section label */}
          <p
            className="font-body font-normal text-[0.75rem] tracking-[0.25em] uppercase"
            style={{ color: label }}
          >
            The Thesis
          </p>

          {/* Thin amber rule */}
          <span
            aria-hidden="true"
            className="mt-6 block h-px w-12"
            style={{ backgroundColor: amber, opacity: 0.55 }}
          />

          {/* Headline */}
          <h2
            className="mt-10 font-display font-light leading-[1.1] tracking-[-0.02em] text-[clamp(2rem,4vw,4rem)]"
            style={{ color: headline }}
          >
            The Architecture of Silence
          </h2>

          {/* Body paragraphs */}
          <div
            className="mt-14 space-y-9 font-body font-light text-[1rem] md:text-[1.08rem] leading-[1.9]"
            style={{ color: body }}
          >
            <p>
              Most modern real estate developments begin by stripping the
              earth, flattening the topography, and forcing rigid geometric
              grids onto the landscape.{' '}
              <strong className="font-medium" style={{ color: headline }}>
                Udyana does the opposite.
              </strong>
            </p>

            <p>
              The master plan of Udyana is an exercise in listening. We did
              not design a layout or a conventional villa project. Instead,
              we traced the natural contours of the land, mapped the wind
              corridors, and allowed a{' '}
              <span style={{ color: amber }}>15-acre living lake</span>{' '}
              to dictate the entire rhythm of the community.
            </p>

            <p>
              This is a low-density, high-stewardship ecosystem where
              infrastructure bows to nature — ensuring that your estate plot
              remains private, pristine, and fundamentally connected to the
              earth.
            </p>
          </div>

          {/* Pull-quote */}
          <figure className="mt-24 md:mt-28 flex flex-col items-center text-center">
            <div aria-hidden="true" className="flex items-center gap-3 mb-10">
              <span className="block h-[1px] w-10" style={{ backgroundColor: amber, opacity: 0.55 }} />
              <span className="block h-1 w-1 rounded-full" style={{ backgroundColor: amber, opacity: 0.7 }} />
              <span className="block h-[1px] w-10" style={{ backgroundColor: amber, opacity: 0.55 }} />
            </div>

            <blockquote
              className="font-display italic font-light leading-[1.25] tracking-[-0.005em] text-[clamp(1.65rem,3.2vw,2.6rem)] max-w-[640px]"
              style={{ color: headline }}
            >
              Nature is not the backdrop to life here.
              <br className="hidden md:block" />{' '}
              <span style={{ color: amber }}>Nature is the architect.</span>
            </blockquote>
          </figure>
        </SectionReveal>
      </div>
    </section>
  );
}
