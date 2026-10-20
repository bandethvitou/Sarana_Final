import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const children = [
  { id: 1, name: 'Sok', grade: 'Grade 10A' },
  { id: 2, name: 'Mey', grade: 'Grade 8B' },
];

const attendanceData = {
  'Sok': {
    present: 18,
    absent: 1,
    late: 1,
    holidays: 2,
    total: 22,
    calendar: [
      { day: 1, status: 'present' }, { day: 2, status: 'present' }, { day: 3, status: 'present' },
      { day: 4, status: 'present' }, { day: 5, status: 'present' }, { day: 6, status: 'holiday' },
      { day: 7, status: 'holiday' }, { day: 8, status: 'present' }, { day: 9, status: 'present' },
      { day: 10, status: 'present' }, { day: 11, status: 'absent' }, { day: 12, status: 'present' },
      { day: 13, status: 'present' }, { day: 14, status: 'present' }, { day: 15, status: 'present' },
      { day: 16, status: 'present' }, { day: 17, status: 'present' }, { day: 18, status: 'late' },
      { day: 19, status: 'present' }, { day: 20, status: 'present' }, { day: 21, status: 'present' },
      { day: 22, status: 'present' }, { day: 23, status: 'present' }, { day: 24, status: 'present' },
      { day: 25, status: 'present' }, { day: 26, status: 'present' }, { day: 27, status: 'holiday' },
      { day: 28, status: 'holiday' }, { day: 29, status: 'present' }, { day: 30, status: 'present' },
    ]
  },
  'Mey': {
    present: 19,
    absent: 0,
    late: 1,
    holidays: 2,
    total: 22,
    calendar: [
      { day: 1, status: 'present' }, { day: 2, status: 'present' }, { day: 3, status: 'present' },
      { day: 4, status: 'present' }, { day: 5, status: 'present' }, { day: 6, status: 'holiday' },
      { day: 7, status: 'holiday' }, { day: 8, status: 'present' }, { day: 9, status: 'present' },
      { day: 10, status: 'present' }, { day: 11, status: 'present' }, { day: 12, status: 'present' },
      { day: 13, status: 'present' }, { day: 14, status: 'present' }, { day: 15, status: 'present' },
      { day: 16, status: 'present' }, { day: 17, status: 'present' }, { day: 18, status: 'late' },
      { day: 19, status: 'present' }, { day: 20, status: 'present' }, { day: 21, status: 'present' },
      { day: 22, status: 'present' }, { day: 23, status: 'present' }, { day: 24, status: 'present' },
      { day: 25, status: 'present' }, { day: 26, status: 'present' }, { day: 27, status: 'holiday' },
      { day: 28, status: 'holiday' }, { day: 29, status: 'present' }, { day: 30, status: 'present' },
    ]
  }
};

export default function Attendance() {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState(children[0]);
  const [showReportModal, setShowReportModal] = useState(false);

  const data = attendanceData[selectedChild.name];
  const rate = Math.round((data.present / data.total) * 100);

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

  const handleReportAbsence = () => {
    toast.success('📧 Absence reported to teacher!');
    setShowReportModal(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">✅ Attendance</h1>

      {/* Child Selector */}
      <div className="flex flex-wrap gap-3 mb-6">
        {children.map((child) => (
          <button
            key={child.id}
            onClick={() => setSelectedChild(child)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedChild.id === child.id
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {child.name} – {child.grade}
          </button>
        ))}
        <button
          onClick={() => setShowReportModal(true)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 ml-auto"
        >
          📧 Report Absence
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📅 Attendance – June 2025</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{data.present}</div>
            <div className="text-sm text-gray-500">✅ Present</div>
          </div>
          <div className="bg-red-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-red-600">{data.absent}</div>
            <div className="text-sm text-gray-500">❌ Absent</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-orange-600">{data.late}</div>
            <div className="text-sm text-gray-500">🕒 Late</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-gray-600">{data.holidays}</div>
            <div className="text-sm text-gray-500">📅 Holidays</div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Rate: {rate}%</span>
            <span>{data.present}/{data.total} days</span>
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
          {data.calendar.map((day) => (
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

      {/* Report Absence Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">📧 Report Absence</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Child</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  {children.map((c) => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" className="w-full border rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea rows="3" className="w-full border rounded-lg px-4 py-2" placeholder="My child is sick..." />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowReportModal(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleReportAbsence} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Send Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}