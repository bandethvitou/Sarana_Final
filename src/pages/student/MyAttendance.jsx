import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const attendanceData = {
  present: 18,
  absent: 1,
  late: 1,
  holidays: 2,
  total: 22,
};

const calendarData = [
  { day: 1, status: 'present' },
  { day: 2, status: 'present' },
  { day: 3, status: 'present' },
  { day: 4, status: 'present' },
  { day: 5, status: 'present' },
  { day: 6, status: 'holiday' },
  { day: 7, status: 'holiday' },
  { day: 8, status: 'present' },
  { day: 9, status: 'present' },
  { day: 10, status: 'present' },
  { day: 11, status: 'absent' },
  { day: 12, status: 'present' },
  { day: 13, status: 'present' },
  { day: 14, status: 'present' },
  { day: 15, status: 'present' },
  { day: 16, status: 'present' },
  { day: 17, status: 'present' },
  { day: 18, status: 'late' },
  { day: 19, status: 'present' },
  { day: 20, status: 'present' },
  { day: 21, status: 'present' },
  { day: 22, status: 'present' },
  { day: 23, status: 'present' },
  { day: 24, status: 'present' },
  { day: 25, status: 'present' },
  { day: 26, status: 'present' },
  { day: 27, status: 'holiday' },
  { day: 28, status: 'holiday' },
  { day: 29, status: 'present' },
  { day: 30, status: 'present' },
];

export default function MyAttendance() {
  const navigate = useNavigate();

  const getDayColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-500 text-white';
      case 'absent': return 'bg-red-500 text-white';
      case 'late': return 'bg-orange-500 text-white';
      case 'holiday': return 'bg-gray-200 text-gray-500';
      default: return 'bg-gray-100 text-gray-400';
    }
  };

  const getDayLabel = (status) => {
    switch (status) {
      case 'present': return '✅';
      case 'absent': return '❌';
      case 'late': return '🕒';
      case 'holiday': return '⚪';
      default: return '';
    }
  };

  const rate = Math.round((attendanceData.present / attendanceData.total) * 100);

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">✅ My Attendance</h1>

      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📅 Attendance – June 2025</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{attendanceData.present}</div>
            <div className="text-sm text-gray-500">✅ Present</div>
          </div>
          <div className="bg-red-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-red-600">{attendanceData.absent}</div>
            <div className="text-sm text-gray-500">❌ Absent</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-orange-600">{attendanceData.late}</div>
            <div className="text-sm text-gray-500">🕒 Late</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-gray-600">{attendanceData.holidays}</div>
            <div className="text-sm text-gray-500">📅 Holidays</div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Rate: {rate}%</span>
            <span>{attendanceData.present}/{attendanceData.total} days</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full" style={{ width: `${rate}%` }}></div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs font-bold text-gray-500 py-2">{day}</div>
          ))}
          {calendarData.map((day) => (
            <div
              key={day.day}
              className={`text-center py-2 rounded-lg text-sm ${getDayColor(day.status)}`}
            >
              {day.day}
              <div className="text-xs">{getDayLabel(day.status)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}