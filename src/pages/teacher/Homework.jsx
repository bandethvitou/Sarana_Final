import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const homeworkList = [
  { id: 1, class: 'Grade 5B', subject: 'Math', title: 'Fractions Worksheet', dueDate: '2025-06-23', submitted: 15, total: 20, status: 'active' },
  { id: 2, class: 'Grade 6A', subject: 'Science', title: 'Photosynthesis Report', dueDate: '2025-06-25', submitted: 0, total: 22, status: 'active' },
  { id: 3, class: 'Grade 5A', subject: 'Math', title: 'Decimal Practice', dueDate: '2025-06-20', submitted: 20, total: 20, status: 'past' },
];

export default function Homework() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const getStatusBadge = (status) => {
    return status === 'active'
      ? <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Active</span>
      : <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">📅 Past</span>;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📚 Homework</h1>

      <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mb-6 font-medium">
        + Assign Homework
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Due Date</th>
              <th className="px-4 py-3 text-left">Submissions</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {homeworkList.map((hw) => (
              <tr key={hw.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{hw.class}</td>
                <td className="px-4 py-3">{hw.subject}</td>
                <td className="px-4 py-3">{hw.title}</td>
                <td className="px-4 py-3">{hw.dueDate}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(hw.submitted / hw.total) * 100}%` }}></div>
                    </div>
                    <span className="text-xs">{hw.submitted}/{hw.total}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{getStatusBadge(hw.status)}</td>
                <td className="px-4 py-3">
                  <button className="text-blue-900 hover:underline text-sm mr-2">View</button>
                  {hw.status === 'active' && <button className="text-red-500 hover:underline text-sm">Delete</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assign Homework Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">📚 Assign Homework</h2>
            <div className="space-y-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>Grade 5B</option>
                  <option>Grade 6A</option>
                  <option>Grade 5A</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Title *</label><input type="text" className="w-full border rounded-lg px-4 py-2" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea rows="3" className="w-full border rounded-lg px-4 py-2"></textarea></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label><input type="date" className="w-full border rounded-lg px-4 py-2" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Attachment</label><input type="file" className="w-full border rounded-lg px-4 py-2" /></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Assign</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}