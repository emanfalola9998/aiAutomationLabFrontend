"use client"

import { setFilteredBlogs, setIsAutomation, setIsFuture, setIsImpactful, setSearchTerm } from '@/store/features/counterSlice'
import { RootState } from '@/store/store'
import Search from './Search/Search'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogsArray from '../data/blogs.json'

const Navbar = () => {
    const isAutomation = useSelector((state: RootState) => state.ai.isAutomation)
    const isImpactful = useSelector((state: RootState) => state.ai.isImpactful)
    const isFuture = useSelector((state: RootState) => state.ai.isFuture)


    // const handleAutomation = () => {
    //     dispatch(setIsAutomation(!isAutomation))
    // }

    const handleAutomation = () => {
        const filtered = blogsArray.filter(blog => blog.tags === "automation");
        dispatch(setFilteredBlogs(filtered));
    }

    //     const handleImpactful = () => {
    //     dispatch(setIsImpactful(!isImpactful))
    // }

    const handleImpactful = () => {
        const filtered = blogsArray.filter(blog => blog.tags === "impactful");
        dispatch(setFilteredBlogs(filtered));
    }


    //     const handleFuture = () => {
    //     dispatch(setIsFuture(!isFuture))
    // }

    const handleFuture = () => {
        const filtered = blogsArray.filter(blog => blog.tags === "future");
        dispatch(setFilteredBlogs(filtered));
    }




    return (
        <div>
            <Search
                searchTerm={searchTerm}
                handleInput={handleInput}
            />
            {/* <ArticleNavigation /> */}
            
        </div>
    )
}

export default Navbar

