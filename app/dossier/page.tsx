import Link from 'next/link';
import type { Metadata } from 'next';
import { LANDSCAPES, HOMES } from '@/lib/homes';
import { SITE } from '@/lib/site';

/**
 * The Estate Dossier.
 *
 * Second-touch content: the full space programs, material specifications,
 * feature lists, optional upgrades, and investment tiers that used to
 * live inline in the Homes That Breathe section. Now gated by
 * middleware.ts, which requires the `udyana_verified` cookie set on a
 * successful /api/enquiry submit.
 *
 * The page uses the site's existing palette + typography stack; no new
 * scoped CSS, no new fonts. Layout is a formal document layout --
 * eyebrow, heading, table blocks -- so it reads like a proposal rather
 * than a marketing page.
 */

export const metadata: Metadata = {
  title: 'The Estate Dossier · Udyana by Aranyavana',
  description:
    'Full space programs, material specifications, and investment tiers for Udyana estate homes and landscape packages. Shared with confirmed enquirers.',
  robots: { index: false, follow: false },
};

export default function DossierPage() {
  return (
    <main className="bg-earth min-h-screen">
      {/* Header ── quiet nav back to the homepage */}
      <header className="border-b border-bark/50">
        <div className="container-edit flex items-center justify-between py-6 md:py-8">
          <Link
            href="/"
            className="font-sc text-mist/70 hover:text-mist text-[0.7rem] md:text-[0.78rem] tracking-widest2 transition-colors"
          >
            ← Aranyavana
          </Link>
          <span className="font-sc text-sand/60 text-[0.68rem] md:text-[0.72rem] tracking-widest2">
            · The Estate Dossier
          </span>
        </div>
      </header>

      {/* Intro */}
      <section className="py-24 md:py-32">
        <div className="container-edit max-w-3xl text-center">
          <p className="eyebrow mb-5">· The Estate Dossier · {SITE.product}</p>
          <span className="rule mx-auto mb-10" />
          <h1 className="font-display italic font-light text-cream text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05]">
            Detail behind the briefing.
          </h1>
          <p className="mt-10 font-body font-light text-sky/85 text-[1.02rem] leading-[1.95]">
            The space programs, material specifications, feature schedules,
            and investment tiers that shape every estate at Udyana. This is
            the working document that walks you through what your home is,
            in what it is made of, and at what price. Nothing hidden;
            nothing rounded.
          </p>
        </div>
      </section>

      {/* Landscape packages */}
      <section className="py-16 md:py-20 border-t border-bark/50">
        <div className="container-edit">
          <p className="eyebrow mb-5">· 01 · Landscape Packages</p>
          <h2 className="font-display italic font-light text-cream text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight mb-12 max-w-2xl">
            Let the land come alive.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bark/40">
            {LANDSCAPES.map((p) => (
              <article
                key={p.id}
                className="bg-stone/40 p-8 md:p-12 space-y-6"
              >
                <div>
                  <p className="font-sc text-sand text-[0.68rem] tracking-widest2 mb-3">
                    · Landscape · {p.id.toUpperCase()}
                  </p>
                  <h3 className="font-display font-light text-cream text-[clamp(1.5rem,2.4vw,2rem)] leading-tight">
                    {p.name}
                  </h3>
                  <p className="mt-3 font-body font-light italic text-sand text-[0.95rem] leading-relaxed">
                    {p.tagline}
                  </p>
                </div>

                <div>
                  <p className="font-sc text-mist/50 text-[0.68rem] tracking-widest2 mb-4">
                    · Includes
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 font-body font-light text-mist/80 text-[0.9rem]">
                    {p.includes.map((it) => (
                      <li key={it} className="pl-4 relative">
                        <span className="absolute left-0 top-[0.55em] w-1 h-1 rounded-full bg-sand/60" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-bark/40">
                  <p className="font-sc text-mist/50 text-[0.68rem] tracking-widest2 mb-2">
                    · Investment
                  </p>
                  <p className="font-display font-light text-cream text-[1.4rem] leading-tight">
                    {p.investment}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Construction packages */}
      <section className="py-16 md:py-20 border-t border-bark/50">
        <div className="container-edit">
          <p className="eyebrow mb-5">· 02 · Construction Packages</p>
          <h2 className="font-display italic font-light text-cream text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight mb-12 max-w-2xl">
            A home that breathes with the forest.
          </h2>

          <div className="space-y-12 md:space-y-16">
            {HOMES.map((h) => (
              <article
                key={h.id}
                className="bg-stone/40 border border-bark/40 p-8 md:p-12"
              >
                <header className="mb-10 md:mb-12 border-b border-bark/40 pb-8">
                  <p className="font-sc text-sand text-[0.68rem] tracking-widest2 mb-3">
                    · Home · {h.id.toUpperCase()} · Built-Up {h.area}
                  </p>
                  <h3 className="font-display font-light text-cream text-[clamp(1.75rem,3vw,2.5rem)] leading-tight">
                    {h.name}
                  </h3>
                  <p className="mt-3 font-body font-light text-sand/85 text-[0.95rem]">
                    {h.trigger}
                  </p>
                  <p className="mt-5 font-body font-light text-mist/70 text-[0.9rem] leading-relaxed">
                    <strong className="font-normal text-mist">
                      {h.styleLabel}:
                    </strong>{' '}
                    {h.styleDesc}
                    {h.styleNote && (
                      <>
                        <br />
                        <span className="italic text-sky/70">
                          {h.styleNote}
                        </span>
                      </>
                    )}
                  </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                  <div>
                    <p className="font-sc text-mist/50 text-[0.68rem] tracking-widest2 mb-4">
                      · Space Program
                    </p>
                    <table className="w-full font-body font-light text-[0.9rem]">
                      <tbody>
                        {h.spaceProgram.map(([room, dims]) => (
                          <tr key={room} className="border-b border-bark/30">
                            <th
                              scope="row"
                              className="text-left py-2 pr-4 font-normal text-mist/80"
                            >
                              {room}
                            </th>
                            <td className="text-right py-2 text-sky/85">
                              {dims}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <p className="font-sc text-mist/50 text-[0.68rem] tracking-widest2 mb-4">
                      · Material Specifications
                    </p>
                    <table className="w-full font-body font-light text-[0.85rem]">
                      <tbody>
                        {h.materials.map(([element, spec]) => (
                          <tr key={element} className="border-b border-bark/30">
                            <th
                              scope="row"
                              className="text-left py-2 pr-4 font-normal text-mist/80 align-top"
                            >
                              {element}
                            </th>
                            <td className="py-2 text-sky/80 leading-snug">
                              {spec}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-10 md:mt-12">
                  <p className="font-sc text-mist/50 text-[0.68rem] tracking-widest2 mb-4">
                    · {h.featuresLabel}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {h.features.map((f) => (
                      <li
                        key={f}
                        className="font-sc text-sand/75 text-[0.62rem] tracking-widest2 border border-bark/60 rounded-none px-3 py-1.5"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {h.upgrades && (
                  <div className="mt-10 md:mt-12">
                    <p className="font-sc text-mist/50 text-[0.68rem] tracking-widest2 mb-4">
                      · {h.upgrades.heading}
                    </p>
                    <table className="w-full max-w-lg font-body font-light text-[0.9rem]">
                      <tbody>
                        {h.upgrades.rows.map(([k, v]) => (
                          <tr key={k} className="border-b border-bark/30">
                            <th
                              scope="row"
                              className="text-left py-2 pr-4 font-normal text-mist/80"
                            >
                              {k}
                            </th>
                            <td className="text-right py-2 text-sand/85">
                              {v}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="mt-10 md:mt-12 pt-8 border-t border-bark/40">
                  <p className="font-sc text-mist/50 text-[0.68rem] tracking-widest2 mb-4">
                    · Investment
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {h.investment.map(([tier, range]) => (
                      <div key={tier}>
                        <p className="font-body font-light text-mist/70 text-[0.85rem]">
                          {tier}
                        </p>
                        <p className="mt-1 font-display font-light text-cream text-[1.5rem] leading-tight">
                          {range}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Foot ── quiet return */}
      <footer className="py-16 md:py-20 border-t border-bark/50">
        <div className="container-edit text-center space-y-6">
          <p className="font-body font-light italic text-sky/70 text-[0.95rem] max-w-xl mx-auto leading-relaxed">
            Every price shown is a shell figure. Final investment depends on
            the plot, the orientation, and the finish schedule chosen with
            your estate advisor.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link
              href="/#enquiry"
              className="font-sc text-sand hover:text-cream text-[0.72rem] tracking-widest2 transition-colors"
            >
              · Book a private walkthrough
            </Link>
            <a
              href={`tel:${SITE.phoneRaw}`}
              aria-label={`Call ${SITE.phone}`}
              className="font-sc text-sand/85 hover:text-cream text-[0.72rem] tracking-widest2 transition-colors"
            >
              · {SITE.phone}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
