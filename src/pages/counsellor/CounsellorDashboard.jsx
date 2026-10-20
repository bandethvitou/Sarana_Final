import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

const periodKPIs = [
  { label: 'Total Cases (6 months)', value: '45', change: '↑ 10% YoY', icon: '🧑‍🎓', color: 'border-blue-900' },
  { label: 'Sessions (6 months)', value: '120', change: '↑ 15% YoY', icon: '📋', color: 'border-green-500' },
  { label: 'At-Risk Students', value: '12', change: '↓ 5% YoY', icon: '⚠️', color: 'border-red-500' },
  { label: 'Parent Meetings (6 months)', value: '18', change: '↑ 8% YoY', icon: '👨‍👩‍👧', color: 'border-purple-500' },
  { label: 'Resolution Rate', value: '78%', change: '↑ 6% YoY', icon: '✅', color: 'border-orange-500' },
];

const monthlyCases = [
  { month: 'Jan', count: 6 },
  { month: 'Feb', count: 8 },
  { month: 'Mar', count: 7 },
  { month: 'Apr', count: 9 },
  { month: 'May', count: 8 },
  { month: 'Jun', count: 7 },
];

const issuesByType = [
  { type: 'Academic', count: 35, color: 'bg-blue-500' },
  { type: 'Behavioral', count: 25, color: 'bg-red-500' },
  { type: 'Emotional', count: 20, color: 'bg-purple-500' },
  { type: 'Social', count: 12, color: 'bg-green-500' },
  { type: 'Family', count: 8, color: 'bg-yellow-500' },
];

const resolutionData = [
  { month: 'Jan', rate: 72 },
  { month: 'Feb', rate: 75 },
  { month: 'Mar', rate: 82 },
  { month: 'Apr', rate: 70 },
  { month: 'May', rate: 78 },
  { month: 'Jun', rate: 82 },
];

export default function CounsellorDashboard() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2025');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
    toast.success('📊 Loading counselling analytics...');
  }, []);

  const maxCases = Math.max(...monthlyCases.map(m => m.count)) * 1.2;
  const maxIssues = Math.max(...issuesByType.map(i => i.count)) * 1.2;
  const maxResolution = Math.max(...resolutionData.map(r => r.rate)) * 1.2;

  const exportToExcel = () => {
    const data = monthlyCases.map(m => ({ Month: m.month, Cases: m.count }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Counselling Stats');
    XLSX.writeFile(wb, `Counselling_Stats_${selectedYear}.xlsx`);
    toast.success('📊 Report exported successfully!');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📊 Counsellor Dashboard</h1>
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
        {/* Monthly Cases */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Monthly Cases</h2>
          <div className="flex items-end h-48 gap-3">
            {monthlyCases.map((data, idx) => {
              const height = (data.count / maxCases) * 100;
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

        {/* Issues by Type */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Issues by Type</h2>
          <div className="space-y-3">
            {issuesByType.map((item, idx) => {
              const height = (item.count / maxIssues) * 100;
              const colors = ['bg-blue-500', 'bg-red-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500'];
              return (
                <div key={idx}>
                  <div className="flex justify-between text-sm">
                    <span>{item.type}</span>
                    <span className="font-medium">{item.count}%</span>
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

      {/* Resolution Rate */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Case Resolution Rate</h2>
        <div className="flex items-end h-40 gap-3">
          {resolutionData.map((data, idx) => {
            const height = (data.rate / maxResolution) * 100;
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
            <span className="font-bold text-green-600 ml-2">March (82%)</span>
          </div>
          <div className="bg-red-50 rounded-lg p-2 text-center">
            <span className="text-gray-500">Worst Month:</span>
            <span className="font-bold text-red-600 ml-2">April (70%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}