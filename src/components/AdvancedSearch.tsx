// components/AdvancedSearch.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Image from 'next/image'
import searchIcon from "@/app/assets/images/search.png";


export default function AdvancedSearch() {
const allBlogs = useSelector((state: RootState) => state.ai.allBlogs);
const [searchTerm, setSearchTerm] = useState('');
const [suggestions, setSuggestions] = useState({
    blogs: [] as any[],
    tags: [] as string[],
    authors: [] as string[],
});

useEffect(() => {
    if (searchTerm.length > 0) {
    // Blog suggestions
    const matchingBlogs = allBlogs
        .filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 3);

    // Tag suggestions
    const allTags = [...new Set(allBlogs.flatMap(blog => 
        blog.tags.split(',').map(tag => tag.trim())
    ))];
    const matchingTags = allTags
        .filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 3);

    // Author suggestions
    const allAuthors = [...new Set(allBlogs.map(blog => blog.author))];
    const matchingAuthors = allAuthors
        .filter(author => author.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 3);

    setSuggestions({
        blogs: matchingBlogs,
        tags: matchingTags,
        authors: matchingAuthors,
    });
    } else {
    setSuggestions({ blogs: [], tags: [], authors: [] });
    }
}, [searchTerm, allBlogs]);

return (
    <div className="relative">
    <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search articles, tags, or authors..."
        className="w-full px-4 py-3 border rounded-lg"
    />
    <Image 
        src={searchIcon}
        alt="search Icon"
        className="w-6"
    />

    {searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50">
        {/* Articles */}
        {suggestions.blogs.length > 0 && (
            <div className="p-2 border-b">
            <p className="text-xs font-semibold text-gray-500 px-2 mb-2">ARTICLES</p>
            {suggestions.blogs.map(blog => (
                <div key={blog.id} className="px-2 py-2 hover:bg-gray-100 rounded">
                <p className="font-medium">{blog.title}</p>
                <p className="text-sm text-gray-500">{blog.author}</p>
                </div>
            ))}
            </div>
        )}

        {/* Tags */}
        {suggestions.tags.length > 0 && (
            <div className="p-2 border-b">
            <p className="text-xs font-semibold text-gray-500 px-2 mb-2">TAGS</p>
            {suggestions.tags.map(tag => (
                <div key={tag} className="px-2 py-2 hover:bg-gray-100 rounded">
                <span className="text-blue-600">#{tag}</span>
                </div>
            ))}
            </div>
        )}

        {/* Authors */}
        {suggestions.authors.length > 0 && (
            <div className="p-2">
            <p className="text-xs font-semibold text-gray-500 px-2 mb-2">AUTHORS</p>
            {suggestions.authors.map(author => (
                <div key={author} className="px-2 py-2 hover:bg-gray-100 rounded">
                <p>{author}</p>
                </div>
            ))}
            </div>
        )}
        </div>
    )}
    </div>
);

}