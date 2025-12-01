"use client"

import React from 'react'
import Navbar from '../Navbar/Navbar'
import FilteredBlogs from '../FilteredBlogs/FilteredBlogs'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import Filteredblog from '../FilteredBlogs/Filteredblog/Filteredblog';
import Search from '../Navbar/Search/Search';
import { setSearchTerm } from '@/store/features/counterSlice';
import filtration from '@/Utils/Filtration';
import blogsArray from '../data/blogs.json'



const Blog = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector((state: RootState) => state.ai.searchTerm)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement> ) => 
    dispatch(setSearchTerm(e.target.value.trim().toLowerCase()))

  const filteredBlogs = useSelector((state: RootState) => state.ai.filteredBlogs);

  const filteredBlogsWithSearch = filteredBlogs.filter(blog =>
    !searchTerm || blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
  <div>
      <label className=''>🔍</label>
      <input 
        value={searchTerm}
        onChange={handleInput}
        placeholder='Topic...'
        className='mx-2  mt-6 rounded-2xl border-2 border-white p-2'
      />
      <Filteredblog filteredBlogs={filteredBlogsWithSearch}/>
    </div>
  )
}

export default Blog

