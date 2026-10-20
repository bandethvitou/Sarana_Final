import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// TODAY'S DATA
const todayKPIs = [
  { label: 'Open Tickets', value: '4', change: '⚠️ 1 High priority', icon: '🎫', color: 'border-red-500' },
  { label: 'Resolved Today', value: '2', change: '✅ Done', icon: '✅', color: 'border-green-500' },
  { label: 'Equipment Issues', value: '1', change: '🔧 Needs repair', icon: '💻', color: 'border-orange-500' },
  { label: 'Pending Upgrades', value: '3', change: '📅 Planned', icon: '📅', color: 'border-blue-900' },
  { label: 'Avg Response Time', value: '2.5 hrs', change: '↓ from 3.2 hrs', icon: '⚡', color: 'border-yellow-500' },
];

const todayTickets = [
  { id: 24, issue: 'Projector not working – Room 12', reportedBy: 'Ms. Linda', time: '10:30 AM', priority: 'high', status: 'open' },
  { id: 23, issue: 'WiFi down in Building B', reportedBy: 'Mr. Rudi', time: '09:15 AM', priority: 'high', status: 'in-progress' },
  { id: 22, issue: 'Smart board calibration', reportedBy: 'Mr. John', time: '08:45 AM', priority: 'medium', status: 'resolved' },
  { id: 21, issue: 'Printer jam – Office Room', reportedBy: 'Ms. Siti', time: '08:00 AM', priority: 'low', status: 'resolved' },
];

const todayMaintenance = [
  { task: 'Router firmware update', equipment: 'Routers', time: 'Today 2:00 PM' },
  { task: 'Computer lab cleanup', equipment: 'Lab 1', time: 'Today 4:00 PM' },
];

export default function ITHome() {
  const navigate = useNavigate();

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 High</span>;
      case 'medium': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 Medium</span>;
      case 'low': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">🟢 Low</span>;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 Open</span>;
      case 'in-progress': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 In Progress</span>;
      case 'resolved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">🟢 Resolved</span>;
      default: return null;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">💻 IT Support Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, Mr. David! • {new Date().toLocaleDateString('en-US', { 
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
              <span className="text-xs text-gray-500">{kpi.change}</span>
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
        <button onClick={() => navigate('/it/tickets')} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm">+ Create Ticket</button>
        <button onClick={() => navigate('/it/inventory')} className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors">+ Add Equipment</button>
        <button onClick={() => navigate('/it/maintenance')} className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors">🔧 Log Repair</button>
        <button onClick={() => navigate('/it/reports')} className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors">📄 Generate Report</button>
      </div>

      {/* Today's Tickets */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900">🎫 Today's Tickets</h2>
          <button onClick={() => navigate('/it/tickets')} className="text-sm text-orange-500 hover:underline">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Issue</th>
                <th className="px-4 py-2 text-left">Reported By</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Priority</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {todayTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">#{ticket.id}</td>
                  <td className="px-4 py-2">{ticket.issue}</td>
                  <td className="px-4 py-2">{ticket.reportedBy}</td>
                  <td className="px-4 py-2">{ticket.time}</td>
                  <td className="px-4 py-2">{getPriorityBadge(ticket.priority)}</td>
                  <td className="px-4 py-2">{getStatusBadge(ticket.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Today's Maintenance */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900">🔧 Today's Maintenance</h2>
          <button onClick={() => navigate('/it/maintenance')} className="text-sm text-orange-500 hover:underline">View All →</button>
        </div>
        <div className="space-y-3">
          {todayMaintenance.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
              <div>
                <p className="font-medium">{item.task}</p>
                <p className="text-sm text-gray-500">{item.equipment}</p>
              </div>
              <span className="text-sm text-blue-900">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}