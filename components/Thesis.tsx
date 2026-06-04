import SectionReveal from '@/components/SectionReveal';

export default function Thesis() {
  return (
    <section id="thesis" className="bg-earth py-40 md:py-48">
      <SectionReveal className="container-edit max-w-[720px]">
        <p className="font-sc text-sand text-[0.7rem] tracking-widest2 mb-5">
          01
        </p>
        <span className="rule mb-10" />
        <h2 className="font-display font-light text-cream text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05]">
          The Architecture of Silence
        </h2>

        <div className="mt-12 space-y-7 font-body font-light text-sky text-[1.02rem] leading-[1.9]">
          <p>
            Most modern real estate developments begin by stripping the earth,
            flattening the topography, and forcing rigid geometric grids onto
            the landscape. Udyana does the opposite.
          </p>
          <p>
            The master plan of Udyana is an exercise in listening. We did not
            design a layout or a conventional villa project. Instead, we traced
            the natural contours of the land, mapped the wind corridors, and
            allowed a 15-acre living lake to dictate the entire rhythm of the
            community.
          </p>
          <p>
            This is a low-density, high-stewardship ecosystem — where
            infrastructure bows to nature — ensuring that your estate plot
            remains private, pristine, and fundamentally connected to the
            earth.
          </p>
        </div>

        <figure className="mt-16 max-w-[540px] mx-auto pl-8 border-l border-sand/50">
          <blockquote className="font-display italic font-light text-sand text-[clamp(1.5rem,2.4vw,2.05rem)] leading-snug">
            &ldquo;We did not design a layout. We listened to the land.&rdquo;
          </blockquote>
        </figure>
      </SectionReveal>
    </section>
  );
}
