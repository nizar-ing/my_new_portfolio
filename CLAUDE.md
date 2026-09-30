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
