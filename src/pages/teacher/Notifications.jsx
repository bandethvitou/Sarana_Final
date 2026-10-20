import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const initialNotifications = [
  { id: 1, type: 'critical', title: 'Attendance Overdue', message: 'Attendance not taken for Grade 5B Math – 9:00 AM', time: '5 min ago', read: false },
  { id: 2, type: 'critical', title: 'Scores Overdue', message: 'Scores not entered for Grade 6A Science – 3 days overdue', time: '1 hour ago', read: false },
  { id: 3, type: 'warning', title: 'Plan Not Submitted', message: 'Lesson plan for Grade 5B Math is still in Draft', time: '2 hours ago', read: false },
  { id: 4, type: 'warning', title: 'Revision Requested', message: 'Manager requested revision for Grade 6A Science Plan', time: '3 hours ago', read: false },
  { id: 5, type: 'info', title: 'Plan Approved', message: 'Grade 5A Math lesson plan approved by Manager', time: '4 hours ago', read: true },
  { id: 6, type: 'success', title: 'Scores Submitted', message: 'Grade 5B Math scores submitted successfully', time: '5 hours ago', read: true },
];

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'critical': return '🔴';
      case 'warning': return '🟠';
      case 'info': return '🔵';
      case 'success': return '🟢';
      default: return '⚪';
    }
  };

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'critical', label: '🔴 Critical' },
    { id: 'warning', label: '🟠 Warning' },
    { id: 'info', label: '🔵 Info' },
    { id: 'success', label: '🟢 Success' },
  ];

  const filtered = notifications.filter(n => filter === 'all' || n.type === filter);

  const handleMarkRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    toast.success('✅ Marked as read');
  };

  const handleMarkAllRead = () => {
    if (unreadCount === 0) { toast.success('✅ All read!'); return; }
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success(`✅ ${unreadCount} marked as read`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">🔔 Notifications</h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f.id ? 'bg-blue-900 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          {unreadCount > 0 && (
            <button onClick={handleMarkAllRead} className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 text-sm font-medium">
              Mark All Read ({unreadCount})
            </button>
          )}
          <button onClick={() => { if (window.confirm('Clear all?')) { setNotifications([]); toast.success('Cleared'); } }} className="px-4 py-2 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 text-sm font-medium">
            Clear All
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center text-gray-400 shadow-sm">
            <div className="text-5xl mb-4">🔕</div>
            <p className="text-lg">No notifications</p>
            <p className="text-sm">You're all caught up!</p>
          </div>
        ) : (
          filtered.map((notif) => (
            <div
              key={notif.id}
              className={`bg-white rounded-xl shadow-sm p-5 border-l-4 transition-all hover:shadow-md ${
                !notif.read ? 'border-l-blue-900 bg-blue-50/30' : 'border-l-gray-300'
              }`}
            >
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{getTypeIcon(notif.type)}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      notif.type === 'critical' ? 'bg-red-100 text-red-700' :
                      notif.type === 'warning' ? 'bg-orange-100 text-orange-700' :
                      notif.type === 'info' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {notif.type.toUpperCase()}
                    </span>
                    {!notif.read && <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">New</span>}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{notif.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                </div>
                {!notif.read && (
                  <button onClick={() => handleMarkRead(notif.id)} className="px-3 py-1 text-sm text-blue-900 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}