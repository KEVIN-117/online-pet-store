import type React from "react"
import { PostCard } from "./PostCard";

interface Comment {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

interface Post {
    userId: number
    id: number
    title: string
    body: string
    commentsCount: number
}


export const Posts: React.FC<{ posts: Post[] }> = ({ posts }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {
                posts.map((post) => (
                    <div key={post.id} className="max-w-2xl w-full">
                        <PostCard post={post} isLink={true} />
                    </div>
                ))
            }
        </div>
    )
}