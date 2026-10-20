import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

// HISTORICAL DATA
const periodKPIs = [
  { label: 'Total Students (6 months)', value: '185', change: '↑ 5% YoY', icon: '👥', color: 'border-blue-900' },
  { label: 'Lessons Taught (6 months)', value: '420', change: '↑ 12% YoY', icon: '📝', color: 'border-green-500' },
  { label: 'Avg Attendance Rate', value: '92%', change: '↑ 3% YoY', icon: '✅', color: 'border-purple-500' },
  { label: 'Avg Score', value: '76%', change: '↑ 4% YoY', icon: '📊', color: 'border-orange-500' },
  { label: 'Homework Completion', value: '85%', change: '↑ 6% YoY', icon: '📚', color: 'border-red-500' },
];

const monthlyAttendance = [
  { month: 'Jan', rate: 88 },
  { month: 'Feb', rate: 90 },
  { month: 'Mar', rate: 92 },
  { month: 'Apr', rate: 89 },
  { month: 'May', rate: 93 },
  { month: 'Jun', rate: 92 },
];

const classPerformance = [
  { class: 'Grade 5B', subject: 'Math', avg: 78 },
  { class: 'Grade 6A', subject: 'Science', avg: 72 },
  { class: 'Grade 5A', subject: 'Math', avg: 82 },
  { class: 'Grade 6B', subject: 'Science', avg: 68 },
];

const monthlyPlans = [
  { month: 'Jan', count: 18 },
  { month: 'Feb', count: 20 },
  { month: 'Mar', count: 22 },
  { month: 'Apr', count: 16 },
  { month: 'May', count: 24 },
  { month: 'Jun', count: 20 },
];

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2025');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
    toast.success('📊 Loading historical data...');
  }, []);

  const maxAttendance = Math.max(...monthlyAttendance.map(m => m.rate)) * 1.2;
  const maxPlans = Math.max(...monthlyPlans.map(m => m.count)) * 1.2;

  const exportToExcel = () => {
    const data = monthlyAttendance.map(m => ({ Month: m.month, 'Attendance Rate': m.rate }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Teacher Stats');
    XLSX.writeFile(wb, `Teacher_Stats_${selectedYear}.xlsx`);
    toast.success('📊 Report exported successfully!');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📊 Teacher Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Analytics & Reporting • 6 Month Period</p>
        <span className="inline-block mt-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">HISTORICAL DATA</span>
      </div>

      <div className="flex justify-end mb-6">
        <select className="border rounded-lg px-3 py-2 bg-white" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
        <button onClick={exportToExcel} className="ml-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          📤 Export Excel
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {periodKPIs.map((kpi, idx) => (
          <div key={idx} className={`bg-white rounded-xl p-5 shadow-sm border-t-4 ${kpi.color}`}>
            <div className="flex items-center justify-between">
              <span className="text-2xl">{kpi.icon}</span>
              <span className={`text-xs font-medium ${kpi.change.includes('↑') ? 'text-green-600' : 'text-red-600'}`}>{kpi.change}</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-blue-900">{kpi.value}</div>
              <div className="text-sm text-gray-500">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Attendance Trend */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Monthly Attendance Rate</h2>
          <div className="flex items-end h-48 gap-3">
            {monthlyAttendance.map((data, idx) => {
              const height = (data.rate / maxAttendance) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-green-500 rounded-t relative group" style={{ height: `${height}%` }}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">{data.rate}%</div>
                  </div>
                  <span className="text-xs mt-2">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Class Performance */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Class Performance</h2>
          <div className="space-y-3">
            {classPerformance.map((item, idx) => {
              const height = (item.avg / 100) * 100;
              const color = item.avg >= 75 ? 'bg-green-500' : 'bg-yellow-500';
              return (
                <div key={idx}>
                  <div className="flex justify-between text-sm">
                    <span>{item.class} – {item.subject}</span>
                    <span className="font-medium">{item.avg}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className={`${color} h-2 rounded-full`} style={{ width: `${height}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Lesson Plans */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Monthly Lesson Plans</h2>
        <div className="flex items-end h-40 gap-3">
          {monthlyPlans.map((data, idx) => {
            const height = (data.count / maxPlans) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-blue-900 rounded-t relative group" style={{ height: `${height}%` }}>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-blue-900 font-medium opacity-0 group-hover:opacity-100 transition-opacity">{data.count}</div>
                </div>
                <span className="text-xs mt-2">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}