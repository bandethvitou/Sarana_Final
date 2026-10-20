import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// TODAY'S DATA
const todayKPIs = [
  { label: 'Staff Present Today', value: '30/34', change: '4 absent today', icon: '👥', color: 'border-blue-900' },
  { label: 'Temp Roles Expiring', value: '1', change: 'Expires today', icon: '⏱️', color: 'border-orange-500' },
  { label: 'Leave Requests Today', value: '3', change: 'New today', icon: '📝', color: 'border-yellow-500' },
  { label: 'Expiring Today', value: '2', change: 'Due today', icon: '⚠️', color: 'border-red-500' },
  { label: 'New Hires Today', value: '1', change: 'Hired today', icon: '🆕', color: 'border-green-500' },
];

const todayLeaveRequests = [
  { id: 1, staff: 'Ms. Siti', type: 'Sick Leave', days: 2, date: '2025-06-21', status: 'pending' },
  { id: 2, staff: 'Mr. Budi', type: 'Annual Leave', days: 1, date: '2025-06-21', status: 'pending' },
  { id: 3, staff: 'Mrs. Linda', type: 'Emergency Leave', days: 1, date: '2025-06-21', status: 'pending' },
];

const todayAttendance = [
  { id: 1, staff: 'Mr. John', department: 'Academic', time: '08:00 AM', status: 'present' },
  { id: 2, staff: 'Ms. Anna', department: 'Finance', time: '08:15 AM', status: 'present' },
  { id: 3, staff: 'Mr. Rudi', department: 'Operations', time: '08:30 AM', status: 'present' },
  { id: 4, staff: 'Mrs. Linda', department: 'Academic', time: '09:00 AM', status: 'late' },
  { id: 5, staff: 'Ms. Siti', department: 'HR', time: '08:45 AM', status: 'present' },
];

const expiringToday = [
  { id: 1, staff: 'Mr. John', position: 'Dept Head', expiry: '2025-06-21', daysLeft: 0 },
  { id: 2, staff: 'Ms. Anna', position: 'Finance Admin', expiry: '2025-06-21', daysLeft: 0 },
];

export default function HrHome() {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Present</span>;
      case 'late': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">⏰ Late</span>;
      case 'absent': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">❌ Absent</span>;
      default: return null;
    }
  };

  const getLeaveStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>;
      case 'approved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Approved</span>;
      case 'denied': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Denied</span>;
      default: return null;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">👔 HR Home</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! • {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">TODAY'S DATA</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {todayKPIs.map((kpi, idx) => (
          <div key={idx} className={`bg-white rounded-xl p-5 shadow-sm border-t-4 ${kpi.color} hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between">
              <span className="text-2xl">{kpi.icon}</span>
              <span className={`text-xs font-medium ${
                kpi.change.includes('absent') ? 'text-red-600' : 
                kpi.change.includes('Expires') ? 'text-orange-600' : 
                'text-green-600'
              }`}>{kpi.change}</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-blue-900">{kpi.value}</div>
              <div className="text-sm text-gray-500">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button onClick={() => navigate('/hr/staff')} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm">+ Add Staff</button>
        <button onClick={() => navigate('/hr/leaves')} className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors">📝 Approve Leave</button>
        <button onClick={() => navigate('/hr/positions')} className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors">🔄 Assign Position</button>
        <button className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors">📢 Send Announcement</button>
      </div>

      {/* Today's Summary */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📋 Today's Summary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">30</div>
            <div className="text-sm text-gray-500">Present</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">4</div>
            <div className="text-sm text-gray-500">Absent</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <div className="text-sm text-gray-500">Leave Requests</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">2</div>
            <div className="text-sm text-gray-500">Expiring Today</div>
          </div>
        </div>
      </div>

      {/* Today's Leave Requests */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900">📝 Today's Leave Requests</h2>
          <button onClick={() => navigate('/hr/leaves')} className="text-sm text-orange-500 hover:underline">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Staff</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Days</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {todayLeaveRequests.map((leave) => (
                <tr key={leave.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{leave.staff}</td>
                  <td className="px-4 py-2">{leave.type}</td>
                  <td className="px-4 py-2">{leave.days}</td>
                  <td className="px-4 py-2">{leave.date}</td>
                  <td className="px-4 py-2">{getLeaveStatusBadge(leave.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Today's Attendance */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900">✅ Today's Attendance</h2>
          <button className="text-sm text-orange-500 hover:underline">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Staff</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {todayAttendance.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{item.staff}</td>
                  <td className="px-4 py-2">{item.department}</td>
                  <td className="px-4 py-2">{item.time}</td>
                  <td className="px-4 py-2">{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expiring Today */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-red-600">⚠️ Expiring Today</h2>
          <button onClick={() => navigate('/hr/temp-roles')} className="text-sm text-orange-500 hover:underline">View All →</button>
        </div>
        <div className="space-y-3">
          {expiringToday.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0 bg-red-50 rounded-lg p-3">
              <div>
                <p className="font-medium">{item.staff}</p>
                <p className="text-sm text-gray-500">{item.position}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-red-600 font-bold">Expires today</span>
                <button className="px-3 py-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600">Renew</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}