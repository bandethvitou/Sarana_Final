import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const todayKPIs = [
  { label: 'Meetings Today', value: '4', change: '📅 Scheduled', icon: '📅', color: 'border-blue-900' },
  { label: 'Pending Correspondence', value: '6', change: '📋 Needs reply', icon: '📋', color: 'border-yellow-500' },
  { label: 'Upcoming Deadlines', value: '3', change: '⚠️ Due this week', icon: '⚠️', color: 'border-red-500' },
  { label: "Director's Tasks", value: '5', change: '🔄 In progress', icon: '📊', color: 'border-orange-500' },
  { label: 'Documents Processed', value: '8', change: '✅ Done', icon: '📄', color: 'border-green-500' },
];

const todaySchedule = [
  { id: 1, time: '9:00 AM', title: 'Staff Meeting', location: 'Room 201', attendees: 'All Staff' },
  { id: 2, time: '10:30 AM', title: 'Director Review', location: 'Director Office', attendees: 'Mr. B. Soth' },
  { id: 3, time: '2:00 PM', title: 'Finance Meeting', location: 'Room 301', attendees: 'Finance Team' },
];

const pendingCorrespondence = [
  { id: 1, from: 'Ministry of Education', subject: 'Annual Report Submission', date: '2025-06-20', priority: 'High' },
  { id: 2, from: 'School Board', subject: 'Meeting Minutes Approval', date: '2025-06-19', priority: 'Medium' },
  { id: 3, from: 'Parent Association', subject: 'Event Proposal', date: '2025-06-18', priority: 'Low' },
];

export default function SecretaryHome() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
    toast.success('📝 Welcome to Secretary Office!');
  }, []);

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 High</span>;
      case 'Medium': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">🟠 Medium</span>;
      case 'Low': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 Low</span>;
      default: return null;
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📝 Secretary Home</h1>
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
        <button onClick={() => navigate('/secretary/calendar')} className="px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
          <span>📅</span> Schedule Meeting
        </button>
        <button onClick={() => { toast.success('📋 Opening correspondence log...'); }} className="px-5 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
          <span>📋</span> Log Correspondence
        </button>
        <button onClick={() => navigate('/secretary/minutes')} className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
          <span>📄</span> Record Minutes
        </button>
        <button onClick={() => navigate('/secretary/tasks')} className="px-5 py-2.5 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition-all flex items-center gap-2 font-medium">
          <span>✅</span> Add Task
        </button>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center justify-between">
            <span>📅 Today's Schedule</span>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">{todaySchedule.length}</span>
          </h3>
          <div className="space-y-3">
            {todaySchedule.map((item) => (
              <div key={item.id} className="py-2 border-b last:border-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900">{item.time}</span>
                  <span className="text-xs text-gray-500">{item.location}</span>
                </div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">👥 {item.attendees}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Correspondence */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-yellow-600 mb-4 flex items-center justify-between">
            <span>📋 Pending Correspondence</span>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">{pendingCorrespondence.length}</span>
          </h3>
          <div className="space-y-3">
            {pendingCorrespondence.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.from}</p>
                  <p className="text-sm text-gray-500">{item.subject}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityBadge(item.priority)}
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}  