import { Container } from '@/components/ui/Container';
import { GhostHeading } from '@/components/ui/GhostHeading';
import { experience } from '@/content/experience';
import { education } from '@/content/education';

export function ExperienceTimeline() {
  return (
    <section id="experience" className="overflow-hidden bg-mist py-24">
      <Container>
        <div className="relative mb-16">
          <GhostHeading>experience</GhostHeading>
          <div className="-mt-48">
            <h2 className="font-display text-4xl font-extrabold text-brand md:text-5xl">Experience</h2>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mb-20">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-brand/20 md:left-8" aria-hidden="true" />

          <ol className="space-y-10">
            {experience.map((role, i) => (
              <li key={i} className="relative pl-12 md:pl-20">
                {/* Brand dot */}
                <span
                  className="absolute left-2 top-1.5 h-5 w-5 rounded-full border-4 border-mist bg-brand shadow-sm md:left-6"
                  aria-hidden="true"
                />

                <div className="rounded-2xl bg-white px-6 py-5 shadow-sm">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-display text-lg font-bold text-brand-dark">{role.title}</p>
                      <p className="text-sm font-semibold text-brand">{role.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-ink">{role.period}</p>
                      <p className="text-xs text-ink/60">{role.location}</p>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {role.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm leading-relaxed text-ink">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Education */}
        <h3 className="mb-6 font-display text-2xl font-bold text-brand-dark">Education</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {education.map((deg) => (
            <div key={deg.institution} className="rounded-2xl bg-white px-6 py-5 shadow-sm">
              <p className="font-display text-base font-bold text-brand-dark">{deg.degree}</p>
              <p className="mt-0.5 text-sm font-semibold text-brand">{deg.institution}</p>
              <p className="mt-1 text-xs text-ink/70">{deg.location} · {deg.year}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
