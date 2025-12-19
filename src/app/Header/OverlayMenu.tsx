"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import menuIcon from "../assets/images/menu.png";
import brainWithAiTransparent from '../assets/images/BrainWithAiTransparent.png';
import templateIconOutline from '../assets/images/web-design-outline.png';
import templateIconColour from '../assets/images/web-design-colour.png';
import houseOutline from '../assets/images/house-outline.png';
import houseColour from '../assets/images/house-colour.png';
import blogColoured from '../assets/images/blog-coloured.png';
import blogOutline from '../assets/images/blog-outline.png';
import information from '../assets/images/information.png';
import informationWithColour from '../assets/images/information-with-colour.png';

export default function OverlayMenu({ isOpen, onClose }) {
    

    const pathname = usePathname(); // ⭐ Tracks route changes

    const isHomePage = pathname === "/";
    const isAboutPage = pathname === "/about";
    const isTemplatePage = pathname === "/template";
    const isLiveBlogs = pathname === "/LiveBlogs";

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={` fixed inset-0 bg-black/40 transition-opacity duration-300 z-[998]
                ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            />

            {/* Slide Panel */}
            <div
                className={`bg-[#FAF3E1] fixed top-0 left-0 h-full w-[12rem]  shadow-2xl transform 
                transition-transform duration-300 ease-out z-[999]
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="p-6 flex flex-col gap-4 text-lg">
                    <button
                        onClick={onClose}
                        className="text-gray-600 text-left flex flex-row items-center gap-2"
                    >
                        <Image src={menuIcon} alt="menu" className="w-7 h-7" />
                        <Image src={brainWithAiTransparent} alt="menu" className="w-10 h-auto" />
                    </button>

                    {/* Home */}
                    <a href="/" className={`flex flex-row gap-4 hover:text-blue-600 ${isHomePage ? "text-black" : "text-gray-500"}`}>
                        <Image src={isHomePage ? houseColour : houseOutline} alt="" className="w-8" />
                        Home
                    </a>

                    {/* About */}
                    <a href="/about" className={`flex flex-row gap-4 hover:text-blue-600 ${isAboutPage ? "text-black" : "text-gray-500"}`}>
                        <Image src={isAboutPage ? informationWithColour : information } alt="" className="w-8" />
                        About
                    </a>

                    {/* Template */}
                    <a href="/template" className={`flex flex-row gap-4 hover:text-blue-600 ${isTemplatePage ? "text-black" : "text-gray-500"}`}>
                        <Image src={isTemplatePage ? templateIconColour : templateIconOutline} alt="" className="w-8" />
                        Templates
                    </a>

                    {/* Blogs */}
                    <a href="/LiveBlogs" className={`flex flex-row gap-4 hover:text-blue-600 ${isLiveBlogs ? "text-black" : "text-gray-500"}`}>
                        <Image src={isLiveBlogs ? blogColoured : blogOutline} alt="" className="w-8" />
                        Blog
                    </a>
                </div>
            </div>
        </>
    );
}
