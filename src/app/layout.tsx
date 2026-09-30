import type { Metadata } from 'next';
import './globals.css';
import { displayFont, bodyFont } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { Toaster } from 'sonner';
import { personJsonLd } from '@/lib/seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nizarilahi.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Nizar Ilahi · Senior Full-Stack Engineer',
    template: '%s · Nizar Ilahi',
  },
  description:
    'Portfolio of Nizar Ilahi, Senior Full-Stack Engineer specialising in Java/Spring Boot, React and Node.js/NestJS. 15+ years building production web systems.',
  keywords: [
    'Nizar Ilahi', 'Senior Full-Stack Engineer', 'Java Spring Boot',
    'React Developer', 'Node.js', 'NestJS', 'TypeScript', 'Portfolio',
    'Hannover', 'Germany', 'Full Stack Developer',
  ],
  authors: [{ name: 'Nizar Ilahi', url: siteUrl }],
  creator: 'Nizar Ilahi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Nizar Ilahi',
    title: 'Nizar Ilahi · Senior Full-Stack Engineer',
    description:
      'Portfolio of Nizar Ilahi, Senior Full-Stack Engineer specialising in Java/Spring Boot, React and Node.js/NestJS. 15+ years building production web systems.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nizar Ilahi · Senior Full-Stack Engineer',
    description:
      'Portfolio of Nizar Ilahi, Senior Full-Stack Engineer specialising in Java/Spring Boot, React and Node.js/NestJS.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        {/* Skip navigation for keyboard / screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>

        <Header />

        <div id="main-content">
          {children}
        </div>

        <Footer />
        <ScrollToTop />
        <Toaster richColors position="top-right" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </body>
    </html>
  );
}
