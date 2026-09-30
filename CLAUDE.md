# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio of Nizar Ilahi, Senior Full-Stack Engineer (Java/Spring Boot · React · Node.js/NestJS).
Visual reference: github.com/ehizeex/edubaba.org (layout and style only; never copy its text or assets).
The roadmap is IMPLEMENTATION_PLAN.md. Work one phase at a time and tick its checkboxes.

**Working directory note:** The repo root (where all `npm` commands run) is `nizar-portfolio/`. If Claude Code is invoked from the parent directory `nextJs_projects/my-portfolio/`, `cd nizar-portfolio` before running any script.

## Current state (mid-migration — Phase 4 done, Phase 5 next)

The repo is on branch `feat/portfolio-v2`.

- **Framework:** Next.js 16.3.7, React 19.3.0, Tailwind v4 with `@theme` tokens, `react-slick` (removed in Phase 5)
- **Language:** TypeScript strict throughout `src/` — no `.jsx`/`.js` remain
- **Content layer:** `src/content/` — `schema.ts` (Zod + TypeScript types), `profile.ts`, `impact.ts`, `skills.ts`, `experience.ts`, `education.ts`, `tech-stack.ts`, `projects.ts` (12 entries: 3 Tier A, 3 Tier B, 6 Tier C), `testimonials.ts` (empty), `navigation.ts`
- **Design tokens:** `globals.css` has the full `@theme` block (`brand`, `brand-dark`, `ink`, `mist`, `ghost`, `shadow-glow`)
- **Fonts:** Fraunces (display, `--font-display`) + Hind (body, `--font-hind`) loaded once from `src/lib/fonts.ts`
- **Components:** all in `src/components/` — `layout/` (Header, NavDrawer, Footer, SocialLinks, ScrollToTop), `sections/` (Hero), `projects/` (ProjectCarousel, ProjectCard), `ui/` (Container, Section, GhostHeading, Button, Badge)
- **Hooks:** `useScrolled`, `useScrollSpy`
- **Media:** `public/images/projects/<slug>/cover.webp` for all 12 projects; `public/images/profile/nizar-hero.webp` + `nizar-about.webp`; `public/cv/Nizar_Ilahi_CV_EN.pdf`. All template assets and Recoleta fonts deleted.
- **Scripts:** `scripts/optimize-images.mjs` (sharp, run once to rebuild covers); `scripts/capture-screenshots.mjs` (Playwright, run locally for AllezGoo)
- **Missing sections:** About, Experience, Contact, project detail pages, tests, CI
- **Pending manual steps before Phase 5:** run `node scripts/capture-screenshots.mjs` then re-run `node scripts/optimize-images.mjs` to replace the AllezGoo placeholder. Add `docs/images/` to the clinical-audio-annotation-tool repo to replace clinannotate/02.webp and 03.webp placeholders.

Phases 0–4 done. Phase 5 (home page sections) is next.

**Known pre-Phase-5 rule violations in `src/app/page.tsx` (do not "fix" early):**
- Hardcoded copy string ("Here are a few of my most recent works…") — will move to `src/content/` in Phase 5.
- Inline `style={{ backgroundImage: 'linear-gradient(110deg, #EEF7FB …)' }}` raw hex — will use a Tailwind token or CSS variable in Phase 5.

## Target stack

Next.js ≥ 16.3.6 (App Router) · React 19 · TypeScript strict · Tailwind v4 (`@theme` tokens in `globals.css`)  
Embla carousel · motion · lucide-react · zod · sonner · Vitest + RTL · Playwright · Node 22

## Commands

```bash
npm run dev          # start dev server (Turbopack is the default in Next 16)
npm run build        # production build
npm run start        # start production server
npm run lint         # eslint .
npm run typecheck    # tsc --noEmit
npm run format       # prettier --write .
npm test             # Vitest unit tests (added in Phase 9)
npm run e2e          # Playwright e2e (added in Phase 9)
```

Before finishing any phase: `npm run lint && npm run typecheck && npm test && npm run build`  
(omit `typecheck`/`test` until they exist.)

## Rules

- TypeScript only in `src/` (`.ts`/`.tsx`). No `any` without a comment explaining why.
- Server Components by default; add `'use client'` only on interactive leaves.
- All copy and data live in `src/content/*.ts` and are validated by `src/content/schema.ts`.
  Never hard-code copy in components. Never invent facts or metrics — source: `Nizar_Ilahi_CV_EN.pdf`.
- Use design tokens (`bg-brand`, `text-brand-dark`, `text-ink`, `bg-mist`, `shadow-glow`). No raw hex in components.
- Images: `next/image`, WebP/AVIF under `public/images/**`; every image needs meaningful alt text.
- Accessibility: real `<button>`/`<a>`, visible focus rings, keyboard support, `prefers-reduced-motion`.
- No layout hacks with large `translate(…px)`; use flow layout plus decorative absolute elements.
- Dynamic route params are Promises in Next 16: `const { slug } = await params`.
- Escape all user input before putting it into email HTML. Never commit secrets.
- Ask before: adding dependencies not in the plan, deleting non-template files, changing copy meaning.

## Brand

| Token | Hex | Use |
|---|---|---|
| `brand` | `#48AFDE` | accent, CTAs |
| `brand-dark` | `#223740` | headings, dark buttons |
| `ink` | `#47626D` | body text |
| `mist` | `#EEF7FB` | light section backgrounds |
| `mist-2` | `#E0F3FD` | — |
| `ghost` | `#F7FBFD` | giant decorative background headings |
| `shadow-glow` | — | large brand glow (card hover) |
| `shadow-glow-sm` | — | smaller brand glow |

Display font: **Fraunces** (OFL, D4 resolved) · Body: Hind

## Utilities

`src/lib/cn.ts` — combines `clsx` + `tailwind-merge`; use it for all conditional `className` props.
