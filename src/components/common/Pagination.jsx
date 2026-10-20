// src/components/common/Pagination.jsx
export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  itemsPerPage,
  totalItems,
  onItemsPerPageChange 
}) {
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    return pages
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
      <div className="text-sm text-gray-500">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
      </div>
      
      <div className="flex items-center gap-3">
        <select 
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))}
          className="border rounded-lg px-2 py-1 text-sm"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        
        <div className="flex gap-1">
          <button 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ←
          </button>
          
          {getPageNumbers().map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 border rounded-lg ${
                page === currentPage 
                  ? 'bg-blue-900 text-white border-blue-900' 
                  : 'hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}