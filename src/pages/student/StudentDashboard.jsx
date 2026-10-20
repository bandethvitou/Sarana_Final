import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

// HISTORICAL DATA
const periodKPIs = [
  { label: 'Avg Score (6 months)', value: '82%', change: '↑ 3% YoY', icon: '📊', color: 'border-blue-900' },
  { label: 'Attendance Rate', value: '90%', change: '↑ 2% YoY', icon: '✅', color: 'border-green-500' },
  { label: 'Homework Completed', value: '42', change: '↑ 5% YoY', icon: '📚', color: 'border-orange-500' },
  { label: 'Exams Passed', value: '8/10', change: '↑ 10% YoY', icon: '📅', color: 'border-red-500' },
  { label: 'Average Rank', value: '5th', change: '↑ 2 spots', icon: '🏆', color: 'border-purple-500' },
];

const monthlyScores = [
  { month: 'Jan', score: 78 },
  { month: 'Feb', score: 80 },
  { month: 'Mar', score: 82 },
  { month: 'Apr', score: 79 },
  { month: 'May', score: 84 },
  { month: 'Jun', score: 82 },
];

const subjectPerformance = [
  { subject: 'Mathematics', score: 88, color: 'bg-blue-500' },
  { subject: 'English', score: 78, color: 'bg-green-500' },
  { subject: 'Science', score: 82, color: 'bg-yellow-500' },
  { subject: 'Khmer', score: 90, color: 'bg-purple-500' },
  { subject: 'History', score: 70, color: 'bg-red-500' },
];

const gradeHistory = [
  { term: 'Term 1', grade: 'B+', score: 78 },
  { term: 'Term 2', grade: 'A-', score: 82 },
  { term: 'Term 3', grade: 'A', score: 88 },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2025');

  useEffect(() => {
    toast.success('📊 Loading historical data...');
  }, []);

  const maxScore = Math.max(...monthlyScores.map(m => m.score)) * 1.2;
  const maxSubject = Math.max(...subjectPerformance.map(s => s.score)) * 1.2;

  const exportToExcel = () => {
    const data = monthlyScores.map(m => ({ Month: m.month, Score: m.score }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Student Stats');
    XLSX.writeFile(wb, `Student_Stats_${selectedYear}.xlsx`);
    toast.success('📊 Report exported!');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📊 Student Dashboard</h1>
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
        {/* Monthly Scores Trend */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📈 Monthly Score Trend</h2>
          <div className="flex items-end h-48 gap-3">
            {monthlyScores.map((data, idx) => {
              const height = (data.score / maxScore) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-blue-900 rounded-t relative group" style={{ height: `${height}%` }}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-blue-900 font-medium opacity-0 group-hover:opacity-100 transition-opacity">{data.score}%</div>
                  </div>
                  <span className="text-xs mt-2">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subject Performance */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Subject Performance</h2>
          <div className="space-y-3">
            {subjectPerformance.map((item, idx) => {
              const height = (item.score / maxSubject) * 100;
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500'];
              return (
                <div key={idx}>
                  <div className="flex justify-between text-sm">
                    <span>{item.subject}</span>
                    <span className="font-medium">{item.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className={`${colors[idx]} h-2 rounded-full`} style={{ width: `${height}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grade History */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Grade History</h2>
        <div className="grid grid-cols-3 gap-4">
          {gradeHistory.map((item, idx) => (
            <div key={idx} className="text-center bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">{item.term}</p>
              <p className="text-3xl font-bold text-blue-900">{item.grade}</p>
              <p className="text-sm text-gray-500">{item.score}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}