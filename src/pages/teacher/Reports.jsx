import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const reportTypes = ['Student Issue', 'Classroom Issue', 'Academic Report', 'Supply Request'];

export default function Reports() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📄 Reports</h1>

      <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mb-6 font-medium">
        + Create Report
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {reportTypes.map((type) => (
          <div key={type} className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-2">
              {type === 'Student Issue' ? '🧑‍🎓' :
               type === 'Classroom Issue' ? '🏫' :
               type === 'Academic Report' ? '📊' :
               '📦'}
            </div>
            <p className="font-medium">{type}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">2025-06-20</td>
              <td className="px-4 py-3">Student Issue</td>
              <td className="px-4 py-3">Sok Mala – Attendance</td>
              <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span></td>
              <td className="px-4 py-3"><button className="text-blue-900 hover:underline text-sm">View</button></td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">2025-06-18</td>
              <td className="px-4 py-3">Academic Report</td>
              <td className="px-4 py-3">Grade 5B – Math Performance</td>
              <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Resolved</span></td>
              <td className="px-4 py-3"><button className="text-blue-900 hover:underline text-sm">View</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Create Report Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">📄 Create Report</h2>
            <div className="space-y-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  {reportTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label><input type="text" className="w-full border rounded-lg px-4 py-2" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description *</label><textarea rows="4" className="w-full border rounded-lg px-4 py-2"></textarea></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Send To</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>Manager</option>
                  <option>Top Manager</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <div className="flex gap-3">
                  <button className="px-4 py-2 border rounded-lg text-sm hover:bg-red-50">🔴 High</button>
                  <button className="px-4 py-2 border rounded-lg text-sm hover:bg-orange-50">🟠 Medium</button>
                  <button className="px-4 py-2 border rounded-lg text-sm hover:bg-green-50">🟢 Low</button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}