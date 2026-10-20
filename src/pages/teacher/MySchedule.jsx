import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const scheduleData = [
  { time: '6:00 AM', mon: 'FREE', tue: 'FREE', wed: 'FREE', thu: 'FREE', fri: 'FREE' },
  { time: '7:00 AM', mon: '5B Math', tue: '5A Math', wed: '5B Math', thu: '5A Math', fri: '5B Math' },
  { time: '8:00 AM', mon: '5B Math', tue: '5A Math', wed: '5B Math', thu: '5A Math', fri: '5B Math' },
  { time: '9:00 AM', mon: '6A Science', tue: '6B Science', wed: '6A Science', thu: '6B Science', fri: '6A Science' },
  { time: '10:00 AM', mon: 'FREE', tue: 'FREE', wed: 'FREE', thu: 'FREE', fri: 'FREE' },
  { time: '11:00 AM', mon: '5A Math', tue: '5B Math', wed: 'FREE', thu: 'FREE', fri: '5A Math' },
  { time: '12:00 PM', mon: 'LUNCH', tue: 'LUNCH', wed: 'LUNCH', thu: 'LUNCH', fri: 'LUNCH' },
  { time: '1:00 PM', mon: '6B Science', tue: '6A Science', wed: '6B Science', thu: '6A Science', fri: '6B Science' },
  { time: '2:00 PM', mon: 'FREE', tue: 'FREE', wed: 'FREE', thu: 'FREE', fri: 'FREE' },
  { time: '3:00 PM', mon: 'FREE', tue: 'FREE', wed: 'FREE', thu: 'FREE', fri: 'FREE' },
  { time: '4:00 PM', mon: 'FREE', tue: 'FREE', wed: 'FREE', thu: 'FREE', fri: 'FREE' },
];

export default function MySchedule() {
  const navigate = useNavigate();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const getClassBadge = (subject) => {
    if (subject === 'FREE') return <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs font-medium">FREE</span>;
    if (subject === 'LUNCH') return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">🍽️ LUNCH</span>;
    const [classInfo, subjectInfo] = subject.split(' ');
    return (
      <div className="text-center">
        <span className="font-medium text-sm text-blue-900">{classInfo}</span>
        <span className="block text-xs text-gray-500">{subjectInfo}</span>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📅 My Schedule</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">← Prev</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">Next →</button>
          </div>
          <span className="font-medium text-blue-900">Week of June 16 – 20, 2025</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm">🌅 Morning</button>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left w-24 font-bold text-blue-900">Time</th>
              {days.map((day) => (
                <th key={day} className="px-4 py-3 text-center font-bold text-blue-900">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((row, idx) => (
              <tr key={idx} className={`border-t ${row.time === '12:00 PM' ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>
                <td className="px-4 py-3 font-medium text-gray-600">{row.time}</td>
                {days.map((day) => {
                  const key = day.toLowerCase();
                  const value = row[key];
                  return (
                    <td key={day} className="px-4 py-3 text-center">
                      {getClassBadge(value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-blue-50 rounded-xl p-3 text-center">
          <p className="text-sm text-blue-700">🌅 Morning Shift: 6:00 AM – 12:00 PM</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-3 text-center">
          <p className="text-sm text-orange-700">☀️ Afternoon Shift: 12:00 PM – 5:00 PM</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-3 text-center">
          <p className="text-sm text-purple-700">🌙 Evening Shift: 5:30 PM – 6:30 PM</p>
        </div>
      </div>
    </div>
  );
}