import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockAtRisk = [
  { id: 1, student: 'Chan Rith', class: 'Grade 10B', avgScore: 45, attendance: 65, risk: 'High', flags: 'Academic, Attendance' },
  { id: 2, student: 'Sok Mala', class: 'Grade 12A', avgScore: 58, attendance: 82, risk: 'Medium', flags: 'Academic' },
  { id: 3, student: 'Kim Chan', class: 'Grade 11A', avgScore: 72, attendance: 88, risk: 'Low', flags: 'Behavioral' },
];

export default function AtRiskStudents() {
  const navigate = useNavigate();
  const [students] = useState(mockAtRisk);

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'High': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 High</span>;
      case 'Medium': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">🟠 Medium</span>;
      case 'Low': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 Low</span>;
      default: return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">⚠️ At-Risk Students</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select className="border rounded-lg px-4 py-2 bg-white">
          <option>All Risk Levels</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
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
            {students.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{s.student}</td>
                <td className="px-4 py-3">{s.class}</td>
                <td className="px-4 py-3">{s.avgScore}%</td>
                <td className="px-4 py-3">{s.attendance}%</td>
                <td className="px-4 py-3">{getRiskBadge(s.risk)}</td>
                <td className="px-4 py-3">{s.flags}</td>
                <td className="px-4 py-3">
                  <button className="text-orange-500 hover:underline text-sm mr-2">Create Case</button>
                  <button className="text-blue-900 hover:underline text-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}