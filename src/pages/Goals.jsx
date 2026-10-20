import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialGoals = [
  { id: 1, title: 'Library Renovation', description: 'Refurbish main library with new furniture and books', target: 100, current: 60, unit: '%', deadline: '2025-06-30', manager: 'Ms. Anna', status: 'in_progress' },
  { id: 2, title: 'Increase Enrollment by 10%', description: 'Marketing campaign to attract new students', target: 10, current: 3, unit: '%', deadline: '2025-08-15', manager: 'Mr. Rudi', status: 'in_progress' },
  { id: 3, title: 'Reduce Unpaid Fees', description: 'Decrease overdue fees by 30%', target: 30, current: 19.5, unit: '%', deadline: '2025-06-30', manager: 'Finance Head', status: 'in_progress' },
];

export default function Goals() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState(initialGoals);
  const [showModal, setShowModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    target: '', 
    current: '0', 
    unit: '%', 
    deadline: '', 
    manager: '' 
  });

  const openAdd = () => {
    setEditingGoal(null);
    setForm({ title: '', description: '', target: '', current: '0', unit: '%', deadline: '', manager: '' });
    setShowModal(true);
  };

  const openEdit = (goal) => {
    setEditingGoal(goal);
    setForm({ 
      ...goal, 
      target: goal.target.toString(), 
      current: goal.current.toString() 
    });
    setShowModal(true);
  };

  const handleSave = () => {
    const newGoal = {
      id: editingGoal ? editingGoal.id : Date.now(),
      title: form.title,
      description: form.description,
      target: Number(form.target),
      current: Number(form.current),
      unit: form.unit,
      deadline: form.deadline,
      manager: form.manager,
      status: Number(form.current) >= Number(form.target) ? 'completed' : 'in_progress',
    };
    if (editingGoal) {
      setGoals(goals.map(g => g.id === editingGoal.id ? newGoal : g));
    } else {
      setGoals([...goals, newGoal]);
    }
    setShowModal(false);
  };

  const getProgressColor = (pct) => {
    if (pct >= 75) return 'bg-green-500';
    if (pct >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStatusBadge = (status) => {
    return status === 'completed' 
      ? <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Completed</span>
      : <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🔄 In Progress</span>;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">🎯 School Goals</h1>
          <p className="text-sm text-gray-500 mt-1">Set and track school-wide strategic goals</p>
        </div>
        <button 
          onClick={openAdd} 
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          + New Goal
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {goals.map(goal => {
          const progressPct = (goal.current / goal.target) * 100;
          const isCompleted = progressPct >= 100;
          
          return (
            <div key={goal.id} className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-900 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{goal.title}</h3>
                  <p className="text-sm text-gray-500">{goal.description}</p>
                </div>
                {getStatusBadge(goal.status)}
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{goal.current} / {goal.target} {goal.unit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${getProgressColor(progressPct)} transition-all duration-500`} 
                    style={{ width: `${Math.min(progressPct, 100)}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm font-medium text-gray-600 mt-1">
                  {Math.round(progressPct)}%
                </div>
              </div>

              <div className="flex flex-wrap justify-between text-xs text-gray-400 mt-3 gap-2">
                <span>📅 Finish By: {goal.deadline}</span>
                <span>👤 Manager: {goal.manager}</span>
              </div>

              <button 
                onClick={() => openEdit(goal)} 
                className="mt-4 text-sm text-blue-900 hover:underline font-medium"
              >
                📊 Update Progress
              </button>
            </div>
          );
        })}
      </div>

      {goals.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center text-gray-400">
          <div className="text-5xl mb-4">🎯</div>
          <p>No goals created yet</p>
          <p className="text-sm">Click "New Goal" to get started</p>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              {editingGoal ? '📊 Update Progress' : '🎯 Create New Goal'}
            </h2>
            
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  📝 What is the goal?
                </label>
                <input 
                  type="text" 
                  placeholder="e.g., Increase Enrollment" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.title} 
                  onChange={e => setForm({...form, title: e.target.value})} 
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  📄 More details
                </label>
                <textarea 
                  placeholder="Describe the goal in detail..." 
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.description} 
                  onChange={e => setForm({...form, description: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Target */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    🎯 Goal Amount
                  </label>
                  <input 
                    type="number" 
                    placeholder="e.g., 10" 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    value={form.target} 
                    onChange={e => setForm({...form, target: e.target.value})} 
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">What number do you want to reach?</p>
                </div>

                {/* Current */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    📊 Progress So Far
                  </label>
                  <input 
                    type="number" 
                    placeholder="e.g., 3" 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    value={form.current} 
                    onChange={e => setForm({...form, current: e.target.value})} 
                  />
                  <p className="text-xs text-gray-400 mt-1">How much have you achieved?</p>
                </div>
              </div>

              {/* Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  📏 Measure In
                </label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.unit} 
                  onChange={e => setForm({...form, unit: e.target.value})}
                >
                  <option value="%">% (Percentage)</option>
                  <option value="students">Students</option>
                  <option value="teachers">Teachers</option>
                  <option value="sessions">Sessions</option>
                  <option value="classes">Classes</option>
                  <option value="$">$ (Dollars)</option>
                  <option value="count">Count</option>
                </select>
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  📅 Finish By
                </label>
                <input 
                  type="date" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.deadline} 
                  onChange={e => setForm({...form, deadline: e.target.value})} 
                  required
                />
              </div>

              {/* Manager */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  👤 Who's Responsible?
                </label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.manager} 
                  onChange={e => setForm({...form, manager: e.target.value})}
                >
                  <option value="">Select Manager...</option>
                  <option value="Mr. John">Mr. John</option>
                  <option value="Ms. Anna">Ms. Anna</option>
                  <option value="Mr. Rudi">Mr. Rudi</option>
                  <option value="Mrs. Linda">Mrs. Linda</option>
                  <option value="Ms. Siti">Ms. Siti</option>
                  <option value="Finance Head">Finance Head</option>
                  <option value="Academic Head">Academic Head</option>
                  <option value="HR">HR</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowModal(false)} 
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                {editingGoal ? 'Update Progress' : 'Create Goal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}