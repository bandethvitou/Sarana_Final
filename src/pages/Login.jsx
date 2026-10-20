// src/pages/Login.jsx - COMPLETE FIXED VERSION
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// ============================================================
// ROLE CONFIGURATIONS
// ============================================================
const roleConfigs = {
  director: { title: 'Director Sign In', dashboard: '/director' },
  'top-manager': { title: 'Top Manager Sign In', dashboard: '/top-manager' },
  manager: { title: 'Manager Sign In', dashboard: '/manager' },
  staff: { title: 'Staff Sign In', dashboard: '/staff' },
  hr: { title: 'HR Admin Sign In', dashboard: '/hr' },
  finance: { title: 'Finance Admin Sign In', dashboard: '/finance' },
  reception: { title: 'Receptionist Sign In', dashboard: '/reception' },
  admissions: { title: 'Admissions Officer Sign In', dashboard: '/admissions' },
  it: { title: 'IT Support Sign In', dashboard: '/it' },
  library: { title: 'Librarian Sign In', dashboard: '/library' },
  counsellor: { title: 'Counsellor Sign In', dashboard: '/counsellor' },
  secretary: { title: 'Secretary Sign In', dashboard: '/secretary' },
  teacher: { title: 'Teacher Sign In', dashboard: '/teacher' },
  student: { title: 'Student Sign In', dashboard: '/student' },
  parent: { title: 'Parent Sign In', dashboard: '/parent' },
};

// ============================================================
// DEMO CREDENTIALS
// ============================================================
const demoCredentials = {
  director: { email: 'director@nis.edu', password: 'director123' },
  'top-manager': { email: 'topmanager@nis.edu', password: 'topmanager123' },
  manager: { email: 'manager@nis.edu', password: 'manager123' },
  staff: { email: 'staff@nis.edu', password: 'staff123' },
  hr: { email: 'hr@nis.edu', password: 'hr123' },
  finance: { email: 'finance@nis.edu', password: 'finance123' },
  reception: { email: 'reception@nis.edu', password: 'reception123' },
  admissions: { email: 'admissions@nis.edu', password: 'admissions123' },
  it: { email: 'it@nis.edu', password: 'it123' },
  library: { email: 'library@nis.edu', password: 'library123' },
  counsellor: { email: 'counsellor@nis.edu', password: 'counsellor123' },
  secretary: { email: 'secretary@nis.edu', password: 'secretary123' },
  teacher: { email: 'teacher@nis.edu', password: 'teacher123' },
  student: { email: 'student@nis.edu', password: 'student123' },
  parent: { email: 'parent@nis.edu', password: 'parent123' },
};

// ============================================================
// LOGIN COMPONENT
// ============================================================
export default function Login() {
  const { role = 'director' } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const config = roleConfigs[role] || roleConfigs.director;

  useEffect(() => {
    const creds = demoCredentials[role];
    if (creds) {
      setEmail(creds.email);
      setPassword(creds.password);
    } else {
      setEmail('director@nis.edu');
      setPassword('director123');
    }
  }, [role]);

  useEffect(() => {
    if (user) {
      const dashboard = roleConfigs[user.role]?.dashboard || `/${user.role}`;
      navigate(dashboard, { replace: true });
    }
  }, [user, navigate]);

  // ✅ FIXED: Async handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await login(email, password, role);
      
      if (result.success) {
        toast.success(`Welcome ${result.user.name}!`);
      } else {
        toast.error(result.error || 'Login failed');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred');
      setLoading(false);
    }
  };

  if (user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-900 text-white py-10 px-4 text-center shadow-md">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-full bg-blue-900 border-2 border-white flex items-center justify-center text-white font-bold text-xl shadow-lg">NIS</div>
          <h1 className="text-2xl font-bold tracking-wide">NIS School ERP</h1>
          <p className="text-blue-200 text-sm">New Town International School</p>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border-t-4 border-orange-500">
          <h2 className="text-2xl font-semibold text-blue-900 mb-1 text-center">{config.title}</h2>
          <p className="text-gray-500 text-sm text-center mb-6">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">Demo: {email || 'Loading...'} / {password || '••••••••'}</p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            © {new Date().getFullYear()} NIS – New Town International School.
          </p>
        </div>
      </div>
    </div>
  );
}