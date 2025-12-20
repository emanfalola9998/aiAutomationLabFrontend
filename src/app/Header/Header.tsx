"use client";

import { useState } from "react";
import OverlayMenu from "./OverlayMenu";
import Image from "next/image";
import Link from "next/link";
import menuIcon from "../assets/images/menu.png";
import brainWithAiTransparent from '../assets/images/BrainWithAiTransparent.png'
import Search from "../Navbar/Search/Search";
import notifications from '../assets/images/notification.png'
import user from '../assets/images/user.png'
import createIconImage from '../assets/images/edit.png'
import { usePathname } from "next/navigation";



export default function Header() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname()

    return (
        <>
        <header className={` ${pathname == '/' ? "bg-[#FAF3E1]" : "bg-gray-100"} w-full flex justify-between items-center px-6 py-4 border-b relative z-[100]`}   >
            <div className="flex flex-row items-center gap-2">
                {/* Left section */}
                <div className="flex items-center gap-20">
                {/* Mobile trigger */}
                <button className="md:hidden" onClick={() => setOpen(true)}>
                    <Image src={menuIcon} alt="menu" className="w-7 h-7" />
                </button>

                </div>

                {/* Desktop nav -- old style at the top of screen */}
                {/* <nav className="hidden md:flex gap-6 text-lg">
                <Link href="/" className="hover:text-blue-600">Home</Link>
                <Link href="/about" className="hover:text-blue-600">About</Link>
                <Link href="/template" className="hover:text-blue-600">Templates</Link>
                </nav> */}

                {/* Desktop right-side trigger */}
                <button 
                    onClick={() => setOpen(true)} 
                    className="hidden md:block px-4 py-2   hover:bg-gray-100"
                >
                    <Image src={menuIcon} alt="menu" className="w-7 h-7" />
                </button>

                <Link href="/" className="text-xl font-bold">
                    <Image src={brainWithAiTransparent} alt="menu" className="w-10 h-auto" />
                </Link>

                <Search />
            </div>
                
            <div className="flex flex-row gap-3 ">
                <a href={'/Create'} className='flex gap-1 justify-center cursor-pointer'>
                    <Image src={createIconImage} alt="create"  className='w-5 h-5 '/> Create
                </a>
                <a href={'/Notifications'}> <Image src={notifications} alt="notification bell Icon" className="w-5 h-5 cursor-pointer"/></a>
                <a href={'/dashboard'}><Image src={user} alt="profile Icon" className="w-5 h-5 cursor-pointer" /></a>
            </div>
            


        </header>

        {/* Shared overlay */}
            <OverlayMenu isOpen={open} onClose={() => setOpen(false)} />


        </>
    );
}
