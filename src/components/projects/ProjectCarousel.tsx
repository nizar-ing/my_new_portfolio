'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '@/content/schema';
import ProjectCard from './ProjectCard';

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: false,
  });

  const [selectedSnap, setSelectedSnap] = useState(0);
  // Derive one dot per project — avoids calling setState synchronously in an effect
  const scrollSnaps = projects.map((_, i) => i);

  const onSelect = useCallback(() => {
    setSelectedSnap(emblaApi?.selectedScrollSnap() ?? 0);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => { emblaApi.off('select', onSelect); emblaApi.off('reInit', onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (projects.length === 0) return null;

  return (
    <div className="relative">
      {/* Viewport */}
      <div className="overflow-hidden py-10" ref={emblaRef}>
        <div className="flex">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="min-w-0 flex-[0_0_auto] px-4 sm:flex-[0_0_340px] md:flex-[0_0_480px] lg:flex-[0_0_660px]"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows */}
      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          onClick={scrollPrev}
          aria-label="Previous project"
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand text-brand transition-colors hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        {/* Dots */}
        <div className="flex gap-2" role="tablist" aria-label="Project slides">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === selectedSnap}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1"
            >
              <span
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === selectedSnap ? 'w-6 bg-brand' : 'w-2.5 bg-brand/30 hover:bg-brand/60'
                }`}
              />
            </button>
          ))}
        </div>

        <button
          onClick={scrollNext}
          aria-label="Next project"
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand text-brand transition-colors hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
