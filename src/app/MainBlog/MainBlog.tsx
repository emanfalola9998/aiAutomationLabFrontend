"use client";

import Image from 'next/image';
import Link from 'next/link';
import aiDefaultImage from '../assets/images/What-is-AI-how-does-it-work.png'
import user from '../assets/images/user.png'
import formatDateWithConditionalYear from '@/Utils/date';
import heart from '../assets/images/heart.png'
import comment from '../assets/images/comment.png'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import filtration from '@/Utils/Filtration';
import { Button } from '@/components/ui/button';
import { toggleImpactful, toggleFuture, toggleAutomation, setIsLoading } from '@/store/features/counterSlice';
import { motion, AnimatePresence } from "framer-motion";
import "../../Utils/fetchBlogs"
import TrendingTopics from '@/Utils/trendingTopics';
import LandingSpinner from '../../Utils/LoadingSpinner'
import { useFetchBlogs } from '@/Utils/useFetchBlogs';
import { CommentCount } from '@/Utils/commentCount';


const MainBlog = () => {
  const isLoading = useSelector((state: RootState) => state.ai.isLoading)
  const searchTerm = useSelector((state: RootState) => state.ai.searchTerm)
  const isAutomation = useSelector((state: RootState) => state.ai.isAutomation)
  const isImpactful = useSelector((state: RootState) => state.ai.isImpactful)
  const isFuture = useSelector((state: RootState) => state.ai.isFuture)
  const searchActive = useSelector((state: RootState) => state.ai.searchActive)
  const allBlogs = useFetchBlogs()
  const commentsPerBlog = useSelector((state: RootState) => state.ai.commentsByBlog)

  const filteredBlogs = filtration(allBlogs, {isAutomation, isImpactful, isFuture })
  const dispatch = useDispatch();

  // console.log(commentsPerBlog(blog.id).length)
    console.log("comments: ", commentsPerBlog)


  const animationKey = `${isAutomation}-${isImpactful}-${isFuture}`;
  const filteredBlogsBySearch = allBlogs.filter(blog => blog.tags.toLowerCase().includes(searchTerm) || blog.author.toLowerCase() == searchTerm || blog.title.toLowerCase().includes(searchTerm))
  const anyFilterActive = isAutomation || isImpactful || isFuture;
    

    if (isLoading) return <LandingSpinner fullScreen />;

    if (!filteredBlogs){
      return <div>blogs not found</div>
    }


  return (
    <>
      <div className='flex flex-row justify-center items-start text-2xl  '>
      <div  key={animationKey} className={`grid grid-cols-1 gap-2 md:p-2 animate-fadeInList  `} >
        {!anyFilterActive && searchTerm && <h1> <span className='text-blue-500'>You searched for</span> "{searchTerm}"</h1>}

        <AnimatePresence>
          {(( !anyFilterActive && searchActive ) ? filteredBlogsBySearch : filteredBlogs).map(blog => 
            <motion.div
              key={blog.id}  // Unique key for each item
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/blog/${blog.id}`} className=' p-10  animate-fadeInList flex flex-row justify-between items-center border-b border-gray-300/40 md:p-5 md:my-2'>
                <div className='flex flex-col gap-4 p-5'>
                  <div className='flex flex-row gap-2 justify-start items-center'>
                    <Image src={user} alt="user icon image" className='w-6' />
                    <span className='text-sm'>
                      {blog?.author?.toString() ? blog.author.charAt(0).toUpperCase() + blog.author.slice(1) : "Unknown author"}
                    </span>
                  </div>
                  <div className='font-bold cursor-pointer'>{blog?.title}</div>
                  <div className='flex flex-row text-gray-600 gap-4 items-center'>
                    <div className='text-sm'>{formatDateWithConditionalYear(blog.datePublished)}</div>
                    <div className='flex flex-row gap-1'>
                      <Image src={heart} alt="heart icon" className='w-4 h-4'/>
                      <span className='text-xs'>{blog.likes}</span>
                    </div>
                    <div className='flex flex-row gap-1'>
                      <span className='text-xs'> <CommentCount blogId={blog.id}/> </span>
                    </div>
                  </div>
                </div>

                <div className='relative w-20 h-20 shrink-0'>
                  <Image
                    src={blog.image || aiDefaultImage}
                    alt="default image of AI diagram"
                    className='rounded-lg object-cover '
                    fill
                  />
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

      </div>  
            <div className="text-xl sticky top-0 h-screen overflow-hidden hidden lg:flex md:flex-col md:gap-4 mt-8 m-10  border-l border-gray-300/40 pl-10">
              <TrendingTopics />
              <div className='flex flex-col gap-4  justify-center w-80 text-xl '>

              <div className=''>
                  <h1>Recommended Subjects</h1>
              </div>

              <div className='flex flex-row gap-4 w-70'>
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
    </>
    




  )
}

export default MainBlog


