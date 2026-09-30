import { z } from 'zod';

export const ProjectCategorySchema = z.enum([
  'fullstack',
  'backend-java',
  'backend-node',
  'frontend',
  'teaching',
]);
export type ProjectCategory = z.infer<typeof ProjectCategorySchema>;

export const ProjectContextSchema = z.enum([
  'Client project',
  'Freelance',
  'Case study',
  'Open source',
  'Teaching',
]);
export type ProjectContext = z.infer<typeof ProjectContextSchema>;

export const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'slug must be kebab-case'),
  title: z.string(),
  tagline: z.string().max(90),
  context: ProjectContextSchema,
  role: z.string().optional(),
  year: z.string().optional(),
  featured: z.boolean(),
  order: z.number().int(),
  categories: z.array(ProjectCategorySchema).min(1),
  stack: z.array(z.string()).min(1),
  summary: z.string(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  highlights: z.array(z.string()).min(1),
  metrics: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
  links: z.object({
    live: z.string().url().optional(),
    github: z.string().url().optional(),
    githubSecondary: z.string().url().optional(),
  }),
  cover: z.object({ src: z.string(), alt: z.string() }),
  gallery: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string(),
        caption: z.string().optional(),
      }),
    )
    .optional(),
  confidential: z.boolean().optional(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const TestimonialSchema = z.object({
  name: z.string(),
  role: z.string(),
  company: z.string(),
  quote: z.string(),
  avatar: z.string().optional(),
  linkedinUrl: z.string().url().optional(),
});
export type Testimonial = z.infer<typeof TestimonialSchema>;
