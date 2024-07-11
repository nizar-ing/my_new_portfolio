import Image from "next/image";
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {Hind} from 'next/font/google';
const hind = Hind({
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700']
});

export function HomeComponent() {

    let settings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        speed: 1000,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1500,
        loop: true,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1760,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 1460,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 1290,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },

            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
        ],

    };

    return (
        <>
            <div id="home" style={{
                backgroundImage: 'linear-gradient(115deg, #EEF7FB 0 57%, #48AFDE 0 100%)',
                width: '100%',
                height: '100%',
                minHeight: '500px',
                maxHeight: '1200px'
            }}
            >
                <div className="container m-auto">
                    <div className="grid grid-cols-12">
                        <div
                            className=" bg-white flex flex-col justify-center col-span-12 md:col-span-5 md:bg-transparent">
                            <div className="container m-auto">
                                <div className="text-center pl-0 py-20 lg:pl-24 sm:pl-10 md:py-0 md:text-start ">
                                    <p className={`text-[#47AEDE] text-3xl md:text-base lg:text-2xl ${hind.className}`}>
                                        Hi There!
                                    </p>
                                    <h1 className="text-[#223740] font-recoltaBlack text-5xl mt-5 md:text-5xl md:mt-3 lg:text-7xl xl:text-7xl ">
                                        I&apos;m Nizar
                                    </h1>
                                    <h2 className={`text-[#223740] font-bold py-2 uppercase md:text-xl ${hind.className}`}>
                                        Full Stack Web Developer &amp; a University Teacher
                                    </h2>

                                    <a
                                        href="/#portfolio"
                                        className={`inline-block bg-[#48AFDE] transition-all duration-300 ease-in-out rounded-lg  text-white hover:bg-[#223740] hover:shadow-lg transform hover:-translate-y-1 py-3 md:py-2 lg:py-3 px-5 lg:px-8 md:text-xs lg:text-base font-bold uppercase mt-8 md:mt-5 xl:mt-10 ${hind.className}`}
                                    >
                                        Projects
                                    </a>
                                    <a
                                        href="#"
                                        download=""
                                        className={`ml-10 inline-block bg-[#223740] transition-all duration-300 ease-in-out rounded-lg  text-white hover:bg-[#48AFDE] hover:shadow-lg transform hover:-translate-y-1 py-3 md:py-2 lg:py-3 px-5 lg:px-8 md:text-xs lg:text-base font-bold uppercase mt-8 md:mt-5 xl:mt-10 ${hind.className}`}
                                    >
                                        My Resume
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-span-12 md:col-span-7 pt-[50px] md:pt-[130px] bg-[#D9EEF7] md:bg-transparent">
                            <div className="container m-auto">
                                <img src="/profile.png" alt="profils pics" decoding="async"/>
                            </div>
                        </div>
                    </div>
                    <div className="container m-auto absolute">
                        <div className="px-3">
                            <div
                                className="relative max-w-sm bottom-[70px] md:max-w-xl lg:max-w-5xl xl:max-w-6xl lg:px-14 px-5 overflow-auto mx-auto bg-white rounded-2xl z-20 "
                                style={{
                                    boxShadow: "#48AFDE -10px 25px 50px 10px",
                                }}
                            >
                                <div className="lg:py-10 py-10 md:py-6 cursor-all-scroll">
                                    <Slider {...settings}>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/html.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer  "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/sass.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer  "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/tailwind.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer  "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/material-ui.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer  "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/bootstrap.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer  "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/javascript.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer  "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/reactjs.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer  "/>

                                        <Image
                                            height={8}
                                            width={50}
                                            src="/angular.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer  "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/mongodb.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer "/>

                                        <Image
                                            height={8}
                                            width={50}
                                            src="/expressjs.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/nodejs.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/graphql.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer "/>

                                        <Image
                                            height={8}
                                            width={50}
                                            src="/nextjs.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/php.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer  "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/java.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer  "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/spring.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer  "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/spring-boot.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer  "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/mySQL.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/postgres.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/docker.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer "/>
                                        <Image
                                            height={8}
                                            width={50}
                                            src="/git.png" alt=""
                                            className="h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 cursor-pointer "/>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
