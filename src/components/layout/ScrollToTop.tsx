'use client';

import { ArrowUp } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';

export function ScrollToTop() {
  const visible = useScrolled(600);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-glow-sm transition-all duration-300 hover:bg-brand-dark hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
