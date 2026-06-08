import SectionReveal from '@/components/SectionReveal';

const MATERIALS: Array<[string, string]> = [
  ['Compressed Stabilised Earth Blocks', 'CSEB · Structural Core'],
  ['Natural Stone Cladding', 'Site-Sourced · Tactile'],
  ['Lime Plaster', 'Breathable · Ageless'],
  ['Timber', 'Responsibly Harvested'],
  ['Clay Roof Tiles', 'Thermal Mass · Vernacular'],
];

const PRINCIPLES = [
  'Deep Verandas',
  'Open Courtyards',
  'Firepit Zones',
  'Lake Views',
  'Natural Ventilation',
  'Indoor–Outdoor Living',
];

export default function Architectural() {
  return (
    <section id="architecture" className="bg-paper py-32 md:py-40">
      <div className="container-edit grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* ── LEFT: dark sticky material study card (intentional contrast) ── */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionReveal>
              <div
                className="relative aspect-[4/5] w-full overflow-hidden bg-bark rounded-sm"
                role="img"
                aria-label="Tropical Modern Architecture — Udyana"
              >
                <div className="absolute inset-0 bg-[linear-gradient(160deg,#2A1F14_0%,#4A3520_100%)]" />
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_60%_40%,rgba(232,166,66,0.35)_0%,transparent_60%)]" />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex flex-col">
                  <span className="block h-px w-12 bg-soleil/55 mb-5" />
                  <p className="font-body font-normal text-soleil/85 text-[0.7rem] tracking-[0.25em] uppercase">
                    · Material Study
                  </p>
                  <p className="mt-3 font-display italic font-light text-parchment text-[1.45rem] leading-snug">
                    Tropical Modern Architecture · Udyana
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>

        {/* ── RIGHT: editorial copy + materials list (light) ── */}
        <div className="lg:col-span-7">
          <SectionReveal>
            <p className="font-body font-normal text-clay text-[0.75rem] tracking-[0.25em] uppercase mb-5">
              03
            </p>
            <span className="block h-px w-12 bg-soleil/55 mb-10" />
            <h2 className="font-display font-light text-bark text-[clamp(2rem,4vw,4rem)] leading-[1.1] tracking-[-0.02em]">
              Homes That Breathe.
            </h2>

            <p className="mt-10 font-body font-light text-soil text-[1rem] leading-[1.9] max-w-[560px]">
              To protect the long-term aesthetic value and environmental
              integrity of Udyana, the community mandates a Tropical Modern
              design language. We champion homes built with natural, raw
              materials that age gracefully alongside the forest.
            </p>

            <div className="mt-14">
              <p className="font-body font-normal text-soleil/80 text-[0.7rem] tracking-[0.25em] uppercase mb-6">
                · The Material Palette
              </p>
              <ul className="border-y border-bark/10 divide-y divide-bark/10">
                {MATERIALS.map(([material, quality]) => (
                  <li
                    key={material}
                    className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:gap-8 py-5"
                  >
                    <span className="font-display font-normal text-bark text-[1.2rem]">
                      {material}
                    </span>
                    <span className="font-body font-light text-clay text-[0.78rem] tracking-wider uppercase self-end sm:self-center">
                      {quality}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-14 font-body font-light text-soil text-[1rem] leading-[1.9] max-w-[560px]">
              Every estate blueprint prioritises deep verandas, central open
              courtyards, and dedicated lakeside firepit zones — turning the
              daily ritual of watching the sun set over the water into the
              centre of home life.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {PRINCIPLES.map((p) => (
                <span key={p} className="pill">
                  {p}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
