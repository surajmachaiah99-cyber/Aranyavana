'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { enquirySchema, interestOptions, type EnquiryInput } from '@/lib/schemas';
import SectionReveal from '@/components/SectionReveal';

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
    <section id="enquiry" className="relative bg-paper py-32 md:py-44 overflow-hidden">
      {/* Paper → parchment gradient transition */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(160deg,#FAF6EF_0%,#F0E8D8_100%)]"
      />

      <div className="container-edit relative grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        <SectionReveal className="lg:col-span-5">
          <p className="eyebrow mb-5">· Private Briefing</p>
          <span className="rule mb-10" />
          <h2 className="font-display font-light text-bark text-[clamp(2rem,4vw,4rem)] leading-[1.1] tracking-[-0.02em]">
            Begin Your Conversation with the Land.
          </h2>
          <p className="mt-10 font-body font-light text-soil text-[1rem] leading-[1.9] max-w-md">
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
                className="font-body font-normal text-soleil/85 text-[0.78rem] tracking-[0.25em] uppercase"
              >
                {item}
              </li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal className="lg:col-span-7" delay={0.15}>
          <div className="rounded-sm border border-bark/10 bg-paper p-8 md:p-12 shadow-[0_4px_16px_rgba(42,31,20,0.10)]">
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="py-16 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <p className="font-body font-normal text-soleil text-[0.72rem] tracking-[0.25em] uppercase mb-6">
                    · Received
                  </p>
                  <p className="font-display italic font-light text-bark text-[clamp(1.4rem,2.4vw,2rem)] leading-snug max-w-md mx-auto">
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

                  <Field label="Designation / Company" error={errors.designation?.message}>
                    <input
                      type="text"
                      autoComplete="organization"
                      className="input-edit"
                      placeholder="What you do"
                      {...register('designation')}
                    />
                  </Field>

                  <Field label="Phone Number" error={errors.phone?.message}>
                    <div className="flex items-center gap-3">
                      <span className="font-body font-light text-clay text-[0.95rem]">
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
                      className="input-edit appearance-none"
                      defaultValue=""
                      {...register('interest')}
                    >
                      <option value="" disabled className="bg-paper">
                        Select one
                      </option>
                      {interestOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-paper">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {serverError && (
                    <p
                      role="alert"
                      className="md:col-span-2 font-body font-light text-[0.85rem] text-harvest"
                    >
                      {serverError}
                    </p>
                  )}

                  <div className="md:col-span-2 mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-fill-sand w-full"
                    >
                      {isSubmitting ? 'Sending…' : 'Request private briefing'}
                    </button>
                    <p className="mt-5 font-body font-light text-clay text-[0.72rem] tracking-wide">
                      We respond within 24 hours. By submitting, you consent to
                      be contacted about Udyana.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
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
        <span className="mt-2 block font-body font-light text-[0.78rem] text-harvest/90">
          {error}
        </span>
      )}
    </label>
  );
}
