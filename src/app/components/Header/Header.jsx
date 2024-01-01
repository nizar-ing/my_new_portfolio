'use client';
import {useEffect, useState} from "react";

import Drawer from './DiagonalDrawer';
import '../Header/DiagonalDrawer.css';
export function Header() {
    const [selectedIndex1, setSelectedIndex1] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return() => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const openDrawer = () => {
        setIsOpen(true);
    };
    return (
       <>
           <div className={`diagonal-drawer ${isOpen ? "open" : ""}`}>
               <Drawer
                   isOpen={isOpen}
                   setIsOpen={setIsOpen}
                   selectedIndex1={selectedIndex1}
                   setSelectedIndex1={setSelectedIndex1}
               />
           </div>
           <header className={`${isScrolled ? "headerShow" : ""} w-full fixed top-0 z-50 transition-all duration-500`} style={{
               backgroundColor: isScrolled ? "#fff" : "transparent",
               boxShadow:  isScrolled ? "#48afde -10px 25px 50px 10px" : ""
           }}>
               <div className="relative">
                   <div className="z-30 absolute cursor-pointer w-14 lg:w-24 h-14 lg:h-24 bg-[#48AFDE] flex justify-center items-center rounded-br-3xl" onClick={openDrawer}>
                      <div className="relative w-7 lg:w-10 h-7 lg:h-10 flex justify-center items-center">
                          <img src="/drawer.png" alt="drawer item" className="w-[150px] h-10"/>
                      </div>
                   </div>
               </div>
               <nav className="invisible xl:visible xl:max-w-4xl mx-auto ">
                   <ul className="flex font-recoletaBlack flex-row items-center h-24">
                       <li className="group text-2xl relative font-bold mr-20">
                           {selectedIndex1 === 0 ? (
                               <span
                                   className="menu-effect transform opacity-100 -rotate-12 group-hover:-rotate-12 group-hover:opacity-100"></span>
                           ) : (
                               <span
                                   className="menu-effect transform opacity-0 rotate-12 group-hover:-rotate-12 group-hover:opacity-100"></span>
                           )}
                           <a href="/#home"
                              className={`menu-item ${selectedIndex1 === 0 ? "text-black" : ""} text-[#666d47] group-hover:text-black`}
                              onClick={() => setSelectedIndex1(0)}
                           >
                               Home
                           </a>
                       </li>
                       <li className="group text-2xl relative font-bold mr-20">
                           {selectedIndex1 === 1 ? (
                               <span
                                   className="menu-effect transform opacity-100 -rotate-12 group-hover:-rotate-12 group-hover:opacity-100 "/>
                           ) : <span
                               className="menu-effect transform opacity-0 rotate-12 group-hover:-rotate-12 group-hover:opacity-100 "/>}
                           <a href="/#portfolio"
                              className={`menu-item ${selectedIndex1 === 1 ? "text-black" : ""} text-[#666d47] group-hover:text-black`}
                              onClick={() => setSelectedIndex1(1)}
                           >
                               Portfolio
                           </a>
                       </li>
                       <li className="group text-2xl relative font-bold mr-20">
                           {selectedIndex1 === 2 ? (
                               <span
                                   className="menu-effect transform opacity-100 -rotate-12 group-hover:-rotate-12 group-hover:opacity-100 "/>
                           ) : <span
                               className="menu-effect transform opacity-0 rotate-12 group-hover:-rotate-12 group-hover:opacity-100 "/>}
                           <a href="/#about-me-component"
                              className={`menu-item ${selectedIndex1 === 2 ? "text-black" : ""} text-[#666d47] group-hover:text-black`}
                              onClick={() => setSelectedIndex1(2)}
                           >
                               About Me
                           </a>
                       </li>
                       <li className="group text-2xl relative font-bold mr-20">
                           {selectedIndex1 === 3 ? (
                               <span
                                   className="menu-effect transform opacity-100 -rotate-12 group-hover:-rotate-12 group-hover:opacity-100 "/>
                           ) : <span
                               className="menu-effect transform opacity-0 rotate-12 group-hover:-rotate-12 group-hover:opacity-100 "/>}
                           <a href="/#hire-me-component"
                              className={`menu-item ${selectedIndex1 === 3 ? "text-black" : ""} text-[#666d47] group-hover:text-black`}
                              onClick={() => setSelectedIndex1(3)}
                           >
                               Hire Me
                           </a>
                       </li>
                   </ul>
               </nav>
           </header>
       </>
    );
}