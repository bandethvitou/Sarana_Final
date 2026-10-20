// ============================================================
// ✅ UPDATED: PROTECTED ROUTE - Director can access ALL
// ============================================================
function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    const path = location.pathname;
    const roleMap = {
      '/teacher': 'teacher',
      '/student': 'student',
      '/parent': 'parent',
      '/library': 'library',
      '/counsellor': 'counsellor',
      '/secretary': 'secretary',
      '/admissions': 'admissions',
      '/reception': 'reception',
      '/hr': 'hr',
      '/finance': 'finance',
      '/it': 'it',
      '/staff': 'staff',
      '/manager': 'manager',
      '/top-manager': 'top-manager',
      '/director': 'director',
    };
    
    let matchedRole = 'director';
    for (const [route, role] of Object.entries(roleMap)) {
      if (path.startsWith(route)) {
        matchedRole = role;
        break;
      }
    }
    return <Navigate to={`/login/${matchedRole}`} replace />;
  }

  // ✅ DIRECTOR CAN ACCESS EVERYTHING
  if (user?.role === 'director') {
    return children;
  }

  // ✅ TOP-MANAGER CAN ACCESS MANAGER AND STAFF
  if (user?.role === 'top-manager') {
    // Allow top-manager to access manager and staff pages too
    const allowed = ['top-manager', 'manager', 'staff'];
    if (allowedRoles && allowedRoles.length > 0) {
      const hasAccess = allowedRoles.some(role => allowed.includes(role));
      if (hasAccess) {
        return children;
      }
    }
  }

  // Check if user has allowed role
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to={`/${getDashboardPath(user.role)}`} replace />;
    }
  }

  return children;
}