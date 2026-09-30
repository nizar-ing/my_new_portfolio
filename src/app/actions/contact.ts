'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { sendMail } from '@/lib/mail';

const schema = z.object({
  name: z.string().min(2, 'At least 2 characters required'),
  email: z.string().email('Enter a valid email address'),
  company: z.string().optional(),
  subject: z.enum(['Full-time role', 'Freelance project', 'Other'], {
    error: 'Please select a subject',
  }),
  message: z
    .string()
    .min(10, 'At least 10 characters required')
    .max(2000, 'Maximum 2 000 characters'),
});

// Simple in-memory rate limit: 3 submissions per IP per hour.
// Resets on every deploy — use Upstash for persistence in production.
const rateLimitMap = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  errors?: Partial<Record<string, string[]>>;
  message?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: bots fill hidden fields; real users never see this field
  if (formData.get('website')) {
    return { status: 'success' };
  }

  // Rate limit by IP
  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  const now = Date.now();
  const recent = (rateLimitMap.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    return { status: 'error', message: 'Too many submissions. Please try again later.' };
  }

  const result = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company') || undefined,
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!result.success) {
    return { status: 'error', errors: result.error.flatten().fieldErrors };
  }

  rateLimitMap.set(ip, [...recent, now]);

  try {
    await sendMail(result.data);
    return { status: 'success' };
  } catch (err) {
    console.error('[contact] sendMail failed:', err);
    return { status: 'error', message: 'Could not send your message. Please try again.' };
  }
}
