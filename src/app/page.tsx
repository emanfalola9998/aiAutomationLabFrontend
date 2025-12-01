"use client";
import Image from 'next/image';
import aiDefaultImage from '../app/assets/images/What-is-AI-how-does-it-work.png'
import Link from 'next/link';
import blogs from '../app/data/blogs.json'
import brainTransparentwithAi from '../app/assets/images/BrainWithAiTransparent.png'
import Navbar from './Navbar/Navbar';
import MainBlog from './MainBlog/MainBlog';
import { Button } from '@/components/ui/button';






export default function Home() {
  return (
    // bg-linear-to-r from-[#4A70A9] to-black
    // bg-[#FAF3E1]
  <>
    <div className="bg-[#FAF3E1]">

      <div className=' text-center justify-center mb-10 flex flex-col  rounded-2xl items-center md:flex md:flex-row md:mb-60'>
        <div>
          {/*LandingPage*/}
          <h1 className="mt-4 font-bold text-xl mb-8 md:text-6xl bg-linear-to-r from-[#4A70A9] to-black bg-clip-text text-transparent ">Share your thoughts with us </h1>
          <p>Come to read, learn and discuss as a community</p>  
          
          <Button variant="default" className='mt-10 p-7 rounded-4xl font-bold cursor-pointer' >
            <Link href="/LiveBlogs" className="font-white font-bold cursor-pointer hover:text-yellow-600" >
              Join The Discussion
            </Link>
          </Button>

        </div>
        <Image 
          src={brainTransparentwithAi}
          alt="Brain"
          className='w-100 sm:max-w-100'
        />
        
      </div>
      {/* <MainBlog /> */}
      

    </div>
  </>

  );
}
