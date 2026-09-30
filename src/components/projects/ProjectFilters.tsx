'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { cn } from '@/lib/cn';
import type { ProjectCategory } from '@/content/schema';

const FILTERS: { label: string; value: string }[] = [
  { label: 'All',          value: '' },
  { label: 'Full-Stack',   value: 'fullstack' },
  { label: 'Java / Spring', value: 'backend-java' },
  { label: 'Node / Nest',  value: 'backend-node' },
  { label: 'Frontend',     value: 'frontend' },
  { label: 'Teaching',     value: 'teaching' },
];

interface ProjectFiltersProps {
  activeCat: string;
  /** URL prefix to push when a filter is selected. Defaults to '/#projects' (home showcase). */
  basePath?: string;
}

export function ProjectFilters({ activeCat, basePath = '/#projects' }: ProjectFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setFilter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set('cat', value);
      else params.delete('cat');
      router.replace(`${basePath}${params.toString() ? '?' + params.toString() : ''}`, { scroll: false });
    },
    [router, searchParams, basePath],
  );

  return (
    <div className="flex flex-wrap justify-center gap-2 px-4 md:justify-start" role="group" aria-label="Filter projects by category">
      {FILTERS.map(({ label, value }) => (
        <button
          key={value || 'all'}
          onClick={() => setFilter(value)}
          aria-pressed={activeCat === value}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
            activeCat === value
              ? 'bg-brand text-brand-dark shadow-md'
              : 'bg-mist text-ink hover:bg-brand/10 hover:text-brand-dark',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function filterProjects<T extends { featured: boolean; categories: ProjectCategory[] }>(
  projects: T[],
  cat: string,
): T[] {
  if (!cat) return projects.filter((p) => p.featured);
  return projects.filter((p) =>
    p.categories.includes(cat as ProjectCategory),
  );
}
