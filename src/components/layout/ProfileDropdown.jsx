// src/components/layout/ProfileDropdown.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProfileDropdown({ user, role = 'director' }) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  const displayName = user?.name || 'User';

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate(`/login/${role}`);
  };

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-9 h-9 rounded-full bg-blue-900 border-2 border-orange-500 flex items-center justify-center text-white font-bold text-sm">
          {initials}
        </div>
        <span className="font-medium text-blue-900 hidden sm:inline">{displayName}</span>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-800">{displayName}</p>
            <p className="text-xs text-gray-500 capitalize">{role}</p>
          </div>
          <Link 
            to="/profile" 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <span>👤</span> My Profile
          </Link>
          <Link 
            to="/settings" 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <span>⚙️</span> Settings
          </Link>
          <hr className="my-1" />
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500 flex items-center gap-2"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;