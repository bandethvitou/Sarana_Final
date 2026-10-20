import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

// ===== HISTORICAL DATA =====
const monthlyData = [
  { month: 'Jan', income: 38000, outcome: 28000 },
  { month: 'Feb', income: 40000, outcome: 30000 },
  { month: 'Mar', income: 42000, outcome: 32000 },
  { month: 'Apr', income: 45000, outcome: 33000 },
  { month: 'May', income: 43000, outcome: 31000 },
  { month: 'Jun', income: 45000, outcome: 32000 },
  { month: 'Jul', income: 47000, outcome: 34000 },
  { month: 'Aug', income: 48000, outcome: 35000 },
  { month: 'Sep', income: 46000, outcome: 33000 },
  { month: 'Oct', income: 49000, outcome: 36000 },
  { month: 'Nov', income: 51000, outcome: 38000 },
  { month: 'Dec', income: 53000, outcome: 40000 },
];

// ===== INCOME BREAKDOWN =====
const incomeBreakdown = [
  { category: 'Student Tuition', amount: 38000, color: '#1E3A8A', icon: '💰' },
  { category: 'Transport', amount: 4000, color: '#3B82F6', icon: '🚌' },
  { category: 'Library', amount: 1500, color: '#60A5FA', icon: '📚' },
  { category: 'Lab Fee', amount: 900, color: '#93C5FD', icon: '🔬' },
  { category: 'Activity', amount: 600, color: '#6366F1', icon: '🎯' },
  { category: 'Book Sale', amount: 800, color: '#8B5CF6', icon: '📖' },
  { category: 'Uniform Sale', amount: 500, color: '#A855F7', icon: '👔' },
  { category: 'After School Study', amount: 1200, color: '#D946EF', icon: '📚' },
  { category: 'Music/Art', amount: 300, color: '#EC4899', icon: '🎵' },
  { category: 'Canteen Sales', amount: 2000, color: '#F97316', icon: '🍽️' },
  { category: 'Other Income', amount: 1000, color: '#9CA3AF', icon: '💵' },
];

// ===== EXPENSE BREAKDOWN =====
const expenseBreakdown = [
  { category: 'Salary', amount: 18000, color: '#EF4444', icon: '💰' },
  { category: 'Utilities', amount: 2500, color: '#F97316', icon: '⚡' },
  { category: 'Maintenance', amount: 1800, color: '#F59E0B', icon: '🔧' },
  { category: 'Supplies', amount: 3200, color: '#10B981', icon: '📦' },
  { category: 'Transport', amount: 1500, color: '#3B82F6', icon: '🚗' },
  { category: 'Events', amount: 2000, color: '#8B5CF6', icon: '🎉' },
  { category: 'Other', amount: 3000, color: '#9CA3AF', icon: '📌' },
];

// ===== HISTORICAL KPIs =====
const periodKPIs = [
  { label: 'Total Income', value: '$270,000', change: '↑ 5% YoY', icon: '💰', color: 'border-green-500' },
  { label: 'Avg Outstanding', value: '$3,500', change: '↓ 2% YoY', icon: '⚠️', color: 'border-yellow-500' },
  { label: 'Total Defaulters', value: '45', change: '⚠️ Alert', icon: '👤', color: 'border-red-500' },
  { label: 'Total Bills', value: '32', change: '✅ OK', icon: '🧾', color: 'border-blue-900' },
  { label: 'Total Expenses', value: '$192,000', change: '↑ 3% YoY', icon: '💸', color: 'border-purple-500' },
];

// ===== INCOME CODE TRACKING =====
const incomeCodes = [
  { code: 'INC-001', category: 'Tuition', expected: 38000, collected: 35500 },
  { code: 'INC-002', category: 'Transport', expected: 4000, collected: 3800 },
  { code: 'INC-003', category: 'Library', expected: 1500, collected: 1200 },
  { code: 'INC-004', category: 'Lab Fee', expected: 900, collected: 750 },
  { code: 'INC-005', category: 'Activity', expected: 600, collected: 500 },
  { code: 'INC-006', category: 'Late Fee', expected: 200, collected: 200 },
  { code: 'INC-007', category: 'Other', expected: 300, collected: 250 },
];

