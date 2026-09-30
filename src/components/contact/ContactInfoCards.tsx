import { Mail, MapPin, Briefcase } from 'lucide-react';
import { profile } from '@/content/profile';

const cards = [
  {
    Icon: Mail,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    Icon: MapPin,
    label: 'Location',
    value: profile.location,
    href: null,
  },
  {
    Icon: Briefcase,
    label: 'Availability',
    value: profile.availability,
    href: null,
  },
] as const;

export function ContactInfoCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {cards.map(({ Icon, label, value, href }) => (
        <div
          key={label}
          className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-mist-2"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-mist">
            <Icon className="h-7 w-7 text-brand" aria-hidden="true" />
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand">{label}</p>
          {href ? (
            <a
              href={href}
              className="text-sm font-medium text-ink transition-colors hover:text-brand focus-visible:outline-none focus-visible:underline"
            >
              {value}
            </a>
          ) : (
            <p className="text-sm font-medium text-ink">{value}</p>
          )}
        </div>
      ))}
    </div>
  );
}
