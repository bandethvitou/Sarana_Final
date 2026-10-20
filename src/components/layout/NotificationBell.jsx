// src/components/layout/NotificationBell.jsx
import { useState } from 'react';

export function NotificationBell({ count = 0, notifications = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="relative cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-2xl text-blue-900">🔔</span>
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border-t-4 border-orange-500 z-50 max-h-80 overflow-y-auto">
          <div className="p-4 font-semibold text-blue-900 border-b flex justify-between items-center sticky top-0 bg-white">
            <span>Notifications</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          <div className="divide-y">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400 text-sm">No notifications</div>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} className="px-4 py-3 text-sm hover:bg-gray-50 cursor-pointer">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    notif.type === 'critical' ? 'bg-red-500' :
                    notif.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                  }`}></span>
                  <span className="text-gray-800">{notif.message}</span>
                  <div className="text-xs text-gray-400 mt-1">{notif.time}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;