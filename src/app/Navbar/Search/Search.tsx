"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "@/store/features/counterSlice";
import { RootState } from "@/store/store";
import searchIcon from '@/app/assets/images/search.png'


type SearchProps = {

  // searchTerm: string
  // handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  // isAutomation: boolean
  // handleAutomation: () => void
  // isImpactful: boolean
  // handleImpactful: () => void
  // isFuture: boolean
  // handleFuture: () => void

}

const Search = () => {

  const searchTerm = useSelector((state: RootState) => state.ai.searchTerm)
  const dispatch = useDispatch()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement> ) => 
    dispatch(setSearchTerm(e.target.value.trim().toLowerCase()))
  const router = useRouter();


  return (
    <div className='flex md:gap-2 gap-1 bg-gray-200 rounded-2xl p-2 w-50 h-10' >
      <Image 
        src={searchIcon}
        alt="search Icon"
        className="w-6"
      />
      <label></label>
      <input 
        value={searchTerm}
        onInput={handleInput}
        placeholder='Search'
        className="w-full bg-transparent text-lg focus:outline-none transition-colors"
      />
        {/* <Button
          variant="black"
          className="text-white font-bold hover:text-yellow-600"
          onClick={() => {
            handleAutomation();      // filter blogs and store in Redux
            router.push("/blog"); // navigate to page that reads filteredBlogs from store
          }}
        >
          Automation
        </Button>

        <Button
          variant="black"
          className="text-white font-bold hover:text-yellow-600"
          onClick={() => {
            handleFuture();      // filter blogs and store in Redux
            router.push("/blog"); // navigate to page that reads filteredBlogs from store
          }}
        >
          Future
        </Button>
        
        <Button
          variant="black"
          className="text-white font-bold hover:text-yellow-600"
          onClick={() => {
            handleImpactful();      // filter blogs and store in Redux
            router.push("/blog"); // navigate to page that reads filteredBlogs from store
          }}
        >
          Impactful
        </Button> */}

      {/* <label htmlFor="checkbox">Automation</label>
      <input
        type="checkbox"
        id="checkbox"
        name="checkbox"
        checked={isAutomation}
        onChange={handleAutomation}
      />
      <label htmlFor="checkbox">Impactful</label>
        <input
        type="checkbox"
        id="checkbox"
        name="checkbox"
        checked={isImpactful}
        onChange={handleImpactful}
      />
      <label htmlFor="checkbox">Future</label>
      <input
        type="checkbox"
        id="checkbox"
        name="checkbox"
        checked={isFuture}
        onChange={handleFuture}
      /> */}
  </div>
  )
}

export default Search
