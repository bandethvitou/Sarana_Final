import { useState } from 'react';

const initialTasks = [
  { id: 1, title: 'Review Q2 Budget', assignedTo: 'Mr. John', dueDate: '2025-06-20', priority: 'High', status: 'pending' },
  { id: 2, title: 'Submit Enrollment Report', assignedTo: 'Ms. Anna', dueDate: '2025-06-25', priority: 'Medium', status: 'in_progress' },
  { id: 3, title: 'Schedule Staff Training', assignedTo: 'Mr. Rudi', dueDate: '2025-06-30', priority: 'Low', status: 'pending' },
  { id: 4, title: 'Update Academic Calendar', assignedTo: 'Mrs. Linda', dueDate: '2025-06-15', priority: 'High', status: 'completed' },
];

const managers = ['Mr. John', 'Ms. Anna', 'Mr. Rudi', 'Mrs. Linda'];

export default function TaskAssignments() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [form, setForm] = useState({ title: '', assignedTo: '', dueDate: '', priority: 'Medium' });

  const filteredTasks = tasks.filter(t => filterStatus === 'all' ? true : t.status === filterStatus);

  const handleCreate = () => {
    if (!form.title.trim() || !form.assignedTo) return;
    const newTask = { id: Date.now(), ...form, status: 'pending' };
    setTasks([newTask, ...tasks]);
    setShowModal(false);
    setForm({ title: '', assignedTo: '', dueDate: '', priority: 'Medium' });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>;
      case 'in_progress': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">In Progress</span>;
      case 'completed': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Completed</span>;
      default: return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">High</span>;
      case 'Medium': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Medium</span>;
      case 'Low': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Low</span>;
      default: return null;
    }
  };

  const pendingCount = tasks.filter(t => t.status === 'pending').length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📊 Task Assignments</h1>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">+ Assign Task</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500">
          <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
          <div className="text-sm text-gray-500">Pending Tasks</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
          <div className="text-2xl font-bold text-blue-600">{tasks.filter(t => t.status === 'in_progress').length}</div>
          <div className="text-sm text-gray-500">In Progress</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{tasks.filter(t => t.status === 'completed').length}</div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={() => setFilterStatus('all')} className={`px-4 py-2 rounded-lg ${filterStatus === 'all' ? 'bg-blue-900 text-white' : 'bg-white border'}`}>All</button>
        <button onClick={() => setFilterStatus('pending')} className={`px-4 py-2 rounded-lg ${filterStatus === 'pending' ? 'bg-yellow-500 text-white' : 'bg-white border'}`}>Pending</button>
        <button onClick={() => setFilterStatus('in_progress')} className={`px-4 py-2 rounded-lg ${filterStatus === 'in_progress' ? 'bg-blue-500 text-white' : 'bg-white border'}`}>In Progress</button>
        <button onClick={() => setFilterStatus('completed')} className={`px-4 py-2 rounded-lg ${filterStatus === 'completed' ? 'bg-green-500 text-white' : 'bg-white border'}`}>Completed</button>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Assigned To</th>
              <th className="px-4 py-3 text-left">Due Date</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">#{t.id}</td>
                <td className="px-4 py-3 font-medium">{t.title}</td>
                <td className="px-4 py-3">{t.assignedTo}</td>
                <td className="px-4 py-3">{t.dueDate}</td>
                <td className="px-4 py-3">{getPriorityBadge(t.priority)}</td>
                <td className="px-4 py-3">{getStatusBadge(t.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTasks.length === 0 && <div className="text-center py-8 text-gray-400">No tasks found</div>}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Assign Task</h2>
            <div className="space-y-3">
              <input type="text" placeholder="Task Title" className="w-full border rounded-lg px-4 py-2" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              <select className="w-full border rounded-lg px-4 py-2" value={form.assignedTo} onChange={e => setForm({...form, assignedTo: e.target.value})}>
                <option value="">Select Manager</option>
                {managers.map(m => <option key={m}>{m}</option>)}
              </select>
              <input type="date" className="w-full border rounded-lg px-4 py-2" value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})} />
              <select className="w-full border rounded-lg px-4 py-2" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button><button onClick={handleCreate} className="px-4 py-2 bg-orange-500 text-white rounded-lg">Assign</button></div>
          </div>
        </div>
      )}
    </div>
  );
}