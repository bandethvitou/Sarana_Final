import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data
const initialTasks = [
  { id: 1, title: 'Fix broken window – Room 12B', description: 'Window glass broken, needs replacement', priority: 'high', dueDate: '2025-06-15', assignedBy: 'Mr. Rudi', status: 'pending' },
  { id: 2, title: 'Replace light bulb – Library', description: 'Fluorescent light bulb needs replacement', priority: 'medium', dueDate: '2025-06-15', assignedBy: 'Mr. Rudi', status: 'pending' },
  { id: 3, title: 'Clean AC filter – Office', description: 'AC filter needs cleaning and maintenance', priority: 'low', dueDate: '2025-06-14', assignedBy: 'Ms. Anna', status: 'done' },
  { id: 4, title: 'Fix water pipe – Bathroom', description: 'Water pipe leaking in boys bathroom', priority: 'high', dueDate: '2025-06-16', assignedBy: 'Mr. Rudi', status: 'pending' },
  { id: 5, title: 'Repair classroom door', description: 'Door hinge broken, needs fixing', priority: 'medium', dueDate: '2025-06-17', assignedBy: 'Mr. Rudi', status: 'pending' },
  { id: 6, title: 'Replace air conditioner', description: 'AC unit not cooling properly', priority: 'low', dueDate: '2025-06-18', assignedBy: 'Ms. Anna', status: 'pending' },
];

export default function StaffTasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });

  const filteredTasks = tasks.filter(task => {
    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                        task.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchSearch && matchStatus && matchPriority;
  });

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, status: t.status === 'done' ? 'pending' : 'done' } : t
    ));
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const handleCreateTask = () => {
    if (!newTask.title.trim() || !newTask.dueDate) return;
    
    const task = {
      id: Date.now(),
      ...newTask,
      assignedBy: 'Self',
      status: 'pending',
    };
    
    setTasks([task, ...tasks]);
    setShowCreateModal(false);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">High</span>;
      case 'medium': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Medium</span>;
      case 'low': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Low</span>;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>;
      case 'done': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Done</span>;
      default: return null;
    }
  };

  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const doneCount = tasks.filter(t => t.status === 'done').length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">📋 My Tasks</h1>
          <p className="text-sm text-gray-500 mt-1">{pendingCount} pending · {doneCount} completed</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          + Add Task
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500">
          <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
          <div className="text-sm text-gray-500">Pending Tasks</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{doneCount}</div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-900">
          <div className="text-2xl font-bold text-blue-900">{tasks.length}</div>
          <div className="text-sm text-gray-500">Total Tasks</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
        <select 
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left w-10">Done</th>
              <th className="px-4 py-3 text-left">Task</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Due Date</th>
              <th className="px-4 py-3 text-left">Assigned By</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={task.status === 'done'}
                    onChange={() => toggleTaskStatus(task.id)}
                    className="rounded text-blue-900 focus:ring-blue-900"
                  />
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className={`font-medium ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-gray-400 mt-0.5">{task.description}</p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">{getPriorityBadge(task.priority)}</td>
                <td className="px-4 py-3">{task.dueDate}</td>
                <td className="px-4 py-3">{task.assignedBy}</td>
                <td className="px-4 py-3">{getStatusBadge(task.status)}</td>
                <td className="px-4 py-3">
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTasks.length === 0 && (
          <div className="text-center py-8 text-gray-400">No tasks found</div>
        )}
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Create Task</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Task Title"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
              <textarea
                placeholder="Description (optional)"
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              />
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                required
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateTask}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}