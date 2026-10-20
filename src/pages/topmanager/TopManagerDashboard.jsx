// src/pages/topmanager/TopManagerDashboard.jsx - FIXED
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data
const kpis = [
  { label: 'Active Managers', value: '5', subtext: 'Under supervision', icon: '👥', trend: '+1 this month' },
  { label: 'Pending Reviews', value: '7', subtext: 'Reports to review', icon: '📋', trend: '⚠️ 3 urgent' },
  { label: 'Total Students', value: '1,250', subtext: 'Across all levels', icon: '🎓', trend: '+35 new' },
  { label: 'New Students MTD', value: '+105', subtext: 'This month', icon: '📈', trend: '+12% vs last month' },
  { label: 'Dropouts MTD', value: '-40', subtext: 'This month', icon: '📉', trend: '-8% improvement' },
  { label: 'Net Growth', value: '+65', subtext: 'This month', icon: '📊', trend: 'Target: +50' },
  { label: 'Open Tasks', value: '3', subtext: 'Assigned to managers', icon: '✅', trend: '2 overdue' },
  { label: 'Issues Escalated', value: '2', subtext: '⚠️ Needs Director attention', icon: '⚠️', trend: 'Critical' },
];

const enrollmentByLevel = [
  { level: 'Baby', current: 85, new: 8, dropouts: 2, net: 6, completionRate: 100 },
  { level: 'Kids', current: 520, new: 45, dropouts: 18, net: 27, completionRate: 80 },
  { level: 'Junior', current: 310, new: 28, dropouts: 12, net: 16, completionRate: 80 },
  { level: 'Senior', current: 335, new: 24, dropouts: 8, net: 16, completionRate: 75 },
];

const pendingReports = [
  { id: 1, manager: 'Mr. Rudi', title: 'Q2 Progress Update', type: 'Progress', date: '10 Jun', priority: 'High' },
  { id: 2, manager: 'Ms. Anna', title: 'Budget Request', type: 'Proposal', date: '8 Jun', priority: 'Medium' },
  { id: 3, manager: 'Mr. John', title: 'Staff Performance Review', type: 'Completion', date: '12 Jun', priority: 'Low' },
];

const teacherPerformance = [
  { name: 'Mr. John', subject: 'Math', avgScore: 85, class: 'Grade 5A', trend: 'up' },
  { name: 'Mrs. Linda', subject: 'English', avgScore: 78, class: 'Grade 4A', trend: 'down' },
  { name: 'Mr. Rudi', subject: 'Science', avgScore: 82, class: 'Grade 6A', trend: 'up' },
];

const recentAlerts = [
  { type: 'critical', message: 'Grade 7B attendance dropped to 68% this week', time: '2 hours ago' },
  { type: 'warning', message: 'Teacher Mr. John has incomplete score sheets (3 classes)', time: '5 hours ago' },
  { type: 'info', message: 'New enrollment application submitted for Senior level', time: '1 day ago' },
];

