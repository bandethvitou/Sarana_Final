import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

// ============================================================
// HISTORICAL DATA
// ============================================================

const periodKPIs = [
  { label: 'Total Visitors (6 months)', value: '185', change: '↑ 10% YoY', icon: '📊', color: 'border-blue-900' },
  { label: 'Total New Students (6 months)', value: '105', change: '↑ 15% YoY', icon: '🆕', color: 'border-green-500' },
  { label: 'Total Calls (6 months)', value: '520', change: '↑ 5% YoY', icon: '📞', color: 'border-purple-500' },
  { label: 'Avg Outstanding (6 months)', value: '$3,500', change: '↓ 8% YoY', icon: '💰', color: 'border-yellow-500' },
  { label: 'Task Completion Rate', value: '85%', change: '↑ 5% YoY', icon: '✅', color: 'border-orange-500' },
];

const estimateVsActual = [
  { month: 'Jan', estimated: 30, actual: 28, diff: -2, status: '93%' },
  { month: 'Feb', estimated: 35, actual: 32, diff: -3, status: '91%' },
  { month: 'Mar', estimated: 40, actual: 42, diff: 2, status: '105%' },
  { month: 'Apr', estimated: 35, actual: 30, diff: -5, status: '86%' },
  { month: 'May', estimated: 40, actual: 38, diff: -2, status: '95%' },
  { month: 'Jun', estimated: 40, actual: 35, diff: -5, status: '88%*' },
];

const visitorsByPurpose = [
  { purpose: 'Meetings', count: 45, color: 'bg-blue-500' },
  { purpose: 'Tours', count: 25, color: 'bg-green-500' },
  { purpose: 'Delivery', count: 15, color: 'bg-yellow-500' },
  { purpose: 'Events', count: 10, color: 'bg-purple-500' },
  { purpose: 'Other', count: 5, color: 'bg-gray-500' },
];

const visitorsByMonth = [
  { month: 'Jan', count: 25 },
  { month: 'Feb', count: 30 },
  { month: 'Mar', count: 35 },
  { month: 'Apr', count: 28 },
  { month: 'May', count: 32 },
  { month: 'Jun', count: 35 },
];

const callData = {
  total: 520,
  resolved: 445,
  pending: 75,
  byMonth: [
    { month: 'Jan', calls: 80 },
    { month: 'Feb', calls: 75 },
    { month: 'Mar', calls: 95 },
    { month: 'Apr', calls: 85 },
    { month: 'May', calls: 90 },
    { month: 'Jun', calls: 95 },
  ],
};

