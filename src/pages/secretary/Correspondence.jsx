import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockCorrespondence = [
  { id: 1, date: '2025-06-20', type: 'Incoming', fromTo: 'Ministry of Education', subject: 'Annual Report Submission', priority: 'High', status: 'Pending' },
  { id: 2, date: '2025-06-19', type: 'Outgoing', fromTo: 'School Board', subject: 'Meeting Minutes Approval', priority: 'Medium', status: 'Replied' },
];

export default function Correspondence() {
  const navigate = useNavigate();

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 High</span>;
      case 'Medium': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">🟠 Medium</span>;
      case 'Low': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 Low</span>;
      default: return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📋 Correspondence</h1>

      <button onClick={() => toast.success('📝 Opening correspondence log...')} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mb-6">
        + Log Correspondence
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">From/To</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCorrespondence.map(c => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{c.date}</td>
                <td className="px-4 py-3">{c.type}</td>
                <td className="px-4 py-3 font-medium">{c.fromTo}</td>
                <td className="px-4 py-3">{c.subject}</td>
                <td className="px-4 py-3">{getPriorityBadge(c.priority)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{c.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-900 hover:underline text-sm mr-2">View</button>
                  <button className="text-orange-500 hover:underline text-sm">Reply</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}