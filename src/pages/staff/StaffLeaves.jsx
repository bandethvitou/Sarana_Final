import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialLeaveBalance = {
  annual: 12,
  sick: 5,
  emergency: 3,
};

const initialLeaveHistory = [
  { id: 1, type: 'Sick Leave', startDate: '2025-05-10', endDate: '2025-05-10', status: 'approved', reason: 'Fever' },
  { id: 2, type: 'Annual Leave', startDate: '2025-04-15', endDate: '2025-04-16', status: 'approved', reason: 'Vacation' },
  { id: 3, type: 'Sick Leave', startDate: '2025-06-05', endDate: '2025-06-05', status: 'pending', reason: 'Doctor appointment' },
  { id: 4, type: 'Emergency Leave', startDate: '2025-06-01', endDate: '2025-06-01', status: 'rejected', reason: 'Family emergency' },
];

export default function StaffLeaves() {
  const navigate = useNavigate();
  const [leaveBalance] = useState(initialLeaveBalance);
  const [leaveHistory, setLeaveHistory] = useState(initialLeaveHistory);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [form, setForm] = useState({
    type: 'Annual Leave',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const filteredHistory = leaveHistory.filter(h => 
    filterStatus === 'all' ? true : h.status === filterStatus
  );

  const handleRequest = () => {
    if (!form.startDate || !form.endDate || !form.reason) return;
    
    const newRequest = {
      id: Date.now(),
      type: form.type,
      startDate: form.startDate,
      endDate: form.endDate,
      status: 'pending',
      reason: form.reason,
    };
    
    setLeaveHistory([newRequest, ...leaveHistory]);
    setShowModal(false);
    setForm({ type: 'Annual Leave', startDate: '', endDate: '', reason: '' });
  };

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this request?')) {
      setLeaveHistory(leaveHistory.map(h => 
        h.id === id ? { ...h, status: 'cancelled' } : h
      ));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>;
      case 'approved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Approved</span>;
      case 'rejected': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Rejected</span>;
      case 'cancelled': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Cancelled</span>;
      default: return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">⏰ Leave Requests</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          + Request Leave
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-blue-900">
          <div className="text-sm text-gray-500">Annual Leave</div>
          <div className="text-3xl font-bold text-blue-900">{leaveBalance.annual}</div>
          <div className="text-xs text-gray-400 mt-1">days remaining</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-green-500">
          <div className="text-sm text-gray-500">Sick Leave</div>
          <div className="text-3xl font-bold text-green-600">{leaveBalance.sick}</div>
          <div className="text-xs text-gray-400 mt-1">days remaining</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-orange-500">
          <div className="text-sm text-gray-500">Emergency Leave</div>
          <div className="text-3xl font-bold text-orange-600">{leaveBalance.emergency}</div>
          <div className="text-xs text-gray-400 mt-1">days remaining</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button 
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg ${filterStatus === 'all' ? 'bg-blue-900 text-white' : 'bg-white border border-gray-300'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilterStatus('pending')}
          className={`px-4 py-2 rounded-lg ${filterStatus === 'pending' ? 'bg-yellow-500 text-white' : 'bg-white border border-gray-300'}`}
        >
          Pending
        </button>
        <button 
          onClick={() => setFilterStatus('approved')}
          className={`px-4 py-2 rounded-lg ${filterStatus === 'approved' ? 'bg-green-500 text-white' : 'bg-white border border-gray-300'}`}
        >
          Approved
        </button>
        <button 
          onClick={() => setFilterStatus('rejected')}
          className={`px-4 py-2 rounded-lg ${filterStatus === 'rejected' ? 'bg-red-500 text-white' : 'bg-white border border-gray-300'}`}
        >
          Rejected
        </button>
        <button 
          onClick={() => setFilterStatus('cancelled')}
          className={`px-4 py-2 rounded-lg ${filterStatus === 'cancelled' ? 'bg-gray-500 text-white' : 'bg-white border border-gray-300'}`}
        >
          Cancelled
        </button>
      </div>

      {/* Leave History Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Start Date</th>
              <th className="px-4 py-3 text-left">End Date</th>
              <th className="px-4 py-3 text-left">Reason</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((h) => (
              <tr key={h.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{h.type}</td>
                <td className="px-4 py-3">{h.startDate}</td>
                <td className="px-4 py-3">{h.endDate}</td>
                <td className="px-4 py-3 max-w-xs truncate" title={h.reason}>{h.reason}</td>
                <td className="px-4 py-3">{getStatusBadge(h.status)}</td>
                <td className="px-4 py-3">
                  {h.status === 'pending' && (
                    <button 
                      onClick={() => handleCancel(h.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  )}
                  {h.status !== 'pending' && (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredHistory.length === 0 && (
          <div className="text-center py-8 text-gray-400">No leave requests found</div>
        )}
      </div>

      {/* Request Leave Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Request Leave</h2>
            <div className="space-y-3">
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={form.type}
                onChange={(e) => setForm({...form, type: e.target.value})}
              >
                <option>Annual Leave</option>
                <option>Sick Leave</option>
                <option>Emergency Leave</option>
              </select>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.startDate}
                  onChange={(e) => setForm({...form, startDate: e.target.value})}
                />
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.endDate}
                  onChange={(e) => setForm({...form, endDate: e.target.value})}
                />
              </div>
              <textarea
                placeholder="Reason for leave"
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={form.reason}
                onChange={(e) => setForm({...form, reason: e.target.value})}
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleRequest}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}