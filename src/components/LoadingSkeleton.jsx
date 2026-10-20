// src/components/LoadingSkeleton.jsx
export function LoadingSkeleton({ type = 'cards', count = 6 }) {
  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm animate-pulse">
            <div className="h-8 w-8 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'table') {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
        <div className="p-4 border-b">
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="divide-y">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 flex gap-4">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default: spinner
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
    </div>
  )
}