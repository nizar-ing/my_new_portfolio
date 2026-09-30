import Link from 'next/link';
import { navItems } from '@/content/navigation';
import { Button } from '@/components/ui/Button';
import { SocialLinks } from './SocialLinks';

export function Footer() {
  return (
    <footer id="contact" className="relative mt-24">
      {/* Brand-blue CTA card overlapping the dark bar */}
      <div className="relative z-10 mx-auto -mb-16 max-w-4xl rounded-2xl bg-brand px-8 py-12 text-center text-white shadow-glow">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest opacity-80">
          Let&apos;s work together
        </p>
        <h2 className="mb-6 font-display text-3xl font-black md:text-4xl">
          Have a role or a project in mind?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-white/90">
          I&apos;m open to full-time positions and freelance work. Tell me about your team or your
          project and I&apos;ll get back to you within 48 hours.
        </p>
        <Button variant="dark" href="/contact">
          Contact Me
        </Button>
      </div>

      {/* Dark footer bar */}
      <div className="bg-brand-dark px-8 pb-10 pt-28 text-center text-white">
        <nav aria-label="Footer navigation" className="mb-6">
          <ul className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <Link
                  href={`/#${id}`}
                  className="transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks variant="dark" className="justify-center mb-6" />

        <p className="text-sm text-white/50">
          &copy; {new Date().getFullYear()} Nizar Ilahi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
