// src/pages/Logs.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaHistory, FaDownload, FaSyncAlt, FaTrashAlt, FaFilter, 
  FaUser, FaCalendarAlt, FaSearch, FaEye, FaTrash, 
  FaChevronLeft, FaChevronRight, FaInbox, FaCheckCircle,
  FaTimesCircle, FaInfoCircle
} from 'react-icons/fa';

// ============================================================
// SAMPLE LOG DATA
// ============================================================
const sampleLogs = [
  { id: 1, user: 'Mr. B. Soth', action: 'Logged in', level: 'info', ip: '192.168.1.101', date: '2026-07-27 08:15:23' },
  { id: 2, user: 'Ms. M. Ly', action: 'Updated user profile', level: 'info', ip: '192.168.1.102', date: '2026-07-27 08:22:45' },
  { id: 3, user: 'Dr. K. Chhay', action: 'Deleted user #42', level: 'warning', ip: '192.168.1.103', date: '2026-07-27 08:30:12' },
  { id: 4, user: 'Mr. S. Vann', action: 'Failed login attempt', level: 'error', ip: '192.168.1.104', date: '2026-07-27 08:45:33' },
  { id: 5, user: 'Mr. B. Soth', action: 'Created new role "HR Manager"', level: 'info', ip: '192.168.1.101', date: '2026-07-27 09:00:01' },
  { id: 6, user: 'Ms. M. Ly', action: 'Updated system settings', level: 'warning', ip: '192.168.1.102', date: '2026-07-27 09:15:47' },
  { id: 7, user: 'Dr. K. Chhay', action: 'Generated financial report', level: 'info', ip: '192.168.1.103', date: '2026-07-27 09:30:22' },
  { id: 8, user: 'Mr. S. Vann', action: 'Password reset requested', level: 'info', ip: '192.168.1.104', date: '2026-07-27 09:45:56' },
  { id: 9, user: 'Mr. B. Soth', action: 'Permission denied access', level: 'error', ip: '192.168.1.101', date: '2026-07-27 10:00:34' },
  { id: 10, user: 'Ms. M. Ly', action: 'Exported user data', level: 'info', ip: '192.168.1.102', date: '2026-07-27 10:15:12' },
  { id: 11, user: 'Dr. K. Chhay', action: 'Session timeout', level: 'warning', ip: '192.168.1.103', date: '2026-07-27 10:30:44' },
  { id: 12, user: 'Mr. S. Vann', action: 'Created new user account', level: 'info', ip: '192.168.1.104', date: '2026-07-27 10:45:08' },
  { id: 13, user: 'Mr. B. Soth', action: 'Database backup completed', level: 'info', ip: '192.168.1.101', date: '2026-07-27 11:00:00' },
  { id: 14, user: 'Ms. M. Ly', action: 'API rate limit exceeded', level: 'error', ip: '192.168.1.102', date: '2026-07-27 11:15:29' },
  { id: 15, user: 'Dr. K. Chhay', action: 'Updated student records', level: 'info', ip: '192.168.1.103', date: '2026-07-27 11:30:55' },
  { id: 16, user: 'Mr. S. Vann', action: 'Logged out', level: 'info', ip: '192.168.1.104', date: '2026-07-27 11:45:18' },
  { id: 17, user: 'Mr. B. Soth', action: 'System restart initiated', level: 'warning', ip: '192.168.1.101', date: '2026-07-27 12:00:41' },
  { id: 18, user: 'Ms. M. Ly', action: 'File upload failed', level: 'error', ip: '192.168.1.102', date: '2026-07-27 12:15:07' },
  { id: 19, user: 'Dr. K. Chhay', action: 'Staff attendance marked', level: 'info', ip: '192.168.1.103', date: '2026-07-27 12:30:33' },
  { id: 20, user: 'Mr. S. Vann', action: 'Privacy policy updated', level: 'info', ip: '192.168.1.104', date: '2026-07-27 12:45:59' },
];

