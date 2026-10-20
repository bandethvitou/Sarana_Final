import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialReports = [
  { id: 1, title: 'Broken Window in Room 12B', type: 'maintenance', status: 'pending', date: '2025-06-15', description: 'Window glass broken due to storm' },
  { id: 2, title: 'Library Light Bulb Out', type: 'maintenance', status: 'resolved', date: '2025-06-14', description: 'Fluorescent light needs replacement' },
  { id: 3, title: 'Water Pipe Leak - Boys Bathroom', type: 'safety', status: 'in_progress', date: '2025-06-13', description: 'Water pipe leaking, needs urgent repair' },
  { id: 4, title: 'Safety Concern - Broken Gate', type: 'safety', status: 'pending', date: '2025-06-12', description: 'Main gate hinge broken, security risk' },
];

export default function StaffReports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState(initialReports);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [form, setForm] = useState({
    title: '',
    type: 'maintenance',
    description: '',
  });

  const filteredReports = reports.filter(r => {
    const matchStatus = filterStatus === 'all' ? true : r.status === filterStatus;
    const matchType = filterType === 'all' ? true : r.type === filterType;
    return matchStatus && matchType;
  });

  const handleSubmit = () => {
    if (!form.title || !form.description) return;
    const newReport = {
      id: Date.now(),
      ...form,
      status: 'pending',
      date: new Date().toISOString().slice(0, 10),
    };
    setReports([newReport, ...reports]);
    setShowModal(false);
    setForm({ title: '', type: 'maintenance', description: '' });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>;
      case 'in_progress': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">In Progress</span>;
      case 'resolved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Resolved</span>;
      default: return null;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'maintenance': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Maintenance</span>;
      case 'safety': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Safety</span>;
      case 'supply': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Supply</span>;
      default: return null;
    }
  };

  const pendingCount = reports.filter(r => r.status === 'pending' || r.status === 'in_progress').length;
  const resolvedCount = reports.filter(r => r.status === 'resolved').length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📄 Reports</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          + Report Issue
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500">
          <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
          <div className="text-sm text-gray-500">Pending Reports</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{resolvedCount}</div>
          <div className="text-sm text-gray-500">Resolved</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-900">
          <div className="text-2xl font-bold text-blue-900">{reports.length}</div>
          <div className="text-sm text-gray-500">Total Reports</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select 
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        <select 
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="maintenance">Maintenance</option>
          <option value="safety">Safety</option>
          <option value="supply">Supply</option>
        </select>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{report.title}</td>
                <td className="px-4 py-3">{getTypeBadge(report.type)}</td>
                <td className="px-4 py-3">{report.date}</td>
                <td className="px-4 py-3">{getStatusBadge(report.status)}</td>
                <td className="px-4 py-3">
                  <button 
                    className="text-blue-900 hover:underline text-sm"
                    onClick={() => alert(`Report Details:\n\nTitle: ${report.title}\nType: ${report.type}\nStatus: ${report.status}\nDate: ${report.date}\n\nDescription: ${report.description}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredReports.length === 0 && (
          <div className="text-center py-8 text-gray-400">No reports found</div>
        )}
      </div>

      {/* Report Issue Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Report Issue</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Issue Title"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
              />
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={form.type}
                onChange={(e) => setForm({...form, type: e.target.value})}
              >
                <option value="maintenance">Maintenance</option>
                <option value="safety">Safety</option>
                <option value="supply">Supply Request</option>
              </select>
              <textarea
                placeholder="Description"
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
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
                onClick={handleSubmit}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}