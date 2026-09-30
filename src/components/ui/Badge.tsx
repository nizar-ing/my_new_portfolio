import { cn } from '@/lib/cn';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-full bg-mist px-3 py-1 text-sm font-medium text-ink',
        className,
      )}
    >
      {children}
    </span>
  );
}
