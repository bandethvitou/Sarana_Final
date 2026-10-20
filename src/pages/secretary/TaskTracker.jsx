import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockTasks = [
  { id: 1, title: 'Review Budget Proposal', assignedTo: 'Director', priority: 'High', dueDate: '2025-06-25', status: 'In Progress' },
  { id: 2, title: 'Approve Staff Leave', assignedTo: 'Director', priority: 'Medium', dueDate: '2025-06-22', status: 'Pending' },
  { id: 3, title: 'Prepare Board Meeting Agenda', assignedTo: 'Secretary', priority: 'High', dueDate: '2025-06-20', status: 'Completed' },
];

export default function TaskTracker() {
  const navigate = useNavigate();

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 High</span>;
      case 'Medium': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">🟠 Medium</span>;
      case 'Low': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 Low</span>;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Completed</span>;
      case 'In Progress': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">🔄 In Progress</span>;
      case 'Pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">⏳ Pending</span>;
      default: return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📊 Task Tracker</h1>

      <button onClick={() => toast.success('📝 Opening add task...')} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mb-6">
        + Add Task
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Task</th>
              <th className="px-4 py-3 text-left">Assigned To</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Due Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockTasks.map(t => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{t.title}</td>
                <td className="px-4 py-3">{t.assignedTo}</td>
                <td className="px-4 py-3">{getPriorityBadge(t.priority)}</td>
                <td className="px-4 py-3">{t.dueDate}</td>
                <td className="px-4 py-3">{getStatusBadge(t.status)}</td>
                <td className="px-4 py-3">
                  <button className="text-blue-900 hover:underline text-sm mr-2">Edit</button>
                  <button className="text-green-600 hover:underline text-sm mr-2">Complete</button>
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