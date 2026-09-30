import Image from 'next/image';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import type { Project } from '@/content/schema';
import { TechBadge } from './TechBadge';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const badges = project.stack.slice(0, 4);

  return (
    <div className="group relative mx-auto w-[300px] md:w-[420px] lg:w-[580px]">
      {/* Shadow card (behind the image, slightly offset) */}
      <div
        className="absolute right-0 top-8 h-[220px] w-full rounded-xl bg-white md:h-[280px] lg:h-[340px]"
        style={{ boxShadow: 'var(--shadow-glow-sm)' }}
        aria-hidden="true"
      >
        <div className="flex h-full flex-col justify-end p-4 pb-5">
          {/* Context pill */}
          <span className="mb-2 inline-block w-fit rounded-full bg-mist px-2.5 py-0.5 text-xs font-medium text-brand">
            {project.context}
          </span>
          <p className="truncate font-display text-lg font-bold text-brand-dark">{project.title}</p>
          <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-ink">{project.tagline}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {badges.map((key) => (
              <TechBadge key={key} techKey={key} />
            ))}
          </div>
        </div>
      </div>

      {/* Image card (on top) */}
      <div className="relative z-10 w-full pb-2 pr-6">
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`View ${project.title} case study`}
          className="relative block overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={580}
            height={326}
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 480px, 660px"
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {/* Eye overlay on hover */}
          <span
            className="absolute inset-0 flex items-center justify-center bg-brand-dark/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
              <Eye className="h-7 w-7 text-brand-dark" />
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
