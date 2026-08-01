import { z } from 'zod';

export const interestOptions = [
  'Long-term Investment',
  'Personal Retreat',
  'Family Legacy',
  'Nature & Lifestyle',
] as const;

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name.'),
  designation: z
    .string()
    .trim()
    .min(2, 'Please share your designation or company.'),
  phone: z
    .string()
    .trim()
    .min(10, 'Enter a valid phone number.')
    .max(15, 'Enter a valid phone number.')
    .regex(/^[0-9 \-+]+$/, 'Numbers only.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  visitDate: z.string().min(1, 'Please choose a preferred date.'),
  interest: z.enum(interestOptions, {
    errorMap: () => ({ message: 'Please select an option.' }),
  }),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

/**
 * Ecology-report gate. Just an email — this is a low-friction lead
 * capture, not a fully-qualified private-briefing enquiry. Written
 * as its own schema so the two lead qualities never get muddled.
 */
export const ecologyReportSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address.'),
});

export type EcologyReportInput = z.infer<typeof ecologyReportSchema>;
