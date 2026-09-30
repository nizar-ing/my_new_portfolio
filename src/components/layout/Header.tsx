'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { navItems } from '@/content/navigation';
import { useScrolled } from '@/hooks/useScrolled';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { NavDrawer } from './NavDrawer';

const sectionIds = navItems.map((n) => n.id);

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isScrolled = useScrolled();
  const activeId   = useScrollSpy(sectionIds);

  return (
    <>
      <NavDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        activeId={activeId}
        onNavClick={() => setIsOpen(false)}
      />

      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'bg-white' : 'bg-transparent'}`}
        style={{ boxShadow: isScrolled ? '-10px 25px 50px 10px rgb(72 175 222 / 0.9)' : 'none' }}
      >
        <div className="relative">
          {/* Hamburger / drawer-open button */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="nav-drawer"
            className="absolute top-0 left-0 z-30 flex h-14 w-14 cursor-pointer items-center justify-center rounded-br-3xl bg-brand lg:h-24 lg:w-24 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Menu className="h-7 w-7 text-white lg:h-10 lg:w-10" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop nav (centred, visible on xl+) */}
        <nav className="invisible xl:visible xl:mx-auto xl:max-w-4xl" aria-label="Main navigation">
          <ul className="flex h-24 flex-row items-center font-display">
            {navItems.map(({ id, label }) => {
              const isActive = activeId === id;
              return (
                <li key={id} className="group relative mr-20 text-2xl font-bold whitespace-nowrap">
                  <span
                    className={`menu-effect transform transition-all duration-500 ${
                      isActive
                        ? '-rotate-12 opacity-100'
                        : 'rotate-12 opacity-0 group-hover:-rotate-12 group-hover:opacity-100'
                    }`}
                  />
                  <a
                    href={`/#${id}`}
                    className={`menu-item relative z-10 transition-colors ${
                      isActive ? 'text-black' : 'text-[#666d47]'
                    } group-hover:text-black focus-visible:outline-none focus-visible:underline`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
}
