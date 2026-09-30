import {
  SiSpringboot, SiSpring, SiNodedotjs, SiNestjs, SiExpress, SiApachekafka,
  SiGraphql, SiSwagger, SiZod, SiStripe,
  SiReact, SiNextdotjs, SiTypescript, SiVuedotjs, SiAngular, SiTailwindcss,
  SiVite, SiRedux,
  SiPostgresql, SiMysql, SiMongodb, SiRedis, SiPrisma,
  SiDocker, SiKubernetes, SiHelm, SiGrafana, SiGithubactions,
  SiVitest, SiJest, SiCypress,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

interface TechItem {
  label: string;
  Icon: IconType;
  color: string;
}

const TECH_ITEMS: TechItem[] = [
  // Backend
  { label: 'Java',          Icon: SiSpring,           color: '#6DB33F' },
  { label: 'Spring Boot',   Icon: SiSpringboot,       color: '#6DB33F' },
  { label: 'Node.js',       Icon: SiNodedotjs,        color: '#339933' },
  { label: 'NestJS',        Icon: SiNestjs,           color: '#E0234E' },
  { label: 'Express',       Icon: SiExpress,          color: '#000000' },
  { label: 'Kafka',         Icon: SiApachekafka,      color: '#231F20' },
  { label: 'GraphQL',       Icon: SiGraphql,          color: '#E10098' },
  { label: 'Swagger',       Icon: SiSwagger,          color: '#85EA2D' },
  { label: 'Zod',           Icon: SiZod,              color: '#3E67B1' },
  { label: 'Stripe',        Icon: SiStripe,           color: '#635BFF' },
  // Frontend
  { label: 'React',         Icon: SiReact,            color: '#61DAFB' },
  { label: 'Next.js',       Icon: SiNextdotjs,        color: '#000000' },
  { label: 'TypeScript',    Icon: SiTypescript,       color: '#3178C6' },
  { label: 'Vue 3',         Icon: SiVuedotjs,         color: '#4FC08D' },
  { label: 'Angular',       Icon: SiAngular,          color: '#DD0031' },
  { label: 'Tailwind CSS',  Icon: SiTailwindcss,      color: '#06B6D4' },
  { label: 'Vite',          Icon: SiVite,             color: '#646CFF' },
  { label: 'Redux',         Icon: SiRedux,            color: '#764ABC' },
  // Data
  { label: 'PostgreSQL',    Icon: SiPostgresql,       color: '#4169E1' },
  { label: 'MySQL',         Icon: SiMysql,            color: '#4479A1' },
  { label: 'MongoDB',       Icon: SiMongodb,          color: '#47A248' },
  { label: 'Redis',         Icon: SiRedis,            color: '#DC382D' },
  { label: 'Prisma',        Icon: SiPrisma,           color: '#2D3748' },
  // DevOps
  { label: 'Docker',        Icon: SiDocker,           color: '#2496ED' },
  { label: 'Kubernetes',    Icon: SiKubernetes,       color: '#326CE5' },
  { label: 'Helm',          Icon: SiHelm,             color: '#0F1689' },
  { label: 'Grafana',       Icon: SiGrafana,          color: '#F46800' },
  { label: 'GitHub Actions',Icon: SiGithubactions,    color: '#2088FF' },
  // Testing
  { label: 'Vitest',        Icon: SiVitest,           color: '#6E9F18' },
  { label: 'Jest',          Icon: SiJest,             color: '#C21325' },
  { label: 'Cypress',       Icon: SiCypress,          color: '#17202C' },
];

function TechLogo({ label, Icon, color }: TechItem) {
  return (
    <div className="group mx-4 flex flex-shrink-0 flex-col items-center gap-1.5">
      <Icon
        size={36}
        className="transition-all duration-300 grayscale group-hover:grayscale-0"
        style={{ color }}
        aria-hidden="true"
      />
      <span className="text-xs text-ink">{label}</span>
    </div>
  );
}

export function TechMarquee() {
  return (
    <div className="relative z-10 mx-auto -mt-10 max-w-xs overflow-hidden rounded-2xl bg-white px-4 py-6 sm:max-w-lg md:max-w-2xl lg:max-w-5xl lg:px-10 xl:max-w-6xl"
      style={{ boxShadow: 'var(--shadow-glow)' }}>
      {/* marquee-viewport is the clipping parent; used in CSS for focus-within pause */}
      <div className="marquee-viewport overflow-hidden" aria-label="Tech stack" role="marquee">
        {/* Duplicate the track to create the seamless loop */}
        <div className="marquee-track py-4" aria-hidden="true">
          {[...TECH_ITEMS, ...TECH_ITEMS].map((item, i) => (
            <TechLogo key={`${item.label}-${i}`} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
