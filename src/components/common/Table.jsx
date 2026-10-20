// src/components/common/Table.jsx
export default function Table({ 
  columns, 
  data, 
  onRowClick, 
  loading, 
  emptyMessage = 'No data found',
  className = '' 
}) {
  if (loading) return <LoadingSpinner />
  if (!data || data.length === 0) {
    return <EmptyState message={emptyMessage} />
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-3 text-left font-semibold text-gray-600">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr 
              key={rowIdx} 
              className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col, colIdx) => (
                <td key={colIdx} className="px-4 py-3">
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}