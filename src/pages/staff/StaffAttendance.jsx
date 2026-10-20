import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';

const mockAttendanceData = {
  '2025-06-01': 'present',
  '2025-06-02': 'present',
  '2025-06-03': 'absent',
  '2025-06-04': 'present',
  '2025-06-05': 'present',
  '2025-06-06': 'present',
  '2025-06-07': 'weekend',
  '2025-06-08': 'weekend',
  '2025-06-09': 'present',
  '2025-06-10': 'present',
  '2025-06-11': 'present',
  '2025-06-12': 'late',
  '2025-06-13': 'present',
  '2025-06-14': 'present',
  '2025-06-15': 'weekend',
  '2025-06-16': 'present',
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'present': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Present</span>;
    case 'absent': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Absent</span>;
    case 'late': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Late</span>;
    case 'weekend': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Weekend</span>;
    default: return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">-</span>;
  }
};

export default function StaffAttendance() {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState(mockAttendanceData);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [markStatus, setMarkStatus] = useState('present');

  const today = format(new Date(), 'yyyy-MM-dd');
  const todayStatus = attendance[today] || 'not_marked';

  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const presentCount = Object.values(attendance).filter(v => v === 'present').length;
  const absentCount = Object.values(attendance).filter(v => v === 'absent').length;
  const lateCount = Object.values(attendance).filter(v => v === 'late').length;

  const handleMarkAttendance = () => {
    setAttendance({
      ...attendance,
      [today]: markStatus,
    });
    setShowMarkModal(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">✅ Attendance</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{presentCount}</div>
          <div className="text-sm text-gray-500">Present</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">{absentCount}</div>
          <div className="text-sm text-gray-500">Absent</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-500">
          <div className="text-2xl font-bold text-orange-600">{lateCount}</div>
          <div className="text-sm text-gray-500">Late</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-900">
          <div className="text-2xl font-bold text-blue-900">{Object.keys(attendance).length}</div>
          <div className="text-sm text-gray-500">Total Days</div>
        </div>
      </div>

      {/* Today's Status */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-blue-900">Today's Status</h2>
            <p className="text-sm text-gray-500">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
          </div>
          <div className="flex items-center gap-4">
            {todayStatus === 'not_marked' ? (
              <>
                <span className="text-yellow-500 font-medium">Not marked yet</span>
                <button 
                  onClick={() => setShowMarkModal(true)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Mark Attendance
                </button>
              </>
            ) : (
              <>
                <span className="text-lg font-bold">{getStatusBadge(todayStatus)}</span>
                <button 
                  onClick={() => setShowMarkModal(true)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Update
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mark Attendance Modal */}
      {showMarkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Mark Attendance</h2>
            <p className="text-sm text-gray-500 mb-4">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input 
                  type="radio" 
                  name="status" 
                  value="present" 
                  checked={markStatus === 'present'}
                  onChange={() => setMarkStatus('present')}
                  className="text-blue-900 focus:ring-blue-900"
                />
                <span>✅ Present</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input 
                  type="radio" 
                  name="status" 
                  value="late" 
                  checked={markStatus === 'late'}
                  onChange={() => setMarkStatus('late')}
                  className="text-blue-900 focus:ring-blue-900"
                />
                <span>⏰ Late</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input 
                  type="radio" 
                  name="status" 
                  value="absent" 
                  checked={markStatus === 'absent'}
                  onChange={() => setMarkStatus('absent')}
                  className="text-blue-900 focus:ring-blue-900"
                />
                <span>❌ Absent</span>
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowMarkModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleMarkAttendance}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Calendar */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">
          {format(new Date(), 'MMMM yyyy')}
        </h2>
        <div className="grid grid-cols-7 gap-1">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
            <div key={idx} className="text-center text-sm font-semibold text-gray-500 py-2">
              {day}
            </div>
          ))}
          {daysInMonth.map((day) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const status = attendance[dateStr] || 'not_marked';
            const isTodayDate = isToday(day);
            let bgColor = 'hover:bg-gray-50';
            let textColor = 'text-gray-800';
            
            if (status === 'present') bgColor = 'bg-green-100 hover:bg-green-200';
            else if (status === 'absent') bgColor = 'bg-red-100 hover:bg-red-200';
            else if (status === 'late') bgColor = 'bg-orange-100 hover:bg-orange-200';
            else if (status === 'weekend') { bgColor = 'bg-gray-100'; textColor = 'text-gray-400'; }
            else if (status === 'not_marked' && dateStr <= today) bgColor = 'bg-gray-50 hover:bg-gray-100';
            
            return (
              <div 
                key={dateStr} 
                className={`border rounded-lg p-2 min-h-[60px] ${bgColor} transition-colors ${isTodayDate ? 'ring-2 ring-blue-900' : ''}`}
                onClick={() => {
                  if (dateStr <= today && status !== 'weekend') {
                    setSelectedDate(dateStr);
                    setMarkStatus(status === 'not_marked' ? 'present' : status);
                    setShowMarkModal(true);
                  }
                }}
              >
                <div className={`text-sm font-medium ${textColor}`}>{format(day, 'd')}</div>
                {status !== 'not_marked' && status !== 'weekend' && (
                  <div className="text-xs mt-1">
                    {status === 'present' && '✅'}
                    {status === 'absent' && '❌'}
                    {status === 'late' && '⏰'}
                  </div>
                )}
                {status === 'weekend' && (
                  <div className="text-xs text-gray-400 mt-1">Off</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}