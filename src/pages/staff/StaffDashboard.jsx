import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Task data by role
const tasksByRole = {
  maintenance: [
    { id: 1, title: 'Fix broken window – Room 12B', priority: 'high', dueDate: '2025-06-15', status: 'pending' },
    { id: 2, title: 'Repair AC unit – Library', priority: 'high', dueDate: '2025-06-16', status: 'pending' },
    { id: 3, title: 'Fix water pipe – Boys Bathroom', priority: 'medium', dueDate: '2025-06-17', status: 'pending' },
    { id: 4, title: 'Replace door handle – Room 5A', priority: 'low', dueDate: '2025-06-18', status: 'done' },
  ],
  cleaner: [
    { id: 1, title: 'Clean Room 12B – Floor and desks', priority: 'high', dueDate: '2025-06-15', status: 'pending' },
    { id: 2, title: 'Empty trash – All classrooms', priority: 'medium', dueDate: '2025-06-15', status: 'pending' },
    { id: 3, title: 'Sanitize bathrooms – Building A', priority: 'high', dueDate: '2025-06-16', status: 'pending' },
    { id: 4, title: 'Clean staff office', priority: 'low', dueDate: '2025-06-14', status: 'done' },
  ],
  security: [
    { id: 1, title: 'Patrol Building A – 6AM-2PM', priority: 'high', dueDate: '2025-06-15', status: 'pending' },
    { id: 2, title: 'Check all gates and entrances', priority: 'high', dueDate: '2025-06-15', status: 'pending' },
    { id: 3, title: 'Monitor security cameras', priority: 'medium', dueDate: '2025-06-16', status: 'pending' },
    { id: 4, title: 'Visitor log review', priority: 'low', dueDate: '2025-06-17', status: 'done' },
  ],
  driver: [
    { id: 1, title: 'Pick up students – Route A 7:00 AM', priority: 'high', dueDate: '2025-06-15', status: 'pending' },
    { id: 2, title: 'Vehicle maintenance check', priority: 'high', dueDate: '2025-06-15', status: 'pending' },
    { id: 3, title: 'Drop off students – Route A 4:00 PM', priority: 'high', dueDate: '2025-06-15', status: 'pending' },
    { id: 4, title: 'Clean vehicle interior', priority: 'low', dueDate: '2025-06-16', status: 'done' },
  ],
  canteen: [
    { id: 1, title: 'Prepare lunch for 200 students', priority: 'high', dueDate: '2025-06-15', status: 'pending' },
    { id: 2, title: 'Check food inventory – Stock count', priority: 'medium', dueDate: '2025-06-15', status: 'pending' },
    { id: 3, title: 'Clean kitchen area', priority: 'high', dueDate: '2025-06-16', status: 'pending' },
    { id: 4, title: 'Order food supplies', priority: 'low', dueDate: '2025-06-17', status: 'done' },
  ],
  gardener: [
    { id: 1, title: 'Water all plants and gardens', priority: 'high', dueDate: '2025-06-15', status: 'pending' },
    { id: 2, title: 'Trim hedges – Front yard', priority: 'medium', dueDate: '2025-06-15', status: 'pending' },
    { id: 3, title: 'Plant new flowers – Garden B', priority: 'medium', dueDate: '2025-06-16', status: 'pending' },
    { id: 4, title: 'Clean garden tools', priority: 'low', dueDate: '2025-06-17', status: 'done' },
  ],
  'lab-assistant': [
    { id: 1, title: 'Prepare materials for Science experiments', priority: 'high', dueDate: '2025-06-15', status: 'pending' },
    { id: 2, title: 'Check lab equipment – Inventory', priority: 'medium', dueDate: '2025-06-15', status: 'pending' },
    { id: 3, title: 'Clean lab area – Sanitize', priority: 'medium', dueDate: '2025-06-16', status: 'pending' },
    { id: 4, title: 'Update lab safety manual', priority: 'low', dueDate: '2025-06-18', status: 'done' },
  ],
  'sports-coach': [
    { id: 1, title: 'Train Basketball team – 3:00 PM', priority: 'high', dueDate: '2025-06-15', status: 'pending' },
    { id: 2, title: 'Check PE equipment', priority: 'medium', dueDate: '2025-06-15', status: 'pending' },
    { id: 3, title: 'Plan practice schedule for week', priority: 'medium', dueDate: '2025-06-16', status: 'pending' },
    { id: 4, title: 'Prepare team roster', priority: 'low', dueDate: '2025-06-17', status: 'done' },
  ],
  'store-keeper': [
    { id: 1, title: 'Inventory check – Supplies', priority: 'high', dueDate: '2025-06-15', status: 'pending' },
    { id: 2, title: 'Reorder office supplies', priority: 'medium', dueDate: '2025-06-15', status: 'pending' },
    { id: 3, title: 'Organize storage room', priority: 'medium', dueDate: '2025-06-16', status: 'pending' },
    { id: 4, title: 'Update inventory spreadsheet', priority: 'low', dueDate: '2025-06-18', status: 'done' },
  ],
  nurse: [
    { id: 1, title: 'Health check – Grade 5 students', priority: 'high', dueDate: '2025-06-15', status: 'pending' },
    { id: 2, title: 'Update student medical records', priority: 'medium', dueDate: '2025-06-15', status: 'pending' },
    { id: 3, title: 'Check first aid kit inventory', priority: 'medium', dueDate: '2025-06-16', status: 'pending' },
    { id: 4, title: 'Health awareness bulletin', priority: 'low', dueDate: '2025-06-17', status: 'done' },
  ],
};

