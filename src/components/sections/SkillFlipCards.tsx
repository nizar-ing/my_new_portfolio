'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Server, Zap, Layout, Database, Cloud, CheckSquare, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { skillCards } from '@/content/skills';
import type { SkillCard } from '@/content/skills';

const ICON_MAP: Record<string, React.ElementType> = {
  Server, Zap, Layout, Database, Cloud, CheckSquare,
};

function CardIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name] ?? Server;
  return <Icon size={28} aria-hidden="true" />;
}

export function SkillFlipCards() {
  const [active, setActive] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);

  const go = useCallback((index: number) => {
    setActive(((index % skillCards.length) + skillCards.length) % skillCards.length);
  }, []);

  const current: SkillCard = skillCards[active];

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">

      {/* ── 3×2 card grid ──────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3 lg:w-[360px] lg:flex-shrink-0">
        {skillCards.map((card, i) => {
          const isActive = i === active;
          return (
            <button
              key={card.count}
              onClick={() => go(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') go(i + 1);
                if (e.key === 'ArrowLeft') go(i - 1);
              }}
              aria-pressed={isActive}
              className={`group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 p-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                isActive
                  ? 'border-brand bg-brand text-white shadow-glow-sm'
                  : 'border-mist bg-white text-ink hover:border-brand hover:text-brand'
              }`}
            >
              {/* Rotated number badge */}
              <span
                className={`absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold transition-all duration-300 ${
                  isActive ? 'rotate-12 bg-white text-brand' : 'rotate-0 bg-brand text-white'
                }`}
              >
                {card.count}
              </span>
              <CardIcon name={card.icon} />
              <span className="text-center text-[10px] font-semibold leading-tight">{card.title}</span>
            </button>
          );
        })}
      </div>

      {/* ── Detail panel ─────────────────────────────────────────────── */}
      <div ref={detailRef} className="flex-1 rounded-2xl border border-mist bg-white p-6 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-white">
                <CardIcon name={current.icon} />
              </span>
              <h3 className="font-display text-xl font-bold text-brand-dark">{current.title}</h3>
            </div>

            <ul className="space-y-2">
              {current.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next */}
        <div className="mt-6 flex items-center justify-between border-t border-mist pt-4">
          <button
            onClick={() => go(active - 1)}
            aria-label="Previous skill"
            className="flex items-center gap-1 text-xs font-medium text-ink transition-colors hover:text-brand focus-visible:outline-none focus-visible:underline"
          >
            <ChevronLeft size={16} aria-hidden="true" />
            {skillCards[(active - 1 + skillCards.length) % skillCards.length].title}
          </button>
          <button
            onClick={() => go(active + 1)}
            aria-label="Next skill"
            className="flex items-center gap-1 text-xs font-medium text-ink transition-colors hover:text-brand focus-visible:outline-none focus-visible:underline"
          >
            {skillCards[(active + 1) % skillCards.length].title}
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
