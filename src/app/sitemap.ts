import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nizarilahi.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl,                  lastModified: new Date(), priority: 1.0, changeFrequency: 'monthly' },
    { url: `${siteUrl}/projects`,    lastModified: new Date(), priority: 0.9, changeFrequency: 'monthly' },
    { url: `${siteUrl}/contact`,     lastModified: new Date(), priority: 0.7, changeFrequency: 'yearly'  },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    priority: p.featured ? 0.8 : 0.6,
    changeFrequency: 'yearly' as const,
  }));

  return [...staticRoutes, ...projectRoutes];
}
