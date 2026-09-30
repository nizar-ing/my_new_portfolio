import { Container } from '@/components/ui/Container';
import { GhostHeading } from '@/components/ui/GhostHeading';
import { profile } from '@/content/profile';
import { languages } from '@/content/education';
import { SkillFlipCards } from './SkillFlipCards';

export function AboutMe() {
  return (
    <section id="about" className="overflow-hidden bg-white pb-24">
      <Container>
        <div className="relative mb-8">
          <GhostHeading>about me</GhostHeading>
          <div className="-mt-52">
            <h2 className="font-display text-4xl font-extrabold text-brand md:text-5xl">About myself</h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink">
              I build web systems end to end, and I&apos;ve taught others how to do it.
            </p>
          </div>
        </div>

        {/* Bio columns */}
        <div className="mb-16 grid gap-6 text-sm leading-7 text-ink md:grid-cols-3 md:gap-10">
          <p>{profile.bio.col1}</p>
          <p>{profile.bio.col2}</p>
          <p>{profile.bio.col3}</p>
        </div>

        {/* Skill flip cards */}
        <SkillFlipCards />

        {/* Languages row */}
        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-mist pt-8">
          <span className="text-sm font-semibold text-ink">Languages:</span>
          {languages.map(({ language, level }) => (
            <span
              key={language}
              className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-brand-dark"
            >
              {language} — {level}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
