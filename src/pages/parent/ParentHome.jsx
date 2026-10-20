import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// TODAY'S DATA
const todayKPIs = [
  { label: "Child's Avg Score", value: '82%', change: '↑ 3% from last term', icon: '📊', color: 'border-blue-900' },
  { label: 'Attendance Rate', value: '90%', change: '18/20 days', icon: '✅', color: 'border-green-500' },
  { label: 'Fee Status', value: '✅ Paid', change: 'Next due July', icon: '💰', color: 'border-purple-500' },
  { label: 'Pending Homework', value: '2', change: 'Due this week', icon: '📚', color: 'border-orange-500' },
  { label: 'Upcoming Exams', value: '3', change: 'Next: Math 6/25', icon: '📅', color: 'border-red-500' },
  { label: 'Messages', value: '1', change: 'From Mr. John', icon: '💬', color: 'border-yellow-500' },
];

const children = [
  { id: 1, name: 'Sok', grade: 'Grade 10A', teacher: 'Mr. John', active: true },
  { id: 2, name: 'Mey', grade: 'Grade 8B', teacher: 'Ms. Anna', active: false },
];

const recentScores = [
  { subject: 'Mathematics', score: 88, grade: 'A' },
  { subject: 'English', score: 78, grade: 'B+' },
  { subject: 'Science', score: 82, grade: 'A-' },
];

const recentMessages = [
  { id: 1, from: 'Mr. John', subject: 'Math', message: 'Sok is doing well in class.', time: '10:30 AM' },
];

const upcomingEvents = [
  { title: 'Science Fair', date: '2025-07-15' },
  { title: 'Math Final Exam', date: '2025-06-28' },
];

export default function ParentHome() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');
  const [activeChild, setActiveChild] = useState(children[0]);

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
    toast.success('👋 Welcome back!');
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">🏠 Parent Home</h1>
        <p className="text-sm text-gray-500 mt-1">{currentDate}</p>
        <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">TODAY'S DATA</span>
      </div>

      {/* Child Selector */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">👶 My Children</h3>
        <div className="flex flex-wrap gap-3">
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => setActiveChild(child)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeChild.id === child.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {child.name} – {child.grade}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">Currently viewing: <span className="font-bold">{activeChild.name}</span></p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 mb-8">
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

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Scores */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center justify-between">
            <span>📊 Recent Scores – {activeChild.name}</span>
            <button onClick={() => navigate('/parent/scores')} className="text-sm text-orange-500 hover:underline">View All →</button>
          </h3>
          <div className="space-y-3">
            {recentScores.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.subject}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-blue-900">{item.score}%</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    item.grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                    item.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{item.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Summary */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center justify-between">
            <span>💰 Fee Summary – {activeChild.name}</span>
            <button onClick={() => navigate('/parent/fees')} className="text-sm text-orange-500 hover:underline">View All →</button>
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b">
              <span>Tuition</span>
              <span className="text-green-600 font-bold">✅ Paid</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Transport</span>
              <span className="text-green-600 font-bold">✅ Paid</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Library</span>
              <span className="text-orange-500 font-bold">⚠️ Pending</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-bold">Total Outstanding</span>
              <span className="font-bold text-red-600">$50</span>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4">📅 Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map((item, idx) => (
              <div key={idx} className="py-2 border-b last:border-0">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center justify-between">
            <span>💬 Recent Messages</span>
            <button onClick={() => navigate('/parent/messages')} className="text-sm text-orange-500 hover:underline">View All →</button>
          </h3>
          <div className="space-y-3">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="py-2 border-b last:border-0">
                <p className="font-medium">{msg.from} <span className="text-gray-400 text-sm">({msg.subject})</span></p>
                <p className="text-sm text-gray-600">{msg.message}</p>
                <p className="text-xs text-gray-400">{msg.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}