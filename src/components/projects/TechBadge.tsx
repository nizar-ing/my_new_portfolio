import { techStack } from '@/content/tech-stack';
import { cn } from '@/lib/cn';

interface TechBadgeProps {
  techKey: string;
  className?: string;
}

export function TechBadge({ techKey, className }: TechBadgeProps) {
  const entry = techStack[techKey];
  const label = entry?.label ?? techKey;
  return (
    <span
      className={cn(
        'inline-block rounded-md bg-mist px-2 py-0.5 text-xs font-medium text-ink',
        className,
      )}
    >
      {label}
    </span>
  );
}
