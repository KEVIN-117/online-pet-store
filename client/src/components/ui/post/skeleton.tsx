export const FuturisticPostViewSkeleton: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Post Card Skeleton */}
            <FuturisticPostMainCardSkeleton />

            {/* Comments Section Skeleton */}
            <FuturisticPostCommentSkeleton />
        </div>
    )
}

export const FuturisticPostMainCardSkeleton: React.FC = () => {
    return (
        <div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-700 animate-pulse">
            <div className="h-8 w-3/4 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-3/4 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-gray-700 rounded mb-4"></div>
        </div>
    )
}

export const FuturisticPostCommentSkeleton: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="h-8 w-1/2 mx-auto bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-1/2 mx-auto bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-1/2 mx-auto bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-1/2 mx-auto bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-1/2 mx-auto bg-gray-700 rounded animate-pulse"></div>
        </div>
    )
}