import Image from 'next/image';
import Link from 'next/link';
import { MapPin, BadgeCheck, CircleDot } from 'lucide-react';
import { profile } from '@/content/profile';

export function Hero() {
  return (
    <section id="home" className="hero-bg overflow-hidden" style={{ minHeight: '500px' }}>
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-12">

          {/* ── Left: text content ────────────────────────────── */}
          <div className="col-span-12 flex flex-col justify-center bg-white/80 backdrop-blur-sm md:col-span-5 md:bg-transparent md:backdrop-blur-none">
            <div className="px-6 py-16 text-center md:py-0 md:pl-12 md:pr-6 md:text-start lg:pl-20 xl:pl-28">

              <p className="font-sans text-2xl text-brand lg:text-3xl">Hi there!</p>

              <h1 className="mt-3 font-display text-5xl font-black text-brand-dark lg:text-7xl">
                I&apos;m Nizar
              </h1>

              <h2 className="mt-2 font-sans text-lg font-bold uppercase tracking-wide text-brand-dark md:text-xl">
                {profile.headline}
              </h2>

              <p className="mt-3 font-sans text-sm leading-relaxed text-ink md:text-base">
                {profile.subheadline}, from database schema to production on Kubernetes.
              </p>

              {/* Availability chips */}
              <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-xs font-medium text-ink">
                  <MapPin size={12} aria-hidden="true" />
                  Hannover region, DE
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-xs font-medium text-ink">
                  <BadgeCheck size={12} aria-hidden="true" />
                  Unrestricted work permit
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-xs font-medium text-brand-dark">
                  <CircleDot size={12} className="fill-green-500 text-green-500" aria-hidden="true" />
                  Open to full-time &amp; freelance
                </span>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start xl:mt-10">
                <Link
                  href="/#projects"
                  className="inline-block rounded-lg bg-brand px-6 py-3 text-sm font-bold uppercase text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  See my work
                </Link>
                <a
                  href={profile.cvPath}
                  download
                  className="inline-block rounded-lg bg-brand-dark px-6 py-3 text-sm font-bold uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2"
                >
                  Download CV
                </a>
                <Link
                  href="/contact"
                  className="inline-block rounded-lg border-2 border-brand-dark px-6 py-3 text-sm font-bold uppercase text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* ── Right: profile photo ──────────────────────────── */}
          <div className="col-span-12 flex items-end justify-center bg-[#D9EEF7] pt-10 md:col-span-7 md:bg-transparent md:pt-28 lg:pt-20">
            <Image
              src="/images/profile/nizar-hero.webp"
              alt="Nizar Ilahi — Senior Full-Stack Engineer"
              width={600}
              height={700}
              sizes="(max-width: 768px) 90vw, (max-width: 1280px) 55vw, 600px"
              className="max-h-[600px] w-full max-w-md object-contain md:max-w-none"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