// Default tasks if role doesn't match
const defaultTasks = [
  { id: 1, title: 'Complete daily tasks', priority: 'medium', dueDate: '2025-06-15', status: 'pending' },
  { id: 2, title: 'Check email for updates', priority: 'low', dueDate: '2025-06-15', status: 'pending' },
  { id: 3, title: 'Submit weekly report', priority: 'high', dueDate: '2025-06-16', status: 'pending' },
];

const mockSchedule = {
  shift: 'Morning (8:00 AM - 12:00 PM)',
  nextShift: 'Afternoon (1:00 PM - 5:00 PM)',
};

const mockLeaveBalance = {
  annual: 12,
  sick: 5,
  emergency: 3,
};

const mockPayments = {
  thisMonth: 1200,
  status: 'paid',
  nextPayment: '2025-07-01',
};

const mockNotifications = [
  { id: 1, type: 'meeting', message: 'Staff Meeting – 16 Jun, 9:00 AM', time: '1 hour ago', read: false },
  { id: 2, type: 'task', message: 'Task: "Fix window" completed', time: '2 hours ago', read: false },
  { id: 3, type: 'committee', message: 'Safety Training Committee – 20 Jun', time: '5 hours ago', read: false },
  { id: 4, type: 'event', message: 'Sports Day – 25 Jun', time: '1 day ago', read: false },
];

const mockMeetings = [
  { id: 1, title: 'Staff Meeting', date: '2025-06-16', time: '09:00 AM', location: 'Conference Room' },
  { id: 2, title: 'Safety Training', date: '2025-06-20', time: '02:00 PM', location: 'Hall A' },
];

