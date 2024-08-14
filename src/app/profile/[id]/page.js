"use client"
import Profile from '@/components/Profile'
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null); // Set initial state to null

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${params.id}/posts`);
            const data = await res.json();
            setPosts(data);
        }

        fetchPosts();

        const fetchUser = async () => {
            const res = await fetch(`/api/users/${params.id}`);
            const data = await res.json();
            console.log(data); // Debug: check if `data` contains the `username`
            setUser(data);
        }

        fetchUser();
    }, [params.id]); // Add `params.id` as a dependency to rerun on id change

    if (!user) {
        return <div>Loading...</div>; // Show a loading state while the user data is being fetched
    }

    return (
        <Profile
            name={`${user.username}'s`} // Access `username` safely
            desc={`Welcome to ${user.username}'s personalized profile page. Explore ${user.username}'s prompts and be inspired by the ideas they bring to the world.`}
            data={posts}
        />
    )
}

export default page;
