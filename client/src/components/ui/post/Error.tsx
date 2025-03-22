export const FuturisticPostViewError: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500 shadow-text">
                    Error Fetching Data
                </h1>
                <p className="text-gray-300">
                    There was an error fetching the data. Please try again later.
                </p>
            </div>
        </div>
    )
}
