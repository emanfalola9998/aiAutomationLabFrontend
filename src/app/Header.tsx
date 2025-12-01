import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"
import aiAutomationWithBrain from '../app/assets/images/BrainWithAiTransparent.png'
import Image from 'next/image'
import menu from '../app/assets/images/menu-icon.png'

const Header = () => {
    // Build separate header for when user is logged in
    return (
        <>        
        {/* bg-linear-to-r from-black to-gray-600 */}
            <div className=' bg-{#FAF3E1}  text-black flex items-center justify-between w-[100vw] px-40   ' >
                <div className='flex flex-row justify-around border-4'>
                    <Image 
                        src={menu}
                        alt="menu icon"
                    />
                    <Link href="/" className="font-white font-bold cursor-pointer hover:text-yellow-600" >
                        <Image 
                        src={aiAutomationWithBrain}
                        width={40}
                        alt="Image of a brain with ai attached"
                        />
                    </Link>
                </div>
                <div className='flex gap-2 flex-wrap'>
                    <Button variant="link" className=' border-none'>
                        <Link href="/" className="font-white font-bold cursor-pointer hover:text-yellow-600" >
                            Home
                        </Link>
                    </Button>
                    <Button variant="link" className=' border-none'>
                        <Link href="/about" className="font-white font-bold hover:text-yellow-600" >
                            About
                        </Link>
                    </Button>    
                    <Button variant="link" className=' border-none'>
                        <Link href="/template" className="font-white font-bold hover:text-yellow-600" >
                            Templates
                        </Link>
                    </Button>
                </div>

                    
            </div>
            <div className="h-px bg-black w-full"></div>
        </>
    )
}

export default Header
