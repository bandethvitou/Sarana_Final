import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockMeetings = [
  { id: 1, date: '2025-06-22', time: '9:00 AM', parent: 'Mr. Heng', student: 'Sok Heng', purpose: 'Academic Review', status: 'Scheduled' },
  { id: 2, date: '2025-06-24', time: '10:30 AM', parent: 'Mrs. Srey', student: 'Mey Lin', purpose: 'Behavioral Update', status: 'Scheduled' },
];

export default function ParentMeetings() {
  const navigate = useNavigate();
  const [meetings] = useState(mockMeetings);

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">👨‍👩‍👧 Parent Meetings</h1>

      <button onClick={() => toast.success('📅 Opening schedule meeting...')} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mb-6">
        + Schedule Meeting
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Parent</th>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Purpose</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{m.date}</td>
                <td className="px-4 py-3">{m.time}</td>
                <td className="px-4 py-3 font-medium">{m.parent}</td>
                <td className="px-4 py-3">{m.student}</td>
                <td className="px-4 py-3">{m.purpose}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{m.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-green-600 hover:underline text-sm mr-2">Complete</button>
                  <button className="text-red-500 hover:underline text-sm">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}