import Link from 'next/link';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'dark' | 'outline';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  download?: boolean | string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

const base =
  'inline-block rounded-lg px-5 py-3 text-base font-bold uppercase transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 lg:px-8';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  dark:    'bg-brand-dark text-white hover:bg-brand',
  outline: 'border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white',
};

export function Button({
  children,
  variant = 'primary',
  href,
  download,
  onClick,
  className,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} download={download} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
