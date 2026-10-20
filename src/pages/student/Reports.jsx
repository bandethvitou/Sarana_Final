import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const reportTypes = ['Request', 'Complaint', 'Suggestion', 'Medical Note'];

const submittedReports = [
  { id: 'R001', type: 'Request', subject: 'Library Book Request', date: '2025-06-20', status: 'Resolved' },
  { id: 'R002', type: 'Complaint', subject: 'Cafeteria Food', date: '2025-06-18', status: 'Under Review' },
  { id: 'R003', type: 'Suggestion', subject: 'New Sports Equipment', date: '2025-06-15', status: 'Pending' },
];

export default function Reports() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    type: 'Request',
    subject: '',
    description: '',
  });

  const handleSubmit = () => {
    if (!form.subject || !form.description) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('📄 Report submitted successfully!');
    setShowModal(false);
    setForm({ type: 'Request', subject: '', description: '' });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">⏳ Pending</span>;
      case 'Under Review': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">🟠 Under Review</span>;
      case 'Resolved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Resolved</span>;
      default: return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📄 Reports</h1>

      <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mb-6 font-medium">
        + Submit Report
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submittedReports.map((report) => (
              <tr key={report.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs font-bold">{report.id}</td>
                <td className="px-4 py-3">{report.type}</td>
                <td className="px-4 py-3">{report.subject}</td>
                <td className="px-4 py-3">{report.date}</td>
                <td className="px-4 py-3">{getStatusBadge(report.status)}</td>
                <td className="px-4 py-3">
                  <button className="text-blue-900 hover:underline text-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit Report Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">📄 Submit Report</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  className="w-full border rounded-lg px-4 py-2"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  {reportTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="4"
                  className="w-full border rounded-lg px-4 py-2"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachment</label>
                <input type="file" className="w-full border rounded-lg px-4 py-2" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}