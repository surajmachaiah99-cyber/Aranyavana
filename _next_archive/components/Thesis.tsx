import SectionReveal from '@/components/SectionReveal';

export default function Thesis() {
  return (
    <section id="thesis" className="bg-earth py-40 md:py-48 relative">
      <div className="container-edit grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative">
        {/* Decorative vertical text accent */}
        <aside
          aria-hidden="true"
          className="hidden lg:flex lg:col-span-1 justify-center pt-4"
        >
          <span
            className="font-sc text-sand/55 text-[0.7rem] tracking-widest2 [writing-mode:vertical-rl] rotate-180 whitespace-nowrap"
          >
            · The Architecture of Silence · Chapter One ·
          </span>
        </aside>

        {/* Left column: section header + opening copy */}
        <SectionReveal className="lg:col-span-5 lg:col-start-2">
          <p className="font-sc text-sand text-[0.7rem] tracking-widest2 mb-5">
            01
          </p>
          <span className="rule mb-10" />
          <h2 className="font-display font-light text-cream text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05]">
            The Architecture of Silence
          </h2>

          <p className="mt-12 font-body font-light text-sky text-[1.02rem] leading-[1.9]">
            Most modern real estate developments begin by stripping the earth,
            flattening the topography, and forcing rigid geometric grids onto
            the landscape. Udyana does the opposite.
          </p>
        </SectionReveal>

        {/* Right column: continuing copy + sculptural pull quote */}
        <SectionReveal className="lg:col-span-5" delay={0.15}>
          <div className="space-y-7 font-body font-light text-sky text-[1.02rem] leading-[1.9] lg:mt-[7.5rem]">
            <p>
              The master plan of Udyana is an exercise in listening. We did not
              design a layout or a conventional villa project. Instead, we
              traced the natural contours of the land, mapped the wind
              corridors, and allowed a 15-acre living lake to dictate the
              entire rhythm of the community.
            </p>
            <p>
              This is a low-density, high-stewardship ecosystem — where
              infrastructure bows to nature — ensuring that your estate plot
              remains private, pristine, and fundamentally connected to the
              earth.
            </p>
          </div>
        </SectionReveal>

        {/* Sculptural pull quote — spans full width below the columns */}
        <SectionReveal
          className="lg:col-span-12 mt-24 md:mt-32 flex justify-center"
          delay={0.2}
        >
          <figure className="relative max-w-[760px] px-8 md:px-16 text-center">
            <span
              aria-hidden="true"
              className="absolute -top-12 left-0 md:-top-20 md:-left-4 font-display italic font-light text-sand/30 text-[clamp(7rem,14vw,12rem)] leading-none select-none"
            >
              &ldquo;
            </span>
            <blockquote className="font-display italic font-light text-cream text-[clamp(1.85rem,3.5vw,2.9rem)] leading-[1.25]">
              We did not design a layout. We listened to the land.
            </blockquote>
            <figcaption className="mt-8 inline-flex items-center gap-4 font-sc text-sand/80 text-[0.7rem] tracking-widest2">
              <span className="h-px w-12 bg-sand/50" />
              The Founding Principle
              <span className="h-px w-12 bg-sand/50" />
            </figcaption>
          </figure>
        </SectionReveal>
      </div>
    </section>
  );
}
