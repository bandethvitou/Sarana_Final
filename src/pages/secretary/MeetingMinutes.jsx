import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockMinutes = [
  { id: 1, date: '2025-06-19', title: 'Staff Meeting', attendees: 15, status: 'Final' },
  { id: 2, date: '2025-06-15', title: 'Board Meeting', attendees: 8, status: 'Draft' },
  { id: 3, date: '2025-06-12', title: 'Finance Meeting', attendees: 6, status: 'Final' },
];

export default function MeetingMinutes() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📄 Meeting Minutes</h1>

      <button onClick={() => toast.success('📝 Opening record minutes...')} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mb-6">
        + Record Minutes
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Meeting Title</th>
              <th className="px-4 py-3 text-left">Attendees</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockMinutes.map(m => (
              <tr key={m.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{m.date}</td>
                <td className="px-4 py-3 font-medium">{m.title}</td>
                <td className="px-4 py-3">{m.attendees}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${m.status === 'Final' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{m.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-900 hover:underline text-sm mr-2">View</button>
                  <button className="text-orange-500 hover:underline text-sm mr-2">Edit</button>
                  <button className="text-red-500 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}