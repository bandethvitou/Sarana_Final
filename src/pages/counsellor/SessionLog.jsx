import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockSessions = [
  { id: 1, date: '2025-06-21', student: 'Sok Heng', case: 'C001', duration: 45, type: 'Individual', notes: 'Follow-up on academic progress' },
  { id: 2, date: '2025-06-21', student: 'Mey Lin', case: 'C002', duration: 30, type: 'Individual', notes: 'Behavioral assessment' },
];

export default function SessionLog() {
  const navigate = useNavigate();
  const [sessions] = useState(mockSessions);

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📋 Session Log</h1>
      
      <button onClick={() => toast.success('📝 Opening session log form...')} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mb-6">
        + Log Session
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Case #</th>
              <th className="px-4 py-3 text-left">Duration</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{s.date}</td>
                <td className="px-4 py-3 font-medium">{s.student}</td>
                <td className="px-4 py-3 font-mono text-xs">{s.case}</td>
                <td className="px-4 py-3">{s.duration} min</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{s.type}</span>
                </td>
                <td className="px-4 py-3 text-gray-500">{s.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}