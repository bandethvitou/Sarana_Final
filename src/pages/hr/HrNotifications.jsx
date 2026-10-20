import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialNotifications = [
  { id: 1, type: 'critical', title: 'Staff Onboarding', message: 'New staff Mr. David needs onboarding – IT Support', time: '5 min ago', read: false },
  { id: 2, type: 'warning', title: 'Leave Request', message: 'Ms. Siti requested 3 days annual leave – pending approval', time: '1 hour ago', read: false },
  { id: 3, type: 'success', title: 'Position Assigned', message: 'Mr. John promoted to Dept Head – effective 15 Jun', time: '2 hours ago', read: false },
  { id: 4, type: 'info', title: 'Temp Role Expiry', message: 'Dept Head temp role for Mr. John expires in 5 days', time: '3 hours ago', read: true },
  { id: 5, type: 'warning', title: 'Salary Update', message: 'June salary processed – 34 staff paid', time: '1 day ago', read: true },
];

const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'critical', label: '🔴 Critical' },
  { id: 'warning', label: '🟠 Warning' },
  { id: 'success', label: '✅ Success' },
  { id: 'info', label: '🔵 Info' },
];

export default function HrNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const displayedNotifications = showAll ? filteredNotifications : filteredNotifications.slice(0, 5);

  const handleMarkRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllRead = () => {
    if (unreadCount === 0) {
      alert('✅ All notifications are already read!');
      return;
    }
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    if (notifications.length === 0) {
      alert('No notifications to clear.');
      return;
    }
    if (window.confirm('Clear all notifications?')) {
      setNotifications([]);
    }
  };

  const handleFilterChange = (filterId) => {
    setFilter(filterId);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'critical': return '🔴';
      case 'warning': return '🟠';
      case 'success': return '✅';
      case 'info': return '🔵';
      default: return '📌';
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'warning': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'success': return 'bg-green-100 text-green-700 border-green-200';
      case 'info': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'critical': return 'Critical';
      case 'warning': return 'Warning';
      case 'success': return 'Success';
      case 'info': return 'Info';
      default: return 'General';
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">🔔 HR Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-orange-500 mt-1">{unreadCount} unread notifications</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm"
            >
              Mark All Read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-colors text-sm"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-900">
          <div className="text-2xl font-bold text-blue-900">{notifications.length}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">{notifications.filter(n => n.type === 'critical').length}</div>
          <div className="text-sm text-gray-500">Critical</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-500">
          <div className="text-2xl font-bold text-orange-600">{notifications.filter(n => n.type === 'warning').length}</div>
          <div className="text-sm text-gray-500">Warnings</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{notifications.filter(n => n.type === 'success').length}</div>
          <div className="text-sm text-gray-500">Success</div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleFilterChange(opt.id)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === opt.id
                ? 'bg-blue-900 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {displayedNotifications.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center text-gray-400">
            <div className="text-5xl mb-4">🔕</div>
            <p>No notifications to show</p>
            <p className="text-sm">You're all caught up!</p>
          </div>
        ) : (
          displayedNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`bg-white rounded-xl shadow-sm p-5 border-l-4 transition-all hover:shadow-md ${
                !notif.read
                  ? 'border-l-blue-900 bg-blue-50/30'
                  : 'border-l-gray-300'
              }`}
            >
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{getTypeIcon(notif.type)}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getTypeBadge(notif.type)}`}>
                      {getTypeLabel(notif.type)}
                    </span>
                    {!notif.read && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        New
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{notif.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {!notif.read && (
                    <button
                      onClick={() => handleMarkRead(notif.id)}
                      className="px-3 py-1 text-sm text-blue-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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

      {/* Show More */}
      {filteredNotifications.length > 5 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-900 hover:underline text-sm font-medium"
          >
            {showAll ? 'Show less' : `Show all (${filteredNotifications.length})`}
          </button>
        </div>
      )}
    </div>
  );
}