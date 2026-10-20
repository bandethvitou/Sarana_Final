import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

const periodKPIs = [
  { label: 'Total Books', value: '5,200', change: '↑ 5% YoY', icon: '📖', color: 'border-blue-900' },
  { label: 'Total Checkouts (6 months)', value: '420', change: '↑ 12% YoY', icon: '📤', color: 'border-green-500' },
  { label: 'Total Overdue', value: '45', change: '↓ 8% YoY', icon: '⚠️', color: 'border-red-500' },
  { label: 'Total Returns (6 months)', value: '380', change: '↑ 10% YoY', icon: '📥', color: 'border-purple-500' },
  { label: 'Monthly Checkouts', value: '85', change: '↑ 15% YoY', icon: '📊', color: 'border-orange-500' },
];

const monthlyCheckouts = [
  { month: 'Jan', count: 65 },
  { month: 'Feb', count: 72 },
  { month: 'Mar', count: 85 },
  { month: 'Apr', count: 70 },
  { month: 'May', count: 78 },
  { month: 'Jun', count: 85 },
];

const categoryData = [
  { category: 'Textbook', count: 65, color: 'bg-blue-500' },
  { category: 'Story', count: 20, color: 'bg-green-500' },
  { category: 'Reference', count: 10, color: 'bg-yellow-500' },
  { category: 'Other', count: 5, color: 'bg-purple-500' },
];

const topBorrowers = [
  { name: 'Sok Heng', class: 'Grade 10A', count: 12 },
  { name: 'Mey Lin', class: 'Grade 8B', count: 10 },
  { name: 'David', class: 'Grade 12A', count: 8 },
  { name: 'Srey Mom', class: 'Grade 9A', count: 7 },
  { name: 'Kim Chan', class: 'Grade 11A', count: 6 },
];

export default function LibraryDashboard() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2025');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
    toast.success('📊 Loading library analytics...');
  }, []);

  const maxCheckouts = Math.max(...monthlyCheckouts.map(m => m.count)) * 1.2;
  const maxCategory = Math.max(...categoryData.map(c => c.count)) * 1.2;

  const exportToExcel = () => {
    const data = monthlyCheckouts.map(m => ({ Month: m.month, Checkouts: m.count }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Library Stats');
    XLSX.writeFile(wb, `Library_Stats_${selectedYear}.xlsx`);
    toast.success('📊 Report exported successfully!');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📊 Library Dashboard</h1>
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
        {/* Monthly Checkouts */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Monthly Checkouts</h2>
          <div className="flex items-end h-48 gap-3">
            {monthlyCheckouts.map((data, idx) => {
              const height = (data.count / maxCheckouts) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-orange-500 rounded-t relative group" style={{ height: `${height}%` }}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">{data.count}</div>
                  </div>
                  <span className="text-xs mt-2">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Books by Category */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Books by Category</h2>
          <div className="space-y-3">
            {categoryData.map((item, idx) => {
              const height = (item.count / maxCategory) * 100;
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
              return (
                <div key={idx}>
                  <div className="flex justify-between text-sm">
                    <span>{item.category}</span>
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

      {/* Top Borrowers */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">🏆 Top Borrowers</h2>
        <div className="space-y-3">
          {topBorrowers.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400 w-6">#{idx + 1}</span>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.class}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-blue-900">{item.count} books</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}