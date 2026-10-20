// src/layouts/StaffLayout.jsx
import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoUpload from '../components/layout/LogoUpload';
import NotificationBell from '../components/layout/NotificationBell';
import ProfileDropdown from '../components/layout/ProfileDropdown';

const navItems = [
  { label: 'Home', icon: '🏠', path: '/staff' },
  { label: 'My Tasks', icon: '📋', path: '/staff/tasks' },
  { label: 'My Schedule', icon: '📅', path: '/staff/schedule' },
  { label: 'Meetings', icon: '📅', path: '/staff/meetings' },
  { label: 'Leave Requests', icon: '⏰', path: '/staff/leaves' },
  { label: 'Payments', icon: '💰', path: '/staff/payments' },
  { label: 'Notifications', icon: '🔔', path: '/staff/notifications' },
  { label: 'Reports', icon: '📄', path: '/staff/reports' },
  { label: 'Attendance', icon: '✅', path: '/staff/attendance' },
];

const notifications = [
  { id: 1, type: 'meeting', message: 'Staff Meeting – 16 Jun, 9:00 AM', time: '1 hour ago' },
  { id: 2, type: 'task', message: 'Task: "Fix window" completed', time: '2 hours ago' },
  { id: 3, type: 'event', message: 'Sports Day – 25 Jun', time: '1 day ago' },
];

export default function StaffLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoImage, setLogoImage] = useState(null);
  const [schoolName] = useState('NIS School ERP');
  const fileInputRef = useRef(null);
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogoImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login/staff');
  };

  const getInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return 'S';
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-800 overflow-hidden">
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 text-white transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto lg:flex-shrink-0`}>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/20">
          <span className="text-2xl">🏫</span>
          <span className="text-lg font-bold tracking-wide">{schoolName}</span>
        </div>
        <nav className="mt-6 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors border-l-4 ${location.pathname === item.path ? 'bg-white/10 border-orange-500 text-white' : 'border-transparent text-blue-100 hover:bg-white/10 hover:text-white'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20 bg-blue-900">
          <div className="text-sm text-blue-200 mb-2">🔧 {user?.name || 'Staff'}</div>
          <button onClick={handleLogout} className="text-sm text-blue-200 hover:text-white transition-colors">🚪 Logout</button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30 flex-shrink-0">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <button className="lg:hidden text-2xl text-blue-900" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
              <LogoUpload logo={logoImage} onUpload={handleLogoUpload} />
              <span className="text-xl font-semibold text-blue-900">{schoolName}</span>
            </div>

            <div className="flex items-center gap-6">
              <NotificationBell count={notifications.length} notifications={notifications} />
              <ProfileDropdown user={user} role="staff" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}