// src/pages/Reports.jsx
import { useState } from 'react';
import * as XLSX from 'xlsx';

const incomeOutcomeData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  income: [40000, 42000, 45000, 43000, 47000, 45000],
  outcome: [30000, 31000, 32000, 33000, 31000, 32000],
};

const managerSummaries = {
  Academic: { classAvg: 78, topClass: 'Grade 10A', bottomClass: 'Grade 7B' },
  PeopleHR: { totalStaff: 34, inactiveStaff: 2 },
  Finance: { collected: 45000, outstanding: 3200, defaulters: 12 },
};

const activityLog = [
  { timestamp: '2025-06-01 10:15', user: 'Mr. Rudi', action: 'Created hiring request', entity: 'HR' },
  { timestamp: '2025-06-01 11:20', user: 'Ms. Anna', action: 'Approved bill #2', entity: 'Finance' },
];

export default function Reports() {
  const [tab, setTab] = useState('income');

  const maxIncome = Math.max(...incomeOutcomeData.income);
  const maxOutcome = Math.max(...incomeOutcomeData.outcome);
  const maxVal = Math.max(maxIncome, maxOutcome);

  // Export to Excel for Income & Outcome tab
  const exportIncomeOutcomeToExcel = () => {
    // Prepare worksheet data
    const worksheetData = [
      ['Month', 'Income (USD)', 'Outcome (USD)'],
      ...incomeOutcomeData.months.map((month, idx) => [
        month,
        incomeOutcomeData.income[idx],
        incomeOutcomeData.outcome[idx],
      ]),
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Income_vs_Outcome');
    XLSX.writeFile(workbook, `Income_Outcome_Report_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Reports</h1>
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${tab === 'income' ? 'text-blue-900 border-b-2 border-orange-500' : 'text-gray-500'}`}
          onClick={() => setTab('income')}
        >
          Income & Outcome
        </button>
        <button
          className={`px-4 py-2 font-medium ${tab === 'manager' ? 'text-blue-900 border-b-2 border-orange-500' : 'text-gray-500'}`}
          onClick={() => setTab('manager')}
        >
          Manager Summaries
        </button>
        <button
          className={`px-4 py-2 font-medium ${tab === 'activity' ? 'text-blue-900 border-b-2 border-orange-500' : 'text-gray-500'}`}
          onClick={() => setTab('activity')}
        >
          Activity Log
        </button>
      </div>

      {tab === 'income' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Income vs Outcome</h3>
            <div className="flex gap-2">
              <select className="border rounded px-3 py-1 text-sm">
                <option>2025</option>
              </select>
              {/* Export button now works */}
              <button
                onClick={exportIncomeOutcomeToExcel}
                className="px-3 py-1 bg-blue-900 text-white text-sm rounded hover:bg-blue-800"
              >
                Export
              </button>
            </div>
          </div>
          <div className="flex gap-4 items-end h-48">
            {incomeOutcomeData.months.map((month, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="flex gap-1 w-full justify-center items-end h-full">
                  <div
                    className="w-6 bg-blue-900 rounded-t"
                    style={{ height: `${(incomeOutcomeData.income[i] / maxVal) * 100}%` }}
                  ></div>
                  <div
                    className="w-6 bg-orange-500 rounded-t"
                    style={{ height: `${(incomeOutcomeData.outcome[i] / maxVal) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs mt-2">{month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-900 rounded"></span> Income
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-orange-500 rounded"></span> Outcome
            </span>
          </div>
        </div>
      )}

      {tab === 'manager' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-blue-900 mb-3">Academic Summary</h3>
            <p>Class Avg: {managerSummaries.Academic.classAvg}% | Top Class: {managerSummaries.Academic.topClass} | Bottom Class: {managerSummaries.Academic.bottomClass}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-blue-900 mb-3">People & HR Summary</h3>
            <p>Total Staff: {managerSummaries.PeopleHR.totalStaff} | Inactive (&gt;14 days): {managerSummaries.PeopleHR.inactiveStaff}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-blue-900 mb-3">Finance Summary</h3>
            <p>Collected: ${managerSummaries.Finance.collected} | Outstanding: ${managerSummaries.Finance.outstanding} | Defaulters: {managerSummaries.Finance.defaulters}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-400">
            <h4 className="font-semibold">Poor Students & Scholarship</h4>
            <p className="text-sm text-gray-600">Students with waived fees: 5, total waived: $1,200</p>
          </div>
        </div>
      )}

      {tab === 'activity' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">User Activity Log</h3>
            {/* You can also add export for activity log later similarly */}
            <button className="px-3 py-1 bg-blue-900 text-white text-sm rounded hover:bg-blue-800">
              Export CSV
            </button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Timestamp</th>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Action</th>
                <th className="px-4 py-2 text-left">Entity</th>
              </tr>
            </thead>
            <tbody>
              {activityLog.map((log, i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-2">{log.timestamp}</td>
                  <td className="px-4 py-2">{log.user}</td>
                  <td className="px-4 py-2">{log.action}</td>
                  <td className="px-4 py-2">{log.entity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}