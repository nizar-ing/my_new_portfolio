'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '@/content/projects';
import { profile } from '@/content/profile';
import { Container } from '@/components/ui/Container';
import { GhostHeading } from '@/components/ui/GhostHeading';
import { ProjectFilters, filterProjects } from '@/components/projects/ProjectFilters';
import ProjectCarousel from '@/components/projects/ProjectCarousel';

function ShowcaseInner() {
  const searchParams = useSearchParams();
  const activeCat = searchParams.get('cat') ?? '';
  const filtered = useMemo(() => filterProjects(projects, activeCat), [activeCat]);

  return (
    <section id="projects" className="w-full overflow-hidden pt-5 pb-16" style={{ backgroundImage: 'linear-gradient(110deg, var(--color-mist) 0 50%, white 0 100%)' }}>
      <Container>
        <div className="relative">
          <GhostHeading className="px-5 md:pl-12">portfolio</GhostHeading>
          <div className="-mt-52 px-5 pb-6 md:pl-20">
            <h2 className="font-display text-4xl font-extrabold text-brand md:text-5xl">Recent works</h2>
            <p className="mt-4 max-w-2xl font-sans text-base leading-8 text-ink">
              A selection of client work, case studies and open-source projects. Each one shows how I
              approach a problem end to end: domain model, API design, security, tests, and an
              interface people actually enjoy using.
            </p>
          </div>

          <div className="mt-2 px-5 md:pl-20">
            <ProjectFilters activeCat={activeCat} />
          </div>
        </div>
      </Container>

      <div className="-mt-4">
        <ProjectCarousel projects={filtered} />
      </div>

      {/* Footer links */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline focus-visible:outline-none focus-visible:underline"
        >
          View all projects <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand-dark hover:underline focus-visible:outline-none focus-visible:underline"
        >
          <ExternalLink size={16} aria-hidden="true" /> More on GitHub
        </a>
      </div>
    </section>
  );
}

export function ProjectsShowcase() {
  return (
    <Suspense fallback={null}>
      <ShowcaseInner />
    </Suspense>
  );
}
