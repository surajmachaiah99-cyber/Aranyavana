'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { enquirySchema, interestOptions, type EnquiryInput } from '@/lib/schemas';
import SectionReveal from '@/components/SectionReveal';
import { SITE } from '@/lib/site';

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: '',
      designation: '',
      phone: '',
      email: '',
      visitDate: '',
      interest: undefined,
    },
  });

  const onSubmit = async (data: EnquiryInput) => {
    setServerError(null);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setServerError(body.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError('Network error. Please try again.');
    }
  };

  return (
    <section id="enquiry" className="bg-earth py-32 md:py-44">
      <div className="container-edit grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        <SectionReveal className="lg:col-span-5">
          <p className="eyebrow mb-5">· Private Briefing</p>
          <span className="rule mb-10" />
          <h2 className="font-display font-light text-cream text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">
            Begin Your Conversation with the Land.
          </h2>
          <p className="mt-10 font-body font-light text-sky text-[1.02rem] leading-[1.9] max-w-md">
            Udyana is available by private appointment only. Complete the form
            to receive a personal briefing from our estate advisors.
          </p>

          <ul className="mt-12 space-y-4">
            {[
              '· Private Site Tours Available',
              '· Detailed Investment Dossier',
              '· Masterplan Walkthrough',
            ].map((item) => (
              <li
                key={item}
                className="font-sc text-sand/85 text-[0.78rem] tracking-widest2"
              >
                {item}
              </li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal className="lg:col-span-7" delay={0.15}>
          <div className="border border-bark/60 bg-stone/30 p-8 md:p-12">
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="py-16 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <p className="font-sc text-sand text-[0.72rem] tracking-widest2 mb-6">
                    · Received
                  </p>
                  <p className="font-display italic font-light text-cream text-[clamp(1.4rem,2.4vw,2rem)] leading-snug max-w-md mx-auto">
                    &ldquo;Thank you. Our estate advisor will be in touch within
                    24 hours.&rdquo;
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7"
                >
                  <Field label="Full Name" error={errors.fullName?.message}>
                    <input
                      type="text"
                      autoComplete="name"
                      className="input-edit"
                      placeholder="Your name"
                      {...register('fullName')}
                    />
                  </Field>

                  <Field
                    label="Designation / Company"
                    error={errors.designation?.message}
                  >
                    <input
                      type="text"
                      autoComplete="organization"
                      className="input-edit"
                      placeholder="What you do"
                      {...register('designation')}
                    />
                  </Field>

                  <Field label="Phone Number" error={errors.phone?.message}>
                    <div className="flex items-end gap-3">
                      <span className="font-body font-light text-mist/55 text-[0.95rem] pb-[0.7rem]">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        className="input-edit flex-1"
                        placeholder="98765 43210"
                        {...register('phone')}
                      />
                    </div>
                  </Field>

                  <Field label="Email Address" error={errors.email?.message}>
                    <input
                      type="email"
                      autoComplete="email"
                      className="input-edit"
                      placeholder="you@domain.com"
                      {...register('email')}
                    />
                  </Field>

                  <Field
                    label="Preferred Date for Site Tour"
                    error={errors.visitDate?.message}
                  >
                    <input
                      type="date"
                      className="input-edit"
                      {...register('visitDate')}
                    />
                  </Field>

                  <Field
                    label="What matters most to you?"
                    error={errors.interest?.message}
                  >
                    <select
                      className="input-edit appearance-none bg-transparent"
                      defaultValue=""
                      {...register('interest')}
                    >
                      <option value="" disabled className="bg-earth">
                        Select one
                      </option>
                      {interestOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-earth">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {serverError && (
                    <p
                      role="alert"
                      className="md:col-span-2 font-body font-light text-[0.85rem] text-sand"
                    >
                      {serverError}
                    </p>
                  )}

                  <div className="md:col-span-2 mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-fill-sand"
                    >
                      {isSubmitting ? 'Sending…' : 'Request private briefing'}
                    </button>
                    <p className="mt-5 font-body font-light text-mist/45 text-[0.72rem] tracking-wide">
                      We respond within 24 hours. By submitting, you consent to
                      be contacted about Udyana and agree to our{' '}
                      <a
                        href="/privacy"
                        className="underline underline-offset-2 decoration-mist/30 hover:text-mist transition-colors"
                      >
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Alternative path — for readers who prefer to call rather than
              fill a form. Reads as an offer, not an escape hatch. */}
          <p className="mt-8 text-center font-body font-light text-mist/55 text-[0.82rem]">
            Prefer to speak directly?{' '}
            <a
              href={`tel:${SITE.phoneRaw}`}
              aria-label={`Call ${SITE.phone}`}
              className="text-sand hover:text-cream transition-colors"
            >
              {SITE.phone}
            </a>
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label-edit">{label}</span>
      {children}
      {error && (
        <span className="mt-2 block font-body font-light text-[0.78rem] text-sand/90">
          {error}
        </span>
      )}
    </label>
  );
}
