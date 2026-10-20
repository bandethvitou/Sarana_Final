// src/pages/manager/LeaveRequests.jsx
import { useState } from 'react';

// Mock data – leave requests
const initialLeaveRequests = [
  { id: 1, staff: 'Ms. Siti', type: 'Sick Leave', days: 2, fromDate: '2025-06-10', toDate: '2025-06-11', reason: 'High fever, need rest', status: 'pending', priority: 'high' },
  { id: 2, staff: 'Mr. Budi', type: 'Casual Leave', days: 1, fromDate: '2025-06-12', toDate: '2025-06-12', reason: 'Family event', status: 'pending', priority: 'medium' },
  { id: 3, staff: 'Mrs. Linda', type: 'Annual Leave', days: 3, fromDate: '2025-06-15', toDate: '2025-06-17', reason: 'Vacation', status: 'pending', priority: 'low' },
  { id: 4, staff: 'Mr. John', type: 'Sick Leave', days: 1, fromDate: '2025-06-05', toDate: '2025-06-05', reason: 'Migraine', status: 'approved', priority: 'medium' },
  { id: 5, staff: 'Ms. Anna', type: 'Casual Leave', days: 2, fromDate: '2025-06-01', toDate: '2025-06-02', reason: 'Personal matter', status: 'denied', priority: 'low' },
];

export default function LeaveRequests() {
  const [requests, setRequests] = useState(initialLeaveRequests);
  const [statusFilter, setStatusFilter] = useState('all');
  const [denyModal, setDenyModal] = useState(null);
  const [denyReason, setDenyReason] = useState('');

  const filteredRequests = requests.filter(req => {
    if (statusFilter === 'all') return true;
    return req.status === statusFilter;
  });

  const handleApprove = (id) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'approved' } : req
    ));
  };

  const handleDeny = (id) => {
    if (!denyReason.trim()) return;
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'denied', denialReason: denyReason } : req
    ));
    setDenyModal(null);
    setDenyReason('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>;
      case 'approved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Approved</span>;
      case 'denied': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Denied</span>;
      default: return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">High</span>;
      case 'medium': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Medium</span>;
      case 'low': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Low</span>;
      default: return null;
    }
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Leave Requests</h1>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500">
          <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
          <div className="text-sm text-gray-500">Pending Requests</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{requests.filter(r => r.status === 'approved').length}</div>
          <div className="text-sm text-gray-500">Approved</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">{requests.filter(r => r.status === 'denied').length}</div>
          <div className="text-sm text-gray-500">Denied</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${statusFilter === 'all' ? 'bg-blue-900 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
        >
          All
        </button>
        <button
          onClick={() => setStatusFilter('pending')}
          className={`px-4 py-2 rounded-lg transition-colors ${statusFilter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
        >
          Pending
        </button>
        <button
          onClick={() => setStatusFilter('approved')}
          className={`px-4 py-2 rounded-lg transition-colors ${statusFilter === 'approved' ? 'bg-green-500 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
        >
          Approved
        </button>
        <button
          onClick={() => setStatusFilter('denied')}
          className={`px-4 py-2 rounded-lg transition-colors ${statusFilter === 'denied' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
        >
          Denied
        </button>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Staff</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Days</th>
              <th className="px-4 py-3 text-left">From</th>
              <th className="px-4 py-3 text-left">To</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Reason</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{req.staff}</td>
                <td className="px-4 py-3">{req.type}</td>
                <td className="px-4 py-3">{req.days}</td>
                <td className="px-4 py-3">{req.fromDate}</td>
                <td className="px-4 py-3">{req.toDate}</td>
                <td className="px-4 py-3">{getPriorityBadge(req.priority)}</td>
                <td className="px-4 py-3 max-w-xs truncate" title={req.reason}>{req.reason}</td>
                <td className="px-4 py-3">{getStatusBadge(req.status)}</td>
                <td className="px-4 py-3">
                  {req.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setDenyModal(req)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Deny
                      </button>
                    </div>
                  )}
                  {req.status !== 'pending' && (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRequests.length === 0 && (
          <div className="text-center py-8 text-gray-400">No leave requests found</div>
        )}
      </div>

      {/* Deny Modal */}
      {denyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Deny Leave Request</h3>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Staff:</strong> {denyModal.staff}<br />
              <strong>Type:</strong> {denyModal.type} ({denyModal.days} days)
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for denial</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                rows="3"
                placeholder="Enter reason..."
                value={denyReason}
                onChange={(e) => setDenyReason(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setDenyModal(null);
                  setDenyReason('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeny(denyModal.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Confirm Deny
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}