// src/layouts/DirectorLayout.jsx - UPDATED VERSION 2.0
import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoUpload from '../components/layout/LogoUpload';
import NotificationBell from '../components/layout/NotificationBell';
import ProfileDropdown from '../components/layout/ProfileDropdown';

const navItems = [
  { label: 'Home', icon: '🏠', path: '/director' },
  { label: 'Users', icon: '👥', path: '/director/users' },
  { label: 'Roles', icon: '🔄', path: '/director/roles' },
  { label: 'Goals', icon: '🎯', path: '/director/goals' },
  { label: 'Tasks', icon: '📋', path: '/director/tasks' },
  { label: 'Meetings', icon: '📅', path: '/director/meetings' },
  { label: 'Bills', icon: '💰', path: '/director/bills' },
  { label: 'Reports', icon: '📊', path: '/director/reports' },
  { label: 'Logs', icon: '🛡️', path: '/director/logs' },
  { label: 'Settings', icon: '⚙️', path: '/director/settings' },
];

const notifications = [
  { id: 1, type: 'critical', message: 'Fee Defaulter: Sok (Gr.10) – 45 days overdue.', time: '5 min ago' },
  { id: 2, type: 'warning', message: 'Low Attendance: Grade 7B dropped to 78% today.', time: '1 hour ago' },
  { id: 3, type: 'info', message: 'New Hiring Request: Math Teacher position submitted.', time: '2 hours ago' },
];

export default function DirectorLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoImage, setLogoImage] = useState(null);
  const [schoolName, setSchoolName] = useState('NIS School ERP');
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(schoolName);
  const fileInputRef = useRef(null);
  const nameInputRef = useRef(null);
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

  const startEditName = () => {
    setTempName(schoolName);
    setEditingName(true);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const saveName = () => {
    const trimmed = tempName.trim();
    if (trimmed) setSchoolName(trimmed);
    else setTempName(schoolName);
    setEditingName(false);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') saveName();
    if (e.key === 'Escape') {
      setTempName(schoolName);
      setEditingName(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login/director');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-800">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 text-white transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto`}>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/20">
          <span className="text-2xl">🏫</span>
          <span className="text-lg font-bold tracking-wide">{schoolName}</span>
        </div>
        <nav className="mt-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors border-l-4 ${
                location.pathname === item.path
                  ? 'bg-white/10 border-orange-500 text-white'
                  : 'border-transparent text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-4 border-t border-white/20">
          <div className="text-sm text-blue-200 mb-2">👑 Director • {user?.name || 'Admin'}</div>
          <button onClick={handleLogout} className="text-sm text-blue-200 hover:text-white">🚪 Logout</button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <button className="lg:hidden text-2xl text-blue-900" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>

              {/* Logo Upload - Using SHARED COMPONENT */}
              <LogoUpload logo={logoImage} onUpload={handleLogoUpload} />

              {/* School Name - Editable */}
              <div className="flex items-center gap-2">
                {editingName ? (
                  <input 
                    ref={nameInputRef} 
                    type="text" 
                    value={tempName} 
                    onChange={(e) => setTempName(e.target.value)} 
                    onBlur={saveName} 
                    onKeyDown={handleNameKeyDown} 
                    className="text-xl font-semibold text-blue-900 border border-blue-900 rounded px-2 py-1 outline-none w-56" 
                    autoFocus
                  />
                ) : (
                  <span 
                    className="text-xl font-semibold text-blue-900 cursor-pointer hover:bg-blue-50 px-1 rounded transition-colors" 
                    onClick={startEditName}
                  >
                    {schoolName}
                  </span>
                )}
                <button 
                  className="text-gray-400 hover:text-blue-900 transition-colors" 
                  onClick={startEditName} 
                  title="Edit school name"
                >
                  ✎
                </button>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Notification Bell - Using SHARED COMPONENT */}
              <NotificationBell count={notifications.length} notifications={notifications} />

              {/* Profile Dropdown - Using SHARED COMPONENT */}
              <ProfileDropdown user={user} role="director" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}