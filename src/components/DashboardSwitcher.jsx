// src/components/DashboardSwitcher.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DASHBOARDS = [
  { role: 'director', label: 'Director', icon: '👑', path: '/director' },
  { role: 'top-manager', label: 'Top Manager', icon: '📊', path: '/top-manager' },
  { role: 'manager', label: 'Manager', icon: '👔', path: '/manager' },
  { role: 'staff', label: 'Staff', icon: '🔧', path: '/staff' },
  { role: 'hr', label: 'HR', icon: '👥', path: '/hr' },
  { role: 'finance', label: 'Finance', icon: '💰', path: '/finance' },
  { role: 'it', label: 'IT Support', icon: '💻', path: '/it' },
  { role: 'admissions', label: 'Admissions', icon: '📋', path: '/admissions' },
  { role: 'reception', label: 'Reception', icon: '📞', path: '/reception' },
  { role: 'library', label: 'Library', icon: '📚', path: '/library' },
  { role: 'counsellor', label: 'Counsellor', icon: '🧠', path: '/counsellor' },
  { role: 'secretary', label: 'Secretary', icon: '📝', path: '/secretary' },
  { role: 'teacher', label: 'Teacher', icon: '👩‍🏫', path: '/teacher' },
  { role: 'student', label: 'Student', icon: '🧑‍🎓', path: '/student' },
  { role: 'parent', label: 'Parent', icon: '👨‍👩‍👧', path: '/parent' },
];

export default function DashboardSwitcher({ onClose }) {
  const { user } = useAuth();
  const currentRole = user?.role || 'director';

  // Map role to path for highlighting
  const getRolePath = (role) => {
    const map = {
      'director': '/director',
      'topmanager': '/top-manager',
      'top-manager': '/top-manager',
      'manager': '/manager',
      'staff': '/staff',
      'hr': '/hr',
      'finance': '/finance',
      'it': '/it',
      'admissions': '/admissions',
      'reception': '/reception',
      'library': '/library',
      'counsellor': '/counsellor',
      'secretary': '/secretary',
      'teacher': '/teacher',
      'student': '/student',
      'parent': '/parent',
    };
    return map[role] || '/' + role;
  };

  const currentPath = getRolePath(currentRole);

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[80vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h3 className="font-bold text-blue-900">📊 All Dashboards</h3>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
            ✕
          </button>
        )}
      </div>
      <div className="p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {DASHBOARDS.map((dashboard) => {
          const isActive = currentPath === dashboard.path;
          return (
            <Link
              key={dashboard.role}
              to={dashboard.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-orange-500 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="text-2xl">{dashboard.icon}</span>
              <div>
                <div className={`font-medium ${isActive ? 'text-white' : 'text-gray-800'}`}>
                  {dashboard.label}
                </div>
                <div className={`text-xs ${isActive ? 'text-orange-100' : 'text-gray-400'}`}>
                  {dashboard.path}
                </div>
              </div>
              {isActive && (
                <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full text-white">
                  Active
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}