export default function StaffDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get role-based tasks
  const userRole = user?.role || 'staff';
  const initialTasks = tasksByRole[userRole] || defaultTasks;
  const [tasks, setTasks] = useState(initialTasks);
  const [showAllTasks, setShowAllTasks] = useState(false);

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const doneTasks = tasks.filter(t => t.status === 'done');
  const incompleteCount = pendingTasks.length;

  // Get role display name
  const getRoleDisplayName = (role) => {
    const roleMap = {
      'maintenance': 'Maintenance',
      'cleaner': 'Cleaner',
      'security': 'Security',
      'driver': 'Driver',
      'canteen': 'Canteen Staff',
      'gardener': 'Gardener',
      'lab-assistant': 'Lab Assistant',
      'sports-coach': 'Sports Coach',
      'store-keeper': 'Store Keeper',
      'nurse': 'Nurse',
      'staff': 'Staff'
    };
    return roleMap[role] || role;
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, status: t.status === 'done' ? 'pending' : 'done' } : t
    ));
  };

  const markAllDone = () => {
    setTasks(tasks.map(t => ({ ...t, status: 'done' })));
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">High</span>;
      case 'medium': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Medium</span>;
      case 'low': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Low</span>;
      default: return null;
    }
  };

  const displayedTasks = showAllTasks ? tasks : tasks.slice(0, 3);

  return (
    <div>
      {/* Header with user info */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">🔧 Staff Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            {user?.name || 'Staff'} • {dateStr}
          </p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {getRoleDisplayName(userRole)}
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-900">
          <div className="text-2xl font-bold text-blue-900">{incompleteCount}</div>
          <div className="text-sm text-gray-500">Pending Tasks</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{doneTasks.length}</div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-500">
          <div className="text-2xl font-bold text-orange-600">{mockLeaveBalance.annual}</div>
          <div className="text-sm text-gray-500">Leave Days Left</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-500">
          <div className="text-2xl font-bold text-purple-600">${mockPayments.thisMonth}</div>
          <div className="text-sm text-gray-500">This Month</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Today's Tasks */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-900">📋 Today's Tasks</h2>
              <div className="flex gap-2">
                <button 
                  onClick={markAllDone}
                  className="text-sm text-orange-500 hover:underline"
                  disabled={incompleteCount === 0}
                >
                  Mark All Done
                </button>
                <button 
                  onClick={() => navigate('/staff/tasks')}
                  className="text-sm text-blue-900 hover:underline"
                >
                  View All →
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              {displayedTasks.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No tasks assigned today ✅</p>
              ) : (
                displayedTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={task.status === 'done'}
                      onChange={() => toggleTask(task.id)}
                      className="mt-1 rounded text-blue-900 focus:ring-blue-900"
                    />
                    <div className="flex-1">
                      <p className={`text-sm ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {getPriorityBadge(task.priority)}
                        <span className="text-xs text-gray-400">Due: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {tasks.length > 3 && (
              <button 
                onClick={() => setShowAllTasks(!showAllTasks)}
                className="mt-3 text-sm text-blue-900 hover:underline"
              >
                {showAllTasks ? 'Show less' : `Show all (${tasks.length} tasks)`}
              </button>
            )}
          </div>

          {/* Schedule Today */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">📅 My Schedule Today</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl">🌅</span>
                <div>
                  <p className="font-medium text-blue-900">{mockSchedule.shift}</p>
                  <p className="text-xs text-gray-500">Current Shift</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">🌇</span>
                <div>
                  <p className="font-medium text-gray-700">{mockSchedule.nextShift}</p>
                  <p className="text-xs text-gray-500">Next Shift</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/staff/schedule')}
                className="w-full py-2 text-sm text-orange-500 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors"
              >
                View Full Schedule →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Leave Balance */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-900">⏰ Leave Balance</h2>
              <button 
                onClick={() => navigate('/staff/leaves')}
                className="text-sm text-orange-500 hover:underline"
              >
                Request Leave
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">{mockLeaveBalance.annual}</div>
                <div className="text-xs text-gray-500">Annual</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{mockLeaveBalance.sick}</div>
                <div className="text-xs text-gray-500">Sick</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{mockLeaveBalance.emergency}</div>
                <div className="text-xs text-gray-500">Emergency</div>
              </div>
            </div>
          </div>

          {/* Upcoming Meetings */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-900">📅 Upcoming Meetings</h2>
              <button 
                onClick={() => navigate('/staff/meetings')}
                className="text-sm text-blue-900 hover:underline"
              >
                View All →
              </button>
            </div>
            {mockMeetings.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No upcoming meetings</p>
            ) : (
              mockMeetings.map((meeting) => (
                <div key={meeting.id} className="flex items-center gap-3 p-3 border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <span className="text-2xl">📌</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{meeting.title}</p>
                    <p className="text-xs text-gray-500">{meeting.date} at {meeting.time} • {meeting.location}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Recent Notifications */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-900">🔔 Recent Notifications</h2>
              <button 
                onClick={() => navigate('/staff/notifications')}
                className="text-sm text-blue-900 hover:underline"
              >
                View All →
              </button>
            </div>
            <div className="space-y-2">
              {mockNotifications.slice(0, 3).map((notif) => (
                <div key={notif.id} className={`flex items-start gap-2 p-2 rounded-lg ${!notif.read ? 'bg-blue-50' : ''}`}>
                  <span className="text-lg">
                    {notif.type === 'meeting' ? '📅' : 
                     notif.type === 'task' ? '✅' : 
                     notif.type === 'committee' ? '📋' : 
                     notif.type === 'event' ? '🎉' : '🔔'}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{notif.message}</p>
                    <p className="text-xs text-gray-400">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        <button 
          onClick={() => navigate('/staff/reports')}
          className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl shadow-sm border hover:bg-gray-50 transition-colors"
        >
          <span>📄</span> Report Issue
        </button>
        <button 
          onClick={() => navigate('/staff/attendance')}
          className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl shadow-sm border hover:bg-gray-50 transition-colors"
        >
          <span>✅</span> Check Attendance
        </button>
        <button 
          onClick={() => navigate('/staff/leaves')}
          className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl shadow-sm border hover:bg-gray-50 transition-colors"
        >
          <span>⏰</span> Request Leave
        </button>
        <button 
          onClick={() => navigate('/staff/payments')}
          className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl shadow-sm border hover:bg-gray-50 transition-colors"
        >
          <span>💰</span> View Payment
        </button>
      </div>
    </div>
  );
}