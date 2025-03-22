import { PostView } from "@/components/ui/post/PostView";
import { FuturisticPostViewSkeleton } from "@/components/ui/post/skeleton";
import { Suspense } from "react";


export default async function functionName({ params }: { params: Promise<{id: string}> }) {
    const id = (await params).id;
    const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);

    const post = await resPost.json();
    const comments = await res.json();

    return (
        <div className="py-8 min-h-screen p-8">
            <h1 className="text-center font-bold mb-4 uppercase bg-linear-to-r/hsl from-indigo-500 to-teal-400 bg-clip-text text-5xl text-transparent">
                Post View {id}
            </h1>
            <Suspense fallback={<FuturisticPostViewSkeleton />}>
                <PostView post={post} comments={comments} />
            </Suspense>
        </div>
    );
}
