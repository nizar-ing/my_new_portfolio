'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProjectCard from './ProjectCard';
import { projects } from '@/content/projects';

const settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 500,
  arrows: false,
  centerMode: true,
  centerPadding: '400px',
  dots: true,
  responsive: [
    { breakpoint: 1700, settings: { centerPadding: '400px', dots: true } },
    { breakpoint: 1550, settings: { centerPadding: '350px', dots: true } },
    { breakpoint: 1450, settings: { centerPadding: '300px', dots: true } },
    { breakpoint: 1400, settings: { centerPadding: '250px', dots: true } },
    { breakpoint: 1250, settings: { centerPadding: '200px', dots: true } },
    { breakpoint: 1150, settings: { centerPadding: '170px', dots: true } },
    { breakpoint: 1024, settings: { centerPadding: '230px', dots: true } },
    { breakpoint: 980, settings: { centerPadding: '200px', dots: true } },
    { breakpoint: 920, settings: { centerPadding: '170px', dots: true } },
    { breakpoint: 860, settings: { centerPadding: '130px', dots: true } },
    { breakpoint: 780, settings: { centerPadding: '100px', dots: true } },
    { breakpoint: 765, settings: { centerPadding: '170px', dots: true } },
    { breakpoint: 640, settings: { centerPadding: '0', centerMode: false, dots: false } },
  ],
};

const featuredProjects = projects.filter((p) => p.featured);

export default function ProjectCarousel() {
  return (
    <div>
      <Slider {...settings}>
        {featuredProjects.map((project) => (
          <div key={project.slug} className="my-slider">
            <ProjectCard project={project} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
