import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const students = [
  { id: 1, name: 'Sok Heng', status: 'present' },
  { id: 2, name: 'Srey Mom', status: 'present' },
  { id: 3, name: 'David', status: 'absent' },
  { id: 4, name: 'Kim Chan', status: 'present' },
  { id: 5, name: 'Sok Mala', status: 'late' },
  { id: 6, name: 'Mey Lin', status: 'present' },
  { id: 7, name: 'Pech Sopheak', status: 'absent' },
  { id: 8, name: 'Chhay Srey', status: 'present' },
];

export default function Attendance() {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState(students);

  const statusColors = {
    present: 'bg-green-100 text-green-700',
    absent: 'bg-red-100 text-red-700',
    late: 'bg-yellow-100 text-yellow-700',
  };

  const handleStatusChange = (id, status) => {
    setAttendance(attendance.map(s => s.id === id ? { ...s, status } : s));
  };

  const handleMarkAllPresent = () => {
    setAttendance(attendance.map(s => ({ ...s, status: 'present' })));
    toast.success('✅ All marked present!');
  };

  const handleMarkAllAbsent = () => {
    setAttendance(attendance.map(s => ({ ...s, status: 'absent' })));
    toast.success('✅ All marked absent!');
  };

  const handleSave = () => {
    const present = attendance.filter(s => s.status === 'present').length;
    const absent = attendance.filter(s => s.status === 'absent').length;
    const late = attendance.filter(s => s.status === 'late').length;
    toast.success(`✅ Attendance saved! Present: ${present}, Absent: ${absent}, Late: ${late}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">✅ Attendance</h1>

      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select className="border rounded-lg px-4 py-2 bg-white">
              <option>Grade 5B</option>
              <option>Grade 6A</option>
              <option>Grade 5A</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select className="border rounded-lg px-4 py-2 bg-white">
              <option>Math</option>
              <option>Science</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" className="border rounded-lg px-4 py-2 bg-white" defaultValue="2025-06-21" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleMarkAllPresent} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">✅ All Present</button>
            <button onClick={handleMarkAllAbsent} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">❌ All Absent</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Student Name</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-left">Comment</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((student, idx) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3 font-medium">{student.name}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    {['present', 'absent', 'late'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(student.id, status)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                          student.status === status
                            ? `${statusColors[status]} ring-2 ring-offset-2 ring-blue-500`
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <input type="text" className="border border-gray-300 rounded px-2 py-1 text-sm w-full max-w-xs" placeholder="Comment..." />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between">
        <div className="flex gap-6 text-sm">
          <span>✅ Present: <span className="font-bold text-green-600">{attendance.filter(s => s.status === 'present').length}</span></span>
          <span>❌ Absent: <span className="font-bold text-red-600">{attendance.filter(s => s.status === 'absent').length}</span></span>
          <span>🕒 Late: <span className="font-bold text-yellow-600">{attendance.filter(s => s.status === 'late').length}</span></span>
        </div>
        <button onClick={handleSave} className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">💾 Save Attendance</button>
      </div>
    </div>
  );
}