'use client';

import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/cn';
import { submitContact, type ContactState } from '@/app/actions/contact';
import { Button } from '@/components/ui/Button';

const initialState: ContactState = { status: 'idle' };

const subjects = ['Full-time role', 'Freelance project', 'Other'] as const;

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success') {
      toast.success("Message sent! I'll get back to you within 48 hours.");
      formRef.current?.reset();
    } else if (state.status === 'error' && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const fieldClass = (hasError: boolean) =>
    cn(
      'w-full rounded-lg border px-4 py-3 text-sm text-ink placeholder:text-ink/50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand',
      hasError ? 'border-red-400 bg-red-50' : 'border-mist-2 bg-white focus:border-brand',
    );

  const err = (field: string) => state.errors?.[field]?.[0];

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-6">
      {/* Honeypot — hidden from real users, filled by bots */}
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {state.status === 'success' && (
        <div
          role="status"
          className="rounded-lg bg-green-50 px-5 py-4 text-sm font-medium text-green-800 ring-1 ring-green-200"
        >
          Message sent — I&apos;ll get back to you within 48 hours.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink"
          >
            Name <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            aria-describedby={err('name') ? 'name-error' : undefined}
            className={fieldClass(!!err('name'))}
          />
          {err('name') && (
            <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">
              {err('name')}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink"
          >
            Email <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            aria-describedby={err('email') ? 'email-error' : undefined}
            className={fieldClass(!!err('email'))}
          />
          {err('email') && (
            <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">
              {err('email')}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink"
          >
            Company{' '}
            <span className="text-xs font-normal normal-case text-ink/50">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company or project name"
            className={fieldClass(false)}
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink"
          >
            Subject <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            defaultValue=""
            aria-describedby={err('subject') ? 'subject-error' : undefined}
            className={cn(fieldClass(!!err('subject')), 'cursor-pointer')}
          >
            <option value="" disabled>
              Select a subject…
            </option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {err('subject') && (
            <p id="subject-error" role="alert" className="mt-1 text-xs text-red-600">
              {err('subject')}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink"
        >
          Message <span className="text-brand" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell me about your project or role…"
          aria-describedby={err('message') ? 'message-error' : undefined}
          className={cn(fieldClass(!!err('message')), 'resize-y')}
        />
        {err('message') && (
          <p id="message-error" role="alert" className="mt-1 text-xs text-red-600">
            {err('message')}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          disabled={isPending}
          className={cn(isPending && 'cursor-not-allowed opacity-70 hover:translate-y-0')}
        >
          {isPending ? 'Sending…' : 'Send message'}
        </Button>
      </div>
    </form>
  );
}