const taskData = [
  { month: 'Jan', rate: 82 },
  { month: 'Feb', rate: 85 },
  { month: 'Mar', rate: 92 },
  { month: 'Apr', rate: 78 },
  { month: 'May', rate: 87 },
  { month: 'Jun', rate: 86 },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ReceptionDashboard() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2025');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
    toast.success('📊 Loading historical data...');
  }, []);

  const maxEstimate = Math.max(...estimateVsActual.map(m => Math.max(m.estimated, m.actual))) * 1.2;
  const maxVisitors = Math.max(...visitorsByMonth.map(m => m.count)) * 1.2;
  const maxCalls = Math.max(...callData.byMonth.map(m => m.calls)) * 1.2;
  const maxTasks = Math.max(...taskData.map(m => m.rate)) * 1.2;

  // ============================================================
  // EXPORT FUNCTIONS
  // ============================================================

  const exportToExcel = (data, filename, headers) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${filename}_${selectedYear}.xlsx`);
    toast.success(`📤 ${filename} exported!`);
  };

  const getStatusColor = (status) => {
    const num = parseInt(status);
    if (num >= 100) return 'text-green-600';
    if (num >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📊 Reception Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Analytics & Reporting • 6 Month Period</p>
        <span className="inline-block mt-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">HISTORICAL DATA</span>
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

      {/* Section 1: Estimated vs Actual */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900">📊 Estimated vs Actual – New Students {selectedYear}</h2>
          <div className="flex gap-2">
            <select
              className="border rounded-lg px-3 py-1 text-sm bg-white"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
            <button
              onClick={() => exportToExcel(estimateVsActual, 'Estimate_vs_Actual', ['Month', 'Estimated', 'Actual', 'Diff', 'Status'])}
              className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
            >
              📤 Export
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="flex items-end h-48 gap-4 mb-6">
          {estimateVsActual.map((data, idx) => {
            const estHeight = (data.estimated / maxEstimate) * 100;
            const actHeight = (data.actual / maxEstimate) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className="flex gap-1 w-full justify-center items-end h-36">
                  <div className="w-7 bg-blue-900 rounded-t relative group" style={{ height: `${estHeight}%` }}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-blue-900 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{data.estimated}</div>
                  </div>
                  <div className="w-7 bg-orange-500 rounded-t relative group" style={{ height: `${actHeight}%` }}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{data.actual}</div>
                  </div>
                </div>
                <span className="text-xs mt-2 font-medium">{data.month}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-6 text-sm">
          <span className="flex items-center gap-2"><span className="w-4 h-4 bg-blue-900 rounded"></span> Estimated</span>
          <span className="flex items-center gap-2"><span className="w-4 h-4 bg-orange-500 rounded"></span> Actual</span>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Month</th>
                <th className="px-4 py-2 text-left">Estimated</th>
                <th className="px-4 py-2 text-left">Actual</th>
                <th className="px-4 py-2 text-left">Diff</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {estimateVsActual.map((data, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{data.month}</td>
                  <td className="px-4 py-2">{data.estimated}</td>
                  <td className="px-4 py-2">{data.actual}</td>
                  <td className={`px-4 py-2 ${data.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {data.diff >= 0 ? '+' : ''}{data.diff}
                  </td>
                  <td className={`px-4 py-2 font-medium ${getStatusColor(data.status)}`}>
                    {data.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Visitor Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Visitors by Purpose</h2>
          <div className="space-y-3">
            {visitorsByPurpose.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm">
                  <span>{item.purpose}</span>
                  <span className="font-medium">{item.count}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.count}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Visitors by Month</h2>
          <div className="flex items-end h-40 gap-3">
            {visitorsByMonth.map((data, idx) => {
              const height = (data.count / maxVisitors) * 100;
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

      {/* Section 3: Call Analytics */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Call Analytics – {selectedYear}</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-900">{callData.total}</div>
            <div className="text-sm text-gray-500">Total Calls</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{callData.resolved}</div>
            <div className="text-sm text-gray-500">Resolved ({Math.round(callData.resolved/callData.total*100)}%)</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-600">{callData.pending}</div>
            <div className="text-sm text-gray-500">Pending Callback</div>
          </div>
        </div>
        <div className="flex items-end h-32 gap-3">
          {callData.byMonth.map((data, idx) => {
            const height = (data.calls / maxCalls) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-purple-500 rounded-t relative group" style={{ height: `${height}%` }}>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">{data.calls}</div>
                </div>
                <span className="text-xs mt-2">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 4: Task Completion Rate */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Task Completion Rate – {selectedYear}</h2>
        <div className="flex items-end h-32 gap-3">
          {taskData.map((data, idx) => {
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

      {/* Section 5: Excel Import/Export */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📥📤 Excel Import / Export</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">📥 IMPORT</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => toast.success('📥 Import customer leads...')} className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800 transition-colors">
                Import Customer Leads
              </button>
              <button onClick={() => toast.success('📥 Import contact list...')} className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800 transition-colors">
                Import Contact List
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">📤 EXPORT</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => exportToExcel(visitorsByMonth, 'Visitor_Report', ['Month', 'Count'])} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                Export Visitor Report
              </button>
              <button onClick={() => exportToExcel(callData.byMonth, 'Call_Log', ['Month', 'Calls'])} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                Export Call Log
              </button>
              <button onClick={() => exportToExcel(estimateVsActual, 'Estimate_vs_Actual', ['Month', 'Estimated', 'Actual'])} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                Export Estimate vs Actual
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}