import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockKPIs = [
  { label: 'Total Staff', value: '34', change: '↑ 3 new this month', icon: '👥', color: 'border-blue-900' },
  { label: 'Active Temp Roles', value: '5', change: '⚠️ 2 expire this week', icon: '⏱️', color: 'border-orange-500' },
  { label: 'Pending Leave', value: '8', change: '🕒 Needs attention', icon: '📝', color: 'border-yellow-500' },
  { label: 'Expiring Positions', value: '2', change: '⚠️ Alert', icon: '⚠️', color: 'border-red-500' },
  { label: 'New Hires', value: '3', change: '↑ From last month', icon: '🆕', color: 'border-green-500' },
];

const departmentData = [
  { name: 'Academic', count: 15, color: 'bg-blue-100 text-blue-700' },
  { name: 'Admin', count: 8, color: 'bg-purple-100 text-purple-700' },
  { name: 'Finance', count: 3, color: 'bg-green-100 text-green-700' },
  { name: 'HR', count: 2, color: 'bg-pink-100 text-pink-700' },
  { name: 'Operations', count: 6, color: 'bg-orange-100 text-orange-700' },
];

const positionChanges = [
  { id: 1, staff: 'Mr. John', action: 'Promoted', positions: 'Teacher → Dept Head', date: '2025-06-18' },
  { id: 2, staff: 'Ms. Anna', action: 'Demoted', positions: 'Finance Admin → Staff', date: '2025-06-15' },
  { id: 3, staff: 'Mr. Rudi', action: 'Promoted', positions: 'Staff → Manager', date: '2025-06-12' },
];

const pendingLeaves = [
  { id: 1, staff: 'Ms. Siti', type: 'Sick Leave', days: 2, date: '2025-06-20' },
  { id: 2, staff: 'Mr. Budi', type: 'Annual Leave', days: 3, date: '2025-06-19' },
  { id: 3, staff: 'Mrs. Linda', type: 'Emergency Leave', days: 1, date: '2025-06-18' },
];

const tempRoleAlerts = [
  { id: 1, staff: 'Mr. John', position: 'Dept Head', expiry: '2025-06-25', daysLeft: 5 },
  { id: 2, staff: 'Ms. Anna', position: 'Finance Admin', expiry: '2025-06-28', daysLeft: 8 },
];

export default function HrDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">👔 HR Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! • {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">HR Admin</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {mockKPIs.map((kpi, idx) => (
          <div key={idx} className={`bg-white rounded-xl p-5 shadow-sm border-t-4 ${kpi.color} hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between">
              <span className="text-2xl">{kpi.icon}</span>
              <span className={`text-xs font-medium ${
                kpi.change.includes('↑') ? 'text-green-600' : 
                kpi.change.includes('⚠️') ? 'text-yellow-600' : 
                'text-red-600'
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
        <button 
          onClick={() => navigate('/hr/staff')} 
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
        >
          + Add Staff
        </button>
        <button 
          onClick={() => navigate('/hr/positions')} 
          className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors"
        >
          + Assign Position
        </button>
        <button 
          onClick={() => navigate('/hr/leaves')} 
          className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors"
        >
          📝 Approve Leave
        </button>
        <button 
          onClick={() => navigate('/hr/reports')} 
          className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors"
        >
          📄 Generate Report
        </button>
      </div>

      {/* Row 1: Staff by Department + Recent Position Changes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Staff by Department</h2>
          <div className="grid grid-cols-2 gap-3">
            {departmentData.map((dept, idx) => (
              <div key={idx} className={`${dept.color} rounded-lg p-4 text-center`}>
                <div className="text-2xl font-bold">{dept.count}</div>
                <div className="text-sm font-medium">{dept.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-900">🔄 Recent Position Changes</h2>
            <button className="text-sm text-orange-500 hover:underline">View All →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-2 text-left">Staff</th>
                  <th className="px-3 py-2 text-left">Action</th>
                  <th className="px-3 py-2 text-left">Positions</th>
                  <th className="px-3 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {positionChanges.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium">{item.staff}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.action === 'Promoted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>{item.action}</span>
                    </td>
                    <td className="px-3 py-2">{item.positions}</td>
                    <td className="px-3 py-2">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 2: Pending Leave + Temp Role Expiry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-yellow-600">📝 Pending Leave Requests</h2>
            <button className="text-sm text-orange-500 hover:underline">View All →</button>
          </div>
          <div className="space-y-3">
            {pendingLeaves.map((leave) => (
              <div key={leave.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{leave.staff}</p>
                  <p className="text-sm text-gray-500">{leave.type} ({leave.days} days)</p>
                  <p className="text-xs text-gray-400">{leave.date}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">Approve</button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Deny</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-orange-600">⚠️ Temp Role Expiry Alerts</h2>
            <button className="text-sm text-orange-500 hover:underline">View All →</button>
          </div>
          <div className="space-y-3">
            {tempRoleAlerts.map((alert) => (
              <div key={alert.id} className={`flex items-center justify-between py-2 border-b last:border-0 p-2 rounded-lg ${
                alert.daysLeft <= 7 ? 'bg-red-50' : 'bg-yellow-50'
              }`}>
                <div>
                  <p className="font-medium">{alert.staff}</p>
                  <p className="text-sm text-gray-500">{alert.position}</p>
                  <p className="text-xs text-gray-400">Expires: {alert.expiry}</p>
                </div>
                <div className="text-right">
                  <span className={`font-bold ${alert.daysLeft <= 7 ? 'text-red-600' : 'text-orange-600'}`}>
                    {alert.daysLeft} days
                  </span>
                  <button className="block text-xs text-blue-900 hover:underline">Renew</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}