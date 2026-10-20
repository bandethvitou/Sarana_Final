import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockEvents = [
  { id: 1, title: 'Staff Meeting', type: 'Meeting', date: '2025-06-21', time: '9:00 AM', location: 'Room 201' },
  { id: 2, title: 'Director Review', type: 'Appointment', date: '2025-06-21', time: '10:30 AM', location: 'Director Office' },
  { id: 3, title: 'Board Meeting', type: 'Meeting', date: '2025-06-22', time: '2:00 PM', location: 'Board Room' },
];

export default function DirectorsCalendar() {
  const navigate = useNavigate();

  const getTypeColor = (type) => {
    switch (type) {
      case 'Meeting': return 'text-blue-600';
      case 'Appointment': return 'text-orange-600';
      case 'School Event': return 'text-green-600';
      case 'Personal': return 'text-gray-600';
      case 'Deadline': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📅 Director's Calendar</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={() => toast.success('📅 Opening schedule event...')} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          + Schedule Event
        </button>
        <div className="flex gap-2 ml-auto">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">📅 Month</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">📅 Week</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">📅 Day</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-gray-50 p-2 text-center font-medium text-sm">{day}</div>
          ))}
          {Array(30).fill(null).map((_, i) => (
            <div key={i} className="bg-white p-2 min-h-20">
              <span className="text-xs font-medium">{i + 1}</span>
              {i === 10 && (
                <div className="mt-1 text-xs bg-blue-100 text-blue-700 p-1 rounded">Staff Meeting</div>
              )}
              {i === 15 && (
                <div className="mt-1 text-xs bg-orange-100 text-orange-700 p-1 rounded">Review</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-white rounded-xl shadow-sm p-4">
        <h3 className="font-semibold text-blue-900 mb-2">📋 Upcoming Events</h3>
        {mockEvents.map(event => (
          <div key={event.id} className="flex items-center justify-between py-2 border-b last:border-0">
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-gray-500">{event.date} • {event.time} • {event.location}</p>
            </div>
            <span className={`text-sm font-medium ${getTypeColor(event.type)}`}>{event.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}