"use client";

import Image from 'next/image';
import Link from 'next/link';
import blogs from '../data/blogs.json'
import Navbar from '../Navbar/Navbar';
import aiDefaultImage from '../assets/images/What-is-AI-how-does-it-work.png'
import user from '../assets/images/user.png'
import formatDateWithConditionalYear from '@/Utils/date';
import heart from '../assets/images/heart.png'
import comment from '../assets/images/comment.png'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import filtration from '@/Utils/Filtration';
import { Button } from '@/components/ui/button';
import { toggleImpactful, toggleFuture, toggleAutomation } from '@/store/features/counterSlice';



const MainBlog = () => {

  const searchTerm = useSelector((state: RootState) => state.ai.searchTerm)
  const isAutomation = useSelector((state: RootState) => state.ai.isAutomation)
  const isImpactful = useSelector((state: RootState) => state.ai.isImpactful)
  const isFuture = useSelector((state: RootState) => state.ai.isFuture)


  const filteredBlogs = filtration(blogs, { searchTerm, isAutomation, isImpactful, isFuture })


  const dispatch = useDispatch();

  if (!filteredBlogs){
    return <div>blogs not found</div>

  }


  return (
    <div className='flex flex-row justify-center'>
      <div className='grid grid-cols-1 gap-2 p-2  md:m-10'>
        {filteredBlogs.map(blog => 
            <Link href={`/blog/${blog.id}`} key={blog?.id} className='lg:w-140 mx-20 flex flex-row justify-between items-center border-b border-gray-300/40 p-5 md:my-2 shadow-xl'>
              <div className='flex flex-col gap-4 '>
                <div className='flex flex-row gap-2 justify-start items-center '>
                  <Image src={user} alt="user icon image" className='w-6'/>{blog?.author?.toString()? blog.author.charAt(0).toUpperCase() + blog.author.slice(1): "Unknown author"}</div>
                  <div className='font-bold cursor-pointer'>{blog?.title}</div>
                <div className='flex flex-row text-gray-600 gap-4'>
                  <div className=''>{formatDateWithConditionalYear(blog.datePublished)}</div>
                  <div className='flex flex-row gap-1'><Image src={heart} alt="hear icon" className='w-5 h-5'/> 3 </div>
                  <div className='flex flex-row gap-1'><Image src={comment} alt="hear icon" className='w-5 h-5'/> 4 </div>
                </div>
              </div>

              <div className=''>
                <Image
                  src={blog.image || aiDefaultImage}
                  alt="default image of AI diagram"
                  className='md:w-50 cursor-pointer w-30'
                />
              </div>
            </Link>

        )}
        
      </div>

      <div className="sticky top-0 h-screen overflow-hidden hidden lg:flex md:flex-col md:gap-4 mt-8 m-10 rounded-2xl border-l border-gray-300/40 pl-10">
        <div className='flex flex-col gap-4'>
          <h1 className='mb-2 text-2xl'> Trending Topics</h1>

          <div className=' shadow-2xl text-black border-3 border-white p-4'>
            <h1 className='mb-2 font-bold'> Topic 1</h1>
            <p>brief description about trending ai article</p>
          </div>

          <div className=' shadow-2xl text-black border-3 border-white p-4'>
            <h1 className='mb-2 font-bold'> Topic 2</h1>
            <p>brief description about trending ai article</p>
          </div>

          <div className=' shadow-2xl  text-black border-3 border-white p-4'>
            <h1 className='mb-2 font-bold'> Topic 3</h1>
            <p>brief description about trending ai article</p>
          </div>

          <div className=' shadow-2xl text-black border-3 border-white p-4'>
            <h1 className='mb-2 font-bold'> Topic 4</h1>
            <p>brief description about trending ai article</p>
          </div>

        </div>

        <div className='flex flex-col gap-4 w-30 justify-center  '>

          <div className=''>
            <h1>Recommended Subjects</h1>
          </div>

          <div className='flex flex-row gap-4'>
            <Button
              className={isImpactful ? " bg-black" : "bg-gray-600"}
              onClick={() => {
                dispatch(toggleImpactful(!isImpactful))
                dispatch(toggleFuture(false))
                dispatch(toggleAutomation(false))
                }
              }

            >
              Impactful
            </Button> 

            <Button
              className={isFuture ? " bg-black" : "bg-gray-600"}
              onClick={() => {
                dispatch(toggleImpactful(false))
                dispatch(toggleFuture(!isFuture))
                dispatch(toggleAutomation(false))
                }
              }
            >
              Future
            </Button> 

            <Button
              className={isAutomation ? " bg-black" : "bg-gray-600"}
              onClick={() => {
                dispatch(toggleImpactful(false))
                dispatch(toggleFuture(false))
                dispatch(toggleAutomation(!isAutomation))
                }
              }
            >
              Automation
            </Button>
          </div>
        </div>


        </div>
        
    </div>




  )
}

export default MainBlog
