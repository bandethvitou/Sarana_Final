import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockExpenses = [
  { id: 1, category: 'Electricity', amount: 450, dueDate: '2025-06-25', status: 'pending', requestedBy: 'Mr. Rudi', description: 'June electricity bill' },
  { id: 2, category: 'Water', amount: 120, dueDate: '2025-06-20', status: 'paid', requestedBy: 'Ms. Siti', description: 'June water bill' },
  { id: 3, category: 'Maintenance', amount: 300, dueDate: '2025-06-18', status: 'pending', requestedBy: 'Mr. Budi', description: 'AC repair - Room 5A' },
  { id: 4, category: 'Salary', amount: 12000, dueDate: '2025-06-30', status: 'pending', requestedBy: 'HR', description: 'June staff payroll' },
  { id: 5, category: 'Supplies', amount: 85, dueDate: '2025-06-22', status: 'paid', requestedBy: 'Ms. Linda', description: 'Office supplies' },
  { id: 6, category: 'Transport', amount: 200, dueDate: '2025-06-28', status: 'rejected', requestedBy: 'Mr. Heng', description: 'Vehicle maintenance' },
  { id: 7, category: 'Events', amount: 150, dueDate: '2025-06-15', status: 'paid', requestedBy: 'Ms. Siti', description: 'Sports Day decorations' },
  { id: 8, category: 'Other', amount: 75, dueDate: '2025-06-19', status: 'pending', requestedBy: 'Mr. Rudi', description: 'Miscellaneous supplies' },
];

const categories = ['All', 'Electricity', 'Water', 'Maintenance', 'Salary', 'Supplies', 'Transport', 'Events', 'Other'];
const statuses = ['All', 'pending', 'paid', 'rejected'];

export default function Expenses() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState(mockExpenses);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [form, setForm] = useState({
    category: 'Electricity',
    amount: '',
    dueDate: '',
    description: '',
    requestedBy: '',
    attachment: null,
  });

  const filteredExpenses = expenses.filter(e => {
    const matchSearch = e.description.toLowerCase().includes(search.toLowerCase()) || 
                        e.requestedBy.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'All' || e.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">⏳ Pending</span>;
      case 'paid': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Paid</span>;
      case 'rejected': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">❌ Rejected</span>;
      default: return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Electricity': '⚡',
      'Water': '💧',
      'Maintenance': '🔧',
      'Salary': '💰',
      'Supplies': '📦',
      'Transport': '🚗',
      'Events': '🎉',
      'Other': '📌',
    };
    return icons[category] || '📌';
  };

  const handleApprove = (id) => {
    setExpenses(expenses.map(e => e.id === id ? { ...e, status: 'paid' } : e));
  };

  const handleReject = (id) => {
    if (window.confirm('Reject this expense?')) {
      setExpenses(expenses.map(e => e.id === id ? { ...e, status: 'rejected' } : e));
    }
  };

  const handleAddExpense = () => {
    if (!form.amount || !form.dueDate || !form.requestedBy) return;
    const newExpense = {
      id: Date.now(),
      ...form,
      amount: parseFloat(form.amount),
      status: 'pending',
    };
    setExpenses([newExpense, ...expenses]);
    setShowAddModal(false);
    setForm({ category: 'Electricity', amount: '', dueDate: '', description: '', requestedBy: '', attachment: null });
  };

  const handleRequestBillApproval = () => {
    alert('📋 Bill approval request sent to Director.');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">🧾 Expenses Management</h1>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500">
          <div className="text-2xl font-bold text-yellow-600">{expenses.filter(e => e.status === 'pending').length}</div>
          <div className="text-sm text-gray-500">Pending Approval</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{expenses.filter(e => e.status === 'paid').length}</div>
          <div className="text-sm text-gray-500">Paid</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">{expenses.filter(e => e.status === 'rejected').length}</div>
          <div className="text-sm text-gray-500">Rejected</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-900">
          <div className="text-2xl font-bold text-blue-900">${expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}</div>
          <div className="text-sm text-gray-500">Total Expenses</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Category</label>
            <select 
              className="border rounded-lg px-3 py-2 bg-white"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(c => <option key={c}>{c}</option>)}
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
              placeholder="Search description or requester..."
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
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          + Add Expense
        </button>
        <button 
          onClick={handleRequestBillApproval}
          className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors"
        >
          📋 Request Bill Approval
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-left">Due Date</th>
              <th className="px-4 py-3 text-left">Requested By</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">#{expense.id}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1">
                    {getCategoryIcon(expense.category)} {expense.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-bold">${expense.amount}</td>
                <td className="px-4 py-3">{expense.dueDate}</td>
                <td className="px-4 py-3">{expense.requestedBy}</td>
                <td className="px-4 py-3">{getStatusBadge(expense.status)}</td>
                <td className="px-4 py-3">
                  {expense.status === 'pending' && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleApprove(expense.id)}
                        className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(expense.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {expense.status !== 'pending' && (
                    <button 
                      onClick={() => setSelectedExpense(expense)}
                      className="text-blue-900 hover:underline text-xs"
                    >
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredExpenses.length === 0 && (
          <div className="text-center py-8 text-gray-400">No expenses found</div>
        )}
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-blue-900 mb-4">🧾 Add Expense</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.category}
                  onChange={(e) => setForm({...form, category: e.target.value})}
                >
                  {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  placeholder="e.g., 450"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g., June electricity bill"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requested By</label>
                <input
                  type="text"
                  placeholder="e.g., Mr. Rudi"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.requestedBy}
                  onChange={(e) => setForm({...form, requestedBy: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachment (optional)</label>
                <input
                  type="file"
                  className="w-full border rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={(e) => setForm({...form, attachment: e.target.files[0]})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddExpense}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Expense Modal */}
      {selectedExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Expense Details</h2>
            <div className="space-y-2 text-sm">
              <p><strong>ID:</strong> #{selectedExpense.id}</p>
              <p><strong>Category:</strong> {getCategoryIcon(selectedExpense.category)} {selectedExpense.category}</p>
              <p><strong>Amount:</strong> <span className="font-bold text-blue-900">${selectedExpense.amount}</span></p>
              <p><strong>Due Date:</strong> {selectedExpense.dueDate}</p>
              <p><strong>Status:</strong> {getStatusBadge(selectedExpense.status)}</p>
              <p><strong>Requested By:</strong> {selectedExpense.requestedBy}</p>
              <p><strong>Description:</strong> {selectedExpense.description}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button 
                onClick={() => setSelectedExpense(null)}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}