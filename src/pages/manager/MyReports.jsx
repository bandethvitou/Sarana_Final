// src/pages/manager/MyReports.jsx
import { useState } from 'react';

const initialReports = [
  { id: 1, title: 'Q2 Progress Update', type: 'Progress', content: 'Team has achieved 80% of Q2 targets. Need to focus on enrollment.', sendTo: 'Top Manager', date: '2025-06-10', status: 'submitted' },
  { id: 2, title: 'Staff Shortage Alert', type: 'Issue', content: 'Two staff members are leaving next month. Need to start hiring.', sendTo: 'Director', date: '2025-06-08', status: 'under_review' },
];

const reportTypes = ['Issue', 'Progress', 'Completion', 'Information'];

export default function MyReports() {
  const [reports, setReports] = useState(initialReports);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', type: 'Progress', content: '', sendTo: 'Top Manager' });

  const handleCreate = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    const newReport = { id: Date.now(), ...form, date: new Date().toISOString().slice(0, 10), status: 'submitted' };
    setReports([newReport, ...reports]);
    setShowModal(false);
    setForm({ title: '', type: 'Progress', content: '', sendTo: 'Top Manager' });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'submitted': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Submitted</span>;
      case 'under_review': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Under Review</span>;
      case 'approved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Approved</span>;
      default: return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">My Reports</h1>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">+ Create Report</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr><th className="px-4 py-3 text-left">ID</th><th>Title</th><th>Type</th><th>Sent To</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">#{r.id}</td>
                <td className="px-4 py-3 font-medium">{r.title}</td>
                <td className="px-4 py-3">{r.type}</td>
                <td className="px-4 py-3">{r.sendTo}</td>
                <td className="px-4 py-3">{r.date}</td>
                <td className="px-4 py-3">{getStatusBadge(r.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {reports.length === 0 && <div className="text-center py-8 text-gray-400">No reports found</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Create Report</h2>
            <div className="space-y-3">
              <input type="text" placeholder="Title" className="w-full border rounded-lg px-4 py-2" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              <select className="w-full border rounded-lg px-4 py-2" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>{reportTypes.map(t => <option key={t}>{t}</option>)}</select>
              <select className="w-full border rounded-lg px-4 py-2" value={form.sendTo} onChange={e => setForm({...form, sendTo: e.target.value})}><option>Top Manager</option><option>Director</option></select>
              <textarea placeholder="Content" className="w-full border rounded-lg px-4 py-2" rows="4" value={form.content} onChange={e => setForm({...form, content: e.target.value})} />
            </div>
            <div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button><button onClick={handleCreate} className="px-4 py-2 bg-orange-500 text-white rounded-lg">Submit</button></div>
          </div>
        </div>
      )}
    </div>
  );
}   