import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ExternalLink, Code2, Lock, CheckCircle2 } from 'lucide-react';
import { projects } from '@/content/projects';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { TechBadge } from '@/components/projects/TechBadge';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { ProjectPager } from '@/components/projects/ProjectPager';
import { creativeWorkJsonLd } from '@/lib/seo';

// ── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: [{ url: project.cover.src, alt: project.cover.alt }],
      type: 'article',
    },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { links, confidential } = project;
  const hasLinks = links.live || links.github || links.githubSecondary;

  // Resolve display labels for tech keys that aren't in techStack
  const techLabels = project.stack.map((key) => ({ key }));

  return (
    <>
      {/* ── Hero ── */}
      <div className="relative h-72 w-full md:h-96 lg:h-[440px]">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* White blurred overlay (from globals.css .overlay, extended to full height) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.92), rgba(255,255,255,0.65))',
            backdropFilter: 'blur(4px)',
          }}
          aria-hidden="true"
        />
        {/* Text content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-10">
          <Container>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              Project
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold text-brand-dark md:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink md:text-lg">
                {project.tagline}
              </p>
            )}
          </Container>
        </div>
      </div>

      {/* ── Body ── */}
      <div
        className="w-full py-16"
        style={{
          backgroundImage:
            'linear-gradient(110deg, var(--color-mist) 0 50%, white 0 100%)',
        }}
      >
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* ── Left column ── */}
            <article className="lg:col-span-8">
              {/* Summary */}
              <p className="text-base leading-relaxed text-ink md:text-lg">
                {project.summary}
              </p>

              {/* Problem / Solution */}
              {(project.problem || project.solution) && (
                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  {project.problem && (
                    <div>
                      <h2 className="mb-3 font-display text-xl font-bold text-brand-dark">
                        The problem
                      </h2>
                      <p className="text-sm leading-relaxed text-ink">
                        {project.problem}
                      </p>
                    </div>
                  )}
                  {project.solution && (
                    <div>
                      <h2 className="mb-3 font-display text-xl font-bold text-brand-dark">
                        The solution
                      </h2>
                      <p className="text-sm leading-relaxed text-ink">
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Architecture & highlights */}
              <div className="mt-10">
                <h2 className="mb-5 font-display text-2xl font-bold text-brand-dark">
                  Architecture &amp; highlights
                </h2>
                <ul className="space-y-3">
                  {project.highlights.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-ink">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="mt-12">
                  <h2 className="mb-5 font-display text-2xl font-bold text-brand-dark">
                    Gallery
                  </h2>
                  <ProjectGallery images={project.gallery} />
                </div>
              )}
            </article>

            {/* ── Right column (sticky sidebar) ── */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6 rounded-2xl border border-mist-2 bg-white p-6 shadow-sm">
                {/* Context + role + year */}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-brand/10 text-brand">
                    {project.context}
                  </Badge>
                  {project.confidential && (
                    <Badge className="flex items-center gap-1 bg-amber-50 text-amber-700">
                      <Lock size={11} aria-hidden="true" />
                      Under NDA
                    </Badge>
                  )}
                </div>

                {project.role && (
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-ink/60">
                      Role
                    </p>
                    <p className="text-sm font-medium text-brand-dark">{project.role}</p>
                  </div>
                )}

                {project.year && (
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-ink/60">
                      Year
                    </p>
                    <p className="text-sm font-medium text-brand-dark">{project.year}</p>
                  </div>
                )}

                {/* Tech stack */}
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink/60">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {techLabels.map(({ key }) => (
                      <TechBadge key={key} techKey={key} />
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink/60">
                      Impact
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-xl bg-mist p-3 text-center"
                        >
                          <p className="font-display text-xl font-extrabold text-brand">
                            {m.value}
                          </p>
                          <p className="mt-0.5 text-xs text-ink">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                {hasLinks && (
                  <div className="flex flex-col gap-2 pt-1">
                    {links.live && (
                      <a
                        href={links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                      >
                        <ExternalLink size={15} aria-hidden="true" />
                        Live site
                      </a>
                    )}
                    {links.github && !confidential && (
                      <a
                        href={links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-brand-dark px-4 py-2.5 text-sm font-bold text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                      >
                        <Code2 size={15} aria-hidden="true" />
                        View code
                      </a>
                    )}
                    {links.githubSecondary && !confidential && (
                      <a
                        href={links.githubSecondary}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-brand-dark/40 px-4 py-2.5 text-sm font-bold text-brand-dark/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-dark hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                      >
                        <Code2 size={15} aria-hidden="true" />
                        Frontend repo
                      </a>
                    )}
                  </div>
                )}

                {/* NDA note */}
                {confidential && (
                  <p className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
                    <Lock size={13} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                    Source code is not public due to a client NDA. The architecture
                    overview above reflects what I can share.
                  </p>
                )}

                {/* Back link */}
                <Link
                  href="/projects"
                  className="mt-1 block text-center text-xs font-medium text-ink/60 underline-offset-2 hover:text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  ← All projects
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </div>

      {/* ── Pager ── */}
      <ProjectPager projects={projects} currentSlug={project.slug} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd(project)) }}
      />
    </>
  );
}
