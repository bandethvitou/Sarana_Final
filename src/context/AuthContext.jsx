// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// ============================================================
// FALLBACK USERS (Only used if backend is offline)
// ============================================================
const FALLBACK_USERS = {
  director: { 
    username: 'director@nis.edu', 
    password: 'director123', 
    role: 'director', 
    name: 'Mr. B. Soth', 
    email: 'director@nis.edu',
    title: 'School Director'
  },
  'top-manager': { 
    username: 'topmanager@nis.edu', 
    password: 'topmanager123', 
    role: 'top-manager', 
    name: 'Mr. T. Manager', 
    email: 'topmanager@nis.edu',
    title: 'Top Manager'
  },
  manager: { 
    username: 'manager@nis.edu', 
    password: 'manager123', 
    role: 'manager', 
    name: 'Ms. M. Ly', 
    email: 'manager@nis.edu',
    title: 'Department Manager'
  },
  staff: { 
    username: 'staff@nis.edu', 
    password: 'staff123', 
    role: 'staff', 
    name: 'Mr. S. Vann', 
    email: 'staff@nis.edu',
    title: 'Staff Member'
  },
  hr: { 
    username: 'hr@nis.edu', 
    password: 'hr123', 
    role: 'hr', 
    name: 'Ms. H. R. Manager', 
    email: 'hr@nis.edu',
    title: 'HR Manager'
  },
  finance: { 
    username: 'finance@nis.edu', 
    password: 'finance123', 
    role: 'finance', 
    name: 'Mr. F. Inance', 
    email: 'finance@nis.edu',
    title: 'Finance Manager'
  },
  it: { 
    username: 'it@nis.edu', 
    password: 'it123', 
    role: 'it', 
    name: 'Mr. I. T. Support', 
    email: 'it@nis.edu',
    title: 'IT Support'
  },
  admissions: { 
    username: 'admissions@nis.edu', 
    password: 'admissions123', 
    role: 'admissions', 
    name: 'Ms. A. Dmissions', 
    email: 'admissions@nis.edu',
    title: 'Admissions Officer'
  },
  reception: { 
    username: 'reception@nis.edu', 
    password: 'reception123', 
    role: 'reception', 
    name: 'Mrs. R. Eception', 
    email: 'reception@nis.edu',
    title: 'Receptionist'
  },
  library: { 
    username: 'library@nis.edu', 
    password: 'library123', 
    role: 'library', 
    name: 'Mr. L. Ibrarian', 
    email: 'library@nis.edu',
    title: 'Librarian'
  },
  counsellor: { 
    username: 'counsellor@nis.edu', 
    password: 'counsellor123', 
    role: 'counsellor', 
    name: 'Ms. C. Ounsellor', 
    email: 'counsellor@nis.edu',
    title: 'School Counsellor'
  },
  secretary: { 
    username: 'secretary@nis.edu', 
    password: 'secretary123', 
    role: 'secretary', 
    name: 'Mrs. S. Ecretary', 
    email: 'secretary@nis.edu',
    title: 'Secretary'
  },
  teacher: { 
    username: 'teacher@nis.edu', 
    password: 'teacher123', 
    role: 'teacher', 
    name: 'Ms. T. Eacher', 
    email: 'teacher@nis.edu',
    title: 'Teacher'
  },
  student: { 
    username: 'student@nis.edu', 
    password: 'student123', 
    role: 'student', 
    name: 'Mr. S. Tudent', 
    email: 'student@nis.edu',
    title: 'Student'
  },
  parent: { 
    username: 'parent@nis.edu', 
    password: 'parent123', 
    role: 'parent', 
    name: 'Mrs. P. Arent', 
    email: 'parent@nis.edu',
    title: 'Parent'
  },
};

export const AVAILABLE_ROLES = Object.keys(FALLBACK_USERS);

const ROLE_DISPLAY_NAMES = {
  director: 'Director',
  'top-manager': 'Top Manager',
  manager: 'Manager',
  staff: 'Staff',
  hr: 'HR',
  finance: 'Finance',
  it: 'IT Support',
  admissions: 'Admissions',
  reception: 'Reception',
  library: 'Library',
  counsellor: 'Counsellor',
  secretary: 'Secretary',
  teacher: 'Teacher',
  student: 'Student',
  parent: 'Parent'
};

