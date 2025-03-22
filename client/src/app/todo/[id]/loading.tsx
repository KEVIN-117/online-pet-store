import { FuturisticPostViewSkeleton } from '@/components/ui/post/skeleton'
import React from 'react'

function loading() {
    return (
        <div className='h-screen w-screen container mx-auto py-28'>
            <h1 className="text-center font-bold mb-4 uppercase bg-linear-to-r/increasing from-indigo-500 to-teal-400 bg-clip-text text-5xl text-transparent">
                Post View Loading
            </h1>
            <FuturisticPostViewSkeleton />
        </div>
    )
}
export default loading