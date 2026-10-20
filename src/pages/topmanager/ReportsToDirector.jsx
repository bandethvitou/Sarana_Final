import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialReports = [
  { id: 1, title: 'Q2 Enrollment Report', type: 'Progress', summary: 'Enrollment increased by 35 students this quarter.', includeManagerReports: true, date: '2025-06-10', status: 'submitted' },
  { id: 2, title: 'Academic Performance Review', type: 'Completion', summary: 'All levels have completed their academic reviews.', includeManagerReports: false, date: '2025-06-08', status: 'submitted' },
  { id: 3, title: 'Budget Forecast Q3', type: 'Proposal', summary: 'Projected budget for next quarter based on current spending.', includeManagerReports: true, date: '2025-06-12', status: 'draft' },
];

export default function ReportsToDirector() {
  const navigate = useNavigate();
  const [reports, setReports] = useState(initialReports);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [form, setForm] = useState({
    title: '',
    type: 'Progress',
    summary: '',
    includeManagerReports: false,
  });

  const handleCreate = () => {
    if (!form.title.trim() || !form.summary.trim()) return;
    const newReport = {
      id: Date.now(),
      ...form,
      date: new Date().toISOString().slice(0, 10),
      status: 'draft',
    };
    setReports([newReport, ...reports]);
    setShowModal(false);
    setForm({ title: '', type: 'Progress', summary: '', includeManagerReports: false });
  };

  const handleSubmit = (id) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: 'submitted' } : r));
  };

  const handleDelete = (id) => {
    setReports(reports.filter(r => r.id !== id));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'draft': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Draft</span>;
      case 'submitted': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Submitted</span>;
      case 'approved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Approved</span>;
      case 'rejected': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Rejected</span>;
      default: return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'Progress': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Progress</span>;
      case 'Completion': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Completion</span>;
      case 'Proposal': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">Proposal</span>;
      case 'Issue': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Issue</span>;
      default: return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{type}</span>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📄 Reports to Director</h1>
        <button 
          onClick={() => setShowModal(true)} 
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          + Create Report
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-gray-500">
          <div className="text-2xl font-bold text-gray-600">{reports.filter(r => r.status === 'draft').length}</div>
          <div className="text-sm text-gray-500">Drafts</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{reports.filter(r => r.status === 'submitted').length}</div>
          <div className="text-sm text-gray-500">Submitted</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
          <div className="text-2xl font-bold text-blue-600">{reports.filter(r => r.status === 'approved').length}</div>
          <div className="text-sm text-gray-500">Approved</div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">#{r.id}</td>
                <td className="px-4 py-3 font-medium">{r.title}</td>
                <td className="px-4 py-3">{getTypeBadge(r.type)}</td>
                <td className="px-4 py-3">{r.date}</td>
                <td className="px-4 py-3">{getStatusBadge(r.status)}</td>
                <td className="px-4 py-3">
                  <button 
                    onClick={() => setSelectedReport(r)} 
                    className="text-orange-500 hover:underline text-sm font-medium"
                  >
                    {r.status === 'draft' ? 'Edit' : 'View'}
                  </button>
                  {r.status === 'draft' && (
                    <>
                      <span className="mx-1 text-gray-300">|</span>
                      <button 
                        onClick={() => handleSubmit(r.id)} 
                        className="text-green-600 hover:underline text-sm font-medium"
                      >
                        Submit
                      </button>
                    </>
                  )}
                  {r.status === 'draft' && (
                    <>
                      <span className="mx-1 text-gray-300">|</span>
                      <button 
                        onClick={() => handleDelete(r.id)} 
                        className="text-red-500 hover:underline text-sm font-medium"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reports.length === 0 && (
          <div className="text-center py-8 text-gray-400">No reports found</div>
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Create Report for Director</h2>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Report Title" 
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
              />
              <select 
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={form.type}
                onChange={(e) => setForm({...form, type: e.target.value})}
              >
                <option value="Progress">Progress</option>
                <option value="Completion">Completion</option>
                <option value="Proposal">Proposal</option>
                <option value="Issue">Issue</option>
              </select>
              <textarea 
                placeholder="Summary" 
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                rows="4"
                value={form.summary}
                onChange={(e) => setForm({...form, summary: e.target.value})}
              />
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={form.includeManagerReports}
                  onChange={(e) => setForm({...form, includeManagerReports: e.target.checked})}
                  className="rounded text-blue-900 focus:ring-blue-900"
                />
                Include manager reports
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowModal(false)} 
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreate} 
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Create Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Report Details</h2>
            <div className="space-y-2">
              <p><strong>Title:</strong> {selectedReport.title}</p>
              <p><strong>Type:</strong> {selectedReport.type}</p>
              <p><strong>Date:</strong> {selectedReport.date}</p>
              <p><strong>Status:</strong> {getStatusBadge(selectedReport.status)}</p>
              <p><strong>Summary:</strong> {selectedReport.summary}</p>
              <p><strong>Includes Manager Reports:</strong> {selectedReport.includeManagerReports ? '✅ Yes' : '❌ No'}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button 
                onClick={() => setSelectedReport(null)} 
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