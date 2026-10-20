// src/components/layout/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom'

export function Sidebar({ navItems, schoolName, isOpen, onClose }) {
  const location = useLocation()

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 text-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto lg:flex-shrink-0`}>
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/20">
        <span className="text-2xl">🏫</span>
        <span className="text-lg font-bold tracking-wide">{schoolName}</span>
      </div>
      <nav className="mt-6 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-sm font-medium transition-colors border-l-4 ${
              location.pathname === item.path
                ? 'bg-white/10 border-orange-500 text-white'
                : 'border-transparent text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
            onClick={onClose}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}