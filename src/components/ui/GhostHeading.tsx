import { cn } from '@/lib/cn';

interface GhostHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function GhostHeading({ children, className }: GhostHeadingProps) {
  return (
    <p
      aria-hidden="true"
      className={cn(
        'select-none overflow-hidden text-[300px] leading-none text-ghost',
        className,
      )}
    >
      {children}
    </p>
  );
}
