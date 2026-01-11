// components/Search.tsx
"use client"
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setSearchActive, setIsAutomation, setIsFuture, setIsImpactful } from "@/store/features/counterSlice";
import debounce from "lodash/debounce";
import Image from "next/image";
import searchIcon from "@/app/assets/images/search.png";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { RootState, AppDispatch } from "@/store/store";
import { createPortal } from "react-dom";
import { useFetchBlogs } from "@/Utils/useFetchBlogs"; // Import your hook

const Search = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  // Fetch blogs when component mounts (works on any page)
  const allBlogs = useFetchBlogs(); // This ensures blogs are loaded
  
  const [localSearch, setLocalSearch] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedUpdateRedux = useCallback(
    debounce((value: string) => {
      dispatch(setSearchTerm(value));
    }, 300),
    []
  );

  // Update dropdown position when shown
  useEffect(() => {
    if (showSuggestions && searchRef.current) {
      const rect = searchRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [showSuggestions]);

  // Generate suggestions
  useEffect(() => {
    if (localSearch.trim().length > 0 && allBlogs.length > 0) { // Check allBlogs exists
      const filtered = allBlogs.filter(blog => 
        blog.title.toLowerCase().includes(localSearch.toLowerCase()) ||
        blog.tags.toLowerCase().includes(localSearch.toLowerCase()) ||
        blog.author.toLowerCase().includes(localSearch.toLowerCase()) ||
        blog.content.toLowerCase().includes(localSearch.toLowerCase())
      ).slice(0, 5);

      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [localSearch, allBlogs]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    debouncedUpdateRedux(value);
    dispatch(setSearchActive(value.trim().length > 0));
    setSelectedIndex(-1);
  };

  const handleSearch = () => {
    if (localSearch.trim() !== "") {
      dispatch(setSearchTerm(localSearch));
      dispatch(setSearchActive(true));
      dispatch(setIsAutomation(false));
      dispatch(setIsFuture(false));
      dispatch(setIsImpactful(false));
      setShowSuggestions(false);
      router.push(`/LiveBlogs?query=${encodeURIComponent(localSearch)}`);
    }
  };

  const handleSuggestionClick = (blog: any) => {
    
    setLocalSearch('');
    dispatch(setSearchTerm(blog.title));
    dispatch(setSearchActive(true));
    setShowSuggestions(false);
    
    router.push(`/LiveBlogs?query=${encodeURIComponent(blog.title)}`);
};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" && showSuggestions) {
      e.preventDefault();
      setSelectedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : prev);
    } else if (e.key === "ArrowUp" && showSuggestions) {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
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

  // Suggestions Dropdown Component
const SuggestionsDropdown = () => (
  <div 
    style={{
      position: 'absolute',
      top: `${dropdownPosition.top + 8}px`,
      left: `${dropdownPosition.left}px`,
      width: `${dropdownPosition.width}px`,
      zIndex: 9999,
      pointerEvents: 'auto' // Add this
    }}
    className="bg-white text-black border-2 border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto"
    onMouseDown={(e) => e.stopPropagation()} // Prevent closing when clicking inside
  >
    {suggestions.length > 0 ? (
      <>
        {suggestions.map((blog, index) => (
          <div // Change button to div
            key={blog.id}
            onMouseDown={(e) => { // Use onMouseDown instead of onClick
              e.preventDefault();
              e.stopPropagation();
              handleSuggestionClick(blog);
            }}
            className={`w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-100 last:border-b-0 transition-colors cursor-pointer ${
              index === selectedIndex ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              {blog.image && (
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-12 h-12 object-cover rounded shrink-0"
                />
              )}
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1 truncate">
                  {highlightMatch(blog.title, localSearch)}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {blog.content.substring(0, 80)}...
                </p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {blog.tags.split(',')[0].trim()}
                  </span>
                  <span className="text-xs text-gray-500">
                    by {blog.author}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="px-4 py-3 bg-gray-50 border-t text-center">
          <span className="text-sm text-gray-600">
            Press <kbd className="px-2 py-1 bg-white border rounded text-xs">Enter</kbd> to search all results
          </span>
        </div>
      </>
    ) : localSearch.trim().length > 0 && (
      <div className="p-4">
        <p className="text-gray-500 text-center mb-2">
          No exact matches for "<span className="font-semibold">{localSearch}</span>"
        </p>
        <div // Change button to div with onMouseDown
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSearch();
          }}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer text-center"
        >
          Search for similar articles →
        </div>
      </div>
    )}
  </div>
);

  return (
    <>
      <div ref={searchRef} className='flex md:gap-2 gap-1 bg-gray-200 rounded-2xl p-2 md:w-50 w-20 h-10'>
        <Image 
          src={searchIcon}
          alt="search Icon"
          className="w-6"
        />
        <input 
          value={localSearch}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder='Search'
          className="w-full bg-transparent text-lg focus:outline-none transition-colors"
        />
      </div>

      {/* Render suggestions in a portal */}
      {showSuggestions && typeof window !== 'undefined' && 
        createPortal(<SuggestionsDropdown />, document.body)
      }
    </>
  );
};

export default Search;