import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockFees = [
  { id: 1, student: 'Sok Heng', class: 'Grade 10', feeType: 'Tuition', amount: 500, status: 'paid' },
  { id: 2, student: 'Mey Lin', class: 'Grade 8', feeType: 'Tuition', amount: 500, status: 'due' },
  { id: 3, student: 'David', class: 'Grade 12', feeType: 'Transport', amount: 100, status: 'paid' },
  { id: 4, student: 'Lina', class: 'Grade 7', feeType: 'Library', amount: 50, status: 'due' },
  { id: 5, student: 'Channy', class: 'Grade 9', feeType: 'Tuition', amount: 500, status: 'paid' },
  { id: 6, student: 'Sreyneng', class: 'Grade 5', feeType: 'Activity', amount: 20, status: 'paid' },
  { id: 7, student: 'Menghong', class: 'Grade 3', feeType: 'Tuition', amount: 500, status: 'overdue' },
  { id: 8, student: 'Rith', class: 'Grade 11', feeType: 'Lab', amount: 30, status: 'due' },
];

const feeTypes = ['All', 'Tuition', 'Transport', 'Library', 'Lab', 'Activity', 'Late Fee'];
const statuses = ['All', 'paid', 'due', 'overdue'];
const levels = ['All', 'Grade 3', 'Grade 5', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

export default function FeeCollection() {
  const navigate = useNavigate();
  const [fees, setFees] = useState(mockFees);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [form, setForm] = useState({
    student: '',
    feeType: 'Tuition',
    amount: '',
    dueDate: '',
    description: '',
  });

  const filteredFees = fees.filter(f => {
    const matchSearch = f.student.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === 'All' || f.class === levelFilter;
    const matchStatus = statusFilter === 'All' || f.status === statusFilter;
    return matchSearch && matchLevel && matchStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Paid</span>;
      case 'due': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">⚠️ Due</span>;
      case 'overdue': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 Overdue</span>;
      default: return null;
    }
  };

  const handleCreateInvoice = () => {
    if (!form.student || !form.amount) return;
    const newFee = {
      id: Date.now(),
      student: form.student,
      class: 'Grade 5',
      feeType: form.feeType,
      amount: parseFloat(form.amount),
      status: 'due',
    };
    setFees([newFee, ...fees]);
    setShowInvoiceModal(false);
    setForm({ student: '', feeType: 'Tuition', amount: '', dueDate: '', description: '' });
  };

  const handleBulkPayment = () => {
    alert('📋 Bulk payment feature coming soon');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">💵 Fee Collection</h1>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Level</label>
            <select 
              className="border rounded-lg px-3 py-2 bg-white"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              {levels.map(l => <option key={l}>{l}</option>)}
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
          onClick={() => setShowInvoiceModal(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          + Create Invoice
        </button>
        <button 
          onClick={handleBulkPayment}
          className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors"
        >
          📋 Record Bulk Payment
        </button>
        <button className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors">
          📊 Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-left">Fee Type</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFees.map((fee) => (
              <tr key={fee.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">#{fee.id}</td>
                <td className="px-4 py-3 font-medium">{fee.student}</td>
                <td className="px-4 py-3">{fee.class}</td>
                <td className="px-4 py-3">{fee.feeType}</td>
                <td className="px-4 py-3 text-right font-bold">${fee.amount}</td>
                <td className="px-4 py-3">{getStatusBadge(fee.status)}</td>
                <td className="px-4 py-3">
                  {fee.status !== 'paid' && (
                    <button className="text-orange-500 hover:underline text-sm">Record Payment</button>
                  )}
                  {fee.status === 'paid' && (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredFees.length === 0 && (
          <div className="text-center py-8 text-gray-400">No fees found</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span>Showing 1-{Math.min(filteredFees.length, 10)} of {filteredFees.length} students</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50">← Previous</button>
          <button className="px-3 py-1 border rounded bg-blue-900 text-white">1</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">Next →</button>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">📄 Create Invoice</h2>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Fee Category</label>
                <select
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.feeType}
                  onChange={(e) => setForm({...form, feeType: e.target.value})}
                >
                  {feeTypes.filter(f => f !== 'All').map(f => <option key={f}>{f}</option>)}
                </select>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.dueDate}
                  onChange={(e) => setForm({...form, dueDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
                <input
                  type="text"
                  placeholder="Additional notes..."
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowInvoiceModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateInvoice}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}