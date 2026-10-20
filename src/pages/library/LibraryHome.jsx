import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const todayKPIs = [
  { label: 'Total Books', value: '5,200', change: '📚 All levels', icon: '📖', color: 'border-blue-900' },
  { label: 'Checked Out Today', value: '23', change: '📤 Active loans', icon: '📤', color: 'border-green-500' },
  { label: 'Overdue Books', value: '15', change: '⚠️ 5 over 30 days', icon: '⚠️', color: 'border-red-500' },
  { label: 'Returned Today', value: '18', change: '📥 Today', icon: '📥', color: 'border-purple-500' },
  { label: 'New Arrivals (Month)', value: '12', change: '📦 Added this month', icon: '🆕', color: 'border-orange-500' },
];

const todayCheckouts = [
  { id: 1, book: 'Mathematics Grade 10', student: 'Sok Heng', class: 'Grade 10A', time: '8:30 AM' },
  { id: 2, book: 'Khmer Literature', student: 'Mey Lin', class: 'Grade 8B', time: '9:15 AM' },
  { id: 3, book: 'Physics Textbook', student: 'David', class: 'Grade 12A', time: '10:00 AM' },
];

const todayReturns = [
  { id: 1, book: 'English Grammar', student: 'Srey Mom', class: 'Grade 9A', time: '8:45 AM' },
  { id: 2, book: 'Biology Textbook', student: 'Kim Chan', class: 'Grade 11A', time: '11:30 AM' },
];

const overdueAlerts = [
  { id: 1, book: 'Chemistry Textbook', student: 'Pech Sopheak', class: 'Grade 10B', days: 35 },
  { id: 2, book: 'History Book', student: 'Chhay Srey', class: 'Grade 9A', days: 28 },
  { id: 3, book: 'Geography Atlas', student: 'Sok Mala', class: 'Grade 12A', days: 45 },
];

const mostBorrowed = [
  { id: 1, book: 'Mathematics Grade 10', count: 15 },
  { id: 2, book: 'Khmer Literature', count: 12 },
  { id: 3, book: 'Physics Textbook', count: 10 },
  { id: 4, book: 'English Grammar', count: 8 },
  { id: 5, book: 'Biology Textbook', count: 7 },
];

export default function LibraryHome() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
    toast.success('📚 Welcome to the Library!');
  }, []);

  const getDaysOverdueBadge = (days) => {
    if (days > 30) return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 {days} days</span>;
    if (days > 15) return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">🟠 {days} days</span>;
    return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 {days} days</span>;
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📚 Library Home</h1>
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
        <button onClick={() => { toast.success('📖 Opening Add Book form...'); }} className="px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
          <span>📖</span> Add New Book
        </button>
        <button onClick={() => navigate('/library/checkout')} className="px-5 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
          <span>📤</span> Checkout Book
        </button>
        <button onClick={() => navigate('/library/checkout')} className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
          <span>📥</span> Return Book
        </button>
        <button onClick={() => { toast.success('📧 Reminders sent to overdue students!'); }} className="px-5 py-2.5 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 font-medium">
          <span>📧</span> Send Reminders
        </button>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Checkouts */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center justify-between">
            <span>📤 Today's Checkouts</span>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">{todayCheckouts.length}</span>
          </h3>
          <div className="space-y-3">
            {todayCheckouts.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.book}</p>
                  <p className="text-sm text-gray-500">{item.student} • {item.class}</p>
                </div>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Returns */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center justify-between">
            <span>📥 Today's Returns</span>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">{todayReturns.length}</span>
          </h3>
          <div className="space-y-3">
            {todayReturns.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.book}</p>
                  <p className="text-sm text-gray-500">{item.student} • {item.class}</p>
                </div>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Overdue Alerts */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-red-600 mb-4 flex items-center justify-between">
            <span>⚠️ Overdue Alerts</span>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">{overdueAlerts.length}</span>
          </h3>
          <div className="space-y-3">
            {overdueAlerts.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.book}</p>
                  <p className="text-sm text-gray-500">{item.student} • {item.class}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getDaysOverdueBadge(item.days)}
                  <button className="text-orange-500 hover:underline text-sm">📧</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Borrowed */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center justify-between">
            <span>📊 Most Borrowed This Month</span>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">Top 5</span>
          </h3>
          <div className="space-y-3">
            {mostBorrowed.map((item, idx) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-400 w-6">{idx + 1}</span>
                  <span className="font-medium">{item.book}</span>
                </div>
                <span className="text-sm font-bold text-blue-900">{item.count} borrows</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}