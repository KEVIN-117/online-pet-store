import React from 'react'
import Link from 'next/link'
import { FuturisticPostMainCardSkeleton } from '@/components/ui/post/skeleton'

function NotFound() {
    return (
        <div className='grid grid-cols-3 gap-4 h-screen w-screen container mx-auto py-28'>
            <FuturisticPostMainCardSkeleton />
            <FuturisticPostMainCardSkeleton />
            <FuturisticPostMainCardSkeleton />
            <h1 className="col-span-3 text-center font-bold my-2 uppercase bg-linear-to-r/increasing from-indigo-500 to-teal-400 bg-clip-text text-5xl text-transparent">
                Not Found - 404
            </h1>
            <span className='col-span-3 text-5xl text-center mx-3'>Could not find requested resource</span>
            <Link href='/' className='col-span-3 w-[30%] mx-auto text-center text-5xl uppercase bg-linear-to-r/increasing from-indigo-500 to-teal-400 font-bold py-2 px-4 rounded'>
                Home
            </Link>
            <FuturisticPostMainCardSkeleton />
            <FuturisticPostMainCardSkeleton />
            <FuturisticPostMainCardSkeleton />
        </div>
    )
}

export default NotFound