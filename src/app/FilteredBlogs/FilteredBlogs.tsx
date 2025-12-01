"use client"

import { RootState } from '@/store/store';
import React from 'react'
import { useSelector } from 'react-redux';
import blogsArray from '../data/blogs.json'
import Filteredblog from './Filteredblog/Filteredblog';
import PaginatedList from './Pagination';
import { Blog } from '../../../types';
import filtration from '../../Utils/Filtration'

const FilteredBlogs = () => {

    const itemsPerPage = 6;

    const searchTerm = useSelector((state: RootState) => state.ai.searchTerm)
    const isAutomation = useSelector((state: RootState ) => state.ai.isAutomation)
    const isImpactful = useSelector((state: RootState) => state.ai.isImpactful)
    const isFuture = useSelector((state: RootState) => state.ai.isFuture)
    const currentPage = useSelector((state: RootState) => state.ai.currentPage)


// Usage:
const filteredBlogs = filtration(blogsArray || [], { searchTerm, isAutomation, isImpactful, isFuture });


    return (
        <div>
            <Filteredblog filteredBlogs = {filteredBlogs}/>
            <PaginatedList filteredBlogs = {filteredBlogs}/>
        </div>
    )
}

export default FilteredBlogs
