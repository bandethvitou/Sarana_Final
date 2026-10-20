import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TopManagerLayout({ children }) {
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

  const canEditSchoolName = user?.role === 'director' || user?.role === 'top-manager';

  const navItems = [
    { label: 'Home', icon: '🏠', path: '/top-manager' },
    { label: 'Enrollment', icon: '📈', path: '/top-manager/enrollment' },
    { label: 'Academic', icon: '📚', path: '/top-manager/academic' },
    { label: 'Score Management', icon: '📝', path: '/top-manager/score-management' },
    { label: 'Managers', icon: '👥', path: '/top-manager/managers' },
    { label: 'Pending Reviews', icon: '📋', path: '/top-manager/reviews' },
    { label: 'Task Assignments', icon: '📊', path: '/top-manager/tasks' },
    { label: 'Meetings', icon: '📅', path: '/top-manager/meetings' },
    { label: 'Reports to Director', icon: '📄', path: '/top-manager/reports' },
  ];

  const notifications = [
    { id: 1, type: 'critical', message: 'Fee Defaulter: Sok (Gr.10) – 45 days overdue.', time: '5 min ago' },
    { id: 2, type: 'warning', message: 'Low Attendance: Grade 7B dropped to 78% today.', time: '1 hour ago' },
    { id: 3, type: 'info', message: 'New Hiring Request: Math Teacher position submitted.', time: '2 hours ago' },
  ];

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogoImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const startEditName = () => {
    if (!canEditSchoolName) return;
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
    navigate('/login/top-manager');
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
          <div className="text-sm text-blue-200 mb-2">👔 {user?.name || 'Top Manager'}</div>
          <button onClick={handleLogout} className="text-sm text-blue-200 hover:text-white">🚪 Logout</button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <button className="lg:hidden text-2xl text-blue-900" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>

              {/* Logo Circle - Clean, no "NIS" text inside */}
              <div className="relative cursor-pointer group" onClick={() => fileInputRef.current.click()}>
                <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white text-xl font-bold overflow-hidden border-2 border-orange-500 transition-transform group-hover:scale-105">
                  {logoImage ? <img src={logoImage} alt="Logo" className="w-full h-full object-cover" /> : <span>🏫</span>}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              </div>

              {/* School Name - Editable only for Director & Top Manager */}
              <div className="flex items-center gap-2">
                {canEditSchoolName ? (
                  <>
                    {editingName ? (
                      <input
                        ref={nameInputRef}
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onBlur={saveName}
                        onKeyDown={handleNameKeyDown}
                        className="text-xl font-semibold text-blue-900 border border-blue-900 rounded px-2 py-1 outline-none w-56"
                      />
                    ) : (
                      <span className="text-xl font-semibold text-blue-900 cursor-pointer hover:bg-blue-50 px-1 rounded transition-colors" onClick={startEditName}>
                        {schoolName}
                      </span>
                    )}
                    <button className="text-gray-400 hover:text-blue-900 transition-colors" onClick={startEditName} title="Edit school name">✎</button>
                  </>
                ) : (
                  <span className="text-xl font-semibold text-blue-900">{schoolName}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Notification bell */}
              <div className="relative cursor-pointer" onClick={() => setNotifOpen(!notifOpen)}>
                <span className="text-2xl text-blue-900">🔔</span>
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{notifications.length}</span>
              </div>

              {/* Profile dropdown */}
              <div className="relative">
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <div className="w-9 h-9 rounded-full bg-blue-900 border-2 border-orange-500 flex items-center justify-center text-white font-bold text-sm">
                    {user?.name?.charAt(0) || 'TM'}
                  </div>
                  <span className="font-medium text-blue-900 hidden sm:inline">{user?.name || 'Top Manager'}</span>
                </div>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                    <button 
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 flex items-center gap-2"
                      onClick={() => setProfileOpen(false)}
                    >
                      <span>👤</span> My Profile
                    </button>
                    <button 
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 flex items-center gap-2"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate('/top-manager');
                      }}
                    >
                      <span>🏠</span> Dashboard
                    </button>
                    <button 
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 flex items-center gap-2"
                      onClick={() => setProfileOpen(false)}
                    >
                      <span>🔑</span> Change Password
                    </button>
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
            </div>
          </div>
        </header>

        {/* Notification popup */}
        {notifOpen && (
          <div className="absolute right-6 top-16 w-80 bg-white rounded-xl shadow-2xl border-t-4 border-orange-500 z-50">
            <div className="p-4 font-semibold text-blue-900 border-b flex justify-between items-center">
              <span>Notifications</span>
              <button onClick={() => setNotifOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.map((notif) => (
                <div key={notif.id} className="px-4 py-3 border-b border-gray-100 text-sm hover:bg-gray-50 cursor-pointer">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    notif.type === 'critical' ? 'bg-red-500' : 
                    notif.type === 'warning' ? 'bg-orange-500' : 
                    'bg-blue-500'
                  }`}></span>
                  <strong>{notif.message}</strong>
                  <div className="text-xs text-gray-400 mt-1">{notif.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}