import type { Metadata } from 'next';
import { profile } from '@/content/profile';
import { Container } from '@/components/ui/Container';
import { ContactInfoCards } from '@/components/contact/ContactInfoCards';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: profile.contactBanner,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main>
      {/* Banner — extends behind the fixed header */}
      <section className="bg-brand-dark pt-36 pb-24 text-white md:pt-44">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              Contact form
            </p>
            <h1 className="mb-6 font-display text-5xl font-black md:text-6xl">
              Let&apos;s work together
            </h1>
            <p className="text-base leading-8 text-white/80">{profile.contactBanner}</p>
          </div>
        </Container>
      </section>

      {/* Info cards */}
      <section className="bg-mist py-16">
        <Container>
          <ContactInfoCards />
        </Container>
      </section>

      {/* Form */}
      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-2 font-display text-3xl font-extrabold text-brand-dark">
              Send a message
            </h2>
            <p className="mb-10 text-sm text-ink">
              I read every message and reply within 48 hours.
            </p>
            <ContactForm />
          </div>
        </Container>
      </section>
    </main>
  );
}
