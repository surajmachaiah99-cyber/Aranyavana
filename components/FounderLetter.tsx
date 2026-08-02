'use client';

import { useState } from 'react';
import { SITE, sectionNum } from '@/lib/site';

/**
 * FounderLetter — a single, quiet section that puts a name and a
 * portrait behind the brand.
 *
 * Layout is two-column on desktop (portrait left, letter right),
 * stacked on mobile. If public/images/founder-suraj.jpg is not yet
 * on disk, the <img> onError handler flips the layout to letter-only,
 * centred, single-column -- no broken-image icon ever shows.
 *
 * Portrait treatment is editorial: no rounded avatar, no drop shadow.
 * The .founder-portrait rule applies a subtle desaturation + warm
 * tint so the image sits inside the site's palette rather than
 * fighting it.
 */
export default function FounderLetter() {
  const [imageOk, setImageOk] = useState(true);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .founder-portrait {
              filter: saturate(0.75) contrast(1.02) sepia(0.08);
              transition: filter 0.6s ease;
            }
          `,
        }}
      />

      <section id="founder" className="bg-earth py-32 md:py-44">
        <div
          className={
            imageOk
              ? 'container-edit grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-20 items-start'
              : 'container-edit max-w-2xl mx-auto'
          }
        >
          {imageOk && (
            <div className="md:col-span-5 lg:col-span-4">
              <div className="aspect-[4/5] bg-stone/40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/founder-suraj.jpg"
                  alt="Suraj Machaiah — Co-Founder of Aranyavana"
                  loading="lazy"
                  onError={() => setImageOk(false)}
                  className="w-full h-full object-cover founder-portrait"
                />
              </div>
            </div>
          )}

          <div
            className={
              imageOk
                ? 'md:col-span-7 lg:col-span-7 lg:col-start-6'
                : 'text-center'
            }
          >
            <p className="eyebrow mb-5">
              · {sectionNum('founder-letter')} · A Note From the Co-Founder
            </p>
            <span
              className={imageOk ? 'rule block mb-10' : 'rule mx-auto mb-10'}
            />
            <h2 className="font-display italic font-light text-cream text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05]">
              Why we seed before we build.
            </h2>

            <div
              className={
                imageOk
                  ? 'mt-10 space-y-5 font-body font-light text-sky/85 text-[0.98rem] leading-[1.9]'
                  : 'mt-10 space-y-5 font-body font-light text-sky/85 text-[0.98rem] leading-[1.9] text-left max-w-xl mx-auto'
              }
            >
              <p>I did not set out to become a developer.</p>
              <p>
                I set out because I watched land near Bangalore change faster
                than anyone could account for — lakes filled in, groves cleared,
                layouts named after the trees that were removed to build them.
                Every project promised nature. Almost none of them kept it.
              </p>
              <p>Aranyavana began, for us, as a correction.</p>
              <p>
                At Udyana, we scattered thousands of native seedballs across
                this land before a single boundary was marked. Not as a
                gesture — as a sequence. The forest starts first. Everything
                else follows its lead.
              </p>
              <p>
                We chose this land because of the lake. Sixty acres of
                perennial water, four times the size of the community beside
                it, legally protected and independently verified. In the
                decades ahead, land with secure natural water will not be a
                lifestyle preference. It will be the scarce asset.
              </p>
              <p>
                We are keeping this small. Sixty-nine plots across fifteen
                acres, and no more. We would rather build one community that
                is still standing in a hundred years than ten that are
                forgotten in twenty.
              </p>
              <p>
                If that is the kind of thing you have been looking for, I
                would like to walk the land with you myself.
              </p>
            </div>

            <div
              className={`mt-12 pt-8 border-t border-bark/50 ${
                imageOk ? '' : 'text-center'
              }`}
            >
              <p className="font-display italic font-light text-cream text-[1.5rem] leading-none">
                Suraj Machaiah
              </p>
              <p className="mt-3 font-sc text-sand/85 text-[0.72rem] tracking-widest2">
                · Co-Founder · {SITE.legalName}
              </p>
              <p className="mt-6 font-body font-light">
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  aria-label={`Call Suraj Machaiah at ${SITE.phone}`}
                  className="text-mist/85 hover:text-mist text-[0.95rem] transition-colors"
                >
                  {SITE.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
