import { Comment, Post } from "@/app/todos/page"
import { PostCard } from "./PostCard"
import { FuturisticPostComments } from "./PostComments"

export const PostView: React.FC<{ post: Post, comments: Comment[] }> = ({ post, comments }) => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <PostCard post={post} isLink={false} />

            <FuturisticPostComments comments={comments} />
        </div>
    )
}