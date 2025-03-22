import { FuturisticPostMainCardSkeleton } from '@/components/ui/post/skeleton'
import React from 'react'

function loading() {
    return (
        <div className='grid grid-cols-3 gap-4 h-screen w-screen container mx-auto py-28'>
            <h1 className="col-span-3 text-center font-bold mb-4 uppercase bg-linear-to-r/increasing from-indigo-500 to-teal-400 bg-clip-text text-5xl text-transparent">
                All Post View Loading
            </h1>
            <FuturisticPostMainCardSkeleton />
            <FuturisticPostMainCardSkeleton />
            <FuturisticPostMainCardSkeleton />
            <FuturisticPostMainCardSkeleton />
            <FuturisticPostMainCardSkeleton />
            <FuturisticPostMainCardSkeleton />
        </div>
    )
}
export default loading