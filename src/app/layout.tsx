import type { Metadata } from 'next';
import './globals.css';
import { displayFont, bodyFont } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';

export const metadata: Metadata = {
  title: 'Nizar Ilahi — Senior Full-Stack Engineer',
  description:
    'Portfolio of Nizar Ilahi, Senior Full-Stack Engineer specialising in Java/Spring Boot, React and Node.js/NestJS.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
