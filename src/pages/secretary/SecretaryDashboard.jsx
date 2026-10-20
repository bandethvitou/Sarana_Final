import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

const periodKPIs = [
  { label: 'Total Meetings (6 months)', value: '48', change: '↑ 12% YoY', icon: '📅', color: 'border-blue-900' },
  { label: 'Correspondence Processed', value: '156', change: '↑ 8% YoY', icon: '📋', color: 'border-green-500' },
  { label: 'Minutes Recorded', value: '24', change: '↑ 5% YoY', icon: '📄', color: 'border-purple-500' },
  { label: 'Tasks Completed', value: '89', change: '↑ 15% YoY', icon: '✅', color: 'border-orange-500' },
  { label: 'Documents Processed', value: '312', change: '↑ 10% YoY', icon: '📊', color: 'border-red-500' },
];

const monthlyMeetings = [
  { month: 'Jan', count: 6 },
  { month: 'Feb', count: 8 },
  { month: 'Mar', count: 7 },
  { month: 'Apr', count: 9 },
  { month: 'May', count: 8 },
  { month: 'Jun', count: 10 },
];

const correspondenceByType = [
  { type: 'Incoming', count: 45, color: 'bg-blue-500' },
  { type: 'Outgoing', count: 35, color: 'bg-green-500' },
  { type: 'Internal', count: 25, color: 'bg-yellow-500' },
  { type: 'External', count: 20, color: 'bg-purple-500' },
];

const taskCompletionData = [
  { month: 'Jan', rate: 82 },
  { month: 'Feb', rate: 85 },
  { month: 'Mar', rate: 92 },
  { month: 'Apr', rate: 78 },
  { month: 'May', rate: 87 },
  { month: 'Jun', rate: 86 },
];

export default function SecretaryDashboard() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2025');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
    toast.success('📊 Loading historical data...');
  }, []);

  const maxMeetings = Math.max(...monthlyMeetings.map(m => m.count)) * 1.2;
  const maxTasks = Math.max(...taskCompletionData.map(m => m.rate)) * 1.2;
  const maxCorrespondence = Math.max(...correspondenceByType.map(c => c.count)) * 1.2;

  const exportToExcel = () => {
    const data = monthlyMeetings.map(m => ({ Month: m.month, Meetings: m.count }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Meetings');
    XLSX.writeFile(wb, `Secretary_Report_${selectedYear}.xlsx`);
    toast.success('📊 Report exported successfully!');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📊 Secretary Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Analytics & Reporting • 6 Month Period</p>
        <span className="inline-block mt-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">HISTORICAL DATA</span>
      </div>

      <div className="flex justify-end mb-6">
        <select className="border rounded-lg px-3 py-2 bg-white" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
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

      {/* Export Button */}
      <div className="flex justify-end mb-6">
        <button onClick={exportToExcel} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          📤 Export Excel
        </button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Meetings */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Monthly Meetings</h2>
          <div className="flex items-end h-40 gap-3">
            {monthlyMeetings.map((data, idx) => {
              const height = (data.count / maxMeetings) * 100;
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

        {/* Correspondence by Type */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Correspondence by Type</h2>
          <div className="space-y-3">
            {correspondenceByType.map((item, idx) => {
              const height = (item.count / maxCorrespondence) * 100;
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
              return (
                <div key={idx}>
                  <div className="flex justify-between text-sm">
                    <span>{item.type}</span>
                    <span className="font-medium">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className={`${colors[idx]} h-2 rounded-full`} style={{ width: `${height}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Task Completion Rate */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Task Completion Rate</h2>
          <div className="flex items-end h-40 gap-3">
            {taskCompletionData.map((data, idx) => {
              const height = (data.rate / maxTasks) * 100;
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
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-green-50 rounded-lg p-2 text-center">
              <span className="text-gray-500">Best Month:</span>
              <span className="font-bold text-green-600 ml-2">March (92%)</span>
            </div>
            <div className="bg-red-50 rounded-lg p-2 text-center">
              <span className="text-gray-500">Worst Month:</span>
              <span className="font-bold text-red-600 ml-2">April (78%)</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📈 Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Total Meetings</span>
              <span className="font-bold text-blue-900">48</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Correspondence Processed</span>
              <span className="font-bold text-green-600">156</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Minutes Recorded</span>
              <span className="font-bold text-purple-600">24</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Tasks Completed</span>
              <span className="font-bold text-orange-600">89</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-600">Documents Processed</span>
              <span className="font-bold text-red-600">312</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}