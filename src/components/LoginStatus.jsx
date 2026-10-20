// src/components/LoginStatus.jsx
import { useAuth } from '../context/AuthContext';

export default function LoginStatus() {
  const { isAuthenticated, user, useFallback, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="text-sm text-gray-500">
        Not logged in
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center text-sm font-bold">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <div>
          <div className="text-sm font-medium text-gray-800">
            {user?.displayName || user?.name}
          </div>
          <div className="text-xs text-gray-500">
            {user?.role}
            {useFallback && (
              <span className="ml-2 px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded text-[10px]">
                Offline Mode
              </span>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={logout}
        className="text-sm text-red-500 hover:text-red-700"
      >
        Logout
      </button>
    </div>
  );
}