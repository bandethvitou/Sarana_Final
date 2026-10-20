import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

const reportData = {
  date: '2025-06-20',
  attendance: {
    total: 1250,
    present: 1200,
    absent: 35,
    late: 15,
  },
  visitors: {
    total: 8,
    byPurpose: { Meeting: 4, Delivery: 2, Tour: 1, Event: 0, Other: 1 },
  },
  calls: {
    total: 15,
    resolved: 12,
    pending: 3,
  },
  notes: 'All visitors passed security check. One delivery delayed.',
};

export default function DailyReport() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState(reportData.notes);
  const [date] = useState(reportData.date);

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const exportExcel = () => {
    const data = [
      ['DAILY REPORT', formattedDate],
      [''],
      ['STUDENT ATTENDANCE'],
      ['Total Students', reportData.attendance.total],
      ['Present', reportData.attendance.present],
      ['Absent', reportData.attendance.absent],
      ['Late', reportData.attendance.late],
      [''],
      ['VISITOR LOG'],
      ['Total Visitors', reportData.visitors.total],
      ['Meetings', reportData.visitors.byPurpose.Meeting],
      ['Deliveries', reportData.visitors.byPurpose.Delivery],
      ['Tours', reportData.visitors.byPurpose.Tour],
      ['Events', reportData.visitors.byPurpose.Event],
      ['Other', reportData.visitors.byPurpose.Other],
      [''],
      ['PHONE CALLS'],
      ['Total Calls', reportData.calls.total],
      ['Resolved', reportData.calls.resolved],
      ['Pending Callback', reportData.calls.pending],
      [''],
      ['NOTES'],
      [notes],
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Daily Report');
    XLSX.writeFile(wb, `Daily_Report_${date}.xlsx`);
    toast.success('📊 Excel exported successfully!');
  };

  const handleSubmitReport = () => {
    toast.success('📄 Report submitted to manager!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📄 Daily Report</h1>

      <div className="bg-white rounded-xl shadow-sm p-6 max-w-3xl">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-blue-900">Daily Report</h2>
          <p className="text-gray-500">{formattedDate}</p>
        </div>

        {/* Student Attendance */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 border-b pb-2">📊 Student Attendance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-900">{reportData.attendance.total}</div>
              <div className="text-sm text-gray-500">Total Students</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{reportData.attendance.present}</div>
              <div className="text-sm text-gray-500">Present ({Math.round(reportData.attendance.present / reportData.attendance.total * 100)}%)</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{reportData.attendance.absent}</div>
              <div className="text-sm text-gray-500">Absent</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-yellow-600">{reportData.attendance.late}</div>
              <div className="text-sm text-gray-500">Late</div>
            </div>
          </div>
        </div>

        {/* Visitor Log */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 border-b pb-2">🚶 Visitor Log</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-900">{reportData.visitors.total}</div>
              <div className="text-sm text-gray-500">Total Visitors</div>
            </div>
            {Object.entries(reportData.visitors.byPurpose).map(([purpose, count]) => (
              <div key={purpose} className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-blue-900">{count}</div>
                <div className="text-xs text-gray-500">{purpose}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Phone Calls */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 border-b pb-2">📞 Phone Calls</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-900">{reportData.calls.total}</div>
              <div className="text-sm text-gray-500">Total Calls</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{reportData.calls.resolved}</div>
              <div className="text-sm text-gray-500">Resolved</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-yellow-600">{reportData.calls.pending}</div>
              <div className="text-sm text-gray-500">Pending Callback</div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 border-b pb-2">📝 Notes</h3>
          <textarea
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes about today..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
            📄 Export PDF
          </button>
          <button onClick={exportExcel} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
            📤 Export Excel
          </button>
          <button onClick={handleSubmitReport} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium ml-auto">
            📤 Submit to Manager
          </button>
        </div>
      </div>
    </div>
  );
}