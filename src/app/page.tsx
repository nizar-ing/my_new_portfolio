import { Hero } from '@/components/sections/Hero';
import ProjectCarousel from '@/components/projects/ProjectCarousel';
import { GhostHeading } from '@/components/ui/GhostHeading';
import { Container } from '@/components/ui/Container';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      {/* Portfolio section */}
      <section
        id="projects"
        className="mt-0 w-full pt-5"
        style={{ backgroundImage: 'linear-gradient(110deg, #EEF7FB 0 50%, white 0 100%)' }}
      >
        <Container>
          <div className="relative">
            <GhostHeading className="px-5 md:pl-[50px]">portfolio</GhostHeading>
            {/* Overlay the real heading on top of the ghost text */}
            <div className="-mt-52 px-5 pb-8 md:pl-[80px]">
              <p className="text-5xl font-extrabold text-brand">Recent works</p>
              <p className="mt-5 max-w-2xl font-sans text-base leading-8 text-ink">
                Here are a few of my most recent works. As a web designer and full-stack web
                developer, I constantly prioritise 100% client satisfaction. I always enjoy working
                on my projects, so each one is a new adventure for me.
              </p>
            </div>
          </div>
        </Container>

        <div className="-mt-8 pb-16">
          <ProjectCarousel />
        </div>
      </section>
    </main>
  );
}
