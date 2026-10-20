import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const events = [
  { id: 1, date: '2025-06-23', title: 'Math Homework Due', type: 'homework', color: 'bg-red-100 text-red-700' },
  { id: 2, date: '2025-06-25', title: 'Science Lab Report Due', type: 'homework', color: 'bg-red-100 text-red-700' },
  { id: 3, date: '2025-06-28', title: 'Math Final Exam', type: 'exam', color: 'bg-orange-100 text-orange-700' },
  { id: 4, date: '2025-07-01', title: 'School Holiday', type: 'holiday', color: 'bg-green-100 text-green-700' },
  { id: 5, date: '2025-07-15', title: 'Science Fair', type: 'event', color: 'bg-blue-100 text-blue-700' },
];

const calendarDays = [
  { day: 1, events: [] },
  { day: 2, events: [] },
  { day: 3, events: [] },
  { day: 4, events: [] },
  { day: 5, events: [] },
  { day: 6, events: [] },
  { day: 7, events: [] },
  { day: 8, events: [] },
  { day: 9, events: [] },
  { day: 10, events: [] },
  { day: 11, events: [] },
  { day: 12, events: [] },
  { day: 13, events: [] },
  { day: 14, events: [] },
  { day: 15, events: [] },
  { day: 16, events: [] },
  { day: 17, events: [] },
  { day: 18, events: [] },
  { day: 19, events: [] },
  { day: 20, events: [] },
  { day: 21, events: [] },
  { day: 22, events: [] },
  { day: 23, events: [{ title: 'Math Homework Due', type: 'homework' }] },
  { day: 24, events: [] },
  { day: 25, events: [{ title: 'Science Lab Report Due', type: 'homework' }] },
  { day: 26, events: [] },
  { day: 27, events: [] },
  { day: 28, events: [{ title: 'Math Final Exam', type: 'exam' }] },
  { day: 29, events: [] },
  { day: 30, events: [] },
];

export default function Calendar() {
  const navigate = useNavigate();

  const getEventDot = (events) => {
    if (!events || events.length === 0) return null;
    return (
      <div className="flex justify-center gap-1 mt-1">
        {events.map((e, idx) => {
          const colors = {
            homework: 'bg-red-500',
            exam: 'bg-orange-500',
            holiday: 'bg-green-500',
            event: 'bg-blue-500',
          };
          return <span key={idx} className={`w-2 h-2 rounded-full ${colors[e.type] || 'bg-gray-500'}`}></span>;
        })}
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📅 Calendar</h1>

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
          {calendarDays.map((day) => {
            const hasEvent = day.events && day.events.length > 0;
            return (
              <div
                key={day.day}
                className={`text-center p-2 rounded-lg min-h-[70px] ${
                  hasEvent ? 'bg-blue-50 border-2 border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-sm font-medium">{day.day}</span>
                {hasEvent && (
                  <div className="mt-1">
                    {day.events.map((e, idx) => (
                      <div key={idx} className={`text-xs rounded p-1 mt-1 truncate ${
                        e.type === 'homework' ? 'bg-red-100 text-red-700' :
                        e.type === 'exam' ? 'bg-orange-100 text-orange-700' :
                        e.type === 'holiday' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {e.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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