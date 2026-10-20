import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const events = [
  { id: 1, date: '2025-06-23', title: 'Math Homework Due', type: 'homework' },
  { id: 2, date: '2025-06-25', title: 'Science Lab Report Due', type: 'homework' },
  { id: 3, date: '2025-06-28', title: 'Math Final Exam', type: 'exam' },
  { id: 4, date: '2025-07-01', title: 'School Holiday', type: 'holiday' },
  { id: 5, date: '2025-07-15', title: 'Science Fair', type: 'event' },
  { id: 6, date: '2025-07-20', title: 'Sports Day', type: 'event' },
  { id: 7, date: '2025-07-25', title: 'Parent-Teacher Meeting', type: 'event' },
];

const calendarDays = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  events: events.filter(e => parseInt(e.date.split('-')[2]) === i + 1)
}));

export default function Events() {
  const navigate = useNavigate();

  const getEventColor = (type) => {
    switch (type) {
      case 'homework': return 'bg-red-100 text-red-700';
      case 'exam': return 'bg-orange-100 text-orange-700';
      case 'holiday': return 'bg-green-100 text-green-700';
      case 'event': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📅 Events</h1>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">← June</button>
          <span className="text-lg font-bold text-blue-900">June 2025</span>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">July →</button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs font-bold text-gray-500 py-2">{day}</div>
          ))}
          {calendarDays.map((day) => (
            <div
              key={day.day}
              className={`text-center p-2 rounded-lg min-h-[70px] ${
                day.events.length > 0 ? 'bg-blue-50 border-2 border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <span className="text-sm font-medium">{day.day}</span>
              {day.events.length > 0 && (
                <div className="mt-1">
                  {day.events.map((e, idx) => (
                    <div key={idx} className={`text-xs rounded p-1 mt-1 truncate ${getEventColor(e.type)}`}>
                      {e.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span><span className="text-sm">Homework</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"></span><span className="text-sm">Exams</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span><span className="text-sm">Holidays</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span className="text-sm">School Events</span></div>
      </div>
    </div>
  );
}