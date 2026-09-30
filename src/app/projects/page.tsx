import { Suspense } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import { projects } from '@/content/projects';
import { profile } from '@/content/profile';
import type { ProjectCategory } from '@/content/schema';
import { Container } from '@/components/ui/Container';
import { GhostHeading } from '@/components/ui/GhostHeading';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import ProjectCard from '@/components/projects/ProjectCard';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'All projects by Nizar Ilahi: client work, case studies and open-source across Java/Spring Boot, Node.js/NestJS and React.',
  alternates: { canonical: '/projects' },
};

interface PageProps {
  searchParams: Promise<{ cat?: string }>;
}

function ProjectsGrid({ cat }: { cat: string }) {
  const filtered = cat
    ? projects.filter((p) => p.categories.includes(cat as ProjectCategory))
    : projects;

  if (!filtered.length) {
    return (
      <p className="mt-16 text-center text-sm text-ink">
        No projects in this category yet.
      </p>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2">
      {filtered.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const { cat = '' } = await searchParams;

  return (
    <main className="min-h-screen overflow-hidden pt-24 pb-24" style={{ backgroundImage: 'linear-gradient(110deg, var(--color-mist) 0 50%, white 0 100%)' }}>
      <Container>
        <div className="relative">
          <GhostHeading className="px-5 md:pl-12">projects</GhostHeading>

          <div className="-mt-52 px-5 pb-6 md:pl-20">
            <h1 className="font-display text-4xl font-extrabold text-brand md:text-5xl">
              All projects
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-ink">
              Client work, case studies and open-source projects across the full
              stack. Filter by area or browse everything.
            </p>
          </div>

          <div className="mt-2 px-5 md:pl-20">
            <Suspense>
              <ProjectFilters activeCat={cat} basePath="/projects" />
            </Suspense>
          </div>
        </div>

        <ProjectsGrid cat={cat} />

        {/* GitHub link */}
        <div className="mt-16 flex justify-center">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-dark px-6 py-3 text-sm font-bold uppercase text-brand-dark transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <ExternalLink size={16} aria-hidden="true" />
            More on GitHub
          </a>
        </div>
      </Container>
    </main>
  );
}
