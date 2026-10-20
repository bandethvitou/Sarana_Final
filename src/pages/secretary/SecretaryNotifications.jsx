import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const initialNotifications = [
  { id: 1, type: 'meeting', title: 'Meeting Reminder', message: 'Staff Meeting at 9:00 AM in Room 201', time: '5 min ago', read: false },
  { id: 2, type: 'task', title: 'Task Assigned', message: 'Review Budget Proposal assigned to Director', time: '1 hour ago', read: false },
  { id: 3, type: 'correspondence', title: 'New Correspondence', message: 'Letter from Ministry of Education received', time: '2 hours ago', read: false },
];

export default function SecretaryNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'meeting': return '📅';
      case 'task': return '📊';
      case 'correspondence': return '📋';
      default: return '🔔';
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'meeting': return 'bg-purple-100 text-purple-700';
      case 'task': return 'bg-blue-100 text-blue-700';
      case 'correspondence': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'meeting': return 'Meeting';
      case 'task': return 'Task';
      case 'correspondence': return 'Correspondence';
      default: return 'General';
    }
  };

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'meeting', label: '📅 Meetings' },
    { id: 'task', label: '📊 Tasks' },
    { id: 'correspondence', label: '📋 Correspondence' },
  ];

  const filtered = notifications.filter(n => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const handleMarkRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    toast.success('✅ Marked as read');
  };

  const handleMarkAllRead = () => {
    if (unreadCount === 0) {
      toast.success('✅ All notifications are already read!');
      return;
    }
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success(`✅ ${unreadCount} notifications marked as read`);
  };

  const handleClearAll = () => {
    if (notifications.length === 0) {
      toast.info('No notifications to clear');
      return;
    }
    if (window.confirm('Clear all notifications?')) {
      setNotifications([]);
      toast.success('🗑️ All notifications cleared');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">🔔 Secretary Notifications</h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f.id
                  ? 'bg-blue-900 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
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
          {notifications.length > 0 && (
            <button onClick={handleClearAll} className="px-4 py-2 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 text-sm font-medium">
              Clear All
            </button>
          )}
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
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeBadge(notif.type)}`}>
                      {getTypeLabel(notif.type)}
                    </span>
                    {!notif.read && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">New</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{notif.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                </div>
                <div className="flex gap-2">
                  {!notif.read && (
                    <button
                      onClick={() => handleMarkRead(notif.id)}
                      className="px-3 py-1 text-sm text-blue-900 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}