import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '@/content/schema';

interface ProjectPagerProps {
  projects: Project[];
  currentSlug: string;
}

export function ProjectPager({ projects, currentSlug }: ProjectPagerProps) {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((p) => p.slug === currentSlug);
  const prev = sorted[(idx - 1 + sorted.length) % sorted.length];
  const next = sorted[(idx + 1) % sorted.length];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <PagerLink project={prev} direction="prev" />
      <PagerLink project={next} direction="next" />
    </div>
  );
}

function PagerLink({
  project,
  direction,
}: {
  project: Project;
  direction: 'prev' | 'next';
}) {
  const isPrev = direction === 'prev';
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative flex h-52 items-center overflow-hidden ${isPrev ? 'justify-start' : 'justify-end'}`}
      aria-label={`${isPrev ? 'Previous' : 'Next'} project: ${project.title}`}
    >
      {/* Cover image */}
      <Image
        src={project.cover.src}
        alt=""
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, 50vw"
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-brand-dark/70 transition-colors group-hover:bg-brand-dark/60"
        aria-hidden="true"
      />
      {/* Label */}
      <div
        className={`relative z-10 flex items-center gap-3 px-8 py-6 text-white ${isPrev ? '' : 'flex-row-reverse text-right'}`}
      >
        {isPrev ? (
          <ChevronLeft
            className="h-6 w-6 flex-shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          />
        ) : (
          <ChevronRight
            className="h-6 w-6 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
            {isPrev ? 'Previous project' : 'Next project'}
          </p>
          <p className="mt-1 font-display text-lg font-bold leading-tight">
            {project.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
