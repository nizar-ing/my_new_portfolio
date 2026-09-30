import { Hero } from '@/components/sections/Hero';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { ImpactStats } from '@/components/sections/ImpactStats';
import { ProjectsShowcase } from '@/components/sections/ProjectsShowcase';
import { AboutMe } from '@/components/sections/AboutMe';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { Testimonials } from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TechMarquee />
      <ImpactStats />
      <ProjectsShowcase />
      <AboutMe />
      <ExperienceTimeline />
      <Testimonials />
    </main>
  );
}
