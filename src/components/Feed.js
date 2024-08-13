"use client"
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 flex flex-col justify-center items-center flex-wrap">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}
const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState([])
  const handleSearchChange = (e) => {

  }
  useEffect(() => {
   const fetchposts = async () => {
     const res = await fetch(`/api/prompt`)
     const data = await res.json()
     setPosts(data)
   } 
   fetchposts()
  },[])
  return (
    <div className="feed">
      <form action="" className="relative w-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="px-3 rounded-md py-2 sm:w-[40%] bg-white bg-opacity-50 placeholder:text-gray-400 placeholder:font-semibold text-black "
        />

      </form>
      <PromptCardList
        data={posts}
        handleTagClick={() => { }}
        searchText={searchText}
      />
    </div>
  )
}

export default Feed
