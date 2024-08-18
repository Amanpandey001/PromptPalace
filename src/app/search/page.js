"use client"
import { useState } from "react"
import PromptCard from "@/components/PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 flex flex-col justify-center items-center flex-wrap w-full">
            {data.length === 0 ? (
                <p className="text-center font-bold text-2xl">No results found</p>
            ) : (
                data.map((post) => (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleTagClick={handleTagClick}
                    />
                ))
            )}
        </div>
    )
}

const Search = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/prompt/searchQuery?searchQuery=${query}`);
        const data = await response.json();
        setResults(data);
    };
    return (
        <div className='w-full mx-auto flex flex-col my-10 items-center '>
            <form onSubmit={handleSearch} className=' p-3 w-[70%] gap-3 flex '>
                <input 
                    className='px-4 py-2 rounded-lg bg-opacity-65 bg-white font-bold w-[80%]' 
                    placeholder='Search Via Tags (without #) Or Username' 
                    onChange={(e) => setQuery(e.target.value)} 
                    type="search" 
                    name="search" 
                    id="search" 
                />
                <button 
                    className='px-4 py-2 bg-teal-200 rounded-lg w-[10%]' 
                    type="submit"
                >
                    Search
                </button>
            </form>
            <p className='text-3xl font-bold mt-4 '>Search Results</p>
            <PromptCardList 
                data={results}
                handleTagClick={() => {}}
            />
        </div>
    )
}

export default Search
