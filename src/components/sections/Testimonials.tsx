import { testimonials } from '@/content/testimonials';

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="bg-white py-24">
      <div className="mx-auto max-w-screen-xl px-6">
        <p className="mb-10 font-display text-4xl font-extrabold text-brand">What people say</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="rounded-2xl bg-mist p-6">
              <p className="text-sm leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4">
                <p className="text-sm font-semibold text-brand-dark">{t.name}</p>
                <p className="text-xs text-ink/60">{t.role}, {t.company}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
