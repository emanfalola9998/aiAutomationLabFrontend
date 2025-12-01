"use client";

import NavItems from './NavItems/NavItems'
import React, { useState } from 'react'
import menu from '../assets/images/menu-icon.png'
import Image from 'next/image';
import Header from '../Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setShowNav } from '@/store/features/counterSlice';

// const NavMenu = () => {
//     // props method
//     // const [showNav, setShowNav] = useState(false); 
//     // const toggleNav = () => {
//     //     setShowNav(!showNav);
//     // };

//     // Redux method
//     const showNav = useSelector((state: RootState) => state.ai.showNav)
//     const dispatch = useDispatch()
//     const toggleNav = () => dispatch(setShowNav(!showNav))

//     return (
//     <div>
//                     {/* <div className='block md:hidden'>{showNav && <NavItems toggleNav={toggleNav} />}</div> */}

//         <nav className='flex justify-between items-center: center pt-0 px-{3.125rem}'>
//             <div className='block md:hidden'>
//                 <Image
//                     src={menu}
//                     alt="menu icon"
//                     onClick={toggleNav}
//                     className="cursor-pointer"
//                 />
//             </div>

//             <div className='hidden md:block'><Header /> </div>
//             <div className='block md:hidden items-center'>
//                 {!showNav && <Image
//                     src={menu}
//                     className="h-1.75rem border-4 border-amber-300 "
//                     alt="menu icon"
//                     onClick={toggleNav}
//                 />}
//             </div>
//         </nav>
//     </div>
//     )
// }

// export default NavMenu


export default function NavMenu() {
    const [showNav, setShowNav] = useState(false);

    return (
        <>
        {/* Top Navbar */}
        <nav className="flex justify-between items-center px-6 py-4 z-50 relative">
            {/* Mobile menu (slide-in) */}
            <div className="block md:hidden">
            {showNav && <NavItems onClose={() => setShowNav(false)} />}
            </div>

            {/* Desktop menu */}
            <div className="hidden md:block">
            <Header />
            </div>

            {/* Mobile Menu Button */}
            <div className="block md:hidden">
            {!showNav && (
                <Image
                src={menu}
                alt="menu icon"
                className="h-8 w-8"
                onClick={() => setShowNav(true)}
                />
            )}
            </div>
        </nav>
        </>
    );
}
