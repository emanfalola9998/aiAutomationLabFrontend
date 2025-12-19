"use client"
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setSearchActive, setIsAutomation, setIsFuture, setIsImpactful } from "@/store/features/counterSlice";
import debounce from "lodash/debounce";
import Image from "next/image";
import searchIcon from "@/app/assets/images/search.png";
import React, { useCallback, useState } from "react";


const Search = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const [localSearch, setLocalSearch] = useState("");


  const debouncedUpdateRedux = useCallback(
    debounce((value: string) => {
      dispatch(setSearchTerm(value));
    }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Fast UI update
    setLocalSearch(value);

    // Slow Redux update
    debouncedUpdateRedux(value);

    dispatch(setSearchActive(value.trim().length > 0));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && localSearch.trim() !== "") {
      router.push(`/LiveBlogs?query=${encodeURIComponent(localSearch)}`);
    }
    dispatch(setIsAutomation(false))
    dispatch(setIsFuture(false))
    dispatch(setIsImpactful(false))
  };


  return (
    <div className='flex md:gap-2 gap-1 bg-gray-200 rounded-2xl p-2 md:w-50 w-20 h-10' >
      <Image 
        src={searchIcon}
        alt="search Icon"
        className="w-6"
      />
      <label></label>
      <input 
        value={localSearch}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder='Search'
        className="w-full bg-transparent text-lg focus:outline-none transition-colors"
      />
  </div>
  )
}

export default Search
