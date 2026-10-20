import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Notifications by role
const notificationsByRole = {
  maintenance: [
    { id: 1, type: 'task', title: 'New Repair Request', message: 'New repair request from Room 12B – Broken window', time: '1 hour ago', read: false },
    { id: 2, type: 'task', title: 'Task Assigned', message: 'Task: "Fix AC unit" assigned to you', time: '2 hours ago', read: false },
    { id: 3, type: 'meeting', title: 'Maintenance Meeting', message: 'Maintenance team meeting – 16 Jun, 9:00 AM', time: '5 hours ago', read: false },
    { id: 4, type: 'announcement', title: 'Tool Inventory', message: 'Please check and update tool inventory this week', time: '1 day ago', read: false },
  ],
  cleaner: [
    { id: 1, type: 'task', title: 'Cleaning Schedule', message: 'Cleaning schedule updated for this week', time: '1 hour ago', read: false },
    { id: 2, type: 'task', title: 'Task Assigned', message: 'Task: "Clean Room 12B" assigned to you', time: '2 hours ago', read: false },
    { id: 3, type: 'meeting', title: 'Staff Meeting', message: 'Staff Meeting – 16 Jun, 9:00 AM', time: '5 hours ago', read: false },
    { id: 4, type: 'task', title: 'Supply Update', message: 'Cleaning supplies restocked in storage room', time: '1 day ago', read: false },
  ],
  security: [
    { id: 1, type: 'task', title: 'Security Protocol', message: 'New security protocol reminder – Check all gates', time: '1 hour ago', read: false },
    { id: 2, type: 'task', title: 'Shift Update', message: 'Your shift for tomorrow: 6AM-2PM', time: '2 hours ago', read: false },
    { id: 3, type: 'meeting', title: 'Security Meeting', message: 'Security team meeting – 17 Jun, 10:00 AM', time: '5 hours ago', read: false },
    { id: 4, type: 'announcement', title: 'Gate Update', message: 'Main gate will be closed for maintenance on 20 Jun', time: '1 day ago', read: false },
  ],
  driver: [
    { id: 1, type: 'task', title: 'Route Update', message: 'Route A schedule changed for tomorrow', time: '1 hour ago', read: false },
    { id: 2, type: 'task', title: 'Vehicle Check', message: 'Vehicle maintenance check due today', time: '2 hours ago', read: false },
    { id: 3, type: 'meeting', title: 'Drivers Meeting', message: 'All drivers meeting – 18 Jun, 8:00 AM', time: '5 hours ago', read: false },
    { id: 4, type: 'task', title: 'Fuel Notice', message: 'Please refuel vehicle after your last route today', time: '1 day ago', read: false },
  ],
  canteen: [
    { id: 1, type: 'task', title: 'Menu Update', message: 'Lunch menu updated for this week', time: '1 hour ago', read: false },
    { id: 2, type: 'task', title: 'Inventory Alert', message: 'Food inventory low – Please order supplies', time: '2 hours ago', read: false },
    { id: 3, type: 'meeting', title: 'Canteen Meeting', message: 'Canteen staff meeting – 16 Jun, 2:00 PM', time: '5 hours ago', read: false },
    { id: 4, type: 'announcement', title: 'Special Event', message: 'Preparing special lunch for Sports Day on 25 Jun', time: '1 day ago', read: false },
  ],
  gardener: [
    { id: 1, type: 'task', title: 'Garden Task', message: 'Watering schedule updated for this week', time: '1 hour ago', read: false },
    { id: 2, type: 'task', title: 'Planting Task', message: 'New flowers need to be planted – Garden B', time: '2 hours ago', read: false },
    { id: 3, type: 'meeting', title: 'Staff Meeting', message: 'Staff Meeting – 16 Jun, 9:00 AM', time: '5 hours ago', read: false },
    { id: 4, type: 'task', title: 'Tool Update', message: 'New gardening tools available in storage', time: '1 day ago', read: false },
  ],
  'lab-assistant': [
    { id: 1, type: 'task', title: 'Lab Prep', message: 'Science experiments need preparation for tomorrow', time: '1 hour ago', read: false },
    { id: 2, type: 'task', title: 'Equipment Check', message: 'Lab equipment inventory check due', time: '2 hours ago', read: false },
    { id: 3, type: 'meeting', title: 'Lab Meeting', message: 'Lab team meeting – 17 Jun, 10:00 AM', time: '5 hours ago', read: false },
    { id: 4, type: 'announcement', title: 'New Equipment', message: 'New lab equipment has been ordered – Arriving next week', time: '1 day ago', read: false },
  ],
  'sports-coach': [
    { id: 1, type: 'task', title: 'Training Schedule', message: 'Training schedule updated for this week', time: '1 hour ago', read: false },
    { id: 2, type: 'task', title: 'Team Roster', message: 'Basketball team roster needs to be updated', time: '2 hours ago', read: false },
    { id: 3, type: 'meeting', title: 'Coaches Meeting', message: 'All coaches meeting – 18 Jun, 3:00 PM', time: '5 hours ago', read: false },
    { id: 4, type: 'event', title: 'Tournament', message: 'School basketball tournament – 25 Jun, 9:00 AM', time: '1 day ago', read: false },
  ],
  'store-keeper': [
    { id: 1, type: 'task', title: 'Inventory Update', message: 'Monthly inventory check due this week', time: '1 hour ago', read: false },
    { id: 2, type: 'task', title: 'Order Request', message: 'New order request from HR for supplies', time: '2 hours ago', read: false },
    { id: 3, type: 'meeting', title: 'Staff Meeting', message: 'Staff Meeting – 16 Jun, 9:00 AM', time: '5 hours ago', read: false },
    { id: 4, type: 'task', title: 'Stock Alert', message: 'Office paper supplies running low – Reorder needed', time: '1 day ago', read: false },
  ],
  nurse: [
    { id: 1, type: 'task', title: 'Health Check', message: 'Health check for Grade 5 students scheduled', time: '1 hour ago', read: false },
    { id: 2, type: 'task', title: 'Medical Records', message: 'Student medical records need to be updated', time: '2 hours ago', read: false },
    { id: 3, type: 'meeting', title: 'Health Meeting', message: 'Health team meeting – 17 Jun, 11:00 AM', time: '5 hours ago', read: false },
    { id: 4, type: 'announcement', title: 'First Aid Kit', message: 'First aid kits to be restocked – Please check', time: '1 day ago', read: false },
  ],
};

