    // components/Fv.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setSearchActive } from '@/store/features/counterSlice';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

export default function SearchWithSuggestions() {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchTerm = useSelector((state: RootState) => state.ai.searchTerm);
    const allBlogs = useSelector((state: RootState) => state.ai.allBlogs);
    
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef<HTMLDivElement>(null);

    // Generate suggestions based on search term
    useEffect(() => {
        if (searchTerm.length > 0) {
        const filtered = allBlogs.filter(blog => 
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.tags.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 5); // Limit to 5 suggestions

        setSuggestions(filtered);
        setShowSuggestions(true);
        } else {
        setSuggestions([]);
        setShowSuggestions(false);
        }
    }, [searchTerm, allBlogs]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setShowSuggestions(false);
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setSearchTerm(value));
        dispatch(setSearchActive(value.length > 0));
        setSelectedIndex(-1);
    };

    const handleSuggestionClick = (blog: any) => {
        dispatch(setSearchTerm(blog.title));
        dispatch(setSearchActive(true));
        setShowSuggestions(false);
        
        // Optionally navigate to the specific blog
        router.push(`/blogs/${blog.id}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showSuggestions) return;

        if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : prev
        );
        } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        handleSuggestionClick(suggestions[selectedIndex]);
        } else if (e.key === 'Escape') {
        setShowSuggestions(false);
        }
    };

    const highlightMatch = (text: string, query: string) => {
        if (!query) return text;
        
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) => 
        part.toLowerCase() === query.toLowerCase() ? 
            <span key={index} className="bg-yellow-200 font-semibold">{part}</span> : 
            part
        );
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-2xl">
        <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
            {suggestions.map((blog, index) => (
                <button
                key={blog.id}
                onClick={() => handleSuggestionClick(blog)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-100 last:border-b-0 ${
                    index === selectedIndex ? 'bg-blue-50' : ''
                }`}
                >
                <div className="flex items-start gap-3">
                    {/* Optional: Blog image thumbnail */}
                    {blog.image && (
                    <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-16 h-16 object-cover rounded"
                    />
                    )}
                    
                    <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                        {highlightMatch(blog.title, searchTerm)}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {blog.content.substring(0, 100)}...
                    </p>
                    <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        {blog.tags.split(',')[0]}
                        </span>
                        <span className="text-xs text-gray-500">
                        by {blog.author}
                        </span>
                    </div>
                    </div>
                </div>
                </button>
            ))}

            {/* Show "View all results" if there are more */}
            {allBlogs.filter(blog => 
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.tags.toLowerCase().includes(searchTerm.toLowerCase())
            ).length > 5 && (
                <button
                onClick={() => {
                    setShowSuggestions(false);
                    router.push(`/blogs?q=${encodeURIComponent(searchTerm)}`);
                }}
                className="w-full px-4 py-3 text-center text-blue-600 font-medium hover:bg-blue-50"
                >
                View all {allBlogs.filter(blog => 
                    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
                ).length} results →
                </button>
            )}
            </div>
        )}

        {/* No results message */}
        {showSuggestions && searchTerm.length > 0 && suggestions.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg p-4 z-50">
            <p className="text-gray-500 text-center">
                No articles found for "{searchTerm}"
            </p>
            </div>
        )}
        </div>
    );
}