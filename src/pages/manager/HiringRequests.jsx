// src/pages/manager/HiringRequests.jsx
import { useState } from 'react';

// Mock data – hiring requests
const initialRequests = [
  { 
    id: 1, 
    position: 'Math Teacher', 
    department: 'Academic', 
    numberOfPositions: 2,
    justification: 'Increased student enrollment in Grade 5-6',
    priority: 'High',
    status: 'pending',
    date: '2025-06-01'
  },
  { 
    id: 2, 
    position: 'Lab Assistant', 
    department: 'Academic', 
    numberOfPositions: 1,
    justification: 'New science lab opening next semester',
    priority: 'Medium',
    status: 'approved',
    date: '2025-05-28'
  },
];

const departments = ['Academic', 'Finance', 'Operations', 'HR'];
const priorities = ['High', 'Medium', 'Low'];

export default function HiringRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [form, setForm] = useState({
    position: '',
    department: 'Academic',
    numberOfPositions: 1,
    justification: '',
    priority: 'Medium',
  });

  const handleCreate = () => {
    if (!form.position.trim() || !form.justification.trim()) return;
    
    const newRequest = {
      id: Date.now(),
      ...form,
      status: 'pending',
      date: new Date().toISOString().slice(0, 10),
    };
    setRequests([newRequest, ...requests]);
    setShowModal(false);
    setForm({ position: '', department: 'Academic', numberOfPositions: 1, justification: '', priority: 'Medium' });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>;
      case 'approved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Approved</span>;
      case 'rejected': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Rejected</span>;
      default: return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">High</span>;
      case 'Medium': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Medium</span>;
      case 'Low': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Low</span>;
      default: return null;
    }
  };

  const filteredRequests = requests.filter(req => {
    if (filterStatus === 'all') return true;
    return req.status === filterStatus;
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Hiring Requests</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          + Create Hiring Request
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500">
          <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{requests.filter(r => r.status === 'approved').length}</div>
          <div className="text-sm text-gray-500">Approved</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">{requests.filter(r => r.status === 'rejected').length}</div>
          <div className="text-sm text-gray-500">Rejected</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-3 mb-6">
        <button onClick={() => setFilterStatus('all')} className={`px-4 py-2 rounded-lg ${filterStatus === 'all' ? 'bg-blue-900 text-white' : 'bg-white border'}`}>All</button>
        <button onClick={() => setFilterStatus('pending')} className={`px-4 py-2 rounded-lg ${filterStatus === 'pending' ? 'bg-yellow-500 text-white' : 'bg-white border'}`}>Pending</button>
        <button onClick={() => setFilterStatus('approved')} className={`px-4 py-2 rounded-lg ${filterStatus === 'approved' ? 'bg-green-500 text-white' : 'bg-white border'}`}>Approved</button>
        <button onClick={() => setFilterStatus('rejected')} className={`px-4 py-2 rounded-lg ${filterStatus === 'rejected' ? 'bg-red-500 text-white' : 'bg-white border'}`}>Rejected</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Position</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">#{req.id}</td>
                <td className="px-4 py-3 font-medium">{req.position}</td>
                <td className="px-4 py-3">{req.department}</td>
                <td className="px-4 py-3">{req.numberOfPositions}</td>
                <td className="px-4 py-3">{getPriorityBadge(req.priority)}</td>
                <td className="px-4 py-3">{getStatusBadge(req.status)}</td>
                <td className="px-4 py-3">{req.date}</td>
                <td className="px-4 py-3">
                  <button onClick={() => setSelectedRequest(req)} className="text-blue-900 hover:underline text-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRequests.length === 0 && (
          <div className="text-center py-8 text-gray-400">No hiring requests found</div>
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Create Hiring Request</h2>
            <div className="space-y-3">
              <input type="text" placeholder="Position Title" className="w-full border rounded-lg px-4 py-2" value={form.position} onChange={e => setForm({...form, position: e.target.value})} />
              <select className="w-full border rounded-lg px-4 py-2" value={form.department} onChange={e => setForm({...form, department: e.target.value})}>
                {departments.map(d => <option key={d}>{d}</option>)}
              </select>
              <input type="number" min="1" placeholder="Number of Positions" className="w-full border rounded-lg px-4 py-2" value={form.numberOfPositions} onChange={e => setForm({...form, numberOfPositions: parseInt(e.target.value) || 1})} />
              <select className="w-full border rounded-lg px-4 py-2" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
                {priorities.map(p => <option key={p}>{p}</option>)}
              </select>
              <textarea placeholder="Justification" className="w-full border rounded-lg px-4 py-2" rows="3" value={form.justification} onChange={e => setForm({...form, justification: e.target.value})} />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button onClick={handleCreate} className="px-4 py-2 bg-orange-500 text-white rounded-lg">Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Request Details</h2>
            <div className="space-y-2">
              <p><strong>Position:</strong> {selectedRequest.position}</p>
              <p><strong>Department:</strong> {selectedRequest.department}</p>
              <p><strong># Positions:</strong> {selectedRequest.numberOfPositions}</p>
              <p><strong>Priority:</strong> {selectedRequest.priority}</p>
              <p><strong>Status:</strong> {selectedRequest.status}</p>
              <p><strong>Justification:</strong> {selectedRequest.justification}</p>
              <p><strong>Date:</strong> {selectedRequest.date}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={() => setSelectedRequest(null)} className="px-4 py-2 bg-blue-900 text-white rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}