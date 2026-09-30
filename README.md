# Nizar Ilahi — Portfolio

Personal portfolio of **Nizar Ilahi**, Senior Full-Stack Engineer · Java / Spring Boot & React / Node.js / NestJS.

**Live site → [nizarilahi.dev](https://nizarilahi.dev)** *(update URL after deployment)*

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Node](https://img.shields.io/badge/Node-22-339933?logo=node.js&logoColor=white)

## Features

- **One-page layout** — Hero, Tech Marquee, Impact Stats, Projects Showcase, About / Skills, Experience Timeline, Contact CTA
- **Project pages** — SSG case-study pages at `/projects/[slug]` with gallery lightbox, architecture highlights, metrics, and previous / next navigation
- **All-projects grid** — `/projects` with category filter chips (Full-Stack · Java/Spring · Node/Nest · Frontend · Teaching)
- **Contact form** — Server Action + Zod validation + honeypot + rate limiting; sends via Resend or SMTP
- **CV download** — `/cv/Nizar_Ilahi_CV_EN.pdf`
- **SEO** — per-page metadata, OG image (`next/og`), JSON-LD `Person` + `CreativeWork`, sitemap, robots
- **Accessibility** — skip-to-content link, focus rings, keyboard-navigable drawer and gallery, `prefers-reduced-motion` throughout
- **Performance** — Server Components by default; `next/image` with WebP/AVIF; CSS-only marquee; Turbopack in dev

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript strict, Tailwind CSS v4 |
| Carousel | Embla Carousel |
| Animation | Motion (`motion/react`) |
| Icons | Lucide React (UI) · React Icons / SimpleIcons (tech logos) |
| Forms | React 19 `useActionState` + Server Actions + Zod |
| Email | Resend (or Nodemailer / SMTP fallback) |
| Toasts | Sonner |
| Runtime | Node 22 |

## Architecture

### Content layer

All copy and data live in `src/content/` as typed TypeScript files validated by Zod schemas in `src/content/schema.ts`. Nothing is hard-coded in components.

```
src/content/
├── schema.ts          Zod schemas + TypeScript types (Project, Skill, Experience…)
├── profile.ts         Name, bio, socials, CV path, footer copy
├── projects.ts        12 projects (3 Tier A featured, 3 Tier B, 6 Tier C)
├── skills.ts          6 flip-card categories
├── experience.ts      4 roles with metrics
├── education.ts       Degrees + languages
├── tech-stack.ts      40+ tech entries (label, icon, group)
├── impact.ts          6 stat tiles from the CV
├── navigation.ts      5 nav items
└── testimonials.ts    Empty array (renders only when populated)
```

### Component structure

```
src/components/
├── layout/     Header · NavDrawer · Footer · SocialLinks · ScrollToTop
├── sections/   Hero · TechMarquee · ImpactStats · ProjectsShowcase
│               AboutMe · SkillFlipCards · ExperienceTimeline · Testimonials
├── projects/   ProjectCard · ProjectCarousel · ProjectFilters · TechBadge
│               ProjectGallery · ProjectPager
├── contact/    ContactForm · ContactInfoCards
└── ui/         Button · Badge · Section · Container · GhostHeading
```

### Routes

| Route | Type | Description |
|---|---|---|
| `/` | Server Component | Home page (all sections) |
| `/projects` | Server Component | All-projects grid with filters |
| `/projects/[slug]` | SSG (12 slugs) | Case-study detail page |
| `/contact` | Static | Contact form |

## Getting started

### Prerequisites

- Node 22 (`nvm use` if you have `.nvmrc`)
- npm 10+

### Install

```bash
npm install
```

### Environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `CONTACT_TO_EMAIL` | Yes | Address that receives contact form submissions |
| `RESEND_API_KEY` | Yes* | Resend API key (*or use SMTP vars below) |
| `RESEND_FROM` | Yes* | Sender address verified in Resend |
| `SMTP_HOST` | Alt | SMTP hostname (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | Alt | SMTP port (e.g. `587`) |
| `SMTP_USER` | Alt | SMTP username |
| `SMTP_PASS` | Alt | SMTP password / App Password |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Full URL of the deployed site (used in metadata and OG) |

### Dev server

```bash
npm run dev        # http://localhost:3000 (Turbopack)
```

### Build

```bash
npm run build
npm run start
```

### Lint & type-check

```bash
npm run lint
npm run typecheck
```

### One-off scripts

Run these from inside `nizar-portfolio/`:

```bash
# Capture live screenshots of allezgoo.com (requires Playwright browsers)
node scripts/capture-screenshots.mjs

# Convert source images to WebP (quality 80, max 1920 px)
# Run after capture-screenshots.mjs or after adding new images
node scripts/optimize-images.mjs
```

## Design tokens

Defined in `src/app/globals.css` as Tailwind v4 `@theme` variables:

| Token | Hex | Use |
|---|---|---|
| `brand` | `#48AFDE` | Accent colour, CTAs |
| `brand-dark` | `#223740` | Headings, dark buttons |
| `ink` | `#47626D` | Body text |
| `mist` | `#EEF7FB` | Light section backgrounds |
| `ghost` | `#F7FBFD` | Giant decorative background headings |

Display font: **Fraunces** · Body font: **Hind**

## Deployment

The site is deployed on [Vercel](https://vercel.com). Set all environment variables listed above in the Vercel project settings, then set `NEXT_PUBLIC_SITE_URL` to your domain.

## License

The source code is MIT licensed. Project screenshots and CV are not included under this licence.
