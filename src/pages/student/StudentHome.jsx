import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// TODAY'S DATA
const todayKPIs = [
  { label: 'My Avg Score', value: '82%', change: '↑ 3% from last term', icon: '📊', color: 'border-blue-900' },
  { label: 'Attendance Rate', value: '90%', change: '18/20 days', icon: '✅', color: 'border-green-500' },
  { label: 'Pending Homework', value: '2', change: 'Due this week', icon: '📚', color: 'border-orange-500' },
  { label: 'Upcoming Exams', value: '3', change: 'Next: Math 6/25', icon: '📅', color: 'border-red-500' },
  { label: 'Class Rank', value: '5th', change: 'Out of 35', icon: '🏆', color: 'border-purple-500' },
];

const todayClasses = [
  { time: '8:00 AM', subject: 'Mathematics', teacher: 'Mr. John', room: '101' },
  { time: '9:30 AM', subject: 'English', teacher: 'Ms. Anna', room: '102' },
  { time: '11:00 AM', subject: 'Science', teacher: 'Mr. David', room: '103' },
];

const upcomingDeadlines = [
  { type: 'Homework', title: 'Math Fractions', due: '2025-06-23' },
  { type: 'Homework', title: 'Science Lab Report', due: '2025-06-25' },
  { type: 'Exam', title: 'Math Final Exam', due: '2025-06-28' },
];

const announcements = [
  { title: 'Science Fair', date: '2025-07-15', message: 'Register your project by next week' },
  { title: 'Sports Day', date: '2025-07-20', message: 'Practice schedule posted' },
];

export default function StudentHome() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
    toast.success('👋 Welcome back, Sok!');
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">🏠 Student Home</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back, Sok! • {currentDate}</p>
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

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4">📖 Today's Classes</h3>
          <div className="space-y-3">
            {todayClasses.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.subject}</p>
                  <p className="text-sm text-gray-500">{item.time} • Room {item.room}</p>
                </div>
                <span className="text-xs text-gray-400">{item.teacher}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center justify-between">
            <span>📅 Upcoming Deadlines</span>
            <button onClick={() => navigate('/student/calendar')} className="text-sm text-orange-500 hover:underline">View Calendar →</button>
          </h3>
          <div className="space-y-3">
            {upcomingDeadlines.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.type} • Due: {item.due}</p>
                </div>
                <span className="text-xs font-medium text-red-500">⚠️ {item.due}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl p-5 shadow-sm lg:col-span-2">
          <h3 className="font-semibold text-blue-900 mb-4">📢 Announcements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {announcements.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">{item.message}</p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}