import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { GhostHeading } from '@/components/ui/GhostHeading';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden">
      <GhostHeading className="pointer-events-none absolute left-0 right-0 text-center">
        404
      </GhostHeading>
      <Container className="relative z-10 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">
          Page not found
        </p>
        <h1 className="mt-4 font-display text-5xl font-extrabold text-brand-dark md:text-6xl">
          Nothing here.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ink">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/" variant="primary">
            Back to home
          </Button>
          <Button href="/projects" variant="outline">
            View projects
          </Button>
        </div>
      </Container>
    </main>
  );
}
