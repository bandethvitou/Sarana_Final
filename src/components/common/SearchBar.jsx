// src/components/common/SearchBar.jsx
import { useState, useEffect } from 'react'

export default function SearchBar({ 
  onSearch, 
  placeholder = 'Search...',
  filters = [],
  onFilterChange,
  debounceDelay = 300 
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilters, setActiveFilters] = useState({})

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(searchTerm)
    }, debounceDelay)
    
    return () => clearTimeout(timer)
  }, [searchTerm, debounceDelay, onSearch])

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value }
    setActiveFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex-1 min-w-[200px]">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
      </div>
      
      {filters.map((filter) => (
        <select
          key={filter.key}
          value={activeFilters[filter.key] || filter.defaultValue || ''}
          onChange={(e) => handleFilterChange(filter.key, e.target.value)}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
        >
          <option value="">All {filter.label}</option>
          {filter.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  )
}