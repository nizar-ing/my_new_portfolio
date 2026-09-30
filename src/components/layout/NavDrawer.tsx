'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { navItems } from '@/content/navigation';
import type { NavId } from '@/content/navigation';
import { SocialLinks } from './SocialLinks';

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeId: NavId;
  onNavClick: (id: NavId) => void;
}

export function NavDrawer({ isOpen, onClose, activeId, onNavClick }: NavDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Focus management + keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;

      const drawer = drawerRef.current;
      if (!drawer) return;

      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div className={`diagonal-drawer ${isOpen ? 'open' : ''}`}>
      {/* Close button (top-left square, matches open button position) */}
      <div className="relative z-50">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close menu"
          className="fixed top-0 left-0 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-br-3xl bg-brand lg:h-24 lg:w-24 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-8 w-8 text-white lg:h-10 lg:w-10" aria-hidden="true" />
        </button>
      </div>

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        id="nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-brand-dark/95 sm:flex-row lg:flex-col"
      >
        {/* Hidden title for screen readers */}
        <h2 id="nav-drawer-title" className="sr-only">Navigation menu</h2>

        <nav aria-label="Main navigation">
          <ul className="flex flex-col text-center text-4xl uppercase text-white font-display lg:text-4xl 2xl:text-6xl">
            {navItems.map(({ id, label }) => (
              <li key={id} className="group relative my-4 xl:my-4">
                <div className="relative inline-block">
                  <Link
                    href={`/#${id}`}
                    onClick={() => { onNavClick(id); onClose(); }}
                    className="focus-visible:outline-none focus-visible:underline"
                  >
                    {label}
                  </Link>
                  {/* Active highlight */}
                  {activeId === id && (
                    <div className="absolute top-2 -left-2 -z-10 h-full w-full -rotate-6 rounded-xl bg-brand opacity-100" />
                  )}
                  {/* Hover highlight */}
                  <div className="absolute top-2 -left-2 -z-10 h-full w-full rotate-0 rounded-xl bg-brand opacity-0 transition-all duration-300 group-hover:-rotate-6 group-hover:opacity-100" />
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <section className="relative mt-14 text-center sm:absolute sm:right-0 sm:mt-12 sm:h-full lg:relative lg:mt-14 lg:h-auto">
          <h3 className="mb-5 block text-2xl font-bold uppercase text-brand sm:hidden lg:block">
            Follow Me Around
          </h3>
          <SocialLinks
            variant="dark"
            className="flex-row sm:flex-col lg:flex-row"
          />
        </section>
      </div>
    </div>
  );
}
