function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* ============================================================
          🔥 LOGIN ROUTES - PASS ROLE FROM URL
          ============================================================ */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/:role" element={<Login />} />

      {/* ============================================================
          REST OF YOUR ROUTES...
          ============================================================ */}
      {/* ... all your dashboard routes ... */}
    </Routes>
  );
}