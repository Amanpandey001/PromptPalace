"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();
    const [copied, setCopied] = useState("");
    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied(""), 3000);
    }
    
    return (
        <div className="border-b-2 border-gray-500 bg-zinc-200 w-full p-5 sm:w-[50%]">
            <div className="flex flex-col justify-between items-start hover:bg-zinc-300 p-3 gap-5">
                <div className="flex justify-between items-start w-full">
                    <div className=" flex-1 flex justify-start items-center gap-3 cursor-pointer">
                        <Image src={post.creator.image} alt="user-profile" width={35} height={35} className="rounded-full object-contain" />
                        <div className="flex flex-col leading-tight">
                            <h1 className="font-sans font-semibold text-xl hover:underline hover:text-blue-900 text-gray-900">
                                <Link href={`/profile/${post.creator._id}`}>{post.creator.username}</Link>

                            </h1>
                            <p className="text-xs text-gray-500">{post.creator.email}</p>
                        </div>
                    </div>
                    <div onClick={handleCopy} className="cursor-pointer">   
                        <Image
                            src={copied === post.prompt ? "/tick.svg" : "/copy.svg"}
                            width={20}
                            height={20}
                            title="copy prompt"
                        />
                    </div>
                </div>
                <div>
                    <p className="font-sans text-base mb-3">{post.prompt}</p>
                    <p className="text-gray-600 text-xs cursor-pointer" onClick={()=>handleTagClick && handleTagClick(post.tag)}>{post.tag}</p>
                </div>
                {session?.user.id === post.creator._id && pathName === "/profile" && (
                <div className="flex justify-between w-full mt-4">
                    <p className="text-gray-600 hover:text-black hover:scale-110 text-xs cursor-pointer" onClick={handleEdit}>Edit</p>
                    <p className="text-gray-600 hover:text-black hover:scale-110 text-xs cursor-pointer" onClick={handleDelete}>Delete</p>
                </div>
                )}
            </div>
        </div>
    )
}

export default PromptCard
