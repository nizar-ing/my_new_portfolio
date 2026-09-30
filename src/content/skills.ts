export interface SkillCard {
  count: number;
  title: string;
  icon: string;
  items: string[];
}

export const skillCards: SkillCard[] = [
  {
    count: 1,
    title: 'Backend · Java & Spring',
    icon: 'Server',
    items: [
      'Java 17/21',
      'Spring Boot 3.x',
      'Spring Security (JWT/OAuth2, RBAC)',
      'Spring Data JPA + Flyway',
      'Resilience4j',
      'Kafka / RabbitMQ',
      'JUnit 5 + Mockito',
    ],
  },
  {
    count: 2,
    title: 'Backend · Node.js & NestJS',
    icon: 'Zap',
    items: [
      'Node.js 22',
      'NestJS 11 (modules, CQRS)',
      'Express 5',
      'Prisma / TypeORM / Drizzle',
      'Zod / class-validator',
      'REST & GraphQL',
      'OpenAPI / Swagger',
    ],
  },
  {
    count: 3,
    title: 'Frontend · React',
    icon: 'Layout',
    items: [
      'React 19',
      'Next.js',
      'TypeScript',
      'TanStack Query',
      'Redux Toolkit / Zustand',
      'Tailwind CSS',
      'React Hook Form (+ Vue 3, Angular)',
    ],
  },
  {
    count: 4,
    title: 'Data',
    icon: 'Database',
    items: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis',
      'Schema design',
      'Query tuning',
      'Migrations',
    ],
  },
  {
    count: 5,
    title: 'Cloud, DevOps & Observability',
    icon: 'Cloud',
    items: [
      'Docker',
      'Kubernetes / GKE',
      'Helm',
      'GitHub Actions',
      'AWS',
      'LGTM (Loki, Grafana, Tempo, Mimir)',
      'Prometheus',
    ],
  },
  {
    count: 6,
    title: 'Quality, Architecture & AI',
    icon: 'CheckSquare',
    items: [
      'Clean Architecture / DDD',
      'Microservices',
      'TDD (Jest, Vitest, RTL, Playwright/Cypress, MSW)',
      'Scrum / Kanban',
      'Claude Code / Cursor / Copilot',
    ],
  },
];
