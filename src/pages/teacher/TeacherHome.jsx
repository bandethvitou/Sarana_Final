import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// TODAY'S DATA
const todayKPIs = [
  { label: "Today's Classes", value: '4', change: '2 Math • 2 Science', icon: '📅', color: 'border-blue-900' },
  { label: 'Plans Status', value: '2/3 Sub', change: '1 Draft • ⚠️ Alert', icon: '📝', color: 'border-yellow-500' },
  { label: 'Attendance Status', value: '3/4 Done', change: '⚠️ 1 Miss', icon: '✅', color: 'border-green-500' },
  { label: 'Scores Status', value: '1/4 Done', change: '⚠️ 3 Miss', icon: '📊', color: 'border-orange-500' },
  { label: 'Messages', value: '3', change: '💬 Unread', icon: '💬', color: 'border-purple-500' },
];

const alerts = [
  { type: 'critical', message: 'Attendance not taken: Grade 5B Math – 9:00 AM' },
  { type: 'critical', message: 'Scores not entered: Grade 6A Science – 3 days overdue' },
  { type: 'warning', message: 'Plan not submitted: Grade 5B Math – Draft' },
  { type: 'warning', message: 'Manager requested revision: Grade 6A Science Plan' },
  { type: 'info', message: 'New message: Mrs. Mey (Parent of Sok)' },
];

const todayPlans = [
  { time: '8:00 AM', class: 'Grade 5B', subject: 'Math', topic: 'Fractions', status: 'submitted' },
  { time: '9:30 AM', class: 'Grade 6A', subject: 'Science', topic: 'Photosynthesis', status: 'draft' },
  { time: '11:00 AM', class: 'Grade 5A', subject: 'Math', topic: 'Decimals', status: 'approved' },
];

const scoreStatus = [
  { class: 'Grade 5B', subject: 'Math', submitted: 18, total: 20 },
  { class: 'Grade 6A', subject: 'Science', submitted: 0, total: 22 },
  { class: 'Grade 5A', subject: 'Math', submitted: 20, total: 20 },
];

const recentMessages = [
  { id: 1, from: 'Mrs. Mey', student: 'Sok', message: 'My son is struggling with math homework.', time: '10:30 AM' },
  { id: 2, from: 'Mr. Chan', student: 'Srey', message: 'When is the next parent-teacher meeting?', time: 'Yesterday' },
  { id: 3, from: 'Ms. Srey', student: 'David', message: 'Thank you for the extra help!', time: '2 days ago' },
];

export default function TeacherHome() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
    toast.success('👋 Welcome back, Ms. Anna!');
  }, []);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return '🔴';
      case 'warning': return '🟡';
      case 'info': return '🔵';
      default: return '⚪';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'draft': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">⚪ Draft</span>;
      case 'submitted': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 Submitted</span>;
      case 'approved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">🟢 Approved</span>;
      default: return null;
    }
  };

  return (
    <div>
      {/* Top Info Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-blue-900">👩‍🏫 Welcome, Ms. Anna!</h1>
          <p className="text-sm text-gray-500">Shift: 🌅 Morning (6:00 AM – 12:00 PM) | {currentDate}</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">TODAY'S DATA</span>
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

      {/* Alerts */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
        <h3 className="font-semibold text-red-600 mb-3">⚠️ Alerts</h3>
        <div className="space-y-2">
          {alerts.map((alert, idx) => (
            <div key={idx} className={`flex items-center gap-3 p-2 rounded-lg ${
              alert.type === 'critical' ? 'bg-red-50' :
              alert.type === 'warning' ? 'bg-yellow-50' :
              'bg-blue-50'
            }`}>
              <span className="text-lg">{getAlertIcon(alert.type)}</span>
              <span className="text-sm">{alert.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Lesson Plans */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center justify-between">
            <span>📝 Today's Lesson Plans</span>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">{todayPlans.length}</span>
          </h3>
          <div className="space-y-3">
            {todayPlans.map((plan, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{plan.time} • {plan.class}</p>
                  <p className="text-sm text-gray-500">{plan.subject} – {plan.topic}</p>
                </div>
                {getStatusBadge(plan.status)}
              </div>
            ))}
          </div>
        </div>

        {/* Score Entry Status */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center justify-between">
            <span>📊 Score Entry Status</span>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">By Class</span>
          </h3>
          <div className="space-y-3">
            {scoreStatus.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.class}</p>
                  <p className="text-sm text-gray-500">{item.subject}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${
                      item.submitted / item.total >= 0.8 ? 'bg-green-500' :
                      item.submitted / item.total >= 0.5 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} style={{ width: `${(item.submitted / item.total) * 100}%` }}></div>
                  </div>
                  <span className="text-xs font-medium">{item.submitted}/{item.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4">⚡ Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => navigate('/teacher/attendance')} className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
              <span className="text-2xl block">✅</span>
              <span className="text-sm font-medium">Take Attendance</span>
            </button>
            <button onClick={() => navigate('/teacher/scores')} className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
              <span className="text-2xl block">📊</span>
              <span className="text-sm font-medium">Enter Scores</span>
            </button>
            <button onClick={() => navigate('/teacher/homework')} className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
              <span className="text-2xl block">📚</span>
              <span className="text-sm font-medium">Assign Homework</span>
            </button>
            <button onClick={() => navigate('/teacher/plans')} className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors">
              <span className="text-2xl block">📝</span>
              <span className="text-sm font-medium">Create Plan</span>
            </button>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center justify-between">
            <span>💬 Recent Messages</span>
            <button onClick={() => navigate('/teacher/messages')} className="text-sm text-orange-500 hover:underline">View All →</button>
          </h3>
          <div className="space-y-3">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 py-2 border-b last:border-0">
                <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {msg.from.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{msg.from} <span className="text-gray-400 text-xs">({msg.student})</span></p>
                  <p className="text-sm text-gray-600">{msg.message}</p>
                  <p className="text-xs text-gray-400">{msg.time}</p>
                </div>
                <button className="text-orange-500 hover:underline text-sm">Reply</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}