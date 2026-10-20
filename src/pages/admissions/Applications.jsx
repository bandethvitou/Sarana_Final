import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockApplications = [
  { id: 'APP-2025-001', name: 'Sok Heng', level: 'Kids (Grade 5)', parent: 'Mr. Heng', phone: '012-345-678', date: '2025-06-15', status: 'pending' },
  { id: 'APP-2025-002', name: 'Mey Lin', level: 'Junior (Grade 8)', parent: 'Ms. Lin', phone: '012-345-679', date: '2025-06-14', status: 'approved' },
  { id: 'APP-2025-003', name: 'David', level: 'Senior (Grade 10)', parent: 'Mr. David', phone: '012-345-680', date: '2025-06-13', status: 'rejected' },
  { id: 'APP-2025-004', name: 'Sok Sreyneang', level: 'Kids (Grade 3)', parent: 'Mrs. Sreyneang', phone: '012-345-681', date: '2025-06-12', status: 'pending' },
  { id: 'APP-2025-005', name: 'Kim Menghong', level: 'Baby (0.2)', parent: 'Mr. Kim', phone: '012-345-682', date: '2025-06-11', status: 'draft' },
];

const statuses = ['All', 'pending', 'approved', 'rejected', 'draft'];

export default function Applications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState(mockApplications);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);

  const filtered = applications.filter(app => {
    const matchSearch = app.name.toLowerCase().includes(search.toLowerCase()) || app.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">⏳ Pending</span>;
      case 'approved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Approved</span>;
      case 'rejected': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">❌ Rejected</span>;
      case 'draft': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">📄 Draft</span>;
      default: return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📋 Applications</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <input type="text" placeholder="Search by name or ID..." className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-900" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          {statuses.map(s => <option key={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Student Name</th>
              <th className="px-4 py-3 text-left">Level</th>
              <th className="px-4 py-3 text-left">Parent</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => (
              <tr key={app.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{app.id}</td>
                <td className="px-4 py-3">{app.name}</td>
                <td className="px-4 py-3">{app.level}</td>
                <td className="px-4 py-3">{app.parent}</td>
                <td className="px-4 py-3">{app.phone}</td>
                <td className="px-4 py-3">{app.date}</td>
                <td className="px-4 py-3">{getStatusBadge(app.status)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => setSelectedApp(app)} className="text-blue-900 hover:underline text-sm mr-2">View</button>
                  {app.status === 'pending' && (
                    <>
                      <button className="text-green-600 hover:underline text-sm mr-2">Approve</button>
                      <button className="text-red-500 hover:underline text-sm">Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-8 text-gray-400">No applications found</div>}
      </div>

      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-blue-900">{selectedApp.id}</h2>
              <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>Student:</strong> {selectedApp.name}</p>
              <p><strong>Level:</strong> {selectedApp.level}</p>
              <p><strong>Parent:</strong> {selectedApp.parent}</p>
              <p><strong>Phone:</strong> {selectedApp.phone}</p>
              <p><strong>Applied:</strong> {selectedApp.date}</p>
              <p><strong>Status:</strong> {getStatusBadge(selectedApp.status)}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {selectedApp.status === 'pending' && (
                <>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Approve</button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Reject</button>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Request Documents</button>
                </>
              )}
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50" onClick={() => setSelectedApp(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}