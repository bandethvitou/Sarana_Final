import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockLeaves = [
  { id: 1, staff: 'Ms. Siti', type: 'Sick Leave', days: 2, fromDate: '2025-06-20', toDate: '2025-06-21', reason: 'Fever', status: 'pending' },
  { id: 2, staff: 'Mr. Budi', type: 'Annual Leave', days: 3, fromDate: '2025-06-19', toDate: '2025-06-21', reason: 'Vacation', status: 'pending' },
  { id: 3, staff: 'Mrs. Linda', type: 'Emergency Leave', days: 1, fromDate: '2025-06-18', toDate: '2025-06-18', reason: 'Family emergency', status: 'approved' },
  { id: 4, staff: 'Mr. John', type: 'Sick Leave', days: 2, fromDate: '2025-06-17', toDate: '2025-06-18', reason: 'Migraine', status: 'denied' },
];

export default function LeaveRequests() {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState(mockLeaves);
  const [filter, setFilter] = useState('all');
  const [showDenyModal, setShowDenyModal] = useState(null);
  const [denyReason, setDenyReason] = useState('');

  const filtered = leaves.filter(l => {
    if (filter === 'all') return true;
    return l.status === filter;
  });

  const handleApprove = (id) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: 'approved' } : l));
  };

  const handleDeny = (id) => {
    if (!denyReason.trim()) return;
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: 'denied', denyReason } : l));
    setShowDenyModal(null);
    setDenyReason('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>;
      case 'approved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Approved</span>;
      case 'denied': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Denied</span>;
      default: return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📝 Leave Requests</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-900 text-white' : 'bg-white border'}`}>All</button>
        <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-white border'}`}>Pending</button>
        <button onClick={() => setFilter('approved')} className={`px-4 py-2 rounded-lg ${filter === 'approved' ? 'bg-green-500 text-white' : 'bg-white border'}`}>Approved</button>
        <button onClick={() => setFilter('denied')} className={`px-4 py-2 rounded-lg ${filter === 'denied' ? 'bg-red-500 text-white' : 'bg-white border'}`}>Denied</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Staff</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Days</th>
              <th className="px-4 py-3 text-left">From</th>
              <th className="px-4 py-3 text-left">To</th>
              <th className="px-4 py-3 text-left">Reason</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{l.staff}</td>
                <td className="px-4 py-3">{l.type}</td>
                <td className="px-4 py-3">{l.days}</td>
                <td className="px-4 py-3">{l.fromDate}</td>
                <td className="px-4 py-3">{l.toDate}</td>
                <td className="px-4 py-3 max-w-xs truncate">{l.reason}</td>
                <td className="px-4 py-3">{getStatusBadge(l.status)}</td>
                <td className="px-4 py-3">
                  {l.status === 'pending' && (
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(l.id)} className="text-green-600 hover:underline text-sm">Approve</button>
                      <button onClick={() => setShowDenyModal(l)} className="text-red-500 hover:underline text-sm">Deny</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-400">No leave requests found</div>
        )}
      </div>

      {/* Deny Modal */}
      {showDenyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Deny Leave Request</h2>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Staff:</strong> {showDenyModal.staff}<br />
              <strong>Type:</strong> {showDenyModal.type} ({showDenyModal.days} days)
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for denial</label>
              <textarea
                className="w-full border rounded-lg px-4 py-2"
                rows="3"
                placeholder="Enter reason..."
                value={denyReason}
                onChange={(e) => setDenyReason(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDenyModal(null)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button onClick={() => handleDeny(showDenyModal.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg">Confirm Deny</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}