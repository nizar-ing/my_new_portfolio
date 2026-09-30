'use client';

import { useEffect, useState } from 'react';
import type { NavId } from '@/content/navigation';

export function useScrollSpy(ids: readonly NavId[]): NavId {
  const [activeId, setActiveId] = useState<NavId>(ids[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: '-40% 0px -55% 0px' },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return activeId;
}
