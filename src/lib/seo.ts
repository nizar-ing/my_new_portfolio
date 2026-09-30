import type { Project } from '@/content/schema';
import { profile } from '@/content/profile';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nizarilahi.dev';

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.headline,
    description: profile.shortBio,
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Langenhagen',
      addressRegion: 'Lower Saxony',
      addressCountry: 'DE',
    },
    sameAs: [profile.socials.github, profile.socials.linkedin],
    knowsAbout: [
      'Java', 'Spring Boot', 'Microservices', 'React', 'Next.js',
      'Node.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Kafka',
      'Kubernetes', 'Docker', 'Clean Architecture', 'Domain-Driven Design',
    ],
  };
}

export function creativeWorkJsonLd(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.tagline,
    abstract: project.summary,
    image: `${siteUrl}${project.cover.src}`,
    url: `${siteUrl}/projects/${project.slug}`,
    creator: {
      '@type': 'Person',
      name: profile.name,
      url: siteUrl,
    },
    ...(!project.confidential && project.links.github && { codeRepository: project.links.github }),
    ...(project.links.live && { workExample: project.links.live }),
    keywords: project.stack.join(', '),
  };
}
