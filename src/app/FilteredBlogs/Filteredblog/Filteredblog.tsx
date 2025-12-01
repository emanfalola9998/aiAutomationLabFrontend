import Link from 'next/link'
import React from 'react'
import aiDefaultImage from '../../../app/assets/images/What-is-AI-how-does-it-work.png'
import Image from 'next/image';
import { Blog } from '../../../../types';


type FilteredBlogType = {
    filteredBlogs: Blog[]
}

const Filteredblog = ({filteredBlogs}: FilteredBlogType) => {

    return (
        <div className="grid grid-cols-1 grid-rows-3 sm:grid-cols-4 sm:grid-rows-2 justify-center gap-4 m-10  ">
            {filteredBlogs.map((blog) => (
                <div key={blog.id} className=''>
                <Link href={`/blog/${blog.id}`}>
                    <Image 
                    src={blog.image || aiDefaultImage}
                    alt="image of word ai"
                />
                <h2 className="text-xl font-bold mt-2">{blog.title}</h2>
                </Link>
                <p className="text-gray-400 mt-2 line-clamp-2">{blog.content}</p>
                </div>
            ))}

        </div>
    )
}

export default Filteredblog
