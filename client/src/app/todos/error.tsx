"use client"
import React from 'react'
import Link from 'next/link'
import { FuturisticPostMainCardSkeleton } from '@/components/ui/post/skeleton'

function error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
    return (
        <div className='grid grid-cols-3 gap-4 h-screen w-screen container mx-auto py-28'>
            <FuturisticPostMainCardSkeleton />
            <FuturisticPostMainCardSkeleton />
            <FuturisticPostMainCardSkeleton />
            <h1 className="col-span-3 text-center font-bold my-2 uppercase bg-linear-to-r/increasing from-indigo-500 to-teal-400 bg-clip-text text-5xl text-transparent">
                {error.digest}, {error.name} - {error.message}
            </h1>
            <div className='col-span-3 text-center gap-4'>
                <button onClick={reset} className="col-span-3 w-[25%] text-5xl bg-linear-to-r/increasing from-red-500 to-pink-500 text-white font-bold py-2 px-4 rounded">
                    Retry
                </button>
                <span className='text-5xl mx-3'>or go back to</span>
                <Link href='/' className='text-5xl uppercase bg-linear-to-r/increasing from-indigo-500 to-teal-400 font-bold py-2 px-4 rounded'>
                    Home
                </Link>
            </div>
            <FuturisticPostMainCardSkeleton />
            <FuturisticPostMainCardSkeleton />
            <FuturisticPostMainCardSkeleton />
        </div>
    )
}

export default error