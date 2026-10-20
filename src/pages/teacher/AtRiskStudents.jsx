import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const atRiskStudents = [
  { id: 1, name: 'Sok Mala', class: 'Grade 5B', avgScore: 45, attendance: 65, risk: 'High', flags: 'Academic, Attendance' },
  { id: 2, name: 'Chan Rith', class: 'Grade 6A', avgScore: 55, attendance: 82, risk: 'Medium', flags: 'Academic' },
  { id: 3, name: 'Kim Chan', class: 'Grade 5A', avgScore: 72, attendance: 88, risk: 'Low', flags: 'Behavioral' },
  { id: 4, name: 'Pech Sopheak', class: 'Grade 6B', avgScore: 48, attendance: 70, risk: 'High', flags: 'Academic, Attendance' },
];

export default function AtRiskStudents() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'High': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 High</span>;
      case 'Medium': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">🟠 Medium</span>;
      case 'Low': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 Low</span>;
      default: return null;
    }
  };

  const filtered = atRiskStudents.filter(s => filter === 'all' || s.risk.toLowerCase() === filter);

  const handleNotifyParent = (student) => {
    toast.success(`📧 Parent of ${student} notified!`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">⚠️ At-Risk Students</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select className="border rounded-lg px-4 py-2 bg-white" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Risk Levels</option>
          <option value="high">🔴 High</option>
          <option value="medium">🟠 Medium</option>
          <option value="low">🟡 Low</option>
        </select>
        <button className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">📤 Export List</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-left">Avg Score</th>
              <th className="px-4 py-3 text-left">Attendance</th>
              <th className="px-4 py-3 text-left">Risk Level</th>
              <th className="px-4 py-3 text-left">Flags</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3">{s.class}</td>
                <td className="px-4 py-3">{s.avgScore}%</td>
                <td className="px-4 py-3">{s.attendance}%</td>
                <td className="px-4 py-3">{getRiskBadge(s.risk)}</td>
                <td className="px-4 py-3">{s.flags}</td>
                <td className="px-4 py-3">
                  <button className="text-blue-900 hover:underline text-sm mr-2">View</button>
                  <button onClick={() => handleNotifyParent(s.name)} className="text-orange-500 hover:underline text-sm mr-2">Notify</button>
                  <button className="text-red-500 hover:underline text-sm">Report</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}