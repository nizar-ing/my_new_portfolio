# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio of Nizar Ilahi, Senior Full-Stack Engineer (Java/Spring Boot · React · Node.js/NestJS).
Visual reference: github.com/ehizeex/edubaba.org (layout and style only; never copy its text or assets).
The roadmap is IMPLEMENTATION_PLAN.md. Work one phase at a time and tick its checkboxes.

**Working directory note:** The repo root (where all `npm` commands run) is `nizar-portfolio/`. If Claude Code is invoked from the parent directory `nextJs_projects/my-portfolio/`, `cd nizar-portfolio` before running any script.

## Current state (Phase 9 deferred — Phase 10 Launch is next)

The repo is on branch `feat/portfolio-v2`.

- **Framework:** Next.js 16.3.7, React 19.3.0, Tailwind v4 with `@theme` tokens, `embla-carousel-react` (replaced react-slick in Phase 5)
- **Language:** TypeScript strict throughout `src/` — no `.jsx`/`.js` remain
- **Content layer:** `src/content/` — `schema.ts` (Zod + TypeScript types), `profile.ts`, `impact.ts`, `skills.ts`, `experience.ts`, `education.ts`, `tech-stack.ts`, `projects.ts` (12 entries: 3 Tier A, 3 Tier B, 6 Tier C), `testimonials.ts` (empty), `navigation.ts`
- **Design tokens:** `globals.css` has the full `@theme` block (`brand`, `brand-dark`, `ink`, `mist`, `ghost`, `shadow-glow`)
- **Fonts:** Fraunces (display, `--font-display`) + Hind (body, `--font-hind`) loaded once from `src/lib/fonts.ts`
- **Components:** all in `src/components/` — `layout/` (Header, NavDrawer, Footer, SocialLinks, ScrollToTop), `sections/` (Hero, TechMarquee, ImpactStats, ProjectsShowcase, SkillFlipCards, AboutMe, ExperienceTimeline, Testimonials), `projects/` (ProjectCarousel, ProjectCard, ProjectFilters, TechBadge, ProjectGallery, ProjectPager), `ui/` (Container, Section, GhostHeading, Button, Badge)
- **Hooks:** `useScrolled`, `useScrollSpy`
- **Media:** `public/images/projects/<slug>/cover.webp` for all 12 projects; `public/images/profile/nizar-hero.webp` + `nizar-about.webp`; `public/cv/Nizar_Ilahi_CV_EN.pdf`. All template assets and Recoleta fonts deleted.
- **Scripts:** `scripts/optimize-images.mjs` (sharp, run once to rebuild covers); `scripts/capture-screenshots.mjs` (Playwright, run locally for AllezGoo)
- **Routes:** `/projects` (all-projects grid), `/projects/[slug]` (SSG detail, 12 slugs), `not-found.tsx` (branded 404)
- **Contact:** `src/app/contact/page.tsx` + `src/components/contact/` (ContactForm, ContactInfoCards) + `src/app/actions/contact.ts` + `src/lib/mail.ts` (Resend or SMTP) + `src/lib/escape-html.ts`. `sonner` Toaster in `layout.tsx`. `.env.example` at repo root.
- **SEO:** `src/lib/seo.ts` (personJsonLd, creativeWorkJsonLd), `src/app/opengraph-image.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`
- **Missing:** tests, CI; Lighthouse audit (manual, run after deploying or via `npm run build && npm start`)
- **Pending manual steps:** run `node scripts/capture-screenshots.mjs` then `node scripts/optimize-images.mjs` to replace the AllezGoo placeholder. Add `docs/images/` to the clinical-audio-annotation-tool repo to replace clinannotate/02.webp and 03.webp placeholders. Set `CONTACT_TO_EMAIL` + `RESEND_API_KEY` (or SMTP vars) in `.env`. Set `NEXT_PUBLIC_SITE_URL` before deploying.

Phases 0–8 done. Phase 9 (tests + CI) is **deferred** — skip to Phase 10 (Launch).

## Target stack

Next.js ≥ 16.3.6 (App Router) · React 19 · TypeScript strict · Tailwind v4 (`@theme` tokens in `globals.css`)  
Embla carousel · motion · lucide-react · react-icons (SI tech logos) · zod · sonner (Phase 7) · Vitest + RTL (Phase 9) · Playwright (Phase 9) · Node 22

## Commands

```bash
npm run dev          # start dev server (Turbopack is the default in Next 16)
npm run build        # production build
npm run start        # start production server
npm run lint         # eslint .
npm run typecheck    # tsc --noEmit
npm run format       # prettier --write .
# npm test / npm run e2e: not yet wired (Phase 9 deferred; add in Phase 9 if implemented)

# One-off scripts (run from nizar-portfolio/)
node scripts/capture-screenshots.mjs   # Playwright: capture AllezGoo live screenshots
node scripts/optimize-images.mjs       # sharp: PNG/JPG → WebP; run after capture or adding new images
```

**Local env setup:** copy `.env.example` → `.env` and fill in `RESEND_API_KEY` (or SMTP vars) + `CONTACT_TO_EMAIL` before testing the contact form.

Before finishing any phase: `npm run lint && npm run typecheck && npm run build`  
Add `npm test` and `npm run e2e` once Phase 9 scripts exist.

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

`motion` animations import from `'motion/react'` (not `'framer-motion'`). Always add `prefers-reduced-motion` guards.

Named CSS classes defined in `globals.css` — use these, don't recreate them:
- `.hero-bg` — 115° diagonal split (mist → brand)
- `.menu-effect` — the rotated blue square behind the active nav item
- `.overlay` — white blurred overlay used on the project detail hero
- `.ground-color-change` — responsive section background flip at ≤ 900 px
- `.marquee-track` / `.marquee-viewport` — CSS-only infinite tech marquee; pauses on hover/focus; respects `prefers-reduced-motion`
- `.diagonal-drawer` / `.diagonal-drawer.open` — the full-screen nav drawer slide-in animation

## Zod

The project uses **Zod v4** (`"zod": "^4.6.5"`). The v4 API has breaking changes from v3: `z.string().email()` error messages changed, `z.object` strict mode syntax differs, and `z.infer` is still the correct inference helper. Do not apply v3 patterns.

## Icons

- **UI icons** — `lucide-react` (menu, X, arrows, mail, eye, chevrons)
- **Tech/brand logos** — `react-icons/si` (SimpleIcons, e.g. `SiReact`, `SiSpring`); fall back to PNG in `public/` for logos not in SimpleIcons