const Logs = () => {
  // ===== STATE =====
  const [allLogs, setAllLogs] = useState(sampleLogs);
  const [filteredLogs, setFilteredLogs] = useState(sampleLogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    level: 'all',
    user: 'all',
    date: '',
    search: ''
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const perPage = 6;

  // ===== EFFECTS =====
  useEffect(() => {
    applyFilters();
  }, [filters, allLogs]);

  // ===== FILTERS =====
  const applyFilters = () => {
    const { level, user, date, search } = filters;
    
    const filtered = allLogs.filter(log => {
      if (level !== 'all' && log.level !== level) return false;
      if (user !== 'all' && log.user !== user) return false;
      if (date) {
        const logDate = log.date.split(' ')[0];
        if (logDate !== date) return false;
      }
      if (search) {
        const searchable = `${log.user} ${log.action} ${log.level} ${log.ip}`.toLowerCase();
        if (!searchable.includes(search.toLowerCase())) return false;
      }
      return true;
    });
    
    setFilteredLogs(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // ===== PAGINATION =====
  const getCurrentPageData = () => {
    const start = (currentPage - 1) * perPage;
    return filteredLogs.slice(start, start + perPage);
  };

  const totalPages = Math.ceil(filteredLogs.length / perPage) || 1;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // ===== ACTIONS =====
  const viewLog = (id) => {
    const log = allLogs.find(l => l.id === id);
    if (log) {
      alert(
        `📋 Log Details\n\n` +
        `ID: ${log.id}\n` +
        `User: ${log.user}\n` +
        `Action: ${log.action}\n` +
        `Level: ${log.level.toUpperCase()}\n` +
        `IP: ${log.ip}\n` +
        `Date: ${log.date}`
      );
    }
  };

  const deleteLog = (id) => {
    if (window.confirm(`Are you sure you want to delete log #${id}?`)) {
      const updated = allLogs.filter(l => l.id !== id);
      setAllLogs(updated);
      showToast(`Log #${id} deleted`, 'error');
    }
  };

  const clearLogs = () => {
    if (window.confirm('⚠️ Are you sure you want to delete ALL logs? This cannot be undone!')) {
      setAllLogs([]);
      showToast('All logs cleared', 'error');
    }
  };

  const refreshLogs = () => {
    setAllLogs([...sampleLogs]);
    showToast('Logs refreshed', 'info');
  };

  const exportLogs = () => {
    const data = filteredLogs.map(l =>
      `${l.id},${l.user},${l.action},${l.level},${l.ip},${l.date}`
    ).join('\n');

    const blob = new Blob(['ID,User,Action,Level,IP,Date\n' + data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    showToast(`Exported ${filteredLogs.length} logs`, 'success');
  };

  // ===== TOAST =====
  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 3000);
  };

  // ===== HELPERS =====
  const getUserColor = (user) => {
    const colors = {
      'Mr. B. Soth': 'bg-green-500',
      'Ms. M. Ly': 'bg-orange-500',
      'Dr. K. Chhay': 'bg-purple-500',
      'Mr. S. Vann': 'bg-pink-500',
    };
    return colors[user] || 'bg-blue-500';
  };

  const getInitials = (name) => {
    return name.split(' ').map(w => w[0]).join('');
  };

  const getLevelBadge = (level) => {
    const map = {
      info: 'bg-blue-100 text-blue-700',
      warning: 'bg-yellow-100 text-yellow-700',
      error: 'bg-red-100 text-red-700',
    };
    return map[level] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  // ===== STATS =====
  const stats = {
    total: filteredLogs.length,
    info: filteredLogs.filter(l => l.level === 'info').length,
    warning: filteredLogs.filter(l => l.level === 'warning').length,
    error: filteredLogs.filter(l => l.level === 'error').length,
  };

  // ===== RENDER =====
  const currentData = getCurrentPageData();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 ${
          toast.type === 'success' ? 'bg-green-600' :
          toast.type === 'error' ? 'bg-red-600' :
          'bg-blue-600'
        } text-white`}>
          {toast.type === 'success' && <FaCheckCircle />}
          {toast.type === 'error' && <FaTimesCircle />}
          {toast.type === 'info' && <FaInfoCircle />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaHistory className="text-blue-500" />
          System Logs
        </h1>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={exportLogs}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2"
          >
            <FaDownload /> Export
          </button>
          <button
            onClick={refreshLogs}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
          >
            <FaSyncAlt /> Refresh
          </button>
          <button
            onClick={clearLogs}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
          >
            <FaTrashAlt /> Clear All
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-2xl font-bold text-blue-500">{stats.total}</div>
          <div className="text-sm text-gray-500">Total Logs</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-2xl font-bold text-green-500">{stats.info}</div>
          <div className="text-sm text-gray-500">Info</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-2xl font-bold text-yellow-500">{stats.warning}</div>
          <div className="text-sm text-gray-500">Warnings</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-2xl font-bold text-red-500">{stats.error}</div>
          <div className="text-sm text-gray-500">Errors</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-400" />
          <select
            value={filters.level}
            onChange={(e) => handleFilterChange('level', e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <FaUser className="text-gray-400" />
          <select
            value={filters.user}
            onChange={(e) => handleFilterChange('user', e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Users</option>
            <option value="Mr. B. Soth">Mr. B. Soth</option>
            <option value="Ms. M. Ly">Ms. M. Ly</option>
            <option value="Dr. K. Chhay">Dr. K. Chhay</option>
            <option value="Mr. S. Vann">Mr. S. Vann</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-400" />
          <input
            type="date"
            value={filters.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search logs..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="bg-transparent flex-1 outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">User</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Level</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">IP Address</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date / Time</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-12 text-gray-400">
                  <FaInbox className="text-4xl mx-auto mb-3" />
                  No logs found
                </td>
              </tr>
            ) : (
              currentData.map((log, index) => (
                <tr key={log.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{(currentPage - 1) * perPage + index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${getUserColor(log.user)}`}>
                        {getInitials(log.user)}
                      </div>
                      {log.user}
                    </div>
                  </td>
                  <td className="px-4 py-3">{log.action}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelBadge(log.level)}`}>
                      {log.level.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">{log.ip}</code>
                  </td>
                  <td className="px-4 py-3 text-sm">{formatDate(log.date)}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => viewLog(log.id)}
                      className="px-3 py-1 text-blue-500 hover:bg-blue-50 rounded transition"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => deleteLog(log.id)}
                      className="px-3 py-1 text-red-500 hover:bg-red-50 rounded transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-3 border-t flex flex-wrap justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            Showing {Math.min((currentPage - 1) * perPage + 1, filteredLogs.length)} to{' '}
            {Math.min(currentPage * perPage, filteredLogs.length)} of {filteredLogs.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="w-9 h-9 border rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-9 h-9 border rounded-lg flex items-center justify-center transition ${
                  page === currentPage ? 'bg-blue-500 text-white border-blue-500' : 'hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="w-9 h-9 border rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;