// Default notifications for staff role
const defaultNotifications = [
  { id: 1, type: 'task', title: 'Daily Tasks', message: 'Check your daily task list', time: '1 hour ago', read: false },
  { id: 2, type: 'meeting', title: 'Staff Meeting', message: 'Staff Meeting – 16 Jun, 9:00 AM', time: '2 hours ago', read: false },
  { id: 3, type: 'announcement', title: 'School Update', message: 'Please check the latest school announcements', time: '5 hours ago', read: false },
];

export default function StaffNotifications() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get role-based notifications
  const userRole = user?.role || 'staff';
  const initialNotifications = notificationsByRole[userRole] || defaultNotifications;
  
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => 
    filter === 'all' ? true : n.type === filter
  );

  const getTypeIcon = (type) => {
    switch (type) {
      case 'meeting': return '📅';
      case 'task': return '✅';
      case 'committee': return '📋';
      case 'event': return '🎉';
      case 'announcement': return '📢';
      default: return '🔔';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'meeting': return 'bg-blue-50 border-blue-200';
      case 'task': return 'bg-green-50 border-green-200';
      case 'committee': return 'bg-purple-50 border-purple-200';
      case 'event': return 'bg-orange-50 border-orange-200';
      case 'announcement': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">🔔 Notifications</h1>
          {unreadCount > 0 && (
            <span className="text-sm text-orange-500">{unreadCount} unread</span>
          )}
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllRead}
            className="px-4 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Mark All Read
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm ${filter === 'all' ? 'bg-blue-900 text-white' : 'bg-white border border-gray-300'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('meeting')}
          className={`px-4 py-2 rounded-lg text-sm ${filter === 'meeting' ? 'bg-blue-900 text-white' : 'bg-white border border-gray-300'}`}
        >
          📅 Meetings
        </button>
        <button 
          onClick={() => setFilter('task')}
          className={`px-4 py-2 rounded-lg text-sm ${filter === 'task' ? 'bg-blue-900 text-white' : 'bg-white border border-gray-300'}`}
        >
          ✅ Tasks
        </button>
        <button 
          onClick={() => setFilter('committee')}
          className={`px-4 py-2 rounded-lg text-sm ${filter === 'committee' ? 'bg-blue-900 text-white' : 'bg-white border border-gray-300'}`}
        >
          📋 Committees
        </button>
        <button 
          onClick={() => setFilter('event')}
          className={`px-4 py-2 rounded-lg text-sm ${filter === 'event' ? 'bg-blue-900 text-white' : 'bg-white border border-gray-300'}`}
        >
          🎉 Events
        </button>
        <button 
          onClick={() => setFilter('announcement')}
          className={`px-4 py-2 rounded-lg text-sm ${filter === 'announcement' ? 'bg-blue-900 text-white' : 'bg-white border border-gray-300'}`}
        >
          📢 Announcements
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-400">No notifications</div>
        ) : (
          filteredNotifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`bg-white rounded-xl p-5 shadow-sm border-l-4 ${getTypeColor(notif.type)} ${!notif.read ? 'border-l-blue-900' : 'border-l-gray-300'}`}
            >
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{getTypeIcon(notif.type)}</span>
                    <span className="text-sm font-medium text-gray-500">{notif.type.toUpperCase()}</span>
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
                      onClick={() => markAsRead(notif.id)}
                      className="px-3 py-1 text-sm text-blue-900 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Mark Read
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notif.id)}
                    className="px-3 py-1 text-sm text-red-500 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}