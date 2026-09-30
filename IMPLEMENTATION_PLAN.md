# IMPLEMENTATION_PLAN: Nizar Ilahi Portfolio

> **Owner:** Nizar Ilahi · **Repo:** `nizar-portfolio` (Next.js + React)
> **Reference design:** [ehizeex/edubaba.org](https://github.com/ehizeex/edubaba.org)
> **Positioning:** Senior Full-Stack Engineer · Java / Spring Boot & React / Node.js / NestJS
> **Written:** 30 Sep 2026 · **Source of truth for content:** `Nizar_Ilahi_CV_EN.pdf` (the newer CV, see §2.3)

---

## 0. How to use this plan with Claude Code (WebStorm)

1. Put this file at the repo root (`nizar-portfolio/IMPLEMENTATION_PLAN.md`) and commit it.
2. **Do Phase 0 first.** It creates a `CLAUDE.md` (content in Appendix B) so every later session starts with the right context.
3. Run **one phase per Claude Code session**. Start each session in Plan Mode, let it propose the changes, approve, then let it implement. Clear the context between phases.
4. Use this prompt template for every phase:

   ```text
   Read IMPLEMENTATION_PLAN.md: sections 1–3, then "Phase <N>".
   Implement Phase <N> only. Respect the rules in CLAUDE.md.
   When done: run `npm run lint`, `npm run typecheck` and `npm run build` (and `npm test` once it exists) and fix every error.
   Tick the Phase <N> checkboxes in IMPLEMENTATION_PLAN.md, then summarize what changed and anything left open.
   Do not start Phase <N+1>.
   ```

5. Commit at the end of each phase with the commit message listed in that phase, on the `feat/portfolio-v2` branch.
6. Items marked **🟡 DECISION** need your answer. Claude Code should stop and ask you rather than guess (full list in §5).

---

## 1. Goal and definition of done

Turn the current half-built Next.js portfolio into a production-quality site that:

- follows the **look and structure of edubaba.org**: diagonal two-tone sections, big "ghost" background headings, the diagonal drawer menu, the centred project carousel, flip-card skills, a project detail page with previous/next navigation, a contact page with a working email form, and a CTA footer;
- presents Nizar **clearly as a Senior Full-Stack Engineer (React + Node/NestJS + Java/Spring Boot)**, using real facts and numbers from the CV;
- showcases **real projects only**. That means ClinAnnotate, Octobank, AllezGoo and the strongest GitHub repos. Everything copied from the edubaba template gets removed;
- is itself **evidence of the claimed skills**: TypeScript end to end, current Next.js/React, clean component architecture, tests, CI, accessibility and SEO.

**Done means:**

- [ ] Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100
- [ ] Zero template leftovers (no edubaba text, images, testimonials or emails)
- [ ] Every project card opens a working `/projects/[slug]` page
- [ ] The contact form delivers email in production
- [ ] CI is green (lint, typecheck, unit tests, build, e2e smoke tests)
- [ ] Deployed on a custom domain, with the CV download and social links working

---

## 2. Findings

### 2.1 Audit of the current project (`nizar-portfolio`)

**Stack today:** Next.js **14.0.4** (App Router), React 18, Tailwind 3.3, `react-slick`, mixed `.tsx`/`.jsx`. It has 11 source files. The only parts built so far are the header/drawer, the hero with the tech slider, and the portfolio slider.

| # | Area | Current state | Problem | Action (phase) |
|---|------|---------------|---------|----------------|
| 1 | Framework | Next 14.0.4 | Out of support, with published security advisories. The current line is 16.3.x (security release 16.3.6 on 22 Sep 2026) | Upgrade to Next ≥ 16.3.6 and React 19.2 (P1) |
| 2 | Language | `.jsx` + `.tsx` mix | Undercuts the "end-to-end TypeScript" claim on the CV | Convert everything to `.tsx` with `strict` on (P1–P2) |
| 3 | `layout.tsx` metadata | `title: 'Create Next App'` | No SEO, and it looks unfinished | Real metadata, OG image, JSON-LD (P8) |
| 4 | `page.tsx` | `'use client'` on the whole page; the Hind font is created in 3 files | Ships unnecessary JS and loads fonts more than once | Server components by default, fonts in `lib/fonts.ts` (P2) |
| 5 | `data.js` | 16 entries; 12 of them read *"We buit this project for edubaba Management Consultants"* | Placeholder copy that someone else wrote | Replace with the typed content layer (P3) |
| 6 | Template assets | `hotel01.png`, `property1.png`, `yumfood.jpg`, `portfolioimage.png`, `reactportfolio.png`, `daisy.jpg`, `john.jpg`, `offices.jpg`, `man.png` are **byte-identical to edubaba's files** | "Yum Food", "Inans Property" and "edubaba Management Consultants" are **not your projects** | Delete them and their data entries (P4) |
| 7 | Broken references | `data.js` points to `/2.webp`, `/3.webp`, `/4.webp`, `/yumfood2.png` | These files don't exist | Handled by the new content schema and its test (P3) |
| 8 | Routing | `SliderCard` pushes to `/portfoliodetail/${index}` | That route doesn't exist, so every card leads to a 404. Index-based URLs also aren't SEO friendly | `/projects/[slug]` built with SSG (P6) |
| 9 | Navigation | Links to `#about-me-component` and `#contact-me` | These sections don't exist yet | Build the sections; nav comes from a config (P2, P5) |
| 10 | Hero | "Full Stack Engineer & a University Teacher"; **My Resume** has `href="#"` | Out-of-date positioning and a dead CV link (`public/nizarcv.pdf` dates from Dec 2023) | New hero copy and the current CV (P5) |
| 11 | Portfolio intro | Copied from edubaba (*"my paintings are always current…"*) | Someone else's copy | New copy (Appendix C) |
| 12 | Tech slider | Includes PHP, Bootstrap, MUI and Angular; missing NestJS, Kafka, Kubernetes, TypeScript, Prisma | Doesn't match the CV focus | Curated, grouped tech marquee (P5) |
| 13 | Drawer socials | Twitter, Dribbble and Instagram links point to `#` | Dead links | Keep GitHub and LinkedIn, add Email (P2) |
| 14 | JSX | `class=`, `stroke-width=`, `stroke-linecap=` | React warnings | Fixed while converting to TSX, or replaced by `lucide-react` icons (P2) |
| 15 | Tailwind | `font-recoletaBlack` and `font-recoletaBol` are used but never defined; there's also a `font-recoltaBlack` typo | Those classes have no effect | Tailwind v4 `@theme` tokens (P2) |
| 16 | CSS | Duplicate `@media (max-width:640px)`; the scrollbar is hidden globally | Duplication, plus a usability and accessibility regression | Clean up `globals.css` (P2) |
| 17 | Layout | Magic transforms such as `translate(0,-300px)` and `-mb-40` | Brittle at in-between viewport sizes | Normal flow plus absolutely positioned decoration (P2/P5) |
| 18 | Images | Plain `<img>` for the profile and drawer icon; `nizar.png` in the workspace root is 8 MB (1686×2528) | Hurts LCP | `next/image`, WebP/AVIF, correct `sizes` (P4) |
| 19 | Dependencies | The `slick` package is unused; `react-slick` hasn't been updated in years | Dead weight | Replace with `embla-carousel-react` (P1/P5) |
| 20 | Missing features | No About, Experience, Contact, Footer, detail page, email API, tests or CI | — | P5–P9 |
| 21 | Meta | `package.json` name is `next-portfolio`; README is the create-next-app default | Looks unfinished on GitHub | Rename and write a real README (P10) |

**Worth keeping:** the visual language (colours `#48AFDE` / `#223740` / `#EEF7FB`, the diagonal gradients, the ghost headings, the drawer animation), `profile.png` (your cut-out photo), the correct tech logos, and the screenshots of your own apps (`world-wise.png`, `games-descovery.png`, `e-store.png`, `library-management.png`, `crown-clothing.png`, `nizar-portfolio.png`, `react-portfolio.png`). Before reusing any screenshot, check which repo it actually belongs to.

### 2.2 Target reference: edubaba.org, feature by feature

edubaba.org is a Next 13.4 JavaScript tutorial project (Udemy course). Its structure is worth copying; its code quality isn't. The repo has **no LICENSE file**, so treat it as design inspiration: write your own implementation and don't ship any of its text or images.

| edubaba feature | How edubaba does it | Status in your repo | Decision |
|---|---|---|---|
| Fixed header + active "tick" effect on the nav | `Header.js`, `.menu-effect` | ✅ ported | Keep. Drive the active item with IntersectionObserver (scroll spy) instead of click state |
| Diagonal full-screen drawer | `DiagonalDrawer.js` + CSS transform | ✅ ported | Keep. Add focus trap, Esc to close, `aria-expanded` |
| Hero: gradient split, photo, 2 CTAs, logo slider | `HomeComponent.js` + react-slick | ✅ ported | Keep the layout, rewrite the copy, swap the slider for a CSS marquee |
| "Portfolio / Recent Works" centred carousel | `MySlider.js`, `SliderCard.js` | ✅ ported (links broken) | Keep, rebuild on Embla, add category filter chips |
| Project detail: hero image, gallery, sticky sidebar, tags, prev/next | `portfoliodetail/[id]` + `portfolio-detail-design` | ❌ missing | Build at `/projects/[slug]` and add "Architecture & highlights" |
| About Me: 3 bio columns + 6 flip cards (skill categories) | `AboutMe.js` + `aboutme.css` | ❌ missing | Build with 6 categories from the CV (§3.4) |
| Testimonials carousel | `Testimonial.js` (fake YouTube comments) | ❌ missing | **Only if real.** Show LinkedIn recommendations, or replace with an "Impact" strip 🟡 |
| CTA banner + dark footer with accordions on mobile | `Footer.js`, `Accordian.js` (Headless UI) | ❌ missing | Build a slim version: CTA "Let's build something", quick links, socials |
| Contact page: info cards, form, toasts | `page/contactme/page.js` + react-toastify | ❌ missing | Build as `/contact` with a Server Action, Zod and `sonner` |
| Email API | `api/contact/route.js` (Nodemailer + Gmail) | ❌ missing | Build as a Server Action. **Escape user input** (edubaba injects raw input into HTML) |
| Scroll-to-top button | inline in `page.js` | ❌ missing | `ScrollToTop` client component |
| — | — | — | **New, not in edubaba:** Experience timeline, Impact stats, JSON-LD, sitemap, tests, CI |

**edubaba bugs not to copy:** `'use client'` in `layout.js` (which kills `metadata`), `JSON.parse(id)` with index routes, a `useEffect` with no dependency array, `console.log` left in pages, hard-coded fake contact data, secrets loaded with `require('dotenv')` inside a route, and unescaped HTML email bodies.

### 2.3 CV reconciliation

The two CVs contradict each other in several places. **`Nizar_Ilahi_CV_EN.pdf` is newer (Sep 2026)** and is used as the source of truth. The site must never contradict the CV you send to employers.

| Topic | `nizar_fullstack_CV.pdf` (Jul 2026) | `Nizar_Ilahi_CV_EN.pdf` (Sep 2026) → **use this** |
|---|---|---|
| Headline | Java / Spring Boot & React / NestJS | Java / Spring Boot & React / **Node.js** / NestJS |
| Experience | "over 10 years" | "over **15** years" |
| Phone | +49 163 3263052 | +49 1590 6349955 🟡 (publish at all?) |
| Fintech client | "Octa Bank" | **Octobank (octobank.uz)**, licensed digital bank, Uzbekistan |
| Freelance start | Nov 2025 | **Jan 2026** |
| Lecturer period | Sep 2014 – Nov 2024 | **Jun 2011 – Nov 2024 (part-time)** |
| German | B1 | **A2 (target B1)**, intensive course since Feb 2026 |
| Projects | Octa Bank, AllezGo | **ClinAnnotate**, Octobank, AllezGoo, Clean DDD E-Commerce API, Clinic Booking API |

Facts the site can state, all from the EN CV: 15+ years; Java 17+/Spring Boot 3.x; React 19; Node.js/Express/NestJS; GKE; Kafka and Resilience4j; the LGTM stack; **+20 % conversion** (AllezGoo); **−30 % frontend load time** (React Server Components + TanStack Query); **−90 % security incidents across 50,000+ users**; **>80 % test coverage**; **−35 % processing time** (Best Engineering); **100+ students mentored**; unrestricted German work permit; available immediately; located in Langenhagen (Hannover region).

### 2.4 Project inventory (GitHub `nizar-ing` has 72 repos; the most relevant are reviewed below)

**Tier A: Featured (top of the carousel)**

| Slug | Project | Evidence | Stack | Media |
|---|---|---|---|---|
| `clinannotate` | **ClinAnnotate**: clinical audio annotation workbench (IKIM Essen) | repo `clinical-audio-annotation-tool` (MIT) | Node 22, TypeScript, Express 5, Prisma, PostgreSQL 16, Vue 3, Zod, Vitest/Supertest/Playwright, Docker Compose, monorepo with shared `contracts` package | **`ClinAnnotate.jpg`** + repo `docs/images/modular_architecture.png`, `From_raw_audio_to_a_gold-standard_dataset.png`, `DDD_approach.png` |
| `octobank` | **Octobank**: cloud-native digital banking microservices | CV (client work, no public repo) | Java 17, Spring Boot 3.x, Kafka, Resilience4j, LGTM, GKE, Helm | No screenshot → generated architecture cover 🟡 NDA |
| `allezgoo` | **AllezGoo**: live travel booking platform | allezgoo.com + repo `allezgo_app_v2` | React 19, Vite 7, TanStack Query v5, Tailwind 4, React Compiler, NestJS | Screenshot of allezgoo.com (capture script in P4) |

**Tier B: Engineering showcase (backend depth, both ecosystems)**

| Slug | Project | Repo(s) | Stack | Media |
|---|---|---|---|---|
| `hotel-booking` | **Hotel Booking Platform** (full stack) | `Hotel-Booking-App-Backend` + `Hotel-Booking-App-Frontend` | Java 21, Spring Boot 3.4, Spring Security (JWT, `@PreAuthorize`), Flyway (13 migrations), MySQL 8, async mail, Stripe; React + Vite | Screenshot to capture (don't reuse `hotel01.png`, that's edubaba's) |
| `clean-ddd-ecommerce-api` | **Clean DDD E-Commerce API** | `clean-DDD_ecommerce-api` | NestJS 11, CQRS, DDD / Clean Architecture, Drizzle ORM, PostgreSQL or MongoDB, Stripe Checkout, Jest | Swagger screenshot or generated cover |
| `clinic-booking-api` | **Clinic Booking Appointments API** | `Clinic_Booking_Appointments_API` | Node.js, Express 5, Prisma 7, PostgreSQL, Zod, JWT + RBAC, node-cron reminders, Swagger, Helmet, rate limiting | Swagger UI screenshot |

**Tier C: Frontend and teaching (shown under the "Frontend" and "Teaching" filters)**

| Slug | Project | Repo | Stack | Media |
|---|---|---|---|---|
| `the-wild-oasis` | The Wild Oasis: hotel admin dashboard | `the-wild-oasis` | React, TanStack Query, Supabase, React Hook Form, Recharts, styled-components | capture |
| `e-shop` | E-Shop: React 19 features | `E-Shop` | React 19, TanStack Query, Tailwind v4, React Router | check `e-store.png` |
| `testing-react-app` | Testing React Apps | `testing-react-app` | Vitest, React Testing Library, MSW, Redux Toolkit, Zod, Auth0 | code/coverage screenshot |
| `students-management` | Students Management (full stack, teaching) | `springboot-students-management` + `angular-students-management` | Spring Boot 3, Angular 17, Angular Material | capture |
| `world-wise` | WorldWise | `world-wise-app` | React 18, React Router 6, React Leaflet, geolocation | `world-wise.png` ✅ |
| `games-discovery` | Games Discovery v2 | `Games_Discovery_v2` | React, TypeScript, React Query, Chakra UI | `games-descovery.png` ✅ |

**Optional archive** (a "More on GitHub" link rather than cards): `natours_v2`, `Nest_Blog_API`, `niza-bank`, `springboot_coding_shop` + `coding_shop`, `fast-pizza`, `react-redux-bank`, `issue-tracker`.
**Drop from the site:** Yum Food, Inans Property, edubaba Management Consultants, HotAllo, Nature Events, Dream Houses, GameZzzz Slot, Snake Game, Phoxul. They're either template content or too small for a senior profile. 🟡 Confirm the last five.

---

## 3. Target architecture

### 3.1 Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js ≥ 16.3.6** (App Router, Turbopack), **React 19.2** | Current, patched, Server Components |
| Language | TypeScript 5.x, `strict: true`, no `.js`/`.jsx` in `src/` | Matches the CV |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) + `clsx` + `tailwind-merge` | Current Tailwind; design tokens live in one place |
| Carousel | `embla-carousel-react` (+ autoplay plugin) | Light, accessible, SSR-safe; replaces react-slick |
| Motion | `motion` (`motion/react`), used sparingly, honours `prefers-reduced-motion` | Flip cards and section reveals |
| Icons | `lucide-react` (UI), `react-icons/si` (tech logos) + existing PNG fallbacks | Removes hundreds of lines of inline SVG |
| Forms | React 19 `useActionState` + Server Action + `zod` | No client fetch boilerplate; validated on the server |
| Email | **Resend** (recommended on Vercel) *or* Nodemailer + Gmail App Password 🟡 | edubaba uses Nodemailer |
| Toasts | `sonner` | Small and accessible |
| Tests | Vitest + React Testing Library (unit), Playwright (e2e) | The same tools listed on the CV |
| Lint/format | ESLint 9 flat config (`eslint-config-next`), Prettier + `prettier-plugin-tailwindcss` | `next lint` was removed in Next 16, so call the ESLint CLI directly |
| Hosting | Vercel + custom domain 🟡 | Zero-config for Next |
| Runtime | Node 22 LTS (`.nvmrc`) | Next 16 requires Node ≥ 20.9 |

### 3.2 Folder structure (target)

```text
nizar-portfolio/
├─ CLAUDE.md
├─ IMPLEMENTATION_PLAN.md
├─ .nvmrc                         # 22
├─ .env.example                   # RESEND_API_KEY / SMTP_* / CONTACT_TO_EMAIL / NEXT_PUBLIC_SITE_URL
├─ eslint.config.mjs  prettier.config.mjs  postcss.config.mjs  next.config.ts  tsconfig.json
├─ playwright.config.ts  vitest.config.ts
├─ .github/workflows/ci.yml
├─ public/
│  ├─ cv/Nizar_Ilahi_CV_EN.pdf     # public version, see decision D7
│  ├─ fonts/                       # only if the Recoleta license is confirmed (D4)
│  └─ images/
│     ├─ profile/nizar-hero.webp  nizar-about.webp
│     ├─ tech/                     # logos not in simple-icons
│     └─ projects/<slug>/cover.webp  01.webp  02.webp …
├─ scripts/
│  ├─ optimize-images.mjs          # sharp: png/jpg → webp, max 1920 px
│  └─ capture-screenshots.mjs      # Playwright: screenshots of live sites
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                # fonts, metadata, Header, Footer, Toaster, JSON-LD
│  │  ├─ page.tsx                  # Server Component that composes the sections
│  │  ├─ projects/
│  │  │  ├─ page.tsx               # all projects grid with filters
│  │  │  └─ [slug]/page.tsx        # SSG detail page
│  │  ├─ contact/page.tsx
│  │  ├─ actions/contact.ts        # 'use server'
│  │  ├─ not-found.tsx
│  │  ├─ opengraph-image.tsx  sitemap.ts  robots.ts  icon.png
│  │  └─ globals.css               # @import "tailwindcss"; @theme {…}
│  ├─ components/
│  │  ├─ layout/    Header.tsx  NavDrawer.tsx  Footer.tsx  ScrollToTop.tsx  SocialLinks.tsx
│  │  ├─ sections/  Hero.tsx  TechMarquee.tsx  ImpactStats.tsx  ProjectsShowcase.tsx
│  │  │             AboutMe.tsx  SkillFlipCards.tsx  ExperienceTimeline.tsx  Testimonials.tsx  ContactCta.tsx
│  │  ├─ projects/  ProjectCard.tsx  ProjectCarousel.tsx  ProjectFilters.tsx  ProjectCover.tsx
│  │  │             ProjectGallery.tsx  ProjectPager.tsx  TechBadge.tsx
│  │  ├─ contact/   ContactForm.tsx  ContactInfoCards.tsx
│  │  └─ ui/        Button.tsx  Badge.tsx  Section.tsx  Container.tsx  GhostHeading.tsx
│  ├─ content/      profile.ts  navigation.ts  projects.ts  skills.ts  experience.ts
│  │                education.ts  tech-stack.ts  impact.ts  testimonials.ts  schema.ts
│  ├─ hooks/        useScrollSpy.ts  useScrolled.ts
│  └─ lib/          fonts.ts  seo.ts  cn.ts  mail.ts  escape-html.ts
└─ tests/
   ├─ unit/         content.schema.test.ts  ProjectCard.test.tsx  contact-action.test.ts
   └─ e2e/          home.spec.ts  project-detail.spec.ts  contact.spec.ts
```

### 3.3 Content model (`src/content/schema.ts`)

All content is typed data, and **no copy is hard-coded in components**. A Zod schema validates it in a unit test, so a missing image or a duplicate slug fails CI.

```ts
export type ProjectCategory = 'fullstack' | 'backend-java' | 'backend-node' | 'frontend' | 'teaching';
export type ProjectContext = 'Client project' | 'Freelance' | 'Case study' | 'Open source' | 'Teaching';

export interface Project {
  slug: string;                 // kebab-case, unique
  title: string;
  tagline: string;              // ≤ 90 chars, shown on the card
  context: ProjectContext;
  role?: string;                // e.g. "System Architect & Lead Developer"
  year?: string;                // e.g. "2026"
  featured: boolean;            // Tier A/B → home carousel
  order: number;                // sort key
  categories: ProjectCategory[];
  stack: string[];              // keys into tech-stack.ts
  summary: string;              // 2–3 sentences
  problem?: string;
  solution?: string;
  highlights: string[];         // 4–6 architecture or engineering bullets
  metrics?: { label: string; value: string }[];
  links: { live?: string; github?: string; githubSecondary?: string };
  cover: { src: string; alt: string };
  gallery?: { src: string; alt: string; caption?: string }[];
  confidential?: boolean;       // true → no code link, "Under NDA" note
}
```

### 3.4 Design tokens (Tailwind v4 `@theme` in `globals.css`)

```css
@import "tailwindcss";

@theme {
  --color-brand: #48afde;        /* accent (edubaba blue) */
  --color-brand-dark: #223740;   /* headings, dark buttons */
  --color-ink: #47626d;          /* body text */
  --color-mist: #eef7fb;         /* light section bg */
  --color-mist-2: #e0f3fd;
  --color-ghost: #f7fbfd;        /* giant background headings */
  --font-display: var(--font-display), ui-serif, Georgia, serif;   /* Recoleta or Fraunces */
  --font-sans: var(--font-hind), ui-sans-serif, system-ui, sans-serif;
  --shadow-glow: -10px 25px 50px 10px rgb(72 175 222 / 0.9);
  --shadow-glow-sm: -10px 10px 20px 10px rgb(72 175 222 / 0.9);
}
```

---

## 4. Phases

Each phase lists its **goal**, **tasks**, **acceptance criteria** and a **commit message**. Effort figures are rough, counted in Claude Code sessions.

---

### Phase 0: Safety net, repo hygiene and agent context (½ session)

**Goal:** a clean, reproducible baseline before any refactor.

- [ ] Create branch `feat/portfolio-v2` from the current state; tag the old state `v1-legacy`.
- [ ] Make sure `.gitignore` covers `/.next/`, `node_modules`, `.env*` (keep `.env.example`), `.idea/workspace.xml`, `*.tsbuildinfo`. If `.next/` or `.env` is tracked, untrack it with `git rm -r --cached`.
- [ ] Add `.nvmrc` → `22`.
- [ ] Create `CLAUDE.md` from **Appendix B**.
- [ ] Run `npm ci && npm run build` once and record whether the legacy build passes (for comparison).
- [ ] Move `IMPLEMENTATION_PLAN.md` into the repo root and commit it.

**Acceptance:** a clean `git status`; `CLAUDE.md` exists; branch created.
**Commit:** `chore: add agent context, node version and repo hygiene`

---

### Phase 1: Platform upgrade (1 session)

**Goal:** a current and secure toolchain, with behaviour unchanged.

- [x] Run the official upgrade codemod: `npx @next/codemod@canary upgrade latest`, then pin `next` to ≥ **16.3.6**, `react`/`react-dom` 19.2.x, and `@types/react` 19.
- [x] Tailwind 3 → 4: `npx @tailwindcss/upgrade`, then switch PostCSS to `@tailwindcss/postcss` and delete `tailwind.config.ts` once the tokens move to `@theme` (Phase 2).
- [x] ESLint 9 flat config (`eslint.config.mjs`) with `eslint-config-next`; add Prettier + `prettier-plugin-tailwindcss`.
- [x] Scripts: `dev`, `build`, `start`, `lint` (`eslint .`), `typecheck` (`tsc --noEmit`), `format`, `test` (added in P9), `e2e` (added in P9).
- [x] `next.config.js` → `next.config.ts` (typed); set `images.formats: ['image/avif','image/webp']`.
- [x] Remove the unused `slick` dependency. Keep `react-slick` until Phase 5 replaces it.
- [x] `tsconfig.json`: `target: "ES2022"`, keep `strict`, keep the `@/*` alias. Remove `next-env.d.ts` from `.gitignore` if the codemod recommends that.

**Acceptance:** `npm run build`, `lint` and `typecheck` pass; the home page renders the same as before; no console errors.
**Commit:** `build: upgrade to Next 16, React 19.2, Tailwind v4, ESLint 9`

---

### Phase 2: Design system and layout foundation (1–2 sessions)

**Goal:** reusable building blocks, a TypeScript-only codebase, and an accessible header, drawer and footer.

- [x] `src/lib/fonts.ts`: load fonts **once**. Display font is Fraunces (Google Fonts, OFL — D4 resolved). Body font is Hind. Export CSS variables and apply them on `<html>`.
- [x] Add the §3.4 tokens to `globals.css`. Remove the duplicate media query. **Don't hide the scrollbar globally**; use a thin styled scrollbar instead.
- [x] Move `src/app/components/*` → `src/components/*` and convert everything to `.tsx` with typed props.
- [x] UI primitives: `Container`, `Section` (id, background variant `diagonal-left | diagonal-right | mist | white`), `GhostHeading` (the giant pale word, `aria-hidden`), `Button` (primary/dark/outline, works as a link or a button), `Badge`.
- [x] `content/navigation.ts`: `[{ id:'home' }, { id:'projects' }, { id:'about' }, { id:'experience' }, { id:'contact' }]` rendered by **both** Header and NavDrawer (removes the 4× copy-pasted `<li>` blocks).
- [x] `useScrollSpy`: an IntersectionObserver sets the active nav item as you scroll, keeping the rotated blue "tick" effect.
- [x] `useScrolled`: replaces the manual scroll listener; use a passive listener or IntersectionObserver.
- [x] `NavDrawer`: keep the diagonal slide-in animation, and add `role="dialog"`, `aria-modal`, a focus trap, **Esc to close**, body scroll lock, and a real `<button>` for open/close with `aria-expanded` and `aria-controls`.
- [x] `SocialLinks`: GitHub `https://github.com/nizar-ing`, LinkedIn `https://www.linkedin.com/in/nizar-ilahi`, and Email (`mailto:`). **Remove Twitter, Dribbble and Instagram.**
- [x] `Footer` (edubaba-style): a brand-blue CTA card that overlaps the dark footer ("Have a project or a role in mind? Let's talk" plus a Contact button); nav links, socials, and "© {year} Nizar Ilahi". Skip the accordions, which aren't needed for five links.
- [x] `ScrollToTop` button (appears after 600 px of scrolling; keyboard accessible; uses brand colours, not edubaba's red).
- [x] Replace inline SVG icons with `lucide-react` (menu, X, eye, arrows, mail); brand icons (GitHub, LinkedIn) use inline SVG paths.

**Acceptance:** no `.js`/`.jsx` left in `src/`; keyboard-only users can open and close the drawer and reach every link; no React DOM-attribute warnings in the console.
**Commit:** `feat(ui): design tokens, primitives, accessible header/drawer/footer`

---

### Phase 3: Content layer from the CV and GitHub (1 session)

**Goal:** all text and data live in `src/content/*.ts`, validated by schema.

- [x] `schema.ts`: the types from §3.3 plus Zod schemas.
- [x] `profile.ts`: name, headline, location ("Langenhagen · Hannover region, Germany"), availability ("Unrestricted work permit · Available immediately"), email, socials, CV path, short and long bio (Appendix C). **No street address; phone only if D1 says so.**
- [x] `impact.ts`: 15+ years · 50,000+ users secured (−90 % incidents) · +20 % booking conversion · −30 % load time · >80 % test coverage · 100+ students mentored.
- [x] `skills.ts`: the **6 flip cards**, each `{ count, title, icon, items[] }`:
  1. **Backend · Java & Spring**: Java 17/21, Spring Boot 3.x, Spring Security (JWT/OAuth2, RBAC), Spring Data JPA + Flyway, Resilience4j, Kafka / RabbitMQ, JUnit 5 + Mockito
  2. **Backend · Node.js & NestJS**: Node.js 22, NestJS 11 (modules, CQRS), Express 5, Prisma / TypeORM / Drizzle, Zod / class-validator, REST & GraphQL, OpenAPI / Swagger
  3. **Frontend · React**: React 19, Next.js, TypeScript, TanStack Query, Redux Toolkit / Zustand, Tailwind CSS, React Hook Form (+ Vue 3, Angular)
  4. **Data**: PostgreSQL, MySQL, MongoDB, Redis, schema design, query tuning, migrations
  5. **Cloud, DevOps & Observability**: Docker, Kubernetes / GKE, Helm, GitHub Actions, AWS, LGTM (Loki, Grafana, Tempo, Mimir), Prometheus
  6. **Quality, Architecture & AI**: Clean Architecture / DDD, microservices, TDD (Jest, Vitest, RTL, Playwright/Cypress, MSW), Scrum/Kanban, Claude Code / Cursor / Copilot
- [x] `experience.ts` (EN CV): Freelance Full-Stack Engineer & System Architect (Jan 2026–present) · Full-Stack Web Developer, NACHD-IT (Jun 2019–Dec 2025) · Computer Science Lecturer, University of Kairouan (Jun 2011–Nov 2024, part-time) · Web Developer, Best Engineering (Feb 2008–Sep 2009). Each role gets 2–4 bullets with the metrics.
- [x] `education.ts`: MSc Business Intelligence (ISIG Kairouan, 2013) · MSc Applied Computer Science (ISSAT Sousse, 2007). `languages`: Arabic (native), French (C1), English (B2+), German (A2 → B1).
- [x] `tech-stack.ts`: a map `key → { label, icon, group }` used by the marquee and the badges. Groups are backend, frontend, data, devops and testing. Include NestJS, Spring Boot, Java, Node.js, Express, TypeScript, React, Next.js, Vue, Tailwind, PostgreSQL, MySQL, MongoDB, Redis, Prisma, Kafka, RabbitMQ, Docker, Kubernetes, Helm, GitHub Actions, AWS, Grafana, Jest, Vitest, Playwright. **Drop PHP, Bootstrap and MUI** from the marquee.
- [x] `projects.ts`: seed from **Appendix A** (Tiers A, B and C from §2.4).
- [x] `testimonials.ts`: an empty array by default. The section renders **only when it has real entries** (D5).
- [x] Delete `src/app/data.js`.

**Acceptance:** a unit test (it can land here or in P9) parses every content file with Zod; every `cover.src` and `gallery[].src` exists in `public/`; slugs are unique.
**Commit:** `feat(content): typed CV-driven content layer and project catalogue`

---

### Phase 4: Media and assets, including ClinAnnotate (1 session)

**Goal:** optimized images for every project; template assets removed.

- [x] **Delete template assets:** `hotel01.png`, `property1.png`, `yumfood.jpg`, `portfolioimage.png`, `reactportfolio.png`, `daisy.jpg`, `john.jpg`, `offices.jpg`, `man.png`, `customer*.jp*g`, `Customer-service.jpeg`, `crypto*.png|jpg`, `captcha.png`, `deliveryguy.png`, `adijirat.png`, `amaka.png`, `papo.png`, `onboarding.jpg`, `hotel.jpg`, `first…sisxth.svg` (edubaba's card icons), `next.svg`, `vercel.svg`, and the old `nizarcv.pdf`. Also removed: Recoleta fonts (D4 resolved), `Twitter.png`, `mongoDB.jpg` (duplicate), archive project screenshots.
- [x] `scripts/optimize-images.mjs` (with `sharp`): convert to WebP (quality 80, max width 1920), write to `public/images/projects/<slug>/`. Also downloaded ClinAnnotate gallery images and created SVG-generated covers via sharp.
- [x] **ClinAnnotate:** D2 resolved — 16:9 crop from top for card cover (badge removed); `00.webp` = full image with badge for gallery. `01.webp` = real app screenshot downloaded from the GitHub repo (master branch). `02.webp` and `03.webp` are branded placeholders — the architecture diagrams (`docs/images/`) don't exist in the repo yet; add them and re-run `optimize-images.mjs` to replace.
- [x] **AllezGoo:** `scripts/capture-screenshots.mjs` written (Playwright, 1440×900, handles cookie banner). Placeholder cover in place. **Run `node scripts/capture-screenshots.mjs` then `node scripts/optimize-images.mjs` to replace.**
- [x] **Octobank (confidential):** D3 resolved — SVG architecture illustration (API Gateway → Account/Payment/Notification → Kafka → PostgreSQL → LGTM) generated to `octobank/cover.webp` via sharp.
- [x] **API-only projects** (Clean DDD, Clinic Booking): generated dark-panel SVG covers with endpoint lists and stack badges.
- [x] **Hotel Booking, The Wild Oasis, Students Management:** branded placeholder covers. Replace by running each app locally and capturing, then re-running `optimize-images.mjs` (🟡 D8).
- [x] Profile photo: `nizar-hero.webp` (from `profile.png`, 800 px wide) and `nizar-about.webp` (from `nizar.png`, ≤ 1200 px tall) in `public/images/profile/`.
- [x] `e-store.png` → `public/images/projects/e-shop/cover.webp`. `library-management.png` and `crown-clothing.png` left in `public/` but not used for any cover (identity unconfirmed).

**Acceptance:** `public/` has no template leftovers; no image over 400 KB (except gallery originals under 800 KB); every project has a cover.
**Commit:** `feat(media): optimized project imagery, ClinAnnotate assets, generated covers`

---

### Phase 5: Home page sections (2 sessions)

**Goal:** an edubaba-style one-pager with senior-engineer content. `page.tsx` is a **Server Component**; only interactive leaves use `'use client'`.

Section order on `/`:

1. **Hero** (`#home`): keep edubaba's 115° split gradient (mist → brand) and the photo on the right (`next/image`, `priority`).
   - Eyebrow "Hi there!" → H1 "I'm Nizar" → H2 "Senior Full-Stack Engineer" → sub-line "Java / Spring Boot & React / Node.js / NestJS, from database schema to production on Kubernetes."
   - Availability chips: 📍 Hannover region, DE · ✅ Unrestricted work permit · 🟢 Open to full-time & freelance.
   - CTAs: **See my work** (→ `#projects`), **Download CV** (`/cv/…pdf`, `download`), and a ghost **Contact** button.
2. **TechMarquee**: the white floating card with the glow shadow (as in edubaba), filled by a **CSS-only infinite marquee** (duplicated track, `animation: marquee linear infinite`, paused on hover and when `prefers-reduced-motion` is set). Logos are grayscale and turn to colour on hover. Order: backend → frontend → data → devops.
3. **ImpactStats**: a new band of 6 stat tiles (value + label) from `impact.ts`, with a count-up on first view (client leaf, respects reduced motion).
4. **ProjectsShowcase** (`#projects`): ghost heading "portfolio", title "Recent work", new intro copy (Appendix C).
   - `ProjectFilters` chips: All · Full-Stack · Java/Spring · Node/Nest · Frontend · Teaching. The URL reflects the filter (`?cat=`).
   - `ProjectCarousel` (Embla): centre mode, dots, arrows, swipe, `loop`; shows `featured` projects when "All" is selected.
   - `ProjectCard`: cover image, the offset white "shadow card" behind it (the edubaba look), title, tagline, 3–4 `TechBadge`s, a context pill ("Client project", "Case study"…). The eye button becomes a real `<Link href="/projects/[slug]">` with an `aria-label`.
   - Below the carousel: "View all projects →" (`/projects`) and "More on GitHub →".
5. **AboutMe** (`#about`): ghost heading "About me", title "About myself", a lead line (Appendix C) and 3 bio columns.
   - `SkillFlipCards`: the 3×2 card grid on the left and the detail panel on the right, with the rotating number badge, fade-left animation and previous/next arrows, ported from edubaba's `AboutMe.js` but typed and with keyboard support (cards are buttons; arrow keys cycle). On mobile, show a horizontal scroller or an accordion instead of hiding the cards (edubaba hides them with `hidden sm:flex`).
   - Small "Languages" row: AR native · FR C1 · EN B2+ · DE A2→B1.
6. **ExperienceTimeline** (`#experience`): a vertical timeline, brand dot per role, company, period, location, bullets; education below in a two-card row.
7. **Testimonials**: rendered only if `testimonials.length > 0` (edubaba-style card carousel).
8. **ContactCta**: handled by the footer CTA card from Phase 2, so there's no duplicate.

Also:

- [x] Replace react-slick everywhere, then uninstall `react-slick` and `slick-carousel`.
- [x] Remove all magic `translate(…px)` layout hacks; use negative margins and padding tied to breakpoints, or absolutely positioned decoration.
- [ ] Check at 360, 768, 1024, 1440 and 1920 px widths.

**Acceptance:** the home page matches the edubaba structure; all copy comes from `content/`; no layout breaks between 360 and 1920 px; `react-slick` is gone.
**Commit:** `feat(home): hero, tech marquee, impact, projects showcase, about, experience`

---

### Phase 6: Project pages (1 session)

**Goal:** a real case-study page for every project.

- [ ] `app/projects/[slug]/page.tsx`:
  - `generateStaticParams()` from `projects.ts`; `export const dynamicParams = false`.
  - **Next 15+/16 API:** `params` is a Promise, so use `const { slug } = await params;`. Call `notFound()` when the slug is unknown.
  - `generateMetadata()` provides a per-project title, description and OG image (the cover).
- [ ] Layout, inspired by edubaba's detail page:
  - Hero: the full-width cover with the white blurred `overlay`, the "Project" eyebrow and the title.
  - Two columns on the diagonal mist/white background. **Left (8 cols):** summary → Problem → Solution → **Architecture & highlights** (bullet list) → gallery (`ProjectGallery`, click to open a lightbox dialog). **Right (4 cols, sticky):** context pill, role, year, the **tech stack** badges, the **metrics** tiles, buttons for Live site, GitHub and the second repo, and an "Under NDA, code not public" note when `confidential`.
  - `ProjectPager`: previous and next projects (ordered by `order`), cover image backgrounds with a slate overlay (as in edubaba), wrapping at both ends.
- [ ] `app/projects/page.tsx`: a grid of all projects with the same filter chips, plus a link to the GitHub profile.
- [ ] `app/not-found.tsx`: a branded 404 with a link home.
- [ ] Redirect the legacy `/portfoliodetail/:id` → `/projects` in `next.config.ts`.

**Acceptance:** every slug builds statically; previous/next wrap correctly; an unknown slug returns 404; Lighthouse SEO on a detail page = 100.
**Commit:** `feat(projects): SSG case-study pages with gallery, highlights and pager`

---

### Phase 7: Contact (1 session)

**Goal:** a working, spam-resistant contact flow.

- [ ] `app/contact/page.tsx` (edubaba layout): banner ("Contact form" pill, H1 **"Let's work together"**, a sub-line about full-time roles and freelance projects) over a brand-tinted background (**not** `offices.jpg`). Then 3 info cards (Email · Location "Langenhagen, Hannover region" · Availability), then the form.
- [ ] `ContactForm` (client): name, email, company (optional), subject (select: Full-time role / Freelance project / Other), message. Uses `useActionState` and inline field errors, with a `sonner` toast on success.
- [ ] `app/actions/contact.ts` (`'use server'`): Zod validation → honeypot field → a simple rate limit (per-IP timestamp map; for real limits use Upstash 🟡 optional) → `lib/mail.ts`.
- [ ] `lib/mail.ts`: provider chosen by env (`RESEND_API_KEY` **or** `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS`). Send to `CONTACT_TO_EMAIL` with `replyTo` set to the sender. **HTML-escape every user field** (`lib/escape-html.ts`).
- [ ] `.env.example` with every variable documented; secrets never committed.
- [ ] Nav "Contact" → `/#contact` scrolls to the footer CTA; the button there goes to `/contact`.

**Acceptance:** valid submissions arrive in your inbox; invalid ones show field errors; the honeypot silently drops bots; unit tests cover the action (mock the mail sender).
**Commit:** `feat(contact): server-action contact form with validation, honeypot and email`

---

### Phase 8: SEO, performance and accessibility (1 session)

- [ ] `layout.tsx` metadata: `metadataBase` from `NEXT_PUBLIC_SITE_URL`; title template `%s · Nizar Ilahi`; default title "Nizar Ilahi · Senior Full-Stack Engineer (Java/Spring Boot · React · Node.js/NestJS)"; description (≤ 160 chars); keywords; `openGraph`; `twitter`; `alternates.canonical`.
- [ ] `opengraph-image.tsx` (`next/og`): name, headline, brand gradient, photo.
- [ ] JSON-LD `Person` (name, jobTitle, address locality Langenhagen / country DE, `sameAs` GitHub and LinkedIn, `knowsAbout` the stack) plus `CreativeWork` on each project page.
- [ ] `sitemap.ts` (home, `/projects`, every slug, `/contact`) and `robots.ts`.
- [ ] Images: correct `sizes`, `priority` only on the hero photo, AVIF/WebP.
- [ ] Fonts: `display: 'swap'`, subset Latin, preload only the display weight.
- [ ] A11y: one `h1` per page, logical heading order, alt text for every image, visible focus rings (`focus-visible:ring-brand`), colour contrast ≥ 4.5:1 (check `#48AFDE` text on white; use `brand-dark` for small text), `prefers-reduced-motion` respected, skip-to-content link.
- [ ] Run Lighthouse (mobile) on `/`, one project page and `/contact`; fix anything under target.

**Acceptance:** the §1 Lighthouse targets are met; the Rich Results test validates the Person schema.
**Commit:** `feat(seo): metadata, OG image, JSON-LD, sitemap; perf and a11y pass`

---

### Phase 9: Tests and CI (1 session)

- [ ] **Vitest + RTL** (`vitest.config.ts`, jsdom):
  - `content.schema.test.ts`: every content file parses; slugs are unique; every image path exists on disk; every featured project has ≥ 3 highlights.
  - `ProjectCard.test.tsx`: renders title, tagline and badges, and links to `/projects/<slug>`.
  - `SkillFlipCards.test.tsx`: clicking or pressing arrow keys changes the detail panel.
  - `contact-action.test.ts`: validation errors, honeypot, escaping, mail sender called once.
- [ ] **Playwright** (`playwright.config.ts`, starts `next start` against a production build):
  - `home.spec.ts`: hero visible, nav scroll spy updates, drawer opens and closes with the keyboard, CV link returns 200.
  - `project-detail.spec.ts`: open ClinAnnotate from the carousel, check the stack badges, click Next.
  - `contact.spec.ts`: submit with the mail provider stubbed (`MAIL_DRY_RUN=1`) and expect the success toast.
- [ ] `.github/workflows/ci.yml` on push and PR, Node 22: `npm ci` → `lint` → `typecheck` → `test` → `build` → `e2e` (Playwright's Chromium only); upload the Playwright report on failure.

**Acceptance:** CI is green on the PR; content-schema regressions fail the build.
**Commit:** `test: unit + e2e suites and GitHub Actions CI`

---

### Phase 10: Launch (½ session + manual steps)

- [ ] `README.md`: screenshot, stack badges, features, architecture notes (folder structure, content layer), scripts, env vars, and a link to the live site. It's part of your portfolio too.
- [ ] Rename the package to `nizar-ilahi-portfolio`.
- [ ] Deploy to Vercel: set the env vars and connect the custom domain 🟡 D6. Set `NEXT_PUBLIC_SITE_URL`.
- [ ] Point the old `nizar-ing-portfolio.netlify.app` at the new domain (Netlify redirect or a note on the page) and update the GitHub profile website field.
- [ ] Add the portfolio URL to both CVs (the "Portfolio" link in the header) and to LinkedIn.
- [ ] Merge `feat/portfolio-v2` → `main`; tag `v2.0.0`.
- [ ] Final check on a real phone and in both light conditions (screen glare, small text).

**Commit:** `docs: README and launch config`

---

### Phase 11: Optional enhancements (after launch)

- **German version** (`/de`) with `next-intl`. This helps with the German job market, and DE copy is also good language practice.
- **Dark mode** (Tailwind `dark:` + `next-themes`).
- **Case-study write-ups in MDX** (e.g. "Kafka audit trails in a digital bank", "Designing ClinAnnotate's domain layer").
- **Live GitHub stats** (latest repos and languages via the GitHub API with ISR revalidation).
- **Backend showcase:** only if you want the site itself to prove NestJS or Spring skills. A small NestJS (or Spring Boot) service for contact messages and page-view analytics, deployed separately and documented in the README. It isn't needed for a great portfolio, so treat it as a stretch goal.

---

## 5. Decisions needed from Nizar (🟡)

| ID | Decision | Default if nothing is decided |
|---|---|---|
| D1 | Publish a phone number? Which one (+49 1590 6349955 on the newer CV, or +49 163 3263052)? | Don't publish; email and form only |
| D2 | ClinAnnotate wording and image: "built for IKIM Essen" (as on the CV) or "built as a full-stack engineering case for IKIM Essen"? Keep the "Candidate" badge on the cover? | "Built for the Institute for AI in Medicine (IKIM), University Hospital Essen"; crop the badge from the card cover |
| D3 | Octobank: are you allowed to name the client, link octobank.uz and show an architecture sketch? | Name + link + generic architecture illustration, marked "Under NDA" |
| D4 | Recoleta is a commercial font (Latinotype), and the files in `public/fonts` came from the tutorial. Do you hold a licence? | Switch to **Fraunces** (free, similar look) |
| D5 | Testimonials: can you collect 2–4 real LinkedIn recommendations (former students, NACHD-IT colleagues, AllezGoo client)? | Hide the section; the Impact band fills the space |
| D6 | Domain name (e.g. `nizarilahi.dev` / `nizar-ilahi.de`) | Vercel subdomain until decided |
| D7 | Public CV: the PDF includes your street address and phone. Publish a redacted copy? | Publish a copy without street address and phone |
| D8 | Which Tier C and archive projects to keep, and who captures their screenshots? | Keep Tier C with generated covers until screenshots exist |
| D9 | Email provider: Resend or Gmail SMTP (App Password)? | Resend |

---

## Appendix A: `projects.ts` seed (Tier A and B, ready to paste)

> Claude Code: use this as the starting data. Keep the wording factual and don't invent metrics. Tier C entries follow the same shape, using §2.4 and each repo's README.

```ts
import type { Project } from './schema';

export const projects: Project[] = [
  {
    slug: 'clinannotate',
    title: 'ClinAnnotate',
    tagline: 'Gold-standard annotation workbench for German clinical dictation',
    context: 'Case study',
    role: 'Full-stack engineer (sole developer)',
    year: '2026',
    featured: true,
    order: 1,
    categories: ['fullstack', 'backend-node'],
    stack: ['nodejs', 'typescript', 'express', 'prisma', 'postgresql', 'vue', 'zod', 'vitest', 'playwright', 'docker'],
    summary:
      'Built for the Institute for AI in Medicine (IKIM), University Hospital Essen. ClinAnnotate turns machine-generated transcripts of German clinical dictations into a gold-standard training dataset: annotators correct the transcript and tag structured spans, and the result is used both to measure and to fine-tune the speech model.',
    problem:
      'A speech model produces a first-pass transcript of each dictation. Turning thousands of those into reliable training data needs a fast, keyboard-driven tool that never loses the original AI output and makes every data-quality rule visible.',
    solution:
      'A domain-driven Express 5 API on PostgreSQL (via Prisma) with a Vue 3 SPA, sharing typed contracts through a monorepo package. The domain layer imports no framework code, and a dependency-cruiser rule in the test suite enforces that.',
    highlights: [
      'Ingest and filename pairing of audio files and an AI transcript JSON array, with unmatched items surfaced in both directions and nothing dropped silently',
      'Server-side duration probing (ffprobe); recordings of 15 s or less are auto-rejected, tested at 14.999, 15.000 and 15.001 s',
      'The original AI transcript is immutable, enforced by a database trigger, and serves as the baseline for word-error-rate (WER)',
      'Keyboard-driven annotation across six clinical span types, plus per-item recording conditions that can be overridden',
      'JSONL gold-standard export: both transcripts, WER, typed spans and recording conditions per line',
      'Vitest + Supertest against a dockerised Postgres, and a Playwright e2e suite covering the four primary user flows',
    ],
    links: { github: 'https://github.com/nizar-ing/clinical-audio-annotation-tool' },
    cover: { src: '/images/projects/clinannotate/cover.webp', alt: 'ClinAnnotate annotation queue showing queued, in-progress and unpaired recordings' },
    gallery: [
      { src: '/images/projects/clinannotate/01.webp', alt: 'Modular architecture: Vue 3 SPA, Express 5 API with six bounded contexts, PostgreSQL', caption: 'Modular architecture' },
      { src: '/images/projects/clinannotate/02.webp', alt: 'Pipeline from raw audio and AI transcript to a JSONL gold-standard dataset', caption: 'From raw audio to a gold-standard dataset' },
      { src: '/images/projects/clinannotate/03.webp', alt: 'Domain-driven design approach used in ClinAnnotate', caption: 'DDD approach' },
    ],
  },
  {
    slug: 'octobank',
    title: 'Octobank',
    tagline: 'Cloud-native microservices for a licensed digital bank',
    context: 'Client project',
    role: 'System architect & senior full-stack engineer (freelance)',
    year: '2026',
    featured: true,
    order: 2,
    categories: ['backend-java'],
    stack: ['java', 'springboot', 'kafka', 'resilience4j', 'postgresql', 'kubernetes', 'helm', 'grafana'],
    summary:
      'Designed a cloud-native microservices architecture for Octobank (octobank.uz), a licensed digital bank in Uzbekistan, on Java 17 and Spring Boot 3.x, deployed to Google Kubernetes Engine.',
    highlights: [
      'Kafka as the event backbone: ordered streaming and auditable trails for fintech compliance',
      'Resilience4j circuit breakers isolate cascading failures between the payment, account and notification services',
      'End-to-end tracing and logs with the LGTM stack (Loki, Grafana, Tempo, Mimir)',
      'Zero-downtime deployments on GKE via Helm',
    ],
    links: { live: 'https://octobank.uz' },
    cover: { src: '/images/projects/octobank/cover.webp', alt: 'Architecture sketch: services communicating over Kafka with observability via the LGTM stack' },
    confidential: true,
  },
  {
    slug: 'allezgoo',
    title: 'AllezGoo',
    tagline: 'Live travel booking platform: hotels, trips and e-visas',
    context: 'Freelance',
    role: 'Full-stack architect',
    year: '2026',
    featured: true,
    order: 3,
    categories: ['fullstack', 'frontend', 'backend-node'],
    stack: ['react', 'typescript', 'tanstack-query', 'tailwind', 'vite', 'nestjs', 'postgresql'],
    summary:
      'A full-stack travel platform built with React 19 and NestJS. Visitors search hotels by city and dates, go through a stepped booking flow, browse organised trips and apply for e-visas; staff manage everything from an admin back office.',
    highlights: [
      "React 19 concurrent features keep the UI responsive during parallel booking requests",
      'Modular NestJS architecture lets search, payment and notifications scale independently',
      'Hardened hotel-inventory API client: in-memory cache (5 min TTL), exponential-backoff retries, request cancellation, per-request timeouts',
      'TanStack Query tuned to that client, plus server-driven cache invalidation via a response header',
      'Route-level code splitting, role-based route guards, React Compiler enabled',
    ],
    metrics: [{ label: 'Booking conversion', value: '+20 %' }],
    links: { live: 'https://allezgoo.com', github: 'https://github.com/nizar-ing/allezgo_app_v2' },
    cover: { src: '/images/projects/allezgoo/cover.webp', alt: 'AllezGoo home page with hotel search' },
  },
  {
    slug: 'hotel-booking',
    title: 'Hotel Booking Platform',
    tagline: 'Spring Boot 3 REST API + React frontend with JWT security and Stripe',
    context: 'Open source',
    featured: true,
    order: 4,
    categories: ['fullstack', 'backend-java', 'frontend'],
    stack: ['java', 'springboot', 'spring-security', 'mysql', 'flyway', 'react', 'vite', 'stripe'],
    summary:
      'A complete hotel booking system. The Spring Boot backend handles the full reservation lifecycle (register, search availability, book, confirm by email with a human-readable reference), and the React frontend delivers the guest and admin experience.',
    highlights: [
      'Stateless JWT auth through a custom filter ahead of Spring Security, with BCrypt password hashing',
      'Role-based authorization with @PreAuthorize separating ADMIN and CUSTOMER',
      'Schema versioned with 13 Flyway migrations; Hibernate runs in validate mode',
      'Availability-aware room search by date window and room type; room image upload',
      'Async booking-confirmation emails (@EnableAsync + JavaMailSender), a uniform response envelope and a global exception handler',
    ],
    links: {
      github: 'https://github.com/nizar-ing/Hotel-Booking-App-Backend',
      githubSecondary: 'https://github.com/nizar-ing/Hotel-Booking-App-Frontend',
    },
    cover: { src: '/images/projects/hotel-booking/cover.webp', alt: 'Hotel booking app room search page' },
  },
  {
    slug: 'clean-ddd-ecommerce-api',
    title: 'Clean DDD E-Commerce API',
    tagline: 'NestJS 11 with Domain-Driven Design, CQRS and Stripe Checkout',
    context: 'Teaching',
    featured: true,
    order: 5,
    categories: ['backend-node', 'teaching'],
    stack: ['nestjs', 'typescript', 'drizzle', 'postgresql', 'mongodb', 'stripe', 'jest'],
    summary:
      'A REST API I built to show how to structure a NestJS backend around Domain-Driven Design and Clean Architecture. It runs on either PostgreSQL or MongoDB and takes payments through Stripe Checkout.',
    highlights: [
      'Commands and queries separated with @nestjs/cqrs',
      'Framework-independent domain layer; persistence behind repository ports',
      'Swappable persistence: Drizzle ORM on PostgreSQL, or MongoDB',
      'Cross-aggregate work via domain events: OrderFulfillmentSaga confirms orders on Stripe webhook events, with no controller in the loop',
      'Stripe abstracted behind a payment-gateway port; bounded contexts talk through anti-corruption ports',
      'Jest + Supertest unit and end-to-end tests; class-validator on every request',
    ],
    links: { github: 'https://github.com/nizar-ing/clean-DDD_ecommerce-api' },
    cover: { src: '/images/projects/clean-ddd-ecommerce-api/cover.webp', alt: 'Layered clean-architecture diagram of the NestJS e-commerce API' },
  },
  {
    slug: 'clinic-booking-api',
    title: 'Clinic Booking Appointments API',
    tagline: 'Express 5 + Prisma 7 API with RBAC, collision-free booking and reminders',
    context: 'Open source',
    featured: true,
    order: 6,
    categories: ['backend-node'],
    stack: ['nodejs', 'express', 'prisma', 'postgresql', 'zod', 'jwt', 'swagger'],
    summary:
      'A production-style REST API for clinic appointments: patients browse doctors, services and free slots and book appointments; admins manage the clinic and get aggregated reports.',
    highlights: [
      'Double-booking guard: slot availability is checked and the slot is claimed atomically, backed by unique constraints',
      'JWT auth with role-based access (PATIENT / ADMIN) and an authorize() middleware',
      'Zod validation on every body and query; central AppError plus Prisma error-code mapping',
      'Layered rate limiting (global, auth, booking), Helmet, CORS, compression',
      'X-Request-Id / X-Response-Time tracing in structured logs; a cron job emails reminders 24 h ahead',
      'OpenAPI 3 docs via swagger-jsdoc + Swagger UI',
    ],
    links: { github: 'https://github.com/nizar-ing/Clinic_Booking_Appointments_API' },
    cover: { src: '/images/projects/clinic-booking-api/cover.webp', alt: 'Swagger UI of the Clinic Booking Appointments API' },
  },
];
```

---

## Appendix B: `CLAUDE.md` (create in Phase 0)

```markdown
# CLAUDE.md: Nizar Ilahi Portfolio

## What this is
Personal portfolio of Nizar Ilahi, Senior Full-Stack Engineer (Java/Spring Boot · React · Node.js/NestJS).
Visual reference: github.com/ehizeex/edubaba.org (layout and style only; never copy its text or assets).
The roadmap is IMPLEMENTATION_PLAN.md. Work one phase at a time and tick its checkboxes.

## Stack
Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 (@theme tokens in globals.css)
Embla carousel · motion · lucide-react · zod · sonner · Vitest + RTL · Playwright · Node 22

## Rules
- TypeScript only in src/ (.ts/.tsx). No `any` without a comment explaining why.
- Server Components by default; add 'use client' only on interactive leaves.
- All copy and data live in src/content/*.ts and are validated by src/content/schema.ts.
  Never hard-code copy in components. Never invent facts or metrics: source = Nizar_Ilahi_CV_EN.pdf.
- Use design tokens (bg-brand, text-brand-dark, text-ink, bg-mist, shadow-glow). No raw hex in components.
- Images: next/image, WebP/AVIF under public/images/**; every image needs meaningful alt text.
- Accessibility: real <button>/<a>, visible focus, keyboard support, prefers-reduced-motion.
- No layout hacks with large translate(...px); use flow layout plus decorative absolute elements.
- Dynamic route params are Promises in Next 16: `const { slug } = await params`.
- Escape all user input before putting it into email HTML. Never commit secrets.
- Before finishing: npm run lint && npm run typecheck && npm test && npm run build.
- Ask before: adding dependencies not in the plan, deleting non-template files, changing positioning or copy meaning.

## Brand
brand #48AFDE · brand-dark #223740 · ink #47626D · mist #EEF7FB · mist-2 #E0F3FD · ghost #F7FBFD
Display font: Recoleta (if licensed) or Fraunces · Body: Hind
```

---

## Appendix C: Copy (from the CV, first person)

**Hero sub-line:** Java / Spring Boot & React / Node.js / NestJS, from database schema to production on Kubernetes.

**Projects intro:** A selection of client work, case studies and open-source projects. Each one shows how I approach a problem end to end: domain model, API design, security, tests, and an interface people actually enjoy using.

**About, lead line:** I build web systems end to end, and I've taught others how to do it.

**About, column 1:** I'm Nizar Ilahi, a senior full-stack engineer based in the Hannover region of Germany. For more than 15 years I've built web applications from the database layer up: data models and APIs in Java/Spring Boot or Node.js/NestJS, React frontends in TypeScript, and the pipelines that ship them to Kubernetes.

**About, column 2:** Most recently I designed a cloud-native microservices platform for Octobank, a licensed digital bank in Uzbekistan (Kafka, Resilience4j, LGTM observability on GKE), and a React 19 + NestJS booking platform for AllezGoo that raised conversion by 20 %. Before that, at NACHD-IT, I secured APIs serving 50,000+ users and cut frontend load times by 30 %.

**About, column 3:** For over a decade I also taught computer science at the University of Kairouan and mentored 100+ students. It shows in how I work: clean architecture, tests that document intent, code reviews that teach, and AI tools like Claude Code and Cursor used with judgment. I hold an unrestricted German work permit and I'm available immediately.

**Footer CTA:** Have a role or a project in mind? I'm open to full-time positions and freelance work. Let's talk.

**Contact banner:** Looking for a senior engineer who can own a feature from the database to the UI? Tell me about your team or your project and I'll get back to you within 48 hours.

---

## Appendix D: Quick reference, phase → key files

| Phase | Key files |
|---|---|
| 0 | `CLAUDE.md`, `.gitignore`, `.nvmrc` |
| 1 | `package.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json` |
| 2 | `src/app/globals.css`, `src/lib/fonts.ts`, `src/components/ui/*`, `src/components/layout/*`, `src/hooks/*` |
| 3 | `src/content/*` |
| 4 | `public/images/**`, `scripts/optimize-images.mjs`, `scripts/capture-screenshots.mjs`, `ProjectCover.tsx` |
| 5 | `src/app/page.tsx`, `src/components/sections/*`, `src/components/projects/*` |
| 6 | `src/app/projects/**`, `src/app/not-found.tsx` |
| 7 | `src/app/contact/page.tsx`, `src/app/actions/contact.ts`, `src/lib/mail.ts`, `.env.example` |
| 8 | `src/app/layout.tsx`, `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`, `src/lib/seo.ts` |
| 9 | `tests/**`, `vitest.config.ts`, `playwright.config.ts`, `.github/workflows/ci.yml` |
| 10 | `README.md` |
