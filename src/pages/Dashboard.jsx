// src/pages/Dashboard.jsx
import { useNavigate } from 'react-router-dom';

const mockKPIs = [
  { label: 'Total Students', value: '1,250', trend: '↑ 35 new this month', trendUp: true },
  { label: 'Attendance Today', value: '94%', trend: '↑ 2% vs yesterday', trendUp: true },
  { label: 'Fee Collection', value: '93%', trend: '↓ $3.2K outstanding', trendUp: false },
  { label: 'Students at Risk', value: '12', trend: '⚠️ Needs attention', trendUp: false },
  { label: 'Pending Bills', value: '5', trend: '🕒 Awaiting approval', trendUp: false },
];

const enrollmentData = { newStudents: 35, dropouts: 8, netGrowth: 27 };
const financeData = { income: 45000, outstanding: 3200, overdueCount: 12 };
const defaulters = [
  { name: 'Sok', class: 'Gr.10', amount: '$200', days: 45 },
  { name: 'Mey', class: 'Gr.8', amount: '$150', days: 30 },
];
const multiRoleStaff = [
  { name: 'Mr. John', roles: ['Teacher', 'Dept Head', 'Event Coord.'] },
  { name: 'Ms. Anna', roles: ['Finance Admin', 'HR Admin', 'Teacher'] },
];
const goals = [
  { title: 'Library Renovation', progress: 60, due: '30 June', manager: 'Ms. Anna' },
  { title: 'Increase Enrollment by 10%', progress: 80, due: '15 Aug', manager: 'Mr. Rudi' },
];
const alerts = [
  { type: 'critical', message: 'Fee Defaulter: Sok (Gr.10) – 45 days overdue.', time: '5 min ago' },
  { type: 'warning', message: 'Low Attendance: Grade 7B dropped to 78% today.', time: '1 hour ago' },
  { type: 'info', message: 'New Hiring Request: Math Teacher position submitted.', time: '2 hours ago' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const getProgressColor = (pct) => {
    if (pct >= 75) return 'bg-green-500';
    if (pct >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Director Dashboard</h1>

      {/* Quick Action Buttons - NOW WITH NAVIGATION */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => navigate('/roles')}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-blue-900 font-medium hover:bg-gray-50 transition-colors"
        >
          + Promote User
        </button>
        <button
          onClick={() => navigate('/meetings')}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-blue-900 font-medium hover:bg-gray-50 transition-colors"
        >
          + Create Meeting
        </button>
        <button
          onClick={() => navigate('/goals')}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-blue-900 font-medium hover:bg-gray-50 transition-colors"
        >
          + Add Goal
        </button>
        <button className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors">
          📢 Send Announcement
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {mockKPIs.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-blue-900 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-500 mb-1">{kpi.label}</div>
            <div className="text-3xl font-bold text-blue-900">{kpi.value}</div>
            <div className={`text-xs mt-2 ${kpi.trendUp ? 'text-green-500' : 'text-red-500'}`}>{kpi.trend}</div>
          </div>
        ))}
      </div>

      {/* Widgets Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {/* Enrollment Summary */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📈 Enrollment Summary</h2>
          <div className="flex justify-around">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">+{enrollmentData.newStudents}</div>
              <div className="text-sm text-gray-500">New Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">-{enrollmentData.dropouts}</div>
              <div className="text-sm text-gray-500">Dropouts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">+{enrollmentData.netGrowth}</div>
              <div className="text-sm text-gray-500">Net Growth</div>
            </div>
          </div>
        </div>

        {/* Finance Quick View */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">💰 Finance at a Glance</h2>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-900 to-orange-500 flex items-center justify-center text-white font-bold text-sm">73%</div>
            <div>
              <p className="text-sm"><strong>Income (MTD):</strong> <span className="text-blue-900">${financeData.income.toLocaleString()}</span></p>
              <p className="text-sm"><strong>Outstanding:</strong> <span className="text-orange-500">${financeData.outstanding.toLocaleString()}</span></p>
              <p className="text-xs text-gray-400 mt-1">{financeData.overdueCount} students overdue</p>
            </div>
          </div>
          <h3 className="text-md font-semibold text-blue-900 mt-4">Top Fee Defaulters</h3>
          <table className="w-full text-sm mt-2">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="text-left py-1">Student</th>
                <th className="text-left py-1">Class</th>
                <th className="text-left py-1">Amount</th>
                <th className="text-left py-1">Days</th>
              </tr>
            </thead>
            <tbody>
              {defaulters.map((d, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-1">{d.name}</td>
                  <td className="py-1">{d.class}</td>
                  <td className="py-1">{d.amount}</td>
                  <td className="py-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${d.days > 30 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                      {d.days}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Widgets Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {/* Multi-Role Staff */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">👥 Multi-Role Staff</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="text-left py-1">Name</th>
                <th className="text-left py-1">Positions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {multiRoleStaff.map((staff, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-2 font-medium">{staff.name}</td>
                  <td className="py-2">
                    <div className="flex flex-wrap gap-1">
                      {staff.roles.map((role, j) => (
                        <span
                          key={j}
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            role.includes('Teacher') ? 'bg-blue-100 text-blue-700' :
                            role.includes('Dept') ? 'bg-purple-100 text-purple-700' :
                            role.includes('Event') ? 'bg-orange-100 text-orange-700' :
                            role.includes('Finance') ? 'bg-green-100 text-green-700' :
                            role.includes('HR') ? 'bg-pink-100 text-pink-700' :
                            'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => navigate('/roles')}
                      className="text-blue-900 text-sm border border-gray-300 rounded px-2 py-0.5 hover:bg-gray-50"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Incomplete Goals */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">🎯 Incomplete Goals</h2>
          {goals.map((goal, i) => (
            <div key={i} className="mb-4 last:mb-0">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{goal.title}</span>
                <span className="text-xs text-gray-400">{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`h-2 rounded-full ${getProgressColor(goal.progress)}`} style={{ width: `${goal.progress}%` }}></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">Due: {goal.due} ({goal.manager})</div>
            </div>
          ))}
          <button
            onClick={() => navigate('/goals')}
            className="mt-4 text-sm text-blue-900 hover:underline"
          >
            View All Goals →
          </button>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">🔔 Recent Alerts</h2>
        {alerts.map((alert, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
            <span className={`w-2 h-2 rounded-full ${alert.type === 'critical' ? 'bg-red-500' : alert.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`}></span>
            <span className="text-sm flex-1">{alert.message}</span>
            <span className="text-xs text-gray-400">{alert.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}