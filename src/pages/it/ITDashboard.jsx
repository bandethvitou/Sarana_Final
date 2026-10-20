import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockKPIs = [
  { label: 'Open Tickets', value: '4', change: '⚠️ 1 High priority', icon: '🎫', color: 'border-red-500' },
  { label: 'Resolved Today', value: '2', change: '✅ Done', icon: '✅', color: 'border-green-500' },
  { label: 'Equipment Issues', value: '1', change: '🔧 Needs repair', icon: '💻', color: 'border-orange-500' },
  { label: 'Pending Upgrades', value: '3', change: '📅 Planned', icon: '📅', color: 'border-blue-900' },
  { label: 'Avg Response Time', value: '2.5 hrs', change: '↓ from 3.2 hrs', icon: '⚡', color: 'border-yellow-500' },
];

const mockRecentTickets = [
  { id: 24, issue: 'Projector not working – Room 12', reportedBy: 'Ms. Linda', date: '20 Jun', priority: 'high', status: 'open' },
  { id: 23, issue: 'WiFi down in Building B', reportedBy: 'Mr. Rudi', date: '19 Jun', priority: 'high', status: 'in-progress' },
  { id: 22, issue: 'Smart board calibration', reportedBy: 'Mr. John', date: '18 Jun', priority: 'medium', status: 'resolved' },
  { id: 21, issue: 'Printer jam – Office Room', reportedBy: 'Ms. Siti', date: '17 Jun', priority: 'low', status: 'resolved' },
];

const mockEquipmentStatus = [
  { category: '💻 Computers', total: 120, ok: 118, issue: 2, status: '98% OK' },
  { category: '📽 Projectors', total: 45, ok: 44, issue: 1, status: '98% OK' },
  { category: '🖨 Printers', total: 12, ok: 11, issue: 1, status: '92% OK' },
  { category: '📺 Smart Boards', total: 30, ok: 29, issue: 1, status: '97% OK' },
  { category: '🌐 Routers', total: 8, ok: 8, issue: 0, status: '100% OK' },
  { category: '🔊 Speakers', total: 20, ok: 20, issue: 0, status: '100% OK' },
];

const mockMaintenance = [
  { date: '22 Jun', task: 'Router firmware update', equipment: 'Routers', assignedTo: 'Mr. David' },
  { date: '25 Jun', task: 'Computer lab cleanup & updates', equipment: 'Computers (Lab 1)', assignedTo: 'Mr. David' },
  { date: '28 Jun', task: 'Projector bulb replacement', equipment: 'Projector (Room 8)', assignedTo: 'External Vendor' },
  { date: '30 Jun', task: 'Monthly system backup', equipment: 'All servers', assignedTo: 'Mr. David' },
];

export default function ITDashboard() {
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
      default: return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Closed</span>;
    }
  };

  return (
    <div>
      {/* Welcome Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">💻 IT Support Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, Mr. David! • Friday, 20 June 2025</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">IT Support</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {mockKPIs.map((kpi, idx) => (
          <div key={idx} className={`bg-white rounded-xl p-5 shadow-sm border-t-4 ${kpi.color} hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between">
              <span className="text-2xl">{kpi.icon}</span>
              <span className="text-xs font-medium text-gray-500">{kpi.change}</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-blue-900">{kpi.value}</div>
              <div className="text-sm text-gray-500">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions - ALL BUTTONS WORKING */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button 
          onClick={() => navigate('/it/tickets')} 
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
        >
          + Create Ticket
        </button>
        <button 
          onClick={() => navigate('/it/inventory')} 
          className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors"
        >
          + Add Equipment
        </button>
        <button 
          onClick={() => navigate('/it/maintenance')} 
          className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors"
        >
          🔧 Log Repair
        </button>
        <button 
          onClick={() => navigate('/it/maintenance')} 
          className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors"
        >
          📅 Schedule Maintenance
        </button>
        <button 
          onClick={() => navigate('/it/reports')} 
          className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors"
        >
          📄 Generate Report
        </button>
      </div>

      {/* Row 1: Ticket Status Overview + Quick Actions Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-900">🎫 Ticket Status Overview</h2>
            <button 
              onClick={() => navigate('/it/tickets')} 
              className="text-sm text-orange-500 hover:underline"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">4</div>
              <div className="text-xs text-gray-500">Open</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">3</div>
              <div className="text-xs text-gray-500">In Progress</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-xs text-gray-500">Resolved</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">15</div>
              <div className="text-xs text-gray-500">Closed</div>
            </div>
          </div>
          <div className="mt-4 bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Tickets This Month: <strong>24</strong></span>
              <span className="text-gray-500">Resolution Rate: <strong className="text-green-600">71%</strong></span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '71%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">⚡ Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => navigate('/it/tickets')} 
              className="p-3 bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 transition-colors text-sm"
            >
              🎫 Create Ticket
            </button>
            <button 
              onClick={() => navigate('/it/inventory')} 
              className="p-3 bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 transition-colors text-sm"
            >
              💻 Add Equipment
            </button>
            <button 
              onClick={() => navigate('/it/maintenance')} 
              className="p-3 bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 transition-colors text-sm"
            >
              🔧 Log Repair
            </button>
            <button 
              onClick={() => navigate('/it/reports')} 
              className="p-3 bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 transition-colors text-sm"
            >
              📄 Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Recent Tickets + Equipment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-900">🎫 Recent Tickets</h2>
            <button 
              onClick={() => navigate('/it/tickets')} 
              className="text-sm text-orange-500 hover:underline"
            >
              View All →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-2 text-left">ID</th>
                  <th className="px-3 py-2 text-left">Issue</th>
                  <th className="px-3 py-2 text-left">Priority</th>
                  <th className="px-3 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockRecentTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium">#{ticket.id}</td>
                    <td className="px-3 py-2">
                      <div>
                        <span className="text-gray-800">{ticket.issue}</span>
                        <div className="text-xs text-gray-400">{ticket.reportedBy} • {ticket.date}</div>
                      </div>
                    </td>
                    <td className="px-3 py-2">{getPriorityBadge(ticket.priority)}</td>
                    <td className="px-3 py-2">{getStatusBadge(ticket.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-900">💻 Equipment Status Overview</h2>
            <button 
              onClick={() => navigate('/it/inventory')} 
              className="text-sm text-orange-500 hover:underline"
            >
              View All →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-2 text-left">Category</th>
                  <th className="px-3 py-2 text-center">Total</th>
                  <th className="px-3 py-2 text-center">OK</th>
                  <th className="px-3 py-2 text-center">Issues</th>
                  <th className="px-3 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockEquipmentStatus.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">{item.category}</td>
                    <td className="px-3 py-2 text-center">{item.total}</td>
                    <td className="px-3 py-2 text-center text-green-600">{item.ok}</td>
                    <td className="px-3 py-2 text-center text-red-600">{item.issue}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.issue === 0 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-sm text-gray-500">
            ⚠️ {mockEquipmentStatus.reduce((sum, item) => sum + item.issue, 0)} devices need attention
          </div>
        </div>
      </div>

      {/* Maintenance Schedule */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900">🔧 Upcoming Maintenance</h2>
          <button 
            onClick={() => navigate('/it/maintenance')} 
            className="text-sm text-orange-500 hover:underline"
          >
            + Schedule Maintenance
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Task</th>
                <th className="px-4 py-2 text-left">Equipment</th>
                <th className="px-4 py-2 text-left">Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {mockMaintenance.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{item.date}</td>
                  <td className="px-4 py-2">{item.task}</td>
                  <td className="px-4 py-2">{item.equipment}</td>
                  <td className="px-4 py-2">{item.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}