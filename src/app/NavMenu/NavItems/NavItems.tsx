import React from 'react'
import blackCross from '../../assets/images/black-cross.png'
import Link from "next/link";
import Image from 'next/image';


// treating container as logic host and children as view templates -- best practice

// type NavItemsProps = {
//     toggleNav: () => void
// }


// const NavItems = ({toggleNav }: NavItemsProps ) => {
//     return (
//         <div className=' flex z-10 border-2 border-blue-200 fixed inset-0 items-center justify-center ' >
//             <div className='bg-black relative w-4/5 max-w-sm p-6 flex flex-col items-center rounded-lg border-2 border-yellow-200' >
//                 <Image
//                     src={blackCross}
//                     alt="Close menu"
//                     className=" top-8 right-8"
//                     onClick={toggleNav}
//                     />
//                     <Link href="/" className="nav-menu__item " onClick={toggleNav}>
//                         Home
//                     </Link>
//                     <Link href="/about" className="nav-menu__item" onClick={toggleNav}>
//                         About
//                     </Link>
//                     <Link href="/templates" className="nav-menu__item" onClick={toggleNav}>
//                         Templates
//                     </Link>
//             </div>
//         </div>
//     )
// }

// export default NavItems

type NavItemsProps = {
    onClose: any
}


export default function NavItems({ onClose }: NavItemsProps) {
    return (
        <>
        {/* Dark backdrop */}
        <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
        />

        {/* Slide-in menu */}
        <div
            className="
            fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-50
            transform transition-transform duration-300
            "
        >
            <div className="p-6 flex flex-col gap-4 text-lg">
            <button className="text-gray-600" onClick={onClose}>Close</button>
            <a href="#" className="hover:text-blue-500">Home</a>
            <a href="#" className="hover:text-blue-500">About</a>
            <a href="#" className="hover:text-blue-500">Blog</a>
            <a href="#" className="hover:text-blue-500">Contact</a>
            </div>
        </div>
        </>
    );
}

