import { cn } from '@/lib/cn';

type SectionVariant = 'white' | 'mist' | 'diagonal-left' | 'diagonal-right';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  variant?: SectionVariant;
  className?: string;
}

const variantClasses: Record<SectionVariant, string> = {
  white:          'bg-white',
  mist:           'bg-mist',
  'diagonal-left':  '',
  'diagonal-right': '',
};

const variantStyles: Record<SectionVariant, React.CSSProperties> = {
  white:          {},
  mist:           {},
  'diagonal-left':  { backgroundImage: 'linear-gradient(110deg, #EEF7FB 0 50%, white 0 100%)' },
  'diagonal-right': { backgroundImage: 'linear-gradient(110deg, white 0 50%, #EEF7FB 0 100%)' },
};

export function Section({ children, id, variant = 'white', className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('w-full', variantClasses[variant], className)}
      style={variantStyles[variant]}
    >
      {children}
    </section>
  );
}
