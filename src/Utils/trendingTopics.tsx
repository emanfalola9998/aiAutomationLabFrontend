import Link from "next/link"
import Image from "next/image"
import React from 'react'
import formatDateWithConditionalYear from "./date";
import {useSelector } from "react-redux";
import { RootState } from "@/store/store";
import user from '../app/assets/images/user.png'
import heart from '../app/assets/images/heart.png'

const trendingTopics = () => {

    const allBlogs = useSelector((state:RootState) => state.ai.allBlogs)

    const sortedBlogs = [...allBlogs].sort((a, b) => {
        return b.likes - a.likes;
    });


    return (
        <>
            <div className='flex flex-col gap-4'>
                <h1 className='mb-2 text-2xl '> Trending Topics</h1>
                {sortedBlogs.slice(0, 3).map(blog => <div key={blog.id}>
                    <Link href={`/blog/${blog.id}`} className='flex flex-col gap-2  text-black border-b  p-4'>
                        <div className='flex flex-row gap-1 font-bold'><Image src={user} alt="user icon image" className='w-6 ' /><span className='text-sm'>{blog?.author?.toString() ? blog.author.charAt(0).toUpperCase() + blog.author.slice(1) : "Unknown author"}</span></div>
                        <h1 className='mb-2 font-bold'> {blog.title}</h1>
                        <div className='flex flex-row gap-3 items-center'>
                            <div>{formatDateWithConditionalYear(blog.datePublished)}</div>
                            <div className='flex flex-row gap-1'><Image src={heart} alt="heart icon" className='w-4 h-4' /> <span className='text-xs'>{blog.likes}</span> </div>
                        </div>
                    </Link>
                </div>
                )}
            </div>
        </>


    )
}

export default trendingTopics
function dispatch() {
    throw new Error("Function not implemented.");
}

