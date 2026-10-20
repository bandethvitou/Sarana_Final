import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockCases = [
  { id: 'C001', student: 'Sok Heng', class: 'Grade 10A', issue: 'Academic', opened: '2025-06-01', status: 'Active' },
  { id: 'C002', student: 'Mey Lin', class: 'Grade 8B', issue: 'Behavioral', opened: '2025-06-10', status: 'Active' },
  { id: 'C003', student: 'David', class: 'Grade 12A', issue: 'Emotional', opened: '2025-06-15', status: 'In Progress' },
];

export default function StudentCases() {
  const navigate = useNavigate();
  const [cases] = useState(mockCases);

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">🧑‍🎓 Student Cases</h1>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={() => toast.success('📝 Opening new case form...')} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          + New Case
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Case #</th>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-left">Issue Type</th>
              <th className="px-4 py-3 text-left">Opened Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs font-bold">{c.id}</td>
                <td className="px-4 py-3 font-medium">{c.student}</td>
                <td className="px-4 py-3">{c.class}</td>
                <td className="px-4 py-3">{c.issue}</td>
                <td className="px-4 py-3">{c.opened}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    c.status === 'Active' ? 'bg-green-100 text-green-700' :
                    c.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>{c.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-900 hover:underline text-sm mr-2">View</button>
                  <button className="text-orange-500 hover:underline text-sm">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}