'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import type { Project } from '@/content/schema';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="relative m-auto h-[280px] w-[300px] sm:h-[200px] md:h-[400px] md:w-[450px] lg:h-[450px] lg:w-[650px]">
      <div className="group relative z-50 h-full w-full cursor-all-scroll py-4">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          className="max-w-full rounded-lg"
          width={650}
          height={350}
          style={{ width: '100%', height: '80%', objectFit: 'cover' }}
        />
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`View ${project.title}`}
          className="absolute bottom-[100px] left-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-ink opacity-0 shadow-glow-sm transition duration-300 hover:bg-ink hover:shadow-xl group-hover:opacity-100 md:bottom-32 md:h-12 md:w-12 lg:bottom-44 lg:h-20 lg:w-20 sm:bottom-[270px]"
        >
          <Eye className="h-6 w-6 text-white lg:h-10 lg:w-10" aria-hidden="true" />
        </Link>
      </div>

      <div
        className="absolute top-14 h-[200px] w-full rounded-lg bg-white sm:left-12 md:h-[300px] lg:h-[350px]"
        style={{ boxShadow: '#48AFDE -10px 10px 20px 10px' }}
      >
        <div className="relative h-full w-full">
          <p className="absolute bottom-3 left-4 text-lg font-light">{project.title}</p>
        </div>
      </div>
    </div>
  );
}
