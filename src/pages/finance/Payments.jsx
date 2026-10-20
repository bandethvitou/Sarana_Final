import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockPayments = [
  { id: 1, student: 'Sok Heng', amount: 500, method: 'Online', date: '2025-06-20', status: 'verified' },
  { id: 2, student: 'Mey Lin', amount: 100, method: 'Cash', date: '2025-06-19', status: 'pending' },
  { id: 3, student: 'David', amount: 50, method: 'Bank Transfer', date: '2025-06-18', status: 'verified' },
  { id: 4, student: 'Lina', amount: 500, method: 'Online', date: '2025-06-17', status: 'verified' },
  { id: 5, student: 'Channy', amount: 500, method: 'Cash', date: '2025-06-16', status: 'pending' },
  { id: 6, student: 'Sreyneng', amount: 20, method: 'Online', date: '2025-06-15', status: 'verified' },
  { id: 7, student: 'Menghong', amount: 500, method: 'Bank Transfer', date: '2025-06-14', status: 'verified' },
];

const methods = ['All', 'Cash', 'Online', 'Bank Transfer'];
const statuses = ['All', 'verified', 'pending', 'rejected'];

export default function Payments() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState(mockPayments);
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(null);
  const [form, setForm] = useState({
    student: '',
    amount: '',
    method: 'Online',
    transactionId: '',
    date: '',
    notes: '',
  });

  const filteredPayments = payments.filter(p => {
    const matchSearch = p.student.toLowerCase().includes(search.toLowerCase());
    const matchMethod = methodFilter === 'All' || p.method === methodFilter;
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchMethod && matchStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Verified</span>;
      case 'pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">⏳ Pending</span>;
      case 'rejected': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">❌ Rejected</span>;
      default: return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'Cash': return '💵';
      case 'Online': return '💳';
      case 'Bank Transfer': return '🏦';
      default: return '💰';
    }
  };

  const handleRecordPayment = () => {
    if (!form.student || !form.amount || !form.date) return;
    const newPayment = {
      id: Date.now(),
      student: form.student,
      amount: parseFloat(form.amount),
      method: form.method,
      date: form.date,
      status: 'pending',
    };
    setPayments([newPayment, ...payments]);
    setShowRecordModal(false);
    setForm({ student: '', amount: '', method: 'Online', transactionId: '', date: '', notes: '' });
  };

  const handleVerify = (id) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: 'verified' } : p));
    setShowVerifyModal(null);
  };

  const handleReject = (id) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: 'rejected' } : p));
    setShowVerifyModal(null);
  };

  const totalVerified = payments.filter(p => p.status === 'verified').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">💳 Payments</h1>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">${totalVerified.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Total Verified</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500">
          <div className="text-2xl font-bold text-yellow-600">${totalPending.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Pending Verification</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-900">
          <div className="text-2xl font-bold text-blue-900">{payments.length}</div>
          <div className="text-sm text-gray-500">Total Payments</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Payment Method</label>
            <select 
              className="border rounded-lg px-3 py-2 bg-white"
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
            >
              {methods.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Status</label>
            <select 
              className="border rounded-lg px-3 py-2 bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statuses.map(s => <option key={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs text-gray-500 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search student..."
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button 
          onClick={() => setShowRecordModal(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          + Record Payment
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-left">Method</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">#{payment.id}</td>
                <td className="px-4 py-3 font-medium">{payment.student}</td>
                <td className="px-4 py-3 text-right font-bold">${payment.amount}</td>
                <td className="px-4 py-3">{getMethodIcon(payment.method)} {payment.method}</td>
                <td className="px-4 py-3">{payment.date}</td>
                <td className="px-4 py-3">{getStatusBadge(payment.status)}</td>
                <td className="px-4 py-3">
                  {payment.status === 'pending' && (
                    <button 
                      onClick={() => setShowVerifyModal(payment)}
                      className="px-2 py-1 bg-blue-900 text-white rounded text-xs hover:bg-blue-800"
                    >
                      Verify
                    </button>
                  )}
                  {payment.status !== 'pending' && (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPayments.length === 0 && (
          <div className="text-center py-8 text-gray-400">No payments found</div>
        )}
      </div>

      {/* Record Payment Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">💳 Record Payment</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                <input
                  type="text"
                  placeholder="Search & select student..."
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.student}
                  onChange={(e) => setForm({...form, student: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  placeholder="e.g., 500"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.amount}
                  onChange={(e) => setForm({...form, amount: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.method}
                  onChange={(e) => setForm({...form, method: e.target.value})}
                >
                  <option value="Cash">💵 Cash</option>
                  <option value="Bank Transfer">🏦 Bank Transfer</option>
                  <option value="Online">💳 Online Payment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                <input
                  type="text"
                  placeholder="e.g., TXN123456"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.transactionId}
                  onChange={(e) => setForm({...form, transactionId: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.date}
                  onChange={(e) => setForm({...form, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
                <input
                  type="text"
                  placeholder="Additional notes..."
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.notes}
                  onChange={(e) => setForm({...form, notes: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowRecordModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleRecordPayment}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verify Payment Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">✅ Verify Payment</h2>
            <div className="space-y-2 text-sm bg-gray-50 rounded-lg p-4">
              <p><strong>Payment ID:</strong> #{showVerifyModal.id}</p>
              <p><strong>Student:</strong> {showVerifyModal.student}</p>
              <p><strong>Amount:</strong> <span className="font-bold text-blue-900">${showVerifyModal.amount}</span></p>
              <p><strong>Method:</strong> {getMethodIcon(showVerifyModal.method)} {showVerifyModal.method}</p>
              <p><strong>Date:</strong> {showVerifyModal.date}</p>
              <p><strong>Status:</strong> <span className="text-yellow-600">⏳ Pending</span></p>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
              <input
                type="text"
                placeholder="Verification notes..."
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowVerifyModal(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleReject(showVerifyModal.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                ❌ Reject
              </button>
              <button 
                onClick={() => handleVerify(showVerifyModal.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                ✅ Confirm Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}