"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import menuIcon from "../assets/images/menu.png";
import brainWithAiTransparent from '../assets/images/BrainWithAiTransparent.png';
import templateIconOutline from '../assets/images/web-design-outline.png'
import templateIconColour from '../assets/images/web-design-colour.png'
import houseOutline from '../assets/images/house-outline.png';
import houseColour from '../assets/images/house-colour.png'
import blogColoured from '../assets/images/blog-coloured.png';
import blogOutline from '../assets/images/blog-outline.png';




type OverlayMenuProps = {
    isOpen: boolean;
    onClose: any;
};

export default function OverlayMenu({ isOpen, onClose }: OverlayMenuProps) {
    // Disable scrolling when menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    const [isClicked, setIsClicked] = useState(false);
    const [isHomePage, setIsHomePage] = useState(false);
    const [isAboutPage, setIsAboutPage] = useState(false);
    const [isTemplatePage, setIsTemplatePage] = useState(false);
    const [isLiveBlogs, setIsLiveBlogs] = useState(false);

    // Check the current path when the component mounts
    useEffect(() => {
        if (typeof window !== "undefined") {
            const path = window.location.pathname;
            setIsHomePage(path === "/");
            setIsAboutPage(path === "/about");
            setIsTemplatePage(path === "/template");
            setIsLiveBlogs(path === "/LiveBlogs");
        }
    }, []); // Only run once after component mounts

    const handleClick = () => setIsClicked(!isClicked); // Toggle the clicked state

    // backdrop-blur-sm -- blur when menuOverlay is selected

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 
                transition-opacity duration-300
                z-[998]
                ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            />

            {/* LEFT-SIDE Slide-in panel */}
            <div
                className={`fixed top-0 left-0 h-full w-[12rem] bg-white shadow-2xl
                transform transition-transform duration-300 ease-out
                z-[999]
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

                    {/* Home Link */}
                    <a
                        href="/"
                        onClick={handleClick}
                        className={`hover:text-blue-600 flex flex-row gap-4 ${isHomePage || isClicked ? "text-black" : "text-gray-500"}`}
                    >
                        <Image 
                            src={isHomePage ? houseColour : houseOutline} alt="image of house icon" 
                            className="w-8" 
                        />
                        Home
                    </a>

                    {/* About Link */}
                    <a
                        href="/about"
                        onClick={handleClick}
                        className={ `flex flex-row gap-4 hover:text-blue-600 ${isAboutPage ? "text-black" : "text-gray-500"}`}
                    >
                        <Image 
                            src={houseOutline} alt="image of house icon" 
                            className="w-8" 
                        />
                        About
                    </a>

                    {/* Template Link */}
                    <a
                        href="/template"
                        onClick={handleClick}
                        className={`flex flex-row gap-4 hover:text-blue-600 ${isTemplatePage ? "text-black" : "text-gray-500"}`}
                    >
                        <Image 
                            src={isTemplatePage ? templateIconColour: templateIconOutline} alt="image of template icon" 
                            className='w-8'
                        />
                        Templates
                    </a>

                    {/* Blog Link */}
                    <a
                        href="/LiveBlogs"
                        onClick={handleClick}
                        className={`flex flex-row gap-4 hover:text-blue-600 ${isLiveBlogs ? "text-black" : "text-gray-500"}`}
                    >
                        <Image 
                            src={isLiveBlogs ? blogColoured: blogOutline} alt="image of blog icon" 
                            className="w-8" 
                        />
                        Blog
                    </a>
                </div>
            </div>
        </>
    );
}