// ===== CALCULATE TOTALS =====
const totalExpected = incomeCodes.reduce((sum, c) => sum + c.expected, 0);
const totalCollected = incomeCodes.reduce((sum, c) => sum + c.collected, 0);
const overallPercentage = Math.round((totalCollected / totalExpected) * 100);

export default function FinanceDashboard() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('June 2025');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const totalIncome = monthlyData.reduce((sum, m) => sum + m.income, 0);
  const totalOutcome = monthlyData.reduce((sum, m) => sum + m.outcome, 0);
  const netSurplus = totalIncome - totalOutcome;
  const maxValue = Math.max(...monthlyData.map(m => Math.max(m.income, m.outcome))) * 1.1;

  // Pie chart totals
  const totalIncomeAll = incomeBreakdown.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenseAll = expenseBreakdown.reduce((sum, i) => sum + i.amount, 0);

  const exportToExcel = () => {
    const exportData = monthlyData.map(m => ({
      Month: m.month,
      Income: m.income,
      Outcome: m.outcome,
      Surplus: m.income - m.outcome,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Income_Outcome');
    XLSX.writeFile(workbook, `Income_Outcome_${selectedYear}.xlsx`);
  };

  const exportToPDF = () => window.print();

  const handleImport = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);
        alert(`✅ Imported ${json.length} records successfully!`);
        setShowImportModal(false);
        setSelectedFile(null);
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handleExport = () => {
    alert('📤 Exporting data...');
    setShowExportModal(false);
  };

  return (
    <div className="print-content">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">📊 Finance Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Analytics & Reporting • 6 Month Period</p>
        </div>
        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">HISTORICAL DATA</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {periodKPIs.map((kpi, idx) => (
          <div key={idx} className={`bg-white rounded-xl p-5 shadow-sm border-t-4 ${kpi.color} hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between">
              <span className="text-2xl">{kpi.icon}</span>
              <span className={`text-xs font-medium ${
                kpi.change.includes('↑') ? 'text-green-600' : 
                kpi.change.includes('↓') ? 'text-red-600' : 
                'text-yellow-600'
              }`}>{kpi.change}</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-blue-900">{kpi.value}</div>
              <div className="text-sm text-gray-500">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Excel Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button 
          onClick={() => setShowImportModal(true)}
          className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-sm flex items-center gap-2"
        >
          📥 Import Excel
        </button>
        <button 
          onClick={() => setShowExportModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2"
        >
          📤 Export Excel
        </button>
        <button 
          onClick={exportToPDF}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm flex items-center gap-2"
        >
          📄 Export PDF
        </button>
      </div>

      {/* Income vs Outcome Chart */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-8 print-break-inside-avoid">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900">📊 Income vs Outcome – {selectedYear}</h2>
          <select 
            className="border rounded-lg px-3 py-1 text-sm bg-white"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end h-60 gap-3 mb-4">
          {monthlyData.map((data, idx) => {
            const incomeHeight = (data.income / maxValue) * 100;
            const outcomeHeight = (data.outcome / maxValue) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className="flex gap-1 w-full justify-center items-end h-48">
                  <div 
                    className="w-7 bg-blue-900 rounded-t transition-all duration-500 hover:opacity-80 relative group"
                    style={{ height: `${incomeHeight}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-blue-900 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ${data.income}
                    </div>
                  </div>
                  <div 
                    className="w-7 bg-orange-500 rounded-t transition-all duration-500 hover:opacity-80 relative group"
                    style={{ height: `${outcomeHeight}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ${data.outcome}
                    </div>
                  </div>
                </div>
                <span className="text-xs mt-2 font-medium">{data.month}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-6 text-sm mb-4">
          <span className="flex items-center gap-2"><span className="w-4 h-4 bg-blue-900 rounded"></span> Income</span>
          <span className="flex items-center gap-2"><span className="w-4 h-4 bg-orange-500 rounded"></span> Outcome</span>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 rounded-xl p-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">Total Income (YTD)</div>
            <div className="text-2xl font-bold text-blue-900">${totalIncome.toLocaleString()}</div>
            <div className="text-xs text-green-600">↑ 5% vs last year</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Total Outcome (YTD)</div>
            <div className="text-2xl font-bold text-orange-500">${totalOutcome.toLocaleString()}</div>
            <div className="text-xs text-green-600">↑ 3% vs last year</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Net Surplus</div>
            <div className={`text-2xl font-bold ${netSurplus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${netSurplus.toLocaleString()}
            </div>
            <div className={`text-xs ${netSurplus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {netSurplus >= 0 ? '↑' : '↓'} 8% vs last year
            </div>
          </div>
        </div>
      </div>

      {/* ===== INCOME BREAKDOWN PIE CHART (UPDATED) ===== */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">💰 Income Breakdown</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Pie Chart (SVG Doughnut) */}
          <div className="relative w-48 h-48 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {incomeBreakdown.map((item, idx) => {
                const total = incomeBreakdown.reduce((sum, i) => sum + i.amount, 0);
                const pct = (item.amount / total) * 100;
                const startAngle = incomeBreakdown.slice(0, idx).reduce((sum, i) => sum + (i.amount / total) * 100, 0);
                const endAngle = startAngle + pct;
                
                const startRad = (startAngle / 100) * 2 * Math.PI;
                const endRad = (endAngle / 100) * 2 * Math.PI;
                
                const x1 = 50 + 40 * Math.cos(startRad);
                const y1 = 50 + 40 * Math.sin(startRad);
                const x2 = 50 + 40 * Math.cos(endRad);
                const y2 = 50 + 40 * Math.sin(endRad);
                
                const largeArc = pct > 50 ? 1 : 0;
                
                return (
                  <path
                    key={idx}
                    d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={item.color}
                    stroke="white"
                    strokeWidth="1"
                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-xs font-bold text-blue-900 text-center leading-tight">
                  Total<br/>
                  <span className="text-sm">${totalIncomeAll.toLocaleString()}</span>
                </span>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex-1 space-y-2 max-h-80 overflow-y-auto w-full">
            {incomeBreakdown.map((item, idx) => {
              const pct = Math.round((item.amount / totalIncomeAll) * 100);
              return (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                    <span className="text-sm text-gray-700">
                      {item.icon} {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-900">${item.amount.toLocaleString()}</span>
                    <span className="text-sm font-bold text-gray-700 w-12 text-right">{pct}%</span>
                    <div className="w-20 bg-gray-200 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: item.color }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== EXPENSE BREAKDOWN PIE CHART (UPDATED) ===== */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">💸 Expense Breakdown</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Pie Chart (SVG Doughnut) */}
          <div className="relative w-48 h-48 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {expenseBreakdown.map((item, idx) => {
                const total = expenseBreakdown.reduce((sum, i) => sum + i.amount, 0);
                const pct = (item.amount / total) * 100;
                const startAngle = expenseBreakdown.slice(0, idx).reduce((sum, i) => sum + (i.amount / total) * 100, 0);
                const endAngle = startAngle + pct;
                
                const startRad = (startAngle / 100) * 2 * Math.PI;
                const endRad = (endAngle / 100) * 2 * Math.PI;
                
                const x1 = 50 + 40 * Math.cos(startRad);
                const y1 = 50 + 40 * Math.sin(startRad);
                const x2 = 50 + 40 * Math.cos(endRad);
                const y2 = 50 + 40 * Math.sin(endRad);
                
                const largeArc = pct > 50 ? 1 : 0;
                
                return (
                  <path
                    key={idx}
                    d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={item.color}
                    stroke="white"
                    strokeWidth="1"
                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-xs font-bold text-blue-900 text-center leading-tight">
                  Total<br/>
                  <span className="text-sm">${totalExpenseAll.toLocaleString()}</span>
                </span>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex-1 space-y-2 max-h-80 overflow-y-auto w-full">
            {expenseBreakdown.map((item, idx) => {
              const pct = Math.round((item.amount / totalExpenseAll) * 100);
              return (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                    <span className="text-sm text-gray-700">
                      {item.icon} {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-900">${item.amount.toLocaleString()}</span>
                    <span className="text-sm font-bold text-gray-700 w-12 text-right">{pct}%</span>
                    <div className="w-20 bg-gray-200 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: item.color }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Income Code Tracking */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900">📋 Income Code Tracking</h2>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500">Month: <strong>June 2025</strong></span>
            <span className="text-orange-500">Days Remaining: 3</span>
            <span className="text-red-500">Closing: 30 June</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Code</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-right">Expected</th>
                <th className="px-4 py-2 text-right">Collected</th>
                <th className="px-4 py-2 text-center">%</th>
              </tr>
            </thead>
            <tbody>
              {incomeCodes.map((item, idx) => {
                const pct = Math.round((item.collected / item.expected) * 100);
                const status = pct >= 95 ? '🟢' : pct >= 80 ? '🟡' : '🔴';
                return (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{item.code}</td>
                    <td className="px-4 py-2">{item.category}</td>
                    <td className="px-4 py-2 text-right">${item.expected.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">${item.collected.toLocaleString()}</td>
                    <td className="px-4 py-2 text-center">
                      <span className="font-medium">{status} {pct}%</span>
                    </td>
                  </tr>
                );
              })}
              <tr className="border-t-2 border-gray-300 font-bold">
                <td className="px-4 py-2" colSpan="2">TOTAL</td>
                <td className="px-4 py-2 text-right">${totalExpected.toLocaleString()}</td>
                <td className="px-4 py-2 text-right">${totalCollected.toLocaleString()}</td>
                <td className="px-4 py-2 text-center">
                  <span className={`${overallPercentage >= 95 ? 'text-green-600' : overallPercentage >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {overallPercentage}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Overall Collection Rate</span>
            <span className="font-medium">{overallPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
            <div 
              className={`h-3 rounded-full ${overallPercentage >= 95 ? 'bg-green-500' : overallPercentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`} 
              style={{ width: `${overallPercentage}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Remaining: <strong className="text-red-600">${(totalExpected - totalCollected).toLocaleString()}</strong>
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">📥 Import Excel Data</h2>
            <div className="space-y-3">
              <div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-blue-900 hover:bg-gray-50 w-full">
                  📥 Download Template
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Choose File</label>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  className="w-full border rounded-lg px-4 py-2"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                {selectedFile && (
                  <p className="text-sm text-green-600 mt-1">✅ {selectedFile.name}</p>
                )}
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-500">
                Preview: 45 records found
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowImportModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button onClick={handleImport} className="px-4 py-2 bg-blue-900 text-white rounded-lg">Import Data</button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">📤 Export Data</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>Income Report</option>
                  <option>Expense Report</option>
                  <option>Full Report</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                  <input type="month" className="w-full border rounded-lg px-4 py-2" defaultValue="2025-01" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <input type="month" className="w-full border rounded-lg px-4 py-2" defaultValue="2025-06" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>Excel (.xlsx)</option>
                  <option>CSV (.csv)</option>
                  <option>PDF (.pdf)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowExportModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button onClick={handleExport} className="px-4 py-2 bg-blue-900 text-white rounded-lg">Export</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media print {
          .print-content { padding: 20px; }
          .print-break-inside-avoid { break-inside: avoid; }
          .bg-white { background: white !important; border: 1px solid #ddd !important; box-shadow: none !important; }
          .shadow-sm { box-shadow: none !important; }
          button { display: none !important; }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
}