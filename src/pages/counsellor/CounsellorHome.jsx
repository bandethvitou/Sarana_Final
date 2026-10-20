import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const todayKPIs = [
  { label: 'Active Cases', value: '8', change: '⚠️ 2 urgent', icon: '🧑‍🎓', color: 'border-blue-900' },
  { label: 'Sessions Today', value: '3', change: '📋 Scheduled', icon: '📋', color: 'border-green-500' },
  { label: 'At-Risk Students', value: '12', change: '⚠️ Flagged', icon: '⚠️', color: 'border-red-500' },
  { label: 'Parent Meetings This Week', value: '2', change: '📅 Scheduled', icon: '👨‍👩‍👧', color: 'border-purple-500' },
  { label: 'Resolved This Month', value: '15', change: '✅ Closed', icon: '✅', color: 'border-orange-500' },
];

const activeCases = [
  { id: 1, student: 'Sok Heng', issue: 'Academic', started: '2025-06-01', status: 'active' },
  { id: 2, student: 'Mey Lin', issue: 'Behavioral', started: '2025-06-10', status: 'active' },
  { id: 3, student: 'David', issue: 'Emotional', started: '2025-06-15', status: 'active' },
];

const todaySessions = [
  { id: 1, time: '9:00 AM', student: 'Sok Heng', type: 'Individual', notes: 'Follow-up on academic progress' },
  { id: 2, time: '10:30 AM', student: 'Mey Lin', type: 'Individual', notes: 'Behavioral assessment' },
  { id: 3, time: '2:00 PM', student: 'Group Session', type: 'Group', notes: 'Study skills workshop' },
];

const atRiskAlerts = [
  { id: 1, student: 'Chan Rith', class: 'Grade 10B', level: 'High', reason: 'Attendance < 70%' },
  { id: 2, student: 'Sok Mala', class: 'Grade 12A', level: 'Medium', reason: 'Academic performance dropping' },
  { id: 3, student: 'Kim Chan', class: 'Grade 11A', level: 'Low', reason: 'Behavioral issues reported' },
];

const upcomingMeetings = [
  { id: 1, date: '2025-06-22', parent: 'Mr. Heng', student: 'Sok Heng', purpose: 'Academic review' },
  { id: 2, date: '2025-06-24', parent: 'Mrs. Srey', student: 'Mey Lin', purpose: 'Behavioral update' },
];

export default function CounsellorHome() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
    toast.success('🧠 Welcome to Counselling!');
  }, []);

  const getRiskBadge = (level) => {
    switch (level) {
      case 'High': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 High</span>;
      case 'Medium': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">🟠 Medium</span>;
      case 'Low': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 Low</span>;
      default: return null;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">🧠 Counsellor Home</h1>
        <p className="text-sm text-gray-500 mt-1">{currentDate}</p>
        <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">TODAY'S DATA</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {todayKPIs.map((kpi, idx) => (
          <div key={idx} className={`bg-white rounded-xl p-5 shadow-sm border-t-4 ${kpi.color}`}>
            <div className="flex items-center justify-between">
              <span className="text-2xl">{kpi.icon}</span>
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">{kpi.change}</span>
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
        <button onClick={() => { toast.success('📝 Opening new case form...'); }} className="px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
          <span>📝</span> New Case
        </button>
        <button onClick={() => { toast.success('📋 Opening session log...'); }} className="px-5 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
          <span>📋</span> Log Session
        </button>
        <button onClick={() => { toast.success('📅 Opening schedule meeting...'); }} className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
          <span>📅</span> Schedule Meeting
        </button>
        <button onClick={() => navigate('/counsellor/at-risk')} className="px-5 py-2.5 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 font-medium">
          <span>⚠️</span> View At-Risk
        </button>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Cases */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center justify-between">
            <span>🧑‍🎓 Active Cases</span>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">{activeCases.length}</span>
          </h3>
          <div className="space-y-3">
            {activeCases.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.student}</p>
                  <p className="text-sm text-gray-500">{item.issue} • Started {item.started}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">{item.status.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Sessions */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center justify-between">
            <span>📋 Today's Sessions</span>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">{todaySessions.length}</span>
          </h3>
          <div className="space-y-3">
            {todaySessions.map((item) => (
              <div key={item.id} className="py-2 border-b last:border-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.time}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{item.type}</span>
                </div>
                <p className="font-medium">{item.student}</p>
                <p className="text-sm text-gray-500">{item.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* At-Risk Alerts */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-red-600 mb-4 flex items-center justify-between">
            <span>⚠️ At-Risk Alerts</span>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">{atRiskAlerts.length}</span>
          </h3>
          <div className="space-y-3">
            {atRiskAlerts.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.student}</p>
                  <p className="text-sm text-gray-500">{item.class} • {item.reason}</p>
                </div>
                {getRiskBadge(item.level)}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-purple-600 mb-4 flex items-center justify-between">
            <span>👨‍👩‍👧 Upcoming Meetings</span>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">{upcomingMeetings.length}</span>
          </h3>
          <div className="space-y-3">
            {upcomingMeetings.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.parent}</p>
                  <p className="text-sm text-gray-500">{item.student} • {item.purpose}</p>
                </div>
                <span className="text-xs font-medium text-purple-600">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}