// ============================================================
// API BASE URL
// ============================================================
const API_BASE_URL = 'http://localhost:8081/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendStatus, setBackendStatus] = useState(null);
  const [useFallback, setUseFallback] = useState(false);

  // ============================================================
  // CHECK BACKEND STATUS
  // ============================================================
  const checkBackendStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/public/health`);
      if (response.ok) {
        setBackendStatus('online');
        setUseFallback(false);
        return true;
      }
      setBackendStatus('offline');
      setUseFallback(true);
      return false;
    } catch (error) {
      setBackendStatus('offline');
      setUseFallback(true);
      return false;
    }
  };

  // ============================================================
  // CHECK LOCAL STORAGE ON LOAD
  // ============================================================
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.role) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
    checkBackendStatus();
  }, []);

  // ============================================================
  // ✅ UPDATED: LOGIN FUNCTION - Connects to Real Backend
  // ============================================================
  const login = async (email, password, role) => {
    console.log('🔐 Login attempt:', { email, role });

    // Check if backend is online
    const isBackendOnline = await checkBackendStatus();

    // If backend is online, try real login
    if (isBackendOnline) {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            username: email, 
            password: password 
          })
        });

        const data = await response.json();

        if (data.success) {
          const userData = {
            ...data.data.user,
            role: data.data.user.role?.toLowerCase() || role,
            name: data.data.user.displayName || data.data.user.name || email,
            email: data.data.user.email || email,
          };

          // Store REAL JWT tokens
          localStorage.setItem('token', data.data.accessToken);
          localStorage.setItem('refreshToken', data.data.refreshToken);
          localStorage.setItem('user', JSON.stringify(userData));

          setUser(userData);
          console.log('✅ Login successful via backend:', userData);
          return { success: true, user: userData };
        } else {
          console.error('❌ Backend login failed:', data.message);
          // Fallback to mock login if backend returns error
          return fallbackLogin(email, password, role);
        }
      } catch (error) {
        console.error('❌ Backend login error:', error);
        // Fallback to mock login on network error
        return fallbackLogin(email, password, role);
      }
    } else {
      // Backend is offline, use fallback
      console.log('📡 Backend offline, using fallback login');
      return fallbackLogin(email, password, role);
    }
  };

  // ============================================================
  // FALLBACK LOGIN (Mock/Offline Mode)
  // ============================================================
  const fallbackLogin = (email, password, role) => {
    console.log('🔐 Fallback login attempt:', { email, role });

    const userData = FALLBACK_USERS[role];
    
    if (!userData) {
      console.error('❌ Invalid role:', role);
      return { success: false, error: 'Invalid role' };
    }

    // Check credentials
    if (userData.username === email && userData.password === password) {
      const loggedInUser = {
        ...userData,
        displayName: userData.name,
        role: userData.role,
      };
      
      console.log('✅ Fallback login successful:', loggedInUser);
      
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('refreshToken', 'mock-refresh-token-' + Date.now());
      
      setUser(loggedInUser);
      setUseFallback(true);
      return { success: true, user: loggedInUser };
    }

    // Check if email matches any user (case-insensitive)
    for (const key of Object.keys(FALLBACK_USERS)) {
      const user = FALLBACK_USERS[key];
      if (user.username.toLowerCase() === email.toLowerCase() && user.password === password) {
        const loggedInUser = {
          ...user,
          displayName: user.name,
          role: user.role,
        };
        console.log('✅ Fallback login successful (matched):', loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('refreshToken', 'mock-refresh-token-' + Date.now());
        setUser(loggedInUser);
        setUseFallback(true);
        return { success: true, user: loggedInUser };
      }
    }

    console.error('❌ Invalid credentials:', { email, role });
    return { success: false, error: 'Invalid email or password' };
  };

  // ============================================================
  // LOGOUT FUNCTION
  // ============================================================
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    // Optional: Call backend logout
    if (!useFallback) {
      try {
        fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }).catch(() => {});
      } catch (e) {}
    }
  };

  // ============================================================
  // REFRESH TOKEN
  // ============================================================
  const refreshToken = async () => {
    if (useFallback) return false;
    
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) return false;
      
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.data.accessToken);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  // ============================================================
  // GET USER BY ROLE
  // ============================================================
  const getUserByRole = (role) => {
    return FALLBACK_USERS[role] || null;
  };

  // ============================================================
  // GET ROLE DISPLAY NAME
  // ============================================================
  const getRoleDisplayName = (role) => {
    return ROLE_DISPLAY_NAMES[role] || role;
  };

  // ============================================================
  // VALIDATE CREDENTIALS (Fallback only)
  // ============================================================
  const validateCredentials = (role, username, password) => {
    const userData = FALLBACK_USERS[role];
    if (userData && userData.username === username && userData.password === password) {
      return userData;
    }
    return null;
  };

  // ============================================================
  // GET AUTH HEADERS (for API calls)
  // ============================================================
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    };
  };

  // ============================================================
  // CONTEXT PROVIDER
  // ============================================================
  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      refreshToken,
      validateCredentials,
      getUserByRole,
      getRoleDisplayName,
      checkBackendStatus,
      backendStatus,
      useFallback,
      getAuthHeaders,
      FALLBACK_USERS,
      AVAILABLE_ROLES,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};