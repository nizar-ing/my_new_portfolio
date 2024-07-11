'use client';
import {HomeComponent} from "@/app/components/Home/HomeComponent";

import {Hind} from 'next/font/google';
import MySlider from "@/app/components/SliderCard/MySlider";

const hind = Hind({
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700']
});

export default function Home() {
    return (
        <main className="min-h-screen relative">
            <HomeComponent/>
            <div id="portfolio" className="mt-0 -mb-40 pt-5" style={{
                backgroundImage: "linear-gradient(110deg, #EEF7FB 0 50%, white 0 100%)",
                width: "100%"
            }}>
                <div className="container m-auto">
                    <p className="text-[300px] text-[#F7FBFD] px-5 md:pl-[50px] w-full max-w-[750px] overflow-hidden"
                       style={{
                           transform: "translate(0, -20px)"
                       }}>
                        portfolio
                    </p>
                    <div style={{transform: "translate(0, -300px)"}}>
                        <p className="text-[#48AFDE] text-5xl px-5 md:pl-[80px] font-extrabold ">
                            Recent works
                        </p>
                        <p className={`text-[16px] text-[#47626D] leading-8 max-w-2xl mt-5 px-5 md:pl-[80px] ${hind.className}`}>
                            Here are a few of my most recent works. As a web designer and full-stack web developer, I
                            constantly prioritise 100% client satisfaction. I always enjoy working on my projects, so
                            each one is a new adventure for me. While working on each new project, I attempt to learn
                            new things. As a result, my paintings are always current and one-of-a-kind.
                        </p>
                    </div>
                </div>
                <div
                    style={{transform: "translate(0px,-240px)"}}
                >
                    <MySlider/>
                </div>
            </div>
        </main>
    )
}
