export type TechGroup = 'backend' | 'frontend' | 'data' | 'devops' | 'testing';

export interface TechEntry {
  label: string;
  icon: string; // simple-icons slug
  group: TechGroup;
}

export const techStack: Record<string, TechEntry> = {
  // Backend
  java: { label: 'Java', icon: 'openjdk', group: 'backend' },
  springboot: { label: 'Spring Boot', icon: 'springboot', group: 'backend' },
  'spring-security': { label: 'Spring Security', icon: 'spring', group: 'backend' },
  nodejs: { label: 'Node.js', icon: 'nodedotjs', group: 'backend' },
  nestjs: { label: 'NestJS', icon: 'nestjs', group: 'backend' },
  express: { label: 'Express', icon: 'express', group: 'backend' },
  kafka: { label: 'Kafka', icon: 'apachekafka', group: 'backend' },
  resilience4j: { label: 'Resilience4j', icon: 'resilience4j', group: 'backend' },
  graphql: { label: 'GraphQL', icon: 'graphql', group: 'backend' },
  jwt: { label: 'JWT', icon: 'jsonwebtokens', group: 'backend' },
  swagger: { label: 'Swagger', icon: 'swagger', group: 'backend' },
  zod: { label: 'Zod', icon: 'zod', group: 'backend' },
  stripe: { label: 'Stripe', icon: 'stripe', group: 'backend' },
  auth0: { label: 'Auth0', icon: 'auth0', group: 'backend' },
  // Frontend
  react: { label: 'React', icon: 'react', group: 'frontend' },
  nextjs: { label: 'Next.js', icon: 'nextdotjs', group: 'frontend' },
  typescript: { label: 'TypeScript', icon: 'typescript', group: 'frontend' },
  vue: { label: 'Vue 3', icon: 'vuedotjs', group: 'frontend' },
  angular: { label: 'Angular', icon: 'angular', group: 'frontend' },
  tailwind: { label: 'Tailwind CSS', icon: 'tailwindcss', group: 'frontend' },
  'tanstack-query': { label: 'TanStack Query', icon: 'reactquery', group: 'frontend' },
  vite: { label: 'Vite', icon: 'vite', group: 'frontend' },
  'react-router': { label: 'React Router', icon: 'reactrouter', group: 'frontend' },
  'react-hook-form': { label: 'React Hook Form', icon: 'reacthookform', group: 'frontend' },
  supabase: { label: 'Supabase', icon: 'supabase', group: 'frontend' },
  'redux-toolkit': { label: 'Redux Toolkit', icon: 'redux', group: 'frontend' },
  'chakra-ui': { label: 'Chakra UI', icon: 'chakraui', group: 'frontend' },
  'styled-components': { label: 'styled-components', icon: 'styledcomponents', group: 'frontend' },
  recharts: { label: 'Recharts', icon: 'recharts', group: 'frontend' },
  'react-leaflet': { label: 'React Leaflet', icon: 'leaflet', group: 'frontend' },
  // Data
  postgresql: { label: 'PostgreSQL', icon: 'postgresql', group: 'data' },
  mysql: { label: 'MySQL', icon: 'mysql', group: 'data' },
  mongodb: { label: 'MongoDB', icon: 'mongodb', group: 'data' },
  redis: { label: 'Redis', icon: 'redis', group: 'data' },
  prisma: { label: 'Prisma', icon: 'prisma', group: 'data' },
  drizzle: { label: 'Drizzle ORM', icon: 'drizzle', group: 'data' },
  flyway: { label: 'Flyway', icon: 'flyway', group: 'data' },
  // DevOps
  docker: { label: 'Docker', icon: 'docker', group: 'devops' },
  kubernetes: { label: 'Kubernetes', icon: 'kubernetes', group: 'devops' },
  helm: { label: 'Helm', icon: 'helm', group: 'devops' },
  grafana: { label: 'Grafana', icon: 'grafana', group: 'devops' },
  aws: { label: 'AWS', icon: 'amazonaws', group: 'devops' },
  // Testing
  vitest: { label: 'Vitest', icon: 'vitest', group: 'testing' },
  jest: { label: 'Jest', icon: 'jest', group: 'testing' },
  playwright: { label: 'Playwright', icon: 'playwright', group: 'testing' },
  msw: { label: 'MSW', icon: 'msw', group: 'testing' },
};
