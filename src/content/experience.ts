export interface ExperienceRole {
  company: string;
  title: string;
  period: string;
  location: string;
  bullets: string[];
}

export const experience: ExperienceRole[] = [
  {
    company: 'Freelance',
    title: 'Full-Stack Engineer & System Architect',
    period: 'Jan 2026 – present',
    location: 'Hannover, Germany (remote)',
    bullets: [
      'Designed cloud-native microservices for Octobank (licensed digital bank, Uzbekistan): Java 17, Spring Boot 3.x, Kafka, Resilience4j, GKE, LGTM observability.',
      'Architected and built AllezGoo travel platform (React 19 + NestJS): +20 % booking conversion, −30 % frontend load time via React Server Components and TanStack Query.',
      'Delivered ClinAnnotate annotation workbench for the Institute for AI in Medicine (IKIM), University Hospital Essen: Node.js 22, Express 5, Prisma, PostgreSQL 16, Vue 3, Vitest/Playwright.',
    ],
  },
  {
    company: 'NACHD-IT',
    title: 'Full-Stack Web Developer',
    period: 'Jun 2019 – Dec 2025',
    location: 'Remote',
    bullets: [
      'Secured APIs and web applications serving 50,000+ users, reducing security incidents by 90 %.',
      'Cut frontend load times by 30 % by migrating to React Server Components and TanStack Query.',
      'Led full-stack feature development across Java/Spring Boot backends and React frontends.',
    ],
  },
  {
    company: 'University of Kairouan',
    title: 'Computer Science Lecturer (part-time)',
    period: 'Jun 2011 – Nov 2024',
    location: 'Kairouan, Tunisia',
    bullets: [
      'Taught web development, algorithms and databases to undergraduate students.',
      'Mentored 100+ students on software engineering practices and career paths.',
      'Developed curriculum covering full-stack development with modern JavaScript frameworks.',
    ],
  },
  {
    company: 'Best Engineering',
    title: 'Web Developer',
    period: 'Feb 2008 – Sep 2009',
    location: 'Tunisia',
    bullets: [
      'Built and maintained web applications, achieving a 35 % reduction in processing time through optimisation.',
    ],
  },
];