export default function TopManagerDashboard() {
  const navigate = useNavigate();
  const [showAllReports, setShowAllReports] = useState(false);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Top Manager Dashboard</h1>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={() => navigate('/top-manager/tasks')} className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors shadow-sm">
          + Assign Task
        </button>
        <button onClick={() => navigate('/top-manager/reviews')} className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-blue-900 font-medium hover:bg-gray-50 transition-colors">
          Review Reports
        </button>
        <button onClick={() => navigate('/top-manager/reports')} className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-blue-900 font-medium hover:bg-gray-50 transition-colors">
          Create Report for Director
        </button>
        <button onClick={() => navigate('/top-manager/score-management')} className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-blue-900 font-medium hover:bg-gray-50 transition-colors">
          📝 Manage Scores
        </button>
      </div>

      {/* KPI Cards - 8 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-blue-900 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl">{kpi.icon}</div>
              <div className="text-2xl font-bold text-blue-900">{kpi.value}</div>
            </div>
            <div className="text-sm text-gray-500 mb-1">{kpi.label}</div>
            <div className="text-xs text-gray-400">{kpi.subtext}</div>
            <div className="text-xs mt-2 text-blue-600">{kpi.trend}</div>
          </div>
        ))}
      </div>

      {/* Row 1: Enrollment by Level + Score Completion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {/* Enrollment by Level Table */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-900">📈 Enrollment by Level</h2>
            <button onClick={() => navigate('/top-manager/enrollment')} className="text-sm text-orange-500 hover:underline">View Details →</button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr><th className="px-3 py-2 text-left">Level</th><th>Current</th><th>New</th><th>Dropouts</th><th>Net</th><th>Status</th></tr>
            </thead>
            <tbody>
              {enrollmentByLevel.map((level, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium">{level.level}</td>
                  <td className="px-3 py-2">{level.current}</td>
                  <td className="px-3 py-2 text-green-600">+{level.new}</td>
                  <td className="px-3 py-2 text-red-600">-{level.dropouts}</td>
                  <td className="px-3 py-2">+{level.net}</td>
                  <td className="px-3 py-2">
                    {level.dropouts > 15 ? (
                      <span className="text-red-500 text-xs bg-red-50 px-2 py-0.5 rounded-full">⚠️ Alert</span>
                    ) : (
                      <span className="text-green-500 text-xs bg-green-50 px-2 py-0.5 rounded-full">✓ Stable</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Score Completion Overview */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-900">📊 Score Completion by Level</h2>
            <button onClick={() => navigate('/top-manager/score-management')} className="text-sm text-orange-500 hover:underline">Manage Scores →</button>
          </div>
          <div className="space-y-4">
            {enrollmentByLevel.map((level, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{level.level}</span>
                  <span className={`${level.completionRate >= 80 ? 'text-green-600' : level.completionRate >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {level.completionRate}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full ${level.completionRate >= 80 ? 'bg-green-500' : level.completionRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${level.completionRate}%` }}></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {level.completionRate === 100 ? '✅ All teachers completed' : `⚠️ ${Math.ceil((100 - level.completionRate) / 10)} teachers pending`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Pending Manager Reports + Teacher Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {/* Pending Manager Reports */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-900">📋 Pending Manager Reports</h2>
            <button onClick={() => navigate('/top-manager/reviews')} className="text-sm text-orange-500 hover:underline">View All →</button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr><th className="px-3 py-2 text-left">Manager</th><th>Title</th><th>Priority</th><th>Date</th><th></th></tr>
            </thead>
            <tbody>
              {(showAllReports ? pendingReports : pendingReports.slice(0, 2)).map((report) => (
                <tr key={report.id} className="border-b hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium">{report.manager}</td>
                  <td className="px-3 py-2">{report.title}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${report.priority === 'High' ? 'bg-red-100 text-red-700' : report.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {report.priority}
                    </span>
                  </td>
                  <td className="px-3 py-2">{report.date}</td>
                  <td className="px-3 py-2">
                    <button onClick={() => navigate('/top-manager/reviews')} className="text-orange-500 hover:underline text-sm">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pendingReports.length > 2 && (
            <button onClick={() => setShowAllReports(!showAllReports)} className="mt-3 text-sm text-blue-900 hover:underline">
              {showAllReports ? 'Show less' : `Show all (${pendingReports.length})`}
            </button>
          )}
        </div>

        {/* Teacher Performance Snapshot */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-900">🏆 Teacher Performance (Top)</h2>
            <button onClick={() => navigate('/top-manager/teacher-performance')} className="text-sm text-orange-500 hover:underline">View All →</button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr><th className="px-3 py-2 text-left">Teacher</th><th>Subject</th><th>Class</th><th>Avg Score</th><th></th></tr>
            </thead>
            <tbody>
              {teacherPerformance.map((teacher, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium">{teacher.name}</td>
                  <td className="px-3 py-2">{teacher.subject}</td>
                  <td className="px-3 py-2">{teacher.class}</td>
                  <td className={`px-3 py-2 font-bold ${getScoreColor(teacher.avgScore)}`}>{teacher.avgScore}%</td>
                  <td className="px-3 py-2">
                    <span className="text-xs">{teacher.trend === 'up' ? '📈' : '📉'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 3: Recent Alerts */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">🔔 Recent Alerts</h2>
        <div className="space-y-3">
          {recentAlerts.map((alert, idx) => (
            <div key={idx} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
              <span className={`w-2 h-2 rounded-full ${alert.type === 'critical' ? 'bg-red-500' : alert.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`}></span>
              <span className="text-sm flex-1">{alert.message}</span>
              <span className="text-xs text-gray-400">{alert.time}</span>
              {alert.type === 'critical' && (
                <button className="text-red-500 text-xs hover:underline">Take Action</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}