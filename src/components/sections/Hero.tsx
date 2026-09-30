'use client';

import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const sliderSettings = {
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  speed: 1000,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 1500,
  cssEase: 'linear',
  responsive: [
    { breakpoint: 1290, settings: { slidesToShow: 4 } },
    { breakpoint: 600,  settings: { slidesToShow: 3 } },
    { breakpoint: 480,  settings: { slidesToShow: 3 } },
  ],
};

const techLogos = [
  { src: '/html.png',        alt: 'HTML' },
  { src: '/sass.png',        alt: 'Sass' },
  { src: '/tailwind.png',    alt: 'Tailwind CSS' },
  { src: '/javascript.png',  alt: 'JavaScript' },
  { src: '/reactjs.png',     alt: 'React' },
  { src: '/mongodb.png',     alt: 'MongoDB' },
  { src: '/expressjs.png',   alt: 'Express' },
  { src: '/nodejs.png',      alt: 'Node.js' },
  { src: '/graphql.png',     alt: 'GraphQL' },
  { src: '/nextjs.png',      alt: 'Next.js' },
  { src: '/java.png',        alt: 'Java' },
  { src: '/spring.png',      alt: 'Spring' },
  { src: '/spring-boot.png', alt: 'Spring Boot' },
  { src: '/mySQL.png',       alt: 'MySQL' },
  { src: '/postgres.png',    alt: 'PostgreSQL' },
  { src: '/docker.png',      alt: 'Docker' },
  { src: '/git.png',         alt: 'Git' },
];

export function Hero() {
  return (
    <div
      id="home"
      style={{
        backgroundImage: 'linear-gradient(115deg, #EEF7FB 0 57%, #48AFDE 0 100%)',
        minHeight: '500px',
        maxHeight: '1200px',
      }}
    >
      <div className="container m-auto">
        <div className="grid grid-cols-12">
          {/* Left: text content */}
          <div className="col-span-12 flex flex-col justify-center bg-white md:col-span-5 md:bg-transparent">
            <div className="container m-auto">
              <div className="py-20 pl-0 text-center sm:pl-10 md:py-0 md:pl-24 md:text-start">
                <p className="font-sans text-3xl text-brand md:text-base lg:text-2xl">
                  Hi There!
                </p>
                <h1 className="mt-5 font-display text-5xl text-brand-dark md:mt-3 md:text-5xl lg:text-7xl xl:text-7xl">
                  I&apos;m Nizar
                </h1>
                <h2 className="py-2 font-sans font-bold uppercase text-brand-dark md:text-xl">
                  Full Stack Engineer &amp; a University Teacher
                </h2>

                <Link
                  href="/#projects"
                  className="mt-8 inline-block rounded-lg bg-brand px-5 py-3 text-base font-bold uppercase text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-brand-dark hover:shadow-lg md:mt-5 md:px-5 md:py-2 md:text-xs lg:px-8 lg:py-3 lg:text-base xl:mt-10"
                >
                  Projects
                </Link>
                <a
                  href="#"
                  download=""
                  className="ml-10 mt-8 inline-block rounded-lg bg-brand-dark px-5 py-3 text-base font-bold uppercase text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-brand hover:shadow-lg md:mt-5 md:px-5 md:py-2 md:text-xs lg:px-8 lg:py-3 lg:text-base xl:mt-10"
                >
                  My Resume
                </a>
              </div>
            </div>
          </div>

          {/* Right: profile photo */}
          <div className="col-span-12 bg-[#D9EEF7] pt-[50px] md:col-span-7 md:bg-transparent md:pt-[130px]">
            <div className="container m-auto">
              <Image
                src="/profile.png"
                alt="Nizar Ilahi — Senior Full-Stack Engineer"
                width={600}
                height={700}
                className="w-full"
                priority
              />
            </div>
          </div>
        </div>

        {/* Tech logo slider */}
        <div className="container m-auto absolute">
          <div className="px-3">
            <div
              className="relative mx-auto -bottom-[70px] max-w-sm overflow-auto rounded-2xl bg-white px-5 z-20 md:max-w-xl lg:max-w-5xl lg:px-14 xl:max-w-6xl"
              style={{ boxShadow: '#48AFDE -10px 25px 50px 10px' }}
            >
              <div className="cursor-all-scroll py-10 md:py-6 lg:py-10">
                <Slider {...sliderSettings}>
                  {techLogos.map(({ src, alt }) => (
                    <Image
                      key={src}
                      src={src}
                      alt={alt}
                      width={50}
                      height={32}
                      className="h-12 w-auto cursor-pointer opacity-30 grayscale hover:opacity-100 hover:grayscale-0"
                    />
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
