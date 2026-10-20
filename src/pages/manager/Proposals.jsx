// src/pages/manager/Proposals.jsx
import { useState } from 'react';

const initialProposals = [
  { id: 1, title: 'Library Renovation', type: 'Budget', amount: 5000, description: 'Renovate the school library with new furniture and books', priority: 'High', status: 'pending', date: '2025-06-01' },
  { id: 2, title: 'Science Fair 2026', type: 'Event', amount: 1200, description: 'Annual science fair with student projects', priority: 'Medium', status: 'approved', date: '2025-05-28' },
];

const proposalTypes = ['Budget', 'Project', 'Resource', 'Event'];
const priorities = ['High', 'Medium', 'Low'];

export default function Proposals() {
  const [proposals, setProposals] = useState(initialProposals);
  const [showModal, setShowModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [form, setForm] = useState({ title: '', type: 'Budget', amount: '', description: '', priority: 'Medium' });

  const handleCreate = () => {
    if (!form.title.trim() || !form.description.trim()) return;
    const newProposal = { id: Date.now(), ...form, amount: Number(form.amount) || 0, status: 'pending', date: new Date().toISOString().slice(0, 10) };
    setProposals([newProposal, ...proposals]);
    setShowModal(false);
    setForm({ title: '', type: 'Budget', amount: '', description: '', priority: 'Medium' });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>;
      case 'approved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Approved</span>;
      case 'rejected': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Rejected</span>;
      default: return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const filteredProposals = proposals.filter(p => filterStatus === 'all' ? true : p.status === filterStatus);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Proposals</h1>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">+ Create Proposal</button>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={() => setFilterStatus('all')} className={`px-4 py-2 rounded-lg ${filterStatus === 'all' ? 'bg-blue-900 text-white' : 'bg-white border'}`}>All</button>
        <button onClick={() => setFilterStatus('pending')} className={`px-4 py-2 rounded-lg ${filterStatus === 'pending' ? 'bg-yellow-500 text-white' : 'bg-white border'}`}>Pending</button>
        <button onClick={() => setFilterStatus('approved')} className={`px-4 py-2 rounded-lg ${filterStatus === 'approved' ? 'bg-green-500 text-white' : 'bg-white border'}`}>Approved</button>
        <button onClick={() => setFilterStatus('rejected')} className={`px-4 py-2 rounded-lg ${filterStatus === 'rejected' ? 'bg-red-500 text-white' : 'bg-white border'}`}>Rejected</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr><th className="px-4 py-3 text-left">ID</th><th>Title</th><th>Type</th><th>Amount</th><th>Priority</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {filteredProposals.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">#{p.id}</td>
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3">{p.type}</td>
                <td className="px-4 py-3">${p.amount.toLocaleString()}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.priority === 'High' ? 'bg-red-100 text-red-700' : p.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{p.priority}</span></td>
                <td className="px-4 py-3">{getStatusBadge(p.status)}</td>
                <td className="px-4 py-3">{p.date}</td>
                <td className="px-4 py-3"><button onClick={() => setSelectedProposal(p)} className="text-blue-900 hover:underline text-sm">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProposals.length === 0 && <div className="text-center py-8 text-gray-400">No proposals found</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Create Proposal</h2>
            <div className="space-y-3">
              <input type="text" placeholder="Title" className="w-full border rounded-lg px-4 py-2" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              <select className="w-full border rounded-lg px-4 py-2" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>{proposalTypes.map(t => <option key={t}>{t}</option>)}</select>
              <input type="number" placeholder="Amount ($)" className="w-full border rounded-lg px-4 py-2" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
              <select className="w-full border rounded-lg px-4 py-2" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>{priorities.map(p => <option key={p}>{p}</option>)}</select>
              <textarea placeholder="Description" className="w-full border rounded-lg px-4 py-2" rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            </div>
            <div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button><button onClick={handleCreate} className="px-4 py-2 bg-orange-500 text-white rounded-lg">Submit</button></div>
          </div>
        </div>
      )}

      {selectedProposal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Proposal Details</h2>
            <div className="space-y-2">
              <p><strong>Title:</strong> {selectedProposal.title}</p>
              <p><strong>Type:</strong> {selectedProposal.type}</p>
              <p><strong>Amount:</strong> ${selectedProposal.amount.toLocaleString()}</p>
              <p><strong>Priority:</strong> {selectedProposal.priority}</p>
              <p><strong>Status:</strong> {selectedProposal.status}</p>
              <p><strong>Description:</strong> {selectedProposal.description}</p>
              <p><strong>Date:</strong> {selectedProposal.date}</p>
            </div>
            <div className="flex justify-end mt-6"><button onClick={() => setSelectedProposal(null)} className="px-4 py-2 bg-blue-900 text-white rounded-lg">Close</button></div>
          </div>
        </div>
      )}
    </div>
  );
}